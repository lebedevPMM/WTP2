import type { ExpertId } from "./experts";

// The 4 product lines — one ServiceTemplate, fed by these data objects.
// TODO(content-inventory): enrich steps/deliverables/faqs from L2/L3 landing strategy docs.

export interface ServiceData {
  slug: string;
  line: string;
  outcomeHeadline: string;
  subhead: string;
  tierRange: string;
  leadExpert: ExpertId;
  bankingFirstStep: 1 | 2 | 3 | 4;
  problem: string;
  steps: { title: string; outcome: string }[];
  deliverables: string[];
  tiers: { tier: string; label: string; includes: string }[];
  faqs: { q: string; a: string }[];
}

export const services: ServiceData[] = [
  {
    slug: "banking",
    line: "Banking",
    outcomeHeadline: "Open a UAE bank account without the 6-month wait",
    subhead:
      "Banks decline most relocating HNWI on the first application. We get you through — by starting with the bank, not the paperwork.",
    tierRange: "L0–L1",
    leadExpert: "olya",
    bankingFirstStep: 1,
    problem:
      "Form the company first and the bank says no — about a third of corporate applications are declined. Most advisors register the entity and leave you stranded at compliance. We treat the bank as the first, hardest step and clear it before anything else moves.",
    steps: [
      { title: "Pre-screen", outcome: "We assess bankability before you spend a dirham." },
      { title: "Banking roadmap", outcome: "A named bank, a named officer, a realistic timeline." },
      { title: "Application & compliance", outcome: "We prepare the file the way the bank wants to see it." },
      { title: "Account live", outcome: "IBAN issued, structure ready to build on." },
    ],
    deliverables: ["Bankability pre-screen", "Banking Roadmap document", "Compliance-ready application file", "Open account + IBAN"],
    tiers: [
      { tier: "L0", label: "Pre-screen", includes: "Bankability assessment + Banking Roadmap, delivered in 5–7 days." },
      { tier: "L1", label: "Account opening", includes: "Full application, compliance prep, account opened with IBAN." },
    ],
    faqs: [
      { q: "Why do banks decline relocating HNWI?", a: "Source-of-funds, residency status and structure mismatches. About 30% of honest applications are declined — we fix the causes before you apply." },
      { q: "How long does it take?", a: "The pre-screen takes 5–7 days; a full mandate runs 4–8 weeks. You get a realistic timeline up front, not a generic promise." },
    ],
  },
  {
    slug: "business-setup",
    line: "Business Setup",
    outcomeHeadline: "Set up your UAE company — mainland, free zone, or DIFC",
    subhead:
      "The right jurisdiction depends on your bank and your assets, not the other way round. We sequence it so the company is bankable.",
    tierRange: "L2",
    leadExpert: "olya",
    bankingFirstStep: 2,
    problem:
      "A company set up in the wrong zone is a company the bank won't serve. We choose the structure after the banking path is clear, so the entity is built to be banked.",
    steps: [
      { title: "Structure fit", outcome: "Mainland, free zone or DIFC — chosen for bankability and substance." },
      { title: "Formation", outcome: "Licence, lease and documents handled end to end." },
      { title: "Substance", outcome: "Real operating contour that survives compliance review." },
    ],
    deliverables: ["Jurisdiction recommendation", "Trade licence", "Corporate structure", "Substance setup"],
    tiers: [{ tier: "L2", label: "Company setup", includes: "Jurisdiction selection, formation, and substance built to be bankable." }],
    faqs: [
      { q: "Free zone or mainland?", a: "Depends on your activity, bank and visa needs. We map it at the pre-screen." },
      { q: "Does setup include a bank account?", a: "We sequence banking first, so yes — the account is the point, not an afterthought." },
    ],
  },
  {
    slug: "residency-visa",
    line: "Residency & Visa",
    outcomeHeadline: "UAE residency & the Golden Visa, structured around your assets",
    subhead:
      "Residency is a means, not the goal. We structure it around where your wealth sits and where it's going.",
    tierRange: "L2–L3",
    leadExpert: "olya",
    bankingFirstStep: 3,
    problem:
      "A Golden Visa obtained in isolation can complicate your structure later. We sequence residency so it reinforces the banking and asset plan instead of fighting it.",
    steps: [
      { title: "Eligibility map", outcome: "Which residency route fits your assets and timeline." },
      { title: "Application", outcome: "Golden Visa or standard residency, documents handled." },
      { title: "Family & dependents", outcome: "Spouse and children sponsored under the same structure." },
    ],
    deliverables: ["Residency route plan", "Golden Visa application", "Emirates ID", "Family sponsorship"],
    tiers: [
      { tier: "L2", label: "Standard residency", includes: "Residency via company or property, structured around your assets." },
      { tier: "L3", label: "Golden Visa + structuring", includes: "10-year Golden Visa structured around your assets." },
    ],
    faqs: [
      { q: "What qualifies for the Golden Visa?", a: "Investment routes start at AED 2M (e.g. property); talent and other thresholds also apply. We confirm yours at the pre-screen." },
      { q: "Can my family come?", a: "Yes — dependents are sponsored under the same structure." },
    ],
  },
  {
    slug: "assets-wealth",
    line: "Assets & Wealth",
    outcomeHeadline: "Protect and grow your wealth after the move",
    subhead:
      "Once you're banked and resident, the work is keeping the structure efficient — real estate, investments, digital assets.",
    tierRange: "L3",
    leadExpert: "olya",
    bankingFirstStep: 4,
    problem:
      "The move is the start, not the finish. Real estate, investment accounts and digital assets each carry their own compliance and tax contour. We keep the whole structure coherent.",
    steps: [
      { title: "Asset review", outcome: "Where everything sits and what the 9% CT and substance rules mean." },
      { title: "Real estate", outcome: "Property that doubles as a residency and a store of value (Kostya)." },
      { title: "Investments & digital", outcome: "Investment and VARA-regulated digital-asset structuring (Oleg · Ilya)." },
    ],
    deliverables: ["Asset structure review", "Real estate acquisition", "Investment account setup", "VARA / digital-asset compliance"],
    tiers: [{ tier: "L3", label: "Wealth structuring", includes: "Ongoing structuring across real estate, investments, and digital assets." }],
    faqs: [
      { q: "Does the UAE really have zero personal income tax?", a: "Personal income is untaxed; corporate profits face 9% CT above AED 375K (in effect since 1 June 2023). We structure for both." },
      { q: "Can you handle crypto?", a: "Yes — Ilya handles VARA-regulated digital-asset compliance most advisors avoid." },
    ],
  },
];

export const getService = (slug: string): ServiceData | undefined =>
  services.find((s) => s.slug === slug);
