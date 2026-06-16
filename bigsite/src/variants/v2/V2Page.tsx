import { useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "../../content/services";
import { expertList } from "../../content/experts";
import PreScreenConsole, { Corners } from "./Console";
import RouteDiagram from "./RouteDiagram";
import { useInView, usePrefersReducedMotion, useProgress } from "./hooks";
import "./v2.css";

/* ------------------------------------------------------------------ fonts */

const FONT_LINKS: ReadonlyArray<{ id: string; rel: string; href: string; crossOrigin?: string }> = [
  { id: "v2-gf-preconnect", rel: "preconnect", href: "https://fonts.googleapis.com" },
  { id: "v2-gf-preconnect-s", rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    id: "v2-gf-archivo-plex",
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
  },
];

function useV2Fonts(): void {
  useEffect(() => {
    for (const spec of FONT_LINKS) {
      if (document.getElementById(spec.id)) continue;
      const link = document.createElement("link");
      link.id = spec.id;
      link.rel = spec.rel;
      link.href = spec.href;
      if (spec.crossOrigin) link.crossOrigin = spec.crossOrigin;
      document.head.appendChild(link);
    }
  }, []);
}

/* ------------------------------------------------------------- primitives */

function Reveal({
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
      className={`v2-io${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function ModHead({ idx, title }: { idx: string; title: string }) {
  return (
    <div className="v2-modhead">
      <span className="v2-modhead-l">
        <i className="v2-sq" aria-hidden="true" />
        IDX {idx} / {title}
      </span>
      <span className="v2-modhead-r" aria-hidden="true">
        {idx} / 08
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ stats */

interface StatSpec {
  id: string;
  render: (p: number) => string;
  unit?: string;
  label: string;
  src: string;
}

const STATS: StatSpec[] = [
  {
    id: "decline",
    render: (p) => `~${Math.round(30 * p)}%`,
    label: "of honest applications banks decline",
    src: "WTP PRE-SCREEN DATA",
  },
  {
    id: "roadmap",
    render: (p) => `${Math.round(5 * p)}–${Math.round(7 * p)}`,
    unit: "days",
    label: "to a Banking Roadmap at L0",
    src: "L0 PRE-SCREEN",
  },
  {
    id: "mandate",
    render: (p) => `${Math.round(4 * p)}–${Math.round(8 * p)}`,
    unit: "wks",
    label: "typical full mandate",
    src: "WTP ENGAGEMENT MODEL",
  },
  {
    id: "tax",
    // counts DOWN: 45 → 0
    render: (p) => `${Math.round(45 * (1 - p))}%`,
    label: "personal income tax in the UAE",
    src: "UAE TAX CODE",
  },
];

function StatCell({ spec, index }: { spec: StatSpec; index: number }) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const p = useProgress(inView, reduced, 900, index * 130);
  return (
    <div ref={ref} className={`v2-stat${inView ? " is-in" : ""}`}>
      <div className="v2-stat-val">
        {spec.render(p)}
        {spec.unit ? <span className="v2-stat-unit">{spec.unit}</span> : null}
      </div>
      <p className="v2-stat-label">{spec.label}</p>
      <p className="v2-src">SRC: {spec.src}</p>
    </div>
  );
}

/* ------------------------------------------------------------------- data */

const LADDER: ReadonlyArray<{
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

const SEGMENTS: ReadonlyArray<{ tag: string; name: string; line: string }> = [
  {
    tag: "SEG A",
    name: "UK non-dom",
    line: "The remittance basis ended; the exit math changed. We run the UAE leg bank-first.",
  },
  {
    tag: "SEG B",
    name: "DACH exit tax",
    line: "Wegzugsteuer rewards sequence over speed. The structure is bankable before you leave.",
  },
  {
    tag: "SEG C",
    name: "NL Box 3",
    line: "Deemed returns tax real wealth. Above seven figures, the arithmetic stops being neutral.",
  },
  {
    tag: "SEG D",
    name: "Partners & family offices",
    line: "We run the banking leg of your client's relocation. You keep the relationship.",
  },
];

const DECLINED = new Set([3, 6, 8]); // 3 of 10 ≈ the ~30% decline base rate

/* ------------------------------------------------------------------- page */

export default function V2Page() {
  useV2Fonts();

  return (
    <div className="v2-root">
      {/* ============================================================ NAV */}
      <header className="v2-nav">
        <div className="v2-frame v2-nav-in">
          <Link to="/" className="v2-wordmark" aria-label="WTP home">
            WTP
            <i className="v2-sq" aria-hidden="true" />
          </Link>
          <span className="v2-nav-tag" aria-hidden="true">
            OPS / UAE WEALTH RELOCATION
          </span>
          <nav className="v2-nav-links" aria-label="Page sections">
            <a href="#v2-method">Method</a>
            <a href="#v2-services">Services</a>
            <a href="#v2-engagement">Engagement</a>
            <a href="#v2-operators">Operators</a>
          </nav>
          <Link to="/contact" className="v2-btn v2-btn-sm">
            Book pre-screen
          </Link>
        </div>
      </header>

      <main className="v2-main">
        <div className="v2-frame v2-rails">
          <span className="v2-rail v2-rail-l" aria-hidden="true" />
          <span className="v2-rail v2-rail-r" aria-hidden="true" />

          {/* ======================================================= HERO */}
          <section className="v2-hero">
            <p className="v2-kicker">
              <i className="v2-sq" aria-hidden="true" />
              IDX 00 / OPERATIONS BRIEF &mdash; UAE WEALTH RELOCATION
            </p>
            <h1 className="v2-h1">
              <span className="v2-h1-line">Move your wealth</span>
              <span className="v2-h1-line">to the UAE.</span>
              <span className="v2-h1-line v2-h1-amber">Start with the bank.</span>
            </h1>
            <div className="v2-hero-grid">
              <div className="v2-hero-copy">
                <p className="v2-lead">
                  We deliver bankable structures, not company setups. One accountable team runs
                  the whole sequence &mdash; bank, company, visa, assets &mdash; and clears the
                  hardest gate first.
                </p>
                <div className="v2-cta-row">
                  <Link to="/contact" className="v2-btn">
                    Book a free pre-screen <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                  </Link>
                  <Link to="/banking-first" className="v2-btn v2-btn-ghost">
                    How Banking-First works
                  </Link>
                </div>
                <p className="v2-hero-meta">
                  L0 PRE-SCREEN: FREE &middot; ROADMAP IN 5&ndash;7 DAYS &mdash; SRC: L0 PRE-SCREEN
                </p>
              </div>
              <div className="v2-hero-panel">
                <PreScreenConsole />
              </div>
            </div>
          </section>

          {/* ============================================== 01 / SIGNALS */}
          <section className="v2-mod" aria-label="Verified numbers">
            <ModHead idx="01" title="SIGNALS — VERIFIED NUMBERS" />
            <div className="v2-stats">
              {STATS.map((s, i) => (
                <StatCell key={s.id} spec={s} index={i} />
              ))}
            </div>
          </section>

          {/* ========================================= 02 / BANKING WALL */}
          <section className="v2-mod" id="v2-wall">
            <ModHead idx="02" title="THE BANKING WALL" />
            <div className="v2-wall">
              <Reveal className="v2-wall-copy">
                <h2 className="v2-h2">
                  Everyone sells the company first.{" "}
                  <span className="v2-amber-t">Then the bank says no.</span>
                </h2>
                <p className="v2-body">
                  The hard step isn&rsquo;t the licence &mdash; it&rsquo;s the account. Source of
                  funds, residency status, structure mismatches: about a third of honest
                  applications are declined. We start where everyone else gets stuck, and build
                  the structure to be bankable from day one.
                </p>
                <Link to="/banking-first" className="v2-tlink">
                  Why banks decline, and what clears it{" "}
                  <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
                </Link>
              </Reveal>
              <Reveal className="v2-wall-viz" delay={90}>
                <div
                  className="v2-decl"
                  role="img"
                  aria-label="Ten honest applications; three are declined"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i} className={`v2-decl-cell${DECLINED.has(i) ? " is-x" : ""}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  ))}
                </div>
                <p className="v2-src">
                  10 HONEST APPLICATIONS &middot; 3 DECLINED &mdash; SRC: WTP PRE-SCREEN DATA
                </p>
              </Reveal>
            </div>
          </section>

          {/* =============================================== 03 / METHOD */}
          <section className="v2-mod" id="v2-method">
            <ModHead idx="03" title="THE METHOD — BANKING-FIRST" />
            <Reveal>
              <h2 className="v2-h2 v2-method-h">
                One sequence. Four stations. One accountable team.
              </h2>
            </Reveal>
            <RouteDiagram />
            <Reveal className="v2-method-foot" delay={120}>
              <Link to="/banking-first" className="v2-tlink">
                The full method, step by step{" "}
                <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
              </Link>
            </Reveal>
          </section>

          {/* ======================================== 04 / SERVICE LINES */}
          <section className="v2-mod" id="v2-services">
            <ModHead idx="04" title="SERVICE LINES" />
            <Reveal>
              <div className="v2-rows">
                {services.map((s, i) => (
                  <Link key={s.slug} to={`/services/${s.slug}`} className="v2-svc">
                    <span className="v2-svc-idx" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="v2-svc-name">{s.line}</span>
                    <span className="v2-svc-head">{s.outcomeHeadline}</span>
                    <span className="v2-svc-tier">{s.tierRange}</span>
                    <span className="v2-svc-arrow" aria-hidden="true">
                      <ArrowRight size={16} strokeWidth={2.2} />
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ==================================== 05 / ENGAGEMENT LADDER */}
          <section className="v2-mod" id="v2-engagement">
            <ModHead idx="05" title="ENGAGEMENT LADDER" />
            <Reveal>
              <div className="v2-spec">
                <div className="v2-spec-h" aria-hidden="true">
                  <span>TIER</span>
                  <span>ENGAGEMENT</span>
                  <span className="v2-spec-scope">SCOPE</span>
                  <span className="v2-spec-fee">FEE</span>
                </div>
                {LADDER.map((r) =>
                  r.entry ? (
                    <Link
                      key={r.tier}
                      to="/contact"
                      className="v2-spec-row is-entry"
                      aria-label={`${r.tier} ${r.name} — free, book the pre-screen`}
                    >
                      <span className="v2-spec-tier">{r.tier}</span>
                      <span className="v2-spec-name">{r.name}</span>
                      <span className="v2-spec-scope">{r.scope}</span>
                      <span className="v2-spec-fee">
                        {r.fee}
                        <ArrowRight size={13} strokeWidth={2.4} aria-hidden="true" />
                      </span>
                    </Link>
                  ) : (
                    <div key={r.tier} className="v2-spec-row">
                      <span className="v2-spec-tier">{r.tier}</span>
                      <span className="v2-spec-name">{r.name}</span>
                      <span className="v2-spec-scope">{r.scope}</span>
                      <span className="v2-spec-fee">{r.fee}</span>
                    </div>
                  )
                )}
              </div>
              <p className="v2-src v2-spec-note">
                ENTRY IS ALWAYS L0 &middot; SCOPE AND FEE FIXED AT MANDATE &mdash; SRC: WTP
                ENGAGEMENT MODEL
              </p>
            </Reveal>
          </section>

          {/* ========================================== 06 / WHO WE HELP */}
          <section className="v2-mod" aria-label="Who we help">
            <ModHead idx="06" title="WHO WE HELP" />
            <Reveal>
              <div className="v2-rows">
                {SEGMENTS.map((g) => (
                  <Link key={g.tag} to="/contact" className="v2-seg">
                    <span className="v2-seg-tag" aria-hidden="true">
                      {g.tag}
                    </span>
                    <span className="v2-seg-name">{g.name}</span>
                    <span className="v2-seg-line">{g.line}</span>
                    <span className="v2-seg-go">
                      PRE-SCREEN <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ============================================ 07 / OPERATORS */}
          <section className="v2-mod" id="v2-operators">
            <ModHead idx="07" title="NAMED OPERATORS" />
            <Reveal>
              <p className="v2-mod-intro">
                Every mandate carries named experts. Accountability is the product.
              </p>
              <div className="v2-rows">
                {expertList.slice(0, 3).map((e) => (
                  <div key={e.id} className="v2-op">
                    <span className="v2-op-mono" aria-hidden="true">
                      {e.initials}
                    </span>
                    <span className="v2-op-id">
                      <span className="v2-op-name">{e.name}</span>
                      <span className="v2-op-title">{e.title}</span>
                    </span>
                    <span className="v2-op-scope">{e.scope}</span>
                    <span className="v2-op-cred">{e.credibility}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ========================================== 08 / NEXT ACTION */}
          <section className="v2-mod v2-mod-final" aria-label="Book a pre-screen">
            <ModHead idx="08" title="NEXT ACTION" />
            <Reveal>
              <div className="v2-final">
                <Corners className="v2-corners-dark" />
                <div className="v2-final-grid">
                  <div className="v2-final-copy">
                    <h2 className="v2-h2 v2-final-h">
                      Run the pre-screen{" "}
                      <span className="v2-final-amber">before you spend a dirham.</span>
                    </h2>
                    <p className="v2-final-body">
                      Free at L0. In 5&ndash;7 days you get a Banking Roadmap &mdash; a named
                      bank, a named officer, a realistic timeline. If the route doesn&rsquo;t
                      exist, we tell you that too.
                    </p>
                    <div className="v2-cta-row">
                      <Link to="/contact" className="v2-btn">
                        Book a free pre-screen{" "}
                        <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                      </Link>
                      <Link to="/banking-first" className="v2-btn v2-btn-dark">
                        How Banking-First works
                      </Link>
                    </div>
                  </div>
                  <dl className="v2-final-spec">
                    <div>
                      <dt>FEE AT L0</dt>
                      <dd>0.00</dd>
                    </div>
                    <div>
                      <dt>OUTPUT</dt>
                      <dd>BANKING ROADMAP</dd>
                    </div>
                    <div>
                      <dt>TURNAROUND</dt>
                      <dd>5&ndash;7 DAYS</dd>
                    </div>
                    <div>
                      <dt>SOURCE</dt>
                      <dd>L0 PRE-SCREEN</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>

      {/* ========================================================== FOOT */}
      <footer className="v2-foot">
        <div className="v2-frame v2-foot-grid">
          <div className="v2-foot-brand">
            <Link to="/" className="v2-wordmark" aria-label="WTP home">
              WTP
              <i className="v2-sq" aria-hidden="true" />
            </Link>
            <p>Banking-first wealth relocation to the UAE. Bankable structures, not company setups.</p>
          </div>
          <nav className="v2-foot-col" aria-label="Service lines">
            <span className="v2-foot-h">SERVICE LINES</span>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>
                {s.line}
              </Link>
            ))}
          </nav>
          <nav className="v2-foot-col" aria-label="Protocol">
            <span className="v2-foot-h">PROTOCOL</span>
            <Link to="/banking-first">Banking-First method</Link>
            <Link to="/contact">Book a free pre-screen</Link>
          </nav>
        </div>
        <div className="v2-frame v2-foot-base">
          <span>&copy; 2026 WTP &mdash; BANKING-FIRST RELOCATION</span>
          <span>EVERY NUMBER ABOVE CARRIES ITS SOURCE.</span>
        </div>
      </footer>
    </div>
  );
}
