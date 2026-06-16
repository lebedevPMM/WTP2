# V2 — "The Control Room"

Swiss-technical precision on cool light graphite. The page reads like an air-traffic
operations console run by engineers: visible grid, numbered modules, mono telemetry,
one safety-amber signal. The message is implicit in the form: **we run wealth
relocation like an engineering operation.** Competence converts; glitter repels.

Influences: Linear's restraint × Stripe-docs density × ATC consoles / Swiss timetables.

---

## 1. Tokens

Defined on `.v2-root` (every rule in `v2.css` is scoped under `.v2-root`).

### Color

| Token | Value | Intent | Boundary rules |
|---|---|---|---|
| `--v2-paper` | `#EDEFF2` | Page field. Cool paper, slightly blue-grey. | The dominant surface. Never tinted warm. |
| `--v2-paper-2` | `#E6E9ED` | Recessed surfaces (footer, table header rows). | Only one step down from paper. No deeper greys on light side. |
| `--v2-paper-3` | `#F7F8FA` | Raised surfaces (hover rows, station squares). | Hover/active surfaces only. |
| `--v2-ink` | `#14161A` | Graphite ink. Headlines, body, borders at full strength. | Text + the two dark panels (console, final CTA). |
| `--v2-ink-60` | `rgba(20,22,26,.66)` | Muted body, labels, source lines. | AA on paper (≈5.4:1). Lowest alpha allowed for any text. |
| `--v2-ink-45` | `rgba(20,22,26,.48)` | Decoration only: registration marks, ruler ticks. | **Never for words.** |
| `--v2-line` | `rgba(20,22,26,.12)` | Hairline grid — a first-class design element. | 1px only. Never thicker, never dashed. |
| `--v2-line-2` | `rgba(20,22,26,.24)` | Strong hairlines: module top rules, table frames. | 1px only. |
| `--v2-amber` | `#FF8A00` | THE signal. | **Strictly:** primary CTA background, active indicators, data highlights, progress line, caret, squares. Never paragraph text, never backgrounds of sections. |
| `--v2-amber-deep` | `#BC5500` | Amber as *large* text on paper (4.1:1 ≥ 3:1 large-AA). | Display-size words only (≥24px). |
| `--v2-amber-text` | `#9A4600` | Amber as *small* text on paper (5.6:1 AA). | Micro-labels, tier "FREE", text links. |
| `--v2-screen` | `#14161A` | Console / final-panel background. | Exactly two dark blocks per page: hero console + final CTA. |
| `--v2-screen-ink` | `#E9EBEE` | Text on dark. | — |
| `--v2-screen-muted` | `rgba(233,235,238,.62)` | Muted text on dark (AA). | — |

On-amber text is always `--v2-ink` (7.7:1). On-dark amber `#FF8A00` is 7.3:1 — safe at any size.

### Type

| Role | Face | Spec |
|---|---|---|
| Display | **Archivo** variable (`wdth` 62–125) | `font-stretch:125%`, weight 860–900, UPPERCASE, tracking −0.01em, leading 0.94 |
| Body | **Archivo** | 400–500, 16.5px/1.65, sentence case |
| Data / labels / numerals | **IBM Plex Mono** | 400–600, `tabular-nums`; micro-labels 11px, UPPERCASE, tracking +0.14em |

Size jumps ≥3×: micro-label 11px → body 16.5px → H2 ~46–54px → H1 ~88px → stat numerals ~64px mono.
Fonts injected as `<link>` in `useEffect` (id-checked): `Archivo:wdth,wght@62..125,100..900` + `IBM Plex Mono 400/500/600`.

### Grid & chrome

- Frame max-width 1360px; two vertical **rails** (1px `--v2-line`) run the full page height inside the frame — drawn (scaleY) on load.
- Every module opens with the same chrome: strong top rule + corner ticks + mono `IDX NN / NAME` left, `NN / 08` right. The *inside* of every module is a different layout (statement split, ruled rows, spec table, route diagram, dark panel) — chrome repeats, rhythm doesn't.
- Hero carries a faint 64px blueprint field (≤6% alpha), masked out toward the fold.
- Registration marks (`+`) sit on the corners of both dark panels.

## 2. Module map (narrative spine preserved)

```
NAV    wordmark WTP▪ · METHOD/SERVICES/ENGAGEMENT/OPERATORS · [BOOK PRE-SCREEN]
IDX 00 OPERATIONS BRIEF   hero headline + lead + 2 CTAs + PRE-SCREEN CONSOLE (signature)
IDX 01 SIGNALS            4 sourced stats, mono numerals count up once (rAF)
IDX 02 THE BANKING WALL   problem statement + 10-applications visual (3 struck amber)
IDX 03 THE METHOD         SVG route BANK→COMPANY→VISA→ASSETS, line draws on scroll-in
IDX 04 SERVICE LINES      4 full-bleed hairline rows → /services/:slug (data: services.ts)
IDX 05 ENGAGEMENT LADDER  spec-sheet table L0–L3, mono fees, L0 row = entry, links /contact
IDX 06 WHO WE HELP        SEG A–D ruled rows (UK non-dom / DACH / NL Box 3 / partners) → /contact
IDX 07 NAMED OPERATORS    3 experts from experts.ts — monogram, scope, credibility
IDX 08 NEXT ACTION        dark panel: RUN THE PRE-SCREEN + mono spec list + CTAs
FOOT   compact: brand line · service links · protocol links · provenance motto
```

## 3. Signature element

**The pre-screen console** (hero, right column): a dark ops panel where mono lines
print sequentially as if a bankability check is running — `SCAN source of funds … OK`,
`CHECK company-first route … DECLINE RISK ~30%`, `ROUTE bank-first … FOUND`, ending in
an amber `STATUS: BANKABLE — BOOK YOUR PRE-SCREEN` block. Steady (non-blinking) amber
block caret tracks the active line; GST clock ticks in the title bar; the run loops
after a 6.8s hold and pauses off-screen (IntersectionObserver). Under
`prefers-reduced-motion` the console renders its final state, static, no loop.
Even the console's number carries provenance: `SRC: WTP PRE-SCREEN DATA`.

## 4. Motion rules

- 150–220ms ease-out transitions; no bounce, no float, no parallax, no glassmorphism.
- One orchestrated hero load: rails draw (scaleY, 550ms) → headline lines snap in
  staggered (240ms, 70ms apart) → lead/CTAs/console follow ≤400ms.
- Count-up numerals: rAF, ease-out-cubic, once per view. The 0% tax stat counts *down*
  45→0 (the only joke on the page, and it's a fiscal one).
- Route diagram: amber progress line draws via `stroke-dashoffset` (1s), station
  squares fill sequentially; `vector-effect: non-scaling-stroke` keeps hairlines crisp.
- Reveals: IntersectionObserver adds `.is-in`; hidden initial states exist **only**
  inside `@media (prefers-reduced-motion: no-preference)` — reduced-motion users get a
  fully static, fully visible page. First paint always shows headline + primary CTA.

## 5. Voice

Expert, consultative, numeric, zero hype. Every stat carries `SRC:` — provenance is
brand law (footer motto: "Every number above carries its source."). Banned on this
page: superlatives without numbers, exclamation marks, decorative adjectives.
