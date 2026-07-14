import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { StatBar } from "../components/StatBar";
import { CaseCard } from "../components/CaseCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { useContent } from "../content/i18n";
import { useLang } from "../i18n/lang";

export default function UAE() {
  const c = useContent();
  const lang = useLang();
  const uaeCase = c.relatedCases({ jurisdictions: ["uae"], limit: 1 })[0];
  const t = lang === "ru"
    ? {
        seoTitle: "ОАЭ для частного капитала — WTP",
        // ВЫЧИТКА ОЛЕ:
        seoDescription:
          "Нулевой подоходный налог, корпоративная ставка 9% на прибыль свыше AED 375 000 и варианты получения Golden Visa от AED 2 млн — читаем это так, как читает частный банк, по принципу Banking-First.",
        breadcrumbHome: "Главная",
        breadcrumbJurisdictions: "Юрисдикции",
        breadcrumbUAE: "ОАЭ",
        eyebrowJurisdiction: "Юрисдикция",
        h1a: "Читаем ОАЭ так, как их читает ",
        h1b: "частный банк",
        h1c: " — и открываем тот счёт, на котором застревает большинство заявок",
        lead:
          "Цифры из заголовков реальны — но именно счёт останавливает большинство заявок. Мы разбираем ОАЭ так, как их читает частный банк, и выстраиваем структуру, которая проходит комплаенс ещё до того, как вы возьмёте на себя обязательства.",
        ctaPrescreen: "Записаться на пре-скрининг",
        eyebrowOffers: "Что на самом деле даёт ОАЭ",
        h2OfferA: "Одно из немногих мест, где ",
        h2OfferB: "налоги, резидентство и банкинг",
        h2OfferC: " могут сойтись воедино",
        offersBody:
          "Для семей, живущих на несколько стран, ОАЭ сочетают режим с нулевым подоходным налогом, реальный путь к резидентству и банковский сектор, который всерьёз работает с частным капиталом. Нюанс в том, что ничто из этого не происходит автоматически: именно выбранная структура определяет, сложатся ли вместе банк, виза и налоговый статус. Мы выстраиваем их в правильной последовательности — чтобы сложились.",
        eyebrowLandscape: "Ландшафт",
        landscapeH2: "Одна страна — три совершенно разные базы",
        landscape1Name: "Дубай",
        landscape1Line:
          "Основная onshore-база: широкий выбор лицензий, глубокий рынок талантов и то самое резидентство, на котором реально живёт большинство состоятельных семей.",
        landscape2Name: "ADGM",
        landscape2Line:
          "Финансовый центр Абу-Даби на общем праве — предпочтительная структура для фондов, холдинговых компаний и семейных офисов.",
        landscape3Name: "DIFC",
        landscape3Line:
          "Хаб Дубая на общем праве: контракты по английскому праву, собственные суды и адрес, который частные банки воспринимают всерьёз.",
        eyebrowBanking: "Реальность банкинга",
        bankingH2A: "Лицензия — это легко. ",
        bankingH2B: "Счёт — это стена.",
        // ВЫЧИТКА ОЛЕ:
        bankingBody:
          "Открыть компанию в ОАЭ — быстро. Получить для неё банковский счёт — нет: банки отклоняют заметную долю добросовестных заявок, когда происхождение средств, структура или история резидентства читаются нечисто. Поэтому мы начинаем с банка, а не с лицензии: сначала проверяем вас на пре-скрининге по реальным критериям комплаенса, а затем выстраиваем компанию и визу под них.",
        eyebrowKeyFacts: "Ключевые факты",
        stat1Value: "0%",
        // ВЫЧИТКА ОЛЕ:
        stat1Label: "подоходный налог",
        stat2Value: "9%",
        // ВЫЧИТКА ОЛЕ:
        stat2Label: "корпоративный налог свыше AED 375 000",
        stat3Value: "AED 2 млн",
        stat3Label: "инвестиция для Golden Visa от",
        stat4Value: "183 дня",
        stat4Label: "сертификат налогового резидентства",
        eyebrowWatch: "Обратите внимание",
        // ВЫЧИТКА ОЛЕ:
        ctTrapH2: "Ловушка корпоративного налога 9%",
        // ВЫЧИТКА ОЛЕ:
        ctTrapBodyA:
          "«Нулевой подоходный налог» верно для физлиц — но пропустите доход через компанию, и вступает в силу другое правило: прибыль сверх порога облагается как корпоративный доход. Неудачно выстроив структуру, вы можете превратить действительно свободный от налога личный доход в налогооблагаемую прибыль компании. Решение — определить, что должно находиться внутри компании, а что остаться личным, ",
        ctTrapEm: "до того как",
        ctTrapBodyB:
          " вы её зарегистрируете, а не после. Это решение — часть пре-скрининга.",
        eyebrowProof: "Доказательства",
      }
    : {
        seoTitle: "The UAE for private wealth — WTP",
        seoDescription:
          "Zero personal income tax, a 9% corporate rate above AED 375,000, and Golden Visa routes from AED 2M — read the way a private bank reads it, banking-first.",
        breadcrumbHome: "Home",
        breadcrumbJurisdictions: "Jurisdictions",
        breadcrumbUAE: "The UAE",
        eyebrowJurisdiction: "Jurisdiction",
        h1a: "We read the UAE the way a ",
        h1b: "private bank does",
        h1c: " — then clear the account most applications stall on",
        lead:
          "The headline numbers are real — but the account is where most applications stall. We map the UAE the way a private bank reads it, then build a structure that clears compliance before you commit.",
        ctaPrescreen: "Request a pre-screen",
        eyebrowOffers: "What the UAE actually offers",
        h2OfferA: "One of the few places where ",
        h2OfferB: "tax, residency, and banking",
        h2OfferC: " can all line up",
        offersBody:
          "For internationally mobile families, the UAE pairs a zero personal income tax regime with a credible residency route and a banking sector that takes private wealth seriously. The catch is that none of it is automatic — the structure you set up determines whether the bank, the visa, and the tax position actually hold together. We sequence them so they do.",
        eyebrowLandscape: "The landscape",
        landscapeH2: "One country, three very different bases",
        landscape1Name: "Dubai",
        landscape1Line:
          "The mainstream onshore base — broad licensing, deep talent, and the residency most HNWI families actually live on.",
        landscape2Name: "ADGM",
        landscape2Line:
          "Abu Dhabi's common-law financial centre — the structure of choice for funds, holding companies, and family offices.",
        landscape3Name: "DIFC",
        landscape3Line:
          "Dubai's common-law hub — English-law contracts, its own courts, and the address private banks take seriously.",
        eyebrowBanking: "Banking reality",
        bankingH2A: "The licence is easy. ",
        bankingH2B: "The account is the wall.",
        bankingBody:
          "Setting up a UAE company is fast. Getting it banked is not — banks decline a meaningful share of honest applications when the source of funds, the structure, or the residency story doesn't read cleanly. That's why we start with the bank, not the licence: we pre-screen against real compliance criteria first, then build the company and visa to match.",
        eyebrowKeyFacts: "Key facts",
        stat1Value: "0%",
        stat1Label: "personal income tax",
        stat2Value: "9%",
        stat2Label: "corporate tax above AED 375K",
        stat3Value: "AED 2M",
        stat3Label: "Golden Visa investment from",
        stat4Value: "183 days",
        stat4Label: "tax-residency certificate",
        eyebrowWatch: "Watch this",
        ctTrapH2: "The 9% corporate-tax trap",
        ctTrapBodyA:
          "\"Zero income tax\" is true for individuals — but route your earnings through a company and a different rule applies: profit above the threshold is taxed as corporate income. Set the structure up badly and you can convert genuinely tax-free personal income into taxable corporate profit. The fix is to decide what should sit inside a company and what should stay personal ",
        ctTrapEm: "before",
        ctTrapBodyB:
          " you incorporate, not after. That call is part of the pre-screen.",
        eyebrowProof: "Proof",
      };

  const landscape = [
    { name: t.landscape1Name, line: t.landscape1Line },
    { name: t.landscape2Name, line: t.landscape2Line },
    { name: t.landscape3Name, line: t.landscape3Line },
  ];

  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        canonical="/jurisdictions/uae"
      />
      <Section className="page-hero">
        <Breadcrumb
          trail={[
            { label: t.breadcrumbHome, href: "/" },
            { label: t.breadcrumbJurisdictions, href: "/jurisdictions" },
            { label: t.breadcrumbUAE },
          ]}
        />
        <Eyebrow>{t.eyebrowJurisdiction}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.h1a}<span className="g">{t.h1b}</span>{t.h1c}
        </h1>
        <p className="lead">
          {t.lead}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 28, flexWrap: "wrap" }}>
          <Button to="/contact">{t.ctaPrescreen}</Button>
        </div>
      </Section>

      {/* Why the UAE */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>{t.eyebrowOffers}</Eyebrow>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", margin: "20px 0 16px" }} className="h-grad">
            {t.h2OfferA}<span className="g">{t.h2OfferB}</span>{t.h2OfferC}
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            {t.offersBody}
          </p>
        </div>
      </Section>

      {/* The landscape */}
      <Section>
        <Eyebrow>{t.eyebrowLandscape}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          {t.landscapeH2}
        </h2>
        <div className="grid-3">
          {landscape.map((l) => (
            <div key={l.name} className="card" style={{ padding: 22 }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 19,
                  marginBottom: 10,
                }}
              >
                {l.name}
              </div>
              <p style={{ fontSize: 14.5, color: "var(--ink-55)", lineHeight: 1.6 }}>{l.line}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Banking reality */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>{t.eyebrowBanking}</Eyebrow>
          <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 16px" }} className="h-grad">
            {t.bankingH2A}<span className="g">{t.bankingH2B}</span>
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            {t.bankingBody}
          </p>
        </div>
      </Section>

      {/* Key facts */}
      <Section>
        <Eyebrow>{t.eyebrowKeyFacts}</Eyebrow>
        <div style={{ marginTop: 24 }}>
          <StatBar
            stats={[
              { value: t.stat1Value, label: t.stat1Label, source: "UAE tax code" },
              { value: t.stat2Value, label: t.stat2Label, source: "UAE CT, since 1 Jun 2023" },
              { value: t.stat3Value, label: t.stat3Label, source: "UAE Golden Visa" },
              { value: t.stat4Value, label: t.stat4Label, source: "UAE TRC" },
            ]}
          />
        </div>
      </Section>

      {/* The 9% CT trap */}
      <Section>
        <Eyebrow>{t.eyebrowWatch}</Eyebrow>
        <div className="card" style={{ padding: 32, maxWidth: 760, marginTop: 24 }}>
          <h2 style={{ fontSize: "clamp(22px,3vw,30px)", marginBottom: 14 }} className="h-grad">
            {t.ctTrapH2}
          </h2>
          <p style={{ fontSize: 16.5, color: "var(--ink-70)", lineHeight: 1.65 }}>
            {t.ctTrapBodyA}<em>{t.ctTrapEm}</em>{t.ctTrapBodyB}
          </p>
        </div>
      </Section>

      {/* Case */}
      {uaeCase && (
        <Section>
          <Eyebrow>{t.eyebrowProof}</Eyebrow>
          <div className="grid-3" style={{ marginTop: 24 }}>
            <CaseCard case={uaeCase} />
          </div>
        </Section>
      )}

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
