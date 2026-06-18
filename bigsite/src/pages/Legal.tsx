import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { Section, Eyebrow } from "../components/ui";
import { Breadcrumb } from "../components/Breadcrumb";
import { NotFound } from "./NotFound";
import { site } from "../lib/site";

// First-draft legal copy authored in-house. Have counsel review before relying on it
// for regulated activity — especially the Disclaimer (financial-services vertical).
const docs: Record<string, { title: string; body: ReactNode }> = {
  disclaimer: {
    title: "Disclaimer",
    body: (
      <>
        <p>
          Welcome to Paradise Real Estate Brokers L.L.C ("WTP", "we") provides advisory and facilitation
          services: company formation, banking facilitation, residency and visa support, and related
          structuring assistance in the United Arab Emirates.
        </p>
        <h3>Not regulated advice</h3>
        <p>
          Nothing on this website constitutes — and should not be relied upon as — regulated
          investment advice, tax advice, legal advice, or a personal recommendation, unless it is set
          out in a signed engagement letter that expressly says so. We are an advisory and
          facilitation provider, not a licensed bank, law firm, audit firm, or financial adviser.
        </p>
        <h3>Figures are illustrative</h3>
        <p>
          Tax rates, government fees, thresholds, timelines and other figures shown here are general,
          jurisdiction-dependent, and subject to change as laws and regulator policy evolve. Examples
          and case outcomes are anonymized and specific to the facts of each engagement; they are not
          a promise of a similar result for you. Banking approval is always at the discretion of the
          relevant bank and its compliance process — no outcome is guaranteed.
        </p>
        <h3>Do your own diligence</h3>
        <p>
          Before acting on anything you read here, verify it against current law and take advice from
          a qualified professional licensed in the relevant jurisdiction. WTP accepts no liability for
          decisions made solely on the basis of this website.
        </p>
        <h3>Anti-money-laundering</h3>
        <p>
          WTP operates a know-your-client and source-of-funds process and does not assist with the
          concealment of assets, tax evasion, or any unlawful activity. We may decline or discontinue
          an engagement where compliance requirements cannot be met.
        </p>
        <p style={{ color: "var(--ink-40)", fontSize: 14 }}>
          Questions about this disclaimer: <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
      </>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    body: (
      <>
        <p>
          This policy explains how Welcome to Paradise Real Estate Brokers L.L.C handles personal data you provide through
          this website (for example, when you request a pre-screen or contact us).
        </p>
        <h3>What we collect</h3>
        <p>
          The details you submit — typically your name, email, country of origin, and a description of
          your situation — plus basic technical data your browser sends. We do not knowingly collect
          special-category data through this site.
        </p>
        <h3>Why we use it</h3>
        <p>
          Solely to respond to your enquiry, assess bankability, deliver the services you ask for, and
          meet our legal and compliance obligations. We do not sell your data. Enquiries are processed
          in our CRM (Bitrix24) and, where you book a call, via our scheduling provider.
        </p>
        <h3>Sharing</h3>
        <p>
          We share data only with service providers that help us operate (CRM, scheduling, email) and
          with banks, free zones, or authorities strictly where needed to carry out an engagement you
          have asked us to perform, or where required by law.
        </p>
        <h3>Retention &amp; your rights</h3>
        <p>
          We keep enquiry data only as long as needed for the purpose above and applicable record-
          keeping rules. Our lawful basis is your consent and our legitimate interest in responding
          to your enquiry. You can ask us to access, correct, delete, port, or object to the
          processing of your data at{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>. If you
          are covered by the EU/UK GDPR or a similar regime, you may also lodge a complaint with your
          local data-protection supervisory authority.
        </p>
      </>
    ),
  },
  terms: {
    title: "Terms of Service",
    body: (
      <>
        <p>
          These terms govern your use of the Welcome to Paradise Real Estate Brokers L.L.C website. By using the site you
          accept them.
        </p>
        <h3>The website</h3>
        <p>
          This site is informational. It does not create a client relationship; an engagement begins
          only when both parties sign a written engagement letter that sets out scope, fees and
          responsibilities. Content may be updated or removed at any time.
        </p>
        <h3>No guarantee of outcome</h3>
        <p>
          Service tiers, timelines and prices indicated here are guidance and are confirmed per
          engagement. Third-party outcomes — bank approvals, regulator decisions, visa issuance — are
          determined by those parties, not by WTP, and are never guaranteed.
        </p>
        <h3>Intellectual property</h3>
        <p>
          The site content, brand and materials are owned by WTP unless stated otherwise. Don't
          reproduce them commercially without permission.
        </p>
        <h3>Contact</h3>
        <p>
          Questions: <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a> · {site.office}.
        </p>
      </>
    ),
  },

  cookies: {
    title: "Cookie Policy",
    body: (
      <>
        <p>
          This policy explains how this Welcome to Paradise Real Estate Brokers L.L.C website uses cookies and similar
          technologies, and the choices you have.
        </p>
        <h3>What we use</h3>
        <p>
          We keep cookies to a minimum. Strictly necessary cookies make the site work — navigation,
          security, and remembering your progress through a form. Where we measure how the site is
          used, we rely on privacy-respecting analytics. We do not use advertising or cross-site
          tracking cookies, and we do not sell or share cookie data with advertisers.
        </p>
        <h3>Your choices</h3>
        <p>
          You can refuse or delete cookies in your browser settings at any time; blocking strictly
          necessary cookies may stop parts of the site from working. Where the law requires consent
          for non-essential cookies, we ask for it before they are set.
        </p>
        <h3>More</h3>
        <p>
          Cookies that handle personal data are also covered by our{" "}
          <a href="/legal/privacy" style={{ color: "var(--gold)" }}>Privacy Policy</a>. Questions:{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
      </>
    ),
  },

  regulatory: {
    title: "Regulatory Status",
    body: (
      <>
        <p>
          Welcome to Paradise Real Estate Brokers L.L.C ("WTP") is a company licensed in the United
          Arab Emirates. Its licensed activity is real estate brokerage, registered with the competent
          UAE real estate authority.
        </p>
        <h3>How our other services work</h3>
        <p>
          Beyond real estate, we help clients prepare for and navigate banking, company formation,
          residency and structuring. We provide these on an advisory and facilitation basis — we
          prepare and coordinate files and introduce you to licensed providers. WTP is not a bank,
          law firm, audit firm, tax adviser, or licensed financial-services firm, and we do not
          provide regulated financial, legal, or tax advice.
        </p>
        <h3>Who is regulated for what</h3>
        <p>
          WTP is not licensed or regulated by the Central Bank of the UAE, the Dubai Financial
          Services Authority (DIFC), the Financial Services Regulatory Authority (ADGM), the
          Securities and Commodities Authority, or the Virtual Assets Regulatory Authority, and
          nothing on this site is an offer of regulated financial services. Regulated work — bank
          accounts, licences, visas, audited structures — is carried out by the relevant banks, free
          zones, authorities and licensed professionals under their own rules and at their own
          discretion. WTP facilitates and prepares; it does not approve, guarantee, or control those
          outcomes.
        </p>
        <h3>Engagement terms govern</h3>
        <p>
          Any service we provide is governed by a signed engagement letter that sets out scope, fees
          and responsibilities. Questions:{" "}
          <a href={`mailto:${site.email}`} style={{ color: "var(--gold)" }}>{site.email}</a>.
        </p>
      </>
    ),
  },
};

export default function Legal() {
  const { doc } = useParams();
  const d = docs[doc || ""];
  if (!d) return <NotFound />;
  return (
    <Section className="page-hero">
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: d.title }]} />
      <Eyebrow>Legal</Eyebrow>
      <h1 className="h-grad" style={{ marginBottom: 22 }}>{d.title}</h1>
      <div className="prose">{d.body}</div>
      <p style={{ marginTop: 32, fontSize: 13, color: "var(--ink-40)" }}>
        Last updated 18 June 2026 · Draft for review — not yet counsel-approved.
      </p>
    </Section>
  );
}
