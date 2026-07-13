import { Section, Eyebrow, Button } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { Seo } from "../components/Seo";

const PARTNER_SITE = "https://partners.wtp.ae/";

const HOW = [
  {
    title: "You keep the client",
    body: "The relationship stays yours. We never approach your client independently — we run the UAE execution behind your brand or ours, however you prefer.",
  },
  {
    title: "One point of responsibility",
    body: "One contact on the case and structured updates, with a file built to clear compliance the first time — so a referral never boomerangs back to your regulator.",
  },
  {
    title: "Referral or white-label",
    body: "Refer the client and we report to you, or we run the mandate under your brand. Clear terms either way, and a structure that still holds in five years.",
  },
];

const FOR = [
  "Tax and legal advisors with clients moving capital or operations to the UAE",
  "Family offices that need a banking-grade operator on the ground",
  "Wealth managers and brokers who keep hitting the banking wall",
];

export default function Partners() {
  return (
    <>
      <Seo
        title="For partners — WTP"
        description="For lawyers, advisors, family offices and brokers: refer your client and keep the relationship. WTP is the UAE execution partner that runs banking, structures and residency under one point of responsibility."
        canonical="/partners"
      />
      <Section className="page-hero">
        <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "For partners" }]} />
        <Eyebrow>For partners</Eyebrow>
        <h1 className="h-grad" style={{ fontSize: "clamp(32px,5vw,56px)", margin: "18px 0" }}>
          Refer your client. <span className="g">Keep the relationship.</span>
        </h1>
        <p className="lead">
          For tax and legal advisors, family offices and brokers with internationally mobile clients. You hold the
          relationship and the strategy; we run the part most firms can&rsquo;t — the UAE execution that has to clear
          compliance.
        </p>
        <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a className="btn" href={PARTNER_SITE} target="_blank" rel="noreferrer">Open the partner programme</a>
          <Button to="/contact" ghost>Talk to us about a case</Button>
        </div>
      </Section>

      <Section>
        <Eyebrow>How we work with partners</Eyebrow>
        <div className="grid-3" style={{ marginTop: 24 }}>
          {HOW.map((h) => (
            <div key={h.title} className="card" style={{ padding: 24 }}>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 10 }}>{h.title}</div>
              <p style={{ fontSize: 14.5, color: "var(--ink-70)", lineHeight: 1.6 }}>{h.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow>Who it&rsquo;s for</Eyebrow>
          <ul style={{ marginTop: 18, listStyle: "none", padding: 0 }}>
            {FOR.map((f) => (
              <li key={f} style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", display: "flex", gap: 10, fontSize: 16 }}>
                <span style={{ color: "var(--gold)" }}>→</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div style={{ padding: "40px", borderRadius: 20, background: "var(--deep-2)", border: "1px solid var(--line)", maxWidth: 760 }}>
          <Eyebrow>The partner programme</Eyebrow>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", margin: "16px 0 14px" }} className="h-grad">
            Terms, materials and the full programme
          </h2>
          <p className="muted" style={{ fontSize: 17, marginBottom: 24 }}>
            The dedicated partner site has the engagement model, the white-label option, terms and materials — and how
            cases are reported back to you.
          </p>
          <a className="btn" href={PARTNER_SITE} target="_blank" rel="noreferrer">Open partners.wtp.ae</a>
        </div>
      </Section>
    </>
  );
}
