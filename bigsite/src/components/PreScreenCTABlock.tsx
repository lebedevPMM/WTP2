import { Button } from "./ui";
import { Avatar } from "./Avatar";
import { getExpert, type ExpertId } from "../content/experts";
import { trackCtaClick } from "../lib/analytics";

export function PreScreenCTABlock({ expert = "olya" }: { expert?: ExpertId }) {
  const e = getExpert(expert);
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="wrap">
        <div
          className="prescreen-panel"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "56px 40px",
            borderRadius: 24,
            background: "linear-gradient(180deg, var(--deep-2), var(--deep-3))",
            border: "1px solid var(--line)",
          }}
        >
          <h2 style={{ fontSize: "clamp(26px,3.6vw,40px)", marginBottom: 16 }} className="h-grad">
            Not sure where you stand?
          </h2>
          <p style={{ color: "var(--ink-70)", maxWidth: 480, margin: "0 auto 28px", fontSize: 17 }}>
            Request a 15-minute pre-screen with a named expert. You'll get a realistic Banking Roadmap — no obligation.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <Button to="/contact" large onClick={() => trackCtaClick("request_pre_screen", "prescreen_cta_block")}>
              Request a pre-screen with {e.name}
            </Button>
            <p style={{ color: "var(--ink-55)", fontSize: 13.5, margin: 0 }}>
              No pitch. If we can't take your case, we'll tell you.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 11, color: "var(--ink-55)", fontSize: 13.5 }}>
              <Avatar expert={e} size={34} />
              <span>
                {e.name} · {e.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
