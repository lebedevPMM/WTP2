import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow, Button, Chip } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { services } from "../content/services";
import { productsByCategory } from "../content/products";
import { getExpert } from "../content/experts";
import { Seo } from "../components/Seo";

const diagnostics = productsByCategory("diagnostics");

const routerChips: { label: string; href: string }[] = [
  ...services.map((s) => ({ label: s.line, href: `/services/${s.slug}` })),
  { label: "Not sure — talk to us", href: "/contact" },
];

export default function ServicesOverview() {
  return (
    <>
      <Seo
        title="Services — WTP"
        description="The strengths we deploy for private clients — banking, business setup, residency and wealth — sequenced so the structure is bankable from day one."
        canonical="/services"
      />
      {/* Hero */}
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <Eyebrow>Services</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          Four lines, <span className="g">one accountable team</span>
        </h1>
        <p className="lead">
          The strengths we deploy for private clients — banking, business setup, residency and wealth —
          sequenced so the structure is bankable from day one, and used only where they fit. Each is led
          by a named expert, not a handoff queue.
        </p>
      </Section>

      {/* Start here — diagnostics axis */}
      {diagnostics.length > 0 && (
        <Section>
          <div style={{ padding: "36px 40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--gold-30, var(--line))" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Chip>Start here</Chip>
              <Eyebrow>Begin with a diagnostic</Eyebrow>
            </div>
            <p className="muted" style={{ fontSize: 17, maxWidth: 600, marginBottom: 24 }}>
              Before any service, we read your real situation — so you know where you stand before you
              spend a dirham. Two ways to start.
            </p>
            <div className="grid-2">
              {diagnostics.map((p) => (
                <Link key={p.slug} to={p.href} className="card" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, marginBottom: 8 }}>
                    {p.displayName}
                  </div>
                  <p style={{ fontSize: 14.5, color: "var(--ink-55)", marginBottom: 18, lineHeight: 1.55 }}>{p.oneLiner}</p>
                  <span style={{ marginTop: "auto", color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600 }}>
                    Start <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* The 4 services */}
      <Section>
        <Eyebrow>What we do</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          Pick the line that matches your next move
        </h2>
        <div className="grid-2">
          {services.map((s) => {
            const lead = getExpert(s.leadExpert);
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="card"
                style={{ padding: 30, display: "flex", flexDirection: "column" }}
              >
                <span className="chip" style={{ alignSelf: "flex-start", marginBottom: 16 }}>
                  {s.tierRange}
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 22,
                    marginBottom: 10,
                  }}
                >
                  {s.line}
                </div>
                <p
                  style={{
                    fontSize: 17,
                    color: "var(--ink)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}
                >
                  {s.outcomeHeadline}
                </p>
                <p style={{ fontSize: 14.5, color: "var(--ink-55)", marginBottom: 22, lineHeight: 1.6 }}>
                  {s.subhead}
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 13.5, color: "var(--ink-55)" }}>Led by {lead.name}</span>
                  <span
                    style={{
                      color: "var(--gold)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    Explore <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Where does my situation fit — router band */}
      <Section>
        <div
          style={{
            padding: "40px",
            borderRadius: 20,
            background: "var(--deep-2)",
            border: "1px solid var(--line)",
          }}
        >
          <Eyebrow>Where does my situation fit?</Eyebrow>
          <p className="muted" style={{ fontSize: 17, maxWidth: 560, marginTop: 14 }}>
            Most mandates start in one line and pull in the others. Jump to the one closest to your
            problem — or tell us where you stand and we'll route it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
            {routerChips.map((c) => (
              <Link
                key={c.href + c.label}
                to={c.href}
                className="chip"
                style={{ padding: "10px 18px", fontSize: 14 }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Banking-first reminder strip */}
      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ maxWidth: 620 }}>
            <Eyebrow>The methodology</Eyebrow>
            <h2 style={{ fontSize: "clamp(22px,3vw,32px)", margin: "16px 0 12px" }} className="h-grad">
              Bank first. <span className="g">Then everything else.</span>
            </h2>
            <p className="muted" style={{ fontSize: 17 }}>
              These four lines aren't a menu — they run in sequence. The bank is the hardest gate, so we
              clear it before the company, the visa or the assets.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button to="/banking-first" ghost>
              How the methodology works
            </Button>
            <Button to="/packages">See the four packages</Button>
          </div>
        </div>
      </Section>

      <PreScreenCTABlock expert="oleg" />
    </>
  );
}
