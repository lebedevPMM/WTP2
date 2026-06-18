import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { JurisdictionComparisonTable } from "../components/JurisdictionComparisonTable";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { comparatorPages } from "../content/jurisdictions";
import { Seo } from "../components/Seo";

export default function JurisdictionsHub() {
  return (
    <>
      <Seo
        title="Jurisdictions — WTP"
        description="Five jurisdictions, one decision that decides the rest: can you actually open the account? Compared banking-first — on tax, access and speed."
        canonical="/jurisdictions"
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Jurisdictions" }]} />
        <Eyebrow>Jurisdictions</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          Five jurisdictions — judged on <span className="g">banking access first</span>
        </h1>
        <p className="lead">
          Five jurisdictions, one decision that decides the rest: can you actually open the account?
          We compare them banking-first — on tax, on access, and on how fast you're operational.
        </p>
        <div style={{ marginTop: 28 }}>
          <Button to="/contact">Book a pre-screen</Button>
        </div>
      </Section>

      {/* The comparison */}
      <Section>
        <Eyebrow>The comparison</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 28px" }} className="h-grad">
          Five jurisdictions, side by side
        </h2>
        <JurisdictionComparisonTable columns={["uae", "singapore", "portugal", "switzerland", "malta"]} />
        <p className="muted" style={{ fontSize: 14, marginTop: 16 }}>
          Exit-tax exposure depends entirely on your country of origin — we map yours on the pre-screen.
        </p>
      </Section>

      {/* UAE deep-dive teaser */}
      <Section>
        <div
          className="card"
          style={{
            padding: "40px",
            background: "linear-gradient(180deg, rgba(227,181,100,.06), var(--deep-2))",
          }}
        >
          <Eyebrow>Our home market</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3vw,36px)", margin: "16px 0 14px" }} className="h-grad">
            The UAE in depth
          </h2>
          <p className="muted" style={{ fontSize: 18, maxWidth: 640, marginBottom: 24 }}>
            Zero personal income tax, a 9% corporate rate above AED 375K, and Golden Visa routes from
            AED 2M. The hard part is the bank — and that's exactly where we start. See the full breakdown:
            tax, residency, banking and timeline.
          </p>
          <Button to="/jurisdictions/uae">The UAE in depth</Button>
        </div>
      </Section>

      {/* Comparator teasers */}
      <Section>
        <Eyebrow>Head-to-head</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 28px" }} className="h-grad">
          UAE versus the alternatives
        </h2>
        <div className="grid-3">
          {comparatorPages.map((p) => (
            <Link
              key={p.slug}
              to={`/jurisdictions/${p.slug}`}
              className="card"
              style={{ padding: 24, display: "flex", flexDirection: "column" }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>
                {p.title}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-55)", marginBottom: 18 }}>{p.whoSuits}</p>
              <span
                style={{
                  marginTop: "auto",
                  color: "var(--gold)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Compare <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
