import { L as Link, useLang } from "../i18n/lang";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow, Button, Chip } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { useContent } from "../content/i18n";
import { Seo } from "../components/Seo";
import { collectionLd } from "../lib/schema";

export default function ServicesOverview() {
  const c = useContent();
  const lang = useLang();
  const t =
    lang === "ru"
      ? {
          seoTitle: "Услуги — WTP",
          seoDesc:
            "Сильные стороны, которые мы задействуем для частных клиентов — банкинг, регистрация компании, резидентство и капитал — выстроены так, чтобы структура была банкабельной с первого дня.",
          bcHome: "Главная",
          bcServices: "Услуги",
          eyebrowServices: "Услуги",
          h1a: "Четыре направления,",
          h1b: "одна ответственная команда",
          lead:
            "Сильные стороны, которые мы задействуем для частных клиентов — банкинг, регистрация компании, резидентство и капитал — выстроены так, чтобы структура была банкабельной с первого дня, и применяются только там, где они действительно уместны. Каждое направление ведёт конкретный эксперт, а не очередь передач из рук в руки.",
          chipStartHere: "Начните здесь",
          eyebrowDiagnostic: "Начните с диагностики",
          diagnosticIntro:
            "Перед любой услугой мы разбираем вашу реальную ситуацию — чтобы вы понимали, где стоите, ещё до того, как потратите хоть один дирхам. Два способа начать.",
          startLink: "Начать",
          eyebrowWhatWeDo: "Что мы делаем",
          h2Pick: "Выберите направление под ваш следующий шаг",
          ledBy: "Ведёт",
          exploreLink: "Подробнее",
          eyebrowWhereFit: "Куда относится моя ситуация?",
          routerIntro:
            "Большинство мандатов начинаются с одного направления и подтягивают остальные. Перейдите к тому, что ближе всего к вашей задаче, — или расскажите, где вы стоите, и мы направим вас.",
          routerNotSure: "Не уверены — поговорите с нами",
          eyebrowMethodology: "Методология",
          h2BankA: "Сначала банк.",
          h2BankB: "Потом всё остальное.",
          methodologyIntro:
            "Эти четыре направления — не меню: они идут последовательно. Банк — самый сложный барьер, поэтому мы проходим его раньше компании, визы и активов.",
          btnHow: "Как работает методология",
          btnPackages: "Посмотреть четыре пакета",
        }
      : {
          seoTitle: "Services — WTP",
          seoDesc:
            "The strengths we deploy for private clients — banking, business setup, residency and wealth — sequenced so the structure is bankable from day one.",
          bcHome: "Home",
          bcServices: "Services",
          eyebrowServices: "Services",
          h1a: "Four lines,",
          h1b: "one accountable team",
          lead:
            "The strengths we deploy for private clients — banking, business setup, residency and wealth — sequenced so the structure is bankable from day one, and used only where they fit. Each is led by a named expert, not a handoff queue.",
          chipStartHere: "Start here",
          eyebrowDiagnostic: "Begin with a diagnostic",
          diagnosticIntro:
            "Before any service, we read your real situation — so you know where you stand before you spend a dirham. Two ways to start.",
          startLink: "Start",
          eyebrowWhatWeDo: "What we do",
          h2Pick: "Pick the line that matches your next move",
          ledBy: "Led by",
          exploreLink: "Explore",
          eyebrowWhereFit: "Where does my situation fit?",
          routerIntro:
            "Most mandates start in one line and pull in the others. Jump to the one closest to your problem — or tell us where you stand and we'll route it.",
          routerNotSure: "Not sure — talk to us",
          eyebrowMethodology: "The methodology",
          h2BankA: "Bank first.",
          h2BankB: "Then everything else.",
          methodologyIntro:
            "These four lines aren't a menu — they run in sequence. The bank is the hardest gate, so we clear it before the company, the visa or the assets.",
          btnHow: "How the methodology works",
          btnPackages: "See the four packages",
        };
  const diagnostics = c.productsByCategory("diagnostics");
  const routerChips: { label: string; href: string }[] = [
    ...c.services.map((s) => ({ label: s.line, href: `/services/${s.slug}` })),
    { label: t.routerNotSure, href: "/contact" },
  ];
  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDesc}
        canonical="/services"
        jsonLd={collectionLd({ name: t.seoTitle, description: t.seoDesc, path: "/services", lang })}
      />
      {/* Hero */}
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.bcHome, href: "/" }, { label: t.bcServices }]} />
        <Eyebrow>{t.eyebrowServices}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.h1a} <span className="g">{t.h1b}</span>
        </h1>
        <p className="lead">{t.lead}</p>
      </Section>

      {/* Start here — diagnostics axis */}
      {diagnostics.length > 0 && (
        <Section>
          <div style={{ padding: "36px 40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--gold-30, var(--line))" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Chip>{t.chipStartHere}</Chip>
              <Eyebrow>{t.eyebrowDiagnostic}</Eyebrow>
            </div>
            <p className="muted" style={{ fontSize: 17, maxWidth: 600, marginBottom: 24 }}>
              {t.diagnosticIntro}
            </p>
            <div className="grid-2">
              {diagnostics.map((p) => (
                <Link key={p.slug} to={p.href} className="card" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, marginBottom: 8 }}>
                    {p.displayName}
                  </div>
                  <p style={{ fontSize: 14.5, color: "var(--ink-55)", marginBottom: 18, lineHeight: 1.55 }}>{p.oneLiner}</p>
                  <span style={{ marginTop: "auto", color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600 }}>
                    {t.startLink} <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* The 4 services */}
      <Section>
        <Eyebrow>{t.eyebrowWhatWeDo}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          {t.h2Pick}
        </h2>
        <div className="grid-2">
          {c.services.map((s) => {
            const lead = c.getExpert(s.leadExpert);
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="card"
                style={{ padding: 30, display: "flex", flexDirection: "column" }}
              >
                <span className="chip" style={{ alignSelf: "flex-start", marginBottom: 16 }}>
                  {s.tierRange}
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 22,
                    marginBottom: 10,
                  }}
                >
                  {s.line}
                </div>
                <p
                  style={{
                    fontSize: 17,
                    color: "var(--ink)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}
                >
                  {s.outcomeHeadline}
                </p>
                <p style={{ fontSize: 14.5, color: "var(--ink-55)", marginBottom: 22, lineHeight: 1.6 }}>
                  {s.subhead}
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 13.5, color: "var(--ink-55)" }}>{t.ledBy} {lead.name}</span>
                  <span
                    style={{
                      color: "var(--gold)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {t.exploreLink} <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Where does my situation fit — router band */}
      <Section>
        <div
          style={{
            padding: "40px",
            borderRadius: 20,
            background: "var(--deep-2)",
            border: "1px solid var(--line)",
          }}
        >
          <Eyebrow>{t.eyebrowWhereFit}</Eyebrow>
          <p className="muted" style={{ fontSize: 17, maxWidth: 560, marginTop: 14 }}>
            {t.routerIntro}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
            {routerChips.map((c) => (
              <Link
                key={c.href + c.label}
                to={c.href}
                className="chip"
                style={{ padding: "10px 18px", fontSize: 14 }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Banking-first reminder strip */}
      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ maxWidth: 620 }}>
            <Eyebrow>{t.eyebrowMethodology}</Eyebrow>
            <h2 style={{ fontSize: "clamp(22px,3vw,32px)", margin: "16px 0 12px" }} className="h-grad">
              {t.h2BankA} <span className="g">{t.h2BankB}</span>
            </h2>
            <p className="muted" style={{ fontSize: 17 }}>
              {t.methodologyIntro}
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button to="/banking-first" ghost>
              {t.btnHow}
            </Button>
            <Button to="/packages">{t.btnPackages}</Button>
          </div>
        </div>
      </Section>

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
