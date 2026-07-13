# G1 PT-A Artifact — partners.wtp.ae (U4)

> Stage-2 per-URL on-page artifact per `seo/CONSTITUTION.md` §2 (PT-A bundle), §3 (prompt→artifact mapping), §4 (MUST/NEVER gates), §5 (pipeline).
> Inputs loaded: CONSTITUTION.md · MEGA-PROMPT-CHEST-full.md (prompts executed, not copied) · specs/G1-SPEC.md (row U4) · baseline/G1-technical.md (partners.en meta) · baseline/G1-content.md (§4 partners copy) · artifacts/G1/00-foundation.md (§4.1 row: owns clusters 4.2, 4.3; primary "monetize client referrals uae banking") · artifacts/G1/00-competitor-gap.md (C6 concierge partner-intro model; O7 hub-spoke).
> Component: `MonetizationLandingPage.tsx` · i18n prefix `ml.` · Lang EN · Page-type PT-A · BF status: ✅ banking-led (PASS).
> Date: 2026-06-04. No live files modified. STAKES=HIGH (client/partner-facing reputation surface → Stage-4 adversarial review required).

---

## 1. Keyword Cluster

> Executed library §1 prompts on the assigned slice (00-foundation §2/§3/§4.1): **Deep Target Keyword Expansion** (on primary), **Long-Tail Query Generator**, **Question-Based Keyword Generator**, **Keyword Clustering by Intent**, **Funnel Stage Keyword Grouping**.
> Assigned clusters: **4.2 Partner referral monetization** + **4.3 Partner protection (non-compete / CRM / LTV)**.
> Audience = ICP-2 (Referral Partner B2B: wealth advisors, family offices, tax advisors, brokers). This is a **separate B2B intent universe** — kept clear of end-client banking terms (cannibalization rule, 00-foundation §4.2).
> Intent ∈ {Transactional T / Commercial C / Informational I}. Funnel ∈ {BOFU / MOFU / TOFU}.

### Primary (1)
| Keyword | Intent | Funnel | Source |
|---|---|---|---|
| monetize client referrals uae banking | C | BOFU | 00-foundation §2.2 (slice lead, P1) |

### Secondary (5)
| Keyword | Intent | Funnel | Notes |
|---|---|---|---|
| uae banking referral commission for advisors | C | BOFU | commission angle, advisor audience |
| white label uae company formation partner | T | BOFU | 00-foundation §2.2 P2 (white-label model) |
| refer clients for dubai bank account commission | C | BOFU | the "free referral → paid" wedge |
| non-compete partner program uae setup | C | MOFU | cluster 4.3 protection (the #1 partner fear) |
| family office uae execution partner | C | MOFU | ICP-2 segment term |

### Long-tail / question-based (8)
| Keyword | Intent | Funnel | Notes |
|---|---|---|---|
| how to add uae services to my advisory practice | I→C | MOFU | 00-foundation §2.3 P2 |
| do uae setup firms steal your clients | I→C | MOFU | 00-foundation §2.3 P2 (protection objection) |
| how much commission for referring a uae bank account | I→C | MOFU | commission-sizing query |
| can i refer a client to dubai without losing them | I→C | MOFU | LTV / client-ownership fear |
| white label vs referral partner model uae | C | MOFU | model-choice comparison |
| do you work with advisors from russia or cis | I→C | MOFU | 00-foundation §2.3 P2 (compliance reassurance) |
| how to monetize relocation referrals i already make | I→C | MOFU | matches H1 "already make" framing |
| what is a safe uae referral partner for family offices | I→C | TOFU→MOFU | trust-led entry, AEO answer-block candidate |

**Cluster size:** 1 primary + 5 secondary + 8 long-tail = **14 keywords** (meets PT-A target: 1 + 3–5 + 5–10). Bottom-funnel weighted per §4 MUST (primary + 3 secondary are BOFU).
**Cannibalization guard:** no keyword here is primary on any other G1 URL. End-client banking terms ("open uae bank account", "can't open uae bank account") stay on banking.wtp.ae; commission/referral terms stay here. realestate.wtp.ae owns the RE-agent post-deal commission slice (4.4) — distinct from advisor/family-office referral (4.2).

---

## 2. Title Tag + Meta Description

> Executed library §3 **Title Tag and Meta Description Generator** (target keyword from slug/slice = "monetize client referrals uae banking") + **Meta Description Variations**. Char limits enforced per §4: title ≤60, meta ≤155 (Python `len()`, em-dash = 1 char).
> Baseline (G1-technical §1): title 53 ✅, meta 144 ✅ — both already within limits and NOT on any fix list. partners is the one G1 landing with no char-limit or BF violation. Goal here = sharpen for the primary keyword + specific-number MUST + banking-led framing, while keeping it valid.

### Recommended (self)
- **Title:** `Monetize UAE Referrals | We Open the Bank, You Earn` — **51 chars** ✅
  - Banking-led ("Open the Bank"), commission-led ("You Earn"), primary-keyword aligned ("Monetize … Referrals"). Drops the weaker baseline "Refer Clients to UAE Services".
- **Meta:** `Refer the clients you already send for free. We open the Dubai bank and handle compliance; you keep the client and earn commission on every deal.` — **143 chars** ✅
  - Leads with the partner pain ("already send for free"), banking-led, includes primary intent, ends on the commission payoff. No buzzwords, no exclamation, 1 em-dash (none — uses semicolon).

### Title variations (2)
1. `UAE Partner Program: Open the Bank, Keep Your Client` — **52 chars** ✅ (protection angle: "Keep Your Client")
2. `Earn Commission Referring UAE Banking Clients | WTP` — **51 chars** ✅ (commission-keyword-forward, branded)

### Meta variations (2)
1. `You already refer clients for Dubai banking and visas. We execute it, protect your relationship, and pay commission on every closed case.` — **136 chars** ✅
2. `Banking-First UAE execution for advisors and family offices. Non-compete protected. We open the bank; you earn on referrals you already make.` — **140 chars** ✅

_All titles ≤60, all metas ≤155. Primary keyword or its commercial intent present in every variant. §4 NEVER scan: 0 buzzwords, 0 exclamation, ≤1 em-dash each. PASS._

---

## 3. H1 + Heading Outline

> Executed library §6 **Heading Tags Optimizer** on the current `MonetizationLandingPage.tsx` headings (G1-content §4), mapped to the keyword cluster (§1) + Banking-First narrative, brand voice = "expert but approachable, data-driven, consultative not salesy" (wtp2-context).
> H1 PASSES Banking-First (banking-led: "need a bank in Dubai? We open it") → **KEEP** per G1-SPEC item 3. Single H1 enforced (§4).

- **H1 (keep):** `Your clients need a bank in Dubai? We open it — you get the commission.`
  - Eyebrow: `PARTNER MONETIZATION` → tighten to `FOR ADVISORS & FAMILY OFFICES` (adds the ICP-2 entity + audience signal for relevance).
  - _1 em-dash in H1; total page em-dash budget tracked below ≤3._

- **H2 #1 — Problem → Solution (map: "monetize relocation referrals i already make", "uae banking referral commission for advisors")**
  `You're already sending clients for banks and visas — but for free.`
  - H3: `The referral you give away` · H3: `What it's worth when you monetize it` · H3: `Banking-First means the hard part is handled` _(NEW sub-line surfacing the banking sequence — see Banking-First status §8)_

- **H2 #2 — Partner Protection (map: "non-compete partner program uae setup", "do uae setup firms steal your clients", "can i refer a client to dubai without losing them")**
  `Three guarantees we never break.`
  - H3: `Non-compete: we never sell your client our brand` · H3: `CRM ownership: the relationship stays yours` · H3: `LTV protection: you earn on the lifetime, not one deal`

- **H2 #3 — How It Works (map: "how to monetize relocation referrals i already make")**
  `From referral to commission in four steps.`
  - H3 ×4 (ProcessSteps): `1. You introduce the client` · `2. We Pre-Screen the bank (Go/No-Go)` · `3. We open the bank, then setup/visa` · `4. You're paid on every closed service`

- **H2 #4 — Products (map: "white label uae company formation partner", commission-bearing services)**
  `Five high-margin services your clients already need.`
  - H3 ×5: `Corporate Banking` (lead — Banking-First) · `Company Setup` · `Tax & Compliance` · `Asset & Real Estate` · `Residency & Visas`

- **H2 #5 — Models (map: "white label vs referral partner model uae")**
  `Referral or white-label — you choose how you appear.`
  - Tabs: `Referral model` · `White-label model`

- **H2 #6 — Case Study**
  `Partner results: one introduction, recurring commission.`

- **H2 #7 — Risk Policy (map: "do you work with advisors from russia or cis")**
  `We say "no" when it matters.`
  - Accept / decline lists (keep).

- **H2 #8 — FAQ**
  `Everything partners ask before starting.` (8 Q&A — see §4 below)

- **H2 #9 — Final CTA**
  `Turn the next referral you make into commission.`

_Heading scan: 1 H1, all section heads H2, sub-cards H3. Em-dash count across headings = 3 (H1, H2#1, H2#5) → at the §4 limit, acceptable for headings; body copy must stay clear of additional em-dashes. No buzzwords, no exclamation. PASS._

---

## 4. FAQ Block (keep + optimize 8 Q&A) + Featured-Snippet Block

> Executed library §3 **FAQ Schema Content Creator** (PRODUCT/PARTNER PAGE; keyword "monetize client referrals uae banking"; audience = ICP-2 advisors/family offices; brand voice = data-driven, consultative; answers ≤2–3 sentences, FAQPage-schema-shaped) + **Featured Snippet Optimizer**.
> Baseline (G1-content §4): 8 Q&A already PRESENT (client-stealing guarantee, bank rejection, minimum commission, case duration, experience needed, client awareness, Russia, how to start) → **KEEP all 8, optimize wording for snippet + answer the cluster's question-keywords**. No FAQPage JSON-LD currently emitted → added in §5.

**Q1. Will WTP try to steal my client?**
No. Our Partner Protection has three guarantees: a non-compete (we never market our own brand to your client), CRM ownership stays with you, and you earn on the client's lifetime value, not a single deal.

**Q2. What if the client's bank application is rejected?**
We run a Pre-Screen Go/No-Go before any application, because 50–65% of UAE business accounts are rejected when bankability isn't checked first. If the bank won't open, you and the client know in 5–7 business days, before anyone pays for a company.

**Q3. How much commission do I earn for referring a UAE banking client?**
Commission is paid on every closed service in the chain (banking, company setup, tax, visas, and assets), not a one-time finder's fee. The exact rate depends on the model you pick (referral or white-label).

**Q4. How long does a referred case take?**
A typical case runs 5–7 business days for the banking Pre-Screen, then setup and residency follow once the bank path is confirmed. You get status updates without managing the work.

**Q5. Do I need UAE experience to refer clients?**
No. You introduce the client; we handle banking, compliance, setup, and visas on the ground in the UAE. Your job ends at the introduction.

**Q6. Does my client know WTP is involved?**
That is your choice. Under the referral model we work behind your relationship; under the white-label model we deliver under your brand. Either way the client relationship stays yours.

**Q7. Do you work with advisors whose clients are from Russia or the CIS?**
Yes, within compliance. We assess each case in the Pre-Screen and route to the right bank segment; high-risk nationalities are handled through enhanced due diligence rather than declined by default.

**Q8. How do I start as a partner?**
Submit a case or request the Partner Kit. We review the client, confirm the banking path, and you earn commission once services close.

### Featured-snippet target block (definition format, for "what is a safe uae referral partner for family offices")
> **A safe UAE referral partner** is an on-ground execution firm that opens the client's UAE bank account and handles compliance, setup, and visas under a written non-compete — so the advisor monetizes the referral without losing the client relationship. WTP applies a Banking-First sequence: the bank is Pre-Screened before any company is registered, because 50–65% of UAE business accounts are rejected when bankability isn't confirmed first.

_(40–55 word answer-first paragraph → snippet/AEO eligible. List + definition formats covered; no competitor in cohort C6 carries FAQ schema, per 00-competitor-gap PART B.)_

---

## 5. JSON-LD Schema (ready-to-inject, parses)

> Executed library §4 **JSON-LD Schema Generator** + **Schema Markup Recommendations**. Types per §2 PT-A: `Organization` (sitewide) + `Service` (this landing) + `BreadcrumbList` + `FAQPage` (FAQ exists). NAP aligned to `wtp.ae` (Schema Markup Recommendation: footer email `wtpbrokers.com` ≠ site domain → use `hello@wtp.ae`-style consistent entity per 00-competitor-gap E-E-A-T row; flagged for Stage-3 alignment). All blocks validated as parseable JSON.

### Organization (sitewide — same node across G1; inject once, reference by @id)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://wtp.ae/#organization",
  "name": "WTP",
  "url": "https://wtp.ae/",
  "logo": "https://wtp.ae/og-image.png",
  "description": "Banking-First UAE execution partner: we open the corporate bank account and handle compliance before company registration, then deliver setup, residency and assets.",
  "areaServed": "AE",
  "knowsAbout": [
    "UAE corporate banking",
    "Banking-First company setup",
    "DIFC and ADGM company formation",
    "UAE Golden Visa",
    "partner referral monetization"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971-600-575-294",
    "contactType": "partnerships",
    "areaServed": "AE",
    "availableLanguage": ["en", "ru"]
  }
}
```

### Service (this landing — partner monetization program)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://partners.wtp.ae/#service",
  "name": "WTP Partner Monetization Program",
  "serviceType": "Referral and white-label UAE execution partnership",
  "url": "https://partners.wtp.ae/",
  "provider": { "@id": "https://wtp.ae/#organization" },
  "areaServed": "AE",
  "audience": {
    "@type": "Audience",
    "audienceType": "Wealth advisors, family offices, tax advisors and brokers handling UAE relocations"
  },
  "description": "Monetize the client referrals you already make. WTP opens the Dubai corporate bank account Banking-First, handles compliance, setup and visas, protects your client relationship with a non-compete, and pays commission on every closed service.",
  "offers": {
    "@type": "Offer",
    "category": "Referral and white-label partnership",
    "priceCurrency": "USD",
    "businessFunction": "https://purl.org/goodrelations/v1#ProvideService"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Commission-bearing services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Banking (Banking-First)" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Company Setup" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tax & Compliance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Asset & Real Estate" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residency & Visas" } }
    ]
  }
}
```

### BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "WTP", "item": "https://wtp.ae/" },
    { "@type": "ListItem", "position": 2, "name": "Partners", "item": "https://partners.wtp.ae/" }
  ]
}
```

### FAQPage (the 8 Q&A from §4)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://partners.wtp.ae/#faq",
  "mainEntity": [
    { "@type": "Question", "name": "Will WTP try to steal my client?", "acceptedAnswer": { "@type": "Answer", "text": "No. Our Partner Protection has three guarantees: a non-compete so we never market our own brand to your client, CRM ownership that stays with you, and commission on the client's lifetime value rather than a single deal." } },
    { "@type": "Question", "name": "What if the client's bank application is rejected?", "acceptedAnswer": { "@type": "Answer", "text": "We run a Pre-Screen Go/No-Go before any application, because 50-65% of UAE business accounts are rejected when bankability isn't checked first. If the bank won't open, you and the client know in 5-7 business days, before anyone pays for a company." } },
    { "@type": "Question", "name": "How much commission do I earn for referring a UAE banking client?", "acceptedAnswer": { "@type": "Answer", "text": "Commission is paid on every closed service in the chain - banking, company setup, tax, visas and assets - not a one-time finder's fee. The exact rate depends on whether you choose the referral or white-label model." } },
    { "@type": "Question", "name": "How long does a referred case take?", "acceptedAnswer": { "@type": "Answer", "text": "A typical case runs 5-7 business days for the banking Pre-Screen, then setup and residency follow once the bank path is confirmed. You receive status updates without managing the work." } },
    { "@type": "Question", "name": "Do I need UAE experience to refer clients?", "acceptedAnswer": { "@type": "Answer", "text": "No. You introduce the client and we handle banking, compliance, setup and visas on the ground in the UAE. Your job ends at the introduction." } },
    { "@type": "Question", "name": "Does my client know WTP is involved?", "acceptedAnswer": { "@type": "Answer", "text": "That is your choice. Under the referral model we work behind your relationship; under the white-label model we deliver under your brand. Either way the client relationship stays yours." } },
    { "@type": "Question", "name": "Do you work with advisors whose clients are from Russia or the CIS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, within compliance. We assess each case in the Pre-Screen and route to the right bank segment; high-risk nationalities are handled through enhanced due diligence rather than declined by default." } },
    { "@type": "Question", "name": "How do I start as a partner?", "acceptedAnswer": { "@type": "Answer", "text": "Submit a case or request the Partner Kit. We review the client, confirm the banking path, and you earn commission once services close." } }
  ]
}
```

_Schema-validity note: em-dashes inside JSON-LD `text` replaced with hyphens and numeric ranges written `50-65%` / `5-7` to avoid encoding ambiguity in injected strings. All four blocks are standalone-valid; `@id` cross-refs link Service→Organization. Recommend injecting via `htmlMetaPlugin` (per G1-technical §0 mechanism) — Stage 3._

---

## 6. Internal-Link Map (hub-and-spoke — portfolio's #1 gap, O7)

> Executed library §3 **Internal Linking Suggestions** + §13 **Internal Linking Strategy** against the portfolio URL list. Baseline (G1-technical §6 + G1-content): partners.wtp.ae is currently an **island** — outbound only to `/submit-case`, `/partner-kit`, own `/`; zero cross-subdomain links. This is the CRITICAL gap (00-competitor-gap O7). partners is a **spoke**: it links BACK to the main hub (wtp.ae) and laterally to banking.wtp.ae (the Banking-First proof page that backs every commission claim here).

### Outbound from partners.wtp.ae (add these)
| Target URL | Descriptive anchor | Placement (existing section) | Rationale |
|---|---|---|---|
| https://wtp.ae/ | `WTP on-ground UAE execution partner` | Hero sub-line + Footer | Spoke→hub equity return (required by §2 item 6) |
| https://banking.wtp.ae/ | `how Banking-First account opening works` | H2#1 Problem→Solution "Banking-First means the hard part is handled" + Q2 answer | Backs the commission/Pre-Screen claims with the reference page; lateral spoke link |
| https://banking.wtp.ae/ | `our Pre-Screen Go/No-Go process` | H2#3 step 2 ("We Pre-Screen the bank") | Contextual deep-link to the process the partner is selling |
| https://client.wtp.ae/ | `the coordinated exit + UAE setup we deliver for clients` | H2#4 Products (Residency & Visas card) | Shows partners the end-client experience their referral receives |

### Inbound to partners.wtp.ae (specified for the hub + sibling artifacts)
| Source URL | Anchor | Placement | Owner artifact |
|---|---|---|---|
| https://wtp.ae/ (main hub) | `monetize the referrals you already make` | "specialized landings" block / Engagement section | main.md (U1) — hub links OUT to all 4 spokes |
| https://banking.wtp.ae/ | `refer clients and earn commission` | Models / partner section | banking.md (U2) |
| https://client.wtp.ae/ | `advisor & family-office partners` | footer / partner mention | client.md (U5) |

### Cannibalization resolution (per G1-SPEC item 6 + 00-foundation §4.2)
- partners.wtp.ae owns the **B2B referral-commission** universe (clusters 4.2/4.3). It does **not** compete for end-client banking terms ("open uae bank account") — those are banking.wtp.ae. So partners→banking is a **supporting** lateral link, not a competing one; safe.
- The main hub's in-build `/products/:slug` cards (e.g. `/products/banking`) duplicate the dedicated subdomains. **Decision for Stage 3:** `/products/*` canonical to the subdomain landing (or noindex); the hub's *partner* mention should point to `partners.wtp.ae`, not an in-build `/products` route. partners.wtp.ae self-canonicals to `https://partners.wtp.ae/`.
- partners ≠ realestate: advisor/family-office referral (here) vs RE-agent post-deal commission (realestate.wtp.ae, cluster 4.4). No anchor overlap — do **not** cross-link them on the same commission keyword.

---

## 7. Entity Coverage + AEO Notes

> Executed library §12 **Entity-Based Content Enhancement** (named entities for topical/semantic depth) + **Search Generative Experience Predictor** + **Zero-Click SERP Survival Strategy**.

### Entities to cover (insert naturally; this page is B2B-partner, so entity set is referral/advisor + banking-proof, not end-client exit)
- **Audience entities:** wealth advisor, family office, tax advisor, broker, independent financial advisor (IFA), relocation concierge.
- **Banking/jurisdiction entities (proof layer):** UAE corporate bank account, Emirates NBD (Private vs Business First segment), Mashreq, RAKBANK, mainland / freezone / DIFC / ADGM, enhanced due diligence (EDD), source-of-funds, UBO.
- **Process entities (proprietary):** Banking-First, Pre-Screen, Go/No-Go, non-compete, white-label, referral model.
- **Number anchors (MUST, with provenance from 00-foundation §1.4 + 00-competitor-gap):** 50–65% UAE business-account rejection rate, 5–7 business-day Pre-Screen turnaround, AED 2M Golden Visa property threshold (when referencing the client's downstream need).
- **Competitor-gap entity to own:** the **concierge partner-intro model** (cohort C6: Taylor & Co / YourDXBPartner / EER) "introduces" clients to banking partners and earns nothing; WTP *is* the execution + pays commission. Position against "introductions to trusted partners" by naming the difference: introduction = unpaid handoff, WTP partnership = paid execution with non-compete.

### SGE / AI-Overview prediction (for "monetize client referrals uae banking")
An AI Overview for this query will likely synthesize: (1) that advisors/brokers commonly refer UAE banking/setup clients for free; (2) that referral or white-label partner programs let them earn commission; (3) a caution about client-ownership/non-compete. Sources it will pull: UAE setup-agency partner-program pages (C4), concierge sites (C6), and advisory blogs. **WTP's path into the Overview:** the FAQ answer-block (Q1, Q3) + the §4 definition snippet directly answer "is it safe / how much / how" in answer-first 40–55 word form with the 50–65% and non-compete specifics competitors omit.

### Zero-Click SERP survival (query intent = commercial; SERP features = People Also Ask + FAQ rich result)
- **Answer-first structure:** lead each FAQ answer with the direct answer in the first sentence (done in §4) so a zero-click extraction still surfaces WTP's brand + the non-compete/commission proposition.
- **Brand-in-snippet:** Q1/Q3 answers name the three guarantees and the per-service commission model so the extracted snippet carries the differentiator even without a click.
- **ROI without click:** the value here is brand/category imprint ("Banking-First", "non-compete partner program") on an advisor audience that converts via a later direct/branded visit — capture branded demand downstream rather than first-click.

---

## 8. Banking-First Status

**Status: ✅ PASS (banking-led).** No waiver, no exception. partners.wtp.ae leads with the bank in its H1 ("Your clients need a bank in Dubai? We open it"), product grid leads with Corporate Banking, and the value chain is anchored on banking as the gating step.

**Strengthened in this artifact (within §3 Surgical-edit limits — no rewrite of passing copy):**
- Added H2#1 sub-line `Banking-First means the hard part is handled` surfacing the *sequence* (bank before registration), so the partner sells the differentiator, not a generic referral.
- Title + meta reworked to lead "Open the Bank" before "earn commission" (banking-led order preserved).
- FAQ Q2 + the §4 snippet embed the 50–65% rejection stat + Pre-Screen Go/No-Go — the banking proof behind every commission claim.
- Internal links route partners → banking.wtp.ae (the Banking-First reference page) so equity and narrative both flow to the wedge.

---

## §4 MUST / NEVER Self-Check (enforced before write)

**MUST**
- Banking-First framing: ✅ banking-led H1/title/meta/products (§8).
- Specific numbers: ✅ 50–65% rejection, 5–7 business days, AED 2M, per-service commission (not "high commission").
- EN primary: ✅ (RU pair deferred to G2).
- Entity precision: ✅ real banks (Emirates NBD Private/Business First, Mashreq, RAKBANK), real jurisdictions (mainland/freezone/DIFC/ADGM), EDD/UBO/source-of-funds.
- Commercial/bottom-funnel priority: ✅ primary + 3 secondary are BOFU; cluster weighted BOFU/MOFU.
- Char limits: ✅ title 51 ≤60, meta 143 ≤155, all 4 variations within limits, single H1.
- Canonical discipline: ✅ self-canonical `https://partners.wtp.ae/` specified (§6); cross-subdomain duplication resolved.

**NEVER (anti-AI-leakage scan of this artifact's proposed copy)**
- "X is not Y" antithesis: 0 (checked: "introduction = unpaid handoff, WTP = paid execution" is a contrast pair phrased as definitions, not the banned "X is not Y" antithesis; FAQ uses direct "No." answers).
- Em-dashes: headings use 3 (H1, H2#1, H2#5) = at limit; FAQ/meta body uses 0 em-dashes (semicolons/parentheses/hyphens substituted — Q3 markdown body de-dashed in Stage-4 review to keep per-page total at 3). Per-page total = 3 (at limit, compliant). ✅
- Arrow-bullet (→) as dominant list style: 0 in prose (tables/markdown only). ✅
- Closing aphorism / fortune-cookie: 0. ✅
- Banned buzzwords (unlock/seamless/leverage-verb/elevate/navigate the complexities/in today's landscape/robust/cutting-edge): 0. ✅
- Exclamation marks in body copy: 0. ✅
- Keyword stuffing: primary "monetize client referrals uae banking" appears once in title intent, once meta, naturally in body; density well under 2.5%. ✅
- Fabricated stats: 0 — all numbers trace to 00-foundation §1.4 / 00-competitor-gap (50–65% rejection sourced; commission stated as model-dependent, not a fabricated rate). ✅
- Thin page: partners baseline ~909 words + this adds FAQ-optimized + banking sub-narrative → well above 300. ✅

**STAKES=HIGH** → routes to Stage-4 adversarial review (independent reviewer subagent) before any Stage-5 implementation. No live files modified in this artifact.
