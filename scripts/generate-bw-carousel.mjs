#!/usr/bin/env node
/**
 * WTP × BW — Carousel "Регуляторная карта 2025" (Post 1, Paid IG/TG ads)
 * 8 frames × 1080×1080, dark theme, IBM Plex Serif + Inter + IBM Plex Mono
 *
 * Source text: WTP-bw-content-strategy-pick-2026-04-29.pdf (Пост 1)
 * Pattern: forked from generate-instagram-creatives.mjs (MT43)
 *
 * Usage: node scripts/generate-bw-carousel.mjs
 * Output: dist/wtp-bw-carousel/slide-{1..8}.png
 */

import puppeteer from 'puppeteer';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist', 'wtp-bw-carousel');

const c = {
  dark:   '#0B1220',
  cream:  '#F5F3EE',
  white:  '#FFFFFF',
  red:    '#8B0000',
  muted:  'rgba(255,255,255,0.55)',
  rule:   'rgba(255,255,255,0.15)',
};

const WTP_MARK = `<svg class="wtp-mark" viewBox="0 0 10000 4000" xmlns="http://www.w3.org/2000/svg"><path d="M360 908.667C360 908.667 701.758 709.513 974.673 962.759C1247.59 1216 1208.25 1597.1 1235.29 1879.85C1262.34 2162.6 1395.11 2297.83 1559.84 2258.49C1724.57 2219.15 1751.62 1874.93 1822.92 1825.76C1822.92 1825.76 1867.18 2113.43 1965.53 2206.86C2063.87 2300.29 2297.45 2292.91 2403.17 1889.69C2501.52 1518.42 2329.41 1132.41 2508.9 741.476C2508.9 741.476 2521.19 773.439 2518.73 812.778C2518.73 812.778 2614.62 812.778 2690.84 810.32C2690.84 810.32 2703.13 584.12 2575.28 554.616C2447.43 525.111 2223.69 628.377 2176.97 1117.66C2152.39 1395.49 2216.31 1665.94 2186.81 1874.93C2157.3 2083.92 2076.17 2113.43 2034.37 2074.09C1948.31 1997.87 2058.96 1547.93 1776.21 1422.53C1776.21 1422.53 1808.17 1545.47 1741.78 1769.21C1675.4 1992.95 1631.14 2071.63 1559.84 2066.71C1488.54 2061.79 1468.87 1835.59 1461.49 1560.22C1454.12 1284.85 1372.98 876.704 1011.55 724.266C650.126 571.827 421.467 788.191 360 908.667Z" fill="currentColor"/><path d="M1636.06 1139.78C1636.06 1139.78 1864.72 1041.43 2152.38 1046.35C2152.38 1046.35 2149.92 945.546 2194.18 842.28C2194.18 842.28 1756.53 815.235 1636.06 1139.78Z" fill="currentColor"/><path d="M2511.35 842.277C2511.35 842.277 2486.77 891.451 2472.01 1036.51C2472.01 1036.51 2823.61 1046.35 3133.4 972.588C3443.2 898.827 3482.54 694.756 3482.54 694.756C3482.54 694.756 3320.26 854.571 2511.35 842.277Z" fill="currentColor"/></svg>`;

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

* { margin:0; padding:0; box-sizing:border-box; }

.frame {
  position: relative;
  width: 1080px;
  height: 1080px;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  background: ${c.dark};
  color: ${c.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 88px 80px;
}

.wtp-mark {
  position: absolute;
  bottom: 36px;
  right: 40px;
  width: 80px;
  height: auto;
  color: rgba(255,255,255,0.35);
}

.pagination {
  position: absolute;
  top: 40px;
  right: 72px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.08em;
  opacity: 0.4;
  color: ${c.white};
}

.q-num {
  font-family: 'IBM Plex Serif', serif;
  font-size: 140px;
  font-weight: 700;
  opacity: 0.07;
  position: absolute;
  top: 56px;
  left: 72px;
  line-height: 1;
  color: ${c.white};
}

.meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${c.muted};
}

.rule {
  width: 56px;
  height: 3px;
  border-radius: 2px;
  background: ${c.rule};
  margin: 28px 0;
}

.headline {
  font-family: 'IBM Plex Serif', serif;
  font-weight: 600;
  line-height: 1.14;
  letter-spacing: -0.015em;
}
.h-cover { font-size: 78px; font-weight: 700; line-height: 1.04; }
.h-card  { font-size: 50px; }
.h-close { font-size: 56px; }
.h-cta   { font-size: 64px; }

.subline {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.5;
  margin-top: 28px;
  color: rgba(255,255,255,0.78);
}

.url-line {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: ${c.white};
  margin-top: 40px;
  border-top: 1px solid ${c.rule};
  padding-top: 32px;
}

.cta-cap {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.55;
}
`;

// ─── Slide Definitions ──────────────────────────────────────────────
const slides = [
  // 1 — Cover
  { page: '1 / 8', html: `
      <div class="meta">WTP · РЕГУЛЯТОРНАЯ КАРТА · UAE 2025</div>
      <div class="rule"></div>
      <div class="headline h-cover">Регуляторная<br>карта 2025</div>
      <div class="subline" style="max-width: 820px">
        Что изменилось в UAE за год — для семей с активами в нескольких юрисдикциях.
      </div>
      <div class="cta-cap" style="margin-top: 56px; opacity: 0.45">Шесть изменений · одна карта · ссылки на источники</div>
  ` },

  // 2 — Source of Funds
  { page: '2 / 8', num: '01', html: `
      <div class="meta">БАНКИ UAE · 2025</div>
      <div class="rule"></div>
      <div class="headline h-card">Повторные запросы<br>Source of Funds.</div>
      <div class="subline" style="max-width: 880px">
        Счета, открытые год-два назад, получают новые запросы. Особенно по компаниям в Free Zone.
      </div>
  ` },

  // 3 — Corporate Tax
  { page: '3 / 8', num: '02', html: `
      <div class="meta">CORPORATE TAX 9% · ОТЧЁТНЫЕ ПЕРИОДЫ</div>
      <div class="rule"></div>
      <div class="headline h-card">Первые отчётные<br>периоды закрыты.</div>
      <div class="subline" style="max-width: 880px">
        Компании, зарегистрированные до 2023, проходят настройку под требования substance.
      </div>
  ` },

  // 4 — DIFC / ADGM
  { page: '4 / 8', num: '03', html: `
      <div class="meta">DIFC · ADGM · ХОЛДИНГИ</div>
      <div class="rule"></div>
      <div class="headline h-card">Holding company<br>без операционного<br>периметра — больше<br>не bankable.</div>
      <div class="subline" style="max-width: 880px">
        Двухуровневая структура — инструмент под конкретный мандат, не пресет.
      </div>
  ` },

  // 5 — UK non-dom
  { page: '5 / 8', num: '04', html: `
      <div class="meta">UK NON-DOM · ОТМЕНЁН АПРЕЛЬ 2025</div>
      <div class="rule"></div>
      <div class="headline h-card">Налогообложение<br>теперь — по резидентству,<br>не по паспорту.</div>
      <div class="subline" style="max-width: 880px">
        У семей с активами и в UK, и в UAE появляются три новых вопроса.
      </div>
  ` },

  // 6 — Visas / Emirates ID
  { page: '6 / 8', num: '05', html: `
      <div class="meta">ВИЗЫ · EMIRATES ID · ДОКУМЕНТООБОРОТ</div>
      <div class="rule"></div>
      <div class="headline h-card">Просрочка одного<br>документа тянет<br>банковскую блокировку.</div>
      <div class="subline" style="max-width: 880px">
        Сезон отъездов требует другой подготовки, чем три года назад.
      </div>
  ` },

  // 7 — Positioning close
  { page: '7 / 8', html: `
      <div class="meta">WTP — БАНКИНГ-FIRST WEALTH TRANSFER</div>
      <div class="rule"></div>
      <div class="headline h-close">WTP ведёт регуляторный<br>периметр семьи.</div>
      <div class="subline" style="max-width: 900px">
        Координируем структуру владения, банковскую приемлемость и документооборот по нескольким юрисдикциям из одной точки.
      </div>
  ` },

  // 8 — CTA
  { page: '8 / 8', html: `
      <div class="meta">СВЕРИТЬ СТРУКТУРУ С ПРАВИЛАМИ 2025</div>
      <div class="rule"></div>
      <div class="headline h-cta">Шесть изменений<br>на одной странице.</div>
      <div class="url-line">→ wtp.ae/submit-case</div>
  ` },
];

function buildPage(bodyHtml) {
  return `<!DOCTYPE html>
<html lang="ru"><head><meta charset="utf-8"><style>${CSS}</style></head>
<body style="margin:0;padding:0;background:#000">${bodyHtml}</body></html>`;
}

function buildFrame(slide) {
  return `
    <div class="frame">
      ${slide.num ? `<div class="q-num">${slide.num}</div>` : ''}
      <div class="pagination">${slide.page}</div>
      ${slide.html}
      ${WTP_MARK}
    </div>
  `;
}

async function main() {
  if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log(`\n  Generating ${slides.length} BW carousel frames...\n`);

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
    await page.setContent(buildPage(buildFrame(slide)), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    // Small delay to ensure font swap is rendered
    await new Promise(r => setTimeout(r, 300));

    const outPath = join(DIST, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    await page.close();
    console.log(`  ✓ slide ${i + 1}/${slides.length} → ${outPath.split('/').slice(-3).join('/')}`);
  }

  await browser.close();
  console.log(`\n  Done. Output: ${DIST}/\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
