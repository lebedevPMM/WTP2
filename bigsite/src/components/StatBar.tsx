export interface Stat {
  value: string;
  label: string;
  source?: string; // provenance footnote (SPEC law #5)
}

export function StatBar({ stats }: { stats: Stat[] }) {
  return (
    <div
      className="statbar"
      style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 1, background: "var(--line)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)" }}
    >
      {stats.map((s, i) => (
        <div key={i} style={{ background: "var(--deep-2)", padding: "28px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.4vw,40px)" }} className="g">
            {s.value}
          </div>
          <div style={{ fontSize: 14, color: "var(--ink-70)", marginTop: 6 }}>{s.label}</div>
          {s.source && <div style={{ fontSize: 11, color: "var(--ink-40)", marginTop: 8 }}>{s.source}</div>}
        </div>
      ))}
    </div>
  );
}
