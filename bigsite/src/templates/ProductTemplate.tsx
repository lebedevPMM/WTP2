import { useParams, Link } from "react-router-dom";
import { Section, Eyebrow, Button, Chip } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { CaseCard } from "../components/CaseCard";
import { ArticleCard } from "../components/ArticleCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { Avatar } from "../components/Avatar";
import { NotFound } from "../pages/NotFound";
import { getProduct } from "../content/products";
import { getExpert } from "../content/experts";
import { relatedCases, relatedArticles } from "../content/index";
import { Seo } from "../components/Seo";

export default function ProductTemplate() {
  const { product } = useParams();
  const p = getProduct(product || "");
  if (!p) return <NotFound />;
  const expert = p.leadExpert ? getExpert(p.leadExpert) : undefined;
  const cases = relatedCases({ services: [p.slug, p.category], limit: 2 });
  const guides = relatedArticles({ services: [p.slug, p.category], limit: 3 });

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.displayName,
    serviceType: p.categoryName,
    description: p.oneLiner,
    provider: { "@type": "Organization", name: "WTP", url: "https://wtp.ae" },
    areaServed: "AE",
    url: `https://wtp.ae${p.href}`,
  };
  const faqLd = p.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: p.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <Seo
        title={`${p.displayName} — WTP`}
        description={p.oneLiner}
        canonical={p.href}
        jsonLd={faqLd ? [serviceLd, faqLd] : serviceLd}
      />
      {/* Hero */}
      <Section className="page-hero">
        <Breadcrumb
          trail={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: p.categoryName, href: p.category === "diagnostics" ? "/services" : `/services/${p.category}` },
            { label: p.displayName },
          ]}
        />
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Eyebrow>{p.categoryName}</Eyebrow>
          {p.category === "diagnostics" && <Chip>Start here</Chip>}
        </div>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {p.displayName}
        </h1>
        <p className="lead">{p.heroSubhead}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 28, flexWrap: "wrap" }}>
          <Button to="/banking-first/pre-screen" large>Check your bankability</Button>
          {expert && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ink-55)", fontSize: 14 }}>
              <Avatar expert={expert} size={32} /> Led by {expert.name}, {expert.title}
            </div>
          )}
        </div>
      </Section>

      {/* Problem */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>The problem</Eyebrow>
          <p style={{ fontSize: 20, color: "var(--ink)", marginTop: 18, lineHeight: 1.6 }}>{p.problem}</p>
        </div>
      </Section>

      {/* Solution */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>How we solve it</Eyebrow>
          <p style={{ fontSize: 18, color: "var(--ink-70)", marginTop: 18, lineHeight: 1.65 }}>{p.solution}</p>
        </div>
      </Section>

      {/* How it works — steps */}
      <Section>
        <Eyebrow>How it works</Eyebrow>
        <div className="grid-3" style={{ marginTop: 24 }}>
          {p.steps.map((st, i) => (
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

      {/* What's included / not included */}
      <Section>
        <div className="grid-2">
          <div>
            <Eyebrow>What's included</Eyebrow>
            <ul style={{ marginTop: 18, listStyle: "none", padding: 0 }}>
              {p.includes.map((d, i) => (
                <li key={i} style={{ padding: "11px 0", borderBottom: "1px solid var(--line)", display: "flex", gap: 10, fontSize: 15.5 }}>
                  <span style={{ color: "var(--gold)" }}>→</span> {d}
                </li>
              ))}
            </ul>
          </div>
          {p.notIncluded.length > 0 && (
            <div>
              <Eyebrow>What's not included</Eyebrow>
              <ul style={{ marginTop: 18, listStyle: "none", padding: 0 }}>
                {p.notIncluded.map((d, i) => (
                  <li key={i} style={{ padding: "11px 0", borderBottom: "1px solid var(--line)", display: "flex", gap: 10, fontSize: 15.5, color: "var(--ink-55)" }}>
                    <span style={{ opacity: 0.5 }}>—</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      {/* Timeline + requirements */}
      <Section>
        <div className="grid-2">
          <div className="card" style={{ padding: 24 }}>
            <Eyebrow>Timeline</Eyebrow>
            <p style={{ fontSize: 16.5, color: "var(--ink-70)", marginTop: 14, lineHeight: 1.6 }}>{p.timeline}</p>
          </div>
          {p.requirements.length > 0 && (
            <div className="card" style={{ padding: 24 }}>
              <Eyebrow>What we need from you</Eyebrow>
              <ul style={{ marginTop: 14, listStyle: "none", padding: 0 }}>
                {p.requirements.map((r, i) => (
                  <li key={i} style={{ padding: "8px 0", display: "flex", gap: 10, fontSize: 14.5, color: "var(--ink-70)" }}>
                    <span style={{ color: "var(--gold)" }}>·</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      {/* Service tiers (no prices) */}
      {p.tiers.length > 0 && (
        <Section>
          <Eyebrow>How we engage</Eyebrow>
          <div className="grid-2" style={{ marginTop: 18 }}>
            {p.tiers.map((t) => (
              <div key={t.tier} className="card" style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                  <span className="chip">{t.tier}</span>
                  <span style={{ fontWeight: 700, fontFamily: "var(--font-display)" }}>{t.label}</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-55)", lineHeight: 1.55 }}>{t.includes}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Where this sits in the packages */}
      {p.inPackages.length > 0 && (
        <Section>
          <div style={{ padding: "32px 40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)" }}>
            <Eyebrow>Part of a package</Eyebrow>
            <p className="muted" style={{ fontSize: 17, maxWidth: 620, marginTop: 14 }}>
              {p.displayName} is included in the {p.inPackages.join(", ")} engagement {p.inPackages.length > 1 ? "levels" : "level"}.
              Most clients reach it as part of a sequenced engagement, not as a one-off.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
              {p.inPackages.map((lvl) => (
                <Link key={lvl} to="/packages" className="chip" style={{ padding: "10px 18px", fontSize: 14 }}>
                  {lvl} package
                </Link>
              ))}
              <Link to="/packages" style={{ color: "var(--gold)", fontSize: 14, fontWeight: 600, alignSelf: "center" }}>
                Compare all packages →
              </Link>
            </div>
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

      {/* Expert */}
      {expert && (
        <Section>
          <Eyebrow>Meet your expert</Eyebrow>
          <div style={{ marginTop: 24, maxWidth: 440 }}>
            <ExpertBioCard expert={expert} />
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section>
        <Eyebrow>FAQ</Eyebrow>
        <div style={{ marginTop: 24, maxWidth: 760 }}>
          {p.faqs.map((f, i) => (
            <details key={i} style={{ borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 16.5, fontFamily: "var(--font-display)" }}>{f.q}</summary>
              <p style={{ marginTop: 10, color: "var(--ink-70)", fontSize: 15, lineHeight: 1.6 }}>{f.a}</p>
            </details>
          ))}
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

      <PreScreenCTABlock expert={p.leadExpert ?? "oleg"} />
    </>
  );
}
