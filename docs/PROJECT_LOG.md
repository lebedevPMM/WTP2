# WTP — Project Document Log

> Last updated: 2026-02-16

## Month 1 Documents

| # | Document | Category | Path | Status |
|---|----------|----------|------|--------|
| 1 | Glossary & Terminology | Basics | `basics/01-glossary.md` | done |
| 2 | Tone of Voice Guide | Basics | `basics/02-tone-guide.md` | done |
| 3 | Rejection Templates | Basics | `basics/03-rejection-templates.md` | done |
| 4 | Process Map Banking-First | Process | `process/01-process-map.md` | done |
| 5 | Intake Checklist (KYC Light) | Process | `process/02-intake-checklist.md` | done |
| 6 | Package Tiers (L0-L3) | Process | `process/03-packages.md` | done |
| 7 | Commercial Proposal Template | Process | `process/04-commercial-proposal.md` | done |
| 8 | Retainer Support Sheet | Process | `process/05-retainer.md` | done |
| 9 | Partner One-Pager | Partner | `partner/01-one-pager.md` | done |
| 10 | Email: First Touch | Partner | `partner/02-email-first-touch.md` | done |
| 11 | Email: Follow-Up | Partner | `partner/03-email-follow-up.md` | done |
| 12 | Email: Pilot Request | Partner | `partner/04-email-pilot-request.md` | done |
| 13 | Weekly Progress Report Template | Partner | `partner/05-weekly-report.md` | done |
| 14 | LinkedIn: Pinned Post #1 (Who We Are) | LinkedIn | `linkedin/01-pinned-who-we-are.md` | done |
| 15 | LinkedIn: Pinned Post #2 (What We Don't Do) | LinkedIn | `linkedin/02-pinned-what-we-dont.md` | done |
| 16 | LinkedIn: Monthly Posts (x4) | LinkedIn | `linkedin/03-monthly-posts.md` | done |
| 17 | LinkedIn: Flagship Case Draft | LinkedIn | `linkedin/04-flagship-case.md` | done |
| 18 | Risk Classification Policy | Process | `process/06-risk-policy.md` | done |

## Additional Documents

| # | Document | Category | Path | Status |
|---|----------|----------|------|--------|
| 19 | 6-Month Marketing Strategy | Marketing | `marketing-plan-6mo.md` | done |
| 20 | Project Summary (client-facing) | Summary | `project-summary.md` | done |
| 21 | Technical Handover | Process | `project-process.md` | done |

## Translations (Russian)

All 21 documents translated to Russian in `docs/ru/` mirroring the EN structure.

| Category | EN Path | RU Path | Status |
|----------|---------|---------|--------|
| Basics (3) | `basics/*.md` | `ru/basics/*.md` | done |
| Process (6) | `process/*.md` | `ru/process/*.md` | done |
| Partner (5) | `partner/*.md` | `ru/partner/*.md` | done |
| LinkedIn (4) | `linkedin/*.md` | `ru/linkedin/*.md` | done |
| Marketing (1) | `marketing-plan-6mo.md` | `ru/marketing-plan-6mo.md` | done |

## Notion Integration

All documents uploaded to Notion workspace:
- **Hub page:** [WTP Documents](https://www.notion.so/3090ff7563f0813993f7d8a0f746da78)
- **Structure:** 4 section pages + marketing strategy
- **Languages:** Each document page contains EN + RU versions
- **Upload script:** `scripts/upload-to-notion.mjs`

## Document Standards

- **Format:** Markdown → PDF via Puppeteer
- **Style:** `docs/templates/doc-styles.css`
- **Script:** `scripts/generate-docs-pdf.mjs`
- **Upload:** `scripts/upload-to-notion.mjs`
- **Fonts:** Inter + Playfair Display (latin + cyrillic)
- **Language:** English + Russian (bilingual)
- **Front matter:** title, date, category, version, language

## Structure

```
docs/
├── basics/        — terminology, tone, templates
├── process/       — process maps, checklists, packages
├── partner/       — one-pager, emails, reports
├── linkedin/      — social media content
├── ru/            — Russian translations (mirror structure)
│   ├── basics/
│   ├── process/
│   ├── partner/
│   ├── linkedin/
│   └── marketing-plan-6mo.md
├── templates/     — CSS styles for PDF
├── marketing-plan-6mo.md
└── PROJECT_LOG.md — this file
```
