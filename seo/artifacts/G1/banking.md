# banking.wtp.ae — PT-A Artifact (Stage 2)

> URL: **banking.wtp.ae** · landing id `banking` · i18n prefix `bf.` · component `BankingFirstLandingPage.tsx`
> Page-type: **PT-A Service/Product landing** (Constitution §2). Pillar role: **Pillar-1 HUB + reference page for the Banking-First MUST**.
> Inputs loaded: Constitution (§2/§3/§4/§5) · G1-SPEC row U2 · Stage-0 foundation §2.2/§4.1 (banking owns clusters 1.1–1.4) · competitor-gap (C8 closest rival, Silo 1+3, O1/O2/O4) · baselines G1-technical + G1-content · wtp2-context (voice, numbers, team).
> Library prompts executed (variables filled, not copied): §1 Deep Target Keyword Expansion · Long-Tail Query Generator · Question-Based Keyword Generator · Keyword Clustering by Intent · Funnel Stage Keyword Grouping · §3 Title Tag and Meta Description Generator · Meta Description Variations · FAQ Schema Content Creator · Featured Snippet Optimizer · §6 Heading Tags Optimizer · §4 JSON-LD Schema Generator · Schema Markup Recommendations · §3/§13 Internal Linking Suggestions · Internal Linking Strategy · §12 Entity-Based Content Enhancement · Search Generative Experience Predictor · Zero-Click SERP Survival Strategy.
> Date: 2026-06-04. No live files modified (Rule 6 / Constitution §6 — code mutation gated to Stage 5).
> Banking-First status: **✅ REFERENCE PAGE** (exemplary — every artifact below preserves the banking-led lead).

---

## 1. Keyword Cluster

> Slice pulled from Stage-0 §2.2 (BOFU banking) + §2.3 (long-tail/question) for clusters 1.1 Corporate account opening · 1.2 Bank-rejection recovery · 1.3 Pre-Screen risk assessment · 1.4 Banking-before-registration. Expanded with §1 Deep Target Keyword Expansion. Bottom-funnel prioritized per §4 MUST. Intent ∈ {T transactional, C commercial, I informational}. Funnel ∈ {BOFU, MOFU, TOFU}.

### Primary (1)
| Keyword | Intent | Funnel | Why this is primary |
|---|---|---|---|
| **uae corporate bank account opening** | C | MOFU→BOFU | Highest-volume commercial term that maps to the page's core job (account opening for foreign-owned companies); anchors clusters 1.1–1.4; competitor cohort C8 ranks here and is beatable on depth. |

### Secondary (5)
| Keyword | Intent | Funnel | Cluster |
|---|---|---|---|
| open uae bank account before company registration | T | BOFU | 1.4 — the sequence-reversal money term (Silo 1, O2) |
| uae bank rejected company account what to do | C | BOFU | 1.2 — rejection-recovery (Silo 3, O4) |
| corporate bank account dubai for foreign owner | T | BOFU | 1.1 — non-resident / foreign-owner account opening |
| uae banking pre-screen risk assessment | T | BOFU | 1.3 — the named WTP transactional entry (Pre-Screen) |
| banking-first uae company setup | C | MOFU | 1.4 — branded-generic category term (O1) |

### Long-tail (8)
| Keyword | Intent | Funnel | Cluster |
|---|---|---|---|
| should i open a bank or register a company first in uae | I→C | MOFU | 1.4 — question-based, sequence intent |
| why does my uae company fail to open a bank account | I→C | MOFU | 1.2 — diagnostic, feeds FAQ + SGE |
| which uae banks open accounts for non-residents | C | MOFU | 1.1 — bank-selection intent |
| open dubai bank account russia cis passport | C | BOFU | 1.1 — high-risk-nationality segment |
| difc company with corporate bank account | T | BOFU | 1.1 — jurisdiction-specific account opening |
| adgm company bank account opening | T | BOFU | 1.1 — jurisdiction-specific account opening |
| how long does uae corporate bank account opening take | I | MOFU | 1.1 — timeline, feeds FAQ snippet |
| what is banking-first methodology uae | I | TOFU→MOFU | 1.4 — category-definition, AEO answer block |

**Keyword-stuffing gate (§4, Keyword Stuffing Review):** primary "uae corporate bank account opening" and component tokens (bank account, banking, UAE, company) are distributed across H1/H2/FAQ/meta with target density ≤2.5% on the exact primary. No single phrase repeated >1×/100 words in body. PASS by design (densities to be re-verified against final live copy in Stage 4).

---

## 2. Title + Meta Description

> §3 Title Tag and Meta Description Generator + Meta Description Variations. Char counts via `len()`, em-dash = 1 char, pipe + surrounding spaces counted. Limits: **title ≤60, meta ≤155**.
> Baseline fix (G1-SPEC U2): current title = `WTP - Corporate Banking in UAE | Account Opening & Compliance` = **61 🚩** → must drop to ≤60. Banking-First lead already correct (keep).

### Recommended (ship)
- **Title:** `UAE Corporate Bank Account Opening | Banking-First` — **50 chars** ✅
  - Leads with the primary keyword, surfaces the branded category, drops the redundant `WTP -` prefix and the over-length `& Compliance` tail. Brand is carried by Organization schema + logo, not the title.
- **Meta:** `Open a UAE corporate bank account before you register the company. Pre-Screen tells you the bank's answer in 5–7 days. Foreign owners, DIFC, ADGM.` — **146 chars** ✅
  - Primary keyword in first 6 words, specific Pre-Screen timeline (5–7 days), sequence-reversal hook, entity anchors (DIFC/ADGM/foreign owners). 1 en-dash range (`5–7`).

### Title variations (2, each ≤60)
1. `Corporate Bank Account in UAE for Foreign Owners` — **48 chars** ✅ (foreign-owner secondary lead)
2. `Open a UAE Bank Account Before Your Company | WTP` — **49 chars** ✅ (sequence-reversal lead, Silo 1)

### Meta variations (2, each ≤155, primary keyword present)
1. `UAE corporate bank account opening for foreign-owned companies. We Pre-Screen the bank's decision before you pay to register. DIFC, ADGM, non-resident.` — **151 chars** ✅
2. `Your UAE company can't open a bank account? We fix the order: bank approval first, registration after. Pre-Screen in 5–7 days. UAE corporate accounts.` — **150 chars** ✅

---

## 3. H1 + Heading Outline

> §6 Heading Tags Optimizer. Existing H1 PASSES Banking-First (G1-content §2) → **KEEP**. Map H2/H3 to the keyword cluster; preserve the live section order so this is a markup/labeling change, not a rewrite (§ surgical-edits substrate).

- **H1 (KEEP):** `Bank and compliance — before registration, not after.`
  - Single H1, leads with banking, carries the sequence-reversal (cluster 1.4). 1 em-dash. PASS.

| Level | Heading (current → optimized) | Maps to keyword(s) |
|---|---|---|
| H2 | `Why "just registering a company" doesn't work` | uae bank rejected company account what to do; why does my uae company fail to open a bank account (1.2) |
| H3 | (situation/result cards) → keep, label first card `When the account is rejected after setup` | uae bank rejected company account |
| H2 | `Four principles that make Banking-First work` (add "Banking-First" to existing "Four principles…") | banking-first uae company setup; what is banking-first methodology uae (1.4) |
| H3 | `Banking-First` · `Go/No-Go Pre-Screen` · `Partner protection` · `Referral & white-label modes` | uae banking pre-screen risk assessment (1.3) |
| H2 | `How corporate account opening works` (sharpen current "How It Works") | uae corporate bank account opening; how long does uae corporate bank account opening take (1.1) |
| H2 | `Cases, Pre-Screen and approval record` (social-proof bar) | (trust signal — supports E-E-A-T) |
| H2 | `What we cover` (Service Map: Banking, Setup, Residency, Operations, Real Estate, Wealth) | difc company with corporate bank account; adgm company bank account opening (1.1) |
| H3 | label banking service card `Corporate bank account opening (mainland / freezone / DIFC / ADGM)` | corporate bank account dubai for foreign owner |
| H2 | `Referral and white-label models` (Models tabs) | (partner intent — cross-link, not primary) |
| H2 | `What a bankable outcome looks like` (Outcome/Result) | open uae bank account before company registration (1.4) |
| H2 | `Case study: rejected account to bankable structure` | uae bank rejected company account what to do (1.2) |
| H2 | `What we do — and what we don't` (Boundaries/Transparency) | (Trust signal — keep; do NOT recast as "X is not Y" antithesis) |
| H2 | `Frequently asked questions` | FAQ cluster (see §4) |
| H2 | (final CTA) `Start with a Pre-Screen` | uae banking pre-screen risk assessment (1.3) |

**Note (anti-AI-leakage):** the existing "What we do — and what we don't" H2 is a legitimate two-list trust block, NOT the banned "X is not Y" antithesis sentence construction (§4 NEVER). Keep the heading; only ensure body copy under it uses plain do/don't lists, not antithesis prose.

---

## 4. FAQ Block + Featured Snippet

> §3 FAQ Schema Content Creator + Featured Snippet Optimizer. Page already has **8 Q&A** (G1-content §2): what is Banking-First · bank declines · which banks · case duration · partner model · Russia/CIS · ongoing support · pre-screen cost. **KEEP all 8, optimize for snippet + FAQPage schema.** Answers held to 2–3 sentences (snippet-eligible), voice = data-driven/specific (wtp2-context), banking-led.

The optimized Q&A (these are the strings that feed the FAQPage JSON-LD in §5):

1. **Q: What is Banking-First for a UAE company setup?**
   A: Banking-First means securing the bank's approval before you register the company, not after. UAE banks reject a large share of new corporate accounts, so confirming bankability first prevents paying for a structure that cannot operate.

2. **Q: Why was my UAE company's bank account rejected?**
   A: The most common cause is a structure that reads as paper-only — activity, ownership, or source-of-funds that the bank's compliance team cannot match to a real operating story. Routing to the wrong bank segment (Business First instead of Private) is the second cause.

3. **Q: Should I open a bank account or register a company first in the UAE?**
   A: Run the banking Pre-Screen first. If the bank's answer is no, you avoid the registration cost; if it is yes, you register a structure already shaped to pass compliance.

4. **Q: Which UAE banks open accounts for non-residents and foreign owners?**
   A: It depends on nationality, activity, and segment rather than a fixed list. We match each case to the right bank and the right segment (for example Private versus Business First) instead of submitting to one bank and hoping.

5. **Q: How long does UAE corporate bank account opening take?**
   A: The Pre-Screen Go/No-Go takes about 5–7 business days. Account opening after a green Pre-Screen typically runs a few weeks, depending on the bank, jurisdiction, and document readiness.

6. **Q: Can you open a UAE bank account for owners from Russia or the CIS?**
   A: Often yes, but it depends on the full profile and the bank's current appetite. The Pre-Screen exists precisely to give a higher-risk-nationality applicant a Go/No-Go before any application is filed.

7. **Q: What does the banking Pre-Screen cost?**
   A: The Pre-Screen is a low-commitment first step that returns a Go/No-Go with the reasoning behind it. Pricing is confirmed when you submit the case; the goal is to spend on a structure only once the bank's answer is known.

8. **Q: Do you provide ongoing support after the account is open?**
   A: Yes. Beyond opening, we cover compliance upkeep, company setup, residency, and the wider pipeline, so the account stays active rather than getting frozen later.

**Featured-snippet target (Featured Snippet Optimizer):** primary snippet play is the **definition format** for "what is banking-first methodology uae" (Q1) and the **direct-answer format** for "should i open a bank or register a company first in uae" (Q3). Competitor C8 (Takween / RIZ & Mona / Emirabiz) ranks rejection content as listicles with inconsistent FAQ schema — WTP wins position-zero by leading the answer with a one-sentence definition + a specific number (5–7 day Pre-Screen, segment routing), then the FAQPage markup C8 lacks.

---

## 5. JSON-LD Schema

> §4 JSON-LD Schema Generator + Schema Markup Recommendations. PT-A required set (§2): **Organization + Service + BreadcrumbList + FAQPage**. Baseline = 0 schema present (G1-technical §5) → this is net-new injection in Stage 5 via `htmlMetaPlugin`. All blocks below parse as standalone JSON. NAP note: align contact email to `@wtp.ae` (baseline flags `wtpbrokers.com` ≠ `wtp.ae` entity dilution — using `wtp.ae` here).

**Schema recommendations (Schema Markup Recommendations prompt output):**
- `Organization` — sitewide identity; inject once, identical across all 5 G1 landings; carries `sameAs` for Knowledge-Graph entity consolidation. Closes the C4/C5 parity gap (competitor-gap O3).
- `Service` — page-specific; `serviceType` = corporate bank account opening; `provider` → the Organization; `areaServed` = AE; `audience` = foreign-owned companies / HNWI.
- `BreadcrumbList` — Home → Banking. Cheap rich-result + entity hierarchy.
- `FAQPage` — the 8 Q&A from §4; the highest-ROI AEO/featured-snippet asset (competitor-gap O8, C8 omits it).
- (Optional, Stage-3 decision) `Person` for named-expert authorship (Olga → banking/visa docs) per competitor-gap O6 / C1 Burnside pattern — deferred to G3 ceo/io artifacts to avoid duplicate Person nodes.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://wtp.ae/#organization",
  "name": "WTP",
  "legalName": "WTP",
  "url": "https://wtp.ae/",
  "logo": "https://wtp.ae/logo.png",
  "description": "On-ground UAE execution partner using a Banking-First method: bank and compliance approval before company registration, then visas and assets.",
  "email": "hello@wtp.ae",
  "telephone": "+971600575294",
  "areaServed": "AE",
  "knowsAbout": [
    "UAE corporate bank account opening",
    "Banking-First methodology",
    "DIFC company formation",
    "ADGM company formation",
    "UAE Golden Visa",
    "UAE compliance and EDD"
  ],
  "sameAs": [
    "https://www.linkedin.com/company/wtp-ae",
    "https://t.me/wtp_ae"
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://banking.wtp.ae/#service",
  "name": "UAE Corporate Bank Account Opening (Banking-First)",
  "serviceType": "Corporate bank account opening and pre-screening",
  "provider": { "@id": "https://wtp.ae/#organization" },
  "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
  "audience": {
    "@type": "Audience",
    "audienceType": "Foreign-owned companies and high-net-worth individuals relocating to the UAE"
  },
  "description": "We confirm the bank's Go/No-Go on a corporate account before the company is registered. Pre-Screen returns a decision in 5–7 business days, with bank-segment routing across mainland, freezone, DIFC and ADGM.",
  "offers": {
    "@type": "Offer",
    "category": "Banking Pre-Screen and corporate account opening",
    "availability": "https://schema.org/InStock"
  },
  "url": "https://banking.wtp.ae/"
}
```

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
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "UAE Corporate Bank Account Opening",
      "item": "https://banking.wtp.ae/"
    }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://banking.wtp.ae/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Banking-First for a UAE company setup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Banking-First means securing the bank's approval before you register the company, not after. UAE banks reject a large share of new corporate accounts, so confirming bankability first prevents paying for a structure that cannot operate."
      }
    },
    {
      "@type": "Question",
      "name": "Why was my UAE company's bank account rejected?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most common cause is a structure that reads as paper-only, where activity, ownership, or source-of-funds cannot be matched to a real operating story. Routing to the wrong bank segment, such as Business First instead of Private, is the second cause."
      }
    },
    {
      "@type": "Question",
      "name": "Should I open a bank account or register a company first in the UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Run the banking Pre-Screen first. If the bank's answer is no, you avoid the registration cost; if it is yes, you register a structure already shaped to pass compliance."
      }
    },
    {
      "@type": "Question",
      "name": "Which UAE banks open accounts for non-residents and foreign owners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on nationality, activity, and segment rather than a fixed list. We match each case to the right bank and the right segment, for example Private versus Business First, instead of submitting to one bank and hoping."
      }
    },
    {
      "@type": "Question",
      "name": "How long does UAE corporate bank account opening take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Pre-Screen Go/No-Go takes about 5 to 7 business days. Account opening after a green Pre-Screen typically runs a few weeks, depending on the bank, jurisdiction, and document readiness."
      }
    },
    {
      "@type": "Question",
      "name": "Can you open a UAE bank account for owners from Russia or the CIS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Often yes, but it depends on the full profile and the bank's current appetite. The Pre-Screen exists to give a higher-risk-nationality applicant a Go/No-Go before any application is filed."
      }
    },
    {
      "@type": "Question",
      "name": "What does the banking Pre-Screen cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Pre-Screen is a low-commitment first step that returns a Go/No-Go with the reasoning behind it. Pricing is confirmed when you submit the case, so you spend on a structure only once the bank's answer is known."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide ongoing support after the account is open?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Beyond opening, we cover compliance upkeep, company setup, residency, and the wider pipeline, so the account stays active rather than getting frozen later."
      }
    }
  ]
}
```

---

## 6. Internal-Link Map (hub-and-spoke)

> §3/§13 Internal Linking Suggestions + Internal Linking Strategy. The portfolio's #1 gap (G1-technical §6/§9, competitor-gap O7): banking.wtp.ae is currently an island. banking is the **Pillar-1 HUB**, so it both receives the main-hub link and links back, and cross-links to sibling spokes on shared intent. Anchors are keyword-optimized + descriptive.

### Inbound (links INTO banking.wtp.ae — to be added on the source pages in Stage 5)
| Source page | Anchor text | Placement |
|---|---|---|
| wtp.ae (main hub) | `UAE corporate bank account opening (Banking-First)` | "specialized landings" block + the `Corporate Banking` product card → repoint `/products/banking` to `https://banking.wtp.ae/` |
| client.wtp.ae | `open the UAE bank account first` | inside the "Banking-First Method" section, on the bank-account step |
| partners.wtp.ae | `how we open the Dubai corporate account` | inside the Products → Banking card / "We open it" hero proof line |
| realestate.wtp.ae | `the banking step your buyer needs` | inside the after-deal service catalog (Banking row) — see §8 exception (adds the required banking sub-narrative) |

### Outbound (links FROM banking.wtp.ae — added in Stage 5)
| Target page | Anchor text | Placement |
|---|---|---|
| wtp.ae (main hub) | `WTP UAE execution partner` | breadcrumb + footer back-link (replaces the bare "/" back-link) |
| client.wtp.ae | `relocation and exit coordination for HNWI` | in "What we cover" Service Map → Residency/relocation context |
| partners.wtp.ae | `refer banking clients and earn commission` | in the "Referral and white-label models" section |
| realestate.wtp.ae | `after-deal commission for real-estate agents` | in the partner/models block (agent audience) |

### Cannibalization resolution (`/products/banking` vs banking.wtp.ae)
- Per Stage-0 §4.2 + G1-technical §7: the main build's `/products/banking` route serves the **same** Pillar-1 intent as `banking.wtp.ae`.
- **Decision (carry to Stage 3 technical):** `wtp.ae/products/banking` → **canonical to `https://banking.wtp.ae/`** (preferred) OR 301-redirect the product-card link straight to the subdomain. The main hub must **link to** banking.wtp.ae, not compete with it. All banking BOFU clusters (1.1–1.4) are assigned to banking.wtp.ae only; the hub keeps jurisdiction/execution-partner intent (clusters 2.x).
- banking.wtp.ae declares **self-canonical** `https://banking.wtp.ae/` (currently absent — G1-technical §4). Also resolve the path-route `wtp.ae/banking` and `wtp2.pages.dev/banking` triple-form duplication via the same canonical target.

---

## 7. Entity Coverage + AEO Notes

> §12 Entity-Based Content Enhancement + Search Generative Experience Predictor + Zero-Click SERP Survival Strategy.

### Entities to cover (topical authority for "UAE corporate bank account opening")
- **Jurisdictions / structures:** mainland, freezone, **DIFC**, **ADGM** (real, defensible — already in copy/Service Map).
- **Bank segments / named banks (where defensible):** Emirates NBD Private vs Business First, Mashreq, RAKBANK — frame as *segment routing* ("Private vs Business First"), the insight C8 underplays (competitor-gap C8 / Silo 3).
- **Compliance concepts:** EDD (enhanced due diligence), UBO chart, source-of-funds, compliance pack.
- **Named WTP process assets (branded-generic, own outright per O1):** **Banking-First**, **Pre-Screen**, **Go/No-Go**.
- **Pipeline neighbors (link, don't rank here):** Golden Visa (AED 2M property threshold), company formation, residency — pointers to client/main, not primary entities on this page.
- **Specific numbers to keep visible (E-E-A-T + AEO, §4 MUST):** 5–7 business-day Pre-Screen; UAE SME-account rejection rate (cite the 50–65% figure with provenance per competitor-gap §6 sources, or soften to "a large share" if provenance is not on-page) ; AED 2M Golden Visa threshold (as a pipeline reference only).

### Entity-insertion map (where to weave them)
- DIFC/ADGM → "What we cover" Service Map banking card + Service schema `description` (done in §5).
- Segment routing (Private vs Business First) → Q2/Q4 FAQ answers (done in §4) + the "Why registering doesn't work" H2 body.
- EDD / source-of-funds / UBO → the rejection-cause H2 and the case study.
- Banking-First / Pre-Screen / Go/No-Go → already load-bearing across H1, USP, FAQ — this is the branded category WTP owns unopposed.

### SGE / AI-Overview prediction (Search Generative Experience Predictor — query: "uae corporate bank account opening")
An AI Overview for this query will likely synthesize: (1) that opening a UAE corporate account requires trade licence, Emirates ID/visa of signatories, and compliance/KYC docs; (2) that approval is not guaranteed and rejections are common for foreign-owned/SME entities; (3) typical timelines of several weeks. Authoritative sources it will pull: bank pages (Emirates NBD, Mashreq, RAKBANK), formation-agency guides (C4), and bank-fix specialists (C8). **WTP's wedge into the Overview:** be the source that states the *sequence-reversal* answer plus a specific decision SLA — "Pre-Screen returns the bank's Go/No-Go in 5–7 days, before registration." That phrasing is citable, specific, and unclaimed by competitors, which is what an Overview rewards.

### Zero-Click SERP survival (commercial intent + PAA + FAQ snippet present)
- This SERP carries a **People-Also-Ask** box and a likely **FAQ/featured snippet** — the FAQPage schema (§5) is the survival mechanism: even on a no-click impression, WTP's Pre-Screen + segment-routing answer is shown attributed to WTP, seeding brand recall for the branded category "Banking-First".
- **Answer-block recommendation:** add a single above-the-fold **answer block** (2–3 sentences) directly under the H1 that defines Banking-First and states the 5–7-day Pre-Screen SLA — formatted as a self-contained paragraph (snippet-extractable) and mirrored verbatim in FAQ Q1 + Service schema `description` so the same answer is reinforced across copy, snippet, and structured data.
- ROI on no-click: the CTA the user remembers is "Pre-Screen / Go/No-Go," a low-commitment branded action — so even zero-click impressions push the branded-search and direct-submit funnel rather than depending on the organic click.

---

## 8. Banking-First Status & Exceptions

- **Banking-First: ✅ REFERENCE PAGE.** banking.wtp.ae is the exemplar for the §4 MUST. Every artifact above leads with banking as the gating step (H1, title, meta, primary keyword, FAQ Q1, Service schema). No company-formation lead anywhere. No exception applies to this URL (the realestate WAIVER and main NEVER-rewrites in G1-SPEC are other URLs' concerns; this page is the page they are told to link to and emulate).
- **Cross-reference for realestate exception:** the inbound-link row from realestate.wtp.ae (§6) is the concrete artifact that satisfies G1-SPEC's requirement that realestate "add a banking sub-narrative + internal link to banking.wtp.ae" — anchor `the banking step your buyer needs` → `https://banking.wtp.ae/`.

---

## §4 MUST / NEVER Self-Check (enforced before write)

**MUST**
- Banking-First framing — led every artifact. ✅
- Specific numbers — 5–7 day Pre-Screen, AED 2M, segment names, 50–65% rejection (with provenance caveat). ✅
- EN primary. ✅
- Entity precision — mainland/freezone/DIFC/ADGM, real banks/segments, EDD/UBO. ✅
- Commercial/bottom-funnel priority — primary + all 5 secondary are C/T BOFU/MOFU. ✅
- Char limits — title 50 ≤60 (+variations 48/49); meta 146 ≤155 (+variations 151/150). ✅
- Canonical discipline — self-canonical declared + `/products/banking` cannibalization resolved (§6). ✅

**NEVER (anti-AI-leakage scan of this artifact's prose)**
- "X is not Y" antithesis: none (the "what we do — and what we don't" block is a do/don't list, flagged to stay non-antithesis). ✅
- >3 em-dashes per page: prose uses em-dashes sparingly; numeric ranges use en-dash `–`. Within limit. ✅
- Arrow-bullet (→) dominance: arrows used only in structural mappings (link maps, canonical decision), not as prose bullet style. ✅
- Closing aphorism / fortune-cookie: none. ✅
- Banned buzzwords (unlock/seamless/leverage-verb/elevate/navigate the complexities/in today's landscape/robust/cutting-edge): none. ✅
- Exclamation marks in body copy: none. ✅
- Keyword stuffing (>2.5% primary density): controlled by design; re-verify vs final live copy in Stage 4. ✅
- Fabricated stats: 50–65% rejection carries a provenance caveat → cite from competitor-gap §6 sources or soften on-page. ✅
- Thin page (<300 words unique): banking.wtp.ae ~1,143 words live. ✅

**JSON-LD parse check:** all 4 fenced blocks are syntactically valid standalone JSON (balanced braces/brackets, quoted keys, no trailing commas). Ready to inject.

**STAKES=HIGH** (G1 public/HNWI-facing) → routes to Stage-4 adversarial review before any Stage-5 implementation.
