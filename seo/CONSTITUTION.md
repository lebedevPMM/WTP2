# WTP SEO Constitution v1

> The operational core of the WTP SEO harness. This file is loaded into EVERY SEO subagent
> before it runs. It maps the 107 prompts of `MEGA-PROMPT-CHEST-full.md` to concrete WTP
> artifacts, defines page-type taxonomy, MUST/NEVER gates, and the pipeline order.
> Source library: `WTP2/seo/MEGA-PROMPT-CHEST-full.md` (107 prompts, 16 sections).
> Project context: `~/.claude/skills/wtp2-context/SKILL.md`.

---

## 0. Purpose & Scope

Set up SEO across the **entire WTP site portfolio** by feeding the prompt library to subagents
in a deterministic pipeline. Output = shippable artifacts per URL: keyword clusters, title+meta,
heading structure, JSON-LD schema, FAQ schema, internal-linking map, content gaps, technical fixes.

**In scope:** organic search (Google + Bing) and AI-answer surfaces (SGE/AEO). EN primary, RU secondary.
**Out of scope (this harness):** paid ads, email marketing, social — those have their own skills.
Email/Micro-SaaS/Lead-Magnet/Case-Study prompt sections are NOT used here.

---

## 1. Site-Portfolio Taxonomy (target of the harness)

| Group | URLs | Page-type | Repo | Lang |
|---|---|---|---|---|
| **G1 Main multi-landing** | wtp.ae, banking, realestate, partners, client.wtp.ae | Service/Product landing | `WTP2/` (CF Pages `wtp2`) | EN |
| **G2 RU mirror** | wtpref.ru + subdomains | Service/Product landing | `WTP2/` Timeweb builds | RU |
| **G3 Personal handoff** | ceo.wtp.ae, io.wtp.ae | Personal authority page | `wtp-ceo`, `wtp-io` | EN |
| **G4 Microlandings** | local.wtp.ae, trc.wtp.ae, corp.wtp.ae | Single-offer microlanding | `wtp-local`, `wtp-trc`, `wtp-corp` | EN/RU |
| **G5 Resource hub** | links.wtp.ae | Link hub / Org node | `wtp-links` | EN |

**Pilot = G1** (highest organic value: 5 service landings, money pages). Scale order: G1 → G2 → G4 → G3 → G5.

---

## 2. Page-Type → Required Artifact Set

Each page-type gets a fixed artifact bundle. The harness produces ALL of these per URL.

### PT-A: Service/Product landing (G1, G2, G4)
1. **Keyword cluster** — primary + 3-5 secondary + 5-10 long-tail, intent-tagged (commercial/transactional bottom-funnel priority)
2. **Title tag** (≤60 char) + **meta description** (≤155 char) + 2 variations
3. **H1 + heading outline** (H2/H3 mapped to keyword cluster + Banking-First narrative)
4. **JSON-LD schema** — `Organization` + `Service` + `BreadcrumbList` (+ `FAQPage` if FAQ block exists)
5. **FAQ block** (3-6 Q&A) optimized for featured snippet + FAQ schema
6. **Internal-linking map** — inbound + outbound links across the portfolio (hub-and-spoke to wtp.ae)
7. **Entity coverage** — entities the page must mention for topical authority (UAE banks, jurisdictions, visa types)

### PT-B: Personal authority page (G3 — ceo/io)
1. Keyword cluster (branded + "{name} WTP" + role-based)
2. Title + meta (person-led)
3. **JSON-LD** — `Person` + `worksFor`→Organization + `sameAs` (LinkedIn/Telegram) + breadcrumb
4. Internal links → relevant service landings
5. Entity: link person ↔ WTP organization entity (Knowledge Graph)

### PT-C: Microlanding (G4)
1. Keyword cluster (single tight offer)
2. Title + meta
3. JSON-LD `Service` + breadcrumb
4. One FAQ block + FAQPage schema
5. Canonical + internal link back to parent service landing (avoid duplicate/cannibalization)

### PT-D: Resource hub (G5 — links)
1. JSON-LD `Organization` + `WebSite` + `SearchAction` (sitelinks searchbox candidate)
2. Internal links = the hub's whole job (anchor-text optimized)
3. Title + meta

### Portfolio-wide (once, not per-URL)
- **robots.txt** per repo
- **XML sitemap** per repo (+ sitemap index if needed)
- **Duplicate/cannibalization map** across subdomains (critical: banking.wtp.ae vs banking section of wtp.ae)
- **Canonical strategy** (subdomain vs path, EN↔RU hreflang)
- **Competitor SEO gap** (vs Burnside Partnership + UAE relocation firms)
- **Topical map** (content-hub plan for future blog)
- **KPI/reporting baseline**

---

## 3. Prompt → Artifact Mapping (the harness wiring)

> Subagents are given the EXACT prompt text (verbatim from the library) for their artifact,
> with `[VARIABLES]` pre-filled from wtp2-context + the page's content.

| Artifact | Driver prompt(s) [library section] | Notes / variable fill |
|---|---|---|
| Keyword universe (commercial intent) | **Deep Target SEO Opportunity Finder** + **Deep Target Keyword Analysis & Ranking** [§1] | `[PRODUCT/SERVICE]` = page's offer |
| Keyword expansion / long-tail | **Deep Target Keyword Expansion** · **Long-Tail Query Generator** · **Question-Based Keyword Generator** [§1] | feed primary keyword |
| Intent clustering | **Keyword Clustering by Intent** · **Funnel Stage Keyword Grouping** [§1] | groups the universe |
| Topical map (portfolio + blog) | **SEO Topical Map & Keyword Clustering** · **Content Cluster Strategy Generator** [§1/§2] | pillar→cluster structure |
| Title + meta description | **Title Tag and Meta Description Generator** · **Meta Description Variations** [§3] | per URL, char limits enforced |
| Heading structure | **Heading Tags Optimizer** [§6] | H1/H2/H3 vs keyword cluster |
| Featured-snippet block | **Featured Snippet Optimizer** [§3] | definition/list/table format |
| FAQ + FAQ schema | **FAQ Schema Content Creator** [§3] | 3-6 Q&A → JSON-LD |
| JSON-LD schema | **JSON-LD Schema Generator** · **Schema Markup Recommendations** [§4] | type per page-type (§2) |
| Internal links | **Internal Linking Suggestions** · **Internal Linking Strategy** [§3/§13] | hub-and-spoke map |
| On-page keyword integration | **Content Optimization with New Keywords** · **Semantic Keywords Suggester** [§6] | NLP/entity terms |
| Thin-content check | **Thin Content Enhancer** [§6] | flag pages <300 words |
| Over-optimization check | **Keyword Stuffing Review** [§3] | density gate |
| robots.txt | **Robots.txt Generator** [§4] | per repo |
| XML sitemap | **XML Sitemap Creator** [§4] | per repo |
| Crawl/duplicate audit | **Crawl Optimization for Large Sites** · **Duplicate Content Risk Identifier** [§4] | cross-subdomain |
| Technical audit | **Technical SEO Audit Checklist** [§4] | baseline scoring |
| Entity authority | **Entity-Based Content Enhancement** [§12] | entities per topic |
| AI-answer / zero-click | **Search Generative Experience Predictor** · **Zero-Click SERP Survival Strategy** [§12] | AEO layer |
| Programmatic templates | **Programmatic SEO Templates** [§12] | for jurisdiction/visa-type pages at scale |
| SEO+CRO merge | **SEO + CRO Optimization** [§12] | reconcile with page-cro skill |
| Competitor gap | **Enhanced Competitor Gap Analysis** · **Competitor SEO Strategy Audit** · **Competitor E-E-A-T Analysis** [§10] | Burnside + UAE firms |
| ICP foundation (upstream) | **Ideal Customer Profile Report** · **Customer Pain Point Explorer** · **Customer Journey Mapping** [§9] | run ONCE, feeds all keyword work |
| Local SEO | **Location Page Content Creator** [§5] | Dubai/UAE geo signals |
| Reporting baseline | **SEO KPI Suggestions by Business Model** · **Organic Traffic Analysis** · **GSC Data Analysis in Plain English** [§11] | needs GSC/Ahrefs if available |

---

## 4. WTP MUST / NEVER Gates (apply to ALL artifacts)

Derived from `wtp2-context` + the 30-skill mesh-audit lessons (2026-05-20) on AI-leakage.

### MUST
- **Banking-First framing** — banking is the hardest/first step; never lead with "company setup".
- **Specific numbers** — "$3.1M avg Marina deal", "8.95% mortgage", "AED 2M Golden Visa threshold" — not vague claims.
- **EN primary, RU secondary** — G1/G3/G5 English; G2 + RU microlandings Russian. hreflang pairs where both exist.
- **Entity precision** — real jurisdictions (mainland/freezone/DIFC/ADGM), real visa types, real bank names where defensible.
- **Commercial/bottom-funnel keyword priority** — buyers with budget + authority, not top-funnel browsers.
- **Char limits** — title ≤60, meta ≤155, H1 single per page.
- **Canonical discipline** — every page declares canonical; cross-subdomain duplication resolved.

### NEVER (anti-AI-leakage — these flag content as machine-written to an HNWI audience)
- NEVER "X is not Y" antithesis construction (audit found 28× — kills credibility).
- NEVER >3 em-dashes per page.
- NEVER arrow-bullet lists (→) as the dominant list style.
- NEVER closing aphorism / "fortune-cookie" sentence.
- NEVER buzzwords: "unlock", "seamless", "leverage" (as verb), "elevate", "navigate the complexities", "in today's landscape", "robust", "cutting-edge".
- NEVER exclamation marks in body copy.
- NEVER keyword stuffing (run Keyword Stuffing Review gate — density >2.5% on primary = fail).
- NEVER fabricated stats, awards, or client specifics without provenance.
- NEVER thin pages (<300 words of unique content on an indexable URL).

### STAKES
All G1/G3 public-facing copy = **STAKES=HIGH** (client/HNWI-facing, reputation surface) → mandatory adversarial review pass before ship (per AG OS Rule 5 auto-derive).

---

## 5. Pipeline Order (the Workflow stages)

```
STAGE 0  FOUNDATION (once, portfolio-wide)
  → ICP report + pain points + customer journey  [§9 prompts]
  → Master keyword universe + intent clusters     [§1 prompts]
  → Topical map (pillar→cluster)                   [§1/§2]
  → Competitor SEO gap (Burnside + UAE firms)      [§10]
  Output: WTP2/seo/artifacts/00-foundation.md

STAGE 1  BASELINE AUDIT (once per repo)  ← can run parallel with Stage 0
  → Technical SEO audit checklist                  [§4]
  → Current sitemap/robots/meta/schema inventory   (read actual files)
  → Duplicate/cannibalization map                  [§4]
  Output: WTP2/seo/baseline/{repo}.md

STAGE 2  PER-URL ON-PAGE (fan-out: 1 subagent per URL)
  For each URL, in order:
    a. Keyword cluster (from master universe slice) [§1]
    b. Title + meta (+2 variations)                 [§3]
    c. Heading outline                              [§6]
    d. FAQ block + featured-snippet block           [§3]
    e. JSON-LD + FAQ schema                         [§4]
    f. Internal-link map (inbound/outbound)         [§3/§13]
    g. Entity coverage + AEO notes                  [§12]
  Each URL passes MUST/NEVER gate (§4) inside the subagent.
  Output: WTP2/seo/artifacts/{group}/{url}.md

STAGE 3  TECHNICAL FIXES (per repo)
  → Generate corrected robots.txt + sitemap.xml    [§4]
  → Canonical + hreflang plan                       (custom)
  → List of code changes (vite.config htmlMetaPlugin, schema injection)
  Output: WTP2/seo/artifacts/{repo}-technical.md

STAGE 4  ADVERSARIAL REVIEW (STAKES=HIGH gate)
  → Independent reviewer subagent per URL artifact:
    anti-AI-leakage scan + factual check + char-limit + canonical sanity.
  → KILL/FIX-THEN-SHIP/SHIP verdict per artifact.
  Output: WTP2/seo/artifacts/{group}/REVIEW.md

STAGE 5  IMPLEMENTATION (gated — only on user OK)
  → Apply title/meta via vite.config.ts / index.html per repo conventions.
  → Inject JSON-LD. Update sitemap/robots. Deploy.
  → Verify live (curl meta, validate schema).
```

**Dependency:** Stage 0 master keyword universe MUST complete before Stage 2 (per-URL pulls its slice).
Stage 1 is independent (parallel). Stages 2→4 pipeline per-URL (a URL can be in Review while another is still in On-Page). Stage 5 is gated behind explicit user approval (code mutation on live sites).

---

## 6. Conventions

- **One artifact file = one URL** (avoids subagent write-conflicts; proven WTP mesh pattern).
- Each artifact file is self-contained markdown: keyword cluster table → meta → headings → schema (fenced JSON-LD) → internal links → review verdict.
- Variables in prompts filled from: page's current copy (read live or from repo) + wtp2-context + Stage-0 keyword universe.
- RU artifacts (G2/G4-RU): same structure, RU keyword research (Yandex-aware per MEMORY — AEO under Яндекс/Алиса/YandexGPT, not only Google).
- Code changes are PROPOSED in Stage 4 and only APPLIED in Stage 5 after user ship-word (AG OS Rule 6 — no mutation on momentum).

---

## 7. Done-Criteria (verifiable)

- **System built:** Constitution + per-group SPECs + Workflow script exist and run.
- **Pilot (G1) complete:** 5 URLs × full PT-A artifact bundle + technical fixes + review verdicts, all passing MUST/NEVER.
- **Each artifact:** title ≤60, meta ≤155, valid JSON-LD (parses), 0 NEVER-list violations, canonical declared.
- **Scale-ready:** running the same Workflow with a different group arg produces the same bundle for that group.
