import { L as Link, useLang, localize } from "../i18n/lang";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  const lang = useLang();
  // Pages pass EN paths; on /ru the visible links are localized by <L>, so the JSON-LD
  // has to be localized too — otherwise the RU breadcrumb trail points at EN URLs and
  // Google reads a cross-language hierarchy that doesn't match the page it's on.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://wtp.ae${localize(c.href, lang)}` } : {}),
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: "var(--ink-40)", marginBottom: 22 }}>
        <ol style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", listStyle: "none", margin: 0, padding: 0 }}>
          {trail.map((c, i) => (
            <li key={i} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              {c.href ? (
                <Link to={c.href} style={{ color: "var(--ink-55)" }}>
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" style={{ color: "var(--ink-70)" }}>{c.label}</span>
              )}
              {i < trail.length - 1 && <span aria-hidden="true" style={{ opacity: 0.5 }}>/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
