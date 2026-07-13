# G1 Technical SEO Baseline — WTP Main Multi-Landing

> Stage 1 baseline audit (read-only). Group **G1** = wtp.ae + banking/realestate/partners/client subdomains.
> Repo: `WTP2/` → CF Pages `wtp2`. EN primary, RU secondary (RU served from `wtpref.ru` via same codebase, Timeweb builds).
> Audited: 2026-06-04. Source files cited inline. No files modified.

---

## 0. How meta is generated (mechanism)

- **`vite.config.ts:11-72`** — single `meta` record keyed `[landing][lang]` → `{title, description, keywords}`. 5 landings × 2 langs = 10 entries.
- **`vite.config.ts:4-9`** — build-time env: `VITE_LANDING` (default `main`), `VITE_LANG` (default `en`). `siteUrl` = `https://{subdomain}{domain}` where domain = `wtp.ae` (en) / `wtpref.ru` (ru). subdomain = `''` for main else `{landing}.`.
- **`htmlMetaPlugin()` (`vite.config.ts:76-124`)** — `transformIndexHtml` regex-replaces the static tags in `index.html` at build time: `<html lang>`, `<title>`, `meta description`, `meta keywords`, `og:title`, `og:description`, `og:url`, `og:image`, `twitter:title`, `twitter:description`, `twitter:image`.
  - **og:url** = `${siteUrl}/` (correct per-landing/per-lang).
  - **og:image** / **twitter:image** = `${siteUrl}/og-image.png` (single shared image, no per-landing art).
  - **NOT replaced** (stay frozen at `index.html` static values for ALL builds): `og:type`, `og:image:width/height`, `twitter:card`. The `index.html` og:title/og:description static fallbacks (`index.html:19-20,29-30`) differ from the `main.en` meta record but get overwritten at build, so only matter if regex misses.
- **Per-page meta:** NONE. This is an SPA (React Router, `App.tsx:72-101`). Every route on a given landing serves the **same** `index.html` `<title>`/meta. `/contact`, `/process`, `/submit-case`, `/client/roadmap`, `/client/uk-non-dom`, etc. all inherit the landing-root title. No `react-helmet`, no `<Helmet>`, no runtime `document.title` mutation anywhere in `src/` (grep clean).

---

## 1. Current meta table (landing × lang)

Char counts exact (Python `len()`, em-dash = 1 char). Constitution §4 limits: **title ≤60, meta ≤155**.

| Landing | Lang | Title | Chars | Meta description | Chars | Keywords |
|---|---|---|---|---|---|---|
| main | en | WTP - UAE Execution Partner \| Company Formation & Banking | **57** ✅ | WTP is your UAE execution partner for company formation, corporate banking, and compliance. We handle the complexity so you can focus on growth. | 144 ✅ | UAE company formation, corporate banking, Dubai business setup, DIFC, compliance, WTP |
| main | ru | WTP - Партнер по операциям в ОАЭ \| Регистрация компаний и банкинг | **65 🚩>60** | WTP — ваш операционный партнер в ОАЭ: регистрация компаний... сосредоточиться на росте. | **163 🚩>155** | регистрация компании ОАЭ, корпоративный банкинг... |
| banking | en | WTP - Corporate Banking in UAE \| Account Opening & Compliance | **61 🚩>60** | Expert corporate banking services in the UAE. We open accounts, handle compliance, and solve banking challenges for international businesses. | 141 ✅ | UAE corporate banking, business account UAE, bank account opening Dubai, banking compliance |
| banking | ru | WTP - Корпоративный банкинг в ОАЭ \| Открытие счетов | 51 ✅ | Экспертные услуги корпоративного банкинга в ОАЭ. Открытие счетов... | 130 ✅ | корпоративный банкинг ОАЭ, открытие счета ОАЭ... |
| realestate | en | WTP - Real Estate Operations in UAE \| Property Deals & Compliance | **65 🚩>60** | Professional real estate execution in the UAE. From property structuring to compliance, we handle operational complexity for real estate investors. | 147 ✅ | UAE real estate, property investment Dubai, real estate compliance, property structuring UAE |
| realestate | ru | WTP - Недвижимость в ОАЭ \| Сделки и комплаенс | 45 ✅ | Профессиональное сопровождение сделок с недвижимостью в ОАЭ... | 129 ✅ | недвижимость ОАЭ, инвестиции Дубай... |
| partners | en | WTP - Partner Program \| Refer Clients to UAE Services | 53 ✅ | Join WTP Partner Program. Refer clients for UAE company formation, banking, and compliance services. Transparent process and reliable execution. | 144 ✅ | WTP partner program, UAE services referral, business partner Dubai, company formation partner |
| partners | ru | WTP - Партнерская программа \| Рекомендуйте клиентов | 51 ✅ | Присоединяйтесь к партнерской программе WTP. Рекомендуйте клиентов... | 121 ✅ | партнерская программа WTP, рекомендации ОАЭ... |
| client | en | WTP - UAE Relocation Partner \| Exit Coordination & Banking-First Setup | **70 🚩>60** | WTP orchestrates your complete relocation — coordinated exit from your jurisdiction and bankable company setup in the UAE through our international partner network. | **164 🚩>155** | UAE relocation, company formation UAE, corporate banking Dubai, exit tax coordination, UK non-dom UAE, German exit tax, Banking-First, Golden Visa |
| client | ru | WTP - Релокация бизнеса в ОАЭ \| Координация выхода и Banking-First | **66 🚩>60** | WTP координирует вашу полную релокацию — выход из текущей юрисдикции... | 144 ✅ | релокация ОАЭ, регистрация компании ОАЭ... Banking-First, Golden Visa |

Source: `vite.config.ts:11-72`.

### Char-limit violations (Constitution §4)
- **Titles >60:** main.ru (65), banking.en (61), realestate.en (65), client.en (70), client.ru (66) → **5 of 10**.
- **Meta >155:** main.ru (163), client.en (164) → **2 of 10**.

### Banking-First violations (Constitution §4 MUST: never lead with company setup)
- 🚩 **main.en title** leads `Company Formation & Banking` — company formation FIRST, banking second. Direct Banking-First inversion. Same in **main.ru** (`Регистрация компаний и банкинг`).
- 🚩 **main.en meta** & **main.ru meta** open with "company formation, corporate banking, and compliance" — formation first.
- 🚩 **main.en/ru keywords** lead with `UAE company formation` / `регистрация компании ОАЭ`.
- ✅ **banking.en/ru** correctly lead with banking. **client.en/ru** lead with relocation+exit then "Banking-First" explicitly — acceptable. realestate/partners are domain-specific (not formation-led).
- **Net:** the **money page (main, both langs)** violates Banking-First in title, meta, and keywords. Highest-priority copy fix.

### NEVER-list buzzword scan (Constitution §4)
- Scanned all 10 titles + 10 metas for: unlock, seamless, leverage(verb), elevate, "navigate the complexities", "in today's landscape", robust, cutting-edge, exclamation marks, em-dash overuse, "X is not Y".
- **Result: 0 buzzword violations, 0 exclamation marks.** Em-dashes: client.en meta uses 1 (`relocation —`), main.ru/client.ru use the RU em-dash `—` 1× each. All ≤3/page → within limit. **Clean.**
- Note: titles use ` - ` (hyphen-minus) as brand separator, not a typographic em-dash — fine, but stylistically a real `|` pipe is already used as the secondary separator, so the leading `WTP - ` hyphen is slightly inconsistent (cosmetic only).

---

## 2. Sitemap state — `public/sitemap.xml`

11 `<loc>` entries:

| URL | changefreq | priority | Notes |
|---|---|---|---|
| https://wtp.ae/ | weekly | 1.0 | main |
| https://wtp.ae/process | monthly | 0.8 | |
| https://wtp.ae/partner-kit | monthly | 0.8 | |
| https://wtp.ae/submit-case | monthly | 0.9 | |
| https://wtp.ae/contact | monthly | 0.7 | |
| https://wtp.ae/privacy | yearly | 0.3 | |
| https://wtp.ae/terms-of-service | yearly | 0.3 | |
| https://banking.wtp.ae/ | weekly | 0.9 | subdomain |
| https://realestate.wtp.ae/ | weekly | 0.9 | subdomain |
| https://partners.wtp.ae/ | weekly | 0.9 | subdomain |
| https://client.wtp.ae/ | weekly | 0.9 | subdomain |

### Issues
- 🚩 **No `<lastmod>` on ANY url** — freshness signal entirely absent.
- 🚩 **No RU mirror coverage** — sitemap lists only `wtp.ae`. No `wtpref.ru` entries despite RU being a live build target (G2). EN↔RU not declared anywhere in sitemap. (Note: RU is technically G2 scope, but the same repo builds it; the EN sitemap should still cross-reference or RU should ship its own sitemap.)
- 🚩 **Missing real indexable routes** present in `App.tsx`: `/library` (`/documents`), `/engagement`, `/updates`, `/risk`, `/partners` (path route on main), `/products/:slug`, `/process/:slug`, and client spokes `/client/roadmap`, `/client/uk-non-dom`, `/client/german-exit-tax`, `/client/dutch-box3`. The client spoke pages (`SpokePage`, `App.tsx:85-87`) are bottom-funnel money pages (UK non-dom, German exit tax) and are **NOT in the sitemap**.
- ⚠️ No `<xhtml:hreflang>` alternate annotations in sitemap (the alternative/additional way to declare EN↔RU besides `<link>` tags).
- ✅ Subdomains correctly use absolute URLs. robots references this sitemap correctly.

---

## 3. robots.txt — `public/robots.txt` (verbatim)

```
User-agent: *
Allow: /

Sitemap: https://wtp.ae/sitemap.xml
```

### Issues
- ✅ Allows all crawlers, references sitemap. Functional baseline.
- ⚠️ **Single sitemap reference** — only `wtp.ae/sitemap.xml`. Subdomains (banking./realestate./etc.) and `wtpref.ru` have no per-host sitemap declaration. With CF subdomain routing each host should ideally surface the sitemap (or a sitemap index).
- ⚠️ No `Host`, no explicit `Disallow` for non-indexable utility paths (e.g. none needed strictly, but `/submit-case` thank-you states etc. are SPA — fine).
- ⚠️ This single robots.txt ships to root only; sub-landing builds copy only `ESSENTIAL_PUBLIC` (favicons, og, logos — `build-cloudflare.mjs:23-27`), so subdomains get **no robots.txt of their own** (they 404 robots, or fall through worker SPA). Crawlers hitting `banking.wtp.ae/robots.txt` get the SPA HTML fallback, not a robots file.

---

## 4. Canonical / hreflang

### Canonical: **ABSENT** 🚩
- Grep for `canonical` across `src/` → **zero matches**. `index.html` has **no** `<link rel="canonical">`. `htmlMetaPlugin` does not inject one. Worker (`build-cloudflare.mjs`) does not add one.
- Constitution §4 MUST "every page declares canonical" → **violated for all 5 EN landings + all RU + all sub-routes.**
- Cross-subdomain duplication risk is real and unmanaged: e.g. path-route `wtp.ae/banking` (worker `build-cloudflare.mjs:163`) vs subdomain `banking.wtp.ae/` serve the **same** banking index.html with **same** og:url logic but no canonical to disambiguate. Same content reachable at two hosts with no canonical = cannibalization exposure (Constitution §1 flags this exact case as "critical").

### hreflang: **PARTIAL (runtime-injected, SPA — likely invisible to crawlers)** ⚠️
- `Layout.tsx:22-43` runtime-injects two `<link rel="alternate" hreflang>` tags via `document.createElement` in a `useEffect`: self (`getDomain(lang)` + pathname) and other (`OTHER_DOMAIN` + pathname).
- `OTHER_DOMAIN` = `getOtherLangDomain(BUILD_LANG)` (`LanguageContext.tsx:62`, `config/landing.ts:34-37`) → EN build points to `wtpref.ru` equivalent and vice-versa, subdomain-aware. Logic is correct.
- 🚩 **Problems:**
  1. **Client-side only** — injected after React mounts in `useEffect`. Not in the static `index.html` shipped to crawlers. Googlebot may render it, but it's fragile and many crawlers/AI-answer bots won't.
  2. **No `x-default`** hreflang.
  3. **Self-referencing hreflang uses pathname** which is good, but since there's no canonical, the alternate cluster is incomplete (hreflang clusters should be paired with self-canonical).
  4. Not reflected in sitemap (no `xhtml:link` alternates).

---

## 5. Schema / JSON-LD: **ABSENT** 🚩

- Grep `application/ld+json`, `ld+json`, `schema.org` across `src/` and `index.html` → **zero matches**.
- No `Organization`, no `Service`, no `BreadcrumbList`, no `FAQPage`, no `WebSite/SearchAction`, no `Person`. Nothing.
- Constitution §2 PT-A requires `Organization` + `Service` + `BreadcrumbList` (+ `FAQPage`) per landing → **0 of required schema present on any G1 URL.**
- No FAQ blocks wired to schema either (FAQ content may exist in page copy but is not marked up).

---

## 6. Internal-link structure (hub-and-spoke map)

Routing is **two-layered**: SPA routes within a landing (React Router) + cross-landing via separate subdomain builds.

### Within-landing nav (main landing, `Navbar.tsx:84-89`)
- Brand logo → `/` (home).
- `#process`, `#partners`, `#risk` → **anchor scroll on home** (not real page links; `handleNavClick` `Navbar.tsx:30-66` smooth-scrolls or routes to `/` then scrolls). These are NOT crawlable internal links to distinct pages — they're same-page anchors.
- `/contact` → real Link.
- Focused landings (banking/realestate/partners/client, `IS_FOCUSED_LANDING`, `Layout.tsx:55`) use **`NavbarMinimal`** instead — minimal/no cross-nav.

### Footer (`Footer.tsx`, every landing)
- `mailto:hello@wtpbrokers.com`, `tel:+971600575294` (note: email domain `wtpbrokers.com` ≠ site domain `wtp.ae`).
- `/terms-of-service`, `/privacy`, `/process/terms` (main only, `Footer.tsx:33-35`).
- Cookie settings button (no link).
- `OTHER_DOMAIN` link → the RU/EN counterpart of the SAME landing (`Footer.tsx:46`). This is the **only cross-language link**.

### Cross-landing links: **NONE** 🚩
- There is **no navigation linking main ↔ banking ↔ realestate ↔ partners ↔ client.** Each subdomain is an island. The hub (wtp.ae) does NOT link out to banking.wtp.ae / realestate.wtp.ae / etc., and spokes don't link back to the hub.
- Constitution §2 PT-A requires "hub-and-spoke to wtp.ae" internal-linking map. **Currently zero hub-and-spoke wiring exists** — the portfolio has no internal link equity flow between landings.
- The main landing's `#partners` anchor is to a section, not to `partners.wtp.ae`.
- Client landing has internal spokes (`/roadmap`, `/uk-non-dom`, `/german-exit-tax`, `/dutch-box3` — `App.tsx:84-88`) but those are not in the sitemap and their inbound linking is internal to the client SPA only.

### Map (current reality)
```
wtp.ae (main)  ──footer──> /contact, /privacy, /terms-of-service, /process/terms
   │  (#process #partners #risk = same-page anchors, not links)
   └──footer OTHER_DOMAIN──> wtpref.ru (RU main)   [only cross-host link]

banking.wtp.ae      [island]  ──footer OTHER_DOMAIN──> banking.wtpref.ru
realestate.wtp.ae   [island]  ──footer OTHER_DOMAIN──> realestate.wtpref.ru
partners.wtp.ae     [island]  ──footer OTHER_DOMAIN──> partners.wtpref.ru
client.wtp.ae       [island]  ──> /roadmap /uk-non-dom /german-exit-tax /dutch-box3 (internal spokes)
                              ──footer OTHER_DOMAIN──> client.wtpref.ru

NO main ↔ subdomain links in either direction.
```

---

## 7. Worker / routing / redirect logic (`scripts/build-cloudflare.mjs`)

- Builds 5 EN landings (`LANDINGS`, line 18) into `dist/{landing}-en`, merges into `dist/cloudflare/` (main at root, others under `/{landing}/`).
- Generates `_worker.js` (lines 78-170) doing:
  - **301 redirect** legacy `wtpref.com` → `wtp.ae`, subdomain-preserving, path+query preserving, 1h cache (`build-cloudflare.mjs:93-108`). ✅ Good — but note this is `wtpref.com` (legacy EN), **not** `wtpref.ru` (live RU). RU stays on Timeweb.
  - **Subdomain routing** (`:126-155`): `banking.`/`realestate.`/`partners.`/`client.` → serve that landing's index.html; static assets prefixed with `/{landing}/`.
  - **Path-based routing** (`:157-167`): `/banking`, `/realestate`, etc. on pages.dev/root → same landing index.html.
- 🚩 **Canonical/SEO consequence:** every landing is reachable at BOTH `{landing}.wtp.ae/` AND `wtp.ae/{landing}` (path route, line 163-166) AND `wtp2.pages.dev/{landing}/`. Three URL forms, **no canonical, no redirect between them** → duplicate-content / cannibalization across hosts. Only the legacy `.com→.ae` case is 301'd. No host-canonicalization (e.g. pages.dev → wtp.ae) and no path→subdomain canonical.
- No JSON-LD injection, no canonical injection, no per-page meta in the worker.

---

## 8. Gap list vs Constitution §2 PT-A (per landing)

PT-A required artifact set: (1) keyword cluster, (2) title+meta ≤limits +2 variations, (3) H1+heading outline, (4) JSON-LD Organization+Service+BreadcrumbList(+FAQPage), (5) FAQ block + schema, (6) internal-link map (hub-and-spoke), (7) entity coverage. Plus portfolio-wide: robots, sitemap, duplicate map, canonical strategy, competitor gap, topical map, KPI baseline.

| Artifact | main | banking | realestate | partners | client |
|---|---|---|---|---|---|
| (1) Keyword cluster (intent-tagged, primary+secondary+long-tail) | ❌ (only a flat keywords meta string) | ❌ | ❌ | ❌ | ❌ |
| (2) Title ≤60 | 🚩 ru>60 | 🚩 en 61 | 🚩 en 65 | ✅ | 🚩 en 70, ru 66 |
| (2) Meta ≤155 | 🚩 ru 163 | ✅ | ✅ | ✅ | 🚩 en 164 |
| (2) +2 variations | ❌ | ❌ | ❌ | ❌ | ❌ |
| (3) H1 + heading outline (mapped to cluster + Banking-First) | ❌ not audited as artifact (in-page only, no SEO outline doc) | ❌ | ❌ | ❌ | ❌ |
| (4) JSON-LD Organization+Service+BreadcrumbList | ❌ ABSENT | ❌ | ❌ | ❌ | ❌ |
| (5) FAQ block + FAQPage schema | ❌ | ❌ | ❌ | ❌ | ❌ |
| (6) Internal-link map (hub-and-spoke to wtp.ae) | 🚩 no outbound to spokes | 🚩 island | 🚩 island | 🚩 island | 🚩 island (+internal spokes only) |
| (7) Entity coverage (banks/jurisdictions/visa types) | ❌ no entity doc | ❌ | ❌ | ❌ | partial (UK/DE/NL spokes exist) |
| Banking-First framing in meta | 🚩 violated (formation-led) | ✅ | n/a | n/a | ✅ |

### Portfolio-wide gaps
- **robots.txt:** ✅ exists (root) but ⚠️ not per-subdomain.
- **XML sitemap:** ⚠️ exists but no lastmod, missing client spokes + utility routes, no RU, no hreflang alternates.
- **Duplicate/cannibalization map:** ❌ none — and active duplication exists (subdomain vs path vs pages.dev, all un-canonicalized).
- **Canonical strategy:** ❌ ABSENT entirely (no canonical tag anywhere).
- **hreflang:** ⚠️ runtime-only (SPA `useEffect`), no x-default, not in static HTML/sitemap.
- **Competitor SEO gap (Burnside + UAE firms):** ❌ not started.
- **Topical map:** ❌ not started.
- **KPI/reporting baseline:** ❌ not started (GA4 init present `Layout.tsx:16-20` / `lib/analytics.ts`, but no SEO KPI doc).

---

## 9. Severity summary

**CRITICAL (blocks topical authority / causes cannibalization):**
1. Zero JSON-LD schema on all 5 landings × 2 langs (PT-A item 4 entirely missing).
2. Zero canonical tags anywhere + same content on 3 URL forms per landing (subdomain / path / pages.dev) with no canonicalization → duplicate-content exposure.
3. No hub-and-spoke internal linking — main does not link to banking/realestate/partners/client and vice-versa; spokes are SEO islands.

**HIGH:**
4. Banking-First MUST violated on the money page (main.en + main.ru: title, meta, and keywords all lead with company formation).
5. 5 of 10 titles exceed 60 chars; 2 of 10 metas exceed 155 chars.
6. hreflang is runtime-injected only (SPA useEffect), no x-default, not crawler-safe; sitemap has no hreflang alternates.

**MEDIUM:**
7. Sitemap: no lastmod, missing client spoke money-pages (uk-non-dom, german-exit-tax, dutch-box3) + several real routes, no RU coverage.
8. robots.txt not served per-subdomain (sub-landings get SPA HTML, not a robots file).
9. No keyword clusters, heading outlines, FAQ blocks, entity coverage, competitor gap, topical map, or KPI baseline for any landing.

---

_Files inventoried: `vite.config.ts`, `index.html`, `public/sitemap.xml`, `public/robots.txt`, `src/components/{Layout,Footer,Navbar}.tsx`, `src/config/landing.ts`, `src/lib/LanguageContext.tsx`, `src/App.tsx`, `scripts/build-cloudflare.mjs`. Grep sweep of `src/` for canonical / ld+json / hreflang / og: confirmed findings above._
