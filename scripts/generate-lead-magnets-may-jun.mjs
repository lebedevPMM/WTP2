// Generate 18 WTP LinkedIn lead-magnet PDFs for May-Jun 2026 SHIP v4 campaign.
// Data: ./lead-magnets-data-may-jun.mjs
// Design system reused from generate-linkedin-dm-materials.mjs (Inter + Playfair, accent per doc).
// Output:
//   sync/WTP2/dist/dm-materials-may/WTP-LM-{id}-v1.pdf + preview.png
//   ~/Desktop/WTP-DM-materials-May-Jun-2026/WTP-LM-{id}-v1.pdf  (delivery folder)

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { docs } from './lead-magnets-data-may-jun.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'dist', 'dm-materials-may-jun-2026');

// ─── Shared CSS (WTP Design System) ───────────────────────────
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

  .items {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .item {
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
    page-break-inside: avoid;
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

// ─── Render item body (standard or PRECHECK 3-section) ────────
function renderItemBody(item) {
  if (item.check) {
    return `
      <div class="item-detail">
        <div class="label">What we check</div>
        <div>${item.check}</div>
        <div class="label">Common mistake</div>
        <div>${item.mistake}</div>
        <div class="label">How to prepare</div>
        <div>${item.prepare}</div>
      </div>`;
  }
  // Body may contain → arrows; convert single newlines to <br> for list-like content
  const bodyHtml = item.body.replace(/\n/g, '<br>');
  return `<div class="item-body">${bodyHtml}</div>`;
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
    <div class="footer-value">hello@wtpbrokers.com · wtp.ae</div>
  </div>
  <div class="footer-col right">
    <div class="footer-label">Reference</div>
    <div class="footer-value">WTP-LM-${doc.id}-v1</div>
  </div>
</div>

<div class="disclaimer">This material is for informational purposes only and does not constitute legal, tax, or financial advice.</div>

</body>
</html>`;
}

// ─── Main ─────────────────────────────────────────────────────
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\nGenerating ${docs.length} WTP lead-magnet PDFs (May-Jun 2026 SHIP v4 campaign)...`);
  console.log(`Output: ${outDir}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const doc of docs) {
    const html = buildHTML(doc);
    const safeId = doc.id.replace(/[^A-Z0-9-]/gi, '_');
    const pdfPath = path.join(outDir, `WTP-LM-${safeId}-v1.pdf`);
    const pngPath = path.join(outDir, `WTP-LM-${safeId}-v1-preview.png`);

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
    console.log(`  ${doc.id.padEnd(14)} ${String(Math.round(pdfStats.size / 1024)).padStart(4)} KB  ${doc.items.length} items  ${doc.title}`);
  }

  await browser.close();

  // Copy to Desktop for delivery
  const desktopDir = path.join(process.env.HOME, 'Desktop', 'WTP-DM-materials-May-Jun-2026');
  fs.mkdirSync(desktopDir, { recursive: true });
  for (const doc of docs) {
    const safeId = doc.id.replace(/[^A-Z0-9-]/gi, '_');
    const src = path.join(outDir, `WTP-LM-${safeId}-v1.pdf`);
    const dst = path.join(desktopDir, `WTP-LM-${safeId}-v1.pdf`);
    fs.copyFileSync(src, dst);
  }
  console.log(`\nAll ${docs.length} PDFs copied to: ${desktopDir}`);
})();
