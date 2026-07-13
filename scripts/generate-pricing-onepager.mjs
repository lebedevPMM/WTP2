import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const largeMode = process.argv.includes('--large');
const outDir = path.join(__dirname, '..', 'dist', 'product-presentations', ...(largeMode ? ['увеличенные шрифты'] : []));


// ─── Shared branding ────────────────────────────────────────────────

const brand = {
  ru: { company: 'WTP Brokers', email: 'hello@wtpbrokers.com', office: 'Дубай, ОАЭ', since: 'С 2019 года · Banking-First подход · ОАЭ', contact: 'Контакт', officeLbl: 'Офис' },
  en: { company: 'WTP Brokers', email: 'hello@wtpbrokers.com', office: 'Dubai, UAE', since: 'Since 2019 · Banking-First approach · UAE', contact: 'Contact', officeLbl: 'Office' },
};


// ─── Pricing Data (3 columns: Service, Customer Price, Partner Commission) ──

const pricing = {
  ru: {
    title: 'WTP Offers',
    subtitle: 'AED',
    tag: 'ПАРТНЁРСКИЙ ПРАЙС-ЛИСТ',
    columns: ['Услуга', 'Цена клиенту', 'Комиссия партнёра'],
    sections: [
      {
        name: 'Real Estate',
        rows: [
          { service: 'Real Estate (покупка, продажа, управление)', price: '—', commission: 'до 90% от комиссии' },
          { service: 'Факторинг комиссии от застройщика', price: '10% от суммы комиссии', commission: '2% от суммы комиссии' },
          { service: 'Escrow платежи (чек, escrow agreement)', price: '1% от сделки', commission: '0,2% от сделки' },
          { service: 'Foundation', price: '75,000', commission: '15,000' },
        ],
      },
      {
        name: 'Private',
        rows: [
          { service: 'X-Ray (аудит портфеля активов)', price: '3,500', commission: '700' },
          { service: 'Golden Visa', price: '18,000', commission: '3,600' },
          { service: 'Last Will', price: '10,000', commission: '2,000' },
          { service: 'POA', price: '2,000', commission: '400' },
          { service: 'Банковский счёт личный', price: '15,000', commission: '3,000', note: 'Без ID. Финальная стоимость после предварительного скрининга' },
          { service: 'Ипотека (банковское содействие)', price: '4% от суммы кредита', commission: '0,8% от суммы кредита' },
        ],
      },
      {
        name: 'Corporate',
        rows: [
          { service: 'Регистрация компании', price: '30,000', commission: '6,000', note: 'min. Зависит от типа компании, зоны регистрации, лицензирования, количества виз' },
          { service: 'Банковский счёт корпоративный', price: '30,000', commission: '6,000', note: 'min' },
          { service: 'Сопровождение (бухгалтерия, налоги, отчётность)', price: '3,000', commission: '600' },
        ],
      },
    ],
    customRow: { service: 'Индивидуальные финансовые и юридические запросы', price: 'Индивидуально', commission: '20%' },
    footer: 'Все цены ориентировочные. Финальная стоимость формируется после Pre Screen.',
  },

  en: {
    title: 'WTP Offers',
    subtitle: 'AED',
    tag: 'PARTNER PRICE LIST',
    columns: ['Service', 'Customer Price', 'Partner Commission'],
    sections: [
      {
        name: 'Real Estate',
        rows: [
          { service: 'Real Estate (purchase, sale, management)', price: '—', commission: 'up to 90% of commission' },
          { service: 'Developer commission factoring', price: '10% of commission amount', commission: '2% of commission amount' },
          { service: 'Escrow payments (cheque, escrow agreement)', price: '1% of deal', commission: '0.2% of deal' },
          { service: 'Foundation', price: '75,000', commission: '15,000' },
        ],
      },
      {
        name: 'Private',
        rows: [
          { service: 'X-Ray (capital portfolio audit)', price: '3,500', commission: '700' },
          { service: 'Golden Visa', price: '18,000', commission: '3,600' },
          { service: 'Last Will', price: '10,000', commission: '2,000' },
          { service: 'POA', price: '2,000', commission: '400' },
          { service: 'Personal bank account', price: '15,000', commission: '3,000', note: 'Without ID. Final cost after pre-screening' },
          { service: 'Mortgage (banking facilitation)', price: '4% of loan amount', commission: '0.8% of loan amount' },
        ],
      },
      {
        name: 'Corporate',
        rows: [
          { service: 'Company registration', price: '30,000', commission: '6,000', note: 'min. Depends on company type, zone, licensing, number of visas' },
          { service: 'Corporate bank account', price: '30,000', commission: '6,000', note: 'min' },
          { service: 'Maintenance (accounting, taxes, reporting)', price: '3,000', commission: '600' },
        ],
      },
    ],
    customRow: { service: 'Individual financial & legal requests', price: 'Custom', commission: '20%' },
    footer: 'All prices are indicative. Final cost determined after Pre Screen.',
  },
};


// ─── CSS (Portrait A4, 3-column table) ──────────────────────────────

const sharedCSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }

  :root {
    --bg: #FAF9F6; --bg-card: #FFFFFF; --border: #E5E5E5;
    --text: #1B1B1B; --text2: #555555; --meta: #999999;
    --accent: #1a5276;
    --font: "Inter", sans-serif; --serif: "Playfair Display", serif;
  }

  body {
    background: var(--bg); color: var(--text); font-family: var(--font);
    width: 210mm; height: 297mm; padding: 16mm 18mm 14mm;
    font-size: ${largeMode ? '12px' : '10.5px'}; line-height: 1.45;
    display: flex; flex-direction: column;
  }

  /* ── Header ── */
  .header {
    margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--border);
  }
  .header h1 {
    font-size: ${largeMode ? '32px' : '28px'}; font-family: var(--serif); font-weight: 400;
    letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 2px;
  }
  .header .subtitle {
    font-size: ${largeMode ? '13px' : '11px'}; color: var(--meta); font-weight: 500;
    letter-spacing: 0.04em;
  }
  .tag {
    font-size: ${largeMode ? '10px' : '8.5px'}; text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--meta); margin-bottom: 6px; display: block; font-weight: 500;
  }

  /* ── Table ── */
  .pricing-table {
    width: 100%; border-collapse: collapse;
  }

  .pricing-table th {
    background: var(--accent); color: #fff;
    font-size: ${largeMode ? '11px' : '9.5px'}; font-weight: 500; text-transform: uppercase;
    letter-spacing: 0.06em; padding: 9px 12px; text-align: left;
  }
  .pricing-table th:first-child { border-radius: 6px 0 0 0; }
  .pricing-table th:last-child { border-radius: 0 6px 0 0; text-align: right; }
  .pricing-table th:nth-child(2) { text-align: right; }

  .pricing-table td {
    padding: 8px 12px; border-bottom: 1px solid var(--border);
    font-size: ${largeMode ? '12px' : '10.5px'}; vertical-align: top;
  }
  .pricing-table td:nth-child(2) { text-align: right; font-weight: 600; white-space: nowrap; }
  .pricing-table td:nth-child(3) { text-align: right; color: var(--accent); font-weight: 500; white-space: nowrap; }

  .pricing-table .note {
    display: block; font-size: ${largeMode ? '9.5px' : '8px'}; color: var(--meta);
    line-height: 1.3; margin-top: 2px; font-weight: 400;
  }

  /* Section header row */
  .section-row td {
    background: #f0f0ed; font-weight: 600; font-size: ${largeMode ? '12.5px' : '11px'};
    padding: 8px 12px; border-bottom: 1px solid var(--border);
    letter-spacing: 0.03em; color: var(--accent);
  }

  /* Alternating rows */
  .pricing-table tbody tr:nth-child(even):not(.section-row):not(.custom-row) td {
    background: #fafaf8;
  }

  /* Custom row */
  .custom-row td {
    background: #f5f5f0; font-style: italic;
    border-bottom: none;
  }

  /* ── Footer ── */
  .table-footer {
    font-size: ${largeMode ? '9.5px' : '8px'}; color: var(--meta); margin-top: 10px;
    padding: 4px 0; font-style: italic;
  }

  .footer {
    margin-top: auto; padding-top: 8px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .footer-col { flex: 1; }
  .footer-label {
    font-size: ${largeMode ? '9px' : '7.5px'}; color: var(--meta); text-transform: uppercase;
    letter-spacing: 0.1em; margin-bottom: 1px;
  }
  .footer-value { font-size: ${largeMode ? '10.5px' : '9px'}; }
  .footer-right { text-align: right; }
  .footer-center { text-align: center; }
  .since-line {
    font-size: ${largeMode ? '9px' : '7.5px'}; color: var(--meta);
    letter-spacing: 0.04em; margin-bottom: 4px;
  }
`;


// ─── HTML Builder ───────────────────────────────────────────────────

function buildPricingHTML(lang) {
  const d = pricing[lang];
  const b = brand[lang];

  const theadHTML = `<tr>${d.columns.map(c => `<th>${c}</th>`).join('')}</tr>`;

  let tbodyHTML = '';

  for (const section of d.sections) {
    tbodyHTML += `<tr class="section-row"><td colspan="3">${section.name}</td></tr>`;
    for (const row of section.rows) {
      const noteHTML = row.note ? `<span class="note">${row.note}</span>` : '';
      tbodyHTML += `<tr>
        <td>${row.service}${noteHTML}</td>
        <td>${row.price}</td>
        <td>${row.commission}</td>
      </tr>`;
    }
  }

  tbodyHTML += `<tr class="custom-row">
    <td>${d.customRow.service}</td>
    <td>${d.customRow.price}</td>
    <td>${d.customRow.commission}</td>
  </tr>`;

  return `<!DOCTYPE html>
<html lang="${lang === 'ru' ? 'ru' : 'en'}">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>${sharedCSS}</style>
</head>
<body>

<div class="header">
  <span class="tag">${d.tag}</span>
  <h1>${d.title}</h1>
  <p class="subtitle">${d.subtitle}</p>
</div>

<table class="pricing-table">
  <thead>${theadHTML}</thead>
  <tbody>${tbodyHTML}</tbody>
</table>

<div class="table-footer">${d.footer}</div>

<div class="footer">
  <div class="footer-col">
    <div class="footer-label">WTP</div>
    <div class="footer-value">${b.company}</div>
  </div>
  <div class="footer-col footer-center">
    <div class="since-line">${b.since}</div>
  </div>
  <div class="footer-col footer-right">
    <div class="footer-label">${b.officeLbl}</div>
    <div class="footer-value">${b.office}</div>
  </div>
</div>

</body>
</html>`;
}


// ─── PDF Generator ──────────────────────────────────────────────────

async function generatePricing(lang, browser) {
  const html = buildPricingHTML(lang);
  const langUpper = lang.toUpperCase();
  const filename = `WTP_pricing_${langUpper}`;
  const pdfPath = path.join(outDir, `${filename}.pdf`);
  const pngPath = path.join(outDir, `${filename}_preview.png`);

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });

  await page.setViewport({ width: 794, height: 1123 });
  await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: 794, height: 1123 } });

  const diagnostics = await page.evaluate(() => {
    const bodyRect = document.body.getBoundingClientRect();
    const mmPerPx = 25.4 / 96;
    return {
      contentHeightMM: Math.round(bodyRect.height * mmPerPx),
      fits: bodyRect.height * mmPerPx <= 297,
    };
  });

  await page.close();

  const icon = diagnostics.fits ? '\u2705' : '\u26a0\ufe0f';
  console.log(`  ${icon} pricing [${langUpper}]: ${diagnostics.contentHeightMM}mm ${diagnostics.fits ? '' : 'OVERFLOW'}`);

  return { lang: langUpper, ...diagnostics };
}


// ─── Main ───────────────────────────────────────────────────────────

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`\nGenerating pricing one-pagers${largeMode ? ' (LARGE FONTS)' : ''}...`);
  console.log(`  Output: ${outDir}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];
  for (const lang of ['ru', 'en']) {
    const result = await generatePricing(lang, browser);
    results.push(result);
  }

  await browser.close();

  console.log('\n─── Summary ───');
  const ok = results.filter(r => r.fits).length;
  const overflow = results.filter(r => !r.fits).length;
  console.log(`\u2705 OK: ${ok}  \u26a0\ufe0f Overflow: ${overflow}  Total: ${results.length} PDFs`);
  console.log('\nDone!');
})();
