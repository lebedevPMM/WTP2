import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { useLang } from "../i18n/lang";

const PARTNER_SITE = "https://partners.wtp.ae/";

export default function Partners() {
  const lang = useLang();
  const t =
    lang === "ru"
      ? {
          seoTitle: "Партнёрам — WTP",
          // ВЫЧИТКА ОЛЕ: описание регулируемых услуг (банкинг, структуры, резидентство)
          seoDesc:
            "Юристам, консультантам, семейным офисам и брокерам: передайте клиента и сохраните отношения. WTP берёт на себя исполнение в ОАЭ — банкинг, структуры и резидентство под единой точкой ответственности.",
          crumbHome: "Главная",
          crumbPartners: "Партнёрам",
          eyebrowHero: "Партнёрам",
          h1a: "Передайте клиента.",
          h1b: "Сохраните отношения.",
          // ВЫЧИТКА ОЛЕ: комплаенс-формулировка («должно пройти комплаенс»)
          lead:
            "Налоговым и юридическим консультантам, семейным офисам и брокерам с глобально мобильными клиентами. Отношения с клиентом и стратегия остаются за вами; мы берём на себя то, что большинству фирм не под силу, — исполнение в ОАЭ, которое должно пройти комплаенс.",
          ctaOpenProgramme: "Открыть партнёрскую программу",
          ctaTalk: "Обсудить кейс",
          eyebrowHow: "Как мы работаем с партнёрами",
          how: [
            // ВЫЧИТКА ОЛЕ: обязательство о неконкуренции за клиента (non-solicitation)
            {
              title: "Клиент остаётся вашим",
              body: "Отношения остаются вашими. Мы никогда не выходим на вашего клиента самостоятельно — исполнение в ОАЭ ведём под вашим брендом или под нашим, как вам удобнее.",
            },
            // ВЫЧИТКА ОЛЕ: комплаенс / регуляторное заявление
            {
              title: "Единая точка ответственности",
              body: "Один контакт по кейсу и структурированные обновления статуса, а досье собрано так, чтобы пройти комплаенс с первого раза — рекомендация никогда не вернётся бумерангом к вашему регулятору.",
            },
            // ВЫЧИТКА ОЛЕ: мандат, условия и долговечность структуры
            {
              title: "Рекомендация или white-label",
              body: "Порекомендуйте клиента — и мы отчитываемся перед вами, либо ведём мандат под вашим брендом. В любом варианте — прозрачные условия и структура, которая устоит и через пять лет.",
            },
          ],
          eyebrowWho: "Кому это подходит",
          for: [
            "Налоговые и юридические консультанты, чьи клиенты заводят капитал или бизнес-операции в ОАЭ",
            "Семейные офисы, которым нужен оператор банковского уровня на месте",
            "Управляющие капиталом и брокеры, которые раз за разом упираются в банковскую стену",
          ],
          eyebrowProgramme: "Партнёрская программа",
          h2: "Условия, материалы и вся программа",
          muted:
            "На отдельном сайте для партнёров — модель работы, опция white-label, условия и материалы, а также то, как мы отчитываемся перед вами по кейсам.",
          ctaOpenSite: "Открыть partners.wtp.ae",
        }
      : {
          seoTitle: "For partners — WTP",
          seoDesc:
            "For lawyers, advisors, family offices and brokers: refer your client and keep the relationship. WTP is the UAE execution partner that runs banking, structures and residency under one point of responsibility.",
          crumbHome: "Home",
          crumbPartners: "For partners",
          eyebrowHero: "For partners",
          h1a: "Refer your client.",
          h1b: "Keep the relationship.",
          lead:
            "For tax and legal advisors, family offices and brokers with internationally mobile clients. You hold the relationship and the strategy; we run the part most firms can’t — the UAE execution that has to clear compliance.",
          ctaOpenProgramme: "Open the partner programme",
          ctaTalk: "Talk to us about a case",
          eyebrowHow: "How we work with partners",
          how: [
            {
              title: "You keep the client",
              body: "The relationship stays yours. We never approach your client independently — we run the UAE execution behind your brand or ours, however you prefer.",
            },
            {
              title: "One point of responsibility",
              body: "One contact on the case and structured updates, with a file built to clear compliance the first time — so a referral never boomerangs back to your regulator.",
            },
            {
              title: "Referral or white-label",
              body: "Refer the client and we report to you, or we run the mandate under your brand. Clear terms either way, and a structure that still holds in five years.",
            },
          ],
          eyebrowWho: "Who it’s for",
          for: [
            "Tax and legal advisors with clients moving capital or operations to the UAE",
            "Family offices that need a banking-grade operator on the ground",
            "Wealth managers and brokers who keep hitting the banking wall",
          ],
          eyebrowProgramme: "The partner programme",
          h2: "Terms, materials and the full programme",
          muted:
            "The dedicated partner site has the engagement model, the white-label option, terms and materials — and how cases are reported back to you.",
          ctaOpenSite: "Open partners.wtp.ae",
        };
  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDesc}
        canonical="/partners"
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.crumbHome, href: "/" }, { label: t.crumbPartners }]} />
        <Eyebrow>{t.eyebrowHero}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.h1a} <span className="g">{t.h1b}</span>
        </h1>
        <p className="lead">
          {t.lead}
        </p>
        <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a className="btn" href={PARTNER_SITE} target="_blank" rel="noreferrer">{t.ctaOpenProgramme}</a>
          <Button to="/contact" ghost>{t.ctaTalk}</Button>
        </div>
      </Section>

      <Section>
        <Eyebrow>{t.eyebrowHow}</Eyebrow>
        <div className="grid-3" style={{ marginTop: 24 }}>
          {t.how.map((h) => (
            <div key={h.title} className="card" style={{ padding: 24 }}>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 10 }}>{h.title}</div>
              <p style={{ fontSize: 14.5, color: "var(--ink-70)", lineHeight: 1.6 }}>{h.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>{t.eyebrowWho}</Eyebrow>
          <ul style={{ marginTop: 18, listStyle: "none", padding: 0 }}>
            {t.for.map((f) => (
              <li key={f} style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", display: "flex", gap: 10, fontSize: 16 }}>
                <span style={{ color: "var(--gold)" }}>→</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div style={{ padding: "40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)", maxWidth: 760 }}>
          <Eyebrow>{t.eyebrowProgramme}</Eyebrow>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", margin: "16px 0 14px" }} className="h-grad">
            {t.h2}
          </h2>
          <p className="muted" style={{ fontSize: 17, marginBottom: 24 }}>
            {t.muted}
          </p>
          <a className="btn" href={PARTNER_SITE} target="_blank" rel="noreferrer">{t.ctaOpenSite}</a>
        </div>
      </Section>
    </>
  );
}
