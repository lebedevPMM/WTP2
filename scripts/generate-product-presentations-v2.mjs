import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const largeMode = process.argv.includes('--large');
const outDir = path.join(__dirname, '..', 'dist', 'product-presentations', ...(largeMode ? ['увеличенные шрифты'] : []));


// ─── Shared branding ────────────────────────────────────────────────

const brand = {
  ru: { company: 'WTP Brokers', email: 'hello@wtpbrokers.com', office: 'Дубай, ОАЭ', since: 'С 2019 года · Banking-First подход · ОАЭ', contact: 'Контакт', officeLbl: 'Офис' },
  en: { company: 'WTP Brokers', email: 'hello@wtpbrokers.com', office: 'Dubai, UAE', since: 'Since 2019 · Banking-First approach · UAE', contact: 'Contact', officeLbl: 'Office' },
};


// ─── Product Data ───────────────────────────────────────────────────

const products = [

  // ═══ 1. PRE SCREEN ═══
  {
    id: 'pre-screen',
    accent: '#e74c3c',
    gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 50%, #2c0b0b 100%)',

    b2c: {
      ru: {
        tag: 'ДЛЯ НОВЫХ КЛИЕНТОВ И ПАРТНЁРОВ',
        headline: 'Pre Screen. $15\u202F000 ошибок,\nкоторые мы предотвращаем.',
        sub: 'Комплексная диагностика вашей ситуации до любых действий: банковские риски, налоговая стратегия, структура активов.',
        cta: 'Записаться на Pre Screen',
        stat: '$8–15K', statLabel: 'средняя потеря при регистрации\nбез банковского pre-check',
        painPoints: [
          'Каждая неудачная подача в банк фиксируется в системе\nи снижает шансы на следующую попытку',
          'Без предварительной проверки вы рискуете потратить\nмесяцы и тысячи долларов на нерабочую структуру',
          '~30% кейсов получают отказ на этапе Pre Screen.\nЛучше узнать это до, а не после оплаты регистрации',
        ],
        benefits: [
          { title: 'Карта рисков', text: 'KYC/AML предскрининг, проверка санкционных списков, анализ структуры владения и источника средств.' },
          { title: 'Банковская стратегия', text: 'Оценка bankability: какие банки реально откроют счёт под ваш профиль и бизнес-модель.' },
          { title: 'Налоговый анализ', text: 'Оценка текущего резидентства, рисков двойного налогообложения, стратегия перехода.' },
          { title: 'Roadmap', text: 'Документ с планом: что делать, в каком порядке, какие документы, сколько стоит.' },
        ],
        processTitle: 'Как это работает',
        process: [
          { num: '01', title: 'Запрос', text: 'Вы описываете ситуацию и цели. Мы отправляем список документов.', timing: 'День 0' },
          { num: '02', title: 'Анализ', text: 'KYC-скрининг, банковская стратегия, налоговая карта.', timing: '5–7 дней' },
          { num: '03', title: 'Вердикт', text: 'Встреча с результатами. Карта рисков + roadmap.', timing: 'День 8' },
          { num: '04', title: 'Решение', text: 'Вы решаете: двигаемся дальше или останавливаемся. Без давления.', timing: 'Ваш выбор' },
        ],
        includesTitle: 'Что входит',
        includes: [
          'KYC/AML предскрининг', 'Проверка банковской приемлемости', 'Анализ налоговой стратегии', 'Анализ структуры владения',
          'Карта рисков (документ)', 'Roadmap с рекомендациями', 'Консультация 60 минут', 'Вердикт: GO / NO-GO / условия',
        ],
        proofCards: [
          { number: '350+', label: 'кейсов с 2019 года' },
          { number: '30%', label: 'честных отказов' },
          { number: '70%', label: 'работающий бизнес в ОАЭ' },
        ],
        why: [
          { title: 'Без навязывания услуг', text: 'Вы платите только за диагностику. Если Pre Screen рекомендует не двигаться — вы платите только за Pre Screen.' },
          { title: 'Banking-First методология', text: 'С 2019 года мы проверили 350+ кейсов. Мы начинаем с банка, а не с регистрации — потому что компания без счёта бесполезна.' },
          { title: 'Честность как бизнес-модель', text: '30% отказов — это наша репутация. Клиент, которому мы сказали «нет», возвращается с другим кейсом.' },
        ],
        closing: '350+ кейсов с 2019 года. 30% честных отказов.\nОстальные 70% — работающий бизнес в ОАЭ с банковским счётом.',
      },
      en: {
        tag: 'FOR NEW CLIENTS & PARTNERS',
        headline: 'Pre Screen. The $15,000 mistakes\nwe prevent.',
        sub: 'Comprehensive diagnostics before any action: banking risks, tax strategy, asset structure.',
        cta: 'Book Your Pre Screen',
        stat: '$8–15K', statLabel: 'average loss from registration\nwithout a banking pre-check',
        painPoints: [
          'Every failed bank application is recorded in the system\nand reduces chances for the next attempt',
          'Without a pre-check, you risk spending months\nand thousands of dollars on a non-working structure',
          '~30% of cases are declined at Pre Screen stage.\nBetter to learn this before paying for registration',
        ],
        benefits: [
          { title: 'Risk Map', text: 'KYC/AML pre-screening, sanctions check, ownership and source of funds analysis.' },
          { title: 'Banking Strategy', text: 'Bankability assessment: which banks will realistically open an account for your profile.' },
          { title: 'Tax Analysis', text: 'Current residency evaluation, double taxation risks, tax transition strategy.' },
          { title: 'Roadmap', text: 'Document with plan: what to do, in what order, which documents, what it costs.' },
        ],
        processTitle: 'How It Works',
        process: [
          { num: '01', title: 'Request', text: 'Describe your situation and goals. We send a document checklist.', timing: 'Day 0' },
          { num: '02', title: 'Analysis', text: 'KYC screening, banking strategy, tax mapping.', timing: '5–7 days' },
          { num: '03', title: 'Verdict', text: 'Meeting with results. Risk map + roadmap.', timing: 'Day 8' },
          { num: '04', title: 'Decision', text: 'You decide: proceed or stop. No pressure.', timing: 'Your call' },
        ],
        includesTitle: "What's Included",
        includes: [
          'KYC/AML pre-screening', 'Bankability assessment', 'Tax strategy analysis', 'Ownership structure analysis',
          'Risk map (document)', 'Roadmap with recommendations', '60-minute consultation', 'Verdict: GO / NO-GO / conditions',
        ],
        proofCards: [
          { number: '350+', label: 'cases since 2019' },
          { number: '30%', label: 'honest declines' },
          { number: '70%', label: 'working businesses in UAE' },
        ],
        why: [
          { title: 'No upselling', text: 'You pay for diagnostics only. If Pre Screen recommends not to proceed — you pay for Pre Screen alone.' },
          { title: 'Banking-First methodology', text: 'Since 2019, we have assessed 350+ cases. We start with the bank, not registration — because a company without an account is useless.' },
          { title: 'Honesty as a business model', text: '30% rejection rate is our reputation. A client we honestly told "no" comes back with another case.' },
        ],
        closing: '350+ cases since 2019. 30% honest declines.\nThe remaining 70% — working businesses in the UAE with bank accounts.',
      },
    },

    partner: {
      ru: {
        tag: 'БРИФ ДЛЯ ПАРТНЁРОВ',
        headline: 'Pre Screen — диагностика\nперед стартом работы',
        sub: 'Комплексный pre-check: KYC, банковская приемлемость, налоговая стратегия. Вердикт до начала любых действий.',
        cta: 'Отправить кейс',
        clientProfile: {
          title: 'Кто этот клиент',
          items: [
            'Новый клиент или сложный кейс от партнёра',
            'Планирует вход в ОАЭ: компания, счёт, резидентство',
            'Активы/доход от EUR 500K — бизнес-доход или личный капитал',
            'Нуждается в оценке рисков до принятия решения',
          ],
        },
        stat: '$8–15K', statLabel: 'теряет клиент на регистрации\nбез банковского pre-check',
        consequences: [
          'Клиент платит за регистрацию — банк отказывает в счёте',
          'Каждый отказ фиксируется и снижает шансы повторной подачи',
          'Ваша рекомендация ставится под сомнение — репутационный риск',
        ],
        scopeTitle: 'Что входит в Pre Screen',
        scope: [
          'KYC/AML предскрининг', 'Проверка банковской приемлемости', 'Анализ налоговой стратегии', 'Анализ структуры владения',
          'Карта рисков (документ)', 'Roadmap с рекомендациями', 'Консультация 60 минут', 'Вердикт: GO / NO-GO / условия',
        ],
        timeline: '5–7 рабочих дней',
        deliverable: 'Карта рисков + Roadmap (PDF)',
        processTitle: 'Как работает процесс',
        process: [
          { num: '01', title: 'Передача кейса', text: 'Партнёр отправляет описание клиента и документы.', timing: 'День 0' },
          { num: '02', title: 'Офлайн-анализ', text: 'KYC-скрининг, банковская стратегия, налоговая карта.', timing: '5–7 дней' },
          { num: '03', title: 'Вердикт', text: 'Партнёр получает результат: GO / NO-GO / условия.', timing: 'День 8' },
          { num: '04', title: 'Решение', text: 'Клиент решает двигаться дальше или нет. Без давления.', timing: 'Ваш клиент' },
        ],
        revenueTitle: 'Модель для партнёра',
        revenueIntro: 'Pre Screen — входной продукт. Фиксированная стоимость для клиента.',
        tiers: [
          { name: 'Advisory', desc: 'Диагностика + roadmap. Клиент решает сам.' },
          { name: 'Entry', desc: 'Виза + банковский счёт. Апселл после Pre Screen.' },
          { name: 'Setup', desc: 'Компания + счёт + виза. Полный запуск.' },
          { name: 'Control', desc: 'Бухгалтерия + compliance + wealth. Максимальный LTV.' },
        ],
        riskTitle: 'Границы и стоп-факторы',
        riskIntro: 'Что мы НЕ делаем — и что защищает вашу репутацию:',
        stopFactors: [
          'Не берём клиентов без документов — нет документов = NO-GO',
          'Не «проталкиваем» кейсы через банк — каждый отказ фиксируется',
          'Не даём ложных гарантий — честный вердикт, даже если это отказ',
          'Не работаем с клиентами, скрывающими бенефициаров',
        ],
        whyTitle: 'Почему рекомендовать WTP',
        why: [
          { title: 'Защита репутации партнёра', text: '~30% кейсов получают отказ на этапе Pre Screen. Это фильтр, который защищает и клиента, и вас.' },
          { title: 'Banking-First методология', text: 'Мы начинаем с банка, не с регистрации. 350+ кейсов. Клиент не тратит деньги на нерабочую структуру.' },
          { title: 'Клиент остаётся вашим', text: 'Контрактная защита: non-solicitation, выделенный канал связи, SLA. Мы — back-office, не front office.' },
        ],
        nextStepsTitle: 'Следующие шаги',
        nextSteps: [
          'Отправьте описание кейса и документы клиента',
          'Мы проведём Pre Screen за 5–7 рабочих дней',
          'Вы получите вердикт и roadmap для клиента',
        ],
      },
      en: {
        tag: 'PARTNER BRIEF',
        headline: 'Pre Screen — diagnostics\nbefore any work begins',
        sub: 'Comprehensive pre-check: KYC, bankability, tax strategy. A verdict before any action is taken.',
        cta: 'Submit a Case',
        clientProfile: {
          title: 'Who is this client',
          items: [
            'New client or complex case from partner referral',
            'Planning UAE entry: company, account, residency',
            'Assets/income from EUR 500K — business revenue or personal capital',
            'Needs risk assessment before making a decision',
          ],
        },
        stat: '$8–15K', statLabel: 'lost by clients registering\nwithout a banking pre-check',
        consequences: [
          'Client pays for registration — bank declines the account',
          'Every rejection is recorded and reduces chances of resubmission',
          'Your recommendation is questioned — reputational risk for you',
        ],
        scopeTitle: "What's included in Pre Screen",
        scope: [
          'KYC/AML pre-screening', 'Bankability assessment', 'Tax strategy analysis', 'Ownership structure analysis',
          'Risk map (document)', 'Roadmap with recommendations', '60-minute consultation', 'Verdict: GO / NO-GO / conditions',
        ],
        timeline: '5–7 business days',
        deliverable: 'Risk Map + Roadmap (PDF)',
        processTitle: 'How the process works',
        process: [
          { num: '01', title: 'Case submission', text: 'Partner sends client description and documents.', timing: 'Day 0' },
          { num: '02', title: 'Offline analysis', text: 'KYC screening, banking strategy, tax mapping.', timing: '5–7 days' },
          { num: '03', title: 'Verdict', text: 'Partner receives result: GO / NO-GO / conditions.', timing: 'Day 8' },
          { num: '04', title: 'Decision', text: 'Client decides to proceed or not. No pressure.', timing: 'Your client' },
        ],
        revenueTitle: 'Partner model',
        revenueIntro: 'Pre Screen is the entry product. Fixed cost for the client.',
        tiers: [
          { name: 'Advisory', desc: 'Diagnostics + roadmap. Client decides.' },
          { name: 'Entry', desc: 'Visa + bank account. Upsell after Pre Screen.' },
          { name: 'Setup', desc: 'Company + account + visa. Full launch.' },
          { name: 'Control', desc: 'Accounting + compliance + wealth. Maximum LTV.' },
        ],
        riskTitle: 'Boundaries & stop-factors',
        riskIntro: 'What we do NOT do — and what protects your reputation:',
        stopFactors: [
          "Don't take clients without documents — no docs = NO-GO",
          "Don't force cases through banks — every rejection is recorded",
          "Don't make false guarantees — honest verdict, even if it's a decline",
          "Don't work with clients hiding beneficial owners",
        ],
        whyTitle: 'Why recommend WTP',
        why: [
          { title: 'Partner reputation protection', text: '~30% of cases are declined at Pre Screen. This filter protects both the client and you.' },
          { title: 'Banking-First methodology', text: "We start with the bank, not registration. 350+ cases. Client doesn't spend money on a non-working structure." },
          { title: 'The client stays yours', text: 'Contractual protection: non-solicitation, dedicated communication channel, SLA. We are the back-office, not the front office.' },
        ],
        nextStepsTitle: 'Next steps',
        nextSteps: [
          "Send us the client's case description and documents",
          "We'll run the Pre Screen within 5–7 business days",
          "You'll receive a verdict and roadmap for your client",
        ],
      },
    },
  },

  // ═══ 1b. X-RAY (Capital Diagnostic) ═══
  {
    id: 'xray',
    accent: '#1a5276',
    gradient: 'linear-gradient(135deg, #1a5276 0%, #0e3a5c 50%, #071a2b 100%)',

    b2c: {
      ru: {
        tag: 'ДЛЯ ВЛАДЕЛЬЦЕВ КАПИТАЛА',
        headline: 'X-Ray. Вы впервые видите\nсвой капитал как систему.',
        sub: 'Полный «рентген» капитала: диагностика, выявление потерь, карта рисков и точки роста. Не консультация — системный анализ.',
        cta: 'Записаться на X-Ray',
        stat: '$5–15K', statLabel: 'стоимость Full X-Ray\nв зависимости от глубины анализа',
        painPoints: [
          'Активы разбросаны по юрисдикциям — нет единой картины.\nВы не знаете реальный net worth',
          'Скрытые потери: неэффективные активы, налоговые дыры,\nперекос валют и стран',
          'Без консолидации невозможно принять стратегическое решение.\nВы управляете хаосом, а не капиталом',
        ],
        benefits: [
          { title: 'Глубокий аудит', text: 'Недвижимость, бизнес, финансовые инструменты, crypto. Обязательства, кэшфлоу, юрисдикции — полная картина.' },
          { title: 'Выявление проблем', text: 'Неэффективные активы, скрытые риски (налоги, банки, структура), перекос валют, проблемы с ликвидностью.' },
          { title: 'Консолидация', text: 'Единая карта капитала: net worth, структура, cashflow, risk map. Самое ценное — всё в одном месте.' },
          { title: 'Стратегия + Roadmap', text: 'Цели → структура → аллокация → юрисдикции → защита. Roadmap на 6–12 месяцев с конкретными шагами.' },
        ],
        processTitle: 'Как это работает',
        process: [
          { num: '01', title: 'Light X-Ray', text: '30–45 мин. High-level диагностика. 3–5 ключевых рисков и quick wins.', timing: 'Бесплатно' },
          { num: '02', title: 'Full X-Ray', text: 'Глубокий аудит всех активов, обязательств, юрисдикций. Консолидация.', timing: '2–4 недели' },
          { num: '03', title: 'Стратегическая сессия', text: 'Цели семьи, риск-профиль, сценарии: growth / protection / exit.', timing: '2–3 часа' },
          { num: '04', title: 'Подписка', text: 'Ежемесячное управление, отчётность, инвестиции, координация.', timing: 'Ongoing' },
        ],
        includesTitle: 'Что входит в Full X-Ray',
        includes: [
          'Аудит всех классов активов', 'Анализ обязательств и кэшфлоу', 'Карта рисков (налоги, банки, структура)', 'Консолидация: единая карта капитала',
          'Стратегия аллокации активов', 'Юрисдикционный анализ', 'PDF отчёт (Apple / Hermes стиль)', 'Roadmap на 6–12 месяцев',
        ],
        proofCards: [
          { number: '$100M+', label: 'капитала под управлением' },
          { number: '15', label: 'семей globally' },
          { number: 'Multi-J', label: 'юрисдикционный опыт' },
        ],
        why: [
          { title: 'Не советы — execution', text: 'Мы не даём советы — мы собираем и управляем системой капитала. $100M+ под управлением, 15 семей globally.' },
          { title: 'Капитал как система', text: 'X-Ray показывает картину целиком: net worth, cashflow, risk map. Впервые вы видите свой капитал, а не набор активов.' },
          { title: 'От диагностики к управлению', text: 'Light X-Ray → Full X-Ray → Strategy → Subscription. Каждый шаг приносит value, каждый шаг — ваш выбор.' },
        ],
        closing: '$100M+ под управлением. 15 семей globally.\nМы не даём советы — мы управляем системой капитала.',
      },
      en: {
        tag: 'FOR CAPITAL OWNERS',
        headline: 'X-Ray. See your capital\nas a system for the first time.',
        sub: 'Complete capital "X-Ray": diagnostics, loss detection, risk mapping, and growth opportunities. Not a consultation — a systematic analysis.',
        cta: 'Book Your X-Ray',
        stat: '$5–15K', statLabel: 'Full X-Ray cost\ndepending on depth of analysis',
        painPoints: [
          'Assets scattered across jurisdictions — no unified picture.\nYou don\'t know your real net worth',
          'Hidden losses: inefficient assets, tax gaps,\ncurrency and country imbalances',
          'Without consolidation, strategic decisions are impossible.\nYou\'re managing chaos, not capital',
        ],
        benefits: [
          { title: 'Deep Audit', text: 'Real estate, business, financial instruments, crypto. Liabilities, cashflow, jurisdictions — the full picture.' },
          { title: 'Problem Detection', text: 'Inefficient assets, hidden risks (taxes, banks, structure), currency imbalance, liquidity issues.' },
          { title: 'Consolidation', text: 'Unified capital map: net worth, structure, cashflow, risk map. The most valuable part — everything in one place.' },
          { title: 'Strategy + Roadmap', text: 'Goals → structure → allocation → jurisdictions → protection. 6–12 month roadmap with concrete steps.' },
        ],
        processTitle: 'How It Works',
        process: [
          { num: '01', title: 'Light X-Ray', text: '30–45 min. High-level diagnostics. 3–5 key risks and quick wins.', timing: 'Free' },
          { num: '02', title: 'Full X-Ray', text: 'Deep audit of all assets, liabilities, jurisdictions. Consolidation.', timing: '2–4 weeks' },
          { num: '03', title: 'Strategic Session', text: 'Family goals, risk profile, scenarios: growth / protection / exit.', timing: '2–3 hours' },
          { num: '04', title: 'Subscription', text: 'Monthly management, reporting, investments, coordination.', timing: 'Ongoing' },
        ],
        includesTitle: "What's Included in Full X-Ray",
        includes: [
          'Audit of all asset classes', 'Liabilities & cashflow analysis', 'Risk map (taxes, banks, structure)', 'Consolidation: unified capital map',
          'Asset allocation strategy', 'Jurisdictional analysis', 'PDF report (Apple / Hermes style)', '6–12 month roadmap',
        ],
        proofCards: [
          { number: '$100M+', label: 'capital under management' },
          { number: '15', label: 'families globally' },
          { number: 'Multi-J', label: 'jurisdictional experience' },
        ],
        why: [
          { title: 'Not advice — execution', text: 'We don\'t give advice — we build and manage capital systems. $100M+ under management, 15 families globally.' },
          { title: 'Capital as a system', text: 'X-Ray shows the full picture: net worth, cashflow, risk map. For the first time, you see your capital — not a set of assets.' },
          { title: 'From diagnostics to management', text: 'Light X-Ray → Full X-Ray → Strategy → Subscription. Every step delivers value, every step is your choice.' },
        ],
        closing: '$100M+ under management. 15 families globally.\nWe don\'t give advice — we manage capital systems.',
      },
    },

    partner: {
      ru: {
        tag: 'БРИФ ДЛЯ ПАРТНЁРОВ',
        headline: 'X-Ray — полный рентген\nкапитала вашего клиента',
        sub: 'Диагностика, выявление потерь, карта рисков, стратегия. Для HNWI / UHNW с капиталом от $3–5M.',
        cta: 'Отправить кейс',
        clientProfile: {
          title: 'Кто этот клиент',
          items: [
            'HNWI / UHNW — предприниматели, семьи с капиталом от $3–5M+',
            'Активы разбросаны по юрисдикциям — нет единой картины',
            'Нуждается в консолидации и стратегии управления капиталом',
            'Готов к системному подходу, а не разовой консультации',
          ],
        },
        stat: '$100M+', statLabel: 'капитала под управлением\n15 семей globally',
        consequences: [
          'Без диагностики клиент теряет на неэффективных активах и скрытых рисках',
          'Разрозненные активы = невозможность стратегических решений',
          'Клиент уходит к конкурентам с системным предложением',
        ],
        scopeTitle: 'Что входит в X-Ray',
        scope: [
          'Аудит всех классов активов', 'Анализ обязательств и кэшфлоу', 'Карта рисков', 'Консолидация капитала',
          'Стратегия аллокации', 'Юрисдикционный анализ', 'PDF отчёт + dashboard', 'Roadmap на 6–12 месяцев',
        ],
        timeline: '2–4 недели (Full X-Ray)',
        deliverable: 'PDF отчёт + Dashboard + Стратегическая сессия',
        processTitle: 'Как работает процесс',
        process: [
          { num: '01', title: 'Light X-Ray (Free)', text: '30–45 мин. High-level диагностика. Клиент видит масштаб проблем.', timing: 'День 0' },
          { num: '02', title: 'Full X-Ray', text: 'Глубокий аудит, консолидация, карта рисков, стратегия.', timing: '2–4 недели' },
          { num: '03', title: 'Стратегическая сессия', text: 'Цели семьи, сценарии, roadmap. Точка продажи подписки.', timing: '2–3 часа' },
          { num: '04', title: 'Подписка WTP WM', text: 'Ежемесячное управление, отчётность, инвестиции, координация.', timing: '$2–10K/мес' },
        ],
        revenueTitle: 'Модель для партнёра',
        revenueIntro: 'X-Ray — входной продукт. Воронка: Light → Full → Strategy → Subscription.',
        tiers: [
          { name: 'Light X-Ray', desc: 'Бесплатная диагностика 30–45 мин. Лидогенерация.' },
          { name: 'Full X-Ray', desc: '$5–15K. Глубокий аудит + консолидация + стратегия.' },
          { name: 'Strategic Session', desc: 'Часть Full X-Ray или upsell. Точка продажи подписки.' },
          { name: 'Subscription', desc: '$2–10K/мес. Основной recurring revenue. Wealth Management.' },
        ],
        riskTitle: 'Где деньги и что отличает',
        riskIntro: 'Мы не «консалтинг» — мы execution:',
        stopFactors: [
          '$100M+ капитала под управлением — реальный track record',
          '15 семей globally — multi-jurisdiction опыт',
          'X-Ray = low margin вход. Subscription = основной cashflow',
          'Deals / investments = upside. Модель: AUM + recurring + deal fees',
        ],
        whyTitle: 'Почему рекомендовать WTP X-Ray',
        why: [
          { title: 'Системный подход', text: 'Не разовая консультация, а полная диагностика → стратегия → управление. Клиент получает value на каждом этапе.' },
          { title: 'Execution, не советы', text: 'Мы не даём советы — мы собираем и управляем системой капитала. Координация банков, брокеров, юристов.' },
          { title: 'Клиент остаётся вашим', text: 'Контрактная защита: non-solicitation, выделенный канал связи, SLA. Мы — back-office, не front office.' },
        ],
        nextStepsTitle: 'Следующие шаги',
        nextSteps: [
          'Отправьте описание клиента и его капитальную структуру',
          'Мы проведём Light X-Ray (бесплатно, 30–45 мин)',
          'Клиент получит карту рисков и предложение Full X-Ray',
        ],
      },
      en: {
        tag: 'PARTNER BRIEF',
        headline: 'X-Ray — complete capital\ndiagnostic for your client',
        sub: 'Diagnostics, loss detection, risk mapping, strategy. For HNWI / UHNW with $3–5M+ capital.',
        cta: 'Submit a Case',
        clientProfile: {
          title: 'Who is this client',
          items: [
            'HNWI / UHNW — entrepreneurs, families with $3–5M+ capital',
            'Assets scattered across jurisdictions — no unified picture',
            'Needs consolidation and capital management strategy',
            'Ready for a systematic approach, not a one-off consultation',
          ],
        },
        stat: '$100M+', statLabel: 'capital under management\n15 families globally',
        consequences: [
          'Without diagnostics, client loses on inefficient assets and hidden risks',
          'Fragmented assets = impossible to make strategic decisions',
          'Client goes to competitors with a systematic offering',
        ],
        scopeTitle: "What's included in X-Ray",
        scope: [
          'Audit of all asset classes', 'Liabilities & cashflow analysis', 'Risk map', 'Capital consolidation',
          'Allocation strategy', 'Jurisdictional analysis', 'PDF report + dashboard', '6–12 month roadmap',
        ],
        timeline: '2–4 weeks (Full X-Ray)',
        deliverable: 'PDF Report + Dashboard + Strategic Session',
        processTitle: 'How the process works',
        process: [
          { num: '01', title: 'Light X-Ray (Free)', text: '30–45 min. High-level diagnostics. Client sees the scale of issues.', timing: 'Day 0' },
          { num: '02', title: 'Full X-Ray', text: 'Deep audit, consolidation, risk map, strategy.', timing: '2–4 weeks' },
          { num: '03', title: 'Strategic Session', text: 'Family goals, scenarios, roadmap. Subscription sales point.', timing: '2–3 hours' },
          { num: '04', title: 'WTP WM Subscription', text: 'Monthly management, reporting, investments, coordination.', timing: '$2–10K/mo' },
        ],
        revenueTitle: 'Partner model',
        revenueIntro: 'X-Ray is the entry product. Funnel: Light → Full → Strategy → Subscription.',
        tiers: [
          { name: 'Light X-Ray', desc: 'Free 30–45 min diagnostics. Lead generation.' },
          { name: 'Full X-Ray', desc: '$5–15K. Deep audit + consolidation + strategy.' },
          { name: 'Strategic Session', desc: 'Part of Full X-Ray or upsell. Subscription sales point.' },
          { name: 'Subscription', desc: '$2–10K/mo. Main recurring revenue. Wealth Management.' },
        ],
        riskTitle: 'Where the money is & differentiators',
        riskIntro: 'We are not "consulting" — we are execution:',
        stopFactors: [
          '$100M+ capital under management — real track record',
          '15 families globally — multi-jurisdiction experience',
          'X-Ray = low margin entry. Subscription = main cashflow',
          'Deals / investments = upside. Model: AUM + recurring + deal fees',
        ],
        whyTitle: 'Why recommend WTP X-Ray',
        why: [
          { title: 'Systematic approach', text: 'Not a one-off consultation, but full diagnostics → strategy → management. Client gets value at every stage.' },
          { title: 'Execution, not advice', text: 'We don\'t give advice — we build and manage capital systems. Coordination of banks, brokers, lawyers.' },
          { title: 'The client stays yours', text: 'Contractual protection: non-solicitation, dedicated communication channel, SLA. We are the back-office, not the front office.' },
        ],
        nextStepsTitle: 'Next steps',
        nextSteps: [
          'Send client description and their capital structure',
          "We'll run a Light X-Ray (free, 30–45 min)",
          'Client receives risk map and Full X-Ray proposal',
        ],
      },
    },
  },

  // ═══ 2. GOLDEN VISA ═══
  {
    id: 'golden-visa',
    accent: '#b8860b',
    gradient: 'linear-gradient(135deg, #b8860b 0%, #8B6914 50%, #2a1f00 100%)',

    b2c: {
      ru: {
        tag: 'ДЛЯ ИНВЕСТОРОВ И ПРЕДПРИНИМАТЕЛЕЙ',
        headline: 'Golden Visa ОАЭ.\n10 лет без привязки к спонсору.',
        sub: 'Визы инвестора, владельца компании, специалиста. Подбор маршрута, документы, сопровождение до Emirates ID.',
        cta: 'Узнать свой маршрут',
        stat: '200+', statLabel: 'визовых кейсов\nс 2019 года',
        painPoints: [
          'Стандартная виза привязана к работодателю.\nСмена работы или закрытие компании = потеря статуса',
          'Без правильного маршрута процесс затягивается на месяцы\nили заканчивается отказом',
          'Виза влияет на банковские счета, налоговое резидентство,\nшколы — всё зависит от иммиграционного статуса',
        ],
        benefits: [
          { title: 'Стратегия визы', text: 'Какой тип оптимален — инвестор (AED 2M), владелец компании, специалист.' },
          { title: 'Документы под ключ', text: 'Легализация, перевод, нотариальное заверение, аттестация — полный пакет.' },
          { title: 'Emirates ID', text: 'Биометрия, медкомиссия, получение Emirates ID — полное сопровождение.' },
          { title: 'Семейные визы', text: 'Визы супруге/супругу и детям. Параллельно, не после основной визы.' },
        ],
        processTitle: 'Как это работает',
        process: [
          { num: '01', title: 'Оценка', text: 'Определяем тип визы: banking, tax, семья.', timing: 'День 1' },
          { num: '02', title: 'Подготовка', text: 'Сбор документов, легализация, медкомиссия.', timing: '1–2 недели' },
          { num: '03', title: 'Подача', text: 'Заявление, сопровождение при визите.', timing: '1–5 дней' },
          { num: '04', title: 'Получение', text: 'Виза + Emirates ID. Семейные визы параллельно.', timing: '5–7 дней' },
        ],
        includesTitle: 'Что входит',
        includes: [
          'Выбор типа визы', 'Подготовка документов', 'Легализация и перевод', 'Медкомиссия',
          'Биометрия и Emirates ID', 'Подача и отслеживание', 'Семейные визы (опц.)', 'Tax residency стратегия (опц.)',
        ],
        proofCards: [
          { number: '200+', label: 'визовых кейсов' },
          { number: '5–10', label: 'лет резидентства' },
          { number: '1', label: 'визит в ОАЭ' },
        ],
        why: [
          { title: 'Виза + банк + налоги = один план', text: 'Один менеджер ведёт весь процесс. Golden Visa влияет на выбор банка и налоговое резидентство.' },
          { title: '200+ визовых кейсов', text: 'Знаем подводные камни каждого маршрута. Это экономит 2–4 недели и предотвращает отказы.' },
          { title: 'Семья включена', text: 'Визы супруге и детям оформляем параллельно. Документы готовим заранее — вы прилетаете один раз.' },
        ],
        closing: 'Golden Visa — не штамп. Это фундамент: банк, налоги, школы,\nдолгосрочное планирование. Мы строим этот фундамент целиком.',
      },
      en: {
        tag: 'FOR INVESTORS & ENTREPRENEURS',
        headline: 'UAE Golden Visa.\n10 years without a sponsor.',
        sub: 'Investor, business owner, specialist visas. Route selection, documents, support through to Emirates ID.',
        cta: 'Find Your Route',
        stat: '200+', statLabel: 'visa cases\nsince 2019',
        painPoints: [
          'Standard visa is tied to employer.\nJob change or company closure = loss of status',
          'Without the right route, the process drags for months\nor ends in rejection',
          'Visa affects bank accounts, tax residency,\nschools — everything depends on immigration status',
        ],
        benefits: [
          { title: 'Visa Strategy', text: 'Optimal type — investor (AED 2M), business owner, specialist.' },
          { title: 'Documents End-to-End', text: 'Legalization, translation, notarization, attestation — full package.' },
          { title: 'Emirates ID', text: 'Biometrics, medical, Emirates ID — full on-ground support.' },
          { title: 'Family Visas', text: 'Spouse and children visas. In parallel, not after the main visa.' },
        ],
        processTitle: 'How It Works',
        process: [
          { num: '01', title: 'Assessment', text: 'Determine visa type: banking, tax, family.', timing: 'Day 1' },
          { num: '02', title: 'Preparation', text: 'Documents, legalization, medical booking.', timing: '1–2 weeks' },
          { num: '03', title: 'Filing', text: 'Application, on-ground support.', timing: '1–5 days' },
          { num: '04', title: 'Issuance', text: 'Visa + Emirates ID. Family visas in parallel.', timing: '5–7 days' },
        ],
        includesTitle: "What's Included",
        includes: [
          'Visa type selection', 'Document preparation', 'Legalization & translation', 'Medical',
          'Biometrics & Emirates ID', 'Filing & tracking', 'Family visas (opt.)', 'Tax residency strategy (opt.)',
        ],
        proofCards: [
          { number: '200+', label: 'visa cases' },
          { number: '5–10', label: 'years of residency' },
          { number: '1', label: 'visit to UAE' },
        ],
        why: [
          { title: 'Visa + bank + tax = one plan', text: 'One manager handles the entire process. Golden Visa affects bank choice and tax residency.' },
          { title: '200+ visa cases', text: 'We know the pitfalls of every route. This saves 2–4 weeks and prevents rejections.' },
          { title: 'Family included', text: 'Spouse and children visas in parallel. Documents prepared in advance — you fly once.' },
        ],
        closing: "Golden Visa isn't a stamp. It's a foundation: bank, taxes, schools,\nlong-term planning. We build this foundation as a whole.",
      },
    },

    partner: {
      ru: {
        tag: 'БРИФ ДЛЯ ПАРТНЁРОВ',
        headline: 'Golden Visa —\nрезидентство на 10 лет',
        sub: 'Визы инвестора, владельца компании, специалиста. Интеграция с банкингом и налоговым планированием.',
        cta: 'Отправить кейс',
        clientProfile: {
          title: 'Кто этот клиент',
          items: [
            'Инвестор в недвижимость от AED 2M или владелец бизнеса',
            'Планирует долгосрочное присутствие в ОАЭ (семья, бизнес)',
            'Нуждается в независимом статусе — без привязки к спонсору',
            'Часто совмещает визу с открытием компании и банковского счёта',
          ],
        },
        stat: '200+', statLabel: 'визовых кейсов\nпроведено с 2019 года',
        consequences: [
          'Неправильный маршрут визы = отказ + потеря госпошлины',
          'Виза без банковской стратегии = невозможность открыть счёт',
          'Задержки в визе блокируют все последующие шаги клиента',
        ],
        scopeTitle: 'Что входит в услугу',
        scope: [
          'Выбор типа визы', 'Подготовка документов', 'Легализация и перевод', 'Медкомиссия',
          'Биометрия и Emirates ID', 'Подача и отслеживание', 'Семейные визы (опц.)', 'Tax residency стратегия (опц.)',
        ],
        timeline: '2–4 недели (Golden Visa — 5 рабочих дней)',
        deliverable: 'Виза + Emirates ID + UAE PASS',
        processTitle: 'Как работает процесс',
        process: [
          { num: '01', title: 'Передача кейса', text: 'Партнёр отправляет данные клиента и цели.', timing: 'День 0' },
          { num: '02', title: 'Маршрутизация', text: 'Определяем тип визы, готовим документы.', timing: '1–2 недели' },
          { num: '03', title: 'Визит клиента', text: 'Медкомиссия, биометрия, подача. Сопровождение.', timing: '1–5 дней' },
          { num: '04', title: 'Результат', text: 'Виза + Emirates ID выданы. Семья параллельно.', timing: '5–7 дней' },
        ],
        revenueTitle: 'Модель для партнёра',
        revenueIntro: 'Фиксированный fee + госпошлины отдельно. Часто комбинируется с банкингом и компанией.',
        tiers: [
          { name: 'Golden Visa', desc: 'AED 17\u202F000 (госпошлина). Срок — 5 рабочих дней.' },
          { name: 'Виза инвестора', desc: 'AED 6\u202F000. При регистрации компании mainland.' },
          { name: 'Виза сотрудника', desc: 'AED 7\u202F800. 7 рабочих дней.' },
          { name: 'Семейные визы', desc: 'Параллельно с основной. Легализация включена.' },
        ],
        riskTitle: 'Границы и стоп-факторы',
        riskIntro: 'Что мы контролируем и что НЕ гарантируем:',
        stopFactors: [
          'Медицинский тест — решение принимает immigration authority',
          'Задержки immigration — зависят от государственных органов',
          'Изменения визовых правил — мы адаптируем маршрут',
          'Банковские результаты — отдельная услуга, не часть визы',
        ],
        whyTitle: 'Почему рекомендовать WTP',
        why: [
          { title: 'Виза + банк + налоги — один процесс', text: 'Мы не делаем визу отдельно от банковской стратегии. Один менеджер, одна логика, один таймлайн.' },
          { title: '200+ кейсов, один визит', text: 'Знаем, какие документы застрянут, какие медцентры быстрее, когда лететь. Семья параллельно.' },
          { title: 'Клиент остаётся вашим', text: 'Контрактная защита: non-solicitation, выделенный канал, SLA.' },
        ],
        nextStepsTitle: 'Следующие шаги',
        nextSteps: [
          'Отправьте данные клиента и цель визита',
          'Мы определим маршрут и подготовим документы',
          'Клиент прилетает один раз — всё закрывается за визит',
        ],
      },
      en: {
        tag: 'PARTNER BRIEF',
        headline: 'Golden Visa —\n10-year residency',
        sub: 'Investor, business owner, specialist visas. Integrated with banking and tax planning.',
        cta: 'Submit a Case',
        clientProfile: {
          title: 'Who is this client',
          items: [
            'Property investor from AED 2M or business owner',
            'Planning long-term UAE presence (family, business)',
            'Needs independent status — no sponsor dependency',
            'Often combines visa with company and bank account setup',
          ],
        },
        stat: '200+', statLabel: 'visa cases\ncompleted since 2019',
        consequences: [
          'Wrong visa route = rejection + lost government fees',
          'Visa without banking strategy = unable to open an account',
          "Visa delays block all client's subsequent steps",
        ],
        scopeTitle: "What's included",
        scope: [
          'Visa type selection', 'Document preparation', 'Legalization & translation', 'Medical',
          'Biometrics & Emirates ID', 'Filing & tracking', 'Family visas (opt.)', 'Tax residency strategy (opt.)',
        ],
        timeline: '2–4 weeks (Golden Visa — 5 business days)',
        deliverable: 'Visa + Emirates ID + UAE PASS',
        processTitle: 'How the process works',
        process: [
          { num: '01', title: 'Case submission', text: "Partner sends client's data and goals.", timing: 'Day 0' },
          { num: '02', title: 'Route planning', text: 'Determine visa type, prepare documents.', timing: '1–2 weeks' },
          { num: '03', title: 'Client visit', text: 'Medical, biometrics, filing. Full support.', timing: '1–5 days' },
          { num: '04', title: 'Result', text: 'Visa + Emirates ID issued. Family in parallel.', timing: '5–7 days' },
        ],
        revenueTitle: 'Partner model',
        revenueIntro: 'Fixed fee + government fees separately. Often combined with banking and company setup.',
        tiers: [
          { name: 'Golden Visa', desc: 'AED 17,000 (gov. fee). Timeline — 5 business days.' },
          { name: 'Investor Visa', desc: 'AED 6,000. With mainland company registration.' },
          { name: 'Employee Visa', desc: 'AED 7,800. 7 business days.' },
          { name: 'Family Visas', desc: 'Parallel with main visa. Legalization included.' },
        ],
        riskTitle: 'Boundaries & stop-factors',
        riskIntro: 'What we control and what we do NOT guarantee:',
        stopFactors: [
          'Medical test — decision by immigration authority',
          'Immigration delays — depend on government bodies',
          'Visa rule changes — we adapt the route',
          'Banking outcomes — separate service, not part of visa',
        ],
        whyTitle: 'Why recommend WTP',
        why: [
          { title: 'Visa + bank + tax — one process', text: "We don't do visa separately from banking strategy. One manager, one logic, one timeline." },
          { title: '200+ cases, one visit', text: 'We know which documents get stuck, which medical centers are faster, when to fly. Family in parallel.' },
          { title: 'The client stays yours', text: 'Contractual protection: non-solicitation, dedicated channel, SLA.' },
        ],
        nextStepsTitle: 'Next steps',
        nextSteps: [
          "Send us the client's data and visit goals",
          "We'll determine the route and prepare documents",
          'Client flies once — everything is completed in one visit',
        ],
      },
    },
  },

  // ═══ 3. LAST WILL ═══
  {
    id: 'last-will',
    accent: '#8e2de2',
    gradient: 'linear-gradient(135deg, #8e2de2 0%, #6a1b9a 50%, #1a0533 100%)',
    contact: {
      name: 'Zueva Olga',
      role_ru: 'Legal Services',
      role_en: 'Legal Services',
      email: 'Zueva@wtp.ae',
      phone: '+971502407916',
    },

    b2c: {
      ru: {
        tag: 'ULTRA-PREMIUM PRIVATE CLIENT PITCH',
        headline: 'Last Will & Testament.\nDubai Courts.',
        sub: 'Официальный юридический документ, фиксирующий волю владельца активов в отношении счетов, недвижимости и бизнеса в ОАЭ. После регистрации в судах Дубая — прямая инструкция суду.',
        cta: 'Персональная консультация',
        stat: '1', statLabel: 'документ · обязательная\nинструкция суду Дубая',
        painPoints: [
          'Банковский счёт блокируется —\nневозможно платить подрядчикам',
          'Готовая недвижимость не может быть продана\nили переоформлена до решения суда',
          'Off-plan объект «зависает»:\nзастройщик не принимает инструкции без суда',
        ],
        benefits: [
          { title: 'Прямое исполнение', text: 'Суду не нужно устанавливать волю — он сразу переходит к исполнению по тексту завещания.' },
          { title: 'Полномочия executor', text: 'Назначенный исполнитель сразу взаимодействует с банками и застройщиками без ожидания судебных шагов.' },
          { title: 'Real estate & off-plan', text: 'По готовой — быстрая передача прав. По off-plan — executor продолжает платежи и получает объект после сдачи.' },
          { title: 'Защита от Waqf-сценария', text: 'По ст. 241 UAE Personal Status Law (янв 2026) без завещания и подтверждённых наследников активы могут быть направлены в Waqf. Завещание заменяет этот сценарий прямым исполнением воли владельца.' },
        ],
        processTitle: 'Как это работает',
        process: [
          { num: '01', title: 'Консультация', text: 'Частная встреча — онлайн или визит: счета, готовая и off-plan недвижимость, бизнес-активы, executor.', timing: 'День 1' },
          { num: '02', title: 'Структурирование', text: 'Наследники, доли, опекунство, executor. Разбор сценариев.', timing: 'День 1' },
          { num: '03', title: 'Оформление', text: 'Текст завещания в формате Dubai Courts, согласование, запись на регистрацию.', timing: 'День 2' },
          { num: '04', title: 'Регистрация', text: 'Онлайн по Zoom (резиденты и не-резиденты) или личный визит в Dubai Courts. В силу немедленно.', timing: '1–2 дня' },
        ],
        includesTitle: 'Что входит',
        includes: [
          'Частная консультация и анализ активов',
          'Структура executor и рекомендации',
          'Положения об опекунстве',
          'Структурирование real estate и off-plan',
          'Текст завещания (формат Dubai Courts)',
          'Сопровождение регистрации в суде',
          'Оригинал документа и хранение',
          'Рекомендации по обновлению',
        ],
        proofCards: [
          { number: '1', label: 'документ — полная структура активов в ОАЭ' },
          { number: 'Dubai', label: 'Courts — прямая регистрация' },
          { number: '2019', label: 'с 2019 года · частная практика' },
        ],
        why: [
          { title: 'Формулировки под исполнение', text: 'Текст завещания построен под прямое исполнение судами Дубая — без двусмысленностей, которые задерживают процесс.' },
          { title: 'Учёт real estate и off-plan', text: 'Завещание интегрирует счета, готовую недвижимость и off-plan объекты в единую структуру исполнения.' },
          { title: 'Обновления сопровождаются', text: 'При изменении семьи или состава активов мы обновляем завещание — executor и структура остаются актуальными.' },
        ],
        closing: 'Завещание оформляется за 1–2 рабочих дня и защищает активы постоянно.\nРегистрация — онлайн по Zoom или личный визит в суды Дубая.',
      },
      en: {
        tag: 'ULTRA-PREMIUM PRIVATE CLIENT PITCH',
        headline: 'Last Will & Testament.\nDubai Courts.',
        sub: 'An official legal document that records the asset owner’s instructions regarding accounts, real estate and business assets in the UAE. Once registered with the Dubai Courts, it becomes a direct instruction to the court.',
        cta: 'Private Consultation',
        stat: '1', statLabel: 'document · binding instruction\nto the Dubai Courts',
        painPoints: [
          'A bank account is frozen,\npreventing payments to contractors',
          'Completed property cannot be sold\nor transferred pending court orders',
          'An off-plan unit is stalled as developers\nrequire court instructions',
        ],
        benefits: [
          { title: 'Direct execution', text: 'The court does not investigate intent — it proceeds directly to execution based on the Will.' },
          { title: 'Executor authority', text: 'The appointed executor immediately liaises with banks and developers without waiting on court steps.' },
          { title: 'Real estate & off-plan', text: 'For completed property — efficient ownership transfer. For off-plan — the executor continues payments and receives the unit upon completion.' },
          { title: 'Waqf-scenario protection', text: 'Under Article 241 of the UAE Personal Status Law (Jan 2026), assets without a Will and verified heirs may be directed to Waqf. A Will replaces that scenario with direct execution of the owner’s intent.' },
        ],
        processTitle: 'How It Works',
        process: [
          { num: '01', title: 'Consultation', text: 'Private review — online or in person: accounts, completed and off-plan property, business assets, executor intent.', timing: 'Day 1' },
          { num: '02', title: 'Structuring', text: 'Heirs, shares, guardianship, executor. Scenario walk-through.', timing: 'Day 1' },
          { num: '03', title: 'Drafting', text: 'Will text in Dubai Courts format, review and registration booking.', timing: 'Day 2' },
          { num: '04', title: 'Registration', text: 'Online via Zoom (residents and non-residents) or in-person at the Dubai Courts. Effective immediately.', timing: '1–2 days' },
        ],
        includesTitle: "What's Included",
        includes: [
          'Private consultation & asset review',
          'Executor structure & recommendations',
          'Guardianship provisions',
          'Real estate & off-plan structuring',
          'Will drafting (Dubai Courts format)',
          'Registration support',
          'Original document & safekeeping guidance',
          'Update recommendations',
        ],
        proofCards: [
          { number: '1', label: 'document — full UAE asset structure' },
          { number: 'Dubai', label: 'Courts — direct registration' },
          { number: '2019', label: 'UAE private client practice since' },
        ],
        why: [
          { title: 'Wording built for execution', text: 'The Will is drafted for direct enforcement by the Dubai Courts — no ambiguities that delay the process.' },
          { title: 'Real estate & off-plan aware', text: 'The Will integrates accounts, completed property and off-plan units into a single execution structure.' },
          { title: 'Updates accompanied', text: 'As family or asset composition changes, we update the Will — executor and structure kept current.' },
        ],
        closing: 'A Will is prepared in 1–2 business days and protects assets continuously.\nRegistration — online via Zoom or in person at the Dubai Courts.',
      },
    },

    partner: {
      ru: {
        tag: 'PARTNER BRIEF · ULTRA-PREMIUM',
        headline: 'Last Will & Testament —\nDubai Courts для вашего клиента',
        sub: 'Частная структура завещания для HNW: обязательная инструкция суду по счетам, недвижимости и off-plan активам в ОАЭ. Оформление за 1–2 рабочих дня, регистрация онлайн по Zoom или визитом в Dubai Courts.',
        cta: 'Передать кейс',
        clientProfile: {
          title: 'Кто этот клиент',
          items: [
            'Резидент ОАЭ с счетами, готовой недвижимостью и off-plan',
            'Не-мусульманин — ожидает применения права гражданства, но судебная процедура сохраняется',
            'Семья с детьми — нужны положения об опекунстве и executor',
            'Часто совмещает завещание с банковской структурой и Foundation',
          ],
        },
        stat: 'Dubai Courts', statLabel: 'регистрация, а не только подготовка\nдокумента',
        consequences: [
          'По ст. 241 UAE Personal Status Law (янв 2026) — без завещания и подтверждённых наследников активы могут быть направлены в Waqf',
          'Банковский счёт блокируется — невозможно платить подрядчикам и продолжать операции',
          'Готовая недвижимость не может быть переоформлена — наследники ждут суда',
          'Off-plan объект «зависает»: застройщик не принимает инструкции без судебного распоряжения',
        ],
        scopeTitle: 'Что входит в услугу',
        scope: [
          'Частная консультация',
          'Структура executor',
          'Положения об опекунстве',
          'Real estate и off-plan',
          'Текст завещания (Dubai Courts)',
          'Сопровождение регистрации',
          'Оригинал и хранение',
          'Рекомендации по обновлению',
        ],
        timeline: '1–2 рабочих дня + онлайн по Zoom или визит в Dubai Courts',
        deliverable: 'Зарегистрированное Last Will (Dubai Courts)',
        processTitle: 'Как работает процесс',
        process: [
          { num: '01', title: 'Передача кейса', text: 'Партнёр передаёт профиль клиента и карту активов в ОАЭ.', timing: 'День 0' },
          { num: '02', title: 'Структурирование', text: 'Executor, наследники, опекунство, сценарии по real estate и off-plan.', timing: 'День 1' },
          { num: '03', title: 'Согласование', text: 'Текст завещания в формате Dubai Courts, правки, запись на регистрацию.', timing: 'День 2' },
          { num: '04', title: 'Регистрация', text: 'Онлайн по Zoom (резиденты и не-резиденты) или визит в Dubai Courts. В силу немедленно.', timing: '1–2 дня' },
        ],
        revenueTitle: 'Модель для партнёра',
        revenueIntro: 'Завещание — точка входа в wealth protection HNW-клиента. С янв 2026 (ст. 241 UAE PSL) регистрация в ОАЭ стала критичной. Часто ведёт к банковскому структурированию и Foundation.',
        tiers: [
          { name: 'Single Will', desc: 'Один заявитель. Dubai Courts.' },
          { name: 'Mirror Will', desc: 'Для супругов. Два перекрёстных завещания.' },
          { name: 'Will + Guardianship', desc: 'Завещание + опекунство. Для семей с детьми.' },
          { name: 'Will + Foundation', desc: 'Комплексная защита. Максимальный LTV.' },
        ],
        riskTitle: 'Границы и стоп-факторы',
        riskIntro: 'Что мы контролируем и что НЕ гарантируем:',
        stopFactors: [
          'Завещание покрывает активы в ОАЭ — для международных активов нужны отдельные инструменты',
          'Завещания, оформленные только за границей, не всегда автоматически применимы к активам в ОАЭ',
          'Изменения в праве страны гражданства не отменяют судебную процедуру ОАЭ',
          'Изменения в составе семьи или активов требуют обновления завещания',
        ],
        whyTitle: 'Почему рекомендовать WTP',
        why: [
          { title: 'Формулировки под исполнение', text: 'Текст построен под прямое исполнение судами Дубая. Клиент защищён от формулировок, которые задерживают процесс.' },
          { title: 'Integrated protection', text: 'Завещание → банковская структура → Foundation. Один HNW-клиент, долгосрочные отношения.' },
          { title: 'Клиент остаётся вашим', text: 'Контрактная защита: non-solicitation, выделенный канал, SLA.' },
        ],
        nextStepsTitle: 'Следующие шаги',
        nextSteps: [
          'Передайте профиль клиента и карту активов в ОАЭ',
          'Мы готовим структуру и текст завещания за 1–2 рабочих дня',
          'Регистрация — онлайн по Zoom или визит клиента в Dubai Courts',
        ],
      },
      en: {
        tag: 'PARTNER BRIEF · ULTRA-PREMIUM',
        headline: 'Last Will & Testament —\nDubai Courts for your client',
        sub: 'A private-client Will structure for HNW families: a binding instruction to the court over accounts, real estate and off-plan assets in the UAE. Prepared in 1–2 business days, registered online via Zoom or in person at the Dubai Courts.',
        cta: 'Submit a Case',
        clientProfile: {
          title: 'Who is this client',
          items: [
            'UAE resident with accounts, completed property and off-plan units',
            'Non-Muslim — expects nationality law to apply, but court procedure still runs',
            'Family with children — needs guardianship and executor provisions',
            'Often combines a Will with banking structure and Foundation',
          ],
        },
        stat: 'Dubai Courts', statLabel: 'registration, not only document\npreparation',
        consequences: [
          'Under Article 241 of the UAE Personal Status Law (Jan 2026) — without a Will and verified heirs, assets may be directed to Waqf',
          'A bank account is frozen — payments to contractors and operations cannot continue',
          'Completed property cannot be transferred — heirs wait pending court orders',
          'An off-plan unit is stalled as developers require a court instruction',
        ],
        scopeTitle: "What's included",
        scope: [
          'Private consultation',
          'Executor structure',
          'Guardianship provisions',
          'Real estate & off-plan',
          'Will drafting (Dubai Courts)',
          'Registration support',
          'Original document & safekeeping',
          'Update recommendations',
        ],
        timeline: '1–2 business days + online via Zoom or Dubai Courts visit',
        deliverable: 'Registered Last Will (Dubai Courts)',
        processTitle: 'How the process works',
        process: [
          { num: '01', title: 'Case submission', text: 'Partner sends the client profile and UAE asset map.', timing: 'Day 0' },
          { num: '02', title: 'Structuring', text: 'Executor, heirs, guardianship, real estate & off-plan scenarios.', timing: 'Day 1' },
          { num: '03', title: 'Review', text: 'Will text in Dubai Courts format, revisions, registration booking.', timing: 'Day 2' },
          { num: '04', title: 'Registration', text: 'Online via Zoom (residents and non-residents) or in-person at the Dubai Courts. Effective immediately.', timing: '1–2 days' },
        ],
        revenueTitle: 'Partner model',
        revenueIntro: 'A Will is the entry point into HNW wealth protection. Since Jan 2026 (Article 241 UAE PSL) UAE-side registration has become critical. It often leads to banking structuring and Foundation work.',
        tiers: [
          { name: 'Single Will', desc: 'One applicant. Dubai Courts.' },
          { name: 'Mirror Will', desc: 'For spouses. Two cross-referenced Wills.' },
          { name: 'Will + Guardianship', desc: 'Will + guardian appointment. For families with children.' },
          { name: 'Will + Foundation', desc: 'Comprehensive protection. Maximum LTV.' },
        ],
        riskTitle: 'Boundaries & stop-factors',
        riskIntro: 'What we control and what we do NOT guarantee:',
        stopFactors: [
          'A Will covers UAE assets — international assets require separate instruments',
          'Wills prepared only abroad may not automatically apply to UAE assets',
          'Nationality-law changes do not remove UAE court procedure',
          'Changes in family or asset composition require Will updates',
        ],
        whyTitle: 'Why recommend WTP',
        why: [
          { title: 'Wording built for execution', text: 'The Will text is drafted for direct enforcement by the Dubai Courts. Your client is protected from wording that delays the process.' },
          { title: 'Integrated protection', text: 'Will → banking structure → Foundation. One HNW client, long-term relationship.' },
          { title: 'The client stays yours', text: 'Contractual protection: non-solicitation, dedicated channel, SLA.' },
        ],
        nextStepsTitle: 'Next steps',
        nextSteps: [
          'Send us the client profile and UAE asset map',
          'We prepare the structure and Will text in 1–2 business days',
          'Registration — online via Zoom or the client visits Dubai Courts',
        ],
      },
    },
  },

  // ═══ 4. FOUNDATION ═══
  {
    id: 'foundation',
    accent: '#004e92',
    gradient: 'linear-gradient(135deg, #004e92 0%, #003366 50%, #001122 100%)',

    b2c: {
      ru: {
        tag: 'ДЛЯ ВЛАДЕЛЬЦЕВ АКТИВОВ И СЕМЕЙ',
        headline: 'Foundation в ОАЭ.\nКонтроль и защита — без потери владения.',
        sub: 'Юридическая структура для защиты активов, наследования и конфиденциального управления.',
        cta: 'Обсудить структуру',
        stat: '50+', statLabel: 'фондов зарегистрировано\nв DIFC, ADGM, RAK ICC',
        painPoints: [
          'Прямое владение — открытая мишень: судебный иск,\nкредитор, развод могут заморозить или уничтожить активы',
          'Шариатское наследование в ОАЭ не учитывает волю владельца.\nFoundation обеспечивает автоматическую передачу',
          'В отличие от траста, учредитель не теряет контроль.\nВы управляете фондом и можете менять правила',
        ],
        benefits: [
          { title: 'Защита активов', text: 'Принадлежат фонду, не физлицу. Защита от исков и кредиторов.' },
          { title: 'Контроль учредителя', text: 'В отличие от траста, вы управляете. Можно менять правила.' },
          { title: 'Наследование', text: 'Автоматическая передача. Без суда, без шариата, без задержек.' },
          { title: 'Конфиденциальность', text: 'Структура не раскрывается публично. Бенефициары защищены.' },
        ],
        processTitle: 'Как это работает',
        process: [
          { num: '01', title: 'Анализ', text: 'Активы и цели. Foundation vs траст vs прямое владение.', timing: 'Неделя 1' },
          { num: '02', title: 'Архитектура', text: 'Учредитель, бенефициары, правила, succession plan.', timing: 'Неделя 2' },
          { num: '03', title: 'Регистрация', text: 'Документы. DIFC, ADGM или RAK ICC.', timing: '2–4 недели' },
          { num: '04', title: 'Интеграция', text: 'Перевод активов, банковские счета, custody.', timing: 'Параллельно' },
        ],
        includesTitle: 'Что входит',
        includes: [
          'Анализ применимости', 'Выбор юрисдикции', 'Проектирование структуры', 'Устав и правила',
          'Регистрация', 'Назначение совета', 'Перевод активов', 'Банкинг и custody',
        ],
        proofCards: [
          { number: '50+', label: 'фондов зарегистрировано' },
          { number: '3', label: 'юрисдикции: DIFC, ADGM, RAK' },
          { number: '100%', label: 'с банковским доступом' },
        ],
        why: [
          { title: '50+ зарегистрированных фондов', text: 'DIFC, ADGM, RAK ICC — работаем со всеми юрисдикциями и подбираем оптимальную под цели и бюджет.' },
          { title: 'Фонд без банка не работает', text: 'Многие регистрируют foundation, а потом не могут открыть счёт. Мы открываем банковский доступ параллельно — Banking-First подход.' },
          { title: 'Живая структура, не документ', text: 'После регистрации ведём reporting, обновляем правила, помогаем с корпоративным управлением.' },
        ],
        closing: 'Foundation — контроль, защита и передача.\nБез потери владения, без суда, без шариата.',
      },
      en: {
        tag: 'FOR ASSET OWNERS & FAMILIES',
        headline: 'UAE Foundation.\nControl and protection — without losing ownership.',
        sub: 'Legal structure for asset protection, succession, and confidential management.',
        cta: 'Discuss Structure',
        stat: '50+', statLabel: 'foundations registered\nacross DIFC, ADGM, RAK ICC',
        painPoints: [
          'Direct ownership is an open target: lawsuit, creditor,\ndivorce can freeze or destroy assets',
          'Sharia inheritance in UAE ignores the owner\'s wishes.\nFoundation ensures automatic controlled transfer',
          'Unlike a trust, the founder retains control.\nYou manage the foundation and can change its rules',
        ],
        benefits: [
          { title: 'Asset Protection', text: 'Belong to foundation, not individual. Protected from claims and creditors.' },
          { title: 'Founder Control', text: 'Unlike trust, you manage. Rules can be changed at any time.' },
          { title: 'Succession', text: 'Automatic transfer. No court, no Sharia, no delays.' },
          { title: 'Confidentiality', text: 'Structure not publicly disclosed. Beneficiaries protected.' },
        ],
        processTitle: 'How It Works',
        process: [
          { num: '01', title: 'Analysis', text: 'Assets and goals. Foundation vs trust vs direct ownership.', timing: 'Week 1' },
          { num: '02', title: 'Architecture', text: 'Founder, beneficiaries, rules, succession plan.', timing: 'Week 2' },
          { num: '03', title: 'Registration', text: 'Documents. DIFC, ADGM or RAK ICC.', timing: '2–4 weeks' },
          { num: '04', title: 'Integration', text: 'Asset transfer, bank accounts, custody.', timing: 'Parallel' },
        ],
        includesTitle: "What's Included",
        includes: [
          'Applicability analysis', 'Jurisdiction selection', 'Structure design', 'Charter & rules',
          'Registration', 'Council appointment', 'Asset transfer', 'Banking & custody',
        ],
        proofCards: [
          { number: '50+', label: 'foundations registered' },
          { number: '3', label: 'jurisdictions: DIFC, ADGM, RAK' },
          { number: '100%', label: 'with banking access' },
        ],
        why: [
          { title: '50+ foundations registered', text: 'DIFC, ADGM, RAK ICC — we work with all jurisdictions and select the optimal one for your goals and budget.' },
          { title: 'Foundation without a bank doesn\'t work', text: 'Many register a foundation, then can\'t open an account. We set up banking in parallel — Banking-First approach.' },
          { title: 'Living structure, not a document', text: 'After registration, we handle reporting, update rules, assist with corporate governance.' },
        ],
        closing: 'A foundation means control, protection, and transfer.\nWithout losing ownership, without court, without Sharia.',
      },
    },

    partner: {
      ru: {
        tag: 'БРИФ ДЛЯ ПАРТНЁРОВ',
        headline: 'Foundation в ОАЭ —\nзащита активов клиента',
        sub: 'DIFC/ADGM/RAK ICC. Защита от исков, наследование без шариата, контроль учредителя.',
        cta: 'Отправить кейс',
        clientProfile: {
          title: 'Кто этот клиент',
          items: [
            'Владелец активов от $1M — недвижимость, доли, инвестиции',
            'Нуждается в защите от исков, кредиторов, развода',
            'Хочет контролируемую передачу — без шариата и суда',
            'Часто совмещает с завещанием и банковским структурированием',
          ],
        },
        stat: '50+', statLabel: 'фондов зарегистрировано\nс 2019 года',
        consequences: [
          'Прямое владение = риск заморозки при иске или споре',
          'Без Foundation — наследование через шариатский суд',
          'Структура без банковского счёта не функционирует',
        ],
        scopeTitle: 'Что входит в услугу',
        scope: [
          'Анализ применимости', 'Выбор юрисдикции', 'Проектирование структуры', 'Устав и правила',
          'Регистрация', 'Назначение совета', 'Перевод активов', 'Банкинг и custody',
        ],
        timeline: '4–8 недель (регистрация + банк)',
        deliverable: 'Зарегистрированный Foundation + банковский счёт',
        processTitle: 'Как работает процесс',
        process: [
          { num: '01', title: 'Передача кейса', text: 'Партнёр отправляет описание активов и целей.', timing: 'День 0' },
          { num: '02', title: 'Архитектура', text: 'Структура, юрисдикция, правила, бенефициары.', timing: '1–2 недели' },
          { num: '03', title: 'Регистрация', text: 'Документы, подача, регистрация в выбранной зоне.', timing: '2–4 недели' },
          { num: '04', title: 'Интеграция', text: 'Банковский счёт, перевод активов, custody.', timing: 'Параллельно' },
        ],
        revenueTitle: 'Модель для партнёра',
        revenueIntro: 'Foundation — высокий чек и долгосрочное обслуживание. Максимальный LTV среди продуктов WTP.',
        tiers: [
          { name: 'RAK ICC Foundation', desc: 'Оптимальный по стоимости. Для базовой защиты.' },
          { name: 'ADGM Foundation', desc: 'Международное признание. Средний бюджет.' },
          { name: 'DIFC Foundation', desc: 'Максимальный престиж. Для крупных активов.' },
          { name: 'Foundation + Will', desc: 'Комплексный пакет. Защита + наследование.' },
        ],
        riskTitle: 'Границы и стоп-факторы',
        riskIntro: 'Что мы контролируем и что НЕ гарантируем:',
        stopFactors: [
          'Foundation не скрывает активы от налоговых органов — это не офшор',
          'Минимальный порог: активы от $500K (ниже — не оправдано)',
          'Банковский счёт для Foundation — отдельный процесс с due diligence',
          'Ежегодные расходы на обслуживание: аудит, reporting, лицензии',
        ],
        whyTitle: 'Почему рекомендовать WTP',
        why: [
          { title: 'Foundation + банк параллельно', text: 'Мы не регистрируем структуру без банковского доступа. 50+ фондов — все с рабочими счетами.' },
          { title: 'Три юрисдикции, один подход', text: 'DIFC, ADGM, RAK ICC — подбираем по целям и бюджету клиента. Один менеджер.' },
          { title: 'Клиент остаётся вашим', text: 'Контрактная защита: non-solicitation, выделенный канал, SLA.' },
        ],
        nextStepsTitle: 'Следующие шаги',
        nextSteps: [
          'Отправьте описание активов и целей клиента',
          'Мы подготовим архитектуру и выбор юрисдикции за 1–2 недели',
          'Клиент получает зарегистрированный Foundation + банковский счёт',
        ],
      },
      en: {
        tag: 'PARTNER BRIEF',
        headline: 'UAE Foundation —\nclient asset protection',
        sub: 'DIFC/ADGM/RAK ICC. Claim protection, Sharia-free succession, founder control.',
        cta: 'Submit a Case',
        clientProfile: {
          title: 'Who is this client',
          items: [
            'Asset owner from $1M — property, shares, investments',
            'Needs protection from lawsuits, creditors, divorce',
            'Wants controlled transfer — no Sharia, no court',
            'Often combines with will and banking structuring',
          ],
        },
        stat: '50+', statLabel: 'foundations registered\nsince 2019',
        consequences: [
          'Direct ownership = freeze risk if lawsuit or dispute',
          'Without Foundation — inheritance through Sharia court',
          'Structure without a bank account does not function',
        ],
        scopeTitle: "What's included",
        scope: [
          'Applicability analysis', 'Jurisdiction selection', 'Structure design', 'Charter & rules',
          'Registration', 'Council appointment', 'Asset transfer', 'Banking & custody',
        ],
        timeline: '4–8 weeks (registration + bank)',
        deliverable: 'Registered Foundation + bank account',
        processTitle: 'How the process works',
        process: [
          { num: '01', title: 'Case submission', text: 'Partner sends asset description and goals.', timing: 'Day 0' },
          { num: '02', title: 'Architecture', text: 'Structure, jurisdiction, rules, beneficiaries.', timing: '1–2 weeks' },
          { num: '03', title: 'Registration', text: 'Documents, filing, registration in chosen zone.', timing: '2–4 weeks' },
          { num: '04', title: 'Integration', text: 'Bank account, asset transfer, custody.', timing: 'Parallel' },
        ],
        revenueTitle: 'Partner model',
        revenueIntro: 'Foundation is a high-ticket product with long-term servicing. Maximum LTV among WTP products.',
        tiers: [
          { name: 'RAK ICC Foundation', desc: 'Cost-optimal. For basic protection.' },
          { name: 'ADGM Foundation', desc: 'International recognition. Mid-range budget.' },
          { name: 'DIFC Foundation', desc: 'Maximum prestige. For large asset portfolios.' },
          { name: 'Foundation + Will', desc: 'Comprehensive package. Protection + succession.' },
        ],
        riskTitle: 'Boundaries & stop-factors',
        riskIntro: 'What we control and what we do NOT guarantee:',
        stopFactors: [
          'Foundation does not hide assets from tax authorities — this is not an offshore scheme',
          'Minimum threshold: assets from $500K (below — not justified)',
          'Bank account for Foundation — separate process with due diligence',
          'Annual maintenance costs: audit, reporting, licenses',
        ],
        whyTitle: 'Why recommend WTP',
        why: [
          { title: 'Foundation + bank in parallel', text: "We don't register a structure without banking access. 50+ foundations — all with working accounts." },
          { title: 'Three jurisdictions, one approach', text: "DIFC, ADGM, RAK ICC — we match to the client's goals and budget. One manager." },
          { title: 'The client stays yours', text: 'Contractual protection: non-solicitation, dedicated channel, SLA.' },
        ],
        nextStepsTitle: 'Next steps',
        nextSteps: [
          "Send us the client's asset description and goals",
          "We'll prepare architecture and jurisdiction selection in 1–2 weeks",
          'Client receives registered Foundation + bank account',
        ],
      },
    },
  },

  // ═══ 5. OPEN COMPANY ═══
  {
    id: 'open-company',
    accent: '#c0392b',
    gradient: 'linear-gradient(135deg, #c0392b 0%, #962d22 50%, #2c0b08 100%)',

    b2c: {
      ru: {
        tag: 'ДЛЯ ПРЕДПРИНИМАТЕЛЕЙ И ИНВЕСТОРОВ',
        headline: 'Компания в ОАЭ.\nРегистрация, которая проходит банк.',
        sub: 'Не лицензия — рабочая структура, принятая банком. Зона, лицензия и банк под вашу модель.',
        cta: 'Начать регистрацию',
        stat: '300+', statLabel: 'компаний зарегистрировано\nс открытым банковским счётом',
        painPoints: [
          'Клиент платит $5–15K за регистрацию — и не может открыть счёт.\nБанк отказывает: агент не учёл банковские требования',
          'Каждая неудачная подача в банк фиксируется.\nПосле 2–3 отказов шансы падают критически',
          'Мы работаем наоборот: сначала проверяем,\nпримет ли банк структуру — и только потом регистрируем',
        ],
        benefits: [
          { title: 'Bankable структура', text: 'Под конкретный банк. Зона, лицензия, activity codes — с подтверждением.' },
          { title: 'Правильная зона', text: 'Mainland или Freezone — подбираем по модели и бюджету, не по рекламе зоны.' },
          { title: 'Лицензия', text: 'Тип, который банк примет. Без лишних activity codes, которые триггерят compliance.' },
          { title: 'Полный пакет', text: 'Регистрация, lease, establishment card, все документы для банка.' },
        ],
        processTitle: 'Как это работает',
        process: [
          { num: '01', title: 'Pre-screen', text: 'Бизнес-модель, KYC, банковский сценарий.', timing: '5–7 дней' },
          { num: '02', title: 'Архитектура', text: 'Зона, лицензия, структура владения.', timing: 'Неделя 2' },
          { num: '03', title: 'Регистрация', text: 'Лицензия, lease, establishment card.', timing: '2–4 недели' },
          { num: '04', title: 'Банк', text: 'Подача, compliance, корпоративный счёт.', timing: '1–3 недели' },
        ],
        includesTitle: 'Что входит',
        includes: [
          'Pre-screen и стратегия', 'Юрисдикция и лицензия', 'Регистрация', 'Trade License',
          'Lease / офис', 'Establishment Card', 'Подача в банк', 'ESR compliance',
        ],
        proofCards: [
          { number: '300+', label: 'компаний с банковским счётом' },
          { number: '0', label: 'компаний без счёта' },
          { number: '70%', label: 'клиентов по рекомендации' },
        ],
        why: [
          { title: '300+ компаний с банковским счётом', text: 'Не просто зарегистрированных — с работающим счётом. Принципиальная разница между нами и агентами, которые продают лицензии.' },
          { title: 'Pre-screen экономит $5–15K', text: 'Если банк не примет структуру — мы скажем до регистрации. Вы не потратите деньги на компанию, которая не сможет работать.' },
          { title: 'Один менеджер, один таймлайн', text: 'Компания + счёт + виза + офис — один проект. Госпошлины по себестоимости, наше вознаграждение прозрачно.' },
        ],
        closing: 'Компания в ОАЭ без банковского счёта — лицензия на стену.\n300+ наших клиентов получили и компанию, и счёт.',
      },
      en: {
        tag: 'FOR ENTREPRENEURS & INVESTORS',
        headline: 'UAE Company.\nRegistration that passes the bank.',
        sub: 'Not a license — a working structure accepted by banks. Zone, license, and bank matched to your model.',
        cta: 'Start Registration',
        stat: '300+', statLabel: 'companies registered\nwith open bank accounts',
        painPoints: [
          'Client pays $5–15K for registration — can\'t open an account.\nBank declines: agent didn\'t consider banking requirements',
          'Every failed bank application is recorded.\nAfter 2–3 rejections, chances drop critically',
          'We work the opposite way: first verify if\nthe bank will accept the structure — only then register',
        ],
        benefits: [
          { title: 'Bankable Structure', text: 'For a specific bank. Zone, license, activity codes — with confirmation.' },
          { title: 'Right Zone', text: 'Mainland or Freezone — matched by model and budget, not zone marketing.' },
          { title: 'Matched License', text: 'Type the bank accepts. No unnecessary activity codes that trigger compliance.' },
          { title: 'Full Package', text: 'Registration, lease, establishment card, all documents for the bank.' },
        ],
        processTitle: 'How It Works',
        process: [
          { num: '01', title: 'Pre-screen', text: 'Business model, KYC, banking scenario.', timing: '5–7 days' },
          { num: '02', title: 'Architecture', text: 'Zone, license, ownership structure.', timing: 'Week 2' },
          { num: '03', title: 'Registration', text: 'License, lease, establishment card.', timing: '2–4 weeks' },
          { num: '04', title: 'Bank', text: 'Application, compliance, corporate account.', timing: '1–3 weeks' },
        ],
        includesTitle: "What's Included",
        includes: [
          'Pre-screen & strategy', 'Jurisdiction & license', 'Registration', 'Trade License',
          'Lease / office', 'Establishment Card', 'Bank application', 'ESR compliance',
        ],
        proofCards: [
          { number: '300+', label: 'companies with bank accounts' },
          { number: '0', label: 'companies without accounts' },
          { number: '70%', label: 'clients by referral' },
        ],
        why: [
          { title: '300+ companies with bank accounts', text: 'Not just registered — with working accounts. The fundamental difference between us and agents selling licenses.' },
          { title: 'Pre-screen saves $5–15K', text: "If the bank won't accept the structure — we tell you before registration. You don't spend money on a company that can't operate." },
          { title: 'One manager, one timeline', text: 'Company + account + visa + office — one project. Government fees at cost, our fee is transparent.' },
        ],
        closing: 'A UAE company without a bank account is a license on the wall.\n300+ of our clients received both a company and an account.',
      },
    },

    partner: {
      ru: {
        tag: 'БРИФ ДЛЯ ПАРТНЁРОВ',
        headline: 'Регистрация компании —\nс гарантией банковского счёта',
        sub: 'Mainland и Freezone. Pre-screen, лицензия, регистрация, банк — один процесс.',
        cta: 'Отправить кейс',
        clientProfile: {
          title: 'Кто этот клиент',
          items: [
            'Предприниматель, планирующий бизнес в ОАЭ',
            'Инвестор, которому нужна структура для владения активами',
            'Клиент, которому уже отказали в банковском счёте',
            'Часто совмещает с визой, банковским счётом и офисом',
          ],
        },
        stat: '300+', statLabel: 'компаний зарегистрировано\nвсе с банковским счётом',
        consequences: [
          'Регистрация без pre-screen = высокий риск банковского отказа',
          'Неправильная зона или activity code = невозможность открыть счёт',
          'Клиент теряет $5–15K и месяцы на нерабочую структуру',
        ],
        scopeTitle: 'Что входит в услугу',
        scope: [
          'Pre-screen и стратегия', 'Юрисдикция и лицензия', 'Регистрация', 'Trade License',
          'Lease / офис', 'Establishment Card', 'Подача в банк', 'ESR compliance',
        ],
        timeline: '4–8 недель (регистрация + банк)',
        deliverable: 'Trade License + корпоративный банковский счёт',
        processTitle: 'Как работает процесс',
        process: [
          { num: '01', title: 'Передача кейса', text: 'Партнёр отправляет описание бизнеса и KYC.', timing: 'День 0' },
          { num: '02', title: 'Pre-screen', text: 'Банковский сценарий, зона, лицензия.', timing: '5–7 дней' },
          { num: '03', title: 'Регистрация', text: 'Лицензия, lease, establishment card.', timing: '2–4 недели' },
          { num: '04', title: 'Банк', text: 'Подача, compliance, корпоративный счёт.', timing: '1–3 недели' },
        ],
        revenueTitle: 'Модель для партнёра',
        revenueIntro: 'Регистрация — основной продукт с высоким апселлом: виза, банк, бухгалтерия, compliance.',
        tiers: [
          { name: 'Freezone', desc: 'Популярные зоны: DMCC, IFZA, RAKEZ. Быстрый старт.' },
          { name: 'Mainland', desc: 'DET лицензия. Для работы с локальным рынком.' },
          { name: 'Setup (пакет)', desc: 'Компания + виза + счёт. Один таймлайн, один fee.' },
          { name: 'Control', desc: 'Бухгалтерия + compliance + ESR. Максимальный LTV.' },
        ],
        riskTitle: 'Границы и стоп-факторы',
        riskIntro: 'Что мы контролируем и что НЕ гарантируем:',
        stopFactors: [
          'Pre-screen может дать результат NO-GO — лучше до, чем после оплаты',
          'Госпошлины зависят от зоны и лицензии — передаются по себестоимости',
          'Банковский счёт — отдельный процесс, зависит от compliance банка',
          'ESR-отчётность обязательна — мы помогаем, но ответственность на компании',
        ],
        whyTitle: 'Почему рекомендовать WTP',
        why: [
          { title: '300+ компаний, 0 без счёта', text: 'Каждая компания зарегистрирована с банковским счётом. Pre-screen до регистрации — наш стандарт.' },
          { title: 'Banking-First, не License-First', text: 'Мы начинаем с банка. Зона и лицензия подбираются под банковские требования, а не наоборот.' },
          { title: 'Клиент остаётся вашим', text: 'Контрактная защита: non-solicitation, выделенный канал, SLA.' },
        ],
        nextStepsTitle: 'Следующие шаги',
        nextSteps: [
          'Отправьте описание бизнеса и KYC-данные клиента',
          'Мы проведём pre-screen за 5–7 дней',
          'Клиент получает зарегистрированную компанию + банковский счёт',
        ],
      },
      en: {
        tag: 'PARTNER BRIEF',
        headline: 'Company registration —\nwith bank account guaranteed',
        sub: 'Mainland and Freezone. Pre-screen, license, registration, bank — one process.',
        cta: 'Submit a Case',
        clientProfile: {
          title: 'Who is this client',
          items: [
            'Entrepreneur planning a business in the UAE',
            'Investor needing a structure for asset ownership',
            'Client already declined by a bank for an account',
            'Often combines with visa, bank account, and office',
          ],
        },
        stat: '300+', statLabel: 'companies registered\nall with bank accounts',
        consequences: [
          'Registration without pre-screen = high risk of bank rejection',
          'Wrong zone or activity code = unable to open an account',
          'Client loses $5–15K and months on a non-working structure',
        ],
        scopeTitle: "What's included",
        scope: [
          'Pre-screen & strategy', 'Jurisdiction & license', 'Registration', 'Trade License',
          'Lease / office', 'Establishment Card', 'Bank application', 'ESR compliance',
        ],
        timeline: '4–8 weeks (registration + bank)',
        deliverable: 'Trade License + corporate bank account',
        processTitle: 'How the process works',
        process: [
          { num: '01', title: 'Case submission', text: 'Partner sends business description and KYC.', timing: 'Day 0' },
          { num: '02', title: 'Pre-screen', text: 'Banking scenario, zone, license.', timing: '5–7 days' },
          { num: '03', title: 'Registration', text: 'License, lease, establishment card.', timing: '2–4 weeks' },
          { num: '04', title: 'Bank', text: 'Application, compliance, corporate account.', timing: '1–3 weeks' },
        ],
        revenueTitle: 'Partner model',
        revenueIntro: 'Registration is the core product with high upsell: visa, bank, accounting, compliance.',
        tiers: [
          { name: 'Freezone', desc: 'Popular zones: DMCC, IFZA, RAKEZ. Quick start.' },
          { name: 'Mainland', desc: 'DET license. For working with the local market.' },
          { name: 'Setup (package)', desc: 'Company + visa + account. One timeline, one fee.' },
          { name: 'Control', desc: 'Accounting + compliance + ESR. Maximum LTV.' },
        ],
        riskTitle: 'Boundaries & stop-factors',
        riskIntro: 'What we control and what we do NOT guarantee:',
        stopFactors: [
          'Pre-screen may result in NO-GO — better before than after paying',
          'Government fees depend on zone and license — passed at cost',
          'Bank account — separate process, depends on bank compliance',
          'ESR reporting is mandatory — we assist, but responsibility is on the company',
        ],
        whyTitle: 'Why recommend WTP',
        why: [
          { title: '300+ companies, 0 without accounts', text: 'Every company registered with a bank account. Pre-screen before registration is our standard.' },
          { title: 'Banking-First, not License-First', text: 'We start with the bank. Zone and license are matched to banking requirements, not the other way around.' },
          { title: 'The client stays yours', text: 'Contractual protection: non-solicitation, dedicated channel, SLA.' },
        ],
        nextStepsTitle: 'Next steps',
        nextSteps: [
          "Send us the client's business description and KYC data",
          "We'll run the pre-screen in 5–7 days",
          'Client receives registered company + bank account',
        ],
      },
    },
  },

  // ═══ 6. OPEN BANK ACCOUNT ═══
  {
    id: 'open-bank-account',
    accent: '#003d73',
    gradient: 'linear-gradient(135deg, #003d73 0%, #002a52 50%, #000d1a 100%)',

    b2c: {
      ru: {
        tag: 'ДЛЯ ФИЗИЧЕСКИХ ЛИЦ И КОМПАНИЙ',
        headline: 'Банковский счёт в ОАЭ.\nВключая сложные профили.',
        sub: 'Личные и корпоративные счета. Подбор банка, SOF, compliance — даже для сложных юрисдикций.',
        cta: 'Проверить bankability',
        stat: '400+', statLabel: 'счетов открыто\nвключая High Risk профили',
        painPoints: [
          'С 2022 года банки ОАЭ кардинально ужесточили проверки.\nКлиенты со сложными профилями получают отказы без объяснений',
          'Подача «на удачу» — стратегическая ошибка. Каждый отказ\nфиксируется в Al Etihad Credit Bureau и снижает шансы',
          'SOF (Source of Funds) — причина 70% отказов.\nМы готовим пакет под конкретный банк, не шаблон',
        ],
        benefits: [
          { title: 'Подбор банка', text: 'Анализ профиля → точечный подбор. Знаем критерии каждого банка.' },
          { title: 'SOF-пакет', text: 'Главная причина отказов. Индивидуальный пакет под конкретный банк.' },
          { title: 'Сопровождение', text: 'От подачи до активации. Дорабатываем пакет по запросу банка.' },
          { title: 'Сложные профили', text: 'РФ паспорт, крипто-доходы, множественные юрисдикции — работаем.' },
        ],
        processTitle: 'Как это работает',
        process: [
          { num: '01', title: 'Профилирование', text: 'Гражданство, резидентство, доходы, обороты.', timing: 'День 1' },
          { num: '02', title: 'Стратегия', text: 'Банк, SOF-пакет, business cycle.', timing: '3–5 дней' },
          { num: '03', title: 'Подача', text: 'Документы, визит, сопровождение в банке.', timing: '1–2 дня' },
          { num: '04', title: 'Активация', text: 'Реквизиты, online banking, тестовая транзакция.', timing: '1–3 недели' },
        ],
        includesTitle: 'Что входит',
        includes: [
          'Анализ профиля', 'Подбор банка', 'SOF документация', 'Business cycle',
          'Подача и отслеживание', 'Визит в банк', 'Разблокировка', 'Premium banking (опц.)',
        ],
        proofCards: [
          { number: '400+', label: 'счетов открыто' },
          { number: '70%', label: 'SOF — причина отказов' },
          { number: '95%', label: 'успешных подач' },
        ],
        why: [
          { title: '400+ счетов открыто', text: 'Личные и корпоративные, включая High Risk профили. Мы не подаём наугад — точно знаем, куда подавать ваш профиль.' },
          { title: 'SOF — наша специализация', text: 'Source of Funds — причина 70% отказов. Индивидуальный пакет: структура, формулировки, подтверждающие документы.' },
          { title: 'Если банк запросил — мы дорабатываем', text: 'Дополнительные документы, уточнения compliance, повторная подача — ведём процесс до результата.' },
        ],
        closing: '400+ счетов. Включая кейсы, от которых отказались другие.\nЕсли банковский счёт — ваша главная проблема, мы её решаем.',
      },
      en: {
        tag: 'FOR INDIVIDUALS & COMPANIES',
        headline: 'UAE Bank Account.\nIncluding complex profiles.',
        sub: 'Personal and corporate accounts. Bank selection, SOF, compliance — even for complex jurisdictions.',
        cta: 'Check Bankability',
        stat: '400+', statLabel: 'accounts opened\nincluding High Risk profiles',
        painPoints: [
          'Since 2022, UAE banks have drastically tightened checks.\nClients with complex profiles get rejections without explanation',
          'Applying "hopefully" is a strategic mistake. Every rejection\nis recorded in Al Etihad Credit Bureau and reduces chances',
          'SOF (Source of Funds) is the reason for 70% of rejections.\nWe prepare packages per specific bank, not a template',
        ],
        benefits: [
          { title: 'Bank Selection', text: 'Profile analysis → targeted match. We know each bank\'s criteria.' },
          { title: 'SOF Package', text: '#1 rejection reason. Individual package per specific bank.' },
          { title: 'Full Support', text: 'Filing to activation. We refine the package per bank requests.' },
          { title: 'Complex Profiles', text: 'RF passport, crypto income, multiple jurisdictions — we handle it.' },
        ],
        processTitle: 'How It Works',
        process: [
          { num: '01', title: 'Profiling', text: 'Citizenship, residency, income, turnover.', timing: 'Day 1' },
          { num: '02', title: 'Strategy', text: 'Bank, SOF package, business cycle.', timing: '3–5 days' },
          { num: '03', title: 'Filing', text: 'Documents, visit, in-bank support.', timing: '1–2 days' },
          { num: '04', title: 'Activation', text: 'Credentials, online banking, test transaction.', timing: '1–3 weeks' },
        ],
        includesTitle: "What's Included",
        includes: [
          'Profile analysis', 'Bank matching', 'SOF documentation', 'Business cycle',
          'Filing & tracking', 'Bank visit', 'Unblocking', 'Premium banking (opt.)',
        ],
        proofCards: [
          { number: '400+', label: 'accounts opened' },
          { number: '70%', label: 'SOF — rejection cause' },
          { number: '95%', label: 'successful applications' },
        ],
        why: [
          { title: '400+ accounts opened', text: 'Personal and corporate, including High Risk profiles. We don\'t file randomly — we know exactly where to file your profile.' },
          { title: 'SOF is our specialty', text: 'Source of Funds — reason for 70% of rejections. Individual package: structure, wording, supporting documents.' },
          { title: 'If the bank asks — we refine', text: 'Additional documents, compliance clarifications, resubmission — we manage the process to completion.' },
        ],
        closing: '400+ accounts. Including cases others declined.\nIf a bank account is your main problem, we solve it.',
      },
    },

    partner: {
      ru: {
        tag: 'БРИФ ДЛЯ ПАРТНЁРОВ',
        headline: 'Банковский счёт —\nвключая сложные профили',
        sub: 'Личные и корпоративные счета. SOF-специализация. Работаем с профилями, от которых другие отказались.',
        cta: 'Отправить кейс',
        clientProfile: {
          title: 'Кто этот клиент',
          items: [
            'Физлицо или компания — нужен счёт в банке ОАЭ',
            'Сложный профиль: РФ паспорт, крипто, множественные юрисдикции',
            'Уже получал отказ(ы) — нужен профессиональный подход',
            'Часто совмещает с регистрацией компании или визой',
          ],
        },
        stat: '400+', statLabel: 'счетов открыто\nс 2019 года',
        consequences: [
          'Подача «наугад» фиксируется в Credit Bureau — снижает шансы',
          'SOF без подготовки = 70% вероятность отказа',
          'Отказ банка ставит под сомнение вашу рекомендацию',
        ],
        scopeTitle: 'Что входит в услугу',
        scope: [
          'Анализ профиля', 'Подбор банка', 'SOF документация', 'Business cycle',
          'Подача и отслеживание', 'Визит в банк', 'Разблокировка', 'Premium banking (опц.)',
        ],
        timeline: '2–4 недели (подготовка + подача + результат)',
        deliverable: 'Активный банковский счёт + online banking',
        processTitle: 'Как работает процесс',
        process: [
          { num: '01', title: 'Передача кейса', text: 'Партнёр отправляет данные клиента и цель.', timing: 'День 0' },
          { num: '02', title: 'Профилирование', text: 'Анализ профиля, подбор банка, SOF-стратегия.', timing: '3–5 дней' },
          { num: '03', title: 'Подача', text: 'Документы, визит клиента, сопровождение в банке.', timing: '1–2 дня' },
          { num: '04', title: 'Результат', text: 'Счёт активен. Online banking, тестовая транзакция.', timing: '1–3 недели' },
        ],
        revenueTitle: 'Модель для партнёра',
        revenueIntro: 'Банковский счёт — ключевая боль клиента. Высокая конверсия реферала.',
        tiers: [
          { name: 'Личный счёт', desc: 'Для физлица. Savings или current account.' },
          { name: 'Корпоративный счёт', desc: 'Для компании. Mainland или Freezone.' },
          { name: 'Premium / Private', desc: 'Минимум AED 1M. Выделенный банкир.' },
          { name: 'Multi-currency', desc: 'Счета в нескольких валютах. Для международного бизнеса.' },
        ],
        riskTitle: 'Границы и стоп-факторы',
        riskIntro: 'Что мы контролируем и что НЕ гарантируем:',
        stopFactors: [
          'Окончательное решение принимает банк — мы максимизируем шансы',
          'Санкционные списки — не работаем с SDN/OFAC',
          'Клиент без документов = NO-GO до предоставления KYC',
          'Крипто-SOF требует детальной подготовки — увеличивает сроки',
        ],
        whyTitle: 'Почему рекомендовать WTP',
        why: [
          { title: '400+ счетов, 95% успех', text: 'Мы не подаём наугад. Точный подбор банка под профиль, индивидуальный SOF-пакет.' },
          { title: 'Специализация на сложных кейсах', text: 'РФ паспорт, крипто, High Risk — берём профили, от которых другие отказались.' },
          { title: 'Клиент остаётся вашим', text: 'Контрактная защита: non-solicitation, выделенный канал, SLA.' },
        ],
        nextStepsTitle: 'Следующие шаги',
        nextSteps: [
          'Отправьте данные клиента и цель открытия счёта',
          'Мы проведём профилирование и подберём банк за 3–5 дней',
          'Клиент получает активный счёт с online banking',
        ],
      },
      en: {
        tag: 'PARTNER BRIEF',
        headline: 'Bank account —\nincluding complex profiles',
        sub: 'Personal and corporate accounts. SOF specialization. We work with profiles others declined.',
        cta: 'Submit a Case',
        clientProfile: {
          title: 'Who is this client',
          items: [
            'Individual or company — needs a UAE bank account',
            'Complex profile: RF passport, crypto, multiple jurisdictions',
            'Already received rejection(s) — needs professional approach',
            'Often combines with company registration or visa',
          ],
        },
        stat: '400+', statLabel: 'accounts opened\nsince 2019',
        consequences: [
          'Random applications are recorded in Credit Bureau — reduces chances',
          'SOF without preparation = 70% rejection probability',
          'Bank rejection puts your recommendation in question',
        ],
        scopeTitle: "What's included",
        scope: [
          'Profile analysis', 'Bank matching', 'SOF documentation', 'Business cycle',
          'Filing & tracking', 'Bank visit', 'Unblocking', 'Premium banking (opt.)',
        ],
        timeline: '2–4 weeks (preparation + filing + result)',
        deliverable: 'Active bank account + online banking',
        processTitle: 'How the process works',
        process: [
          { num: '01', title: 'Case submission', text: 'Partner sends client data and goal.', timing: 'Day 0' },
          { num: '02', title: 'Profiling', text: 'Profile analysis, bank matching, SOF strategy.', timing: '3–5 days' },
          { num: '03', title: 'Filing', text: 'Documents, client visit, in-bank support.', timing: '1–2 days' },
          { num: '04', title: 'Result', text: 'Account active. Online banking, test transaction.', timing: '1–3 weeks' },
        ],
        revenueTitle: 'Partner model',
        revenueIntro: 'Bank account is the client\'s key pain point. High referral conversion.',
        tiers: [
          { name: 'Personal Account', desc: 'For individuals. Savings or current account.' },
          { name: 'Corporate Account', desc: 'For companies. Mainland or Freezone.' },
          { name: 'Premium / Private', desc: 'Minimum AED 1M. Dedicated banker.' },
          { name: 'Multi-currency', desc: 'Accounts in multiple currencies. For international business.' },
        ],
        riskTitle: 'Boundaries & stop-factors',
        riskIntro: 'What we control and what we do NOT guarantee:',
        stopFactors: [
          'Final decision is made by the bank — we maximize chances',
          'Sanctions lists — we do not work with SDN/OFAC',
          'Client without documents = NO-GO until KYC is provided',
          'Crypto-SOF requires detailed preparation — extends timelines',
        ],
        whyTitle: 'Why recommend WTP',
        why: [
          { title: '400+ accounts, 95% success', text: "We don't file randomly. Precise bank matching per profile, individual SOF package." },
          { title: 'Specialization in complex cases', text: 'RF passport, crypto, High Risk — we take profiles others declined.' },
          { title: 'The client stays yours', text: 'Contractual protection: non-solicitation, dedicated channel, SLA.' },
        ],
        nextStepsTitle: 'Next steps',
        nextSteps: [
          "Send us the client's data and account opening goal",
          "We'll run profiling and match a bank in 3–5 days",
          'Client receives an active account with online banking',
        ],
      },
    },
  },

  // ═══ 7. FACTORING ═══
  {
    id: 'factoring',
    accent: '#b8860b',
    gradient: 'linear-gradient(135deg, #b8860b 0%, #8B6914 50%, #2a1f00 100%)',

    b2c: {
      ru: {
        tag: 'ДЛЯ АГЕНТОВ ПО НЕДВИЖИМОСТИ',
        headline: 'Факторинг комиссий.\nВаши деньги — до закрытия сделки.',
        sub: 'Авансирование брокерских комиссий. Получите оплату сразу, не дожидаясь застройщика.',
        cta: 'Получить аванс',
        stat: '80%', statLabel: 'аванс от суммы комиссии\nза 3–5 рабочих дней',
        painPoints: [
          'Вы закрыли сделку, но деньги придут через 30–90 дней.\nТекущие расходы: аренда, маркетинг, команда — не ждут',
          'Кассовый разрыв — не про плохой бизнес.\nЭто структура рынка: застройщик платит медленно',
          'Факторинг — не кредит. Мы покупаем право требования.\nВаша кредитная история не задействована',
        ],
        benefits: [
          { title: 'Деньги сразу', text: 'До 80% от комиссии за 3–5 рабочих дней после подтверждения сделки.' },
          { title: 'Без кредитов', text: 'Покупаем право требования, не даём займ. Не влияет на кредитную историю.' },
          { title: 'Простая механика', text: 'Подтверждение сделки → документы → деньги на счёт. Минимум бюрократии.' },
          { title: 'Масштабирование', text: 'Больше сделок = больше авансов. Нет потолка. Растём вместе с вами.' },
        ],
        processTitle: 'Как это работает',
        process: [
          { num: '01', title: 'Сделка', text: 'Закрываете сделку, получаете подтверждение.', timing: 'Ваша сделка' },
          { num: '02', title: 'Заявка', text: 'Подтверждение + комиссионное соглашение.', timing: 'День 1' },
          { num: '03', title: 'Оценка', text: 'Проверяем сделку и застройщика.', timing: '1–2 дня' },
          { num: '04', title: 'Выплата', text: 'Аванс на счёт. Остаток — после расчёта.', timing: '3–5 дней' },
        ],
        includesTitle: 'Что входит',
        includes: [
          'Оценка сделки', 'Аванс до 80%', 'Юр. оформление', 'Сбор с застройщика',
          'Отчётность', 'Персональный менеджер', 'Без залогов', 'Без влияния на КИ',
        ],
        proofCards: [
          { number: '80+', label: 'сделок через факторинг' },
          { number: '3–5', label: 'дней до выплаты' },
          { number: '0', label: 'залогов и кредитов' },
        ],
        why: [
          { title: 'Знаем застройщиков ОАЭ', text: 'Оцениваем не только сделку, но и застройщика. Знаем сроки расчётов Emaar, DAMAC, Sobha, Nakheel.' },
          { title: 'Решение за 1–2 дня, деньги за 3–5', text: 'Не месяцы банковского согласования. Подтверждение → документы → деньги на счёт.' },
          { title: 'Растёт вместе с вами', text: 'Больше сделок — больше авансов. Нет потолка. Мы партнёр вашего cashflow.' },
        ],
        closing: 'Факторинг — не кредит. Инструмент, который превращает\nбудущую комиссию в деньги сегодня.',
      },
      en: {
        tag: 'FOR REAL ESTATE AGENTS',
        headline: 'Commission Factoring.\nYour money — before the deal closes.',
        sub: 'Broker commission advances. Get paid now, don\'t wait for developer settlement.',
        cta: 'Get Your Advance',
        stat: '80%', statLabel: 'advance on commission amount\nwithin 3–5 business days',
        painPoints: [
          'You closed a deal, but money arrives in 30–90 days.\nOngoing expenses: rent, marketing, team — don\'t wait',
          'A cash gap isn\'t about bad business.\nIt\'s market structure: developers pay slowly',
          'Factoring isn\'t a loan. We purchase the receivable.\nYour credit history is not involved',
        ],
        benefits: [
          { title: 'Immediate Cash', text: 'Up to 80% of commission in 3–5 business days after deal confirmation.' },
          { title: 'No Loans', text: 'We purchase receivable, not lend. No impact on credit history.' },
          { title: 'Simple Process', text: 'Deal confirmation → documents → money in your account. Minimum bureaucracy.' },
          { title: 'Scalability', text: 'More deals = more advances. No ceiling. We grow with you.' },
        ],
        processTitle: 'How It Works',
        process: [
          { num: '01', title: 'Deal', text: 'Close deal, get confirmation.', timing: 'Your deal' },
          { num: '02', title: 'Application', text: 'Confirmation + commission agreement.', timing: 'Day 1' },
          { num: '03', title: 'Assessment', text: 'Verify deal and developer.', timing: '1–2 days' },
          { num: '04', title: 'Payout', text: 'Advance to account. Balance after settlement.', timing: '3–5 days' },
        ],
        includesTitle: "What's Included",
        includes: [
          'Deal assessment', 'Up to 80% advance', 'Legal docs', 'Developer collection',
          'Reporting', 'Personal manager', 'No collateral', 'No credit impact',
        ],
        proofCards: [
          { number: '80+', label: 'deals through factoring' },
          { number: '3–5', label: 'days to payout' },
          { number: '0', label: 'collateral or loans' },
        ],
        why: [
          { title: 'We know UAE developers', text: 'We assess not just the deal, but the developer. We know settlement timelines for Emaar, DAMAC, Sobha, Nakheel.' },
          { title: 'Decision in 1–2 days, money in 3–5', text: 'Not months of bank approval. Deal confirmation → documents → money in your account.' },
          { title: 'Grows with you', text: 'More deals — more advances. No ceiling. We\'re a cashflow partner, not a one-time lender.' },
        ],
        closing: 'Factoring isn\'t a loan. It\'s a tool that turns\nfuture commission into money today.',
      },
    },

    partner: {
      ru: {
        tag: 'БРИФ ДЛЯ ПАРТНЁРОВ',
        headline: 'Факторинг комиссий —\ncashflow для ваших агентов',
        sub: 'Авансирование брокерских комиссий. Ваши агенты получают деньги сразу, вы — лояльность.',
        cta: 'Обсудить условия',
        clientProfile: {
          title: 'Кто этот клиент',
          items: [
            'Брокер или агент по недвижимости с закрытыми сделками',
            'Кассовый разрыв: застройщик платит через 30–90 дней',
            'Нужны деньги на маркетинг, аренду, зарплаты — сейчас',
            'Не хочет брать кредит и портить кредитную историю',
          ],
        },
        stat: '80+', statLabel: 'сделок через факторинг\nс 2019 года',
        consequences: [
          'Агент ждёт 30–90 дней — теряет cashflow и мотивацию',
          'Кредит создаёт долговую нагрузку — факторинг не создаёт',
          'Без cashflow инструмента агент не масштабируется',
        ],
        scopeTitle: 'Что входит в услугу',
        scope: [
          'Оценка сделки', 'Аванс до 80%', 'Юр. оформление', 'Сбор с застройщика',
          'Отчётность', 'Персональный менеджер', 'Без залогов', 'Без влияния на КИ',
        ],
        timeline: '3–5 рабочих дней (от заявки до выплаты)',
        deliverable: 'Аванс до 80% от комиссии на счёт агента',
        processTitle: 'Как работает процесс',
        process: [
          { num: '01', title: 'Передача кейса', text: 'Агент предоставляет подтверждение сделки.', timing: 'День 0' },
          { num: '02', title: 'Оценка', text: 'Проверяем сделку и застройщика.', timing: '1–2 дня' },
          { num: '03', title: 'Оформление', text: 'Договор, assignment of receivable.', timing: 'День 3' },
          { num: '04', title: 'Выплата', text: 'Аванс на счёт. Остаток после расчёта застройщика.', timing: '3–5 дней' },
        ],
        revenueTitle: 'Модель для партнёра',
        revenueIntro: 'Факторинг — инструмент лояльности. Агенты, у которых нет cashflow проблем, закрывают больше сделок.',
        tiers: [
          { name: 'Разовый', desc: 'Одна сделка. Пробная транзакция.' },
          { name: 'Регулярный', desc: '3+ сделки в месяц. Сниженная комиссия.' },
          { name: 'Агентство', desc: 'Факторинг для всей команды. Volume pricing.' },
          { name: 'Партнёрский', desc: 'White-label факторинг под вашим брендом.' },
        ],
        riskTitle: 'Границы и стоп-факторы',
        riskIntro: 'Что мы контролируем и что НЕ берём:',
        stopFactors: [
          'Только подтверждённые сделки — без спекулятивных заявок',
          'Оцениваем застройщика — не все девелоперы проходят проверку',
          'Off-plan сделки — оцениваем стадию строительства',
          'Факторинг — не кредит: не покрываем операционные расходы без сделки',
        ],
        whyTitle: 'Почему рекомендовать WTP',
        why: [
          { title: 'Знаем застройщиков ОАЭ', text: 'Emaar, DAMAC, Sobha, Nakheel — знаем сроки расчётов каждого. Это влияет на оценку и скорость.' },
          { title: 'Решение за 1–2 дня', text: 'Не недели банковского согласования. Минимум бюрократии, максимум скорости.' },
          { title: 'Клиент остаётся вашим', text: 'Контрактная защита: non-solicitation, выделенный канал, SLA.' },
        ],
        nextStepsTitle: 'Следующие шаги',
        nextSteps: [
          'Отправьте подтверждение сделки и комиссионное соглашение',
          'Мы оценим сделку за 1–2 дня',
          'Агент получает аванс на счёт в течение 3–5 дней',
        ],
      },
      en: {
        tag: 'PARTNER BRIEF',
        headline: 'Commission factoring —\ncashflow for your agents',
        sub: 'Broker commission advances. Your agents get paid now, you get loyalty.',
        cta: 'Discuss Terms',
        clientProfile: {
          title: 'Who is this client',
          items: [
            'Broker or real estate agent with closed deals',
            'Cash gap: developer pays in 30–90 days',
            'Needs money for marketing, rent, salaries — now',
            'Doesn\'t want to take a loan and impact credit history',
          ],
        },
        stat: '80+', statLabel: 'deals through factoring\nsince 2019',
        consequences: [
          'Agent waits 30–90 days — loses cashflow and motivation',
          'Loans create debt burden — factoring does not',
          'Without a cashflow tool, agents can\'t scale',
        ],
        scopeTitle: "What's included",
        scope: [
          'Deal assessment', 'Up to 80% advance', 'Legal docs', 'Developer collection',
          'Reporting', 'Personal manager', 'No collateral', 'No credit impact',
        ],
        timeline: '3–5 business days (from application to payout)',
        deliverable: 'Up to 80% commission advance to agent\'s account',
        processTitle: 'How the process works',
        process: [
          { num: '01', title: 'Case submission', text: 'Agent provides deal confirmation.', timing: 'Day 0' },
          { num: '02', title: 'Assessment', text: 'We verify deal and developer.', timing: '1–2 days' },
          { num: '03', title: 'Documentation', text: 'Agreement, assignment of receivable.', timing: 'Day 3' },
          { num: '04', title: 'Payout', text: 'Advance to account. Balance after developer settles.', timing: '3–5 days' },
        ],
        revenueTitle: 'Partner model',
        revenueIntro: 'Factoring is a loyalty tool. Agents without cashflow problems close more deals.',
        tiers: [
          { name: 'One-time', desc: 'Single deal. Trial transaction.' },
          { name: 'Regular', desc: '3+ deals/month. Reduced commission.' },
          { name: 'Agency', desc: 'Factoring for entire team. Volume pricing.' },
          { name: 'Partner', desc: 'White-label factoring under your brand.' },
        ],
        riskTitle: 'Boundaries & stop-factors',
        riskIntro: 'What we control and what we do NOT take:',
        stopFactors: [
          'Only confirmed deals — no speculative applications',
          'We assess the developer — not all pass verification',
          'Off-plan deals — we evaluate construction stage',
          'Factoring is not a loan: we don\'t cover operational costs without a deal',
        ],
        whyTitle: 'Why recommend WTP',
        why: [
          { title: 'We know UAE developers', text: 'Emaar, DAMAC, Sobha, Nakheel — we know settlement timelines for each. This affects assessment and speed.' },
          { title: 'Decision in 1–2 days', text: 'Not weeks of bank approval. Minimum bureaucracy, maximum speed.' },
          { title: 'The client stays yours', text: 'Contractual protection: non-solicitation, dedicated channel, SLA.' },
        ],
        nextStepsTitle: 'Next steps',
        nextSteps: [
          'Send us the deal confirmation and commission agreement',
          "We'll assess the deal in 1–2 days",
          'Agent receives advance to their account within 3–5 days',
        ],
      },
    },
  },

  // ═══ 8. ESCROW ═══
  {
    id: 'escrow',
    accent: '#8e2de2',
    gradient: 'linear-gradient(135deg, #8e2de2 0%, #6a1b9a 50%, #1a0533 100%)',

    b2c: {
      ru: {
        tag: 'ДЛЯ ПОКУПАТЕЛЕЙ И ПРОДАВЦОВ НЕДВИЖИМОСТИ',
        headline: 'Escrow и регистрация сделок.\nБезопасная покупка без счёта в ОАЭ.',
        sub: 'Escrow-счёт, проверка объекта, юридическое закрытие — для сделок без локального счёта.',
        cta: 'Обсудить сделку',
        stat: '80+', statLabel: 'сделок через escrow\nноль споров по средствам',
        painPoints: [
          'Прямой перевод продавцу до регистрации — риск.\nЕсли сделка сорвётся, вернуть деньги крайне сложно',
          'Покупка без локального счёта — стандартная ситуация.\nEscrow решает: деньги на защищённом счёте до регистрации',
          'Без due diligence вы рискуете купить объект\nс обременением, задолженностью или спором',
        ],
        benefits: [
          { title: 'Безопасность средств', text: 'Деньги переводятся продавцу только после регистрации Title Deed в DLD.' },
          { title: 'Без локального счёта', text: 'Не нужен банковский счёт в ОАЭ. Escrow — альтернативный маршрут.' },
          { title: 'Due diligence', text: 'Проверка объекта и продавца. Обременения, задолженности, споры.' },
          { title: 'Полная регистрация', text: 'SPA, NOC, DLD, Title Deed — полный юридический цикл.' },
        ],
        processTitle: 'Как это работает',
        process: [
          { num: '01', title: 'Проверка', text: 'Due diligence объекта, продавца, DLD.', timing: '3–5 дней' },
          { num: '02', title: 'Escrow', text: 'Открытие счёта, перевод средств.', timing: '1–2 дня' },
          { num: '03', title: 'Оформление', text: 'SPA, NOC, документы DLD.', timing: '1–2 недели' },
          { num: '04', title: 'Регистрация', text: 'Трансфер, Title Deed, выплата продавцу.', timing: '1–3 дня' },
        ],
        includesTitle: 'Что входит',
        includes: [
          'Due diligence', 'Escrow-счёт', 'SPA', 'NOC',
          'Сопровождение DLD', 'Title Deed', 'Перевод по escrow', 'Координация сторон',
        ],
        proofCards: [
          { number: '80+', label: 'сделок через escrow' },
          { number: '0', label: 'споров по средствам' },
          { number: '5', label: 'лет на рынке ОАЭ' },
        ],
        why: [
          { title: '80+ сделок, ноль споров', text: 'Знаем процедуры DLD, требования к NOC каждого застройщика, сроки каждого этапа.' },
          { title: 'Не нужен банковский счёт', text: 'Escrow — альтернативный маршрут для нерезидентов. Покупка, оплата, регистрация — без локального счёта.' },
          { title: 'Один подрядчик, полный цикл', text: 'Проверка, escrow, SPA, NOC, DLD, Title Deed — один менеджер от начала до регистрации.' },
        ],
        closing: '80+ сделок. Ноль споров по средствам.\nEscrow — безопасный способ купить недвижимость без локального счёта.',
      },
      en: {
        tag: 'FOR PROPERTY BUYERS & SELLERS',
        headline: 'Escrow & Deal Registration.\nSafe purchase without a UAE account.',
        sub: 'Escrow account, property verification, legal closing — for deals without a local account.',
        cta: 'Discuss Your Deal',
        stat: '80+', statLabel: 'deals through escrow\nzero fund disputes',
        painPoints: [
          'Direct transfer to seller before registration is a risk.\nIf the deal falls through, getting money back is extremely difficult',
          'Buying without a local account is standard for non-residents.\nEscrow solves it: funds held in a protected account until registration',
          'Without due diligence, you risk buying property\nwith encumbrances, debts, or disputes',
        ],
        benefits: [
          { title: 'Fund Safety', text: 'Transfer to seller only after Title Deed registration at DLD.' },
          { title: 'No Local Account', text: 'No UAE bank account required. Escrow is the alternative route.' },
          { title: 'Due Diligence', text: 'Property and seller verification. Encumbrances, debts, disputes.' },
          { title: 'Full Registration', text: 'SPA, NOC, DLD, Title Deed — complete legal cycle.' },
        ],
        processTitle: 'How It Works',
        process: [
          { num: '01', title: 'Verification', text: 'Property, seller, DLD due diligence.', timing: '3–5 days' },
          { num: '02', title: 'Escrow', text: 'Account opening, fund transfer.', timing: '1–2 days' },
          { num: '03', title: 'Documentation', text: 'SPA, NOC, DLD documents.', timing: '1–2 weeks' },
          { num: '04', title: 'Registration', text: 'Transfer, Title Deed, seller payout.', timing: '1–3 days' },
        ],
        includesTitle: "What's Included",
        includes: [
          'Due diligence', 'Escrow account', 'SPA', 'NOC',
          'DLD support', 'Title Deed', 'Escrow transfer', 'Party coordination',
        ],
        proofCards: [
          { number: '80+', label: 'deals through escrow' },
          { number: '0', label: 'fund disputes' },
          { number: '5', label: 'years in UAE market' },
        ],
        why: [
          { title: '80+ deals, zero disputes', text: 'We know DLD procedures, NOC requirements for every developer, timelines for every stage.' },
          { title: 'No bank account needed', text: 'Escrow is an alternative route for non-residents. Purchase, payment, registration — without a local account.' },
          { title: 'One contractor, full cycle', text: 'Verification, escrow, SPA, NOC, DLD, Title Deed — one manager from start to registration.' },
        ],
        closing: '80+ deals. Zero fund disputes.\nEscrow is the safe way to buy property without a local account.',
      },
    },

    partner: {
      ru: {
        tag: 'БРИФ ДЛЯ ПАРТНЁРОВ',
        headline: 'Escrow и регистрация —\nбезопасное закрытие сделок',
        sub: 'Escrow-счёт, due diligence, полный юридический цикл. Для клиентов без локального счёта.',
        cta: 'Отправить кейс',
        clientProfile: {
          title: 'Кто этот клиент',
          items: [
            'Покупатель недвижимости — нерезидент без локального счёта',
            'Инвестор из-за рубежа — нуждается в безопасном маршруте оплаты',
            'Продавец — хочет гарантированное получение средств',
            'Агент — нуждается в юридическом закрытии для своего клиента',
          ],
        },
        stat: '80+', statLabel: 'сделок через escrow\nноль споров по средствам',
        consequences: [
          'Прямой перевод без escrow = риск потери средств при срыве сделки',
          'Без due diligence — обременения и задолженности обнаруживаются после покупки',
          'Без юридического сопровождения — ошибки в NOC, SPA, DLD документах',
        ],
        scopeTitle: 'Что входит в услугу',
        scope: [
          'Due diligence', 'Escrow-счёт', 'SPA', 'NOC',
          'Сопровождение DLD', 'Title Deed', 'Перевод по escrow', 'Координация сторон',
        ],
        timeline: '2–4 недели (проверка + оформление + регистрация)',
        deliverable: 'Зарегистрированный Title Deed + безопасный расчёт',
        processTitle: 'Как работает процесс',
        process: [
          { num: '01', title: 'Передача кейса', text: 'Партнёр отправляет данные сделки и сторон.', timing: 'День 0' },
          { num: '02', title: 'Due diligence', text: 'Проверка объекта, продавца, обременений.', timing: '3–5 дней' },
          { num: '03', title: 'Escrow + документы', text: 'Escrow-счёт, SPA, NOC.', timing: '1–2 недели' },
          { num: '04', title: 'Регистрация', text: 'DLD, Title Deed, расчёт через escrow.', timing: '1–3 дня' },
        ],
        revenueTitle: 'Модель для партнёра',
        revenueIntro: 'Escrow — это дополнительная стоимость к любой сделке с недвижимостью. Высокий чек, разовый цикл.',
        tiers: [
          { name: 'Ready (вторичка)', desc: 'Due diligence + escrow + регистрация. Стандартная сделка.' },
          { name: 'Off-plan', desc: 'Проверка застройщика, SPA, график платежей.' },
          { name: 'Коммерческая', desc: 'Расширенный due diligence. Арендные обязательства.' },
          { name: 'Портфельная', desc: 'Несколько объектов. Volume pricing.' },
        ],
        riskTitle: 'Границы и стоп-факторы',
        riskIntro: 'Что мы контролируем и что НЕ гарантируем:',
        stopFactors: [
          'Due diligence может выявить проблемы — лучше до, чем после покупки',
          'NOC зависит от застройщика — сроки могут варьироваться',
          'DLD регистрация зависит от государственных органов',
          'Escrow не покрывает рыночные риски — только безопасность средств',
        ],
        whyTitle: 'Почему рекомендовать WTP',
        why: [
          { title: '80+ сделок, ноль споров', text: 'Знаем процедуры DLD, NOC каждого застройщика, подводные камни каждого этапа.' },
          { title: 'Полный цикл, один менеджер', text: 'Проверка → escrow → документы → регистрация. Не четыре разных подрядчика.' },
          { title: 'Клиент остаётся вашим', text: 'Контрактная защита: non-solicitation, выделенный канал, SLA.' },
        ],
        nextStepsTitle: 'Следующие шаги',
        nextSteps: [
          'Отправьте данные сделки: объект, стороны, бюджет',
          'Мы проведём due diligence за 3–5 дней',
          'Безопасная сделка: escrow → документы → Title Deed',
        ],
      },
      en: {
        tag: 'PARTNER BRIEF',
        headline: 'Escrow & registration —\nsafe deal closing',
        sub: 'Escrow account, due diligence, full legal cycle. For clients without a local account.',
        cta: 'Submit a Case',
        clientProfile: {
          title: 'Who is this client',
          items: [
            'Property buyer — non-resident without a local account',
            'Overseas investor — needs a safe payment route',
            'Seller — wants guaranteed receipt of funds',
            'Agent — needs legal closing for their client',
          ],
        },
        stat: '80+', statLabel: 'deals through escrow\nzero fund disputes',
        consequences: [
          'Direct transfer without escrow = risk of fund loss if deal fails',
          'Without due diligence — encumbrances and debts found after purchase',
          'Without legal support — errors in NOC, SPA, DLD documents',
        ],
        scopeTitle: "What's included",
        scope: [
          'Due diligence', 'Escrow account', 'SPA', 'NOC',
          'DLD support', 'Title Deed', 'Escrow transfer', 'Party coordination',
        ],
        timeline: '2–4 weeks (verification + documentation + registration)',
        deliverable: 'Registered Title Deed + safe settlement',
        processTitle: 'How the process works',
        process: [
          { num: '01', title: 'Case submission', text: 'Partner sends deal data and parties.', timing: 'Day 0' },
          { num: '02', title: 'Due diligence', text: 'Property, seller, encumbrance verification.', timing: '3–5 days' },
          { num: '03', title: 'Escrow + docs', text: 'Escrow account, SPA, NOC.', timing: '1–2 weeks' },
          { num: '04', title: 'Registration', text: 'DLD, Title Deed, escrow settlement.', timing: '1–3 days' },
        ],
        revenueTitle: 'Partner model',
        revenueIntro: 'Escrow adds value to any property deal. High ticket, single cycle.',
        tiers: [
          { name: 'Ready (resale)', desc: 'Due diligence + escrow + registration. Standard deal.' },
          { name: 'Off-plan', desc: 'Developer verification, SPA, payment schedule.' },
          { name: 'Commercial', desc: 'Extended due diligence. Lease obligations.' },
          { name: 'Portfolio', desc: 'Multiple properties. Volume pricing.' },
        ],
        riskTitle: 'Boundaries & stop-factors',
        riskIntro: 'What we control and what we do NOT guarantee:',
        stopFactors: [
          'Due diligence may reveal issues — better before than after purchase',
          'NOC depends on the developer — timelines may vary',
          'DLD registration depends on government authorities',
          'Escrow does not cover market risks — only fund safety',
        ],
        whyTitle: 'Why recommend WTP',
        why: [
          { title: '80+ deals, zero disputes', text: 'We know DLD procedures, each developer\'s NOC requirements, pitfalls at every stage.' },
          { title: 'Full cycle, one manager', text: 'Verification → escrow → documents → registration. Not four different contractors.' },
          { title: 'The client stays yours', text: 'Contractual protection: non-solicitation, dedicated channel, SLA.' },
        ],
        nextStepsTitle: 'Next steps',
        nextSteps: [
          'Send us the deal data: property, parties, budget',
          "We'll run due diligence in 3–5 days",
          'Safe deal: escrow → documents → Title Deed',
        ],
      },
    },
  },
];


// ─── CSS Design System (Landscape A4) ───────────────────────────────

const sharedCSS = `
  @page { size: 297mm 210mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }

  :root {
    --bg: #FAF9F6; --bg-card: #FFFFFF; --border: #E5E5E5;
    --text: #1B1B1B; --text2: #555555; --meta: #999999;
    --font: "Inter", sans-serif; --serif: "Playfair Display", serif;
  }

  body {
    background: var(--bg); color: var(--text); font-family: var(--font);
    width: 297mm; font-size: 14px; line-height: 1.5;
  }

  .slide {
    width: 297mm; height: 210mm; padding: 18mm 25mm;
    page-break-after: always; position: relative;
    display: flex; flex-direction: column; overflow: hidden;
  }
  .slide:last-child { page-break-after: auto; }

  /* ── Typography ── */
  .tag {
    font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em;
    font-weight: 500; margin-bottom: 16px; display: block;
  }
  .tag-light { color: rgba(255,255,255,0.55); }
  .tag-dark { color: var(--meta); }

  h1 {
    font-family: var(--serif); font-size: 44px; font-weight: 400;
    letter-spacing: -0.02em; line-height: 1.12; white-space: pre-line;
  }
  h2 {
    font-family: var(--serif); font-size: 26px; font-weight: 400;
    line-height: 1.2; margin-bottom: 20px;
  }
  h3 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
  h4 {
    font-family: var(--serif); font-size: 17px; font-weight: 400;
    margin-bottom: 6px;
  }

  .body-text { font-size: 15px; color: var(--text2); line-height: 1.55; }
  .small-text { font-size: 13px; color: var(--text2); line-height: 1.5; }
  .label {
    font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em;
    color: var(--meta); font-weight: 500; margin-bottom: 10px; display: block;
  }

  /* ── B2C Cover (dark gradient) ── */
  .slide-dark {
    color: #FFFFFF; padding: 22mm 28mm;
  }
  .slide-dark h1 { color: #FFFFFF; margin-bottom: 20px; max-width: 560px; }
  .slide-dark .sub {
    font-size: 17px; color: rgba(255,255,255,0.78); max-width: 480px;
    line-height: 1.55; margin-bottom: 36px;
  }
  .stat-box {
    display: inline-flex; align-self: flex-start; align-items: baseline; gap: 14px;
    border: 1px solid rgba(255,255,255,0.25); border-radius: 8px;
    padding: 14px 22px; margin-top: auto; margin-bottom: 18mm;
  }
  .stat-number {
    font-family: var(--serif); font-size: 60px; font-weight: 400;
    letter-spacing: -0.02em; line-height: 1;
  }
  .stat-label {
    font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.4;
    white-space: pre-line;
  }
  .cta-btn-light {
    display: inline-block; background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3); color: #fff;
    font-size: 13px; font-weight: 500; padding: 11px 28px; border-radius: 100px;
    letter-spacing: 0.02em; backdrop-filter: blur(4px);
  }

  /* ── Partner Cover (accent band) ── */
  .slide-partner-cover {
    flex-direction: row; padding: 0;
  }
  .partner-band {
    width: 35%; height: 100%; display: flex; flex-direction: column;
    justify-content: space-between; align-items: flex-start;
    padding: 22mm 20mm;
  }
  .partner-band .logo {
    font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.9);
    letter-spacing: 0.05em;
  }
  .partner-band .band-metric {
    font-family: var(--serif); font-size: 48px; font-weight: 400;
    color: #fff; line-height: 1.1;
  }
  .partner-band .band-metric-label {
    font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 6px;
    white-space: pre-line;
  }
  .partner-right {
    width: 65%; padding: 22mm 25mm 22mm 30mm;
    display: flex; flex-direction: column; justify-content: center;
  }
  .partner-right h1 { margin-bottom: 18px; max-width: 420px; font-size: 40px; }
  .partner-right .sub {
    font-size: 16px; color: var(--text2); max-width: 400px; line-height: 1.55;
    margin-bottom: 28px;
  }
  .cta-btn {
    display: inline-block; background: var(--text); color: var(--bg);
    font-size: 13px; font-weight: 500; padding: 11px 28px; border-radius: 100px;
    letter-spacing: 0.02em;
  }

  /* ── Slide 2: Problem / Client Profile ── */
  .two-col { display: grid; gap: 28px; flex: 1; align-items: start; }
  .two-col-35-65 { grid-template-columns: 35fr 65fr; }
  .two-col-45-55 { grid-template-columns: 45fr 55fr; }
  .two-col-50-50 { grid-template-columns: 1fr 1fr; }

  .stat-block .stat-number-dark {
    font-family: var(--serif); font-size: 64px; font-weight: 400;
    line-height: 1; letter-spacing: -0.02em; margin-bottom: 8px;
  }
  .stat-block .stat-label-dark {
    font-size: 13px; color: var(--text2); line-height: 1.4; white-space: pre-line;
  }

  .pain-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px; }
  .pain-item {
    display: flex; gap: 12px; align-items: flex-start;
    font-size: 14px; color: var(--text2); line-height: 1.55;
    white-space: pre-line;
  }
  .pain-dot {
    width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex-shrink: 0;
    background: #c0392b;
  }

  .profile-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  .profile-item {
    display: flex; gap: 10px; align-items: flex-start;
    font-size: 14px; color: var(--text2); line-height: 1.45;
  }
  .profile-dot {
    width: 7px; height: 7px; border-radius: 50%; margin-top: 6px; flex-shrink: 0;
  }
  .consequence-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
  .consequence-item {
    display: flex; gap: 10px; font-size: 14px; color: var(--text2); line-height: 1.5;
    padding-left: 14px; border-left: 2px solid #c0392b;
  }

  /* ── Slide 3: Benefits / Scope ── */
  .benefit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; flex: 1; }
  .benefit-card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px;
    padding: 18px 20px; border-top: 3px solid transparent;
  }
  .benefit-card p { font-size: 13px; color: var(--text2); line-height: 1.5; }

  .scope-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px 28px;
  }
  .scope-item {
    display: flex; align-items: center; gap: 10px; padding: 7px 0;
    font-size: 14px;
  }
  .scope-check {
    width: 18px; height: 18px; border-radius: 4px; display: flex;
    align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 11px; color: #fff; font-weight: 700;
  }
  .scope-highlight {
    display: flex; gap: 28px; margin-top: 20px; padding: 14px 18px;
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;
  }
  .scope-highlight-item { }
  .scope-highlight-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--meta); margin-bottom: 2px; }
  .scope-highlight-value { font-size: 15px; font-weight: 500; }

  /* ── Slide 4: Process Timeline ── */
  .timeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; flex: 1; align-items: start; }
  .timeline-step { position: relative; padding: 0 18px; }
  .timeline-step:first-child { padding-left: 0; }
  .timeline-step:last-child { padding-right: 0; }
  .timeline-connector {
    display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
  }
  .timeline-dot {
    width: 28px; height: 28px; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 11px; font-weight: 600; color: #fff;
  }
  .timeline-line { flex: 1; height: 1px; background: var(--border); }
  .timeline-step:last-child .timeline-line { display: none; }
  .timeline-timing {
    font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--meta); margin-bottom: 6px; font-weight: 500;
  }
  .timeline-step h3 { font-size: 17px; font-weight: 600; margin-bottom: 6px; }
  .timeline-step p { font-size: 13px; color: var(--text2); line-height: 1.45; }

  /* ── Slide 5: Includes / Revenue + Risk ── */
  .includes-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6px 28px;
  }
  .includes-item {
    display: flex; align-items: center; gap: 10px; padding: 7px 0;
  }
  .includes-check {
    width: 18px; height: 18px; border: 1.5px solid var(--border); border-radius: 4px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 12px;
  }
  .includes-item span { font-size: 14px; }

  .price-note {
    margin-top: 20px; padding: 14px 18px; background: var(--bg-card);
    border: 1px solid var(--border); border-radius: 8px;
    font-size: 13px; color: var(--text2); line-height: 1.5;
  }
  .price-note strong { color: var(--text); font-weight: 600; }

  .revenue-tiers { display: flex; flex-direction: column; gap: 10px; }
  .tier-item {
    padding: 10px 14px; background: var(--bg-card);
    border: 1px solid var(--border); border-radius: 8px;
  }
  .tier-name { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .tier-desc { font-size: 12px; color: var(--text2); }

  .risk-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .risk-item {
    font-size: 13px; color: var(--text2); line-height: 1.45;
    padding-left: 14px; border-left: 2px solid #c0392b;
  }

  /* ── Slide 6: Proof + Why ── */
  .proof-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
  .proof-card {
    border-radius: 10px; padding: 18px 20px; color: #fff; text-align: center;
  }
  .proof-card .proof-number {
    font-family: var(--serif); font-size: 40px; font-weight: 400;
    margin-bottom: 4px; line-height: 1;
  }
  .proof-card .proof-label { font-size: 12px; opacity: 0.75; }

  .why-stack { display: flex; flex-direction: column; gap: 16px; }
  .why-row {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 12px 16px; background: var(--bg-card);
    border: 1px solid var(--border); border-radius: 8px;
  }
  .why-row .why-accent {
    width: 4px; border-radius: 2px; align-self: stretch; flex-shrink: 0;
  }
  .why-row strong {
    font-size: 16px; font-family: var(--serif); font-weight: 400;
    display: block; margin-bottom: 3px;
  }
  .why-row p { font-size: 13px; color: var(--text2); line-height: 1.45; }

  /* ── Slide 7: CTA / Next Steps ── */
  .cta-slide { justify-content: center; align-items: center; text-align: center; }
  .cta-headline {
    font-family: var(--serif); font-size: 36px; font-weight: 400;
    margin-bottom: 28px; line-height: 1.2;
  }
  .cta-steps {
    display: flex; gap: 28px; margin-bottom: 32px; text-align: left;
  }
  .cta-step { flex: 1; }
  .cta-step-num {
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
    margin-bottom: 6px; display: block;
  }
  .cta-step p { font-size: 14px; color: var(--text2); line-height: 1.45; }

  .next-steps-layout { display: grid; grid-template-columns: 60fr 40fr; gap: 30px; flex: 1; align-items: center; }
  .next-step-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 18px; }
  .next-step-item { display: flex; gap: 14px; align-items: flex-start; }
  .next-step-num {
    width: 32px; height: 32px; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 14px; font-weight: 600; color: #fff;
  }
  .next-step-item p { font-size: 15px; color: var(--text2); line-height: 1.5; padding-top: 5px; }

  .contact-card {
    padding: 22px 24px; background: var(--bg-card);
    border: 1px solid var(--border); border-radius: 12px; text-align: center;
  }
  .contact-card .contact-label {
    font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--meta); margin-bottom: 6px;
  }
  .contact-card .contact-value {
    font-size: 15px; margin-bottom: 12px;
  }

  /* ── Footer (shared) ── */
  .footer {
    margin-top: auto; padding-top: 10px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .footer-col { flex: 1; }
  .footer-label {
    font-size: 9px; color: var(--meta); text-transform: uppercase;
    letter-spacing: 0.12em; margin-bottom: 1px;
  }
  .footer-value { font-size: 10px; color: var(--text2); }
  .footer-right { text-align: right; }

  .footer-dark {
    margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.15);
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .footer-dark .footer-label { color: rgba(255,255,255,0.4); }
  .footer-dark .footer-value { color: rgba(255,255,255,0.65); }

  .since-line {
    text-align: center; font-size: 10px; color: var(--meta);
    letter-spacing: 0.05em; margin-bottom: 8px;
  }
`;

const largeFontCSS = largeMode ? `
  /* ── Large Font Overrides (+2…4px) ── */
  body { font-size: 16px; }
  .slide { padding: 16mm 23mm; }

  .tag { font-size: 12px; }
  .label { font-size: 12px; }
  h1 { font-size: 48px; }
  h2 { font-size: 29px; }
  h3 { font-size: 18px; }
  h4 { font-size: 19px; }
  .body-text { font-size: 17px; }
  .small-text { font-size: 15px; }

  .slide-dark { padding: 20mm 26mm; }
  .slide-dark .sub { font-size: 19px; }
  .stat-number { font-size: 64px; }
  .stat-label { font-size: 15px; }
  .cta-btn-light { font-size: 15px; }

  .partner-band .logo { font-size: 18px; }
  .partner-band .band-metric { font-size: 52px; }
  .partner-band .band-metric-label { font-size: 14px; }
  .partner-band { padding: 20mm 18mm; }
  .partner-right { padding: 20mm 23mm 20mm 28mm; }
  .partner-right h1 { font-size: 44px; }
  .partner-right .sub { font-size: 18px; }
  .cta-btn { font-size: 15px; }

  .stat-block .stat-number-dark { font-size: 68px; }
  .stat-block .stat-label-dark { font-size: 15px; }
  .pain-item { font-size: 16px; }
  .profile-item { font-size: 16px; }
  .consequence-item { font-size: 16px; }

  .benefit-card p { font-size: 15px; }
  .scope-item { font-size: 16px; }
  .scope-check { font-size: 13px; }
  .scope-highlight-label { font-size: 12px; }
  .scope-highlight-value { font-size: 17px; }

  .timeline-dot { font-size: 13px; }
  .timeline-timing { font-size: 12px; }
  .timeline-step h3 { font-size: 19px; }
  .timeline-step p { font-size: 15px; }

  .includes-check { font-size: 14px; }
  .includes-item span { font-size: 16px; }
  .price-note { font-size: 15px; }
  .tier-name { font-size: 16px; }
  .tier-desc { font-size: 14px; }
  .risk-item { font-size: 15px; }

  .proof-card .proof-number { font-size: 44px; }
  .proof-card .proof-label { font-size: 14px; }
  .why-row strong { font-size: 18px; }
  .why-row p { font-size: 15px; }

  .cta-headline { font-size: 40px; }
  .cta-step-num { font-size: 13px; }
  .cta-step p { font-size: 16px; }
  .next-step-num { font-size: 16px; }
  .next-step-item p { font-size: 17px; }
  .contact-card .contact-label { font-size: 12px; }
  .contact-card .contact-value { font-size: 17px; }

  .footer-label { font-size: 11px; }
  .footer-value { font-size: 12px; }
  .since-line { font-size: 12px; }
` : '';


// ─── B2C HTML Builders ──────────────────────────────────────────────

function buildB2CPresentation(product, lang) {
  const d = product.b2c[lang];
  const b = brand[lang];
  const accent = product.accent;
  const gradient = product.gradient;

  const contactOverride = product.contact;
  const contactLabel = contactOverride?.name || b.contact;
  const contactEmail = contactOverride?.email || b.email;
  const contactPhone = contactOverride?.phone;

  const slide1 = `
    <div class="slide slide-dark" style="background:${gradient}">
      <span class="tag tag-light">${d.tag}</span>
      <h1>${d.headline}</h1>
      <p class="sub">${d.sub}</p>
      <div style="margin-bottom:20px"><span class="cta-btn-light">${d.cta}</span></div>
      <div class="stat-box">
        <span class="stat-number">${d.stat}</span>
        <span class="stat-label">${d.statLabel}</span>
      </div>
      <div class="footer-dark">
        <div class="footer-col"><div class="footer-label">WTP</div><div class="footer-value">${b.company}</div></div>
        <div class="footer-col" style="text-align:center"><div class="footer-label">${contactLabel}</div><div class="footer-value">${contactEmail}${contactPhone ? ` · ${contactPhone}` : ''}</div></div>
        <div class="footer-col footer-right"><div class="footer-label">${b.officeLbl}</div><div class="footer-value">${b.office}</div></div>
      </div>
    </div>`;

  const painHTML = d.painPoints.map(p =>
    `<li class="pain-item"><span class="pain-dot"></span><span>${p}</span></li>`
  ).join('');

  const slide2 = `
    <div class="slide">
      <span class="label">${lang === 'ru' ? 'Проблема' : 'The Problem'}</span>
      <div class="two-col two-col-35-65">
        <div class="stat-block">
          <div class="stat-number-dark" style="color:${accent}">${d.stat}</div>
          <div class="stat-label-dark">${d.statLabel}</div>
        </div>
        <div>
          <ul class="pain-list">${painHTML}</ul>
        </div>
      </div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.company}</div></div>
        <div class="footer-col footer-right"><div class="footer-value" style="color:var(--meta)">${d.tag}</div></div>
      </div>
    </div>`;

  const benefitsHTML = d.benefits.map(b =>
    `<div class="benefit-card" style="border-top-color:${accent}">
      <h4>${b.title}</h4><p>${b.text}</p>
    </div>`
  ).join('');

  const slide3 = `
    <div class="slide">
      <span class="label">${lang === 'ru' ? 'Решение' : 'Solution'}</span>
      <h2>${lang === 'ru' ? 'Что вы получаете' : 'What You Get'}</h2>
      <div class="benefit-grid">${benefitsHTML}</div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.company}</div></div>
        <div class="footer-col footer-right"><div class="footer-value" style="color:var(--meta)">${d.tag}</div></div>
      </div>
    </div>`;

  const processHTML = d.process.map(s =>
    `<div class="timeline-step">
      <div class="timeline-connector">
        <div class="timeline-dot" style="background:${accent}">${s.num}</div>
        <div class="timeline-line"></div>
      </div>
      <div class="timeline-timing">${s.timing}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </div>`
  ).join('');

  const slide4 = `
    <div class="slide">
      <span class="label">${lang === 'ru' ? 'Процесс' : 'Process'}</span>
      <h2>${d.processTitle}</h2>
      <div class="timeline">${processHTML}</div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.company}</div></div>
        <div class="footer-col footer-right"><div class="footer-value" style="color:var(--meta)">${d.tag}</div></div>
      </div>
    </div>`;

  const includesHTML = d.includes.map(item =>
    `<div class="includes-item"><div class="includes-check" style="color:${accent}">\u2713</div><span>${item}</span></div>`
  ).join('');

  const slide5 = `
    <div class="slide">
      <span class="label">${lang === 'ru' ? 'Состав' : 'Deliverables'}</span>
      <h2>${d.includesTitle}</h2>
      <div class="includes-grid">${includesHTML}</div>
      <div class="price-note">
        <strong>${lang === 'ru' ? 'Модель стоимости: ' : 'Pricing model: '}</strong>
        ${lang === 'ru' ? 'Cost + Fee. Прямые расходы (госпошлины, сторонние сервисы) показаны отдельно и передаются по себестоимости. Management fee — за архитектуру, compliance, координацию.' : 'Cost + Fee. Direct expenses (government fees, third-party services) shown separately and passed at cost. Management fee — for architecture, compliance, coordination.'}
      </div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.company}</div></div>
        <div class="footer-col footer-right"><div class="footer-value" style="color:var(--meta)">${d.tag}</div></div>
      </div>
    </div>`;

  const proofHTML = d.proofCards.map(c =>
    `<div class="proof-card" style="background:${accent}">
      <div class="proof-number">${c.number}</div>
      <div class="proof-label">${c.label}</div>
    </div>`
  ).join('');

  const whyHTML = d.why.map(w =>
    `<div class="why-row">
      <div class="why-accent" style="background:${accent}"></div>
      <div><strong>${w.title}</strong><p>${w.text}</p></div>
    </div>`
  ).join('');

  const slide6 = `
    <div class="slide">
      <span class="label">${lang === 'ru' ? 'Доверие' : 'Trust'}</span>
      <div class="proof-row">${proofHTML}</div>
      <h2>${lang === 'ru' ? 'Чем мы отличаемся' : 'How We Are Different'}</h2>
      <div class="why-stack">${whyHTML}</div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.company}</div></div>
        <div class="footer-col footer-right"><div class="footer-value" style="color:var(--meta)">${d.tag}</div></div>
      </div>
    </div>`;

  const ctaSteps = d.process.slice(0, 3);
  const ctaStepsHTML = ctaSteps.map((s, i) =>
    `<div class="cta-step">
      <span class="cta-step-num" style="color:${accent}">0${i + 1}</span>
      <p>${s.text}</p>
    </div>`
  ).join('');

  const slide7 = `
    <div class="slide cta-slide">
      <div class="since-line">${b.since}</div>
      <div class="cta-headline">${d.closing}</div>
      <div class="cta-steps">${ctaStepsHTML}</div>
      <div style="margin-bottom:28px"><span class="cta-btn">${d.cta}</span></div>
      <div class="footer" style="width:100%">
        <div class="footer-col"><div class="footer-label">WTP</div><div class="footer-value">${b.company}</div></div>
        <div class="footer-col" style="text-align:center"><div class="footer-label">${contactLabel}</div><div class="footer-value">${contactEmail}${contactPhone ? ` · ${contactPhone}` : ''}</div></div>
        <div class="footer-col footer-right"><div class="footer-label">${b.officeLbl}</div><div class="footer-value">${b.office}</div></div>
      </div>
    </div>`;

  return wrapHTML(lang, `${slide1}${slide2}${slide3}${slide4}${slide5}${slide6}${slide7}`, accent);
}


// ─── Partner HTML Builders ──────────────────────────────────────────

function buildPartnerPresentation(product, lang) {
  const d = product.partner[lang];
  const b = brand[lang];
  const accent = product.accent;
  const gradient = product.gradient;

  const contactOverride = product.contact;
  const contactName = contactOverride?.name;
  const contactRole = contactOverride?.[`role_${lang}`];
  const contactEmail = contactOverride?.email || b.email;
  const contactPhone = contactOverride?.phone;

  const slide1 = `
    <div class="slide slide-partner-cover">
      <div class="partner-band" style="background:${gradient}">
        <div class="logo">WTP</div>
        <div>
          <div class="band-metric">${d.stat}</div>
          <div class="band-metric-label">${d.statLabel}</div>
        </div>
      </div>
      <div class="partner-right">
        <span class="tag tag-dark">${d.tag}</span>
        <h1>${d.headline}</h1>
        <p class="sub">${d.sub}</p>
        <div><span class="cta-btn">${d.cta}</span></div>
      </div>
    </div>`;

  const profileHTML = d.clientProfile.items.map(item =>
    `<li class="profile-item"><span class="profile-dot" style="background:${accent}"></span><span>${item}</span></li>`
  ).join('');

  const consequenceHTML = d.consequences.map(c =>
    `<li class="consequence-item">${c}</li>`
  ).join('');

  const slide2 = `
    <div class="slide">
      <div class="two-col two-col-45-55">
        <div>
          <span class="label">${d.clientProfile.title}</span>
          <ul class="profile-list">${profileHTML}</ul>
        </div>
        <div>
          <span class="label">${lang === 'ru' ? 'Проблема' : 'The Problem'}</span>
          <div class="stat-block" style="margin-bottom:18px">
            <div class="stat-number-dark" style="color:${accent}">${d.stat}</div>
            <div class="stat-label-dark">${d.statLabel}</div>
          </div>
          <ul class="consequence-list">${consequenceHTML}</ul>
        </div>
      </div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.company}</div></div>
        <div class="footer-col footer-right"><div class="footer-value" style="color:var(--meta)">${d.tag}</div></div>
      </div>
    </div>`;

  const scopeHTML = d.scope.map(item =>
    `<div class="scope-item"><div class="scope-check" style="background:${accent}">\u2713</div><span>${item}</span></div>`
  ).join('');

  const slide3 = `
    <div class="slide">
      <span class="label">${lang === 'ru' ? 'Состав услуги' : 'Service Scope'}</span>
      <h2>${d.scopeTitle}</h2>
      <div class="scope-grid">${scopeHTML}</div>
      <div class="scope-highlight">
        <div class="scope-highlight-item">
          <div class="scope-highlight-label">${lang === 'ru' ? 'Срок' : 'Timeline'}</div>
          <div class="scope-highlight-value">${d.timeline}</div>
        </div>
        <div class="scope-highlight-item">
          <div class="scope-highlight-label">${lang === 'ru' ? 'Результат' : 'Deliverable'}</div>
          <div class="scope-highlight-value">${d.deliverable}</div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.company}</div></div>
        <div class="footer-col footer-right"><div class="footer-value" style="color:var(--meta)">${d.tag}</div></div>
      </div>
    </div>`;

  const processHTML = d.process.map(s =>
    `<div class="timeline-step">
      <div class="timeline-connector">
        <div class="timeline-dot" style="background:${accent}">${s.num}</div>
        <div class="timeline-line"></div>
      </div>
      <div class="timeline-timing">${s.timing}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </div>`
  ).join('');

  const slide4 = `
    <div class="slide">
      <span class="label">${lang === 'ru' ? 'Процесс' : 'Process'}</span>
      <h2>${d.processTitle}</h2>
      <div class="timeline">${processHTML}</div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.company}</div></div>
        <div class="footer-col footer-right"><div class="footer-value" style="color:var(--meta)">${d.tag}</div></div>
      </div>
    </div>`;

  const tiersHTML = d.tiers.map(t =>
    `<div class="tier-item"><div class="tier-name">${t.name}</div><div class="tier-desc">${t.desc}</div></div>`
  ).join('');

  const risksHTML = d.stopFactors.map(r =>
    `<li class="risk-item">${r}</li>`
  ).join('');

  const slide5 = `
    <div class="slide">
      <div class="two-col two-col-50-50">
        <div>
          <span class="label">${d.revenueTitle}</span>
          <p class="body-text" style="margin-bottom:14px">${d.revenueIntro}</p>
          <div class="revenue-tiers">${tiersHTML}</div>
        </div>
        <div>
          <span class="label">${d.riskTitle}</span>
          <p class="body-text" style="margin-bottom:14px">${d.riskIntro}</p>
          <ul class="risk-list">${risksHTML}</ul>
        </div>
      </div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.company}</div></div>
        <div class="footer-col footer-right"><div class="footer-value" style="color:var(--meta)">${d.tag}</div></div>
      </div>
    </div>`;

  const whyHTML = d.why.map(w =>
    `<div class="why-row">
      <div class="why-accent" style="background:${accent}"></div>
      <div><strong>${w.title}</strong><p>${w.text}</p></div>
    </div>`
  ).join('');

  const slide6 = `
    <div class="slide">
      <span class="label">${lang === 'ru' ? 'Подход' : 'Our Approach'}</span>
      <h2>${d.whyTitle}</h2>
      <div class="why-stack">${whyHTML}</div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.company}</div></div>
        <div class="footer-col footer-right"><div class="footer-value" style="color:var(--meta)">${d.tag}</div></div>
      </div>
    </div>`;

  const stepsHTML = d.nextSteps.map((s, i) =>
    `<li class="next-step-item">
      <div class="next-step-num" style="background:${accent}">${i + 1}</div>
      <p>${s}</p>
    </li>`
  ).join('');

  const slide7 = `
    <div class="slide">
      <span class="label">${d.nextStepsTitle}</span>
      <div class="next-steps-layout">
        <div>
          <h2 style="margin-bottom:24px">${lang === 'ru' ? 'Начните с первого кейса' : 'Start with your first case'}</h2>
          <ul class="next-step-list">${stepsHTML}</ul>
        </div>
        <div class="contact-card">
          ${contactName ? `<div class="contact-label">${contactName}${contactRole ? ` · ${contactRole}` : ''}</div>` : ''}
          <div class="contact-label">${b.contact}</div>
          <div class="contact-value">${contactEmail}</div>
          ${contactPhone ? `<div class="contact-label">${lang === 'ru' ? 'Телефон' : 'Phone'}</div><div class="contact-value">${contactPhone}</div>` : ''}
          <div class="contact-label">${b.officeLbl}</div>
          <div class="contact-value">${b.office}</div>
          <div style="margin-top:16px"><span class="cta-btn">${d.cta}</span></div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-col"><div class="footer-value" style="color:var(--meta)">${b.since}</div></div>
      </div>
    </div>`;

  return wrapHTML(lang, `${slide1}${slide2}${slide3}${slide4}${slide5}${slide6}${slide7}`, accent);
}


// ─── HTML Wrapper ───────────────────────────────────────────────────

function wrapHTML(lang, slides, accent) {
  return `<!DOCTYPE html>
<html lang="${lang === 'ru' ? 'ru' : 'en'}">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>${sharedCSS}${largeFontCSS}</style>
</head>
<body>
${slides}
</body>
</html>`;
}


// ─── PDF Generator ──────────────────────────────────────────────────

async function generatePresentation(product, audienceType, lang, browser) {
  const html = audienceType === 'b2c'
    ? buildB2CPresentation(product, lang)
    : buildPartnerPresentation(product, lang);

  const langUpper = lang.toUpperCase();
  const filename = `WTP_${product.id}_${audienceType}_${langUpper}`;
  const pdfPath = path.join(outDir, `${filename}.pdf`);
  const pngPath = path.join(outDir, `${filename}_preview.png`);

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    width: '297mm',
    height: '210mm',
    printBackground: true,
    preferCSSPageSize: true,
  });

  await page.setViewport({ width: 1123, height: 794 });
  await page.screenshot({
    path: pngPath,
    clip: { x: 0, y: 0, width: 1123, height: 794 },
  });

  const diagnostics = await page.evaluate(() => {
    const slides = document.querySelectorAll('.slide');
    const mmPerPx = 25.4 / 96;
    return Array.from(slides).map((slide, i) => {
      const rect = slide.getBoundingClientRect();
      const heightMM = Math.round(rect.height * mmPerPx);
      return { slide: i + 1, heightMM, fits: heightMM <= 210 };
    });
  });

  await page.close();

  const allFit = diagnostics.every(d => d.fits);
  const icon = allFit ? '\u2705' : '\u26a0\ufe0f';
  const info = diagnostics.map(d => `S${d.slide}:${d.heightMM}mm${d.fits ? '' : ' OVERFLOW'}`).join(' | ');
  console.log(`  ${icon} ${product.id} [${audienceType}/${langUpper}]: ${info}`);

  return { id: product.id, audienceType, lang: langUpper, slides: diagnostics, allFit };
}


// ─── Main ───────────────────────────────────────────────────────────

(async () => {
  fs.mkdirSync(outDir, { recursive: true });

  const audiences = ['b2c', 'partner'];
  const langs = ['ru', 'en'];
  const validProducts = products.filter(p => p.b2c && p.partner);
  const totalPDFs = validProducts.length * audiences.length * langs.length;

  console.log(`\nGenerating ${totalPDFs} product presentations${largeMode ? ' (LARGE FONTS)' : ''}...`);
  console.log(`  Products: ${validProducts.map(p => p.id).join(', ')}`);
  console.log(`  Audiences: ${audiences.join(', ')}`);
  console.log(`  Languages: ${langs.join(', ')}`);
  console.log(`  Output: ${outDir}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];
  for (const product of validProducts) {
    for (const audience of audiences) {
      for (const lang of langs) {
        const result = await generatePresentation(product, audience, lang, browser);
        results.push(result);
      }
    }
  }

  await browser.close();

  console.log('\n\u2500\u2500\u2500 Summary \u2500\u2500\u2500');
  const ok = results.filter(r => r.allFit).length;
  const overflow = results.filter(r => !r.allFit).length;
  console.log(`\u2705 OK: ${ok}  \u26a0\ufe0f Overflow: ${overflow}  Total: ${results.length} PDFs (${results.length * 7} slides)`);
  console.log('\nDone!');
})();
