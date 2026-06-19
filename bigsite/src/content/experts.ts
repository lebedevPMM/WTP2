// Named experts — the authority layer (doctrine: every page carries a named expert).
// Roster reconciled to the links-* founder personal pages (source of truth) on 2026-06-19.

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
    title: "Founder & CEO",
    scope: "Strategy, structuring, client mandates",
    credibility: "Built WTP around one hard truth: the bank is the gate, so we start there.",
    signature: "Ivan",
    initials: "IV",
    photo: "/experts/ivan.jpg",
    services: [],
  },
  oleg: {
    id: "oleg",
    name: "Oleg Karasev",
    title: "Investments & Capital",
    scope: "Capital markets, investment structuring, UAE real estate, late-stage private deals",
    credibility: "Thirteen years inside capital markets — weighs global markets, UAE property and late-stage US private deals as one portfolio strategy.",
    signature: "Oleg",
    initials: "OL",
    photo: "/experts/oleg.jpg",
    services: ["assets-wealth"],
  },
  olya: {
    id: "olya",
    name: "Olga Zueva",
    title: "Company, Banking & Visas",
    scope: "Company formation, bank account opening, residency, visas, compliance",
    credibility: "100+ applications: runs company, bank account, visa and compliance as one process — the bank account is the real test, not the company.",
    signature: "Olya",
    initials: "OY",
    photo: "/experts/olya.jpg",
    services: ["business-setup", "banking", "residency-visa"],
  },
  kostya: {
    id: "kostya",
    name: "Konstantin Horodko",
    title: "Real Estate & Investments",
    scope: "Dubai property acquisition, residency-by-investment real estate",
    credibility: "Direct lines to leading UAE developers — weighs Dubai property as an investment: yield, payment structure, horizon and exit.",
    signature: "Kostya",
    initials: "KO",
    photo: "/experts/horodko.jpg",
    services: ["assets-wealth"],
  },
  ilya: {
    id: "ilya",
    name: "Ilia Ostashov",
    title: "Founder & Private Client Advisor",
    scope: "Private-client advisory for HNWI — non-standard banking profiles, multi-country structures, long-term asset control",
    credibility: "A founder you deal with directly — the single point of accountability across banking, structures, residency and asset protection.",
    signature: "Ilia",
    initials: "IO",
    photo: "/experts/ilia.jpg",
    services: [],
  },
};

// NOTE: Sergey Kravtsov (Owner) has a personal page + photo (links-sergey) but is intentionally not in the public expert roster — confirm with founder.
export const expertList: Expert[] = [
  experts.ivan,
  experts.oleg,
  experts.olya,
  experts.kostya,
  experts.ilya,
];

export const getExpert = (id: ExpertId): Expert => experts[id];
