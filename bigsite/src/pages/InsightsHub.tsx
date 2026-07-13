import { Link } from "react-router-dom";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { ArticleCard } from "../components/ArticleCard";
import { Avatar } from "../components/Avatar";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { articles, categoryLabel, type Category } from "../content/articles";
import { expertList } from "../content/experts";
import { latestArticles } from "../content/index";

export default function InsightsHub() {
  const featured = articles.find((a) => a.featured) ?? latestArticles(1)[0];
  const rest = articles.filter((a) => a.slug !== featured?.slug);
  const categories = Object.entries(categoryLabel) as [Category, string][];
  // The rail is "Written by our experts" — show only experts who have actually authored a guide.
  const authorIds = new Set(articles.map((a) => a.author));
  const authors = expertList.filter((e) => authorIds.has(e.id));

  return (
    <>
      <Seo
        title="Insights — WTP"
        description="Practical guides on UAE banking, residency, company setup and tax — each written and signed by the named WTP expert who handles it."
        canonical="/insights"
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Insights" }]} />
        <Eyebrow>Insights</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          Practical guides, <span className="g">signed by the expert</span>
        </h1>
        <p className="lead">
          Narrow, useful reads on banking, residency, setup and tax — each written and signed by the
          named expert who handles it. No filler, no anonymous content marketing.
        </p>
      </Section>

      {/* Featured article */}
      {featured && (
        <Section>
          <Eyebrow>Featured</Eyebrow>
          <div style={{ marginTop: 24 }}>
            <ArticleCard article={featured} featured />
          </div>
        </Section>
      )}

      {/* Category filter bar */}
      <Section>
        <Eyebrow>Browse by topic</Eyebrow>
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
          <Eyebrow>All guides</Eyebrow>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      {/* Author rail */}
      <Section>
        <Eyebrow>Written by our experts</Eyebrow>
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
