import { Avatar } from "./Avatar";
import type { Expert } from "../content/experts";

export function Byline({ author, date, readMin }: { author: Expert; date: string; readMin: number }) {
  const d = new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <Avatar expert={author} size={44} />
      <div>
        <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 15 }}>
          {author.name} <span style={{ color: "var(--ink-40)", fontWeight: 500 }}>· {author.title}</span>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--ink-40)" }}>
          {d} · {readMin} min read
        </div>
      </div>
    </div>
  );
}
