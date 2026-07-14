# WTP RU port — translation status & verifier

Route-level checklist. `sitemap`+`prerender` pick up any route with a `<loc>` (all RU mirrors added).
Legal-sensitive rows must be reviewed by Оля before prod (flagged `ВЫЧИТКА ОЛЕ` in code).

## Layer status
| Layer | RU done | Notes |
|---|---|---|
| i18n core (routing, hreflang, `<html lang>`, switcher) | ✅ | verified headless 12/12 (lang/hreflang/canonical/localized nav) |
| Nav chrome (MegaNav, Footer) | ✅ | RU labels + LangSwitch desktop/mobile; Footer legal lines flagged |
| sitemap.xml (EN+RU + hreflang) | ✅ | 110 urls, `scripts/gen-sitemap.mjs` |
| Content data — services/cases/jurisdictions/packages/experts | ✅ | fan-out, `src/content/ru/*` |
| Content data — products, articles | ⏳ | fan-out (largest files) |
| Page inline literals (hero/section copy in `src/pages/*`, `src/templates/*`) | ⬜ | ~12K words — per-page dicts, not yet |
| Legal.tsx (privacy/terms/cookies/disclaimer/regulatory) | ⬜ | LEAD-owned, flag ВЫЧИТКА ОЛЕ, do NOT publish until Оля |

## Legal gate (ВЫЧИТКА ОЛЕ — do not publish to prod until reviewed)
Flagged in code with `// ВЫЧИТКА ОЛЕ:`. Run `grep -rn "ВЫЧИТКА ОЛЕ" src` to list before any prod deploy.
Known sensitive surfaces: Legal.tsx; Footer facilitation/regulatory + entity-licence line; products last-will/foundation/factoring; services banking; succession/inheritance (Art 11 Decree-Law 41/2022); "we facilitate" framing (RE-licence model).

## Verify before prod
1. `npx tsc --noEmit` = 0
2. `npx vite build` green + `node scripts/prerender.mjs` (RU routes snapshot)
3. Headless i18n assertions pass (lang / hreflang / canonical / localized nav)
4. Playwright crawl EN+RU routes = 0 defects (pattern `/tmp/wtp-audit/audit.mjs`, BASE=https://test.wtp.ae)
5. Lighthouse RU home ≥ 85 mobile
6. `grep -rn "ВЫЧИТКА ОЛЕ" src` → all reviewed by Оля
7. Done criterion: every EN route has an RU equivalent · hreflang valid · RU in sitemap+prerender · switcher works · 0 crawl defects · LH RU ≥ 85

## Gates (Konstantin / Оля)
- Architecture: `/ru/*` URL-prefix + co-located content selectors — APPROVED (session 2026-07-14).
- Prod go: after Оля's review of ВЫЧИТКА ОЛЕ items → `scripts/deploy-prod.sh`.
