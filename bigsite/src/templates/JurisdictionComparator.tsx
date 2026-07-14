import { useParams } from "react-router-dom";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { JurisdictionComparisonTable } from "../components/JurisdictionComparisonTable";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { NotFound } from "../pages/NotFound";
import { type JurisdictionId } from "../content/jurisdictions";
import { useContent } from "../content/i18n";
import { Seo } from "../components/Seo";
import { useLang } from "../i18n/lang";

export default function JurisdictionComparator() {
  const c = useContent();
  const lang = useLang();
  const { slug } = useParams();
  const p = c.getComparator(slug || "");
  if (!p) return <NotFound />;

  const t =
    lang === "ru"
      ? {
          bcHome: "Главная",
          bcJurisdictions: "Юрисдикции",
          eyebrowComparison: "Сравнение",
          eyebrowWhoSuits: "Кому подходит",
          eyebrowBankingFirst: "Взгляд Banking-First",
        }
      : {
          bcHome: "Home",
          bcJurisdictions: "Jurisdictions",
          eyebrowComparison: "Comparison",
          eyebrowWhoSuits: "Who it suits",
          eyebrowBankingFirst: "The banking-first read",
        };

  return (
    <>
      <Seo
        title={`${p.title} — WTP`}
        description={p.whoSuits}
        canonical={`/jurisdictions/${p.slug}`}
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.bcHome, href: "/" }, { label: t.bcJurisdictions, href: "/jurisdictions" }, { label: p.title }]} />
        <Eyebrow>{t.eyebrowComparison}</Eyebrow>
        <h1 className="h-grad">{p.title}</h1>
      </Section>

      <Section>
        <JurisdictionComparisonTable columns={["uae", p.slug as JurisdictionId]} />
      </Section>

      <Section>
        <div className="grid-2">
          <div className="card" style={{ padding: 26 }}>
            <Eyebrow>{t.eyebrowWhoSuits}</Eyebrow>
            <p style={{ marginTop: 14, fontSize: 16, color: "var(--ink-70)" }}>{p.whoSuits}</p>
          </div>
          <div className="card" style={{ padding: 26 }}>
            <Eyebrow>{t.eyebrowBankingFirst}</Eyebrow>
            <p style={{ marginTop: 14, fontSize: 16, color: "var(--ink-70)" }}>{p.bankingFirstTake}</p>
          </div>
        </div>
      </Section>

      <PreScreenCTABlock />
    </>
  );
}
