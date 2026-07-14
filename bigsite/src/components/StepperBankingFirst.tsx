import { useLang } from "../i18n/lang";

export function StepperBankingFirst({ current }: { current?: 1 | 2 | 3 | 4 }) {
  const lang = useLang();
  const t =
    lang === "ru"
      ? {
          steps: [
            { n: 1, label: "Банк", note: "Сначала — самый трудный шаг" },
            { n: 2, label: "Компания", note: "Построена под банкабельность" },
            { n: 3, label: "Виза", note: "Выстроена вокруг активов" },
            { n: 4, label: "Активы", note: "Защищены и эффективны" },
          ],
        }
      : {
          steps: [
            { n: 1, label: "Bank", note: "Clear the hard step first" },
            { n: 2, label: "Company", note: "Built to be bankable" },
            { n: 3, label: "Visa", note: "Structured around assets" },
            { n: 4, label: "Assets", note: "Protected & efficient" },
          ],
        };
  return (
    <div className="stepper" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
      {t.steps.map((s) => {
        const active = current === s.n;
        return (
          <div
            key={s.n}
            style={{
              padding: "22px 18px",
              borderRadius: 14,
              border: `1px solid ${active ? "var(--gold)" : "var(--line)"}`,
              background: active ? "rgba(227,181,100,.08)" : "var(--deep-2)",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 12,
                color: active ? "#1a0d10" : "var(--gold)",
                background: active ? "var(--gold-grad)" : "transparent",
                border: active ? "none" : "1px solid var(--gold)",
              }}
            >
              {s.n}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17 }}>{s.label}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-55)", marginTop: 4 }}>{s.note}</div>
          </div>
        );
      })}
    </div>
  );
}
