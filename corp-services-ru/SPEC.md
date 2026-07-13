# WTP Corp Services (RU) — Spec

> SDD Phase 2 — section-by-section structure for B2B catalog distributed by Sergey to professional network.
> Bound by `CONSTITUTION.md`. Two parallel writers (V1A compact / V1B authority) MUST hit this structure.
> Updated: 2026-05-13 (post Konstantin sign-off).

---

## Page Map

```
/                        Главная (catalog overview, описано ниже)
/cases                   Index кейсов (mini в v1: список 3-6 карточек + tags)
/cases/{slug}            Отдельная страница кейса (markdown → static HTML)
/contacts                Опционально — или встроено в footer
```

В v1: `/` + `/cases` (index) + `/cases/{slug}` × 3-6 кейсов.

Архитектура forward-compatible: Сергей дальше пишет MD-файл в `/cases/*.md`, commit, CF Pages auto-deploy. Без вмешательства разработки.

---

## Главная — Section-by-Section

### S0. NAV (header)

- Логотип WTP (тот же что wtp.ae — экосистема читается)
- Меню: Услуги · Кейсы · Метод · Команда · Контакты (anchor-links на soft-scroll)
- Справа: «Связаться» — ведёт в #contacts (мягкий, не «Записаться»)
- Язык-переключатель: пока нет (RU only). Placeholder в HTML под EN на будущее.

### S1. HERO

**Intent:** профессиональный читатель (юрист / фин. консультант / family office) за 10 секунд понимает: (а) кто мы, (б) что делаем, (в) для какой аудитории. Без обещаний, без pain, без urgent.

**Структура:**
- H1 (1 строка, ≤12 слов): что делаем + где + кому. Sergey-derived формулировка с WTP-обработкой.
- Sub (1 предложение, ≤30 слов): развитие H1 + конкретика (масштаб, юрисдикции, годы работы).
- 2 кнопки рядом:
  - Primary: «Связаться» (anchor → #contacts)
  - Secondary: «Посмотреть кейсы» → /cases
- Trust strip снизу: 5 юрисдикций (Mainland · IFZA · RAKEZ · DIFC · ADGM) — серая моно-плашка, не цветные логотипы.

**MUST**
- H1 содержит «ОАЭ» И один из вариантов: «бизнес» / «корпоративные услуги» / «инфраструктура» (Сергеев словарь)
- Sub содержит ОДНУ конкретику: срок («с 2019») ИЛИ юрисдикции (5+) ИЛИ количество (банков / завершённых кейсов)
- Никакого «премиум / надёжный / комплексный сервис» в hero
- Никакого «Pre-Screen» / «бесплатно» / «запишитесь» в hero

**V1A vs V1B (hero specifically):**
- V1A берёт Сергеев H1 «Работающая международная инфраструктура бизнеса в ОАЭ» (короче, прямее)
- V1B берёт его второй вариант с расширением «Регистрация компаний, оформление лицензий, банковское сопровождение, международные расчёты и комплексная поддержка бизнеса в ОАЭ» (длиннее, описательный)

---

### S2. ABOUT — кто мы (2-3 параграфа)

**Intent:** institutional context. Кто такой WTP, как давно на рынке, что отличает.

**Структура:**
- H2: «О WTP» / «Компания»
- 2 параграфа:
  - Параграф 1: WTP — operator-фирма, базируется в ОАЭ, работает с клиентами из СНГ. Какой год основания, сколько закрытых задач, как организованы (multidisciplinary team).
  - Параграф 2: что отличает — собственная экспертиза по всем 5 направлениям (не сабконтрактим), глубокие отношения с банками и юрисдикциями, операционная команда на земле в ОАЭ.

**MUST**
- Без «премиальный / эксклюзивный / надёжный»
- Конкретные цифры (если есть verified) — год основания, число закрытых дел, число юрисдикций
- Без overselling — institutional tone, не sales

**Длина:**
- V1A: 80-120 слов
- V1B: 150-220 слов

---

### S3. SERVICES — 5 направлений (Sergey's order, его словами)

**Intent:** capability scan — коллега за 1 минуту понимает, какой объём услуг мы покрываем.

**Структура:** 5 секций друг под другом (или 5 карточек в grid). Порядок Сергея, без перестановки. Каждая секция:
- Tag-нумерация: «01» / «02» / «03» / «04» / «05» (visual rhythm)
- H3: название направления (Сергеево)
- 1 предложение-summary (что делаем в этом направлении)
- 4-6 bullet-конкретики (sub-services)
- Outcome-line: 1 предложение, что коллега получит для своего клиента
- Опционально: автор-куратор направления (Иван / Оля / Олег / Илья / Костя)

#### S3.1 — Регистрация компании
- Tag: 01
- Summary: «Регистрация компаний во всех ключевых юрисдикциях ОАЭ — mainland, freezone, DIFC, ADGM.»
- Bullets:
  - Выбор юрисдикции под бизнес-модель и банковский профиль
  - Mainland Dubai / Abu Dhabi
  - Freezone (IFZA / RAKEZ / SHAMS / Meydan / DMCC)
  - DIFC и ADGM для финансовых и холдинговых структур
  - Лицензии: trading / services / consultancy / holding / SPV
  - Структура владения — UBO, директора, акционеры
- Outcome-line: «Компании оформляются под конкретного банка и операционную задачу — не вслепую.»
- Куратор: Оля
- **V1A длина:** 100-140 слов. **V1B длина:** 180-240 слов.

#### S3.2 — Банковская инфраструктура
- Tag: 02
- Summary: «Открытие счетов в локальных и международных банках ОАЭ с подготовленным KYC-pack.»
- Bullets:
  - Корпоративные счета в локальных банках (ENBD, Mashreq, FAB, ADCB, RAK Bank, Wio)
  - Международные банки в ОАЭ (HSBC, Standard Chartered)
  - KYC-pack — source of funds, business profile, supporting docs
  - Bankable structure — регистрация и юрисдикция, согласованные с банком до старта (см. §2.3.1)
  - Multi-bank стратегия — 2-3 счёта для устойчивости
  - Международные переводы, SWIFT, correspondent banking
- Outcome-line: «Счета открываются за 4-8 недель и работают без блокировок в долгую — потому что структура подбирается под банк изначально.»
- Куратор: Иван
- **V1A длина:** 110-150 слов. **V1B длина:** 200-260 слов.

#### S3.3 — Резидентство и документы
- Tag: 03
- Summary: «Резидентские визы и Emirates ID — для собственника, ключевых сотрудников и членов семьи.»
- Bullets:
  - Investor visa / partner visa / employment visa
  - Emirates ID
  - Golden Visa — инвестиционный track (от 2M AED недвижимость) / talent track
  - Family residency — супруги, дети, родители
  - Виды на жительство в смежных юрисдикциях (опц.)
- Outcome-line: «Резидентство, которое банк и налоговая признают как substance — не формальный штамп.»
- Куратор: Оля
- **V1A длина:** 80-110 слов. **V1B длина:** 140-190 слов.

#### S3.4 — Операционное сопровождение
- Tag: 04
- Summary: «Ongoing-сопровождение после регистрации: продления, бухгалтерия, compliance.»
- Bullets:
  - Продления — компания, лицензия, визы (proactive reminders + execution)
  - Бухгалтерия — corporate tax 9%, VAT, FTA filings
  - Compliance — ESR (Economic Substance), UBO declarations, AML
  - Sanctions screenings, ongoing KYC reviews
  - Operational support — Telegram/WhatsApp priority response
- Outcome-line: «Лицензия не истекает молча, отчётность сдаётся в срок, compliance не дёргает клиента раз в неделю.»
- Куратор: Оля + Илья (compliance / VARA)
- **V1A длина:** 90-120 слов. **V1B длина:** 160-220 слов.

#### S3.5 — Частные вопросы клиентов
- Tag: 05
- Summary: «Сопутствующие сервисы для собственника и семьи — недвижимость, документы, наследование.»
- Bullets:
  - Недвижимость — Dubai / Abu Dhabi / RAK (покупка, аренда, Golden Visa triggered)
  - Доверенности и легализация — apostille, MoFA, нотариат
  - DIFC / ADGM Wills — наследственное планирование
  - Семейные структуры — foundations, trusts (DIFC / ADGM)
  - Off-plan inheritance вопросы
- Outcome-line: «Активы и семья защищены параллельно с операционной структурой — не отдельным проектом полгода спустя.»
- Куратор: Костя (недвижимость), Оля (Wills, доверенности), Олег (wealth management)
- **V1A длина:** 90-120 слов. **V1B длина:** 160-220 слов.

**MUST (для всех 5 направлений):**
- Outcome-line присутствует и говорит на capability-языке (см. CONSTITUTION §3.X таблица)
- Banking-related bullets спокойно упомянуты в #2 и #1, как факт
- Никаких «комплексное решение» / «премиум-уровень» в bullets
- Конкретные названия банков / юрисдикций / категорий лицензий (не размытое «работаем с банками»)

---

### S4. METHOD — Как мы работаем (1-2 параграфа)

**Intent:** объяснить логику последовательности шагов — без агрессивного 4-step-infographic. Это секция о методе, не о позиционке.

**Структура:**
- H2: «Как мы работаем» / «Методика»
- 1-2 параграфа текста:
  - Параграф 1: с чего начинаем (диагностика — клиент-профиль, юрисдикция, банк), какой главный принцип (структура подбирается под банк, не наоборот). Здесь можно явно сказать «мы называем это bankable structure» (см. CONSTITUTION §2.3.1) — один раз, в скобках, как термин.
  - Параграф 2 (опционально для V1B): timeline — что в первые 5 дней, что в первые 2 недели, что в первые 2 месяца. Без infographic — текстом.

**MUST**
- Слово «Banking-First» НЕ использовать буквально (это позиционка wtp.ae). Можно описать концептуально («начинаем с банковской диагностики», «структура согласуется с банком до старта»).
- Без 4-шагового подсчёта step1/step2/step3/step4
- Один абзац для V1A, два для V1B

**Длина:**
- V1A: 80-130 слов
- V1B: 200-300 слов

---

### S5. CASES — кейсы (3-6 карточек)

**Intent:** proof of capability. Коллега видит реальные задачи, понимает применимость для своих клиентов.

**Структура секции:**
- H2: «Кейсы» или «Примеры из практики»
- Под H2 (1 строка): «Анонимизированные кейсы из практики WTP. Свяжитесь, если у вас задача похожего профиля.»
- 3-6 карточек в grid (V1A: 3, V1B: 5-6)
- Карточка:
  - Tag: 1-3 задействованных направления
  - Headline (≤10 слов): что было сделано
  - 2-3 предложения контекста и outcome
  - Срок (опционально)
  - Автор (Иван / Оля / Олег / Илья / Костя)
- CTA снизу: «Все кейсы →» → `/cases`

**Источник:** `sync/projects/WTP2-cases-deck-RU-edited-v2-2026-04-22.md` — 7 кейсов, выбираем 3-6 representative.

**MUST**
- Featured 3 (для V1A) или 5-6 (для V1B) должны покрывать минимум 3 разных направления (proof breadth)
- Анонимизация: «Предприниматель из РФ, IT-сектор, $X-Y млн оборота» — без имён
- Конкретные сроки и числа

---

### S6. TEAM — команда (именные эксперты)

**Intent:** authority signal через именных экспертов. Burnside-паттерн.

**Структура:**
- H2: «Команда»
- 5-6 карточек:
  - **Иван Оленичев** — CEO. Сложные кейсы, multi-jurisdictional setups, прямые отношения с банками и регуляторами ОАЭ.
  - **Сергей** — старший консультант (титул финализировать с Сергеем). Корпоративные клиенты, СНГ.
  - **Оля** — Client Success Manager / документы, визы, регистрация компаний, банковские счета.
  - **Олег** — инвестиции, wealth management.
  - **Илья С.** — финансы, крипта, VARA, compliance.
  - **Костя** — недвижимость.
- Каждая карточка: фото (placeholder в v1, реальные после photo session) + ФИО + титул + 1 строка зоны ответственности.
- LinkedIn / email опционально.

**MUST**
- Все 6 присутствуют (Sergey explicit included)
- Никаких «гуру» / «топ-эксперт»
- Photo placeholders OK для v1, но в HTML должны быть `<img>` теги готовые к замене

**Длина:** карточки фиксированной длины, total ≈ 200 слов.

---

### S7. CONTACTS — soft contact block

**Intent:** primary mechanic. Коллега, заинтересовавшийся, видит как связаться.

**Структура:**
- H2: «Связаться»
- 1 строка subtext: «Если есть клиент или задача, для которой WTP может быть полезен — напишите Сергею напрямую или заполните форму ниже.»
- 2 блока side-by-side:
  - **Block A — прямые контакты Сергея:**
    - Фото Сергея (placeholder)
    - ФИО + титул
    - Telegram (прямая ссылка)
    - WhatsApp (прямая ссылка)
    - Email
  - **Block B — форма (3 поля):**
    - Имя (text, required)
    - Контакт (text, required, hint: email / phone / Telegram)
    - Коротко о задаче (textarea, optional, placeholder: «Клиент / задача / страна»)
    - Кнопка: «Отправить запрос»
    - Subtext: «Ответим в течение рабочего дня.»

**MUST**
- Без «бесплатной консультации», «Pre-Screen», «срочно»
- Telegram/WhatsApp ссылки рабочие, реальные
- Форма ведёт через CF Function в Bitrix24 с UTM-capture + responsible-user = Сергей

---

### S8. FOOTER

- Логотип WTP + 1 строка «Wealth Transfer Platform — операционный партнёр для бизнеса в ОАЭ»
- 4 columns:
  - **Услуги:** 5 anchor-ссылок на S3 направления
  - **Кейсы:** 3-5 ссылок на last cases
  - **Команда:** anchor на S6
  - **Контакты:** Telegram / WhatsApp / Email (Сергей + Иван опц.)
- Юридический блок: privacy policy + cookies (минимум для GDPR-conscious клиентов из ЕС)
- Copyright + год

---

## /cases — Index страница

**Минимальная версия для v1:**
- H1: «Кейсы WTP»
- 1 параграф intro: «Анонимизированные кейсы из практики WTP по 5 направлениям корпоративных услуг.»
- Опционально: фильтр по направлению (5 тегов клик — фильтр через JS)
- Grid: все 3-6 кейсов в виде карточек (как в S5, но полнее)
- Sticky CTA внизу: «Похожая задача? Свяжитесь.» → anchor на /#contacts

**Архитектура forward:** добавление нового кейса в `/cases/new-case.md` + commit → автоматическое появление в этом index при следующем build.

---

## /cases/{slug} — Отдельная страница кейса

**Структура (от Sergey's case template):**
- H1: outcome-headline кейса
- Frontmatter: jurisdiction / sector / direction tags / duration / author
- 5 секций body:
  1. Контекст клиента (≤80 слов, анонимизированный)
  2. Что было сложно (3-4 bullets)
  3. Что мы сделали (≤200 слов, метод в действии)
  4. Результат (4 bullets с конкретикой)
  5. Что бы сделали по-другому (опционально, 2-3 строки)
- CTA внизу: «Похожая ситуация? Напишите Сергею» → anchor на /#contacts с UTM `utm_content={slug}`

**Build:** `node scripts/build-cases.mjs` читает все `/cases/*.md` → генерит `/cases/{slug}/index.html` + автогенерит OG-картинку (Puppeteer pattern из MT35).

---

## Form Spec

### Fields
1. Имя — text, required, maxlength 80
2. Контакт — text, required, maxlength 120, hint: «email / phone / Telegram»
3. Коротко о задаче — textarea, optional, maxlength 500

### Hidden
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `page_source`: `home` / `cases` / `case-{slug}`
- `submitted_at` (ISO timestamp)

### Endpoint
- POST `/api/lead` → CF Function → Bitrix24 webhook
- Responsible user в Bitrix: Сергей (NOT Константин)
- Bitrix Webhook URL: env variable `BITRIX_WEBHOOK_URL` (set in CF Pages env)

### Success / Error
- Success: inline message «Спасибо. Ответим в течение рабочего дня.»
- Error: «Не получилось отправить. Напишите Сергею в Telegram → [link]» (fallback)

---

## Visual / Brand Spec

Полностью переиспользуем wtp.ae brand system. Locked tokens:

### Colors
- BG primary: `#F5F3EE` (cream)
- BG accent: `#FFFFFF` (white sections)
- Text primary: `#1A1A1A`
- Text secondary: `#5C5C5C`
- Accent: gold `#B8956A` (использовать sparingly — только в hover, links, italic accents)
- Border subtle: `#E5E1D8`

### Typography
- Headings (H1, H2): Playfair Display (italic для H1)
- Body: Inter
- Mono (для tag-нумерации, юрисдикции в trust strip): JetBrains Mono или ui-monospace

### Spacing
- Section padding: 80px vertical (desktop), 48px (mobile)
- Container max-width: 1100px
- Generous whitespace — institutional tone

### Components
- Cards: subtle border (1px `#E5E1D8`) + background `#FFFFFF` + 24px padding + small border-radius (4px)
- Buttons:
  - Primary: dark BG + cream text + 4px radius + 12px×24px padding
  - Secondary: text-link with underline on hover, gold color
- Forms: same border + radius + focus state с gold

### Visual references
- ceo.wtp.ae — основной brand reference
- local.wtp.ae — RU content typography
- wtp.ae — section structure / spacing

---

## v1 Writers — что вы делаете

Два subagent'а пишут **независимо** полный текст всех секций S1-S8 + 1 example case page по `/cases/{slug}` шаблону.

### V1A — «Compact catalog»
- Total length: 1100-1500 слов
- Tone: sharp, ясный, без флориды
- Hero: Sergey's first H1 variant ("Работающая международная инфраструктура...")
- Кейсы: 3 карточки
- Метод: 1 параграф
- Каждое направление: bullet-heavy, минимум прозы
- Reference: AmCham brochure / professional services capability statement

### V1B — «Authority brief»
- Total length: 2200-2800 слов
- Tone: измеренный, Burnside-style, с глубиной
- Hero: Sergey's second H2 variant с обработкой ("Регистрация компаний, оформление лицензий...")
- Кейсы: 5-6 карточек
- Метод: 2 параграфа + timeline текстом
- Каждое направление: prose-rich с типичными сценариями
- Reference: Burnside Partnership, Withers, Henley & Partners services pages

### Common (оба MUST)
- CONSTITUTION §3 voice rules
- 5 направлений в порядке §4
- Banking без страха (упоминается в #2 + где уместно)
- «Bankable structure» — максимум 2-3 раза, осторожно (см. CONSTITUTION §2.3.1)
- Soft CTA §S7
- WTP brand visual tokens (см. Visual / Brand Spec)
- 1 example case page по template `/cases/{slug}`

### Subagent input
Каждый subagent получает:
- `CONSTITUTION.md` (Read at start)
- Этот `SPEC.md` (Read at start)
- `sync/projects/WTP2-cases-deck-RU-edited-v2-2026-04-22.md` (источник кейсов)
- Skill: `copywriting` SKILL.md (для tone + anti-patterns)
- Skill: `wtp2-context` SKILL.md (для product/team/brand)
- Output target: `V1A-compact.md` (для V1A) / `V1B-authority.md` (для V1B)

---

## Synthesizer (Phase 3)

После V1A + V1B готовы:
- 4 голоса audit-debate (CONSTITUTION §10) разбирают обе версии
- Output: `AUDIT-DEBATE.md` — построчные notes
- Синтезатор пишет `FINAL-v1.md` — комбинирует или переписывает блоки из V1A/V1B
- FINAL проходит 5 gates (CONSTITUTION §8)

---

## Done Definition v1

- [x] `CONSTITUTION.md` — sign-off Konstantin
- [x] `SPEC.md` (этот файл)
- [ ] `V1A-compact.md` — full copy compact angle (Phase 2)
- [ ] `V1B-authority.md` — full copy authority angle (Phase 2)
- [ ] 1 example case page в `/cases/{slug-v1a}.md` и `/cases/{slug-v1b}.md` (Phase 2)
- [ ] `AUDIT-DEBATE.md` — 4 voices' notes (Phase 3)
- [ ] `FINAL-v1.md` — синтез, проходит 5 gates (Phase 3)
- [ ] `lebedevPMM/wtp-corp` repo + GitHub Pages preview (Phase 4)
- [ ] Sergey review preview → правки → final draft
- [ ] CF Pages production deploy на `corp.wtp.ae` (after Konstantin OK)
