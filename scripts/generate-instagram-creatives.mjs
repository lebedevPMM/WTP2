#!/usr/bin/env node
/**
 * WTP2 Instagram Ad Creatives Generator — MT43
 * Generates static images + carousel frames for 3 campaigns: WILLS, VISA, AUDIT
 * Design: typography-only, no photography, MARS-safe
 * Brand: IBM Plex Serif + Inter + IBM Plex Mono, dark/cream variants
 *
 * Usage: node scripts/generate-instagram-creatives.mjs
 * Output: dist/instagram-creatives/{campaign}/
 */

import puppeteer from 'puppeteer';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist', 'instagram-creatives');

// ─── Design System ──────────────────────────────────────────────────
const c = {
  dark:   '#0B1220',
  cream:  '#F5F3EE',
  warmCream: '#F4F0E8',
  black:  '#0A0A0A',
  white:  '#FFFFFF',
  red:    '#8B0000',
  purple: '#554565',
  muted:  'rgba(255,255,255,0.55)',
  mutedDark: 'rgba(10,10,10,0.45)',
  rule:   'rgba(255,255,255,0.15)',
  ruleDark: 'rgba(10,10,10,0.12)',
};

// WTP logo SVG (simplified path — white version, will be color-swapped via CSS filter)
const WTP_MARK = `<svg class="wtp-mark" viewBox="0 0 10000 4000" xmlns="http://www.w3.org/2000/svg"><path d="M360 908.667C360 908.667 701.758 709.513 974.673 962.759C1247.59 1216 1208.25 1597.1 1235.29 1879.85C1262.34 2162.6 1395.11 2297.83 1559.84 2258.49C1724.57 2219.15 1751.62 1874.93 1822.92 1825.76C1822.92 1825.76 1867.18 2113.43 1965.53 2206.86C2063.87 2300.29 2297.45 2292.91 2403.17 1889.69C2501.52 1518.42 2329.41 1132.41 2508.9 741.476C2508.9 741.476 2521.19 773.439 2518.73 812.778C2518.73 812.778 2614.62 812.778 2690.84 810.32C2690.84 810.32 2703.13 584.12 2575.28 554.616C2447.43 525.111 2223.69 628.377 2176.97 1117.66C2152.39 1395.49 2216.31 1665.94 2186.81 1874.93C2157.3 2083.92 2076.17 2113.43 2034.37 2074.09C1948.31 1997.87 2058.96 1547.93 1776.21 1422.53C1776.21 1422.53 1808.17 1545.47 1741.78 1769.21C1675.4 1992.95 1631.14 2071.63 1559.84 2066.71C1488.54 2061.79 1468.87 1835.59 1461.49 1560.22C1454.12 1284.85 1372.98 876.704 1011.55 724.266C650.126 571.827 421.467 788.191 360 908.667Z" fill="currentColor"/><path d="M1636.06 1139.78C1636.06 1139.78 1864.72 1041.43 2152.38 1046.35C2152.38 1046.35 2149.92 945.546 2194.18 842.28C2194.18 842.28 1756.53 815.235 1636.06 1139.78Z" fill="currentColor"/><path d="M2511.35 842.277C2511.35 842.277 2486.77 891.451 2472.01 1036.51C2472.01 1036.51 2823.61 1046.35 3133.4 972.588C3443.2 898.827 3482.54 694.756 3482.54 694.756C3482.54 694.756 3320.26 854.571 2511.35 842.277Z" fill="currentColor"/></svg>`;

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

* { margin:0; padding:0; box-sizing:border-box; }

/* ── Base frame ── */
.frame {
  position: relative;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.frame-1x1 { width: 1080px; height: 1080px; }
.frame-4x5 { width: 1080px; height: 1350px; }
.frame-9x16 { width: 1080px; height: 1920px; }

/* ── Theme: dark ── */
.dark {
  background: ${c.dark};
  color: ${c.white};
}
.dark .wtp-mark { color: rgba(255,255,255,0.35); }
.dark .meta { color: ${c.muted}; }
.dark .rule { background: ${c.rule}; }
.dark .accent { color: ${c.red}; }

/* ── Theme: cream ── */
.cream {
  background: ${c.cream};
  color: ${c.black};
}
.cream .wtp-mark { color: rgba(10,10,10,0.2); }
.cream .meta { color: ${c.mutedDark}; }
.cream .rule { background: ${c.ruleDark}; }
.cream .accent { color: ${c.red}; }

/* ── Typography ── */
.headline {
  font-family: 'IBM Plex Serif', serif;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.02em;
}
.h-xl { font-size: 64px; }
.h-lg { font-size: 56px; }
.h-md { font-size: 48px; }
.h-sm { font-size: 40px; }

.subline {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.5;
  margin-top: 28px;
}

.meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.04em;
}

.cta-line {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-top: 40px;
}

/* ── Layout ── */
.pad { padding: 88px 80px; }
.pad-carousel { padding: 80px 72px; }
.content { flex: 1; display: flex; flex-direction: column; justify-content: center; }

/* ── WTP mark (corner) ── */
.wtp-mark {
  position: absolute;
  bottom: 36px;
  right: 40px;
  width: 80px;
  height: auto;
}

/* ── Decorative rule ── */
.rule {
  width: 56px;
  height: 3px;
  border-radius: 2px;
  margin: 32px 0;
}

/* ── Disclaimer ── */
.disclaimer {
  position: absolute;
  bottom: 36px;
  left: 80px;
  right: 140px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  line-height: 1.4;
  opacity: 0.35;
}

/* ── Carousel pagination ── */
.pagination {
  position: absolute;
  top: 40px;
  right: 72px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.4;
}

/* ── Carousel question number ── */
.q-num {
  font-family: 'IBM Plex Serif', serif;
  font-size: 120px;
  font-weight: 700;
  opacity: 0.08;
  position: absolute;
  top: 60px;
  left: 72px;
  line-height: 1;
}

/* ── Story centered layout ── */
.story-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}

/* ── Split layout (4:5) ── */
.split-top {
  font-family: 'IBM Plex Serif', serif;
  font-size: 44px;
  font-weight: 600;
  line-height: 1.2;
  padding-bottom: 48px;
  border-bottom: 1px solid ${c.rule};
  margin-bottom: 48px;
}
.split-bottom {
  font-family: 'IBM Plex Serif', serif;
  font-size: 44px;
  font-weight: 500;
  line-height: 1.2;
  opacity: 0.7;
}

/* ── Quote card ── */
.quote-mark {
  font-family: 'IBM Plex Serif', serif;
  font-size: 180px;
  line-height: 0.6;
  opacity: 0.12;
  margin-bottom: 16px;
}
.quote-text {
  font-family: 'IBM Plex Serif', serif;
  font-style: italic;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.35;
}
.quote-attr {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 18px;
  margin-top: 32px;
  opacity: 0.55;
}
`;

// ─── Creative Definitions ───────────────────────────────────────────

const creatives = [

  // ═══════════════════════════════════════════════════════════════════
  // CAMPAIGN 1: WILLS
  // ═══════════════════════════════════════════════════════════════════

  // W1 — Static 1:1, Hook P (Pain)
  {
    id: 'W1', campaign: 'wills', format: '1x1',
    theme: 'cream', // off-white bg, dark text
    html: `
      <div class="frame frame-1x1 cream pad">
        <div class="content">
          <div class="meta">WTP — CROSS-BORDER ESTATE DIAGNOSTIC</div>
          <div class="rule"></div>
          <div class="headline h-xl">Your UK will does not cover your Dubai apartment.</div>
          <div class="subline" style="opacity:0.55">Most we review don't.</div>
          <div class="cta-line">DM WILLS</div>
        </div>
        ${WTP_MARK}
      </div>
    `,
  },

  // W4 — Static 4:5, Hook F (Fear) — UK IHT fact card
  {
    id: 'W4', campaign: 'wills', format: '4x5',
    theme: 'dark',
    html: `
      <div class="frame frame-4x5 dark pad">
        <div class="content">
          <div class="meta">UK INHERITANCE TAX — APRIL 2025</div>
          <div class="rule"></div>
          <div class="headline h-lg">Worldwide assets captured after 10 of 20 years resident.</div>
          <div class="subline">Up to 10 years of exposure after you leave.</div>
          <div class="rule" style="margin-top:48px"></div>
          <div class="subline meta" style="margin-top:16px; font-size:18px;">Residence-based IHT replaces domicile test. Effective 6 April 2025.</div>
          <div class="cta-line">WTP DIAGNOSTIC — DM WILLS</div>
        </div>
        ${WTP_MARK}
        <div class="disclaimer">This material is for informational purposes only and does not constitute legal, tax, or financial advice.</div>
      </div>
    `,
  },

  // W5 — Story 9:16, Hook P — minimal
  {
    id: 'W5', campaign: 'wills', format: '9x16',
    theme: 'cream',
    html: `
      <div class="frame frame-9x16 cream pad">
        <div class="story-center">
          <div class="headline h-lg" style="text-align:center">Six questions.<br>One written map.<br>48 hours.</div>
          <div class="rule" style="margin:40px auto"></div>
          <div class="cta-line" style="opacity:0.6">DM WILLS</div>
        </div>
        ${WTP_MARK}
      </div>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════
  // CAMPAIGN 2: VISA
  // ═══════════════════════════════════════════════════════════════════

  // V1 — Static 1:1, Hook P (Pain)
  {
    id: 'V1', campaign: 'visa', format: '1x1',
    theme: 'cream',
    html: `
      <div class="frame frame-1x1 cream pad">
        <div class="content">
          <div class="meta">WTP — UAE GOLDEN VISA PATHWAY SNAPSHOT</div>
          <div class="rule"></div>
          <div class="headline h-xl">7 pathways.<br><span class="accent">6 brokers pushed you toward one.</span></div>
          <div class="rule" style="margin-top:44px"></div>
          <div class="subline meta" style="margin-top:8px">Pathway snapshot — DM VISA</div>
        </div>
        ${WTP_MARK}
      </div>
    `,
  },

  // V4 — Static 4:5, Hook P — quote card
  {
    id: 'V4', campaign: 'visa', format: '4x5',
    theme: 'cream',
    html: `
      <div class="frame frame-4x5 cream pad">
        <div class="content">
          <div class="quote-mark">\u201C</div>
          <div class="quote-text">The broker who finds you the fastest pathway is not the broker looking for the cleanest one.</div>
          <div class="quote-attr">\u2014 WTP, banking-first advisory</div>
          <div class="rule" style="margin-top:56px"></div>
          <div class="cta-line">DM VISA</div>
        </div>
        ${WTP_MARK}
      </div>
    `,
  },

  // V-UK — Static 4:5, UK-specific variant
  {
    id: 'V-UK', campaign: 'visa', format: '4x5',
    theme: 'dark',
    html: `
      <div class="frame frame-4x5 dark pad">
        <div class="content">
          <div class="meta">UK NON-DOM ABOLITION — 2025</div>
          <div class="rule"></div>
          <div class="headline h-lg">16,500 millionaires left the UK in 2025.</div>
          <div class="subline">Most picked the wrong Golden Visa pathway.</div>
          <div class="rule" style="margin-top:56px"></div>
          <div class="cta-line">DM VISA FOR A 24H SNAPSHOT</div>
        </div>
        ${WTP_MARK}
        <div class="disclaimer">This material is for informational purposes only and does not constitute legal, tax, or financial advice.</div>
      </div>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════
  // CAMPAIGN 3: AUDIT (TITLE)
  // ═══════════════════════════════════════════════════════════════════

  // A1 — Static 1:1, Hook F (Fear)
  {
    id: 'A1', campaign: 'audit', format: '1x1',
    theme: 'dark',
    html: `
      <div class="frame frame-1x1 dark pad">
        <div class="content">
          <div class="meta">WTP — UAE TITLE + STRUCTURE AUDIT</div>
          <div class="rule"></div>
          <div class="headline h-lg">Your 2023 Dubai holding company<br>may not pass<br>2025 substance rules.</div>
          <div class="cta-line" style="margin-top:52px">DM TITLE</div>
        </div>
        ${WTP_MARK}
      </div>
    `,
  },

  // A3 — Static 1:1, Hook O (Opportunity)
  {
    id: 'A3', campaign: 'audit', format: '1x1',
    theme: 'cream',
    html: `
      <div class="frame frame-1x1 cream pad">
        <div class="content">
          <div class="meta">WTP — BANKING-FIRST SECOND OPINION</div>
          <div class="rule"></div>
          <div class="headline h-xl">Your broker picked the vehicle.<br>We audit whether it survives.</div>
          <div class="rule" style="margin-top:44px"></div>
          <div class="subline meta" style="margin-top:8px">Written diagnostic. 48 hours. DM TITLE.</div>
        </div>
        ${WTP_MARK}
      </div>
    `,
  },

  // A4 — Story 9:16, Hook F — vertical split
  {
    id: 'A4', campaign: 'audit', format: '9x16',
    theme: 'dark',
    html: `
      <div class="frame frame-9x16 dark pad">
        <div class="story-center">
          <div class="split-top">Your advisor built it in 2023.</div>
          <div class="split-bottom">The law changed in 2025.</div>
          <div class="cta-line" style="margin-top:64px">DM TITLE</div>
        </div>
        ${WTP_MARK}
      </div>
    `,
  },
];

// ─── Carousel Definitions ───────────────────────────────────────────

const carousels = [

  // W3 — WILLS Carousel 1:1 ×5, Hook O (Opportunity)
  {
    id: 'W3', campaign: 'wills',
    theme: 'dark', // deep navy bg
    frames: [
      { page: '1/5', html: `
        <div class="headline h-lg" style="margin-bottom:28px">Where does your estate plan break?</div>
        <div class="subline">Six questions. One written map.<br>48 hours from WTP.</div>
      `},
      { page: '2/5', num: '1', html: `
        <div class="headline h-md">Where are you tax resident?</div>
        <div class="subline" style="opacity:0.5">And how many of the last 10 tax years have you been resident there?</div>
      `},
      { page: '3/5', num: '2', html: `
        <div class="headline h-md">Do you own UAE property?</div>
        <div class="subline" style="opacity:0.5">Dubai, Abu Dhabi, or another emirate. In whose name — personal, company, trust?</div>
      `},
      { page: '4/5', num: '3', html: `
        <div class="headline h-md">Is there a DIFC or ADJD will over it?</div>
        <div class="subline" style="opacity:0.5">DIFC Law 2 of 2025 changed enforcement jurisdiction for non-Muslim wills in Dubai.</div>
      `},
      { page: '5/5', html: `
        <div class="headline h-lg" style="margin-bottom:28px">Written map of the gaps.<br>48 hours.</div>
        <div class="cta-line">DM WILLS</div>
      `},
    ],
  },

  // V3 — VISA Carousel 1:1 ×7, Hook O (Opportunity)
  {
    id: 'V3', campaign: 'visa',
    theme: 'dark',
    frames: [
      { page: '1/7', html: `
        <div class="headline h-lg">You probably qualify for 2 of these.<br><span class="accent">Not the one you were sold.</span></div>
      `},
      { page: '2/7', num: '1', html: `
        <div class="headline h-md">Property investment</div>
        <div class="subline" style="opacity:0.5">AED 2M+. Must be held personally, not through an offshore entity. ICP and GDRFA rules diverge on mortgaged property.</div>
      `},
      { page: '3/7', num: '2', html: `
        <div class="headline h-md">Business investment</div>
        <div class="subline" style="opacity:0.5">AED 2M+. Must be a UAE-licensed operating business, not a holding structure.</div>
      `},
      { page: '4/7', num: '3', html: `
        <div class="headline h-md">Entrepreneur</div>
        <div class="subline" style="opacity:0.5">Revenue-generating business required. A pitch deck is not enough.</div>
      `},
      { page: '5/7', num: '4', html: `
        <div class="headline h-md">Skilled talent</div>
        <div class="subline" style="opacity:0.5">Tied to a job offer from a UAE-licensed employer at a specific salary band.</div>
      `},
      { page: '6/7', num: '5+', html: `
        <div class="headline h-md">Scientist, student, family dependent</div>
        <div class="subline" style="opacity:0.5">Narrow eligibility. Family dependent is often the simplest path for spouses of principal applicants.</div>
      `},
      { page: '7/7', html: `
        <div class="headline h-lg" style="margin-bottom:28px">Which 2 are yours?</div>
        <div class="subline" style="margin-bottom:8px">24-hour written pathway snapshot.</div>
        <div class="cta-line">DM VISA</div>
      `},
    ],
  },
];

// ─── Size Map ───────────────────────────────────────────────────────
const SIZES = {
  '1x1':  { w: 1080, h: 1080 },
  '4x5':  { w: 1080, h: 1350 },
  '9x16': { w: 1080, h: 1920 },
};

// ─── HTML Builder ───────────────────────────────────────────────────
function buildPage(bodyHtml) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${CSS}</style></head>
<body style="margin:0;padding:0;background:#000">${bodyHtml}</body></html>`;
}

function buildCarouselFrame(carousel, frame) {
  const themeClass = carousel.theme;
  return `
    <div class="frame frame-1x1 ${themeClass} pad-carousel">
      ${frame.num ? `<div class="q-num">${frame.num}</div>` : ''}
      <div class="pagination">${frame.page}</div>
      <div class="content">
        ${frame.html}
      </div>
      ${WTP_MARK}
    </div>
  `;
}

// ─── Main ───────────────────────────────────────────────────────────
async function main() {
  // Ensure output dirs
  const campaigns = ['wills', 'visa', 'audit'];
  for (const c of campaigns) {
    const dir = join(DIST, c);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // ── Generate static creatives ──
  console.log(`\n  Generating ${creatives.length} static creatives...\n`);

  for (const cr of creatives) {
    const size = SIZES[cr.format];
    const page = await browser.newPage();
    await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: 1 });
    await page.setContent(buildPage(cr.html), { waitUntil: 'networkidle0' });

    // Wait for fonts
    await page.evaluate(() => document.fonts.ready);

    const outPath = join(DIST, cr.campaign, `${cr.id}_${cr.format}_${cr.theme}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    await page.close();

    console.log(`  ✓ ${cr.id} → ${cr.campaign}/${cr.id}_${cr.format}_${cr.theme}.png`);
  }

  // ── Generate carousel frames ──
  console.log(`\n  Generating ${carousels.length} carousels...\n`);

  for (const car of carousels) {
    const carDir = join(DIST, car.campaign, car.id);
    if (!existsSync(carDir)) mkdirSync(carDir, { recursive: true });

    for (let i = 0; i < car.frames.length; i++) {
      const frame = car.frames[i];
      const frameHtml = buildCarouselFrame(car, frame);

      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
      await page.setContent(buildPage(frameHtml), { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);

      const outPath = join(carDir, `${car.id}_frame${i + 1}.png`);
      await page.screenshot({ path: outPath, type: 'png' });
      await page.close();

      console.log(`  ✓ ${car.id} frame ${i + 1}/${car.frames.length}`);
    }
  }

  await browser.close();

  // ── Summary ──
  const totalStatic = creatives.length;
  const totalFrames = carousels.reduce((sum, c) => sum + c.frames.length, 0);
  console.log(`\n  Done: ${totalStatic} static + ${totalFrames} carousel frames = ${totalStatic + totalFrames} images`);
  console.log(`  Output: ${DIST}/\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
