// Jurisdiction comparison data.

export interface JurisdictionRow {
  label: string;
  values: Record<string, string>; // keyed by jurisdiction id
}

export const jurisdictionIds = ["uae", "singapore", "portugal", "switzerland", "malta"] as const;
export type JurisdictionId = (typeof jurisdictionIds)[number];

export const jurisdictionName: Record<JurisdictionId, string> = {
  uae: "UAE",
  singapore: "Singapore",
  portugal: "Portugal",
  switzerland: "Switzerland",
  malta: "Malta",
};

export const comparisonRows: JurisdictionRow[] = [
  {
    label: "Personal income tax",
    values: { uae: "0%", singapore: "up to 24%", portugal: "up to 48%", switzerland: "up to ~40%", malta: "up to 35%" },
  },
  {
    label: "Banking access (relocating HNWI)",
    values: { uae: "Hard but solvable — our specialty", singapore: "Selective", portugal: "Moderate", switzerland: "Relationship-led", malta: "Moderate" },
  },
  {
    label: "Residency cost / threshold",
    values: { uae: "Golden Visa investment tiers", singapore: "High (GIP)", portugal: "Post-NHR, reduced", switzerland: "Lump-sum tax deal", malta: "Contribution + property" },
  },
  {
    label: "Typical timeline",
    values: { uae: "Weeks once banked", singapore: "Months", portugal: "Months", switzerland: "Months", malta: "Months" },
  },
  {
    label: "Exit-tax exposure (origin-dependent)",
    values: { uae: "Origin-dependent", singapore: "Origin-dependent", portugal: "Origin-dependent", switzerland: "Origin-dependent", malta: "Origin-dependent" },
  },
];

export interface JurisdictionPage {
  slug: JurisdictionId;
  title: string;
  whoSuits: string;
  bankingFirstTake: string;
}

export const comparatorPages: JurisdictionPage[] = [
  {
    slug: "singapore",
    title: "UAE vs Singapore for private wealth",
    whoSuits: "Singapore suits founders prioritizing Asian market access and a mature funds ecosystem.",
    bankingFirstTake: "Banking-first, the UAE clears the account faster for most HNWI profiles, with zero personal income tax.",
  },
  {
    slug: "portugal",
    title: "UAE vs Portugal (post-NHR)",
    whoSuits: "Portugal suits those wanting EU residency and lifestyle, post-NHR reductions accepted.",
    bankingFirstTake: "The UAE offers stronger tax and banking certainty once the NHR window narrows.",
  },
  {
    slug: "switzerland",
    title: "UAE vs Switzerland for private banking",
    whoSuits: "Switzerland suits ultra-relationship-led private banking and lump-sum taxation deals.",
    bankingFirstTake: "The UAE offers comparable banking depth at zero personal income tax and faster setup.",
  },
];

export const getComparator = (slug: string): JurisdictionPage | undefined =>
  comparatorPages.find((p) => p.slug === slug);
