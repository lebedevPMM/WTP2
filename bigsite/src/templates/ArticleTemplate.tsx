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
import { useContent } from "../content/i18n";
import { useLang } from "../i18n/lang";

export default function ArticleTemplate() {
  const lang = useLang();
  const c = useContent();
  const { slug } = useParams();
  const a = c.getArticle(slug || "");
  if (!a) return <NotFound />;
  const author = c.getExpert(a.author);
  const moreGuides = c.relatedArticles({ category: a.category, limit: 3, exclude: a.slug });
  const cases = c.relatedCases({ services: a.services, jurisdictions: a.jurisdictions, limit: 1 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    author: { "@type": "Person", name: author.name, jobTitle: author.title },
    datePublished: a.date,
  };

  const t = lang === "ru"
    ? {
        crumbHome: "Главная",
        crumbInsights: "Аналитика",
        keepReading: "Читайте также",
      }
    : {
        crumbHome: "Home",
        crumbInsights: "Insights",
        keepReading: "Keep reading",
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
              { label: t.crumbHome, href: "/" },
              { label: t.crumbInsights, href: "/insights" },
              { label: c.categoryLabel[a.category], href: `/insights/${a.category}` },
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
          <Eyebrow>{t.keepReading}</Eyebrow>
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
