/**
 * corp-kit render — снимает все носители кита в PNG/PDF для просмотра и рассылки.
 *
 *   node corp-kit/render.cjs               # всё
 *   node corp-kit/render.cjs landings      # только лендинги
 *   node corp-kit/render.cjs decks         # только деки (PNG постранично + PDF)
 *   node corp-kit/render.cjs ig            # только Instagram-карусели (1080x1350)
 *
 * Playwright берётся из node_modules репозитория WTP2.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'render');

const LANDINGS = ['index', 'company-setup', 'bank-accounts', 'golden-visa', 'wills', 'liquidation'];
const LANDINGS_EN = LANDINGS.map((n) => `en/${n}`);
const DECKS = ['b2b', 'b2c', 'b2b-en', 'b2c-en'];

const only = process.argv[2];
const want = (kind) => !only || only === kind;

const ensure = (p) => fs.mkdirSync(p, { recursive: true });

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
}

async function renderLandings(browser) {
  const dir = path.join(OUT, 'landings');
  ensure(dir);
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const name of [...LANDINGS, ...LANDINGS_EN]) {
    const base = name.endsWith('/index') || name === 'index' ? name.replace(/index$/, '') : name;
    const file = name === 'index'
      ? path.join(ROOT, 'landings', 'index.html')
      : name === 'en/index'
        ? path.join(ROOT, 'landings', 'en', 'index.html')
        : path.join(ROOT, 'landings', name, 'index.html');
    if (!fs.existsSync(file)) { console.log(`  skip ${name} (нет файла)`); continue; }
    await page.goto(`file://${file}`, { waitUntil: 'networkidle' });
    await settle(page);
    const out = name.replace('/', '-');
    await page.screenshot({ path: path.join(dir, `${out}.png`), fullPage: true });
    console.log(`  landings/${out}.png`);
  }
  await page.close();
}

async function renderDecks(browser) {
  const dir = path.join(OUT, 'decks');
  ensure(dir);
  // Слайд = 1600x900. Снимаем каждый слайд отдельно + собираем PDF в том же формате.
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  for (const deck of DECKS) {
    const file = path.join(ROOT, 'decks', deck, 'index.html');
    if (!fs.existsSync(file)) { console.log(`  skip ${deck} (нет файла)`); continue; }
    await page.goto(`file://${file}`, { waitUntil: 'networkidle' });
    await settle(page);

    const slides = await page.$$('.slide');
    const deckDir = path.join(dir, deck);
    ensure(deckDir);
    for (let i = 0; i < slides.length; i++) {
      await slides[i].screenshot({ path: path.join(deckDir, `${String(i + 1).padStart(2, '0')}.png`) });
    }
    console.log(`  decks/${deck}/ — ${slides.length} слайдов PNG`);

    await page.pdf({
      path: path.join(dir, `WTP-${deck}.pdf`),
      width: '1600px',
      height: '900px',
      printBackground: true,
      pageRanges: `1-${slides.length}`,
    });
    console.log(`  decks/WTP-${deck}.pdf`);
  }
  await page.close();
}

async function renderIG(browser) {
  const dir = path.join(OUT, 'instagram');
  ensure(dir);
  const file = path.join(ROOT, 'instagram', 'carousels.html');
  if (!fs.existsSync(file)) { console.log('  skip ig (нет carousels.html)'); return; }
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto(`file://${file}`, { waitUntil: 'networkidle' });
  await settle(page);

  const slides = await page.$$('.ig');
  for (const slide of slides) {
    const id = await slide.getAttribute('id');
    await slide.screenshot({ path: path.join(dir, `${id}.png`) });
  }
  console.log(`  instagram/ — ${slides.length} кадров 1080x1350`);
  await page.close();
}

(async () => {
  ensure(OUT);
  const browser = await chromium.launch();
  console.log('Рендер corp-kit:');
  if (want('landings')) await renderLandings(browser);
  if (want('decks')) await renderDecks(browser);
  if (want('ig')) await renderIG(browser);
  await browser.close();
  console.log(`Готово → ${OUT}`);
})();
