import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { StepperBankingFirst } from "../components/StepperBankingFirst";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { CaseCard } from "../components/CaseCard";
import { ArticleCard } from "../components/ArticleCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { Avatar } from "../components/Avatar";
import { NotFound } from "../pages/NotFound";
import { getService } from "../content/services";
import { productsByCategory } from "../content/products";
import { getExpert } from "../content/experts";
import { relatedCases, relatedArticles } from "../content/index";
import { Seo } from "../components/Seo";

export default function ServiceTemplate() {
  const { line } = useParams();
  const s = getService(line || "");
  if (!s) return <NotFound />;
  const expert = getExpert(s.leadExpert);
  const cases = relatedCases({ services: [s.slug], limit: 2 });
  const guides = relatedArticles({ services: [s.slug], limit: 3 });
  const lineProducts = productsByCategory(s.slug);

  return (
    <>
      <Seo
        title={`${s.line} — WTP`}
        description={s.subhead}
        canonical={`/services/${s.slug}`}
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.line }]} />
        <Eyebrow>{s.line} · {s.tierRange}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {s.outcomeHeadline}
        </h1>
        <p className="lead">{s.subhead}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 28, flexWrap: "wrap" }}>
          <Button to="/contact">Book a pre-screen</Button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ink-55)", fontSize: 14 }}>
            <Avatar expert={expert} size={32} /> Led by {expert.name}, {expert.title}
          </div>
        </div>
      </Section>

      {/* Problem */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>The problem</Eyebrow>
          <p style={{ fontSize: 20, color: "var(--ink)", marginTop: 18, lineHeight: 1.6 }}>{s.problem}</p>
        </div>
      </Section>

      {/* Banking-first context strip */}
      <Section>
        <Eyebrow>Where this sits</Eyebrow>
        <h2 style={{ fontSize: "clamp(22px,3vw,32px)", margin: "16px 0 28px" }} className="h-grad">
          Step {s.bankingFirstStep} of the banking-first sequence
        </h2>
        <StepperBankingFirst current={s.bankingFirstStep} />
      </Section>

      {/* How it works */}
      <Section>
        <Eyebrow>How it works</Eyebrow>
        <div className="grid-3" style={{ marginTop: 24 }}>
          {s.steps.map((st, i) => (
            <div key={i} className="card" style={{ padding: 22 }}>
              <div className="g" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, marginBottom: 10 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 6 }}>{st.title}</div>
              <p style={{ fontSize: 14, color: "var(--ink-55)" }}>{st.outcome}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Deliverables + tiers */}
      <Section>
        <div className="grid-2">
          <div>
            <Eyebrow>What you get</Eyebrow>
            <ul style={{ marginTop: 18, listStyle: "none", padding: 0 }}>
              {s.deliverables.map((d, i) => (
                <li key={i} style={{ padding: "11px 0", borderBottom: "1px solid var(--line)", display: "flex", gap: 10, fontSize: 15.5 }}>
                  <span style={{ color: "var(--gold)" }}>→</span> {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Service tiers</Eyebrow>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
              {s.tiers.map((t) => (
                <div key={t.tier} className="card" style={{ padding: 18 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                    <span className="chip">{t.tier}</span>
                    <span style={{ fontWeight: 700, fontFamily: "var(--font-display)" }}>{t.label}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--ink-55)" }}>{t.includes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Products in this line */}
      {lineProducts.length > 0 && (
        <Section>
          <Eyebrow>Products in {s.line}</Eyebrow>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", margin: "16px 0 28px" }} className="h-grad">
            What you can do here
          </h2>
          <div className="grid-3">
            {lineProducts.map((p) => (
              <Link key={p.slug} to={p.href} className="card" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                  {p.displayName}
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-55)", marginBottom: 18, lineHeight: 1.55 }}>{p.oneLiner}</p>
                <span style={{ marginTop: "auto", color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600 }}>
                  Explore <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Proof */}
      {cases.length > 0 && (
        <Section>
          <Eyebrow>Proof</Eyebrow>
          <div className="grid-2" style={{ marginTop: 24 }}>
            {cases.map((c) => (
              <CaseCard key={c.slug} case={c} />
            ))}
          </div>
        </Section>
      )}

      {/* Meet your expert */}
      <Section>
        <Eyebrow>Meet your expert</Eyebrow>
        <div style={{ marginTop: 24, maxWidth: 440 }}>
          <ExpertBioCard expert={expert} />
        </div>
      </Section>

      {/* Related guides */}
      {guides.length > 0 && (
        <Section>
          <Eyebrow>Related guides</Eyebrow>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {guides.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section>
        <Eyebrow>FAQ</Eyebrow>
        <div style={{ marginTop: 24, maxWidth: 760 }}>
          {s.faqs.map((f, i) => (
            <details key={i} style={{ borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 16.5, fontFamily: "var(--font-display)" }}>{f.q}</summary>
              <p style={{ marginTop: 10, color: "var(--ink-70)", fontSize: 15 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <PreScreenCTABlock expert={s.leadExpert} />
    </>
  );
}
