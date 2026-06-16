import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { StepperBankingFirst } from "../components/StepperBankingFirst";
import { StatBar } from "../components/StatBar";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { expertList } from "../content/experts";

export default function About() {
  return (
    <>
      {/* Hero */}
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <Eyebrow>About</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          Why <span className="g">banking-first</span> exists
        </h1>
        <p className="lead">
          Most advisors register your company and disappear the moment the bank says no. We do the opposite — we start at
          the hardest step and build the rest of the structure around it.
        </p>
      </Section>

      {/* Origin */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>Why banking-first exists</Eyebrow>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", margin: "20px 0 16px" }} className="h-grad">
            Everyone optimises for the licence. <span className="g">The account is where it breaks.</span>
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            The standard playbook is to set up the company, collect the fee, and hand you a folder. Then you walk into a
            bank and discover the structure was never built to be bankable — and that is where most applications stall.
          </p>
          <p className="muted" style={{ fontSize: 18, marginTop: 16 }}>
            We flipped the order. We start where it is hardest, treat the account as the gate it actually is, and design
            the company, residency and assets to clear that gate from day one. Banking-first is not a slogan — it is the
            sequence that keeps the rest of the plan from collapsing.
          </p>
        </div>
      </Section>

      {/* How we work — operating contour */}
      <Section>
        <Eyebrow>How we work</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          Bank → Company → Visa → Assets
        </h2>
        <StepperBankingFirst />
      </Section>

      {/* Credibility strap */}
      <Section>
        <StatBar
          stats={[
            { value: "5–7 days", label: "to a Banking Roadmap", source: "L0 pre-screen" },
            { value: "4–8 wks", label: "typical full mandate", source: "WTP engagement model" },
            { value: "~30%", label: "of honest applications banks decline", source: "WTP pre-screen data" },
            { value: "0%", label: "personal income tax in the UAE", source: "UAE tax code" },
          ]}
        />
      </Section>

      {/* Experts teaser */}
      <Section>
        <Eyebrow>Real people, named, accountable</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          The team you actually deal with
        </h2>
        <div className="grid-3">
          {expertList.slice(0, 3).map((e) => (
            <ExpertBioCard key={e.id} expert={e} />
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <Button to="/about/team" ghost>
            All experts
          </Button>
        </div>
      </Section>

      {/* Partners teaser */}
      <Section>
        <div style={{ padding: "40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)", maxWidth: 760 }}>
          <Eyebrow>For partners</Eyebrow>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", margin: "16px 0 14px" }} className="h-grad">
            Family offices and B2B advisors
          </h2>
          <p className="muted" style={{ fontSize: 17, marginBottom: 24 }}>
            If you advise internationally mobile clients and keep hitting the banking wall, we run the part most firms can't. We work
            white-label alongside family offices, legal practices and wealth managers.
          </p>
          <Button to="/contact">Talk to us about partnering</Button>
        </div>
      </Section>

      <PreScreenCTABlock expert="ivan" />
    </>
  );
}
