import { useParams } from "react-router-dom";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { JurisdictionComparisonTable } from "../components/JurisdictionComparisonTable";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { NotFound } from "../pages/NotFound";
import { type JurisdictionId } from "../content/jurisdictions";
import { useContent } from "../content/i18n";
import { Seo } from "../components/Seo";

export default function JurisdictionComparator() {
  const c = useContent();
  const { slug } = useParams();
  const p = c.getComparator(slug || "");
  if (!p) return <NotFound />;

  return (
    <>
      <Seo
        title={`${p.title} — WTP`}
        description={p.whoSuits}
        canonical={`/jurisdictions/${p.slug}`}
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Jurisdictions", href: "/jurisdictions" }, { label: p.title }]} />
        <Eyebrow>Comparison</Eyebrow>
        <h1 className="h-grad">{p.title}</h1>
      </Section>

      <Section>
        <JurisdictionComparisonTable columns={["uae", p.slug as JurisdictionId]} />
      </Section>

      <Section>
        <div className="grid-2">
          <div className="card" style={{ padding: 26 }}>
            <Eyebrow>Who it suits</Eyebrow>
            <p style={{ marginTop: 14, fontSize: 16, color: "var(--ink-70)" }}>{p.whoSuits}</p>
          </div>
          <div className="card" style={{ padding: 26 }}>
            <Eyebrow>The banking-first read</Eyebrow>
            <p style={{ marginTop: 14, fontSize: 16, color: "var(--ink-70)" }}>{p.bankingFirstTake}</p>
          </div>
        </div>
      </Section>

      <PreScreenCTABlock />
    </>
  );
}
