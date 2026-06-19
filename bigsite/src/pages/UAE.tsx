import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { StatBar } from "../components/StatBar";
import { CaseCard } from "../components/CaseCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { relatedCases } from "../content/index";

const landscape = [
  {
    name: "Dubai",
    line: "The mainstream onshore base — broad licensing, deep talent, and the residency most HNWI families actually live on.",
  },
  {
    name: "ADGM",
    line: "Abu Dhabi's common-law financial centre — the structure of choice for funds, holding companies, and family offices.",
  },
  {
    name: "DIFC",
    line: "Dubai's common-law hub — English-law contracts, its own courts, and the address private banks take seriously.",
  },
];

export default function UAE() {
  const uaeCase = relatedCases({ jurisdictions: ["uae"], limit: 1 })[0];

  return (
    <>
      <Section className="page-hero">
        <Breadcrumb
          trail={[
            { label: "Home", href: "/" },
            { label: "Jurisdictions", href: "/jurisdictions" },
            { label: "The UAE" },
          ]}
        />
        <Eyebrow>Jurisdiction</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          We read the UAE the way a <span className="g">private bank does</span> — then clear the account most applications stall on
        </h1>
        <p className="lead">
          The headline numbers are real — but the account is where most applications stall. We map the UAE the way a
          private bank reads it, then build a structure that clears compliance before you commit.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 28, flexWrap: "wrap" }}>
          <Button to="/contact">Book a pre-screen</Button>
        </div>
      </Section>

      {/* Why the UAE */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>What the UAE actually offers</Eyebrow>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", margin: "20px 0 16px" }} className="h-grad">
            One of the few places where <span className="g">tax, residency, and banking</span> can all line up
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            For internationally mobile families, the UAE pairs a zero personal income tax regime with a credible
            residency route and a banking sector that takes private wealth seriously. The catch is that none of it is
            automatic — the structure you set up determines whether the bank, the visa, and the tax position actually
            hold together. We sequence them so they do.
          </p>
        </div>
      </Section>

      {/* The landscape */}
      <Section>
        <Eyebrow>The landscape</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          One country, three very different bases
        </h2>
        <div className="grid-3">
          {landscape.map((l) => (
            <div key={l.name} className="card" style={{ padding: 22 }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 19,
                  marginBottom: 10,
                }}
              >
                {l.name}
              </div>
              <p style={{ fontSize: 14.5, color: "var(--ink-55)", lineHeight: 1.6 }}>{l.line}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Banking reality */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>Banking reality</Eyebrow>
          <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 16px" }} className="h-grad">
            The licence is easy. <span className="g">The account is the wall.</span>
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            Setting up a UAE company is fast. Getting it banked is not — banks decline a meaningful share of honest
            applications when the source of funds, the structure, or the residency story doesn't read cleanly. That's why
            we start with the bank, not the licence: we pre-screen against real compliance criteria first, then build the
            company and visa to match.
          </p>
        </div>
      </Section>

      {/* Key facts */}
      <Section>
        <Eyebrow>Key facts</Eyebrow>
        <div style={{ marginTop: 24 }}>
          <StatBar
            stats={[
              { value: "0%", label: "personal income tax", source: "UAE tax code" },
              { value: "9%", label: "corporate tax above AED 375K", source: "UAE CT, since 1 Jun 2023" },
              { value: "AED 2M", label: "Golden Visa investment from", source: "UAE Golden Visa" },
              { value: "183 days", label: "tax-residency certificate", source: "UAE TRC" },
            ]}
          />
        </div>
      </Section>

      {/* The 9% CT trap */}
      <Section>
        <Eyebrow>Watch this</Eyebrow>
        <div className="card" style={{ padding: 32, maxWidth: 760, marginTop: 24 }}>
          <h2 style={{ fontSize: "clamp(22px,3vw,30px)", marginBottom: 14 }} className="h-grad">
            The 9% corporate-tax trap
          </h2>
          <p style={{ fontSize: 16.5, color: "var(--ink-70)", lineHeight: 1.65 }}>
            "Zero income tax" is true for individuals — but route your earnings through a company and a different rule
            applies: profit above the threshold is taxed as corporate income. Set the structure up badly and you can
            convert genuinely tax-free personal income into taxable corporate profit. The fix is to decide what should
            sit inside a company and what should stay personal <em>before</em> you incorporate, not after. That call is
            part of the pre-screen.
          </p>
        </div>
      </Section>

      {/* Case */}
      {uaeCase && (
        <Section>
          <Eyebrow>Proof</Eyebrow>
          <div className="grid-3" style={{ marginTop: 24 }}>
            <CaseCard case={uaeCase} />
          </div>
        </Section>
      )}

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
