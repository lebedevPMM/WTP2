---
title: "WTP — Technical Handover"
date: 2026-02-16
category: process
version: 1.0
language: en
---

# WTP — Technical Handover

> Everything you need to continue working on this project: where things are, how they're connected, how to make changes.

---

## Quick start

```
cd WTP2
npm install
npm run dev        # dev server on localhost:5176
npm run build      # production build → dist/
npm run deploy     # push to GitHub Pages
```

Environment: requires `.env.local` with `VITE_BITRIX_WEBHOOK` for CRM form submissions.

---

## Project structure

```
WTP2/
├── public/
│   ├── logo-black.svg       # Logo for light backgrounds
│   ├── logo-white.svg       # Logo for dark backgrounds
│   └── docs/                # Generated PDFs
├── src/
│   ├── components/          # Shared UI components
│   │   ├── Navbar.tsx        # Navigation + hamburger + language toggle
│   │   ├── Footer.tsx        # Footer with logo + contacts
│   │   ├── Layout.tsx        # Page wrapper (scroll-to-top on route change)
│   │   ├── Logo.tsx          # SVG logo (black/white, configurable height)
│   │   ├── Button.tsx, Card.tsx, RiskRow.tsx, ProcessStep.tsx
│   │   └── FormInput/Select/Textarea.tsx  # Form components
│   ├── pages/
│   │   ├── LandingPage.tsx   # Main page — all 8 sections
│   │   ├── ProductPage.tsx   # Product detail (8 products × 2 languages)
│   │   ├── SubmitCasePage.tsx # KYC form → Bitrix24
│   │   ├── ContactPage.tsx   # Contact form → Bitrix24
│   │   └── ...               # Process, Terms, other pages
│   ├── lib/
│   │   ├── LanguageContext.tsx # All translations (EN+RU) + t() function
│   │   ├── bitrix.ts          # Bitrix24 CRM API
│   │   ├── validations.ts     # Zod form schemas
│   │   └── constants.ts       # Country/jurisdiction lists
│   ├── App.tsx                # Route definitions
│   ├── main.tsx               # Entry point
│   └── index.css              # All styles — single file, CSS variables
├── docs/                      # Documentation (Markdown source)
│   ├── basics/                # Glossary, tone guide, rejection templates
│   ├── process/               # Process maps, checklists, packages
│   ├── partner/               # One-pager, email templates, reports
│   ├── linkedin/              # Social content
│   ├── ru/                    # Russian translations (mirror structure)
│   ├── templates/             # CSS for PDF generation
│   ├── marketing-plan-6mo.md
│   ├── project-summary.md     # Client-facing summary
│   └── project-process.md     # This file (technical handover)
├── scripts/
│   ├── generate-docs-pdf.mjs  # Markdown → PDF (Puppeteer)
│   ├── upload-to-notion.mjs   # Batch upload all docs to Notion
│   ├── upload-single-doc.mjs  # Upload one doc to Notion
│   └── generate-pdf.mjs       # One-Pager standalone PDF
└── brain/                     # Antigravity framework docs (meta)
```

---

## How things work

### Translations (i18n)

All text goes through `t('key')` from `LanguageContext.tsx`. Language stored in `localStorage` (`wtp-lang`), toggle in Navbar.

**To add a translation:**
1. Open `src/lib/LanguageContext.tsx`
2. Add the key to both `en:` and `ru:` dictionaries
3. Use `t('your.key')` in any component

~200 keys currently. If the project grows to 500+, consider migrating to `react-i18next` with separate JSON files.

### Product pages

`ProductPage.tsx` contains all product data inline, keyed by language then slug:

```
productData[lang][slug] → { title, subtitle, intro, services[], redFlags[], result }
```

Route: `/products/:slug`. Slugs: `banking`, `premium-banking`, `business-setup`, `residency`, `tax-residency`, `accounting`, `real-estate`, `wealth`.

**To add a product:**
1. Add data in `productData` for both `en` and `ru`
2. Add i18n keys in `LanguageContext.tsx` (pill, title, desc, cta)
3. Add a card in `LandingPage.tsx` collection grid
4. Pick accent: `--accent-magma`, `--accent-gold`, `--accent-teal`, or `--accent-nebula`

### Forms → CRM

`react-hook-form` + `zod` validation. On submit → `submitToBitrix()` from `bitrix.ts` → Bitrix24 `crm.lead.add` REST API.

Webhook URL in `.env.local`:
```
VITE_BITRIX_WEBHOOK=https://irest.bitrix24.ru/rest/6729/xxxxx/
```

### Styles

Single file: `src/index.css`. No CSS modules, no Tailwind.

- CSS variables in `:root` (colors, fonts, spacing, gradients)
- Component classes: `.btn`, `.card`, `.nav`, `.collection-card`, etc.
- 3 breakpoints: desktop, `900px`, `480px`
- 4 accent gradients: magma (red-orange), gold (dark gold), teal (dark blue), nebula (purple)

### Logo

SVG wordmark, two files: `logo-black.svg`, `logo-white.svg`. Component `Logo.tsx` with `variant` and `height` props. Navbar: 48px, Footer: 40px.

---

## Scripts

| Command | What it does |
|---------|--------------|
| `node scripts/generate-docs-pdf.mjs` | Generates PDFs from all `docs/*.md` → `public/docs/` |
| `node scripts/upload-to-notion.mjs` | Batch uploads all docs to Notion (creates new hub) |
| `node scripts/upload-single-doc.mjs docs/file.md docs/ru/file.md` | Uploads one doc to existing Notion hub |

---

## Key decisions

| What | Decision | Why |
|------|----------|-----|
| Styling | Custom CSS | Tailwind was tried, broke the design. Custom CSS works well. |
| i18n | React Context | ~200 keys, 2 languages. Lightweight, no deps. |
| CRM | Bitrix24 | Client's existing system. |
| Fonts | Playfair Display + Inter | Match the Didot-style logo. Cyrillic support. |
| PDFs | Puppeteer | Custom CSS templates, batch processing. |
| Design | Stitch MCP | Use for all UI/layout decisions going forward. |

---

## What was built (timeline)

**Feb 13** — Form infrastructure: form components, validation, Submit Case + Contact pages

**Feb 14** — Bitrix24 CRM integration, SEO meta-tags

**Feb 16** — Major sprint:
- Logo integration (SVG, black + white variants)
- Full i18n system (EN/RU, ~200 keys)
- Responsive design (3 breakpoints, hamburger menu)
- 18 documents created (Basics, Process, Partner, LinkedIn)
- 6-month marketing strategy
- Russian translations of all documents
- PDF generation pipeline
- Notion upload (all docs bilingual)
- Product section redesign (Stitch-inspired gallery cards)
- Expanded from 4 to 8 products with full bilingual content
- Multiple rounds of UI polish (logo size, contrast, scroll, naming)

---

## What could come next

- Deploy to GitHub Pages
- Multi-step KYC wizard (expand Submit Case)
- Email notifications on form submit (Resend / Supabase Edge Functions)
- Analytics (GA4 / Plausible)
- Performance optimization (lazy loading, code splitting)
- A/B testing on hero and CTA
- Additional languages
