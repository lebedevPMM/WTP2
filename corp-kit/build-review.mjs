/**
 * Сборка обзорной версии кита для вычитки коллегами.
 *
 *   node corp-kit/build-review.mjs
 *
 * Собирает corp-kit/dist-review/ — самодостаточную статику, которую можно залить
 * на Cloudflare Pages одной командой. Внутри:
 *   /                       — хаб со ссылками на всё (RU + EN, лендинги + деки + PDF)
 *   /landings/…             — 6 RU-страниц и 6 EN-страниц
 *   /decks/…                — 4 деки в PDF
 *   /shared/…               — общий CSS (лежит выше landings/, поэтому копируется отдельно)
 *
 * ВАЖНО: относительные пути в лендингах (../../shared/styles.css) рассчитаны на то,
 * что корнем сайта служит corp-kit/, а не corp-kit/landings/. Поэтому структура
 * dist-review повторяет структуру corp-kit — ломать её нельзя.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'dist-review');

const copyDir = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else fs.copyFileSync(src, dst);
  }
};

// чистая пересборка
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// 1. лендинги и общий CSS — структуру не менять, от неё зависят относительные пути
copyDir(path.join(ROOT, 'landings'), path.join(OUT, 'landings'));
copyDir(path.join(ROOT, 'shared'), path.join(OUT, 'shared'));

// 2. деки в PDF — их читают, а не листают в браузере
const deckSrc = path.join(ROOT, 'render', 'decks');
const deckOut = path.join(OUT, 'decks');
fs.mkdirSync(deckOut, { recursive: true });
const decks = fs.existsSync(deckSrc)
  ? fs.readdirSync(deckSrc).filter((f) => f.endsWith('.pdf'))
  : [];
for (const f of decks) fs.copyFileSync(path.join(deckSrc, f), path.join(deckOut, f));

// 3. закрываем от индексации — это версия для вычитки, не для публики
fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(OUT, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow\n');

const SERVICES = [
  ['company-setup', 'Открытие компаний', 'Company formation'],
  ['bank-accounts', 'Корпоративные счета', 'Corporate accounts'],
  ['golden-visa', 'Резидентство и Golden Visa', 'Residency and Golden Visa'],
  ['wills', 'Завещание', 'Wills'],
  ['liquidation', 'Ликвидация компаний', 'Company liquidation'],
];

const rows = SERVICES.map(
  ([slug, ru, en]) => `      <tr>
        <td>${ru}</td>
        <td><a href="/landings/${slug}/">RU</a></td>
        <td><a href="/landings/en/${slug}/">EN</a></td>
        <td class="en">${en}</td>
      </tr>`
).join('\n');

const deckRows = decks
  .map((f) => `      <tr><td>${f.replace('WTP-', '').replace('.pdf', '').toUpperCase()}</td><td colspan="3"><a href="/decks/${f}">${f}</a></td></tr>`)
  .join('\n');

fs.writeFileSync(
  path.join(OUT, 'index.html'),
  `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>WTP Corp Kit — версия для вычитки</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/shared/styles.css">
<style>
  .wrap { max-width: 900px; }
  table.rev { width: 100%; border-collapse: collapse; margin-top: 32px; background: var(--bg-white); border: 1px solid var(--border-subtle); border-radius: 3px; }
  table.rev th, table.rev td { text-align: left; padding: 14px 20px; border-bottom: 1px solid var(--border-subtle); font-size: 15px; }
  table.rev thead th { font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); }
  table.rev tbody tr:last-child td { border-bottom: none; }
  table.rev a { color: var(--accent-gold-dark); font-weight: 500; }
  table.rev a:hover { text-decoration: underline; }
  table.rev .en { color: var(--text-muted); font-size: 13.5px; }
  .note { margin-top: 36px; padding: 22px 26px; background: var(--bg-white); border: 1px solid var(--border-subtle); border-left: 2px solid var(--accent-gold); border-radius: 3px; font-size: 15px; color: var(--text-secondary); }
  .note ul { margin: 12px 0 0 20px; }
  .note li { padding: 4px 0; }
</style>
</head>
<body>
<div class="top-band"><div class="top">
  <span class="brandmark">WTP <small>Corp Kit · вычитка</small></span>
</div></div>

<main>
<section class="hero"><div class="wrap">
  <span class="eyebrow">Внутренняя версия</span>
  <h1>Материалы <span class="accent">на вычитку</span></h1>
  <p class="lead">Пять услуг, две языковые версии, четыре презентации. Страница закрыта от индексации.</p>
</div></section>

<section class="section section-white"><div class="wrap">
  <span class="eyebrow">Лендинги</span>
  <table class="rev">
    <thead><tr><th>Услуга</th><th>RU</th><th>EN</th><th>English title</th></tr></thead>
    <tbody>
      <tr><td><strong>Хаб пяти услуг</strong></td><td><a href="/landings/">RU</a></td><td><a href="/landings/en/">EN</a></td><td class="en">Service hub</td></tr>
${rows}
    </tbody>
  </table>
</div></section>

<section class="section"><div class="wrap">
  <span class="eyebrow">Презентации</span>
  <table class="rev">
    <thead><tr><th>Дека</th><th colspan="3">PDF</th></tr></thead>
    <tbody>
${deckRows || '      <tr><td colspan="4">PDF не собраны — запустите node corp-kit/render.cjs decks</td></tr>'}
    </tbody>
  </table>

  <div class="note">
    <strong>Что вычитывать, а что не трогать</strong>
    <ul>
      <li><strong>Цифры править нельзя.</strong> Все сверены с внутренним реестром фактов. Сомнение — оставьте комментарий, не правку.</li>
      <li><strong>Блоки «Чего мы не обещаем» не смягчать.</strong> Это намеренная позиция, а не оговорка.</li>
      <li><strong>Дисклеймеры не сокращать.</strong> В них юридическая защита.</li>
      <li><strong>На странице «Завещание» третье лицо</strong> («владелец», «человек») — намеренная дистанция в чувствительной теме, а не ошибка.</li>
      <li><strong>Повтор «только Дубай»</strong> обязателен на каждом носителе по резидентству.</li>
      <li><strong>Ждём:</strong> опечатки, согласование, пунктуация, тяжёлые обороты, неясные места, расхождения между RU и EN.</li>
    </ul>
  </div>
</div></section>
</main>

<footer><div class="wrap">
  <p class="legal-line">WTP &middot; Corp Kit &middot; внутренняя версия для вычитки</p>
  <p class="disclaimer">Страница закрыта от индексации. Не для внешнего распространения.</p>
</div></footer>
</body>
</html>
`
);

const count = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { recursive: true }).filter((f) => String(f).endsWith('.html')).length
    : 0;

console.log(`Готово → ${OUT}`);
console.log(`  HTML-страниц: ${count(path.join(OUT, 'landings')) + 1}`);
console.log(`  PDF-дек:      ${decks.length}`);
console.log(`  robots.txt + _headers: noindex выставлен`);
