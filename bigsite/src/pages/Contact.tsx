import { useState } from "react";
import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";
import { Avatar } from "../components/Avatar";
import { getExpert } from "../content/experts";
import { site, CALCOM_LINK } from "../lib/site";
import { submitPreScreen } from "../lib/bitrix";

// Contact / Request a pre-screen — the conversion surface.
// Booking: cal.com embed when VITE_CALCOM_LINK is set; lead form always posts to Bitrix24.
export default function Contact() {
  const olya = getExpert("olya");
  const [state, setState] = useState<"idle" | "sending" | "done" | "offline">("idle");

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
        title="Request a pre-screen — WTP"
        description="Request a 15-minute pre-screen with a named WTP expert — a realistic read on your bankability and a Banking Roadmap in 5–7 days."
        canonical="/contact"
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Request a pre-screen" }]} />
        <Eyebrow>The pre-screen</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          Request your 15-minute pre-screen
        </h1>
        <p className="lead">
          A named expert assesses your bankability and gives you a realistic Banking Roadmap — 5–7 days, no obligation.
        </p>
      </Section>

      {/* cal.com booking embed (if configured) */}
      {CALCOM_LINK && (
        <Section>
          <Eyebrow>Pick a time</Eyebrow>
          <div style={{ marginTop: 20, borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "var(--deep-2)" }}>
            <iframe
              title="Request a pre-screen"
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
              <Eyebrow>{CALCOM_LINK ? "Prefer email?" : "Request your pre-screen"}</Eyebrow>
              <p style={{ fontSize: 13.5, color: "var(--ink-55)", marginTop: 8 }}>
                Leave your details and a named expert replies within one business day.
              </p>
            </div>
            {[
              { label: "Full name", type: "text", name: "name", required: true },
              { label: "Email", type: "email", name: "email", required: true },
              { label: "Where are you based today?", type: "text", name: "origin", required: false },
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
              <span style={{ fontSize: 13.5, color: "var(--ink-55)" }}>What's the situation? (optional)</span>
              <textarea name="note" rows={3} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--deep)", color: "var(--ink)", fontSize: 15, resize: "vertical" }} />
            </label>
            <Button>{state === "sending" ? "Sending…" : "Request my pre-screen"}</Button>
            {state === "offline" && (
              <p style={{ fontSize: 13, color: "var(--gold)" }}>
                Couldn't submit just now — reach us directly at{" "}
                <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a> or on Telegram.
              </p>
            )}
            <p style={{ fontSize: 12, color: "var(--ink-40)" }}>We reply within one business day. Your details are handled confidentially.</p>
          </form>

          {/* Who + channels */}
          <div>
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <Eyebrow>Who you'll speak with</Eyebrow>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                <Avatar expert={olya} size={48} />
                <div>
                  <div style={{ fontWeight: 700, fontFamily: "var(--font-display)" }}>{olya.name}</div>
                  <div style={{ fontSize: 13, color: "var(--gold)" }}>{olya.title}</div>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <Eyebrow>Direct channels</Eyebrow>
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
