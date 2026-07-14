import { Button } from "./ui";
import { Avatar } from "./Avatar";
import { useContent } from "../content/i18n";
import { type ExpertId } from "../content/experts";
import { trackCtaClick } from "../lib/analytics";
import { useLang } from "../i18n/lang";

export function PreScreenCTABlock({ expert = "olya" }: { expert?: ExpertId }) {
  const c = useContent();
  const e = c.getExpert(expert);
  const lang = useLang();
  const t = lang === "ru"
    ? {
        heroH2: "Не знаете, каковы ваши шансы?",
        lead: "Запишитесь на 15-минутный пре-скрининг с конкретным экспертом. Вы получите реалистичный банковский роадмап — без обязательств.",
        ctaWith: "Записаться на пре-скрининг с",
        noPitch: "Без продаж. Если мы не сможем взяться за ваш случай — скажем прямо.",
      }
    : {
        heroH2: "Not sure where you stand?",
        lead: "Request a 15-minute pre-screen with a named expert. You'll get a realistic Banking Roadmap — no obligation.",
        ctaWith: "Request a pre-screen with",
        noPitch: "No pitch. If we can't take your case, we'll tell you.",
      };
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
            {t.heroH2}
          </h2>
          <p style={{ color: "var(--ink-70)", maxWidth: 480, margin: "0 auto 28px", fontSize: 17 }}>
            {t.lead}
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <Button to="/contact" large onClick={() => trackCtaClick("request_pre_screen", "prescreen_cta_block")}>
              {t.ctaWith} {e.name}
            </Button>
            <p style={{ color: "var(--ink-55)", fontSize: 13.5, margin: 0 }}>
              {t.noPitch}
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
