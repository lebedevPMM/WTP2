import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { getExpert } from "../content/experts";

const CHECKS: { title: string; body: string }[] = [
  {
    title: "Source of funds",
    body: "Where the money came from, and whether the story holds up to a compliance officer. This is the first thing a bank reads — and the first place honest applicants get stuck.",
  },
  {
    title: "Structure",
    body: "How your company, ownership and signatories are arranged. A licence built the wrong way looks unbankable before you ever walk in.",
  },
  {
    title: "Residency status",
    body: "Where you are tax-resident today and where you're heading. Banks weigh this against the profile they're allowed to onboard.",
  },
  {
    title: "Profile fit",
    body: "Which banks can actually say yes to someone like you. We map you to the institutions that onboard your profile — not the ones that quietly won't.",
  },
];

const FORMAT: { title: string; body: string }[] = [
  {
    title: "You talk to a named expert",
    body: "A 15-minute call with the person who runs banking, not a sales desk. Honest questions, honest answers.",
  },
  {
    title: "We read your real situation",
    body: "Funds, structure, residency and timeline — against what banks can and can't approve right now.",
  },
  {
    title: "You get the Banking Roadmap",
    body: "Within 5–7 days, a realistic written assessment of where you stand and what to fix before you apply.",
  },
];

const ROADMAP: string[] = [
  "An honest read on whether your profile is bankable as it stands today",
  "The specific banks that fit your profile — and the ones to skip",
  "What in your source-of-funds story or structure needs fixing first",
  "The right sequence: bank, company, visa, assets — in that order",
  "A realistic timeline, with no promises a bank can later break",
];

export default function PreScreen() {
  const oleg = getExpert("oleg");

  return (
    <>
      {/* Hero */}
      <Section className="page-hero">
        <Breadcrumb
          trail={[
            { label: "Home", href: "/" },
            { label: "Banking-First", href: "/banking-first" },
            { label: "The Pre-Screen" },
          ]}
        />
        <Eyebrow>The pre-screen</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          What actually matters <span className="g">before you apply</span>
        </h1>
        <p className="lead">
          Most advisors set up the company and hope the bank says yes. We read your real situation
          first — funds, structure, residency — so you walk in already bankable, not hoping.
        </p>
        <div style={{ marginTop: 28 }}>
          <Button to="/contact" large>
            Book a 15-minute pre-screen
          </Button>
        </div>
      </Section>

      {/* What a pre-screen checks */}
      <Section>
        <Eyebrow>What a pre-screen checks</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          Four things a bank decides on before you open an account
        </h2>
        <div className="grid-4">
          {CHECKS.map((c) => (
            <div key={c.title} className="card" style={{ padding: 22, display: "flex", flexDirection: "column" }}>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 8 }}>
                {c.title}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-55)" }}>{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why banks decline */}
      <Section>
        <div style={{ padding: "40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)", maxWidth: 860 }}>
          <Eyebrow>Why banks decline</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3.2vw,36px)", margin: "16px 0 14px" }} className="h-grad">
            <span className="g">~30%</span> of honest applications get declined
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            Not because anything is wrong with the applicant — but because the source-of-funds story, the
            structure or the chosen bank didn't fit. Almost all of it is avoidable if you catch it before you
            apply. That's the entire point of the pre-screen.
          </p>
        </div>
      </Section>

      {/* The 15-minute format */}
      <Section>
        <Eyebrow>The 15-minute format</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 8px" }} className="h-grad">
          Fifteen minutes in. A Banking Roadmap out.
        </h2>
        <p className="muted" style={{ fontSize: 16, maxWidth: 620, marginBottom: 32 }}>
          The call is short on purpose. The written Banking Roadmap follows within 5–7 days.
        </p>
        <div className="grid-3">
          {FORMAT.map((f, i) => (
            <div key={i} className="card" style={{ padding: 22 }}>
              <div className="g" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, marginBottom: 10 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 6 }}>
                {f.title}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-55)" }}>{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What you get — the Banking Roadmap */}
      <Section>
        <div className="grid-2" style={{ alignItems: "start" }}>
          <div style={{ maxWidth: 460 }}>
            <Eyebrow>What you get</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,3.2vw,34px)", margin: "16px 0 14px" }} className="h-grad">
              The Banking Roadmap
            </h2>
            <p className="muted" style={{ fontSize: 16 }}>
              A short, written assessment you can act on — whether you work with us or not. No obligation, no
              pressure, no fabricated promises.
            </p>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {ROADMAP.map((d, i) => (
                <li
                  key={i}
                  style={{
                    padding: "12px 0",
                    borderBottom: i < ROADMAP.length - 1 ? "1px solid var(--line)" : "none",
                    display: "flex",
                    gap: 10,
                    fontSize: 15.5,
                    color: "var(--ink-70)",
                  }}
                >
                  <span style={{ color: "var(--gold)" }}>→</span> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Who runs it */}
      <Section>
        <Eyebrow>Who runs it</Eyebrow>
        <h2 style={{ fontSize: "clamp(24px,3.2vw,34px)", margin: "16px 0 24px" }} className="h-grad">
          A named expert, not a sales desk
        </h2>
        <div style={{ maxWidth: 440 }}>
          <ExpertBioCard expert={oleg} />
        </div>
      </Section>

      <PreScreenCTABlock expert="oleg" />
    </>
  );
}
