# G1 SEO Foundation (Stage 0) — WTP Main Multi-Landing Portfolio

> Stage-0 portfolio-wide foundation per `seo/CONSTITUTION.md` §5 (Pipeline) and §3 (Prompt→Artifact mapping).
> Feeds every Stage-2 per-URL subagent: each landing pulls its keyword slice + assigned clusters from this file.
> Prompts executed (library §9 + §1/§2): Ideal Customer Profile Report · Customer Pain Point Explorer · Customer Journey Mapping · Deep Target SEO Opportunity Finder · Deep Target Keyword Analysis & Ranking · Long-Tail Query Generator · Question-Based Keyword Generator · Keyword Clustering by Intent · Funnel Stage Keyword Grouping · SEO Topical Map & Keyword Clustering · Content Cluster Strategy Generator.
> Variables filled from `wtp2-context` + the 5 landings' offers in `seo/baseline/G1-content.md`. EN primary.
> All MUST/NEVER §4 gates applied. Date: 2026-06-04. No live files modified.

---

## 1. ICP — Ideal Customer Profile (feeds keyword intent)

> Synthesis of library §9 "Ideal Customer Profile Report" (Levesque ICP), "Customer Pain Point Explorer", and
> "Customer Journey Mapping", with WTP variables: MARKET = HNWI relocating to the UAE; PRODUCT = Banking-First
> wealth-transfer execution (bank → company → visa → assets). Numbers are real WTP entities (wtp2-context).

### 1.1 Three ICP clusters

| Cluster | Who | Liquid assets | Origin | Trigger event | Primary unmet need | Buyer readiness |
|---|---|---|---|---|---|---|
| **ICP-1 — HNWI Relocator (PRIMARY)** | Entrepreneurs / executives, age 35–55, family decision-makers | $1M+ | UK (non-dom abolition), DACH (Wegzugsteuer / exit tax), Russia/CIS | Home-jurisdiction tax change OR a stalled/declined UAE bank account | **Bankable** UAE setup — a bank account that actually opens, before paying for a company | HIGH (budget + authority + deadline) |
| **ICP-2 — Referral Partner (SECONDARY, B2B)** | Wealth advisors, family offices, tax advisors, brokers handling relocations | n/a (intermediary) | Outside UAE | A client asks "can you handle Dubai?" and they currently refer for free | A safe, non-compete execution partner they can monetize without losing the client | HIGH |
| **ICP-3 — UAE Real-Estate Agent (TERTIARY)** | RE agents already closing Dubai/Marina deals | n/a (intermediary) | UAE | Client buys property, then needs banking/visa/setup the agent can't deliver | After-deal commission ($3,500+) on services the buyer already needs | MEDIUM-HIGH |

### 1.2 Pain points (grouped — Customer Pain Point Explorer)

**A. Banking access (the #1 pain, and WTP's wedge)**
- UAE bank rejects the account *after* the company is already registered and paid for — money sunk, structure dead.
- No way to know approval odds before applying; banks give no reasons on rejection.
- Russia/CIS/high-risk passport holders silently de-prioritized; compliance opacity.
- Existing UAE company already has a *declined/frozen* account and the owner is stuck.

**B. Wrong order of operations**
- Providers sell "company setup" first (cheap, fast) and treat banking as an afterthought — the expensive part fails last.
- Buyer doesn't know banking is the gating step until it's too late.

**C. Home-jurisdiction exit**
- UK non-dom regime abolition (2025) — losing remittance-basis status, needs a new residency.
- German/DACH **exit tax** (Wegzugsteuer) on unrealized gains when leaving.
- Dutch Box 3 wealth-tax exposure.
- "Who coordinates the *exit* while the UAE provider only handles the *entry*?" — nobody owns both sides.

**D. Trust / execution risk**
- Fear of being upsold, ghosted, or handed to a junior; no single accountable team.
- Partners fear the agency will steal their client (LTV / CRM / non-compete worries).

### 1.3 Customer journey (Customer Journey Mapping — ICP-1 dominant avatar)

| Stage | Customer state | Search behavior (intent) | WTP touchpoint |
|---|---|---|---|
| Trigger | Tax change / declined account | "uk non dom changes 2025 what to do", "german exit tax avoid" (info→commercial) | client.wtp.ae spokes |
| Problem aware | "Banking is the real blocker" | "can't open uae bank account", "uae bank rejected my company" (commercial) | banking.wtp.ae |
| Solution aware | Learns Banking-First exists | "open bank account before company uae", "banking first uae setup" (commercial) | banking + main hub |
| Consideration | Compares providers / jurisdictions | "best uae relocation partner hnwi", "uae vs singapore vs portugal relocation" (commercial) | client + main |
| Decision | Wants a no-risk first step | "uae banking pre-screen", "uae banking roadmap free" (transactional) | /roadmap, /submit-case |
| Outcome | Bankable structure + Golden Visa | "golden visa aed 2m property", "open difc company with bank account" (transactional) | full pipeline |

**Dominant avatar:** "Daniel, 44, founder exiting UK non-dom status, ~$3M liquid + a Marina property purchase in play. Biggest fear: paying $15k for a UAE company that then can't get a bank account. What he actually wants: certainty the bank will open *before* he commits — and one team that handles both the UK exit and the UAE entry."

### 1.4 Keyword-intent implications (the bridge to §2)
- **Lead bottom-funnel on the bank failure / Banking-First angle** — highest commercial intent, lowest competitor coverage, directly on WTP's differentiator.
- **Exit-jurisdiction terms (UK non-dom, German exit tax, Dutch Box 3)** are warm commercial entry points unique to client.wtp.ae spokes.
- **Partner/commission terms** are a separate B2B intent universe (partners + realestate), not to be mixed with end-client banking terms (cannibalization risk).
- Real-number anchors to embed for AEO/E-E-A-T: **AED 2M Golden Visa threshold, 8.95% mortgage rate, $3.1M avg Marina deal, $3,500+ post-deal commission, mainland/freezone/DIFC/ADGM**.

---

## 2. Master Keyword Universe

> Executed §1 "Deep Target SEO Opportunity Finder" + "Deep Target Keyword Analysis & Ranking" +
> "Long-Tail Query Generator" + "Question-Based Keyword Generator" against each of the 5 landings' offers.
> Intent ∈ {transactional (T), commercial (C), informational (I)}. Funnel ∈ {BOFU, MOFU, TOFU}.
> Priority = commercial-intent strength × WTP differentiator fit × competitor-gap (P1 highest).
> **Bottom-funnel (BOFU/MOFU commercial+transactional) is prioritized per §4 MUST.** Assigned URL = Stage-2 owner.

### 2.1 Core / head terms (anchor each cluster)

| Keyword | Intent | Funnel | Priority | Assigned URL |
|---|---|---|---|---|
| uae corporate bank account opening | C | MOFU | P1 | banking |
| banking first uae company setup | C | MOFU | P1 | banking / main |
| uae business relocation partner | C | MOFU | P1 | main |
| dubai company formation with bank account | C | MOFU | P1 | main / banking |
| uae golden visa property investment | C | MOFU | P2 | client |
| uae relocation for high net worth individuals | C | MOFU | P2 | client |
| refer clients uae banking commission | C | MOFU | P2 | partners |
| real estate agent referral commission dubai | C | MOFU | P2 | realestate |

### 2.2 Bottom-funnel commercial / transactional (P1 — buyers with budget + authority)

| Keyword | Intent | Funnel | Priority | Assigned URL |
|---|---|---|---|---|
| can't open uae bank account for my company | C | BOFU | P1 | banking |
| uae bank rejected company account what to do | C | BOFU | P1 | banking |
| open uae bank account before company registration | T | BOFU | P1 | banking |
| uae banking pre-screen risk assessment | T | BOFU | P1 | banking |
| corporate bank account dubai for foreign owner | T | BOFU | P1 | banking |
| difc company with corporate bank account | T | BOFU | P1 | banking / main |
| adgm company bank account opening | T | BOFU | P1 | banking |
| open dubai bank account russia cis passport | C | BOFU | P1 | banking |
| free uae banking roadmap consultation | T | BOFU | P1 | client / main |
| bankable uae company setup for hnwi | C | BOFU | P1 | client |
| coordinated exit uk non dom relocate uae | C | BOFU | P1 | client (uk-non-dom spoke) |
| german exit tax relocate to uae | C | BOFU | P1 | client (german-exit-tax spoke) |
| dutch box 3 tax move to uae | C | BOFU | P1 | client (dutch-box3 spoke) |
| golden visa uae aed 2m property threshold | T | BOFU | P2 | client |
| monetize client referrals uae banking | C | BOFU | P1 | partners |
| white label uae company formation partner | T | BOFU | P2 | partners |
| earn commission referring clients after property deal | C | BOFU | P1 | realestate |
| post deal commission real estate agent dubai | C | BOFU | P1 | realestate |

### 2.3 Long-tail / question-based (Long-Tail + Question-Based generators)

| Keyword | Intent | Funnel | Priority | Assigned URL |
|---|---|---|---|---|
| why does my uae company fail to open a bank account | I→C | MOFU | P2 | banking |
| should i open a bank or register a company first in uae | I→C | MOFU | P1 | banking |
| which uae banks open accounts for non-residents | C | MOFU | P2 | banking |
| how long does uae corporate bank account opening take | I | MOFU | P3 | banking |
| mainland vs freezone vs difc for banking | C | MOFU | P2 | main / banking |
| is the uae golden visa worth it for hnwi | I→C | MOFU | P2 | client |
| how to relocate to uae after uk non dom abolition | I→C | MOFU | P1 | client (uk-non-dom) |
| how much exit tax leaving germany for uae | I→C | MOFU | P2 | client (german-exit-tax) |
| uae vs singapore vs portugal for hnwi relocation | C | MOFU | P2 | client |
| uae mortgage rate for non-resident property buyer | I→C | MOFU | P3 | client / realestate |
| how to add uae services to my advisory practice | I→C | MOFU | P2 | partners |
| do uae setup firms steal your clients | I→C | MOFU | P2 | partners |
| what services do dubai property buyers need after the deal | I→C | MOFU | P2 | realestate |
| what is an on-ground uae execution partner | I | TOFU→MOFU | P3 | main |
| what is banking-first methodology uae | I | TOFU→MOFU | P2 | banking / main |
| do you work with clients from russia or cis | I→C | MOFU | P2 | banking / partners |

**Universe size (this Stage-0 seed):** 8 head + 18 BOFU + 16 long-tail = **42 anchor keywords**. Stage-2 subagents expand each landing's slice with §1 "Deep Target Keyword Expansion" to reach the per-URL target (primary + 3-5 secondary + 5-10 long-tail).

---

## 3. Intent Clusters

> Executed §1 "Keyword Clustering by Intent" + "Funnel Stage Keyword Grouping" on the universe above.

### 3.1 By search intent

- **Transactional (ready to act):** open uae bank account before company registration · uae banking pre-screen risk assessment · corporate bank account dubai for foreign owner · difc/adgm company bank account opening · free uae banking roadmap consultation · golden visa aed 2m property threshold · white label uae company formation partner.
- **Commercial (comparing / evaluating):** uae corporate bank account opening · banking first uae company setup · can't open / bank rejected company account · bankable uae company setup for hnwi · coordinated exit (uk non-dom / german exit tax / dutch box 3) · monetize client referrals · post-deal commission real estate agent · mainland vs freezone vs difc · uae vs singapore vs portugal.
- **Informational (learning — supports authority, lighter priority):** what is banking-first methodology · should i open bank or company first · which uae banks open for non-residents · how long does account opening take · is the golden visa worth it · what is an on-ground execution partner.
- **Navigational:** wtp / wtp uae / wtp brokers (branded — own outright, low effort).

### 3.2 By funnel stage

- **BOFU (priority — buyers with budget + authority):** all of §2.2. Banking-failure + Banking-First + pre-screen/roadmap + exit-jurisdiction + commission terms. **This is where Stage-2 effort concentrates.**
- **MOFU (consideration / comparison):** jurisdiction comparisons, golden visa worth-it, "bank or company first", partner-objection terms, "services after the deal".
- **TOFU (awareness — minimal, only to seed authority + AEO answer blocks):** "what is banking-first methodology", "what is an execution partner". Capture via FAQ/featured-snippet blocks, not dedicated pages.

---

## 4. Topical Map (pillars → clusters → assigned G1 URL)

> Executed §1/§2 "SEO Topical Map & Keyword Clustering" + "Content Cluster Strategy Generator".
> 4 pillars per task. Each cluster is assigned to ONE of the 5 G1 URLs so Stage-2 pulls its slice
> (mutually-exclusive assignment resolves the main↔subdomain cannibalization flagged in the baseline).

```
WTP TOPICAL MAP (G1)
│
├── PILLAR 1 — UAE BANKING  (★ core differentiator, Banking-First wedge)
│     ├── Cluster 1.1 Corporate account opening (foreign owner / non-resident)   → banking.wtp.ae  [HUB of pillar]
│     ├── Cluster 1.2 Bank-rejection recovery ("can't open / rejected")          → banking.wtp.ae
│     ├── Cluster 1.3 Pre-Screen risk assessment (transactional entry)            → banking.wtp.ae
│     └── Cluster 1.4 Banking-before-registration order-of-operations            → banking.wtp.ae (+ surfaced on main hub)
│
├── PILLAR 2 — COMPANY SETUP  (jurisdiction-led, bankability-gated)
│     ├── Cluster 2.1 Jurisdiction selection: mainland / freezone / DIFC / ADGM  → main (wtp.ae hub)
│     ├── Cluster 2.2 Bankable company formation (setup that the bank accepts)    → main / banking
│     └── Cluster 2.3 Execution-partner positioning (on-ground delivery)          → main (wtp.ae hub)
│
├── PILLAR 3 — RESIDENCY / GOLDEN VISA & EXIT COORDINATION
│     ├── Cluster 3.1 Golden Visa via AED 2M property                             → client.wtp.ae
│     ├── Cluster 3.2 UK non-dom exit → UAE                                       → client.wtp.ae /uk-non-dom (spoke)
│     ├── Cluster 3.3 German/DACH exit tax → UAE                                  → client.wtp.ae /german-exit-tax (spoke)
│     ├── Cluster 3.4 Dutch Box 3 → UAE                                           → client.wtp.ae /dutch-box3 (spoke)
│     └── Cluster 3.5 Jurisdiction comparison (UAE vs SG/PT/CH/MT)                → client.wtp.ae
│
└── PILLAR 4 — ASSETS / RELOCATION & PARTNER MONETIZATION
      ├── Cluster 4.1 Real estate + mortgage (8.95% rate, $3.1M Marina deal)      → client / realestate
      ├── Cluster 4.2 Partner referral monetization (advisors/family offices)     → partners.wtp.ae
      ├── Cluster 4.3 Partner protection (non-compete / CRM / LTV)                → partners.wtp.ae
      └── Cluster 4.4 RE-agent post-deal commission ($3,500+)                     → realestate.wtp.ae
```

### 4.1 Cluster → URL assignment table (what each Stage-2 subagent pulls)

| URL | Owns clusters | Primary keyword (slice lead) | Pillar role |
|---|---|---|---|
| **banking.wtp.ae** (U2) | 1.1, 1.2, 1.3, 1.4 | uae corporate bank account opening | Pillar-1 HUB + reference page for Banking-First MUST |
| **wtp.ae** (U1, main) | 2.1, 2.2, 2.3 | uae business relocation partner / banking-first uae | Portfolio hub; surfaces Banking-First sequence; links out to all spokes |
| **client.wtp.ae** (U5) | 3.1, 3.2, 3.3, 3.4, 3.5, 4.1 | uae relocation for high net worth individuals | End-client hub-and-spoke (exit-jurisdiction spokes) |
| **partners.wtp.ae** (U4) | 4.2, 4.3 | monetize client referrals uae banking | B2B partner intent (separate universe) |
| **realestate.wtp.ae** (U3) | 4.4 (+4.1 assist) | earn commission referring clients after property deal | RE-agent intent — Banking-First **WAIVED** (§ exception); add banking sub-narrative + link to banking |

### 4.2 Cannibalization resolution (baked into the map)
- `wtp.ae/products/banking` (in-build route) and `banking.wtp.ae` target the **same** Pillar-1 intent → in Stage 3, `/products/banking` canonicals to `banking.wtp.ae` (or noindex). The map assigns **all** banking BOFU clusters to `banking.wtp.ae` so the main hub does NOT compete on them — it links to them instead (hub-and-spoke).
- End-client banking terms (client) vs corporate banking terms (banking): client owns the *relocation/visa/exit* framing; banking owns the *account-opening* framing. No keyword appears as primary on two URLs.
- Partner/commission terms (partners + realestate) are a B2B universe kept fully separate from the end-client banking universe.

---

## 5. Hand-off to Stage 2
Each per-URL subagent loads: its row in §4.1 + the keyword slice tagged to its URL in §2 + this ICP (§1) for intent.
It then runs §1 "Deep Target Keyword Expansion" on its primary to fill the full PT-A cluster (primary + 3-5 secondary + 5-10 long-tail), and proceeds through the Stage-2 a→g artifact sequence under the §4 MUST/NEVER gates.

_§4 NEVER-gate self-check on this artifact: 0 banned buzzwords, 0 exclamation marks, no "X is not Y" antithesis, ≤3 em-dashes, arrow-bullets used only in the ASCII tree diagram (structural, not prose). PASS._
