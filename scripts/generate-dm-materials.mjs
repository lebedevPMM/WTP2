// Generate 6 branded WTP DM materials from master markdown
// Source: sync/projects/WTP-mt37-dm-materials.md
// Output: dist/dm-materials/*.pdf + PNG previews

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcMd = path.join(__dirname, '..', '..', 'projects', 'WTP-mt37-dm-materials.md');
const outDir = path.join(__dirname, '..', 'dist', 'dm-materials');

// ─── Document metadata (ordered) ───────────────────────────────
const docs = [
  { id: 'CHECKLIST', accent: '#004e92', subtitle: 'For foreign buyers. Read before you sign anything.' },
  { id: 'HOTSPOTS',  accent: '#b8860b', subtitle: 'Stop chasing what\u2019s hot. Start tracking what\u2019s about to be.' },
  { id: 'COSTS',     accent: '#e74c3c', subtitle: 'The price tag isn\u2019t the price. Add 7\u201310% for the truth.' },
  { id: 'YIELD',     accent: '#8e2de2', subtitle: 'Every brochure promises 10%. Here\u2019s what you actually get.' },
  { id: 'UK',        accent: '#004e92', subtitle: 'The 200-year-old non-dom regime ended 6 April 2025.' },
  { id: 'OFFPLAN',   accent: '#e74c3c', subtitle: '70% of Dubai deals are off-plan. Most buyers skip due diligence.' },
];

// ─── Title map (extracted from markdown H1 sections) ───────────
const titleMap = {
  CHECKLIST: 'Before You Buy Property in Dubai',
  HOTSPOTS:  'Dubai + UAE Property Catalyst Watchlist',
  COSTS:     'The Real Cost of Buying Dubai Property',
  YIELD:     'Real Rental Yields in Dubai',
  UK:        'UK Exit Checklist',
  OFFPLAN:   'Off-Plan Due Diligence Checklist',
};

// ─── Split master markdown by H1 (# 1. ... # 6. ...) ────────────
function splitSections(md) {
  // Strip everything before "# 1." (the index) and after "## Production Notes"
  const startIdx = md.indexOf('\n# 1.');
  const endIdx = md.indexOf('## Production Notes');
  const body = md.slice(startIdx, endIdx === -1 ? md.length : endIdx);

  // Split on H1 sections
  const sections = [];
  const regex = /\n# (\d+)\.\s+([A-Z]+)\s+\u2014\s+([^\n]+)\n/g;
  const matches = [...body.matchAll(regex)];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const num = match[1];
    const keyword = match[2];
    const title = match[3];
    const start = match.index + match[0].length;
    const end = i < matches.length - 1 ? matches[i + 1].index : body.length;
    let content = body.slice(start, end).trim();

    // Strip trailing separators
    content = content.replace(/\n---\s*\n---\s*$/, '').replace(/\n---\s*$/, '').trim();

    // Strip the first leading **bold** subtitle line (it's shown in hero, not body)
    content = content.replace(/^\*\*[^*]+\*\*\s*\n+/, '').trim();

    sections.push({ num, keyword, title, content });
  }
  return sections;
}

// ─── Shared CSS (WTP Design System, adapted for multi-page docs) ─
const sharedCSS = `
  @page { size: A4; margin: 18mm 16mm 18mm 16mm; }
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
  }

  /* HERO */
  .hero {
    border-bottom: 1px solid var(--border);
    padding-bottom: 14px;
    margin-bottom: 18px;
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
  h1 {
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

  /* CONTENT */
  .content { font-size: 10.5px; color: var(--text); }
  .content p {
    margin: 0 0 9px 0;
    color: var(--text2);
    font-size: 10.5px;
    line-height: 1.55;
  }
  .content h1 {
    font-family: var(--serif);
    font-size: 17px;
    margin: 22px 0 8px;
    font-weight: 500;
    letter-spacing: -0.01em;
    page-break-after: avoid;
  }
  .content h2 {
    font-family: var(--serif);
    font-size: 14.5px;
    margin: 18px 0 7px;
    font-weight: 500;
    page-break-after: avoid;
    color: var(--text);
  }
  .content h3 {
    font-size: 11.5px;
    margin: 14px 0 5px;
    font-weight: 600;
    color: var(--text);
    text-transform: none;
    page-break-after: avoid;
  }
  .content h4 {
    font-size: 10.5px;
    margin: 10px 0 4px;
    font-weight: 600;
    color: var(--text);
  }
  .content ul, .content ol {
    margin: 4px 0 10px 18px;
    color: var(--text2);
  }
  .content li {
    margin-bottom: 3px;
    font-size: 10.5px;
    line-height: 1.5;
  }
  .content li input[type="checkbox"] {
    margin-right: 5px;
    transform: translateY(1px);
  }
  .content strong { color: var(--text); font-weight: 600; }
  .content em { color: var(--text2); }

  /* Checkbox lists (replace markdown task syntax) */
  .content ul.task-list { list-style: none; margin-left: 0; }
  .content ul.task-list li {
    position: relative;
    padding-left: 18px;
    margin-bottom: 5px;
  }
  .content ul.task-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 3px;
    width: 11px;
    height: 11px;
    border: 1.5px solid var(--border);
    border-radius: 2px;
    background: #FFFFFF;
  }

  /* Tables */
  .content table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px;
    font-size: 9.5px;
    page-break-inside: avoid;
  }
  .content th {
    text-align: left;
    padding: 7px 9px;
    background: var(--bg-card);
    border-bottom: 1.5px solid var(--text);
    font-weight: 600;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text);
  }
  .content td {
    padding: 6px 9px;
    border-bottom: 1px solid var(--border);
    color: var(--text2);
    vertical-align: top;
  }
  .content tr:last-child td { border-bottom: none; }

  /* Code blocks / callouts (used for example calculations) */
  .content pre {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-left: 3px solid var(--text);
    border-radius: 4px;
    padding: 11px 14px;
    margin: 10px 0;
    font-family: "SF Mono", Menlo, Consolas, monospace;
    font-size: 9.5px;
    line-height: 1.55;
    color: var(--text);
    white-space: pre-wrap;
    page-break-inside: avoid;
  }
  .content code {
    font-family: "SF Mono", Menlo, Consolas, monospace;
    font-size: 9.5px;
    background: var(--bg-card);
    padding: 1px 4px;
    border-radius: 3px;
    border: 1px solid var(--border);
  }
  .content pre code {
    background: transparent;
    border: none;
    padding: 0;
  }

  /* Blockquote -> WTP callout */
  .content blockquote {
    border-left: 3px solid var(--text);
    padding: 4px 0 4px 12px;
    margin: 10px 0;
    color: var(--text2);
    font-style: normal;
  }

  /* HR as section separator */
  .content hr {
    border: none;
    border-top: 1px solid var(--border);
    margin: 18px 0;
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
  .cta-block strong { display: block; margin-bottom: 4px; color: var(--text); font-size: 11px; }
  .cta-block p { margin: 0; color: var(--text2); font-size: 10px; }

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

  /* Print-specific */
  @media print {
    body { font-size: 10.5px; }
    h1, h2, h3, h4 { page-break-after: avoid; }
    table, pre, .cta-block { page-break-inside: avoid; }
  }
`;

// ─── Render single document to HTML ─────────────────────────────
function buildHTML(doc, markdownContent) {
  const meta = docs.find((d) => d.id === doc.keyword);
  const accent = meta.accent;
  const subtitle = meta.subtitle;
  const title = titleMap[doc.keyword];

  // Strip the H1 from content body (it's the title, rendered in hero)
  let body = markdownContent;

  // Remove "## 1. Banking ..." style numeric prefixes — they're not needed inline
  // (keep them — they're navigation within document)

  // Extract soft CTA (final paragraph before footer) and remove it for separate rendering
  let ctaText = '';
  const ctaMatch = body.match(/\*\*Want ([^*]+)\*\*\s*\n([^\n]+)/);
  if (ctaMatch) {
    // Find last "**Want..." or "**Considering..." section
    const softCtaRegex = /\*\*(Want|Considering|Need)[^*]+\*\*\s*\n[^\n]+(?:\n\n\*\*Disclaimer[^*]+\*\*\s*[^\n]+)?/;
    const ctaBlockMatch = body.match(softCtaRegex);
    if (ctaBlockMatch) {
      ctaText = ctaBlockMatch[0];
      body = body.replace(ctaBlockMatch[0], '').trim();
      // Also remove trailing --- or blank
      body = body.replace(/\n---\s*$/, '').trim();
    }
  }

  // Convert markdown body → HTML
  marked.setOptions({ gfm: true, breaks: false });
  let contentHTML = marked.parse(body);

  // Replace "- [ ]" task lists with custom class
  contentHTML = contentHTML.replace(
    /<ul>\s*(<li>\[ \][\s\S]*?)<\/ul>/g,
    (m) => {
      const cleaned = m
        .replace('<ul>', '<ul class="task-list">')
        .replace(/<li>\[ \]\s*/g, '<li>');
      return cleaned;
    }
  );

  // Build CTA HTML
  let ctaHTML = '';
  if (ctaText) {
    const ctaParsed = marked.parse(ctaText);
    ctaHTML = `<div class="cta-block">${ctaParsed}</div>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>WTP · ${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet">
  <style>${sharedCSS}</style>
  <style>
    .keyword-pill { background: ${accent}; }
    .accent-bar { background: ${accent}; }
    .content blockquote { border-left-color: ${accent}; }
    .cta-block { border-left: 3px solid ${accent}; }
    .content pre { border-left-color: ${accent}; }
  </style>
</head>
<body>

<div class="hero">
  <div class="hero-top">
    <div>
      <div class="brand">WTP Brokers</div>
      <div class="brand-tagline">Since 2019 · 350+ clients · Banking-First</div>
    </div>
    <div class="keyword-pill">${doc.keyword}</div>
  </div>
  <div class="accent-bar"></div>
  <h1>${title}</h1>
  <div class="hero-sub">${subtitle}</div>
</div>

<div class="content">
${contentHTML}
</div>

${ctaHTML}

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
    <div class="footer-value">WTP-DM-${doc.keyword}-v1</div>
  </div>
</div>

</body>
</html>`;
}

// ─── Main ───────────────────────────────────────────────────────
(async () => {
  if (!fs.existsSync(srcMd)) {
    console.error(`Source markdown not found: ${srcMd}`);
    process.exit(1);
  }

  const md = fs.readFileSync(srcMd, 'utf-8');
  const sections = splitSections(md);

  if (sections.length === 0) {
    console.error('No sections found in markdown. Check the H1 format.');
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\nGenerating ${sections.length} WTP DM materials...`);
  console.log(`Output: ${outDir}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const section of sections) {
    const html = buildHTML(section, section.content);
    const pdfPath = path.join(outDir, `WTP-DM-${section.keyword}-v1.pdf`);
    const pngPath = path.join(outDir, `WTP-DM-${section.keyword}-v1-preview.png`);

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
    console.log(`  \u2705 ${section.keyword.padEnd(10)} ${Math.round(pdfStats.size / 1024)}KB`);
    console.log(`     ${pdfPath}`);
  }

  await browser.close();

  // Also copy to Desktop for quick delivery
  const desktopDir = path.join(process.env.HOME, 'Desktop', 'WTP-DM-materials');
  fs.mkdirSync(desktopDir, { recursive: true });
  for (const section of sections) {
    const src = path.join(outDir, `WTP-DM-${section.keyword}-v1.pdf`);
    const dst = path.join(desktopDir, `WTP-DM-${section.keyword}-v1.pdf`);
    fs.copyFileSync(src, dst);
  }
  console.log(`\n\u2705 All PDFs also copied to: ${desktopDir}`);
})();
