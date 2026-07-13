// Generate 4 branded WTP LinkedIn DM materials as PDFs
// Keywords: SCREEN, SUBSTANCE, PRECHECK, AUDIT
// Same design system as Instagram DM materials (generate-dm-materials.mjs)
// Output: dist/dm-materials/WTP-LI-*.pdf + PNG previews

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'dist', 'dm-materials');

// ─── Document definitions ─────────────────────────────────────
const docs = [
  {
    id: 'SCREEN',
    accent: '#004e92',
    title: 'Pre-Engagement Sanctions Intake',
    subtitle: 'This screens your client before a bank does. Six questions. Written summary back in 48 hours.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'UBO Citizenship and Residency',
        body: 'All nationalities and current tax residency. Dual citizenship must be disclosed — each jurisdiction adds risk weight.',
      },
      {
        num: '02',
        title: 'Country of Business Operations',
        body: 'Where revenue is earned and where the business activity physically takes place. Registration jurisdiction is secondary.',
      },
      {
        num: '03',
        title: 'Ownership and Control Structure',
        body: 'Full UBO chain. Note any nominees, layered holding companies, or directors residing outside the UAE.',
      },
      {
        num: '04',
        title: 'Business Sector and Activity',
        body: 'Industry and specific activity type. Certain sectors — trading, crypto, real estate, defence-adjacent — require additional documentation.',
      },
      {
        num: '05',
        title: 'Primary Counterparties',
        body: 'Nationalities and jurisdictions of key clients, suppliers, and existing banking relationships.',
      },
      {
        num: '06',
        title: 'Prior Bank Rejections',
        body: 'Any account refusals, closures, or enhanced due diligence requests in the last 5 years. Undisclosed history creates a disqualifying compliance flag that is difficult to reverse.',
      },
    ],
    cta: 'Send answers back — I\'ll review and respond within 48 hours.',
  },
  {
    id: 'SUBSTANCE',
    accent: '#2d6a4f',
    title: '5-Question Substance Diagnostic',
    subtitle: 'Run these against your client\'s UAE structure before a tax authority or bank does it first.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Location of Management Decisions',
        body: 'Where are board meetings held, where are investment and contract decisions made? Physical presence of the decision-maker defines economic substance — not the registered office address.',
      },
      {
        num: '02',
        title: 'Contract Signatory Location',
        body: 'Who signs agreements on behalf of the entity, and from which country? Remote signing from the home jurisdiction is the most visible substance failure. Tax authorities pull travel records.',
      },
      {
        num: '03',
        title: 'Documentation of Board Activity',
        body: 'Are resolutions, meeting minutes, and approvals formally recorded? Substance gaps are not just operational — they are evidentiary. Undocumented decisions are invisible to an assessor.',
      },
      {
        num: '04',
        title: 'Director Time in UAE',
        body: 'How many days per year does the director physically spend in the UAE? CIT and ESR regulations both require demonstrable presence. Below established thresholds, a structure\'s substance position becomes significantly harder to demonstrate.',
      },
      {
        num: '05',
        title: 'Operational Footprint in UAE',
        body: 'Local contracts, UAE-based suppliers or clients, payroll in the country, or office lease. Operational activity is the strongest evidence of substance — absence is the strongest risk signal.',
      },
    ],
    cta: 'If any answer is unclear or concerning — DM back. The written assessment goes to you first.',
  },
  {
    id: 'PRECHECK',
    accent: '#b8860b',
    title: 'Bank Application Pre-Submission Guide',
    subtitle: 'Five documents. What bank compliance actually checks — and the mistakes that most often kill applications.',
    headerTag: 'Confidential',
    items: [
      {
        num: '01',
        title: 'Passport and National ID',
        check: 'Consistency with prior KYC records, expiry dates, and whether all beneficial owners are accounted for.',
        mistake: 'Submitting a renewed passport without updating the name or number in previously submitted forms.',
        prepare: 'Cross-reference every document in the file against the exact name and number on the current passport.',
      },
      {
        num: '02',
        title: 'Proof of Address',
        check: 'Document date, issuing institution, and whether the address matches the KYC declaration.',
        mistake: 'Utility bills older than 90 days or issued to a family member.',
        prepare: 'Use a bank statement from the past 60 days. Confirm address matches the application.',
      },
      {
        num: '03',
        title: 'Source of Funds Documentation',
        check: 'Whether funds can be traced through an auditable sequence of documents.',
        mistake: 'Narrative explanation with no supporting evidence — contract, invoice, or transfer record.',
        prepare: 'Build a document chain. Contract → invoice → bank transfer confirmation. Each step must link to the next.',
      },
      {
        num: '04',
        title: 'Business Plan',
        check: 'Internal consistency. Revenue figures, projected transaction volumes, and the account type must align.',
        mistake: 'Projecting transaction volumes that don\'t match the business model or account tier applied for.',
        prepare: 'Compliance will read it as a consistency test, not a business case. Align all numbers before submission.',
      },
      {
        num: '05',
        title: 'Corporate Documents (MoA, CoI, Share Register)',
        check: 'UBO chain against public registry data. Names, ownership percentages, and signing authority.',
        mistake: 'Outdated documents that don\'t reflect a recent restructuring or share transfer.',
        prepare: 'Request fresh registry extracts. Verify every name and percentage matches the current structure.',
      },
    ],
    cta: 'DM back to start — we\'ll review in progress, not just at the end.',
  },
  {
    id: 'AUDIT',
    accent: '#e74c3c',
    title: 'UAE Structure Maintenance Framework',
    subtitle: 'Most compliance failures are maintenance failures — not incorporation failures.',
    headerTag: 'Annual Review Checklist',
    items: [
      {
        num: '01',
        title: 'Banking Relationship',
        body: 'KYC refresh status and document expiry. Account activity levels (dormant accounts are flagged and closed). Current relationship manager contact confirmed. Pending document refresh requests from the bank.',
      },
      {
        num: '02',
        title: 'Corporate Compliance',
        body: 'Trade license renewal dates. UBO register current and matching actual ownership. Annual filings submitted. Any outstanding requests from the authority or registered agent.',
      },
      {
        num: '03',
        title: 'Tax Compliance',
        body: 'Corporate tax registration confirmed. 9% rate applicability assessed against taxable income and qualifying status — not revenue. Filing deadlines tracked and met. Auditor appointed and coordinated if required.',
      },
      {
        num: '04',
        title: 'Substance Evidence',
        body: 'Board resolutions documented for the year. Director travel records available and showing UAE presence. Operational activity in UAE — contracts, payments, or staffing — is traceable and recorded.',
      },
      {
        num: '05',
        title: 'Visa and Residency',
        body: 'All residence visa renewal dates tracked. Status changes for existing holders noted. New visa additions since last review processed and recorded.',
      },
      {
        num: '06',
        title: 'Structure Review',
        body: 'Any changes in ownership since incorporation. Shifts in business activity or revenue streams. New jurisdiction exposure — entities, accounts, or counterparties added. UBO chain remains accurate and current.',
      },
    ],
    cta: 'If any area flags a gap — DM back. We can scope a retainer or a one-time audit.',
  },
];

// ─── Shared CSS (WTP Design System — matches generate-dm-materials.mjs) ─
const sharedCSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }

  :root {
    --bg: #FAFAFA;
    --bg-card: #FFFFFF;
    --border: #E0E0E0;
    --text: #0A0A0A;
    --text2: #444444;
    --meta: #767676;
    --font: "Inter", -apple-system, sans-serif;
    --serif: "Playfair Display", Georgia, serif;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font);
    font-size: 10.5px;
    line-height: 1.55;
    padding: 18mm 16mm;
    min-height: 100vh;
  }

  /* HERO */
  .hero {
    border-bottom: 1px solid var(--border);
    padding-bottom: 14px;
    margin-bottom: 22px;
  }
  .hero-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  .brand {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text);
    font-weight: 600;
  }
  .brand-tagline {
    font-size: 8px;
    color: var(--meta);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 2px;
  }
  .keyword-pill {
    display: inline-block;
    font-size: 8.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 100px;
    color: #FFFFFF;
  }
  .accent-bar {
    width: 48px;
    height: 3px;
    border-radius: 2px;
    margin-bottom: 10px;
  }
  h1.hero-title {
    font-family: var(--serif);
    font-size: 26px;
    line-height: 1.15;
    font-weight: 400;
    letter-spacing: -0.015em;
    margin-bottom: 7px;
    max-width: 540px;
  }
  .hero-sub {
    font-size: 11.5px;
    color: var(--text2);
    line-height: 1.5;
    max-width: 560px;
  }

  /* ITEMS */
  .items {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .item {
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
  }
  .item:last-child {
    border-bottom: none;
  }
  .item-header {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 6px;
  }
  .item-num {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    min-width: 22px;
    flex-shrink: 0;
  }
  .item-title {
    font-family: var(--serif);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    color: var(--text);
  }
  .item-body {
    margin-left: 32px;
    font-size: 10.5px;
    line-height: 1.6;
    color: var(--text2);
  }

  /* PRECHECK special: check/mistake/prepare */
  .item-detail {
    margin-left: 32px;
    margin-top: 4px;
    font-size: 10px;
    line-height: 1.55;
    color: var(--text2);
  }
  .item-detail .label {
    font-weight: 600;
    color: var(--text);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 6px;
    margin-bottom: 1px;
  }
  .item-detail .label:first-child {
    margin-top: 0;
  }

  /* CTA block */
  .cta-block {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    margin-top: 22px;
    page-break-inside: avoid;
  }
  .cta-block p {
    margin: 0;
    color: var(--text2);
    font-size: 10.5px;
    line-height: 1.55;
  }

  /* FOOTER */
  .footer {
    border-top: 1px solid var(--border);
    padding-top: 10px;
    margin-top: 28px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 8.5px;
    color: var(--meta);
  }
  .footer-col { flex: 1; }
  .footer-col.right { text-align: right; }
  .footer-label {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 7.5px;
    color: var(--meta);
    margin-bottom: 2px;
  }
  .footer-value { font-size: 9px; color: var(--text); font-weight: 500; }

  .disclaimer {
    margin-top: 14px;
    font-size: 8px;
    color: var(--meta);
    line-height: 1.5;
    text-align: center;
  }

  @media print {
    body { font-size: 10.5px; }
    .item { page-break-inside: avoid; }
    .cta-block { page-break-inside: avoid; }
  }
`;

// ─── Render item body (standard or PRECHECK format) ───────────
function renderItemBody(item) {
  if (item.check) {
    // PRECHECK format: check / mistake / prepare
    return `
      <div class="item-detail">
        <div class="label">What banks check</div>
        <div>${item.check}</div>
        <div class="label">Common mistake</div>
        <div>${item.mistake}</div>
        <div class="label">How to prepare</div>
        <div>${item.prepare}</div>
      </div>`;
  }
  return `<div class="item-body">${item.body}</div>`;
}

// ─── Build HTML for a single document ─────────────────────────
function buildHTML(doc) {
  const itemsHTML = doc.items
    .map(
      (item) => `
    <div class="item">
      <div class="item-header">
        <span class="item-num" style="color: ${doc.accent}">${item.num}</span>
        <span class="item-title">${item.title}</span>
      </div>
      ${renderItemBody(item)}
    </div>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>WTP · ${doc.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet">
  <style>${sharedCSS}</style>
  <style>
    .keyword-pill { background: ${doc.accent}; }
    .accent-bar { background: ${doc.accent}; }
    .cta-block { border-left: 3px solid ${doc.accent}; }
  </style>
</head>
<body>

<div class="hero">
  <div class="hero-top">
    <div>
      <div class="brand">WTP Brokers</div>
      <div class="brand-tagline">Since 2019 · 350+ clients · Banking-First</div>
    </div>
    <div class="keyword-pill">${doc.id}</div>
  </div>
  <div class="accent-bar"></div>
  <h1 class="hero-title">${doc.title}</h1>
  <div class="hero-sub">${doc.subtitle}</div>
</div>

<div class="items">
${itemsHTML}
</div>

<div class="cta-block">
  <p>${doc.cta}</p>
</div>

<div class="footer">
  <div class="footer-col">
    <div class="footer-label">Brand</div>
    <div class="footer-value">WTP Brokers · Dubai, UAE</div>
  </div>
  <div class="footer-col" style="text-align:center">
    <div class="footer-label">Contact</div>
    <div class="footer-value">hello@wtpbrokers.com</div>
  </div>
  <div class="footer-col right">
    <div class="footer-label">Reference</div>
    <div class="footer-value">WTP-LI-${doc.id}-v1</div>
  </div>
</div>

<div class="disclaimer">This material is for informational purposes only and does not constitute legal, tax, or financial advice.</div>

</body>
</html>`;
}

// ─── Main ─────────────────────────────────────────────────────
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\nGenerating ${docs.length} WTP LinkedIn DM materials...`);
  console.log(`Output: ${outDir}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const doc of docs) {
    const html = buildHTML(doc);
    const pdfPath = path.join(outDir, `WTP-LI-${doc.id}-v1.pdf`);
    const pngPath = path.join(outDir, `WTP-LI-${doc.id}-v1-preview.png`);

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await page.setViewport({ width: 794, height: 1123 });
    await page.screenshot({ path: pngPath, fullPage: false });

    await page.close();

    const pdfStats = fs.statSync(pdfPath);
    console.log(`  ✅ ${doc.id.padEnd(12)} ${Math.round(pdfStats.size / 1024)}KB`);
    console.log(`     ${pdfPath}`);
  }

  await browser.close();

  // Copy to Desktop for quick delivery
  const desktopDir = path.join(process.env.HOME, 'Desktop', 'WTP-DM-materials');
  fs.mkdirSync(desktopDir, { recursive: true });
  for (const doc of docs) {
    const src = path.join(outDir, `WTP-LI-${doc.id}-v1.pdf`);
    const dst = path.join(desktopDir, `WTP-LI-${doc.id}-v1.pdf`);
    fs.copyFileSync(src, dst);
  }
  console.log(`\n✅ All PDFs also copied to: ${desktopDir}`);
})();
