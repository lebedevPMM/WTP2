/* ============================================================================
   V2ServicesOverview — SYSTEMS INDEX.
   No cards. A dense ruled registry: MODULE / FUNCTION / TIER / LEAD / STATUS
   rows with amber hover edge, a routing row for the unsure, a sequence note
   (the four lines run in order), the L0–L3 ladder and the NEXT ACTION plate.
   ============================================================================ */
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../../content/services";
import { getExpert } from "../../content/experts";
import { LadderTable, ModHead, NextAction, Reveal, SeqStrip, Src, TLink } from "./shared";
import "./v2site.css";

export default function V2ServicesOverview() {
  return (
    <div className="v2s-root">
      {/* ======================================================== HEADER */}
      <header className="v2s-head">
        <div className="v2s-frame">
          <p className="v2s-trail">
            INDEX / <b>SERVICES — SYSTEMS INDEX</b>
          </p>
          <div className="v2s-head-chips">
            <span className="v2s-chip is-on">
              <i aria-hidden="true" />
              MODULES: 04 ACTIVE
            </span>
            <span className="v2s-chip">ENTRY: L0 PRE-SCREEN — FREE</span>
          </div>
          <h1 className="v2s-h1 v2s-head-h1">
            <span className="v2s-h1-line">Four lines.</span>
            <span className="v2s-h1-line v2s-h1-amber">One accountable team.</span>
          </h1>
          <p className="v2s-lead v2s-lead--ink">
            Banking, business setup, residency and wealth &mdash; sequenced so the structure is
            bankable from day one. Every line is led by a named expert, not a handoff queue.
          </p>
        </div>
      </header>

      <div className="v2s-frame v2s-rails">
        <span className="v2s-rail v2s-rail--l" aria-hidden="true" />
        <span className="v2s-rail v2s-rail--r" aria-hidden="true" />

        {/* ================================================== 01 REGISTRY */}
        <section className="v2s-mod" aria-label="Module registry">
          <ModHead idx="01" title="MODULE REGISTRY" meta="01 / 04" />
          <Reveal>
            <div className="v2s-ix">
              <div className="v2s-ix-h" aria-hidden="true">
                <span>MODULE</span>
                <span className="v2s-ix-name">DESIGNATION</span>
                <span className="v2s-ix-fn">FUNCTION</span>
                <span>TIER</span>
                <span>LEAD</span>
                <span className="v2s-ix-st">STATUS</span>
              </div>
              {services.map((s, i) => {
                const lead = getExpert(s.leadExpert);
                return (
                  <Link key={s.slug} to={`/services/${s.slug}`} className="v2s-ix-row">
                    <span className="v2s-ix-id">MOD-{String(i + 1).padStart(2, "0")}</span>
                    <span className="v2s-ix-name">{s.line}</span>
                    <span className="v2s-ix-fn">{s.outcomeHeadline}</span>
                    <span className="v2s-ix-tier">{s.tierRange}</span>
                    <span className="v2s-ix-lead">{lead.signature.toUpperCase()}</span>
                    <span className="v2s-ix-st">
                      <span className="v2s-chip is-on v2s-chip--cell">
                        <i aria-hidden="true" />
                        ACTIVE
                      </span>
                      <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
              <Link to="/contact" className="v2s-ix-row is-route">
                <span className="v2s-ix-id">MOD-??</span>
                <span className="v2s-ix-name">Route unknown</span>
                <span className="v2s-ix-fn">
                  Most mandates start in one line and pull in the others. Tell us where you stand
                  and we&rsquo;ll route it.
                </span>
                <span className="v2s-ix-tier">L0</span>
                <span className="v2s-ix-lead">INTAKE</span>
                <span className="v2s-ix-st">
                  <span className="v2s-chip v2s-chip--cell">OPEN</span>
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </span>
              </Link>
            </div>
            <Src className="v2s-spec-note">
              EVERY MODULE CARRIES A NAMED LEAD &mdash; ACCOUNTABILITY IS THE PRODUCT
            </Src>
          </Reveal>
        </section>

        {/* ================================================== 02 SEQUENCE */}
        <section className="v2s-mod" aria-label="The sequence">
          <ModHead idx="02" title="SEQUENCE — NOT A MENU" meta="02 / 04" />
          <Reveal>
            <div className="v2s-seqband">
              <div>
                <h2 className="v2s-h3">
                  Bank first. <span className="v2s-amber-t">Then everything else.</span>
                </h2>
                <p className="v2s-body">
                  These four lines aren&rsquo;t a menu &mdash; they run in sequence. The bank is
                  the hardest gate, so we clear it before the company, the visa or the assets.
                </p>
                <TLink to="/banking-first">How the methodology works</TLink>
              </div>
              <SeqStrip current={1} />
            </div>
          </Reveal>
        </section>

        {/* ==================================================== 03 LADDER */}
        <section className="v2s-mod" aria-label="Engagement ladder">
          <ModHead idx="03" title="LADDER — ENGAGEMENT L0–L3" meta="03 / 04" />
          <Reveal>
            <LadderTable />
          </Reveal>
        </section>

        {/* =============================================== 04 NEXT ACTION */}
        <section className="v2s-mod v2s-mod--final" aria-label="Book a pre-screen">
          <ModHead idx="04" title="NEXT ACTION" meta="04 / 04" />
          <Reveal>
            <NextAction />
          </Reveal>
        </section>
      </div>
    </div>
  );
}
