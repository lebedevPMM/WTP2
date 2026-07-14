import { L as Link } from "../i18n/lang";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `https://wtp.ae${c.href}` } : {}),
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
