import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const content = {
  en: {
    tag: 'For Tax Advisors & Wealth Managers',
    headline: 'UAE execution partner.<br>We execute — you advise.',
    subheadline: 'For tax advisors, corporate lawyers, family offices, and wealth managers who need a reliable on-the-ground operator. Banking viability confirmed before any setup begins.',
    cta: 'Submit a Pilot Case',
    benefits: {
      title: 'Why Partners Choose WTP',
      label: 'Partner benefits',
      items: [
        { title: 'Client Protection', text: 'Your client relationships remain yours. CRM-tagged, contractually protected, no direct contact without permission.' },
        { title: 'Risk-Aware', text: 'We decline profiles that don\'t meet our criteria. Three-tier classification: Green, Yellow, Red. We reject approximately 30% of cases.' },
        { title: 'Transparency', text: 'Weekly status updates, defined checkpoints, documented process at every stage. No surprises.' },
        { title: 'Banking-First', text: 'We start with bank requirements, not paperwork. This prevents the common problem: company registered, but no bank will open an account.' },
      ],
    },
    process: {
      title: 'Delivery Process',
      label: 'How we work',
      steps: [
        { num: '01', title: 'Pre-screen', text: 'Documents, KYC/AML, Source of Funds, risk classification. 5–7 business days.' },
        { num: '02', title: 'Banking Scenario', text: 'Bank selection matched to client profile. Included in pre-screen.' },
        { num: '03', title: 'Delivery', text: 'Company setup, account opening, visas within agreed scenario. 3–8 weeks.' },
        { num: '04', title: 'Ongoing', text: 'Retainer: license renewals, accounting, regulatory changes. Continuous.' },
      ],
    },
    risk: {
      title: 'Risk Policy',
      label: 'Gatekeeping',
      rows: [
        { color: 'green', status: 'Green — Proceed', text: 'Transparent business rationale, document readiness, no critical red flags, realistic expectations.' },
        { color: 'yellow', status: 'Yellow — Conditional', text: 'Higher risk, complex structure, non-standard operations. Requires enhanced review and controls.' },
        { color: 'red', status: 'Red — Decline', text: 'Sanctions/toxic exposure, missing documents, pressure to bypass compliance. We reject and explain why.' },
      ],
    },
    products: {
      title: 'Services',
      label: 'Scope',
      items: [
        { pill: 'Core', name: 'Corporate Banking', desc: 'Account opening, bank selection, SOF preparation' },
        { pill: 'Personal', name: 'Personal Banking', desc: 'Private banking, investment access' },
        { pill: 'Operations', name: 'Company Formation', desc: 'Free zone, mainland, licensing' },
        { pill: 'Identity', name: 'Visa & Residency', desc: 'Investor, employment, Golden Visa' },
        { pill: 'Tax', name: 'Tax Registration', desc: 'Corporate tax, VAT, transfer pricing' },
        { pill: 'Operations', name: 'Accounting', desc: 'Renewals, accounting, compliance' },
        { pill: 'Investment', name: 'Real Estate', desc: 'Linked to Golden Visa or asset structuring' },
        { pill: 'Legacy', name: 'Wealth & Protection', desc: 'Wills, foundations, family office' },
      ],
    },
    footer: {
      pilot: 'Free Pilot Pre-screen',
      contact: 'Contact',
      email: 'email@wtp.uae',
      office: 'Office',
      location: 'Dubai, UAE',
    },
  },
  ru: {
    tag: 'Для налоговых консультантов и wealth managers',
    headline: 'Партнёр по исполнению в ОАЭ.<br>Мы исполняем — вы консультируете.',
    subheadline: 'Для налоговых консультантов, корпоративных юристов, family offices и wealth managers. Банковская жизнеспособность подтверждена до начала любых процедур.',
    cta: 'Отправить пилотный кейс',
    benefits: {
      title: 'Почему партнёры выбирают WTP',
      label: 'Преимущества',
      items: [
        { title: 'Защита клиентов', text: 'Ваши клиентские отношения остаются вашими. Тегирование в CRM, договорная защита, без прямого контакта.' },
        { title: 'Осознанный подход к рискам', text: 'Мы отказываем профилям, не соответствующим критериям. Три уровня: Green, Yellow, Red. Отклоняем ~30% кейсов.' },
        { title: 'Прозрачность', text: 'Еженедельные обновления статуса, контрольные точки, документированный процесс. Никаких сюрпризов.' },
        { title: 'Банкинг на первом месте', text: 'Начинаем с требований банка, а не с документов. Компания зарегистрирована, а счёт не открыть — мы это предотвращаем.' },
      ],
    },
    process: {
      title: 'Процесс работы',
      label: 'Как мы работаем',
      steps: [
        { num: '01', title: 'Pre-screen', text: 'Документы, KYC/AML, источник средств, классификация риска. 5–7 рабочих дней.' },
        { num: '02', title: 'Банковский сценарий', text: 'Подбор банка под профиль клиента. Включён в pre-screen.' },
        { num: '03', title: 'Реализация', text: 'Регистрация компании, открытие счетов, визы. 3–8 недель.' },
        { num: '04', title: 'Сопровождение', text: 'Продление лицензий, бухгалтерия, регуляторные изменения. Постоянно.' },
      ],
    },
    risk: {
      title: 'Риск-политика',
      label: 'Фильтрация',
      rows: [
        { color: 'green', status: 'Green — принимаем', text: 'Прозрачная бизнес-логика, готовность документов, отсутствие red flags, реалистичные ожидания.' },
        { color: 'yellow', status: 'Yellow — условно', text: 'Повышенный риск, сложная структура, нестандартные операции. Усиленная проверка и контроли.' },
        { color: 'red', status: 'Red — отклоняем', text: 'Санкции, токсичная экспозиция, отсутствие документов, давление на обход комплаенс. Отклоняем с объяснением.' },
      ],
    },
    products: {
      title: 'Услуги',
      label: 'Спектр',
      items: [
        { pill: 'Ключевая', name: 'Корпоративный банкинг', desc: 'Открытие счетов, подбор банка, подготовка SOF' },
        { pill: 'Персональный', name: 'Личный банкинг', desc: 'Private banking, инвестиции' },
        { pill: 'Операции', name: 'Регистрация компаний', desc: 'Free zone, mainland, лицензии' },
        { pill: 'Идентичность', name: 'Визы и резидентство', desc: 'Инвесторская, рабочая, Golden Visa' },
        { pill: 'Налоги', name: 'Налоговая регистрация', desc: 'Корп. налог, НДС, трансфертное ценообразование' },
        { pill: 'Операции', name: 'Сопровождение', desc: 'Продления, бухгалтерия, комплаенс' },
        { pill: 'Инвестиции', name: 'Недвижимость', desc: 'Привязка к Golden Visa или структурированию' },
        { pill: 'Наследие', name: 'Активы и защита', desc: 'Завещания, фонды, family office' },
      ],
    },
    footer: {
      pilot: 'Бесплатный пилотный pre-screen',
      contact: 'Контакт',
      email: 'email@wtp.uae',
      office: 'Офис',
      location: 'Дубай, ОАЭ',
    },
  },
};

const accents = [
  '#e74c3c', '#b8860b', '#004e92', '#8e2de2',
  '#e74c3c', '#b8860b', '#004e92', '#8e2de2',
];

function buildHTML(lang) {
  const c = content[lang];

  const benefitsHTML = c.benefits.items.map((b, i) =>
    `<div class="card accent-${i + 1}"><h4>${b.title}</h4><p>${b.text}</p></div>`
  ).join('\n');

  const processHTML = c.process.steps.map(s =>
    `<div class="process-step"><span class="pill">${s.num}</span><h3>${s.title}</h3><p>${s.text}</p></div>`
  ).join('\n');

  const riskHTML = c.risk.rows.map((r, i) =>
    `<div class="risk-row"${i === c.risk.rows.length - 1 ? ' style="border-bottom:none"' : ''}>
      <div class="risk-status"><span class="dot ${r.color}"></span>${r.status}</div>
      <p>${r.text}</p>
    </div>`
  ).join('\n');

  const productsHTML = c.products.items.map((p, i) =>
    `<div class="product-item">
      <div class="product-dot" style="background:${accents[i]}"></div>
      <div class="product-text">
        <span class="product-pill">${p.pill}</span>
        <strong>${p.name}</strong>
        <span class="product-desc">${p.desc}</span>
      </div>
    </div>`
  ).join('\n');

  const parts = [
    '<!DOCTYPE html>\n<html lang="' + lang + '">\n<head>\n<meta charset="UTF-8">',
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">',
    '<style>',
    '  @page { size: A4; margin: 0; }',
    '  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }',
    '',
    '  :root {',
    '    --bg: #FAFAFA; --bg-card: #FFFFFF; --border: #E0E0E0;',
    '    --text: #0A0A0A; --text2: #666666; --meta: #999999;',
    '    --font: "Inter", sans-serif; --serif: "Playfair Display", serif;',
    '  }',
    '',
    '  body {',
    '    background: var(--bg); color: var(--text); font-family: var(--font);',
    '    width: 210mm; min-height: 297mm; padding: 12mm 16mm;',
    '    font-size: 9px; line-height: 1.4;',
    '  }',
    '',
    '  .header {',
    '    display: flex; justify-content: space-between; align-items: flex-start;',
    '    margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--border);',
    '  }',
    '  .header-left h1 {',
    '    font-size: 22px; font-family: var(--serif); font-weight: 400;',
    '    letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 6px; max-width: 450px;',
    '  }',
    '  .header-left p { font-size: 9.5px; color: var(--text2); max-width: 400px; }',
    '  .tag {',
    '    font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em;',
    '    color: var(--meta); margin-bottom: 8px; display: block;',
    '  }',
    '  .cta {',
    '    display: inline-block; background: var(--text); color: var(--bg);',
    '    font-size: 9px; font-weight: 500; padding: 6px 16px; border-radius: 100px;',
    '  }',
    '',
    '  .section { margin-bottom: 14px; }',
    '  .section-head {',
    '    display: flex; justify-content: space-between; align-items: baseline;',
    '    margin-bottom: 8px;',
    '  }',
    '  .section-head h2 { font-size: 13px; font-family: var(--serif); font-weight: 400; }',
    '  .section-head .label { font-size: 8px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--meta); }',
    '',
    '  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }',
    '  .card {',
    '    background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;',
    '    padding: 10px; overflow: hidden;',
    '  }',
    '  .card h4 { font-family: var(--serif); font-size: 11px; margin-bottom: 3px; font-weight: 400; }',
    '  .card p { font-size: 8px; color: var(--text2); line-height: 1.35; }',
    '  .card.accent-1 { border-top: 2px solid #e74c3c; }',
    '  .card.accent-2 { border-top: 2px solid #b8860b; }',
    '  .card.accent-3 { border-top: 2px solid #004e92; }',
    '  .card.accent-4 { border-top: 2px solid #8e2de2; }',
    '',
    '  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }',
    '  .process-step { padding-left: 10px; border-left: 1px solid var(--border); position: relative; }',
    '  .process-step::before {',
    "    content: ''; position: absolute; left: -2.5px; top: 6px;",
    '    width: 4px; height: 4px; background: var(--meta); border-radius: 50%;',
    '  }',
    '  .process-step .pill {',
    '    display: inline-block; padding: 2px 6px; border-radius: 100px;',
    '    font-size: 7px; border: 1px solid var(--border); margin-bottom: 4px; color: var(--text2);',
    '  }',
    '  .process-step h3 { font-size: 10px; font-weight: 500; margin-bottom: 2px; }',
    '  .process-step p { font-size: 7.5px; color: var(--text2); line-height: 1.3; }',
    '',
    '  .risk-table { display: flex; flex-direction: column; border-top: 1px solid var(--border); }',
    '  .risk-row {',
    '    display: grid; grid-template-columns: 1fr 2fr; padding: 6px 0;',
    '    border-bottom: 1px solid var(--border); align-items: baseline;',
    '  }',
    '  .risk-status {',
    '    display: flex; align-items: center; gap: 6px;',
    '    font-family: var(--serif); font-size: 10px;',
    '  }',
    '  .dot { width: 6px; height: 6px; border-radius: 50%; }',
    '  .dot.green { background: #4CAF50; box-shadow: 0 0 4px rgba(76,175,80,0.4); }',
    '  .dot.yellow { background: #FFC107; box-shadow: 0 0 4px rgba(255,193,7,0.4); }',
    '  .dot.red { background: #F44336; box-shadow: 0 0 4px rgba(244,67,54,0.4); }',
    '  .risk-row p { font-size: 8px; color: var(--text2); }',
    '',
    '  /* Products — compact 2-column list for 8 items */',
    '  .products-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; }',
    '  .product-item { display: flex; align-items: flex-start; gap: 8px; }',
    '  .product-dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }',
    '  .product-text { display: flex; flex-direction: column; }',
    '  .product-pill {',
    '    font-size: 6.5px; color: var(--meta); text-transform: uppercase;',
    '    letter-spacing: 0.08em; margin-bottom: 1px;',
    '  }',
    '  .product-text strong { font-size: 10px; font-family: var(--serif); font-weight: 400; margin-bottom: 1px; }',
    '  .product-desc { font-size: 7.5px; color: var(--text2); }',
    '',
    '  .footer {',
    '    margin-top: auto; padding-top: 10px; border-top: 1px solid var(--border);',
    '    display: flex; justify-content: space-between;',
    '  }',
    '  .footer-col { flex: 1; }',
    '  .footer-label { font-size: 7px; color: var(--meta); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2px; }',
    '  .footer-value { font-size: 9px; }',
    '</style>',
    '</head>',
    '<body>',
    '',
    '<div class="header">',
    '  <div class="header-left">',
    '    <div class="tag">' + c.tag + '</div>',
    '    <h1>' + c.headline + '</h1>',
    '    <p style="margin-top:6px">' + c.subheadline + '</p>',
    '  </div>',
    '  <div class="header-right" style="text-align:right">',
    '    <div class="cta">' + c.cta + '</div>',
    '  </div>',
    '</div>',
    '',
    '<div class="section">',
    '  <div class="section-head"><h2>' + c.benefits.title + '</h2><span class="label">' + c.benefits.label + '</span></div>',
    '  <div class="grid-2">' + benefitsHTML + '</div>',
    '</div>',
    '',
    '<div class="section">',
    '  <div class="section-head"><h2>' + c.process.title + '</h2><span class="label">' + c.process.label + '</span></div>',
    '  <div class="grid-4">' + processHTML + '</div>',
    '</div>',
    '',
    '<div class="section">',
    '  <div class="section-head"><h2>' + c.risk.title + '</h2><span class="label">' + c.risk.label + '</span></div>',
    '  <div class="risk-table">' + riskHTML + '</div>',
    '</div>',
    '',
    '<div class="section">',
    '  <div class="section-head"><h2>' + c.products.title + '</h2><span class="label">' + c.products.label + '</span></div>',
    '  <div class="products-grid">' + productsHTML + '</div>',
    '</div>',
    '',
    '<div class="footer">',
    '  <div class="footer-col"><div class="footer-label">' + c.footer.pilot + '</div><div class="footer-value">partner-kit</div></div>',
    '  <div class="footer-col"><div class="footer-label">' + c.footer.contact + '</div><div class="footer-value">' + c.footer.email + '</div></div>',
    '  <div class="footer-col" style="text-align:right"><div class="footer-label">' + c.footer.office + '</div><div class="footer-value">' + c.footer.location + '</div></div>',
    '</div>',
    '',
    '</body>',
    '</html>',
  ];

  return parts.join('\n');
}

async function generatePDF(lang) {
  const html = buildHTML(lang);
  const suffix = lang.toUpperCase();
  const pdfPath = path.join(__dirname, '..', 'public', 'WTP_One_Pager_' + suffix + '.pdf');
  const pngPath = path.join(__dirname, '..', 'public', 'WTP_One_Pager_' + suffix + '_preview.png');

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('PDF saved: ' + pdfPath);

  await page.setViewport({ width: 794, height: 1123 });
  await page.screenshot({ path: pngPath, fullPage: true });
  console.log('Preview saved: ' + pngPath);

  const diagnostics = await page.evaluate(() => {
    const body = document.body;
    const bodyRect = body.getBoundingClientRect();
    const mmPerPx = 25.4 / 96;
    const contentHeightMM = bodyRect.height * mmPerPx;
    return { contentHeightMM: Math.round(contentHeightMM), fitsOnOnePage: contentHeightMM <= 297 };
  });

  console.log('  Content: ' + diagnostics.contentHeightMM + 'mm, fits: ' + (diagnostics.fitsOnOnePage ? 'YES' : 'NO'));

  await browser.close();
  return diagnostics;
}

(async () => {
  console.log('Generating EN One Pager...');
  await generatePDF('en');
  console.log('');
  console.log('Generating RU One Pager...');
  await generatePDF('ru');
  console.log('');
  console.log('Done! Both PDFs generated.');
})();
