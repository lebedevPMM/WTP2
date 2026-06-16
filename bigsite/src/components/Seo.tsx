import { useEffect } from "react";

// Per-route SEO: sets document.title + upserts <meta>/<link rel=canonical>/JSON-LD into <head>.
// React 19 can hoist native <title>/<meta>, but the static index.html <title> would duplicate it
// (browsers keep the first), so per-route titles could be ignored. Setting document.title
// imperatively is unambiguous and version-proof. This is a client-rendered SPA, so the tags serve
// JS-executing crawlers (Googlebot renders the page); non-JS crawlers fall back to index.html.

const SITE = "https://wtp.ae";

export interface SeoProps {
  title: string;
  description: string;
  canonical?: string; // path ("/x") or absolute URL; defaults to the current pathname
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

export function Seo({ title, description, canonical, ogType = "website", image, jsonLd }: SeoProps) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    document.title = title;
    const url = canonical
      ? canonical.startsWith("http")
        ? canonical
        : SITE + canonical
      : SITE + window.location.pathname;

    upsertMeta("name", "description", description);
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", "WTP");

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
  }, [title, description, canonical, ogType, image, ld]);

  return null;
}
