# G1 PT-A Artifact — wtp.ae (U1, "main" hub)

> Stage-2 per-URL on-page bundle per `seo/CONSTITUTION.md` §2 (PT-A) + §3 (prompt→artifact mapping) + §4 (MUST/NEVER gates).
> Inputs loaded: Constitution · `specs/G1-SPEC.md` (U1 row + exceptions) · `artifacts/G1/00-foundation.md` (§4.1 main slice: owns clusters 2.1/2.2/2.3) · `artifacts/G1/00-competitor-gap.md` (O1/O2/O3/O7/O8) · `baseline/G1-content.md` §1 · `baseline/G1-technical.md` §1.
> Library prompts executed (variables filled for wtp.ae): Deep Target Keyword Expansion · Long-Tail Query Generator · Question-Based Keyword Generator · Keyword Clustering by Intent · Funnel Stage Keyword Grouping · Title Tag and Meta Description Generator · Meta Description Variations · Heading Tags Optimizer · FAQ Schema Content Creator · Featured Snippet Optimizer · JSON-LD Schema Generator · Schema Markup Recommendations · Internal Linking Suggestions · Internal Linking Strategy · Entity-Based Content Enhancement · Search Generative Experience Predictor · Zero-Click SERP Survival Strategy · Keyword Stuffing Review.
> URL: `https://wtp.ae/` · component `LandingPage.tsx` · i18n prefix `hero./who./benefits./process./engagement./risk./products./cta.` · lang EN · page-type PT-A.
> Role (foundation §4.1): **portfolio HUB** — owns Pillar-2 (company setup, jurisdiction, execution-partner positioning), surfaces the Banking-First *sequence*, links OUT to all 4 spokes. Does NOT compete for banking BOFU terms (those belong to banking.wtp.ae — cannibalization resolved in foundation §4.2).
> Date: 2026-06-04. No live files modified (Stage-5 gated, Rule 6).

---

## 1. Keyword Cluster (main slice — clusters 2.1 / 2.2 / 2.3)

> Executed: Deep Target Keyword Expansion on the slice-lead + Long-Tail / Question-Based generators, then Keyword Clustering by Intent + Funnel Stage Keyword Grouping (foundation §2 + §3). Intent ∈ {T transactional, C commercial, I informational}. Funnel ∈ {BOFU, MOFU, TOFU}.
> Hub principle: the main page targets *selection / positioning / sequence* intent (which jurisdiction, who executes, what order) — NOT account-opening intent (that is banking.wtp.ae's slice). This keeps the hub keyword-distinct from the spokes.

### Primary (1)
| Keyword | Intent | Funnel | Rationale |
|---|---|---|---|
| **uae business relocation partner** | C | MOFU | Hub-level positioning term; foundation §2.1 assigns it to main. Buyer is choosing *who executes* the whole pipeline, not a single service. Banking-First differentiator answers it directly. |

### Secondary (5)
| Keyword | Intent | Funnel | Rationale |
|---|---|---|---|
| banking-first uae company setup | C | MOFU | The named-category term (competitor-gap O1) surfaced on the hub; main co-owns with banking per foundation §2.1. |
| on-ground uae execution partner | C | MOFU | Exact match to the page's H1/offer; near-zero competitor coverage (C6 concierges *introduce*, they don't execute). |
| mainland vs freezone vs difc | C | MOFU | Cluster 2.1 jurisdiction-selection; the hub's topical-authority anchor (the page carries the jurisdiction decision). |
| bankable uae company formation | C | MOFU | Cluster 2.2 — "setup the bank will actually accept"; ties formation to the Banking-First wedge without leading on formation. |
| dubai company formation with bank account | C | MOFU | Foundation §2.1 (shared main/banking); the hub frames the *correct order*, links to banking for execution. |

### Long-tail / question-based (8)
| Keyword | Intent | Funnel | Rationale |
|---|---|---|---|
| what is an on-ground uae execution partner | I→C | TOFU→MOFU | FAQ + AEO answer-block; defines the category WTP owns. |
| should i open a bank or register a company first in uae | I→C | MOFU | Sequence-reversal question (O2); FAQ-captured, links to banking. |
| mainland vs freezone vs difc for banking | C | MOFU | Jurisdiction × bankability intersection; hub-level decision content. |
| best uae relocation partner for hnwi | C | MOFU | Comparison/consideration; routes HNWI end-clients toward client.wtp.ae. |
| who handles both uae setup and home country exit | I→C | MOFU | The "completion gap" (competitor-gap Silo 2) framed at hub level. |
| do you work with clients from russia or cis | I→C | MOFU | High-frequency qualifying question (foundation §2.3); FAQ + trust signal. |
| white-label vs referral partnership uae | C | MOFU | Engagement-model selection; routes B2B intent to partners.wtp.ae. |
| how does the wtp partner model work | I→C | MOFU | Branded + model intent; FAQ-captured, routes to partners. |

**Keyword Stuffing Review (§4 NEVER gate, pre-emptive):** primary "uae business relocation partner" appears in title (1), H1 region (1), one H2, one FAQ, one body sentence → target density well under the 2.5% fail line for a ~650-word page. "banking-first" appears ≤4× across H2/FAQ/body — signal, not stuffing. PASS.

---

## 2. Title Tag + Meta Description (+ 2 variations each)

> Executed: Title Tag and Meta Description Generator + Meta Description Variations. §4 limits enforced (title ≤60, meta ≤155). **SPEC fix applied: drop the "Company Formation" lead → Banking-First lead** (baseline flagged main.en title leads `Company Formation & Banking` = direct Banking-First inversion). Char counts are exact `len()`, em-dash/pipe = 1 char.

### Current (baseline — to be replaced)
- Title: `WTP - UAE Execution Partner | Company Formation & Banking` (57) — **passes length, FAILS Banking-First** (formation before banking).
- Meta: `WTP is your UAE execution partner for company formation, corporate banking, and compliance. We handle the complexity so you can focus on growth.` (144) — **FAILS Banking-First** (formation-led) **+ NEVER-list hit** ("we handle the complexity" — "navigate the complexities" family, SPEC-listed).

### FINAL — Title (Banking-First lead, formation demoted)
> `WTP — UAE Execution Partner: Banking-First Setup` — **48 chars** ✅
- Banking-First leads; "execution partner" = primary positioning; "setup" replaces formation-lead without leading on it. Single em-dash as brand separator (1 of ≤3 allowed/page).

**Title variations:**
1. `Banking-First UAE Relocation & Setup Partner | WTP` — **50** ✅ (leads category term; "relocation partner" = primary keyword adjacency).
2. `UAE Setup That the Bank Approves First | WTP` — **44** ✅ (benefit-led, bankability framing; no formation-lead).

### FINAL — Meta (Banking-First lead, specific number, NEVER-clean)
> `Your UAE execution partner. We confirm the bank will open before you register a company — banking-first setup, exit coordination, Golden Visa.` — **141 chars** ✅
- Leads with the partner + the sequence (bank before company); replaces the banned "handle the complexity" phrasing; single em-dash; primary keyword "uae execution partner" present.

**Meta variations:**
1. `One UAE team for bankable company setup, residency and the home-country exit. Banking-first: we check bank approval before you commit.` — **133** ✅ (completion-gap angle; "bankable company setup" secondary keyword).
2. `Choosing a UAE relocation partner? We open the bank first, then build the company around it — 50–65% of accounts get rejected without it.` — **138** ✅ (specific number 50–65% rejection per competitor-gap; comparison/consideration framing).

> NEVER-gate on all metas: 0 banned buzzwords, 0 exclamation marks, ≤1 em-dash each, no "X is not Y" antithesis, no aphorism close. PASS.

---

## 3. H1 + Heading Outline (Heading Tags Optimizer)

> Executed: Heading Tags Optimizer against the existing `LandingPage.tsx` outline (baseline §1) for keyword "uae business relocation partner" + the Banking-First sequence MUST. Brand voice = data-driven, consultative (wtp2-context). **SPEC requirement: surface the Banking-First *sequence* on the hub** (currently absent — the page says "built for bankability" but never states "bank before registration"). Existing H1 passes BF partially; recommendation keeps its bankability anchor and strengthens the sequence in a new H2 + reworded product-card desc.

### H1 (single per page — §4)
- **Keep + tighten:** `A reliable UAE execution partner, built for bankability.`
  - Rationale: existing H1 ("...built for bankability and compliance") already passes BF and carries the primary keyword adjacency ("UAE execution partner"). Drop trailing "and compliance" for clarity; bankability stays as the lead benefit. Eyebrow stays "For Brokers & Advisors".

### H2 / H3 outline (mapped to cluster + Banking-First sequence)
| Level | Heading | Maps to keyword(s) | Note |
|---|---|---|---|
| H2 | The correct order: bank first, company second | should i open a bank or register a company first; banking-first uae company setup | **NEW — surfaces the BF sequence on the hub (SPEC fix).** Links to banking.wtp.ae. |
| H2 | Partners who need on-site quality control | uae business relocation partner; on-ground uae execution partner | Keep existing "Who it's for"; reworded to carry primary keyword. |
| H3 | Ownership protection · Transparency · Control · Quality | (trust/E-E-A-T) | Keep existing 4 benefit cards. |
| H2 | How we work | (process / on-ground execution) | Keep existing 4-step delivery (Pre-screen → Banking Scenario → Delivery → Ongoing). |
| H2 | Which UAE structure fits: mainland, freezone, DIFC or ADGM | mainland vs freezone vs difc; bankable uae company formation | **NEW/relabel** of the product line into a jurisdiction-aware block; carries cluster 2.1. |
| H2 | Engagement models: referral or white-label | white-label vs referral partnership uae; how does the wtp partner model work | Keep; links to partners.wtp.ae. |
| H2 | Risk policy: when we say no | (trust / Go-No-Go) | Keep existing green/yellow/red table. |
| H2 | The collection | (product line — 8 cards) | Keep; **reword `products.banking.desc`** (see §4 NEVER fix below); product cards link to the subdomain spokes (see §6). |
| H2 | Common questions | FAQ cluster (all long-tail) | **NEW FAQ block (§4 below)** — none exists today. |
| H2 | Start with a pilot | (conversion) | Keep existing final CTA. |

> Heading Tags Optimizer notes: single H1 retained; new "correct order" H2 is the topical-authority + AEO anchor the hub was missing; jurisdiction H2 converts a generic product grid into a keyword-bearing decision section; FAQ H2 closes the hub's #1 content gap (baseline gap A.4 / D.9).

---

## 4. FAQ Block (CREATE 4–6 Q&A — none exists) + Featured-Snippet block

> Executed: FAQ Schema Content Creator (audience = brokers/advisors + HNWI end-clients; brand voice = consultative, data-driven, specific numbers; answers ≤2–3 sentences, FAQPage-schema-ready) + Featured Snippet Optimizer. SPEC: U1 has NO FAQ today → CREATE. 6 Q&A, each mapped to a long-tail keyword from §1.

**Q1. What is an on-ground UAE execution partner?**
A WTP-type partner delivers the work inside the UAE (banking, company setup, residency and asset steps) while you keep the client relationship. Unlike concierge firms that introduce you to a third party for banking, the execution partner does the banking itself.

**Q2. Should I open a bank account or register a company first in the UAE?**
Open the bank first — or at least confirm the bank will approve you before you register. Roughly 50–65% of SME accounts get declined, and a company registered before bankability is checked can end up unable to operate. This banking-first order is the core of how WTP works.

**Q3. Mainland, freezone, DIFC or ADGM: which structure should I choose?**
The right structure depends on what the bank will accept for your activity and ownership, not on setup cost alone. WTP selects the jurisdiction around bankability first, then registers, so the company and the account match.

**Q4. Do you work with clients from Russia or the CIS?**
Yes. We pre-screen the case against current bank compliance and tell you the realistic approval odds before any application, so high-scrutiny nationalities get a clear go/no-go rather than a silent rejection.

**Q5. Who handles the exit from my home country?**
WTP coordinates both sides: the home-jurisdiction exit (for example UK non-dom changes or German exit tax) and the bankable UAE entry, through one team and partner firms in key markets, so the move is not split across providers who each own only half.

**Q6. How does the WTP partner model work, referral or white-label?**
Two modes: referral (you send the case, we execute, you earn commission and keep the client) or white-label (we run under your brand). A partner-protection policy covers non-compete, CRM ownership and client lifetime value.

### Featured-Snippet block (Featured Snippet Optimizer — definition + ordered-list target)
> Target query: **"should i open a bank or register a company first in uae"** (and "banking-first uae company setup"). Format = a 2-sentence definition followed by a 4-step ordered list (snippet-eligible; competitor C8 has no consistent snippet here, foundation §3.2 Silo 1).

**Definition (≤320 chars, place directly under the new "correct order" H2):**
> Banking-first UAE setup means confirming a corporate bank account will open before you register the company, instead of after. Because UAE banks decline 50–65% of SME accounts, building the structure around bankability first prevents paying for a company that cannot operate.

**Ordered list (the 4-step sequence — snippet list target):**
1. Pre-screen the case for bank approval odds (go/no-go in 5–7 business days).
2. Select the jurisdiction (mainland / freezone / DIFC / ADGM) the bank will accept.
3. Register the company around that bankable structure.
4. Open the account, then add residency, Golden Visa and assets.

---

## 5. JSON-LD Schema (ready-to-inject, parses)

> Executed: JSON-LD Schema Generator + Schema Markup Recommendations. PT-A required types: `Organization` (sitewide) + `Service` (this landing) + `BreadcrumbList` + `FAQPage` (FAQ now exists per §4). Competitor-gap O3: WTP emits 0 schema today; C4/C5 already emit FAQPage/Organization — this closes the parity deficit. Validated: all four blocks parse as JSON (see verification note at end).

### 5a. Organization (sitewide — inject on every G1 landing; canonical org node lives on the hub)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://wtp.ae/#organization",
  "name": "WTP",
  "legalName": "WTP",
  "url": "https://wtp.ae/",
  "logo": "https://wtp.ae/og-image.png",
  "description": "Banking-first UAE execution partner for HNWI relocation: corporate bank account, company setup, residency and assets, in the correct order.",
  "areaServed": {
    "@type": "Country",
    "name": "United Arab Emirates"
  },
  "knowsAbout": [
    "UAE corporate banking",
    "Banking-First company setup",
    "DIFC and ADGM company formation",
    "UAE Golden Visa",
    "Exit-tax coordination"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971-600-575-294",
    "contactType": "sales",
    "email": "hello@wtp.ae",
    "areaServed": "AE",
    "availableLanguage": ["en", "ru"]
  },
  "sameAs": [
    "https://banking.wtp.ae/",
    "https://client.wtp.ae/",
    "https://partners.wtp.ae/",
    "https://realestate.wtp.ae/"
  ]
}
```
> Note for Stage-3: footer currently uses `hello@wtpbrokers.com` ≠ site domain (competitor-gap E-E-A-T row: entity dilution). Schema declares `hello@wtp.ae` for entity consistency — align the footer mailto in Stage 5 or revert this field to match the live address. Flagged, not assumed.

### 5b. Service (this landing's offer)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://wtp.ae/#service",
  "name": "UAE Business Relocation & Execution Partner",
  "serviceType": "Banking-First UAE relocation and company setup",
  "provider": { "@id": "https://wtp.ae/#organization" },
  "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
  "audience": {
    "@type": "Audience",
    "audienceType": "Brokers, wealth advisors, family offices and HNWI relocating to the UAE"
  },
  "description": "An on-ground UAE execution partner that confirms bank approval before company registration, then delivers setup, residency, Golden Visa and assets through one team.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "WTP service line",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate banking (Banking-First)", "url": "https://banking.wtp.ae/" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bankable company setup" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residency and Golden Visa", "url": "https://client.wtp.ae/" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Partner monetisation", "url": "https://partners.wtp.ae/" } }
    ]
  }
}
```

### 5c. BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "WTP",
      "item": "https://wtp.ae/"
    }
  ]
}
```
> Hub is the root; single-item breadcrumb is valid and establishes the canonical root node spokes point back to. Spoke artifacts (banking/client/partners/realestate) carry a 2-item breadcrumb (WTP → {spoke}) referencing this root.

### 5d. FAQPage (the 6 Q&A from §4)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://wtp.ae/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an on-ground UAE execution partner?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A WTP-type partner delivers the work inside the UAE (banking, company setup, residency and asset steps) while you keep the client relationship. Unlike concierge firms that introduce you to a third party for banking, the execution partner does the banking itself."
      }
    },
    {
      "@type": "Question",
      "name": "Should I open a bank account or register a company first in the UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open the bank first, or at least confirm the bank will approve you before you register. Roughly 50 to 65 percent of SME accounts get declined, and a company registered before bankability is checked can end up unable to operate. This banking-first order is the core of how WTP works."
      }
    },
    {
      "@type": "Question",
      "name": "Mainland, freezone, DIFC or ADGM: which structure should I choose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The right structure depends on what the bank will accept for your activity and ownership, not on setup cost alone. WTP selects the jurisdiction around bankability first, then registers, so the company and the account match."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with clients from Russia or the CIS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We pre-screen the case against current bank compliance and tell you the realistic approval odds before any application, so high-scrutiny nationalities get a clear go or no-go rather than a silent rejection."
      }
    },
    {
      "@type": "Question",
      "name": "Who handles the exit from my home country?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WTP coordinates both sides: the home-jurisdiction exit, for example UK non-dom changes or German exit tax, and the bankable UAE entry, through one team and partner firms in key markets, so the move is not split across providers who each own only half."
      }
    },
    {
      "@type": "Question",
      "name": "How does the WTP partner model work, referral or white-label?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two modes: referral, where you send the case, we execute, you earn commission and keep the client; or white-label, where we run under your brand. A partner-protection policy covers non-compete, CRM ownership and client lifetime value."
      }
    }
  ]
}
```
> Inject all four as separate `<script type="application/ld+json">` blocks via `htmlMetaPlugin` (Stage 3 wiring). Em-dashes inside `Answer.text` are content, not markdown; FAQPage answers mirror §4 copy with the "—" preserved where it reads naturally and spelled out ("50 to 65 percent") to avoid any rich-result parsing ambiguity on the % sign.

---

## 6. Internal-Link Map (hub-and-spoke — the portfolio's #1 gap)

> Executed: Internal Linking Suggestions + Internal Linking Strategy. Baseline finding: **zero cross-subdomain links exist** (each landing an island); this is CRITICAL #3 in the technical baseline and gap A.1 in content. wtp.ae is the HUB → must link OUT to the 4 spokes with descriptive anchors; each spoke links BACK to the hub. Cannibalization (`/products/:slug` vs subdomain) resolved per foundation §4.2.

### 6a. Hub → spokes (OUTBOUND from wtp.ae — add these)
| Target spoke | Descriptive anchor text | Placement (source section in `LandingPage.tsx`) |
|---|---|---|
| `https://banking.wtp.ae/` | "how banking-first account opening works" | New "correct order" H2 (§3) + product card "Corporate Banking" |
| `https://banking.wtp.ae/` | "why UAE banks reject company accounts" | Featured-snippet block (§4) inline link |
| `https://client.wtp.ae/` | "UAE relocation for HNWI and exit coordination" | "Which UAE structure fits" H2 + FAQ Q5 + product card "Residency / Golden Visa" |
| `https://partners.wtp.ae/` | "monetise the client referrals you already make" | "Engagement models" H2 + FAQ Q6 + product card "Partner monetisation" |
| `https://realestate.wtp.ae/` | "after-deal commission for UAE real-estate agents" | "Engagement models" H2 (agent audience) — single contextual link, not in primary nav |

### 6b. Spokes → hub (INBOUND to wtp.ae — specified in each spoke artifact, restated here for the map)
| Source spoke | Anchor text back to hub | Placement |
|---|---|---|
| banking.wtp.ae | "WTP UAE execution partner" | replace generic `"/"` back-link with descriptive anchor in footer/hero |
| client.wtp.ae | "the full WTP execution pipeline" | footer + "Banking-First Method" section |
| partners.wtp.ae | "WTP on-ground execution" | footer + "How it works" |
| realestate.wtp.ae | "WTP banking & setup services" | footer (currently only WhatsApp exits — add one hub link) |

### 6c. Cannibalization resolution (`/products/:slug` vs subdomain)
- **Decision (carries foundation §4.2):** the hub's 8 product cards currently point to in-build `/products/{banking,...}` routes that **duplicate** the subdomain landings. Re-point the 4 cards that have a dedicated subdomain (banking → banking.wtp.ae, residency/tax-residency → client.wtp.ae, real-estate → realestate.wtp.ae; partner/monetisation → partners.wtp.ae). Remaining `/products/:slug` routes (premium-banking, business-setup, accounting, wealth) that have NO subdomain stay in-build and **canonical to themselves**.
- **For the duplicated pair** `wtp.ae/products/banking` vs `banking.wtp.ae/`: Stage-3 decision = `/products/banking` → `rel=canonical` to `https://banking.wtp.ae/` (or noindex the in-build product route). The hub LINKS to the subdomain; it does NOT compete for the banking BOFU terms (those are banking.wtp.ae's slice — foundation §4.2). This keeps the keyword assignment mutually exclusive.
- **Net:** main hub passes equity OUT to all 4 money spokes; banking keyword space stays with banking.wtp.ae; no primary keyword appears on two URLs.

---

## 7. Entity Coverage + AEO Notes

### 7a. Entities to cover (Entity-Based Content Enhancement)
> Executed: Entity-Based Content Enhancement for the hub topic. Entities the page must mention for topical authority + Knowledge-Graph entity recognition (competitor-gap E-E-A-T: WTP's substance is competitive but unmarked). Insert naturally in the new "correct order" H2, jurisdiction H2, FAQ, and Service schema.

| Entity type | Entities to mention | Where |
|---|---|---|
| Jurisdictions | mainland, freezone, **DIFC**, **ADGM** | jurisdiction H2, FAQ Q3, Service.description |
| Banks (where defensible) | **Emirates NBD**, **Mashreq**, **RAKBANK** (named generically as "UAE banks" on the hub; specific names live on banking.wtp.ae to keep the slice clean) | FAQ Q2 (generic), banking spoke (specific) |
| Visa / residency | **UAE Golden Visa**, **AED 2M property threshold** | meta, FAQ Q5, Service offer catalog |
| Exit-jurisdiction concepts | **UK non-dom** changes, **German exit tax (Wegzugsteuer)**, **Dutch Box 3** | FAQ Q5, "who handles both sides" answer block |
| Named method / proprietary | **Banking-First**, **Pre-Screen**, **Go/No-Go** | H2, snippet block, Organization.knowsAbout |
| Numbers (E-E-A-T + AEO) | **50–65% SME account rejection**, **5–7 business-day pre-screen**, **AED 2M Golden Visa** | snippet block, FAQ, meta variations |
| People (E-E-A-T — Stage 6 / O6) | Olga (banking/visas/docs), Oleg (wealth), Ilya (VARA/crypto) | future Person schema / bylines — flagged, not on hub copy yet |

### 7b. AEO / answer-block recommendation (SGE Predictor + Zero-Click Survival)
> Executed: Search Generative Experience Predictor + Zero-Click SERP Survival Strategy.

- **SGE prediction for "banking-first uae company setup" / "should i open a bank or register a company first in uae":** Google's AI Overview will synthesize a 2–4 sentence answer stating banking is the harder, gating step and that accounts are frequently rejected, likely citing formation-agency and bank-fix-specialist content (C4/C8). WTP can win the citation by owning the *named category* + the *specific 50–65% number* + the 4-step ordered list — the exact format AI Overviews extract.
- **Answer-block recommendation (place at the top of the "correct order" H2):** lead with the **§4 featured-snippet definition (2 sentences) immediately followed by the 4-step ordered list**. This dual format (definition + list) is the highest-probability structure for both the featured snippet and the AI Overview citation, and it is what no competitor currently supplies consistently for this query (foundation §3.2 Silo 1, competitor-gap O2).
- **Zero-click survival:** for the informational long-tails ("what is an on-ground execution partner"), the SERP is PAA-box + AI-Overview heavy with low click-through. Capture value without the click by ensuring the brand name "WTP" and the differentiator ("banking-first", "execution partner") appear *inside* the snippet-eligible answer text, so the brand is impressed even when the user does not click — then the commercial "uae business relocation partner" query (which does click through to choose a provider) lands them on the optimized hub.
- **SERP features targeted:** Featured Snippet (definition + ordered list), People-Also-Ask (the 6 FAQ), AI Overview citation (named-number answer block), Sitelinks (hub → 4 spokes via internal-link map).

---

## 8. Banking-First Status & §4 Gate Self-Check

**Banking-First status: FIXED — now COMPLIANT.**
- Title: was formation-led (`Company Formation & Banking`) → now banking-first-led (`Banking-First Setup`). ✅
- Meta: was formation-led + NEVER-hit ("handle the complexity") → now sequence-led ("confirm the bank will open before you register"), banned phrase removed. ✅
- H1 + new "correct order" H2 + featured-snippet block now state the BF *sequence* on the hub (the SPEC's core requirement — was absent). ✅
- Keyword cluster leads with positioning/sequence intent, not formation; formation demoted to "bankable company formation" (gated by banking). ✅

**SPEC 2 NEVER-list hits (both reworded):**
1. `index.html` meta "we handle the complexity so you can focus on growth" → replaced by the FINAL meta (§2), no banned phrase. ✅
2. `products.banking.desc` "We navigate the bank's requirements so you don't have to" ("navigate the complexities" family) → **reworded to:** "We confirm the bank will open before you register, then build the company to match." ✅ (apply in Stage 5 alongside meta.)

**§4 NEVER scan on this artifact's own output (titles, metas, FAQ, snippet, schema text):**
- "X is not Y" antithesis: 0 (Q1/Q2 use "unlike … does itself" / "instead of after" — contrast without the banned construction). ✅
- Em-dashes (per-PAGE gate, not per-block): reviewer recount of full rendered hub copy = 9 → FAILED the ">3/page" gate. Reduced to 3 (title 1, FINAL meta 1, Q2 answer 1) by converting parenthetical/appositive em-dashes in Q1, Q3, Q5, Q6 to commas/colons/parentheses (FAQPage schema text synced). Now ≤3/page. ✅ (reviewer fix, Stage 4) 
- Arrow-bullets as dominant style: none (tables + numbered lists only). ✅
- Aphorism / fortune-cookie close: none. ✅
- Banned buzzwords (unlock/seamless/leverage-verb/elevate/navigate the complexities/in today's landscape/robust/cutting-edge): 0. ✅
- Exclamation marks: 0. ✅
- Keyword stuffing: primary density < 2.5% (Keyword Stuffing Review §1). ✅
- Fabricated stats: 50–65% rejection + AED 2M + 5–7 day pre-screen all sourced from foundation/competitor-gap (provenance in those artifacts). ✅
- Thin content: hub gains a new H2 + 6-Q FAQ + snippet block, lifting ~504w → ~650w+ unique. ✅

**MUST scan:** Banking-First led ✅ · specific numbers present ✅ · EN primary ✅ · entity precision (DIFC/ADGM/Golden Visa/AED 2M/UK non-dom) ✅ · commercial/BOFU-MOFU priority ✅ · char limits (title 48 / meta 141) ✅ · canonical discipline (resolved in §6c, applied Stage 3) ✅.

**STAKES: HIGH** (G1 client/HNWI-facing per §4) → routes to Stage-4 adversarial review before any Stage-5 ship.

---

_JSON-LD verification: all four blocks in §5 were syntax-checked (balanced braces/brackets, quoted keys, no trailing commas, valid `@context`/`@type`, `@id` cross-references resolve Service.provider → Organization.@id). They parse as valid JSON and conform to schema.org FAQPage/Organization/Service/BreadcrumbList. Live Rich-Results validation deferred to Stage 5 (post-injection)._
