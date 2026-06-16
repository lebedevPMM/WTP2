# V3 — "Midnight Route"

Cinematic dark luxury 2.0. An evolution of the current site: same deep-space navy world,
same terrain/route metaphor, same scroll-scrub video hero — taken to submission grade and
purged of its weaknesses (no headline at first paint, casino CTA, flat body sections,
generic card grids, Inter everywhere).

## Direction in one line

A night flight over surveyed terrain: one gold route, drawn in real ink down the whole page,
from the first headline to the final pre-screen node.

## Type

| Role    | Face                         | Notes |
|---------|------------------------------|-------|
| Display | Cormorant Garamond 500–700 (+ italic) | Luxury serif at huge optical sizes. Hero tops out at 108px; engraved outline numerals to 150px. Italic gold for the load-bearing phrase. |
| Body    | Albert Sans 400–700          | Quiet humanist grotesk. Labels are 10–11px, 600, letterspaced .22–.3em, uppercase. |

Size jump is >9x (11px labels → 108px display). Injected via `<link>` in `useEffect`,
check-before-add by element id (`v3-fonts-*`).

## Palette

- Ground: `#08071A` (deep), `#0C0A22`, `#110E2B` — the existing navy family, kept.
- Ink: `#EFEDF8` at 100 / 78 / 62 / 42%.
- Gold (the only accent): `#E3B564`, highlight `#F4D48E`, deep `#9A7434`.
- CTA: solid gold→amber vertical gradient, near-black text, deep soft glow shadow.
  No amber→rose. No translateY bounce — hover is brightness + shadow bloom only.

## Atmosphere (fixing the flat navy)

1. Film grain: tiny `feTurbulence` SVG tile, fixed overlay, 5% opacity, blend overlay.
2. Vignette: fixed radial darkening at viewport edges.
3. Radial gold glows behind every oversized numeral.
4. Topographic contour-line SVG dividers between section groups (echoing the terrain video),
   plus a hand-drawn "two routes" map diagram in the Banking Wall section
   (company-first route dead-ends at a hatched wall; banking-first route draws itself
   through the pass on reveal).

## Signature element — the Route Spine

A vertical gold route line running down the lower page (Banking Wall → Method stations
01–04 → final CTA node), built as a real measured SVG path (`ResizeObserver` + station
geometry), with a gentle alternating meander, drawn by scroll via `stroke-dashoffset`
inside a rAF lerp loop (same grammar as the hero scrub). Station nodes ignite
(gold fill + drop-shadow glow) as the ink reaches them. Desktop ≥1100px only;
fully drawn and lit under `prefers-reduced-motion`.

The right-edge progress rail is kept but refined: 1.5px track, gold fill scaled by document
progress, hairline station ticks that turn gold as passed, 9px letterspaced "ROUTE" label.

## Hero (adapted from src/components/Hero.tsx)

Same locked rAF scrub mechanic (lerped progress → `video.currentTime`, prime-on-gesture),
two fixes:
- Beat 1 (headline + sub + both CTAs) is fully visible at scroll position 0 and only fades
  as you scroll *past* it. Value prop readable in <3s at first paint.
- Load moment: display lines rise in staggered overflow-hidden spans (CSS keyframes only).
Beats get `pointer-events` toggled with opacity so invisible beats never block clicks.
`prefers-reduced-motion`: static `/hero/poster.png`, beat 1 only, 100vh, no rAF.

## Section spine

nav (own, minimal) → hero (3 scrub beats) → proof stats (count-up + glow numerals, every
stat with a source label) → the Banking Wall (editorial split + two-routes diagram + giant
~30%) → Banking-First method (4 full-width station rows, engraved 01–04 numerals, gold
hairlines, on the route spine) → 4 service lines (asymmetric 7/5–5/7 bento, tier chips,
flagship banking cell with deliverables) → engagement ladder L0–L3 → who we help (4 hairline
rows) → experts (asymmetric 5/7 split, 3 named bios with photos) → final pre-screen CTA
(route terminal node) → compact footer.

## Motion grammar

400–700ms, `cubic-bezier(0.22,1,0.36,1)` everywhere, staggered via `--v3-d` custom property.
Every section reveals once via IntersectionObserver. No bounce, no parallax junk, no pulse
dots. Count-up runs once (30 only — ranges stay honest and static).

## A11y

`:focus-visible` gold outlines, skip link, AA+ body contrast (ink-78 on deep ≈ 8.5:1),
scroll-margin under the fixed nav, decorative SVG/video `aria-hidden`, reduced-motion
collapses all animation including the scrub, the spine, the cue and the diagram draw.

## Scope

Everything lives under `.v3-root`; every CSS selector is prefixed. No body/html rules.
No new dependencies. One lucide icon (ArrowRight). Content imported read-only from
`src/content/services.ts` and `src/content/experts.ts`.
