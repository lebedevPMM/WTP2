import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { ExpertBioCard } from "../components/ExpertBioCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { useContent } from "../content/i18n";
import { useLang } from "../i18n/lang";

export default function PreScreen() {
  const c = useContent();
  const lang = useLang();
  const olya = c.getExpert("olya");

  const t =
    lang === "ru"
      ? {
          seoTitle: "Pre-Screen — WTP",
          seoDesc:
            "Что действительно важно до подачи заявки: происхождение средств, структура и резидентство. 15-минутный пре-скрининг и письменный банковский роадмап за 5–7 дней.",
          bcHome: "Главная",
          bcBankingFirst: "Banking-First",
          bcPreScreen: "Pre-Screen",
          heroEyebrow: "Пре-скрининг",
          heroH1a: "Что действительно важно ",
          heroH1b: "до подачи заявки",
          heroLead:
            "Большинство консультантов открывают компанию и надеются, что банк скажет «да». Мы сначала разбираемся в вашей реальной ситуации — средства, структура, резидентство — чтобы вы приходили в банк уже банкабельными, а не в надежде на «да».",
          heroCta: "Записаться на 15-минутный пре-скрининг",
          checksEyebrow: "Что проверяет пре-скрининг",
          checksH2: "Четыре фактора, по которым банк принимает решение ещё до открытия счёта",
          checks: [
            {
              title: "Происхождение средств",
              body: "Откуда пришли деньги и выдержит ли эта история взгляд комплаенс-офицера. Это первое, что читает банк, — и первое, на чём спотыкаются честные заявители.",
            },
            {
              title: "Структура",
              body: "Как устроены ваша компания, структура владения и подписанты. Лицензия, собранная неправильно, выглядит небанкабельной ещё до того, как вы переступите порог.",
            },
            {
              title: "Статус резидентства",
              body: "Где вы налоговый резидент сегодня и куда движетесь. Банки сопоставляют это с профилем, который им разрешено брать на обслуживание.",
            },
            {
              title: "Соответствие профиля",
              body: "Какие банки действительно могут сказать «да» такому клиенту, как вы. Мы подбираем вам институты, которые принимают ваш профиль, — а не те, что тихо откажут.",
            },
          ],
          declineEyebrow: "Почему банки отказывают",
          // ВЫЧИТКА ОЛЕ: banking-decline claim — legally-operative
          declineH2a: "",
          declineH2b: "Заметная доля",
          declineH2c: " честных заявок получает отказ",
          // ВЫЧИТКА ОЛЕ: banking-decline framing — legally-operative
          declineBody:
            "Не потому что с заявителем что-то не так, — а потому что история происхождения средств, структура или выбранный банк не подошли. Почти всё это можно предотвратить, если заметить это до подачи заявки. В этом и весь смысл пре-скрининга.",
          formatEyebrow: "Формат на 15 минут",
          formatH2: "Пятнадцать минут на входе. Банковский роадмап на выходе.",
          formatSub:
            "Звонок короткий намеренно. Письменный банковский роадмап приходит в течение 5–7 дней.",
          format: [
            {
              title: "Вы говорите с конкретным экспертом",
              body: "15-минутный звонок с человеком, который руководит банковским направлением, а не с отделом продаж. Честные вопросы, честные ответы.",
            },
            {
              title: "Мы разбираемся в вашей реальной ситуации",
              body: "Средства, структура, резидентство и сроки — в сопоставлении с тем, что банки могут и не могут одобрить прямо сейчас.",
            },
            {
              title: "Вы получаете банковский роадмап",
              body: "В течение 5–7 дней — реалистичная письменная оценка того, где вы находитесь и что нужно исправить до подачи заявки.",
            },
          ],
          getEyebrow: "Что вы получаете",
          getH2: "Банковский роадмап",
          getBody:
            "Короткая письменная оценка, по которой можно действовать, — работаете вы с нами или нет. Без обязательств, без давления, без выдуманных обещаний.",
          roadmap: [
            "Честная оценка того, банкабелен ли ваш профиль в текущем виде",
            "Конкретные банки, которые подходят вашему профилю, — и те, которых стоит избегать",
            "Что в истории происхождения средств или структуре нужно исправить в первую очередь",
            "Правильная последовательность: банк, компания, виза, активы — именно в этом порядке",
            "Реалистичные сроки — без обещаний, которые банк потом сможет нарушить",
          ],
          whoEyebrow: "Кто проводит",
          whoH2: "Конкретный эксперт, а не отдел продаж",
        }
      : {
          seoTitle: "The Pre-Screen — WTP",
          seoDesc:
            "What actually matters before you apply: source of funds, structure and residency. A 15-minute pre-screen and a written Banking Roadmap in 5–7 days.",
          bcHome: "Home",
          bcBankingFirst: "Banking-First",
          bcPreScreen: "The Pre-Screen",
          heroEyebrow: "The pre-screen",
          heroH1a: "What actually matters ",
          heroH1b: "before you apply",
          heroLead:
            "Most advisors set up the company and hope the bank says yes. We read your real situation first — funds, structure, residency — so you walk in already bankable, not hoping.",
          heroCta: "Request a 15-minute pre-screen",
          checksEyebrow: "What a pre-screen checks",
          checksH2: "Four things a bank decides on before you open an account",
          checks: [
            {
              title: "Source of funds",
              body: "Where the money came from, and whether the story holds up to a compliance officer. This is the first thing a bank reads — and the first place honest applicants get stuck.",
            },
            {
              title: "Structure",
              body: "How your company, ownership and signatories are arranged. A licence built the wrong way looks unbankable before you ever walk in.",
            },
            {
              title: "Residency status",
              body: "Where you are tax-resident today and where you're heading. Banks weigh this against the profile they're allowed to onboard.",
            },
            {
              title: "Profile fit",
              body: "Which banks can actually say yes to someone like you. We map you to the institutions that onboard your profile — not the ones that quietly won't.",
            },
          ],
          declineEyebrow: "Why banks decline",
          // ВЫЧИТКА ОЛЕ: banking-decline claim — legally-operative
          declineH2a: "A ",
          declineH2b: "meaningful share",
          declineH2c: " of honest applications get declined",
          // ВЫЧИТКА ОЛЕ: banking-decline framing — legally-operative
          declineBody:
            "Not because anything is wrong with the applicant — but because the source-of-funds story, the structure or the chosen bank didn't fit. Almost all of it is avoidable if you catch it before you apply. That's the entire point of the pre-screen.",
          formatEyebrow: "The 15-minute format",
          formatH2: "Fifteen minutes in. A Banking Roadmap out.",
          formatSub:
            "The call is short on purpose. The written Banking Roadmap follows within 5–7 days.",
          format: [
            {
              title: "You talk to a named expert",
              body: "A 15-minute call with the person who runs banking, not a sales desk. Honest questions, honest answers.",
            },
            {
              title: "We read your real situation",
              body: "Funds, structure, residency and timeline — against what banks can and can't approve right now.",
            },
            {
              title: "You get the Banking Roadmap",
              body: "Within 5–7 days, a realistic written assessment of where you stand and what to fix before you apply.",
            },
          ],
          getEyebrow: "What you get",
          getH2: "The Banking Roadmap",
          getBody:
            "A short, written assessment you can act on — whether you work with us or not. No obligation, no pressure, no fabricated promises.",
          roadmap: [
            "An honest read on whether your profile is bankable as it stands today",
            "The specific banks that fit your profile — and the ones to skip",
            "What in your source-of-funds story or structure needs fixing first",
            "The right sequence: bank, company, visa, assets — in that order",
            "A realistic timeline, with no promises a bank can later break",
          ],
          whoEyebrow: "Who runs it",
          whoH2: "A named expert, not a sales desk",
        };

  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDesc}
        canonical="/banking-first/pre-screen"
      />
      {/* Hero */}
      <Section className="page-hero">
        <Breadcrumb
          trail={[
            { label: t.bcHome, href: "/" },
            { label: t.bcBankingFirst, href: "/banking-first" },
            { label: t.bcPreScreen },
          ]}
        />
        <Eyebrow>{t.heroEyebrow}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.heroH1a}<span className="g">{t.heroH1b}</span>
        </h1>
        <p className="lead">{t.heroLead}</p>
        <div style={{ marginTop: 28 }}>
          <Button to="/contact" large>
            {t.heroCta}
          </Button>
        </div>
      </Section>

      {/* What a pre-screen checks */}
      <Section>
        <Eyebrow>{t.checksEyebrow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 32px" }} className="h-grad">
          {t.checksH2}
        </h2>
        <div className="grid-4">
          {t.checks.map((c) => (
            <div key={c.title} className="card" style={{ padding: 22, display: "flex", flexDirection: "column" }}>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 8 }}>
                {c.title}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-55)" }}>{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why banks decline */}
      <Section>
        <div style={{ padding: "40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)", maxWidth: 860 }}>
          <Eyebrow>{t.declineEyebrow}</Eyebrow>
          <h2 style={{ fontSize: "clamp(24px,3.2vw,36px)", margin: "16px 0 14px" }} className="h-grad">
            {t.declineH2a}<span className="g">{t.declineH2b}</span>{t.declineH2c}
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            {t.declineBody}
          </p>
        </div>
      </Section>

      {/* The 15-minute format */}
      <Section>
        <Eyebrow>{t.formatEyebrow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,40px)", margin: "16px 0 8px" }} className="h-grad">
          {t.formatH2}
        </h2>
        <p className="muted" style={{ fontSize: 16, maxWidth: 620, marginBottom: 32 }}>
          {t.formatSub}
        </p>
        <div className="grid-3">
          {t.format.map((f, i) => (
            <div key={i} className="card" style={{ padding: 22 }}>
              <div className="g" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, marginBottom: 10 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 6 }}>
                {f.title}
              </div>
              <p style={{ fontSize: 14, color: "var(--ink-55)" }}>{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What you get — the Banking Roadmap */}
      <Section>
        <div className="grid-2" style={{ alignItems: "start" }}>
          <div style={{ maxWidth: 460 }}>
            <Eyebrow>{t.getEyebrow}</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,3.2vw,34px)", margin: "16px 0 14px" }} className="h-grad">
              {t.getH2}
            </h2>
            <p className="muted" style={{ fontSize: 16 }}>
              {t.getBody}
            </p>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {t.roadmap.map((d, i) => (
                <li
                  key={i}
                  style={{
                    padding: "12px 0",
                    borderBottom: i < t.roadmap.length - 1 ? "1px solid var(--line)" : "none",
                    display: "flex",
                    gap: 10,
                    fontSize: 15.5,
                    color: "var(--ink-70)",
                  }}
                >
                  <span style={{ color: "var(--gold)" }}>→</span> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Who runs it */}
      <Section>
        <Eyebrow>{t.whoEyebrow}</Eyebrow>
        <h2 style={{ fontSize: "clamp(24px,3.2vw,34px)", margin: "16px 0 24px" }} className="h-grad">
          {t.whoH2}
        </h2>
        <div style={{ maxWidth: 440 }}>
          <ExpertBioCard expert={olya} />
        </div>
      </Section>

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
