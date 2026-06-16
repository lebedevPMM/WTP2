import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { getExpert } from "../content/experts";
import { categoryLabel, type Article } from "../content/articles";

export function ArticleCard({ article: a, featured = false }: { article: Article; featured?: boolean }) {
  const e = getExpert(a.author);
  return (
    <Link
      to={`/insights/${a.category}/${a.slug}`}
      className="card"
      style={{ display: "flex", flexDirection: "column", padding: featured ? 30 : 22, height: "100%" }}
    >
      <span className="chip" style={{ alignSelf: "flex-start", marginBottom: 14 }}>
        {categoryLabel[a.category]}
      </span>
      <h3 style={{ fontSize: featured ? 26 : 18.5, marginBottom: 12, lineHeight: 1.22 }}>{a.title}</h3>
      {featured && <p style={{ color: "var(--ink-70)", fontSize: 15.5, marginBottom: 18 }}>{a.excerpt}</p>}
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar expert={e} size={30} />
        <span style={{ fontSize: 13, color: "var(--ink-70)" }}>{e.name}</span>
        <span style={{ fontSize: 12.5, color: "var(--ink-40)" }}>· {a.readMin} min read</span>
      </div>
    </Link>
  );
}
