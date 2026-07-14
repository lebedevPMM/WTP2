import { useState } from "react";
import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { Avatar } from "../components/Avatar";
import { useContent } from "../content/i18n";
import { useLang } from "../i18n/lang";
import { site, CALCOM_LINK } from "../lib/site";
import { submitPreScreen } from "../lib/bitrix";
import { trackLeadSubmit } from "../lib/analytics";

// Contact / Request a pre-screen — the conversion surface.
// Booking: cal.com embed when VITE_CALCOM_LINK is set; lead form always posts to Bitrix24.
export default function Contact() {
  const c = useContent();
  const olya = c.getExpert("olya");
  const [state, setState] = useState<"idle" | "sending" | "done" | "offline">("idle");
  const lang = useLang();
  const t = lang === "ru"
    ? {
        seoTitle: "Записаться на пре-скрининг — WTP",
        seoDesc: "Запишитесь на 15-минутный пре-скрининг с конкретным экспертом WTP — реалистичная оценка вашей банкабельности и банковский роадмап за 5–7 дней.",
        bcHome: "Главная",
        bcContact: "Записаться на пре-скрининг",
        eyebrowHero: "Пре-скрининг",
        h1: "Запишитесь на 15-минутный пре-скрининг",
        lead: "Конкретный эксперт оценит вашу банкабельность и даст реалистичный банковский роадмап — 5–7 дней, без обязательств.",
        eyebrowPick: "Выберите время",
        iframeTitle: "Записаться на пре-скрининг",
        eyebrowFormEmail: "Предпочитаете почту?",
        eyebrowFormReq: "Записаться на пре-скрининг",
        formIntro: "Оставьте контакты — конкретный эксперт ответит в течение одного рабочего дня.",
        fullName: "Имя и фамилия",
        email: "Email",
        basedWhere: "Где вы сейчас находитесь?",
        situation: "Опишите вашу ситуацию (необязательно)",
        btnSending: "Отправляем…",
        btnRequest: "Записаться на пре-скрининг",
        offlineA: "Не удалось отправить прямо сейчас — свяжитесь с нами напрямую:",
        offlineB: " или в Telegram.",
        // ВЫЧИТКА ОЛЕ: заявление об обработке персональных данных (конфиденциальность) — юридически значимо
        formPrivacy: "Мы отвечаем в течение одного рабочего дня. Ваши данные обрабатываются конфиденциально.",
        eyebrowWho: "С кем вы будете общаться",
        eyebrowChannels: "Прямые каналы связи",
      }
    : {
        seoTitle: "Request a pre-screen — WTP",
        seoDesc: "Request a 15-minute pre-screen with a named WTP expert — a realistic read on your bankability and a Banking Roadmap in 5–7 days.",
        bcHome: "Home",
        bcContact: "Request a pre-screen",
        eyebrowHero: "The pre-screen",
        h1: "Request your 15-minute pre-screen",
        lead: "A named expert assesses your bankability and gives you a realistic Banking Roadmap — 5–7 days, no obligation.",
        eyebrowPick: "Pick a time",
        iframeTitle: "Request a pre-screen",
        eyebrowFormEmail: "Prefer email?",
        eyebrowFormReq: "Request your pre-screen",
        formIntro: "Leave your details and a named expert replies within one business day.",
        fullName: "Full name",
        email: "Email",
        basedWhere: "Where are you based today?",
        situation: "What's the situation? (optional)",
        btnSending: "Sending…",
        btnRequest: "Request my pre-screen",
        offlineA: "Couldn't submit just now — reach us directly at",
        offlineB: " or on Telegram.",
        // ВЫЧИТКА ОЛЕ: personal-data handling (confidentiality) claim — legally operative
        formPrivacy: "We reply within one business day. Your details are handled confidentially.",
        eyebrowWho: "Who you'll speak with",
        eyebrowChannels: "Direct channels",
      };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      const r = await submitPreScreen({
        name: String(f.get("name") || ""),
        email: String(f.get("email") || ""),
        origin: String(f.get("origin") || ""),
        note: String(f.get("note") || ""),
      });
      if (r.ok) {
        trackLeadSubmit("pre_screen"); // no-op without consent; gtag/fbq use beacon transport, survives the redirect
        window.location.href = "/thank-you";
        return;
      }
      setState("offline");
    } catch {
      setState("offline");
    }
  }

  return (
    <>
      <Seo
        title={t.seoTitle}
        description={t.seoDesc}
        canonical="/contact"
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: t.bcHome, href: "/" }, { label: t.bcContact }]} />
        <Eyebrow>{t.eyebrowHero}</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          {t.h1}
        </h1>
        <p className="lead">
          {t.lead}
        </p>
      </Section>

      {/* cal.com booking embed (if configured) */}
      {CALCOM_LINK && (
        <Section>
          <Eyebrow>{t.eyebrowPick}</Eyebrow>
          <div style={{ marginTop: 20, borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "var(--deep-2)" }}>
            <iframe
              title={t.iframeTitle}
              src={`https://cal.com/${CALCOM_LINK}?embed=true&theme=dark`}
              style={{ width: "100%", height: 680, border: 0, display: "block" }}
            />
          </div>
        </Section>
      )}

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40 }} className="grid-2">
          {/* Lead form → Bitrix24 */}
          <form className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }} onSubmit={onSubmit}>
            <div>
              <Eyebrow>{CALCOM_LINK ? t.eyebrowFormEmail : t.eyebrowFormReq}</Eyebrow>
              <p style={{ fontSize: 13.5, color: "var(--ink-55)", marginTop: 8 }}>
                {t.formIntro}
              </p>
            </div>
            {[
              { label: t.fullName, type: "text", name: "name", required: true },
              { label: t.email, type: "email", name: "email", required: true },
              { label: t.basedWhere, type: "text", name: "origin", required: false },
            ].map((f) => (
              <label key={f.name} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <span style={{ fontSize: 13.5, color: "var(--ink-55)" }}>{f.label}</span>
                <input
                  required={f.required}
                  type={f.type}
                  name={f.name}
                  style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--deep)", color: "var(--ink)", fontSize: 15 }}
                />
              </label>
            ))}
            <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={{ fontSize: 13.5, color: "var(--ink-55)" }}>{t.situation}</span>
              <textarea name="note" rows={3} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--deep)", color: "var(--ink)", fontSize: 15, resize: "vertical" }} />
            </label>
            <Button>{state === "sending" ? t.btnSending : t.btnRequest}</Button>
            {state === "offline" && (
              <p style={{ fontSize: 13, color: "var(--gold)" }}>
                {t.offlineA}{" "}
                <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>{t.offlineB}
              </p>
            )}
            <p style={{ fontSize: 12, color: "var(--ink-40)" }}>{t.formPrivacy}</p>
          </form>

          {/* Who + channels */}
          <div>
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <Eyebrow>{t.eyebrowWho}</Eyebrow>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                <Avatar expert={olya} size={48} />
                <div>
                  <div style={{ fontWeight: 700, fontFamily: "var(--font-display)" }}>{olya.name}</div>
                  <div style={{ fontSize: 13, color: "var(--gold)" }}>{olya.title}</div>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <Eyebrow>{t.eyebrowChannels}</Eyebrow>
              <ul style={{ marginTop: 14, listStyle: "none", padding: 0, fontSize: 14.5, color: "var(--ink-70)", display: "flex", flexDirection: "column", gap: 11 }}>
                <li>{site.office}</li>
                <li><a href={`mailto:${site.email}`} style={{ color: "var(--ink)" }}>{site.email}</a></li>
                <li><a href={site.phoneHref} style={{ color: "var(--ink)" }}>{site.phone}</a></li>
                <li><a href={site.telegram} target="_blank" rel="noreferrer" style={{ color: "var(--ink)" }}>Telegram</a> · <a href={site.whatsapp} target="_blank" rel="noreferrer" style={{ color: "var(--ink)" }}>WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
