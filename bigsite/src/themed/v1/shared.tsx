// Themed V1 — "The Private Ledger" shared primitives.
// Masthead furniture, footnote apparatus, RSVP plate, bylines.
// All pages render inside Layout; styles live in v1site.css (scoped .v1s-root)
// and are imported exactly once from here.

import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Avatar } from "../../components/Avatar";
import type { Expert } from "../../content/experts";
import "./v1site.css";

/* The issue line — one source of truth for the edition furniture. */
export const ISSUE = {
  paper: "The Private Wealth Relocation Ledger",
  place: "Dubai",
  date: "13 June 2026",
  no: "No. 04",
} as const;

/* Stagger helper: hand-tuned page-enter delays (seconds). */
export const dvar = (seconds: number): CSSProperties =>
  ({ "--d": `${seconds}s` }) as CSSProperties;

/* ------------------------------------------------------------------ */
/* Provenance apparatus — superscript markers + the notes registry     */
/* ------------------------------------------------------------------ */

export const NOTES: readonly string[] = [
  "Share of honest applications declined on first submission — WTP pre-screen data, rolling.",
  "L0 deliverable: bankability pre-screen and Banking Roadmap, issued in 5–7 days, free of charge.",
  "Typical duration of a full banking mandate under the WTP engagement model.",
  "Personal income is untaxed under the UAE tax code; corporate profit above AED 375K is taxed at 9%.",
];

export function Fn({ n }: { n: number }) {
  return (
    <a className="v1s-fnm" href="#v1s-notes" aria-label={`Source note ${n}`}>
      {n}
    </a>
  );
}

export function NotesBlock() {
  return (
    <div className="v1s-notes" id="v1s-notes">
      <p className="v1s-notes-intro">
        Provenance is house law: every figure on this page carries its source.
      </p>
      <ol>
        {NOTES.map((t, i) => (
          <li className="v1s-note" key={t.slice(0, 16)}>
            <span className="v1s-note-n">{i + 1}</span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section opener: small-caps label ON a strong rule, folio at right   */
/* ------------------------------------------------------------------ */

export function SecHead({ label, folio }: { label: string; folio: string }) {
  return (
    <div className="v1s-sechead">
      <span className="v1s-label">{label}</span>
      <span className="v1s-folio">{folio}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inner-page masthead: kicker rule → Fraunces title → standfirst      */
/* ------------------------------------------------------------------ */

export function PageHead({
  kicker,
  folio,
  title,
  standfirst,
  meta,
  rise = true,
}: {
  kicker: string;
  folio?: string;
  title: ReactNode;
  standfirst?: ReactNode;
  meta?: ReactNode;
  rise?: boolean;
}) {
  const r = (cls: string) => (rise ? `${cls} v1s-rise` : cls);
  return (
    <header className="v1s-pagehead">
      <div className={r("v1s-pagehead-kicker")} style={dvar(0)}>
        <span className="v1s-label">{kicker}</span>
        <span className="v1s-folio">
          {ISSUE.paper} · {ISSUE.no}
          {folio ? ` · ${folio}` : ""}
        </span>
      </div>
      <h1 className={r("v1s-h1")} style={dvar(0.08)}>
        {title}
      </h1>
      {standfirst && (
        <p className={r("v1s-standfirst")} style={dvar(0.18)}>
          {standfirst}
        </p>
      )}
      {meta && (
        <div className={r("v1s-pagehead-meta")} style={dvar(0.26)}>
          {meta}
        </div>
      )}
      <div className={rise ? "v1s-doublerule v1s-draw" : "v1s-doublerule"} style={dvar(0.34)} />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Expert byline (Avatar + name + small-caps title)                    */
/* ------------------------------------------------------------------ */

export function Byline({
  expert,
  size = 44,
  note,
}: {
  expert: Expert;
  size?: number;
  note?: string;
}) {
  return (
    <div className="v1s-byline">
      <Avatar expert={expert} size={size} />
      <div>
        <span className="v1s-byline-name">{expert.name}</span>
        <span className="v1s-byline-title">{note ? `${expert.title} · ${note}` : expert.title}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The RSVP plate — closing invitation panel (one foil hairline)       */
/* ------------------------------------------------------------------ */

export function RsvpPlate({
  folio = "The pre-screen",
  secondary = { label: "How Banking-First works", to: "/banking-first" },
}: {
  folio?: string;
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="v1s-rsvp-band" aria-label="Book a pre-screen">
      <div className="v1s-container v1s-rsvp-wrap">
        <div className="v1s-rsvp">
          <span className="v1s-label">{folio} · By appointment</span>
          <h2 className="v1s-rsvp-h">
            Begin before you <strong>move anything.</strong>
          </h2>
          <p>
            Fifteen minutes with the banking desk, free of charge. If the route is viable, you
            hold a Banking Roadmap within 5–7 days
            <Fn n={2} /> — a named bank, a named officer, a realistic timeline. If it isn’t, we
            will tell you to stay put.
          </p>
          <div className="v1s-rsvp-ctas">
            <Link to="/contact" className="v1s-btn">
              Book a free pre-screen
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <Link to={secondary.to} className="v1s-tlink">
              {secondary.label}
            </Link>
          </div>
          <span className="v1s-rsvp-small">No retainer · No obligation · WTP, {ISSUE.place}</span>
        </div>
      </div>
    </section>
  );
}
