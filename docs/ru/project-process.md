---
title: "WTP — Технический хендовер"
date: 2026-02-16
category: process
version: 1.0
language: ru
---

# WTP — Технический хендовер

> Всё, что нужно для продолжения работы над проектом: где что лежит, как связано, как вносить изменения.

---

## Быстрый старт

```
cd WTP2
npm install
npm run dev        # dev-сервер на localhost:5176
npm run build      # production-сборка → dist/
npm run deploy     # деплой на GitHub Pages
```

Окружение: нужен `.env.local` с `VITE_BITRIX_WEBHOOK` для отправки форм в CRM.

---

## Структура проекта

```
WTP2/
├── public/
│   ├── logo-black.svg       # Логотип для светлого фона
│   ├── logo-white.svg       # Логотип для тёмного фона
│   └── docs/                # Сгенерированные PDF
├── src/
│   ├── components/          # Общие UI-компоненты
│   │   ├── Navbar.tsx        # Навигация + гамбургер + переключатель языка
│   │   ├── Footer.tsx        # Футер с логотипом и контактами
│   │   ├── Layout.tsx        # Обёртка страницы (скролл наверх при смене роута)
│   │   ├── Logo.tsx          # SVG-логотип (чёрный/белый, настраиваемая высота)
│   │   ├── Button.tsx, Card.tsx, RiskRow.tsx, ProcessStep.tsx
│   │   └── FormInput/Select/Textarea.tsx  # Компоненты форм
│   ├── pages/
│   │   ├── LandingPage.tsx   # Главная — все 8 секций
│   │   ├── ProductPage.tsx   # Детальная страница продукта (8 продуктов × 2 языка)
│   │   ├── SubmitCasePage.tsx # KYC-форма → Битрикс24
│   │   ├── ContactPage.tsx   # Контактная форма → Битрикс24
│   │   └── ...               # Process, Terms, другие страницы
│   ├── lib/
│   │   ├── LanguageContext.tsx # Все переводы (EN+RU) + функция t()
│   │   ├── bitrix.ts          # Битрикс24 CRM API
│   │   ├── validations.ts     # Zod-схемы форм
│   │   └── constants.ts       # Списки стран/юрисдикций
│   ├── App.tsx                # Определение маршрутов
│   ├── main.tsx               # Точка входа
│   └── index.css              # Все стили — один файл, CSS-переменные
├── docs/                      # Документация (исходники Markdown)
│   ├── basics/                # Глоссарий, тон голоса, шаблоны отказов
│   ├── process/               # Карты процессов, чеклисты, пакеты
│   ├── partner/               # One-pager, email-шаблоны, отчёты
│   ├── linkedin/              # Социальный контент
│   ├── ru/                    # Русские переводы (зеркальная структура)
│   ├── templates/             # CSS для генерации PDF
│   ├── marketing-plan-6mo.md
│   ├── project-summary.md     # Сводка для заказчика
│   └── project-process.md     # Технический хендовер (EN-версия)
├── scripts/
│   ├── generate-docs-pdf.mjs  # Markdown → PDF (Puppeteer)
│   ├── upload-to-notion.mjs   # Пакетная загрузка всех документов в Notion
│   ├── upload-single-doc.mjs  # Загрузка одного документа в Notion
│   └── generate-pdf.mjs       # PDF для One-Pager
└── brain/                     # Документы фреймворка Antigravity (мета)
```

---

## Как что работает

### Переводы (i18n)

Весь текст проходит через `t('ключ')` из `LanguageContext.tsx`. Язык хранится в `localStorage` (`wtp-lang`), переключатель в Navbar.

**Чтобы добавить перевод:**
1. Открыть `src/lib/LanguageContext.tsx`
2. Добавить ключ в оба словаря `en:` и `ru:`
3. Использовать `t('ваш.ключ')` в любом компоненте

Сейчас ~200 ключей. Если проект вырастет до 500+, стоит мигрировать на `react-i18next` с отдельными JSON-файлами.

### Страницы продуктов

`ProductPage.tsx` содержит все данные продуктов inline, с ключом по языку, затем по slug:

```
productData[lang][slug] → { title, subtitle, intro, services[], redFlags[], result }
```

Роут: `/products/:slug`. Slug'и: `banking`, `premium-banking`, `business-setup`, `residency`, `tax-residency`, `accounting`, `real-estate`, `wealth`.

**Чтобы добавить продукт:**
1. Добавить данные в `productData` для `en` и `ru`
2. Добавить i18n-ключи в `LanguageContext.tsx` (pill, title, desc, cta)
3. Добавить карточку в `LandingPage.tsx` в collection grid
4. Выбрать акцент: `--accent-magma`, `--accent-gold`, `--accent-teal` или `--accent-nebula`

### Формы → CRM

`react-hook-form` + `zod` для валидации. При отправке → `submitToBitrix()` из `bitrix.ts` → Битрикс24 `crm.lead.add` REST API.

Webhook URL в `.env.local`:
```
VITE_BITRIX_WEBHOOK=https://irest.bitrix24.ru/rest/6729/xxxxx/
```

### Стили

Один файл: `src/index.css`. Без CSS-модулей, без Tailwind.

- CSS-переменные в `:root` (цвета, шрифты, отступы, градиенты)
- Компонентные классы: `.btn`, `.card`, `.nav`, `.collection-card` и т.д.
- 3 брейкпоинта: desktop, `900px`, `480px`
- 4 акцентных градиента: magma (красно-оранжевый), gold (тёмное золото), teal (тёмно-синий), nebula (фиолетовый)

### Логотип

SVG-вордмарк, два файла: `logo-black.svg`, `logo-white.svg`. Компонент `Logo.tsx` с пропсами `variant` и `height`. Navbar: 48px, Footer: 40px.

---

## Скрипты

| Команда | Что делает |
|---------|------------|
| `node scripts/generate-docs-pdf.mjs` | Генерирует PDF из `docs/*.md` → `public/docs/` |
| `node scripts/upload-to-notion.mjs` | Пакетная загрузка всех документов в Notion (создаёт новый хаб) |
| `node scripts/upload-single-doc.mjs docs/file.md docs/ru/file.md` | Загружает один документ в существующий хаб Notion |

---

## Ключевые решения

| Что | Решение | Почему |
|-----|---------|--------|
| Стили | Кастомный CSS | Tailwind пробовали — сломал дизайн. Кастомный CSS работает хорошо. |
| i18n | React Context | ~200 ключей, 2 языка. Легковесно, без зависимостей. |
| CRM | Битрикс24 | Существующая система клиента. |
| Шрифты | Playfair Display + Inter | Соответствуют Didot-стилю логотипа. Поддержка кириллицы. |
| PDF | Puppeteer | Кастомные CSS-шаблоны, пакетная обработка. |
| Дизайн | Stitch MCP | Использовать для всех UI/layout-решений в дальнейшем. |

---

## Что было сделано (хронология)

**13 февраля** — Инфраструктура форм: компоненты, валидация, страницы Submit Case + Contact

**14 февраля** — Интеграция с Битрикс24, SEO мета-теги

**16 февраля** — Большой спринт:
- Интеграция логотипа (SVG, чёрный + белый варианты)
- Полная система i18n (EN/RU, ~200 ключей)
- Адаптивный дизайн (3 брейкпоинта, гамбургер-меню)
- 18 документов (Basics, Process, Partner, LinkedIn)
- 6-месячная маркетинговая стратегия
- Русские переводы всех документов
- Пайплайн генерации PDF
- Загрузка в Notion (все документы двуязычные)
- Редизайн секции продуктов (галерейные карточки по референсу Stitch)
- Расширение с 4 до 8 продуктов с полным двуязычным контентом
- Несколько раундов UI-полировки (размер логотипа, контраст, скролл, нейминг)

---

## Что может быть дальше

- Деплой на GitHub Pages
- Многошаговый KYC-визард (расширение формы Submit Case)
- Email-уведомления при отправке форм (Resend / Supabase Edge Functions)
- Аналитика (GA4 / Plausible)
- Оптимизация производительности (lazy loading, code splitting)
- A/B-тестирование hero и CTA
- Дополнительные языки
