import { useParams } from "react-router-dom";
import { useLang } from "../i18n/lang";
import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { ArticleCard } from "../components/ArticleCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { NotFound } from "../pages/NotFound";
import type { ExpertId } from "../content/experts";
import type { Category } from "../content/articles";
import { useContent } from "../content/i18n";

const leadByCategory: Record<Category, ExpertId> = {
  banking: "olya",
  "residency-visa": "olya",
  "business-setup": "olya",
  "assets-tax": "ilya",
};

export default function InsightsCategory() {
  const c = useContent();
  const { category } = useParams();
  const lang = useLang();

  const isCategory = (slug: string): slug is Category =>
    Object.prototype.hasOwnProperty.call(c.categoryLabel, slug);

  if (!category || !isCategory(category)) return <NotFound />;

  const label = c.categoryLabel[category];
  const leadId = leadByCategory[category];
  const expert = c.getExpert(leadId);
  const guides = c.articlesByCategory(category);

  const t = lang === "ru"
    ? {
        leadText: {
          // ВЫЧИТКА ОЛЕ: banking clearance / source-of-funds phrasing (regulatory)
          banking:
            "Как честные деньги реально проходят банк ОАЭ — происхождение средств, структура и досье, которое открывает счёт.",
          "residency-visa":
            "Резидентство и визы выстроены в правильном порядке вокруг ваших активов, а не наоборот — чтобы структура под ними держалась.",
          // ВЫЧИТКА ОЛЕ: substance / compliance claim (regulatory)
          "business-setup":
            "Регистрация компании так, чтобы её принял банк, — правильная фризона, реальный сабстанс (реальное присутствие), структура, которая проходит комплаенс.",
          // ВЫЧИТКА ОЛЕ: tax-minimisation claim (tax/CT)
          "assets-tax":
            "Где оказывается каждый вид дохода при смене резидентства — и как законно свести налог к минимуму.",
        } as Record<Category, string>,
        seoTitle: `${label}: гайды — WTP`,
        crumbHome: "Главная",
        crumbInsights: "Аналитика",
        eyebrowInsights: "Аналитика",
        guidesWord: "гайды",
        eyebrowGuides: "Гайды",
        h2Suffix: " на практике",
        allInsights: "Вся аналитика",
        moreSoonTitle: "Скоро новые гайды",
        emptyBodyA: "Мы пишем гайды по теме ",
        emptyBodyB: " — подписывает их ",
        emptyBodyC: ". А пока самый быстрый ответ — пре-скрининг по вашему конкретному случаю.",
        requestPre: "Записаться на пре-скрининг — ",
        eyebrowSigned: "За подписью эксперта",
      }
    : {
        leadText: {
          banking:
            "How honest money actually clears a UAE bank — source-of-funds, structure, and the file that gets you through.",
          "residency-visa":
            "Residency and visa routes sequenced around your assets, not the other way round — so the structure underneath holds.",
          "business-setup":
            "Company formation done the bankable way — the right free zone, real substance, structure that survives compliance.",
          "assets-tax":
            "Where each kind of income sits when you relocate — and how to keep it taxed least, legally.",
        } as Record<Category, string>,
        seoTitle: `${label} guides — WTP`,
        crumbHome: "Home",
        crumbInsights: "Insights",
        eyebrowInsights: "Insights",
        guidesWord: "guides",
        eyebrowGuides: "Guides",
        h2Suffix: ", practically",
        allInsights: "All insights",
        moreSoonTitle: "More guides coming soon",
        emptyBodyA: "We’re writing up ",
        emptyBodyB: " guides, each signed by ",
        emptyBodyC: ". Until then, the fastest answer is a pre-screen on your specific case.",
        requestPre: "Request a pre-screen with ",
        eyebrowSigned: "Signed by the expert",
      };

  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.leadText[category]}
        canonical={`/insights/${category}`}
      />
      <Section className="page-hero">
        <Breadcrumb
          trail={[
            { label: t.crumbHome, href: "/" },
            { label: t.crumbInsights, href: "/insights" },
            { label },
          ]}
        />
        <Eyebrow>{t.eyebrowInsights}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {label} <span className="g">{t.guidesWord}</span>
        </h1>
        <p className="lead">{t.leadText[category]}</p>
      </Section>

      {/* Filtered grid */}
      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <Eyebrow>{t.eyebrowGuides}</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", marginTop: 16 }} className="h-grad">
              {label}{t.h2Suffix}
            </h2>
          </div>
          <Button to="/insights" ghost>
            {t.allInsights}
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
              {t.moreSoonTitle}
            </div>
            <p style={{ fontSize: 14.5, color: "var(--ink-55)", marginBottom: 18 }}>
              {t.emptyBodyA}{label.toLowerCase()}{t.emptyBodyB}{expert.name}{t.emptyBodyC}
            </p>
            <Button to="/contact" ghost>
              {t.requestPre}{expert.name}
            </Button>
          </div>
        )}
      </Section>

      {/* Category lead expert — below the guides so the content leads the page */}
      <Section>
        <Eyebrow>{t.eyebrowSigned}</Eyebrow>
        <div style={{ marginTop: 24, maxWidth: 440 }}>
          <ExpertBioCard expert={expert} variant="compact" />
        </div>
      </Section>

      <PreScreenCTABlock expert={leadId} />
    </>
  );
}
