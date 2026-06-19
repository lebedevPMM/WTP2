import type { ExpertId } from "./experts";

// Full product catalog — 9 products under 4 categories + a Start Here (diagnostics) axis.
// Source: b2c presentations + one-pagers + anonymized internal brief (extracted + adversarially
// verified for confidential-leak / prices / provenance / HNWI tone). NO prices, NO client data.
// One ProductTemplate is fed by these objects (mirrors ServiceTemplate).

export interface ProductTier { tier: string; label: string; includes: string }
export interface ProductStep { title: string; outcome: string }
export interface ProductFAQ { q: string; a: string }

export interface ProductData {
  slug: string;
  category: string;          // category slug (aligns with services.ts line slug)
  categoryName: string;      // display name
  href: string;              // canonical route
  displayName: string;
  isEntryPoint: boolean;
  entryPointNote: string;
  oneLiner: string;
  heroSubhead: string;
  problem: string;
  solution: string;
  steps: ProductStep[];
  includes: string[];
  notIncluded: string[];
  timeline: string;
  requirements: string[];
  tiers: ProductTier[];
  inPackages: string[];      // e.g. ["L1","L2","L3"]
  faqs: ProductFAQ[];
  ctaToPreScreen: string;
  leadExpert?: ExpertId;     // optional, for expert bio block
}

export const products: ProductData[] = [
  {
    "slug": "pre-screen",
    "displayName": "Pre-Screen (Bankability Assessment)",
    "isEntryPoint": true,
    "entryPointNote": "Pre-Screen is the mandatory first step before any WTP engagement. It runs the Banking-First GO/NO-GO check on your profile, so you commit to a company, visa, or account only once the hardest constraint — bankability — is confirmed. A meaningful share of cases are honestly declined here, by design, before anyone pays for registration.",
    "oneLiner": "Find out whether your profile is bankable — before you spend a month and real money finding out the hard way.",
    "heroSubhead": "A diagnostic that runs the hard checks first — KYC/AML, sanctions and source-of-funds, realistic bank fit, and tax exposure — and hands you a clear GO / NO-GO verdict with a documented roadmap. Banking-First, because a company without a working account is dead weight.",
    "problem": "Most providers start with company registration and only test bankability afterwards — and that order is backwards wherever you operate. A bank can decline your profile for reasons that have nothing to do with your company — citizenship, ownership structure, untraceable source of funds, sanctions or PEP exposure — and a meaningful share of applications are declined at the screening stage. Worse, every failed bank application is recorded and lowers your odds on the next attempt, so a rushed first try can quietly burn the access you were counting on. Without a pre-check, you can spend months assembling a structure that was never going to clear, then discover the blocker only at the bank counter.",
    "solution": "Pre-Screen is a structured Banking-First diagnostic done before any registration or application. You describe your situation and goals; we send a focused document checklist (KYC Light). Over 5-7 days we run the analysis offline — KYC/AML pre-screening, sanctions, PEP and source-of-funds review, a realistic read on which banks will actually open for your profile, and your current tax-residency and double-taxation exposure. You receive a Risk Map and a sequenced roadmap, walk through them in a 60-minute consultation, and get a plain verdict: GO, NO-GO, or GO-with-conditions. If the honest answer is \"don't proceed,\" that is the deliverable — there is no upsell attached to it. If there is no lawful route, we decline rather than improvise one.",
    "steps": [
      {
        "title": "Request and document checklist (Day 0)",
        "outcome": "You describe your situation, goals and target outcome. We send a focused KYC Light document list — passport, proof of address, a short activity summary, and source-of-funds evidence."
      },
      {
        "title": "Offline analysis, Banking-First (Days 2-7)",
        "outcome": "We run KYC/AML pre-screening, sanctions/PEP and source-of-funds review, match your profile against banks that realistically open accounts, and map your tax-residency and double-taxation exposure — no demand on your time during this stage."
      },
      {
        "title": "Risk Map and roadmap (built during analysis)",
        "outcome": "Findings are written up as a Risk Map plus a sequenced roadmap: what to do, in what order, which documents are needed, and where the real friction sits."
      },
      {
        "title": "Verdict consultation (Day 8)",
        "outcome": "A 60-minute session walks you through the results and delivers a clear verdict: GO, NO-GO, or GO with specific conditions to clear first."
      },
      {
        "title": "Your decision (your call)",
        "outcome": "You decide whether to proceed into a fuller package or stop. No pressure either way — Pre-Screen stands on its own as paid diagnostics."
      }
    ],
    "includes": [
      "KYC/AML pre-screening",
      "Sanctions, PEP and source-of-funds review",
      "Bankability assessment — which banks will realistically open for your profile",
      "Ownership structure analysis",
      "Tax analysis — current residency, double-taxation risk, transition strategy",
      "Risk Map (written document)",
      "Roadmap with sequenced recommendations",
      "60-minute results consultation with a GO / NO-GO / conditions verdict"
    ],
    "notIncluded": [
      "Any guarantee that a bank account will be opened",
      "Informal shortcuts or unofficial acceleration of any step",
      "Tax filing, reporting, or representation in tax disputes",
      "Help engineering a structure to bypass bank, AML, or sanctions requirements",
      "Execution of the registration, visa, or account opening itself (delivered under a separate package after a GO)"
    ],
    "timeline": "About 8 days end to end: document checklist on Day 0, roughly 5-7 days of offline analysis, and the verdict consultation around Day 8.",
    "requirements": [
      "A valid passport (all pages, including visas)",
      "Proof of residential address — utility bill or bank statement, typically within 3 months",
      "A short CV or description of your activity",
      "Documented source of funds — contracts, dividends, financial statements, or sale agreements",
      "Honest, full disclosure of citizenships (including any additional citizenships), past and current residencies, ownership structure, and any sanctions or PEP exposure"
    ],
    "tiers": [
      {
        "tier": "L0",
        "label": "Advisory — diagnostics and direction",
        "includes": "Pre-Screen lives here. L0 delivers the bankability and risk diagnosis, the Risk Map, the tax-residency read, and the GO / NO-GO decision — clarity on whether to proceed into Entry, Setup, or not at all. This is the entry point for new clients, partner referrals, and complex cases."
      },
      {
        "tier": "L1",
        "label": "Entry — legal and banking entry to the UAE",
        "includes": "Does not contain Pre-Screen as a deliverable; it acts on a GO verdict. Covers residency visa (where needed), a personal banking account, tax-residency strategy, and baseline payment support."
      },
      {
        "tier": "L2",
        "label": "Setup — launch business, assets and transactions",
        "includes": "Does not contain Pre-Screen. Company setup and licence, corporate bank account, VAT and corporate-tax registration, mortgage readiness and execution, conveyancing, and school-admission support."
      },
      {
        "tier": "L3",
        "label": "Control — long-term governance and protection",
        "includes": "Does not contain Pre-Screen. Ongoing accounting and tax reporting, employee visas and company support, payments support, UAE will, foundation/asset protection, custody structuring, and portfolio oversight."
      }
    ],
    "inPackages": [
      "L0"
    ],
    "faqs": [
      {
        "q": "What exactly do I get at the end?",
        "a": "A written Risk Map, a sequenced roadmap (what to do, in what order, which documents), and a 60-minute consultation that ends in a clear verdict: GO, NO-GO, or GO with specific conditions to resolve first."
      },
      {
        "q": "What happens if you tell me not to proceed?",
        "a": "Then that is the result you paid for, and it is a good outcome — you have avoided spending months and money on a structure that would not clear. There is no upsell attached. A meaningful share of cases are honestly declined at this stage; saying no when it is warranted is part of how we work."
      },
      {
        "q": "Why screen before opening an account instead of just applying?",
        "a": "Because every failed bank application is recorded and reduces your chances on the next attempt. A rushed first try can damage your odds for the whole market. Pre-Screen tells you where your profile stands before that first impression is spent."
      },
      {
        "q": "Do you work with clients who have sanctions or PEP exposure?",
        "a": "We assess the risk and look for a lawful route. We do not help bypass restrictions. If there is a compliant path, we will say so and define the conditions; if there is no lawful route, we decline rather than improvise one."
      },
      {
        "q": "How long does it take and how much of my time does it need?",
        "a": "About 8 days total. Your involvement is front-loaded into the Day 0 document checklist; the 5-7 days of analysis happen offline without demands on your time, and the process closes with the verdict consultation around Day 8."
      },
      {
        "q": "Is Pre-Screen mandatory before working with you?",
        "a": "Yes. It is the entry point for every engagement. We confirm the hardest constraint — bankability — before you commit to a company, visa, or account, so you are not building on an assumption."
      }
    ],
    "ctaToPreScreen": "Book your Pre-Screen. Get an honest GO / NO-GO read on your bankability — and a roadmap — before you commit to anything else.",
    "category": "diagnostics",
    "categoryName": "Start Here",
    "href": "/banking-first/pre-screen",
    "leadExpert": "olya"
  },
  {
    "slug": "xray",
    "displayName": "X-Ray — Structure & Portfolio Audit",
    "isEntryPoint": true,
    "entryPointNote": "X-Ray is the recommended first step for any capital owner entering the WTP pipeline. It produces the verdict and roadmap that decide whether and how to proceed to structuring, banking, or ongoing oversight — so the page should orient newcomers and route them to a pre-screen rather than sell a downstream service.",
    "oneLiner": "A full audit of your capital — assets, risks, structure, jurisdictions — consolidated into one map with a roadmap.",
    "heroSubhead": "Most capital owners hold assets across several countries and never see the whole picture in one place. X-Ray consolidates everything — real estate, business, instruments, crypto, liabilities, cashflow — into a single capital map, surfaces hidden losses and risks, and hands you a concrete 6-12 month roadmap. It is a systematic analysis, not a consultation.",
    "problem": "When your assets are spread across jurisdictions, you stop managing capital and start managing chaos. There is no unified picture, so you don't actually know your real net worth. Inefficiencies stay hidden: underperforming assets, tax gaps, currency and country imbalances, liquidity that isn't where you need it. And without consolidation, any strategic decision — where to grow, what to protect, how to restructure — is a guess.",
    "solution": "X-Ray gives you, for the first time, a view of your capital as a single system rather than a pile of separate assets. We run a deep audit across every asset class and your liabilities, cashflow and jurisdictions; detect the inefficiencies and risks hiding in the structure; and consolidate it all into one capital map — net worth, structure, cashflow, and a risk map in one place. On top of that map sits a strategy and a 6-12 month roadmap: goals, target structure, allocation, jurisdictions, protection, with concrete steps. Because it is run through the lens of banks and regulators, the verdict is honest — if part of the picture won't pass, we tell you directly.",
    "steps": [
      {
        "title": "Light X-Ray (free)",
        "outcome": "A 30-45 minute high-level diagnostic surfaces 3-5 key risks and quick wins, so you can see whether a full audit is worth it before committing."
      },
      {
        "title": "Document request & scope",
        "outcome": "You describe your situation and goals; we send a tailored document checklist covering assets, liabilities, structure and source of funds, and agree the depth of the audit."
      },
      {
        "title": "Full X-Ray — deep audit & consolidation",
        "outcome": "Over roughly 2-4 weeks we audit every asset class, liabilities, cashflow and jurisdictions, then consolidate them into a single capital map: net worth, structure, cashflow and a risk map."
      },
      {
        "title": "Strategy session",
        "outcome": "A 2-3 hour working session on family goals, risk profile and scenarios (growth / protection / exit) turns the map into a direction you actually want."
      },
      {
        "title": "Roadmap & decision",
        "outcome": "You receive a written 6-12 month roadmap with concrete steps and an honest verdict, then decide what to do next — with no pressure to proceed."
      }
    ],
    "includes": [
      "Deep audit across all asset classes — real estate, business, financial instruments, crypto",
      "Liabilities and cashflow analysis",
      "Risk map covering taxes, banks and structure",
      "Consolidation into a single unified capital map — net worth, structure, cashflow",
      "Asset allocation strategy",
      "Jurisdictional analysis",
      "6-12 month roadmap with concrete, prioritized steps",
      "Written PDF report and a strategy session covering growth / protection / exit scenarios"
    ],
    "notIncluded": [
      "Discretionary asset management or trading on your behalf",
      "Any guarantee of investment returns",
      "Aggressive or speculative strategies",
      "Execution of the roadmap itself — structuring, accounts, and ongoing oversight are separate engagements"
    ],
    "timeline": "Light X-Ray: 30-45 minutes. Full X-Ray: roughly 2-4 weeks for the deep audit and consolidation. Strategy session: 2-3 hours. Where a banking-lens pre-screen is run alongside, offline analysis typically takes 5-7 business days.",
    "requirements": [
      "Transparent disclosure of your assets, liabilities and ownership structure",
      "Documentable source of funds / source of wealth (banks and regulators require traceability, not verbal explanations)",
      "Timely responses during the document-collection stage",
      "Where external banks or asset managers are already involved, access to the relevant statements and details"
    ],
    "tiers": [
      {
        "tier": "L0",
        "label": "Advisory — diagnostics & direction",
        "includes": "This is X-Ray's home. The free Light X-Ray and the Full Structure & Portfolio Audit live here: deep audit, risk map, consolidated capital map, allocation strategy, jurisdictional analysis and a 6-12 month roadmap, ending in a clear verdict on whether and how to proceed."
      },
      {
        "tier": "L1",
        "label": "Entry — legal & banking access",
        "includes": "Not the focus of X-Ray. The audit's roadmap may point toward L1 steps (residency, personal banking, tax-residency strategy), but those are delivered as separate engagements."
      },
      {
        "tier": "L2",
        "label": "Setup — operate & scale",
        "includes": "Not included. X-Ray can scope and sequence company setup, corporate banking and real-estate moves, but executing them is a separate Setup engagement."
      },
      {
        "tier": "L3",
        "label": "Control — protection & governance",
        "includes": "Not included in the audit, but the natural downstream of it. The roadmap typically feeds L3 work — wealth oversight, foundation / asset protection, custody structuring — delivered as ongoing engagements."
      }
    ],
    "inPackages": [
      "L0"
    ],
    "faqs": [
      {
        "q": "Is this just a consultation?",
        "a": "No. A consultation is a conversation; X-Ray is a systematic analysis with a deliverable. You receive a consolidated capital map, a risk map across taxes, banks and structure, and a written 6-12 month roadmap with concrete steps."
      },
      {
        "q": "My assets are spread across several countries and a few asset classes. Can you actually consolidate that?",
        "a": "Yes — that is the core of the work. We audit real estate, business interests, financial instruments and crypto alongside liabilities and cashflow, across every jurisdiction, and bring them into one unified picture so you can see your real net worth and structure in a single place."
      },
      {
        "q": "Do I have to commit to the full audit upfront?",
        "a": "No. It starts with a free 30-45 minute Light X-Ray that surfaces 3-5 key risks and quick wins. Only if it's worth your while do you move to the Full X-Ray. Every step delivers value and every step is your choice."
      },
      {
        "q": "Will you manage or invest my money after the audit?",
        "a": "X-Ray itself does not include discretionary management, trading on your behalf, or any return guarantee. It gives you the map, the strategy and the roadmap; ongoing oversight and management are a separate engagement you can choose to take up afterward."
      },
      {
        "q": "What if part of my structure won't hold up to bank or regulator scrutiny?",
        "a": "We tell you directly. The audit is run through the lens of banks and regulators, so the verdict is honest — if something won't pass, you'll know before you act on it, not after. Across diagnostics of this kind, a meaningful share of cases come back as decline rather than proceed."
      }
    ],
    "ctaToPreScreen": "See your capital as one system before you make another move. Start with a free Light X-Ray pre-screen: in 30-45 minutes we map your 3-5 biggest risks and quick wins, then you decide whether the full audit is worth it. No commitment, no upselling — just an honest read on where you stand.",
    "category": "diagnostics",
    "categoryName": "Start Here",
    "href": "/services/diagnostics/xray",
    "leadExpert": "olya"
  },
  {
    "slug": "open-bank-account",
    "displayName": "Open a UAE Bank Account",
    "isEntryPoint": true,
    "entryPointNote": "A bank account is the entry milestone of the Banking-First sequence and the most common reason private clients first engage WTP. It is the natural landing point for the \"Check Bankability\" CTA, which routes into the Pre-Screen. Anyone weighing UAE banking access tends to start here, then expand into company, residency, and structures.",
    "oneLiner": "A working bank account that clears compliance on the first attempt — personal or corporate, even for the complex profiles other providers decline.",
    "heroSubhead": "Banking access for complex private-wealth profiles — personal and corporate. We match you to the bank that will actually open, prepare the Source of Funds package to its exact standard, and stay on it through to a working account, including profiles other providers turn away. The problem we solve is access; the UAE is simply where we open most.",
    "problem": "Since 2022, UAE banks have sharply tightened onboarding. Applicants with complex profiles — a Russian or CIS passport, crypto-derived income, multiple jurisdictions, an unconventional business model — receive rejections with no explanation, accounts frozen after opening, and Source of Funds requests months later. Applying \"and hoping it works\" is a strategic mistake: every declined application is recorded in the Al Etihad Credit Bureau and lowers the odds of the next one. Source of Funds is the single largest cause of rejection. Banks in the UAE do not accept verbal explanations — they expect documented, traceable funds, and each bank weighs profiles differently. Filing the same template everywhere is how applicants burn their best banks before they understand the rules.",
    "solution": "WTP treats the account as a targeting problem, not a paperwork problem. We start by analysing your profile — citizenship, residency, income, business model, expected turnover — then match you to the specific bank that realistically opens for that profile, rather than filing everywhere at once. The core of the work is the Source of Funds package: structure, wording, and supporting documents prepared to that bank's exact requirements, since SOF drives most rejections. We manage the process end to end — application filing and tracking, booking and supporting the in-bank visit, and answering compliance follow-ups. If the bank requests more, we refine the package and resubmit rather than abandon the case. We work with High Risk profiles others turn away — and where there is no lawful route, we say so up front instead of wasting a credit-bureau record.",
    "steps": [
      {
        "title": "Profiling (Day 1)",
        "outcome": "We analyse citizenship, residency, income, business model, and expected turnover to understand exactly how a bank will read your profile."
      },
      {
        "title": "Strategy (3-5 days)",
        "outcome": "We select the target bank, prepare the Source of Funds package to that bank's requirements, and draft the business cycle description — your bankability roadmap before a single application is filed."
      },
      {
        "title": "Filing & in-bank visit (1-2 days)",
        "outcome": "Documents are submitted, the bank appointment is booked, and we support you through the in-bank meeting and any interview."
      },
      {
        "title": "Activation (1-3 weeks)",
        "outcome": "Credentials are issued, online banking is set up, and a test transaction confirms the account is live and operational."
      },
      {
        "title": "Ongoing support if compliance asks",
        "outcome": "If the bank requests additional documents or raises clarifications, we refine the package and resubmit — and handle unblocking if an issue arises after opening."
      }
    ],
    "includes": [
      "Banking profile analysis (citizenship, residency, income, turnover)",
      "Bank matched to your profile — targeted, not \"let's try everywhere\"",
      "Source of Funds documentation prepared per specific bank",
      "Business cycle description",
      "Application filing and tracking",
      "In-bank visit booking and support",
      "Unblocking if issues arise during or after opening",
      "Premium / Private banking setup (optional add-on)"
    ],
    "notIncluded": [
      "Guarantee that the account will be opened — the bank's credit decision is its own",
      "Management of your funds once the account is live",
      "Tax planning beyond high-level analysis",
      "Any informal acceleration or workarounds of bank requirements",
      "Masking or misrepresenting the real nature of activity or source of funds"
    ],
    "timeline": "Roughly 2-5 weeks end to end for a typical profile: Day 1 profiling, 3-5 days strategy and SOF package, 1-2 days filing and in-bank visit, then 1-3 weeks to activation. Complex profiles requiring additional compliance rounds can run longer.",
    "requirements": [
      "Full document package provided by the client (passport with all visa pages, proof of address dated within ~3 months, CV or activity summary, source-of-funds evidence such as contracts, dividends, reports, or sale agreements)",
      "Timely responses to bank and compliance requests",
      "Documented, traceable source of funds — banks expect a traceable history, not verbal explanation",
      "No hidden risks that cannot pass compliance (e.g. direct sanctions matches); where no lawful route exists, we decline rather than attempt a workaround",
      "In-person attendance for the bank visit where the bank requires it"
    ],
    "tiers": [
      {
        "tier": "L0",
        "label": "Advisory",
        "includes": "Bankability assessment as part of the diagnostic stage — a high-level read on whether and where your profile can realistically open an account, plus the roadmap and a clear go / no-go before any application is filed."
      },
      {
        "tier": "L1",
        "label": "Entry",
        "includes": "Core personal account opening: profile analysis, bank matching, the Source of Funds package, filing, in-bank visit support, and activation of a working personal account with online banking. The primary banking entry point."
      },
      {
        "tier": "L2",
        "label": "Setup",
        "includes": "Corporate account opening alongside company formation — bank matched to the business model, full KYC / UBO and source-of-business package, account type selection (operational / holding), and support through to a working corporate account."
      },
      {
        "tier": "L3",
        "label": "Control",
        "includes": "Premium / Private banking and ongoing banking support for mature structures — relationship-managed accounts, higher service levels, and continued coordination with payments, compliance, and wealth oversight."
      }
    ],
    "inPackages": [
      "L1",
      "L2",
      "L3"
    ],
    "faqs": [
      {
        "q": "Can you open an account for a Russian or CIS passport holder?",
        "a": "Yes. High Risk profiles — including a Russian passport with UAE residence permit, crypto-derived income, or multiple jurisdictions — are a core part of what we do. The approach is the same: we match you to a bank that works with your profile and build a Source of Funds package to its requirements. The one firm condition is a lawful route and a traceable source of funds; where there is no lawful path, we tell you up front rather than file and damage your record."
      },
      {
        "q": "Why not just apply to several banks myself and see what happens?",
        "a": "Because each rejection is recorded in the Al Etihad Credit Bureau and lowers the odds of the next application. Banks weigh profiles differently, and Source of Funds is the leading reason accounts are declined. Filing the same template everywhere tends to burn your strongest banks first. We file once, at the right bank, with a package built for it."
      },
      {
        "q": "What is a Source of Funds package and why does it matter so much?",
        "a": "Source of Funds is documented, traceable evidence of where your money comes from — and it is the single largest cause of UAE rejections. Banks do not accept verbal explanations; they expect a traceable history. We prepare the structure, wording, and supporting documents to the specific bank's standard, which is the part most self-filed applications get wrong."
      },
      {
        "q": "Do I have to fly to the UAE to open the account?",
        "a": "In most cases yes — the bank typically requires an in-person visit, and we book the appointment and support you through the meeting and any interview. We plan the visit so the required in-person steps are completed efficiently in a single trip, then continue the process after you leave."
      },
      {
        "q": "Can you open a corporate account, not just a personal one?",
        "a": "Yes. We open personal, corporate, and premium / private accounts. Corporate account opening is usually handled alongside company formation, with the bank matched to your business model and a full KYC / UBO and source-of-business package prepared. Personal account opening can be done on its own."
      },
      {
        "q": "Do you guarantee the account will be opened?",
        "a": "No one can honestly guarantee a bank's decision, and we don't. What we do is sharply improve the odds by targeting the right bank and preparing a compliant package — and by screening upfront, so we only take cases with a realistic, lawful route to an open account."
      }
    ],
    "ctaToPreScreen": "Check Bankability — start with a Pre-Screen. Before any application is filed, we assess your profile and source of funds and tell you which banks realistically work for you, so no credit-bureau record is spent on a guess.",
    "category": "banking",
    "categoryName": "Banking & Capital",
    "href": "/services/banking/open-bank-account",
    "leadExpert": "olya"
  },
  {
    "slug": "escrow",
    "displayName": "Escrow & Deal Registration",
    "isEntryPoint": false,
    "entryPointNote": "",
    "oneLiner": "Buy or sell UAE property safely without a local bank account — funds released only after registration.",
    "heroSubhead": "An escrow account, full property and seller due diligence, and legal closing through to Title Deed — for buyers and sellers transacting in the UAE without a local account. Money moves to the seller only after ownership is registered at the Dubai Land Department.",
    "problem": "Most non-residents buying UAE property do not yet have a local bank account — and a direct transfer to the seller before registration is a real risk: if the deal collapses, recovering the funds is extremely difficult. There is also no safe way to verify what you are buying. Without due diligence, you can acquire a property carrying encumbrances, outstanding debts, or active disputes. The two problems compound: large sums move on trust, against an asset you have not independently checked.",
    "solution": "Escrow removes the trust gap. Your funds are held in a protected escrow account and released to the seller only after the Title Deed is registered at the Dubai Land Department — so payment and ownership change hands together. Before any money moves, we run due diligence on the property, the seller, and the developer (encumbrances, debts, disputes, DLD status). Then one manager carries the full legal cycle — SPA, developer NOC, DLD documents, transfer, and Title Deed — through to completion. No UAE bank account is required: escrow is the alternative route built for non-residents.",
    "steps": [
      {
        "title": "Verification (due diligence)",
        "outcome": "Property, seller, and developer checked — encumbrances, debts, disputes, and DLD status confirmed before any funds move. Typically 3-5 days."
      },
      {
        "title": "Escrow account & funding",
        "outcome": "Escrow account opened and buyer funds transferred into the protected account — no local bank account needed. Typically 1-2 days."
      },
      {
        "title": "Documentation",
        "outcome": "SPA (Sale & Purchase Agreement) prepared, developer NOC obtained, and DLD documents assembled. Typically 1-2 weeks."
      },
      {
        "title": "Registration & release",
        "outcome": "Ownership transferred and Title Deed issued at the DLD; only then are funds released to the seller. Typically 1-3 days."
      }
    ],
    "includes": [
      "Property and seller due diligence (encumbrances, debts, disputes, developer status)",
      "Escrow account opening and fund holding",
      "SPA (Sale & Purchase Agreement) preparation",
      "Developer NOC (No Objection Certificate)",
      "DLD (Dubai Land Department) registration support",
      "Title Deed registration",
      "Escrow fund transfer to seller on completion",
      "Coordination of all parties (agents, lawyers, developer)"
    ],
    "notIncluded": [
      "Brokerage / agency representation by default",
      "Guaranteed property yield or returns",
      "Property management after the deal",
      "Construction or technical inspection of the property"
    ],
    "timeline": "Roughly 3-5 weeks end to end for a standard transaction: verification 3-5 days, escrow setup 1-2 days, documentation 1-2 weeks, registration and fund release 1-3 days. Timelines depend on the developer, the deal type, and how promptly parties supply documents.",
    "requirements": [
      "Passport and standard KYC for the buyer (and seller, where applicable)",
      "Documented, traceable source of funds for the purchase amount",
      "Property details and seller / developer information for due diligence",
      "Timely responses and document submission to keep the transaction on schedule",
      "A clean compliance profile — no sanctions exposure or unverifiable source of funds"
    ],
    "tiers": [
      {
        "tier": "L0",
        "label": "Advisory",
        "includes": "Real-estate and legal advisory before committing: is the deal realistic, and are there future risks with the bank, visa, or registration? A roadmap and a go / no-go decision — escrow execution is not included at this level."
      },
      {
        "tier": "L1",
        "label": "Entry",
        "includes": "Focused on legal presence and personal bankability (residency, personal account, tax-residency analysis). Escrow & Deal Registration is not part of Entry."
      },
      {
        "tier": "L2",
        "label": "Setup",
        "includes": "Where Escrow & Deal Registration lives — alongside the rest of the real-estate execution track (mortgage readiness and conveyancing). The full transaction: due diligence, escrow, SPA, NOC, DLD, Title Deed."
      },
      {
        "tier": "L3",
        "label": "Control",
        "includes": "Long-term control and protection — ongoing operations, asset protection, and wealth oversight. A completed escrow purchase can feed into ownership structuring (will, foundation) handled at this level."
      }
    ],
    "inPackages": [
      "L2"
    ],
    "faqs": [
      {
        "q": "Can I buy UAE property without a local bank account?",
        "a": "Yes. Buying without a local account is standard for non-residents, and escrow is the route built for it: your funds sit in a protected escrow account and the purchase, payment, and registration all complete without you opening a UAE account first."
      },
      {
        "q": "When exactly does the seller get paid?",
        "a": "Only after the Title Deed is registered in your name at the Dubai Land Department. Funds are held in escrow until ownership has legally transferred, so payment and registration happen together rather than on trust."
      },
      {
        "q": "What does due diligence actually check?",
        "a": "The property, the seller, and the developer — including encumbrances, outstanding debts, active disputes, and DLD status. The aim is to surface anything that would make the property risky to own before any money moves."
      },
      {
        "q": "What happens if the deal falls through?",
        "a": "Because the funds are held in escrow and released only on registration, you are not in the position of chasing a seller for a refund after a direct transfer. The escrow structure is specifically there to protect the buyer if a transaction does not complete."
      },
      {
        "q": "Who manages the process — do I coordinate the lawyers and developer myself?",
        "a": "One manager runs the full cycle: verification, escrow, SPA, NOC, DLD, and Title Deed, coordinating agents, lawyers, and the developer. You have a single point of contact from the first check through to registration."
      },
      {
        "q": "Does escrow work for sellers too, not just buyers?",
        "a": "Yes. The service covers both sides of a UAE property transaction — escrow and legal registration give the seller certainty that funds are secured and the transfer is handled correctly through the DLD."
      }
    ],
    "ctaToPreScreen": "Have a specific deal in mind? Start with a short pre-screen: send us the property and your details, and we will run a banking and compliance check, confirm the deal is workable, and map the escrow and registration path before anything moves. Discuss your deal.",
    "category": "banking",
    "categoryName": "Banking & Capital",
    "href": "/services/banking/escrow",
    "leadExpert": "kostya"
  },
  {
    "slug": "factoring",
    "displayName": "Commission Factoring",
    "isEntryPoint": false,
    "entryPointNote": "",
    "oneLiner": "Turn confirmed real estate commission into cash now — up to 80% advanced in 3-5 business days, no loan, no collateral.",
    "heroSubhead": "Broker commission advances for UAE real estate deals. We purchase the receivable and pay you up to 80% within days of deal confirmation — then collect from the developer ourselves. Not a loan, no collateral, no impact on your credit history.",
    "problem": "You closed the deal, but the money is 30-90 days away — sometimes longer. Developer settlement timelines, not your performance, dictate when commission lands, while rent, marketing, and team payroll run on their own schedule. The cash gap isn't a sign of a weak business; it's the structure of the UAE market. Conventional financing makes it worse: bank approvals take months and put your personal credit history on the line.",
    "solution": "Factoring converts future commission into money today. Instead of lending against you, we purchase the receivable from a confirmed deal and advance up to 80% of the commission within 3-5 business days. We then collect directly from the developer when settlement clears, and release the balance to you minus our fee. Because it's a purchase of a receivable rather than a loan, there's no collateral and no effect on your credit history. We assess the developer as well as the deal — drawing on settlement-timeline knowledge across major UAE developers — so the decision is fast and the risk is priced realistically.",
    "steps": [
      {
        "title": "Close your deal",
        "outcome": "You complete a transaction and receive confirmation from the developer or seller."
      },
      {
        "title": "Submit the application",
        "outcome": "You send us the deal confirmation and the commission agreement — minimal paperwork, no credit file required."
      },
      {
        "title": "Deal and developer assessment",
        "outcome": "We verify the transaction and the paying developer. Decision typically within 1-2 business days."
      },
      {
        "title": "Advance paid out",
        "outcome": "Up to 80% of the commission lands in your account within 3-5 business days of confirmation."
      },
      {
        "title": "Balance on settlement",
        "outcome": "Once the developer settles, we collect directly and release the remaining balance to you, minus our fee."
      }
    ],
    "includes": [
      "Deal and counterparty (developer) assessment",
      "Up to 80% commission advance within 3-5 business days",
      "Legal documentation for the receivable purchase",
      "Direct collection from the developer on settlement",
      "Per-deal reporting",
      "Dedicated personal manager",
      "No collateral or personal guarantees required",
      "No impact on your credit history"
    ],
    "notIncluded": [
      "Not a loan or line of credit — we purchase the receivable, we do not lend",
      "No guarantee of advance on deals that fail assessment",
      "No advance against unconfirmed deals or deals without a commission agreement",
      "No collection or recovery service sold separately from a factored deal",
      "No tax, accounting, or wider financial planning"
    ],
    "timeline": "Decision typically within 1-2 business days of application; advance paid within 3-5 business days of deal confirmation. The remaining balance is released after the developer settles, which is generally 30-90 days depending on the developer.",
    "requirements": [
      "A closed deal with confirmation from the developer or seller",
      "A signed commission agreement for the transaction",
      "A payable counterparty (developer) that passes assessment",
      "Accurate deal documentation provided promptly"
    ],
    "tiers": [
      {
        "tier": "L0",
        "label": "Advisory / Diagnostic",
        "includes": "Not applicable as a standalone package tier. As a first touch, a broker can have a single deal and counterparty reviewed to confirm whether the commission qualifies for an advance — a fast GO / NO-GO read before any commitment."
      },
      {
        "tier": "L1",
        "label": "Single-deal advance",
        "includes": "Factoring on one confirmed deal: deal and developer assessment, up to 80% advance within 3-5 business days, legal documentation, direct developer collection, per-deal reporting, and a personal manager."
      },
      {
        "tier": "L2",
        "label": "Ongoing broker facility",
        "includes": "Repeat factoring across multiple deals as you close them — same per-deal mechanics with a standing relationship, faster repeat assessment, and no ceiling on the number of advances. A cashflow partner rather than a one-time advance."
      },
      {
        "tier": "L3",
        "label": "Agency / desk-level facility",
        "includes": "Portfolio-level factoring for a brokerage or sales desk: multiple agents and deals under one facility, consolidated reporting, and coordinated developer collection across the book."
      }
    ],
    "inPackages": [
      "L2"
    ],
    "faqs": [
      {
        "q": "Is this a loan? Will it affect my credit history?",
        "a": "No. We purchase the receivable from your confirmed deal rather than lending to you. There is no collateral, no personal guarantee, and no impact on your credit history — the assessment is of the deal and the paying developer, not of you."
      },
      {
        "q": "How much do I receive, and when?",
        "a": "Up to 80% of the commission, typically within 3-5 business days of deal confirmation. The decision itself is usually made within 1-2 business days of your application. The remaining balance is released once the developer settles, minus our fee."
      },
      {
        "q": "What happens to the rest of my commission?",
        "a": "The balance above the advance is paid to you after the developer settles and we have collected. We handle that collection directly, so you are not chasing the developer or waiting on the settlement process yourself."
      },
      {
        "q": "Which deals and developers qualify?",
        "a": "Confirmed deals with a signed commission agreement and a payable developer that passes our assessment. We assess the developer as well as the deal because settlement reliability and timeline vary across UAE developers — that assessment is what lets us decide quickly and advance with confidence."
      },
      {
        "q": "What does it cost?",
        "a": "Pricing is set per deal and depends on the commission, the developer, and the expected settlement timeline. We confirm the exact terms during the pre-screen, before you commit to anything."
      },
      {
        "q": "How is this different from a bank facility?",
        "a": "Speed and structure. There's no months-long bank approval and no collateral — decision in 1-2 days, money in 3-5. And because more deals simply mean more advances with no ceiling, it scales with your business rather than capping it."
      }
    ],
    "ctaToPreScreen": "Have a confirmed deal waiting on developer settlement? Start with a short pre-screen: send us the deal confirmation and commission agreement, and we'll assess the deal and developer and confirm your advance terms — typically a decision within 1-2 business days. Get your advance.",
    "category": "banking",
    "categoryName": "Banking & Capital",
    "href": "/services/banking/factoring",
    "leadExpert": "olya"
  },
  {
    "slug": "open-company",
    "displayName": "Open a UAE Company",
    "isEntryPoint": false,
    "entryPointNote": "",
    "oneLiner": "A UAE company built to pass the bank — zone, license and structure matched to your model before you register.",
    "heroSubhead": "Most agents register a company, then the client can't open an account. We work the other way: we verify the bank will accept your structure first, then register. Zone, license type and activity codes are all set by banking requirements — so you get a working business, not a license on the wall.",
    "problem": "A UAE company is easy to register and useless without a bank account behind it. The common path is to pay an agent, receive a license, and only then discover the bank declines the structure — the activity codes, zone or ownership don't fit compliance. Every failed bank application is on record; after two to three rejections the odds of opening an account drop sharply. The result is a company that can hold a license on the wall but cannot operate, invoice or move money.",
    "solution": "We reverse the order. Before any paperwork, a Pre-screen tests whether a bank will accept your business model, ownership and source of funds. Only on a clear scenario do we design the structure — zone (mainland or freezone), license type and activity codes chosen for what the bank approves, not for zone marketing. Then we register the company, secure the lease and establishment card, and run the bank application as one project under one manager and one timeline. You end with a company that is bankable, not one you hope will pass.",
    "steps": [
      {
        "title": "Pre-screen",
        "outcome": "Your business model, KYC profile and source of funds are tested against banking and compliance requirements — a clear GO / NO-GO before any money is spent on registration. Typically 5-7 days."
      },
      {
        "title": "Architecture",
        "outcome": "Zone (mainland or freezone), license type, activity codes and ownership structure are designed around what the bank will accept — not generic zone marketing. Typically around week 2."
      },
      {
        "title": "Registration",
        "outcome": "Company registered, trade license issued, lease/office secured and establishment card obtained — the full document set a bank needs. Typically 2-4 weeks."
      },
      {
        "title": "Bank",
        "outcome": "Corporate account application filed with the matched bank, compliance questions handled, account opened. Typically 1-3 weeks once registration is complete."
      }
    ],
    "includes": [
      "Pre-screen and banking strategy",
      "Jurisdiction and license-type selection (mainland or freezone)",
      "Company registration",
      "Trade License",
      "Lease / virtual office",
      "Establishment Card",
      "Corporate bank account application",
      "ESR compliance setup (if applicable)"
    ],
    "notIncluded": [
      "Opening of the corporate bank account is supported and applied for, but approval is the bank's decision — no guarantee of opening",
      "Accounting and ongoing financial reporting (separate ongoing service)",
      "VAT and Corporate Tax registration (separate product)",
      "Real presence / economic substance build-out",
      "Day-to-day operational management of the business"
    ],
    "timeline": "End to end, roughly 4-8 weeks from Pre-screen to an opened corporate account: Pre-screen 5-7 days, architecture around week 2, registration 2-4 weeks, bank application 1-3 weeks. Timelines depend on the chosen jurisdiction, the bank, and how quickly documents are provided.",
    "requirements": [
      "A clear, accurate description of the intended business activity",
      "A transparent ownership structure (UBOs disclosed)",
      "Documented, traceable source of funds",
      "Documents provided by the client on time",
      "No conflicting sanctions or compliance exposure (assessed at Pre-screen)"
    ],
    "tiers": [
      {
        "tier": "L0",
        "label": "Advisory",
        "includes": "Diagnostic and direction only — clarity on whether a UAE company makes sense for your goals, the right jurisdiction direction, and the risks before you commit. Company registration itself is not part of this level."
      },
      {
        "tier": "L1",
        "label": "Entry",
        "includes": "Legal and banking entry for an individual (residency, personal account, tax-residency analysis). Company formation is not included at this level — it begins at Setup."
      },
      {
        "tier": "L2",
        "label": "Setup",
        "includes": "Where this product lives. Company Setup & License plus the corporate bank account and VAT / Corporate Tax registration — the bankable structure that lets you operate, alongside real-estate and family services."
      },
      {
        "tier": "L3",
        "label": "Control",
        "includes": "Everything in Setup carried forward, plus ongoing operations — accounting and tax reporting, employee visas and company support, asset protection and wealth oversight for long-term stability."
      }
    ],
    "inPackages": [
      "L2",
      "L3"
    ],
    "faqs": [
      {
        "q": "Why do you check the bank before registering the company?",
        "a": "Because the bank is the hard part, not the license. The zone, license type and activity codes all affect whether a bank will open an account. If we register first and the structure doesn't fit, the application is declined — and every rejection is recorded, which lowers the odds on the next attempt. Pre-screening first means you only register a structure a bank has indicated it will accept."
      },
      {
        "q": "Mainland or freezone — which do I need?",
        "a": "It depends on your business model, where your clients are, and what your target bank approves. We choose the jurisdiction from those requirements rather than from zone marketing. Some models are stronger in a freezone; others need mainland to satisfy the bank or the activity. That decision is made in the Architecture step, after the Pre-screen."
      },
      {
        "q": "Is the bank account guaranteed?",
        "a": "No honest provider can guarantee an account — approval is the bank's decision under its own compliance rules. What we do is verify acceptability before you register and prepare a clean, matched application, which is why this approach is designed so you end up with both a company and a working account rather than a license on the wall."
      },
      {
        "q": "What's not included in this product?",
        "a": "This covers formation through to the corporate account application: registration, trade license, lease, establishment card and the bank application. It does not include ongoing accounting and reporting, VAT and Corporate Tax registration, or economic-substance build-out — those are separate services and are bundled into the higher Control package if you want everything managed under one roof."
      },
      {
        "q": "Do I have to fly to the UAE?",
        "a": "Plan for a short visit. Parts of company formation and the bank's onboarding (and any linked visa biometrics) require you to be physically present in the UAE. We compress the in-country steps into a single trip and run the rest asynchronously, so you don't wait on site for the final documents."
      }
    ],
    "ctaToPreScreen": "Start with a Pre-screen. Before any registration, we'll test whether a bank will accept your structure and map the zone, license and account that fit your model — so you never pay to register a company that can't operate. Book your Pre-screen to get a clear GO / NO-GO and your banking-first roadmap.",
    "category": "business-setup",
    "categoryName": "Business Setup",
    "href": "/services/business-setup/open-company",
    "leadExpert": "olya"
  },
  {
    "slug": "golden-visa",
    "displayName": "UAE Golden Visa & Residency",
    "isEntryPoint": true,
    "entryPointNote": "Residency is the legal foundation many private clients need before a bank account, company, or asset structure can proceed, so this page is a common first touch. It sits in the L1 (Entry) package and routes into the pre-screen, where the Banking-First sequence is set. It is an entry point to the engagement, not a standalone transaction — the visa is assessed alongside banking and tax, not sold in isolation.",
    "oneLiner": "10-year UAE residency without a sponsor — the right visa route, handled through to Emirates ID.",
    "heroSubhead": "Investor, business-owner, and specialist routes for private clients who need UAE residency optionality. We select the route that fits your banking and tax profile, prepare the full document package, and guide you on the ground through to Emirates ID — with family visas processed in parallel.",
    "problem": "A standard UAE visa is tied to an employer: change jobs or close the company and the status can fall away. Choose the wrong route and the process drags for months or ends in a rejection. And immigration status is not isolated — it governs whether you can open a bank account, claim tax residency, and enrol children in school. Most treat the visa as a standalone stamp and only discover downstream that the route they picked complicates the bank or the tax position they actually need.",
    "solution": "We treat the Golden Visa as a foundation, not a stamp. Before filing, we assess which route fits your wider goals — banking, tax residency, family — because the visa type affects bank choice and tax-residency eligibility. We then prepare the full document package (legalization, translation, notarization, attestation), coordinate the medical and biometrics that legally require your physical presence, and manage filing through to Emirates ID. Family visas run in parallel rather than after the main visa, so a single trip covers the household. One manager owns the whole process, and the visa is set in the same plan as the bank account and tax position rather than in isolation.",
    "steps": [
      {
        "title": "Assessment & route selection",
        "outcome": "The optimal visa type for your profile is confirmed — investor, business owner, or specialist — chosen against your banking, tax, and family goals rather than in isolation."
      },
      {
        "title": "Document preparation",
        "outcome": "The full package is assembled and verified: legalization, translation, notarization, and attestation, including birth and marriage certificates where family visas apply."
      },
      {
        "title": "Travel & appointment planning",
        "outcome": "Medical and biometrics slots are booked around a single trip, so you know when to fly and what to bring before you leave."
      },
      {
        "title": "Filing & on-the-ground support",
        "outcome": "The application is submitted and you are accompanied through the in-person steps during your UAE visit — typically completed within a few days on the ground."
      },
      {
        "title": "Issuance",
        "outcome": "Visa and Emirates ID are issued, with family visas finalized in parallel. The residency foundation is in place for banking and tax steps to proceed."
      }
    ],
    "includes": [
      "Visa route selection — investor, business owner, or specialist — matched to your profile",
      "Full document preparation and verification: legalization, translation, notarization, attestation",
      "Medical: booking and on-the-ground support",
      "Biometrics and Emirates ID issuance with full on-site accompaniment",
      "Application filing and status tracking",
      "Family visas (optional): spouse and children, processed in parallel",
      "Tax residency strategy (optional): analysis and roadmap toward a Tax Residency Certificate",
      "A single point of contact coordinating the entire process"
    ],
    "notIncluded": [
      "Banking and tax outcomes themselves — the visa establishes the legal basis for them but does not guarantee an account or a tax position",
      "Any unofficial expediting or shortcuts around official procedures",
      "Remote issuance of Emirates ID — medical and biometrics require your physical presence in the UAE",
      "Guaranteed approval — eligibility and required presence rules still apply"
    ],
    "timeline": "Assessment on day 1; document preparation and scheduling typically 1-2 weeks; filing and the in-person steps usually 1-5 days during your UAE visit. The Golden Visa itself is generally issued within about 5 working days once filed; family visas run in parallel. Where a Tax Residency Certificate is in scope, foreign-use certification generally requires 183 days of presence in the UAE in the relevant period, while domestic use generally requires around 90 days.",
    "requirements": [
      "Valid passport, generally with 6+ months remaining",
      "A UAE entry status — entry permit or change of status",
      "Physical presence in the UAE for the medical fitness test and biometrics (these cannot be completed remotely)",
      "For the optional tax-residency track: documented presence in the UAE plus supporting evidence such as a recent bank statement, proof of residence, and a work certificate or business ownership"
    ],
    "tiers": [
      {
        "tier": "L0",
        "label": "Advisory",
        "includes": "Diagnostic and strategic direction. Where residency is uncertain, we assess whether your goal is realistic and which route avoids downstream problems with banking, tax, or family — before any filing begins. Output is a clear roadmap and a go / no-go decision."
      },
      {
        "tier": "L1",
        "label": "Entry",
        "includes": "The core of this product: UAE Residency / Golden Visa where needed, alongside a personal bank account and a tax-residency analysis. This is legal and bankable entry to the UAE — residency status plus the foundation it unlocks."
      },
      {
        "tier": "L2",
        "label": "Setup",
        "includes": "Builds on the residency foundation: company setup and licensing, corporate banking, VAT and Corporate Tax registration, and family steps such as school admission. For clients who also need to operate or invest."
      },
      {
        "tier": "L3",
        "label": "Control",
        "includes": "Ongoing operations and protection on top of an established status: accounting and tax reporting, employee and company visa support, wills, asset-protection structures, and portfolio oversight. For mature setups and family offices."
      }
    ],
    "inPackages": [
      "L1",
      "L2",
      "L3"
    ],
    "faqs": [
      {
        "q": "Do I have to use the UAE in person, or can this be done remotely?",
        "a": "You need to be in the UAE in person for the medical fitness test and biometrics — these cannot be completed remotely. We plan the documents and appointments in advance so the in-person steps are typically closed in a single short trip."
      },
      {
        "q": "How does the Golden Visa connect to opening a bank account and my tax position?",
        "a": "Directly. Your visa type affects which banks are realistic and whether you can claim UAE tax residency, which is why we assess the route against your banking and tax goals before filing rather than treating the visa as a standalone stamp. The residency this product establishes is the legal basis for the account and the tax position — but the account and tax outcomes are separate steps with their own requirements."
      },
      {
        "q": "Can my spouse and children get visas at the same time?",
        "a": "Yes. Family visas are processed in parallel with the main visa rather than after it, and we prepare the supporting documents — including birth and marriage certificate legalization — in advance, so a single trip can cover the household."
      },
      {
        "q": "What gives me a Tax Residency Certificate, and how many days do I need in the UAE?",
        "a": "A Tax Residency Certificate is an optional track on top of residency. For a certificate intended for use abroad, you generally need 183 days of presence in the UAE in the relevant period; for domestic use, around 90 days is generally sufficient. We map the route to the certificate, or give you a reasoned 'not applicable' if your day-count or structure does not support it."
      },
      {
        "q": "Can you guarantee approval or speed things up unofficially?",
        "a": "No, and we are explicit about this. We do not use unofficial expediting or shortcuts, and no provider can guarantee an immigration approval. What we do is choose the route that fits your profile and prepare the case correctly, which is what avoids the delays and rejections that come from filing on the wrong route."
      }
    ],
    "ctaToPreScreen": "Start with a pre-screen. We assess your profile and goals, confirm the right visa route, and set the Banking-First sequence before any documents are filed — so you know your path, timeline, and what to bring before you fly. Request your pre-screen to find your route.",
    "category": "residency-visa",
    "categoryName": "Residency & Mobility",
    "href": "/services/residency-visa/golden-visa",
    "leadExpert": "olya"
  },
  {
    "slug": "foundation",
    "displayName": "Foundation (Asset Protection)",
    "isEntryPoint": false,
    "entryPointNote": "",
    "oneLiner": "A UAE foundation that protects your assets and fixes succession — without giving up control.",
    "heroSubhead": "A legal structure for asset protection, controlled succession, and confidential ownership. Unlike a trust, you stay in control of the structure and can change its rules. Registered in DIFC, ADGM, or RAK ICC — with bank accounts set up in parallel, so the structure is operational, not just registered.",
    "problem": "Holding wealth in your own name leaves it exposed. A lawsuit, a creditor, or a divorce can freeze or reach assets that are tied directly to you. Succession is a second, separate risk: in the UAE, assets held personally can fall under Sharia inheritance rules that override your own wishes — settled through court, on a timeline you don't control. Many owners reach for a trust and then run into a different problem: they give up direct control of what they built, and they discover that a structure on paper means little if no bank will open an account for it.",
    "solution": "A UAE foundation is a separate legal entity that holds your assets on behalf of named beneficiaries. Because the assets belong to the foundation rather than to you personally, they are insulated from personal claims, lawsuits, and creditors. Succession runs automatically according to the foundation's own rules — no court, no Sharia, no delay. Ownership is not publicly disclosed, so the structure stays confidential. The decisive difference from a trust: as founder you retain control — you direct the foundation and can change its beneficiaries and rules over time. We design the structure around your actual goals, register it in the jurisdiction that fits (DIFC, ADGM, or RAK ICC), and — applying our Banking-First approach — open the accounts in parallel so the foundation is operational from day one, not a certificate in a drawer.",
    "steps": [
      {
        "title": "Analysis",
        "outcome": "We assess your assets and goals and compare foundation vs. trust vs. direct ownership, so the chosen route is the right one before any paperwork starts. (Week 1)"
      },
      {
        "title": "Architecture",
        "outcome": "We design the structure — founder, beneficiaries, governance rules, and succession plan — and appoint the council. Your intentions are locked into the structure. (Week 2)"
      },
      {
        "title": "Registration",
        "outcome": "We prepare the charter and constitutional documents and register the foundation in DIFC, ADGM, or RAK ICC. You hold a legally established structure. (typically 2-4 weeks)"
      },
      {
        "title": "Integration",
        "outcome": "We transfer assets into the foundation and set up bank accounts, custody, and reporting in parallel — so the structure is funded and operational, not just registered."
      }
    ],
    "includes": [
      "Foundation applicability analysis (foundation vs. trust vs. direct ownership)",
      "Jurisdiction selection across DIFC, ADGM, and RAK ICC",
      "Structure design — founder, beneficiaries, and governance model",
      "Charter and rules preparation",
      "Foundation registration",
      "Council appointment",
      "Asset transfer into the foundation",
      "Banking and custody integration (Banking-First, set up in parallel)"
    ],
    "notIncluded": [
      "Management of the foundation's assets",
      "Investment decisions made on your behalf",
      "Aggressive or non-compliant tax optimization",
      "Concealment of assets from regulators or authorities",
      "Inheritance tax planning for assets outside the UAE",
      "Cross-border inheritance dispute representation"
    ],
    "timeline": "Roughly 3-6 weeks end to end: analysis in week 1, architecture in week 2, and registration typically within 2-4 weeks. Asset transfer and banking integration run in parallel rather than adding a separate phase at the end.",
    "requirements": [
      "Full disclosure of the assets to be held by the foundation",
      "A clear, agreed succession logic (beneficiaries and how assets should pass)",
      "Ability to meet bank and regulator compliance requirements, including source of funds/wealth",
      "Timely provision of documents and decisions during structuring"
    ],
    "tiers": [
      {
        "tier": "L0",
        "label": "Advisory",
        "includes": "Diagnostic and direction-setting. Where asset protection and succession are the question, this is where we pressure-test whether a foundation is the right instrument for your goals — or whether a will, direct ownership, or another route fits better — and lay out the roadmap before you commit."
      },
      {
        "tier": "L1",
        "label": "Entry",
        "includes": "Legal and banking entry to the UAE — residency, a working personal account, tax-residency clarity. Foundation is not part of this tier; it typically follows once you are established and assets are ready to be structured."
      },
      {
        "tier": "L2",
        "label": "Setup",
        "includes": "Launching business, accounts, and deals — company setup, corporate banking, real estate, conveyancing. Foundation is not included here; it belongs to the long-term control layer above."
      },
      {
        "tier": "L3",
        "label": "Control",
        "includes": "The long-term governance and protection layer for HNWI clients and family offices. Foundation (Asset Protection) sits here, alongside the UAE Will, custody structuring, and portfolio oversight — the structures that protect assets and secure succession over time."
      }
    ],
    "inPackages": [
      "L3"
    ],
    "faqs": [
      {
        "q": "How is a UAE foundation different from a trust?",
        "a": "Both separate assets from your personal estate, but a trust generally requires you to hand control to a trustee. With a foundation, you remain founder and keep control of the structure — you direct it and can change its beneficiaries and rules over time. You get the protection and succession benefits without surrendering the say over what you built."
      },
      {
        "q": "Will I lose control of my assets once they're in the foundation?",
        "a": "No. That is the core reason clients choose a foundation over a trust. Legal ownership moves to the foundation — which is what protects the assets and removes them from your personal name — but you stay in control as founder and govern the structure through its council and rules, which you can amend."
      },
      {
        "q": "Does a foundation protect against UAE Sharia inheritance rules?",
        "a": "Yes. Assets held by the foundation pass according to the foundation's own succession rules rather than default UAE inheritance rules — automatically, without going through court and without the delays that personal-name assets can face. That controlled, predictable transfer is one of the main reasons owners set one up."
      },
      {
        "q": "I've heard people register a foundation and then can't open a bank account. How do you handle that?",
        "a": "This is a real and common failure: a foundation with no banking is effectively useless. We work Banking-First — we set up the bank accounts and custody in parallel with registration, so the structure is funded and operational rather than a certificate that no bank will service. All the foundations we register are set up with banking access in mind."
      },
      {
        "q": "Which jurisdiction will my foundation be registered in?",
        "a": "We work across DIFC, ADGM, and RAK ICC and select the one that best fits your goals and budget — they differ on cost, governance flexibility, and how they integrate with banking. The right choice is part of the analysis and architecture stages, not a default."
      },
      {
        "q": "Is the ownership structure confidential?",
        "a": "Yes. The foundation is a separate legal entity and its ownership structure is not publicly disclosed, so beneficiaries and the underlying arrangement are kept private — within the bounds of regulator and bank compliance, which always applies."
      }
    ],
    "ctaToPreScreen": "Most asset-protection cases turn on the specifics — what you hold, where, and how you want it to pass. The clearest next step is a confidential pre-screen: we review your assets and goals and tell you whether a foundation is the right structure, which jurisdiction fits, and how banking integrates — before you commit. Start the pre-screen to map your structure.",
    "category": "assets-wealth",
    "categoryName": "Wealth Structuring",
    "href": "/services/assets-wealth/foundation",
    "leadExpert": "olya"
  },
  {
    "slug": "last-will",
    "displayName": "UAE Will (Succession)",
    "isEntryPoint": false,
    "entryPointNote": "",
    "oneLiner": "A UAE Will registered with the Dubai Courts so your assets pass on your terms — not under default Sharia distribution.",
    "heroSubhead": "Without a registered Will, UAE accounts, property and company shares are distributed under default Sharia rules — and courts can freeze them for months. A Will drafted for direct enforcement fixes your heirs, shares, guardianship and executor, and takes effect immediately on registration.",
    "problem": "If you hold assets in the UAE and have no registered Will, succession defaults to Sharia distribution: fixed shares set by law, regardless of your intent. The practical consequences are immediate. A bank account can be frozen, stalling payments to contractors and family. Completed property cannot be sold or transferred until the court issues orders. An off-plan unit stalls because the developer needs court instructions to continue. Under Article 241 of the UAE Personal Status Law, assets left without a Will and verified heirs may even be directed to Waqf. For an entrepreneur or executive with accounts, real estate and a company in the UAE, that means a family facing months of court proceedings — and assets they cannot touch — at the worst possible time.",
    "solution": "A UAE Will is a single official document that records the asset owner's instructions for their UAE accounts, real estate and business assets. Once registered — with the Dubai Courts, or via the DIFC Wills Service Centre or ADJD under your national law depending on your profile — it becomes a direct instruction the court acts on. The court does not investigate intent; it proceeds straight to execution. The executor you appoint can immediately liaise with banks and developers without waiting on additional court steps. Completed property transfers efficiently; for off-plan, the executor continues payments and receives the unit on completion. The wording is built specifically for direct enforcement, so there are no ambiguities to slow the process. At WTP it is handled as part of a wider asset-protection picture — accounts, company, property and, where relevant, foundation and custody — rather than an isolated form.",
    "steps": [
      {
        "title": "Consultation & asset analysis",
        "outcome": "A private review — online or in person — of your UAE accounts, completed and off-plan property and business assets, plus your executor intent. We determine the right Will format (Dubai Courts / DIFC / ADJD) for your profile."
      },
      {
        "title": "Structuring",
        "outcome": "Heirs, shares, guardianship for minors and executor are defined and walked through scenario by scenario, so the distribution matches your actual intent and family situation."
      },
      {
        "title": "Drafting",
        "outcome": "The Will text is prepared in the required court format, drafted for direct enforcement with no ambiguities, reviewed with you, and your registration is booked."
      },
      {
        "title": "Registration",
        "outcome": "Signing and registration — online via Zoom (available to residents and non-residents) or in a single in-person visit. The Will takes effect immediately."
      },
      {
        "title": "Updates",
        "outcome": "As your family or asset composition changes, we update the Will so the executor and structure stay current."
      }
    ],
    "includes": [
      "Private consultation and full UAE asset review (accounts, completed and off-plan property, company shares)",
      "Will format selection — Dubai Courts / DIFC Wills Service Centre / ADJD",
      "Definition of heirs and shares",
      "Guardianship provisions for minor children",
      "Executor structure and recommendations",
      "Real estate and off-plan structuring within the Will",
      "Will drafting in the required court format and registration support",
      "Registered original document, safekeeping guidance and update recommendations"
    ],
    "notIncluded": [
      "Inheritance tax planning for assets outside the UAE",
      "International / cross-border succession disputes",
      "Management of assets after the succession event occurs"
    ],
    "timeline": "Drafting is typically ready in 1-2 business days, with the full process commonly completed within about 5-7 days. Registration takes place in a single session — online via Zoom or in one in-person visit — and the Will takes effect immediately.",
    "requirements": [
      "Full disclosure of your UAE asset composition (accounts, property, company shares)",
      "Correct identification of intended heirs",
      "Timely review and sign-off of the Will text"
    ],
    "tiers": [
      {
        "tier": "L0",
        "label": "Advisory",
        "includes": "Diagnostic and strategic direction. Succession exposure is flagged during advisory review (legal and asset-protection lens), but the Will itself is not drafted or registered at this level."
      },
      {
        "tier": "L1",
        "label": "Entry",
        "includes": "Legal and banking entry to the UAE (residency, personal account, tax-residency analysis). The Will is not part of this tier."
      },
      {
        "tier": "L2",
        "label": "Setup",
        "includes": "Business, banking, real estate and family setup. Once property and company shares exist, the need for a Will becomes concrete — but drafting and registration sit in the Control tier."
      },
      {
        "tier": "L3",
        "label": "Control",
        "includes": "Included. The UAE Will is delivered here alongside foundation / asset protection, custody structuring and portfolio oversight — the long-term governance and protection layer for HNWI and family-office clients."
      }
    ],
    "inPackages": [
      "L3"
    ],
    "faqs": [
      {
        "q": "What happens to my UAE assets if I die without a registered Will?",
        "a": "By default they are distributed under Sharia rules — fixed shares set by law, regardless of your wishes. In practice, accounts can be frozen, completed property cannot be sold or transferred until the court issues orders, and off-plan units stall pending court instructions. Under Article 241 of the UAE Personal Status Law, assets without a Will and verified heirs may even be directed to Waqf. A registered Will replaces that with direct execution of your intent."
      },
      {
        "q": "Do I have to be a UAE resident, or be physically in the country, to register a Will?",
        "a": "No. The Will covers UAE assets for both residents and non-residents. Registration can be completed online via Zoom for residents and non-residents alike, or in a single in-person visit if you prefer. We confirm the right route for your profile during the consultation."
      },
      {
        "q": "What is the difference between a Dubai Courts Will and a DIFC / ADJD Will?",
        "a": "They are different registration routes. A Will registered with the Dubai Courts becomes a direct instruction the court acts on. The DIFC Wills Service Centre and ADJD let you register under your national law. The right route depends on your asset mix, residency and family situation — we determine it during the asset analysis rather than applying one format to everyone."
      },
      {
        "q": "How does the Will handle my off-plan property that isn't completed yet?",
        "a": "The Will is drafted to be off-plan aware. For completed property it enables efficient ownership transfer; for off-plan, the appointed executor continues the payments and receives the unit on completion. Accounts, completed property and off-plan units are integrated into a single execution structure."
      },
      {
        "q": "Can I appoint a guardian for my children and choose my own executor?",
        "a": "Yes. Guardianship for minor children is fixed in the Will, and you appoint your own executor. The executor can liaise with banks and developers immediately, without waiting on additional court steps. As your family or assets change, we update the Will so both stay current."
      }
    ],
    "ctaToPreScreen": "Start with a confidential pre-screen. We review your UAE asset picture — accounts, property, company shares and family situation — confirm the right Will route for your profile, and map the fastest path to a registered, enforceable document.",
    "category": "assets-wealth",
    "categoryName": "Wealth Structuring",
    "href": "/services/assets-wealth/last-will",
    "leadExpert": "olya"
  }
];

export const getProduct = (slug: string): ProductData | undefined =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (categorySlug: string): ProductData[] =>
  products.filter((p) => p.category === categorySlug);

export const entryPoints = (): ProductData[] => products.filter((p) => p.isEntryPoint);

export interface ProductCategory { slug: string; name: string; tagline: string; productSlugs: string[] }
export const categories: ProductCategory[] = [
  { slug: "banking", name: "Banking & Capital", tagline: "Get banked, then move and secure capital.", productSlugs: ["open-bank-account", "escrow", "factoring"] },
  { slug: "business-setup", name: "Business Setup", tagline: "A UAE company built to be bankable.", productSlugs: ["open-company"] },
  { slug: "residency-visa", name: "Residency & Mobility", tagline: "Residency structured around your assets.", productSlugs: ["golden-visa"] },
  { slug: "assets-wealth", name: "Wealth Structuring", tagline: "Protect, structure and pass on what you have built.", productSlugs: ["foundation", "last-will"] },
];
export const getCategory = (slug: string): ProductCategory | undefined =>
  categories.find((c) => c.slug === slug);
