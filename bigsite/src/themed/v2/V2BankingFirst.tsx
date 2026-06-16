/* ============================================================================
   V2BankingFirst — PROCEDURE BF-01, the runbook.
   Header with status chip → four numbered PROCEDURE modules (pre-conditions /
   actions / OUTPUT / duration) → TIMELINE strip (gantt bars on a mono week
   scale) → FAILURE MODES table (why banks decline) → CHECKPOINT band (the
   pre-screen) → NEXT ACTION plate. All copy real; numbers carry SRC labels.
   ============================================================================ */
import { ArrowRight } from "lucide-react";
import {
  Btn,
  ModHead,
  NextAction,
  Reveal,
  Src,
  TLink,
  useInView,
} from "./shared";
import "./v2site.css";

/* ------------------------------------------------------------ procedures -- */

interface Procedure {
  id: string;
  name: string;
  pre: string;
  actions: string;
  output: string;
  duration: string;
}

const PROCEDURES: Procedure[] = [
  {
    id: "BF-01.1",
    name: "Bank",
    pre: "Source of funds documented. Bankability assessed at the free L0 pre-screen.",
    actions:
      "Pre-screen → Banking Roadmap (a named bank, a named officer, a realistic timeline) → application and compliance prepared the way the bank wants to see it.",
    output: "ACCOUNT LIVE + IBAN",
    duration: "5–7 DAYS (L0) · MANDATE 4–8 WKS",
  },
  {
    id: "BF-01.2",
    name: "Company",
    pre: "Banking path cleared — the entity is built to be banked, not the other way round.",
    actions:
      "Mainland, free zone or DIFC chosen for bankability and substance. Licence, lease and documents handled end to end; a real operating contour that survives compliance review.",
    output: "TRADE LICENCE + SUBSTANCE",
    duration: "SEQUENCED AFTER BF-01.1",
  },
  {
    id: "BF-01.3",
    name: "Visa",
    pre: "Structure in place; the residency route mapped against your assets and timeline.",
    actions:
      "Golden Visa or standard residency, documents handled. Spouse and children sponsored under the same structure, so residency reinforces the plan instead of fighting it.",
    output: "RESIDENCY + EMIRATES ID",
    duration: "SEQUENCED AFTER BF-01.2",
  },
  {
    id: "BF-01.4",
    name: "Assets",
    pre: "Banked and resident — the structure is live and ready to carry wealth.",
    actions:
      "Asset review across real estate, investments and digital assets. The 9% CT and substance rules mapped; VARA-regulated digital-asset compliance handled, not avoided.",
    output: "ONE COHERENT STRUCTURE",
    duration: "ONGOING AFTER BF-01.3",
  },
];

/* -------------------------------------------------------------- timeline -- */

const WEEKS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function Timeline() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  return (
    <div ref={ref} className={`v2s-gantt${inView ? " is-in" : ""}`}>
      <div className="v2s-gantt-scale" aria-hidden="true">
        <span className="v2s-gantt-scale-pad" />
        <span className="v2s-gantt-scale-track">
          {WEEKS.map((w) => (
            <i key={w} style={{ left: `${(w / 8) * 100}%` }}>
              WK {w}
            </i>
          ))}
        </span>
        <span className="v2s-gantt-scale-val" />
      </div>

      <div className="v2s-gantt-row">
        <span className="v2s-gantt-label">L0 PRE-SCREEN</span>
        <span className="v2s-gantt-track">
          <i className="v2s-gantt-bar is-amber" style={{ left: 0, width: "12.5%" }} />
        </span>
        <span className="v2s-gantt-val">5–7 DAYS</span>
      </div>

      <div className="v2s-gantt-row">
        <span className="v2s-gantt-label">FULL MANDATE</span>
        <span className="v2s-gantt-track">
          <i className="v2s-gantt-bar" style={{ left: 0, width: "50%" }} />
          <i className="v2s-gantt-bar is-range" style={{ left: "50%", width: "50%" }} />
        </span>
        <span className="v2s-gantt-val">4–8 WKS</span>
      </div>

      <Src className="v2s-gantt-src">
        SOLID = TYPICAL &middot; HATCHED = RANGE &mdash; SRC: L0 PRE-SCREEN &middot; WTP
        ENGAGEMENT MODEL
      </Src>
    </div>
  );
}

/* --------------------------------------------------------- failure modes -- */

const FAILURES: ReadonlyArray<{ code: string; mode: string; why: string; cleared: string }> = [
  {
    code: "F-01",
    mode: "Source of funds",
    why: "Provenance isn't documented the way compliance wants to read it.",
    cleared: "Documented at the pre-screen — the file is prepared before any application.",
  },
  {
    code: "F-02",
    mode: "Residency status",
    why: "Your residency status doesn't match the account profile the bank expects.",
    cleared: "Residency is sequenced inside the structure, not bolted on after.",
  },
  {
    code: "F-03",
    mode: "Structure mismatch",
    why: "The company was formed first — and a structure fixed before the bank is known rarely fits its risk model.",
    cleared: "The entity is chosen after the banking path is clear, built to be banked.",
  },
];

/* ----------------------------------------------------------------- page -- */

export default function V2BankingFirst() {
  return (
    <div className="v2s-root">
      {/* ======================================================== HEADER */}
      <header className="v2s-head">
        <div className="v2s-frame">
          <p className="v2s-trail">
            INDEX / METHOD / <b>PROCEDURE BF-01</b>
          </p>
          <div className="v2s-head-chips">
            <span className="v2s-chip is-on">
              <i aria-hidden="true" />
              STATUS: ACTIVE
            </span>
            <span className="v2s-chip">SEQ: BANK -&gt; COMPANY -&gt; VISA -&gt; ASSETS</span>
            <span className="v2s-chip">OWNER: IVAN OLENICHEV, CEO</span>
          </div>
          <h1 className="v2s-h1 v2s-head-h1">
            <span className="v2s-h1-line">Why the bank is</span>
            <span className="v2s-h1-line v2s-h1-amber">the hard step.</span>
          </h1>
          <p className="v2s-lead v2s-lead--ink">
            Everyone sells you the licence and the visa first. Then the account application
            stalls &mdash; and the whole structure is stuck. We invert the order: the bank goes
            first, and everything after is built to be bankable from day one.
          </p>
          <div className="v2s-cta-row">
            <Btn to="/contact">
              Book a free pre-screen <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </Btn>
            <Btn to="/banking-first/pre-screen" variant="ghost">
              How the pre-screen works
            </Btn>
          </div>
        </div>
      </header>

      <div className="v2s-frame v2s-rails">
        <span className="v2s-rail v2s-rail--l" aria-hidden="true" />
        <span className="v2s-rail v2s-rail--r" aria-hidden="true" />

        {/* ============================================== 01 PROCEDURES */}
        <section className="v2s-mod" aria-label="The four procedures">
          <ModHead idx="01" title="PROCEDURE MODULES" meta="01 / 05" />
          <div className="v2s-procs">
            {PROCEDURES.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <article className="v2s-proc">
                  <div className="v2s-proc-id">
                    <span className="v2s-proc-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="v2s-proc-code">{p.id}</span>
                    <h2 className="v2s-proc-name">{p.name}</h2>
                  </div>
                  <dl className="v2s-proc-body">
                    <div className="v2s-proc-row">
                      <dt>PRE-CONDITIONS</dt>
                      <dd>{p.pre}</dd>
                    </div>
                    <div className="v2s-proc-row">
                      <dt>ACTIONS</dt>
                      <dd>{p.actions}</dd>
                    </div>
                    <div className="v2s-proc-row is-output">
                      <dt>OUTPUT</dt>
                      <dd>{p.output}</dd>
                    </div>
                  </dl>
                  <span className="v2s-proc-dur">{p.duration}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================================================= 02 TIMELINE */}
        <section className="v2s-mod" aria-label="Timeline">
          <ModHead idx="02" title="TIMELINE — PRE-SCREEN TO MANDATE" meta="02 / 05" />
          <Reveal>
            <Timeline />
          </Reveal>
        </section>

        {/* ============================================ 03 FAILURE MODES */}
        <section className="v2s-mod" aria-label="Failure modes — why banks decline">
          <ModHead idx="03" title="FAILURE MODES — WHY BANKS DECLINE" meta="03 / 05" />
          <Reveal>
            <p className="v2s-stand">
              The standard playbook registers the entity, leases an office, files for the visa
              &mdash; and only then walks you to the bank. By that point the structure is fixed.
              Roughly a third of honest applications are declined on the first pass.
            </p>
            <div className="v2s-fail">
              <div className="v2s-fail-h" aria-hidden="true">
                <span>CODE</span>
                <span>FAILURE MODE</span>
                <span>WHY IT HAPPENS</span>
                <span>CLEARED BY</span>
              </div>
              {FAILURES.map((f) => (
                <div key={f.code} className="v2s-fail-row">
                  <span className="v2s-fail-code">{f.code}</span>
                  <span className="v2s-fail-mode">{f.mode}</span>
                  <span className="v2s-fail-why">{f.why}</span>
                  <span className="v2s-fail-fix">{f.cleared}</span>
                </div>
              ))}
            </div>
            <Src className="v2s-spec-note">
              ~30% OF HONEST APPLICATIONS DECLINED &mdash; SRC: WTP PRE-SCREEN DATA
            </Src>
          </Reveal>
        </section>

        {/* ================================================ 04 CHECKPOINT */}
        <section className="v2s-mod" aria-label="Checkpoint — the pre-screen">
          <ModHead idx="04" title="CHECKPOINT — THE PRE-SCREEN" meta="04 / 05" />
          <Reveal>
            <div className="v2s-check">
              <div className="v2s-check-copy">
                <h2 className="v2s-h3">
                  We assess bankability <span className="v2s-amber-t">before you spend a dirham.</span>
                </h2>
                <p className="v2s-body">
                  In 5&ndash;7 days you get a Banking Roadmap: a named bank, a named officer, and
                  an honest read on whether your file passes &mdash; or what to fix first.
                </p>
                <TLink to="/banking-first/pre-screen">How the pre-screen works</TLink>
              </div>
              <dl className="v2s-check-spec">
                <div>
                  <dt>FEE</dt>
                  <dd>0.00</dd>
                </div>
                <div>
                  <dt>OUTPUT</dt>
                  <dd>BANKING ROADMAP</dd>
                </div>
                <div>
                  <dt>TURNAROUND</dt>
                  <dd>5–7 DAYS</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </section>

        {/* =============================================== 05 NEXT ACTION */}
        <section className="v2s-mod v2s-mod--final" aria-label="Book a pre-screen">
          <ModHead idx="05" title="NEXT ACTION" meta="05 / 05" />
          <Reveal>
            <NextAction
              secondaryTo="/banking-first/pre-screen"
              secondaryLabel="How the pre-screen works"
            />
          </Reveal>
        </section>
      </div>
    </div>
  );
}
