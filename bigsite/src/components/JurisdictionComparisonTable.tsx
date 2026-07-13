import { comparisonRows, jurisdictionName, type JurisdictionId } from "../content/jurisdictions";

export function JurisdictionComparisonTable({ columns }: { columns: JurisdictionId[] }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid var(--line)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
        <caption style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 }}>
          Jurisdictions compared on tax, banking access, residency and timeline
        </caption>
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: "left", padding: "16px 18px", background: "var(--deep-3)", fontSize: 13, color: "var(--ink-55)", fontWeight: 600 }} />
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                style={{
                  textAlign: "left",
                  padding: "16px 18px",
                  background: "var(--deep-3)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--ink)",
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
              <th scope="row" style={{ textAlign: "left", padding: "14px 18px", fontSize: 13.5, color: "var(--ink-55)", fontWeight: 600 }}>{row.label}</th>
              {columns.map((c) => (
                <td
                  key={c}
                  style={{
                    padding: "14px 18px",
                    fontSize: 14,
                    color: "var(--ink-70)",
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
