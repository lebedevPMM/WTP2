// Themed V1 Banking-First — THE LONG READ.
// Chaptered essay: masthead, sticky margin TOC, drop-cap intro, pull
// quote, the four steps as numbered chapters (each with a ruled
// "what you receive" aside), the fee ledger, footnotes, signature,
// closing RSVP plate. Renders inside Layout under theme v1 only.

import { Link } from "react-router-dom";
import { services } from "../../content/services";
import { getExpert } from "../../content/experts";
import { Byline, Fn, NotesBlock, PageHead, RsvpPlate } from "./shared";

const CHAPTERS = [
  { slug: "banking", name: "The Bank", kicker: "Chapter 01 · Step one" },
  { slug: "business-setup", name: "The Company", kicker: "Chapter 02 · Step two" },
  { slug: "residency-visa", name: "The Visa", kicker: "Chapter 03 · Step three" },
  { slug: "assets-wealth", name: "The Assets", kicker: "Chapter 04 · Step four" },
].map((c) => ({ ...c, s: services.find((sv) => sv.slug === c.slug) }));

/* The offer ladder — same figures the base page states (engagement model). */
const TIERS = [
  { tier: "L0", label: "Pre-screen", fee: "Free", includes: "Bankability assessment + a Banking Roadmap in 5–7 days." },
  { tier: "L1", label: "Account opening", fee: "1,500–3,000", includes: "Full application, compliance prep, account opened with IBAN." },
  { tier: "L2", label: "Company & residency", fee: "5,000–15,000", includes: "Jurisdiction selection, formation, substance and standard residency." },
  { tier: "L3", label: "Wealth structuring", fee: "15,000–50,000", includes: "Golden Visa, real estate, investments and digital-asset structuring." },
];

const TOC = [
  { href: "#v1s-ch-0", n: "—", label: "The wall" },
  { href: "#v1s-ch-1", n: "01", label: "The Bank" },
  { href: "#v1s-ch-2", n: "02", label: "The Company" },
  { href: "#v1s-ch-3", n: "03", label: "The Visa" },
  { href: "#v1s-ch-4", n: "04", label: "The Assets" },
  { href: "#v1s-fees", n: "§", label: "The fee ledger" },
  { href: "#v1s-notes", n: "†", label: "Notes & sources" },
];

export default function V1BankingFirst() {
  const ivan = getExpert("ivan");

  return (
    <div className="v1s-root v1s-bankingfirst">
      <div className="v1s-container">
        <PageHead
          kicker="The doctrine"
          folio="P. 2"
          title={
            <>
              Why the bank is <strong>the <em>hard</em> step.</strong>
            </>
          }
          standfirst={
            <>
              Everyone sells you the licence and the visa first. Then the account application
              stalls — and the whole structure is stuck. We invert the order: the bank goes
              first, and everything after is built to be bankable from day one.
            </>
          }
          meta={<Byline expert={ivan} note="who signs this method" />}
        />

        <div className="v1s-read">
          {/* sticky margin TOC */}
          <nav className="v1s-toc" aria-label="In this essay">
            <span className="v1s-toc-head v1s-label v1s-label--ink">In this essay</span>
            {TOC.map((t) => (
              <a href={t.href} key={t.href}>
                <span className="v1s-toc-n">{t.n}</span>
                {t.label}
              </a>
            ))}
          </nav>

          {/* the essay */}
          <article className="v1s-essay">
            {/* the wall — intro chapter */}
            <section id="v1s-ch-0" className="v1s-chapter" style={{ marginTop: 0 }}>
              <h2 className="v1s-essay-intro-h">
                Company-first is how you end up <strong>unbanked.</strong>
              </h2>
              <p className="v1s-dropcap">
                The standard playbook registers the entity, leases an office, files for the
                visa — and only then walks you to the bank. By that point the structure is
                fixed, and if it doesn’t fit the bank’s risk model, you are stuck. Roughly a
                third of honest applications are declined on the first pass
                <Fn n={1} />.
              </p>
              <p>
                We treat the bank as the first, hardest gate and clear it before anything else
                is committed — so the company, the visa and the assets are all shaped to pass
                compliance, not to fight it. The four chapters below are the whole method, in
                the order the money actually moves.
              </p>
            </section>

            {/* pull quote */}
            <div className="v1s-pull">
              <span className="v1s-pull-tick" aria-hidden="true" />
              <blockquote>A licence without an account is stationery.</blockquote>
              <span className="v1s-pull-attr v1s-folio">The Banking-First doctrine, art. 1</span>
            </div>

            {/* chapters 01–04 */}
            {CHAPTERS.map((c, i) =>
              c.s ? (
                <section className="v1s-chapter" id={`v1s-ch-${i + 1}`} key={c.slug}>
                  <header className="v1s-chapter-head">
                    <span className="v1s-chapter-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="v1s-chapter-titles">
                      <span className="v1s-chapter-kicker">
                        {c.kicker} · {c.s.line} · {c.s.tierRange}
                      </span>
                      <h2 className="v1s-chapter-title">{c.name}</h2>
                    </div>
                  </header>
                  <p>{c.s.problem}</p>
                  <div className="v1s-clauses">
                    {c.s.steps.map((st, j) => (
                      <div className="v1s-clause" key={st.title}>
                        <span className="v1s-clause-n">
                          {i + 1}.{j + 1}
                        </span>
                        <span className="v1s-clause-body">
                          <b>{st.title}.</b> {st.outcome}
                        </span>
                      </div>
                    ))}
                  </div>
                  <aside className="v1s-aside">
                    <span className="v1s-aside-label">What you receive</span>
                    <ul>
                      {c.s.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <div className="v1s-aside-fees">
                      {c.s.tiers.map((t) => (
                        <span key={t.tier}>
                          {t.tier} · {t.label} — {t.includes}
                        </span>
                      ))}
                    </div>
                  </aside>
                  <p style={{ marginTop: "1.1rem" }}>
                    <Link to={`/services/${c.slug}`} className="v1s-tlink">
                      The {c.s.line} prospectus in full →
                    </Link>
                  </p>
                </section>
              ) : null
            )}

            {/* the fee ledger */}
            <section className="v1s-chapter" id="v1s-fees">
              <header className="v1s-chapter-head">
                <span className="v1s-chapter-n" aria-hidden="true">
                  §
                </span>
                <div className="v1s-chapter-titles">
                  <span className="v1s-chapter-kicker">Engagements & fees · entered in plain figures</span>
                  <h2 className="v1s-chapter-title">The fee ledger</h2>
                </div>
              </header>
              <p>
                Four tiers, one accountable team. Ranges are fixed into a single figure in the
                engagement letter, after the pre-screen
                <Fn n={2} /> — and the pre-screen itself costs nothing.
              </p>
              <div className="v1s-tblshell">
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
              <p style={{ marginTop: "1.1rem", fontStyle: "italic", fontSize: "0.9rem", color: "var(--v1s-ink-faint)" }}>
                Source: WTP engagement model
                <Fn n={3} />. A mandate that shouldn’t proceed is told so at L0 — free of
                charge.
              </p>
            </section>

            {/* signature */}
            <div className="v1s-sig">
              <p className="v1s-sig-quote">“{ivan.credibility}”</p>
              <Byline expert={ivan} size={50} />
            </div>

            {/* footnotes */}
            <section className="v1s-chapter">
              <NotesBlock />
            </section>
          </article>
        </div>
      </div>

      <RsvpPlate
        folio="The pre-screen"
        secondary={{ label: "How the pre-screen works", to: "/banking-first/pre-screen" }}
      />
    </div>
  );
}
