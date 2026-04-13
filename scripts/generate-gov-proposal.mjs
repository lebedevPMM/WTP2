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
      title: 'Accelerating the UAE\'s\nPosition as the World\'s\nPremier Wealth Destination',
      subtitle: 'A Public-Private Initiative to Attract, Qualify,\nand Retain International Capital',
      date: 'March 2026',
      conf: 'CONFIDENTIAL',
    },
    exec: {
      title: 'Executive Summary',
      paragraphs: [
        'The UAE has achieved an extraordinary milestone: it is now the world\'s number one destination for millionaire migration, attracting 9,800 high-net-worth individuals (HNWIs) and an estimated USD 63 billion in investable wealth in 2025 alone. This success directly advances the "We the UAE 2031" Vision, the Dubai D33 Agenda, and Abu Dhabi\'s economic diversification strategy.',
        'However, this position is not guaranteed. Saudi Arabia\'s HNWI inflows increased eightfold in a single year, and Singapore continues to sharpen its family office proposition. To maintain and extend its lead, the UAE needs more than infrastructure — it needs scalable, compliance-grade execution partners who can systematically source, qualify, and onboard international wealth.',
        'WTP Brokers proposes a strategic public-private collaboration to jointly promote the UAE as a premier wealth destination across key international corridors. Through a co-branded marketing campaign supported by WTP\'s end-to-end execution platform, we can increase the volume and quality of HNWI inflows while strengthening the UAE\'s compliance narrative ahead of the 2026 FATF evaluation.',
        'This document outlines the strategic rationale, the partnership model, and the projected economic impact of this initiative.',
      ],
    },
    opportunity: {
      title: 'The Global Opportunity',
      intro: 'We are witnessing the largest global wealth migration in history. In 2025, 142,000 millionaires relocated internationally — and 2026 projections indicate 165,000. This is a structural trend driven by tax reform, regulatory pressure, and geopolitical realignment across multiple continents simultaneously.',
      stats: [
        { number: '142,000', label: 'millionaires relocated globally in 2025', source: 'Henley Private Wealth Migration Report 2025' },
        { number: '#1', label: 'UAE ranking for net HNWI inflows worldwide', source: 'Henley 2025' },
        { number: '$63B', label: 'estimated investable wealth brought to UAE in 2025', source: 'Henley 2025' },
        { number: '165,000', label: 'projected global relocations in 2026', source: 'Henley 2025 forecast' },
      ],
      drivers: {
        title: 'Source Market Dynamics',
        text: 'Multiple source markets are simultaneously generating unprecedented HNWI outflows:',
        items: [
          { market: 'United Kingdom', detail: 'Projected loss of 16,500 millionaires in 2025 — the largest single-country outflow ever recorded — driven by non-dom abolition and fiscal policy changes.' },
          { market: 'Mainland China', detail: 'Net loss of 7,800 millionaires in 2025, reflecting ongoing capital diversification and asset protection strategies.' },
          { market: 'India', detail: 'The largest single source of HNWI inflows to the UAE (approximately 31%), driven by succession planning, diversification, and proximity.' },
          { market: 'Continental Europe', detail: 'France, Germany, and the Netherlands showing net millionaire losses for the first time, driven by wealth tax reform and regulatory uncertainty.' },
          { market: 'Africa', detail: 'The fastest-growing structural corridor: HNWIs seek stable banking, dollar-linked assets, and neutral jurisdictions for multi-geography operations.' },
        ],
      },
    },
    challenge: {
      title: 'The Strategic Challenge',
      intro: 'Despite its dominant position, the UAE faces three converging pressures that require proactive action:',
      challenges: [
        {
          title: 'Rising Competition',
          text: 'Saudi Arabia\'s HNWI inflow surged from 300 to 2,400 in a single year — an eightfold increase. The mandatory regional headquarters decree could redirect up to USD 5 billion in annual corporate investments away from the UAE. Singapore continues to refine its family office and wealth management proposition. The UAE\'s lead is real but not permanent.',
        },
        {
          title: 'Compliance Expectations',
          text: 'The UAE exited the FATF grey list in February 2024 and was removed from the EU high-risk third countries list in July 2025. However, the critical fifth-round FATF mutual evaluation is scheduled for June 2026. Demonstrating that wealth inflows are systematically screened and documented — not merely facilitated — is essential for maintaining the UAE\'s reputation as a world-class financial centre.',
        },
        {
          title: 'Scaling Quality',
          text: 'Increasing the volume of HNWI inflows without proportional compliance infrastructure creates risk. The challenge is not just attracting more wealth, but ensuring every relocation is structured, documented, and sustainable. Ad hoc relocation services cannot deliver this at scale.',
        },
      ],
    },
    alignment: {
      title: 'How WTP Serves UAE National Interests',
      intro: 'WTP Brokers is a UAE-based execution partner providing end-to-end services for international HNWIs and their professional advisors. Operating since 2019 with a Banking-First methodology, the platform directly addresses the UAE\'s goals across three dimensions:',
      dimensions: [
        {
          title: 'Capital Attraction',
          icon: '→',
          services: [
            { name: 'Corporate & Premium Banking', impact: 'Every HNWI we onboard opens bank accounts, deposits capital, and establishes financial relationships with UAE institutions.' },
            { name: 'Company Formation', impact: 'Free zone and mainland registrations generate trade licenses, employment, and economic activity across emirates.' },
            { name: 'Real Estate', impact: 'Property investment directly contributes to the AED 231B+ annual transaction volume and qualifies buyers for Golden Visa residency.' },
          ],
        },
        {
          title: 'Compliance & Quality',
          icon: '→',
          services: [
            { name: 'Pre-Screen Assessment', impact: 'Every case undergoes KYC/AML screening, source of funds verification, and beneficial ownership analysis before entering the UAE financial system.' },
            { name: 'Risk Verdict System', impact: 'Transparent GO / NO-GO / Conditional classification: approximately 30% of cases are declined, ensuring only qualified individuals proceed.' },
            { name: 'Tax Residency & Substance', impact: 'Verification of real office, staff, and operational activity ensures economic substance — not paper relocations.' },
          ],
        },
        {
          title: 'Retention & Lifecycle',
          icon: '→',
          services: [
            { name: 'Accounting & Compliance', impact: 'Ongoing bookkeeping, VAT/corporate tax filing, and audit support keep HNWIs compliant and operationally active in the UAE.' },
            { name: 'Wealth & Estate Protection', impact: 'Wills, family office structures, and foundations encourage long-term commitment and intergenerational wealth transfer within the UAE.' },
            { name: 'Visa & Residency', impact: 'Golden Visa processing, work visas, and Emirates ID issuance create legal ties that anchor HNWIs to the UAE.' },
          ],
        },
      ],
    },
    campaign: {
      title: 'The Joint Marketing Initiative',
      intro: 'We propose a co-branded marketing campaign that positions the UAE as the definitive wealth destination — with WTP serving as the official execution partner for qualified HNWIs.',
      concept: {
        title: 'Campaign Concept',
        tagline: '"Your Next Chapter Starts in the UAE"',
        text: 'A multi-channel, multi-market campaign targeting professional advisors (family offices, tax consultants, private bankers, law firms) and qualified end-clients across five key corridors: Europe, South Asia, East Asia, Africa, and the Middle East.',
      },
      elements: [
        { title: 'Government Endorsement', text: 'Official co-branding with UAE government or relevant authority (e.g., Dubai Department of Economy and Tourism, Abu Dhabi Investment Office). Conveys trust, legitimacy, and institutional backing.' },
        { title: 'Content & Thought Leadership', text: 'Joint research publications, market intelligence reports, and policy briefs on wealth migration trends. Positions the UAE as the knowledge leader, not just a destination.' },
        { title: 'International Roadshows', text: 'Co-hosted events in London, Frankfurt, Mumbai, Singapore, and Nairobi targeting professional advisors and family offices. WTP provides the operational substance; government provides the institutional prestige.' },
        { title: 'Digital & Media', text: 'Targeted campaigns in financial and legal publications (Financial Times, Bloomberg, The Economist) with co-branded landing pages. Performance marketing to qualified audiences.' },
      ],
      model: {
        title: 'Partnership Model',
        items: [
          { what: 'What WTP Provides', points: [
            'End-to-end execution platform covering 8 service categories',
            'Banking-First pre-qualification ensuring compliance-grade onboarding',
            'Multilingual team with deep expertise across 5+ international corridors',
            'Existing partner network: European family offices, tax advisors, law firms',
            'Marketing infrastructure: 5 landing pages, content strategy, CRM',
            'Aggregate data on wealth migration patterns and service demand',
          ]},
          { what: 'What We Request', points: [
            'Official endorsement or co-branding from relevant UAE government authority',
            'Inclusion in government-sponsored investment promotion activities',
            'Introduction to relevant government stakeholders and departments',
            'Access to government marketing channels and event platforms',
            'Collaborative framework for data sharing on HNWI inflows and economic impact',
          ]},
        ],
      },
    },
    impact: {
      title: 'Projected Economic Impact',
      intro: 'Based on publicly available data from Henley Global, UAE government sources, and market research:',
      metrics: [
        { metric: 'Average investable wealth per migrating HNWI', value: '~USD 6.4 million', source: 'USD 63B ÷ 9,800 HNWIs (Henley 2025)' },
        { metric: 'UAE target: FDI increase by 2031', value: 'AED 115B → 240B annually', source: 'We the UAE 2031 Vision' },
        { metric: 'Dubai D33 cumulative target', value: 'AED 32 trillion over the decade', source: 'Dubai Economic Agenda D33' },
        { metric: 'DIFC family offices + AUM', value: '120 offices, USD 1.2 trillion', source: 'DIFC Authority 2025' },
        { metric: 'MENA wealth management market (2031)', value: 'USD 1.36 trillion', source: 'GlobeNewsWire 2026' },
        { metric: 'Intergenerational transfer pipeline', value: 'AED 3.67 trillion', source: 'Regional family office estimates' },
      ],
      multiplier: {
        title: 'Per-HNWI Economic Multiplier',
        text: 'Each successfully relocated HNWI generates value across multiple economic layers:',
        layers: [
          'Real estate transaction (AED 2M+ for Golden Visa qualification)',
          'Company formation fees, trade licenses, and ongoing compliance',
          'Banking deposits and financial product uptake',
          'Visa and government service fees',
          'Consumption spending (education, healthcare, hospitality)',
          'Employment creation (staff, management, advisory)',
          'Tax revenue (9% corporate tax on qualifying profits)',
        ],
      },
    },
    about: {
      title: 'About WTP Brokers',
      items: [
        { label: 'Founded', value: '2019, Dubai, UAE' },
        { label: 'Methodology', value: 'Banking-First: pre-qualification before registration' },
        { label: 'Cases Assessed', value: '350+ since inception' },
        { label: 'Decline Rate', value: '~30% (quality filtration)' },
        { label: 'Service Coverage', value: '8 categories: Banking, Company Formation, Visa, Tax Residency, Accounting, Real Estate, Wealth Protection, Pre-Screen' },
        { label: 'Languages', value: 'English, Russian, Arabic (partner network)' },
        { label: 'Partner Network', value: 'European family offices, tax advisors, law firms, private bankers' },
        { label: 'Awards', value: 'ALDAR Honours (2023), SOBHA Stars (2023), Binghatti Top Broker (2023)' },
      ],
      closing: 'WTP Brokers operates at the intersection of wealth management, compliance, and execution — precisely where the UAE\'s ambitions meet the practical needs of relocating HNWIs.',
    },
    nextSteps: {
      title: 'Proposed Next Steps',
      steps: [
        { num: '01', title: 'Introductory Meeting', text: 'Present this proposal to relevant stakeholders. Discuss scope, alignment, and mutual expectations.' },
        { num: '02', title: 'Feasibility Assessment', text: 'Joint working group to define the partnership framework, co-branding guidelines, and pilot scope.' },
        { num: '03', title: 'Pilot Campaign', text: 'Launch a focused pilot in one corridor (e.g., UK/Europe) to validate the model and measure results.' },
        { num: '04', title: 'Scale & Expand', text: 'Based on pilot outcomes, expand to additional corridors with full co-branded campaign.' },
      ],
      closing: 'We welcome the opportunity to discuss how WTP Brokers can serve as a strategic execution partner in advancing the UAE\'s position as the world\'s premier wealth destination.',
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
      title: 'Укрепление позиции ОАЭ\nкак мирового центра\nпривлечения капитала',
      subtitle: 'Государственно-частная инициатива по привлечению,\nквалификации и удержанию международного капитала',
      date: 'Март 2026',
      conf: 'КОНФИДЕНЦИАЛЬНО',
    },
    exec: {
      title: 'Краткое резюме',
      paragraphs: [
        'ОАЭ достигли выдающегося результата: страна стала направлением №1 в мире по притоку состоятельных лиц (HNWI) — 9 800 миллионеров и приблизительно 63 млрд долларов инвестируемого капитала только в 2025 году. Этот успех напрямую продвигает цели «We the UAE 2031», Dubai D33 и стратегию экономической диверсификации Абу-Даби.',
        'Однако эта позиция не гарантирована. Приток HNWI в Саудовскую Аравию вырос в 8 раз за один год, а Сингапур продолжает совершенствовать свою инфраструктуру для семейных офисов. Чтобы сохранить и расширить лидерство, ОАЭ нужны не только инфраструктурные инвестиции — нужны масштабируемые исполнительные партнёры с высокими стандартами комплаенса, способные системно привлекать, квалифицировать и сопровождать международный капитал.',
        'WTP Brokers предлагает стратегическое государственно-частное сотрудничество для совместного продвижения ОАЭ как ведущего мирового направления для размещения капитала. Через ко-брендированную маркетинговую кампанию, подкреплённую исполнительной платформой WTP, мы можем увеличить объём и качество притока HNWI, одновременно укрепляя комплаенс-нарратив ОАЭ в преддверии оценки FATF 2026 года.',
        'Настоящий документ описывает стратегическое обоснование, модель партнёрства и прогнозируемый экономический эффект инициативы.',
      ],
    },
    opportunity: {
      title: 'Глобальная возможность',
      intro: 'Мы наблюдаем крупнейшую в истории глобальную миграцию капитала. В 2025 году 142 000 миллионеров сменили страну проживания — и прогноз на 2026 год составляет 165 000. Это структурный тренд, обусловленный налоговыми реформами, регуляторным давлением и геополитическими изменениями на нескольких континентах одновременно.',
      stats: [
        { number: '142 000', label: 'миллионеров сменили страну проживания в 2025 г.', source: 'Henley Private Wealth Migration Report 2025' },
        { number: '№1', label: 'ОАЭ — мировой лидер по чистому притоку HNWI', source: 'Henley 2025' },
        { number: '$63 млрд', label: 'оценочный объём капитала, привлечённого в ОАЭ в 2025 г.', source: 'Henley 2025' },
        { number: '165 000', label: 'прогноз глобальных релокаций на 2026 г.', source: 'Прогноз Henley 2025' },
      ],
      drivers: {
        title: 'Динамика ключевых рынков',
        text: 'Множество рынков одновременно генерируют беспрецедентный отток HNWI:',
        items: [
          { market: 'Великобритания', detail: 'Прогнозируемая потеря 16 500 миллионеров в 2025 г. — крупнейший в истории отток из одной страны — на фоне отмены статуса non-dom и фискальных реформ.' },
          { market: 'Материковый Китай', detail: 'Чистая потеря 7 800 миллионеров в 2025 г. как следствие стратегий диверсификации капитала и защиты активов.' },
          { market: 'Индия', detail: 'Крупнейший источник притока HNWI в ОАЭ (приблизительно 31%) — планирование наследования, диверсификация, географическая близость.' },
          { market: 'Континентальная Европа', detail: 'Франция, Германия и Нидерланды впервые демонстрируют чистый отток миллионеров на фоне реформ налога на состояние и регуляторной неопределённости.' },
          { market: 'Африка', detail: 'Наиболее быстрорастущий структурный коридор: HNWI ищут стабильный банкинг, долларовые активы и нейтральные юрисдикции для мультигеографических операций.' },
        ],
      },
    },
    challenge: {
      title: 'Стратегический вызов',
      intro: 'Несмотря на доминирующую позицию, ОАЭ сталкиваются с тремя сходящимися давлениями, требующими проактивных действий:',
      challenges: [
        {
          title: 'Растущая конкуренция',
          text: 'Приток HNWI в Саудовскую Аравию вырос с 300 до 2 400 за один год — в 8 раз. Требование об обязательных региональных штаб-квартирах может перенаправить до 5 млрд долларов ежегодных корпоративных инвестиций из ОАЭ. Сингапур продолжает совершенствовать свою инфраструктуру для управления капиталом. Лидерство ОАЭ реально, но не вечно.',
        },
        {
          title: 'Требования комплаенса',
          text: 'ОАЭ вышли из серого списка FATF в феврале 2024 года и были исключены из списка стран высокого риска ЕС в июле 2025 года. Однако в июне 2026 года запланирована критическая пятая взаимная оценка FATF. Демонстрация того, что приток капитала системно проверяется и документируется — а не просто содействуется — критична для репутации ОАЭ как финансового центра мирового уровня.',
        },
        {
          title: 'Масштабирование качества',
          text: 'Увеличение объёма притока HNWI без пропорциональной комплаенс-инфраструктуры создаёт риски. Задача не просто привлечь больше капитала, а обеспечить, что каждая релокация структурирована, задокументирована и устойчива. Разрозненные релокационные сервисы не способны обеспечить это в масштабе.',
        },
      ],
    },
    alignment: {
      title: 'Как WTP служит национальным интересам ОАЭ',
      intro: 'WTP Brokers — исполнительный партнёр в ОАЭ, предоставляющий комплексные услуги для международных HNWI и их профессиональных консультантов. Работая с 2019 года по методологии Banking-First, платформа напрямую отвечает целям ОАЭ по трём измерениям:',
      dimensions: [
        {
          title: 'Привлечение капитала',
          icon: '→',
          services: [
            { name: 'Корпоративный и премиум-банкинг', impact: 'Каждый клиент открывает банковские счета, размещает капитал и устанавливает финансовые отношения с институтами ОАЭ.' },
            { name: 'Регистрация компаний', impact: 'Регистрации в свободных зонах и на mainland генерируют торговые лицензии, занятость и экономическую активность.' },
            { name: 'Недвижимость', impact: 'Инвестиции в недвижимость вносят вклад в годовой объём транзакций AED 231 млрд+ и квалифицируют покупателей на Golden Visa.' },
          ],
        },
        {
          title: 'Комплаенс и качество',
          icon: '→',
          services: [
            { name: 'Pre-Screen оценка', impact: 'Каждый кейс проходит KYC/AML скрининг, верификацию источника средств и анализ бенефициарного владения до входа в финансовую систему ОАЭ.' },
            { name: 'Система вердиктов', impact: 'Прозрачная классификация GO / NO-GO / Условный: ~30% кейсов получают отказ, обеспечивая прохождение только квалифицированных клиентов.' },
            { name: 'Налоговое резидентство и субстанция', impact: 'Верификация реального офиса, персонала и операционной деятельности обеспечивает экономическую субстанцию — не «бумажные» релокации.' },
          ],
        },
        {
          title: 'Удержание и жизненный цикл',
          icon: '→',
          services: [
            { name: 'Бухгалтерия и отчётность', impact: 'Постоянное бухгалтерское обслуживание, подача НДС/корпоративного налога и аудит обеспечивают активную операционную деятельность HNWI в ОАЭ.' },
            { name: 'Защита капитала и наследование', impact: 'Завещания, семейные офисы и фонды стимулируют долгосрочное закрепление и межпоколенческую передачу капитала внутри ОАЭ.' },
            { name: 'Виза и резидентство', impact: 'Оформление Golden Visa, рабочих виз и Emirates ID создаёт правовые связи, закрепляющие HNWI в ОАЭ.' },
          ],
        },
      ],
    },
    campaign: {
      title: 'Совместная маркетинговая инициатива',
      intro: 'Мы предлагаем ко-брендированную маркетинговую кампанию, позиционирующую ОАЭ как ведущее направление для размещения капитала — с WTP как официальным исполнительным партнёром для квалифицированных HNWI.',
      concept: {
        title: 'Концепция кампании',
        tagline: '«Ваша новая глава начинается в ОАЭ»',
        text: 'Мультиканальная, мультирыночная кампания, нацеленная на профессиональных консультантов (семейные офисы, налоговых консультантов, частных банкиров, юридические фирмы) и квалифицированных конечных клиентов по пяти коридорам: Европа, Южная Азия, Восточная Азия, Африка и Ближний Восток.',
      },
      elements: [
        { title: 'Государственное одобрение', text: 'Официальный ко-брендинг с государственным органом ОАЭ (например, Департамент экономики и туризма Дубая, Инвестиционный офис Абу-Даби). Транслирует доверие, легитимность и институциональную поддержку.' },
        { title: 'Контент и экспертиза', text: 'Совместные исследования, отчёты о рынке и аналитические материалы о трендах миграции капитала. Позиционирует ОАЭ как интеллектуального лидера, а не только как направление.' },
        { title: 'Международные роудшоу', text: 'Совместные мероприятия в Лондоне, Франкфурте, Мумбаи, Сингапуре и Найроби для профессиональных консультантов и семейных офисов. WTP обеспечивает операционную экспертизу; государство — институциональный вес.' },
        { title: 'Цифровой маркетинг и медиа', text: 'Таргетированные кампании в финансовых и юридических изданиях (Financial Times, Bloomberg, The Economist) с ко-брендированными лендингами. Перфоманс-маркетинг для квалифицированной аудитории.' },
      ],
      model: {
        title: 'Модель партнёрства',
        items: [
          { what: 'Что предоставляет WTP', points: [
            'Комплексная исполнительная платформа по 8 категориям услуг',
            'Banking-First квалификация, обеспечивающая комплаенс-стандарт онбординга',
            'Мультиязычная команда с глубокой экспертизой по 5+ международным коридорам',
            'Действующая партнёрская сеть: европейские семейные офисы, налоговые консультанты, юридические фирмы',
            'Маркетинговая инфраструктура: 5 лендингов, контент-стратегия, CRM',
            'Агрегированные данные о паттернах миграции капитала и спросе на услуги',
          ]},
          { what: 'Что мы запрашиваем', points: [
            'Официальное одобрение или ко-брендинг от соответствующего государственного органа ОАЭ',
            'Включение в государственные мероприятия по продвижению инвестиций',
            'Представление соответствующим государственным стейкхолдерам и департаментам',
            'Доступ к государственным маркетинговым каналам и площадкам мероприятий',
            'Совместная рамка для обмена данными о притоке HNWI и экономическом эффекте',
          ]},
        ],
      },
    },
    impact: {
      title: 'Прогнозируемый экономический эффект',
      intro: 'На основе открытых данных Henley Global, государственных источников ОАЭ и рыночных исследований:',
      metrics: [
        { metric: 'Средний инвестируемый капитал на одного HNWI', value: '~$6,4 млн', source: '$63 млрд ÷ 9 800 HNWI (Henley 2025)' },
        { metric: 'Целевой показатель FDI ОАЭ к 2031 г.', value: 'AED 115 → 240 млрд/год', source: 'We the UAE 2031' },
        { metric: 'Кумулятивная цель Dubai D33', value: 'AED 32 трлн за декаду', source: 'Dubai Economic Agenda D33' },
        { metric: 'Семейные офисы DIFC + AUM', value: '120 офисов, $1,2 трлн', source: 'DIFC Authority 2025' },
        { metric: 'Рынок управления капиталом MENA (2031)', value: '$1,36 трлн', source: 'GlobeNewsWire 2026' },
        { metric: 'Межпоколенческий трансфер капитала', value: 'AED 3,67 трлн', source: 'Оценки региональных семейных офисов' },
      ],
      multiplier: {
        title: 'Экономический мультипликатор на одного HNWI',
        text: 'Каждый успешно релоцированный HNWI генерирует ценность на нескольких уровнях:',
        layers: [
          'Транзакция с недвижимостью (AED 2 млн+ для квалификации на Golden Visa)',
          'Регистрационные сборы, торговые лицензии и текущий комплаенс',
          'Банковские депозиты и подключение финансовых продуктов',
          'Государственные пошлины за визы и услуги',
          'Потребительские расходы (образование, медицина, гостеприимство)',
          'Создание рабочих мест (персонал, менеджмент, консалтинг)',
          'Налоговые поступления (9% корпоративный налог на квалифицирующую прибыль)',
        ],
      },
    },
    about: {
      title: 'О компании WTP Brokers',
      items: [
        { label: 'Основана', value: '2019, Дубай, ОАЭ' },
        { label: 'Методология', value: 'Banking-First: квалификация до регистрации' },
        { label: 'Оценено кейсов', value: '350+ с момента основания' },
        { label: 'Процент отказов', value: '~30% (фильтрация качества)' },
        { label: 'Покрытие услуг', value: '8 категорий: Банкинг, Регистрация, Визы, Налоговое резидентство, Бухгалтерия, Недвижимость, Защита капитала, Pre-Screen' },
        { label: 'Языки', value: 'Английский, русский, арабский (партнёрская сеть)' },
        { label: 'Партнёрская сеть', value: 'Европейские семейные офисы, налоговые консультанты, юридические фирмы, частные банкиры' },
        { label: 'Награды', value: 'ALDAR Honours (2023), SOBHA Stars (2023), Binghatti Top Broker (2023)' },
      ],
      closing: 'WTP Brokers работает на пересечении управления капиталом, комплаенса и исполнения — именно там, где амбиции ОАЭ встречаются с практическими потребностями релоцирующихся HNWI.',
    },
    nextSteps: {
      title: 'Предлагаемые следующие шаги',
      steps: [
        { num: '01', title: 'Вводная встреча', text: 'Представить данное предложение заинтересованным сторонам. Обсудить масштаб, точки совпадения и взаимные ожидания.' },
        { num: '02', title: 'Оценка целесообразности', text: 'Совместная рабочая группа для определения рамки партнёрства, правил ко-брендинга и масштаба пилота.' },
        { num: '03', title: 'Пилотная кампания', text: 'Запуск фокусного пилота по одному коридору (например, Великобритания/Европа) для валидации модели и измерения результатов.' },
        { num: '04', title: 'Масштабирование', text: 'На основании результатов пилота — расширение на дополнительные коридоры с полноценной ко-брендированной кампанией.' },
      ],
      closing: 'Мы будем рады обсудить, как WTP Brokers может выступить стратегическим исполнительным партнёром в укреплении позиции ОАЭ как ведущего мирового направления для размещения капитала.',
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

<!-- ═══ PAGE 4: THE CHALLENGE ═══ -->
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

<!-- ═══ PAGE 6: CAMPAIGN CONCEPT ═══ -->
<div class="page">
  <div class="section-num">05</div>
  <div class="section-title">${d.campaign.title}</div>
  <div class="gold-line"></div>
  <p class="section-intro">${d.campaign.intro}</p>

  <div class="campaign-concept">
    <div class="campaign-tagline">${d.campaign.concept.tagline}</div>
    <div class="campaign-text">${d.campaign.concept.text}</div>
  </div>

  <div class="element-grid">
    ${d.campaign.elements.map(e => `
    <div class="element-card">
      <div class="element-title">${e.title}</div>
      <div class="element-text">${e.text}</div>
    </div>`).join('')}
  </div>

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">6</span>
  </div>
</div>

<!-- ═══ PAGE 7: PARTNERSHIP MODEL ═══ -->
<div class="page">
  <div class="section-num">06</div>
  <div class="section-title">${d.campaign.model.title}</div>
  <div class="gold-line"></div>

  <div class="model-columns">
    ${d.campaign.model.items.map(col => `
    <div class="model-col">
      <div class="model-heading">${col.what}</div>
      ${col.points.map(p => `<div class="model-point">${p}</div>`).join('\n      ')}
    </div>`).join('')}
  </div>

  <div style="height: 30px;"></div>

  <div class="section-num">07</div>
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

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">7</span>
  </div>
</div>

<!-- ═══ PAGE 8: MULTIPLIER + ABOUT + NEXT STEPS ═══ -->
<div class="page">
  <div class="multiplier-box">
    <div class="multiplier-title">${d.impact.multiplier.title}</div>
    <div class="multiplier-text">${d.impact.multiplier.text}</div>
    ${d.impact.multiplier.layers.map(l => `<div class="multiplier-item">${l}</div>`).join('\n    ')}
  </div>

  <div style="height: 24px;"></div>

  <div class="section-num">08</div>
  <div class="section-title">${d.about.title}</div>
  <div class="gold-line"></div>

  <div class="about-grid">
    ${d.about.items.map(i => `
    <div class="about-label">${i.label}</div>
    <div class="about-value">${i.value}</div>`).join('')}
  </div>
  <p class="about-closing">${d.about.closing}</p>

  <div class="page-footer">
    <span class="footer-text">${d.footer}</span>
    <span class="footer-page">8</span>
  </div>
</div>

<!-- ═══ PAGE 9: NEXT STEPS + CONTACT ═══ -->
<div class="page">
  <div class="section-num">09</div>
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
    <span class="footer-page">9</span>
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
    const pdfPath = path.join(outDir, `WTP-Government-Partnership-Proposal-${lang.toUpperCase()}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    console.log(`✓ PDF: ${pdfPath}`);

    // PNG preview (first page)
    await page.setViewport({ width: 794, height: 1123 });
    const pngPath = path.join(outDir, `WTP-Government-Partnership-Proposal-${lang.toUpperCase()}-preview.png`);
    await page.screenshot({ path: pngPath, fullPage: false });
    console.log(`✓ PNG: ${pngPath}`);

    await page.close();
  }

  await browser.close();
  console.log('\n✅ Government Partnership Proposal — EN + RU generated!');
  console.log(`   Output: ${outDir}`);
}

main().catch(err => { console.error(err); process.exit(1); });
