# WTP2 — Инструкция по деплою на Timeweb (RU)

> **КРИТИЧНО:** Следуй этому документу ТОЧНО. Не придумывай ничего нового. Не добавляй .htaccess "по-другому". Не меняй base path. Если что-то работает — не трогай.

---

## Архитектура

```
wtpref.ru (Timeweb) — RU версии
├── index.html              ← main лендинг
├── .htaccess               ← ОДИН файл, в корне, роутинг + security + cache
├── assets/                 ← JS/CSS main
├── banking/
│   ├── index.html          ← banking лендинг
│   ├── assets/             ← JS/CSS banking
│   └── ...
├── realestate/
│   ├── index.html
│   ├── assets/
│   └── ...
├── partners/
│   ├── index.html
│   ├── assets/
│   └── ...
├── docs/
│   ├── partner/            ← EN Partner PDFs
│   ├── process/            ← EN Process PDFs
│   └── ru/
│       ├── partner/        ← RU Partner PDFs
│       └── process/        ← RU Process PDFs
├── WTP_One_Pager_EN.pdf
├── WTP_One_Pager_RU.pdf
├── WTP_Partner_Kit_EN.zip
├── WTP_Partner_Kit_RU.zip
└── (favicons, logos, og-image, robots.txt, sitemap.xml)
```

---

## Ключевые правила

### 1. Все лендинги собираются с `base: /`

**НЕ ИСПОЛЬЗОВАТЬ** `--base=/banking/` или любой другой override!

Все 4 лендинга собираются со стандартным `base: '/'` из `vite.config.ts`.
В HTML-файлах ассеты ссылаются на `/assets/...` (без префикса подпапки).

`.htaccess` в корне перенаправляет запросы с субдоменов в правильные папки.

### 2. `.htaccess` — ОДИН файл в корне

Содержит:
- **Subdomain routing:** `banking.wtpref.ru` → `/banking/`, `realestate.wtpref.ru` → `/realestate/`, `partners.wtpref.ru` → `/partners/`
- **SPA fallback:** для каждого субдомена → свой `index.html`
- **Security headers:** X-Content-Type-Options, X-Frame-Options, CSP, XSS-Protection
- **Compression:** gzip для HTML, CSS, JS, JSON, SVG
- **Caching:** 1 год для CSS/JS/images, 1 час для HTML, 1 месяц для PDF

**НЕ СОЗДАВАТЬ** дополнительные .htaccess в подпапках!

Эталонный `.htaccess` хранится в `scripts/.htaccess-timeweb` (копия из рабочего деплоя `wtpref-ru-bitrix-fix.zip`).

### 3. Внутренние документы НЕ деплоятся

Удалить из deploy:
- `docs/LINKEDIN-PLAYBOOK-RU.pdf`, `docs/MARKETING-PLAN-RU.pdf`
- `docs/marketing-plan-6mo.pdf`, `docs/month-2-plan.pdf`
- `docs/project-process.pdf`, `docs/project-summary.pdf`
- `docs/basics/`, `docs/linkedin/`, `docs/plans/`, `docs/variants/`
- `docs/ru/marketing-plan-6mo.pdf`, `docs/ru/project-process.pdf`, `docs/ru/project-summary.pdf`
- `docs/ru/basics/`, `docs/ru/linkedin/`
- `WTP_One_Pager.pdf` (без суффикса EN/RU), `WTP_One_Pager_preview.png` (без суффикса)

Оставить ТОЛЬКО:
- `docs/partner/*.pdf` (7 файлов EN)
- `docs/process/*.pdf` (6 файлов EN)
- `docs/ru/partner/*.pdf` (7 файлов RU)
- `docs/ru/process/*.pdf` (6 файлов RU)
- `WTP_One_Pager_EN.pdf`, `WTP_One_Pager_RU.pdf` + превью
- `WTP_Partner_Kit_EN.zip`, `WTP_Partner_Kit_RU.zip`

---

## Пошаговый процесс деплоя

### Шаг 1: Билд всех 4 RU лендингов

```bash
cd /Users/konstantin/Desktop/Antygravity\ folder/sync/WTP2

# Main
VITE_LANDING=main VITE_LANG=ru npx vite build

# Banking
VITE_LANDING=banking VITE_LANG=ru npx vite build

# Realestate
VITE_LANDING=realestate VITE_LANG=ru npx vite build

# Partners
VITE_LANDING=partners VITE_LANG=ru npx vite build
```

Результат: `dist/main-ru/`, `dist/banking-ru/`, `dist/realestate-ru/`, `dist/partners-ru/`

### Шаг 2: Сборка deploy-директории

```bash
rm -rf deploy-timeweb
mkdir deploy-timeweb

# Main → корень
rsync -a --exclude='.*' dist/main-ru/ deploy-timeweb/

# Sub-landings → подпапки
rsync -a --exclude='.*' dist/banking-ru/ deploy-timeweb/banking/
rsync -a --exclude='.*' dist/realestate-ru/ deploy-timeweb/realestate/
rsync -a --exclude='.*' dist/partners-ru/ deploy-timeweb/partners/
```

### Шаг 3: .htaccess

```bash
cp scripts/.htaccess-timeweb deploy-timeweb/.htaccess
```

### Шаг 4: Удалить внутренние документы

```bash
cd deploy-timeweb

# Из корня
rm -f docs/LINKEDIN-PLAYBOOK-RU.pdf docs/MARKETING-PLAN-RU.pdf \
      docs/marketing-plan-6mo.pdf docs/month-2-plan.pdf \
      docs/project-process.pdf docs/project-summary.pdf
rm -rf docs/basics/ docs/linkedin/ docs/plans/ docs/variants/
rm -f docs/ru/marketing-plan-6mo.pdf docs/ru/project-process.pdf \
      docs/ru/project-summary.pdf
rm -rf docs/ru/basics/ docs/ru/linkedin/
rm -f WTP_One_Pager.pdf WTP_One_Pager_preview.png

# Из каждого суб-лендинга
for dir in banking realestate partners; do
  rm -f $dir/docs/LINKEDIN-PLAYBOOK-RU.pdf $dir/docs/MARKETING-PLAN-RU.pdf \
        $dir/docs/marketing-plan-6mo.pdf $dir/docs/month-2-plan.pdf \
        $dir/docs/project-process.pdf $dir/docs/project-summary.pdf 2>/dev/null
  rm -rf $dir/docs/basics/ $dir/docs/linkedin/ $dir/docs/plans/ $dir/docs/variants/ 2>/dev/null
  rm -f $dir/docs/ru/marketing-plan-6mo.pdf $dir/docs/ru/project-process.pdf \
        $dir/docs/ru/project-summary.pdf 2>/dev/null
  rm -rf $dir/docs/ru/basics/ $dir/docs/ru/linkedin/ 2>/dev/null
  rm -f $dir/WTP_One_Pager.pdf $dir/WTP_One_Pager_preview.png 2>/dev/null
done
```

### Шаг 5: Создать ZIP

```bash
cd deploy-timeweb

# ВАЖНО: zip с -x '.*' исключает .htaccess! Добавляем его отдельно
zip -r ~/Desktop/WTP2_Timeweb_Deploy.zip . \
    -x '.*' -x '__MACOSX/*' -x '*.DS_Store' -x 'assets 2/*'
zip ~/Desktop/WTP2_Timeweb_Deploy.zip .htaccess
```

### Шаг 6: Верификация

```bash
# Проверить что .htaccess в архиве
zipinfo -1 ~/Desktop/WTP2_Timeweb_Deploy.zip | grep '.htaccess'
# Ожидание: .htaccess

# Проверить banking asset paths (должен быть /assets/, НЕ /banking/assets/)
unzip -p ~/Desktop/WTP2_Timeweb_Deploy.zip banking/index.html | grep 'assets/'
# Ожидание: src="/assets/index-XXXXX.js", href="/assets/index-XXXXX.css"

# Проверить что нет внутренних доков
zipinfo -1 ~/Desktop/WTP2_Timeweb_Deploy.zip | grep -E '(LINKEDIN|MARKETING|marketing-plan|project-process|project-summary|basics/|linkedin/|plans/|variants/)'
# Ожидание: пусто
```

### Шаг 7: Загрузить через FTP

Костя загружает `WTP2_Timeweb_Deploy.zip` через FTP-клиент Timeweb и распаковывает в `public_html/`.

---

## Типичные ошибки (НЕ ПОВТОРЯТЬ)

| Ошибка | Почему ломается | Как правильно |
|--------|----------------|---------------|
| `--base=/banking/` при билде суб-лендингов | Пути становятся `/banking/assets/...`, а .htaccess добавляет ещё `/banking/` → двойной префикс → 404 | Все лендинги с `base: /` |
| Несколько .htaccess в подпапках | Конфликт правил, непредсказуемое поведение | ОДИН .htaccess в корне |
| `zip -x '.*'` без отдельного добавления .htaccess | .htaccess — dotfile, исключается паттерном `.*` | Добавить .htaccess отдельной командой `zip` |
| Убрать .htaccess "потому что его раньше не было" | .htaccess был ВСЕГДА в рабочих деплоях! Без него нет SPA fallback + субдоменный роутинг | Всегда включать .htaccess |
| Скопировать файлы через `cp` на macOS | macOS создаёт дубликаты ("file 2.ext") | Использовать `rsync` |

---

## Эталонные файлы

- **Рабочий .htaccess:** `scripts/.htaccess-timeweb`
- **Рабочие ZIP-архивы (Desktop):** `wtpref-ru-bitrix-fix.zip`, `wtpref-ru-compliance.zip`, `wtpref-ru-audit-fix.zip`
- **vite.config.ts:** `base: '/'` — НЕ МЕНЯТЬ

---

## История деплоев

| Дата | ZIP | Что изменилось |
|------|-----|---------------|
| до 2026-02-26 | wtpref-ru-bitrix-fix.zip | Bitrix form fix. Работает |
| до 2026-02-26 | wtpref-ru-compliance.zip | Compliance + Cookie consent. Работает |
| до 2026-02-26 | wtpref-ru-audit-fix.zip | Audit fixes. Работает |
| до 2026-02-26 | wtpref-ru-copy-audit.zip | Copy audit. Работает |
| 2026-02-26 | WTP2_Timeweb_Deploy.zip | Copy-editing fix (137 issue в 30+ файлах), обновленные PDFs + Partner Kit ZIPs |
