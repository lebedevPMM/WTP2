/* ============================================================================
   V2Home — MISSION CONTROL.
   Dark console hero (typing pre-screen run beside the claim) over a modular
   panel board: SYSTEM / RISK / MODULES / LADDER / QUEUES / OPERATORS / NEXT
   ACTION — hairline grid, numbered panels, mono telemetry, one signal amber.
   Renders inside Layout when html[data-theme="v2"]; on "/" main has no top
   padding and the MegaNav floats transparent, so the hero carries its own
   offset and a dark field for the nav to sit on.
   ============================================================================ */
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "../../content/services";
import { expertList, getExpert } from "../../content/experts";
import { Avatar } from "../../components/Avatar";
import {
  Btn,
  LadderTable,
  ModHead,
  NextAction,
  PanelHead,
  PreScreenConsole,
  Reveal,
  RouteDiagram,
  Src,
  TLink,
  useGstClock,
  useInView,
  usePrefersReducedMotion,
  useProgress,
} from "./shared";
import "./v2site.css";

/* ------------------------------------------------------- telemetry strip -- */

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
    // counts DOWN: 45 → 0 — the only joke on the page, and it's fiscal
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
    <div ref={ref} className="v2s-stat">
      <div className="v2s-stat-val">
        {spec.render(p)}
        {spec.unit ? <span className="v2s-stat-unit">{spec.unit}</span> : null}
      </div>
      <p className="v2s-stat-label">{spec.label}</p>
      <Src>SRC: {spec.src}</Src>
    </div>
  );
}

/* ------------------------------------------------------------ risk panel -- */

const DECLINED = new Set([3, 6, 8]); // 3 of 10 ≈ the ~30% decline base rate

function RiskPanel() {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const p = useProgress(inView, reduced, 900);
  return (
    <div ref={ref} className={`v2s-risk v2s-io${inView ? " is-in" : ""}`}>
      <div className="v2s-risk-val" aria-label="About 30 percent">
        ~{Math.round(30 * p)}%
      </div>
      <p className="v2s-risk-label">
        of honest applications are declined on the company-first route — source of funds,
        residency status, structure mismatches.
      </p>
      <div
        className="v2s-decl"
        role="img"
        aria-label="Ten honest applications; three are declined"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={`v2s-decl-cell${DECLINED.has(i) ? " is-x" : ""}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
        ))}
      </div>
      <Src>10 HONEST APPLICATIONS &middot; 3 DECLINED &mdash; SRC: WTP PRE-SCREEN DATA</Src>
      <TLink to="/banking-first">Why banks decline, and what clears it</TLink>
    </div>
  );
}

/* --------------------------------------------------------------- queues -- */

const QUEUES: ReadonlyArray<{ tag: string; name: string; line: string }> = [
  {
    tag: "SEG-A",
    name: "UK non-dom",
    line: "The remittance basis ended; the exit math changed. We run the UAE leg bank-first.",
  },
  {
    tag: "SEG-B",
    name: "DACH exit tax",
    line: "Wegzugsteuer rewards sequence over speed. The structure is bankable before you leave.",
  },
  {
    tag: "SEG-C",
    name: "NL Box 3",
    line: "Deemed returns tax real wealth. Above seven figures, the arithmetic stops being neutral.",
  },
  {
    tag: "SEG-D",
    name: "Partners & family offices",
    line: "We run the banking leg of your client's relocation. You keep the relationship.",
  },
];

/* ----------------------------------------------------------------- page -- */

export default function V2Home() {
  const clock = useGstClock();

  return (
    <div className="v2s-root v2s-home">
      {/* ============================================================ HERO */}
      <section className="v2s-hero" aria-label="Operations brief">
        <div className="v2s-frame">
          <p className="v2s-kicker">
            <i className="v2s-sq" aria-hidden="true" />
            IDX 00 / OPERATIONS BRIEF &mdash; UAE WEALTH RELOCATION
          </p>
          <div className="v2s-hero-grid">
            <div className="v2s-hero-copy">
              <h1 className="v2s-h1">
                <span className="v2s-h1-line">Move your wealth</span>
                <span className="v2s-h1-line">to the UAE.</span>
                <span className="v2s-h1-line v2s-h1-amber">Start with the bank.</span>
              </h1>
              <p className="v2s-lead">
                We deliver bankable structures, not company setups. One accountable team runs the
                whole sequence &mdash; bank, company, visa, assets &mdash; and clears the hardest
                gate first.
              </p>
              <div className="v2s-cta-row">
                <Btn to="/contact">
                  Book a free pre-screen <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                </Btn>
                <Btn to="/banking-first" variant="dark">
                  How Banking-First works
                </Btn>
              </div>
              <p className="v2s-hero-meta">
                L0 PRE-SCREEN: FREE &middot; ROADMAP IN 5&ndash;7 DAYS &mdash; SRC: L0 PRE-SCREEN
              </p>
            </div>
            <div className="v2s-hero-panel">
              <PreScreenConsole />
            </div>
          </div>
        </div>
        <span className="v2s-hero-tag" aria-hidden="true">
          FEED 00 / PRE-SCREEN &mdash; LIVE
        </span>
      </section>

      {/* ================================================ TELEMETRY STRIP */}
      <section className="v2s-strip" aria-label="Verified numbers">
        <div className="v2s-frame v2s-strip-grid">
          {STATS.map((s, i) => (
            <StatCell key={s.id} spec={s} index={i} />
          ))}
        </div>
      </section>

      {/* ========================================================== BOARD */}
      <section className="v2s-boardwrap" aria-label="Control board">
        <div className="v2s-frame">
          <div className="v2s-boardhead">
            <span className="v2s-boardhead-l">
              <i className="v2s-sq" aria-hidden="true" />
              WTP / CONTROL BOARD
            </span>
            <span className="v2s-boardhead-r" aria-hidden="true">
              06 PANELS &middot; GST {clock}
            </span>
          </div>

          <div className="v2s-board">
            {/* -------------------------------------------- 01 / SYSTEM */}
            <article className="v2s-panel v2s-sp7" aria-label="The banking-first system">
              <PanelHead idx="01" name="SYSTEM — BANKING-FIRST" meta="01 / 06" />
              <Reveal>
                <h2 className="v2s-h3">
                  One sequence. Four stations. <span className="v2s-amber-t">The bank goes first.</span>
                </h2>
              </Reveal>
              <RouteDiagram />
              <Reveal delay={120}>
                <TLink to="/banking-first">The full method, step by step</TLink>
              </Reveal>
            </article>

            {/* ---------------------------------------------- 02 / RISK */}
            <article className="v2s-panel v2s-sp5" aria-label="Decline risk">
              <PanelHead idx="02" name="RISK — THE BANKING WALL" meta="02 / 06" />
              <RiskPanel />
            </article>

            {/* ------------------------------------------- 03 / MODULES */}
            <article className="v2s-panel v2s-sp12" aria-label="Service lines">
              <PanelHead idx="03" name="MODULES — SERVICE LINES" meta="03 / 06" />
              <Reveal>
                <div className="v2s-rows">
                  {services.map((s, i) => {
                    const lead = getExpert(s.leadExpert);
                    return (
                      <Link key={s.slug} to={`/services/${s.slug}`} className="v2s-modrow">
                        <span className="v2s-modrow-id" aria-hidden="true">
                          MOD-{String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="v2s-modrow-name">{s.line}</span>
                        <span className="v2s-modrow-fn">{s.outcomeHeadline}</span>
                        <span className="v2s-modrow-tier">{s.tierRange}</span>
                        <span className="v2s-modrow-lead">LEAD: {lead.signature.toUpperCase()}</span>
                        <span className="v2s-modrow-go" aria-hidden="true">
                          <ArrowRight size={16} strokeWidth={2.2} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </Reveal>
            </article>

            {/* -------------------------------------------- 04 / LADDER */}
            <article className="v2s-panel v2s-sp7" aria-label="Engagement ladder">
              <PanelHead idx="04" name="LADDER — ENGAGEMENT L0–L3" meta="04 / 06" />
              <Reveal>
                <LadderTable />
              </Reveal>
            </article>

            {/* -------------------------------------------- 05 / QUEUES */}
            <article className="v2s-panel v2s-sp5" aria-label="Intake queues — who we help">
              <PanelHead idx="05" name="QUEUES — WHO WE HELP" meta="05 / 06" />
              <Reveal>
                <div className="v2s-rows">
                  {QUEUES.map((q) => (
                    <Link key={q.tag} to="/contact" className="v2s-queue">
                      <span className="v2s-queue-tag" aria-hidden="true">
                        {q.tag}
                      </span>
                      <span className="v2s-queue-name">{q.name}</span>
                      <span className="v2s-queue-go">
                        PRE-SCREEN <ArrowUpRight size={12} strokeWidth={2.4} aria-hidden="true" />
                      </span>
                      <span className="v2s-queue-line">{q.line}</span>
                    </Link>
                  ))}
                </div>
              </Reveal>
            </article>

            {/* ----------------------------------------- 06 / OPERATORS */}
            <article className="v2s-panel v2s-sp12" aria-label="Named operators">
              <PanelHead idx="06" name="OPERATORS — NAMED EXPERTS" meta="06 / 06" />
              <Reveal>
                <p className="v2s-panel-intro">
                  Every mandate carries named experts. Accountability is the product.
                </p>
                <div className="v2s-rows">
                  {expertList.slice(0, 3).map((e, i) => (
                    <div key={e.id} className="v2s-op">
                      <span className="v2s-op-cell">
                        <Avatar expert={e} size={46} />
                      </span>
                      <span className="v2s-op-id">
                        <span className="v2s-op-tag" aria-hidden="true">
                          OP-{String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="v2s-op-name">{e.name}</span>
                        <span className="v2s-op-title">{e.title}</span>
                      </span>
                      <span className="v2s-op-scope">{e.scope}</span>
                      <span className="v2s-op-cred">{e.credibility}</span>
                    </div>
                  ))}
                </div>
                <TLink to="/about/team">Full operator roster</TLink>
              </Reveal>
            </article>
          </div>
        </div>
      </section>

      {/* ==================================================== NEXT ACTION */}
      <section className="v2s-mod v2s-mod--final" aria-label="Book a pre-screen">
        <div className="v2s-frame">
          <ModHead idx="07" title="NEXT ACTION" />
          <Reveal>
            <NextAction />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
