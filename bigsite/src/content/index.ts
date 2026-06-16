// Content helpers — the tag graph that auto-populates related content (SPEC §4).
import { cases, type CaseStudy } from "./cases";
import { articles, type Article } from "./articles";

export * from "./experts";
export * from "./services";
export * from "./cases";
export * from "./articles";
export * from "./jurisdictions";

const overlaps = (a?: string[], b?: string[]) =>
  !!a && !!b && a.some((x) => b.includes(x));

export function relatedCases(opts: {
  services?: string[];
  segments?: string[];
  jurisdictions?: string[];
  limit?: number;
  exclude?: string;
}): CaseStudy[] {
  const { services, segments, jurisdictions, limit = 2, exclude } = opts;
  return cases
    .filter((c) => c.slug !== exclude)
    .filter(
      (c) =>
        overlaps(c.services, services) ||
        overlaps(c.segments, segments) ||
        overlaps(c.jurisdictions, jurisdictions)
    )
    .slice(0, limit);
}

export function relatedArticles(opts: {
  category?: string;
  services?: string[];
  segments?: string[];
  jurisdictions?: string[];
  limit?: number;
  exclude?: string;
}): Article[] {
  const { category, services, segments, jurisdictions, limit = 3, exclude } = opts;
  return articles
    .filter((a) => a.slug !== exclude)
    .filter(
      (a) =>
        (category && a.category === category) ||
        overlaps(a.services, services) ||
        overlaps(a.segments, segments) ||
        overlaps(a.jurisdictions, jurisdictions)
    )
    .slice(0, limit);
}

export const latestCases = (n: number): CaseStudy[] => cases.slice(0, n);
export const latestArticles = (n: number): Article[] => articles.slice(0, n);

export * from "./products";
export * from "./packages";
