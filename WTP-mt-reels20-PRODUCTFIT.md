# WTP2 Reels 20 — Product-Fit Audit
> Date: 2026-05-12 | Auditor: code-explorer agent
> Sources: ProductPage.tsx, LanguageContext.tsx, generate-product-onepagers-en.mjs, generate-product-presentations-v2.mjs, vite.config.ts, build-cloudflare.mjs, sitemap.xml, App.tsx

---

## Inventory Mapping

| Reel# | Product | Persona | Real product exists? | Scope match? | Microlanding URL works? | Pricing consistent? | Persona fit? | Verdict |
|-------|---------|---------|----------------------|--------------|--------------------------|---------------------|--------------|---------|
| 1 | Pre-Screen | Oleg | YES — `id: 'pre-screen'` in presentations-v2.mjs line 25 | MATCH | client.wtp.ae — built | YES — $8–15K, 30%, 5–7 days match lines 35, 76 | OK | MATCH |
| 2 | Corporate Banking | Oleg | YES — `'banking'` in ProductPage.tsx line 27 | MATCH | banking.wtp.ae — built | N/A | OK | MATCH |
| 3 | Premium Banking | Oleg | YES — `'premium-banking'` line 48 | MINOR-FIX — "1–3M AUM" not in official source | client.wtp.ae — built | N/A | OK | MINOR-FIX |
| 4 | Open Company | Oleg | YES — `'business-setup'` / `'open-company'` | MATCH | client.wtp.ae — built | OK — "2–4 weeks" matches line 308 | OK | MATCH |
| 5 | Tax Residency | Oleg | YES — `'tax-residency'` ProductPage line 98 | MATCH — exit-tax advisory listed (line 107) | client.wtp.ae — built | N/A | OK | MATCH |
| 6 | Accounting & Compliance | Oleg | YES — `'accounting'` line 117 | MATCH | client.wtp.ae — built | MINOR-FIX — "$2-4K" monthly vs annual unconfirmed | OK | MINOR-FIX |
| 7 | Why UAE banking harder now | Oleg | YES — concept reel | MATCH | client.wtp.ae — built | MINOR-FIX — "80% pass-through" (V2) not sourced | OK | MINOR-FIX |
| 8 | Last Will | Olga | YES — `'last-will'` | **MAJOR-MISMATCH** — "Article 241 Jan 2026" unverifiable | client.wtp.ae — built | N/A | OK | **MAJOR-MISMATCH** |
| 9 | Foundation | Olga | YES — `'foundation'` line 159 | MATCH — DIFC/ADGM/RAK ICC confirmed | client.wtp.ae — built | N/A | OK | MATCH |
| 10 | Wealth & Asset Protection | Olga | YES — `'wealth'` line 152 | MATCH — 6 layers exact (lines 157–165) | client.wtp.ae — built | N/A | OK | MATCH |
| 11 | Golden Visa | Olga | YES — `'golden-visa'` | **MAJOR-MISMATCH** — "AED 17,000 government fee" mislabeled (actual ICP 4.5–10.5K; AED 17K = bundled service) | client.wtp.ae — built | **MAJOR-FIX** (line 657 label wrong in source too) | OK | **MAJOR-MISMATCH** |
| 12 | Visa & Residency Stack | Olga | YES — `'residency'` line 82 | MATCH — 4 components, 183-day, AED 2M all in lines 87–95 | client.wtp.ae — built | N/A | OK | MATCH |
| 13 | Escrow | Olga | YES — `'escrow'` | MATCH | realestate.wtp.ae — built | N/A | MINOR — dual ownership Olga/RE; both defensible | MINOR-FIX |
| 14 | X-Ray | AI avatar | YES — `'xray'` | MATCH | client.wtp.ae — built | MATCH — $5–15K Full, $2–10K/mo Sub confirmed | OK | MATCH |
| 15 | Commission Factoring | AI avatar | YES — but one-pager line 409 tag: "FOR REAL ESTATE AGENTS" | **AUDIENCE MISMATCH** | client.wtp.ae — built | OK | **MAJOR-FIX** — B2B on HNWI feed | **MAJOR-MISMATCH** |
| 16 | RE Strategic Tool | AI avatar | YES — `'real-estate'` line 132 | MATCH | realestate.wtp.ae — built | N/A | OK | MATCH |
| 17 | UK Non-Dom | AI avatar | YES — App.tsx line 85 + LanguageContext 1352–1363 | MATCH | client.wtp.ae/uk-non-dom — ROUTE EXISTS, NOT in sitemap | N/A | OK | MATCH (sitemap fix) |
| 18 | German Exit Tax | AI avatar | YES — App.tsx line 86 + LanguageContext 1366–1377 | MATCH — 1%, 7yr installment, §6 AStG confirmed | client.wtp.ae/german-exit-tax — ROUTE EXISTS, NOT in sitemap | N/A | OK | MATCH (sitemap fix) |
| 19 | Dutch Box 3 | AI avatar | YES — App.tsx line 87 + LanguageContext 1380–1391 | MATCH — Box 3, 2026, Supreme Court confirmed | client.wtp.ae/dutch-box3 — ROUTE EXISTS, NOT in sitemap | N/A | OK | MATCH (sitemap fix) |
| 20 | Cost of Skipping Pre-Screen | AI avatar | YES — concept reel, same product as #1 | MATCH | client.wtp.ae — built | YES — same anchors as #1 | OK | MATCH |

**Totals: 14 MATCH / 4 MINOR-FIX / 2 MAJOR-MISMATCH / 0 OVER-PROMISE**

---

## Per-Reel Discrepancies

### Reel #3 — Premium Banking (MINOR-FIX)
Script (V2): "Entry sits at one to three million AUM."
Source (`ProductPage.tsx:55`): "Access to private banking desks with minimum AUM thresholds" — no specific dollar range.
**Fix:** "1–3M" is not wrong but unconfirmed. Either source from WTP's internal bank-introduction data, or soften to "typically starting at one million dollars".

### Reel #6 — Accounting (MINOR-FIX)
V1: "$2-4K retainer." V2: "$2-4K/month."
Source: ProductPage 117–131 (no pricing); presentations-v2.mjs has no accounting deck.
**Fix:** Confirm with Ivan. V2 "per month" is plausible for full IFRS + VAT + CT + ESR retainer on small operating company. If annual, both scripts misrepresent by omission.

### Reel #7 — Why UAE banking harder now (MINOR-FIX)
V2 (Council pick): "...open accounts in roughly eighty percent of attempts."
Source: Not in any official material.
**Fix:** Source from internal CRM and add "based on our case history" — or delete. V1 makes no such claim and is safe.

### Reel #8 — Last Will (**MAJOR-MISMATCH — BLOCKER**)
Both V1 and V2: "Article 241 of the UAE Personal Status Law, effective January 2026."
Source (one-pager 155–158): General framing — "assets of non-residents and residents in the UAE are inherited under Sharia." No Article 241.
Source (LanguageContext wealth section): "Prevents default Sharia inheritance distribution for non-Muslim residents." No statute number.
Council Verdict: "Federal Decree-Law No. 41/2022 has 18 articles, not 241."
**Fix (mandatory):** Remove "Article 241" + "January 2026" entirely. Replace with: "UAE default inheritance rules can distribute assets under Sharia for non-Muslims without a registered Will. A DIFC or Dubai Courts Will overrides this default." Use the same framing as the official one-pager.

### Reel #11 — Golden Visa (**MAJOR-MISMATCH — BLOCKER**)
Both versions: "government fee is AED 17,000."
Source (`presentations-v2.mjs:657`): "AED 17,000 (gov. fee)" — WTP uses this number in its own materials.
Reality: ICP actual government fees AED 4,500–10,500 depending on route. AED 17,000 = WTP's TOTAL service charge (gov fees + service fee bundled). Labeling as "government fee" in public IG content is material misrepresentation.
**Fix (mandatory):** Change to "total fee" or "fee including government charges" — or omit the specific number ("fees vary by eligibility route — DM GOLDEN for the breakdown"). Also update `presentations-v2.mjs:657` label to avoid same error in partner materials.

### Reel #13 — Escrow (Persona Note)
Olga (legal) presents Escrow but microlanding is `realestate.wtp.ae`. Both V1 and V2 maps correctly route there. Olga's framing (DD, title verification) is defensible. Not a blocker.

### Reel #15 — Commission Factoring (**MAJOR-MISMATCH — BLOCKER**)
One-pager tag (`generate-product-onepagers-en.mjs:409`): "FOR REAL ESTATE AGENTS."
Product is structurally B2B (broker cashflow). Not a HNWI offering.
**Fix:** HOLD from this feed. If WTP runs a separate broker-facing IG channel, this reel fits there.

---

## Microlanding URL Audit

**Built and confirmed via `build-cloudflare.mjs:18` + `vite.config.ts`:**
- wtp.ae (main), banking.wtp.ae, realestate.wtp.ae, partners.wtp.ae, client.wtp.ae — all 5 in LANDINGS array.

**Sub-path routes (confirmed in `App.tsx:85-87`):**
- `client.wtp.ae/uk-non-dom` → `SpokePage market="uk"` — LIVE. NOT in sitemap.
- `client.wtp.ae/german-exit-tax` → `SpokePage market="de"` — LIVE. NOT in sitemap.
- `client.wtp.ae/dutch-box3` → `SpokePage market="nl"` — LIVE. NOT in sitemap.

All three use a single shared `SpokePage` component parametrized by market. Content in `LanguageContext.tsx`. Pages live but undiscoverable via search.

**Pre-publish action:** Add 3 spoke URLs to `public/sitemap.xml`. Cost: 3-line edit.

**Should-build list:** None. All microlandings already live.

---

## Pricing Inconsistencies

| Anchor | Reel(s) | Source | Status |
|--------|---------|--------|--------|
| $8–15K lost without pre-screen | #1, #7, #20 | presentations-v2.mjs lines 35, 76, 129, 192 | CONSISTENT |
| 30% honest declines | #1, #7, #20 | presentations-v2.mjs lines 62–63, 103 | CONSISTENT |
| 5–7 days pre-screen | #1, #20 | line 50, one-pager 47 | CONSISTENT |
| $5–15K Full X-Ray | #14 | lines 256, 297 | CONSISTENT |
| $2–10K/mo Subscription | #14 | lines 376, 431, 439 | CONSISTENT |
| $2–4K accounting retainer | #6 | NOT in any official source | UNVERIFIED — monthly vs annual unclear |
| AED 17,000 "government fee" Golden Visa | #11 | line 657 mislabeled | **MISMATCH — label wrong in reel AND source** |
| 80% pass-through rate | #7 (V2) | No official source | UNVERIFIED |
| AUM $1–3M+ premium banking | #3 | No range in official materials | UNVERIFIED but acceptable |

**Canonical authority:** `generate-product-presentations-v2.mjs` is closest to a structured pricing document. ProductPage.tsx is customer-facing without prices. AED 17K label issue requires source-material correction too.

---

## Product Coverage Gaps

| Product | Source | HNWI-relevant? | Gap type |
|---------|--------|---------------|----------|
| Open Bank Account (personal standalone) | one-pager | YES (but covered by #2 + #3 combined) | NO GAP |
| Partners / Referral program | partners.wtp.ae | NO — B2B | INTENTIONAL |
| Trade Finance / Merchant Services / Crypto Payments | ProductPage 36–39 | NO — sub-services | INTENTIONAL |
| Property Management | ProductPage 143 | MARGINAL — post-acquisition | INTENTIONAL |
| **Family Office (standalone)** | ProductPage wealth 161 | YES — high-value $10M+ segment | **POSSIBLE V3 ADDITION** |
| RE Partnership (broker-facing) | Not in product files | NO — broker | INTENTIONAL |
| Commission Factoring HNWI | No HNWI version exists | NO | #15 correctly HELD |

No meaningful HNWI product gaps in current batch. Held #15 slot should be replaced (see Recommendations).

---

## Persona-Product Misfits

| Reel | Persona | Issue | Severity |
|------|---------|-------|----------|
| #5 Tax Residency | Oleg | TRC is cross-functional. Oleg presenting exit-tax + TRC plausible in setup context. | LOW |
| #6 Accounting | Oleg | Accounting is operations. V2 hook "compliance feeds the bank" ties to banking ownership. | LOW |
| #13 Escrow | Olga | Legal DD (Olga) + RE execution. Dual ownership correct product design. | LOW |
| #15 Factoring | AI avatar | B2B broker product regardless of presenter. Audience misfit. | **HIGH — HOLD** |
| #16 RE Strategic Tool | AI avatar | RE strategic tool has no internal persona owner. AI avatar = neutral spokesperson appropriate for concept/framework. | NONE |

**Escrow boundary:** Legal DD is Olga's core function. Payment sequencing + DLD coordination = RE ops. Olga presenting escrow is correct (owns legal mechanism). Microlanding to `realestate.wtp.ae` separates the access point. Correct.

---

## Production Blockers

| # | Blocker | Reel(s) | Action | Effort |
|---|---------|---------|--------|--------|
| 1 | Article 241 unverifiable | #8 | Strip "Article 241" + "January 2026". Use one-pager's general UAE inheritance framing. | 15 min |
| 2 | "Government fee AED 17K" mislabeled | #11 | Change to "total fee including government charges" or remove number. Also fix `presentations-v2.mjs:657`. | 10 min |
| 3 | "80% pass-through" no source | #7 (V2) | Source from internal CRM or delete. V1 version is safe. | 30 min internal |
| 4 | FCA financial-promotion compliance | #17 | UK partner counsel sign-off. Persistent disclaimer (not 2-sec flash), ≥24pt, per FG24/1. | 1–2hr legal call |
| 5 | Reel #15 audience decision | #15 | Decide: HNWI-only feed = permanent hold. Separate broker IG = publish there. Replace Week 3 slot. | Decision |
| 6 | $2-4K retainer monthly vs annual | #6 | Internal pricing confirmation. | 30 min |
| 7 | Spoke URLs not in sitemap | #17/18/19 | 3-line sitemap edit. | 5 min |

**Minimum to publish W1–W2:** Blockers 1, 2, 3, 6. Blocker 4 required before #17. Blocker 7 for SEO discoverability.

---

## Recommended Reel Replacements/Additions (V3)

Reel #15 on hold. One slot opens Week 3 (Sat opt). Three V3 additions:

**1. Family Office Setup**
- Product: `Family Office Structuring` — ProductPage.tsx wealth service line 161
- Currently zero coverage despite being premium upsell after Foundation
- Persona: Olga. Microlanding: client.wtp.ae. No new build needed.
- Hook candidate: "A Foundation holds your assets. A Family Office runs them."

**2. UAE Banking — The 24-Month SOF Sequence**
- Reinforces Pre-Screen funnel without repeating $8-15K hook
- Shows what WTP does with SOF documents — 24-month review, business cycle narrative, pre-clear logic
- Reduces DM friction by educating before lead arrives
- Persona: Oleg. Microlanding: banking.wtp.ae. Replaces #15 in Week 3 slot.
- Hook candidate: "Banks read your money like a story. We write it for you."

**3. CRS/FATCA — Why Your UAE Account Is Not Private**
- Addresses most common HNWI misconception on relocation
- Builds trust by demonstrating regulatory transparency
- Bridges Reel #5 (Tax Residency) and Reels #17–19 (spokes)
- Persona: AI avatar. Microlanding: client.wtp.ae. Disclaimer required.
- Hook candidate: "Your UAE account reports automatically. To 90 countries."

---

*Audit complete. 14 MATCH / 4 MINOR-FIX / 2 MAJOR-MISMATCH / 0 OVER-PROMISE. 2 hard blockers (#8, #11) require content edits. 1 reel permanently held (#15). All 3 spoke microlandings live but need sitemap entries.*
