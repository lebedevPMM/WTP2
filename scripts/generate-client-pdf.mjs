import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const content = {
  en: {
    tag: 'For Business Owners & Investors',
    headline: 'Relocating to the UAE?<br>We handle both sides.',
    subheadline: 'Coordinated exit from your home jurisdiction + bankable company setup in the UAE. One process, one team, partner firms in key markets.',
    cta: 'Get Your Banking Roadmap',

    bridge: {
      title: 'Two Sides, One Process',
      label: 'The Bridge',
      exit: { title: 'Exit Side', text: 'Partner firms in the UK, Germany, and the Netherlands handle tax exit, capital gains, regulatory compliance, and wind-down of local structures.' },
      entry: { title: 'Entry Side', text: 'WTP handles UAE company formation, banking, visa, tax residency, and substance \u2014 using our Banking-First methodology.' },
      bottom: 'Coming from another jurisdiction? We coordinate with your existing advisor using our standard cross-border protocol.',
    },

    method: {
      title: 'Banking-First Method',
      label: 'Our process',
      steps: [
        { num: '01', title: 'Pre-Check', text: 'Assess your profile, source of funds, and flag issues \u2014 both UAE-side and exit-side.' },
        { num: '02', title: 'Exit Coordination', text: 'Connect you with our partner firm or coordinate with your existing advisor.' },
        { num: '03', title: 'UAE Architecture', text: 'Design the right structure based on banking profile, business model, and residency goals.' },
        { num: '04', title: 'Execution', text: 'Exit and entry in the right order. Registration, banking, visa, substance \u2014 timed to your tax calendar.' },
      ],
    },

    compare: {
      title: 'Why UAE?',
      label: 'Jurisdiction comparison',
      headers: ['', 'Corp. Tax', 'Setup', 'Banking', 'Golden Visa'],
      rows: [
        { name: 'UAE', values: ['9%', '2\u20134 wks', 'Strict but manageable', 'Yes (AED 2M)'], highlight: true },
        { name: 'Singapore', values: ['17%', '1\u20133 wks', 'Easy', 'No'] },
        { name: 'Portugal', values: ['21%', '4\u20138 wks', 'Easy', 'Yes (EUR 500K)'] },
        { name: 'Switzerland', values: ['8.5\u201324%', '4\u201312 wks', 'Very strict', 'No'] },
        { name: 'Malta', values: ['35%/5%*', '8\u201316 wks', 'Moderate', 'Yes (EUR 700K)'] },
      ],
      conclusion: 'UAE wins on tax rate, visa program, and speed. But only if your banking is sorted.',
    },

    diff: {
      title: 'How We\u2019re Different',
      label: 'Why WTP',
      items: [
        { title: 'Banking-First', text: 'Bank readiness assessed before registration. No "register first, hope for the best."' },
        { title: 'Exit + Entry', text: 'Partner firms handle exit, we handle entry. One synchronized timeline.' },
        { title: 'Risk-Aware', text: 'We decline cases that won\u2019t pass compliance. This protects you from wasted time.' },
        { title: 'Transparency', text: 'Government fees at cost. Our management fee is separate and clearly stated.' },
        { title: 'Real Substance', text: 'Actual management infrastructure, not virtual office theater.' },
        { title: 'One Point of Contact', text: 'One project manager, one timeline, one communication channel.' },
      ],
    },

    footer: {
      roadmap: 'Free Banking Roadmap',
      roadmapSub: '5\u20137 business days, no commitment',
      contact: 'Contact',
      email: 'hello@wtpbrokers.com',
      office: 'Office',
      location: 'Dubai, UAE',
    },
  },

  ru: {
    tag: 'Для владельцев бизнеса и инвесторов',
    headline: 'Релокация в ОАЭ?<br>Мы ведем обе стороны.',
    subheadline: 'Координированный выход из вашей юрисдикции + создание банковской структуры в ОАЭ. Один процесс, одна команда, партнеры в ключевых рынках.',
    cta: 'Получить Banking Roadmap',

    bridge: {
      title: 'Две стороны, один процесс',
      label: 'Мост',
      exit: { title: 'Сторона выхода', text: 'Партнерские фирмы в Великобритании, Германии и Нидерландах ведут налоговый выход, капитальные доходы, регуляторный комплаенс и закрытие местных структур.' },
      entry: { title: 'Сторона входа', text: 'WTP ведет регистрацию компании в ОАЭ, банкинг, визы, налоговое резидентство и substance \u2014 по методологии Banking-First.' },
      bottom: 'Из другой юрисдикции? Мы координируемся с вашим текущим советником по стандартному протоколу.',
    },

    method: {
      title: 'Метод Banking-First',
      label: 'Наш процесс',
      steps: [
        { num: '01', title: 'Pre-Check', text: 'Оценка профиля, источника средств, выявление рисков \u2014 со стороны ОАЭ и выхода.' },
        { num: '02', title: 'Координация выхода', text: 'Связываем вас с партнерской фирмой или координируемся с вашим советником.' },
        { num: '03', title: 'Архитектура ОАЭ', text: 'Проектируем структуру на основе банковского профиля, бизнес-модели и целей резидентства.' },
        { num: '04', title: 'Реализация', text: 'Выход и вход в правильном порядке. Регистрация, банк, виза, substance \u2014 синхронизировано с вашим налоговым календарем.' },
      ],
    },

    compare: {
      title: 'Почему ОАЭ?',
      label: 'Сравнение юрисдикций',
      headers: ['', 'Налог', 'Сроки', 'Банкинг', 'Golden Visa'],
      rows: [
        { name: 'ОАЭ', values: ['9%', '2\u20134 нед.', 'Строго, но решаемо', 'Да (AED 2M)'], highlight: true },
        { name: 'Сингапур', values: ['17%', '1\u20133 нед.', 'Легко', 'Нет'] },
        { name: 'Португалия', values: ['21%', '4\u20138 нед.', 'Легко', 'Да (EUR 500K)'] },
        { name: 'Швейцария', values: ['8.5\u201324%', '4\u201312 нед.', 'Очень строго', 'Нет'] },
        { name: 'Мальта', values: ['35%/5%*', '8\u201316 нед.', 'Умеренно', 'Да (EUR 700K)'] },
      ],
      conclusion: 'ОАЭ выигрывают по налогам, визовой программе и скорости. Но только если банк решен.',
    },

    diff: {
      title: 'Чем мы отличаемся',
      label: 'Почему WTP',
      items: [
        { title: 'Banking-First', text: 'Банковская готовность проверяется ДО регистрации.' },
        { title: 'Выход + Вход', text: 'Партнеры ведут выход, мы ведем вход. Один синхронизированный процесс.' },
        { title: 'Осознанный риск', text: 'Мы отклоняем кейсы, которые не пройдут комплаенс.' },
        { title: 'Прозрачность', text: 'Госпошлины по себестоимости. Наше вознаграждение отдельно и прозрачно.' },
        { title: 'Реальный substance', text: 'Реальная управленческая инфраструктура, а не виртуальный офис.' },
        { title: 'Один контакт', text: 'Один менеджер, один таймлайн, один канал связи.' },
      ],
    },

    footer: {
      roadmap: 'Бесплатный Banking Roadmap',
      roadmapSub: '5\u20137 рабочих дней, без обязательств',
      contact: 'Контакт',
      email: 'hello@wtpbrokers.com',
      office: 'Офис',
      location: 'Дубай, ОАЭ',
    },
  },
};

const accents = ['#e74c3c', '#b8860b', '#004e92', '#8e2de2', '#e74c3c', '#8e2de2'];

function buildHTML(lang) {
  const c = content[lang];

  const bridgeHTML = `
    <div class="bridge-grid">
      <div class="bridge-card exit">
        <h4>${c.bridge.exit.title}</h4>
        <p>${c.bridge.exit.text}</p>
      </div>
      <div class="bridge-connector">
        <div class="bridge-line"></div>
        <span class="bridge-label">\u2194</span>
        <div class="bridge-line"></div>
      </div>
      <div class="bridge-card entry">
        <h4>${c.bridge.entry.title}</h4>
        <p>${c.bridge.entry.text}</p>
      </div>
    </div>
    <p class="bridge-note">${c.bridge.bottom}</p>`;

  const methodHTML = c.method.steps.map(s =>
    `<div class="process-step"><span class="pill">${s.num}</span><h3>${s.title}</h3><p>${s.text}</p></div>`
  ).join('\n');

  const compareHeaderHTML = c.compare.headers.map(h => `<th>${h}</th>`).join('');
  const compareRowsHTML = c.compare.rows.map(r => {
    const cls = r.highlight ? ' class="highlight"' : '';
    const cells = r.values.map(v => `<td>${v}</td>`).join('');
    return `<tr${cls}><td class="jur-name">${r.name}</td>${cells}</tr>`;
  }).join('\n');

  const diffHTML = c.diff.items.map((d, i) =>
    `<div class="diff-item">
      <div class="diff-dot" style="background:${accents[i]}"></div>
      <div><strong>${d.title}</strong><p>${d.text}</p></div>
    </div>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }

  :root {
    --bg: #FAFAFA; --bg-card: #FFFFFF; --border: #E0E0E0;
    --text: #0A0A0A; --text2: #666666; --meta: #999999;
    --font: "Inter", sans-serif; --serif: "Playfair Display", serif;
    --dark: #1A2332;
  }

  body {
    background: var(--bg); color: var(--text); font-family: var(--font);
    width: 210mm; min-height: 297mm; padding: 11mm 15mm 10mm;
    font-size: 8.5px; line-height: 1.4;
  }

  /* Header */
  .header {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--border);
  }
  .header-left h1 {
    font-size: 21px; font-family: var(--serif); font-weight: 400;
    letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 5px; max-width: 420px;
  }
  .header-left p { font-size: 9px; color: var(--text2); max-width: 400px; line-height: 1.4; }
  .tag {
    font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--meta); margin-bottom: 6px; display: block;
  }
  .cta {
    display: inline-block; background: var(--dark); color: #FAFAFA;
    font-size: 8.5px; font-weight: 500; padding: 6px 16px; border-radius: 100px;
    text-decoration: none; white-space: nowrap;
  }

  /* Sections */
  .section { margin-bottom: 12px; }
  .section-head {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 6px;
  }
  .section-head h2 { font-size: 12px; font-family: var(--serif); font-weight: 400; }
  .section-head .label { font-size: 7px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--meta); }

  /* Bridge */
  .bridge-grid {
    display: grid; grid-template-columns: 1fr 30px 1fr; gap: 6px; align-items: stretch;
  }
  .bridge-card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;
    padding: 9px;
  }
  .bridge-card.exit { border-top: 2px solid #e74c3c; }
  .bridge-card.entry { border-top: 2px solid #004e92; }
  .bridge-card h4 { font-family: var(--serif); font-size: 10px; margin-bottom: 3px; font-weight: 400; }
  .bridge-card p { font-size: 7.5px; color: var(--text2); line-height: 1.35; }
  .bridge-connector {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 2px;
  }
  .bridge-line { width: 1px; flex: 1; background: var(--border); }
  .bridge-label { font-size: 12px; color: var(--meta); }
  .bridge-note {
    margin-top: 5px; font-size: 7.5px; color: var(--meta); font-style: italic;
  }

  /* Process */
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .process-step { padding-left: 8px; border-left: 1px solid var(--border); position: relative; }
  .process-step::before {
    content: ''; position: absolute; left: -2.5px; top: 5px;
    width: 4px; height: 4px; background: var(--meta); border-radius: 50%;
  }
  .process-step .pill {
    display: inline-block; padding: 1px 5px; border-radius: 100px;
    font-size: 6.5px; border: 1px solid var(--border); margin-bottom: 3px; color: var(--text2);
  }
  .process-step h3 { font-size: 9.5px; font-weight: 500; margin-bottom: 1px; }
  .process-step p { font-size: 7px; color: var(--text2); line-height: 1.3; }

  /* Comparison table */
  .compare-table { width: 100%; border-collapse: collapse; font-size: 7.5px; }
  .compare-table th {
    text-align: left; padding: 4px 6px; font-weight: 600; font-size: 7px;
    border-bottom: 1.5px solid var(--text); text-transform: uppercase; letter-spacing: 0.05em;
  }
  .compare-table td { padding: 3px 6px; border-bottom: 1px solid var(--border); }
  .compare-table .jur-name { font-weight: 500; }
  .compare-table tr.highlight td {
    font-weight: 500; background: rgba(197, 165, 114, 0.1);
  }
  .compare-conclusion {
    margin-top: 4px; font-size: 7.5px; font-style: italic; color: var(--text2);
  }

  /* Differentiators */
  .diff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
  .diff-item { display: flex; gap: 6px; align-items: flex-start; }
  .diff-dot { width: 5px; height: 5px; border-radius: 50%; margin-top: 3px; flex-shrink: 0; }
  .diff-item strong { font-size: 9px; font-family: var(--serif); font-weight: 400; display: block; margin-bottom: 1px; }
  .diff-item p { font-size: 7px; color: var(--text2); line-height: 1.3; }

  /* Footer */
  .footer {
    margin-top: auto; padding-top: 8px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .footer-col { flex: 1; }
  .footer-label { font-size: 7px; color: var(--meta); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1px; }
  .footer-value { font-size: 8.5px; }
  .footer-sub { font-size: 7px; color: var(--meta); }
</style>
</head>
<body>

<div class="header">
  <div class="header-left">
    <span class="tag">${c.tag}</span>
    <h1>${c.headline}</h1>
    <p style="margin-top:5px">${c.subheadline}</p>
  </div>
  <div class="header-right" style="text-align:right;padding-top:16px">
    <a href="mailto:${c.footer.email}" class="cta">${c.cta}</a>
  </div>
</div>

<div class="section">
  <div class="section-head"><h2>${c.bridge.title}</h2><span class="label">${c.bridge.label}</span></div>
  ${bridgeHTML}
</div>

<div class="section">
  <div class="section-head"><h2>${c.method.title}</h2><span class="label">${c.method.label}</span></div>
  <div class="grid-4">${methodHTML}</div>
</div>

<div class="section">
  <div class="section-head"><h2>${c.compare.title}</h2><span class="label">${c.compare.label}</span></div>
  <table class="compare-table">
    <thead><tr>${compareHeaderHTML}</tr></thead>
    <tbody>${compareRowsHTML}</tbody>
  </table>
  <p class="compare-conclusion">${c.compare.conclusion}</p>
</div>

<div class="section">
  <div class="section-head"><h2>${c.diff.title}</h2><span class="label">${c.diff.label}</span></div>
  <div class="diff-grid">${diffHTML}</div>
</div>

<div class="footer">
  <div class="footer-col">
    <div class="footer-label">${c.footer.roadmap}</div>
    <div class="footer-sub">${c.footer.roadmapSub}</div>
  </div>
  <div class="footer-col">
    <div class="footer-label">${c.footer.contact}</div>
    <div class="footer-value">${c.footer.email}</div>
  </div>
  <div class="footer-col" style="text-align:right">
    <div class="footer-label">${c.footer.office}</div>
    <div class="footer-value">${c.footer.location}</div>
  </div>
</div>

</body>
</html>`;
}

async function generatePDF(lang) {
  const html = buildHTML(lang);
  const suffix = lang.toUpperCase();
  const pdfPath = path.join(__dirname, '..', 'public', `WTP_Client_One_Pager_${suffix}.pdf`);
  const pngPath = path.join(__dirname, '..', 'public', `WTP_Client_One_Pager_${suffix}_preview.png`);

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
  console.log('Generating EN Client One Pager...');
  await generatePDF('en');
  console.log('');
  console.log('Generating RU Client One Pager...');
  await generatePDF('ru');
  console.log('');
  console.log('Done! Both Client PDFs generated.');
})();
