// Themed V1 Contact — THE RSVP LETTER.
// A paper letter panel: letterhead, salutation, one-paragraph promise,
// the form as ruled letter fields, letterpress seal-button. Submit logic
// mirrors the base Contact exactly (lib/bitrix → /thank-you | offline
// fallback). Optional cal.com embed kept when VITE_CALCOM_LINK is set.

import { useState } from "react";
import { getExpert } from "../../content/experts";
import { Avatar } from "../../components/Avatar";
import { site, CALCOM_LINK } from "../../lib/site";
import { submitPreScreen } from "../../lib/bitrix";
import { ISSUE, PageHead } from "./shared";

const FIELDS = [
  { label: "Full name", type: "text", name: "name", required: true, auto: "name" },
  { label: "Email", type: "email", name: "email", required: true, auto: "email" },
  { label: "Where are you relocating from?", type: "text", name: "origin", required: false, auto: "off" },
] as const;

export default function V1Contact() {
  const oleg = getExpert("oleg");
  const [state, setState] = useState<"idle" | "sending" | "done" | "offline">("idle");

  /* identical contract to the base Contact page — do not break the pipeline */
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
    <div className="v1s-root v1s-contact">
      <div className="v1s-container">
        <PageHead
          kicker="Correspondence · The pre-screen"
          folio="RSVP"
          title={
            <>
              Reply requested, <strong>within one business day.</strong>
            </>
          }
          standfirst={
            <>
              A 15-minute pre-screen with the banking desk — free, confidential and without
              obligation. If the route is viable, your Banking Roadmap follows in 5–7 days.
            </>
          }
        />

        {/* cal.com booking embed (only when configured — mirrors base) */}
        {CALCOM_LINK && (
          <section className="v1s-sec v1s-sec--tight" aria-label="Pick a time" style={{ paddingBottom: 0 }}>
            <span className="v1s-label">Prefer to pick a time directly?</span>
            <div className="v1s-embed">
              <iframe
                title="Book a pre-screen"
                src={`https://cal.com/${CALCOM_LINK}?embed=true&theme=light`}
                style={{ width: "100%", height: 680, border: 0, display: "block" }}
              />
            </div>
          </section>
        )}

        <div className="v1s-letter-grid">
          {/* the letter */}
          <div className="v1s-letter">
            <div className="v1s-letterhead">
              <span className="v1s-wordmark">
                WTP<i>.</i>
              </span>
              <span className="v1s-folio">
                {site.office} · {ISSUE.date}
              </span>
            </div>

            <p className="v1s-salutation">Dear prospective client,</p>
            <p className="v1s-letter-promise">
              Send us the particulars below and a named expert replies within one business day
              to arrange a 15-minute pre-screen. If your route to the Emirates is viable, you
              hold a Banking Roadmap within 5–7 days — a named bank, a named officer, a
              realistic timeline. If it is not, we will say so plainly, and it will have cost
              you nothing.
            </p>

            <form onSubmit={onSubmit}>
              {FIELDS.map((f) => (
                <label className="v1s-field" key={f.name}>
                  <span className="v1s-field-label">
                    {f.label}
                    {f.required ? " *" : ""}
                  </span>
                  <input
                    required={f.required}
                    type={f.type}
                    name={f.name}
                    autoComplete={f.auto}
                  />
                </label>
              ))}
              <label className="v1s-field">
                <span className="v1s-field-label">What’s the situation? (optional)</span>
                <textarea name="note" rows={3} />
              </label>

              <div className="v1s-letter-actions">
                <button type="submit" className="v1s-btn" disabled={state === "sending"}>
                  {state === "sending" ? "Sending…" : "Request the pre-screen"}
                </button>
                {state === "offline" && (
                  <p className="v1s-letter-offline" role="status">
                    Couldn’t submit just now — reach us directly at{" "}
                    <a href={`mailto:${site.email}`}>{site.email}</a> or on{" "}
                    <a href={site.telegram} target="_blank" rel="noreferrer">
                      Telegram
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>

            <div className="v1s-letter-small">
              <span>We reply within one business day</span>
              <span>5–7 days: L0 pre-screen terms</span>
              <span>Your details are handled confidentially</span>
            </div>
          </div>

          {/* margin column: who reads it + direct channels */}
          <aside className="v1s-contact-rail" aria-label="Who you'll speak with">
            <div className="v1s-facts-block">
              <span className="v1s-facts-head v1s-label v1s-label--ink">
                Who reads this letter
              </span>
              <div className="v1s-byline" style={{ marginTop: "1rem" }}>
                <Avatar expert={oleg} size={50} />
                <div>
                  <span className="v1s-byline-name">{oleg.name}</span>
                  <span className="v1s-byline-title">{oleg.title}</span>
                </div>
              </div>
              <p className="v1s-rail-cred">“{oleg.credibility}”</p>
            </div>

            <div className="v1s-facts-block">
              <span className="v1s-facts-head v1s-label v1s-label--ink">Direct channels</span>
              <ul className="v1s-channels">
                <li>
                  <span className="v1s-fact-n">off.</span>
                  {site.office}
                </li>
                <li>
                  <span className="v1s-fact-n">@</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <span className="v1s-fact-n">tel.</span>
                  <a href={site.phoneHref}>{site.phone}</a>
                </li>
                <li>
                  <span className="v1s-fact-n">msg.</span>
                  <span>
                    <a href={site.telegram} target="_blank" rel="noreferrer">
                      Telegram
                    </a>{" "}
                    ·{" "}
                    <a href={site.whatsapp} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            <div className="v1s-facts-block">
              <span className="v1s-facts-head v1s-label v1s-label--ink">House rule</span>
              <p className="v1s-rail-cred" style={{ marginTop: "0.9rem" }}>
                The pre-screen is free, and occasionally its verdict is “stay where you are.”
                We would rather lose a mandate than bank a structure that won’t hold.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
