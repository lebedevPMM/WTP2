import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow, Button, Chip } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { packages } from "../content/packages";
import { getProduct } from "../content/products";
import { Seo } from "../components/Seo";

export default function PackagesPage() {
  return (
    <>
      <Seo
        title="Packages — WTP"
        description="Four engagement levels — from a diagnostic read of your situation to long-term governance of the whole structure. Each level sets up the next."
        canonical="/packages"
      />
      {/* Hero */}
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Packages" }]} />
        <Eyebrow>Packages</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          Four levels, <span className="g">one back office</span>
        </h1>
        <p className="lead">
          Individual products combine into four engagement levels — from a diagnostic read of your
          situation to long-term governance of the whole structure. Each level sets up the next.
        </p>
        <div style={{ marginTop: 28 }}>
          <Button to="/banking-first/pre-screen" large>Start with a pre-screen</Button>
        </div>
      </Section>

      {/* The ladder */}
      <Section>
        <Eyebrow>The journey</Eyebrow>
        <h2 style={{ fontSize: "clamp(24px,3.2vw,36px)", margin: "16px 0 28px" }} className="h-grad">
          Advisory → Entry → Setup → Control
        </h2>
        <div className="grid-4">
          {packages.map((pkg) => (
            <div key={pkg.level} className="card" style={{ padding: 26, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Chip>{pkg.level}</Chip>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>{pkg.name}</span>
              </div>
              <p style={{ fontSize: 15.5, color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.45, marginBottom: 16 }}>
                {pkg.tagline}
              </p>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink-55)", marginBottom: 6 }}>For whom</div>
                <p style={{ fontSize: 14, color: "var(--ink-70)", lineHeight: 1.55 }}>{pkg.forWhom}</p>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink-55)", marginBottom: 8 }}>Included products</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {pkg.includedProducts.map((slug) => {
                    const prod = getProduct(slug);
                    if (!prod) return null;
                    return (
                      <Link key={slug} to={prod.href} className="chip" style={{ fontSize: 13 }}>
                        {prod.displayName}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {pkg.alsoIncludes.length > 0 && (
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                  {pkg.alsoIncludes.map((a, i) => (
                    <li key={i} style={{ fontSize: 13.5, color: "var(--ink-55)", padding: "4px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--gold)" }}>+</span> {a}
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink-55)", marginBottom: 8 }}>You walk away with</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {pkg.results.map((r, i) => (
                    <li key={i} style={{ fontSize: 13.5, color: "var(--ink-70)", padding: "5px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--gold)" }}>✓</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How they connect */}
      <Section>
        <div style={{ padding: "40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)" }}>
          <Eyebrow>How the levels connect</Eyebrow>
          <p className="muted" style={{ fontSize: 17, maxWidth: 640, marginTop: 14 }}>
            The levels are a sequence, not a menu. Most clients start with a diagnostic, clear the
            banking gate, then add company, assets and governance as the structure grows — in that order.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22, alignItems: "center" }}>
            {packages.map((pkg, i) => (
              <span key={pkg.level} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                <span className="chip" style={{ padding: "8px 16px" }}>{pkg.level} · {pkg.name}</span>
                {i < packages.length - 1 && <ArrowRight size={16} style={{ color: "var(--gold)" }} />}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <PreScreenCTABlock expert="oleg" />
    </>
  );
}
