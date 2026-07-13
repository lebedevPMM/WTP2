# Google Ads Campaign Setup — WTP Boutique Real Estate

> **Версия:** 1.0
> **Дата:** 2026-03-15
> **Бюджет:** $1,600-2,500/мес (months 3-6)
> **Цель:** High-intent leads для Golden Visa, investment property, integrated advisory

---

## Общая стратегия

WTP не конкурирует с 8,000 агентствами по цене квадратного метра. WTP продаёт **интегрированную инвестиционную инфраструктуру**: banking-first подход + ownership structure + visa + property. Google Ads таргетирует только тех, кто уже понимает или ищет этот уровень решения.

### Принципы кампаний

1. **Banking-first differentiation** — в каждом объявлении упоминаем pre-screen
2. **Integrated messaging** — не "купи квартиру", а "структурируй вход на рынок ОАЭ"
3. **Specific, not generic** — "48h pre-screen", "$2M Golden Visa property", "RAK +47% YoY" вместо "лучшие цены"
4. **Trust, not hype** — избегаем "guaranteed", "cheapest", "#1", "best deals"

---

## Campaign 1: Golden Visa / Investment Intent (Search)

**Цель:** Захватить высоко-интентных инвесторов, ищущих Golden Visa через недвижимость

**Бюджет:** $600-1,000/мес
**Bidding Strategy:** Manual CPC (первые 4 недели) → Target CPA после 30+ конверсий
**Target CPA:** $200-400 (HNWI real estate leads; adjust после сбора данных — $100-150 нереалистично для этого сегмента)

**Audience Overlays (дополнительно к ключевым словам):**
- In-Market: Real Estate → Residential Properties (Investment)
- In-Market: Business Services → Business Formation Services
- Custom Intent: создать на основе URL конкурентов (Luxhabitat, Betterhomes, Haus & Haus)
- Remarketing: посетители realestate.wtpref.com + wtpref.com (bid +30%)

**Conversion Tracking (обязательно до запуска):**
- GA4 event: `form_submit` на pre-screen форме
- GA4 event: `whatsapp_click` на WhatsApp кнопке
- Google Ads conversion: lead (primary), qualified_lead (secondary — помечается вручную в CRM)
- Offline conversion import: CRM → Google Ads через API (после 30 дней)
- Test: отправить тестовую конверсию и убедиться что она отражается в Google Ads
**Geographic Targeting:** United Arab Emirates, United Kingdom, Germany, Netherlands, Switzerland, Scandinavia (Sweden, Norway, Denmark)
**Language Targeting:** English
**Device Bid Adjustments:** Mobile -10% (форма сложная), Desktop +10%
**Ad Schedule:** 24/7 с повышением на weekdays 9:00-18:00 GMT+4 (+15%)

### Ad Group 1.1: Golden Visa Property

**Keywords:**

| Keyword | Match Type | Initial Bid |
|---------|-----------|-------------|
| golden visa dubai property | Exact | $1.50 |
| [golden visa dubai property] | Exact (bracket) | $1.80 |
| golden visa real estate dubai | Phrase | $1.20 |
| "2M AED property visa UAE" | Phrase | $1.00 |
| buy property golden visa dubai | Broad Match | $0.80 |
| uae golden visa through property | Phrase | $1.30 |
| dubai property investment visa | Phrase | $1.10 |
| golden visa eligibility property | Broad Match | $0.90 |
| property for golden visa 2026 | Phrase | $1.00 |
| how to get golden visa dubai property | Broad Match | $0.70 |
| golden visa property requirements | Phrase | $1.20 |
| 10 year visa dubai property | Phrase | $1.40 |

**Negative Keywords (уровень Ad Group):**
```
-free
-cheap
-rent
-rental
-jobs
-salary
-employment
-visa application form
-visa status
-tourist visa
-visit visa
-jobs in dubai
-rooms for rent
-cheap apartments
-1 bedroom rent
-studio rent
-vacation rental
-short term
-under 500k
-under 1m
-payment plan 10 years
-secondary market
```

**Landing Page:** `https://realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=golden_visa&utm_term={keyword}`

**Responsive Search Ads (3 варианта):**

RSA 1.1A — см. ad-copy-library.md
RSA 1.1B — см. ad-copy-library.md
RSA 1.1C — см. ad-copy-library.md

**Ad Extensions:**

**Sitelinks:**
- Free Banking Pre-Screen → realestate.wtpref.com/pre-screen
- Golden Visa Guide → realestate.wtpref.com/golden-visa
- Submit Your Case → realestate.wtpref.com/submit-case
- WhatsApp Consultation → [WhatsApp link]

**Callouts:**
- Banking-First Approach
- 48h Eligibility Check
- Integrated: Company + Bank + Visa + Property
- Part of WTP Advisory Group

**Structured Snippets:**
- Services: Banking Setup, Visa Processing, Company Formation, Property Selection, Tax Advisory, Ongoing Compliance
- Areas: Downtown Dubai, Dubai Marina, Palm Jumeirah, RAK Al Marjan, Expo City Dubai

**Call Extension:**
+971 600 575 294

---

### Ad Group 1.2: Dubai Investment Property

**Keywords:**

| Keyword | Match Type | Initial Bid |
|---------|-----------|-------------|
| dubai property investment | Phrase | $1.20 |
| [dubai property investment] | Exact | $1.50 |
| invest in dubai real estate | Phrase | $1.10 |
| dubai real estate roi | Phrase | $1.30 |
| best property investment dubai | Broad Match | $0.90 |
| buy investment property dubai | Phrase | $1.00 |
| dubai property for investors | Phrase | $0.95 |
| high roi dubai property | Broad Match | $1.00 |
| dubai property capital appreciation | Broad Match | $0.80 |
| uae real estate investment opportunity | Phrase | $0.85 |
| foreign property investment dubai | Phrase | $1.20 |
| expat property investment dubai | Phrase | $1.10 |

**Negative Keywords:**
```
-cheap
-budget
-affordable
-under 500k
-studio
-1 bedroom
-shared
-room
-rent
-rental
-lease
-tenant
-property management software
-property manager job
-real estate agent job
-courses
-training
```

**Landing Page:** `https://realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=investment&utm_term={keyword}`

**RSAs:** 3 варианта (см. ad-copy-library.md)

**Ad Extensions:** Same as AG 1.1 + structured snippet Types: Off-Plan, Ready Properties, Luxury Villas, Premium Apartments, Commercial Units

---

### Ad Group 1.3: Relocation + Property

**Keywords:**

| Keyword | Match Type | Initial Bid |
|---------|-----------|-------------|
| buy property dubai relocate | Phrase | $1.00 |
| property for residence visa uae | Phrase | $1.20 |
| move to dubai buy apartment | Broad Match | $0.80 |
| relocation dubai real estate | Phrase | $0.90 |
| uk to dubai property investment | Phrase | $1.30 |
| germany to dubai property | Phrase | $1.20 |
| netherlands dubai property | Phrase | $1.00 |
| exit tax dubai property | Phrase | $1.40 |
| non dom dubai property | Phrase | $1.30 |
| property residence visa dubai | Phrase | $1.10 |
| family relocation dubai property | Broad Match | $0.85 |
| buy house dubai move from uk | Broad Match | $0.90 |

**Negative Keywords:**
```
-tourist
-visit
-holiday
-vacation
-hotel
-airbnb
-short term
-temporary
-business visa
-work permit
-employment visa
```

**Landing Page:** `https://realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=relocation&utm_term={keyword}`

**RSAs:** 3 варианта (см. ad-copy-library.md)

**Ad Extensions:** Same as AG 1.1 + callout "Exit Tax Structuring"

---

## Campaign 2: Structure / Banking Intent (Search)

**Цель:** Захватить уникальную нишу — тех, кто понимает что banking и structure важнее объекта

**Бюджет:** $300-500/мес
**Bidding Strategy:** Manual CPC
**Geographic Targeting:** Same as Campaign 1
**Language:** English

### Ad Group 2.1: Ownership Structure

**Keywords:**

| Keyword | Match Type | Initial Bid |
|---------|-----------|-------------|
| company structure property dubai | Phrase | $0.90 |
| buy dubai property through llc | Phrase | $1.00 |
| personal vs company ownership dubai | Phrase | $1.10 |
| holding company dubai property | Phrase | $0.95 |
| offshore company buy dubai property | Phrase | $1.20 |
| property ownership structure uae | Phrase | $0.85 |
| tax efficient property ownership dubai | Phrase | $1.30 |
| freezone company property dubai | Phrase | $0.80 |
| property in personal name or company dubai | Broad Match | $0.70 |
| uae property holding structure | Phrase | $0.90 |

**Negative Keywords:**
```
-free advice
-forum
-reddit
-blog
-template
-DIY
-setup yourself
-cheap
```

**Landing Page:** `https://realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=structure&utm_term={keyword}`

*⚠️ LAUNCH: Use main LP (dynamic headline by utm_campaign). Blog article `/blog/property-ownership-structure` — create in Month 2, then switch URL.*

**RSAs:** 3 варианта (см. ad-copy-library.md)

---

### Ad Group 2.2: Banking for Property Buyers

**Keywords:**

| Keyword | Match Type | Initial Bid |
|---------|-----------|-------------|
| bank account dubai property buyer | Phrase | $1.00 |
| open bank account dubai real estate | Phrase | $1.10 |
| dubai mortgage foreigner | Phrase | $1.20 |
| bank account uae property investment | Phrase | $0.95 |
| source of funds dubai property | Phrase | $1.30 |
| banking requirements dubai property | Phrase | $0.90 |
| can i buy dubai property without residence | Phrase | $0.80 |
| uae bank account property purchase | Phrase | $1.00 |
| offshore account dubai property | Phrase | $1.10 |

**Negative Keywords:**
```
-mortgage calculator
-mortgage rates
-compare banks
-best mortgage
-lowest rate
-free consultation
```

**Landing Page:** `https://realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=banking&utm_term={keyword}` (with anchor #banking-first or dedicated section)

**RSAs:** 3 варианта (см. ad-copy-library.md)

---

### Ad Group 2.3: Tax Implications

**Keywords:**

| Keyword | Match Type | Initial Bid |
|---------|-----------|-------------|
| tax implications dubai property uk | Phrase | $1.40 |
| exit tax germany dubai property | Phrase | $1.50 |
| capital gains tax uae property | Phrase | $1.20 |
| uk tax dubai property investment | Phrase | $1.30 |
| netherlands box 3 dubai property | Phrase | $1.40 |
| german wegzugsteuer dubai property | Phrase | $1.50 |
| double taxation dubai property | Phrase | $1.10 |
| uk non dom dubai real estate | Phrase | $1.30 |
| property tax uae foreign investor | Phrase | $1.00 |

**Negative Keywords:**
```
-accountant
-lawyer
-tax advisor near me
-file taxes
-tax return
```

**Landing Page:** `https://realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=tax&utm_term={keyword}`

*⚠️ LAUNCH: Use main LP (dynamic headline by utm_campaign). Blog article `/blog/tax-guide-property-buyers` — create in Month 2, then switch URL.*

**RSAs:** 3 варианта (см. ad-copy-library.md)

---

## Campaign 3: Location Niche (Search)

**Цель:** Захватить менее конкурентные geo-niches с высоким потенциалом

**Бюджет:** $200-500/мес
**Bidding Strategy:** Manual CPC
**Geographic Targeting:** Same as Campaign 1

### Ad Group 3.1: RAK (Ras Al Khaimah)

**Keywords:**

| Keyword | Match Type | Initial Bid |
|---------|-----------|-------------|
| rak property investment | Phrase | $0.70 |
| [ras al khaimah real estate] | Exact | $0.90 |
| al marjan island apartments | Phrase | $0.80 |
| wynn rak property | Phrase | $1.00 |
| ras al khaimah investment property | Phrase | $0.75 |
| al marjan island investment | Phrase | $0.85 |
| rak property prices | Phrase | $0.60 |
| buy property ras al khaimah | Phrase | $0.70 |
| rak vs dubai property | Phrase | $0.80 |
| ras al khaimah golden visa property | Phrase | $1.10 |

**Negative Keywords:**
```
-cheap
-budget
-under 300k
-studio
-jobs
-rental
```

**Landing Page:** `https://realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=rak&utm_term={keyword}`

*⚠️ LAUNCH: Use main LP (dynamic headline by utm_campaign). Blog article `/blog/rak-investment-guide` or dedicated RAK section — create in Month 2, then switch URL.*

**RSAs:** 3 варианта (см. ad-copy-library.md)

**Ad Extensions:** Structured snippet Highlights: Wynn Casino 2027, Al Marjan Island, Hampton by Hilton, Price Growth +47% YoY

---

### Ad Group 3.2: Expo City Dubai

**Keywords:**

| Keyword | Match Type | Initial Bid |
|---------|-----------|-------------|
| expo city dubai property | Phrase | $0.80 |
| district 2020 apartments | Phrase | $0.70 |
| expo city investment | Phrase | $0.75 |
| expo 2020 site property | Phrase | $0.65 |
| buy property expo city | Phrase | $0.80 |
| expo city dubai real estate | Phrase | $0.75 |

**Negative Keywords:** Same as RAK

**Landing Page:** `https://realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=expo&utm_term={keyword}`

*⚠️ LAUNCH: Use main LP (dynamic headline by utm_campaign). Blog article `/blog/expo-city-guide` — create in Month 2, then switch URL.*

**RSAs:** 3 варианта (см. ad-copy-library.md)

---

### Ad Group 3.3: Commercial Property

**Keywords:**

| Keyword | Match Type | Initial Bid |
|---------|-----------|-------------|
| office space dubai buy | Phrase | $1.00 |
| commercial property dubai investment | Phrase | $1.10 |
| warehouse dubai purchase | Phrase | $0.90 |
| retail space dubai buy | Phrase | $0.95 |
| buy office dubai freezone | Phrase | $1.05 |
| commercial real estate dubai investment | Phrase | $1.00 |
| clinic space dubai buy | Phrase | $0.85 |
| showroom dubai purchase | Phrase | $0.80 |

**Negative Keywords:**
```
-rent
-lease
-for rent
-available
-monthly
```

**Landing Page:** `https://realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=commercial&utm_term={keyword}#commercial` (или отдельная страница commercial)

**RSAs:** 3 варианта (см. ad-copy-library.md)

---

## Campaign 4: Retargeting (Display + YouTube)

**Цель:** Вернуть посетителей сайта, которые не конвертировались

**Бюджет:** $200-500/мес
**Bidding Strategy:** Target CPA $80-120
**Frequency Cap:** Max 5 impressions/день/user
**Attribution:** Last-click (retargeting)

### Audience Definitions

**Audience 1: Recent Visitors (30 days)**
- Все посетители realestate.wtpref.com за последние 30 дней
- Исключение: те, кто заполнил форму или кликнул WhatsApp
- Размер: 200-500 users/месяц (после 2-3 месяцев трафика)

**Audience 2: Engaged Visitors (60 days)**
- Посетители, которые:
  - Провели на сайте > 2 минут
  - Посетили > 2 страниц
  - Прокрутили > 50% страницы
- Исключение: конвертировавшиеся
- Размер: 100-300 users

**Audience 3: High-Intent (90 days)**
- Посетители, которые:
  - Открыли страницу /golden-visa
  - Кликнули на форму (но не отправили)
  - Посетили /submit-case
- Исключение: конвертировавшиеся
- Размер: 50-150 users

### Display Banner Concepts (5 designs)

**Banner 1: Banking-First Reminder**
**Sizes:** 300x250, 728x90, 160x600, 320x50, 300x600
**Headline:** "Bought property in Dubai — but can't open a bank account?"
**Body:** "40% of buyers face this. We check banking FIRST. Free pre-screen in 48h."
**CTA:** "Check Eligibility"
**Visual:** Split-screen: документы property vs банковская карточка с красным X
**Color scheme:** Dark navy + WTP gold accent (#C5A572)

**Banner 2: Golden Visa Direct**
**Headline:** "Golden Visa Through Property — Done Right"
**Body:** "2M AED property + banking structure + visa processing. One partner, zero surprises."
**CTA:** "Start Pre-Screen"
**Visual:** UAE skyline + Golden Visa icon
**Color scheme:** Warm gradient (dark to gold)

**Banner 3: Social Proof**
**Headline:** "300+ Investors Trusted WTP in 2025"
**Body:** "Banking-first approach. Average approval: 94%. Free consultation."
**CTA:** "Book a Call"
**Visual:** Abstract pattern of checkmarks + "94%" large number
**Color scheme:** Clean white + dark text + gold accent

**Banner 4: Objection Handler**
**Headline:** "8,000 Agents in Dubai. What Makes WTP Different?"
**Body:** "We're not agents. We're investment advisors. Company + Bank + Visa + Property."
**CTA:** "See How We Work"
**Visual:** Simple text-heavy design, institutional feel
**Color scheme:** White background + dark text

**Banner 5: Urgency (for high-intent audience only)**
**Headline:** "Still Deciding? Let's Talk."
**Body:** "Free 15-min consultation. No pitch, just answers."
**CTA:** "WhatsApp Us Now"
**Visual:** Clean, minimalist
**Color scheme:** WTP brand colors

### YouTube Pre-Roll Concepts (2 scripts)

**Video 1: Problem-Solution (15 sec)**

```
[0-3s] Text on screen: "You bought property in Dubai."
       Voiceover: "You bought property in Dubai."

[3-7s] Text: "Then the bank said no."
       Voiceover: "Then the bank rejected your account application."

[7-12s] Text: "WTP checks banking FIRST — before you buy."
        Voiceover: "WTP checks your banking eligibility before you sign anything."

[12-15s] Logo + CTA: "Free Pre-Screen — realestate.wtpref.com"
         Voiceover: "Free pre-screen. Visit WTP dot com."
```

**Visual:** Simple kinetic typography + minimal iconography (document → bank card → checkmark)

**Video 2: Differentiation (15 sec)**

```
[0-4s] Text: "8,000 real estate agents in Dubai."
       Voiceover: "Eight thousand real estate agents in Dubai."

[4-9s] Text: "They sell square meters."
       Voiceover: "They sell square meters."

[9-13s] Text: "WTP sells investor infrastructure: Company. Bank. Visa. Property."
        Voiceover: "WTP sells investor infrastructure. Company, bank, visa, and property."

[13-15s] Logo + "realestate.wtpref.com"
         Voiceover: "W-T-P Real Estate."
```

**Visual:** Split-screen comparison (generic agent sales pitch vs WTP structured approach)

### Targeting Settings

- **Placement:** Automatic + manual exclusions (exclude: games, parked domains, low-quality sites)
- **Topics:** Real Estate, Financial Planning, Business Services, Relocation Services
- **Interests:** Luxury Travelers, High Net Worth Individuals, Investors
- **Demographics:** Age 35-65+, HHI top 10-30%
- **Device:** All devices (no bid adjustment initially)

### Conversion Tracking Setup

**Primary Conversion:** Form Submission
- Event: `submit_case_form`
- Value: $150 (average CPL target)

**Secondary Conversion:** WhatsApp Click
- Event: `whatsapp_click`
- Value: $100

**Micro-Conversion:** Phone Call (>30 sec)
- Event: `phone_call`
- Value: $80

**Engagement:** Video View 50%+
- Event: `video_50_percent`
- Value: $0 (観察 only)

### Exclusions

- Конвертировавшиеся пользователи (form submit OR WhatsApp click) исключаются из всех retargeting audiences через 7 дней
- Пользователи, посетившие /thank-you — исключить навсегда

---

## Conversion Tracking Setup (инструкция для WTP)

### Google Tag Manager Setup

1. **Создать GTM Container** (если ещё нет)
   - Зайти на tagmanager.google.com
   - Создать новый контейнер для realestate.wtpref.com
   - Установить GTM code в `<head>` лендинга

2. **Google Ads Conversion Tag**
   - В Google Ads: Tools → Conversions → New Conversion Action
   - Тип: Website
   - Категория: Submit lead form
   - Value: Use different values → variable
   - Count: One (не Every — один лид один раз)
   - Conversion window: 30 days
   - Скопировать Conversion ID и Conversion Label

3. **GTM Triggers**

**Trigger 1: Form Submission**
```
Trigger Type: Form Submission
Wait for Tags: 2000ms
Check Validation: True
Trigger Fires On: Some Forms
  Form ID contains "submit-case-form"
  OR Form ID contains "contact-form"
```

**Trigger 2: WhatsApp Click**
```
Trigger Type: Click - All Elements
Click Element matches CSS selector: a[href*="wa.me"]
Trigger Fires On: All Clicks
```

**Trigger 3: Phone Call Click**
```
Trigger Type: Click - All Elements
Click Element matches CSS selector: a[href^="tel:"]
Trigger Fires On: All Clicks
```

4. **GTM Tags**

**Tag 1: Google Ads Conversion — Form**
```
Tag Type: Google Ads Conversion Tracking
Conversion ID: [YOUR_CONVERSION_ID]
Conversion Label: [YOUR_FORM_LABEL]
Conversion Value: 150
Currency Code: USD
Trigger: Form Submission
```

**Tag 2: Google Ads Conversion — WhatsApp**
```
Tag Type: Google Ads Conversion Tracking
Conversion ID: [SAME_CONVERSION_ID]
Conversion Label: [YOUR_WHATSAPP_LABEL]
Conversion Value: 100
Currency Code: USD
Trigger: WhatsApp Click
```

**Tag 3: GA4 Event — Form Submit** (для cross-reference)
```
Tag Type: GA4 Event
Event Name: submit_lead_form
Event Parameters:
  form_type: {{Form ID}}
  campaign: {{utm_campaign}}
  source: {{utm_source}}
Trigger: Form Submission
```

5. **Publish Container**
   - Test mode → Preview на realestate.wtpref.com
   - Проверить что conversions firing
   - Submit Version → Publish

### Google Ads Account Structure

```
Account: WTP Real Estate
├── Campaign 1: Golden Visa (Search)
│   ├── Ad Group 1.1: Golden Visa Property
│   ├── Ad Group 1.2: Dubai Investment
│   └── Ad Group 1.3: Relocation
├── Campaign 2: Structure / Banking (Search)
│   ├── Ad Group 2.1: Ownership Structure
│   ├── Ad Group 2.2: Banking
│   └── Ad Group 2.3: Tax
├── Campaign 3: Location Niche (Search)
│   ├── Ad Group 3.1: RAK
│   ├── Ad Group 3.2: Expo City
│   └── Ad Group 3.3: Commercial
└── Campaign 4: Retargeting (Display + YouTube)
    ├── Audience 1: Recent 30d
    ├── Audience 2: Engaged 60d
    └── Audience 3: High-Intent 90d
```

### Shared Negative Keywords List

Создать на уровне Account:

**List Name:** "RE — General Exclusions"

```
cheap, budget, affordable, free, download, pdf, guide, blog, article, forum, reddit,
jobs, careers, employment, salary, work, visa application, visa status, tourist,
visit, holiday, vacation, hotel, airbnb, short term, temporary, rent, rental, lease,
tenant, studio, 1 bedroom, shared, room, rooms, flatshare, under 100k, under 200k,
under 500k, payment plan, installment, developer direct, off plan payment plan,
no down payment, zero deposit, property management software, agent training,
real estate course, property manager job, internship
```

Применить ко всем Search campaigns.

---

## Performance Benchmarks & Optimization

### Month 1 (Learning Phase)

**Ожидаемые результаты:**
- Impressions: 10,000-15,000
- Clicks: 200-300 (CTR 2-3%)
- Leads: 5-8 (form + WhatsApp)
- CPL: $150-250 (высокий — learning phase)
- Conversion Rate: 2-3%

**Действия:**
- Собирать данные, не паниковать по CPL
- Ежедневно добавлять negative keywords из Search Terms report
- Отключить keywords с CTR < 1% после 100 impressions
- Не менять bids — дать алгоритму учиться

### Month 2 (Optimization)

**Ожидаемые результаты:**
- Impressions: 12,000-20,000
- Clicks: 300-500 (CTR 3-4%)
- Leads: 8-12
- CPL: $120-180
- Conversion Rate: 3-5%

**Действия:**
- Увеличить bid на keywords с CR > 5% (+20%)
- Pause keywords с CR < 1% и spend > $50
- A/B test ad copy: новые headlines/descriptions
- Добавить retargeting audiences (если трафик достаточный)
- Тест landing page варианта (short form vs long form)

### Month 3+ (Scale)

**Ожидаемые результаты:**
- Impressions: 15,000-25,000
- Clicks: 500-800 (CTR 4-6%)
- Leads: 15-20
- CPL: $100-150
- Conversion Rate: 5-7%

**Действия:**
- Переключить на Target CPA bidding (если > 30 conversions/month)
- Масштабировать бюджет на winning campaigns (+50%)
- Добавить Performance Max campaign (Google AI)
- Запустить competitor keywords (осторожно)
- Seasonal adjustments (Q4 spike)

### Red Flags (когда останавливать/изменять)

| Метрика | Red Flag | Действие |
|---------|---------|---------|
| CTR | < 1.5% после 1000 impressions | Переписать ad copy, проверить keyword relevance |
| Quality Score | < 5/10 | Улучшить ad-to-keyword match, landing page UX |
| Conversion Rate | < 1% после 100 clicks | Проверить landing page, form friction, messaging match |
| CPL | > $250 стабильно | Сузить targeting, pause broad match, optimize landing |
| Bounce Rate | > 70% | Проверить messaging match ad → landing page |
| Time on Page | < 30 sec | Landing page не релевантен или плохой UX |

---

## Weekly Operations Checklist

**Понедельник:**
- [ ] Проверить weekend performance
- [ ] Добавить negative keywords из Search Terms (пятница-воскресенье)
- [ ] Обновить budget allocation по performance прошлой недели

**Среда:**
- [ ] Проверить Quality Scores — если < 5, добавить в список оптимизации
- [ ] Review CTR по ad groups — pause underperformers
- [ ] Check landing page analytics (bounce, time, scroll depth)

**Пятница:**
- [ ] Weekly report: spend, clicks, leads, CPL, CR% по каждой campaign
- [ ] Обновить bid adjustments (если данных достаточно)
- [ ] План на следующую неделю (что тестировать)

**Ежемесячно:**
- [ ] Full audit: keyword performance, ad copy winners, landing page A/B results
- [ ] Budget reallocation: убрать из low-performers, добавить в winners
- [ ] Competitor analysis: новые keywords, ad copy тренды
- [ ] Обновить negative keywords list

---

## Next Steps для WTP

1. **Создать Google Ads аккаунт** (если ещё нет) — ads.google.com
2. **Подключить billing** — кредитка или invoice (для $1K+ spend)
3. **Установить GTM + Conversion Tracking** — следовать инструкции выше
4. **Создать Campaign 1** (Golden Visa) — начать с $30-50/день
5. **Запустить на 1 неделю** — собрать данные
6. **Проанализировать Search Terms** — добавить negatives
7. **Оптимизировать 2 недели** → затем добавлять Campaign 2 и 3

**Важно:** Не запускать все 4 campaigns сразу. Начать с Campaign 1 (Golden Visa) → убедиться что conversion tracking работает → добавлять остальные постепенно.

---

## Приложение: UTM Naming Convention

Для всех campaign URLs использовать единый формат:

```
?utm_source=google
&utm_medium=cpc
&utm_campaign={campaign_name}
&utm_term={keyword}
&utm_content={ad_variant}
```

**Примеры:**
```
realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=golden_visa&utm_term=golden+visa+dubai+property&utm_content=rsa_1a

realestate.wtpref.com?utm_source=google&utm_medium=cpc&utm_campaign=rak&utm_term=rak+property+investment&utm_content=rsa_3a
```

Эти параметры должны сохраняться в скрытые поля формы или CRM при submit.

---

**Конец документа. Следующий файл: ad-copy-library.md**
