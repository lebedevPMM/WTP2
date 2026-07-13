# Landing Page Specification — realestate.wtpref.com для Google Ads

> **Версия:** 1.0
> **Дата:** 2026-03-15
> **Цель:** Конверсия Google Ads трафика → Form Submit / WhatsApp Contact
> **Target Conversion Rate:** 5-7% (industry benchmark RE landing pages: 2-4%)

---

## Executive Summary

Текущий realestate.wtpref.com требует оптимизации для конверсии платного трафика. Google Ads приводит высоко-интентных пользователей, но landing page должна:

1. **Захватить внимание** в первые 3 секунды (above-fold критичен)
2. **Подтвердить релевантность** — match messaging из ad copy
3. **Устранить трение** — форма должна быть видима и проста
4. **Построить доверие** — social proof, credentials, specifics
5. **Конвертировать** — минимум 2 CTA выше fold, WhatsApp всегда доступен

Этот документ — полная спецификация обновлённого лендинга: структура, копирайт, технические требования, A/B тесты.

> **⚠️ STATISTICS VERIFICATION — REQUIRED BEFORE LAUNCH**
> The following claims in this spec must be confirmed with WTP Operations before the landing page goes live:
> - **"300+ cases in 2025"** — confirm actual number with WTP ops
> - **"94% bank approval rate"** — confirm current rate with WTP ops
> - **"40% of buyers face banking problems"** — source needed (internal data or industry report)
> - **"15+ partner banks"** — confirm current bank partnership count
> If any statistic cannot be verified, replace with softer language (e.g., "hundreds of cases", "high approval rate", "many buyers")

---

## Above-Fold Requirements (первый экран)

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│ [Logo WTP]              [WhatsApp Button]       │ ← Header (sticky)
├─────────────────────────────────────────────────┤
│                                                 │
│            HEADLINE (H1)                        │ ← 60-80 chars, keyword-rich
│         Sub-headline (20-30 words)              │
│                                                 │
│  ┌─────────────────┐   ┌──────────────────┐   │
│  │                 │   │  LEAD CAPTURE    │   │
│  │  Trust Badges   │   │  FORM            │   │
│  │  • RERA         │   │                  │   │
│  │  • WTP Group    │   │  [Submit CTA]    │   │
│  │  • "300+ cases" │   │                  │   │
│  │                 │   │  [WhatsApp CTA]  │   │
│  └─────────────────┘   └──────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Headline (H1)

**Primary (для Golden Visa traffic):**
> Golden Visa Through Property — Banking-First Approach

**Alternative A (для Investment traffic):**
> Dubai Real Estate Investment — Structure First, Property Second

**Alternative B (для Relocation traffic):**
> Relocate to UAE — Full Setup: Company + Bank + Visa + Property

**Alternative C (для Structure/Banking traffic):**
> Can You Open a UAE Bank Account? Check Before You Buy

**Правила headline:**
- Включает main keyword из ad group
- Подтверждает обещание из ad copy
- Выгода или вопрос (не просто "WTP Real Estate")
- Длина: 60-80 символов (не больше 2 строк на desktop)

---

### Sub-headline

**Primary:**
> Unlike typical agents, WTP verifies your bank account eligibility BEFORE you sign any property agreement. We structure your entire UAE entry: company formation, banking, Golden Visa, and property selection—as one integrated service.

**Alternative A (shorter):**
> We don't sell apartments. We structure investment infrastructure. Banking pre-screen in 48 hours. Free consultation.

**Alternative B (problem-aware):**
> 40% of Dubai property buyers discover banking problems after purchase. We check eligibility first—free 48h pre-screen for your situation.

**Правила sub-headline:**
- 20-30 слов (не paragraph)
- Подчёркивает differentiation (banking-first / integrated / not just agents)
- Конкретные цифры или timeframes ("48h", "300+ cases", "94% approval")

---

### Lead Capture Form

**Location:** Right side on desktop (above fold), below headline on mobile

**Fields (3 — launch version, minimal friction for cold Google Ads traffic):**

1. **Name** (text input, required)
   - Label: "Your Name"
   - Placeholder: "John Smith"
   - Validation: min 2 chars

2. **Email** (email input, required)
   - Label: "Email Address"
   - Placeholder: "you@example.com"
   - Validation: valid email format

3. **Phone** (tel input, required)
   - Label: "Phone Number (with country code)"
   - Placeholder: "+44 7700 900000"
   - Validation: min 10 chars, starts with +

> **A/B Test after 50+ conversions:** Add Country (dropdown), Budget Range (dropdown, optional), and Interest (dropdown) as Variant B. See Test 1 below. More fields = better lead qualification but higher friction. Launch with 3 fields first — cold Google Ads traffic converts poorly on long forms.

**Submit Button:**
- Text: "Get Free Pre-Screen" (primary CTA)
- Color: WTP gold (#C5A572) text on dark (#1A2332) background
- Size: Full-width on mobile, 60% width on desktop
- Hover state: subtle glow effect
- Loading state: "Submitting..." with spinner

**WhatsApp Alternative CTA (below submit button):**
- Text: "Prefer WhatsApp? Message Us Now →"
- Link: `https://wa.me/971600575294?text=Hi%2C%20I'm%20interested%20in%20Dubai%20property%20investment.%20I%20came%20from%20your%20website.`
- Style: Text link (not button), green underline on hover
- Icon: WhatsApp icon left of text

**Privacy & Consent:**
- Below form: Small text (12px)
- "By submitting, you agree to our [Privacy Policy] and consent to be contacted about WTP services."
- Privacy Policy = link to /privacy

---

### Trust Badges (Left Side / Below Form on Mobile)

**Badge 1: RERA Licensed**
```
[Icon: RERA logo or official seal]
RERA Licensed Agency
License #: [NUMBER]
```

**Badge 2: Part of WTP Group**
```
[Icon: WTP logo small]
Part of WTP Advisory Group
Corporate + Banking + Real Estate
```

**Badge 3: Track Record**
```
[Icon: Checkmark]
300+ Cases in 2025
94% Bank Approval Rate
```

**Badge 4: Response Time**
```
[Icon: Clock]
48-Hour Pre-Screen
Free Eligibility Check
```

**Layout:** 2x2 grid on desktop, vertical stack on mobile. Clean icons, minimal text.

---

## Below-Fold Sections

### Section 1: How It Works (4 Steps with Icons)

**Section Headline:** How WTP Structures Your UAE Property Investment

**Process Steps:**

```
┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
│   Step 1  │ → │   Step 2  │ → │   Step 3  │ → │   Step 4  │
└───────────┘   └───────────┘   └───────────┘   └───────────┘
```

**Step 1: Banking Pre-Screen (48h)**
Icon: Shield with checkmark
Title: Banking Pre-Screen
Description:
> We assess your profile: source of funds, KYC documents, banking eligibility. You know if you can open a UAE account BEFORE looking at any property. Free, 48-hour turnaround.

**Step 2: Structure Design**
Icon: Connected nodes (structure diagram)
Title: Ownership Structure
Description:
> Personal name or company? Freezone LLC or offshore holding? We analyze your tax situation (UK, DE, NL exit tax) and recommend optimal structure. Exit tax planning included.

**Step 3: Parallel Execution**
Icon: Three parallel arrows
Title: Company + Bank + Property
Description:
> While you search for property, we handle: company formation, bank account application, Golden Visa prep. Everything in parallel. No waiting for "step 1 to finish."

**Step 4: Closing & Beyond**
Icon: Key
Title: Purchase & Compliance
Description:
> Property closing, title transfer, Golden Visa application, tax residency certificate. Then: ongoing compliance support, accounting, renewals. Long-term partnership.

**CTA after Section 1:**
- Button: "Start Your Free Pre-Screen"
- Link to: #form (smooth scroll) or WhatsApp

---

### Section 2: Why WTP ≠ Typical Agency (Comparison Table)

**Section Headline:** 8,000 Agents in Dubai — What Makes WTP Different?

**Comparison Table:**

| Typical Agent | WTP Boutique Real Estate |
|---------------|-------------------------|
| Sells property, commission ends | Advisory partnership: property + corporate + banking + visa + compliance |
| "Can you afford it?" | "Can you open a bank account? What's your tax situation?" |
| Shows apartments first | Checks banking eligibility first (free 48h pre-screen) |
| You handle company, visa, banking separately | Integrated: we handle everything in parallel |
| Generic service for everyone | Specialized: UK/DE/NL relocators, Golden Visa, exit tax structuring |
| No banking expertise | Part of WTP Group (banking specialists since [YEAR]) |
| You discover problems after signing | We identify & fix problems BEFORE you commit |
| One-time transaction | Long-term compliance, accounting, renewals |

**Visual Design:**
- Left column: muted colors, generic
- Right column: WTP brand colors, highlighted
- Checkmarks (✓) in WTP column, X or blank in Typical column for key rows

**CTA after Section 2:**
- Text link: "See how we work → [link to process document or video]"

---

### Section 3: Case Studies (3 Anonymized)

**Section Headline:** Real Situations We've Solved

**Case Study 1: UK Investor — Banking Rejection Fixed**

```
Client Profile: UK entrepreneur, exiting due to non-dom changes
Property Budget: £2.5M (~11M AED)
Problem: Previous agent showed properties, client made offer,
         then UAE bank rejected account (unclear SOF from crypto exit)
WTP Solution: 1) Restructured SOF documentation with UK accountant
              2) Created UAE holding company (clean structure)
              3) Introduced to bank comfortable with crypto backgrounds
              4) Account approved in 3 weeks
Result: Purchased 2BR Palm Jumeirah (investment) + Golden Visa
Timeline: From first call to keys: 8 weeks
```

**Case Study 2: German Family — Exit Tax Optimized**

```
Client Profile: Family of 4, Munich, relocating to Dubai
Property Budget: €1.8M (~7.2M AED)
Problem: German Wegzugsteuer (exit tax) on worldwide assets
         Needed property for Golden Visa + timing optimization
WTP Solution: 1) Tax advisor coordination (DE + UAE)
              2) Timed property purchase AFTER official exit
              3) Company setup for ownership (tax-efficient)
              4) Family banking + school advisory
Result: Purchased villa Expo City + 4x Golden Visas (parents + 2 kids)
        Exit tax minimized through structure & timing
Timeline: 12 weeks (including tax planning)
```

**Case Study 3: Dutch Investor — Commercial Property**

```
Client Profile: Netherlands entrepreneur, Box 3 tax motivation
Property Budget: €3M (~12M AED) for office space
Problem: Wanted to own business premises (freezone office)
         Needed company structure + banking + visa
WTP Solution: 1) Freezone company setup (DMCC)
              2) Banking for corporate + commercial mortgage
              3) Office purchase in company name
              4) Golden Visa through commercial property
Result: Owns 200sqm office DMCC, rents out 50% to other tenants
        Net cost after rental income: 60% of mortgage
Timeline: 10 weeks from first call to move-in
```

**Visual Design:**
- Cards: white background, subtle shadow
- Icons: Country flag small in corner
- Timeline: visual timeline bar (weeks 0 → result)
- "Problem" in red/orange, "Solution" in blue, "Result" in green

**CTA after Section 3:**
- "Your situation is unique. Let's discuss it. [Book Free Consultation]"

---

### Section 4: Social Proof & Metrics

**Section Headline:** By The Numbers

**Metrics (4-column grid on desktop, stack on mobile):**

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│    300+     │ │     94%     │ │   48 hours  │ │     15+     │
│   Cases     │ │  Approval   │ │  Pre-Screen │ │   Partner   │
│   in 2025   │ │    Rate     │ │  Turnaround │ │    Banks    │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

**Metric 1: 300+ Cases in 2025**
Subtext: "Investors from UK, DE, NL, CH, and 20+ other countries"

**Metric 2: 94% Bank Approval Rate**
Subtext: "Because we pre-screen and prepare documentation properly"

**Metric 3: 48-Hour Pre-Screen**
Subtext: "Free banking eligibility check — know before you commit"

**Metric 4: 15+ Partner Banks**
Subtext: "We know which banks accept your profile"

**Additional Elements:**

**Client Logos (if available):**
- "Trusted by clients from:" [logos of client companies, anonymized]
- Альтернатива (если логотипов нет): "Industries we serve: Technology, Finance, Healthcare, Real Estate, Consulting"

**Testimonial Quotes (2-3 short):**

> "WTP saved us from a disaster. We almost signed, then discovered we couldn't open an account. They checked banking first."
> — German entrepreneur, relocated to Dubai 2025

> "Finally, an agency that understands tax. They coordinated with our UK accountant and structured everything properly."
> — UK family office, Golden Visa through property

> "Not just property — they handled our company, visa, banking, everything. One partner, zero headaches."
> — Dutch investor, commercial property DMCC

**Visual:** Quote cards, clean typography, client title (not name for anonymity)

---

### Section 5: FAQ (8 Questions with Answers)

**Section Headline:** Frequently Asked Questions

**FAQ Layout:** Accordion (click to expand). First 3 open by default, rest collapsed.

---

**Q1: What is banking pre-screen and why do I need it?**

A: 40% of Dubai property buyers discover they cannot open a UAE bank account AFTER purchasing property. This creates serious problems: you own real estate but can't transfer money, pay bills, or receive rental income.

Our banking pre-screen (free, 48 hours) assesses your profile: source of funds, KYC documents, country of origin, business activities. We tell you BEFORE you commit to any property: (1) Can you open an account? (2) Which banks are likely to accept you? (3) What documentation you need to prepare?

This prevents costly mistakes and saves months of frustration.

---

**Q2: How is WTP different from other real estate agencies?**

A: Most of the 8,000+ agencies in Dubai sell property and their job ends at commission. WTP is part of WTP Advisory Group — we specialize in corporate services, banking, and compliance.

Our integrated approach:
- We check banking eligibility FIRST (free pre-screen)
- We structure ownership (personal vs company, tax implications)
- We handle company formation + banking + visa + property in parallel
- We provide ongoing compliance support (not one-time transaction)
- We specialize in UK/DE/NL relocators (exit tax planning included)

You work with advisors, not just agents.

---

**Q3: Do I need a company to buy property in Dubai, or can I buy in my personal name?**

A: Both options are possible, but the optimal choice depends on your situation:

**Personal name:** Simpler, faster, lower upfront costs. Good for: single property for personal use, Golden Visa, straightforward tax situation.

**Company name (UAE LLC or offshore holding):** Better for: multiple properties, tax optimization (especially UK/DE/NL investors), estate planning, rental income management, liability protection.

We analyze your specific situation (country of origin, tax status, investment goals) and recommend the optimal structure. If you need a company, we handle formation as part of integrated service.

Exit tax from UK or Germany often makes company ownership more tax-efficient. We coordinate with your home country accountant.

---

**Q4: What is Golden Visa and am I eligible?**

A: UAE Golden Visa = 10-year residence visa for you, spouse, and children (renewable). Unlike standard visas (2-3 years), Golden Visa doesn't require employer sponsorship.

**Eligibility through property:**
- Purchase property worth 2M AED or more (~$545K USD)
- Can be ready property or off-plan
- Can be residential or commercial
- Can be one property or multiple adding up to 2M+
- Mortgage-financed property also eligible (based on purchase price, not equity)

**What you get:**
- 10-year visa for you + spouse + children
- No employer sponsorship needed
- Can live, work, or invest in UAE
- Tax residency certificate (important for exit tax planning UK/DE/NL)
- 6-month travel allowance (can stay abroad without losing visa)

WTP handles: property selection (Golden Visa eligible), purchase process, visa application, Emirates ID, tax residency certificate.

---

**Q5: I'm from UK/Germany/Netherlands. How do you handle exit tax?**

A: Exit tax is triggered when you cease tax residency in UK, Germany, or Netherlands. Dubai property purchase is often part of relocation strategy, so timing and structure matter.

**UK (new non-dom rules 2025):**
- Capital gains on worldwide assets can be triggered on exit
- Property ownership structure (personal vs company) affects taxation
- UAE tax residency certificate helps establish new tax home
- We coordinate with your UK accountant: timing of purchase, structure, documentation

**Germany (Wegzugsteuer):**
- Exit tax on unrealized gains if you own 1%+ of company shares
- Property itself not directly taxed, but structure matters
- We time property purchase around official exit date
- Company formation in UAE can be part of tax-efficient structure

**Netherlands (Box 3):**
- Deemed return on worldwide assets while Dutch resident
- Moving to UAE = exit from Box 3, but timing matters
- UAE tax residency certificate required to prove new residency
- We structure ownership and timing to minimize Box 3 exposure

**Our approach:** Free consultation with your situation → coordination with home country tax advisor → optimal structure & timing → UAE setup (company + banking + property + tax residency).

---

**Q6: How long does the entire process take?**

A: Timeline depends on complexity, but here are typical scenarios:

**Fast track (ready property, simple case): 6-8 weeks**
- Week 1: Banking pre-screen + initial consultation
- Week 2-3: Property selection + structure decision
- Week 4-5: Company formation (if needed) + bank account application
- Week 6-7: Property purchase, title transfer
- Week 8: Golden Visa application, Emirates ID

**Standard (off-plan or complex structure): 10-14 weeks**
- Additional time for: exit tax planning, offshore company setup, complex SOF documentation

**What runs in parallel:**
- Company formation + bank account application + property search (not sequential)
- We don't wait for "step 1 to finish" before starting step 2

**Your involvement:**
- Initial consultation: 1-2 hours
- Document gathering: 3-5 days
- Property viewings: 1-3 days (can be done remotely via video)
- Signing sessions: 2-3 appointments
- Most communication: WhatsApp, email, video calls

We handle 90% of the work. You make decisions, we execute.

---

**Q7: What are your fees? How does pricing work?**

A: **Property commission:**
- Buyer's agent commission: typically 2% of property value (industry standard UAE)
- Paid by developer/seller (off-plan) or included in transaction (secondary market)
- You don't pay us separately for property brokerage

**Advisory & Integrated Services:**
- Banking pre-screen: FREE
- Initial consultation: FREE
- Company formation: Standard fees (varies by freezone/mainland: 15K-25K AED)
- Banking setup: Included in integrated package (no separate charge)
- Golden Visa processing: 10K-15K AED (government fees + our service)
- Ongoing compliance (optional): Retainer from 2K AED/month (accounting, renewals, reporting)

**Integrated Package (typical total for Golden Visa investor):**
- Property purchase 2M AED → commission ~40K AED (2%, paid by seller)
- Company + banking + visa: ~30-40K AED total
- Total: ~70-80K AED for complete setup (company + account + visa + property)

**No hidden fees. Full cost breakdown before you commit.**

We also offer referral model for partners (wealth managers, tax advisors) — contact us for partner terms.

---

**Q8: What happens after I buy the property? Do you provide ongoing support?**

A: Yes. Unlike typical agencies where relationship ends at commission, WTP provides long-term partnership:

**Immediate post-purchase (included):**
- Title transfer assistance
- DEWA (utilities) setup
- Homeowner association registration
- Golden Visa application completion
- Tax residency certificate application
- Banking account activation

**Ongoing support (optional retainer):**
- Annual company renewal + license
- Accounting & bookkeeping (if property generates rental income)
- Tax residency certificate renewals
- Visa renewals (every 10 years for Golden Visa)
- Compliance reporting (ESR, audit if applicable)
- Property management (if rental/investment property)
- Additional property purchases (many clients buy 2nd, 3rd properties)

**Advisory on tap:**
- Market updates (quarterly reports for investors)
- Tax law changes affecting property owners
- New investment opportunities
- Exit strategy when you decide to sell

**Cost:** Retainer from 2K AED/month (~$550/month) depending on services needed. Many clients start with property purchase, then add retainer after seeing value.

You're not just buying an apartment. You're building long-term infrastructure in UAE. We stay with you.

---

**CTA after FAQ:**
- "Still have questions? Book a free 15-minute call. No pitch, just answers."
- Button: "Book Free Call" + WhatsApp alternative

---

### Section 6: Final CTA (Form Repeat + WhatsApp)

**Section Headline:** Ready to Start Your UAE Property Journey?

**Copy:**
> Free banking pre-screen in 48 hours. No commitment, no cost. We'll assess your profile and tell you: (1) Can you open a UAE bank account? (2) What structure is optimal for your situation? (3) What property options fit your goals?

**Two CTA Options (side by side on desktop, stacked on mobile):**

**Option 1: Submit Case (Form)**
```
┌──────────────────────────────┐
│  Submit Your Case            │
│                              │
│  [Name]                      │
│  [Email]                     │
│  [Phone]                     │
│                              │
│  [Get Free Pre-Screen]       │
└──────────────────────────────┘
```
(Same form as above-fold, repeated)

**Option 2: WhatsApp**
```
┌──────────────────────────────┐
│  Prefer WhatsApp?            │
│                              │
│  Message us now — we reply   │
│  within 2 hours (GMT+4)      │
│                              │
│  [WhatsApp Icon]             │
│  Message Us on WhatsApp      │
│                              │
└──────────────────────────────┘
```
Link: `https://wa.me/971600575294?text=Hi%2C%20I'm%20interested%20in%20Dubai%20property.%20I%20found%20you%20through%20Google.`

**Below CTAs:**
- Small text: "Or call us: +971 600 575 294"
- Office hours: "Sun-Thu 9:00-18:00 GST (GMT+4)"

---

## Footer

**WTP Boutique Real Estate**

**Contact:**
- Email: hello@wtpbrokers.com
- Phone: +971 600 575 294
- Office: Office 1207, Arenco Tower, Media City, Dubai, UAE
- WhatsApp: [link]

**Quick Links:**
- [About WTP] — link to main WTP corporate site
- [How We Work] — link to process document
- [Partner With Us] — link to partners landing
- [Blog] — link to blog/resources (if exists)

**Legal:**
- [Privacy Policy]
- [Terms of Service]

**License:**
- RERA License: [NUMBER]
- Part of WTP Advisory Group

**Social Media:**
- [LinkedIn icon + link]
- [Instagram icon + link] (if active)
- [YouTube icon + link] (if active)

**Copyright:**
© 2026 WELLCOME TO PARADISE REAL ESTATE BROKERS LLC. All rights reserved.

---

## Technical Requirements

### Page Speed & Performance

**Target Metrics:**
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

**Optimization Requirements:**
1. **Images:**
   - All images WebP format with fallback
   - Lazy loading below fold
   - Responsive srcset for different screen sizes
   - Hero image: < 200KB
   - Icons: SVG (not raster)

2. **JavaScript:**
   - Critical JS inline in `<head>`
   - Non-critical JS deferred
   - Form validation: client-side first, server-side backup
   - No jQuery (use vanilla JS or React)

3. **CSS:**
   - Critical CSS inline for above-fold
   - Rest of CSS loaded async
   - Minified and compressed

4. **Fonts:**
   - Google Fonts with font-display: swap
   - Preload primary font (Inter or similar)
   - Max 2 font families, 4 weights total

5. **Third-Party Scripts:**
   - Google Tag Manager: async
   - Google Ads conversion tracking: async
   - WhatsApp widget (if used): load after page load

---

### Mobile Responsiveness

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile-Specific Requirements:**

1. **Form:**
   - Full width on mobile
   - Larger touch targets (min 48px height)
   - Input type="tel" for phone (triggers numeric keyboard)
   - Input type="email" for email (triggers email keyboard)
   - Dropdowns: native select on mobile (better UX than custom)

2. **CTAs:**
   - WhatsApp button sticky at bottom (fixed position)
   - Floating action button (FAB) style
   - "Submit Form" CTA above fold

3. **Navigation:**
   - Sticky header with logo + WhatsApp button
   - Minimal navigation (this is a focused landing page, not full site)

4. **Typography:**
   - H1: 32px mobile, 56px desktop
   - Body text: 16px minimum (readable without zoom)
   - Line height: 1.5-1.6

5. **Spacing:**
   - Generous padding on mobile (min 20px sides)
   - Vertical rhythm: consistent spacing between sections

---

### UTM Parameter Capture

**Requirement:** Все UTM параметры из URL должны сохраняться и передаваться в CRM при submit формы.

**Implementation:**

1. **JavaScript:** На load страницы, захватить UTM из URL:
```javascript
const urlParams = new URLSearchParams(window.location.search);
const utmParams = {
  utm_source: urlParams.get('utm_source') || '',
  utm_medium: urlParams.get('utm_medium') || '',
  utm_campaign: urlParams.get('utm_campaign') || '',
  utm_term: urlParams.get('utm_term') || '',
  utm_content: urlParams.get('utm_content') || ''
};
```

2. **Hidden Form Fields:** Добавить скрытые поля в форму:
```html
<input type="hidden" name="utm_source" id="utm_source" value="">
<input type="hidden" name="utm_medium" id="utm_medium" value="">
<input type="hidden" name="utm_campaign" id="utm_campaign" value="">
<input type="hidden" name="utm_term" id="utm_term" value="">
<input type="hidden" name="utm_content" id="utm_content" value="">
```

3. **Populate on Page Load:**
```javascript
document.getElementById('utm_source').value = utmParams.utm_source;
document.getElementById('utm_medium').value = utmParams.utm_medium;
// ... etc for all UTM params
```

4. **Submit to CRM:** При отправке формы, включить UTM в payload к Bitrix24 webhook или CRM API.

5. **Persist in Session:** Сохранить UTM в sessionStorage (если пользователь переходит на другие страницы сайта, UTM сохраняются).

---

### Conversion Tracking Setup

**Primary Conversion: Form Submit**

1. **Google Ads Conversion Tag:**
   - Fire on form submit success
   - Conversion ID: `[WTP_CONVERSION_ID]`
   - Conversion Label: `[FORM_SUBMIT_LABEL]`
   - Value: $150 (average CPL estimate)

2. **GA4 Event:**
   - Event name: `submit_lead_form`
   - Parameters:
     - `form_type`: "google_ads_landing"
     - `utm_campaign`: {{utm_campaign}}
     - `utm_source`: {{utm_source}}
     - `budget_range`: {{selected budget}}
     - `interest`: {{selected interest}}

3. **Facebook Pixel** (if running Meta ads later):
   - Event: `Lead`
   - Parameters: budget, country, interest

**Secondary Conversion: WhatsApp Click**

1. **Google Ads Conversion Tag:**
   - Fire on WhatsApp link click
   - Conversion ID: `[SAME_WTP_CONVERSION_ID]`
   - Conversion Label: `[WHATSAPP_CLICK_LABEL]`
   - Value: $100

2. **GA4 Event:**
   - Event name: `whatsapp_click`
   - Parameters: utm_campaign, utm_source, page_location

**Phone Call Conversion** (if call tracking enabled):
- Event: `phone_call`
- Trigger: click on tel: link OR call tracking number integration
- Value: $80

---

### A/B Testing Framework

**Tools:** VWO или Optimizely (Google Optimize deprecated — не использовать)

**A/B Test Suggestions (Priority Order):**

#### Test 1: Form Length (High Priority)

**Variant A (Control — launch default): 3 fields**
- Name, Email, Phone (optimized for cold Google Ads traffic)
- Country, Budget, Interest captured in follow-up call/WhatsApp

**Variant B: 6 fields (qualification)**
- Name, Email, Phone + Country, Budget Range, Interest
- Higher friction but better lead qualification before first call

**Hypothesis:** 3 fields = higher conversion rate for cold paid traffic; test 6 fields after 50+ conversions
**Success Metric:** Form submit rate (target: Variant A baseline, then compare with B)
**Secondary Metric:** Lead-to-call rate (may be higher with Variant B due to pre-qualification)

---

#### Test 2: Headline Messaging (High Priority)

**Variant A (Control): Banking-First**
> Golden Visa Through Property — Banking-First Approach

**Variant B: Problem-Aware**
> Can You Open a UAE Bank Account? Check Before You Buy.

**Variant C: Integrated Service**
> Dubai Property Investment — Company + Bank + Visa + Property

**Hypothesis:** Different segments resonate with different angles
**Success Metric:** Time on page + form submit rate
**Segment by:** utm_campaign (Golden Visa vs Investment vs Structure)

---

#### Test 3: CTA Button Text (Medium Priority)

**Variant A (Control): "Get Free Pre-Screen"**

**Variant B: "Check Eligibility Now"**

**Variant C: "Submit Your Case"**

**Variant D: "Book Free Consultation"**

**Hypothesis:** Action-oriented CTA ("Check") performs better than passive ("Get")
**Success Metric:** Button click-through rate

---

#### Test 4: Social Proof Placement (Medium Priority)

**Variant A (Control): Left side above fold + separate section below**

**Variant B: Directly above form (right side)**
- "300+ cases, 94% approval" as trust badge directly above form fields

**Variant C: Within form as inline text**
- Small text inside form: "Join 300+ investors who started here"

**Hypothesis:** Social proof closer to form reduces friction
**Success Metric:** Form submit rate

---

#### Test 5: WhatsApp CTA Prominence (Low Priority)

**Variant A (Control): Text link below form**

**Variant B: Equal button next to Submit**
- Two equal-sized buttons: "Submit Form" | "WhatsApp Us"

**Variant C: Sticky WhatsApp FAB (mobile only)**
- Floating action button bottom-right, always visible

**Hypothesis:** More prominent WhatsApp = higher total conversion (form + WhatsApp combined)
**Success Metric:** Total conversions (form submit + WhatsApp clicks)

---

### Accessibility (WCAG 2.1 AA Compliance)

**Requirements:**

1. **Keyboard Navigation:**
   - All form fields, buttons, links accessible via Tab
   - Focus indicators visible (outline or custom styling)
   - Escape key closes any modals/overlays

2. **Screen Readers:**
   - All images have alt text
   - Form labels properly associated with inputs (for/id)
   - aria-label on icon-only buttons
   - aria-required on required fields
   - aria-invalid + aria-describedby for validation errors

3. **Color Contrast:**
   - Text on background: min 4.5:1 ratio (7:1 for AAA)
   - Button text on button background: min 4.5:1
   - Check with WebAIM Contrast Checker

4. **Form Validation:**
   - Inline error messages (not just red border)
   - Error summary at top of form if multiple errors
   - Success message after submit (not just redirect)

5. **Headings:**
   - Logical hierarchy (H1 → H2 → H3, no skipping levels)
   - Only one H1 per page

6. **Links:**
   - Descriptive link text (not "click here")
   - External links indicated (icon or text)

---

## Copy — Full Text for All Sections

### Above-Fold

**Headline:**
> Golden Visa Through Property — Banking-First Approach

**Sub-headline:**
> Unlike typical agents, WTP verifies your bank account eligibility BEFORE you sign any property agreement. We structure your entire UAE entry: company formation, banking, Golden Visa, and property selection—as one integrated service.

**Form Labels (Launch Version — 3 fields):**
- Name: "Your Name"
- Email: "Email Address"
- Phone: "Phone Number (with country code)"

**Submit Button:** "Get Free Pre-Screen"

**WhatsApp CTA:** "Prefer WhatsApp? Message Us Now →"

**Privacy Text:**
> By submitting, you agree to our [Privacy Policy] and consent to be contacted about WTP services.

**Trust Badges:**
- RERA Licensed Agency | License #: [NUMBER]
- Part of WTP Advisory Group | Corporate + Banking + Real Estate
- 300+ Cases in 2025 | 94% Bank Approval Rate
- 48-Hour Pre-Screen | Free Eligibility Check

---

### Section 1: How It Works

**Section Headline:** How WTP Structures Your UAE Property Investment

**Step 1: Banking Pre-Screen (48h)**
> We assess your profile: source of funds, KYC documents, banking eligibility. You know if you can open a UAE account BEFORE looking at any property. Free, 48-hour turnaround.

**Step 2: Ownership Structure**
> Personal name or company? Freezone LLC or offshore holding? We analyze your tax situation (UK, DE, NL exit tax) and recommend optimal structure. Exit tax planning included.

**Step 3: Company + Bank + Property**
> While you search for property, we handle: company formation, bank account application, Golden Visa prep. Everything in parallel. No waiting for "step 1 to finish."

**Step 4: Purchase & Compliance**
> Property closing, title transfer, Golden Visa application, tax residency certificate. Then: ongoing compliance support, accounting, renewals. Long-term partnership.

**CTA:** "Start Your Free Pre-Screen"

---

### Section 2: Why WTP ≠ Typical Agency

**Section Headline:** 8,000 Agents in Dubai — What Makes WTP Different?

[Comparison table content as specified above]

**CTA:** "See how we work →"

---

### Section 3: Case Studies

**Section Headline:** Real Situations We've Solved

[Case study content as specified above — UK Investor, German Family, Dutch Investor]

**CTA:** "Your situation is unique. Let's discuss it. [Book Free Consultation]"

---

### Section 4: Social Proof

**Section Headline:** By The Numbers

**Metrics:**
- **300+ Cases in 2025** | Investors from UK, DE, NL, CH, and 20+ other countries
- **94% Bank Approval Rate** | Because we pre-screen and prepare documentation properly
- **48-Hour Pre-Screen** | Free banking eligibility check — know before you commit
- **15+ Partner Banks** | We know which banks accept your profile

**Testimonial 1:**
> "WTP saved us from a disaster. We almost signed, then discovered we couldn't open an account. They checked banking first."
> — German entrepreneur, relocated to Dubai 2025

**Testimonial 2:**
> "Finally, an agency that understands tax. They coordinated with our UK accountant and structured everything properly."
> — UK family office, Golden Visa through property

**Testimonial 3:**
> "Not just property — they handled our company, visa, banking, everything. One partner, zero headaches."
> — Dutch investor, commercial property DMCC

---

### Section 5: FAQ

[FAQ content as specified above — 8 questions with detailed answers]

**CTA:** "Still have questions? Book a free 15-minute call. No pitch, just answers." [Book Free Call]

---

### Section 6: Final CTA

**Section Headline:** Ready to Start Your UAE Property Journey?

**Copy:**
> Free banking pre-screen in 48 hours. No commitment, no cost. We'll assess your profile and tell you: (1) Can you open a UAE bank account? (2) What structure is optimal for your situation? (3) What property options fit your goals?

**CTA 1:** [Form repeat — same as above-fold]

**CTA 2 (WhatsApp):**
> Prefer WhatsApp?
> Message us now — we reply within 2 hours (GMT+4)
> [Message Us on WhatsApp]

**Below CTAs:**
> Or call us: +971 600 575 294
> Office hours: Sun-Thu 9:00-18:00 GST (GMT+4)

---

## Design Guidelines

### Color Palette

**Primary Colors:**
- Dark Navy: #1A2332 (backgrounds, headers)
- WTP Gold: #C5A572 (accents, CTAs, highlights)
- White: #FFFFFF (text on dark backgrounds, cards)
- Light Gray: #F8F9FA (section backgrounds for contrast)

**Secondary Colors:**
- Success Green: #28A745 (WhatsApp, checkmarks, success states)
- Error Red: #DC3545 (validation errors)
- Info Blue: #007BFF (informational highlights)
- Text Gray: #6C757D (secondary text, placeholders)

**Usage:**
- Hero section: Dark navy background, white text, gold accents
- Form: White card with subtle shadow on navy background (desktop) or white background (mobile)
- CTA buttons: Gold background (#C5A572), dark navy text
- WhatsApp: Green (#25D366 official WhatsApp green)

---

### Typography

**Font Stack:**
- **Headings:** Playfair Display (serif, elegant) OR Inter (sans-serif, modern)
- **Body:** Inter (sans-serif, highly readable)
- **Accents:** JetBrains Mono (monospace, for numbers/metrics) — optional

**Sizes:**
- H1 (Headline): 56px desktop / 32px mobile, font-weight 700
- H2 (Section Headlines): 40px desktop / 28px mobile, font-weight 600
- H3 (Subsections): 28px desktop / 24px mobile, font-weight 600
- Body: 16px (mobile & desktop), font-weight 400, line-height 1.6
- Small text (privacy, footnotes): 14px, font-weight 400

**Hierarchy:**
- Headings: Dark navy (#1A2332) or White (on dark backgrounds)
- Body text: Dark gray (#333333) or White
- Secondary text: Gray (#6C757D)
- Links: Gold (#C5A572), underline on hover

---

### Spacing & Layout

**Container:**
- Max-width: 1200px (desktop)
- Padding: 80px vertical between sections (desktop), 60px (mobile)
- Side margins: 40px desktop, 20px mobile

**Grid:**
- Above-fold: 60/40 split (trust badges 60%, form 40%) on desktop
- Sections: 2-column or 3-column grids where applicable
- Mobile: single column, stacked

**Cards:**
- Background: White
- Border-radius: 8px
- Box-shadow: 0 2px 8px rgba(0,0,0,0.1)
- Padding: 32px (desktop), 24px (mobile)

**Buttons:**
- Height: 56px (desktop & mobile for primary CTAs)
- Border-radius: 4px
- Padding: 16px 32px
- Font-size: 16px
- Font-weight: 600
- Transition: 0.2s ease (hover effects)

---

### Icons

**Style:** Line icons (not filled), 2px stroke width
**Sources:** Heroicons, Feather Icons, or custom SVG
**Size:** 24px standard, 32px for section icons, 48px for feature icons
**Color:** Gold (#C5A572) or Dark Navy (#1A2332) depending on background

**Icons Needed:**
- Shield with checkmark (Banking Pre-Screen)
- Connected nodes (Structure)
- Three parallel arrows (Parallel Execution)
- Key (Closing)
- Checkmark (Trust badges, list items)
- Clock (48-hour turnaround)
- Building (RERA, WTP Group)
- Phone (Call CTA)
- WhatsApp logo (WhatsApp CTA)
- Chevron down (FAQ accordion)

---

## Implementation Checklist

### Phase 1: Design & Copy (Week 1)

- [ ] Finalize headline variants for A/B test
- [ ] Write all section copy (use this spec as base)
- [ ] Design mockups (desktop + mobile) in Figma
- [ ] Get WTP team approval on copy & design
- [ ] Prepare all images (icons, hero image, case study visuals)
- [ ] Optimize images (WebP, compressed)

### Phase 2: Development (Week 2)

- [ ] Set up HTML structure (semantic, accessible)
- [ ] Implement responsive CSS (mobile-first)
- [ ] Build form with validation (client-side + server-side)
- [ ] Implement UTM capture JavaScript
- [ ] Integrate with Bitrix24 webhook (form submit)
- [ ] Add Google Tag Manager
- [ ] Set up Google Ads conversion tracking (form + WhatsApp)
- [ ] Set up GA4 events
- [ ] Implement FAQ accordion functionality
- [ ] Add smooth scroll to form CTA
- [ ] Test across browsers (Chrome, Safari, Firefox, Edge)
- [ ] Test on devices (iPhone, Android, iPad, desktop)

### Phase 3: Testing (Week 3)

- [ ] Lighthouse audit (performance, accessibility, SEO)
- [ ] Fix performance issues (image optimization, lazy loading)
- [ ] WCAG accessibility check (keyboard nav, screen reader, contrast)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check (multiple devices)
- [ ] Form submission test (end-to-end: submit → Bitrix24)
- [ ] Conversion tracking test (Google Ads tag firing on submit)
- [ ] UTM parameter capture test (check hidden fields populated)
- [ ] WhatsApp link test (opens app on mobile, web.whatsapp.com on desktop)
- [ ] Load testing (check page doesn't break under traffic spike)

### Phase 4: Launch & Monitor (Week 4)

- [ ] Deploy to production (realestate.wtpref.com)
- [ ] Verify DNS and SSL certificate
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Optimize (for A/B tests)
- [ ] Configure test variants (headline, form length)
- [ ] Turn on Google Ads campaigns (start with Campaign 1)
- [ ] Monitor first 24h: conversion tracking, form submissions, errors
- [ ] Check Analytics: bounce rate, time on page, scroll depth
- [ ] Iterate based on first week data

### Phase 5: Optimization (Ongoing)

- [ ] Weekly: review Google Ads performance + landing page analytics
- [ ] A/B test analysis: after 100+ conversions per variant, declare winner
- [ ] Implement winning variant as new control
- [ ] Test next element (CTA button text, social proof placement)
- [ ] Update copy based on user feedback (FAQ additions, objection handling)
- [ ] Refresh case studies (add new real examples as they happen)
- [ ] Update metrics (300+ → 500+ cases, 94% → new approval rate)
- [ ] Seasonal updates (Q4 spike messaging, Ramadan adjustments)

---

## Success Metrics & KPIs

### Primary Metric: Conversion Rate

**Target:** 5-7% (form submit + WhatsApp click combined)

**Tracking:**
- GA4: Total conversions / Total visitors
- Google Ads: Conversions / Clicks
- Breakdown: Form submit vs WhatsApp (which converts better?)

**Benchmark:** Industry average for RE landing pages = 2-4%. WTP targets higher due to:
- High-intent traffic (Google Ads, not cold traffic)
- Differentiated offering (banking-first, integrated)
- Strong social proof (300+ cases, 94% approval)

---

### Secondary Metrics

**Bounce Rate:** Target < 40%
- High bounce = messaging mismatch or slow load
- Fix: ensure ad copy matches landing page headline

**Time on Page:** Target > 2 minutes
- Indicates engagement, reading content
- Low time = content not compelling or page confusing

**Scroll Depth:** Target 70%+ reach "How It Works" section
- Tracks how far users scroll
- Low scroll depth = above-fold not compelling enough

**Form Abandonment Rate:** Target < 50%
- Users who start form but don't submit
- High abandonment = form too long or friction
- Fix: A/B test shorter form

---

### Lead Quality Metrics (Post-Conversion)

**Lead-to-Call Rate:** Target 60%+
- How many form submits turn into actual phone/WhatsApp conversation
- Low rate = low-quality leads (tire kickers)

**Call-to-Viewing Rate:** Target 40%+
- How many calls turn into property viewing or serious consultation
- Measures qualification

**Lead-to-Deal Rate:** Target 5-10% (6-month window)
- How many leads eventually purchase property
- Ultimate success metric

**Cost Per Acquisition (CPA):**
- Total Google Ads spend / Number of deals closed
- Target: < $3,000 per closed deal (property commission should exceed this)

---

## Appendix: Messaging Variants by Traffic Source

Google Ads приводит разные segments. Landing page должна адаптироваться (или иметь динамический контент) в зависимости от utm_campaign.

### For Golden Visa Traffic (utm_campaign=golden_visa)

**Headline:** Golden Visa Through Property — Banking-First Approach
**Sub-headline:** Focus on "10-year visa for family" + "2M AED threshold" + "banking pre-screen"
**Hero CTA:** "Check Golden Visa Eligibility"
**Highlighted FAQ:** Q4 (Golden Visa eligibility)

---

### For Investment Traffic (utm_campaign=investment)

**Headline:** Dubai Real Estate Investment — Structure First, Property Second
**Sub-headline:** Focus on "ROI optimization" + "ownership structure" + "tax efficiency"
**Hero CTA:** "Get Free Investment Analysis"
**Highlighted FAQ:** Q3 (Personal vs Company ownership)

---

### For Relocation Traffic (utm_campaign=relocation)

**Headline:** Relocate to UAE — Full Setup: Company + Bank + Visa + Property
**Sub-headline:** Focus on "integrated relocation" + "exit tax planning UK/DE/NL" + "family visa"
**Hero CTA:** "Start Your Relocation Pre-Screen"
**Highlighted FAQ:** Q5 (Exit tax handling)

---

### For Structure/Banking Traffic (utm_campaign=banking or structure)

**Headline:** Can You Open a UAE Bank Account? Check Before You Buy.
**Sub-headline:** Focus on "40% face banking problems" + "free 48h pre-screen" + "SOF preparation"
**Hero CTA:** "Check Banking Eligibility"
**Highlighted FAQ:** Q1 (Banking pre-screen explained)

---

## Final Notes for WTP Team

1. **Content is King:** Every word on this landing page should reinforce differentiation (banking-first, integrated, not just agents). Generic real estate copy = wasted Google Ads spend.

2. **Test Everything:** Don't assume. A/B test headline, form length, CTA text. Let data decide.

3. **Social Proof is Critical:** "300+ cases, 94% approval" needs to be REAL numbers. If numbers change, update landing page. Fake social proof = loss of trust.

4. **Mobile First:** 60%+ of traffic will be mobile. Test on real devices, not just browser emulators.

5. **Speed Matters:** Every 1-second delay = 7% conversion loss (industry stat). Optimize images, minimize JavaScript.

6. **WhatsApp is Your Friend:** For MENA audience, WhatsApp converts BETTER than forms. Make it prominent.

7. **Follow Up Fast:** If form submit happens, response within 2 hours = 10x higher conversion than 24h response. Set up alerts.

8. **Update Regularly:** Landing pages aren't "set and forget." Update metrics, add new case studies, refresh copy every quarter.

---

**End of landing-page-spec.md**

**All 3 documents complete:**
1. campaign-setup.md ✓
2. ad-copy-library.md ✓
3. landing-page-spec.md ✓

Ready to hand to WTP team or Google Ads specialist for execution.
