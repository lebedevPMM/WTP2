import { Section, Button } from "../components/ui";
import { useLang } from "../i18n/lang";

export function NotFound() {
  const lang = useLang();
  const t = lang === "ru"
    ? { body: "Такого маршрута на карте нет.", backHome: "На главную" }
    : { body: "This route doesn't exist on the map.", backHome: "Back to home" };
  return (
    <Section style={{ textAlign: "center", paddingTop: 140 }}>
      <div className="g" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 72 }}>404</div>
      <p className="muted" style={{ fontSize: 18, margin: "12px 0 28px" }}>{t.body}</p>
      <Button to="/">{t.backHome}</Button>
    </Section>
  );
}

export default NotFound;
