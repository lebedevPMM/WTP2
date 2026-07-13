#!/usr/bin/env node
/**
 * WTP Carousels V1 — Script-driven, cream editorial brand
 * Adapted from sync/WTP2/scripts/generate-linkedin-carousels.mjs
 * Brand: current wtp.ae cream (#F5F3EE) + Playfair italic + Inter + gold (#BCAE7D)
 * Output: 1080×1080px PNG per slide + PDF per carousel
 */

import puppeteer from 'puppeteer';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIST = '/Users/konstantin/Desktop/WTP-Carousels-V1-Script';
const SIZE = 1080;

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });

const b = {
  bg: '#F5F3EE',
  bgAlt: '#EFEBE3',
  ink: '#1F2620',
  inkSoft: '#4A524C',
  inkDim: '#7B827E',
  gold: '#BCAE7D',
  goldDark: '#A8997A',
  border: 'rgba(31,38,32,0.10)',
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{margin:0;padding:0;background:#fff}

.s {
  width:${SIZE}px; height:${SIZE}px;
  background:${b.bg};
  color:${b.ink};
  font-family:'Inter',sans-serif;
  padding:88px 84px;
  display:flex; flex-direction:column;
  justify-content:center;
  position:relative;
  page-break-after:always;
  overflow:hidden;
}
.s:last-child{page-break-after:auto}

.s-cover { align-items:flex-start; text-align:left; }
.s-cta { align-items:center; text-align:center; background:${b.bgAlt}; }

/* Typography */
h1.cover {
  font-family:'Playfair Display',serif;
  font-style:italic;
  font-weight:500;
  font-size:84px;
  line-height:1.05;
  letter-spacing:-0.015em;
  color:${b.ink};
}
h1.cover .accent { color:${b.goldDark}; font-style:italic; }

h2.slide {
  font-family:'Playfair Display',serif;
  font-weight:500;
  font-size:64px;
  line-height:1.1;
  letter-spacing:-0.01em;
  color:${b.ink};
}
h2.slide .num {
  display:block;
  font-family:'Inter',sans-serif;
  font-style:normal;
  font-weight:600;
  font-size:14px;
  letter-spacing:0.18em;
  text-transform:uppercase;
  color:${b.goldDark};
  margin-bottom:32px;
}

.body {
  margin-top:36px;
  font-size:28px;
  line-height:1.45;
  color:${b.inkSoft};
  max-width:880px;
}

.cta-headline {
  font-family:'Playfair Display',serif;
  font-style:italic;
  font-weight:500;
  font-size:64px;
  line-height:1.15;
  color:${b.ink};
  max-width:780px;
}
.cta-action {
  margin-top:48px;
  font-family:'Inter',sans-serif;
  font-weight:600;
  font-size:22px;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:${b.goldDark};
}
.cta-keyword {
  margin-top:16px;
  font-family:'Playfair Display',serif;
  font-style:italic;
  font-weight:600;
  font-size:40px;
  color:${b.ink};
}

.gold-line {
  width:64px;
  height:3px;
  background:${b.gold};
  border-radius:2px;
  margin:36px 0 0 0;
}
.gold-line-c {
  width:64px;
  height:3px;
  background:${b.gold};
  border-radius:2px;
  margin:32px auto 0 auto;
}

.footer {
  position:absolute;
  bottom:60px;
  left:84px;
  right:84px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-family:'Inter',sans-serif;
  font-size:14px;
  color:${b.inkDim};
  letter-spacing:0.08em;
}
.footer .brand {
  font-family:'Playfair Display',serif;
  font-style:italic;
  font-weight:600;
  font-size:18px;
  letter-spacing:0.02em;
  color:${b.ink};
}
.footer .counter {
  font-weight:500;
}
.s-cover .footer .counter { display:none; }
.s-cta .footer { left:0; right:0; justify-content:center; gap:32px; padding:0 84px; }
`;

function slideHTML(slide, idx, total, isCover, isCTA) {
  const counter = isCover ? '' : `${idx + 1} / ${total}`;
  const inner = (() => {
    if (isCover) {
      return `<h1 class="cover">${slide.title}</h1><div class="gold-line"></div>${slide.sub ? `<div class="body">${slide.sub}</div>` : ''}`;
    }
    if (isCTA) {
      return `<div class="cta-headline">${slide.title}</div><div class="gold-line-c"></div>${slide.action ? `<div class="cta-action">${slide.action}</div>` : ''}${slide.keyword ? `<div class="cta-keyword">${slide.keyword}</div>` : ''}`;
    }
    return `<h2 class="slide">${slide.num ? `<span class="num">${slide.num}</span>` : ''}${slide.title}</h2>${slide.sub ? `<div class="body">${slide.sub}</div>` : ''}`;
  })();
  const klass = `s ${isCover ? 's-cover' : ''} ${isCTA ? 's-cta' : ''}`.trim();
  return `<div class="${klass}">${inner}<div class="footer"><span class="brand">WTP</span><span class="counter">${counter}</span></div></div>`;
}

const CAR1 = {
  name: 'CAR-1-MATRIX',
  total: 6,
  slides: [
    {
      cover: true,
      title: 'Four origins. Four <span class="accent">exit tails</span>. One Dubai arrival.',
      sub: 'A 4-jurisdiction tax-residency reset map for HNWI relocators.',
    },
    {
      num: 'United Kingdom',
      title: 'Non-Dom regime ended April 2025.',
      sub: 'A 10-year inheritance tax tail now follows you out.',
    },
    {
      num: 'Germany',
      title: 'Wegzugsteuer triggers on exit.',
      sub: 'A 7-year residency tail keeps the file open.',
    },
    {
      num: 'Netherlands',
      title: 'Box 3 transitional regime is active.',
      sub: 'A 10-year inheritance tail attaches to the person.',
    },
    {
      num: 'Russia',
      title: '183-day rule plus active currency control.',
      sub: 'Outbound flows sequenced before the residency reset.',
    },
    {
      cta: true,
      title: 'The Dubai story starts at home.',
      action: 'Reply',
      keyword: '“MATRIX”',
    },
  ],
};

const CAR2 = {
  name: 'CAR-2-LADDER',
  total: 8,
  slides: [
    {
      cover: true,
      title: 'Substance is a <span class="accent">ladder</span>. Seven rungs. Different banks per rung.',
      sub: 'How UAE banks read your file at CT2026 enforcement.',
    },
    { num: 'Rung 1', title: 'Virtual office.', sub: 'Address only. The bank will ask one more question.' },
    { num: 'Rung 2', title: 'Flex desk.', sub: 'Shared. Files open. Most retail accounts stop here.' },
    { num: 'Rung 3', title: 'Dedicated desk plus one local hire.', sub: 'Tier-2 banks become workable.' },
    { num: 'Rung 4', title: 'Operational office. Payroll runs.', sub: 'The corporate banking conversation starts here.' },
    { num: 'Rung 5', title: 'Substantive presence.', sub: 'Multiple hires. Real revenue. Private banking opens.' },
    { num: 'Rung 6', title: 'Fully resident principal.', sub: 'The file becomes institutional. CT2026 ready.' },
    {
      cta: true,
      title: 'Family office: governance plus people plus capital.',
      action: 'Reply',
      keyword: '“LADDER”',
    },
  ],
};

async function renderCarousel(carousel, browser) {
  const slidesHTML = carousel.slides.map((s, i) =>
    slideHTML(s, i, carousel.total, !!s.cover, !!s.cta)
  ).join('\n');

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${slidesHTML}</body></html>`;

  writeFileSync(join(DIST, `${carousel.name}.html`), html);

  const page = await browser.newPage();
  await page.setViewport({ width: SIZE, height: SIZE, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  // Wait extra time for fonts to load
  await new Promise(r => setTimeout(r, 1500));

  // PNG per slide
  for (let i = 0; i < carousel.slides.length; i++) {
    const el = (await page.$$('.s'))[i];
    const out = join(DIST, `${carousel.name}-slide-${String(i + 1).padStart(2, '0')}.png`);
    await el.screenshot({ path: out });
    console.log(`✓ ${out}`);
  }

  // Combined PDF
  await page.pdf({
    path: join(DIST, `${carousel.name}.pdf`),
    width: `${SIZE}px`,
    height: `${SIZE}px`,
    printBackground: true,
    pageRanges: '',
    preferCSSPageSize: false,
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
