import { useEffect } from "react";
import { useLang, localize, stripLang } from "../i18n/lang";
import { organizationLd, webSiteLd } from "../lib/schema";

// Per-route SEO: sets document.title + upserts <meta>/<link rel=canonical>/hreflang/JSON-LD into <head>.
// React 19 can hoist native <title>/<meta>, but the static index.html <title> would duplicate it
// (browsers keep the first), so per-route titles could be ignored. Setting document.title
// imperatively is unambiguous and version-proof. This is a client-rendered SPA, so the tags serve
// JS-executing crawlers (Googlebot renders the page); non-JS crawlers fall back to prerendered HTML.
//
// i18n: pages pass `canonical` as the EN path ("/services"). This component derives the self-referencing
// canonical for the active language and emits en↔ru hreflang alternates + x-default, so a page renders
// the correct SEO signals whether it's served at "/services" or "/ru/services".

const SITE = "https://wtp.ae";

export interface SeoProps {
  title: string;
  description: string;
  canonical?: string; // EN path ("/x") or absolute URL; defaults to the current pathname (RU prefix stripped)
  ogType?: string; // "website" (default) | "article"
  image?: string; // absolute URL; omitted → twitter "summary" card, no og:image
  jsonLd?: object | object[];
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Alternate links share rel="alternate" but differ by hreflang, so key on hreflang.
function upsertAlternate(hreflang: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function Seo({ title, description, canonical, ogType = "website", image, jsonLd }: SeoProps) {
  const lang = useLang();
  // One @graph per page, always carrying the Organization and WebSite nodes. Page-level
  // nodes reference them by @id (worksFor / publisher / provider / isPartOf); a reference
  // whose target isn't declared on the same page is a dangling pointer, so the two root
  // nodes ship everywhere rather than living only on the homepage.
  const graph = [organizationLd(lang), webSiteLd(lang), ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [])];
  const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;

    // EN path is the shared key for both language variants of this route.
    const enPath = canonical
      ? canonical.startsWith("http")
        ? new URL(canonical).pathname
        : canonical
      : stripLang(window.location.pathname);
    const enUrl = SITE + enPath;
    const ruUrl = SITE + localize(enPath, "ru");
    const selfUrl = lang === "ru" ? ruUrl : enUrl;

    upsertMeta("name", "description", description);
    upsertLink("canonical", selfUrl);

    // hreflang cluster — both variants point at each other; x-default → EN.
    upsertAlternate("en", enUrl);
    upsertAlternate("ru", ruUrl);
    upsertAlternate("x-default", enUrl);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:url", selfUrl);
    upsertMeta("property", "og:site_name", "WTP");
    upsertMeta("property", "og:locale", lang === "ru" ? "ru_RU" : "en_US");

    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    }

    const id = "seo-jsonld";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (ld) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = id;
        document.head.appendChild(script);
      }
      script.textContent = ld;
    } else if (script) {
      script.remove();
    }
  }, [title, description, canonical, ogType, image, ld, lang]);

  return null;
}
