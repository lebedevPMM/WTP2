#!/usr/bin/env node
/**
 * Generate Banking Readiness Checklist PDF (EN + RU)
 * Usage: node scripts/generate-banking-checklist.mjs
 * Output: dist/lead-magnets/Banking_Readiness_Checklist_EN.pdf + _RU.pdf
 */

import puppeteer from 'puppeteer';
import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'dist', 'lead-magnets');
mkdirSync(OUT_DIR, { recursive: true });

const BRAND = {
    navy: '#0A1628',
    gold: '#C9A96E',
    accent: '#1B3A5C',
    bg: '#FFFFFF',
    text: '#1A1A1A',
    muted: '#5A6B7D',
    green: '#1B7A3D',
    yellow: '#B8860B',
    red: '#B22222',
    lightBg: '#F7F8FA',
    border: '#E2E6EC',
};

function buildHTML(lang) {
    const isRU = lang === 'ru';

    const t = {
        title: isRU ? 'Чеклист банковской готовности для ОАЭ' : 'UAE Banking Readiness Checklist',
        subtitle: isRU ? 'Готов ли ваш профиль к банку?' : 'Is Your Profile Bank-Ready?',
        byline: isRU ? 'Инструмент самооценки от WTP — вашего операционного партнёра в ОАЭ' : 'A self-assessment tool by WTP — your UAE execution partner',
        howTitle: isRU ? 'Как пользоваться' : 'How to Use',
        howDesc: isRU
            ? 'Отметьте каждый пункт: <b style="color:'+BRAND.green+'">G</b> = готово, <b style="color:'+BRAND.yellow+'">Y</b> = частично, <b style="color:'+BRAND.red+'">R</b> = не готово. Подсчитайте зелёные в конце.'
            : 'Mark each item: <b style="color:'+BRAND.green+'">G</b> = ready, <b style="color:'+BRAND.yellow+'">Y</b> = partial, <b style="color:'+BRAND.red+'">R</b> = not ready. Count your greens at the end.',
        sections: isRU ? [
            {
                title: 'Раздел 1: Источник средств',
                intro: 'Банк восстановит происхождение каждого значимого зачисления. «Я заработал» — не ответ.',
                items: [
                    ['Документы о первичном доходе', 'Банковские выписки 12+ мес., налоговые декларации или аудированная отчётность.'],
                    ['Подтверждение бизнес-выручки', 'Инвойсы, контракты и банковские зачисления — не только баланс.'],
                    ['История инвестиций и прироста капитала', 'Брокерские отчёты, договоры купли-продажи или документы о передаче долей.'],
                    ['Документы о дарении или наследстве', 'Юридические документы: свидетельство о наследстве, договор дарения.'],
                    ['Чистая цепочка от источника до счёта', 'Прослеживаемый путь средств без разрывов и нерегулируемых посредников.'],
                ],
            },
            {
                title: 'Раздел 2: Бизнес-структура',
                intro: 'Неправильная структура вызывает больше отказов, чем плохие документы.',
                items: [
                    ['Юрисдикция соответствует деятельности', 'Фри-зона или mainland совпадает с реальной деятельностью.'],
                    ['Лицензия покрывает источники дохода', 'Каждый поток выручки покрыт лицензией.'],
                    ['Экономическое присутствие доказуемо', 'Офис (не виртуальный), локальный персонал, принятие решений на месте.'],
                    ['Структура собственности прозрачна', 'Полная цепочка UBO, без номиналов и непрозрачных трастов.'],
                    ['Групповая структура объяснима', 'Роль каждой сущности, потоки и причина существования.'],
                ],
            },
            {
                title: 'Раздел 3: Личный профиль',
                intro: 'Банк проводит KYC на каждого акционера, директора и подписанта.',
                items: [
                    ['Нет статуса PEP', 'Нет связей с политически значимыми лицами. Если есть — пакет EDD.'],
                    ['Нет санкционного риска', 'Ни вы, ни партнёры, ни контрагенты не в санкционных списках.'],
                    ['Гражданство не блокирует', 'Паспорт не из юрисдикции под ограничениями. Или есть второе.'],
                    ['Непротиворечивая история резидентства', 'Заявленная история совпадает с поездками и налогами.'],
                    ['Чистая комплаенс-история', 'Нет закрытий счетов, расследований, негативных СМИ.'],
                ],
            },
            {
                title: 'Раздел 4: Документация',
                intro: 'Подготовка заранее сокращает сроки с месяцев до недель.',
                items: [
                    ['Копии паспортов', 'Все акционеры, директора, подписанты. Действительны 6+ мес.'],
                    ['Подтверждение адреса', 'Не старше 3 месяцев. Квитанция, выписка, госдокумент.'],
                    ['CV / биография', '1–2 стр. на каждого UBO: карьера, отрасль, цель в ОАЭ.'],
                    ['Бизнес-план', 'Деятельность, клиенты, объёмы транзакций, выручка. 3–5 стр.'],
                    ['Рекомендательные письма', 'Банковское + профессиональная рекомендация.'],
                ],
            },
            {
                title: 'Раздел 5: Красные флаги',
                intro: 'Один красный пункт здесь может перечеркнуть высокий общий балл.',
                items: [
                    ['Нет кассового бизнеса без контролей', 'AML-процедуры и аудит обращения с наличными.'],
                    ['Нет криптовалюты без лицензии', 'Лицензия VARA или аналог. Иначе — автоматический отказ.'],
                    ['Нет транзакций с FATF-чёрным списком', 'Или задокументированная комплаенс-программа.'],
                    ['Нет признаков shell-компании', 'Реальные клиенты, расходы, деловая цель.'],
                    ['Нет позиции «просто зарегистрируйте»', 'Готовность к полному сотрудничеству с due diligence.'],
                ],
            },
        ] : [
            {
                title: 'Section 1: Source of Funds',
                intro: 'Banks will reconstruct the origin of every significant deposit. "I earned it" is not sufficient.',
                items: [
                    ['Primary income documentation', '12+ months of bank statements, tax returns, or audited financials.'],
                    ['Business revenue trail', 'Invoices, contracts, and corresponding bank credits — not just a balance.'],
                    ['Investment and capital gains history', 'Brokerage statements, notarized sale agreements, or share transfer documents.'],
                    ['Gift or inheritance documentation', 'Legal documents: probate, gift deed, notarized declaration.'],
                    ['Clean chain from origin to current account', 'Traceable path without gaps or unregulated intermediaries.'],
                ],
            },
            {
                title: 'Section 2: Business Structure',
                intro: 'The wrong structure causes more rejections than bad documentation.',
                items: [
                    ['Jurisdiction matches business activity', 'Free zone or mainland aligns with what you actually do.'],
                    ['License covers actual revenue streams', 'Every revenue stream is covered by the trade license.'],
                    ['Substance is demonstrable', 'Office lease (not virtual), local staff or directors, local decisions.'],
                    ['Ownership structure is transparent', 'Full UBO chain, no nominees or opaque trusts.'],
                    ['Group structure is explainable', 'Each entity\'s role, intercompany flows, and rationale.'],
                ],
            },
            {
                title: 'Section 3: Personal Profile',
                intro: 'Banks run KYC on every shareholder, director, and signatory.',
                items: [
                    ['No PEP or PEP-adjacent exposure', 'Not a PEP, no close ties to PEPs. If yes — EDD pack ready.'],
                    ['No sanctions exposure', 'You, partners, counterparties not on any sanctions list.'],
                    ['Nationality is not a blocking factor', 'Passport not from restricted jurisdiction. Or second one available.'],
                    ['Residency history is consistent', 'Stated history matches travel, taxes, and banking records.'],
                    ['Clean compliance record', 'No account closures, investigations, or adverse media.'],
                ],
            },
            {
                title: 'Section 4: Documentation',
                intro: 'Having these ready cuts processing time from months to weeks.',
                items: [
                    ['Passport copies', 'All shareholders, directors, signatories. Valid 6+ months.'],
                    ['Proof of address', 'Recent (< 3 months). Utility bill, bank statement, or gov document.'],
                    ['CV / professional biography', '1–2 pages per UBO: career, industry, reason for UAE.'],
                    ['Business plan or activity description', 'What, who, volumes, revenue. 3–5 pages minimum.'],
                    ['Reference letters', 'Bank reference (good standing) + professional reference.'],
                ],
            },
            {
                title: 'Section 5: Red Flags',
                intro: 'A single red here can override a high overall score.',
                items: [
                    ['No cash-intensive business without controls', 'Documented AML procedures and audited cash handling.'],
                    ['No cryptocurrency as primary business', 'VARA license or equivalent. Unlicensed = automatic decline.'],
                    ['No transactions with high-risk jurisdictions', 'Or documented compliance framework addressing this.'],
                    ['No shell company indicators', 'Real clients, operational expenses, business purpose.'],
                    ['No "just register me" attitude', 'Full cooperation with bank due diligence expected.'],
                ],
            },
        ],
        scoreTitle: isRU ? 'Ваш результат' : 'Your Score',
        scoreRows: isRU ? [
            ['20–25', 'ЗЕЛЁНЫЙ', 'Профиль готов к банку. Стандартные сроки.'],
            ['15–19', 'ЖЁЛТЫЙ', 'Есть устранимые проблемы. 2–6 недель подготовки.'],
            ['< 15', 'КРАСНЫЙ', 'Серьёзная подготовка. Рекомендуется pre-screening.'],
        ] : [
            ['20–25', 'GREEN', 'Bank-ready. Standard processing timeline.'],
            ['15–19', 'YELLOW', 'Fixable issues. 2–6 weeks preparation needed.'],
            ['< 15', 'RED', 'Significant preparation. Professional pre-screening recommended.'],
        ],
        scoreNote: isRU
            ? 'Один красный пункт в Разделе 5 может перечеркнуть высокий общий балл.'
            : 'A single red item in Section 5 can override a high overall score.',
        ctaTitle: isRU ? 'Следующий шаг' : 'Next Step',
        ctaText: isRU
            ? 'Методология Banking-First от WTP оценивает банковскую готовность до регистрации компании.'
            : 'WTP\'s Banking-First methodology assesses bankability before company registration.',
        ctaButton: isRU ? 'Запросить бесплатный Banking Roadmap' : 'Request Your Free Banking Roadmap',
        ctaItems: isRU
            ? ['Pre-screening: 5–7 рабочих дней, бесплатно', 'GO / NO-GO до начала платных работ', 'В случае NO-GO: письменное объяснение']
            : ['Pre-screening: 5–7 business days, no charge', 'GO / NO-GO decision before any fees', 'If NO-GO: written explanation of what needs to change'],
        disclaimer: isRU
            ? 'Данный чеклист предназначен для информационных целей и самооценки. Не является юридической, налоговой или финансовой консультацией. Требования банков различаются. WTP не гарантирует открытие счёта.'
            : 'This checklist is for informational and self-assessment purposes only. It does not constitute legal, tax, or financial advice. Banking requirements vary by institution. WTP does not guarantee account opening.',
    };

    let itemNum = 0;
    const sectionsHTML = t.sections.map((sec, si) => {
        const isRedFlags = si === 4;
        const itemsHTML = sec.items.map(([title, desc]) => {
            itemNum++;
            return `
            <div class="item ${isRedFlags ? 'red-flag' : ''}">
                <div class="checkbox"></div>
                <div class="item-content">
                    <div class="item-num">${itemNum}</div>
                    <div class="item-text">
                        <div class="item-title">${title}</div>
                        <div class="item-desc">${desc}</div>
                    </div>
                </div>
            </div>`;
        }).join('');

        return `
        <div class="section ${isRedFlags ? 'section-red' : ''}">
            <div class="section-header">
                <div class="section-icon">${isRedFlags ? '⚠' : ['💰', '🏢', '👤', '📄', '⚠'][si]}</div>
                <div>
                    <div class="section-title">${sec.title}</div>
                    <div class="section-intro">${sec.intro}</div>
                </div>
            </div>
            <div class="items">${itemsHTML}</div>
        </div>`;
    }).join('');

    const scoreRowsHTML = t.scoreRows.map(([range, level, desc], i) => {
        const color = [BRAND.green, BRAND.yellow, BRAND.red][i];
        return `<tr>
            <td class="score-range">${range}</td>
            <td><span class="score-badge" style="background:${color};color:#fff">${level}</span></td>
            <td class="score-desc">${desc}</td>
        </tr>`;
    }).join('');

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 10px;
    line-height: 1.5;
    color: ${BRAND.text};
    background: ${BRAND.bg};
}

.page {
    width: 210mm;
    min-height: 297mm;
    padding: 18mm 16mm;
}

/* COVER */
.cover {
    background: linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.accent} 100%);
    color: #fff;
    padding: 50mm 20mm 30mm;
    text-align: center;
    min-height: 297mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.cover-logo {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 6px;
    color: ${BRAND.gold};
    margin-bottom: 30px;
}
.cover h1 {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
}
.cover .subtitle {
    font-size: 18px;
    font-weight: 400;
    color: ${BRAND.gold};
    margin-bottom: 30px;
}
.cover .byline {
    font-size: 11px;
    color: rgba(255,255,255,0.7);
    max-width: 400px;
    line-height: 1.6;
}
.cover-divider {
    width: 60px;
    height: 2px;
    background: ${BRAND.gold};
    margin: 24px auto;
}

/* HOW TO */
.how-box {
    background: ${BRAND.lightBg};
    border: 1px solid ${BRAND.border};
    border-radius: 8px;
    padding: 14px 18px;
    margin-bottom: 20px;
    font-size: 10px;
}
.how-box h3 {
    font-size: 11px;
    font-weight: 700;
    color: ${BRAND.navy};
    margin-bottom: 6px;
}

/* SECTIONS */
.section {
    margin-bottom: 22px;
    page-break-inside: avoid;
}
.section-red {
    border: 1.5px solid ${BRAND.red};
    border-radius: 8px;
    padding: 14px;
}
.section-header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
}
.section-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
.section-title {
    font-size: 13px;
    font-weight: 700;
    color: ${BRAND.navy};
}
.section-intro {
    font-size: 9.5px;
    color: ${BRAND.muted};
    margin-top: 2px;
}

/* ITEMS */
.items { display: flex; flex-direction: column; gap: 8px; }
.item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 10px;
    border: 1px solid ${BRAND.border};
    border-radius: 6px;
    background: #fff;
}
.item.red-flag { border-color: #f0d0d0; background: #fdf8f8; }
.checkbox {
    width: 18px;
    height: 18px;
    border: 2px solid ${BRAND.muted};
    border-radius: 3px;
    flex-shrink: 0;
    margin-top: 2px;
}
.item-content { display: flex; gap: 8px; flex: 1; }
.item-num {
    font-size: 9px;
    font-weight: 700;
    color: ${BRAND.gold};
    min-width: 16px;
    margin-top: 2px;
}
.item-title { font-size: 10px; font-weight: 600; color: ${BRAND.navy}; }
.item-desc { font-size: 9px; color: ${BRAND.muted}; margin-top: 1px; }

/* SCORE */
.score-section {
    margin: 24px 0;
    page-break-inside: avoid;
}
.score-section h2 {
    font-size: 15px;
    font-weight: 700;
    color: ${BRAND.navy};
    margin-bottom: 10px;
}
.score-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
}
.score-table td {
    padding: 10px 12px;
    border-bottom: 1px solid ${BRAND.border};
    vertical-align: middle;
}
.score-range { font-weight: 700; font-size: 13px; color: ${BRAND.navy}; width: 70px; }
.score-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
}
.score-desc { color: ${BRAND.muted}; }
.score-note {
    font-size: 9px;
    color: ${BRAND.red};
    font-weight: 600;
    margin-top: 8px;
}

/* CTA */
.cta-box {
    background: linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.accent} 100%);
    color: #fff;
    border-radius: 10px;
    padding: 24px 28px;
    margin: 24px 0;
    page-break-inside: avoid;
}
.cta-box h2 { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
.cta-box p { font-size: 10px; color: rgba(255,255,255,0.85); margin-bottom: 14px; }
.cta-button {
    display: inline-block;
    background: ${BRAND.gold};
    color: ${BRAND.navy};
    font-weight: 700;
    font-size: 11px;
    padding: 10px 24px;
    border-radius: 6px;
    text-decoration: none;
    margin-bottom: 14px;
}
.cta-items { list-style: none; }
.cta-items li {
    font-size: 9.5px;
    color: rgba(255,255,255,0.75);
    padding: 2px 0;
}
.cta-items li:before { content: '→ '; color: ${BRAND.gold}; }

/* FOOTER */
.footer {
    border-top: 1px solid ${BRAND.border};
    padding-top: 12px;
    margin-top: 20px;
    text-align: center;
}
.footer-brand {
    font-size: 10px;
    font-weight: 700;
    color: ${BRAND.navy};
    letter-spacing: 2px;
}
.footer-sub { font-size: 8px; color: ${BRAND.muted}; margin-top: 4px; }
.footer-disc {
    font-size: 7.5px;
    color: #999;
    margin-top: 10px;
    line-height: 1.5;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
    <div class="cover-logo">W T P</div>
    <h1>${t.title}</h1>
    <div class="cover-divider"></div>
    <div class="subtitle">${t.subtitle}</div>
    <div class="byline">${t.byline}</div>
</div>

<!-- CONTENT -->
<div class="page">
    <div class="how-box">
        <h3>${t.howTitle}</h3>
        <div>${t.howDesc}</div>
    </div>

    ${sectionsHTML}
</div>

<!-- SCORE + CTA -->
<div class="page">
    <div class="score-section">
        <h2>${t.scoreTitle}</h2>
        <table class="score-table">
            ${scoreRowsHTML}
        </table>
        <div class="score-note">${t.scoreNote}</div>
    </div>

    <div class="cta-box">
        <h2>${t.ctaTitle}</h2>
        <p>${t.ctaText}</p>
        <a class="cta-button" href="https://client.wtp.ae">${t.ctaButton}</a>
        <ul class="cta-items">
            ${t.ctaItems.map(i => `<li>${i}</li>`).join('')}
        </ul>
    </div>

    <div class="footer">
        <div class="footer-brand">WTP</div>
        <div class="footer-sub">Banking-First Wealth Transfer Platform</div>
        <div class="footer-sub">wtp.ae | client.wtp.ae</div>
        <div class="footer-disc">${t.disclaimer}</div>
    </div>
</div>

</body>
</html>`;
}

async function generate() {
    const browser = await puppeteer.launch({ headless: 'new' });

    for (const lang of ['en', 'ru']) {
        const html = buildHTML(lang);
        const htmlPath = join(OUT_DIR, `Banking_Readiness_Checklist_${lang.toUpperCase()}.html`);
        const pdfPath = join(OUT_DIR, `Banking_Readiness_Checklist_${lang.toUpperCase()}.pdf`);

        writeFileSync(htmlPath, html);

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: 0, bottom: 0, left: 0, right: 0 },
        });
        await page.close();

        console.log(`✅ ${pdfPath}`);
    }

    await browser.close();
    console.log('\nDone! 2 PDFs generated.');
}

generate().catch(console.error);
