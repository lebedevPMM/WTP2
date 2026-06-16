import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGstClock, useInView, usePrefersReducedMotion } from "./hooks";

/* Registration marks for panel corners — shared with the final CTA panel. */
export function Corners({ className = "" }: { className?: string }) {
  return (
    <span className={`v2-corners ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

type ConsoleLine =
  | { kind: "cmd"; text: string }
  | { kind: "row"; tag: string; field: string; value: string; tone: "ok" | "signal" }
  | { kind: "plain"; text: string }
  | { kind: "status"; text: string };

const LINES: ConsoleLine[] = [
  { kind: "cmd", text: 'wtp pre-screen --profile "HNWI / USD 1M+ LIQUID"' },
  { kind: "row", tag: "SCAN", field: "source of funds", value: "OK", tone: "ok" },
  { kind: "row", tag: "SCAN", field: "residency path", value: "OK", tone: "ok" },
  { kind: "row", tag: "SCAN", field: "structure fit", value: "OK", tone: "ok" },
  { kind: "row", tag: "CHECK", field: "company-first route", value: "DECLINE RISK ~30%", tone: "signal" },
  { kind: "row", tag: "ROUTE", field: "bank-first", value: "FOUND", tone: "signal" },
  { kind: "plain", text: "SEQ  BANK -> COMPANY -> VISA -> ASSETS" },
  { kind: "row", tag: "ETA", field: "banking roadmap", value: "5–7 DAYS", tone: "ok" },
  { kind: "status", text: "STATUS: BANKABLE — BOOK YOUR PRE-SCREEN" },
];

const TOTAL = LINES.length;

/** Pause before the line at this index prints. */
const gapBefore = (line: ConsoleLine): number => {
  switch (line.kind) {
    case "cmd":
      return 420;
    case "plain":
      return 480;
    case "status":
      return 760;
    default:
      return 340;
  }
};

const HOLD_AT_END = 6800;

/**
 * Signature element — the pre-screen console. Mono lines print sequentially
 * as if a bankability check is running, then loop after a hold. Paused while
 * off-screen; fully static (final state) under prefers-reduced-motion.
 */
export default function PreScreenConsole() {
  const reduced = usePrefersReducedMotion();
  const clock = useGstClock();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15, once: false });
  const [step, setStep] = useState<number>(() => (reduced ? TOTAL : 0));

  useEffect(() => {
    if (reduced) {
      setStep(TOTAL);
      return;
    }
    if (!inView) return;
    const wait = step >= TOTAL ? HOLD_AT_END : gapBefore(LINES[step]);
    const id = window.setTimeout(() => {
      setStep((s) => (s >= TOTAL ? 0 : s + 1));
    }, wait);
    return () => window.clearTimeout(id);
  }, [step, inView, reduced]);

  const caretAt = !reduced && step > 0 ? Math.min(step, TOTAL) - 1 : -1;

  return (
    <div className="v2-console" ref={ref}>
      <Corners />

      <div className="v2-console-bar">
        <span className="v2-console-id">WTP / OPS &mdash; PRE-SCREEN</span>
        <span className="v2-console-meta">
          GST <span className="v2-console-clock">{clock}</span>
        </span>
      </div>

      <div className="v2-console-body" aria-hidden="true">
        {LINES.map((line, i) => {
          const on = i < step;
          const caret = i === caretAt ? <span className="v2-caret" /> : null;
          if (line.kind === "cmd") {
            return (
              <p key={i} className={`v2-cline v2-cline-cmd${on ? " on" : ""}`}>
                <span className="v2-cline-in">
                  <span className="v2-cline-prompt">$</span> {line.text}
                </span>
                {caret}
              </p>
            );
          }
          if (line.kind === "plain") {
            return (
              <p key={i} className={`v2-cline v2-cline-plain${on ? " on" : ""}`}>
                <span className="v2-cline-in">{line.text}</span>
                {caret}
              </p>
            );
          }
          if (line.kind === "status") {
            return (
              <p key={i} className={`v2-cline v2-cline-status${on ? " on" : ""}`}>
                <span className="v2-cline-in">{line.text}</span>
                {caret}
              </p>
            );
          }
          return (
            <p key={i} className={`v2-cline v2-cline-row${on ? " on" : ""}`}>
              <span className="v2-cline-in">
                <span className="v2-cline-tag">{line.tag}</span>
                <span className="v2-cline-field">{line.field}</span>
                <span className="v2-cline-dots" />
                <span className={`v2-cline-val is-${line.tone}`}>{line.value}</span>
              </span>
              {caret}
            </p>
          );
        })}
      </div>

      {/* Screen-reader summary of the animated panel */}
      <p className="v2-sr">
        Sample pre-screen run: source of funds, residency path and structure fit pass. The
        company-first route carries roughly 30 percent decline risk (WTP pre-screen data). A
        bank-first route is found: bank, company, visa, assets. Banking roadmap in 5 to 7 days.
        Status: bankable.
      </p>

      <div className="v2-console-foot">
        <span className="v2-console-src">~30% OF HONEST APPLICATIONS DECLINED &mdash; SRC: WTP PRE-SCREEN DATA</span>
        <Link to="/contact" className="v2-console-cta">
          RUN YOUR PRE-SCREEN -&gt;
        </Link>
      </div>
    </div>
  );
}
