import { comparisonRows, jurisdictionName, type JurisdictionId } from "../content/jurisdictions";

export function JurisdictionComparisonTable({ columns }: { columns: JurisdictionId[] }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid var(--line)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "16px 18px", background: "var(--deep-3)", fontSize: 13, color: "var(--ink-55)", fontWeight: 600 }} />
            {columns.map((c) => (
              <th
                key={c}
                style={{
                  textAlign: "left",
                  padding: "16px 18px",
                  background: c === "uae" ? "rgba(255,198,90,.1)" : "var(--deep-3)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: c === "uae" ? "var(--gold)" : "var(--ink)",
                }}
              >
                {jurisdictionName[c]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, i) => (
            <tr key={row.label} style={{ borderTop: "1px solid var(--line)", background: i % 2 ? "var(--deep-2)" : "transparent" }}>
              <td style={{ padding: "14px 18px", fontSize: 13.5, color: "var(--ink-55)", fontWeight: 600 }}>{row.label}</td>
              {columns.map((c) => (
                <td
                  key={c}
                  style={{
                    padding: "14px 18px",
                    fontSize: 14,
                    color: c === "uae" ? "var(--ink)" : "var(--ink-70)",
                    background: c === "uae" ? "rgba(255,198,90,.04)" : "transparent",
                    fontWeight: c === "uae" ? 600 : 400,
                  }}
                >
                  {row.values[c]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
