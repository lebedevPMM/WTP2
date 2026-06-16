// V1 — "The Private Ledger"
// Warm-paper editorial landing: FT Weekend supplement × Swiss private-bank annual report.
// Standalone (own nav + footer), fully scoped under .v1-root. See DESIGN.md.

import { useEffect, useRef } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "../../content/services";
import { experts } from "../../content/experts";
import "./v1.css";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&display=swap";

const dvar = (seconds: number): CSSProperties =>
  ({ "--d": `${seconds}s` }) as CSSProperties;

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function smoothScrollTo(e: ReactMouseEvent<HTMLAnchorElement>, id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

/* Footnote marker — the provenance apparatus. Links to the notes registry. */
function Fn({ n }: { n: number }) {
  return (
    <a
      className="v1-fnm"
      href="#v1-notes"
      aria-label={`Source note ${n}`}
      onClick={(e) => smoothScrollTo(e, "v1-notes")}
    >
      {n}
    </a>
  );
}

/* Section header furniture: eyebrow on a rule, § folio at right. */
function SecHead({ eyebrow, folio }: { eyebrow: string; folio: string }) {
  return (
    <div className="v1-sechead" data-reveal>
      <span className="v1-eyebrow">{eyebrow}</span>
      <span className="v1-folio">{folio}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* copy & data (real figures only; every stat cites a note)            */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { id: "v1-wall", label: "The Wall" },
  { id: "v1-method", label: "Method" },
  { id: "v1-ledger", label: "The Ledger" },
  { id: "v1-desk", label: "The Desk" },
];

const STATS = [
  { value: "≈30%", label: "of honest applications banks decline", src: "WTP pre-screen data", note: 1 },
  { value: "5–7 days", label: "to a Banking Roadmap", src: "L0 pre-screen", note: 2 },
  { value: "4–8 wks", label: "typical full mandate", src: "Engagement model", note: 3 },
  { value: "0%", label: "personal income tax in the UAE", src: "UAE tax code", note: 4 },
];

const NOTES = [
  "Share of honest applications declined on first submission — WTP pre-screen data, rolling.",
  "L0 deliverable: bankability pre-screen and Banking Roadmap, issued in 5–7 days, free of charge.",
  "Typical duration of a full banking mandate under the WTP engagement model.",
  "Personal income is untaxed under the UAE tax code; corporate profit above AED 375K is taxed at 9%.",
];

const CHAPTERS = [
  {
    n: "01",
    slug: "banking",
    title: "The Bank",
    desc: "Pre-screen, Banking Roadmap, application, account live. Cleared before anything else is allowed to move.",
  },
  {
    n: "02",
    slug: "business-setup",
    title: "The Company",
    desc: "Mainland, free zone or DIFC — chosen after the banking path is clear, so the entity is built to be banked.",
  },
  {
    n: "03",
    slug: "residency-visa",
    title: "The Visa",
    desc: "Residency and the Golden Visa, sequenced to reinforce the structure instead of fighting it.",
  },
  {
    n: "04",
    slug: "assets-wealth",
    title: "The Assets",
    desc: "Real estate, investments and digital assets — the whole structure kept coherent after the move.",
  },
].map((c) => {
  const s = services.find((sv) => sv.slug === c.slug);
  return { ...c, tier: s ? s.tierRange : "", to: `/services/${c.slug}` };
});

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

interface Brief {
  dateline: string;
  h: string;
  p: string;
  link?: { label: string; to: string };
}

const BRIEFS: Brief[] = [
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

export default function V1Page() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  /* Google Fonts via <link>, check-before-add by id. */
  useEffect(() => {
    const ensure = (id: string, attrs: Record<string, string>) => {
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      for (const [k, v] of Object.entries(attrs)) link.setAttribute(k, v);
      document.head.appendChild(link);
    };
    ensure("v1-gf-preconnect-api", { rel: "preconnect", href: "https://fonts.googleapis.com" });
    ensure("v1-gf-preconnect-static", {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "anonymous",
    });
    ensure("v1-gf", { rel: "stylesheet", href: FONTS_HREF });
  }, []);

  /* Scroll reveals — once, restrained. Honors prefers-reduced-motion. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -7% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="v1-root" ref={rootRef}>
      {/* ===================== NAV ===================== */}
      <header className="v1-nav">
        <div className="v1-container v1-nav-inner">
          <a
            href="#v1-top"
            className="v1-wordmark-link"
            aria-label="WTP — top of page"
            onClick={(e) => smoothScrollTo(e, "v1-top")}
          >
            <span className="v1-wordmark">
              WTP<i>.</i>
            </span>
            <span className="v1-wordmark-tag">Private Wealth · Dubai</span>
          </a>
          <nav className="v1-nav-links" aria-label="Page sections">
            {NAV_LINKS.map((n) => (
              <a
                key={n.id}
                className="v1-nav-link"
                href={`#${n.id}`}
                onClick={(e) => smoothScrollTo(e, n.id)}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <Link to="/contact" className="v1-btn v1-btn--sm">
            Book a pre-screen
            <ArrowRight size={13} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main>
        {/* ===================== MASTHEAD ===================== */}
        <section className="v1-masthead" id="v1-top" aria-label="Masthead">
          <div className="v1-container">
            <div className="v1-doubled v1-rise-rule" style={dvar(0)} />
            <div className="v1-issue v1-rise" style={dvar(0.08)}>
              <span className="v1-issue-l">The Private Ledger · № 01</span>
              <span className="v1-issue-c">Dubai — Private Wealth Edition — 2026</span>
              <span className="v1-issue-r">Doctrine: Banking-First</span>
            </div>
            <hr className="v1-rule v1-rule--strong v1-rise-rule" style={dvar(0.14)} />

            <div className="v1-mast-grid">
              <h1 className="v1-h1 v1-rise" style={dvar(0.18)}>
                Move your wealth to&nbsp;the&nbsp;UAE.
                <span className="v1-h1-strong">
                  Start with <em>the&nbsp;bank.</em>
                </span>
              </h1>
              <p className="v1-mast-deck v1-rise" style={dvar(0.3)}>
                We deliver bankable structures, not company setups. One accountable team takes you
                from the first compliance screen to a working account — bank first, company second,
                visa third, assets last.
              </p>
              <div className="v1-mast-ctas v1-rise" style={dvar(0.38)}>
                <Link to="/contact" className="v1-btn">
                  Book a free pre-screen
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </Link>
                <Link to="/banking-first" className="v1-tlink">
                  How Banking-First works
                </Link>
              </div>
              <aside className="v1-mast-aside v1-rise" style={dvar(0.46)}>
                <span className="v1-aside-label">The premise</span>
                <p className="v1-aside-quote">“{experts.ivan.credibility}”</p>
                <span className="v1-aside-sig">
                  — {experts.ivan.name}, {experts.ivan.title}
                </span>
              </aside>
            </div>

            {/* proof strip — provenance on every number */}
            <div className="v1-stats v1-rise" style={dvar(0.54)}>
              {STATS.map((s) => (
                <div className="v1-stat" key={s.src}>
                  <span className="v1-stat-val">
                    {s.value}
                    <Fn n={s.note} />
                  </span>
                  <span className="v1-stat-label">{s.label}</span>
                  <span className="v1-stat-src">{s.src}</span>
                </div>
              ))}
            </div>

            {/* the notes registry */}
            <div className="v1-notes v1-rise" id="v1-notes" style={dvar(0.62)}>
              <p className="v1-notes-intro">
                Provenance is house law: every figure on this page carries its source.
              </p>
              <ol>
                {NOTES.map((t, i) => (
                  <li className="v1-note" key={t.slice(0, 18)}>
                    <span className="v1-note-n">{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ===================== § I — THE BANKING WALL ===================== */}
        <section className="v1-section" id="v1-wall">
          <div className="v1-container">
            <SecHead eyebrow="The Banking Wall" folio="§ I" />
            <div className="v1-wall-grid">
              <figure className="v1-wall-figure" data-reveal>
                <span className="v1-wall-num">
                  ≈30%
                  <Fn n={1} />
                </span>
                <figcaption className="v1-wall-figcap">
                  of honest applications are declined at the bank — not at the licence desk.
                  <span className="v1-srcline">WTP pre-screen data</span>
                </figcaption>
              </figure>
              <div className="v1-wall-body">
                <h2 className="v1-wall-h" data-reveal>
                  Everyone tells you to set up a company first.{" "}
                  <strong>Then the bank says no.</strong>
                </h2>
                <p className="v1-dropcap" data-reveal style={dvar(0.06)}>
                  Anyone can sell you a licence. It arrives within days, congratulations attached.
                  Then the file reaches a bank’s compliance desk — and roughly a third of honest
                  applications stop there
                  <Fn n={1} />, not for fraud, but for a structure the bank was never going to
                  accept.
                </p>
                <p data-reveal style={dvar(0.12)}>
                  The hard step isn’t the licence — it’s the account. We start where everyone else
                  gets stuck and build the structure to be bankable from day one. That is the whole
                  doctrine, and it is why our first deliverable is a banking verdict, not an
                  invoice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* pull-quote interlude */}
        <div className="v1-container v1-pull" data-reveal>
          <span className="v1-pull-tick" aria-hidden="true" />
          <blockquote>A licence without an account is stationery.</blockquote>
          <span className="v1-pull-attr">The Banking-First doctrine, art. 1</span>
        </div>

        {/* ===================== § II — METHOD (TOC) ===================== */}
        <section className="v1-section" id="v1-method">
          <div className="v1-container">
            <SecHead eyebrow="The Method" folio="§ II" />
            <div className="v1-method-intro">
              <h2 className="v1-h2" data-reveal>
                Four chapters, in the <em>only</em> order that works.
              </h2>
              <p className="v1-method-order" data-reveal style={dvar(0.08)}>
                <b>1</b> Bank → <b>2</b> Company → <b>3</b> Visa → <b>4</b> Assets · one
                accountable team
              </p>
            </div>
            <div className="v1-toc">
              {CHAPTERS.map((c, i) => (
                <Link
                  to={c.to}
                  className="v1-toc-row"
                  key={c.slug}
                  data-reveal
                  style={dvar(i * 0.07)}
                >
                  <span className="v1-toc-num" aria-hidden="true">
                    {c.n}
                  </span>
                  <span className="v1-toc-main">
                    <span className="v1-toc-titleline">
                      <span className="v1-toc-title">{c.title}</span>
                      <span className="v1-toc-leader" aria-hidden="true" />
                      <span className="v1-toc-tier">{c.tier}</span>
                    </span>
                    <span className="v1-toc-desc">{c.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="v1-method-foot" data-reveal>
              <p>
                Most firms run these as four vendors. We run them as one mandate — which is why the
                sequence holds.
              </p>
              <Link to="/banking-first" className="v1-tlink">
                Read the method in full
              </Link>
            </div>
          </div>
        </section>

        {/* ===================== § III — THE LEDGER (signature) ===================== */}
        <section className="v1-section v1-ledger-band" id="v1-ledger">
          <div className="v1-container">
            <SecHead eyebrow="Engagements & Fees" folio="§ III" />
            <h2 className="v1-h2 v1-h2--lead" data-reveal>
              The fees, entered in <strong>plain figures.</strong>
            </h2>
            <div className="v1-ledger-head" aria-hidden="true">
              <span>№</span>
              <span>Engagement</span>
              <span>What you hold at the end</span>
              <span>Term</span>
              <span className="v1-lh-fee">Fee, USD</span>
            </div>
            {LEDGER.map((r, i) => (
              <Link
                to={r.to}
                className="v1-ledger-row"
                key={r.no}
                data-reveal
                style={dvar(i * 0.06)}
                aria-label={`${r.tier} — ${r.name}. Fee: ${r.fee} USD.`}
              >
                <span className="v1-l-no">{r.no}</span>
                <span className="v1-l-name">
                  <span className="v1-tier">{r.tier}</span>
                  <span className="v1-l-title">{r.name}</span>
                </span>
                <span className="v1-l-holds">{r.holds}</span>
                <span className={"v1-l-term" + (r.termSoft ? " v1-l-term--soft" : "")}>
                  <span className="v1-microlabel">Term</span>
                  {r.term}
                  {r.termNote !== undefined && <Fn n={r.termNote} />}
                </span>
                <span className="v1-l-fee">
                  <span className="v1-microlabel">Fee, USD</span>
                  {r.fee}
                  <ArrowUpRight
                    className="v1-rowarrow"
                    size={14}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
            <div className="v1-ledger-foot" data-reveal>
              <p>
                Ranges are fixed into a single figure in the engagement letter, after the
                pre-screen. The pre-screen itself is free — and occasionally its verdict is “stay
                where you are.”
              </p>
              <Link to="/contact" className="v1-tlink">
                Request the pre-screen
              </Link>
            </div>
          </div>
        </section>

        {/* ===================== § IV — DISPATCHES ===================== */}
        <section className="v1-section" id="v1-clients">
          <div className="v1-container">
            <SecHead eyebrow="Dispatches — who we act for" folio="§ IV" />
            <h2 className="v1-h2 v1-h2--lead" data-reveal>
              Leaving is a tax event. <strong>Arriving is a banking event.</strong>
            </h2>
            <div className="v1-briefs">
              {BRIEFS.map((b, i) => (
                <article className="v1-brief" key={b.dateline} data-reveal style={dvar(i * 0.06)}>
                  <span className="v1-brief-dateline">{b.dateline}</span>
                  <h3>{b.h}</h3>
                  <p>{b.p}</p>
                  {b.link && (
                    <Link to={b.link.to} className="v1-tlink">
                      {b.link.label}
                    </Link>
                  )}
                </article>
              ))}
            </div>
            <p className="v1-briefs-foot" data-reveal>
              Wherever you are leaving from, the first step is identical —{" "}
              <Link to="/contact" className="v1-tlink">
                a free pre-screen of your case
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ===================== § V — THE DESK ===================== */}
        <section className="v1-section" id="v1-desk">
          <div className="v1-container">
            <SecHead eyebrow="The Desk" folio="§ V" />
            <h2 className="v1-h2 v1-h2--lead" data-reveal>
              Named experts, <strong>accountable in writing.</strong>
            </h2>
            {DESK.map((d, i) => (
              <div className="v1-desk-row" key={d.expert.id} data-reveal style={dvar(i * 0.07)}>
                <span className="v1-desk-rn" aria-hidden="true">
                  {d.numeral}
                </span>
                <div className="v1-desk-id">
                  <span className="v1-monogram" aria-hidden="true">
                    {d.expert.initials}
                  </span>
                  <div>
                    <h3 className="v1-desk-name">{d.expert.name}</h3>
                    <span className="v1-desk-title">{d.expert.title}</span>
                    <span className="v1-desk-scope">{d.expert.scope}</span>
                  </div>
                </div>
                <p className="v1-desk-cred">“{d.expert.credibility}”</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== § VI — RSVP ===================== */}
        <section className="v1-section" id="v1-prescreen">
          <div className="v1-container v1-rsvp-wrap">
            <div className="v1-rsvp" data-reveal>
              <span className="v1-eyebrow">The pre-screen · § VI</span>
              <h2 className="v1-rsvp-h">
                Begin before you <strong>move anything.</strong>
              </h2>
              <p>
                A short call with the banking desk, free of charge. If the route is viable, you
                hold a Banking Roadmap within 5–7 days
                <Fn n={2} /> — a named bank, a named officer, a realistic timeline. If it isn’t, we
                will tell you to stay put.
              </p>
              <div className="v1-rsvp-ctas">
                <Link to="/contact" className="v1-btn">
                  Book a free pre-screen
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </Link>
                <Link to="/banking-first" className="v1-tlink">
                  How Banking-First works
                </Link>
              </div>
              <span className="v1-rsvp-small">No retainer · No obligation · WTP, Dubai</span>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="v1-footer">
        <div className="v1-container v1-footer-inner">
          <div className="v1-footer-grid">
            <div className="v1-footer-brand">
              <span className="v1-wordmark">
                WTP<i>.</i>
              </span>
              <p>
                The Private Ledger — published from Dubai by WTP. Banking-first wealth relocation
                to the UAE: bankable structures, not company setups.
              </p>
            </div>
            <div className="v1-footer-col">
              <span className="v1-footer-colhead">Method</span>
              <ul>
                <li>
                  <Link className="v1-footer-link" to="/banking-first">
                    Banking-First
                  </Link>
                </li>
                <li>
                  <a
                    className="v1-footer-link"
                    href="#v1-method"
                    onClick={(e) => smoothScrollTo(e, "v1-method")}
                  >
                    The four chapters
                  </a>
                </li>
                <li>
                  <a
                    className="v1-footer-link"
                    href="#v1-notes"
                    onClick={(e) => smoothScrollTo(e, "v1-notes")}
                  >
                    Sources & notes
                  </a>
                </li>
              </ul>
            </div>
            <div className="v1-footer-col">
              <span className="v1-footer-colhead">Engagements</span>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link className="v1-footer-link" to={`/services/${s.slug}`}>
                      {s.line}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="v1-footer-col">
              <span className="v1-footer-colhead">Correspondence</span>
              <ul>
                <li>
                  <Link className="v1-footer-link" to="/contact">
                    Book a free pre-screen
                  </Link>
                </li>
                <li>
                  <Link className="v1-footer-link" to="/contact">
                    Partner referrals
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="v1-footer-bottom">
            <span>© 2026 WTP · Dubai, United Arab Emirates</span>
            <span>Figures: WTP pre-screen data · engagement model · UAE tax code</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
