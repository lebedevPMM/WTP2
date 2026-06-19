import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Hero } from "../components/Hero";
import { Section, Eyebrow, Button } from "../components/ui";
import { StatBar } from "../components/StatBar";
import { StepperBankingFirst } from "../components/StepperBankingFirst";
import { CaseCard } from "../components/CaseCard";
import { ArticleCard } from "../components/ArticleCard";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { services } from "../content/services";
import { expertList } from "../content/experts";
import { latestCases, latestArticles } from "../content/index";

const segments = [
  { label: "UK non-dom", href: "/who-we-help/uk-non-dom" },
  { label: "DACH exit-tax", href: "/who-we-help/dach-exit-tax" },
  { label: "NL Box 3", href: "/who-we-help/nl-box3" },
  { label: "For partners", href: "/partners" },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Proof bar — provenance on every number (SPEC law #5). Confirmed mandate stats. */}
      <Section>
        <StatBar
          stats={[
            { value: "100+", label: "UAE accounts opened", source: "WTP track record" },
            { value: "90%+", label: "of pre-screened cases reach a working account", source: "WTP pre-screen data" },
            { value: "7+", label: "UAE banks we work across", source: "WTP banking desk" },
            { value: "3 days–1 wk", label: "to a personal account once approved", source: "typical timeline" },
          ]}
        />
      </Section>

      {/* The banking wall */}
      <Section className="section" >
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>The banking wall</Eyebrow>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", margin: "20px 0 16px" }} className="h-grad">
            Everyone tells you to set up a company first. <span className="g">Then the bank says no.</span>
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            The hard step isn't the licence — it's the account. We start where everyone else gets stuck, and build the
            structure to be bankable from day one.
          </p>
        </div>
      </Section>

      {/* The 4 services */}
      <Section>
        <Eyebrow>What we do</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          Four lines, one accountable team
        </h2>
        <div className="grid-4">
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="card" style={{ padding: 22, display: "flex", flexDirection: "column" }}>
              <span className="chip" style={{ alignSelf: "flex-start", marginBottom: 14 }}>
                {s.tierRange}
              </span>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.line}</div>
              <p style={{ fontSize: 14, color: "var(--ink-55)", marginBottom: 18 }}>{s.outcomeHeadline}</p>
              <span style={{ marginTop: "auto", color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600 }}>
                Explore <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Banking-First explainer */}
      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <Eyebrow>The methodology</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", marginTop: 16 }} className="h-grad">
              Bank → Company → Visa → Assets
            </h2>
          </div>
          <Button to="/banking-first" ghost>
            How the methodology works
          </Button>
        </div>
        <StepperBankingFirst />
      </Section>

      {/* Cases teaser */}
      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <Eyebrow>Proof</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", marginTop: 16 }} className="h-grad">
              Closed mandates
            </h2>
          </div>
          <Button to="/cases" ghost>
            All cases
          </Button>
        </div>
        <div className="grid-3">
          {latestCases(3).map((c) => (
            <CaseCard key={c.slug} case={c} />
          ))}
        </div>
      </Section>

      {/* Insights teaser */}
      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <Eyebrow>Insights</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", marginTop: 16 }} className="h-grad">
              Practical guides, signed by the expert
            </h2>
          </div>
          <Button to="/insights" ghost>
            All guides
          </Button>
        </div>
        <div className="grid-3">
          {latestArticles(3).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>

      {/* Team / authority band */}
      <Section>
        <Eyebrow>Real people, named, accountable</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          Meet the experts
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

      {/* Who we help strip */}
      <Section>
        <div style={{ padding: "40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)" }}>
          <Eyebrow>Who we help</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
            {segments.map((s) => (
              <Link key={s.href} to={s.href} className="chip" style={{ padding: "10px 18px", fontSize: 14 }}>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
