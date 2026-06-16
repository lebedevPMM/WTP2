/* ============================================================================
   V2Service — THE SPEC SHEET (route /services/:line).
   Same data lookup as the base template (getService by :line param; unknown
   slug → themed ERR-404 module). Module header with designation chips →
   PARAMETERS (INPUT / METHOD / OUTPUT) → sequence position → PROCEDURE rows →
   DELIVERABLES checklist → FEE rows → FAQ log → operator byline → NEXT ACTION.
   ============================================================================ */
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getService, services } from "../../content/services";
import { getExpert } from "../../content/experts";
import { Avatar } from "../../components/Avatar";
import { Btn, ModHead, NextAction, Reveal, SeqStrip, Src } from "./shared";
import "./v2site.css";

/* ------------------------------------------------- unknown-module fallback */

function UnknownModule({ slug }: { slug: string }) {
  return (
    <div className="v2s-root">
      <div className="v2s-frame v2s-err">
        <p className="v2s-trail">
          INDEX / SERVICES / <b>ERR-404</b>
        </p>
        <h1 className="v2s-h1 v2s-head-h1">
          <span className="v2s-h1-line">Unknown</span>
          <span className="v2s-h1-line v2s-h1-amber">module.</span>
        </h1>
        <p className="v2s-lead v2s-lead--ink">
          No service line is registered at <code className="v2s-code">/{slug}</code>. Four modules
          are active:
        </p>
        <div className="v2s-rows v2s-err-rows">
          {services.map((s, i) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="v2s-modrow">
              <span className="v2s-modrow-id" aria-hidden="true">
                MOD-{String(i + 1).padStart(2, "0")}
              </span>
              <span className="v2s-modrow-name">{s.line}</span>
              <span className="v2s-modrow-fn">{s.outcomeHeadline}</span>
              <span className="v2s-modrow-tier">{s.tierRange}</span>
              <span className="v2s-modrow-lead">
                LEAD: {getExpert(s.leadExpert).signature.toUpperCase()}
              </span>
              <span className="v2s-modrow-go" aria-hidden="true">
                <ArrowRight size={16} strokeWidth={2.2} />
              </span>
            </Link>
          ))}
        </div>
        <div className="v2s-cta-row">
          <Btn to="/services">All services</Btn>
          <Btn to="/contact" variant="ghost">
            Book a free pre-screen
          </Btn>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- page -- */

export default function V2Service() {
  const { line } = useParams();
  const s = getService(line || "");
  if (!s) return <UnknownModule slug={line || ""} />;

  const expert = getExpert(s.leadExpert);
  const modIdx = services.findIndex((x) => x.slug === s.slug) + 1;
  const modCode = `MOD-${String(modIdx).padStart(2, "0")}`;

  return (
    <div className="v2s-root">
      {/* ======================================================== HEADER */}
      <header className="v2s-head">
        <div className="v2s-frame">
          <p className="v2s-trail">
            INDEX / <Link to="/services">SERVICES</Link> / <b>{modCode}</b>
          </p>
          <div className="v2s-head-chips">
            <span className="v2s-chip is-on">
              <i aria-hidden="true" />
              {modCode} {s.line.toUpperCase()}
            </span>
            <span className="v2s-chip">TIER {s.tierRange}</span>
            <span className="v2s-chip">LEAD: {expert.signature.toUpperCase()}</span>
            <span className="v2s-chip">SEQ STEP {s.bankingFirstStep} / 4</span>
          </div>
          <h1 className="v2s-h1 v2s-head-h1 v2s-head-h1--long">{s.outcomeHeadline}</h1>
          <p className="v2s-lead v2s-lead--ink">{s.subhead}</p>
          <div className="v2s-cta-row">
            <Btn to="/contact">
              Book a free pre-screen <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </Btn>
            <Btn to="/services" variant="ghost">
              All modules
            </Btn>
          </div>
        </div>
      </header>

      <div className="v2s-frame v2s-rails">
        <span className="v2s-rail v2s-rail--l" aria-hidden="true" />
        <span className="v2s-rail v2s-rail--r" aria-hidden="true" />

        {/* ================================================ 01 PARAMETERS */}
        <section className="v2s-mod" aria-label="Parameters">
          <ModHead idx="01" title="PARAMETERS" meta="01 / 07" />
          <Reveal>
            <dl className="v2s-param">
              <div className="v2s-param-row">
                <dt>INPUT — THE PROBLEM</dt>
                <dd>{s.problem}</dd>
              </div>
              <div className="v2s-param-row">
                <dt>METHOD — THE APPROACH</dt>
                <dd>{s.subhead}</dd>
              </div>
              <div className="v2s-param-row is-output">
                <dt>OUTPUT — THE RESULT</dt>
                <dd>{s.outcomeHeadline}</dd>
              </div>
            </dl>
          </Reveal>
        </section>

        {/* ============================================== 02 SEQ POSITION */}
        <section className="v2s-mod" aria-label="Position in the banking-first sequence">
          <ModHead idx="02" title="SEQUENCE POSITION" meta="02 / 07" />
          <Reveal>
            <p className="v2s-panel-intro">
              Step {s.bankingFirstStep} of the banking-first sequence. The bank clears first;
              every later station is built on a structure that already passed.
            </p>
            <SeqStrip current={s.bankingFirstStep} />
          </Reveal>
        </section>

        {/* ================================================= 03 PROCEDURE */}
        <section className="v2s-mod" aria-label="Procedure">
          <ModHead idx="03" title="PROCEDURE" meta="03 / 07" />
          <Reveal>
            <div className="v2s-steps">
              {s.steps.map((st, i) => (
                <div key={i} className="v2s-step">
                  <span className="v2s-step-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="v2s-step-name">{st.title}</span>
                  <span className="v2s-step-out">{st.outcome}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ====================================== 04 DELIVERABLES + FEES */}
        <section className="v2s-mod" aria-label="Deliverables and fees">
          <ModHead idx="04" title="DELIVERABLES / FEES" meta="04 / 07" />
          <div className="v2s-dual">
            <Reveal>
              <h2 className="v2s-coltitle">DELIVERABLES — WHAT YOU GET</h2>
              <ul className="v2s-dlv">
                {s.deliverables.map((d, i) => (
                  <li key={i}>
                    <span className="v2s-dlv-idx" aria-hidden="true">
                      D-{String(i + 1).padStart(2, "0")}
                    </span>
                    <i className="v2s-dlv-mark" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="v2s-coltitle">FEE STRUCTURE</h2>
              <div className="v2s-fee">
                {s.tiers.map((t) => (
                  <div key={t.tier} className="v2s-fee-row">
                    <span className="v2s-fee-tier">{t.tier}</span>
                    <span className="v2s-fee-name">{t.label}</span>
                    <span className="v2s-fee-inc">{t.includes}</span>
                  </div>
                ))}
              </div>
              <Src className="v2s-spec-note">
                SCOPE AND FEE FIXED AT MANDATE &mdash; SRC: WTP ENGAGEMENT MODEL
              </Src>
            </Reveal>
          </div>
        </section>

        {/* ======================================================= 05 FAQ */}
        <section className="v2s-mod" aria-label="Questions log">
          <ModHead idx="05" title="Q / A LOG" meta="05 / 07" />
          <Reveal>
            <div className="v2s-faq">
              {s.faqs.map((f, i) => (
                <div key={i} className="v2s-faq-entry">
                  <p className="v2s-faq-q">
                    <span aria-hidden="true">Q:</span> {f.q}
                  </p>
                  <p className="v2s-faq-a">
                    <span aria-hidden="true">A:</span> {f.a}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ================================================== 06 OPERATOR */}
        <section className="v2s-mod" aria-label="Lead operator">
          <ModHead idx="06" title="LEAD OPERATOR" meta="06 / 07" />
          <Reveal>
            <div className="v2s-op v2s-op--single">
              <span className="v2s-op-cell">
                <Avatar expert={expert} size={46} />
              </span>
              <span className="v2s-op-id">
                <span className="v2s-op-tag" aria-hidden="true">
                  LEAD / {modCode}
                </span>
                <span className="v2s-op-name">{expert.name}</span>
                <span className="v2s-op-title">{expert.title}</span>
              </span>
              <span className="v2s-op-scope">{expert.scope}</span>
              <span className="v2s-op-cred">{expert.credibility}</span>
            </div>
          </Reveal>
        </section>

        {/* =============================================== 07 NEXT ACTION */}
        <section className="v2s-mod v2s-mod--final" aria-label="Book a pre-screen">
          <ModHead idx="07" title="NEXT ACTION" meta="07 / 07" />
          <Reveal>
            <NextAction />
          </Reveal>
        </section>
      </div>
    </div>
  );
}
