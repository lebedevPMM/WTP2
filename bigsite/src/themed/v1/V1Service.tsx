// Themed V1 Service — THE PROSPECTUS SHEET.
// Reads :line like the base ServiceTemplate (same data lookup, NotFound
// fallback). Two-column prospectus: narrative (drop-cap brief + numbered
// clauses) · fact rail (deliverables ledger, terms & fees, lead expert).
// FAQ as Q./A. editorial pairs. Renders inside Layout under theme v1.

import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { NotFound } from "../../pages/NotFound";
import { getService, services } from "../../content/services";
import { getExpert } from "../../content/experts";
import { Avatar } from "../../components/Avatar";
import { Byline, NotesBlock, PageHead, RsvpPlate, SecHead } from "./shared";

const SEQ_NAMES = ["The Bank", "The Company", "The Visa", "The Assets"];

export default function V1Service() {
  const { line } = useParams();
  const s = getService(line || "");
  if (!s) return <NotFound />;

  const expert = getExpert(s.leadExpert);
  const step = s.bankingFirstStep;
  const next = services.find((sv) => sv.bankingFirstStep === step + 1);

  return (
    <div className="v1s-root v1s-service">
      <div className="v1s-container">
        <PageHead
          kicker={`Prospectus · ${s.line}`}
          folio={`Line ${String(step).padStart(2, "0")} of 04 · ${s.tierRange}`}
          title={s.outcomeHeadline}
          standfirst={s.subhead}
          meta={
            <>
              <Byline expert={expert} note="leads this line" />
              <span className="v1s-folio">
                Step {step} of 4 · Bank → Company → Visa → Assets
              </span>
            </>
          }
        />

        <div className="v1s-prosp">
          {/* narrative column */}
          <article className="v1s-prosp-narrative">
            <span className="v1s-label" style={{ display: "block", marginBottom: "1rem" }}>
              The brief
            </span>
            <p className="v1s-dropcap" style={{ fontSize: "1.08em", lineHeight: 1.62 }}>
              {s.problem}
            </p>

            <div style={{ marginTop: "clamp(2rem, 4vw, 2.8rem)" }}>
              <span className="v1s-label" style={{ display: "block", marginBottom: "0.4rem" }}>
                The clauses — how the line runs
              </span>
              <div className="v1s-clauses" style={{ marginTop: "0.6rem" }}>
                {s.steps.map((st, j) => (
                  <div className="v1s-clause" key={st.title}>
                    <span className="v1s-clause-n">
                      {step}.{j + 1}
                    </span>
                    <span className="v1s-clause-body">
                      <b>{st.title}.</b> {st.outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="v1s-pull" style={{ paddingBottom: 0 }}>
              <span className="v1s-pull-tick" aria-hidden="true" />
              <blockquote style={{ fontSize: "clamp(1.3rem, 1rem + 1.4vw, 1.8rem)" }}>
                “{expert.credibility}”
              </blockquote>
              <span className="v1s-pull-attr v1s-folio">
                {expert.name} · {expert.title}
              </span>
            </div>
          </article>

          {/* fact rail */}
          <aside className="v1s-prosp-rail" aria-label="Deliverables, terms and fees">
            <div className="v1s-facts-block">
              <span className="v1s-facts-head v1s-label v1s-label--ink">
                What you hold at the end
              </span>
              <ul>
                {s.deliverables.map((d, i) => (
                  <li className="v1s-fact" key={d}>
                    <span className="v1s-fact-n">{String(i + 1).padStart(2, "0")}</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="v1s-facts-block">
              <span className="v1s-facts-head v1s-label v1s-label--ink">Terms & fees</span>
              {s.tiers.map((t) => (
                <div className="v1s-feefact" key={t.tier}>
                  <div className="v1s-feefact-line">
                    <span className="v1s-tier" style={{ marginBottom: 0 }}>
                      {t.tier}
                    </span>
                    <span className="v1s-feefact-label">{t.label}</span>
                  </div>
                  <p>{t.includes}</p>
                </div>
              ))}
              <span className="v1s-src" style={{ marginTop: "0.8rem" }}>
                Engagement model · fixed in the engagement letter
              </span>
            </div>

            <div className="v1s-facts-block v1s-rail-expert">
              <span className="v1s-facts-head v1s-label v1s-label--ink">Your expert</span>
              <div className="v1s-byline" style={{ marginTop: "0.9rem" }}>
                <Avatar expert={expert} size={48} />
                <div>
                  <span className="v1s-byline-name">{expert.name}</span>
                  <span className="v1s-byline-title">{expert.title}</span>
                </div>
              </div>
              <p className="v1s-rail-cred">{expert.scope}</p>
            </div>

            <div className="v1s-rail-cta">
              <Link to="/contact" className="v1s-btn">
                Book a free pre-screen
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </Link>
              <Link to="/banking-first" className="v1s-tlink" style={{ fontSize: "0.9rem" }}>
                Where this sits in the method
              </Link>
            </div>
          </aside>
        </div>

        {/* FAQ — editorial Q./A. pairs */}
        <section className="v1s-sec v1s-sec--tight" aria-label="Questions and answers" style={{ paddingTop: 0 }}>
          <SecHead label="Questions, answered plainly" folio={`${s.line} · Q&A`} />
          <div className="v1s-qa">
            {s.faqs.map((f) => (
              <div className="v1s-qa-pair" key={f.q}>
                <h3 className="v1s-qa-q">
                  <span className="v1s-qa-mark">Q.</span>
                  {f.q}
                </h3>
                <p className="v1s-qa-a">
                  <span className="v1s-qa-mark">A.</span>
                  {f.a}
                </p>
              </div>
            ))}
          </div>

          {/* sequence cross-reference */}
          <div className="v1s-nextline">
            <p>
              This line is step {step} of the Banking-First sequence
              {step > 1 ? " — it assumes the bank is already cleared." : " — everything else is built on it."}
            </p>
            {next ? (
              <Link to={`/services/${next.slug}`} className="v1s-tlink">
                Next in the sequence: {SEQ_NAMES[next.bankingFirstStep - 1]} · {next.line} →
              </Link>
            ) : (
              <Link to="/services" className="v1s-tlink">
                Back to the index of lines →
              </Link>
            )}
          </div>

          {/* provenance registry — anchors the footnote in the RSVP plate */}
          <div style={{ marginTop: "clamp(2rem, 4vw, 3rem)", borderTop: "1px solid var(--v1s-rule)", paddingTop: "1.1rem" }}>
            <NotesBlock />
          </div>
        </section>
      </div>

      <RsvpPlate folio={`${s.line} · The pre-screen`} />
    </div>
  );
}
