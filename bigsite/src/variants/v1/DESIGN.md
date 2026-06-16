# V1 — "The Private Ledger"

**Thesis.** Every wealth-relocation firm ships the same dark-navy-and-gold fintech gloss. V1 counter-positions as print: the FT Weekend supplement crossed with a Swiss private bank's annual report. Warm paper, near-black ink, one oxblood accent, hairline rules doing the structural work, and a footnote apparatus that makes "every number carries its source" *visible* — provenance as typography, not as a claim.

**Audience logic.** The reader is wealthy and skeptical. Restraint converts; glitter repels. Nothing floats, nothing bounces, nothing glows. The page behaves like a document that was set, proofed, and signed.

---

## 1. Tokens

All tokens live on `.v1-root` (the page is fully self-scoped; no body/html rules).

| Token | Value | Intent | Boundary rule |
|---|---|---|---|
| `--v1-paper` | `#F7F2E8` | Page ground. Warm archival paper. | The only large surface. Never pure white anywhere. |
| `--v1-paper-deep` | `#F0E8D7` | Band/card ground (ledger section, RSVP card). | Only as full-bleed band or card fill; never as text color. |
| `--v1-ink` | `#181510` | Near-black warm ink. Headlines, body, strong rules. | Default for everything; when in doubt, ink. |
| `--v1-ink-soft` | `#4F4838` | Secondary copy (decks, descriptions). | Body-size text only; ≥7:1 on paper. |
| `--v1-ink-faint` | `#6B6250` | Small print, mono labels, folios, footnotes. | ≥5:1 on paper; never below 12px equivalent. |
| `--v1-oxblood` | `#6E1423` | THE accent (committed; no green). Drop cap, eyebrows, footnote markers, primary button, hover states. | Never large fills except the primary button. Never tints/washes above 6% alpha. |
| `--v1-oxblood-deep` | `#56101C` | Button hover. | Hover only. |
| `--v1-gold` / foil gradient | `#A98A3F` → gradient `#C7A04F→#8E6F26` | Metallic foil detail. | HAIRLINES ONLY (≤2px) + the monogram ring. Never text, never fills, never icons. Appears exactly 3 times: pull-quote tick, RSVP card foil edge, expert monogram rings. |
| `--v1-rule` | `rgba(24,21,16,.16)` | Standard hairline. | 1px always. Structure, not decoration. |
| `--v1-rule-strong` | `rgba(24,21,16,.55)` | Section-opening rules, masthead furniture. | 1px; the 3px masthead bar is the single heavier exception. |

**Contrast (AA):** ink/paper ≈ 13:1 · ink-soft/paper ≈ 7.5:1 · ink-faint/paper ≈ 5.1:1 · oxblood/paper ≈ 10:1 · paper-on-oxblood (button) ≈ 10:1. Gold is decorative-only and exempt by design.

## 2. Typography

| Role | Face | Spec |
|---|---|---|
| Display | **Fraunces** (variable: opsz 9–144, wght 100–900, true italics) | Weight extremes only: 300–360 light vs 850–900 black. `font-optical-sizing: auto`. Italics = emphasis words ("*the bank*") and pull quotes, never whole paragraphs of UI. |
| Body | **Newsreader** (variable, opsz 6–72) | 17→19px fluid base, line-height 1.65. Decks at 1.16em. |
| Figures & furniture | **IBM Plex Mono** | Ledger figures, issue line, folios, microlabels, footnote numerals. Tabular by nature. |
| Eyebrows/labels | Newsreader, uppercase | 11–12px, letterspacing .2em, weight 560. |

**Scale jumps ≥3×:** body 18px → section display ~53px → masthead display ~104px. No mid sizes between levels.

## 3. Layout system

- 12-col asymmetric grid, container 1280px, side padding `clamp(20px, 4.5vw, 64px)`.
- **Hairline rules structure everything**: section headers sit ON a rule (eyebrow left, `§ I…VI` folio right); the masthead opens with a broadsheet double rule (3px + 1px).
- **Footnote apparatus (brand law as typography):** every stat carries a superscript mono numeral linking to a ruled notes block under the masthead stats strip. Notes 1–4 are the single source registry for the whole page; later sections re-cite the same numerals.
- One drop cap (oxblood Fraunces) opens §I body copy. One pull quote interlude ("A licence without an account is stationery.") between §I and §II.
- Section rhythm is deliberately varied: masthead grid → asymmetric stat/essay split → TOC chapter list → full-bleed deep-paper ledger band → 4-col ruled dispatches → ruled contributor list → centered RSVP card. No repeated eyebrow→h2→cards cadence.

## 4. Signature element — the Ledger (§ III)

The offer ladder set as a private bank's fee ledger: ruled rows, mono numerals, tier chips (L0–L3), right-aligned figures under a "Fee, USD" column head, terms with footnote citations, and an `↗` that only appears on hover. Each row is a real route (`/services/:slug`). On mobile the ledger re-flows into stacked entries with mono microlabels (№ / you hold / term / fee) so it still reads as a ledger, not as cards.

## 5. Motion doctrine

- **One orchestrated load moment:** masthead sets itself — rules draw (scaleX), issue line, headline lines, deck, CTAs, marginal note and stats rise in (translateY 18px + opacity), staggered 50–500ms, everything settled ≤900ms.
- **Scroll:** sections fade up once (IntersectionObserver, threshold .18, unobserve after); section-opening hairlines draw in.
- **Hover:** link underlines thicken 1px→2.5px; footnote markers invert to oxblood; ledger rows take a 4.5% oxblood wash; TOC numerals ink→oxblood.
- **`prefers-reduced-motion: reduce`:** all animations/transitions disabled at the media-query level; reveal JS adds final state immediately. Content is never hidden without motion permission.
- Nothing floats, bounces, parallaxes, or counts up.

## 6. Self-containment

- Fonts injected by `useEffect` (`<link>` with id check: `v1-gf`, plus preconnects).
- All CSS scoped under `.v1-root` (background, color, min-height set there).
- Own minimal nav (WTP wordmark, 4 anchors, pre-screen CTA) + own compact footer.
- Icons: lucide `ArrowRight`, `ArrowUpRight` only (2 of 4 allowed).
- Data imported read-only from `src/content/services.ts` and `src/content/experts.ts`.
