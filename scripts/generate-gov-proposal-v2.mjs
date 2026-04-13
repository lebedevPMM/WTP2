import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'dist', 'gov-proposal');

// ─── Brand ──────────────────────────────────────────────────────────
const navy = '#1d2951';
const gold = '#c5a55a';
const darkGold = '#a08940';
const lightBg = '#f8f7f4';
const bodyText = '#2c2c2c';
const mutedText = '#666';

const brand = {
  company: 'WTP Brokers',
  email: 'hello@wtpbrokers.com',
  phone: '+971 600 575 294',
  office: 'Dubai, UAE',
  since: 'Since 2019',
  web: 'wtp.ae',
};

// ─── Content ────────────────────────────────────────────────────────

const content = {
  en: {
    cover: {
      tag: 'STRATEGIC PARTNERSHIP PROPOSAL',
      title: 'Defending the UAE\'s Lead\nas the World\'s Premier\nWealth Destination',
      subtitle: 'A Strategic Framework for Compliance-Grade\nExecution Infrastructure to Attract, Qualify,\nand Retain International Capital',
      date: 'March 2026',
      conf: 'CONFIDENTIAL',
    },
    exec: {
      title: 'Executive Summary',
      paragraphs: [
        'WTP Brokers proposes a 90-day pilot programme — at zero financial cost to the government — to demonstrate how compliance-grade execution infrastructure can increase the volume, quality, and retention of HNWI capital entering the UAE. The pilot targets one corridor (UK/Europe), measures results against four KPIs, and includes a clean exit clause if targets are not met.',
        'The strategic context is urgent. The UAE attracted 9,800 HNWIs and an estimated USD 63 billion in investable wealth in 2025, making it the world\'s top destination for millionaire migration. Yet Saudi Arabia\'s inflows surged eightfold in a single year (300 to 2,400), Singapore now hosts over 1,400 single-family offices, and the FATF fifth-round mutual evaluation is scheduled for June 2026.',
        'Today, 30% of qualified HNWI applicants are rejected by UAE banks due to inadequate documentation or compliance gaps — not because they lack legitimate wealth, but because no systematic pre-qualification infrastructure exists. This represents billions in capital that arrives at the UAE\'s doorstep and is turned away. WTP\'s Banking-First methodology solves this by pre-screening every case before it enters the financial system.',
        'This document presents the opportunity, the competitive landscape, two operational case studies, the partnership model, and a concrete 90-day pilot roadmap with measurable success criteria.',
      ],
    },
    opportunity: {
      title: 'The Global Opportunity',
      intro: 'The largest global wealth migration in recorded history is underway. In 2025, 142,000 millionaires relocated internationally — a figure projected to reach 165,000 in 2026. This is not cyclical but structural: driven by simultaneous tax reform, regulatory pressure, and geopolitical realignment across multiple continents.',
      stats: [
        { number: '142,000', label: 'millionaires relocated globally in 2025', source: 'Henley Private Wealth Migration Report 2025' },
        { number: '#1', label: 'UAE ranking for net HNWI inflows worldwide', source: 'Henley 2025' },
        { number: '$63B', label: 'estimated investable wealth brought to UAE in 2025', source: 'Henley 2025 (USD 63B ÷ 9,800 HNWIs = ~$6.4M avg.)' },
        { number: '200,000+', label: 'Golden Visas issued since 2019', source: 'UAE Government, ICA' },
      ],
      drivers: {
        title: 'Source Market Dynamics',
        text: 'Five source markets are simultaneously generating unprecedented HNWI outflows toward the UAE:',
        items: [
          { market: 'United Kingdom', detail: 'Over 10,000 millionaires departed in 2024 (+157% YoY). Non-dom abolition effective April 2025. Projected 16,500 outflows in 2025 — the largest single-country exodus ever recorded.' },
          { market: 'Continental Europe', detail: 'Germany\'s Wegzugsteuer expanded to ETFs/funds above EUR 500,000. Netherlands Box 3 reform uncertainty driving capital flight. France wealth tax causing first-ever net millionaire losses.' },
          { market: 'India', detail: 'The largest single source of HNWI inflows to the UAE (~31% of total). Driven by succession planning, asset diversification, and geographic proximity.' },
          { market: 'Mainland China', detail: 'Net loss of 7,800 millionaires in 2025. Capital diversification and asset protection strategies accelerating outflows to neutral jurisdictions.' },
          { market: 'Africa', detail: 'Fastest-growing structural corridor: HNWIs seek stable banking, dollar-linked assets, and neutral jurisdictions for multi-geography operations.' },
        ],
      },
    },
    challenge: {
      title: 'The Strategic Challenge',
      intro: 'Despite its dominant position, the UAE faces three converging pressures that require proactive action — and a fourth, often overlooked, operational gap:',
      challenges: [
        {
          title: 'Rising Competition',
          text: 'Saudi Arabia\'s HNWI inflow surged from 300 to 2,400 in a single year — an eightfold increase. The mandatory regional HQ decree could redirect up to USD 5 billion annually. Singapore now hosts 1,400+ single-family offices with streamlined onboarding. The UAE\'s lead is real but not permanent.',
        },
        {
          title: 'The FATF Timeline',
          text: 'The UAE exited the FATF grey list in February 2024 and was removed from the EU high-risk third countries list in July 2025. The fifth-round mutual evaluation is scheduled for June 2026. Demonstrating systematic screening of wealth inflows — not merely facilitating them — is essential for maintaining the clean bill of health.',
        },
        {
          title: 'The Banking Gap',
          text: 'Today, approximately 30% of qualified HNWI applicants are rejected by UAE banks — not due to illegitimate wealth, but due to inadequate documentation, unclear source-of-funds narratives, or missing compliance paperwork. Among 27,000+ registered agents in Dubai, none offer systematic banking pre-qualification. This gap costs the UAE billions in diverted capital annually.',
        },
        {
          title: 'Scaling Quality',
          text: 'Growing HNWI volume without proportional compliance infrastructure creates reputational risk. The challenge is ensuring every relocation is structured, documented, and FATF-audit-ready. Ad hoc relocation services cannot deliver this at scale.',
        },
      ],
      comparison: {
        title: 'Competitive Landscape',
        headers: ['Capability', 'UAE (Current)', 'Saudi Arabia', 'Singapore'],
        rows: [
          ['Net HNWI Inflow (2025)', '9,800 (#1)', '2,400 (8x growth)', '3,500 (stable)'],
          ['Family Office Infrastructure', 'DIFC + ADGM', 'KAFD (emerging)', '1,400+ SFOs'],
          ['Execution Partner Ecosystem', 'Fragmented', 'Government-led', 'MAS-regulated'],
          ['Banking Pre-Qualification', 'None systematic', 'N/A', 'Bank-led'],
          ['FATF Status', 'Clean (Feb 2024)', 'Clean', 'Clean'],
        ],
      },
    },
    alignment: {
      title: 'Capability Alignment with UAE National Priorities',
      intro: 'WTP Brokers operates a Banking-First execution platform since 2019, designed to systematically attract, qualify, and retain international wealth. The platform\'s eight service categories map directly to three UAE government priorities:',
      dimensions: [
        {
          title: 'Capital Attraction (We the UAE 2031 / D33)',
          icon: '1',
          services: [
            { name: 'Corporate & Premium Banking', impact: 'Every onboarded HNWI opens accounts, deposits capital, and establishes financial relationships with UAE institutions — contributing to the AED 240B FDI target.' },
            { name: 'Company Formation', impact: 'Free zone and mainland registrations generate trade licenses, employment, and cross-emirate economic activity aligned with D33\'s AED 32T cumulative target.' },
            { name: 'Real Estate', impact: 'Property investment contributes to the 200,000+ annual RE transactions and qualifies buyers for Golden Visa residency (AED 2M+ threshold).' },
          ],
        },
        {
          title: 'Compliance Readiness (FATF 2026)',
          icon: '2',
          services: [
            { name: 'Pre-Screen Assessment', impact: 'Every case undergoes KYC/AML screening, source of funds verification, and beneficial ownership analysis before entering the UAE financial system. Response SLA: 4-hour acknowledgment, 5–7 day pre-screen.' },
            { name: 'Risk Classification', impact: 'Transparent GREEN / YELLOW / RED system: ~30% of cases are declined or flagged. Full audit trail maintained for regulatory inspection.' },
            { name: 'Tax Residency & Substance', impact: 'Verification of real office, staff, and operational activity ensures economic substance — not paper relocations that undermine FATF credibility.' },
          ],
        },
        {
          title: 'Retention & Lifecycle Value',
          icon: '3',
          services: [
            { name: 'Accounting & Compliance', impact: 'Ongoing bookkeeping, VAT/corporate tax filing, and audit support keep HNWIs operationally active — generating sustained tax revenue (9% corporate tax).' },
            { name: 'Wealth & Estate Protection', impact: 'Wills, family office structures, and DIFC foundations encourage intergenerational wealth transfer within the UAE — estimated AED 3.67T regional pipeline.' },
            { name: 'Visa & Residency', impact: 'Golden Visa processing, work permits, and Emirates ID create legal ties that anchor HNWIs long-term, reducing capital flight risk.' },
          ],
        },
      ],
    },
    campaign: {
      title: 'Operational Evidence',
      intro: 'Two anonymized case studies demonstrating how the Banking-First methodology works in practice — one approved, one declined:',
      caseStudies: [
        {
          verdict: 'APPROVED',
          title: 'European Tech Entrepreneur',
          profile: 'UK-based founder, post-exit. USD 8M+ liquid assets. Seeking UAE tax residency, company formation, and banking.',
          challenge: 'Three UAE banks had previously rejected the application due to incomplete source-of-funds documentation and unclear beneficial ownership structure.',
          process: 'WTP pre-screen identified documentation gaps. Prepared comprehensive compliance package: source-of-funds narrative, corporate structure diagram, tax clearance certificates. Submitted to two banks simultaneously.',
          result: 'Corporate account opened within 12 business days. Company formed in DMCC. Golden Visa secured. Total capital deployed in UAE: USD 4.2M (real estate + operating capital).',
          timeline: '47 days end-to-end',
        },
        {
          verdict: 'DECLINED',
          title: 'Trading Company — CIS Region',
          profile: 'Commodity trading business. Requested mainland company formation and corporate banking.',
          challenge: 'Complex multi-jurisdictional corporate structure with 6 entities across 4 countries. Ultimate beneficial owner had indirect exposure to a sanctioned jurisdiction.',
          process: 'WTP pre-screen flagged YELLOW (elevated risk). Deep-dive analysis confirmed indirect links to restricted entities. Risk classification upgraded to RED.',
          result: 'Case declined at pre-screen stage. The client never entered the UAE banking system. No reputational exposure for UAE financial institutions.',
          timeline: 'Declined in 8 days',
        },
      ],
      concept: {
        title: 'Joint Campaign Concept',
        tagline: '"Your Next Chapter Starts in the UAE"',
        text: 'A multi-channel campaign targeting professional advisors (family offices, tax consultants, private bankers, law firms) and qualified end-clients across five corridors: UK/Europe, South Asia, East Asia, Africa, and the Middle East.',
      },
      elements: [
        { title: 'Government Endorsement', text: 'Official co-branding with UAE authority (e.g., Dubai DET, Abu Dhabi Investment Office, ADGM). Conveys institutional trust — the single most important factor for HNWI decision-making.' },
        { title: 'Content & Thought Leadership', text: 'Joint market intelligence reports and policy briefs on wealth migration. Positions the UAE as the knowledge leader in global capital flows, not just a destination.' },
        { title: 'International Roadshows', text: 'Co-hosted events in London, Frankfurt, Mumbai, Singapore, Nairobi. WTP provides operational substance and case evidence; government provides institutional prestige and credibility.' },
        { title: 'Digital & Performance', text: 'Targeted campaigns in Financial Times, Bloomberg, The Economist with co-branded landing pages. Performance marketing to pre-qualified audiences with measurable ROI.' },
      ],
      model: {
        title: 'Partnership Model',
        items: [
          { what: 'What WTP Provides (at zero cost to government)', points: [
            'End-to-end execution platform: 8 service categories, Banking-First pre-qualification',
            'Compliance infrastructure: KYC/AML screening, risk classification, full audit trail',
            'Multilingual team with expertise across 5+ international corridors',
            'Active partner network: European family offices, tax advisors, law firms, private bankers',
            'Marketing infrastructure: 5 localized landing pages, content strategy, CRM pipeline',
            'Quarterly aggregate reporting on wealth migration patterns and conversion metrics',
          ]},
          { what: 'What We Request (non-financial)', points: [
            'Official endorsement or letter of support from relevant UAE government authority',
            'Inclusion in government-sponsored investment promotion events and delegations',
            'Introduction to relevant departments (DET, ADIO, DIFC Authority, ADGM)',
            'Access to government marketing channels for co-branded content distribution',
            'Collaborative data framework: anonymized aggregate reporting on HNWI inflow quality',
          ]},
        ],
      },
    },
    impact: {
      title: 'Projected Economic Impact',
      intro: 'Conservative estimates based on verified public data sources:',
      metrics: [
        { metric: 'Average investable wealth per HNWI', value: '~USD 6.4M', source: 'USD 63B ÷ 9,800 HNWIs (Henley 2025)' },
        { metric: 'UAE FDI target by 2031', value: 'AED 240B/year', source: 'We the UAE 2031 Vision (from AED 115B)' },
        { metric: 'Dubai D33 cumulative target', value: 'AED 32 trillion', source: 'Dubai Economic Agenda D33' },
        { metric: 'Dubai RE transactions (annual)', value: '200,000+ / AED 231B+', source: 'DLD 2025, 60-65% foreign buyers' },
        { metric: 'MENA wealth management (2031)', value: 'USD 1.36 trillion', source: 'GlobeNewsWire Market Report 2026-2031' },
        { metric: 'Intergenerational transfer pipeline', value: 'AED 3.67 trillion', source: 'Regional family office estimates' },
      ],
      multiplier: {
        title: 'Per-HNWI Economic Multiplier',
        text: 'Each systematically onboarded HNWI generates cascading economic value:',
        layers: [
          'Real estate transaction (AED 2M+ for Golden Visa qualification)',
          'Company formation: trade license fees, EJARI, establishment card',
          'Banking deposits, credit facilities, and wealth product uptake',
          'Government fees: visa, Emirates ID, medical, insurance',
          'Consumption spending: education, healthcare, hospitality, automotive',
          'Employment creation: staff, management, professional advisory',
          'Tax revenue: 9% corporate tax on qualifying profits, 5% VAT',
        ],
      },
      precedents: {
        title: 'International Precedents',
        text: 'Several governments have successfully used public-private execution partnerships to attract qualified wealth:',
        items: [
          { country: 'Singapore (EDB)', detail: 'Economic Development Board partners with licensed service providers to onboard family offices. Result: 1,400+ single-family offices, fastest growth in Asia.' },
          { country: 'Malta (IIP/RES)', detail: 'Government contracted licensed agents as exclusive application processors. Built-in compliance layer reduced reputational risk while scaling inflows.' },
          { country: 'UK (DBT)', detail: 'Department for Business and Trade works with accredited partners for inward investment. Systematic lead qualification before government resources are deployed.' },
        ],
      },
    },
    about: {
      title: 'About WTP Brokers',
      items: [
        { label: 'Founded', value: '2019, Dubai, UAE' },
        { label: 'Methodology', value: 'Banking-First: every case pre-qualified before company formation' },
        { label: 'Cases Assessed', value: '350+ since inception' },
        { label: 'Decline Rate', value: '~30% (quality filtration — protecting UAE financial system)' },
        { label: 'Service Coverage', value: '8 categories: Banking, Company Formation, Visa, Tax Residency, Accounting, Real Estate, Wealth Protection, Pre-Screen' },
        { label: 'SLA', value: '4-hour acknowledgment, 5–7 day pre-screen completion' },
        { label: 'Languages', value: 'English, Russian, Arabic (partner network)' },
        { label: 'Partner Network', value: 'European family offices, tax advisors, law firms, private bankers across 5+ corridors' },
      ],
      closing: 'WTP Brokers operates at the intersection of capital attraction, compliance infrastructure, and execution — precisely where the UAE\'s strategic ambitions require operational capacity.',
    },
    nextSteps: {
      title: '90-Day Pilot Roadmap',
      steps: [
        { num: '01', title: 'Alignment Meeting', text: 'Present this proposal. Define scope, co-branding parameters, and reporting framework. Identify government liaison. Timeline: Week 1–2.' },
        { num: '02', title: 'Pilot Launch (UK/Europe)', text: 'Activate one corridor. WTP processes inbound leads with full compliance workflow. Government endorsement applied to marketing materials. Timeline: Week 3–12.' },
        { num: '03', title: 'Mid-Pilot Review (Day 45)', text: 'Review KPIs: leads qualified, cases processed, banking success rate, average capital deployed. Adjust corridor targeting if needed.' },
        { num: '04', title: 'Pilot Report & Decision', text: 'Comprehensive results report with anonymized case data. Go/No-Go decision on expansion to additional corridors. Clean exit clause: either party can discontinue with 14-day notice.' },
      ],
      kpis: [
        { metric: 'Qualified leads processed', target: '25+' },
        { metric: 'Banking approval rate (post-WTP pre-screen)', target: '>85%' },
        { metric: 'Average capital deployed per approved case', target: '>USD 2M' },
        { metric: 'Compliance documentation completeness', target: '100%' },
      ],
      risks: [
        { risk: 'Reputational association with rejected cases', mitigation: 'Government branding appears only on approved cases. WTP absorbs all pre-screen rejections internally.', severity: 'LOW' },
        { risk: 'FATF evaluation timing conflict', mitigation: 'Pilot generates audit-ready documentation that strengthens the UAE\'s FATF narrative, not weakens it.', severity: 'LOW' },
        { risk: 'Pilot underperformance', mitigation: 'Clean exit clause at Day 90. No financial commitment from government. All data and learnings remain available.', severity: 'MEDIUM' },
      ],
      closing: 'This pilot requires zero financial investment from the government. WTP bears all operational costs. The government contributes endorsement and access — and receives a proven, compliance-grade execution model that strengthens the UAE\'s position ahead of FATF 2026.',
    },
    contact: {
      title: 'Contact',
    },
    footer: '© 2026 WTP Brokers. This document is confidential and intended for the named recipient only.',
    sourceNote: 'Data sources: Henley Private Wealth Migration Report 2025, "We the UAE 2031" Vision, Dubai Economic Agenda D33, DIFC Authority, ADGM, GlobeNewsWire MENA Wealth Management Market Report 2026-2031.',
  },

  ru: {
    cover: {
      tag: 'СТРАТЕГИЧЕСКОЕ ПРЕДЛОЖЕНИЕ О ПАРТНЁРСТВЕ',
      title: 'Укрепление лидерства ОАЭ\nкак ведущего мирового\nцентра привлечения капитала',
      subtitle: 'Стратегическая основа для построения\nисполнительной инфраструктуры\nпривлечения и удержания капитала',
      date: 'Март 2026',
      conf: 'КОНФИДЕНЦИАЛЬНО',
    },
    exec: {
      title: 'Краткое резюме',
      paragraphs: [
        'WTP Brokers предлагает 90-дневную пилотную программу — без финансовых затрат для государства — для демонстрации того, как комплаенс-инфраструктура исполнения может увеличить объём, качество и удержание капитала HNWI, поступающего в ОАЭ. Пилот нацелен на один коридор (Великобритания/Европа), измеряет результаты по четырём KPI и включает чистую exit-клаузу при недостижении целей.',
        'Стратегический контекст требует действий. ОАЭ привлекли 9 800 HNWI и приблизительно 63 млрд долларов инвестируемого капитала в 2025 году, заняв первое место в мире. Однако приток HNWI в Саудовскую Аравию вырос в 8 раз за год (с 300 до 2 400), Сингапур насчитывает более 1 400 семейных офисов, а пятая взаимная оценка FATF запланирована на июнь 2026 года.',
        'Сегодня около 30% квалифицированных заявителей-HNWI получают отказ от банков ОАЭ — не из-за незаконности капитала, а из-за неполной документации или пробелов в комплаенс-нарративе. Среди 27 000+ зарегистрированных агентов в Дубае ни один не предлагает системную банковскую преквалификацию. Методология Banking-First от WTP решает эту проблему, проводя полную проверку каждого кейса до входа в финансовую систему.',
        'Данный документ представляет возможность, конкурентный ландшафт, два операционных кейса, модель партнёрства и конкретную 90-дневную пилотную дорожную карту с измеримыми критериями успеха.',
      ],
    },
    opportunity: {
      title: 'Глобальная возможность',
      intro: 'Крупнейшая глобальная миграция капитала в истории набирает обороты. В 2025 году 142 000 миллионеров сменили страну проживания — прогноз на 2026 год: 165 000. Это не циклический, а структурный тренд — одновременные налоговые реформы, регуляторное давление и геополитические сдвиги на нескольких континентах.',
      stats: [
        { number: '142 000', label: 'миллионеров сменили страну проживания в 2025 г.', source: 'Henley Private Wealth Migration Report 2025' },
        { number: '№1', label: 'ОАЭ — мировой лидер по чистому притоку HNWI', source: 'Henley 2025' },
        { number: '$63 млрд', label: 'капитал, привлечённый в ОАЭ в 2025 г. (~$6,4 млн на HNWI)', source: 'Henley 2025' },
        { number: '200 000+', label: 'Golden Visa выданы с 2019 года', source: 'Правительство ОАЭ, ICA' },
      ],
      drivers: {
        title: 'Динамика ключевых рынков',
        text: 'Пять исходных рынков одновременно генерируют беспрецедентный отток HNWI в направлении ОАЭ:',
        items: [
          { market: 'Великобритания', detail: 'Свыше 10 000 миллионеров уехали в 2024 г. (+157% YoY). Отмена non-dom с апреля 2025 г. Прогноз: 16 500 — крупнейший исход из одной страны в истории.' },
          { market: 'Континентальная Европа', detail: 'Wegzugsteuer Германии расширен на ETF/фонды свыше EUR 500 000. Реформа Box 3 в Нидерландах. Впервые чистый отток миллионеров из Франции.' },
          { market: 'Индия', detail: 'Крупнейший источник притока HNWI в ОАЭ (~31% от общего объёма). Планирование наследования, диверсификация активов, географическая близость.' },
          { market: 'Материковый Китай', detail: 'Чистая потеря 7 800 миллионеров в 2025 г. Стратегии диверсификации капитала и защиты активов ускоряют отток в нейтральные юрисдикции.' },
          { market: 'Африка', detail: 'Наиболее быстрорастущий структурный коридор: стабильный банкинг, долларовые активы, нейтральные юрисдикции для мультигеографических операций.' },
        ],
      },
    },
    challenge: {
      title: 'Стратегический вызов',
      intro: 'Несмотря на доминирующую позицию, ОАЭ сталкиваются с тремя давлениями, требующими проактивных действий, — и четвёртым, часто недооценённым, операционным разрывом:',
      challenges: [
        {
          title: 'Растущая конкуренция',
          text: 'Приток HNWI в Саудовскую Аравию вырос с 300 до 2 400 за один год — в 8 раз. Требование обязательных региональных штаб-квартир может перенаправить до $5 млрд ежегодно. Сингапур насчитывает 1 400+ семейных офисов с отлаженным онбордингом. Лидерство ОАЭ реально, но не вечно.',
        },
        {
          title: 'Таймлайн FATF',
          text: 'ОАЭ вышли из серого списка FATF в феврале 2024 года и из списка высокого риска ЕС в июле 2025 года. Пятая взаимная оценка запланирована на июнь 2026 года. Демонстрация системной проверки притока капитала — а не просто содействия — критична для сохранения чистого статуса.',
        },
        {
          title: 'Банковский разрыв',
          text: 'Сегодня ~30% квалифицированных заявителей-HNWI получают отказ от банков ОАЭ — не из-за незаконности капитала, а из-за неполной документации или слабого комплаенс-нарратива. Среди 27 000+ зарегистрированных агентов в Дубае ни один не предлагает системную банковскую преквалификацию. Это стоит ОАЭ миллиардов отвергнутого капитала ежегодно.',
        },
        {
          title: 'Масштабирование качества',
          text: 'Рост объёма HNWI без пропорциональной комплаенс-инфраструктуры создаёт репутационные риски. Задача — обеспечить, что каждая релокация структурирована, задокументирована и готова к аудиту FATF. Разрозненные сервисы не способны обеспечить это в масштабе.',
        },
      ],
      comparison: {
        title: 'Конкурентный ландшафт',
        headers: ['Параметр', 'ОАЭ (текущее)', 'Саудовская Аравия', 'Сингапур'],
        rows: [
          ['Чистый приток HNWI (2025)', '9 800 (№1)', '2 400 (рост в 8 раз)', '3 500 (стабильно)'],
          ['Инфраструктура семейных офисов', 'DIFC + ADGM', 'KAFD (формируется)', '1 400+ SFO'],
          ['Экосистема исполнительных партнёров', 'Фрагментирована', 'Госуправляемая', 'Регулируется MAS'],
          ['Банковская преквалификация', 'Отсутствует системно', 'Нет данных', 'Управляется банками'],
          ['Статус FATF', 'Чистый (фев. 2024)', 'Чистый', 'Чистый'],
        ],
      },
    },
    alignment: {
      title: 'Соответствие национальным приоритетам ОАЭ',
      intro: 'WTP Brokers управляет платформой исполнения Banking-First с 2019 года, спроектированной для системного привлечения, квалификации и удержания международного капитала. Восемь категорий услуг напрямую соответствуют трём государственным приоритетам:',
      dimensions: [
        {
          title: 'Привлечение капитала (We the UAE 2031 / D33)',
          icon: '1',
          services: [
            { name: 'Корпоративный и премиум-банкинг', impact: 'Каждый HNWI открывает счета, размещает капитал и устанавливает финансовые связи с институтами ОАЭ — вклад в цель FDI AED 240 млрд/год.' },
            { name: 'Регистрация компаний', impact: 'Свободные зоны и mainland — торговые лицензии, занятость, кросс-эмиратная экономическая активность в рамках кумулятивной цели D33 (AED 32 трлн).' },
            { name: 'Недвижимость', impact: 'Вклад в 200 000+ ежегодных сделок RE и квалификация на Golden Visa (порог AED 2 млн+).' },
          ],
        },
        {
          title: 'Готовность к комплаенсу (FATF 2026)',
          icon: '2',
          services: [
            { name: 'Pre-Screen оценка', impact: 'KYC/AML скрининг, верификация источника средств, анализ бенефициарного владения до входа в финансовую систему. SLA: подтверждение за 4 часа, pre-screen за 5–7 дней.' },
            { name: 'Система классификации рисков', impact: 'Прозрачная система GREEN / YELLOW / RED: ~30% кейсов отклонены или помечены. Полный аудит-трейл для регуляторной инспекции.' },
            { name: 'Налоговое резидентство и субстанция', impact: 'Верификация реального офиса, персонала и деятельности — экономическая субстанция, не «бумажные» релокации, подрывающие доверие FATF.' },
          ],
        },
        {
          title: 'Удержание и жизненная ценность',
          icon: '3',
          services: [
            { name: 'Бухгалтерия и отчётность', impact: 'Постоянное сопровождение, НДС/корпоративный налог, аудит — HNWI остаются активными и генерируют налоговые поступления (9% корпоративный налог).' },
            { name: 'Защита капитала и наследование', impact: 'Завещания, семейные офисы, фонды DIFC — стимул к межпоколенческой передаче капитала внутри ОАЭ (оценка: AED 3,67 трлн).' },
            { name: 'Виза и резидентство', impact: 'Golden Visa, рабочие визы, Emirates ID — правовые привязки, снижающие риск оттока капитала.' },
          ],
        },
      ],
    },
    campaign: {
      title: 'Операционные доказательства',
      intro: 'Два анонимизированных кейса, демонстрирующих работу методологии Banking-First на практике — один одобренный, один отклонённый:',
      caseStudies: [
        {
          verdict: 'ОДОБРЕН',
          title: 'Европейский технологический предприниматель',
          profile: 'Основатель из Великобритании, post-exit. Ликвидные активы свыше USD 8 млн. Цель: налоговое резидентство, компания, банкинг в ОАЭ.',
          challenge: 'Три банка ОАЭ ранее отказали из-за неполной документации по источнику средств и неясной структуры бенефициарного владения.',
          process: 'Pre-screen WTP выявил пробелы документации. Подготовлен комплексный комплаенс-пакет: нарратив источника средств, диаграмма корпоративной структуры, налоговые сертификаты. Подан в два банка одновременно.',
          result: 'Корпоративный счёт открыт за 12 рабочих дней. Компания зарегистрирована в DMCC. Golden Visa получена. Общий размещённый капитал: USD 4,2 млн (недвижимость + операционный капитал).',
          timeline: '47 дней от начала до конца',
        },
        {
          verdict: 'ОТКЛОНЁН',
          title: 'Торговая компания — регион СНГ',
          profile: 'Торговля сырьевыми товарами. Запрос: mainland компания + корпоративный банкинг.',
          challenge: 'Сложная мультиюрисдикционная корпоративная структура: 6 юр. лиц в 4 странах. Конечный бенефициар имел косвенное присутствие в подсанкционной юрисдикции.',
          process: 'Pre-screen WTP присвоил статус YELLOW (повышенный риск). Углублённый анализ подтвердил косвенные связи с ограниченными субъектами. Статус изменён на RED.',
          result: 'Кейс отклонён на этапе pre-screen. Клиент не вошёл в банковскую систему ОАЭ. Нулевой репутационный риск для финансовых институтов.',
          timeline: 'Отклонён за 8 дней',
        },
      ],
      concept: {
        title: 'Концепция совместной кампании',
        tagline: '«Ваша новая глава начинается в ОАЭ»',
        text: 'Мультиканальная кампания для профессиональных консультантов (семейные офисы, налоговые консультанты, частные банкиры) и квалифицированных конечных клиентов по пяти коридорам: Великобритания/Европа, Южная Азия, Восточная Азия, Африка, Ближний Восток.',
      },
      elements: [
        { title: 'Государственное одобрение', text: 'Ко-брендинг с государственным органом ОАЭ (DET, ADIO, ADGM). Институциональное доверие — главный фактор решений HNWI.' },
        { title: 'Контент и аналитика', text: 'Совместные отчёты о миграции капитала и аналитические материалы. Позиционирование ОАЭ как интеллектуального лидера в глобальных потоках капитала.' },
        { title: 'Международные роудшоу', text: 'Совместные мероприятия в Лондоне, Франкфурте, Мумбаи, Сингапуре, Найроби. WTP — операционная экспертиза и кейсы; государство — институциональный вес.' },
        { title: 'Цифровой перфоманс', text: 'Кампании в Financial Times, Bloomberg, The Economist с ко-брендированными лендингами. Перфоманс-маркетинг для преквалифицированной аудитории с измеримым ROI.' },
      ],
      model: {
        title: 'Модель партнёрства',
        items: [
          { what: 'Что предоставляет WTP (без затрат для государства)', points: [
            'Платформа исполнения: 8 категорий услуг, Banking-First квалификация',
            'Комплаенс-инфраструктура: KYC/AML скрининг, классификация рисков, полный аудит-трейл',
            'Мультиязычная команда с экспертизой по 5+ международным коридорам',
            'Активная партнёрская сеть: европейские семейные офисы, налоговые консультанты, юристы, частные банкиры',
            'Маркетинговая инфраструктура: 5 локализованных лендингов, контент-стратегия, CRM-пайплайн',
            'Квартальная агрегированная отчётность по паттернам миграции капитала и метрикам конверсии',
          ]},
          { what: 'Что мы запрашиваем (нефинансовое)', points: [
            'Официальное одобрение или письмо поддержки от государственного органа ОАЭ',
            'Включение в государственные мероприятия по продвижению инвестиций и делегации',
            'Представление соответствующим департаментам (DET, ADIO, DIFC Authority, ADGM)',
            'Доступ к государственным маркетинговым каналам для ко-брендированного контента',
            'Рамка обмена данными: анонимизированная агрегированная отчётность о качестве притока HNWI',
          ]},
        ],
      },
    },
    impact: {
      title: 'Прогнозируемый экономический эффект',
      intro: 'Консервативные оценки на основе верифицированных открытых источников данных:',
      metrics: [
        { metric: 'Средний инвестируемый капитал на HNWI', value: '~$6,4 млн', source: '$63 млрд ÷ 9 800 HNWI (Henley 2025)' },
        { metric: 'Целевой показатель FDI ОАЭ к 2031 г.', value: 'AED 240 млрд/год', source: 'We the UAE 2031 (с AED 115 млрд)' },
        { metric: 'Кумулятивная цель Dubai D33', value: 'AED 32 трлн', source: 'Dubai Economic Agenda D33' },
        { metric: 'Транзакции RE Дубая (ежегодно)', value: '200 000+ / AED 231 млрд+', source: 'DLD 2025, 60-65% иностранцев' },
        { metric: 'Рынок управления капиталом MENA (2031)', value: '$1,36 трлн', source: 'GlobeNewsWire 2026-2031' },
        { metric: 'Межпоколенческий трансфер капитала', value: 'AED 3,67 трлн', source: 'Оценки региональных семейных офисов' },
      ],
      multiplier: {
        title: 'Экономический мультипликатор на одного HNWI',
        text: 'Каждый системно онбордированный HNWI генерирует каскадную экономическую ценность:',
        layers: [
          'Сделка с недвижимостью (AED 2 млн+ для Golden Visa)',
          'Регистрация компании: лицензия, EJARI, Establishment Card',
          'Банковские депозиты, кредитные линии, инвестиционные продукты',
          'Государственные сборы: виза, Emirates ID, медицина, страховка',
          'Потребительские расходы: образование, медицина, гостеприимство, авто',
          'Создание рабочих мест: персонал, менеджмент, профессиональный консалтинг',
          'Налоговые поступления: 9% корп. налог на квалифицирующую прибыль, 5% НДС',
        ],
      },
      precedents: {
        title: 'Международные прецеденты',
        text: 'Ряд государств успешно используют государственно-частные партнёрства исполнения для привлечения квалифицированного капитала:',
        items: [
          { country: 'Сингапур (EDB)', detail: 'Совет экономического развития партнёрствует с лицензированными провайдерами для онбординга семейных офисов. Результат: 1 400+ SFO, лидер роста в Азии.' },
          { country: 'Мальта (IIP/RES)', detail: 'Правительство привлекло лицензированных агентов как эксклюзивных процессоров заявок. Встроенный комплаенс-уровень снизил репутационные риски при масштабировании.' },
          { country: 'Великобритания (DBT)', detail: 'Департамент бизнеса и торговли работает с аккредитованными партнёрами для входящих инвестиций. Системная квалификация лидов до выделения государственных ресурсов.' },
        ],
      },
    },
    about: {
      title: 'О компании WTP Brokers',
      items: [
        { label: 'Основана', value: '2019, Дубай, ОАЭ' },
        { label: 'Методология', value: 'Banking-First: каждый кейс преквалифицируется до регистрации' },
        { label: 'Оценено кейсов', value: '350+ с момента основания' },
        { label: 'Процент отказов', value: '~30% (защита финансовой системы ОАЭ)' },
        { label: 'Покрытие услуг', value: '8 категорий: Банкинг, Регистрация, Визы, Налоговое резидентство, Бухгалтерия, Недвижимость, Защита капитала, Pre-Screen' },
        { label: 'SLA', value: 'Подтверждение за 4 часа, pre-screen за 5–7 дней' },
        { label: 'Языки', value: 'Английский, русский, арабский (партнёрская сеть)' },
        { label: 'Партнёрская сеть', value: 'Европейские семейные офисы, налоговые консультанты, юристы, частные банкиры по 5+ коридорам' },
      ],
      closing: 'WTP Brokers работает на пересечении привлечения капитала, комплаенс-инфраструктуры и исполнения — именно там, где стратегические амбиции ОАЭ требуют операционной мощности.',
    },
    nextSteps: {
      title: 'Дорожная карта: 90-дневный пилот',
      steps: [
        { num: '01', title: 'Согласительная встреча', text: 'Презентация предложения. Определение масштаба, параметров ко-брендинга и рамки отчётности. Назначение контактного лица. Срок: неделя 1–2.' },
        { num: '02', title: 'Запуск пилота (Великобритания/Европа)', text: 'Активация одного коридора. WTP обрабатывает лиды с полным комплаенс-процессом. Государственное одобрение на маркетинговых материалах. Срок: неделя 3–12.' },
        { num: '03', title: 'Промежуточный обзор (День 45)', text: 'Ревью KPI: лиды квалифицированы, кейсы обработаны, процент банковских одобрений, средний размещённый капитал. Корректировка при необходимости.' },
        { num: '04', title: 'Отчёт и решение', text: 'Полный отчёт с анонимизированными данными кейсов. Решение Go/No-Go о расширении. Exit-клауза: любая сторона может прекратить с уведомлением за 14 дней.' },
      ],
      kpis: [
        { metric: 'Квалифицированных лидов обработано', target: '25+' },
        { metric: 'Банковское одобрение (после pre-screen WTP)', target: '>85%' },
        { metric: 'Средний размещённый капитал на кейс', target: '>$2 млн' },
        { metric: 'Полнота комплаенс-документации', target: '100%' },
      ],
      risks: [
        { risk: 'Репутационная ассоциация с отклонёнными кейсами', mitigation: 'Государственный брендинг применяется только к одобренным кейсам. WTP принимает на себя все отклонения pre-screen.', severity: 'НИЗКИЙ' },
        { risk: 'Конфликт с таймлайном оценки FATF', mitigation: 'Пилот генерирует документацию, готовую к аудиту, — укрепляет нарратив ОАЭ для FATF, а не ослабляет.', severity: 'НИЗКИЙ' },
        { risk: 'Недостаточные показатели пилота', mitigation: 'Exit-клауза на День 90. Нулевые финансовые обязательства государства. Все данные и выводы остаются доступными.', severity: 'СРЕДНИЙ' },
      ],
      closing: 'Этот пилот не требует финансовых инвестиций от государства. WTP несёт все операционные затраты. Государство предоставляет одобрение и доступ — и получает проверенную комплаенс-модель исполнения, укрепляющую позицию ОАЭ перед FATF 2026.',
    },
    contact: {
      title: 'Контакты',
    },
    footer: '© 2026 WTP Brokers. Данный документ является конфиденциальным и предназначен исключительно для указанного получателя.',
    sourceNote: 'Источники данных: Henley Private Wealth Migration Report 2025, «We the UAE 2031» Vision, Dubai Economic Agenda D33, DIFC Authority, ADGM, GlobeNewsWire MENA Wealth Management Market Report 2026-2031.',
  },
};


// ─── HTML Generator ─────────────────────────────────────────────────

function generateHTML(lang) {
  const d = content[lang];
  const isRu = lang === 'ru';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.cover.tag} — WTP Brokers</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --navy: ${navy};
    --gold: ${gold};
    --dark-gold: ${darkGold};
    --light-bg: ${lightBg};
    --body: ${bodyText};
    --muted: ${mutedText};
  }

  @page {
    size: A4 portrait;
    margin: 0;
  }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    color: var(--body);
    background: #fff;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 28mm 24mm;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }
  .page:last-child { page-break-after: auto; }

  /* ─── Cover ─── */
  .cover {
    background: var(--navy);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40mm 28mm;
  }
  .cover::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -15%;
    width: 60%;
    height: 80%;
    background: radial-gradient(ellipse, rgba(197,165,90,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .cover-tag {
    font-size: 11px;
    letter-spacing: 3.5px;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 24px;
    text-transform: uppercase;
  }
  .cover-title {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 20px;
    white-space: pre-line;
    max-width: 440px;
  }
  .cover-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.7);
    line-height: 1.65;
    white-space: pre-line;
    max-width: 400px;
    margin-bottom: 48px;
  }
  .cover-meta {
    display: flex;
    gap: 32px;
    align-items: center;
    margin-top: auto;
    padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.15);
  }
  .cover-brand {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .cover-date {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
  }
  .cover-conf {
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--gold);
    margin-left: auto;
  }

  /* ─── Section Headers ─── */
  .section-num {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--gold);
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 16px;
    line-height: 1.3;
  }
  .section-intro {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 24px;
    max-width: 520px;
  }

  /* ─── Exec Summary ─── */
  .exec-text {
    font-size: 12.5px;
    line-height: 1.75;
    margin-bottom: 14px;
    text-align: justify;
    hyphens: auto;
  }
  .exec-text:first-of-type::first-letter {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 600;
    color: var(--navy);
    float: left;
    line-height: 1;
    margin-right: 8px;
    margin-top: 4px;
  }

  /* ─── Stats Grid ─── */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }
  .stat-card {
    background: var(--light-bg);
    border-left: 3px solid var(--gold);
    padding: 16px 18px;
    border-radius: 0 6px 6px 0;
  }
  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .stat-label {
    font-size: 11px;
    color: var(--body);
    line-height: 1.4;
  }
  .stat-source {
    font-size: 9px;
    color: var(--muted);
    margin-top: 4px;
    font-style: italic;
  }

  /* ─── Drivers ─── */
  .drivers-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 6px;
  }
  .drivers-intro {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 14px;
  }
  .driver-item {
    margin-bottom: 10px;
    padding-left: 14px;
    border-left: 2px solid var(--gold);
  }
  .driver-market {
    font-size: 12px;
    font-weight: 600;
    color: var(--navy);
  }
  .driver-detail {
    font-size: 11px;
    color: var(--muted);
    line-height: 1.5;
  }

  /* ─── Challenges ─── */
  .challenge-card {
    background: var(--light-bg);
    padding: 18px 20px;
    border-radius: 6px;
    margin-bottom: 14px;
  }
  .challenge-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 6px;
  }
  .challenge-text {
    font-size: 11.5px;
    color: var(--body);
    line-height: 1.6;
  }

  /* ─── Alignment ─── */
  .dimension {
    margin-bottom: 20px;
  }
  .dimension-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .dimension-icon {
    width: 28px;
    height: 28px;
    background: var(--navy);
    color: var(--gold);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .dimension-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--navy);
  }
  .service-row {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
    padding-left: 38px;
  }
  .service-name {
    font-size: 11px;
    font-weight: 600;
    color: var(--body);
    min-width: 140px;
    flex-shrink: 0;
  }
  .service-impact {
    font-size: 11px;
    color: var(--muted);
    line-height: 1.5;
  }

  /* ─── Campaign ─── */
  .campaign-concept {
    background: var(--navy);
    color: #fff;
    padding: 22px 24px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .campaign-tagline {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: var(--gold);
    margin-bottom: 8px;
  }
  .campaign-text {
    font-size: 12px;
    color: rgba(255,255,255,0.75);
    line-height: 1.6;
  }
  .element-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 24px;
  }
  .element-card {
    padding: 14px 16px;
    border: 1px solid #e8e6e1;
    border-radius: 6px;
  }
  .element-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 6px;
  }
  .element-text {
    font-size: 10.5px;
    color: var(--muted);
    line-height: 1.55;
  }

  /* ─── Partnership Model ─── */
  .model-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .model-col {
    padding: 18px;
    border-radius: 6px;
  }
  .model-col:first-child {
    background: var(--light-bg);
  }
  .model-col:last-child {
    background: var(--navy);
    color: #fff;
  }
  .model-heading {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }
  .model-col:last-child .model-heading {
    color: var(--gold);
  }
  .model-point {
    font-size: 11px;
    line-height: 1.55;
    margin-bottom: 6px;
    padding-left: 14px;
    position: relative;
  }
  .model-point::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--gold);
    font-weight: 600;
  }
  .model-col:last-child .model-point {
    color: rgba(255,255,255,0.8);
  }

  /* ─── Impact ─── */
  .metrics-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 24px;
  }
  .metrics-table th {
    text-align: left;
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--muted);
    text-transform: uppercase;
    padding: 8px 12px;
    border-bottom: 2px solid var(--navy);
  }
  .metrics-table td {
    font-size: 11.5px;
    padding: 10px 12px;
    border-bottom: 1px solid #eee;
    vertical-align: top;
  }
  .metrics-table td:nth-child(2) {
    font-weight: 600;
    color: var(--navy);
    white-space: nowrap;
  }
  .metrics-table td:nth-child(3) {
    font-size: 10px;
    color: var(--muted);
    font-style: italic;
  }
  .multiplier-box {
    background: var(--light-bg);
    padding: 18px 20px;
    border-radius: 6px;
  }
  .multiplier-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 6px;
  }
  .multiplier-text {
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 10px;
  }
  .multiplier-item {
    font-size: 11px;
    color: var(--body);
    padding: 4px 0 4px 16px;
    position: relative;
    line-height: 1.5;
  }
  .multiplier-item::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--gold);
    font-weight: 600;
  }

  /* ─── About ─── */
  .about-grid {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 0;
    margin-bottom: 20px;
  }
  .about-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--navy);
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
  .about-value {
    font-size: 11px;
    color: var(--body);
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    line-height: 1.5;
  }
  .about-closing {
    font-size: 12px;
    color: var(--muted);
    line-height: 1.7;
    font-style: italic;
    margin-top: 16px;
  }

  /* ─── Next Steps ─── */
  .steps-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  .step-card {
    padding: 18px 20px;
    border-radius: 6px;
    border: 1px solid #e8e6e1;
    position: relative;
  }
  .step-num {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--gold);
    opacity: 0.4;
    position: absolute;
    top: 10px;
    right: 14px;
  }
  .step-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 6px;
  }
  .step-text {
    font-size: 11px;
    color: var(--muted);
    line-height: 1.55;
  }

  /* ─── Closing / Contact ─── */
  .closing-text {
    font-size: 13px;
    color: var(--body);
    line-height: 1.7;
    margin-bottom: 32px;
    max-width: 480px;
  }
  .contact-box {
    background: var(--navy);
    color: #fff;
    padding: 24px 28px;
    border-radius: 8px;
    margin-bottom: 24px;
  }
  .contact-brand {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 14px;
    letter-spacing: 0.5px;
  }
  .contact-row {
    display: flex;
    gap: 40px;
    margin-bottom: 6px;
  }
  .contact-label {
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--gold);
    min-width: 60px;
  }
  .contact-value {
    font-size: 12px;
    color: rgba(255,255,255,0.85);
  }

  /* ─── Footer ─── */
  .page-footer {
    position: absolute;
    bottom: 14mm;
    left: 24mm;
    right: 24mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-text {
    font-size: 8px;
    color: #bbb;
  }
  .footer-page {
    font-size: 8px;
    color: #bbb;
  }

  .source-note {
    font-size: 9px;
    color: var(--muted);
    line-height: 1.5;
    margin-top: 20px;
    padding-top: 12px;
    border-top: 1px solid #eee;
    font-style: italic;
  }

  .gold-line {
    width: 40px;
    height: 3px;
    background: var(--gold);
    margin-bottom: 20px;
    border-radius: 2px;
  }

  /* ─── Comparison Table ─── */
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-bottom: 16px;
  }
  .comparison-table th {
    text-align: left;
    font-size: 9.5px;
    letter-spacing: 1px;
    color: #fff;
    background: var(--navy);
    text-transform: uppercase;
    padding: 8px 10px;
  }
  .comparison-table th:first-child {
    border-radius: 4px 0 0 0;
  }
  .comparison-table th:last-child {
    border-radius: 0 4px 0 0;
  }
  .comparison-table td {
    font-size: 10.5px;
    padding: 7px 10px;
    border-bottom: 1px solid #eee;
    vertical-align: top;
    line-height: 1.4;
  }
  .comparison-table td:first-child {
    font-weight: 600;
    color: var(--navy);
    min-width: 120px;
  }
  .comparison-table tr:nth-child(even) td {
    background: var(--light-bg);
  }

  /* ─── Case Studies ─── */
  .case-study-card {
    border: 1px solid #e8e6e1;
    border-radius: 8px;
    padding: 18px 20px;
    margin-bottom: 16px;
    position: relative;
  }
  .case-study-card.approved {
    border-left: 4px solid #2e7d32;
  }
  .case-study-card.declined {
    border-left: 4px solid #c62828;
  }
  .case-verdict {
    font-size: 9px;
    letter-spacing: 2px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 3px;
    display: inline-block;
    margin-bottom: 8px;
  }
  .case-verdict.approved {
    background: #e8f5e9;
    color: #2e7d32;
  }
  .case-verdict.declined {
    background: #ffebee;
    color: #c62828;
  }
  .case-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 8px;
  }
  .case-row {
    display: flex;
    gap: 6px;
    margin-bottom: 4px;
  }
  .case-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--navy);
    min-width: 70px;
    flex-shrink: 0;
  }
  .case-value {
    font-size: 10px;
    color: var(--muted);
    line-height: 1.45;
  }
  .case-timeline {
    font-size: 9px;
    color: var(--gold);
    font-weight: 600;
    margin-top: 6px;
    letter-spacing: 0.5px;
  }

  /* ─── KPI Table ─── */
  .kpi-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
  }
  .kpi-table th {
    text-align: left;
    font-size: 9.5px;
    letter-spacing: 1.5px;
    color: var(--muted);
    text-transform: uppercase;
    padding: 6px 10px;
    border-bottom: 2px solid var(--navy);
  }
  .kpi-table td {
    font-size: 11px;
    padding: 8px 10px;
    border-bottom: 1px solid #eee;
  }
  .kpi-table td:last-child {
    font-weight: 600;
    color: var(--navy);
    text-align: right;
  }

  /* ─── Risk Register ─── */
  .risk-register {
    margin-bottom: 16px;
  }
  .risk-item {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
    padding: 10px 12px;
    background: var(--light-bg);
    border-radius: 4px;
    align-items: flex-start;
  }
  .risk-severity {
    font-size: 8px;
    letter-spacing: 1px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 2px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .risk-severity.low { background: #e8f5e9; color: #2e7d32; }
  .risk-severity.medium { background: #fff3e0; color: #e65100; }
  .risk-content {
    flex: 1;
  }
  .risk-name {
    font-size: 10.5px;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 2px;
  }
  .risk-mitigation {
    font-size: 10px;
    color: var(--muted);
    line-height: 1.4;
  }

  /* ─── Precedents ─── */
  .precedent-box {
    background: var(--light-bg);
    padding: 16px 18px;
    border-radius: 6px;
    margin-bottom: 16px;
  }
  .precedent-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .precedent-text {
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 10px;
  }
  .precedent-item {
    margin-bottom: 8px;
    padding-left: 14px;
    border-left: 2px solid var(--gold);
  }
  .precedent-country {
    font-size: 11px;
    font-weight: 600;
    color: var(--navy);
  }
  .precedent-detail {
    font-size: 10px;
    color: var(--muted);
    line-height: 1.45;
  }
</style>
</head>
<body>

<!-- ═══ PAGE 1: COVER ═══ -->
<div class="page cover">
  <div class="cover-tag">${d.cover.tag}</div>
  <h1 class="cover-title">${d.cover.title}</h1>
  <p class="cover-subtitle">${d.cover.subtitle}</p>
  <div class="cover-meta">
    <span class="cover-brand">${brand.company}</span>
    <span class="cover-date">${d.cover.date}</span>
    <span class="cover-conf">${d.cover.conf}</span>
  </div>
</div>

<!-- ═══ PAGE 2: EXECUTIVE SUMMARY ═══ -->
<div class="page">
  <div class="section-num">01</div>
  <div class="section-title">${d.exec.title}</div>
  <div class="gold-line"></div>
  ${d.exec.paragraphs.map(p => `<p class="exec-text">${p}</p>`).join('\n  ')}
  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">2</span>
  </div>
</div>

<!-- ═══ PAGE 3: THE OPPORTUNITY ═══ -->
<div class="page">
  <div class="section-num">02</div>
  <div class="section-title">${d.opportunity.title}</div>
  <div class="gold-line"></div>
  <p class="section-intro">${d.opportunity.intro}</p>

  <div class="stats-grid">
    ${d.opportunity.stats.map(s => `
    <div class="stat-card">
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
      <div class="stat-source">${s.source}</div>
    </div>`).join('')}
  </div>

  <div class="drivers-title">${d.opportunity.drivers.title}</div>
  <p class="drivers-intro">${d.opportunity.drivers.text}</p>
  ${d.opportunity.drivers.items.map(i => `
  <div class="driver-item">
    <div class="driver-market">${i.market}</div>
    <div class="driver-detail">${i.detail}</div>
  </div>`).join('')}

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">3</span>
  </div>
</div>

<!-- ═══ PAGE 4: THE CHALLENGE + COMPARISON ═══ -->
<div class="page">
  <div class="section-num">03</div>
  <div class="section-title">${d.challenge.title}</div>
  <div class="gold-line"></div>
  <p class="section-intro">${d.challenge.intro}</p>

  ${d.challenge.challenges.map(c => `
  <div class="challenge-card">
    <div class="challenge-title">${c.title}</div>
    <div class="challenge-text">${c.text}</div>
  </div>`).join('')}

  ${d.challenge.comparison ? `
  <table class="comparison-table">
    <thead>
      <tr>${d.challenge.comparison.headers.map(h => `<th>${h}</th>`).join('')}</tr>
    </thead>
    <tbody>
      ${d.challenge.comparison.rows.map(row => `
      <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
    </tbody>
  </table>` : ''}

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">4</span>
  </div>
</div>

<!-- ═══ PAGE 5: ALIGNMENT ═══ -->
<div class="page">
  <div class="section-num">04</div>
  <div class="section-title">${d.alignment.title}</div>
  <div class="gold-line"></div>
  <p class="section-intro">${d.alignment.intro}</p>

  ${d.alignment.dimensions.map(dim => `
  <div class="dimension">
    <div class="dimension-header">
      <div class="dimension-icon">${dim.icon}</div>
      <div class="dimension-title">${dim.title}</div>
    </div>
    ${dim.services.map(s => `
    <div class="service-row">
      <div class="service-name">${s.name}</div>
      <div class="service-impact">${s.impact}</div>
    </div>`).join('')}
  </div>`).join('')}

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">5</span>
  </div>
</div>

<!-- ═══ PAGE 6: CASE STUDIES + CAMPAIGN ═══ -->
<div class="page">
  <div class="section-num">05</div>
  <div class="section-title">${d.campaign.title}</div>
  <div class="gold-line"></div>
  <p class="section-intro">${d.campaign.intro}</p>

  ${d.campaign.caseStudies ? d.campaign.caseStudies.map(cs => `
  <div class="case-study-card ${cs.verdict === 'APPROVED' || cs.verdict === 'ОДОБРЕН' ? 'approved' : 'declined'}">
    <div class="case-verdict ${cs.verdict === 'APPROVED' || cs.verdict === 'ОДОБРЕН' ? 'approved' : 'declined'}">${cs.verdict}</div>
    <div class="case-title">${cs.title}</div>
    <div class="case-row"><span class="case-label">${isRu ? 'Профиль' : 'Profile'}:</span><span class="case-value">${cs.profile}</span></div>
    <div class="case-row"><span class="case-label">${isRu ? 'Проблема' : 'Challenge'}:</span><span class="case-value">${cs.challenge}</span></div>
    <div class="case-row"><span class="case-label">${isRu ? 'Процесс' : 'Process'}:</span><span class="case-value">${cs.process}</span></div>
    <div class="case-row"><span class="case-label">${isRu ? 'Результат' : 'Result'}:</span><span class="case-value">${cs.result}</span></div>
    <div class="case-timeline">${cs.timeline}</div>
  </div>`).join('') : ''}

  <div style="height: 16px;"></div>

  <div class="campaign-concept">
    <div class="campaign-tagline">${d.campaign.concept.tagline}</div>
    <div class="campaign-text">${d.campaign.concept.text}</div>
  </div>

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">6</span>
  </div>
</div>

<!-- ═══ PAGE 7: CAMPAIGN ELEMENTS + PARTNERSHIP MODEL ═══ -->
<div class="page">
  <div class="section-num">06</div>
  <div class="section-title">${isRu ? 'Совместная кампания и партнёрство' : 'Joint Campaign & Partnership'}</div>
  <div class="gold-line"></div>

  <div class="element-grid">
    ${d.campaign.elements.map(e => `
    <div class="element-card">
      <div class="element-title">${e.title}</div>
      <div class="element-text">${e.text}</div>
    </div>`).join('')}
  </div>

  <div style="height: 16px;"></div>

  <div class="section-num">07</div>
  <div class="section-title">${d.campaign.model.title}</div>
  <div class="gold-line"></div>

  <div class="model-columns">
    ${d.campaign.model.items.map(col => `
    <div class="model-col">
      <div class="model-heading">${col.what}</div>
      ${col.points.map(p => `<div class="model-point">${p}</div>`).join('\n      ')}
    </div>`).join('')}
  </div>

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">7</span>
  </div>
</div>

<!-- ═══ PAGE 8: IMPACT + PRECEDENTS ═══ -->
<div class="page">
  <div class="section-num">08</div>
  <div class="section-title">${d.impact.title}</div>
  <div class="gold-line"></div>
  <p class="section-intro">${d.impact.intro}</p>

  <table class="metrics-table">
    <thead>
      <tr>
        <th>${isRu ? 'Показатель' : 'Metric'}</th>
        <th>${isRu ? 'Значение' : 'Value'}</th>
        <th>${isRu ? 'Источник' : 'Source'}</th>
      </tr>
    </thead>
    <tbody>
      ${d.impact.metrics.map(m => `
      <tr>
        <td>${m.metric}</td>
        <td>${m.value}</td>
        <td>${m.source}</td>
      </tr>`).join('')}
    </tbody>
  </table>

  <div class="multiplier-box">
    <div class="multiplier-title">${d.impact.multiplier.title}</div>
    <div class="multiplier-text">${d.impact.multiplier.text}</div>
    ${d.impact.multiplier.layers.map(l => `<div class="multiplier-item">${l}</div>`).join('\n    ')}
  </div>

  ${d.impact.precedents ? `
  <div style="height: 16px;"></div>
  <div class="precedent-box">
    <div class="precedent-title">${d.impact.precedents.title}</div>
    <div class="precedent-text">${d.impact.precedents.text}</div>
    ${d.impact.precedents.items.map(p => `
    <div class="precedent-item">
      <div class="precedent-country">${p.country}</div>
      <div class="precedent-detail">${p.detail}</div>
    </div>`).join('')}
  </div>` : ''}

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">8</span>
  </div>
</div>

<!-- ═══ PAGE 9: ABOUT + PILOT ROADMAP ═══ -->
<div class="page">
  <div class="section-num">09</div>
  <div class="section-title">${d.about.title}</div>
  <div class="gold-line"></div>

  <div class="about-grid">
    ${d.about.items.map(i => `
    <div class="about-label">${i.label}</div>
    <div class="about-value">${i.value}</div>`).join('')}
  </div>
  <p class="about-closing">${d.about.closing}</p>

  <div style="height: 20px;"></div>

  <div class="section-num">10</div>
  <div class="section-title">${d.nextSteps.title}</div>
  <div class="gold-line"></div>

  <div class="steps-grid">
    ${d.nextSteps.steps.map(s => `
    <div class="step-card">
      <div class="step-num">${s.num}</div>
      <div class="step-title">${s.title}</div>
      <div class="step-text">${s.text}</div>
    </div>`).join('')}
  </div>

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">9</span>
  </div>
</div>

<!-- ═══ PAGE 10: KPIs + RISKS + CONTACT ═══ -->
<div class="page">
  ${d.nextSteps.kpis ? `
  <div class="section-num">${isRu ? 'KPI ПИЛОТА' : 'PILOT KPIs'}</div>
  <div class="section-title">${isRu ? 'Критерии успеха' : 'Success Criteria'}</div>
  <div class="gold-line"></div>
  <table class="kpi-table">
    <thead>
      <tr>
        <th>${isRu ? 'Показатель' : 'Metric'}</th>
        <th>${isRu ? 'Цель' : 'Target'}</th>
      </tr>
    </thead>
    <tbody>
      ${d.nextSteps.kpis.map(k => `
      <tr>
        <td>${k.metric}</td>
        <td>${k.target}</td>
      </tr>`).join('')}
    </tbody>
  </table>` : ''}

  ${d.nextSteps.risks ? `
  <div style="height: 12px;"></div>
  <div class="drivers-title">${isRu ? 'Реестр рисков и митигации' : 'Risk Register & Mitigations'}</div>
  <div style="height: 8px;"></div>
  <div class="risk-register">
    ${d.nextSteps.risks.map(r => `
    <div class="risk-item">
      <div class="risk-severity ${r.severity === 'LOW' || r.severity === 'НИЗКИЙ' ? 'low' : 'medium'}">${r.severity}</div>
      <div class="risk-content">
        <div class="risk-name">${r.risk}</div>
        <div class="risk-mitigation">${r.mitigation}</div>
      </div>
    </div>`).join('')}
  </div>` : ''}

  <p class="closing-text">${d.nextSteps.closing}</p>

  <div class="contact-box">
    <div class="contact-brand">${brand.company}</div>
    <div class="contact-row">
      <span class="contact-label">EMAIL</span>
      <span class="contact-value">${brand.email}</span>
    </div>
    <div class="contact-row">
      <span class="contact-label">PHONE</span>
      <span class="contact-value">${brand.phone}</span>
    </div>
    <div class="contact-row">
      <span class="contact-label">WEB</span>
      <span class="contact-value">${brand.web}</span>
    </div>
    <div class="contact-row">
      <span class="contact-label">${isRu ? 'ОФИС' : 'OFFICE'}</span>
      <span class="contact-value">${brand.office}</span>
    </div>
  </div>

  <div class="source-note">${d.sourceNote}</div>

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">10</span>
  </div>
</div>

</body>
</html>`;
}


// ─── Main ───────────────────────────────────────────────────────────

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });

  for (const lang of ['en', 'ru']) {
    const html = generateHTML(lang);
    const htmlPath = path.join(outDir, `gov-proposal-${lang}.html`);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`✓ HTML: ${htmlPath}`);

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // PDF
    const pdfPath = path.join(outDir, `WTP-Government-Partnership-Proposal-v2-${lang.toUpperCase()}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    console.log(`✓ PDF: ${pdfPath}`);

    // PNG preview (first page)
    await page.setViewport({ width: 794, height: 1123 });
    const pngPath = path.join(outDir, `WTP-Government-Partnership-Proposal-v2-${lang.toUpperCase()}-preview.png`);
    await page.screenshot({ path: pngPath, fullPage: false });
    console.log(`✓ PNG: ${pngPath}`);

    await page.close();
  }

  await browser.close();
  console.log('\n✅ Government Partnership Proposal — EN + RU generated!');
  console.log(`   Output: ${outDir}`);
}

main().catch(err => { console.error(err); process.exit(1); });
