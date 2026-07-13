# G1 Technical Fixes — Stage 3 (Portfolio-wide)

> Stage-3 TECHNICAL deliverables for G1 (`WTP2/` repo → CF Pages `wtp2`). EN primary.
> Inputs: `seo/baseline/G1-technical.md` (current state), `seo/specs/G1-SPEC.md` §"Portfolio-wide",
> Constitution §2 "Portfolio-wide" + §4 gates + §5 Stage 3. Library prompts executed:
> §4 **Robots.txt Generator**, §4 **XML Sitemap Creator**, §4 **Duplicate Content Risk Identifier**.
> **This is a PLAN. No app code modified.** Mutation is Stage-5 only, gated on user ship-word (Rule 6).
> Author: SEO subagent. Date: 2026-06-04.

---

## 1. Corrected `public/robots.txt`

**Prompt executed:** §4 "Robots.txt Generator" — `[DOMAIN]` = `wtp.ae`, `[LINK TO XML SITEMAP]` = `https://wtp.ae/sitemap.xml`. The library prompt's WordPress-specific blocks (`/wp-admin`, `/wp-login.php`) are **N/A** — WTP is a Vite/React SPA on Cloudflare Pages, no WordPress. I dropped those literal lines and kept the applicable intent: allow CSS/JS for rendering, reference the sitemap, block nothing that should be indexed.

Baseline issue resolved: the prior file (3 lines) was functional but (a) referenced a single sitemap and (b) sub-landings get no robots of their own. Since all subdomains are served by the same `_worker.js` from one Pages project, the canonical fix is a **sitemap index** referenced from one robots, plus explicitly allowing render-critical assets. Crawlers hitting `banking.wtp.ae/robots.txt` will still fall through to SPA HTML (worker behavior, baseline §3) — fixing that is a worker change listed in §5, not a robots.txt change.

```txt
# robots.txt — WTP (wtp.ae) — Cloudflare Pages SPA
# Allow full crawl; explicitly permit render-critical assets; reference sitemap index.

User-agent: *
Allow: /

# Render-critical assets (let crawlers fetch CSS/JS for full-page rendering)
Allow: /assets/
Allow: /*.css$
Allow: /*.js$

# AI-answer / LLM crawlers — explicitly permitted (AEO surface, Constitution §0)
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://wtp.ae/sitemap.xml
```

Notes:
- No `Disallow` blocks: there are no admin/staging/dev subdirectories in the build output (`build-cloudflare.mjs` ships only landing bundles). Adding spurious disallows would risk de-indexing money pages.
- AI-crawler allow-block is explicit (not relying on wildcard) because Constitution §0 scopes AI-answer/SGE/AEO surfaces as in-scope; making intent explicit avoids future ambiguity if a blanket block is ever added.
- `Sitemap:` points to a **sitemap index** (`/sitemap.xml` reworked as an index in §2) so one robots covers EN now and RU later (G2) without editing robots again.

---

## 2. Corrected `public/sitemap.xml`

**Prompt executed:** §4 "XML Sitemap Creator" — supplied the list of indexable, self-canonicalized, 2xx EN URLs. Per SPEC §"Portfolio-wide", coverage = **all 5 EN URLs + lastmod**; **RU URLs flagged G2-deferred** (commented stub, not live entries). Per baseline §2, the client spoke money-pages (uk-non-dom, german-exit-tax, dutch-box3, roadmap) were missing and are now included — they are bottom-funnel money pages (Constitution §4 commercial-intent priority).

Design decisions baked in:
- **Self-canonical hosts only.** Each landing listed at its **subdomain** form (`banking.wtp.ae/`), never the path-duplicate (`wtp.ae/banking`) or the `pages.dev` form. This makes the sitemap declare the canonical host and starves the duplicate forms (see §3).
- **lastmod added** to every entry (baseline 🚩: none existed). Use real git commit date of the corresponding component at Stage-5 apply; placeholder `2026-06-04` below = audit date, to be replaced by build-time generation (see §5 code-list).
- **hreflang alternates in-sitemap** via `xhtml:link` are **prepared but commented** for EN-only G1 (the RU host isn't in G1 scope). They activate in G2 — included as a stub so the schema/namespace is already correct and G2 only uncomments.
- **Structured as a sitemap index** wrapping one EN child sitemap, so G2 adds a RU child sitemap without touching robots or the index consumer. Both the index and the EN child are shown.

### 2a. `public/sitemap.xml` (sitemap **index**)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://wtp.ae/sitemap-en.xml</loc>
    <lastmod>2026-06-04</lastmod>
  </sitemap>
  <!-- G2-DEFERRED (RU mirror, wtpref.ru): add when G2 ships its own build sitemap.
  <sitemap>
    <loc>https://wtpref.ru/sitemap-ru.xml</loc>
    <lastmod>2026-06-04</lastmod>
  </sitemap>
  -->
</sitemapindex>
```

### 2b. `public/sitemap-en.xml` (EN URL set — all 5 landings + real money routes)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- U1: main hub -->
  <url>
    <loc>https://wtp.ae/</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <!-- G2: <xhtml:link rel="alternate" hreflang="ru" href="https://wtpref.ru/"/> -->
    <!-- G2: <xhtml:link rel="alternate" hreflang="en" href="https://wtp.ae/"/> -->
    <!-- G2: <xhtml:link rel="alternate" hreflang="x-default" href="https://wtp.ae/"/> -->
  </url>
  <url>
    <loc>https://wtp.ae/process</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://wtp.ae/submit-case</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://wtp.ae/contact</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://wtp.ae/partner-kit</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- U2: banking (canonical host = subdomain) -->
  <url>
    <loc>https://banking.wtp.ae/</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- U3: realestate -->
  <url>
    <loc>https://realestate.wtp.ae/</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- U4: partners -->
  <url>
    <loc>https://partners.wtp.ae/</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- U5: client + bottom-funnel spoke money-pages -->
  <url>
    <loc>https://client.wtp.ae/</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://client.wtp.ae/roadmap</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://client.wtp.ae/uk-non-dom</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://client.wtp.ae/german-exit-tax</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://client.wtp.ae/dutch-box3</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Legal (low priority, indexable) -->
  <url>
    <loc>https://wtp.ae/privacy</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://wtp.ae/terms-of-service</loc>
    <lastmod>2026-06-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>
```

**Excluded on purpose (NOT in sitemap):**
- `wtp.ae/banking`, `wtp.ae/realestate`, `wtp.ae/partners`, `wtp.ae/client` (path-duplicates of subdomains) → non-canonical, see §3.
- `*.pages.dev/*` (preview host) → non-canonical, see §3.
- `/products/:slug`, `/process/:slug` dynamic routes → decision in §3 (canonical-to-subdomain → keep OUT of sitemap).
- Thank-you / SPA transient states → not distinct indexable URLs.

**G2-deferred (RU):** all `wtpref.ru` + subdomains. They ship as a separate `sitemap-ru.xml` from the RU (Timeweb) build and register in the index (2a, commented block). Not part of this EN deliverable.

---

## 3. Canonical Strategy (§4 "Duplicate Content Risk Identifier")

**Prompt executed:** §4 "Duplicate Content Risk Identifier" — reviewed the metadata + host forms across the portfolio for duplicate/cannibalization risk. Baseline §4 + §7 confirm the same `index.html` per landing is reachable at **three host forms** with no canonical and no redirect.

### Risk found (the cannibalization map)
Each focused landing is served identically at:
1. `https://{landing}.wtp.ae/` — subdomain (worker `build-cloudflare.mjs:126-155`)
2. `https://wtp.ae/{landing}` — path route (worker `:157-167`)
3. `https://wtp2.pages.dev/{landing}/` — preview host

Same content, same `og:url` logic, **zero canonical** (baseline §4: grep `canonical` = 0 matches). This is textbook cannibalization — Google picks an arbitrary canonical, splitting link equity across 3 URLs per landing × 4 focused landings.

### Decision: each subdomain is SELF-CANONICAL; duplicates resolve TO the subdomain

| URL form | Canonical target | Mechanism |
|---|---|---|
| `banking.wtp.ae/` (and re/partners/client) | **self** (`https://banking.wtp.ae/`) | `<link rel="canonical">` injected in head, host-aware |
| `wtp.ae/banking` (path duplicate) | `https://banking.wtp.ae/` | **301 redirect in worker** (preferred) — stronger than canonical; or canonical-to-subdomain if redirect deferred |
| `*.pages.dev/*` (preview) | corresponding `wtp.ae` host | 301 in worker OR canonical; preview should ideally `noindex` |
| `wtp.ae/` (main hub) | **self** (`https://wtp.ae/`) | self-canonical |

### `/products/:slug` and `/process/:slug` in main — DECISION: **canonical-to-subdomain (do NOT noindex)**

The SPEC (§6 U1) flags `wtp.ae/products/banking` vs `banking.wtp.ae/` cannibalization and asks: canonical-to-subdomain OR noindex?

**Decision: canonical-to-subdomain.** Rationale:
- These product cards are **navigational/teaser views inside the hub**, not standalone optimized landings. The fully-optimized money page is the **subdomain** (e.g. `banking.wtp.ae/` = the Banking-First reference page, SPEC U2). So the subdomain is unambiguously the stronger canonical target.
- `noindex` would be heavier-handed and risks the crawler dropping the URL from its frontier entirely, which can weaken internal-link signal flow through the hub. **Canonical** consolidates ranking signals onto the subdomain while still letting the hub page be crawled and pass link equity outward (the hub→spoke wiring is the #1 portfolio gap per baseline §6/§9).
- It also keeps behavior consistent with the `wtp.ae/banking` path-route decision above (everything product-ish points to the subdomain).
- **Exception:** if a `/products/:slug` page ever grows unique, substantial content (>300 words, its own FAQ) it graduates to self-canonical. None do today → all `canonical → {slug}.wtp.ae/`.
- **Keep these OUT of the sitemap** (they're canonicalized away — listing a non-self-canonical URL in the sitemap is a mixed signal).

Net: one canonical winner per landing = the subdomain. Path-duplicates 301 (best) or canonical to it. Preview host noindex+canonical. Product/process dynamic routes canonical to their subdomain and excluded from sitemap.

---

## 4. hreflang Plan (runtime → static head + x-default + sitemap)

### Current state (baseline §4)
`Layout.tsx:23-43` injects two `<link rel="alternate" hreflang>` tags at runtime in a `useEffect` (self + other lang). Problems: client-side only (fragile for crawlers/AI bots), no `x-default`, not in static HTML, not in sitemap.

### Plan
1. **Move to static head (build-time).** Emit hreflang `<link>` tags into `index.html` via `htmlMetaPlugin()` (`vite.config.ts:76-124`) `transformIndexHtml`, exactly like title/og are injected. They become part of the shipped HTML — crawler-safe, no JS execution required.
   - Compute from existing build vars (`landing`, `lang`, `siteUrl`) + the existing `getOtherLangDomain` logic (already correct per baseline §4): `enUrl = https://{subdomain}wtp.ae{path}`, `ruUrl = https://{subdomain}wtpref.ru{path}`. For landing-root pages, path = `/`.
   - Inject the **full cluster on every page**: self (`hreflang="{lang}"`), other (`hreflang="{otherLang}"`), and **`hreflang="x-default"`** → EN host (EN is primary per Constitution §4).
2. **Add x-default** → always the EN host of that landing (`https://{subdomain}wtp.ae/`). This is the new piece (baseline 🚩 missing).
3. **Pair with self-canonical** (§3) — hreflang clusters must be paired with a self-canonical on each member; §3 supplies that. A cluster without canonical is incomplete (baseline §4 problem 3).
4. **Remove the runtime `useEffect`** hreflang injection from `Layout.tsx:23-43` once static tags ship — otherwise the page carries duplicate hreflang links (one static, one runtime-appended on route change). Static is authoritative; delete the effect.
5. **Sitemap alternates** — the `xhtml:link rel="alternate"` annotations are prepared (commented) in `sitemap-en.xml` (§2b) and the `xhtml:` namespace is already declared. They go live in **G2** when the RU host is in scope. EN-only G1 ships self + x-default reasoning but the live RU pairing waits for G2 (RU URLs are G2-deferred per task).

**G1 caveat:** since the RU mirror is G2 scope, the *live* EN↔RU hreflang pairing fully activates in G2. For G1 the deliverable is: (a) the static-head injection mechanism built, (b) x-default added, (c) runtime effect removed, (d) sitemap alternates stubbed. The EN self + x-default tags ship now; the `hreflang="ru"` partner tag points at the RU host which goes live with G2.

---

## 5. Code-Change List (PLAN ONLY — apply in Stage 5 after user ship-word)

Exact files/lines to touch. Nothing modified now (Rule 6).

### A. `vite.config.ts` — meta entries (title/meta fixes from SPEC §2)
Replace the `meta` record string values (lines 11-72). Final copy comes from the per-URL artifacts (`seo/artifacts/G1/{landing}.md` Stage 2), but the entries that MUST change:
- **`meta.main.en.title`** (line 14): drop "Company Formation & Banking" formation-lead → Banking-First lead, ≤60. (Banking-First MUST, baseline §1 + SPEC §2 U1.)
- **`meta.main.ru.title`** (line 19): 65→≤60, Banking-First lead.
- **`meta.main.en.description`** (line 15) + **`meta.main.ru.description`** (line 20): reorder to banking-first; main.ru 163→≤155; remove NEVER-list "handle the complexity" framing (SPEC §"Exceptions" U1).
- **`meta.main.en/ru.keywords`** (lines 16, 21): reorder so banking/compliance lead, not "company formation".
- **`meta.banking.en.title`** (line 26): 61→≤60.
- **`meta.realestate.en.title`** (line 38): 65→≤60.
- **`meta.client.en.title`** (line 62): 70→≤60. **`meta.client.ru.title`** (line 67): 66→≤60.
- **`meta.client.en.description`** (line 63): 164→≤155.
- Values sourced from Stage-2 artifacts; this list is the change-surface, not the final strings.

### B. `vite.config.ts` → `htmlMetaPlugin()` (lines 76-124) — inject canonical + hreflang + JSON-LD
Add three new `.replace()` / injection steps inside `transformIndexHtml` (after line 121, before the closing of the chain). Requires a matching placeholder comment in `index.html` (see D) to anchor each injection.

1. **Canonical** (§3): inject `<link rel="canonical" href="${siteUrl}/" />` (self-canonical per host). For landing-root only; dynamic-route canonical-to-subdomain is a runtime concern handled in F.
2. **hreflang static head** (§4): inject the 3-tag cluster computed from `siteUrl` + the EN/RU host pair:
   ```
   <link rel="alternate" hreflang="${lang}" href="${siteUrl}/" />
   <link rel="alternate" hreflang="${otherLang}" href="${otherSiteUrl}/" />
   <link rel="alternate" hreflang="x-default" href="${enSiteUrl}/" />
   ```
   Compute `otherSiteUrl` / `enSiteUrl` from `subdomain` + (`wtp.ae`|`wtpref.ru`) — same logic as `config/landing.ts:34-37` `getOtherLangDomain`, lifted to build time.
3. **JSON-LD** (Stage-2 schema, baseline §5 = absent): inject `<script type="application/ld+json">…</script>` blocks (`Organization` + `Service` + `BreadcrumbList` + `FAQPage` where exists) per landing. Source the JSON objects from each `seo/artifacts/G1/{landing}.md` §5. Key a `schema[landing]` record analogous to the existing `meta` record (lines 11-72) and inject `schema[landing]?.[...] ` as a stringified block. This is the largest single addition.

### C. `index.html` — add anchor placeholders for the new injections
The plugin uses regex-replace on existing tags. New tags need anchors:
- Add a static `<link rel="canonical" href="" />` placeholder (plugin replaces `href`).
- Add a static hreflang block placeholder (e.g. `<!--HREFLANG-->` comment the plugin replaces).
- Add a `<!--JSONLD-->` comment placeholder the plugin replaces with the script blocks.
- Confirm `og:type`, `og:image:width/height`, `twitter:card` static values are correct (baseline §0: these are NOT replaced at build — set them right once in `index.html`).

### D. `src/components/Layout.tsx` — remove runtime hreflang effect
- **Delete** the hreflang `useEffect` (lines 23-43) — superseded by static-head injection (§4 step 4). Leaves the GA4 effect (16-20) and scroll/pageview effect (45-48) intact. Removes `OTHER_DOMAIN` + `getDomain` imports if now unused (check line 9-10 usage after removal).

### E. `src/components/LandingPage.tsx` + `src/components/Footer.tsx` — hub→spoke internal links
The #1 portfolio gap (baseline §6/§9, SPEC §6 item 6). No cross-landing links exist today.
- **`LandingPage.tsx`** (main hub, U1): add a section / links OUT to `banking.wtp.ae`, `partners.wtp.ae`, `client.wtp.ae` (+ `realestate.wtp.ae` for agents) with **descriptive anchor text** (e.g. "UAE corporate banking", "client relocation desk") — not "click here". Wire from the product cards (the `/products/banking` cards currently route internally; point the canonical CTA at the subdomain or keep card + add explicit cross-domain link). Anchors per the Stage-2 internal-link maps in each `{landing}.md` §6.
- **`Footer.tsx`** (every landing): add a "WTP Services" footer column linking the 4 sibling landings (spoke → hub + spoke → sibling). This gives every island an inbound/outbound cross-landing link. Keep the existing `OTHER_DOMAIN` lang link (Footer.tsx:46). Footer is the lowest-effort way to wire all 5 islands at once.

### F. `scripts/build-cloudflare.mjs` — worker canonicalization (§3) [optional-but-recommended, larger change]
- Add **301 redirects**: `wtp.ae/{landing}` (path route, lines 157-167) → `https://{landing}.wtp.ae/`; `*.pages.dev` → corresponding `wtp.ae` host. This is the strongest fix for the 3-host duplication (§3). If deferred, the canonical tags from §B alone still resolve it (weaker but valid).
- Ensure each subdomain build ships its own `robots.txt` (baseline §3 ⚠: sub-landings currently get SPA HTML on `/robots.txt`). Add `robots.txt` + `sitemap.xml` to `ESSENTIAL_PUBLIC` copy list (`build-cloudflare.mjs:23-27`) or have the worker serve them per host.

### G. `public/robots.txt` + `public/sitemap.xml` + new `public/sitemap-en.xml`
- Replace `robots.txt` with §1 content.
- Replace `sitemap.xml` with §2a (index).
- Add new `public/sitemap-en.xml` with §2b.
- **lastmod automation:** at Stage-5, generate `<lastmod>` from git commit date per landing component (script step) rather than hard-coding `2026-06-04`, so freshness stays real on each deploy.

### Apply order (Stage 5)
G (files, lowest risk) → A (meta strings) → C (index.html anchors) → B (plugin injection) → D (remove runtime effect) → E (internal links) → F (worker, highest risk, optional). Verify after each: `curl` the built `index.html` for canonical/hreflang/JSON-LD presence; validate JSON-LD parses (Stage-5 done-criteria, Constitution §5).

---

## Verification checklist (Stage-3 done-criteria)
- [x] robots.txt corrected, references sitemap, allows render assets + AI crawlers, no spurious disallows.
- [x] sitemap covers all 5 EN landings + client spoke money-pages + lastmod; subdomain self-canonical hosts only; path/pages.dev duplicates excluded; RU flagged G2-deferred (commented index entry).
- [x] Canonical strategy decided: each subdomain self-canonical; `/products/:slug` → canonical-to-subdomain (not noindex), with rationale; kept out of sitemap.
- [x] hreflang plan: static head via htmlMetaPlugin + x-default + remove runtime useEffect + sitemap alternates stubbed for G2.
- [x] Code-change list: exact files/lines (vite.config.ts meta + htmlMetaPlugin, index.html anchors, Layout.tsx effect removal, LandingPage.tsx + Footer.tsx hub→spoke, build-cloudflare.mjs worker, public/* files).
- [x] No app code modified (PLAN only — Rule 6).
- [x] §4 gates: char limits flagged for Stage-2 copy; no NEVER-list violations introduced; canonical discipline satisfied; Banking-First fix surfaced for main.
