import { useParams } from "react-router-dom";
import { marked } from "marked";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { Byline } from "../components/Byline";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { ArticleCard } from "../components/ArticleCard";
import { CaseCard } from "../components/CaseCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { NotFound } from "../pages/NotFound";
import { getArticle, categoryLabel } from "../content/articles";
import { getExpert } from "../content/experts";
import { relatedArticles, relatedCases } from "../content/index";

export default function ArticleTemplate() {
  const { slug } = useParams();
  const a = getArticle(slug || "");
  if (!a) return <NotFound />;
  const author = getExpert(a.author);
  const moreGuides = relatedArticles({ category: a.category, limit: 3, exclude: a.slug });
  const cases = relatedCases({ services: a.services, jurisdictions: a.jurisdictions, limit: 1 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    author: { "@type": "Person", name: author.name, jobTitle: author.title },
    datePublished: a.date,
  };

  return (
    <>
      <Seo
        title={`${a.title} — WTP`}
        description={a.excerpt}
        canonical={`/insights/${a.category}/${a.slug}`}
        ogType="article"
      />
      <Section style={{}} className="page-hero">
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <Breadcrumb
            trail={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: categoryLabel[a.category], href: `/insights/${a.category}` },
              { label: a.title },
            ]}
          />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <h1 className="h-grad" style={{ fontSize: "clamp(28px,4.2vw,46px)", margin: "8px 0 22px" }}>{a.title}</h1>
          <Byline author={author} date={a.date} readMin={a.readMin} />
          <div className="prose" style={{ margin: "32px 0", maxWidth: "100%" }} dangerouslySetInnerHTML={{ __html: marked.parse(a.body) as string }} />
          <div style={{ marginTop: 40 }}>
            <ExpertBioCard expert={author} />
          </div>
        </div>
      </Section>

      {(moreGuides.length > 0 || cases.length > 0) && (
        <Section>
          <Eyebrow>Keep reading</Eyebrow>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {moreGuides.map((g) => (
              <ArticleCard key={g.slug} article={g} />
            ))}
            {cases.map((c) => (
              <CaseCard key={c.slug} case={c} />
            ))}
          </div>
        </Section>
      )}

      <PreScreenCTABlock expert={a.author} />
    </>
  );
}
