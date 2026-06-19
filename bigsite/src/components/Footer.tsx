import { Link } from "react-router-dom";
import { Button } from "./ui";
import { expertList } from "../content/experts";
import { site } from "../lib/site";

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Banking", href: "/services/banking" },
      { label: "Business Setup", href: "/services/business-setup" },
      { label: "Residency & Visa", href: "/services/residency-visa" },
      { label: "Assets & Wealth", href: "/services/assets-wealth" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Banking-First Methodology", href: "/banking-first" },
      { label: "Jurisdictions", href: "/jurisdictions" },
      { label: "Insights / Guides", href: "/insights" },
      { label: "Cases & Results", href: "/cases" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team & Experts", href: "/about/team" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--deep-2)", paddingTop: 64 }}>
      <div className="wrap">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 32, paddingBottom: 48 }}>
          {cols.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: 16, fontWeight: 700 }}>
                {col.title}
              </div>
              {col.links.map((l) => (
                <Link key={l.href} to={l.href} style={{ display: "block", marginBottom: 11, fontSize: 14, color: "var(--ink-70)" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: 16, fontWeight: 700 }}>
              Experts
            </div>
            {expertList.map((e) => (
              <Link key={e.id} to="/about/team" style={{ display: "block", marginBottom: 11, fontSize: 14, color: "var(--ink-70)" }}>
                {e.name} — {e.title}
              </Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: 16, fontWeight: 700 }}>
              Get started
            </div>
            <Link to="/contact" style={{ display: "block", marginBottom: 11, fontSize: 14, color: "var(--gold)", fontWeight: 600 }}>
              Book a pre-screen
            </Link>
            <a href={`mailto:${site.email}`} style={{ display: "block", marginBottom: 11, fontSize: 14, color: "var(--ink-70)" }}>{site.email}</a>
            <a href={site.phoneHref} style={{ display: "block", marginBottom: 11, fontSize: 14, color: "var(--ink-70)" }}>{site.phone}</a>
            <div style={{ display: "flex", gap: 14, marginBottom: 11 }}>
              <a href={site.telegram} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: "var(--ink-70)" }}>Telegram</a>
              <a href={site.whatsapp} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: "var(--ink-70)" }}>WhatsApp</a>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--ink-55)" }}>{site.office}</div>
          </div>
        </div>

        <div className="footer-cta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, padding: "28px 0", borderTop: "1px solid var(--line)" }}>
          <div>
            <img src="/logo-mark.svg" alt="WTP" style={{ height: 40, marginBottom: 12, display: "block" }} />
            <p style={{ fontSize: 13.5, color: "var(--ink-55)", maxWidth: 380 }}>
              Banking-first back office for private wealth. We deliver bankable structures, not company setups.
            </p>
          </div>
          <Button to="/contact">Book a pre-screen</Button>
        </div>

        <div style={{ padding: "22px 0 14px", borderTop: "1px solid var(--line)", display: "flex", flexWrap: "wrap", gap: "10px 22px", alignItems: "center", fontSize: 12.5, color: "var(--ink-40)" }}>
          <span>© {new Date().getFullYear()} WTP</span>
          <Link to="/legal/privacy">Privacy</Link>
          <Link to="/legal/terms">Terms</Link>
          <Link to="/legal/cookies">Cookies</Link>
          <Link to="/legal/disclaimer">Disclaimer</Link>
          <Link to="/legal/regulatory">Regulatory</Link>
          <span style={{ maxWidth: 620, lineHeight: 1.5 }}>
            WTP provides advisory and facilitation services; not regulated investment, tax, or legal advice unless explicitly stated.
          </span>
        </div>

        <div style={{ padding: "0 0 38px", fontSize: 11, color: "var(--ink-40)", lineHeight: 1.6, maxWidth: 820 }}>
          WTP is a brand of ILEGAL CONSULTANCY CO. L.L.C (management consultancy · licence 1162594) and Wellcome to
          Paradise Real Estate Brokers L.L.C (ORN 35551 · licence 1181286) — Dubai Media City, Arenco Tower, Office 1207.
        </div>
      </div>
    </footer>
  );
}
