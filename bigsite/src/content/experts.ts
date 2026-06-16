// Named experts — the authority layer (doctrine: every page carries a named expert).
// TODO(content-inventory): reconcile bios/titles with WTP2-content-inventory.md.

export type ExpertId = "ivan" | "oleg" | "olya" | "kostya" | "ilya";

export interface Expert {
  id: ExpertId;
  name: string;
  title: string;
  scope: string;
  credibility: string;
  signature: string;
  initials: string;
  photo?: string; // public path; falls back to gradient initials
  services: string[]; // service slugs this expert leads
}

export const experts: Record<ExpertId, Expert> = {
  ivan: {
    id: "ivan",
    name: "Ivan Olenichev",
    title: "CEO & Founder",
    scope: "Strategy, structuring, client mandates",
    credibility: "Built WTP around one hard truth: the bank is the gate, so we start there.",
    signature: "Ivan",
    initials: "IV",
    photo: "/experts/ivan.jpg",
    services: [],
  },
  oleg: {
    id: "oleg",
    name: "Oleg",
    title: "Banking & Investments",
    scope: "UAE account opening, compliance, investment structuring",
    credibility: "Runs the pre-screen that gets relocating HNWI through banks that decline most first applications.",
    signature: "Oleg",
    initials: "OL",
    photo: "/experts/oleg.jpg",
    services: ["banking", "assets-wealth"],
  },
  olya: {
    id: "olya",
    name: "Olya",
    title: "Legal, Visas & Setup",
    scope: "Company formation, residency, Golden Visa, legal structuring",
    credibility: "Sequences the company, residency and visa steps around your assets — not the other way round.",
    signature: "Olya",
    initials: "OY",
    photo: "/experts/olya.jpg",
    services: ["business-setup", "residency-visa", "assets-wealth"],
  },
  kostya: {
    id: "kostya",
    name: "Kostya",
    title: "Real Estate",
    scope: "Property acquisition, residency-by-investment real estate",
    credibility: "Maps property purchases to residency thresholds so the asset works twice.",
    signature: "Kostya",
    initials: "KO",
    services: ["assets-wealth"],
  },
  ilya: {
    id: "ilya",
    name: "Ilya",
    title: "Finance & VARA",
    scope: "Crypto, VARA licensing, digital-asset compliance",
    credibility: "Handles the digital-asset and VARA-regulated side most advisors won't touch.",
    signature: "Ilya",
    initials: "IL",
    services: ["assets-wealth"],
  },
};

export const expertList: Expert[] = [
  experts.ivan,
  experts.oleg,
  experts.olya,
  experts.kostya,
  experts.ilya,
];

export const getExpert = (id: ExpertId): Expert => experts[id];
