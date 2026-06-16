/* ============================================================================
   themed/v2 — "The Control Room" shared console primitives.
   Copy-adapted from the approved standalone concept (src/variants/v2) — never
   import from variants/ (its CSS carries global side-effects). Every class
   name is v2s-* and every rule lives in v2site.css scoped under .v2s-root.
   Fonts (Archivo + IBM Plex Mono) are injected by ThemeSwitch for theme v2.
   ============================================================================ */
import { useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { Link } from "react-router-dom";

/* ---------------------------------------------------------------- hooks -- */

/** Live `prefers-reduced-motion` flag. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** Disconnect after first intersection (default true). */
  once?: boolean;
}

/** IntersectionObserver as a hook. Returns [ref, inView]. */
export function useInView<T extends Element>(
  options?: InViewOptions
): [RefObject<T | null>, boolean] {
  const { threshold = 0.2, rootMargin = "0px 0px -6% 0px", once = true } = options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/**
 * 0→1 progress on requestAnimationFrame (ease-out cubic), started when
 * `active` flips true. Runs once. Jumps straight to 1 for reduced motion.
 */
export function useProgress(
  active: boolean,
  reduced: boolean,
  duration = 950,
  delay = 0
): number {
  const [progress, setProgress] = useState(() => (reduced ? 1 : 0));
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (reduced) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0 - delay) / duration));
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, duration, delay]);

  useEffect(() => {
    if (reduced && startedRef.current) setProgress(1);
  }, [reduced]);

  return progress;
}

/** Ticking Gulf Standard Time clock (Asia/Dubai), HH:MM:SS. */
export function useGstClock(): string {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dubai",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/* ----------------------------------------------------------- primitives -- */

/** "+" registration marks on the four corners of a plate. */
export function Marks({ light = false }: { light?: boolean }) {
  return (
    <span className={`v2s-marks${light ? " v2s-marks--light" : ""}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

/** IO-gated reveal. Hidden initial state exists only under no-preference. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`v2s-io${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** Module chrome — strong top rule, mono `IDX NN / NAME`, right-hand counter. */
export function ModHead({ idx, title, meta }: { idx: string; title: string; meta?: string }) {
  return (
    <div className="v2s-modhead">
      <span className="v2s-modhead-l">
        <i className="v2s-sq" aria-hidden="true" />
        IDX {idx} / {title}
      </span>
      {meta ? (
        <span className="v2s-modhead-r" aria-hidden="true">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

/** Panel chrome inside the board grid — lighter than ModHead. */
export function PanelHead({ idx, name, meta }: { idx: string; name: string; meta?: string }) {
  return (
    <header className="v2s-phead">
      <span className="v2s-phead-l">
        <i className="v2s-sq" aria-hidden="true" />
        IDX {idx} / {name}
      </span>
      {meta ? (
        <span className="v2s-phead-r" aria-hidden="true">
          {meta}
        </span>
      ) : null}
    </header>
  );
}

/** Provenance line. Brand law: every number carries its source. */
export function Src({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`v2s-src${className ? ` ${className}` : ""}`}>{children}</p>;
}

/** Squared console button. */
export function Btn({
  to,
  children,
  variant,
}: {
  to: string;
  children: ReactNode;
  variant?: "ghost" | "dark";
}) {
  return (
    <Link to={to} className={`v2s-btn${variant ? ` v2s-btn--${variant}` : ""}`}>
      {children}
    </Link>
  );
}

/** Mono text-link with mechanical arrow (no icon dependency). */
export function TLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="v2s-tlink">
      {children} <span aria-hidden="true">-&gt;</span>
    </Link>
  );
}

/* ------------------------------------------------------------- console -- */

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
 * off-screen; fully static (final frame) under prefers-reduced-motion.
 */
export function PreScreenConsole() {
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
    <div className="v2s-con" ref={ref}>
      <Marks light />

      <div className="v2s-con-bar">
        <span className="v2s-con-id">WTP / OPS &mdash; PRE-SCREEN</span>
        <span className="v2s-con-meta">
          GST <span className="v2s-con-clock">{clock}</span>
        </span>
      </div>

      <div className="v2s-con-body" aria-hidden="true">
        {LINES.map((line, i) => {
          const on = i < step;
          const caret = i === caretAt ? <span className="v2s-caret" /> : null;
          if (line.kind === "cmd") {
            return (
              <p key={i} className={`v2s-cline v2s-cline--cmd${on ? " on" : ""}`}>
                <span className="v2s-cline-in">
                  <span className="v2s-cline-prompt">$</span> {line.text}
                </span>
                {caret}
              </p>
            );
          }
          if (line.kind === "plain") {
            return (
              <p key={i} className={`v2s-cline v2s-cline--plain${on ? " on" : ""}`}>
                <span className="v2s-cline-in">{line.text}</span>
                {caret}
              </p>
            );
          }
          if (line.kind === "status") {
            return (
              <p key={i} className={`v2s-cline v2s-cline--status${on ? " on" : ""}`}>
                <span className="v2s-cline-in">{line.text}</span>
                {caret}
              </p>
            );
          }
          return (
            <p key={i} className={`v2s-cline v2s-cline--row${on ? " on" : ""}`}>
              <span className="v2s-cline-in">
                <span className="v2s-cline-tag">{line.tag}</span>
                <span className="v2s-cline-field">{line.field}</span>
                <span className="v2s-cline-dots" />
                <span className={`v2s-cline-val is-${line.tone}`}>{line.value}</span>
              </span>
              {caret}
            </p>
          );
        })}
      </div>

      {/* Screen-reader summary of the animated panel */}
      <p className="v2s-sr">
        Sample pre-screen run: source of funds, residency path and structure fit pass. The
        company-first route carries roughly 30 percent decline risk (WTP pre-screen data). A
        bank-first route is found: bank, company, visa, assets. Banking roadmap in 5 to 7 days.
        Status: bankable.
      </p>

      <div className="v2s-con-foot">
        <span className="v2s-con-src">~30% OF HONEST APPLICATIONS DECLINED &mdash; SRC: WTP PRE-SCREEN DATA</span>
        <Link to="/contact" className="v2s-con-cta">
          RUN YOUR PRE-SCREEN -&gt;
        </Link>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- route diagram -- */

interface Station {
  idx: string;
  name: string;
  note: string;
}

export const STATIONS: Station[] = [
  {
    idx: "01",
    name: "Bank",
    note: "Pre-screen, Banking Roadmap, account live. The hardest gate is cleared before anything else moves.",
  },
  {
    idx: "02",
    name: "Company",
    note: "Mainland, free zone or DIFC — the jurisdiction is chosen for bankability, not convenience.",
  },
  {
    idx: "03",
    name: "Visa",
    note: "Residency sequenced around your assets; spouse and children sponsored under the same structure.",
  },
  {
    idx: "04",
    name: "Assets",
    note: "Real estate, investments, digital assets — one coherent structure that survives compliance review.",
  },
];

/* Station centers at 12.5 / 37.5 / 62.5 / 87.5% of the 800-unit canvas, so
   the SVG strip aligns exactly with the 4-column HTML grid below it. */
const XS = [100, 300, 500, 700];
const Y = 38;

export function RouteDiagram() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });

  const ticks: number[] = [];
  for (let x = 100; x <= 700; x += 20) {
    if (!XS.includes(x)) ticks.push(x);
  }

  return (
    <div ref={ref} className={`v2s-route${inView ? " is-in" : ""}`}>
      {/* Horizontal strip — desktop / tablet */}
      <svg className="v2s-route-svg" viewBox="0 0 800 76" aria-hidden="true">
        {ticks.map((x) => (
          <line key={x} className="v2s-route-tick" x1={x} y1={Y - 4} x2={x} y2={Y + 4} />
        ))}
        <line className="v2s-route-track" x1={100} y1={Y} x2={700} y2={Y} />
        <line className="v2s-route-line" x1={100} y1={Y} x2={700} y2={Y} pathLength={100} />
        {XS.map((x, i) => (
          <g key={x}>
            <rect className="v2s-route-stop" x={x - 9} y={Y - 9} width={18} height={18} />
            <rect
              className={`v2s-route-fill v2s-route-fill-${i}`}
              x={x - 4.5}
              y={Y - 4.5}
              width={9}
              height={9}
            />
          </g>
        ))}
      </svg>

      <div className="v2s-route-grid">
        {STATIONS.map((s) => (
          <div key={s.idx} className="v2s-route-cell">
            <span className="v2s-route-idx">{s.idx}</span>
            <span className="v2s-route-name">{s.name}</span>
            <p className="v2s-route-note">{s.note}</p>
          </div>
        ))}
      </div>

      {/* Vertical list — narrow screens */}
      <ol className="v2s-route-list">
        {STATIONS.map((s, i) => (
          <li key={s.idx} className="v2s-route-item">
            <span className="v2s-route-marker" aria-hidden="true">
              <i className={`v2s-route-fill-v v2s-route-fill-${i}`} />
            </span>
            <div>
              <span className="v2s-route-idx">{s.idx}</span>
              <span className="v2s-route-name">{s.name}</span>
              <p className="v2s-route-note">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Compact sequence strip — spec sheets mark the current station. */
export function SeqStrip({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <div
      className="v2s-seq"
      role="img"
      aria-label={`Step ${current} of 4 in the banking-first sequence: ${STATIONS[current - 1].name}`}
    >
      {STATIONS.map((s, i) => {
        const n = (i + 1) as 1 | 2 | 3 | 4;
        return (
          <span
            key={s.idx}
            className={`v2s-seq-cell${n === current ? " is-cur" : ""}${n < current ? " is-done" : ""}`}
          >
            <i className="v2s-seq-mark" aria-hidden="true" />
            <span className="v2s-seq-idx">{s.idx}</span>
            <span className="v2s-seq-name">{s.name}</span>
          </span>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------- engagement ladder -- */

export const LADDER: ReadonlyArray<{
  tier: string;
  name: string;
  scope: string;
  fee: string;
  entry?: boolean;
}> = [
  {
    tier: "L0",
    name: "Pre-screen + Banking Roadmap",
    scope: "Bankability assessment, a named bank path, a realistic timeline. 5–7 days.",
    fee: "FREE",
    entry: true,
  },
  {
    tier: "L1",
    name: "Banking",
    scope: "Full application, compliance preparation, account opened.",
    fee: "$1.5–3K",
  },
  {
    tier: "L2",
    name: "Setup + Banking",
    scope: "Company formation sequenced after the banking path is clear.",
    fee: "$5–15K",
  },
  {
    tier: "L3",
    name: "Full relocation",
    scope: "Bank, company, visa, assets — one accountable team, end to end.",
    fee: "$15–50K",
  },
];

/** L0–L3 spec-sheet table. The L0 row is the amber-flagged free entry → /contact. */
export function LadderTable() {
  return (
    <>
      <div className="v2s-spec">
        <div className="v2s-spec-h" aria-hidden="true">
          <span>TIER</span>
          <span>ENGAGEMENT</span>
          <span className="v2s-spec-scope">SCOPE</span>
          <span className="v2s-spec-fee">FEE</span>
        </div>
        {LADDER.map((r) =>
          r.entry ? (
            <Link
              key={r.tier}
              to="/contact"
              className="v2s-spec-row is-entry"
              aria-label={`${r.tier} ${r.name} — free entry, book the pre-screen`}
            >
              <span className="v2s-spec-tier">{r.tier}</span>
              <span className="v2s-spec-name">
                {r.name}
                <em className="v2s-flag">FREE ENTRY</em>
              </span>
              <span className="v2s-spec-scope">{r.scope}</span>
              <span className="v2s-spec-fee">
                {r.fee} <span aria-hidden="true">-&gt;</span>
              </span>
            </Link>
          ) : (
            <div key={r.tier} className="v2s-spec-row">
              <span className="v2s-spec-tier">{r.tier}</span>
              <span className="v2s-spec-name">{r.name}</span>
              <span className="v2s-spec-scope">{r.scope}</span>
              <span className="v2s-spec-fee">{r.fee}</span>
            </div>
          )
        )}
      </div>
      <Src className="v2s-spec-note">
        ENTRY IS ALWAYS L0 &middot; SCOPE AND FEE FIXED AT MANDATE &mdash; SRC: WTP ENGAGEMENT
        MODEL
      </Src>
    </>
  );
}

/* ----------------------------------------------------- next-action plate -- */

export interface SpecRow {
  dt: string;
  dd: string;
}

export const NEXT_SPECS: SpecRow[] = [
  { dt: "FEE AT L0", dd: "0.00" },
  { dt: "OUTPUT", dd: "BANKING ROADMAP" },
  { dt: "TURNAROUND", dd: "5–7 DAYS" },
  { dt: "SOURCE", dd: "L0 PRE-SCREEN" },
];

/** The dark NEXT ACTION plate — closes every page. */
export function NextAction({
  heading = "Run the pre-screen",
  amber = "before you spend a dirham.",
  body = "Free at L0. In 5–7 days you get a Banking Roadmap — a named bank, a named officer, a realistic timeline. If the route doesn't exist, we tell you that too.",
  specs = NEXT_SPECS,
  secondaryTo = "/banking-first",
  secondaryLabel = "How Banking-First works",
}: {
  heading?: string;
  amber?: string;
  body?: string;
  specs?: SpecRow[];
  secondaryTo?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="v2s-next">
      <Marks />
      <div className="v2s-next-grid">
        <div>
          <h2 className="v2s-h2 v2s-next-h">
            {heading} <span className="v2s-next-amber">{amber}</span>
          </h2>
          <p className="v2s-next-body">{body}</p>
          <div className="v2s-cta-row">
            <Btn to="/contact">
              Book a free pre-screen <span aria-hidden="true">-&gt;</span>
            </Btn>
            <Btn to={secondaryTo} variant="dark">
              {secondaryLabel}
            </Btn>
          </div>
        </div>
        <dl className="v2s-next-spec">
          {specs.map((s) => (
            <div key={s.dt}>
              <dt>{s.dt}</dt>
              <dd>{s.dd}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
