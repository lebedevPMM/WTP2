import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'dist', 'product-onepagers');

// ─── Product Content (EN) ───────────────────────────────────────────

const products = [

  // ═══════════════════════════════════════════════════════════════════
  // 1. X-RAY — Comprehensive Diagnostics
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'xray',
    accent: '#e74c3c',
    tag: 'FOR NEW CLIENTS & PARTNERS',
    headline: 'X-ray.<br>Understand before you act.',
    sub: 'Comprehensive diagnostics: banking risks, tax strategy, asset structure. An honest verdict before any work begins.',
    cta: 'Book Your X-ray',

    what: {
      title: 'What is X-ray',
      label: 'OVERVIEW',
      text: 'X-ray is a full audit of your situation through the lens of banks and regulators. We don\u2019t sell services upfront. We first assess: who you are, what\u2019s the business, what are the risks, what are the options. The outcome is a risk map and an actionable plan. If the case is \u201cred\u201d\u00a0\u2014 we tell you directly.',
    },

    benefits: {
      title: 'What You Get',
      label: 'OUTCOME',
      items: [
        { title: 'Risk Map', text: 'KYC/AML pre-screening, sanctions check, ownership structure and source of funds analysis.' },
        { title: 'Banking Strategy', text: 'Bankability assessment: which banks will realistically open an account for your profile and business model.' },
        { title: 'Tax Analysis', text: 'Current residency assessment, double taxation risks, tax transition strategy.' },
        { title: 'Roadmap', text: 'A document with a concrete plan: what to do, in what order, which documents to prepare, what it costs.' },
      ],
    },

    process: {
      title: 'How It Works',
      label: 'PROCESS',
      steps: [
        { num: '01', title: 'Request', text: 'You describe your situation and goals. We send a document checklist.' },
        { num: '02', title: 'Analysis', text: 'Offline analysis: KYC screening, banking strategy, tax mapping. 5\u20137 business days.' },
        { num: '03', title: 'Verdict', text: 'Meeting or video call with results. Risk map + roadmap + recommendations.' },
        { num: '04', title: 'Decision', text: 'You decide: proceed to Entry/Setup or stop. No pressure.' },
      ],
    },

    includes: {
      title: 'What\u2019s Included',
      label: 'SCOPE',
      items: [
        'KYC/AML pre-screening',
        'Bankability assessment',
        'Tax strategy analysis',
        'Ownership structure analysis',
        'Risk map (document)',
        'Roadmap with recommendations',
        '60-minute consultation',
        'Verdict: GO / NO-GO / conditions',
      ],
    },

    why: {
      title: 'Why WTP',
      label: 'APPROACH',
      items: [
        { title: 'No upselling', text: 'You pay for diagnostics, not a service package. The decision is yours.' },
        { title: 'Banking-First', text: 'We verify bankability before registration. A company without an account is wasted money.' },
        { title: 'Honest verdict', text: 'If the case won\u2019t pass\u00a0\u2014 we say so. ~30% of cases are declined.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. GOLDEN VISA
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'golden-visa',
    accent: '#b8860b',
    tag: 'FOR INVESTORS & ENTREPRENEURS',
    headline: 'UAE Golden Visa.<br>10-year residency, handled end-to-end.',
    sub: 'Investor, business owner, and specialist visas. We find the optimal route, prepare documents, and guide you through to Emirates ID.',
    cta: 'Find Your Route',

    what: {
      title: 'What is Golden Visa',
      label: 'OVERVIEW',
      text: 'Golden Visa is long-term UAE residency (5 or 10 years) without a national sponsor. For investors, entrepreneurs, specialists and their families. We select the optimal visa route for your profile, prepare documents, and manage the process from first step to Emirates ID.',
    },

    benefits: {
      title: 'What You Get',
      label: 'OUTCOME',
      items: [
        { title: 'Visa Strategy', text: 'Analysis: which visa type fits best\u00a0\u2014 investor (property AED 2M), business owner, specialist.' },
        { title: 'Documents', text: 'Full package preparation: legalization, translation, notarization, attestation.' },
        { title: 'Emirates ID', text: 'Biometrics, medical, Emirates ID issuance\u00a0\u2014 full on-the-ground support.' },
        { title: 'Family Visas', text: 'Spouse and children visas. Document legalization: birth and marriage certificates.' },
      ],
    },

    process: {
      title: 'How It Works',
      label: 'PROCESS',
      steps: [
        { num: '01', title: 'Assessment', text: 'Determine optimal visa type for your goals: banking, tax residency, family.' },
        { num: '02', title: 'Preparation', text: 'Document collection and verification, legalization, medical and biometrics scheduling.' },
        { num: '03', title: 'Filing', text: 'Application submission, on-the-ground support during UAE visit. 1\u20135 days.' },
        { num: '04', title: 'Issuance', text: 'Visa and Emirates ID issued. Family visas processed in parallel if needed.' },
      ],
    },

    includes: {
      title: 'What\u2019s Included',
      label: 'SCOPE',
      items: [
        'Visa type selection',
        'Document preparation & verification',
        'Legalization & translation',
        'Medical (booking + support)',
        'Biometrics & Emirates ID',
        'Filing & status tracking',
        'Family visas (optional)',
        'Tax residency strategy (optional)',
      ],
    },

    why: {
      title: 'Why WTP',
      label: 'APPROACH',
      items: [
        { title: 'Not just a visa', text: 'We link visa with banking strategy and tax residency\u00a0\u2014 one integrated plan.' },
        { title: 'Full support', text: 'From first document to Emirates ID. We don\u2019t \u201cprepare and drop\u201d\u00a0\u2014 we deliver results.' },
        { title: 'Clear timelines', text: 'You know when to fly, what to bring, when to expect results.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. LAST WILL — UAE Will
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'last-will',
    accent: '#8e2de2',
    tag: 'FOR UAE RESIDENTS WITH ASSETS',
    headline: 'UAE Will.<br>Protect your family from Sharia court.',
    sub: 'Without a will, UAE assets are distributed under Sharia law. A DIFC or ADJD Will locks in your wishes and protects heirs on your terms.',
    cta: 'Register Your Will',

    what: {
      title: 'Why You Need a Will in the UAE',
      label: 'CONTEXT',
      text: 'By default, assets of non-residents and residents in the UAE are inherited under Sharia: fixed shares, courts can freeze accounts and property. DIFC Wills Service Centre or ADJD allows you to register a will under your national law. This is the only reliable way to protect your family.',
    },

    benefits: {
      title: 'What You Get',
      label: 'OUTCOME',
      items: [
        { title: 'Legal Protection', text: 'A DIFC or ADJD-registered will takes priority over Sharia distribution.' },
        { title: 'Asset Control', text: 'You decide who receives property, accounts, company shares, and other assets.' },
        { title: 'Minor Protection', text: 'Guardianship is fixed in the will. Children are protected.' },
        { title: 'Speed of Execution', text: 'A will accelerates asset transfer. Without it\u00a0\u2014 months of court proceedings.' },
      ],
    },

    process: {
      title: 'How It Works',
      label: 'PROCESS',
      steps: [
        { num: '01', title: 'Analysis', text: 'Asset review: accounts, property, company shares. Determining will format.' },
        { num: '02', title: 'Structuring', text: 'Defining heirs, shares, guardianship. Choice: DIFC Will or ADJD.' },
        { num: '03', title: 'Drafting', text: 'Will text preparation, review, registration booking at DIFC/ADJD.' },
        { num: '04', title: 'Registration', text: 'Visit (15\u201330 min), signing, registration. Document takes effect immediately.' },
      ],
    },

    includes: {
      title: 'What\u2019s Included',
      label: 'SCOPE',
      items: [
        'UAE asset analysis',
        'Format selection (DIFC / ADJD)',
        'Heirs & shares definition',
        'Guardianship provision',
        'Will text preparation',
        'Registration support',
        'Registered original document',
        'Update recommendations',
      ],
    },

    why: {
      title: 'Why WTP',
      label: 'APPROACH',
      items: [
        { title: 'Comprehensive view', text: 'We see the full picture: accounts, companies, property. The will covers everything.' },
        { title: 'Part of a strategy', text: 'Will is part of asset protection. Foundation, custody, banking\u00a0\u2014 one process.' },
        { title: 'No delays', text: 'Document ready in 5\u20137 days. Registration\u00a0\u2014 in one visit.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. FOUNDATION — Asset Structuring
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'foundation',
    accent: '#004e92',
    tag: 'FOR ASSET OWNERS & FAMILIES',
    headline: 'UAE Foundation.<br>Control and protection\u00a0\u2014 without losing ownership.',
    sub: 'A legal structure for asset protection, succession planning, and confidential management. A trust alternative for HNWI clients.',
    cta: 'Discuss Structure',

    what: {
      title: 'What is a Foundation',
      label: 'CONTEXT',
      text: 'A foundation in the UAE is a legal entity that holds assets on behalf of beneficiaries. Unlike a trust, the founder retains control. Used for: asset protection from claims, succession planning, real estate and investment management, confidential ownership structure.',
    },

    benefits: {
      title: 'What You Get',
      label: 'OUTCOME',
      items: [
        { title: 'Asset Protection', text: 'Assets belong to the foundation, not the individual. Protection from claims, lawsuits, creditors.' },
        { title: 'Founder Control', text: 'Unlike a trust, the founder stays in control. Beneficiaries and rules can be changed.' },
        { title: 'Succession Planning', text: 'Automatic asset transfer per foundation rules. No court, no Sharia, no delays.' },
        { title: 'Confidentiality', text: 'Ownership structure is not publicly disclosed. Foundation is a separate legal entity.' },
      ],
    },

    process: {
      title: 'How It Works',
      label: 'PROCESS',
      steps: [
        { num: '01', title: 'Analysis', text: 'Asset and goal assessment. Comparison: foundation vs direct ownership vs trust.' },
        { num: '02', title: 'Architecture', text: 'Structure design: founder, beneficiaries, management rules, succession plan.' },
        { num: '03', title: 'Registration', text: 'Constitutional documents preparation. Registration in DIFC, ADGM, or RAK ICC.' },
        { num: '04', title: 'Integration', text: 'Asset transfer to foundation. Bank accounts, custody, reporting setup.' },
      ],
    },

    includes: {
      title: 'What\u2019s Included',
      label: 'SCOPE',
      items: [
        'Foundation applicability analysis',
        'Jurisdiction selection (DIFC / ADGM / RAK)',
        'Structure design',
        'Charter & rules preparation',
        'Foundation registration',
        'Council appointment',
        'Asset transfer',
        'Banking & custody integration',
      ],
    },

    why: {
      title: 'Why WTP',
      label: 'APPROACH',
      items: [
        { title: 'Beyond paperwork', text: 'We design structure for real goals: protection, succession, confidentiality.' },
        { title: 'Banking link', text: 'A foundation without an account is useless. We open accounts in parallel with registration.' },
        { title: 'Long-term support', text: 'Reporting, rule updates, corporate governance\u00a0\u2014 ongoing support.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 5. OPEN COMPANY — Company Registration
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'open-company',
    accent: '#e74c3c',
    tag: 'FOR ENTREPRENEURS & INVESTORS',
    headline: 'UAE Company.<br>Registration that passes the bank.',
    sub: 'Not just a license\u00a0\u2014 a working business structure accepted by banks. We match zone, license, and bank to your business model.',
    cta: 'Start Registration',

    what: {
      title: 'The Difference',
      label: 'BANKING-FIRST',
      text: 'Most agents register a company, then the client can\u2019t open an account. We work the other way: first we verify whether the bank will accept your structure (Pre-screen), only then we register. Zone, license type, jurisdiction\u00a0\u2014 everything is determined by banking requirements.',
    },

    benefits: {
      title: 'What You Get',
      label: 'OUTCOME',
      items: [
        { title: 'Bankable Structure', text: 'Company registered for a specific bank. Not \u201choping they\u2019ll open\u201d\u00a0\u2014 with confirmation.' },
        { title: 'Right Zone', text: 'Mainland or Freezone\u00a0\u2014 based on business model, clients, banking requirements, and budget.' },
        { title: 'Activity-Matched License', text: 'License type that the bank accepts and regulator approves. No unnecessary activity codes.' },
        { title: 'Full Package', text: 'Registration, lease agreement, establishment card, all government documents.' },
      ],
    },

    process: {
      title: 'How It Works',
      label: 'PROCESS',
      steps: [
        { num: '01', title: 'Pre-screen', text: 'Business model analysis, KYC profile, banking scenario selection. 5\u20137 days.' },
        { num: '02', title: 'Architecture', text: 'Zone, license type, ownership structure selection\u00a0\u2014 per banking requirements.' },
        { num: '03', title: 'Registration', text: 'Document filing, license receipt, lease, establishment card. 2\u20134 weeks.' },
        { num: '04', title: 'Bank', text: 'Bank application, compliance support, corporate account opening.' },
      ],
    },

    includes: {
      title: 'What\u2019s Included',
      label: 'SCOPE',
      items: [
        'Pre-screen & banking strategy',
        'Jurisdiction & license type selection',
        'Company registration',
        'Trade License',
        'Lease / virtual office',
        'Establishment Card',
        'Bank application',
        'ESR compliance (if needed)',
      ],
    },

    why: {
      title: 'Why WTP',
      label: 'APPROACH',
      items: [
        { title: 'Banking-First', text: 'Bank readiness verified BEFORE registration. Company without account = waste.' },
        { title: 'Unified process', text: 'Company + account + visa\u00a0\u2014 one project, one manager, one timeline.' },
        { title: 'No hidden fees', text: 'Government fees at cost. Our fee is separate and transparent.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 6. OPEN BANK ACCOUNT — Bank Account
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'open-bank-account',
    accent: '#004e92',
    tag: 'FOR INDIVIDUALS & COMPANIES',
    headline: 'UAE Bank Account.<br>Including complex profiles.',
    sub: 'Personal and corporate accounts. Bank selection matched to your profile, SOF preparation, compliance support\u00a0\u2014 even for complex jurisdictions.',
    cta: 'Check Bankability',

    what: {
      title: 'The Challenge',
      label: 'CONTEXT',
      text: 'UAE banks have tightened checks: rejections without explanation, account freezes, SOF requests months after opening. Especially difficult for clients with Russian passports, crypto income, multiple jurisdictions. We know which banks work with which profiles and prepare clients to pass compliance on the first attempt.',
    },

    benefits: {
      title: 'What You Get',
      label: 'OUTCOME',
      items: [
        { title: 'Bank Selection', text: 'Profile analysis \u2192 bank matched to realistically open the account. Not \u201clet\u2019s try everywhere.\u201d' },
        { title: 'SOF Preparation', text: 'Source of Funds\u00a0\u2014 the #1 rejection reason. We prepare packages per specific bank requirements.' },
        { title: 'Full Support', text: 'We manage from filing to activation. Answer compliance questions, refine the package.' },
        { title: 'Complex Profiles', text: 'We work with High Risk profiles: RF passport + residence permit, crypto-SOF, multiple jurisdictions.' },
      ],
    },

    process: {
      title: 'How It Works',
      label: 'PROCESS',
      steps: [
        { num: '01', title: 'Profiling', text: 'Analysis: citizenship, residency, income, business model, expected turnover.' },
        { num: '02', title: 'Strategy', text: 'Bank selection, SOF package preparation, business cycle description. 3\u20135 days.' },
        { num: '03', title: 'Filing', text: 'Document submission, visit booking, in-bank meeting support.' },
        { num: '04', title: 'Activation', text: 'Credentials received, online banking setup, test transaction.' },
      ],
    },

    includes: {
      title: 'What\u2019s Included',
      label: 'SCOPE',
      items: [
        'Banking profile analysis',
        'Bank matched to profile',
        'SOF documentation',
        'Business cycle description',
        'Application filing & tracking',
        'In-bank visit support',
        'Unblocking (if issues arise)',
        'Premium / Private banking (opt.)',
      ],
    },

    why: {
      title: 'Why WTP',
      label: 'APPROACH',
      items: [
        { title: 'Inside knowledge', text: 'We understand each bank\u2019s criteria. We don\u2019t file \u201choping\u201d\u00a0\u2014 we target precisely.' },
        { title: 'Complex cases', text: 'RF passport, crypto, complex structure\u00a0\u2014 we don\u2019t decline, we find a route.' },
        { title: 'To completion', text: 'If the bank requests additional documents\u00a0\u2014 we refine the package, not abandon.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 7. FACTORING — Commission Financing
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'factoring',
    accent: '#b8860b',
    tag: 'FOR REAL ESTATE AGENTS',
    headline: 'Commission Factoring.<br>Your money\u00a0\u2014 before the deal closes.',
    sub: 'Advance financing of broker commissions on real estate deals. Get paid immediately without waiting for developer settlement.',
    cta: 'Get Your Advance',

    what: {
      title: 'How It Works',
      label: 'MECHANICS',
      text: 'Agent closes a deal, but commission arrives in 30\u201390 days (sometimes longer). Factoring solves this: we advance your commission right after deal confirmation. You get money, we collect when the developer settles. No loans, no collateral, no complex paperwork.',
    },

    benefits: {
      title: 'What You Get',
      label: 'OUTCOME',
      items: [
        { title: 'Immediate Cash', text: 'Up to 80% commission advance within 3\u20135 business days after deal confirmation.' },
        { title: 'No Loans', text: 'This is not a loan. We purchase the receivable\u00a0\u2014 your credit history is irrelevant.' },
        { title: 'Simple Process', text: 'Deal confirmation \u2192 documents \u2192 money in your account. Minimum bureaucracy.' },
        { title: 'Scalability', text: 'More deals = more advances. Factoring grows with your business.' },
      ],
    },

    process: {
      title: 'How It Works',
      label: 'PROCESS',
      steps: [
        { num: '01', title: 'Deal', text: 'You close a deal and receive confirmation from developer/seller.' },
        { num: '02', title: 'Application', text: 'You send us deal confirmation and commission agreement.' },
        { num: '03', title: 'Assessment', text: 'We verify the deal and developer. Decision\u00a0\u2014 within 1\u20132 business days.' },
        { num: '04', title: 'Payout', text: 'Advance to your account. Balance\u00a0\u2014 after developer settlement minus commission.' },
      ],
    },

    includes: {
      title: 'What\u2019s Included',
      label: 'SCOPE',
      items: [
        'Deal & counterparty assessment',
        'Up to 80% commission advance',
        'Legal documentation',
        'Developer collection',
        'Per-deal reporting',
        'Personal manager',
        'No collateral or guarantees',
        'No credit history impact',
      ],
    },

    why: {
      title: 'Why WTP',
      label: 'APPROACH',
      items: [
        { title: 'Market expertise', text: 'We work with UAE real estate\u00a0\u2014 know developers, timelines, risks.' },
        { title: 'Speed', text: 'Decision in 1\u20132 days, money in 3\u20135. Not months of bank approval.' },
        { title: 'Partnership', text: 'We\u2019re not a lender. We\u2019re a partner helping your cashflow.' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 8. ESCROW — Transaction Registration
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'escrow',
    accent: '#8e2de2',
    tag: 'FOR PROPERTY BUYERS & SELLERS',
    headline: 'Escrow & Transaction Registration.<br>Safe purchase without a UAE account.',
    sub: 'Escrow account, property verification, legal deal closing\u00a0\u2014 for those buying or selling property in UAE without a local bank account.',
    cta: 'Discuss Your Deal',

    what: {
      title: 'Why Escrow',
      label: 'CONTEXT',
      text: 'Buying property in the UAE without a local account is standard for non-residents. An escrow account solves the problem: funds are held in a protected account until the deal completes. We handle legal verification, document preparation, and registration with DLD (Dubai Land Department).',
    },

    benefits: {
      title: 'What You Get',
      label: 'OUTCOME',
      items: [
        { title: 'Fund Safety', text: 'Escrow account: funds transfer to seller only after ownership registration.' },
        { title: 'No Local Account Needed', text: 'No UAE bank account required to complete the transaction. Escrow is the alternative route.' },
        { title: 'Legal Verification', text: 'Property, seller, encumbrance, developer status check. Due diligence before the deal.' },
        { title: 'DLD Registration', text: 'Full support for ownership registration at Dubai Land Department.' },
      ],
    },

    process: {
      title: 'How It Works',
      label: 'PROCESS',
      steps: [
        { num: '01', title: 'Verification', text: 'Property and seller due diligence. Encumbrance check, DLD status.' },
        { num: '02', title: 'Escrow', text: 'Escrow account opening. Buyer funds transfer to protected account.' },
        { num: '03', title: 'Documentation', text: 'SPA (Sale Purchase Agreement) preparation, NOC from developer, DLD documents.' },
        { num: '04', title: 'Registration', text: 'DLD transfer, Title Deed issuance, fund release to seller.' },
      ],
    },

    includes: {
      title: 'What\u2019s Included',
      label: 'SCOPE',
      items: [
        'Property due diligence',
        'Escrow account opening',
        'SPA preparation',
        'Developer NOC',
        'DLD support',
        'Title Deed registration',
        'Escrow fund transfer',
        'Agent/lawyer coordination',
      ],
    },

    why: {
      title: 'Why WTP',
      label: 'APPROACH',
      items: [
        { title: 'No bank account needed', text: 'Escrow enables deals without opening a local account.' },
        { title: 'Full cycle', text: 'From property verification to Title Deed\u00a0\u2014 one contractor, one process.' },
        { title: 'Transparency', text: 'All payments through escrow. You see where money goes and when.' },
      ],
    },
  },

];


// ─── Shared CSS (WTP Design System) ────────────────────────────────

const sharedCSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }

  :root {
    --bg: #FAFAFA; --bg-card: #FFFFFF; --border: #E0E0E0;
    --text: #0A0A0A; --text2: #666666; --meta: #767676;
    --font: "Inter", sans-serif; --serif: "Playfair Display", serif;
  }

  body {
    background: var(--bg); color: var(--text); font-family: var(--font);
    width: 210mm; min-height: 297mm; padding: 11mm 15mm 10mm;
    font-size: 10px; line-height: 1.4;
    display: flex; flex-direction: column;
  }

  .header {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--border);
  }
  .header-left h1 {
    font-size: 24px; font-family: var(--serif); font-weight: 400;
    letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 5px; max-width: 430px;
  }
  .header-left p { font-size: 10.5px; color: var(--text2); max-width: 400px; line-height: 1.4; }
  .tag {
    font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--meta); margin-bottom: 6px; display: block;
  }
  .cta {
    display: inline-block; background: var(--text); color: var(--bg);
    font-size: 10px; font-weight: 500; padding: 6px 16px; border-radius: 100px;
    text-decoration: none; white-space: nowrap;
  }

  .section { margin-bottom: 12px; }
  .section-head {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 6px;
  }
  .section-head h2 { font-size: 14px; font-family: var(--serif); font-weight: 400; }
  .section-head .label { font-size: 8.5px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--meta); }

  .what-block {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;
    padding: 10px 12px; font-size: 10px; color: var(--text2); line-height: 1.45;
  }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;
    padding: 9px; overflow: hidden;
  }
  .card h4 { font-family: var(--serif); font-size: 11.5px; margin-bottom: 2px; font-weight: 400; }
  .card p { font-size: 9px; color: var(--text2); line-height: 1.35; }

  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .process-step { padding-left: 8px; border-left: 1px solid var(--border); position: relative; }
  .process-step::before {
    content: ''; position: absolute; left: -2.5px; top: 5px;
    width: 4px; height: 4px; background: var(--meta); border-radius: 50%;
  }
  .process-step .pill {
    display: inline-block; padding: 1px 5px; border-radius: 100px;
    font-size: 8px; border: 1px solid var(--border); margin-bottom: 3px; color: var(--text2);
  }
  .process-step h3 { font-size: 11px; font-weight: 500; margin-bottom: 1px; }
  .process-step p { font-size: 8.5px; color: var(--text2); line-height: 1.3; }

  .includes-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 3px 16px;
  }
  .includes-item {
    display: flex; align-items: center; gap: 6px; padding: 3px 0;
  }
  .includes-check {
    width: 12px; height: 12px; border: 1px solid var(--border); border-radius: 3px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 8.5px; color: var(--meta);
  }
  .includes-item span { font-size: 9.5px; color: var(--text); }

  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .why-item { display: flex; gap: 6px; align-items: flex-start; }
  .why-dot { width: 5px; height: 5px; border-radius: 50%; margin-top: 3px; flex-shrink: 0; }
  .why-item strong { font-size: 11px; font-family: var(--serif); font-weight: 400; display: block; margin-bottom: 1px; }
  .why-item p { font-size: 8.5px; color: var(--text2); line-height: 1.3; }

  .footer {
    margin-top: auto; padding-top: 8px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .footer-col { flex: 1; }
  .footer-label { font-size: 8px; color: var(--meta); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1px; }
  .footer-value { font-size: 9.5px; }
`;


// ─── HTML Builder ───────────────────────────────────────────────────

function buildProductHTML(p) {
  const accentColors = ['#e74c3c', '#b8860b', '#004e92', '#8e2de2'];

  const benefitsHTML = p.benefits.items.map((b, i) =>
    `<div class="card" style="border-top: 2px solid ${accentColors[i % 4]}"><h4>${b.title}</h4><p>${b.text}</p></div>`
  ).join('\n');

  const processHTML = p.process.steps.map(s =>
    `<div class="process-step"><span class="pill">${s.num}</span><h3>${s.title}</h3><p>${s.text}</p></div>`
  ).join('\n');

  const includesHTML = p.includes.items.map(item =>
    `<div class="includes-item"><div class="includes-check">\u2713</div><span>${item}</span></div>`
  ).join('\n');

  const whyHTML = p.why.items.map((w, i) =>
    `<div class="why-item">
      <div class="why-dot" style="background:${accentColors[i % 4]}"></div>
      <div><strong>${w.title}</strong><p>${w.text}</p></div>
    </div>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>${sharedCSS}
  .accent-bar { width: 40px; height: 3px; background: ${p.accent}; border-radius: 2px; margin-bottom: 8px; }
</style>
</head>
<body>

<div class="header">
  <div class="header-left">
    <span class="tag">${p.tag}</span>
    <h1>${p.headline}</h1>
    <p style="margin-top:5px">${p.sub}</p>
  </div>
  <div class="header-right" style="text-align:right;padding-top:16px">
    <a class="cta">${p.cta}</a>
  </div>
</div>

<div class="section">
  <div class="section-head"><h2>${p.what.title}</h2><span class="label">${p.what.label}</span></div>
  <div class="what-block">${p.what.text}</div>
</div>

<div class="section">
  <div class="section-head"><h2>${p.benefits.title}</h2><span class="label">${p.benefits.label}</span></div>
  <div class="grid-2">${benefitsHTML}</div>
</div>

<div class="section">
  <div class="section-head"><h2>${p.process.title}</h2><span class="label">${p.process.label}</span></div>
  <div class="grid-4">${processHTML}</div>
</div>

<div class="section">
  <div class="section-head"><h2>${p.includes.title}</h2><span class="label">${p.includes.label}</span></div>
  <div class="includes-grid">${includesHTML}</div>
</div>

<div class="section">
  <div class="section-head"><h2>${p.why.title}</h2><span class="label">${p.why.label}</span></div>
  <div class="grid-3">${whyHTML}</div>
</div>

<div style="text-align:center;font-size:8px;color:var(--meta);margin-bottom:6px;letter-spacing:0.05em">Since 2019 · 350+ clients · Banking-First approach</div>
<div class="footer">
  <div class="footer-col">
    <div class="footer-label">WTP</div>
    <div class="footer-value">WTP Brokers</div>
  </div>
  <div class="footer-col">
    <div class="footer-label">Contact</div>
    <div class="footer-value">hello@wtpbrokers.com</div>
  </div>
  <div class="footer-col" style="text-align:right">
    <div class="footer-label">Office</div>
    <div class="footer-value">Dubai, UAE</div>
  </div>
</div>

</body>
</html>`;
}


// ─── PDF Generator ──────────────────────────────────────────────────

async function generateProductPDF(product, browser) {
  const html = buildProductHTML(product);
  const pdfPath = path.join(outDir, `WTP_${product.id}_EN.pdf`);
  const pngPath = path.join(outDir, `WTP_${product.id}_EN_preview.png`);

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, preferCSSPageSize: true });

  await page.setViewport({ width: 794, height: 1123 });
  await page.screenshot({ path: pngPath, fullPage: true });

  const diagnostics = await page.evaluate(() => {
    const bodyRect = document.body.getBoundingClientRect();
    const mmPerPx = 25.4 / 96;
    const contentHeightMM = bodyRect.height * mmPerPx;
    return { contentHeightMM: Math.round(contentHeightMM), fitsOnOnePage: contentHeightMM <= 297 };
  });

  await page.close();

  const status = diagnostics.fitsOnOnePage ? '\u2705' : '\u26a0\ufe0f';
  console.log(`  ${status} ${product.id}: ${diagnostics.contentHeightMM}mm (${diagnostics.fitsOnOnePage ? 'OK' : 'OVERFLOW'})`);
  console.log(`     PDF: ${pdfPath}`);
  console.log(`     PNG: ${pngPath}`);

  return { id: product.id, ...diagnostics };
}


// ─── Main ───────────────────────────────────────────────────────────

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\nGenerating ${products.length} EN product one-pagers...\n`);
  console.log(`Output: ${outDir}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];
  for (const product of products) {
    const result = await generateProductPDF(product, browser);
    results.push(result);
  }

  await browser.close();

  console.log('\n─── Summary ───');
  const ok = results.filter(r => r.fitsOnOnePage).length;
  const overflow = results.filter(r => !r.fitsOnOnePage).length;
  console.log(`\u2705 OK: ${ok}  \u26a0\ufe0f Overflow: ${overflow}  Total: ${results.length}`);
  console.log('\nDone!');
})();
