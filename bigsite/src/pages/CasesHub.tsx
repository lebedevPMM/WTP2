import { useState } from "react";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { StatBar } from "../components/StatBar";
import { CaseCard } from "../components/CaseCard";
import { PreScreenCTABlock } from "../components/PreScreenCTABlock";
import { cases } from "../content/cases";

type Filter = "all" | "banking" | "business-setup" | "residency-visa" | "assets-wealth";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "banking", label: "Banking" },
  { id: "business-setup", label: "Business Setup" },
  { id: "residency-visa", label: "Residency & Visa" },
  { id: "assets-wealth", label: "Assets & Wealth" },
];

export default function CasesHub() {
  const [active, setActive] = useState<Filter>("all");

  const shown =
    active === "all" ? cases : cases.filter((c) => c.services.includes(active));

  return (
    <>
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Cases & Results" }]} />
        <Eyebrow>Proof</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          Closed <span className="g">mandates</span>
        </h1>
        <p className="lead">
          Real engagements, told as situation → constraint → action → outcome. Each one is led by a
          named expert who owns the result — not a faceless desk.
        </p>
        <p className="muted" style={{ fontSize: 14, marginTop: 16, maxWidth: 720 }}>
          Real WTP mandates, anonymized — no client names. Figures (timelines, banks) are from the
          engagements themselves.
        </p>
      </Section>

      {/* Filterable case grid */}
      <Section>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
          {filters.map((f) => {
            const on = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className="chip"
                style={{
                  padding: "10px 18px",
                  fontSize: 14,
                  cursor: "pointer",
                  ...(on
                    ? {
                        border: "1px solid var(--gold)",
                        background: "rgba(227,181,100,0.12)",
                        color: "var(--gold)",
                      }
                    : {}),
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {shown.length > 0 ? (
          <div className="grid-3">
            {shown.map((c) => (
              <CaseCard key={c.slug} case={c} />
            ))}
          </div>
        ) : (
          <p className="muted" style={{ fontSize: 16 }}>
            No mandates in this line yet — book a pre-screen and yours could be the first.
          </p>
        )}
      </Section>

      {/* Honest aggregate stats — provenance on every number (SPEC law #5). Confirmed figures. */}
      <Section>
        <StatBar
          stats={[
            {
              value: "90%+",
              label: "of our pre-screened cases reach a working account",
              source: "WTP pre-screen data",
            },
            { value: "100+ HNWI", label: "mandates delivered", source: "WTP client base" },
          ]}
        />
      </Section>

      <PreScreenCTABlock expert="olya" />
    </>
  );
}
