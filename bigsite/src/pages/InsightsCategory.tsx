import { useParams } from "react-router-dom";
import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { ArticleCard } from "../components/ArticleCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { NotFound } from "../pages/NotFound";
import { getExpert } from "../content/experts";
import type { ExpertId } from "../content/experts";
import {
  categoryLabel,
  articlesByCategory,
  type Category,
} from "../content/articles";

const leadByCategory: Record<Category, ExpertId> = {
  banking: "olya",
  "residency-visa": "olya",
  "business-setup": "olya",
  "assets-tax": "ilya",
};

const leadByCategoryText: Record<Category, string> = {
  banking:
    "How honest money actually clears a UAE bank — source-of-funds, structure, and the file that gets you through.",
  "residency-visa":
    "Residency and visa routes sequenced around your assets, not the other way round — so the structure underneath holds.",
  "business-setup":
    "Company formation done the bankable way — the right free zone, real substance, structure that survives compliance.",
  "assets-tax":
    "Where each kind of income sits when you relocate — and how to keep it taxed least, legally.",
};

export default function InsightsCategory() {
  const { category } = useParams();

  const isCategory = (c: string): c is Category =>
    Object.prototype.hasOwnProperty.call(categoryLabel, c);

  if (!category || !isCategory(category)) return <NotFound />;

  const label = categoryLabel[category];
  const leadId = leadByCategory[category];
  const expert = getExpert(leadId);
  const guides = articlesByCategory(category);

  return (
    <>
      <Section className="page-hero">
        <Breadcrumb
          trail={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label },
          ]}
        />
        <Eyebrow>Insights</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {label} <span className="g">guides</span>
        </h1>
        <p className="lead">{leadByCategoryText[category]}</p>
        <div style={{ marginTop: 28 }}>
          <Button to="/contact">Book a pre-screen</Button>
        </div>
      </Section>

      {/* Category lead expert */}
      <Section>
        <Eyebrow>Signed by the expert</Eyebrow>
        <div style={{ marginTop: 24, maxWidth: 440 }}>
          <ExpertBioCard expert={expert} variant="compact" />
        </div>
      </Section>

      {/* Filtered grid */}
      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <Eyebrow>Guides</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", marginTop: 16 }} className="h-grad">
              {label}, practically
            </h2>
          </div>
          <Button to="/insights" ghost>
            All insights
          </Button>
        </div>
        {guides.length > 0 ? (
          <div className="grid-3">
            {guides.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: 30, maxWidth: 560 }}>
            <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 8 }}>
              More guides coming soon
            </div>
            <p style={{ fontSize: 14.5, color: "var(--ink-55)", marginBottom: 18 }}>
              We&rsquo;re writing up {label.toLowerCase()} guides, each signed by {expert.name}. Until then, the fastest answer is a pre-screen on your specific case.
            </p>
            <Button to="/contact" ghost>
              Book a pre-screen with {expert.name}
            </Button>
          </div>
        )}
      </Section>

      <PreScreenCTABlock expert={leadId} />
    </>
  );
}
