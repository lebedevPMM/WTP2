import { Section, Button } from "../components/ui";

export function NotFound() {
  return (
    <Section style={{ textAlign: "center", paddingTop: 140 }}>
      <div className="g" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 72 }}>404</div>
      <p className="muted" style={{ fontSize: 18, margin: "12px 0 28px" }}>This route doesn't exist on the map.</p>
      <Button to="/">Back to home</Button>
    </Section>
  );
}

export default NotFound;
