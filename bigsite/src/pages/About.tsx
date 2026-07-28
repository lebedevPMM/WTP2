import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { StepperBankingFirst } from "../components/StepperBankingFirst";
import { StatBar } from "../components/StatBar";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { useContent } from "../content/i18n";
import { useLang } from "../i18n/lang";
import { aboutPageLd } from "../lib/schema";

export default function About() {
  const c = useContent();
  const lang = useLang();
  const t =
    lang === "ru"
      ? {
          seoTitle: "О WTP — бэк-офис для частного капитала",
          // ВЫЧИТКА ОЛЕ: наследование + ответственность конкретных людей ("run by named people")
          seoDescription:
            "WTP — непубличный бэк-офис для частного капитала: банкинг, структуры, резидентство и наследование, за которые отвечают конкретные люди. ОАЭ — наш домашний рынок, а не то, что мы продаём.",
          bcHome: "Главная",
          bcAbout: "О нас",
          eyebrowAbout: "О нас",
          h1a: "Бэк-офис",
          h1b: "за большим состоянием",
          // ВЫЧИТКА ОЛЕ: наследование + «отвечающих за результат» (accountability claim)
          lead:
            "Незаметная команда, которую крупный капитал держит на негласном ретейнере, — банкинг, структуры, резидентство, наследование — в руках людей, которые занимаются только этим: конкретных и отвечающих за результат. ОАЭ — инструмент, который мы задействуем, когда он работает на результат, а не то, что мы продаём.",
          eyebrowWhy: "Почему появился Banking-First",
          h2a: "Все оптимизируют под лицензию.",
          h2b: "Всё ломается на счёте.",
          // ВЫЧИТКА ОЛЕ: banking-claim «именно здесь застревает большинство заявок»
          originP1:
            "Стандартный сценарий: зарегистрировать компанию, получить гонорар и вручить вам папку. Потом вы приходите в банк и обнаруживаете, что структура изначально не была рассчитана на банкабельность, — и именно здесь застревает большинство заявок.",
          originP2:
            "Мы перевернули порядок. Начинаем с самого трудного, относимся к счёту как к настоящему фильтру, которым он и является, и проектируем компанию, резидентство и активы так, чтобы пройти его с первого дня. Banking-First — не слоган, а последовательность, которая не даёт рухнуть остальному плану.",
          eyebrowHow: "Как мы работаем",
          h2Flow: "Банк → Компания → Виза → Активы",
          // ВЫЧИТКА ОЛЕ: track-record цифры — проверить провенанс каждой перед публикацией
          stat1Value: "~5 000",
          stat1Label: "сделок закрыто по группе",
          stat1Source: "трек-рекорд группы",
          stat2Value: "100+",
          stat2Label: "мандатов состоятельных клиентов",
          stat2Source: "клиентская база WTP",
          stat3Value: "50",
          stat3Label: "партнёров в 15 странах",
          stat3Source: "сеть WTP",
          stat4Value: "7+",
          stat4Label: "банков ОАЭ",
          stat4Source: "банковский деск WTP",
          eyebrowReal: "Реальные люди — конкретные и ответственные",
          h2Team: "Команда, с которой вы работаете напрямую",
          allExperts: "Все эксперты",
          eyebrowPartners: "Партнёрам",
          h2Partners: "Family offices и B2B-консультанты",
          partnersP:
            "Если вы консультируете международно мобильных клиентов и раз за разом упираетесь в банковскую стену, мы берём на себя ту часть, которую большинство фирм не потянет. Работаем white-label вместе с family offices, юридическими практиками и управляющими капиталом.",
          talkPartner: "Обсудить партнёрство",
        }
      : {
          seoTitle: "About — WTP, the back office for private wealth",
          seoDescription:
            "WTP is the discreet back office for private wealth — banking, structures, residency and succession, run by named people. The UAE is our home market, not our pitch.",
          bcHome: "Home",
          bcAbout: "About",
          eyebrowAbout: "About",
          h1a: "The back office",
          h1b: "behind the fortune",
          lead:
            "The discreet team a fortune keeps on quiet retainer — banking, structures, residency, succession — handled by people who do only this, named and accountable for the outcome. The UAE is a tool we deploy when it fits the outcome, never the pitch.",
          eyebrowWhy: "Why banking-first exists",
          h2a: "Everyone optimises for the licence.",
          h2b: "The account is where it breaks.",
          originP1:
            "The standard playbook is to set up the company, collect the fee, and hand you a folder. Then you walk into a bank and discover the structure was never built to be bankable — and that is where most applications stall.",
          originP2:
            "We flipped the order. We start where it is hardest, treat the account as the gate it actually is, and design the company, residency and assets to clear that gate from day one. Banking-first is not a slogan — it is the sequence that keeps the rest of the plan from collapsing.",
          eyebrowHow: "How we work",
          h2Flow: "Bank → Company → Visa → Assets",
          stat1Value: "~5,000",
          stat1Label: "deals closed across the group",
          stat1Source: "group track record",
          stat2Value: "100+ HNWI",
          stat2Label: "mandates delivered",
          stat2Source: "WTP client base",
          stat3Value: "50",
          stat3Label: "partners in 15 countries",
          stat3Source: "WTP network",
          stat4Value: "7+",
          stat4Label: "UAE banks",
          stat4Source: "WTP banking desk",
          eyebrowReal: "Real people, named, accountable",
          h2Team: "The team you actually deal with",
          allExperts: "All experts",
          eyebrowPartners: "For partners",
          h2Partners: "Family offices and B2B advisors",
          partnersP:
            "If you advise internationally mobile clients and keep hitting the banking wall, we run the part most firms can't. We work white-label alongside family offices, legal practices and wealth managers.",
          talkPartner: "Talk to us about partnering",
        };
  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDescription}
        canonical="/about"
        jsonLd={aboutPageLd(lang)}
      />
      {/* Hero */}
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.bcHome, href: "/" }, { label: t.bcAbout }]} />
        <Eyebrow>{t.eyebrowAbout}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.h1a} <span className="g">{t.h1b}</span>
        </h1>
        <p className="lead">
          {t.lead}
        </p>
      </Section>

      {/* Origin */}
      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>{t.eyebrowWhy}</Eyebrow>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", margin: "20px 0 16px" }} className="h-grad">
            {t.h2a} <span className="g">{t.h2b}</span>
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            {t.originP1}
          </p>
          <p className="muted" style={{ fontSize: 18, marginTop: 16 }}>
            {t.originP2}
          </p>
        </div>
      </Section>

      {/* How we work — operating contour */}
      <Section>
        <Eyebrow>{t.eyebrowHow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          {t.h2Flow}
        </h2>
        <StepperBankingFirst />
      </Section>

      {/* Credibility strap — confirmed figures, provenance on every number (SPEC law #5). */}
      <Section>
        <StatBar
          stats={[
            { value: t.stat1Value, label: t.stat1Label, source: t.stat1Source },
            { value: t.stat2Value, label: t.stat2Label, source: t.stat2Source },
            { value: t.stat3Value, label: t.stat3Label, source: t.stat3Source },
            { value: t.stat4Value, label: t.stat4Label, source: t.stat4Source },
          ]}
        />
      </Section>

      {/* Experts teaser */}
      <Section>
        <Eyebrow>{t.eyebrowReal}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          {t.h2Team}
        </h2>
        <div className="grid-3">
          {c.expertList.slice(0, 3).map((e) => (
            <ExpertBioCard key={e.id} expert={e} />
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <Button to="/about/team" ghost>
            {t.allExperts}
          </Button>
        </div>
      </Section>

      {/* Partners teaser */}
      <Section>
        <div style={{ padding: "40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)", maxWidth: 760 }}>
          <Eyebrow>{t.eyebrowPartners}</Eyebrow>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", margin: "16px 0 14px" }} className="h-grad">
            {t.h2Partners}
          </h2>
          <p className="muted" style={{ fontSize: 17, marginBottom: 24 }}>
            {t.partnersP}
          </p>
          <Button to="/contact">{t.talkPartner}</Button>
        </div>
      </Section>

      <PreScreenCTABlock expert="ivan" />
    </>
  );
}
