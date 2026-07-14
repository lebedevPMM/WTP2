import { L as Link, useLang } from "../i18n/lang";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { ArticleCard } from "../components/ArticleCard";
import { Avatar } from "../components/Avatar";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import type { Category } from "../content/articles";
import { useContent } from "../content/i18n";

export default function InsightsHub() {
  const c = useContent();
  const lang = useLang();
  const featured = c.articles.find((a) => a.featured) ?? c.latestArticles(1)[0];
  const rest = c.articles.filter((a) => a.slug !== featured?.slug);
  const categories = Object.entries(c.categoryLabel) as [Category, string][];
  // The rail is "Written by our experts" — show only experts who have actually authored a guide.
  const authorIds = new Set(c.articles.map((a) => a.author));
  const authors = c.expertList.filter((e) => authorIds.has(e.id));

  const t = lang === "ru"
    ? {
        seoTitle: "Аналитика — WTP",
        seoDescription:
          "Практические гайды по банкингу в ОАЭ, резидентству, регистрации компании и налогам — каждый написан и подписан конкретным экспертом WTP, который этим занимается.",
        crumbHome: "Главная",
        crumbInsights: "Аналитика",
        eyebrowInsights: "Аналитика",
        h1a: "Практические гайды, ",
        h1b: "подписанные экспертом",
        lead:
          "Короткие, полезные материалы по банкингу, резидентству, регистрации и налогам — каждый написан и подписан конкретным экспертом, который этим занимается. Без воды и анонимного контент-маркетинга.",
        eyebrowFeatured: "Избранное",
        eyebrowBrowse: "По темам",
        eyebrowAllGuides: "Все гайды",
        eyebrowWrittenBy: "Пишут наши эксперты",
      }
    : {
        seoTitle: "Insights — WTP",
        seoDescription:
          "Practical guides on UAE banking, residency, company setup and tax — each written and signed by the named WTP expert who handles it.",
        crumbHome: "Home",
        crumbInsights: "Insights",
        eyebrowInsights: "Insights",
        h1a: "Practical guides, ",
        h1b: "signed by the expert",
        lead:
          "Narrow, useful reads on banking, residency, setup and tax — each written and signed by the named expert who handles it. No filler, no anonymous content marketing.",
        eyebrowFeatured: "Featured",
        eyebrowBrowse: "Browse by topic",
        eyebrowAllGuides: "All guides",
        eyebrowWrittenBy: "Written by our experts",
      };

  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        canonical="/insights"
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.crumbHome, href: "/" }, { label: t.crumbInsights }]} />
        <Eyebrow>{t.eyebrowInsights}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.h1a}<span className="g">{t.h1b}</span>
        </h1>
        <p className="lead">
          {t.lead}
        </p>
      </Section>

      {/* Featured article */}
      {featured && (
        <Section>
          <Eyebrow>{t.eyebrowFeatured}</Eyebrow>
          <div style={{ marginTop: 24 }}>
            <ArticleCard article={featured} featured />
          </div>
        </Section>
      )}

      {/* Category filter bar */}
      <Section>
        <Eyebrow>{t.eyebrowBrowse}</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
          {categories.map(([cat, label]) => (
            <Link key={cat} to={`/insights/${cat}`} className="chip" style={{ padding: "10px 18px", fontSize: 14 }}>
              {label}
            </Link>
          ))}
        </div>
      </Section>

      {/* Article grid */}
      {rest.length > 0 && (
        <Section>
          <Eyebrow>{t.eyebrowAllGuides}</Eyebrow>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      {/* Author rail */}
      <Section>
        <Eyebrow>{t.eyebrowWrittenBy}</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 20 }}>
          {authors.map((e) => (
            <Link
              key={e.id}
              to="/about/team"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 11,
                padding: "10px 16px 10px 10px",
                borderRadius: 999,
                border: "1px solid var(--line)",
                background: "var(--deep-2)",
              }}
            >
              <Avatar expert={e} size={34} />
              <span style={{ fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>{e.name}</span>
                <span style={{ color: "var(--ink-55)" }}> · {e.title}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* The Pre-Screen lives in the nav and below — no in-list pitch (MESSAGE-SPEC: Insights CTA = none). */}
      <PreScreenCTABlock expert="olya" />
    </>
  );
}
