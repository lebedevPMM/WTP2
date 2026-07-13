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
    label: "Banking access (incoming HNWI)",
    values: { uae: "Hard but solvable", singapore: "Selective", portugal: "Moderate", switzerland: "Relationship-led", malta: "Moderate" },
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
    bankingFirstTake: "Singapore's funds ecosystem and Asian access are hard to match. Banking-first, the UAE usually clears the account faster for HNWI profiles, at zero personal income tax — the right call depends on where you operate.",
  },
  {
    slug: "portugal",
    title: "UAE vs Portugal (post-NHR)",
    whoSuits: "Portugal suits those wanting EU residency and lifestyle, post-NHR reductions accepted.",
    bankingFirstTake: "Portugal wins on EU access and lifestyle. On tax and banking certainty once the NHR window narrows, the UAE is the steadier base — weigh EU residency against that.",
  },
  {
    slug: "switzerland",
    title: "UAE vs Switzerland for private banking",
    whoSuits: "Switzerland suits ultra-relationship-led private banking and lump-sum taxation deals.",
    bankingFirstTake: "Switzerland's private-banking depth and discretion are in a class of their own. Banking-first, the UAE matches much of it at zero personal income tax and a faster setup — discretion-led vs speed-led.",
  },
  {
    slug: "malta",
    title: "UAE vs Malta for private wealth",
    whoSuits: "Malta suits those wanting an English-speaking EU base with a contribution-plus-property residency route.",
    bankingFirstTake: "Malta gives a genuine EU footing and English-language base. Banking-first, the UAE tends to clear HNWI accounts more reliably and at zero personal income tax — EU access vs banking certainty.",
  },
];

export const getComparator = (slug: string): JurisdictionPage | undefined =>
  comparatorPages.find((p) => p.slug === slug);
