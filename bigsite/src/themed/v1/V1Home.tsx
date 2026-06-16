// Themed V1 Home — the FRONT PAGE of The Private Ledger.
// True broadsheet: masthead with issue line, lead story with drop cap,
// VITAL SIGNS rail, INSIDE THIS ISSUE contents, chapter spread, fee
// ledger, dispatches, the desk, closing RSVP plate.
// Renders inside Layout under html[data-theme="v1"] only.

import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "../../content/services";
import { experts, getExpert } from "../../content/experts";
import { Avatar } from "../../components/Avatar";
import { Fn, ISSUE, NotesBlock, RsvpPlate, SecHead, dvar } from "./shared";

/* ------------------------------------------------------------------ */
/* data (real figures only; every number cites a note or a source)     */
/* ------------------------------------------------------------------ */

const VITALS = [
  { value: "≈30%", label: "of honest applications banks decline", src: "WTP pre-screen data", note: 1 },
  { value: "5–7 d", label: "to a Banking Roadmap, free of charge", src: "L0 pre-screen", note: 2 },
  { value: "4–8 wk", label: "typical full banking mandate", src: "Engagement model", note: 3 },
  { value: "0%", label: "personal income tax in the UAE", src: "UAE tax code", note: 4 },
];

const CHAPTER_NAMES: Record<string, { n: string; name: string; desc: string }> = {
  banking: {
    n: "01",
    name: "The Bank",
    desc: "Pre-screen, Banking Roadmap, application, account live. Cleared before anything else is allowed to move.",
  },
  "business-setup": {
    n: "02",
    name: "The Company",
    desc: "Mainland, free zone or DIFC — chosen after the banking path is clear, so the entity is built to be banked.",
  },
  "residency-visa": {
    n: "03",
    name: "The Visa",
    desc: "Residency and the Golden Visa, sequenced to reinforce the structure instead of fighting it.",
  },
  "assets-wealth": {
    n: "04",
    name: "The Assets",
    desc: "Real estate, investments and digital assets — the whole structure kept coherent after the move.",
  },
};

interface LedgerEntry {
  no: string;
  tier: string;
  name: string;
  holds: string;
  term: string;
  termNote?: number;
  termSoft?: boolean;
  fee: string;
  to: string;
}

const LEDGER: LedgerEntry[] = [
  {
    no: "00",
    tier: "L0",
    name: "Pre-screen & Banking Roadmap",
    holds: "A bankability verdict; a named bank, a named officer, a realistic timeline",
    term: "5–7 days",
    termNote: 2,
    fee: "Free",
    to: "/services/banking",
  },
  {
    no: "01",
    tier: "L1",
    name: "Banking",
    holds: "A compliance-ready file; the account open, IBAN issued",
    term: "4–8 wks",
    termNote: 3,
    fee: "1,500–3,000",
    to: "/services/banking",
  },
  {
    no: "02",
    tier: "L2",
    name: "Setup + Banking",
    holds: "Jurisdiction, licence and substance — an entity built to be banked",
    term: "Scoped at pre-screen",
    termSoft: true,
    fee: "5,000–15,000",
    to: "/services/business-setup",
  },
  {
    no: "03",
    tier: "L3",
    name: "Full relocation",
    holds: "Bank, company, residency and assets, sequenced under one accountable team",
    term: "Scoped at pre-screen",
    termSoft: true,
    fee: "15,000–50,000",
    to: "/services/assets-wealth",
  },
];

const BRIEFS = [
  {
    dateline: "London · UK non-dom",
    h: "After the non-dom regime",
    p: "The remittance era is over and the four-year window is short. What matters now is sequencing: which tax year, which structure — and which bank will actually take the file.",
  },
  {
    dateline: "Frankfurt · Zürich · Vienna",
    h: "Before the exit tax bites",
    p: "Wegzugsbesteuerung taxes the act of leaving itself. The structure has to be bankable before you trigger the move — afterwards is too late.",
  },
  {
    dateline: "Amsterdam · Box 3",
    h: "Taxed on returns never made",
    p: "Box 3 keeps repricing the same savings. Relocation only beats it if the account opens on schedule — so that is the part we secure first.",
  },
  {
    dateline: "For partners · lawyers & advisers",
    h: "Your client, our banking desk",
    p: "Private-client lawyers and tax advisers run our pre-screen under their own letterhead. You keep the relationship; we carry the banking risk.",
    link: { label: "Refer a case", to: "/contact" },
  },
];

const DESK = [
  { numeral: "i.", expert: experts.ivan },
  { numeral: "ii.", expert: experts.oleg },
  { numeral: "iii.", expert: experts.olya },
];

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export default function V1Home() {
  return (
    <div className="v1s-root v1s-home">
      {/* ===================== MASTHEAD ===================== */}
      <header className="v1s-masthead" aria-label="Masthead">
        <div className="v1s-container">
          <div className="v1s-doublerule v1s-draw" style={dvar(0)} />
          <div className="v1s-issue v1s-rise" style={dvar(0.08)}>
            <span className="v1s-issue-l">
              WTP · {ISSUE.paper}
            </span>
            <span className="v1s-issue-c">
              {ISSUE.place} · {ISSUE.date}
            </span>
            <span className="v1s-issue-r">{ISSUE.no} · Banking-First edition</span>
          </div>
          <hr className="v1s-hr v1s-draw" style={{ ...dvar(0.14), background: "var(--v1s-rule-strong)" }} />

          <h1 className="v1s-mast-h1 v1s-rise" style={dvar(0.18)}>
            Move your wealth to the UAE.{" "}
            <strong>
              Start with <em>the bank.</em>
            </strong>
          </h1>

          <div className="v1s-mast-deckrow">
            <p className="v1s-mast-deck v1s-rise" style={dvar(0.3)}>
              We deliver bankable structures, not company setups. One accountable team takes you
              from the first compliance screen to a working account — bank first, company second,
              visa third, assets last.
            </p>
            <div className="v1s-mast-ctas v1s-rise" style={dvar(0.4)}>
              <Link to="/contact" className="v1s-btn">
                Book a free pre-screen
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </Link>
              <Link to="/banking-first" className="v1s-tlink">
                The method, in full
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== FRONT GRID ===================== */}
      <section aria-label="Front page" >
        <div className="v1s-container">
          <div className="v1s-front">
            {/* lead story */}
            <article className="v1s-lead v1s-rise" style={dvar(0.46)}>
              <span className="v1s-lead-kicker v1s-label">Lead story · The banking wall</span>
              <h2 className="v1s-lead-h">
                Everyone tells you to set up a company first.{" "}
                <strong>Then the bank says no.</strong>
              </h2>
              <p className="v1s-dropcap">
                Anyone can sell you a licence. It arrives within days, congratulations attached.
                Then the file reaches a bank’s compliance desk — and roughly a third of honest
                applications stop there
                <Fn n={1} />, not for fraud, but for a structure the bank was never going to
                accept.
              </p>
              <p>
                The hard step isn’t the licence — it’s the account. We start where everyone else
                gets stuck and build the structure to be bankable from day one. That is the whole
                doctrine, and it is why our first deliverable is a banking verdict, not an
                invoice.
              </p>
              <Link to="/banking-first" className="v1s-tlink v1s-lead-cont">
                Continued — the Banking-First method, p. 2 →
              </Link>
            </article>

            {/* vital signs rail */}
            <aside className="v1s-rail v1s-rail-vitals v1s-rise" style={dvar(0.56)} aria-label="Vital signs">
              <span className="v1s-rail-head v1s-label v1s-label--ink">Vital signs</span>
              {VITALS.map((s) => (
                <div className="v1s-vital" key={s.src}>
                  <span className="v1s-vital-val">
                    {s.value}
                    <Fn n={s.note} />
                  </span>
                  <span className="v1s-vital-label">{s.label}</span>
                  <span className="v1s-src v1s-vital-src">{s.src}</span>
                </div>
              ))}
              <div className="v1s-rail-notes">
                <NotesBlock />
              </div>
            </aside>

            {/* inside this issue */}
            <aside className="v1s-rail v1s-rail-index v1s-rise" style={dvar(0.64)} aria-label="Inside this issue">
              <span className="v1s-rail-head v1s-label v1s-label--ink">Inside this issue</span>
              {services.map((s, i) => {
                const lead = getExpert(s.leadExpert);
                return (
                  <Link to={`/services/${s.slug}`} className="v1s-ix" key={s.slug}>
                    <span className="v1s-ix-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="v1s-ix-main">
                      <span className="v1s-ix-line">
                        <span className="v1s-ix-title">{s.line}</span>
                        <span className="v1s-ix-leader" aria-hidden="true" />
                        <span className="v1s-ix-tier">{s.tierRange}</span>
                      </span>
                      <span className="v1s-ix-lead">Led by {lead.name} · {lead.title}</span>
                    </span>
                  </Link>
                );
              })}
              <Link to="/contact" className="v1s-ix">
                <span className="v1s-ix-n">05</span>
                <span className="v1s-ix-main">
                  <span className="v1s-ix-line">
                    <span className="v1s-ix-title">Correspondence</span>
                    <span className="v1s-ix-leader" aria-hidden="true" />
                    <span className="v1s-ix-tier">RSVP</span>
                  </span>
                  <span className="v1s-ix-lead">Request the free pre-screen by letter</span>
                </span>
              </Link>
              <span className="v1s-ix--note">
                Every line is led by a named expert, not a handoff queue.
              </span>
            </aside>
          </div>
        </div>
      </section>

      {/* ===================== § I — THE METHOD ===================== */}
      <section className="v1s-sec" aria-label="The method">
        <div className="v1s-container">
          <SecHead label="The method" folio="§ I · Bank → Company → Visa → Assets" />
          <h2 className="v1s-h2" style={{ marginBottom: "clamp(1.8rem, 3.6vw, 2.8rem)" }}>
            Four chapters, in the <em>only</em> order that works.
          </h2>
          <div className="v1s-chapters">
            {services.map((s) => {
              const c = CHAPTER_NAMES[s.slug];
              if (!c) return null;
              return (
                <Link to={`/services/${s.slug}`} className="v1s-chap" key={s.slug}>
                  <span className="v1s-chap-n" aria-hidden="true">
                    {c.n}
                  </span>
                  <span className="v1s-chap-label">Chapter {c.n}</span>
                  <span className="v1s-chap-title">{c.name}</span>
                  <span className="v1s-chap-desc">{c.desc}</span>
                  <span className="v1s-chap-foot">
                    <span className="v1s-folio">{s.line}</span>
                    <span className="v1s-ix-leader" aria-hidden="true" />
                    <span className="v1s-ix-tier">{s.tierRange}</span>
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="v1s-method-foot">
            <p>
              Most firms run these as four vendors. We run them as one mandate — which is why the
              sequence holds.
            </p>
            <Link to="/banking-first" className="v1s-tlink">
              Read the method in full
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== § II — THE FEE LEDGER ===================== */}
      <section className="v1s-sec v1s-feeband" aria-label="Engagements and fees">
        <div className="v1s-container">
          <SecHead label="Engagements & fees" folio="§ II · Entered in plain figures" />
          <h2 className="v1s-h2" style={{ marginBottom: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>
            The ladder, kept in <strong>the ledger.</strong>
          </h2>
          <div className="v1s-ledger-head" aria-hidden="true">
            <span>№</span>
            <span>Engagement</span>
            <span>What you hold at the end</span>
            <span>Term</span>
            <span className="v1s-lh-fee">Fee, USD</span>
          </div>
          {LEDGER.map((r) => (
            <Link
              to={r.to}
              className="v1s-ledger-row"
              key={r.no}
              aria-label={`${r.tier} — ${r.name}. Fee: ${r.fee} USD.`}
            >
              <span className="v1s-l-no">{r.no}</span>
              <span className="v1s-l-name">
                <span className="v1s-tier">{r.tier}</span>
                <span className="v1s-l-title">{r.name}</span>
              </span>
              <span className="v1s-l-holds">{r.holds}</span>
              <span className={"v1s-l-term" + (r.termSoft ? " v1s-l-term--soft" : "")}>
                <span className="v1s-microlabel">Term</span>
                {r.term}
                {r.termNote !== undefined && <Fn n={r.termNote} />}
              </span>
              <span className="v1s-l-fee">
                <span className="v1s-microlabel">Fee, USD</span>
                {r.fee}
                <ArrowUpRight className="v1s-rowarrow" size={14} strokeWidth={2.2} aria-hidden="true" />
              </span>
            </Link>
          ))}
          <div className="v1s-ledger-foot">
            <p>
              Ranges are fixed into a single figure in the engagement letter, after the
              pre-screen. The pre-screen itself is free — and occasionally its verdict is “stay
              where you are.”
            </p>
            <Link to="/contact" className="v1s-tlink">
              Request the pre-screen
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== § III — DISPATCHES ===================== */}
      <section className="v1s-sec" aria-label="Who we act for">
        <div className="v1s-container">
          <SecHead label="Dispatches — who we act for" folio="§ III" />
          <h2 className="v1s-h2" style={{ marginBottom: "clamp(1.8rem, 3.6vw, 2.6rem)" }}>
            Leaving is a tax event. <strong>Arriving is a banking event.</strong>
          </h2>
          <div className="v1s-briefs">
            {BRIEFS.map((b) => (
              <article className="v1s-brief" key={b.dateline}>
                <span className="v1s-brief-dateline">{b.dateline}</span>
                <h3>{b.h}</h3>
                <p>{b.p}</p>
                {b.link && (
                  <Link to={b.link.to} className="v1s-tlink">
                    {b.link.label}
                  </Link>
                )}
              </article>
            ))}
          </div>
          <p className="v1s-briefs-foot">
            Wherever you are leaving from, the first step is identical —{" "}
            <Link to="/contact" className="v1s-tlink">
              a free pre-screen of your case
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ===================== § IV — THE DESK ===================== */}
      <section className="v1s-sec v1s-sec--tight" aria-label="The desk">
        <div className="v1s-container">
          <SecHead label="The desk" folio="§ IV · Named, accountable in writing" />
          {DESK.map((d) => (
            <div className="v1s-desk-row" key={d.expert.id}>
              <span className="v1s-desk-rn" aria-hidden="true">
                {d.numeral}
              </span>
              <div className="v1s-desk-id v1s-byline">
                <Avatar expert={d.expert} size={54} />
                <div>
                  <h3 className="v1s-desk-name">{d.expert.name}</h3>
                  <span className="v1s-desk-title">{d.expert.title}</span>
                  <span className="v1s-desk-scope">{d.expert.scope}</span>
                </div>
              </div>
              <p className="v1s-desk-cred">“{d.expert.credibility}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== § V — RSVP ===================== */}
      <RsvpPlate folio="§ V · The pre-screen" />
    </div>
  );
}
