#!/usr/bin/env node
/**
 * WTP Carousels V3 — Premium editorial (Monocle / Cabana / Apartamento HNWI aesthetic)
 * Brand: cream (#F5F3EE) + Playfair (display + italic) + Inter + restrained gold
 * Differences vs V1:
 *  - Display headlines 110-130px (cover) — magazine cover scale
 *  - Roman numeral indices (I, II, III...)
 *  - Asymmetric per-slide layouts (cover, jurisdiction card, CTA all distinct)
 *  - Hairline rules (1px gold) instead of 3-4px chunky
 *  - Two-tier typography: serif italic for emotion + sans for data
 *  - Footer: subtle hairline + restrained brand wordmark
 *  - Cover with editorial "deck-and-dropline" (issue-like)
 */

import puppeteer from 'puppeteer';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIST = '/Users/konstantin/Desktop/WTP-Carousels-V3-Premium';
const SIZE = 1080;

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });

const b = {
  bg: '#F2EFE8',          // slightly cooler cream than V1
  bgAccent: '#EAE5D9',    // darker tone for CTA / cover variations
  ink: '#15201A',         // deeper forest-ink instead of pure dark
  inkSoft: '#3D453F',
  inkDim: '#7A8079',
  gold: '#B19763',        // more muted, less yellow
  goldDeep: '#8A7549',    // for italic accent
  hair: 'rgba(21,32,26,0.15)',
};

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{margin:0;padding:0;background:#fff}

.s {
  width:${SIZE}px; height:${SIZE}px;
  background:${b.bg};
  color:${b.ink};
  font-family:'Inter',sans-serif;
  position:relative;
  page-break-after:always;
  overflow:hidden;
}
.s:last-child{page-break-after:auto}

/* ── Cover layout: full-bleed editorial ── */
.s-cover {
  background:${b.bg};
  padding:0;
  display:grid;
  grid-template-rows: 1fr auto;
}
.s-cover .cover-main {
  padding:120px 96px 60px 96px;
  display:flex; flex-direction:column;
  justify-content:flex-end;
}
.s-cover .issue-label {
  font-family:'Inter',sans-serif;
  font-size:13px;
  font-weight:600;
  letter-spacing:0.32em;
  text-transform:uppercase;
  color:${b.goldDeep};
  margin-bottom:24px;
  display:flex;
  align-items:center;
  gap:18px;
}
.s-cover .issue-label::after {
  content:'';
  flex:1;
  height:1px;
  background:${b.hair};
}
.s-cover h1 {
  font-family:'Playfair Display',serif;
  font-weight:500;
  font-size:120px;
  line-height:0.96;
  letter-spacing:-0.025em;
  color:${b.ink};
  max-width:920px;
}
.s-cover h1 em {
  font-style:italic;
  font-weight:500;
  color:${b.goldDeep};
}
.s-cover .deck {
  margin-top:40px;
  font-family:'Cormorant Garamond',serif;
  font-style:italic;
  font-weight:400;
  font-size:32px;
  line-height:1.4;
  color:${b.inkSoft};
  max-width:760px;
}
.s-cover .cover-footer {
  border-top:1px solid ${b.hair};
  padding:32px 96px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.s-cover .wordmark {
  font-family:'Playfair Display',serif;
  font-weight:600;
  font-size:22px;
  letter-spacing:0.04em;
  color:${b.ink};
}
.s-cover .wordmark em { font-style:italic; font-weight:500; color:${b.goldDeep}; }
.s-cover .meta {
  font-family:'Inter',sans-serif;
  font-size:13px;
  letter-spacing:0.24em;
  text-transform:uppercase;
  color:${b.inkDim};
}

/* ── Jurisdiction / Rung slide: asymmetric two-tier ── */
.s-card {
  padding:120px 96px 0 96px;
}
.s-card .index-block {
  display:flex;
  align-items:baseline;
  gap:32px;
  margin-bottom:48px;
}
.s-card .roman {
  font-family:'Playfair Display',serif;
  font-style:italic;
  font-weight:600;
  font-size:96px;
  line-height:1;
  color:${b.goldDeep};
}
.s-card .index-rule {
  flex:1;
  height:1px;
  background:${b.hair};
  align-self:center;
  margin-top:8px;
}
.s-card .index-label {
  font-family:'Inter',sans-serif;
  font-size:14px;
  font-weight:600;
  letter-spacing:0.28em;
  text-transform:uppercase;
  color:${b.inkDim};
}
.s-card h2 {
  font-family:'Playfair Display',serif;
  font-weight:500;
  font-size:78px;
  line-height:1.05;
  letter-spacing:-0.012em;
  color:${b.ink};
  max-width:880px;
  margin-bottom:36px;
}
.s-card h2 em { font-style:italic; color:${b.goldDeep}; }
.s-card .deck {
  font-family:'Cormorant Garamond',serif;
  font-style:italic;
  font-weight:400;
  font-size:30px;
  line-height:1.5;
  color:${b.inkSoft};
  max-width:780px;
}

/* ── CTA slide: centered, restrained ── */
.s-cta {
  background:${b.bgAccent};
  padding:0;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
}
.s-cta .cta-mark {
  font-family:'Inter',sans-serif;
  font-size:13px;
  font-weight:600;
  letter-spacing:0.32em;
  text-transform:uppercase;
  color:${b.goldDeep};
  margin-bottom:48px;
}
.s-cta h2 {
  font-family:'Playfair Display',serif;
  font-style:italic;
  font-weight:500;
  font-size:82px;
  line-height:1.1;
  color:${b.ink};
  max-width:820px;
  padding:0 96px;
}
.s-cta h2 .key {
  font-style:normal;
  font-weight:600;
  color:${b.goldDeep};
}
.s-cta .cta-divider {
  width:48px;
  height:1px;
  background:${b.gold};
  margin:56px auto;
}
.s-cta .cta-action {
  font-family:'Inter',sans-serif;
  font-weight:600;
  font-size:18px;
  letter-spacing:0.28em;
  text-transform:uppercase;
  color:${b.inkSoft};
}
.s-cta .cta-keyword {
  margin-top:20px;
  font-family:'Playfair Display',serif;
  font-style:italic;
  font-weight:700;
  font-size:64px;
  letter-spacing:0.02em;
  color:${b.ink};
}

/* ── Universal footer (non-cover, non-cta) ── */
.s-card .footer {
  position:absolute;
  bottom:60px; left:96px; right:96px;
  border-top:1px solid ${b.hair};
  padding-top:24px;
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  font-family:'Inter',sans-serif;
  font-size:13px;
  letter-spacing:0.16em;
  text-transform:uppercase;
  color:${b.inkDim};
}
.s-card .footer .wordmark {
  font-family:'Playfair Display',serif;
  font-style:italic;
  font-weight:600;
  font-size:18px;
  text-transform:none;
  letter-spacing:0.02em;
  color:${b.ink};
}
.s-card .footer .wordmark .dot { color:${b.goldDeep}; }
`;

function coverHTML(slide) {
  return `<div class="s s-cover">
    <div class="cover-main">
      <div class="issue-label">Vol. 01 · 2026</div>
      <h1>${slide.title}</h1>
      ${slide.deck ? `<div class="deck">${slide.deck}</div>` : ''}
    </div>
    <div class="cover-footer">
      <div class="wordmark">W <em>·</em> T <em>·</em> P</div>
      <div class="meta">${slide.serial || 'A Banking-First Series'}</div>
    </div>
  </div>`;
}

function cardHTML(slide, idx, total) {
  return `<div class="s s-card">
    <div class="index-block">
      <div class="roman">${ROMAN[idx + 1] || ''}</div>
      <div class="index-rule"></div>
      <div class="index-label">${slide.label || ''}</div>
    </div>
    <h2>${slide.title}</h2>
    ${slide.deck ? `<div class="deck">${slide.deck}</div>` : ''}
    <div class="footer">
      <div class="wordmark">WTP<span class="dot"> · </span><span style="font-weight:400;">Banking-First</span></div>
      <div>${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</div>
    </div>
  </div>`;
}

function ctaHTML(slide) {
  return `<div class="s s-cta">
    <div class="cta-mark">${slide.preamble || 'Continue the read'}</div>
    <h2>${slide.title}</h2>
    <div class="cta-divider"></div>
    <div class="cta-action">${slide.action || 'Reply with the keyword'}</div>
    <div class="cta-keyword">${slide.keyword}</div>
  </div>`;
}

const CAR1 = {
  name: 'CAR-1-MATRIX',
  total: 6,
  slides: [
    {
      kind: 'cover',
      title: 'Four origins. Four <em>exit tails</em>.',
      deck: 'The 4-jurisdiction tax-residency reset map every HNWI books a Dubai call to begin — and usually opens at the wrong end.',
      serial: 'A Cross-Border Reset Map',
    },
    {
      kind: 'card',
      label: 'United Kingdom',
      title: 'Non-Dom regime ended <em>April 2025</em>.',
      deck: 'A ten-year inheritance tax tail now follows the leaver — irrespective of UAE residency.',
    },
    {
      kind: 'card',
      label: 'Germany',
      title: '<em>Wegzugsteuer</em> triggers on exit.',
      deck: 'Unrealised gain on substantial shareholdings is treated as realised. A seven-year residency tail keeps the file open under §6 AStG.',
    },
    {
      kind: 'card',
      label: 'Netherlands',
      title: 'Box 3 transitional regime <em>still active</em>.',
      deck: 'A ten-year inheritance tail attaches to the person — not to where the person lives.',
    },
    {
      kind: 'card',
      label: 'Russia',
      title: 'The 183-day rule plus active <em>currency control</em>.',
      deck: 'Outbound flows sequenced before the residency reset. The order matters more than the move.',
    },
    {
      kind: 'cta',
      preamble: 'The Dubai story starts at home',
      title: 'Reply for the full <span class="key">4-jurisdiction reset</span>.',
      action: 'Direct message',
      keyword: 'MATRIX',
    },
  ],
};

const CAR2 = {
  name: 'CAR-2-LADDER',
  total: 8,
  slides: [
    {
      kind: 'cover',
      title: 'Substance is a <em>ladder</em>. Seven rungs.',
      deck: 'How UAE banks read your file at CT2026 enforcement — and which bank picks up at which rung.',
      serial: 'A Substance-by-Tier Map',
    },
    { kind: 'card', label: 'Rung One', title: '<em>Virtual office.</em> Address only.', deck: 'The bank will ask one more question. Most accounts at this rung do not survive year one.' },
    { kind: 'card', label: 'Rung Two', title: '<em>Flex desk.</em> Shared. Files open.', deck: 'Most retail bank accounts stop here. Tier-2 banking begins reluctantly.' },
    { kind: 'card', label: 'Rung Three', title: 'Dedicated desk plus <em>one local hire</em>.', deck: 'Tier-2 banks become workable. The conversation shifts from product to relationship.' },
    { kind: 'card', label: 'Rung Four', title: 'Operational office. <em>Payroll runs.</em>', deck: 'The corporate banking conversation starts here. Substance becomes legible.' },
    { kind: 'card', label: 'Rung Five', title: '<em>Substantive presence.</em> Multiple hires.', deck: 'Real revenue. Private banking opens. The relationship manager begins to call.' },
    { kind: 'card', label: 'Rung Six', title: 'Fully resident principal. The file becomes <em>institutional</em>.', deck: 'CT2026 ready. The bank now reads the file the way the FTA does.' },
    {
      kind: 'cta',
      preamble: 'Rung Seven — Family Office',
      title: 'Governance, people, and <span class="key">capital deployment</span> on one ladder.',
      action: 'Direct message',
      keyword: 'LADDER',
    },
  ],
};

async function renderCarousel(carousel, browser) {
  const slidesHTML = carousel.slides.map((s, i) => {
    if (s.kind === 'cover') return coverHTML(s);
    if (s.kind === 'cta') return ctaHTML(s);
    return cardHTML(s, i, carousel.total);
  }).join('\n');

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${slidesHTML}</body></html>`;
  writeFileSync(join(DIST, `${carousel.name}.html`), html);

  const page = await browser.newPage();
  await page.setViewport({ width: SIZE, height: SIZE, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1800));

  for (let i = 0; i < carousel.slides.length; i++) {
    const el = (await page.$$('.s'))[i];
    const out = join(DIST, `${carousel.name}-slide-${String(i + 1).padStart(2, '0')}.png`);
    await el.screenshot({ path: out });
    console.log(`✓ ${out}`);
  }

  await page.pdf({
    path: join(DIST, `${carousel.name}.pdf`),
    width: `${SIZE}px`,
    height: `${SIZE}px`,
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  console.log(`✓ ${carousel.name}.pdf`);

  await page.close();
}

const browser = await puppeteer.launch({ headless: 'new' });
await renderCarousel(CAR1, browser);
await renderCarousel(CAR2, browser);
await browser.close();
console.log(`\nDone → ${DIST}`);
