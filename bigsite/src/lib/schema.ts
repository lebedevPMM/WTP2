// Single source of truth for JSON-LD across the site.
//
// Why a central module: schema is an entity graph, not per-page decoration. Every page
// must point at ONE Organization node (`@id`), otherwise Google and LLMs see a dozen
// unrelated "WTP" entities and none of them accumulate authority. Pages therefore pass
// `provider: orgRef()` / `publisher: orgRef()` — a reference — never an inline copy.
//
// Deliberately NOT here: FAQPage. Google fully retired the FAQ rich result on
// 2026-05-07 (see ~/.claude/skills/seo-schema/references/deprecated-types-2024-2026.md).
// The existing FAQPage in ProductTemplate stays — removal is not recommended either —
// but no new FAQPage is added anywhere.

import { site } from "./site";
import type { Expert } from "../content/experts";
import type { Lang } from "../i18n/lang";

export const SITE_URL = "https://wtp.ae";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const inLang = (lang: Lang) => (lang === "ru" ? "ru-RU" : "en-AE");

/** Reference to the single Organization node. Use instead of inlining an Organization. */
export const orgRef = () => ({ "@id": ORG_ID });

/**
 * Cloudflare Pages serves every prerendered route from `<path>/index.html`, so `/services`
 * 308-redirects to `/services/`. Until 2026-07-28 the sitemap, canonical and hreflang all
 * used the slash-less form: 77 of 114 sitemap URLs answered 308, which Search Console
 * reports as "Page with redirect". The trailing-slash form is the one that answers 200,
 * so it is the canonical form everywhere.
 */
export const withSlash = (path: string) =>
  path === "/" || path.endsWith("/") || /\.[a-z0-9]+$/i.test(path) ? path : `${path}/`;

/** Absolute URL for a path, language-aware. Always the 200-answering (trailing-slash) form. */
export const abs = (path: string, lang: Lang = "en") =>
  `${SITE_URL}${withSlash(lang === "ru" ? (path === "/" ? "/ru" : `/ru${path}`) : path)}`;

/**
 * The root entity. ProfessionalService (a LocalBusiness subtype) rather than plain
 * Organization: WTP has a staffed Dubai office and is found through local intent.
 */
export function organizationLd(lang: Lang) {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.full,
    url: SITE_URL,
    description:
      lang === "ru"
        ? "Бэк-офис для частного капитала: банковский доступ, структуры, наследование и резидентство — исполняем там, где это работает лучше всего."
        : "The back office for private wealth — banking access, structures, succession and residency, executed where they work best.",
    email: site.email,
    telephone: site.phone,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/logo-wtp.png`,
      caption: site.name,
    },
    image: { "@id": `${SITE_URL}/#logo` },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.office,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Singapore" },
      { "@type": "Country", name: "Portugal" },
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Country", name: "Malta" },
    ],
    knowsLanguage: ["en", "ru"],
    sameAs: [site.linkedin, site.telegram],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phone,
      areaServed: "AE",
      availableLanguage: ["en", "ru"],
    },
  };
}

/** WebSite node — carries the language pair and ties pages to the org. */
export function webSiteLd(lang: Lang) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    publisher: orgRef(),
    inLanguage: inLang(lang),
  };
}

/** Stable @id per expert, so /about/team and the personal domains describe ONE person. */
export const personId = (e: Expert) => `${SITE_URL}/about/team#${e.id}`;

/**
 * Each expert also runs a personal link-in-bio site. Those pages carry a Person node with
 * this exact @id, so listing the domain in `sameAs` closes the entity loop in both
 * directions — otherwise Google sees "Ivan Olenichev" on ceo.wtp.ae and on wtp.ae as two
 * unrelated people and neither accumulates authority.
 */
const EXPERT_SITES: Partial<Record<Expert["id"], string>> = {
  ivan: "https://ceo.wtp.ae/",
  sergey: "https://sk.wtp.ae/",
  kostya: "https://kh.wtp.ae/",
  oleg: "https://ok.wtp.ae/",
  olya: "https://oz.wtp.ae/",
  ilya: "https://io.wtp.ae/",
};

export function personLd(e: Expert, lang: Lang, opts?: { sameAs?: string[] }) {
  const sameAs = [...(EXPERT_SITES[e.id] ? [EXPERT_SITES[e.id] as string] : []), ...(opts?.sameAs ?? [])];
  return {
    "@type": "Person",
    "@id": personId(e),
    name: e.name,
    jobTitle: e.title,
    description: e.scope,
    knowsAbout: e.scope.split(/[,—]/).map((s) => s.trim()).filter(Boolean),
    worksFor: orgRef(),
    ...(e.photo ? { image: `${SITE_URL}${e.photo}` } : {}),
    url: abs("/about/team", lang),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** The team page itself: a CollectionPage listing the named experts. */
export function teamPageLd(experts: Expert[], lang: Lang) {
  return {
    "@type": "CollectionPage",
    "@id": `${abs("/about/team", lang)}#page`,
    url: abs("/about/team", lang),
    isPartOf: { "@id": WEBSITE_ID },
    about: orgRef(),
    inLanguage: inLang(lang),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: experts.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: personLd(e, lang),
      })),
    },
  };
}

export function serviceLd(args: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  lang: Lang;
  expert?: Expert;
}) {
  const { name, serviceType, description, path, lang, expert } = args;
  return {
    "@type": "Service",
    "@id": `${abs(path, lang)}#service`,
    name,
    serviceType,
    description,
    // `provider` accepts Organization *or* Person. Listing the named expert alongside the
    // org is the machine-readable half of the "every line is signed by someone" doctrine.
    provider: expert ? [orgRef(), { "@id": personId(expert) }] : orgRef(),
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    url: abs(path, lang),
    inLanguage: inLang(lang),
  };
}

export function articleLd(args: {
  headline: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  author: Expert;
  path: string;
  lang: Lang;
}) {
  const { headline, description, datePublished, dateModified, author, path, lang } = args;
  return {
    "@type": "Article",
    "@id": `${abs(path, lang)}#article`,
    headline,
    ...(description ? { description } : {}),
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@id": personId(author) },
    publisher: orgRef(),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(path, lang) },
    inLanguage: inLang(lang),
  };
}

/** Hub pages (services, insights, jurisdictions, cases) — a listed collection. */
export function collectionLd(args: {
  name: string;
  description: string;
  path: string;
  lang: Lang;
  items?: { name: string; path: string }[];
}) {
  const { name, description, path, lang, items } = args;
  return {
    "@type": "CollectionPage",
    "@id": `${abs(path, lang)}#page`,
    name,
    description,
    url: abs(path, lang),
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: inLang(lang),
    ...(items?.length
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((it, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: it.name,
              url: abs(it.path, lang),
            })),
          },
        }
      : {}),
  };
}

export function contactPageLd(lang: Lang) {
  return {
    "@type": "ContactPage",
    "@id": `${abs("/contact", lang)}#page`,
    url: abs("/contact", lang),
    isPartOf: { "@id": WEBSITE_ID },
    about: orgRef(),
    inLanguage: inLang(lang),
  };
}

export function aboutPageLd(lang: Lang) {
  return {
    "@type": "AboutPage",
    "@id": `${abs("/about", lang)}#page`,
    url: abs("/about", lang),
    isPartOf: { "@id": WEBSITE_ID },
    about: orgRef(),
    inLanguage: inLang(lang),
  };
}
