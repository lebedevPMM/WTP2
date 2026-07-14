import { L as Link } from "../i18n/lang";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "./Avatar";
import { useContent } from "../content/i18n";
import type { CaseStudy } from "../content/cases";

export function CaseCard({ case: c }: { case: CaseStudy }) {
  const content = useContent();
  const e = content.getExpert(c.leadExpert);
  return (
    <Link to={`/cases/${c.slug}`} className="card" style={{ display: "flex", flexDirection: "column", padding: 22, height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span className="chip">{c.situationTag}</span>
        <ArrowUpRight size={18} style={{ color: "var(--gold)" }} />
      </div>
      <h3 style={{ fontSize: 19, marginBottom: 14, lineHeight: 1.2 }}>{c.title}</h3>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Avatar expert={e} size={28} />
          <span style={{ fontSize: 12.5, color: "var(--ink-55)" }}>{e.name}</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)" }}>{c.outcomeMetric}</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-40)" }}>{c.timeframe}</div>
        </div>
      </div>
    </Link>
  );
}
