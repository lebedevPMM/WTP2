/* ============================================================================
   V2Contact — INTAKE CONSOLE (route /contact, the conversion surface).
   A dark terminal intake panel: mono uppercase labels, ruled inputs with
   amber focus, GST clock in the title bar, INITIATE PRE-SCREEN submit. The
   left rail carries status telemetry, the operator and direct channels.
   Lead pipeline is EXACTLY the base Contact contract: submitPreScreen
   ({ name, email, origin, note }) → /thank-you on ok, offline fallback to
   direct channels otherwise. cal.com embed kept when VITE_CALCOM_LINK is set.
   ============================================================================ */
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { getExpert } from "../../content/experts";
import { Avatar } from "../../components/Avatar";
import { site, CALCOM_LINK } from "../../lib/site";
import { submitPreScreen } from "../../lib/bitrix";
import { Marks, ModHead, Reveal, Src, useGstClock } from "./shared";
import "./v2site.css";

const RAIL: ReadonlyArray<{ dt: string; dd: string }> = [
  { dt: "INTAKE", dd: "OPEN" },
  { dt: "RESPONSE", dd: "T+1 BUSINESS DAY" },
  { dt: "FEE AT L0", dd: "0.00" },
  { dt: "OUTPUT", dd: "BANKING ROADMAP" },
  { dt: "TURNAROUND", dd: "T+5–7 DAYS" },
  { dt: "HANDLING", dd: "CONFIDENTIAL" },
];

const FIELDS: ReadonlyArray<{
  idx: string;
  label: string;
  type: string;
  name: string;
  required: boolean;
  auto?: string;
}> = [
  { idx: "01", label: "FULL NAME", type: "text", name: "name", required: true, auto: "name" },
  { idx: "02", label: "EMAIL", type: "email", name: "email", required: true, auto: "email" },
  { idx: "03", label: "RELOCATING FROM", type: "text", name: "origin", required: false },
];

export default function V2Contact() {
  const oleg = getExpert("oleg");
  const clock = useGstClock();
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
      // any non-ok result (incl. webhook not configured) → direct channels
      setState("offline");
    } catch {
      setState("offline");
    }
  }

  return (
    <div className="v2s-root">
      {/* ======================================================== HEADER */}
      <header className="v2s-head">
        <div className="v2s-frame">
          <p className="v2s-trail">
            INDEX / <b>INTAKE — PRE-SCREEN</b>
          </p>
          <div className="v2s-head-chips">
            <span className="v2s-chip is-on">
              <i aria-hidden="true" />
              INTAKE: OPEN
            </span>
            <span className="v2s-chip">DURATION: 15 MIN</span>
            <span className="v2s-chip">OBLIGATION: NONE</span>
          </div>
          <h1 className="v2s-h1 v2s-head-h1">
            <span className="v2s-h1-line">Book your 15-minute</span>
            <span className="v2s-h1-line v2s-h1-amber">pre-screen.</span>
          </h1>
          <p className="v2s-lead v2s-lead--ink">
            A named expert assesses your bankability and gives you a realistic Banking Roadmap
            &mdash; 5&ndash;7 days, no obligation.
          </p>
        </div>
      </header>

      <div className="v2s-frame v2s-rails">
        <span className="v2s-rail v2s-rail--l" aria-hidden="true" />
        <span className="v2s-rail v2s-rail--r" aria-hidden="true" />

        {/* cal.com booking embed (if configured) — same contract as base */}
        {CALCOM_LINK && (
          <section className="v2s-mod" aria-label="Direct booking">
            <ModHead idx="01" title="DIRECT BOOKING — PICK A TIME" meta="01 / 02" />
            <Reveal>
              <div className="v2s-cal">
                <iframe
                  title="Book a pre-screen"
                  src={`https://cal.com/${CALCOM_LINK}?embed=true&theme=dark`}
                  style={{ width: "100%", height: 680, border: 0, display: "block" }}
                />
              </div>
            </Reveal>
          </section>
        )}

        {/* ==================================================== INTAKE */}
        <section className="v2s-mod" aria-label="Pre-screen intake">
          <ModHead
            idx={CALCOM_LINK ? "02" : "01"}
            title={CALCOM_LINK ? "INTAKE — PREFER EMAIL?" : "INTAKE — REQUEST YOUR PRE-SCREEN"}
            meta={CALCOM_LINK ? "02 / 02" : "01 / 01"}
          />
          <div className="v2s-intake">
            {/* --------------------------------------------- status rail */}
            <Reveal className="v2s-irail">
              <dl className="v2s-irail-spec">
                {RAIL.map((r) => (
                  <div key={r.dt}>
                    <dt>{r.dt}</dt>
                    <dd>{r.dd}</dd>
                  </div>
                ))}
              </dl>

              <div className="v2s-irail-op">
                <span className="v2s-irail-h">WHO YOU&rsquo;LL SPEAK WITH</span>
                <div className="v2s-irail-who">
                  <Avatar expert={oleg} size={44} />
                  <span>
                    <span className="v2s-op-name">{oleg.name}</span>
                    <span className="v2s-op-title">{oleg.title}</span>
                  </span>
                </div>
                <p className="v2s-irail-cred">{oleg.credibility}</p>
              </div>

              <div className="v2s-irail-ch">
                <span className="v2s-irail-h">DIRECT CHANNELS</span>
                <ul>
                  <li>{site.office}</li>
                  <li>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </li>
                  <li>
                    <a href={site.phoneHref}>{site.phone}</a>
                  </li>
                  <li>
                    <a href={site.telegram} target="_blank" rel="noreferrer">
                      Telegram
                    </a>{" "}
                    &middot;{" "}
                    <a href={site.whatsapp} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* --------------------------------------------- form panel */}
            <Reveal className="v2s-formwrap" delay={80}>
              <form className="v2s-form" onSubmit={onSubmit}>
                <Marks />
                <div className="v2s-con-bar">
                  <span className="v2s-con-id">WTP / OPS &mdash; INTAKE FORM</span>
                  <span className="v2s-con-meta">
                    GST <span className="v2s-con-clock">{clock}</span>
                  </span>
                </div>

                <div className="v2s-form-body">
                  <p className="v2s-form-note">
                    LEAVE YOUR DETAILS &mdash; A NAMED EXPERT REPLIES WITHIN ONE BUSINESS DAY.
                  </p>

                  <div className="v2s-form-grid">
                    {FIELDS.map((f) => (
                      <label key={f.name} className="v2s-field">
                        <span className="v2s-field-lab">
                          {f.idx} &mdash; {f.label}
                          {f.required ? <em aria-hidden="true"> *</em> : null}
                        </span>
                        <input
                          required={f.required}
                          type={f.type}
                          name={f.name}
                          autoComplete={f.auto}
                          className="v2s-input"
                        />
                      </label>
                    ))}
                    <label className="v2s-field v2s-field--full">
                      <span className="v2s-field-lab">04 &mdash; WHAT&rsquo;S THE SITUATION? (OPTIONAL)</span>
                      <textarea name="note" rows={4} className="v2s-input v2s-input--area" />
                    </label>
                  </div>

                  <div className="v2s-form-foot">
                    <button type="submit" className="v2s-btn" disabled={state === "sending"}>
                      {state === "sending" ? (
                        "TRANSMITTING…"
                      ) : (
                        <>
                          Initiate pre-screen{" "}
                          <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <span className="v2s-form-meta" aria-hidden="true">
                      FEE — 0.00 &middot; OUTPUT — BANKING ROADMAP
                    </span>
                  </div>

                  {state === "offline" && (
                    <p className="v2s-form-offline" role="status">
                      LINK DOWN &mdash; couldn&rsquo;t submit just now. Reach us directly at{" "}
                      <a href={`mailto:${site.email}`}>{site.email}</a> or on{" "}
                      <a href={site.telegram} target="_blank" rel="noreferrer">
                        Telegram
                      </a>
                      .
                    </p>
                  )}

                  <p className="v2s-form-fine">
                    We reply within one business day. Your details are handled confidentially.
                  </p>
                </div>
              </form>
              <Src className="v2s-spec-note">
                ROADMAP IN 5&ndash;7 DAYS &mdash; SRC: L0 PRE-SCREEN
              </Src>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}
