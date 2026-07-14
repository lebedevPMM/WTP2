import { L as Link, useLang } from "../i18n/lang";
import { ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo";
import { Hero } from "../components/Hero";
import { Section, Eyebrow, Button } from "../components/ui";
import { StatBar } from "../components/StatBar";
import { StepperBankingFirst } from "../components/StepperBankingFirst";
import { CaseCard } from "../components/CaseCard";
import { ArticleCard } from "../components/ArticleCard";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { useContent } from "../content/i18n";

export default function Home() {
  const c = useContent();
  const lang = useLang();
  const t = lang === "ru"
    ? {
        seoTitle: "WTP — бэк-офис для частного капитала.",
        seoDesc:
          "WTP — бэк-офис для частного капитала: доступ к банкингу, структуры, наследование и резидентство, реализованные там, где они работают лучше всего. ОАЭ — наш домашний рынок, а не то, что мы продаём. Запишитесь на пре-скрининг к конкретному эксперту.",
        // ВЫЧИТКА ОЛЕ: количественная заявка о трек-рекорде банкинга (100+ открытых счетов)
        stat1Label: "открытых счетов в ОАЭ",
        stat1Source: "трек-рекорд WTP",
        // ВЫЧИТКА ОЛЕ: заявка о доле успеха по банкингу (90%+ доходят до рабочего счёта)
        stat2Label: "дел, которые берём в работу, доходят до рабочего счёта",
        stat2Source: "данные пре-скрининга WTP",
        stat3Label: "банков ОАЭ, с которыми работаем",
        stat3Source: "банковский деск WTP",
        stat4Value: "3 дня–1 нед.",
        stat4Label: "до личного счёта после одобрения",
        stat4Source: "типичный срок",
        idEyebrow: "Кто мы",
        idH2a: "Закрытая команда, которая ведёт ",
        idH2b: "банкинг, структуру и наследование состояния.",
        // ВЫЧИТКА ОЛЕ: заявка о снятии комплаенса, которую другие не проходят (регуляторная формулировка)
        idLead:
          "Банкинг, компания, структуры, резидентство и наследование — под ключ силами одной ответственной команды, как family office ведёт дела семьи. Решения за вами; мы воплощаем их и снимаем комплаенс, на котором спотыкаются все остальные.",
        svcEyebrow: "Что мы делаем",
        svcH2: "Четыре направления, одна ответственная команда",
        svcExplore: "Подробнее",
        bfEyebrow: "Методология",
        bfH2: "Банк → Компания → Виза → Активы",
        bfButton: "Как работает методология",
        casesEyebrow: "Доказательства",
        casesH2: "Закрытые мандаты",
        casesButton: "Все кейсы",
        insEyebrow: "Аналитика",
        insH2: "Практические гайды за подписью эксперта",
        insButton: "Все гайды",
        teamEyebrow: "Реальные люди — с именами и ответственностью",
        teamH2: "Знакомьтесь с экспертами",
        teamButton: "Все эксперты",
        whoEyebrow: "Кому мы помогаем",
        segUkNonDom: "UK non-dom",
        segDachExitTax: "DACH exit-tax",
        segNlBox3: "NL Box 3",
        segPartners: "Для партнёров",
      }
    : {
        seoTitle: "WTP — The back office for private wealth.",
        seoDesc:
          "WTP is the back office for private wealth — banking access, structures, succession and residency, executed where they work best. The UAE is our home market, not our pitch. Book a pre-screen with a named expert.",
        stat1Label: "UAE accounts opened",
        stat1Source: "WTP track record",
        stat2Label: "of the cases we take on reach a working account",
        stat2Source: "WTP pre-screen data",
        stat3Label: "UAE banks we work across",
        stat3Source: "WTP banking desk",
        stat4Value: "3 days–1 wk",
        stat4Label: "to a personal account once approved",
        stat4Source: "typical timeline",
        idEyebrow: "What we are",
        idH2a: "The discreet team that runs ",
        idH2b: "a fortune's banking, structure and succession.",
        idLead:
          "Banking, company, structures, residency and succession — handled end to end by one accountable team, the way a family office runs a household. You make the decisions; we make them work, and clear the compliance that stops everyone else.",
        svcEyebrow: "What we do",
        svcH2: "Four lines, one accountable team",
        svcExplore: "Explore",
        bfEyebrow: "The methodology",
        bfH2: "Bank → Company → Visa → Assets",
        bfButton: "How the methodology works",
        casesEyebrow: "Proof",
        casesH2: "Closed mandates",
        casesButton: "All cases",
        insEyebrow: "Insights",
        insH2: "Practical guides, signed by the expert",
        insButton: "All guides",
        teamEyebrow: "Real people, named, accountable",
        teamH2: "Meet the experts",
        teamButton: "All experts",
        whoEyebrow: "Who we help",
        segUkNonDom: "UK non-dom",
        segDachExitTax: "DACH exit-tax",
        segNlBox3: "NL Box 3",
        segPartners: "For partners",
      };

  // Live destinations until dedicated segment landing pages exist (see audit decision D).
  const segments = [
    { label: t.segUkNonDom, href: "/insights/assets-tax/uk-non-dom-leaving-for-the-uae" },
    { label: t.segDachExitTax, href: "/insights/assets-tax/german-exit-tax-before-you-move" },
    { label: t.segNlBox3, href: "/insights/assets-tax" },
    { label: t.segPartners, href: "/partners" },
  ];

  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDesc}
        canonical="/"
      />
      <Hero />

      {/* Proof bar — provenance on every number (SPEC law #5). Confirmed mandate stats. */}
      <Section>
        <StatBar
          stats={[
            { value: "100+", label: t.stat1Label, source: t.stat1Source },
            { value: "90%+", label: t.stat2Label, source: t.stat2Source },
            { value: "7+", label: t.stat3Label, source: t.stat3Source },
            { value: t.stat4Value, label: t.stat4Label, source: t.stat4Source },
          ]}
        />
      </Section>

      {/* Identity — per MESSAGE-SPEC the home leads with who we are + the edge, not "banks say no" */}
      <Section className="section" >
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>{t.idEyebrow}</Eyebrow>
          <h2 style={{ fontSize: "clamp(28px,4vw,46px)", margin: "20px 0 16px" }} className="h-grad">
            {t.idH2a}<span className="g">{t.idH2b}</span>
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            {t.idLead}
          </p>
        </div>
      </Section>

      {/* The 4 services */}
      <Section>
        <Eyebrow>{t.svcEyebrow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          {t.svcH2}
        </h2>
        <div className="grid-4">
          {c.services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="card" style={{ padding: 22, display: "flex", flexDirection: "column" }}>
              <span className="chip" style={{ alignSelf: "flex-start", marginBottom: 14 }}>
                {s.tierRange}
              </span>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.line}</div>
              <p style={{ fontSize: 14, color: "var(--ink-55)", marginBottom: 18 }}>{s.outcomeHeadline}</p>
              <span style={{ marginTop: "auto", color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600 }}>
                {t.svcExplore} <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Banking-First explainer */}
      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <Eyebrow>{t.bfEyebrow}</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", marginTop: 16 }} className="h-grad">
              {t.bfH2}
            </h2>
          </div>
          <Button to="/banking-first" ghost>
            {t.bfButton}
          </Button>
        </div>
        <StepperBankingFirst />
      </Section>

      {/* Cases teaser */}
      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <Eyebrow>{t.casesEyebrow}</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", marginTop: 16 }} className="h-grad">
              {t.casesH2}
            </h2>
          </div>
          <Button to="/cases" ghost>
            {t.casesButton}
          </Button>
        </div>
        <div className="grid-3">
          {c.latestCases(3).map((c) => (
            <CaseCard key={c.slug} case={c} />
          ))}
        </div>
      </Section>

      {/* Insights teaser */}
      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <Eyebrow>{t.insEyebrow}</Eyebrow>
            <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", marginTop: 16 }} className="h-grad">
              {t.insH2}
            </h2>
          </div>
          <Button to="/insights" ghost>
            {t.insButton}
          </Button>
        </div>
        <div className="grid-3">
          {c.latestArticles(3).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>

      {/* Team / authority band */}
      <Section>
        <Eyebrow>{t.teamEyebrow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          {t.teamH2}
        </h2>
        <div className="grid-3">
          {c.expertList.map((e) => (
            <ExpertBioCard key={e.id} expert={e} />
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <Button to="/about/team" ghost>
            {t.teamButton}
          </Button>
        </div>
      </Section>

      {/* Who we help strip */}
      <Section>
        <div style={{ padding: "40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)" }}>
          <Eyebrow>{t.whoEyebrow}</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
            {segments.map((s) => (
              <Link key={s.href} to={s.href} className="chip" style={{ padding: "10px 18px", fontSize: 14 }}>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
