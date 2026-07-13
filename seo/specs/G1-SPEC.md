# G1 SEO SPEC — Main Multi-Landing (Pilot)

> Per-URL execution spec for the pilot. Derived from `seo/CONSTITUTION.md` (§2 PT-A, §3 mapping, §4 gates)
> + baselines `seo/baseline/G1-technical.md` and `seo/baseline/G1-content.md`.
> Every Stage-2 subagent loads: this SPEC row + Constitution + the library prompts named in §3 + its baseline data.

## URL inventory (5 landings, page-type PT-A, lang EN; RU pairs deferred to G2)

| # | URL | Component | i18n prefix | Offer (1-line) | Audience | BF status |
|---|---|---|---|---|---|---|
| U1 | wtp.ae (main hub) | LandingPage.tsx | `hero./who./...` | On-ground UAE execution partner (banking+setup+visas) | Brokers/advisors + end-clients | ⚠ partial → FIX |
| U2 | banking.wtp.ae | BankingFirstLandingPage.tsx | `bf.` | Bank+compliance before registration | Mixed | ✅ reference page |
| U3 | realestate.wtp.ae | PostDealLandingPage.tsx | `pd.` | Earn $3,500+ post-deal commission | RE agents | ❌ money-led → EXCEPTION |
| U4 | partners.wtp.ae | MonetizationLandingPage.tsx | `ml.` | Monetize referrals you already make | Partners | ✅ banking-led |
| U5 | client.wtp.ae | ClientLandingPage.tsx | `cl.` | Coordinated exit + bankable UAE setup | End-clients (HNWI) | ✅ strong |

## Per-URL artifact target (full PT-A bundle, §2)

For EACH of U1–U5 produce one file `seo/artifacts/G1/{landing}.md` containing:

1. **Keyword cluster** — primary (1) + secondary (3-5) + long-tail (5-10), each tagged intent (commercial/transactional/informational) and funnel stage. Pull slice from Stage-0 master universe; prioritize bottom-funnel.
2. **Title tag** ≤60 char + **meta description** ≤155 char + **2 variations each**. MUST fix current violations:
   - U1 main: drop "Company Formation" lead → Banking-First lead; current title is generic+shared.
   - U5 client.en title 70→≤60; U1 main.ru 65→≤60; U3 realestate.en 65→≤60; U5 client.ru 66→≤60; U2 banking.en 61→≤60.
   - U5 client.en meta 164→≤155; U1 main.ru meta 163→≤155.
3. **H1 + heading outline** — keep existing H1 where it passes BF (U2/U4/U5); for U1 surface Banking-First sequence; map H2/H3 to keyword cluster.
4. **FAQ block** — U2/U4/U5 already have (8/8/7 Q&A) → keep + optimize for snippet. U1 = **CREATE 4-6 Q&A** (none exists). U3 = restructure "Objection Buster" 5Q into true Q&A.
5. **JSON-LD** — `Organization` (sitewide) + `Service` (per landing) + `BreadcrumbList` + `FAQPage` (where FAQ exists). U5 also `ItemList`/comparison-aware. Output as ready-to-inject fenced ```json blocks.
6. **Internal-link map** — the portfolio's #1 gap. Specify: hub U1 → links OUT to U2/U4/U5 (+U3 for agents) with descriptive anchors; each spoke → links BACK to U1; resolve U1 product cards `/products/banking` vs banking.wtp.ae cannibalization (canonical decision per technical baseline).
7. **Entity coverage + AEO notes** — entities to mention (UAE banks, mainland/freezone/DIFC/ADGM, Golden Visa AED 2M, jurisdictions); SGE/zero-click answer-block recommendation.

## Exceptions / special handling
- **U3 realestate**: intentional money-led audience (RE agents), NOT a banking-led service page. Tag Banking-First MUST as **WAIVED for this URL** in its artifact; still add a banking-led sub-narrative + internal link to U2. Watch `$3,500+` repetition density.
- **U1 main**: also fix 2 NEVER-list hits — index.html meta "we handle the complexity" + `products.banking.desc` "we navigate the bank's requirements".

## Portfolio-wide (Stage 3, once)
- Corrected `public/robots.txt` + `public/sitemap.xml` (add all 5 EN URLs + lastmod; RU coverage flagged for G2).
- Canonical strategy: each subdomain self-canonical; `/products/:slug` in main → canonical to the subdomain landing OR noindex (decide in Stage 3).
- hreflang: move from runtime `useEffect` to static head (vite htmlMetaPlugin) + add x-default + include in sitemap.
- Code-change list: which `vite.config.ts` meta entries change, where JSON-LD injects (htmlMetaPlugin), where hub→spoke links add (LandingPage.tsx + Footer.tsx).

## Done-criteria (G1)
- 5 artifact files, each: title ≤60 / meta ≤155 (self + variations), valid parseable JSON-LD, 0 NEVER-list violations, canonical + internal-link plan specified.
- Stage-4 review verdict SHIP / FIX-THEN-SHIP per file (STAKES=HIGH).
- Stage-3 technical deliverables (sitemap/robots/canonical/hreflang/code-list) written.
- Nothing applied to live code until user ship-word (Rule 6).
