const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  for (const deck of ['b2b','b2c']) {
    const f = path.join(process.cwd(), 'corp-kit/decks', deck, 'index.html');
    await page.goto('file://'+f, { waitUntil:'networkidle' });
    await page.evaluate(()=>document.fonts.ready);
    const bad = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.slide').forEach((s,i) => {
        const sb = s.getBoundingClientRect();
        const pager = s.querySelector('.pager');
        const pagerTop = pager ? pager.getBoundingClientRect().top - sb.top : 900;
        let maxBottom = 0, worst = '';
        s.querySelectorAll(':scope > *:not(.pager)').forEach(el => {
          const r = el.getBoundingClientRect();
          const b = r.bottom - sb.top;
          if (b > maxBottom) { maxBottom = b; worst = el.className || el.tagName; }
        });
        if (maxBottom > pagerTop - 8) out.push({slide:i+1, contentBottom:Math.round(maxBottom), pagerTop:Math.round(pagerTop), over:Math.round(maxBottom-pagerTop), worst});
      });
      return out;
    });
    console.log(deck, JSON.stringify(bad, null, 1));
  }
  await browser.close();
})();
