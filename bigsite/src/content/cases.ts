import type { ExpertId } from "./experts";

// Real WTP client engagements, anonymized (names/nationalities abstracted; structure,
// compliance path and outcome as they occurred). Source: WTP2 Cases Deck (EN, edited v2,
// 2026-04-22). The RF 161-FZ case is intentionally omitted from the EN site.

export interface CaseStudy {
  slug: string;
  title: string;
  situationTag: string;
  situation: string;
  constraint: string;
  action: string;
  outcomeMetric: string;
  timeframe: string;
  verified: boolean;
  services: string[];
  segments?: string[];
  jurisdictions?: string[];
  leadExpert: ExpertId;
}

export const cases: CaseStudy[] = [
  {
    slug: "difc-holding-mining",
    title: "DIFC holding for a mining-equipment business",
    situationTag: "DIFC holding · Mining",
    situation:
      "An EU-citizen entrepreneur (wealth from a prior business sale of a significant equity stake) came to WTP after three Dubai consultancies each priced a single DIFC licence combining mining-equipment trading and investment activity. He was skeptical — their answers went vague on the regulatory detail.",
    constraint:
      "In DIFC, trading and investment fall under separate regulatory regimes; one licence cannot cover both. His profile also auto-triggered enhanced due diligence — an expanded pack of source-of-wealth evidence, statements, birth certificate, proof of citizenship, and notarized legalization of each document.",
    action:
      "We confirmed the impossibility with DIFC in writing, then built a two-entity model (a DIFC holding company plus a DIFC trading entity). We assembled and legalized the full EDD pack — DIFC cleared without supplementary requests — and pre-aligned the compliance file with a leading UAE bank before submission. We also handled office, residence, domain and business-service setup.",
    outcomeMetric:
      "DIFC structure + a UAE bank account, EDD cleared.",
    timeframe: "~10 weeks",
    verified: true,
    services: ["business-setup", "banking"],
    jurisdictions: ["uae"],
    leadExpert: "olya",
  },
  {
    slug: "free-zone-general-trading-remediation",
    title: "Three bank rejections — remediated to an open account",
    situationTag: "Free Zone · Remediation",
    situation:
      "The client had formed a Free Zone General Trading entity through another agency, then spent four months failing to open a corporate account: three rejections and two banks that never responded. Then he engaged WTP.",
    constraint:
      "Compliance review found three structural errors: a licence/activity mismatch (a General Trading licence over electronics, equipment, investment holding and asset management reads to a bank as a payment vehicle); no operational narrative (no customers, suppliers or pipeline); and incorporation before any bank pre-check, so the entity was already non-bankable.",
    action:
      "We renegotiated the licence activities with the regulator down to what banks accept, wrote a business-model memorandum for compliance review, assembled source-of-wealth documentation, and produced letters of intent from counterparties to evidence a real commercial pipeline. The case was recovered after a first bank 'no' — rebuilt into a file a bank could actually approve.",
    outcomeMetric: "Corporate account opened.",
    timeframe: "after 4 months stalled elsewhere",
    verified: true,
    services: ["banking", "business-setup"],
    jurisdictions: ["uae"],
    leadExpert: "olya",
  },
  {
    slug: "spanish-manufacturer-ifza-structuring",
    title: "Spanish manufacturer: an IFZA order reframed into a bankable structure",
    situationTag: "EU manufacturer · IFZA",
    situation:
      "A pet-accessories manufacturer in Spain — selling globally, Asia-focused — weighed a single-owner IFZA setup for its tax base. The questions were operational: reporting regime, mandatory accountant, hidden costs, moving funds out.",
    constraint:
      "With no UAE market activity, the planned structure triggered three risks before setup: economic substance (a single owner with no UAE operations risks failing the Qualifying Free Zone tests and being taxed at 9% instead of 0%); owner tax residency (UAE corporate savings don't survive attribution if the owner stays tax-resident in Spain); and bankability (a General Trading licence with no UAE counterparties is flagged as a payment-vehicle structure).",
    action:
      "We reframed a setup order into a structuring conversation — planning the owner's residency and the bank account's viability in parallel with the company, before incorporation, so substance, residency and banking hold together rather than collapsing on first review.",
    outcomeMetric: "Bankable structure, 0% regime preserved",
    timeframe: "resolved before incorporation",
    verified: true,
    services: ["business-setup", "banking"],
    jurisdictions: ["uae"],
    leadExpert: "olya",
  },
  {
    slug: "ai-company-mainland-remote-launch",
    title: "AI company on Dubai Mainland — launched remotely around a visa freeze",
    situationTag: "AI startup · Mainland",
    situation:
      "A family office referred an investor who wanted a full UAE structure — operating internationally while serving Dubai directly. Dubai Mainland was chosen for maximum flexibility. It looked routine.",
    constraint:
      "Execution surfaced three blocks. One founder's high-scrutiny passport hit a UAE visa-policy tightening — his tourist visa was rejected, risking a full stop. Then a biometric-system failure during residency processing, and an Emirates-ID delay in the central system.",
    action:
      "We restructured the formation: a power of attorney and remote incorporation using the second founder's documents, after which the first founder entered on an Entry Permit against his partnership — not a tourist visa. We arranged same-day biometric re-capture at another centre and went direct to immigration for a same-day Emirates ID so he flew out on schedule. Corporate, personal and online banking opened; cards couriered. WTP then ran the operational back-office for the full year.",
    outcomeMetric: "Company, residency, banking + multi-year ops",
    timeframe: "launched on schedule",
    verified: true,
    services: ["business-setup", "residency-visa"],
    jurisdictions: ["uae"],
    leadExpert: "olya",
  },
  {
    slug: "dubai-mortgage-to-mortgage",
    title: "A stalled mortgage pre-approval, rebuilt and closed in budget",
    situationTag: "Real estate · Mortgage",
    situation:
      "A partner referred a client buying a Dubai property on mortgage — documentation complete, income verified, legalization clean. But the file had already broken inside the bank, and the two-month pre-approval validity was running out.",
    constraint:
      "The prior broker had filed the application with no logical structure, so the bank couldn't reach a decision. It was also a mortgage-to-mortgage deal — both buyer and seller carried mortgages, doubling the banks involved and the break risk — against a tight budget in a location pricing above it.",
    action:
      "Rather than wait on the bank, we went into the branch the next day, sat with the banker, found where the file had broken, and rebuilt it as a structured case (income, transaction and documentation logic) — recovered after a first bank 'no'. Pre-approval issued in two business days. A focused search plus seller negotiation then closed a unit in the target location.",
    outcomeMetric: "Closed below list, in budget. Saved weeks against a lapsing pre-approval.",
    timeframe: "1.5 months (dual-mortgage)",
    verified: true,
    services: ["assets-wealth"],
    jurisdictions: ["uae"],
    leadExpert: "kostya",
  },
  {
    slug: "dubai-property-exit-golden-visa",
    title: "Property exit, redeployment, Golden Visa and succession — one coordinated sequence",
    situationTag: "Real estate · Golden Visa",
    situation:
      "A self-directed Dubai investor holding apartments wanted to exit cleanly and redeploy. What he needed was a capital-movement strategy, not a broker.",
    constraint:
      "Selling at that point would have lost money. And the real trap comes after a successful exit: capital is available but strategy isn't, so investors buy weak projects at hype and lose the next cycle.",
    action:
      "We advised waiting for handover, then sold the completed unit. The redeployment was prepared before closing — a pre-launch allocation in Dubai Islands, short-term-rental plus appreciation, with a unit selected on launch day. We then closed the full perimeter: Golden Visa, an ownership structure reviewed for exit and tax, and a will for succession.",
    outcomeMetric: "Clean exit, redeployment, Golden Visa and succession in one sequence.",
    timeframe: "exit timed to handover",
    verified: true,
    services: ["assets-wealth", "residency-visa"],
    jurisdictions: ["uae"],
    leadExpert: "kostya",
  },
  {"slug": "jewellery-dnfbp-meydan-crypto-payments", "title": "A cross-border gold and jewellery brand launched on a DNFBP-compliant licence with a legal crypto-payment rail", "situationTag": "Free Zone · DNFBP", "situation": "A founder wanted to launch a jewellery brand with a full cross-border chain: buy gold and precious stones in the UAE, manufacture finished pieces abroad, import them back into the UAE, and sell online worldwide. The model also needed to accept crypto payments legally. The activity fell under DNFBP (Gold & Precious Stones Trading), which carries heightened compliance and special approvals.", "constraint": "DNFBP-classified trade triggers a stricter licensing and compliance regime than ordinary trading, including a mandatory security inspection for handling high-value goods. Accepting crypto without a VARA licence is a common trap, and a misaligned activity set or an unprepared compliance file would have stalled both registration and bank onboarding.", "action": "WTP selected Meydan Free Zone for the cost-to-speed balance and built the correct activity set (wholesale of gold and precious metals, precious stones, jewellery trading, e-commerce) with DNFBP registration and pre-approval, then ran the required SIRA security inspection. The team arranged a corporate account with a leading UAE bank under full compliance support, and structured a legal crypto-acceptance flow through licensed payment providers so the company receives fiat - removing the need for a VARA licence. The cross-border export-manufacture-reimport logistics chain was set up through licensed secure-logistics operators to stay AML-compliant.", "outcomeMetric": "DNFBP licence, UAE corporate account, and a compliant crypto-to-fiat rail.", "timeframe": "about 8 weeks", "verified": true, "services": ["business-setup", "banking", "assets-wealth"], "jurisdictions": ["uae"], "leadExpert": "olya"}
];

export const getCase = (slug: string): CaseStudy | undefined =>
  cases.find((c) => c.slug === slug);
