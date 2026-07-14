import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { StepperBankingFirst } from "../components/StepperBankingFirst";
import { CaseCard } from "../components/CaseCard";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { useContent } from "../content/i18n";
import { useLang } from "../i18n/lang";

export default function BankingFirst() {
  const c = useContent();
  const lang = useLang();
  const ivan = c.getExpert("ivan");
  const proofCases = c.latestCases(2);

  const t =
    lang === "ru"
      ? {
          seoTitle: "Методология Banking-First — WTP",
          // ВЫЧИТКА ОЛЕ:
          seoDesc:
            "Почему банк — самый трудный шаг. WTP первым проходит самый трудный барьер — банк и его комплаенс, — а затем выстраивает компанию, визу и активы так, чтобы его пройти.",
          bcHome: "Главная",
          bcCurrent: "Banking-First",
          eyebrowMethodology: "Методология",
          h1a: "Почему банк — ",
          h1b: "самый трудный шаг",
          lead:
            "Все продают вам сначала лицензию и визу. Потом заявка на счёт застревает — и вся структура оказывается заблокирована. Мы переворачиваем порядок: банк идёт первым, а всё остальное сразу строится банкабельным — с первого дня.",
          ctaPrescreen: "Записаться на пре-скрининг",
          eyebrowSequence: "Последовательность",
          seqH2: "Банк → Компания → Виза → Активы",
          eyebrowBackwards: "Почему все остальные делают наоборот",
          h2backwardsA: "«Сначала компания» — так и остаются ",
          h2backwardsB: "без банка.",
          para3a:
            "Стандартный сценарий: регистрируют компанию, арендуют офис, подают на визу — и только потом ведут вас в банк. К этому моменту структура уже зафиксирована, и если она не вписывается в риск-модель банка, вы в тупике.",
          // ВЫЧИТКА ОЛЕ:
          para3b:
            " честных заявок отклоняют на первом же круге. Мы относимся к банку как к первому и самому трудному барьеру и проходим его прежде, чем что-либо ещё зафиксировано, — чтобы компания, виза и активы были выстроены под комплаенс, а не против него.",
          // ВЫЧИТКА ОЛЕ:
          source: "Источник: данные пре-скрининга WTP",
          eyebrowPreScreen: "Пре-скрининг",
          preH2: "Мы оцениваем банкабельность прежде, чем вы потратите хоть один дирхам",
          preLead:
            "За 5–7 дней вы получаете банковский роадмап: конкретный банк, конкретный банковский офицер и честную оценку — проходит ли ваше досье или что исправить в первую очередь.",
          preCta: "Как устроен пре-скрининг",
          tiersEyebrow: "Что входит в каждый уровень",
          tiersH2: "Четыре уровня — одна команда, отвечающая за результат",
          tier0Label: "Диагностика",
          tier0Includes: "Пре-скрининг и оценка банкабельности плюс банковский роадмап за 5–7 дней.",
          tier1Label: "Вход",
          // ВЫЧИТКА ОЛЕ:
          tier1Includes: "Полная заявка, подготовка комплаенса, открытый счёт с IBAN.",
          tier2Label: "Запуск",
          // ВЫЧИТКА ОЛЕ:
          tier2Includes: "Выбор юрисдикции, регистрация компании, сабстанс и стандартное резидентство.",
          tier3Label: "Контроль",
          // ВЫЧИТКА ОЛЕ:
          tier3Includes: "Golden Visa, недвижимость, инвестиции и структурирование цифровых активов.",
          proofEyebrow: "Доказательства",
          proofH2: "Как последовательность работает на практике",
          expEyebrow: "Почему мы выстроили это именно так",
          expH2: "Подписано тем, кто за это отвечает",
        }
      : {
          seoTitle: "Banking-First methodology — WTP",
          seoDesc:
            "Why the bank is the hard step. WTP clears the hardest gate — the bank and its compliance — first, then builds the company, visa and assets to pass it.",
          bcHome: "Home",
          bcCurrent: "Banking-First",
          eyebrowMethodology: "The methodology",
          h1a: "Why the bank is the ",
          h1b: "hard step",
          lead:
            "Everyone sells you the licence and the visa first. Then the account application stalls — and the whole structure is stuck. We invert the order: the bank goes first, and everything after is built to be bankable from day one.",
          ctaPrescreen: "Request a pre-screen",
          eyebrowSequence: "The sequence",
          seqH2: "Bank → Company → Visa → Assets",
          eyebrowBackwards: "Why everyone else does it backwards",
          h2backwardsA: "Company-first is how you end up ",
          h2backwardsB: "unbanked.",
          para3a:
            "The standard playbook registers the entity, leases an office, files for the visa — and only then walks you to the bank. By that point the structure is fixed, and if it doesn't fit the bank's risk model, you're stuck.",
          para3b:
            " of honest applications are declined on the first pass. We treat the bank as the first, hardest gate and clear it before anything else is committed, so the company, the visa and the assets are all shaped to pass compliance — not to fight it.",
          source: "Source: WTP pre-screen data",
          eyebrowPreScreen: "The pre-screen",
          preH2: "We assess bankability before you spend a dirham",
          preLead:
            "In 5–7 days you get a Banking Roadmap: a named bank, a named officer, and an honest read on whether your file passes — or what to fix first.",
          preCta: "How the pre-screen works",
          tiersEyebrow: "What each tier covers",
          tiersH2: "Four tiers, one accountable team",
          tier0Label: "Advisory",
          tier0Includes: "Pre-screen + bankability assessment and a Banking Roadmap in 5–7 days.",
          tier1Label: "Entry",
          tier1Includes: "Full application, compliance prep, account opened with IBAN.",
          tier2Label: "Setup",
          tier2Includes: "Jurisdiction selection, formation, substance and standard residency.",
          tier3Label: "Control",
          tier3Includes: "Golden Visa, real estate, investments and digital-asset structuring.",
          proofEyebrow: "Proof",
          proofH2: "How the sequence plays out",
          expEyebrow: "Why we built it this way",
          expH2: "Signed by the person accountable for it",
        };

  // The four service tiers, derived from services data — L0 pre-screen through
  // L3 wealth structuring. Scope only; no fees rendered on-page.
  // Labels match the engagement tiers on /packages (Advisory · Entry · Setup · Control).
  const tiers = [
    { tier: "L0", label: t.tier0Label, includes: t.tier0Includes },
    { tier: "L1", label: t.tier1Label, includes: t.tier1Includes },
    { tier: "L2", label: t.tier2Label, includes: t.tier2Includes },
    { tier: "L3", label: t.tier3Label, includes: t.tier3Includes },
  ];

  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDesc}
        canonical="/banking-first"
      />
      {/* 1. Page hero */}
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.bcHome, href: "/" }, { label: t.bcCurrent }]} />
        <Eyebrow>{t.eyebrowMethodology}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.h1a}<span className="g">{t.h1b}</span>
        </h1>
        <p className="lead">
          {t.lead}
        </p>
        <div style={{ marginTop: 28 }}>
          <Button to="/contact" large>
            {t.ctaPrescreen}
          </Button>
        </div>
      </Section>

      {/* 2. The 4-step sequence */}
      <Section>
        <Eyebrow>{t.eyebrowSequence}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          {t.seqH2}
        </h2>
        <StepperBankingFirst />
      </Section>

      {/* 3. Why everyone else does it backwards */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>{t.eyebrowBackwards}</Eyebrow>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", margin: "20px 0 16px" }} className="h-grad">
            {t.h2backwardsA}<span className="g">{t.h2backwardsB}</span>
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            {t.para3a}
            <span className="g"> ~30%</span>{t.para3b}
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-40)", marginTop: 12 }}>{t.source}</p>
        </div>
      </Section>

      {/* 4. The Pre-Screen explainer strip */}
      <Section>
        <div
          style={{
            padding: "40px",
            borderRadius: 20,
            background: "var(--deep-2)",
            border: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <Eyebrow>{t.eyebrowPreScreen}</Eyebrow>
            <h2 style={{ fontSize: "clamp(22px,3vw,32px)", margin: "14px 0 10px" }} className="h-grad">
              {t.preH2}
            </h2>
            <p className="muted" style={{ fontSize: 16 }}>
              {t.preLead}
            </p>
          </div>
          <Button to="/banking-first/pre-screen" ghost>
            {t.preCta}
          </Button>
        </div>
      </Section>

      {/* 5. Service tiers L0–L3 */}
      <Section>
        <Eyebrow>{t.tiersEyebrow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          {t.tiersH2}
        </h2>
        <div className="grid-4">
          {tiers.map((row) => (
            <div key={row.tier} className="card" style={{ padding: 22, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span className="chip">{row.tier}</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                {row.label}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-55)" }}>{row.includes}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Case proof */}
      {proofCases.length > 0 && (
        <Section>
          <Eyebrow>{t.proofEyebrow}</Eyebrow>
          <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 28px" }} className="h-grad">
            {t.proofH2}
          </h2>
          <div className="grid-2">
            {proofCases.map((c) => (
              <CaseCard key={c.slug} case={c} />
            ))}
          </div>
        </Section>
      )}

      {/* 7. Expert quote — Ivan, CEO */}
      <Section>
        <Eyebrow>{t.expEyebrow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 28px" }} className="h-grad">
          {t.expH2}
        </h2>
        <div style={{ maxWidth: 440 }}>
          <ExpertBioCard expert={ivan} />
        </div>
      </Section>

      {/* 8. CTA */}
      <PreScreenCTABlock expert="olya" />
    </>
  );
}
