// Themed V1 Services Overview — THE CONTENTS PAGE.
// No cards: a ledger INDEX — ruled rows (№ / Line / Outcome / Tier /
// Lead) linking to each service line, the fee ladder beneath, RSVP.
// Renders inside Layout under theme v1 only.

import { Link } from "react-router-dom";
import { services } from "../../content/services";
import { getExpert } from "../../content/experts";
import { Fn, NotesBlock, PageHead, RsvpPlate, SecHead } from "./shared";

const TIERS = [
  { tier: "L0", label: "Pre-screen", fee: "Free", includes: "Bankability assessment + a Banking Roadmap in 5–7 days." },
  { tier: "L1", label: "Account opening", fee: "1,500–3,000", includes: "Full application, compliance prep, account opened with IBAN." },
  { tier: "L2", label: "Company & residency", fee: "5,000–15,000", includes: "Jurisdiction selection, formation, substance and standard residency." },
  { tier: "L3", label: "Wealth structuring", fee: "15,000–50,000", includes: "Golden Visa, real estate, investments and digital-asset structuring." },
];

export default function V1ServicesOverview() {
  return (
    <div className="v1s-root v1s-services">
      <div className="v1s-container">
        <PageHead
          kicker="Services · The index"
          folio="Contents"
          title={
            <>
              Four lines, <strong>one accountable team.</strong>
            </>
          }
          standfirst={
            <>
              Banking, business setup, residency and wealth — sequenced so the structure is
              bankable from day one. These four lines aren’t a menu: they run in the order the
              banks expect, and every line is led by a named expert, not a handoff queue.
            </>
          }
        />

        {/* the ledger index */}
        <section className="v1s-sec v1s-sec--tight" aria-label="Index of service lines" style={{ paddingTop: "clamp(2.2rem, 4.4vw, 3.4rem)" }}>
          <div className="v1s-index">
            <div className="v1s-index-head" aria-hidden="true">
              <span>№</span>
              <span>Line</span>
              <span>Outcome</span>
              <span>Tier</span>
              <span style={{ textAlign: "right" }}>Lead</span>
            </div>
            {services.map((s, i) => {
              const lead = getExpert(s.leadExpert);
              return (
                <Link
                  to={`/services/${s.slug}`}
                  className="v1s-index-row"
                  key={s.slug}
                  aria-label={`${s.line} — ${s.outcomeHeadline}. Tier ${s.tierRange}, led by ${lead.name}.`}
                >
                  <span className="v1s-in-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="v1s-in-line">{s.line}</span>
                  <span className="v1s-in-outcome">{s.outcomeHeadline}</span>
                  <span className="v1s-in-tier" data-lead={lead.name}>
                    {s.tierRange}
                  </span>
                  <span className="v1s-in-lead">
                    {lead.name} · {lead.title}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="v1s-ledger-foot">
            <p>
              Most mandates start in one line and pull in the others. Not sure which is yours?
              The pre-screen routes it — free of charge.
            </p>
            <Link to="/contact" className="v1s-tlink">
              Talk to the desk
            </Link>
          </div>
        </section>

        {/* the fee ladder */}
        <section className="v1s-sec v1s-sec--tight" aria-label="Fees">
          <SecHead label="The fee ladder" folio="Engagement model · USD" />
          <div className="v1s-tblshell" style={{ marginTop: 0 }}>
            <table className="v1s-table">
              <thead>
                <tr>
                  <th scope="col">Tier</th>
                  <th scope="col">Engagement</th>
                  <th scope="col">What it includes</th>
                  <th scope="col">Fee, USD</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map((t) => (
                  <tr key={t.tier}>
                    <td data-th="Tier">
                      <span className="v1s-tier">{t.tier}</span>
                    </td>
                    <td data-th="Engagement" className="v1s-td-label">
                      {t.label}
                    </td>
                    <td data-th="Includes">{t.includes}</td>
                    <td data-th="Fee, USD" className="v1s-td-fee">
                      {t.fee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="v1s-ledger-foot">
            <p>
              Ranges are fixed into a single figure in the engagement letter, after the free
              pre-screen
              <Fn n={2} />. Figures per the WTP engagement model
              <Fn n={3} />.
            </p>
            <Link to="/banking-first" className="v1s-tlink">
              Why the bank goes first
            </Link>
          </div>
          <div style={{ marginTop: "clamp(2rem, 4vw, 3rem)", borderTop: "1px solid var(--v1s-rule)", paddingTop: "1.1rem" }}>
            <NotesBlock />
          </div>
        </section>
      </div>

      <RsvpPlate folio="The pre-screen" />
    </div>
  );
}
