# G1 — Content & Internal-Link Baseline

> Read-only baseline for the WTP main multi-landing portfolio (Group G1), per `seo/CONSTITUTION.md`
> §2 PT-A (Service/Product landing artifact set) and §4 MUST/NEVER gates.
> Scope: the 5 EN landings, each a separate Vite build keyed by `VITE_LANDING` and deployed to its
> own subdomain. Copy is i18n-driven via `src/lib/LanguageContext.tsx` (EN block, lines 136–1392).
> Date: 2026-06-04. No files modified.

## Build → Component → Subdomain mapping (confirmed from `src/config/landing.ts` + `src/App.tsx`)

| Landing ID | Subdomain | Page component | i18n key prefix |
|---|---|---|---|
| `main` | wtp.ae | `LandingPage.tsx` (+ Process/Product/Partners/Risk/Engagement/Updates sub-routes) | `hero.` `who.` `benefits.` `process.` `engagement.` `risk.` `products.` `cta.` |
| `banking` | banking.wtp.ae | `BankingFirstLandingPage.tsx` | `bf.` |
| `realestate` | realestate.wtp.ae | `PostDealLandingPage.tsx` | `pd.` |
| `partners` | partners.wtp.ae | `MonetizationLandingPage.tsx` | `ml.` |
| `client` | client.wtp.ae | `ClientLandingPage.tsx` (+ /roadmap, /uk-non-dom, /german-exit-tax, /dutch-box3) | `cl.` |

> Note: `RealEstateLandingPage.tsx`, `PartnersPage.tsx`, `TrustFirstLandingPage.tsx` exist in `src/pages/`
> but are **NOT** the routed G1 index pages — they are legacy/unused for the live subdomains.
> The realestate subdomain renders `PostDealLandingPage` (a post-deal / after-sale commission play),
> and the partners subdomain renders `MonetizationLandingPage`. Confirm before any future edit.

---

## 1. main — wtp.ae (`LandingPage.tsx`)

- **H1:** "A reliable UAE execution partner built for bankability and compliance."
  - Eyebrow label: "For Brokers & Advisors"
- **Section outline (H2/H3):**
  1. Hero — execution-partner positioning
  2. Who it's for (H2 "Partners who need on-site quality control.") — brokers, private bankers, advisors, family offices, lawyers, agencies outside UAE
  3. Partner Benefits (4 H3 cards: Ownership Protection, Transparency, Control, Quality)
  4. Delivery Process (H2 "How we work" — 4 steps: Pre-screen, Banking Scenario, Delivery, Ongoing; each links to a /process/:slug page)
  5. Engagement Models (Referral, White-label + Partner Protection Policy card)
  6. Risk Policy (green/yellow/red table)
  7. The Collection / Product Line (H2 — 8 product cards linking to /products/:slug)
  8. Final CTA (H2 "Start with a Pilot")
- **Core offer:** "We are your on-the-ground UAE execution partner — you keep the client, we deliver banking + setup + visas safely."
- **CTAs:** Hero → "Partner Kit" (/partner-kit) + "Submit a Case" (/submit-case); Bottom CTA repeats both. All to internal utility routes.
- **Internal links (outbound):** /partner-kit, /submit-case, /process/terms, /process/pre-screen, /process/banking-scenario, /process/delivery, /process/ongoing-support, /engagement (×2), /products/{banking,premium-banking,business-setup,residency,tax-residency,accounting,real-estate,wealth}. **All same-domain (wtp.ae). Zero links to the banking/realestate/partners/client subdomains.**
- **FAQ block:** ABSENT (no FAQ / no FAQPage schema on the hub page).
- **Word count (body, EN):** ~504 words. Above 300 threshold (not thin), but lowest-depth of the five and thin for a money hub page given it carries 8 product cards.
- **Banking-First verdict:** PARTIAL. H1 says "built for bankability" (good), but the lead narrative is "execution partner / partner quality control," and the product grid leads with "Corporate Banking" then "Premium Banking" (good ordering). Banking is present but framed as one of 8 products rather than the gating first step. Does not state the Banking-First *sequence* ("bank before registration") on the hub — that message lives only on banking.wtp.ae and client.wtp.ae.

---

## 2. banking — banking.wtp.ae (`BankingFirstLandingPage.tsx`)

- **H1:** "Bank and compliance — before registration, not after."
  - Eyebrow: "BANKING-FIRST EXECUTION"
- **Section outline (H2/H3):**
  1. Hero
  2. The Problem (H2 "Why \"just registering a company\" doesn't work" — 3 situation/result cards + solution bridge)
  3. Why WTP / USP (H2 "Four principles that make it work" — 4 pillars: Banking-First, Go/No-Go, Protection, Modes)
  4. How It Works (H2 — 4 ProcessSteps)
  5. Social proof bar (cases / pre-screen / approval stats) + 3 trust seals
  6. Service Map (H2 "What we cover" — 6 services: Banking, Setup, Residency, Operations, Real Estate, Wealth)
  7. Models tabs (Referral / White-label, 3 steps each)
  8. Outcome / Result statement (4 checks)
  9. Case Study (situation → WTP → result)
  10. Boundaries / Transparency (H2 "What we do — and what we don't" — do/don't lists)
  11. FAQ (H2 "Frequently asked questions" — **8 Q&A**, accordion)
  12. Final CTA
- **Core offer:** "We build a bankability scenario first; if the bank won't open, you know before paying for a company that can't operate."
- **CTAs:** Hero/mid/case/final → "Submit a Case" / Pre-screen (/submit-case) + "Catalog" (/partner-kit). Back-link to "/".
- **Internal links (outbound):** /submit-case (×4), /partner-kit (×4), "/" (back). **No links to other subdomains.**
- **FAQ block:** PRESENT (8 Q: what is Banking-First, bank declines, which banks, case duration, partner model, Russia/CIS, ongoing support, pre-screen cost). Strong featured-snippet/FAQPage-schema candidate. **No FAQPage JSON-LD currently emitted** (see G1-technical baseline).
- **Word count (body, EN):** ~1,143 words. Healthy.
- **Banking-First verdict:** STRONG / exemplary. Leads with banking as the gating step in H1, USP, problem framing, and process. This is the reference page for the Banking-First MUST.

---

## 3. realestate — realestate.wtp.ae (`PostDealLandingPage.tsx`)

- **H1:** "Earn $3,500+ from Every Client After the Deal Closes"
  - Eyebrow: "FOR REAL ESTATE AGENTS"
- **Section outline (H2/H3):**
  1. Hero (back-link to "/")
  2. Money Math (H2 "How Much You Earn Per Client" — commission table + interactive clients-slider + zero cost/time/risk badges)
  3. Pain / Missed Opportunity (H2 "Your Clients Already Spend This Money — Without You" — 3 cards)
  4. Process (H2 "Easier Than Selling an Apartment" — 3 steps)
  5. Service Catalog (H2 "What Your Clients Need After the Deal" — Banking / Visa / Asset, each with commission)
  6. Social proof bar + trust seals
  7. Case Study (H2 "Real Example")
  8. Objection Buster (H2 "What Agents Ask Before Starting" — **5 Q&A**, always-open cards)
  9. Lead Magnet (Commission Rate Card download via WhatsApp)
  10. Final CTA + sticky mobile CTA
- **Core offer:** "Refer your real-estate buyers' after-sale needs (banking/visa/setup) via 3 WhatsApp messages and earn $3,500+ commission per client."
- **CTAs:** WhatsApp deep-links (wa.me/971600575294 with prefilled referral + rate-card messages) — hero, math, case, magnet, final, sticky. This is the only landing whose primary CTA is **external WhatsApp**, not an internal route.
- **Internal links (outbound):** "/" (back) only. **No other internal/cross-subdomain links.** All conversion paths exit to WhatsApp.
- **FAQ block:** Functional equivalent PRESENT as "Objection Buster" (5 Q&A) but labeled "COMMON QUESTIONS" — not a semantic FAQ accordion; questions are wrapped in curly quotes ("..."). Featured-snippet value is weaker than bf/ml/cl, and there is no FAQPage schema.
- **Word count (body, EN):** ~606 words. Above threshold; second-thinnest.
- **Banking-First verdict:** WEAK / off-brand for SEO MUST. Leads with money/commission ("Earn $3,500+"), not banking. Banking appears only as one of three after-sale services. This is an agent-recruitment / commission landing, not a banking-led service page — defensible by audience (real-estate agents), but it does NOT satisfy the Banking-First framing MUST and should be tagged as an intentional exception in the per-URL artifact.

---

## 4. partners — partners.wtp.ae (`MonetizationLandingPage.tsx`)

- **H1:** "Your clients need a bank in Dubai? We open it — you get the commission."
  - Eyebrow: "PARTNER MONETIZATION"
- **Section outline (H2/H3):**
  1. Hero (back-link to "/")
  2. Social proof bar (partners / cases / jurisdictions) + 3 trust seals
  3. Problem → Solution (H2 "You're already sending clients for banks and visas — but for free." — 3 cards + solution bridge)
  4. Partner Protection (H2 "Three guarantees we never break." — Non-compete, CRM, LTV)
  5. How It Works (4 ProcessSteps)
  6. Products (H2 "Five high-margin services your clients already need." — Banking, Setup, Tax, Asset, Visas)
  7. Models tabs (Referral / White-label)
  8. Case Study (H2 "Partner Results")
  9. Risk Policy (H2 "We say \"no\" when it matters." — accept / decline lists)
  10. FAQ (H2 "Everything partners ask before starting." — **8 Q&A**, accordion)
  11. Final CTA
- **Core offer:** "Monetize the referrals you already make: we open the Dubai bank + handle compliance/tax, you keep the client and earn commission on every deal."
- **CTAs:** Hero/mid/case/final → "Submit a Case" (/submit-case) + "Partner Kit" (/partner-kit). Back-link to "/".
- **Internal links (outbound):** /submit-case (×4), /partner-kit (×4), "/" (back). **No cross-subdomain links.**
- **FAQ block:** PRESENT (8 Q: client-stealing guarantee, bank rejection, minimum commission, case duration, experience needed, client awareness, Russia, how to start). Good FAQPage candidate; no FAQPage schema currently.
- **Word count (body, EN):** ~909 words. Healthy.
- **Banking-First verdict:** STRONG (banking-led). H1 leads with the bank ("need a bank in Dubai? We open it"), product grid leads with Banking. Frames banking as the wedge. Satisfies the MUST, oriented to a partner/commission audience rather than the end-client.

---

## 5. client — client.wtp.ae (`ClientLandingPage.tsx`)

- **H1:** "Relocating to the UAE? We handle both sides."
  - Eyebrow: "For Business Owners & Investors"
- **Section outline (H2/H3):**
  1. Hero
  2. Bridge (H2 "Your UAE provider handles the UAE. Who handles the exit?" — exit | connector | entry)
  3. Who This Is For (H2 — 4 cards)
  4. Banking-First Method (dark section, H2 "Banking-First: the correct order of operations" — 4 steps)
  5. Jurisdiction Comparison (H2 — table: UAE/SG/PT/CH/MT × corpTax/setup/banking/visa/substance, UAE row highlighted)
  6. How We're Different (H2 — 6 items)
  7. Common Scenarios (H2 — UK non-dom / German exit tax / Dutch Box 3, each links to a spoke page)
  8. FAQ (H2 "Common questions" — **7 Q&A**, native `<details>`)
  9. Final CTA (H2 "Your UAE structure is only as good as your bank account.")
- **Core offer:** "Coordinated home-jurisdiction exit + bankable UAE company setup — one process, one team, with partner firms in key markets."
- **CTAs:** Hero/final → "Get Your Banking Roadmap" (/roadmap). Lower-commitment CTA (free, 5–7 business days, no commitment) — distinct from the partner-facing pages.
- **Internal links (outbound):** /roadmap (×2), /uk-non-dom, /german-exit-tax, /dutch-box3 (spoke pages within the client build). **Richest internal-linking page (hub→spoke within its own subdomain), but still no cross-subdomain links.**
- **FAQ block:** PRESENT (7 Q: existing tax advisor, partner-firm country coverage, who manages process, bank-open guarantee, country-not-listed, existing UAE company rejected, physical move). Strong FAQPage candidate; no FAQPage schema currently.
- **Word count (body, EN):** ~1,581 words (highest depth, table-heavy). Healthy.
- **Banking-First verdict:** STRONG. Dedicated "Banking-First Method" section + final CTA ("only as good as your bank account") + comparison conclusion ("only if your banking is sorted"). End-client audience. Satisfies the MUST.

---

## Portfolio-Wide Internal-Link Map (who links to whom)

Each landing is an **independent Vite build on its own subdomain**, sharing only the utility routes
(`/submit-case`, `/partner-kit`, `/library`, `/contact`, `/privacy`, `/terms-of-service`) and the
Footer. Cross-references below are link **targets** present in the code.

```
                         ┌─────────────── shared utility routes (per-build) ───────────────┐
                         │  /submit-case   /partner-kit   /roadmap   /contact   /library    │
                         └────────────────────────────────────────────────────────────────┘
   main (wtp.ae) ───────► /partner-kit, /submit-case, /process/*, /engagement, /products/* (8)   [all same-domain]
   banking (banking.) ──► /submit-case, /partner-kit, "/" (own root)
   realestate (realestate.) ─► WhatsApp (external) , "/" (own root)            [no internal money links]
   partners (partners.) ─► /submit-case, /partner-kit, "/" (own root)
   client (client.) ────► /roadmap, /uk-non-dom, /german-exit-tax, /dutch-box3 (own-build spokes)

   Footer (all builds): legal pages + EN↔RU language toggle (OTHER_DOMAIN) only.
```

**Critical structural finding — NO hub-and-spoke linking exists.**
The Constitution PT-A item 6 requires an "internal-linking map — inbound + outbound links across the
portfolio (hub-and-spoke to wtp.ae)." Currently:

- **wtp.ae (the hub) does NOT link out to banking / realestate / partners / client subdomains.** Its product cards point to `/products/{slug}` *within the main build*, not to the dedicated subdomain landings.
- **None of the 4 spoke subdomains link back to wtp.ae** except a generic back-link to their own "/" root and the EN↔RU toggle.
- Link equity is therefore siloed per subdomain; there is no internal PageRank flow between the 5 money pages, and no contextual anchor text connecting e.g. main → banking.wtp.ae or client → banking.
- The only true hub→spoke structure that works is **inside the client build** (client → uk-non-dom / german-exit-tax / dutch-box3 spokes).

---

## Content Gaps (prioritized)

### A. Internal linking (highest impact, portfolio-level)
1. **No cross-subdomain internal links at all.** Build a hub-and-spoke: wtp.ae product cards / a "specialized landings" block linking to banking.wtp.ae, partners.wtp.ae, client.wtp.ae (+ realestate for the agent audience). Spokes should link back to wtp.ae with descriptive anchors. This is the single biggest gap vs the Constitution.
2. **main hub product cards point to in-build `/products/:slug` routes** that duplicate the dedicated subdomain landings (e.g. `/products/banking` vs banking.wtp.ae). Cannibalization / duplicate-intent risk — resolve target + canonical (cross-reference the G1-technical baseline duplicate map).
3. **realestate (PostDeal) is fully siloed** — its only exits are WhatsApp. No internal link in or out connects it to the portfolio.

### B. FAQ / schema coverage
4. **main (wtp.ae) has NO FAQ block** — the hub page is the most-likely-to-rank URL yet lacks the highest-AEO/featured-snippet asset. Add a 4–6 Q&A FAQ (e.g. "What is an execution partner," "Why Banking-First," "Do you work with clients from Russia/CIS," "How does the partner model work").
5. **No FAQPage JSON-LD anywhere**, despite 4 of 5 landings having FAQ content (bf 8Q, ml 8Q, cl 7Q, pd 5Q-as-objections). All FAQ blocks are schema-less — easy, high-value win for FAQ rich results / AEO. (Schema status detailed in `seo/baseline/G1-technical.md`.)
6. **realestate FAQ is informal** ("Objection Buster," curly-quote questions) — restructure into a true Q&A accordion for snippet eligibility.

### C. Thin / depth
7. **main hub is the thinnest money page (~504 words)** carrying 8 product cards — borderline thin given its importance and 8 outbound product topics. Not below the 300-word fail line, but add hub-level explanatory copy (Banking-First sequence narrative + FAQ) to lift topical authority and reduce thinness risk.
8. realestate ~606 words — acceptable but lean; depends mostly on the interactive Money-Math widget for substance (low crawlable text density).

### D. Banking-First framing (MUST gate, §4)
9. **main hub does not state the Banking-First *sequence*** ("bank before registration"). It says "built for bankability" but leads with generic execution-partner positioning. Surface the Banking-First method on the hub (it currently lives only on banking + client).
10. **realestate leads with money, not banking** — fails the Banking-First MUST. Either tag as an intentional audience exception in its per-URL artifact, or add a banking-led sub-narrative. (banking, partners, client all PASS the MUST.)

### E. Anti-AI-leakage / NEVER-list (spot findings — full pass is Stage 4)
11. **NEVER "navigate the complexities" family** found in live copy:
    - `index.html` meta description: "We handle the complexity so you can focus on growth."
    - `products.banking.desc` (main): "We navigate the bank's requirements so you don't have to."
    Both should be reworded before ship (flagged for the adversarial review pass).
12. **realestate uses curly-quote question phrasing + heavy `$3,500+` repetition** — check keyword/number density and tone against the HNWI NEVER gates during Stage 4.
13. `index.html` ships a **single static title/meta for all 5 builds** ("WTP - UAE Execution Partner | Company Formation & Banking") — every subdomain inherits the same title/description/canonical-less head. Per-landing title+meta is the Stage-2/Stage-3 fix (detailed in G1-technical).

---

## Coverage vs Constitution PT-A checklist (content side)

| PT-A artifact | main | banking | realestate | partners | client |
|---|---|---|---|---|---|
| H1 + heading outline | ✅ | ✅ | ✅ | ✅ | ✅ |
| FAQ block (3-6+ Q&A) | ❌ none | ✅ 8 | ⚠ 5 (informal) | ✅ 8 | ✅ 7 |
| Banking-First framing (MUST) | ⚠ partial | ✅ | ❌ money-led | ✅ | ✅ |
| Specific numbers (MUST) | ⚠ light | ✅ | ✅ ($3,500) | ✅ | ✅ (jurisdiction table) |
| Internal-link map (hub-spoke) | ❌ | ❌ | ❌ | ❌ | ⚠ own-build spokes only |
| Not thin (>300w) | ✅ ~504 | ✅ ~1143 | ✅ ~606 | ✅ ~909 | ✅ ~1581 |
| FAQPage / schema | ❌ | ❌ | ❌ | ❌ | ❌ |

(FAQPage/schema + title/meta/canonical = technical baseline, see `seo/baseline/G1-technical.md`.)
