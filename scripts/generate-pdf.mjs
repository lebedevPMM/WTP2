import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>
  @page {
    size: A4;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }

  :root {
    /* Light Theme Variables matching WTP 2 */
    --bg: #FAFAFA;
    --bg-card: #FFFFFF;
    --border: #E0E0E0;
    --text: #0A0A0A;
    --text2: #666666;
    --meta: #999999;
    
    --accent-magma: linear-gradient(135deg, #ff4d4d, #f9cb28);
    --accent-gold: linear-gradient(135deg, #d4af37, #f2eecb);
    --accent-teal: linear-gradient(135deg, #004e92, #000428);
    --accent-nebula: linear-gradient(135deg, #8e2de2, #4a00e0);

    --font: "Inter", sans-serif;
    --mono: "SF Mono", "Consolas", "Monaco", monospace;
    --serif: "Playfair Display", serif;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font);
    width: 210mm;
    min-height: 297mm;
    padding: 12mm 16mm; /* Slightly tighter padding to fit everything */
    font-size: 9px;
    line-height: 1.4;
  }

  /* ---- HEADER ---- */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }

  .header-left h1 {
    font-size: 24px;
    font-family: var(--serif);
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 6px;
    color: var(--text);
    max-width: 450px;
  }

  .header-left p {
    font-size: 10px;
    color: var(--text2);
    max-width: 400px;
    line-height: 1.4;
  }

  .header-right {
    text-align: right;
  }

  .tag {
    font-family: var(--font);
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--meta);
    margin-bottom: 8px;
    display: block;
  }

  .cta {
    display: inline-block;
    background: var(--text);
    color: var(--bg); 
    font-size: 9px;
    font-weight: 500;
    padding: 6px 16px;
    border-radius: 100px;
  }

  /* ---- SECTIONS ---- */
  .section {
    margin-bottom: 16px;
  }

  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .section-head h2 {
    font-size: 14px;
    font-family: var(--serif);
    font-weight: 400;
    color: var(--text);
  }

  .section-head .label {
    font-family: var(--font);
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--meta);
  }

  /* ---- PARTNER BENEFITS (Grid 2) ---- */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px;
    position: relative;
    overflow: hidden;
  }
  
  .card h4 {
    font-family: var(--serif);
    font-size: 12px;
    margin-bottom: 4px;
    color: var(--text);
    font-weight: 400;
  }

  .card p {
    font-size: 8px;
    color: var(--text2);
    line-height: 1.4;
  }

  /* Accents */
  .card.accent-1 { border-top: 2px solid #ff4d4d; }
  .card.accent-2 { border-top: 2px solid #d4af37; }
  .card.accent-3 { border-top: 2px solid #004e92; }
  .card.accent-4 { border-top: 2px solid #8e2de2; }

  /* ---- PROCESS (Grid 4) ---- */
  .grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .process-step {
    padding-left: 12px;
    border-left: 1px solid var(--border);
    position: relative;
  }

  .process-step::before {
    content: '';
    position: absolute;
    left: -2.5px;
    top: 6px; /* align with pill? */
    width: 4px;
    height: 4px;
    background: var(--meta);
    border-radius: 50%;
  }

  .process-step .pill {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 100px;
    font-size: 7px;
    border: 1px solid var(--border);
    margin-bottom: 6px;
    color: var(--text2);
     background: var(--bg-card);
  }

  .process-step h3 {
    font-size: 10px;
    font-weight: 500;
    margin-bottom: 3px;
    color: var(--text);
  }

  .process-step p {
    font-size: 7.5px;
    color: var(--text2);
    line-height: 1.3;
  }

  /* ---- RISK POLICY (Rows) ---- */
  .risk-table {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border);
  }

  .risk-row {
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
    align-items: baseline;
  }

  .risk-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--serif);
    font-size: 11px;
    color: var(--text);
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  .dot.green { background-color: #4CAF50; box-shadow: 0 0 4px rgba(76,175,80,0.4); }
  .dot.yellow { background-color: #FFC107; box-shadow: 0 0 4px rgba(255,193,7,0.4); }
  .dot.red { background-color: #F44336; box-shadow: 0 0 4px rgba(244,67,54,0.4); }

  .risk-row p {
    font-size: 8.5px;
    color: var(--text2);
  }

  /* ---- PRODUCT LINES (Grid 4) ---- */
  .product-card {
    background: #f5f5f5;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    aspect-ratio: 3/4; /* Maintain shape */
  }

  .product-bg {
    position: absolute;
    inset: 0;
    opacity: 0.3;
    z-index: 0;
  }

  .product-content {
    position: relative;
    z-index: 1;
  }

  .product-card .pill {
    font-size: 6px;
    padding: 2px 4px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 100px;
    color: rgba(0,0,0,0.7);
    display: inline-block;
    margin-bottom: 4px;
  }

  .product-card h4 {
    font-family: var(--serif);
    font-size: 12px;
    margin-bottom: 4px;
    color: #000;
    font-weight: 400;
  }

  .product-card p {
    font-size: 7px;
    color: rgba(0,0,0,0.8);
    margin-bottom: 6px;
    line-height: 1.2;
  }

  .product-card ul {
    list-style: none;
  }
  .product-card li {
    font-size: 6.5px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 2px;
  }

  /* ---- FOOTER ---- */
  .footer {
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
  }

  .footer-col {
    flex: 1;
  }

  .footer-label {
    font-size: 7px;
    color: var(--meta);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 2px;
  }

  .footer-value {
    font-size: 9px;
    color: var(--text);
  }

</style>
</head>
<body>

<!-- HEADER -->
<div class="header">
  <div class="header-left">
    <div class="tag" style="margin-bottom: 8px;">For Brokers & Advisors</div>
    <h1>A reliable UAE execution partner built<br>for bankability and compliance.</h1>
    <p style="margin-top: 8px;">WTP is an on-the-ground operator taking clients from intent to outcome safely, without reputational risk.</p>
  </div>
  <div class="header-right">
    <div class="cta">Request Partner Kit</div>
  </div>
</div>

<!-- BENEFITS -->
<div class="section">
  <div class="section-head">
    <h2>Partner Benefits</h2>
    <span class="label">Why WTP</span>
  </div>
  <div class="grid-2">
    <div class="card accent-1">
      <h4>Ownership Protection</h4>
      <p>We never bypass the partner, and we don't sell directly around you. Your client relationships remain yours.</p>
    </div>
    <div class="card accent-2">
      <h4>Transparency</h4>
      <p>Clear status updates, scope and change control, and defined checkpoints throughout the process.</p>
    </div>
    <div class="card accent-3">
      <h4>Control</h4>
      <p>Decisions are made up-front: whether we can proceed, and under exactly what conditions.</p>
    </div>
    <div class="card accent-4">
       <h4>Quality</h4>
       <p>Optimized for banks and regulators, not "speed at any cost." We prioritize long-term stability.</p>
    </div>
  </div>
</div>

<!-- PROCESS -->
<div class="section">
  <div class="section-head">
    <h2>Delivery Process</h2>
    <span class="label">How we work</span>
  </div>
  <div class="grid-4">
    <div class="process-step">
      <span class="pill">01</span>
      <h3>Pre-screen</h3>
      <p>Documents, KYC/AML, Source of Funds, and risk map before any action.</p>
    </div>
    <div class="process-step">
      <span class="pill">02</span>
      <h3>Banking Scenario</h3>
      <p>Bank routing and requirements selection. No "guaranteed account" promises.</p>
    </div>
    <div class="process-step">
      <span class="pill">03</span>
      <h3>Delivery</h3>
      <p>Company setup, accounts, visas, and operations support within agreed scenario.</p>
    </div>
    <div class="process-step">
      <span class="pill">04</span>
      <h3>Ongoing</h3>
      <p>Retainer support to ensure stability and maximize LTV.</p>
    </div>
  </div>
</div>

<!-- RISK POLICY -->
<div class="section">
  <div class="section-head">
    <h2>Risk Policy</h2>
    <span class="label">Gatekeeping</span>
  </div>
  <div class="risk-table">
    <div class="risk-row">
      <div class="risk-status"><span class="dot green"></span>We Accept</div>
      <p>Transparent business rationale, document readiness, no critical red flags, realistic expectations.</p>
    </div>
    <div class="risk-row">
      <div class="risk-status"><span class="dot yellow"></span>Accept w/ Conditions</div>
      <p>Higher risk, complex structure, non-standard operations. Requires enhanced control.</p>
    </div>
    <div class="risk-row" style="border-bottom: none;">
      <div class="risk-status"><span class="dot red"></span>We Decline</div>
      <p>Sanctions/toxic exposure, missing documents, "do it with no questions asked", pressure to break rules.</p>
    </div>
  </div>
</div>

<!-- PRODUCT LINES -->
<div class="section">
  <div class="section-head">
    <h2>Product Lines</h2>
    <span class="label">Scope</span>
  </div>
  <div class="grid-4">
    <div class="product-card">
      <div class="product-bg" style="background: var(--accent-magma);"></div>
      <div class="product-content">
        <span class="pill">Essential</span>
        <h4>Banking</h4>
        <p>Personal & corporate accounts, payment support.</p>
        <!-- Features removed for Light Theme Fidelity -->
      </div>
    </div>
    <div class="product-card">
      <div class="product-bg" style="background: var(--accent-gold);"></div>
      <div class="product-content">
        <span class="pill">Foundation</span>
        <h4>Business Setup</h4>
        <p>Registration, licensing, tax & operating setup.</p>
        <!-- Features removed for Light Theme Fidelity -->
      </div>
    </div>
     <div class="product-card">
      <div class="product-bg" style="background: var(--accent-teal);"></div>
      <div class="product-content">
        <span class="pill">Immigration</span>
        <h4>Residency</h4>
        <p>Visas & Emirates ID integrated with tax logic.</p>
        <!-- Features removed for Light Theme Fidelity -->
      </div>
    </div>
     <div class="product-card">
      <div class="product-bg" style="background: var(--accent-nebula);"></div>
      <div class="product-content">
        <span class="pill">Premium</span>
        <h4>Wealth</h4>
        <p>Real estate, wills, foundations, custody.</p>
        <!-- Features removed for Light Theme Fidelity -->
      </div>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div class="footer">
  <div class="footer-col">
    <div class="footer-label">Pilot Program</div>
    <div class="footer-value">partner-kit</div>
  </div>
  <div class="footer-col">
    <div class="footer-label">Contact</div>
    <div class="footer-value">email@wtp.uae</div>
  </div>
  <div class="footer-col">
    <div class="footer-label">Update</div>
    <div class="footer-value">New Banking Scenarios added</div>
  </div>
   <div class="footer-col" style="text-align: right;">
    <div class="footer-label">Office</div>
    <div class="footer-value">DIFC, Dubai, UAE</div>
  </div>
</div>

</body>
</html>`;

(async () => {
  const outputPath = path.join(__dirname, '..', 'public', 'WTP_One_Pager.pdf');
  const screenshotPath = path.join(__dirname, '..', 'public', 'WTP_One_Pager_preview.png');

  console.log('🚀 Generating PDF...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Load the print-optimized HTML directly
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Generate PDF — A4, no margins (handled in CSS)
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });

  console.log('✅ PDF saved:', outputPath);

  // ---- VERIFICATION: take a screenshot for visual QA ----
  await page.setViewport({ width: 794, height: 1123 }); // A4 at 96 DPI
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  console.log('📸 Preview screenshot saved:', screenshotPath);

  // ---- VERIFICATION: check for overflow / clipping issues ----
  const diagnostics = await page.evaluate(() => {
    const body = document.body;
    const bodyRect = body.getBoundingClientRect();
    const pageHeightMM = 297;
    const pagePaddingMM = 28; // 12+16mm padding
    const usableHeightMM = pageHeightMM - pagePaddingMM;
    const dpi = 96;
    const mmPerPx = 25.4 / dpi;
    const contentHeightMM = bodyRect.height * mmPerPx;

    const sections = Array.from(document.querySelectorAll('.section, .header, .footer'));
    const overflows = [];

    sections.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom > bodyRect.height) {
        const tag = el.className || el.tagName;
        overflows.push(tag + ' extends beyond body');
      }
    });

    // Check for overlapping siblings
    const overlaps = [];
    for (let i = 0; i < sections.length - 1; i++) {
      const a = sections[i].getBoundingClientRect();
      const b = sections[i + 1].getBoundingClientRect();
      if (a.bottom > b.top + 2) {
        overlaps.push(
          (sections[i].className || 'el') + ' overlaps with ' + (sections[i + 1].className || 'el')
        );
      }
    }

    return {
      contentHeightMM: Math.round(contentHeightMM),
      usableHeightMM,
      fitsOnOnePage: contentHeightMM <= pageHeightMM,
      overflows,
      overlaps,
      sectionCount: sections.length,
    };
  });

  console.log('');
  console.log('─── DESIGN VERIFICATION ───');
  console.log('Content height:', diagnostics.contentHeightMM + 'mm');
  console.log('Page usable area:', diagnostics.usableHeightMM + 'mm');
  console.log('Fits on one page:', diagnostics.fitsOnOnePage ? '✅ YES' : '❌ NO');
  console.log('Sections found:', diagnostics.sectionCount);

  if (diagnostics.overlaps.length > 0) {
    console.log('❌ OVERLAPPING ELEMENTS:');
    diagnostics.overlaps.forEach((o) => console.log('   •', o));
  } else {
    console.log('✅ No overlapping elements');
  }

  if (diagnostics.overflows.length > 0) {
    console.log('❌ OVERFLOWING ELEMENTS:');
    diagnostics.overflows.forEach((o) => console.log('   •', o));
  } else {
    console.log('✅ No overflowing elements');
  }

  console.log('───────────────────────────');

  await browser.close();

  if (!diagnostics.fitsOnOnePage || diagnostics.overlaps.length > 0 || diagnostics.overflows.length > 0) {
    console.log('');
    console.log('⚠️  Issues detected — review WTP_One_Pager_preview.png');
    process.exit(1);
  } else {
    console.log('');
    console.log('🎉 All checks passed. PDF is clean.');
  }
})();
