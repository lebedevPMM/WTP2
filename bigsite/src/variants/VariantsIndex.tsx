import { Link } from "react-router-dom";

// Internal review index for the design-variant round (2026-06-12).
// Not linked from the site nav — direct URL only.

const rows = [
  { href: "/", title: "Current — production", note: "Deep navy · terrain scroll-video hero · Inter Tight" },
  { href: "/?theme=v1", title: "Site in V1 — The Private Ledger", note: "ВЕСЬ сайт в теме: warm paper editorial · Fraunces · oxblood. Свитчер внизу слева" },
  { href: "/?theme=v2", title: "Site in V2 — The Control Room", note: "ВЕСЬ сайт в теме: graphite Swiss-technical · Archivo + Plex Mono · signal amber" },
  { href: "/?theme=v3", title: "Site in V3 — Midnight Route", note: "ВЕСЬ сайт в теме: dark luxury 2.0 · Cormorant · refined gold · grain" },
  { href: "/?theme=v4", title: "Site in V4 — Daylight Route", note: "Светлая редакция V3: гравюра-рельеф в хиро (инверсия) · bronze ink · тот же спайн" },
  { href: "/v1", title: "Concept /v1 — Ledger landing", note: "Standalone-концепт направления: broadsheet masthead + fee ledger" },
  { href: "/v2", title: "Concept /v2 — Control landing", note: "Standalone-концепт: pre-screen console + route diagram" },
  { href: "/v3", title: "Concept /v3 — Midnight landing", note: "Standalone-концепт: gold route spine + video hero 2.0" },
];

export default function VariantsIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#101013", color: "#ECEAE4", fontFamily: "Georgia, serif", padding: "9vh 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5 }}>WTP — design round</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", margin: "12px 0 40px", fontWeight: 400 }}>Landing variants, 2026-06-12</h1>
        {rows.map((r) => (
          <Link
            key={r.href}
            to={r.href}
            style={{
              display: "block",
              padding: "22px 4px",
              borderTop: "1px solid rgba(236,234,228,.18)",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
              <span style={{ fontSize: 22 }}>{r.title}</span>
              <span style={{ fontSize: 13, opacity: 0.55 }}>{r.href}</span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 14, opacity: 0.6 }}>{r.note}</p>
          </Link>
        ))}
        <div style={{ borderTop: "1px solid rgba(236,234,228,.18)" }} />
      </div>
    </div>
  );
}
