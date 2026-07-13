import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const largeMode = process.argv.includes('--large');
const outDir = path.join(__dirname, '..', 'dist', 'product-presentations', ...(largeMode ? ['увеличенные шрифты'] : []));

const accent = '#1d2951';
const gradient = 'linear-gradient(135deg, #1d2951 0%, #2c3e6b 40%, #0f1a38 100%)';

const brand = {
  ru: { company: 'WTP Brokers', email: 'hello@wtpbrokers.com', phone: '+971 600 575 294', phoneMoscow: '+7 495 476 40 90', office: 'Дубай, ОАЭ', since: 'С 2019 года · Banking-First подход · ОАЭ' },
  en: { company: 'WTP Brokers', email: 'hello@wtpbrokers.com', phone: '+971 600 575 294', phoneMoscow: '+7 495 476 40 90', office: 'Dubai, UAE', since: 'Since 2019 · Banking-First approach · UAE' },
};


// ─── Content Data ────────────────────────────────────────────────────

const data = {
  ru: {
    cover: {
      tag: 'ПАРТНЕРСКАЯ ПРОГРАММА · НЕДВИЖИМОСТЬ ОАЭ',
      headline: 'Ваш клиент. Ваша комиссия.\nДо 90% от застройщика.',
      sub: 'WTP — ведущая сервисная компания на рынке недвижимости ОАЭ. Партнёрские сделки, юридическое сопровождение, финансовый консалтинг.',
      stat: '90%', statLabel: 'от комиссии застройщика\nпереходит партнёру',
      cta: 'Стать партнёром',
    },
    about: {
      title: 'О компании',
      intro: 'WTP — ведущая сервисная компания на рынке недвижимости ОАЭ, специализирующаяся на партнёрских сделках и IT-услугах. За 2023–2024 годы мы удостоены наград за высокие объёмы продаж у ведущих застройщиков Дубая и Абу-Даби.',
      guaranteeTitle: 'ГАРАНТИЯ ЛУЧШИХ УСЛОВИЙ',
      guaranteeText: 'Доступ к самым выгодным предложениям на рынке ОАЭ с максимальной выгодой',
      confTitle: 'КОНФИДЕНЦИАЛЬНОСТЬ',
      confText: 'Все сделки проходят с соблюдением строгих стандартов',
      awardsTitle: 'НАШИ ДОСТИЖЕНИЯ',
      awards: [
        { developer: 'ALDAR', title: 'Honours Awards', detail: 'Top Performing Dubai Agency 2023' },
        { developer: 'SOBHA', title: 'Stars Award', detail: 'Outstanding Performance 2023' },
        { developer: 'BINGHATTI', title: 'Broker Awards', detail: 'Top Broker 2023' },
        { developer: 'SOBHA', title: 'Golden Globe', detail: 'Awards 2022' },
      ],
    },
    why: {
      title: 'Почему выбирают WTP',
      benefits: [
        { title: 'Клиент навсегда закреплён за вами', text: 'Когда вы передаёте клиента или закрываете сделку через наше агентство, он остаётся вашим на постоянной основе. Все будущие сделки будут приносить вам комиссионные, создавая стабильный и растущий доход.' },
        { title: 'Выплаты комиссий сразу после сделки', text: 'Наша система выплат работает быстро и прозрачно: вы получаете свои комиссионные сразу после выплаты комиссий со стороны застройщика.' },
        { title: 'Финансовый консалтинг', text: 'Наши специалисты следят за всеми изменениями в международном законодательстве и налоговых требованиях, обеспечивая полное соответствие всем нормам.' },
        { title: 'Юридическая безопасность', text: 'Все сделки полностью защищены с юридической точки зрения. Полное соблюдение всех законодательных норм и регуляций ОАЭ.' },
        { title: 'Помощь в одобрении ипотеки', text: 'Комплексная поддержка на каждом этапе: от подачи заявки до окончательного одобрения. Наши эксперты работают с ведущими банками ОАЭ.' },
      ],
    },
    partners: {
      title: 'Формат «Партнёры»',
      description: 'Формат «Партнёры» предоставляет вам полный контроль над сделкой и взаимодействием с клиентом. Идеальный вариант для опытных профессионалов, готовых взять на себя ответственность за всю сделку от начала до конца, получая при этом повышенную комиссию.',
      pillars: [
        { label: 'КОММУНИКАЦИЯ', text: 'Вы лично взаимодействуете с клиентом, подбираете недвижимость и организуете все этапы сделки без участия наших брокеров.' },
        { label: 'СБОР ДОКУМЕНТОВ', text: 'Вы и ваша команда полностью отвечаете за подготовку всей необходимой документации и её соответствие нормам.' },
        { label: 'МАКСИМАЛЬНАЯ КОМИССИЯ', text: 'За активное участие в процессе вы получаете лучшие условия и максимальную долю комиссии.' },
      ],
      note: 'Если вы привлечёте новых партнёров, то будете получать дополнительный процент с каждой их сделки.',
    },
    referrals: {
      title: 'Формат «Рефералы»',
      description: 'Формат «Рефералы» идеально подходит для тех, кто хочет получать доход от сделок, не участвуя в их организации. Вы можете сосредоточиться на расширении клиентской базы, оставив все остальные задачи нашим профессионалам.',
      pillars: [
        { label: 'ПОЛНЫЙ СПЕКТР УСЛУГ', text: 'Наши брокеры берут на себя подбор недвижимости, переговоры с клиентом, подготовку и сбор всех необходимых документов, обеспечивая сопровождение на каждом этапе сделки.' },
        { label: 'БЫСТРАЯ КОМИССИЯ', text: 'Вы получаете свою комиссию сразу после получения комиссии от застройщика, без необходимости вовлекаться в операционные процессы.' },
      ],
    },
    comparison: {
      title: 'Сравнение форматов работы',
      legendWtp: 'Задачи WTP',
      legendPartner: 'Задачи партнёра',
      tierLabels: ['Партнёр', 'Партнёр', 'Партнёр', 'Реферал'],
      tierSplits: ['90/10', '80/20', '70/30', '50/50'],
      rows: [
        { task: 'Поиск и квалификация клиента', wtp: [0,0,0,0] },
        { task: 'Коммуникация с клиентом', wtp: [0,0,0,1] },
        { task: 'Сбор необходимых документов', wtp: [0,0,0,1] },
        { task: 'Рекомендация по застройщикам и объекту', wtp: [0,0,1,1] },
        { task: 'Бронирование с менеджером застройщика', wtp: [0,1,1,1] },
        { task: 'Методичка подготовки пакета документов', wtp: [0,1,1,1] },
        { task: 'Контроль подписания SPA', wtp: [0,0,1,1] },
        { task: 'Право пользования брокерской лицензией', wtp: [1,1,1,1] },
        { task: 'Выставление инвойса', wtp: [1,1,1,1] },
        { task: 'Торопим застройщика быстрее выплатить', wtp: [1,1,1,1] },
        { task: 'Выплачиваем комиссию', wtp: [1,1,1,1] },
      ],
    },
    earnings: {
      title: 'Как зарабатывают наши партнёры',
      commLabel: 'Комиссия от застройщика:',
      yourComm: 'Ваша комиссия',
      properties: [
        { name: 'Damac Hills Utopia', price: '24 112 000 AED', rate: '5%', t: ['1 085 040', '964 480', '843 920', '602 800'] },
        { name: 'Damac Hills — The Legends', price: '6 450 000 AED', rate: '5%', t: ['290 250', '258 000', '225 750', '161 250'] },
        { name: 'Sobha Hartland 2 — Skyscape', price: '2 285 500 AED', rate: '5%', t: ['102 847', '91 420', '79 993', '57 138'] },
        { name: 'Aldar — Nikki Beach (RAK)', price: '2 046 260 AED', rate: '5%', t: ['92 082', '81 850', '71 620', '51 156'] },
      ],
    },
    who: {
      title: 'Кто может стать партнёром',
      intro: 'Мы приглашаем к сотрудничеству всех, кто хочет зарабатывать вместе с WTP, предоставляя клиентам исключительный сервис и выгодные условия на рынке недвижимости ОАЭ.',
      types: [
        { title: 'Частные брокеры', text: 'Специалисты, стремящиеся увеличить доход и расширить возможности' },
        { title: 'Бизнес-консультанты', text: 'Эксперты в стратегическом планировании и инвестициях' },
        { title: 'Архитекторы', text: 'Проектировщики с клиентами, заинтересованными в покупке недвижимости' },
        { title: 'Агентства недвижимости', text: 'Компании, предлагающие лучшие объекты ОАЭ без лицензии' },
        { title: 'Инвестиционные брокеры', text: 'Специалисты, управляющие активами и предлагающие инвестиции' },
        { title: 'Банки', text: 'Финансовые учреждения, предлагающие клиентам условия на покупку недвижимости' },
        { title: 'Бизнес в любой индустрии', text: 'Компании с клиентской базой, готовые привлекать клиентов на покупку недвижимости в ОАЭ' },
      ],
    },
    services: {
      title: 'Дополнительные услуги',
      subtitle: 'Зарабатывайте от продажи дополнительных услуг',
      headers: ['УСЛУГА', 'ОПИСАНИЕ', 'СТОИМОСТЬ'],
      items: [
        { service: 'Регистрация компании в Дубае Mainland', desc: 'Подходит для компаний, планирующих работать на внутреннем рынке Дубая', cost: '$16 000 / 58 720 AED' },
        { service: 'Регистрация компании в Дубае FZ', desc: 'Подходит для компаний, которым не нужен офис в Дубае и внутренний рынок не является основным', cost: '$11 000 / 40 769 AED' },
        { service: 'Оформление завещания (выезд к нотариусу)', desc: 'Для клиентов с недвижимостью в Дубае. Без завещания — наследство через суд по шариату', cost: '$3 200 / 11 753 AED' },
        { service: 'Оформление завещания (онлайн)', desc: 'Аналог нотариального, оформляется дистанционно', cost: '$3 800 / 13 957 AED' },
      ],
    },
    cta: {
      title: 'Как начать работать с нами',
      steps: [
        { title: 'Заключите соглашение', text: 'Мы подписываем соглашение, подтверждающее, что вы будете направлять клиентов к нам и получать за это комиссию.' },
        { title: 'Передайте клиентов', text: 'Отправьте контактные данные заинтересованных лиц вашему менеджеру или через форму заявки в личном кабинете.' },
        { title: 'Следите за статусом', text: 'Вы получите доступ к личному кабинету, где сможете отслеживать статус всех ваших клиентов и этапы сделок.' },
        { title: 'Получите комиссию до 90%', text: 'После того как агентство получит свою долю комиссии, вы получите свою часть — до 90%.' },
      ],
      closing: 'Станьте партнёром уже сегодня',
      emailLabel: 'ЭЛЕКТРОННАЯ ПОЧТА',
      phoneLabel: 'ТЕЛЕФОН | ДУБАЙ',
      phoneMoscowLabel: 'ТЕЛЕФОН | МОСКВА',
    },
  },
  en: {
    cover: {
      tag: 'PARTNER PROGRAM · UAE REAL ESTATE',
      headline: 'Your client. Your commission.\nUp to 90% from the developer.',
      sub: 'WTP — leading service company in UAE real estate. Partner deals, legal support, financial consulting.',
      stat: '90%', statLabel: 'of developer commission\ngoes to partner',
      cta: 'Become a Partner',
    },
    about: {
      title: 'About the Company',
      intro: 'WTP is a leading service company in the UAE real estate market, specializing in partner deals and IT services. In 2023–2024, we received awards for high sales volumes from leading developers in Dubai and Abu Dhabi.',
      guaranteeTitle: 'BEST TERMS GUARANTEE',
      guaranteeText: 'Access to the most favorable offers on the UAE market with maximum benefit',
      confTitle: 'CONFIDENTIALITY',
      confText: 'All deals are conducted in compliance with strict standards',
      awardsTitle: 'OUR ACHIEVEMENTS',
      awards: [
        { developer: 'ALDAR', title: 'Honours Awards', detail: 'Top Performing Dubai Agency 2023' },
        { developer: 'SOBHA', title: 'Stars Award', detail: 'Outstanding Performance 2023' },
        { developer: 'BINGHATTI', title: 'Broker Awards', detail: 'Top Broker 2023' },
        { developer: 'SOBHA', title: 'Golden Globe', detail: 'Awards 2022' },
      ],
    },
    why: {
      title: 'Why Choose WTP',
      benefits: [
        { title: 'Your client stays yours forever', text: 'When you refer a client or close a deal through our agency, they remain yours permanently. All future deals will generate commissions for you, creating stable and growing income.' },
        { title: 'Commission payouts right after the deal', text: 'Our payout system works quickly and transparently: you receive your commissions immediately after the developer pays out.' },
        { title: 'Financial consulting', text: 'Our specialists monitor all changes in international legislation and tax requirements, ensuring full compliance with all norms.' },
        { title: 'Legal protection', text: 'All deals are fully protected from a legal standpoint. Full compliance with all UAE laws and regulations guaranteed.' },
        { title: 'Mortgage approval assistance', text: 'Comprehensive support at every stage: from application to final approval. Our experts work with leading UAE banks.' },
      ],
    },
    partners: {
      title: 'Partners Program',
      description: 'The Partners format gives you full control over the deal and client interaction. Ideal for experienced professionals ready to take full responsibility for the entire transaction, receiving an increased commission in return.',
      pillars: [
        { label: 'COMMUNICATION', text: 'You personally interact with the client, select properties, and organize all stages of the deal without our brokers\' involvement.' },
        { label: 'DOCUMENTATION', text: 'You and your team are fully responsible for preparing all required documentation and ensuring its compliance with regulations.' },
        { label: 'MAXIMUM COMMISSION', text: 'For your active participation in the process, you receive the best terms and the maximum commission share.' },
      ],
      note: 'If you recruit new partners, you will receive an additional percentage from each of their deals.',
    },
    referrals: {
      title: 'Referrals Program',
      description: 'The Referrals format is ideal for those who want to earn from deals without organizing them. Focus on expanding your client base while our professionals handle everything else.',
      pillars: [
        { label: 'FULL SERVICE', text: 'Our brokers handle property selection, client negotiations, preparation and collection of all documents, providing support at every stage of the deal.' },
        { label: 'FAST COMMISSION', text: 'You receive your commission immediately after the developer pays out, without needing to be involved in operational processes.' },
      ],
    },
    comparison: {
      title: 'Program Comparison',
      legendWtp: 'WTP tasks',
      legendPartner: 'Partner tasks',
      tierLabels: ['Partner', 'Partner', 'Partner', 'Referral'],
      tierSplits: ['90/10', '80/20', '70/30', '50/50'],
      rows: [
        { task: 'Client search and qualification', wtp: [0,0,0,0] },
        { task: 'Client communication', wtp: [0,0,0,1] },
        { task: 'Document collection', wtp: [0,0,0,1] },
        { task: 'Developer and property recommendations', wtp: [0,0,1,1] },
        { task: 'Booking with developer sales manager', wtp: [0,1,1,1] },
        { task: 'Document preparation methodology', wtp: [0,1,1,1] },
        { task: 'SPA signing control', wtp: [0,0,1,1] },
        { task: 'Broker license usage rights', wtp: [1,1,1,1] },
        { task: 'Invoice issuance', wtp: [1,1,1,1] },
        { task: 'Developer payment follow-up', wtp: [1,1,1,1] },
        { task: 'Commission payout', wtp: [1,1,1,1] },
      ],
    },
    earnings: {
      title: 'How Our Partners Earn',
      commLabel: 'Developer commission:',
      yourComm: 'Your commission',
      properties: [
        { name: 'Damac Hills Utopia', price: '24,112,000 AED', rate: '5%', t: ['1,085,040', '964,480', '843,920', '602,800'] },
        { name: 'Damac Hills — The Legends', price: '6,450,000 AED', rate: '5%', t: ['290,250', '258,000', '225,750', '161,250'] },
        { name: 'Sobha Hartland 2 — Skyscape', price: '2,285,500 AED', rate: '5%', t: ['102,847', '91,420', '79,993', '57,138'] },
        { name: 'Aldar — Nikki Beach (RAK)', price: '2,046,260 AED', rate: '5%', t: ['92,082', '81,850', '71,620', '51,156'] },
      ],
    },
    who: {
      title: 'Who Can Become a Partner',
      intro: 'We invite everyone who wants to earn with WTP, providing clients with exceptional service and favorable conditions in the UAE real estate market.',
      types: [
        { title: 'Private Brokers', text: 'Professionals looking to increase income and expand opportunities' },
        { title: 'Business Consultants', text: 'Experts in strategic planning and investments' },
        { title: 'Architects', text: 'Designers with clients interested in purchasing property' },
        { title: 'Real Estate Agencies', text: 'Companies offering top UAE properties without a license' },
        { title: 'Investment Brokers', text: 'Professionals managing assets and offering investments' },
        { title: 'Banks', text: 'Financial institutions offering clients property purchase conditions' },
        { title: 'Businesses in Any Industry', text: 'Companies with a client base ready to attract clients for UAE property' },
      ],
    },
    services: {
      title: 'Additional Services',
      subtitle: 'Earn from selling additional services',
      headers: ['SERVICE', 'DESCRIPTION', 'COST'],
      items: [
        { service: 'Company Registration Dubai Mainland', desc: 'For companies planning to operate on the Dubai internal market', cost: '$16,000 / 58,720 AED' },
        { service: 'Company Registration Dubai Free Zone', desc: 'For companies that don\'t need a Dubai office and internal market is not primary', cost: '$11,000 / 40,769 AED' },
        { service: 'Will Registration (Notary Visit)', desc: 'For clients with UAE property. Without a will — inheritance through Sharia court', cost: '$3,200 / 11,753 AED' },
        { service: 'Will Registration (Online)', desc: 'Same as notary visit, processed remotely', cost: '$3,800 / 13,957 AED' },
      ],
    },
    cta: {
      title: 'How to Get Started',
      steps: [
        { title: 'Sign a partnership agreement', text: 'We sign an agreement confirming that you will refer clients to us and receive commission for it.' },
        { title: 'Refer your clients', text: 'Send contact details of interested parties to your manager or through the application form in your dashboard.' },
        { title: 'Track deal status', text: 'You\'ll get access to a personal dashboard to track the status of all your clients and deal stages.' },
        { title: 'Receive up to 90% commission', text: 'After the agency receives its share of the deal commission, you receive your part — up to 90%.' },
      ],
      closing: 'Become a partner today',
      emailLabel: 'EMAIL',
      phoneLabel: 'PHONE | DUBAI',
      phoneMoscowLabel: 'PHONE | MOSCOW',
    },
  },
};


// ─── CSS Design System ───────────────────────────────────────────────

const tierColors = ['#4a9aa5', '#3d8b97', '#2f6b7a', '#1d2951'];

const sharedCSS = `
  @page { size: 297mm 210mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }

  :root {
    --bg: #FAF9F6; --bg-card: #FFFFFF; --border: #E5E5E5;
    --text: #1B1B1B; --text2: #555555; --meta: #999999;
    --font: "Inter", sans-serif; --serif: "Playfair Display", serif;
    --accent: ${accent};
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font); width: 297mm; font-size: 14px; line-height: 1.5; }

  .slide {
    width: 297mm; height: 210mm; padding: 18mm 25mm;
    page-break-after: always; position: relative;
    display: flex; flex-direction: column; overflow: hidden;
  }
  .slide:last-child { page-break-after: auto; }

  /* ── Typography ── */
  .tag { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 500; margin-bottom: 16px; display: block; }
  .tag-light { color: rgba(255,255,255,0.55); }
  .tag-dark { color: var(--meta); }

  h1 { font-family: var(--serif); font-size: 44px; font-weight: 400; letter-spacing: -0.02em; line-height: 1.12; white-space: pre-line; }
  h2 { font-family: var(--serif); font-size: 26px; font-weight: 400; line-height: 1.2; margin-bottom: 18px; }
  h3 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
  h4 { font-family: var(--serif); font-size: 17px; font-weight: 400; margin-bottom: 6px; }

  .body-text { font-size: 14px; color: var(--text2); line-height: 1.55; }
  .small-text { font-size: 13px; color: var(--text2); line-height: 1.5; }
  .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--meta); font-weight: 500; margin-bottom: 8px; display: block; }

  /* ── Cover (dark) ── */
  .slide-dark { background: ${gradient}; color: #FFFFFF; padding: 22mm 28mm; }
  .slide-dark h1 { color: #FFFFFF; margin-bottom: 20px; max-width: 580px; }
  .slide-dark .sub { font-size: 16px; color: rgba(255,255,255,0.78); max-width: 500px; line-height: 1.55; margin-bottom: 32px; }
  .stat-box {
    display: inline-flex; align-items: baseline; gap: 14px;
    border: 1px solid rgba(255,255,255,0.25); border-radius: 8px;
    padding: 14px 22px; margin-top: auto; margin-bottom: 18mm;
  }
  .stat-number { font-family: var(--serif); font-size: 60px; font-weight: 400; letter-spacing: -0.02em; line-height: 1; }
  .stat-label { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.4; white-space: pre-line; }
  .cta-btn-light {
    display: inline-block; background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3); color: #fff;
    font-size: 13px; font-weight: 500; padding: 11px 28px; border-radius: 100px;
    letter-spacing: 0.02em;
  }

  /* ── About ── */
  .about-intro { font-size: 14px; color: var(--text2); line-height: 1.6; margin-bottom: 20px; max-width: 700px; }
  .about-features { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 20px; }
  .about-feature-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--meta); font-weight: 500; margin-bottom: 6px; border-top: 1px solid var(--border); padding-top: 10px; }
  .about-feature-text { font-size: 14px; color: var(--text); line-height: 1.5; }
  .award-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: auto; }
  .award-card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px;
    padding: 14px 16px; border-top: 3px solid var(--accent); text-align: center;
  }
  .award-dev { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 4px; }
  .award-title { font-family: var(--serif); font-size: 14px; margin-bottom: 3px; }
  .award-detail { font-size: 11px; color: var(--text2); }

  /* ── Benefits (Why) ── */
  .benefit-stack { display: flex; flex-direction: column; gap: 12px; flex: 1; }
  .benefit-row {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 10px 14px; background: var(--bg-card);
    border: 1px solid var(--border); border-radius: 8px;
  }
  .benefit-row .accent-bar { width: 4px; border-radius: 2px; align-self: stretch; flex-shrink: 0; background: var(--accent); }
  .benefit-row strong { font-size: 15px; font-family: var(--serif); font-weight: 400; display: block; margin-bottom: 2px; }
  .benefit-row p { font-size: 12px; color: var(--text2); line-height: 1.45; }

  /* ── Programs (Partners / Referrals) ── */
  .program-desc { font-size: 14px; color: var(--text2); line-height: 1.6; margin-bottom: 22px; max-width: 700px; }
  .pillar-grid { display: grid; gap: 20px; flex: 1; align-items: start; }
  .pillar-grid-3 { grid-template-columns: repeat(3, 1fr); }
  .pillar-grid-2 { grid-template-columns: repeat(2, 1fr); }
  .pillar-item { }
  .pillar-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); font-weight: 600; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 2px solid var(--accent); }
  .pillar-text { font-size: 13px; color: var(--text2); line-height: 1.5; }
  .program-note { font-size: 13px; color: var(--text); line-height: 1.5; margin-top: auto; padding: 12px 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; border-left: 3px solid var(--accent); }

  /* ── Comparison Table ── */
  .comparison-legend { display: flex; gap: 24px; margin-bottom: 14px; align-items: center; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text2); }
  .dot-wtp { width: 12px; height: 12px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
  .dot-partner { width: 12px; height: 12px; border-radius: 50%; background: #ccc; flex-shrink: 0; }
  .comp-table { width: 100%; border-collapse: collapse; flex: 1; }
  .comp-table th { padding: 10px 12px; text-align: center; color: #fff; font-size: 12px; font-weight: 500; vertical-align: bottom; }
  .comp-table th .tier-label { display: block; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; margin-bottom: 4px; }
  .comp-table th .tier-split { font-family: var(--serif); font-size: 28px; font-weight: 400; line-height: 1; }
  .comp-table th .tier-slash { font-size: 18px; opacity: 0.6; }
  .comp-table th:first-child { background: none; text-align: left; color: var(--text); font-size: 10px; }
  .comp-table td { padding: 8px 12px; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text2); }
  .comp-table td:first-child { padding-left: 0; }
  .comp-table td:not(:first-child) { text-align: center; }
  .comp-table .cell-dot { width: 14px; height: 14px; border-radius: 50%; display: inline-block; }
  .cell-dot-wtp { background: var(--accent); }
  .cell-dot-partner { background: #d5d5d5; }

  /* ── Earnings ── */
  .earnings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; flex: 1; }
  .prop-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: 16px 20px; }
  .prop-name { font-family: var(--serif); font-size: 16px; margin-bottom: 2px; }
  .prop-price { font-family: var(--serif); font-size: 22px; font-weight: 400; color: var(--accent); margin-bottom: 3px; }
  .prop-rate { font-size: 11px; color: var(--meta); margin-bottom: 10px; }
  .prop-comm-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--meta); font-weight: 500; margin-bottom: 6px; }
  .prop-tier { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dotted var(--border); font-size: 12px; }
  .prop-tier:last-child { border-bottom: none; }
  .prop-tier-label { color: var(--meta); }
  .prop-tier-val { font-weight: 600; color: var(--text); }

  /* ── Partner Types ── */
  .types-intro { font-size: 14px; color: var(--text2); line-height: 1.6; margin-bottom: 18px; max-width: 700px; }
  .types-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; flex: 1; }
  .type-card { padding: 10px 14px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; }
  .type-title { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .type-text { font-size: 12px; color: var(--text2); line-height: 1.45; }

  /* ── Services ── */
  .slide-services { background: var(--accent); color: #fff; padding: 22mm 28mm; }
  .slide-services h2 { color: #fff; }
  .slide-services .sub { font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 22px; }
  .svc-table { width: 100%; border-collapse: collapse; flex: 1; }
  .svc-table th { padding: 10px 0; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.2); }
  .svc-table th:last-child { text-align: right; }
  .svc-table td { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.12); font-size: 13px; color: rgba(255,255,255,0.85); line-height: 1.5; vertical-align: top; }
  .svc-table td:first-child { font-weight: 500; color: #fff; padding-right: 20px; width: 30%; }
  .svc-table td:last-child { text-align: right; font-weight: 600; color: #fff; white-space: nowrap; width: 20%; }
  .svc-table td:nth-child(2) { color: rgba(255,255,255,0.65); width: 50%; }

  /* ── CTA / Steps ── */
  .cta-layout { display: grid; grid-template-columns: 58fr 42fr; gap: 30px; flex: 1; align-items: center; }
  .steps-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px; }
  .step-item { display: flex; gap: 14px; align-items: flex-start; }
  .step-num {
    width: 32px; height: 32px; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 14px; font-weight: 600; color: #fff; background: var(--accent);
  }
  .step-title { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .step-text { font-size: 12px; color: var(--text2); line-height: 1.45; }
  .cta-closing {
    padding: 24px; background: var(--accent); border-radius: 12px;
    color: #fff; text-align: center;
  }
  .cta-closing h2 { color: #fff; font-size: 28px; margin-bottom: 20px; }
  .cta-contact-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
  .cta-contact-value { font-size: 15px; margin-bottom: 12px; }

  /* ── Footer ── */
  .footer {
    margin-top: auto; padding-top: 8px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .footer-value { font-size: 10px; color: var(--meta); }
  .footer-dark {
    margin-top: auto; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.15);
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .footer-dark .footer-value { color: rgba(255,255,255,0.5); }
`;

const largeFontCSS = largeMode ? `
  body { font-size: 16px; }
  .slide { padding: 16mm 23mm; }
  .tag { font-size: 12px; }
  .label { font-size: 12px; }
  h1 { font-size: 48px; }
  h2 { font-size: 29px; }
  h3 { font-size: 18px; }
  h4 { font-size: 19px; }
  .body-text { font-size: 16px; }
  .small-text { font-size: 15px; }

  .slide-dark { padding: 20mm 26mm; }
  .slide-dark .sub { font-size: 18px; }
  .stat-number { font-size: 64px; }
  .stat-label { font-size: 15px; }
  .cta-btn-light { font-size: 15px; }

  .about-intro { font-size: 16px; }
  .about-feature-label { font-size: 12px; }
  .about-feature-text { font-size: 16px; }
  .award-dev { font-size: 14px; }
  .award-title { font-size: 16px; }
  .award-detail { font-size: 13px; }

  .benefit-row strong { font-size: 17px; }
  .benefit-row p { font-size: 14px; }

  .program-desc { font-size: 16px; }
  .pillar-label { font-size: 12px; }
  .pillar-text { font-size: 15px; }
  .program-note { font-size: 15px; }

  .legend-item { font-size: 14px; }
  .comp-table th .tier-split { font-size: 30px; }
  .comp-table th .tier-label { font-size: 11px; }
  .comp-table td { font-size: 14px; }

  .prop-name { font-size: 18px; }
  .prop-price { font-size: 24px; }
  .prop-rate { font-size: 13px; }
  .prop-comm-title { font-size: 12px; }
  .prop-tier { font-size: 14px; }

  .types-intro { font-size: 16px; }
  .type-title { font-size: 16px; }
  .type-text { font-size: 14px; }

  .slide-services { padding: 20mm 26mm; }
  .slide-services .sub { font-size: 17px; }
  .svc-table td { font-size: 15px; }
  .svc-table th { font-size: 12px; }

  .step-title { font-size: 16px; }
  .step-text { font-size: 14px; }
  .cta-closing h2 { font-size: 30px; }
  .cta-contact-label { font-size: 12px; }
  .cta-contact-value { font-size: 17px; }
  .footer-value { font-size: 12px; }
` : '';


// ─── Slide Builders ──────────────────────────────────────────────────

function buildSlide1_Cover(d, b) {
  return `
    <div class="slide slide-dark">
      <span class="tag tag-light">${d.cover.tag}</span>
      <h1>${d.cover.headline}</h1>
      <div class="sub">${d.cover.sub}</div>
      <div style="margin-bottom:12px"><span class="cta-btn-light">${d.cover.cta}</span></div>
      <div class="stat-box">
        <span class="stat-number">${d.cover.stat}</span>
        <span class="stat-label">${d.cover.statLabel}</span>
      </div>
      <div class="footer-dark">
        <div class="footer-value">${b.company} · ${b.email}</div>
        <div class="footer-value">${b.phone}</div>
      </div>
    </div>`;
}

function buildSlide2_About(d, b) {
  const awardsHTML = d.about.awards.map(a => `
    <div class="award-card">
      <div class="award-dev">${a.developer}</div>
      <div class="award-title">${a.title}</div>
      <div class="award-detail">${a.detail}</div>
    </div>`).join('');

  return `
    <div class="slide">
      <h2>${d.about.title}</h2>
      <div class="about-intro">${d.about.intro}</div>
      <div class="about-features">
        <div>
          <div class="about-feature-label">${d.about.guaranteeTitle}</div>
          <div class="about-feature-text">${d.about.guaranteeText}</div>
        </div>
        <div>
          <div class="about-feature-label">${d.about.confTitle}</div>
          <div class="about-feature-text">${d.about.confText}</div>
        </div>
      </div>
      <span class="label">${d.about.awardsTitle}</span>
      <div class="award-row">${awardsHTML}</div>
      <div class="footer">
        <div class="footer-value">${b.since}</div>
        <div class="footer-value">${d.cover.tag}</div>
      </div>
    </div>`;
}

function buildSlide3_Why(d, b) {
  const benefitsHTML = d.why.benefits.map(bf => `
    <div class="benefit-row">
      <div class="accent-bar"></div>
      <div><strong>${bf.title}</strong><p>${bf.text}</p></div>
    </div>`).join('');

  return `
    <div class="slide">
      <h2>${d.why.title}</h2>
      <div class="benefit-stack">${benefitsHTML}</div>
      <div class="footer">
        <div class="footer-value">${b.since}</div>
        <div class="footer-value">${d.cover.tag}</div>
      </div>
    </div>`;
}

function buildSlide4_Partners(d, b) {
  const pillarsHTML = d.partners.pillars.map(p => `
    <div class="pillar-item">
      <div class="pillar-label">${p.label}</div>
      <div class="pillar-text">${p.text}</div>
    </div>`).join('');

  return `
    <div class="slide">
      <h2>${d.partners.title}</h2>
      <div class="program-desc">${d.partners.description}</div>
      <div class="pillar-grid pillar-grid-3">${pillarsHTML}</div>
      <div class="program-note">${d.partners.note}</div>
      <div class="footer">
        <div class="footer-value">${b.since}</div>
        <div class="footer-value">${d.cover.tag}</div>
      </div>
    </div>`;
}

function buildSlide5_Referrals(d, b) {
  const pillarsHTML = d.referrals.pillars.map(p => `
    <div class="pillar-item">
      <div class="pillar-label">${p.label}</div>
      <div class="pillar-text">${p.text}</div>
    </div>`).join('');

  return `
    <div class="slide">
      <h2>${d.referrals.title}</h2>
      <div class="program-desc">${d.referrals.description}</div>
      <div class="pillar-grid pillar-grid-2">${pillarsHTML}</div>
      <div class="footer">
        <div class="footer-value">${b.since}</div>
        <div class="footer-value">${d.cover.tag}</div>
      </div>
    </div>`;
}

function buildSlide6_Comparison(d, b) {
  const c = d.comparison;
  const thCells = c.tierLabels.map((label, i) => {
    const [big, small] = c.tierSplits[i].split('/');
    return `<th style="background:${tierColors[i]}; border-radius:${i===0?'6px 0 0 0':''}${i===3?' 6px 0 0':''}">
      <span class="tier-label">${label}</span>
      <span class="tier-split">${big}<span class="tier-slash">/${small}</span></span>
    </th>`;
  }).join('');

  const rows = c.rows.map(r => {
    const cells = r.wtp.map(isWtp =>
      `<td><span class="cell-dot ${isWtp ? 'cell-dot-wtp' : 'cell-dot-partner'}"></span></td>`
    ).join('');
    return `<tr><td>${r.task}</td>${cells}</tr>`;
  }).join('');

  return `
    <div class="slide">
      <h2>${c.title}</h2>
      <div class="comparison-legend">
        <div class="legend-item"><span class="dot-wtp"></span> ${c.legendWtp}</div>
        <div class="legend-item"><span class="dot-partner"></span> ${c.legendPartner}</div>
      </div>
      <table class="comp-table">
        <thead><tr><th></th>${thCells}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="footer">
        <div class="footer-value">${b.since}</div>
        <div class="footer-value">${d.cover.tag}</div>
      </div>
    </div>`;
}

function buildSlide7_Earnings(d, b) {
  const tiers = ['90/10', '80/20', '70/30', '50/50'];
  const cardsHTML = d.earnings.properties.map(p => {
    const tiersHTML = tiers.map((t, i) => `
      <div class="prop-tier">
        <span class="prop-tier-label">${t}</span>
        <span class="prop-tier-val">${p.t[i]} AED</span>
      </div>`).join('');

    return `
      <div class="prop-card">
        <div class="prop-name">${p.name}</div>
        <div class="prop-price">${p.price}</div>
        <div class="prop-rate">${d.earnings.commLabel} ${p.rate}</div>
        <div class="prop-comm-title">${d.earnings.yourComm}</div>
        ${tiersHTML}
      </div>`;
  }).join('');

  return `
    <div class="slide">
      <h2>${d.earnings.title}</h2>
      <div class="earnings-grid">${cardsHTML}</div>
      <div class="footer">
        <div class="footer-value">${b.since}</div>
        <div class="footer-value">${d.cover.tag}</div>
      </div>
    </div>`;
}

function buildSlide8_Who(d, b) {
  const typesHTML = d.who.types.map(t => `
    <div class="type-card">
      <div class="type-title">${t.title}</div>
      <div class="type-text">${t.text}</div>
    </div>`).join('');

  return `
    <div class="slide">
      <h2>${d.who.title}</h2>
      <div class="types-intro">${d.who.intro}</div>
      <div class="types-grid">${typesHTML}</div>
      <div class="footer">
        <div class="footer-value">${b.since}</div>
        <div class="footer-value">${d.cover.tag}</div>
      </div>
    </div>`;
}

function buildSlide9_Services(d, b) {
  const rowsHTML = d.services.items.map(item => `
    <tr>
      <td>${item.service}</td>
      <td>${item.desc}</td>
      <td>${item.cost}</td>
    </tr>`).join('');

  return `
    <div class="slide slide-services">
      <h2>${d.services.title}</h2>
      <div class="sub">${d.services.subtitle}</div>
      <table class="svc-table">
        <thead><tr>${d.services.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${rowsHTML}</tbody>
      </table>
      <div class="footer-dark">
        <div class="footer-value">${b.since}</div>
        <div class="footer-value">${d.cover.tag}</div>
      </div>
    </div>`;
}

function buildSlide10_CTA(d, b) {
  const stepsHTML = d.cta.steps.map((s, i) => `
    <li class="step-item">
      <div class="step-num">${i + 1}</div>
      <div><div class="step-title">${s.title}</div><div class="step-text">${s.text}</div></div>
    </li>`).join('');

  return `
    <div class="slide">
      <h2>${d.cta.title}</h2>
      <div class="cta-layout">
        <ul class="steps-list">${stepsHTML}</ul>
        <div class="cta-closing">
          <h2>${d.cta.closing}</h2>
          <div class="cta-contact-label">${d.cta.emailLabel}</div>
          <div class="cta-contact-value">${b.email}</div>
          <div class="cta-contact-label">${d.cta.phoneLabel}</div>
          <div class="cta-contact-value">${b.phone}</div>
          <div class="cta-contact-label">${d.cta.phoneMoscowLabel}</div>
          <div class="cta-contact-value">${b.phoneMoscow}</div>
        </div>
      </div>
    </div>`;
}


// ─── HTML Wrapper ────────────────────────────────────────────────────

function buildPresentation(lang) {
  const d = data[lang];
  const b = brand[lang];
  const slides = [
    buildSlide1_Cover(d, b),
    buildSlide2_About(d, b),
    buildSlide3_Why(d, b),
    buildSlide4_Partners(d, b),
    buildSlide5_Referrals(d, b),
    buildSlide6_Comparison(d, b),
    buildSlide7_Earnings(d, b),
    buildSlide8_Who(d, b),
    buildSlide9_Services(d, b),
    buildSlide10_CTA(d, b),
  ].join('');

  return `<!DOCTYPE html>
<html lang="${lang === 'ru' ? 'ru' : 'en'}">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>${sharedCSS}${largeFontCSS}</style>
</head>
<body>
${slides}
</body>
</html>`;
}


// ─── PDF Generator ───────────────────────────────────────────────────

async function generatePDF(lang, browser) {
  const html = buildPresentation(lang);
  const langUpper = lang.toUpperCase();
  const filename = `WTP_re-partnership_${langUpper}`;
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
  await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: 1123, height: 794 } });

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
  console.log(`  ${icon} re-partnership [${langUpper}]: ${info}`);

  return { lang: langUpper, slides: diagnostics, allFit };
}


// ─── Main ────────────────────────────────────────────────────────────

(async () => {
  fs.mkdirSync(outDir, { recursive: true });

  const langs = ['ru', 'en'];
  console.log(`\nGenerating RE Partnership presentation${largeMode ? ' (LARGE FONTS)' : ''}...`);
  console.log(`  Languages: ${langs.join(', ')}`);
  console.log(`  Slides: 10`);
  console.log(`  Output: ${outDir}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];
  for (const lang of langs) {
    const result = await generatePDF(lang, browser);
    results.push(result);
  }

  await browser.close();

  console.log('\n\u2500\u2500\u2500 Summary \u2500\u2500\u2500');
  const ok = results.filter(r => r.allFit).length;
  const overflow = results.filter(r => !r.allFit).length;
  console.log(`\u2705 OK: ${ok}  \u26a0\ufe0f Overflow: ${overflow}  Total: ${results.length} PDFs (${results.length * 10} slides)`);
  console.log('\nDone!');
})();
