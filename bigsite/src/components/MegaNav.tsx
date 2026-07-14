import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { L as Link } from "../i18n/lang";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui";
import { useContent } from "../content/i18n";

interface NavItem {
  label: string;
  href: string;
  mega?: boolean; // Services renders a grouped catalog panel
  children?: { label: string; href: string }[];
}

const NAV: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    mega: true,
    children: [
      { label: "Pre-Screen — start here", href: "/banking-first/pre-screen" },
      { label: "X-Ray — full audit", href: "/services/diagnostics/xray" },
      { label: "Banking & Capital", href: "/services/banking" },
      { label: "Business Setup", href: "/services/business-setup" },
      { label: "Residency & Mobility", href: "/services/residency-visa" },
      { label: "Wealth Structuring", href: "/services/assets-wealth" },
      { label: "Packages (L0–L3)", href: "/packages" },
      { label: "See all services", href: "/services" },
    ],
  },
  {
    label: "Banking-First",
    href: "/banking-first",
    children: [
      { label: "The Methodology", href: "/banking-first" },
      { label: "The Pre-Screen", href: "/banking-first/pre-screen" },
    ],
  },
  {
    label: "Jurisdictions",
    href: "/jurisdictions",
    children: [
      { label: "Overview & comparison", href: "/jurisdictions" },
      { label: "The UAE", href: "/jurisdictions/uae" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    children: [
      { label: "All guides", href: "/insights" },
      { label: "Banking", href: "/insights/banking" },
      { label: "Residency & Visa", href: "/insights/residency-visa" },
      { label: "Business Setup", href: "/insights/business-setup" },
      { label: "Assets & Tax", href: "/insights/assets-tax" },
      { label: "Cases & Results", href: "/cases" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our story", href: "/about" },
      { label: "Team & Experts", href: "/about/team" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const dropPanel: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  background: "rgba(13,11,34,.96)",
  backdropFilter: "blur(18px)",
  border: "1px solid var(--line)",
  borderRadius: 14,
  boxShadow: "0 24px 60px rgba(0,0,0,.5)",
};

// Stable id for a nav item's dropdown panel, so the trigger can aria-controls it.
const panelId = (label: string) => `meganav-panel-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;

function ServicesMega({ id }: { id?: string }) {
  const c = useContent();
  const diags = c.productsByCategory("diagnostics"); // Start Here rail = diagnostics only (pre-screen, x-ray)
  return (
    <div id={id} style={{ ...dropPanel, width: "min(720px, 92vw)", padding: 18 }}>
      {/* Start here rail */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        {diags.map((p) => (
          <Link
            key={p.slug}
            to={p.href}
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid var(--line)",
              background: "var(--deep-2, rgba(255,255,255,.03))",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
          >
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--gold)", marginBottom: 3 }}>
              Start here
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{p.displayName}</div>
          </Link>
        ))}
      </div>
      {/* Category columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4px 18px" }}>
        {c.categories.map((cat) => (
          <div key={cat.slug} style={{ padding: "8px 8px 12px" }}>
            <Link
              to={`/services/${cat.slug}`}
              style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)", marginBottom: 4 }}
            >
              {cat.name}
            </Link>
            {c.productsByCategory(cat.slug).map((p) => (
              <Link
                key={p.slug}
                to={p.href}
                style={{ display: "block", padding: "5px 0", fontSize: 13.5, color: "var(--ink-55)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-55)")}
              >
                {p.displayName}
              </Link>
            ))}
          </div>
        ))}
      </div>
      {/* Footer */}
      <div style={{ display: "flex", gap: 16, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
        <Link to="/packages" style={{ fontSize: 13.5, fontWeight: 600, color: "var(--gold)" }}>
          Compare packages (L0–L3) →
        </Link>
        <Link to="/services" style={{ fontSize: 13.5, color: "var(--ink-55)" }}>
          See all services
        </Link>
      </div>
    </div>
  );
}

export function MegaNav({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenItem(null);
  }, [loc.pathname]);

  const solid = scrolled || !transparent;

  return (
    <header
      className={`meganav-root ${solid ? "meganav-solid" : "meganav-transparent"}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background .25s ease, border-color .25s ease",
        background: solid ? "var(--nav-bg, rgba(8,7,26,.82))" : "transparent",
        backdropFilter: solid ? "blur(14px)" : "none",
        borderBottom: `1px solid ${solid ? "var(--line)" : "transparent"}`,
      }}
    >
      <div
        className="wrap"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo-wtp.png" alt="WTP" style={{ height: 34, display: "block" }} />
        </Link>

        <nav className="meganav-desktop" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV.map((item) => (
            <div
              key={item.label}
              className="meganav-item"
              onMouseEnter={() => setOpenItem(item.label)}
              onMouseLeave={() => setOpenItem(null)}
              onFocus={() => item.children && setOpenItem(item.label)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setOpenItem((cur) => (cur === item.label ? null : cur));
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpenItem(null);
              }}
              style={{ position: "relative" }}
            >
              <Link
                to={item.href}
                aria-haspopup={item.children ? true : undefined}
                aria-expanded={item.children ? openItem === item.label : undefined}
                aria-controls={item.children ? panelId(item.label) : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "10px 14px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--ink-70)",
                }}
              >
                {item.label}
                {item.children && <ChevronDown size={13} style={{ opacity: 0.6 }} />}
              </Link>
              {openItem === item.label &&
                (item.mega ? (
                  <ServicesMega id={panelId(item.label)} />
                ) : (
                  item.children && (
                    <div id={panelId(item.label)} style={{ ...dropPanel, minWidth: 230, padding: 8 }}>
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          to={c.href}
                          style={{
                            display: "block",
                            padding: "9px 12px",
                            borderRadius: 9,
                            fontSize: 14,
                            color: "var(--ink-70)",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--deep-3)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )
                ))}
            </div>
          ))}
        </nav>

        <div className="meganav-right" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-55)" }}>EN</span>
          <Button to="/contact">Request a pre-screen</Button>
        </div>

        <button
          className="meganav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="meganav-mobile-panel"
          onClick={() => setOpen((o) => !o)}
          style={{ display: "none", background: "none", border: "none", color: "var(--ink)", cursor: "pointer" }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          id="meganav-mobile-panel"
          className="meganav-mobile"
          style={{
            borderTop: "1px solid var(--line)",
            background: "rgba(8,7,26,.98)",
            backdropFilter: "blur(18px)",
            padding: "12px 20px 24px",
            maxHeight: "calc(100vh - 66px)",
            overflowY: "auto",
          }}
        >
          {NAV.map((item) => (
            <div key={item.label} style={{ borderBottom: "1px solid var(--line)", padding: "6px 0" }}>
              <Link to={item.href} style={{ display: "block", padding: "10px 0", fontWeight: 600, fontSize: 16 }}>
                {item.label}
              </Link>
              {item.children?.map((c) => (
                <Link key={c.href} to={c.href} style={{ display: "block", padding: "7px 0 7px 14px", fontSize: 14, color: "var(--ink-55)" }}>
                  {c.label}
                </Link>
              ))}
            </div>
          ))}
          <div style={{ marginTop: 18 }}>
            <Button to="/contact" large>Request a pre-screen</Button>
          </div>
        </div>
      )}
    </header>
  );
}
