// The 4 engagement levels — L0 Advisory -> L1 Entry -> L2 Setup -> L3 Control.
// Packages combine individual products into one private-wealth engagement. NO prices (engagement
// levels only). Source: anonymized internal catalog (packages section) + Banking-First process map.

export interface PackageData {
  level: "L0" | "L1" | "L2" | "L3";
  name: string;
  tagline: string;
  goal: string;
  forWhom: string;
  sells: string; // what the level fundamentally delivers
  includedProducts: string[]; // product slugs that have their own pages
  alsoIncludes: string[]; // supporting services without standalone pages
  results: string[];
  nextStep: string; // the upsell ladder
  logic: string;
}

export const packages: PackageData[] = [
  {
    level: "L0",
    name: "Advisory",
    tagline: "Diagnostics and the right direction — before you commit to anything.",
    goal: "Understand the situation and make the strategic decision.",
    forWhom: "A new client, a partner introduction, or a complex case that needs a verdict first.",
    sells: "Clarity and a defensible direction — not a service package.",
    includedProducts: ["pre-screen", "xray"],
    alsoIncludes: [
      "Banking Roadmap (named bank, realistic timeline)",
      "Risk map across banking, tax and structure",
      "GO / NO-GO / conditions verdict",
    ],
    results: [
      "Your goal is understood and the real constraints are on the table",
      "Risks and limits are identified before any money is spent",
      "A concrete roadmap: what to do, in what order",
    ],
    nextStep: "Most clients move from Advisory into Entry once the path is clear.",
    logic: "The filter that protects your record — and our expertise — from a doomed application.",
  },
  {
    level: "L1",
    name: "Entry",
    tagline: "A legal and banking foothold in the UAE.",
    goal: "Get you legally present and banked in the UAE.",
    forWhom: "Private clients, investors and families making the move.",
    sells: "Access and base bankability — the hardest gate, cleared first.",
    includedProducts: ["open-bank-account", "golden-visa"],
    alsoIncludes: [
      "UAE residency visa where required, plus Emirates ID",
      "Tax residency strategy",
      "Source of Funds package prepared per bank",
    ],
    results: [
      "You are legally present in the UAE",
      "A working personal account with online banking",
      "Your tax status is clear and intentional",
    ],
    nextStep: "Entry expands into Setup once you need to operate, not just reside.",
    logic: "Access and trust — the foundation everything else is built on.",
  },
  {
    level: "L2",
    name: "Setup",
    tagline: "The structure to operate, transact and scale.",
    goal: "Stand up the business, the assets and the deals.",
    forWhom: "Entrepreneurs, investors and families with assets to put to work.",
    sells: "The ability to operate and scale on a bankable structure.",
    includedProducts: ["open-company", "escrow", "factoring"],
    alsoIncludes: [
      "Corporate bank account matched to the business model",
      "VAT and Corporate Tax registration",
      "Conveyancing and deal support where property is involved",
    ],
    results: [
      "A company registered in the right jurisdiction",
      "Corporate accounts open and operational",
      "Deals and assets transacted securely",
    ],
    nextStep: "Setup graduates into Control once there is wealth worth governing.",
    logic: "Execution and money — turning presence into operations.",
  },
  {
    level: "L3",
    name: "Control",
    tagline: "Protection, governance and long-term continuity.",
    goal: "Keep the structure protected, compliant and durable.",
    forWhom: "HNWI, family offices and mature businesses.",
    sells: "Peace of mind and governance over the whole structure.",
    includedProducts: ["foundation", "last-will"],
    alsoIncludes: [
      "Accounting, tax reporting and ongoing compliance",
      "Succession planning and family governance",
      "Wealth and portfolio oversight",
    ],
    results: [
      "Assets are protected and held outside personal ownership",
      "The company stays compliant",
      "Money and structures stay under control across generations",
    ],
    nextStep: "Control is the long-term relationship — reviewed, not re-sold.",
    logic: "The platform layer — durability and a lasting relationship.",
  },
];

export const getPackage = (level: string): PackageData | undefined =>
  packages.find((p) => p.level === level);
