import { Section, Eyebrow, Button } from "../components/ui";
import { ArticleCard } from "../components/ArticleCard";
import { Seo } from "../components/Seo";
import { useContent } from "../content/i18n";

export default function ThankYou() {
  const c = useContent();
  return (
    <>
      <Seo
        title="Pre-screen received — WTP"
        description="We've received your request. A named WTP expert will review your situation and reply within one business day."
        canonical="/thank-you"
      />
      <Section className="page-hero" style={{ textAlign: "center", paddingTop: 130 }}>
        <Eyebrow>Pre-screen received</Eyebrow>
        <h1 className="h-grad" style={{ margin: "18px 0" }}>Thank you — we've got it.</h1>
        <p className="lead" style={{ margin: "0 auto" }}>
          A named expert will review your situation and reply within one business day with next steps.
        </p>
        <div style={{ marginTop: 28 }}>
          <Button to="/insights" ghost>Read an insight meanwhile</Button>
        </div>
      </Section>

      <Section>
        <Eyebrow>While you wait</Eyebrow>
        <div className="grid-3" style={{ marginTop: 24 }}>
          {c.latestArticles(3).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>
    </>
  );
}
