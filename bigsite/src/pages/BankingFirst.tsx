import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { StepperBankingFirst } from "../components/StepperBankingFirst";
import { CaseCard } from "../components/CaseCard";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { getExpert } from "../content/experts";
import { latestCases } from "../content/index";

// The four service tiers, derived from services data — L0 pre-screen through
// L3 wealth structuring. Scope only; no fees rendered on-page.
const TIERS = [
  { tier: "L0", label: "Pre-screen", includes: "Bankability assessment + a Banking Roadmap in 5–7 days." },
  { tier: "L1", label: "Account opening", includes: "Full application, compliance prep, account opened with IBAN." },
  { tier: "L2", label: "Company & residency", includes: "Jurisdiction selection, formation, substance and standard residency." },
  { tier: "L3", label: "Wealth structuring", includes: "Golden Visa, real estate, investments and digital-asset structuring." },
];

export default function BankingFirst() {
  const ivan = getExpert("ivan");
  const proofCases = latestCases(2);

  return (
    <>
      {/* 1. Page hero */}
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Banking-First" }]} />
        <Eyebrow>The methodology</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          Why the bank is the <span className="g">hard step</span>
        </h1>
        <p className="lead">
          Everyone sells you the licence and the visa first. Then the account application stalls — and the whole structure
          is stuck. We invert the order: the bank goes first, and everything after is built to be bankable from day one.
        </p>
        <div style={{ marginTop: 28 }}>
          <Button to="/contact" large>
            Book a pre-screen
          </Button>
        </div>
      </Section>

      {/* 2. The 4-step sequence */}
      <Section>
        <Eyebrow>The sequence</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          Bank → Company → Visa → Assets
        </h2>
        <StepperBankingFirst />
      </Section>

      {/* 3. Why everyone else does it backwards */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>Why everyone else does it backwards</Eyebrow>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", margin: "20px 0 16px" }} className="h-grad">
            Company-first is how you end up <span className="g">unbanked.</span>
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            The standard playbook registers the entity, leases an office, files for the visa — and only then walks you to
            the bank. By that point the structure is fixed, and if it doesn't fit the bank's risk model, you're stuck.
            Roughly a third of honest applications are declined on the first pass. We treat the bank as the first, hardest
            gate and clear it before anything else is committed, so the company, the visa and the assets are all shaped to
            pass compliance — not to fight it.
          </p>
        </div>
      </Section>

      {/* 4. The Pre-Screen explainer strip */}
      <Section>
        <div
          style={{
            padding: "40px",
            borderRadius: 20,
            background: "var(--deep-2)",
            border: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <Eyebrow>The pre-screen</Eyebrow>
            <h2 style={{ fontSize: "clamp(22px,3vw,32px)", margin: "14px 0 10px" }} className="h-grad">
              We assess bankability before you spend a dirham
            </h2>
            <p className="muted" style={{ fontSize: 16 }}>
              In 5–7 days you get a Banking Roadmap: a named bank, a named officer, and an honest read on whether your
              file passes — or what to fix first.
            </p>
          </div>
          <Button to="/banking-first/pre-screen" ghost>
            How the pre-screen works
          </Button>
        </div>
      </Section>

      {/* 5. Service tiers L0–L3 */}
      <Section>
        <Eyebrow>What each tier covers</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          Four tiers, one accountable team
        </h2>
        <div className="grid-4">
          {TIERS.map((t) => (
            <div key={t.tier} className="card" style={{ padding: 22, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span className="chip">{t.tier}</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                {t.label}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-55)" }}>{t.includes}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Case proof */}
      {proofCases.length > 0 && (
        <Section>
          <Eyebrow>Proof</Eyebrow>
          <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 28px" }} className="h-grad">
            How the sequence plays out
          </h2>
          <div className="grid-2">
            {proofCases.map((c) => (
              <CaseCard key={c.slug} case={c} />
            ))}
          </div>
        </Section>
      )}

      {/* 7. Expert quote — Ivan, CEO */}
      <Section>
        <Eyebrow>Why we built it this way</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 28px" }} className="h-grad">
          Signed by the person accountable for it
        </h2>
        <div style={{ maxWidth: 440 }}>
          <ExpertBioCard expert={ivan} />
        </div>
      </Section>

      {/* 8. CTA */}
      <PreScreenCTABlock expert="oleg" />
    </>
  );
}
