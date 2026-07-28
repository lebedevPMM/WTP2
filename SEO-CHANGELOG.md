# SEO-CHANGELOG — WTP web estate

История SEO-правок по эстейту: что было, что стало, где копия, как откатить.
Формат: одна секция на заход. Новые заходы — сверху.

---

## 2026-07-28 (заход 2) · Причина писем Search Console: слэши в URL

Триггер — два письма GSC: «Page with redirect», «Alternate page with proper canonical tag», «Excluded by noindex», «Not found (404)».

### Что нашли (замер по всем 114 URL sitemap на боевом wtp.ae)

Cloudflare Pages отдаёт каждый пререндеренный роут из `<путь>/index.html`, то есть **`/services` → 308 на `/services/`**. А sitemap, canonical и hreflang были написаны **без** слэша.

| Симптом | Замер |
|---|---|
| **77 из 114 URL в sitemap отвечали 308-редиректом** | → GSC: «Page with redirect» |
| **37 из 114 отвечали 200, но контентом ГЛАВНОЙ страницы** (SPA-фолбэк `/* /index.html 200`; проверено: `/pricing`, `/legal/terms`, `/cases/*`, часть статей отдавали `<title>WTP — The back office…` и H1 главной) | → GSC: «Alternate page with proper canonical tag» — 37 URL заявляли каноникал главной |
| 404 в sitemap | **0** — ни одного |

То есть **проблемным для Google был весь sitemap целиком**: либо редирект, либо дубль главной.

### Что исправлено

| Файл | Правка |
|---|---|
| `bigsite/src/lib/schema.ts` | Новый `withSlash()`; `abs()` теперь всегда строит форму, отвечающую 200 |
| `bigsite/src/components/Seo.tsx` | canonical и все три hreflang — со слэшем |
| `bigsite/scripts/gen-sitemap.mjs` | `<loc>` и hreflang со слэшем. Парсит без слэша, пишет со слэшем → повторный запуск идемпотентен (проверено двойным прогоном) |
| `bigsite/scripts/prerender.mjs` | `isHome` учитывает `/ru/` — иначе RU-главная теряла preload LCP-картинки |

Свежий билд заодно закрывает и SPA-фолбэк: те 37 URL теперь пререндерены и отдают собственный контент (`/pricing` → «Service pricing — WTP», `/legal/terms` → «Terms of Service — WTP»).

### Замер после (на test.wtp.ae, весь sitemap)

| | Было (боевой) | Стало (test) |
|---|---|---|
| Отвечают 200 напрямую | 37 / 114 | **114 / 114** |
| canonical указывает ровно на себя | — | **114 / 114** |
| 404 | 0 | 0 |

> Первый прогон canonical дал 102/114 — 12 страниц ещё отдавались с края CF старой версией. Через 20 секунд 114/114. Локальные файлы всё это время были корректны.

### Про остальные два пункта письма

- **«Excluded by ‘noindex’ tag»** — намеренно и правильно: `test.wtp.ae` отдаёт `x-robots-tag: noindex`, `local.wtp.ae` — `<meta name="robots" content="noindex, nofollow">`. Если свойство в GSC заведено как **Domain property** (`wtp.ae`), оно покрывает все поддомены, и эти страницы попадают в отчёт. Трогать не нужно.
- **«Not found (404)»** — в sitemap ни одного 404. Источник вне sitemap (старые внешние ссылки, прошлые URL). **Точный список видно только в самом отчёте GSC** — нужен доступ к консоли, из письма он не выводится.

### Догнали пропущенное

- **`links.wtp.ae/ru/`** — я проверил только главную хаба. У страницы был canonical, но не было схемы. Добавлено `Organization` + `CollectionPage`. Все 27 исходящих ссылок хаба проверены — живые (LinkedIn отдаёт 999, это их антибот, не ошибка).
- **`io.wtp.ae`** — источник найден: `~/Desktop/WTP/wtp-io-landing` (отдельный git-репозиторий, CF-проект `wtp-io`, последний деплой 2 месяца назад). У него **не было canonical вообще**. Добавлены canonical + `Person(#ilya)` / `ProfilePage` / `Organization`. `@id` совпадает с узлом Ильи на `wtp.ae/about/team`.

---

## 2026-07-28 · Schema-паспорт эстейта + пререндер SPA-доменов

**Канал:** cc · **Ветка на момент старта:** `cloud-recovery-2026-07-20` · **HEAD до работ:** `cb707b0`
**Git-тег отката:** `seo-work-baseline-2026-07-28` → `cb707b0`
**Инструмент:** `claude-seo` (AgricIDaniel), выборочно 7 скиллов — см. `~/.claude/skills/seo/INSTALL-MANIFEST.md`

### Где лежат копии «до»

| Что | Путь |
|---|---|
| `~/.claude/{skills,agents,settings.json}` до установки скиллов | `~/Desktop/Antigravity Archive/claude-seo-install-20260728-041127/claude-skills-agents-BEFORE.tar.gz` |
| Live-HTML + HTTP-заголовки всех 19 доменов до правок | `~/Desktop/Antigravity Archive/wtp-seo-2026-07-28/live-html-BEFORE/` (38 файлов) |
| Машиночитаемые бейзлайны 25 URL (title/meta/canonical/H1–H3/schema/OG/SHA-хэши) | `~/.cache/claude-seo/drift/baselines.db` + копия в `…/wtp-seo-2026-07-28/drift-baselines-BEFORE/` |
| Исходники правленых статических сайтов до правок | `~/Desktop/Antigravity Archive/wtp-seo-2026-07-28/repo-files-BEFORE/` |
| Состояние git + diff незакоммиченного до работ | `…/wtp-seo-2026-07-28/git-state-BEFORE.txt`, `git-uncommitted-BEFORE.diff` |
| Полный список 114 URL главного сайта | `…/wtp-seo-2026-07-28/wtp-main-sitemap-114.txt` |

> В репозитории на момент старта уже были **чужие незакоммиченные правки** (`bigsite/public/_redirects`, `sitemap.xml`, `App.tsx`, `Footer.tsx`, `Legal.tsx`, сабмодули `links-*`). Они **не мои**, не тронуты и сохранены в `git-uncommitted-BEFORE.diff`.

### Что было (замер 2026-07-28, до правок)

- **0 JSON-LD на главной у всех 18 живых доменов.**
- `banking / setup / partners / client / realestate.wtp.ae` отдавали **10–12 слов** — целиком клиентский рендер, без пререндера. Не-JS краулеры и LLM видели пустой каркас.
- Ни одного `Person` — при позиционировании «named expert / signed by the expert».
- 5 лендингов SPA-проекта — **без canonical вообще**.
- `mirrors/trc`, `links-hub-ru` — без canonical.

### Что стало

#### 1. `bigsite` (wtp.ae, 114 роутов EN/RU)

**Новый файл:** `bigsite/src/lib/schema.ts` — единый источник JSON-LD. Все узлы ссылаются на одну сущность `https://wtp.ae/#organization`.

| Файл | Было → Стало |
|---|---|
| `src/components/Seo.tsx` | Отдавал `jsonLd` как есть → отдаёт **один `@graph` на страницу**, всегда с `ProfessionalService` + `WebSite`. Причина: `worksFor`/`publisher`/`provider` ссылались по `@id` на организацию, объявленную только на главной = висячая ссылка на 114 страницах |
| `src/components/Breadcrumb.tsx` | `item: https://wtp.ae${href}` (EN-путь всегда) → `localize(href, lang)`. **Баг:** на всех RU-страницах хлебные крошки указывали на EN-адреса |
| `src/pages/Home.tsx` | 0 схемы → `ProfessionalService` + `WebSite` |
| `src/pages/Team.tsx` | 0 схемы → `CollectionPage` + **6 `Person`** со стабильными `@id` и `sameAs` на личные домены |
| `src/pages/About.tsx` | → `AboutPage` |
| `src/pages/Contact.tsx` | → `ContactPage` |
| `src/pages/{ServicesOverview,InsightsHub,JurisdictionsHub,CasesHub}.tsx` | → `CollectionPage` |
| `src/templates/ServiceTemplate.tsx` | 0 схемы → `Service` (`provider` = [организация, ведущий эксперт]) + узел `Person` |
| `src/templates/ArticleTemplate.tsx` | Голый `Article` без publisher/mainEntityOfPage → полный `Article` + `Person`-автор по ссылке на канонический узел |
| `src/templates/ProductTemplate.tsx` | Инлайн-`Organization` внутри `Service` (плодил вторую сущность «WTP» на каждой продуктовой странице) → ссылка `@id` на единственный узел |

**Проверено:** `115/115` страниц несут схему, **0 висячих ссылок** (полный обход графа). Типы по сайту: 115× ProfessionalService, 115× WebSite, 112× BreadcrumbList, 28× Person, 24× Service, 20× Article, 16× FAQPage, 10× CollectionPage, 2× AboutPage, 2× ContactPage, 2× OfferCatalog.

**Осознанно НЕ делали:** новых `FAQPage` не добавляли. Google полностью отключил FAQ-rich-result **2026-05-07**; существующий на `last-will` оставлен (удаление тоже не рекомендуется).

#### 2. SPA-проект `wtp2` (banking / setup / partners / client / realestate.wtp.ae)

| Файл | Было → Стало |
|---|---|
| **`scripts/prerender-cf.mjs`** (новый) | — → пререндер 5 лендингов через headless Chrome. Есть предохранитель: если рендер дал <200 слов, файл **не перезаписывается** |
| `scripts/build-cloudflare.mjs` | Заканчивался на `_worker.js` → добавлен шаг 5 «Prerendering». Не фатальный: падение пререндера оставляет рабочий клиентский бандл |
| `vite.config.ts` | `htmlMetaPlugin` ставил только title/description/og → добавлены **`<link rel="canonical">` и JSON-LD `@graph`** на лендинг |

**Результат (замерено на `seo-preview.wtp2.pages.dev`):**

| Лендинг | Слов было | Слов стало | JSON-LD | Canonical |
|---|---|---|---|---|
| main | 10 | **660** | 1 | `https://wtp.ae/` |
| banking | 11 | **979** | 1 | `https://banking.wtp.ae/` |
| realestate | 12 | **727** | 1 | `https://realestate.wtp.ae/` |
| partners | 10 | **838** | 1 | `https://partners.wtp.ae/` |
| client | 11 | **1080** | 1 | `https://client.wtp.ae/` |

#### 3. Личные сайты экспертов

`links-ceo` · `links-sergey` · `links-horodko` · `links-oleg` · `links-olga` · `links-preethi`
0 JSON-LD → `ProfessionalService` + `Person` + `ProfilePage`.
`@id` персоны совпадает с узлом на `wtp.ae/about/team#<id>` — это **одна сущность на двух доменах**, а не однофамильцы. `sameAs` проставлен в обе стороны.

#### 4. Сателлиты

| Каталог | Домен | Что добавлено |
|---|---|---|
| `mirrors/corp` | corp.wtp.ae | Organization + WebPage + Service |
| `mirrors/re` | re.wtp.ae | Organization + WebPage + Service |
| `mirrors/trc` | trc.wtp.ae | Organization + WebPage + Service **+ canonical** (его не было) |
| `broker-9010` | broker.wtp.ae | Organization + WebPage + Service |
| `links-hub` | links.wtp.ae | Organization + CollectionPage |
| `links-hub-ru` | wtp-links-ru.pages.dev | Organization + CollectionPage **+ canonical** (его не было) |
| `mirrors/local` | local.wtp.ae | **Не трогали** — стоит `noindex, nofollow`, схема там смысла не имеет |

### Что было проверено и оказалось НЕ проблемой

- `test.wtp.ae` уже отдаёт `x-robots-tag: noindex` — корректно.
- `wtpref.com` — 301 на `wtp.ae` с правильным canonical, дублей нет.
- hreflang EN↔RU на главном сайте **реципрокен**. Первый замер дал ложный «нет» — `curl` без `-L` упёрся в 308 на `/ru/` и вернул пустое тело.
- `&amp;` в заголовках `kh.wtp.ae` / `ok.wtp.ae` / `oz.wtp.ae` — **корректная HTML-сущность**, а не двойное экранирование. Первая выборка просто не декодировала сущности. Не правилось.

### Задеплоено на этот момент

| Куда | Что | URL |
|---|---|---|
| `wtp-test` (Production env) | bigsite со схемой | https://test.wtp.ae — `noindex`, боевой `wtp.ae` **не тронут** |
| `wtp2` (**Preview** branch `seo-preview`) | SPA-бандл с пререндером | https://seo-preview.wtp2.pages.dev — боевые домены **не тронуты** |

**Прод (`wtp-main`, `wtp2` production, сателлиты) НЕ деплоился.**

### Как откатить

```bash
# 1. Код (репозиторий WTP2)
git checkout seo-work-baseline-2026-07-28 -- bigsite/src vite.config.ts scripts/build-cloudflare.mjs
rm -f scripts/prerender-cf.mjs bigsite/src/lib/schema.ts

# 2. Статические сайты — из архива
ARC=~/Desktop/Antigravity\ Archive/wtp-seo-2026-07-28/repo-files-BEFORE
cp "$ARC/links-ceo--index.html" links-ceo/index.html   # и так по каждому файлу

# 3. Скиллы claude-seo
rm -rf ~/.claude/skills/{seo,seo-schema,seo-geo,seo-google,seo-technical,seo-local,seo-drift}
rm -f  ~/.claude/agents/{seo-schema,seo-geo,seo-google,seo-technical,seo-local,seo-maps,seo-drift}.md

# 4. Если прод уже задеплоен — откат = пересобрать с откаченного кода и задеплоить снова
#    (CF Pages хранит прошлые деплои: можно откатить в дашборде через Rollback)
```

### Как это лежит в git

| Репозиторий | Коммит | Содержимое |
|---|---|---|
| WTP2 (родитель) | `a928051` | bigsite + vite.config + build-cloudflare + prerender-cf + сателлиты + CHANGELOG |
| WTP2 (родитель) | `cb4e6e4` | `links-oleg/index.html` — 1 строка |
| WTP2 (родитель) | `e76e4d3` | `links-preethi/index.html` — 1 строка |
| сабмодуль `links-ceo` | `ca60db4` | +1 строка |
| сабмодуль `links-sergey` | `e1dee94` | +1 строка |
| сабмодуль `links-horodko` | `5692399` | +1 строка |
| сабмодуль `links-olga` | `4c56139` | +1 строка |

> **Поправка по ходу работы.** Первая попытка закоммитить сабмодули `links-ceo/sergey/horodko/olga` затянула в мой коммит **чужие незакоммиченные правки** (canonical + hreflang, ~52 строки), которые лежали там до меня. Коммиты пересозданы: теперь в каждом ровно `+1/-0` — только блок JSON-LD. Чужая работа возвращена в рабочее дерево как незакоммиченная, в том же виде, в каком была. Диффы сохранены: `~/Desktop/Antigravity Archive/wtp-seo-2026-07-28/submodule-preexisting/`.
>
> `links-oleg` и `links-preethi` — не сабмодули, а обычные каталоги родительского репозитория; их правки ушли отдельными коммитами туда.

### Открытые вопросы

1. **`setup.wtp.ae` теперь канонизируется на `wtp.ae`.** Лендинг `main` SPA-проекта отдаётся на `setup.wtp.ae` и `wtp2.pages.dev`, а его canonical = `https://wtp.ae/` (флагманский bigsite). Это консолидирует вес на главный сайт, но означает, что `setup.wtp.ae` выпадет из индекса. Скорее всего это и нужно — но решение осознанное, нужен твой кивок.
2. **`io.wtp.ae` (Ilia Ostashov) — исходника нет в этом репозитории.** Живой сайт есть (1208 слов), но откуда деплоится — не найдено. Схему туда не добавили. `sameAs` со стороны `wtp.ae` на него проставлен (это корректно независимо).
3. **`banking.wtp.ae/robots.txt`** указывает `Sitemap: https://wtp.ae/sitemap.xml` — сайтмап чужого хоста, в нём нет URL этих лендингов. Не критично (Google игнорирует неподтверждённые кросс-доменные сайтмапы), но стоит завести свой.
4. **Search Console service account на зону wtp.ae** — без него скилл `seo-google` (реальные данные GSC/CrUX/индексации) не активируется. Это половина ценности установленного пакета.
