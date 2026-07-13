import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Button } from "./ui";
import type { Expert } from "../content/experts";

export function ExpertBioCard({ expert, variant = "full" }: { expert: Expert; variant?: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <Link to="/about/team" className="card" style={{ display: "flex", alignItems: "center", gap: 14, padding: 16 }}>
        <Avatar expert={expert} size={46} />
        <div>
          <div style={{ fontWeight: 700, fontFamily: "var(--font-display)" }}>{expert.name}</div>
          <div style={{ fontSize: 13, color: "var(--ink-55)" }}>{expert.title}</div>
        </div>
      </Link>
    );
  }
  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <Avatar expert={expert} size={56} />
        <div>
          <div style={{ fontWeight: 800, fontFamily: "var(--font-display)", fontSize: 18 }}>{expert.name}</div>
          <div style={{ fontSize: 13.5, color: "var(--gold)" }}>{expert.title}</div>
        </div>
      </div>
      <p style={{ fontSize: 14, color: "var(--ink-55)", marginBottom: 8 }}>{expert.scope}</p>
      <p style={{ fontSize: 14.5, color: "var(--ink-70)", marginBottom: 20 }}>{expert.credibility}</p>
      <Button to="/contact" ghost>
        Request a pre-screen with {expert.name}
      </Button>
    </div>
  );
}
