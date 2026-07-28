import { L as Link, useLang } from "../i18n/lang";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { JurisdictionComparisonTable } from "../components/JurisdictionComparisonTable";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { useContent } from "../content/i18n";
import { Seo } from "../components/Seo";
import { collectionLd } from "../lib/schema";

export default function JurisdictionsHub() {
  const c = useContent();
  const lang = useLang();
  const t = lang === "ru"
    ? {
        seoTitle: "Юрисдикции — WTP",
        seoDescription:
          "Пять юрисдикций и одно решение, определяющее всё остальное: сможете ли вы реально открыть счёт? Сравнение по принципу Banking-First — по налогам, доступу и скорости.",
        breadcrumbHome: "Главная",
        jurisdictions: "Юрисдикции",
        h1a: "Пять юрисдикций — судим прежде всего по ",
        h1b: "доступу к банкингу",
        lead:
          "Пять юрисдикций и одно решение, определяющее всё остальное: сможете ли вы реально открыть счёт? Мы сравниваем их по принципу Banking-First — по налогам, по доступу и по тому, как быстро вы начнёте работать.",
        ctaPrescreen: "Записаться на пре-скрининг",
        comparison: "Сравнение",
        sideBySide: "Пять юрисдикций бок о бок",
        // ВЫЧИТКА ОЛЕ:
        exitTaxNote:
          "Налоговые последствия при выходе (exit tax) целиком зависят от страны вашего происхождения — вашу ситуацию мы разбираем на пре-скрининге.",
        homeMarket: "Наш домашний рынок",
        uaeInDepth: "ОАЭ в деталях",
        // ВЫЧИТКА ОЛЕ:
        uaeBlurb:
          "Нулевой подоходный налог, корпоративная ставка 9% на прибыль свыше AED 375 000 и варианты получения Golden Visa от AED 2 млн. Самое сложное — банк, и именно с него мы начинаем. Смотрите полный разбор: налоги, резидентство, банкинг и сроки.",
        headToHead: "Один на один",
        versusAlternatives: "ОАЭ против альтернатив",
        compare: "Сравнить",
      }
    : {
        seoTitle: "Jurisdictions — WTP",
        seoDescription:
          "Five jurisdictions, one decision that decides the rest: can you actually open the account? Compared banking-first — on tax, access and speed.",
        breadcrumbHome: "Home",
        jurisdictions: "Jurisdictions",
        h1a: "Five jurisdictions — judged on ",
        h1b: "banking access first",
        lead:
          "Five jurisdictions, one decision that decides the rest: can you actually open the account? We compare them banking-first — on tax, on access, and on how fast you're operational.",
        ctaPrescreen: "Request a pre-screen",
        comparison: "The comparison",
        sideBySide: "Five jurisdictions, side by side",
        exitTaxNote:
          "Exit-tax exposure depends entirely on your country of origin — we map yours on the pre-screen.",
        homeMarket: "Our home market",
        uaeInDepth: "The UAE in depth",
        uaeBlurb:
          "Zero personal income tax, a 9% corporate rate above AED 375K, and Golden Visa routes from AED 2M. The hard part is the bank — and that's exactly where we start. See the full breakdown: tax, residency, banking and timeline.",
        headToHead: "Head-to-head",
        versusAlternatives: "UAE versus the alternatives",
        compare: "Compare",
      };
  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        canonical="/jurisdictions"
        jsonLd={collectionLd({ name: t.seoTitle, description: t.seoDescription, path: "/jurisdictions", lang })}
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.breadcrumbHome, href: "/" }, { label: t.jurisdictions }]} />
        <Eyebrow>{t.jurisdictions}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.h1a}<span className="g">{t.h1b}</span>
        </h1>
        <p className="lead">
          {t.lead}
        </p>
        <div style={{ marginTop: 28 }}>
          <Button to="/contact">{t.ctaPrescreen}</Button>
        </div>
      </Section>

      {/* The comparison */}
      <Section>
        <Eyebrow>{t.comparison}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 28px" }} className="h-grad">
          {t.sideBySide}
        </h2>
        <JurisdictionComparisonTable columns={["uae", "singapore", "portugal", "switzerland", "malta"]} />
        <p className="muted" style={{ fontSize: 14, marginTop: 16 }}>
          {t.exitTaxNote}
        </p>
      </Section>

      {/* UAE deep-dive teaser */}
      <Section>
        <div
          className="card"
          style={{
            padding: "40px",
            background: "linear-gradient(180deg, rgba(227,181,100,.06), var(--deep-2))",
          }}
        >
          <Eyebrow>{t.homeMarket}</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3vw,36px)", margin: "16px 0 14px" }} className="h-grad">
            {t.uaeInDepth}
          </h2>
          <p className="muted" style={{ fontSize: 18, maxWidth: 640, marginBottom: 24 }}>
            {t.uaeBlurb}
          </p>
          <Button to="/jurisdictions/uae">{t.uaeInDepth}</Button>
        </div>
      </Section>

      {/* Comparator teasers */}
      <Section>
        <Eyebrow>{t.headToHead}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 28px" }} className="h-grad">
          {t.versusAlternatives}
        </h2>
        <div className="grid-3">
          {c.comparatorPages.map((p) => (
            <Link
              key={p.slug}
              to={`/jurisdictions/${p.slug}`}
              className="card"
              style={{ padding: 24, display: "flex", flexDirection: "column" }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>
                {p.title}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-55)", marginBottom: 18 }}>{p.whoSuits}</p>
              <span
                style={{
                  marginTop: "auto",
                  color: "var(--gold)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {t.compare} <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
