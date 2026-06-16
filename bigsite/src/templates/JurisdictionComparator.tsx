import { useParams } from "react-router-dom";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { JurisdictionComparisonTable } from "../components/JurisdictionComparisonTable";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { NotFound } from "../pages/NotFound";
import { getComparator, type JurisdictionId } from "../content/jurisdictions";

export default function JurisdictionComparator() {
  const { slug } = useParams();
  const p = getComparator(slug || "");
  if (!p) return <NotFound />;

  return (
    <>
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
            <Eyebrow>Why banking-first points to the UAE</Eyebrow>
            <p style={{ marginTop: 14, fontSize: 16, color: "var(--ink-70)" }}>{p.bankingFirstTake}</p>
          </div>
        </div>
      </Section>

      <PreScreenCTABlock />
    </>
  );
}
