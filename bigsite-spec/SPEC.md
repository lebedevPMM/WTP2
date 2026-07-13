# WTP Big Site — SDD Build Spec (Constitution)

> Spec-Driven Development core. This is the contract the build (and the Workflow fan-out) obey.
> Source of truth for STRUCTURE: `sync/projects/WTP2-site-map-IA.md`. Source for CONTENT: `sync/projects/WTP2-content-inventory.md`.
> Project: WTP2 | Created 2026-06-12 | Stack decision: fresh clean Vite+React in `WTP2/bigsite/` | Core: SDD (closes E1) | STAKES: HIGH

---

## 1. Constitution (non-negotiable laws)

1. **One domain, path-based.** All routes under `wtp.ae/<path>`. No subdomain split. Single Vite build (NOT the legacy `VITE_LANDING×VITE_LANG` env-split).
2. **Authority is the product.** Every service page, case, and article carries a NAMED expert (photo + title + signature). Anonymous "our team" is banned.
3. **Outcome-led headlines.** Every H1 states an outcome + (where possible) a timeframe. Never "We help with wealth transfer." (Doctrine: `sync/references/wtp-site-direction.md`.)
4. **One CTA verb.** Primary CTA everywhere = **"Book a pre-screen"** (personalized to the page's named expert where one exists). Gold gradient button.
5. **Provenance on every number.** Stat tiles and claims show a source footnote. Unverified numbers from the content inventory are NOT shipped — replaced with a verified one or cut. (LinkedIn-audit lesson.)
6. **Build the component library first.** Pages assemble from §3 components. No bespoke markup per page beyond data objects.
7. **Brand = the LOCKED hero palette** (§2). Dark indigo + gold + gen-relief. NOT cream, NOT navy, NOT "заезженное" stock.
8. **EN first.** i18n structure left in place (locale-ready strings) but only EN ships now. DE/RU/ES/AR/FR → backlog.

---

## 2. Design tokens (from locked hero `hero-video-scroll/index.html` — canonical)

```css
:root{
  --deep:#08071a;        /* page background (dark indigo-black) */
  --deep-2:#0d0b22;      /* raised surface / cards */
  --deep-3:#13102e;      /* hover / nested surface */
  --ink:#EDEBF6;         /* primary text */
  --ink-70:rgba(237,235,246,.78);
  --ink-55:rgba(237,235,246,.6);
  --ink-40:rgba(237,235,246,.4);
  --line:rgba(237,235,246,.14);  /* hairline borders */
  --gold:#FFC65A;        /* primary accent */
  --amber:#F5A623;       /* CTA gradient start */
  --rose:#E0518A;        /* CTA gradient end */
  --cta:linear-gradient(135deg,var(--amber),var(--rose));
  --gold-grad:linear-gradient(120deg,var(--gold),var(--amber));
}
```

- **Display type:** `Inter Tight`, weight 800, letter-spacing `-0.03em`, line-height 1.02. Headline gradient: white→`#cfc8f0`; emphasized words use `--gold-grad` clipped to text.
- **Body type:** `Inter`, 400/500, line-height 1.6, color `--ink` at 85% on dark.
- **Eyebrow:** Inter Tight 700, 12px, letter-spacing .22em, uppercase, color `--gold`, with a 34px gold rule before it.
- **Buttons:** pill `border-radius:999px`. Primary = `--cta` gradient, text `#1a0d10`, shadow `0 6px 26px rgba(224,81,138,.35)`. Ghost = transparent, 1.5px border `--ink` 28%, hover border `--gold`.
- **Surfaces:** cards = `--deep-2` with `--line` border; subtle gold glow on hover. No pure-white surfaces.
- **Logo:** `site-prototypes/concept-map/logo-white.svg` (white wordmark on dark).
- **Serif note (deviation flagged):** IA wanted Playfair serif H1s (tied to the superseded cream brand). Using Inter Tight to match the locked hero. Re-raise at the design gate if serif-on-dark is wanted.

---

## 3. Component library (build once, §7 of IA) — contracts

| Component | Props (TS shape) | Notes |
|---|---|---|
| `MegaNav` | `{transparent?:boolean}` | 6 items (Services·Banking-First·Jurisdictions·Insights·About + persistent CTA). transparent over hero, solid `--deep` w/ blur elsewhere. Mobile accordion. |
| `Footer` | — | 5 cols (Services·Explore·Company·Experts·Get started) + legal strip + compliance microcopy + named-experts column. |
| `Hero` | — | Home only. Scroll-scrub video (port of locked prototype): sticky `420vh` stage, `video.currentTime = smoothed scrollProgress * duration`, 3 text beats, prime-on-load, route-fill rail. Assets copied to `public/hero/`. |
| `PreScreenCTABlock` | `{expert?:Expert}` | Closing band on every page. Outcome headline + expert thumb + "Book a pre-screen with [expert]" + trust microcopy. |
| `ExpertBioCard` | `{expert:Expert, variant?:'full'\|'compact'}` | photo·name·title/scope·1-line credibility·signature·CTA. |
| `CaseCard` | `{case:Case}` | situation tag·outcome headline(metric+timeframe)·service/jurisdiction chips·lead-expert thumb·link. |
| `ArticleCard` | `{article:Article}` | category tag·outcome title·author photo+name·read-time·link. |
| `JurisdictionComparisonTable` | `{columns:string[]}` | rows: personal tax, banking access, residency cost, timeline, exit-tax exposure, substance req. Filterable to 2 cols. |
| `StatBar` | `{stats:{value,label,source}[]}` | 3–4 tiles, each with provenance footnote (law #5). |
| `StepperBankingFirst` | `{current?:1\|2\|3\|4}` | Bank→Company→Visa→Assets, highlightable current step. |
| `Breadcrumb` | `{trail:{label,href}[]}` | emits BreadcrumbList JSON-LD. |
| `Byline` | `{author:Expert, date, readMin}` | article author block. |
| `Section` / `Eyebrow` / `Button` | primitives | shared layout atoms. |

**Templates (one each, data-fed):**
- `ServiceTemplate` — renders §3 of IA from a `ServiceData` object (×4 lines).
- `ArticleTemplate` — §4c article anatomy (collection item).
- `CaseTemplate` — situation→constraint→action→outcome (collection item).
- `JurisdictionTemplate` — comparator pages (×N from data).

---

## 4. Content model (the tag graph — §4b of IA)

```ts
type Expert = { id, name, title, scope, credibility, photo, signature?, services:string[] }
type Article = { slug, title, category:'banking'|'residency-visa'|'business-setup'|'assets-tax',
                 author:ExpertId, date, readMin, body /*md*/, services?, segments?, jurisdictions?, tier? }
type Case   = { slug, title, situation, constraint, action, outcomeMetric, timeframe,
                services:string[], segments?, jurisdictions?, leadExpert:ExpertId }
type ServiceData = { line, slug, outcomeHeadline, tierRange, leadExpert, problem, steps[], deliverables[], faqs[] }
```

- Content lives in `src/content/{experts,articles,cases,services,jurisdictions}.ts` (+ article bodies as `.md` via `marked`).
- Service/segment/jurisdiction pages AUTO-PULL related cases & articles by tag — no manual cross-linking.
- All content sourced from `WTP2-content-inventory.md`. GAP-flagged items get a tasteful placeholder + a `// TODO: source` marker, never invented facts.

---

## 5. Routes (P0 launch set — fan-out lanes)

`/` · `/banking-first` · `/banking-first/pre-screen` · `/services` · `/services/banking` · `/services/business-setup` · `/services/residency-visa` · `/services/assets-wealth` · `/jurisdictions` · `/jurisdictions/uae` · `/cases` · `/cases/:slug` · `/insights` · `/insights/:category` · `/insights/:category/:slug` · `/about` · `/about/team` · `/contact` · `/legal/{privacy,terms,disclaimer}` · `/thank-you`

SPA via react-router. `public/_redirects` → `/* /index.html 200` for CF Pages.

---

## 6. Done-criteria (verify BEFORE claiming complete — Rule 5)

Per page:
1. Builds clean (`npm run build`, no TS errors).
2. Renders at the route (Playwright smoke at desktop + mobile width).
3. Has: MegaNav, the page's IA sections, a named expert where IA requires one, a PreScreenCTABlock, Footer.
4. Outcome-led H1, gold CTA, dark-brand tokens, no cream/white surfaces.
5. No unsourced numbers (law #5).

Site-level:
- Hero scroll-scrub works over the range server (HTTP Range) — line draws on scroll.
- Nav links resolve to real routes (no dead links).
- Design gate: Konstantin reviews via browser URL.

---

## 7. Build order

A. Scaffold (Vite+React+TS+Tailwind4+router+marked) → tokens.css → Tailwind theme.
B. Component library (§3) + content model (§4) + seed content from inventory.
C. Home (hero + all homepage bands) — locks the visual language.
D. Workflow fan-out: remaining P0 routes (§5), each lane = one page assembled from B, build+smoke per lane.
E. Design gate (browser URLs) → iterate.
