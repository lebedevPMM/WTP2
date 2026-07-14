import { useParams } from "react-router-dom";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { ArticleCard } from "../components/ArticleCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { NotFound } from "../pages/NotFound";
import { useContent } from "../content/i18n";
import { useLang } from "../i18n/lang";
import type { CaseStudy } from "../content/cases";

const blocks = (
  c: CaseStudy | undefined,
  t: { blockSituation: string; blockConstraint: string; blockAction: string },
) =>
  c
    ? [
        { label: t.blockSituation, text: c.situation },
        { label: t.blockConstraint, text: c.constraint },
        { label: t.blockAction, text: c.action },
      ]
    : [];

export default function CaseTemplate() {
  const lang = useLang();
  const content = useContent();
  const { slug } = useParams();
  const c = content.getCase(slug || "");
  if (!c) return <NotFound />;
  const expert = content.getExpert(c.leadExpert);
  const guides = content.relatedArticles({ services: c.services, segments: c.segments, limit: 3 });

  const t = lang === "ru"
    ? {
        crumbHome: "Главная",
        crumbCases: "Кейсы",
        // ВЫЧИТКА ОЛЕ: дисклеймер об иллюстративном/анонимизированном кейсе и неподтверждённых метриках — юридически значимая оговорка
        disclaimer: "Иллюстративный, анонимизированный мандат. Метрики будут подтверждены до запуска.",
        blockSituation: "Ситуация",
        blockConstraint: "Ограничение",
        blockAction: "Что мы сделали",
        outcome: "Результат",
        relatedGuides: "Похожие гайды",
      }
    : {
        crumbHome: "Home",
        crumbCases: "Cases",
        disclaimer: "Illustrative, anonymized mandate. Metrics to be confirmed before launch.",
        blockSituation: "Situation",
        blockConstraint: "Constraint",
        blockAction: "What we did",
        outcome: "Outcome",
        relatedGuides: "Related guides",
      };

  return (
    <>
      <Seo
        title={`${c.title} — WTP`}
        description={`${c.situationTag} — ${c.outcomeMetric}`}
        canonical={`/cases/${c.slug}`}
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.crumbHome, href: "/" }, { label: t.crumbCases, href: "/cases" }, { label: c.situationTag }]} />
        <span className="chip" style={{ marginBottom: 16 }}>{c.situationTag}</span>
        <h1 className="h-grad" style={{ fontSize: "clamp(30px,4.6vw,52px)", margin: "16px 0" }}>{c.title}</h1>
        {!c.verified && (
          <p style={{ fontSize: 12.5, color: "var(--ink-40)", marginTop: 8 }}>
            {t.disclaimer}
          </p>
        )}
      </Section>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 40 }} className="grid-2">
          <div>
            {blocks(c, t).map((b) => (
              <div key={b.label} style={{ marginBottom: 28 }}>
                <Eyebrow>{b.label}</Eyebrow>
                <p style={{ fontSize: 17, color: "var(--ink-70)", marginTop: 12, lineHeight: 1.65 }}>{b.text}</p>
              </div>
            ))}
            <div className="card" style={{ padding: 24, marginTop: 8 }}>
              <Eyebrow>{t.outcome}</Eyebrow>
              <div className="g" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, margin: "10px 0 4px" }}>
                {c.outcomeMetric}
              </div>
              <div style={{ color: "var(--ink-55)", fontSize: 14 }}>{c.timeframe}</div>
            </div>
          </div>
          <div>
            <ExpertBioCard expert={expert} />
          </div>
        </div>
      </Section>

      {guides.length > 0 && (
        <Section>
          <Eyebrow>{t.relatedGuides}</Eyebrow>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {guides.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      <PreScreenCTABlock expert={c.leadExpert} />
    </>
  );
}
