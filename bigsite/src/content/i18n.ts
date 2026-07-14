import { useMemo } from "react";
import { useLang } from "../i18n/lang";

// English source-of-truth data + selectors (unchanged).
import { services as servicesEn, type ServiceData } from "./services";
import {
  products as productsEn,
  categories as categoriesEn,
  type ProductData,
  type ProductCategory,
} from "./products";
import { cases as casesEn, type CaseStudy } from "./cases";
import {
  articles as articlesEn,
  categoryLabel as categoryLabelEn,
  type Article,
  type Category,
} from "./articles";
import {
  experts as expertsEn,
  expertList as expertListEn,
  type Expert,
  type ExpertId,
} from "./experts";
import { packages as packagesEn, type PackageData } from "./packages";
import {
  comparatorPages as comparatorPagesEn,
  comparisonRows as comparisonRowsEn,
  jurisdictionName as jurisdictionNameEn,
  type JurisdictionPage,
  type JurisdictionRow,
  type JurisdictionId,
} from "./jurisdictions";

// Russian translations (filled by the translation fan-out; empty until then → EN fallback).
import {
  servicesRu,
  productsRu,
  categoriesRu,
  casesRu,
  articlesRu,
  categoryLabelRu,
  expertsRu,
  packagesRu,
  comparatorPagesRu,
  comparisonRowsRu,
  jurisdictionNameRu,
} from "./ru";

import type { Lang } from "../i18n/lang";

// Whole-array swap with fallback: RU replaces EN only once the RU file is populated. The
// translation fan-out translates each file in full, so partial-file states don't occur.
const arr = <T,>(en: T[], ru: T[]): T[] => (ru.length ? ru : en);
// Per-key fallback for keyed maps (experts, label dictionaries) — RU may be partial and still safe.
const rec = <K extends string, V>(en: Record<K, V>, ru: Partial<Record<K, V>>) =>
  ({ ...en, ...ru }) as Record<K, V>;

const overlaps = (a?: string[], b?: string[]) => !!a && !!b && a.some((x) => b.includes(x));

// Build the full, language-bound content API. Selectors filter/find on structural fields
// (slug/id/category) which are identical across languages, so RU arrays work unchanged.
function buildContent(lang: Lang) {
  const ru = lang === "ru";
  const services: ServiceData[] = ru ? arr(servicesEn, servicesRu) : servicesEn;
  const products: ProductData[] = ru ? arr(productsEn, productsRu) : productsEn;
  const categories: ProductCategory[] = ru ? arr(categoriesEn, categoriesRu) : categoriesEn;
  const cases: CaseStudy[] = ru ? arr(casesEn, casesRu) : casesEn;
  const articles: Article[] = ru ? arr(articlesEn, articlesRu) : articlesEn;
  const packages: PackageData[] = ru ? arr(packagesEn, packagesRu) : packagesEn;
  const comparatorPages: JurisdictionPage[] = ru ? arr(comparatorPagesEn, comparatorPagesRu) : comparatorPagesEn;
  const comparisonRows: JurisdictionRow[] = ru ? arr(comparisonRowsEn, comparisonRowsRu) : comparisonRowsEn;
  const experts: Record<ExpertId, Expert> = ru ? rec(expertsEn, expertsRu) : expertsEn;
  const expertList: Expert[] = ru && expertListEn.some((e) => expertsRu[e.id]) ? expertListEn.map((e) => experts[e.id]) : expertListEn;
  const categoryLabel: Record<Category, string> = ru ? rec(categoryLabelEn, categoryLabelRu) : categoryLabelEn;
  const jurisdictionName: Record<JurisdictionId, string> = ru ? rec(jurisdictionNameEn, jurisdictionNameRu) : jurisdictionNameEn;

  return {
    services,
    products,
    categories,
    cases,
    articles,
    packages,
    comparatorPages,
    comparisonRows,
    experts,
    expertList,
    categoryLabel,
    jurisdictionName,
    // selectors
    getService: (slug: string) => services.find((s) => s.slug === slug),
    getProduct: (slug: string) => products.find((p) => p.slug === slug),
    productsByCategory: (categorySlug: string) => products.filter((p) => p.category === categorySlug),
    entryPoints: () => products.filter((p) => p.isEntryPoint),
    getCategory: (slug: string) => categories.find((c) => c.slug === slug),
    getCase: (slug: string) => cases.find((c) => c.slug === slug),
    getArticle: (slug: string) => articles.find((a) => a.slug === slug),
    articlesByCategory: (cat: Category) => articles.filter((a) => a.category === cat),
    getExpert: (id: ExpertId): Expert => experts[id],
    getComparator: (slug: string) => comparatorPages.find((p) => p.slug === slug),
    getPackage: (level: string) => packages.find((p) => p.level === level),
    latestCases: (n: number) => cases.slice(0, n),
    latestArticles: (n: number) => articles.slice(0, n),
    relatedCases: (opts: { services?: string[]; segments?: string[]; jurisdictions?: string[]; limit?: number; exclude?: string }) => {
      const { services: sv, segments, jurisdictions, limit = 2, exclude } = opts;
      return cases
        .filter((c) => c.slug !== exclude)
        .filter((c) => overlaps(c.services, sv) || overlaps(c.segments, segments) || overlaps(c.jurisdictions, jurisdictions))
        .slice(0, limit);
    },
    relatedArticles: (opts: { category?: string; services?: string[]; segments?: string[]; jurisdictions?: string[]; limit?: number; exclude?: string }) => {
      const { category, services: sv, segments, jurisdictions, limit = 3, exclude } = opts;
      return articles
        .filter((a) => a.slug !== exclude)
        .filter((a) => (category && a.category === category) || overlaps(a.services, sv) || overlaps(a.segments, segments) || overlaps(a.jurisdictions, jurisdictions))
        .slice(0, limit);
    },
  };
}

export type ContentApi = ReturnType<typeof buildContent>;

// The single entry point for localized content. Reads the active language from context and
// returns the fully language-bound content API. Concurrent-safe (no module-level mutable state).
export function useContent(): ContentApi {
  const lang = useLang();
  return useMemo(() => buildContent(lang), [lang]);
}
