import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick } from '../lib/analytics'

interface ServiceItem {
    name: string
    desc: string
}

interface ProductDetail {
    title: string
    subtitle: string
    intro: string
    services: ServiceItem[]
    redFlags?: string[]
    result: string
}

type ProductDataMap = Record<string, Record<string, ProductDetail>>

const productData: ProductDataMap = {
    en: {
        'banking': {
            title: 'Corporate Banking',
            subtitle: 'CORE SERVICE',
            intro:
                'Corporate banking is the foundation of every case. We work through the bank\'s compliance lens to ensure accounts are opened, maintained, and protected.',
            services: [
                { name: 'Corporate Account Opening', desc: 'Structured around business profile, transaction logic, and bank requirements. KYC-first approach, pre-cleared with banker before submission.' },
                { name: 'Payment Infrastructure', desc: 'International transfers, payment routing, multi-currency setup, and SWIFT/local payment integration.' },
                { name: 'Compliance Support', desc: 'Ongoing bank relationship management, EDD (Enhanced Due Diligence) responses, document updates, and annual reviews.' },
                { name: 'Multi-Bank Strategy', desc: 'Diversification across local and international banks for operational resilience and payment flexibility.' },
                { name: 'Trade Finance', desc: 'Letters of credit, bank guarantees, and documentary collections for import/export businesses.' },
                { name: 'Merchant Services', desc: 'POS terminals, payment gateway integration, and e-commerce settlement accounts.' },
                { name: 'Crypto Payments', desc: 'Cryptocurrency settlement through certified OTC desks and licensed crypto service providers. Compliant infrastructure for businesses that need fiat-crypto conversion.' },
            ],
            redFlags: [
                'No source of funds documentation',
                'High-risk industries: crypto exchanges, forex brokerages, gambling, defense',
                'Cash-intensive businesses without clear audit trail',
                'Shell companies with no operational substance',
            ],
            result: 'Bank account accepted by compliance, with transparent transaction logic and no future surprises.',
        },
        'premium-banking': {
            title: 'Premium Banking',
            subtitle: 'PERSONAL',
            intro:
                'Personal banking for HNW individuals. We connect clients with the right private bankers and ensure smooth onboarding.',
            services: [
                { name: 'Personal Account Opening', desc: 'Premium and priority banking with dedicated relationship managers at leading UAE banks.' },
                { name: 'Private Banking Introduction', desc: 'Access to private banking desks with minimum AUM thresholds, tailored investment mandates.' },
                { name: 'Investment Account Access', desc: 'Brokerage accounts, fixed income products, structured notes, and discretionary portfolio management.' },
                { name: 'Credit & Lending', desc: 'Mortgage pre-approval, Lombard lending, credit facilities secured against deposits or investments.' },
                { name: 'Multi-Currency Management', desc: 'FX strategy, currency hedging, and multi-currency deposit optimization.' },
            ],
            redFlags: [
                'No verifiable source of wealth',
                'PEP status without proper documentation',
                'Expectation of anonymity or numbered accounts',
            ],
            result: 'Personal banking relationship with the right institution, matched to client profile and long-term goals.',
        },
        'business-setup': {
            title: 'Company Formation',
            subtitle: 'OPERATIONS',
            intro:
                'Company registration is not the goal — it\'s a step in the process. We structure the company to serve the banking strategy, not the other way around.',
            services: [
                { name: 'Free Zone Registration', desc: 'Optimized for banking acceptance, tax efficiency, and operational simplicity. Zone selection based on activity and banking compatibility.' },
                { name: 'Mainland Registration', desc: 'Required for local market operations, government contracts, or specific regulated activities. Includes local service agent coordination.' },
                { name: 'Trade License & Activities', desc: 'Activity selection aligned with banking and compliance requirements. Avoid mismatches that trigger bank rejections.' },
                { name: 'Corporate Tax Registration', desc: 'Federal Tax Authority registration, corporate tax setup, and substance requirements documentation.' },
                { name: 'VAT Registration', desc: 'Mandatory and voluntary VAT registration, return filing setup, and compliance calendar.' },
                { name: 'Office & Flexi-Desk', desc: 'Physical office, flexi-desk, or virtual office packages aligned with zone requirements and bank expectations.' },
            ],
            result: 'Company structure designed for the bank. License, activity, and zone chosen to maximize bankability.',
        },
        'residency': {
            title: 'Visa & Residency',
            subtitle: 'IDENTITY',
            intro:
                'Visa and residency processing integrated into the overall case. We handle employment visas, investor visas, and Golden Visa applications — always aligned with tax and banking strategy.',
            services: [
                { name: 'Employment Visa', desc: 'Standard employee or self-sponsored visa linked to company. Includes medical, Emirates ID, and status change.' },
                { name: 'Investor / Partner Visa', desc: 'For company shareholders and beneficial owners. Structured for long-term residence and banking eligibility.' },
                { name: 'Golden Visa (10-Year)', desc: 'Based on real estate investment (AED 2M+), business ownership, or professional qualification. Long-term stability for banking.' },
                { name: 'Family Visa & Dependents', desc: 'Spouse, children, parents — requires legalized documents (birth, marriage certificates). Aligned with housing and schooling.' },
                { name: 'Emirates ID & Biometrics', desc: 'Biometric registration, ID issuance, and renewal management.' },
                { name: 'Visa Renewal & Status Management', desc: 'Annual renewals, status changes, visa cancellation, and re-entry permit coordination.' },
                { name: 'Property Revaluation for Golden Visa', desc: 'Market revaluation of previously purchased property to meet the AED 2M threshold for Golden Visa qualification. Leveraging current market value of earlier investments.' },
            ],
            result: 'Legal residency in the UAE with all documentation aligned for banking, tax, and compliance requirements.',
        },
        'tax-residency': {
            title: 'Tax Residency',
            subtitle: 'TAX',
            intro:
                'Tax residency planning for individuals and structures. We ensure the UAE tax position is substantiated and can withstand scrutiny from any tax authority, aligned with the client\'s home jurisdiction requirements.',
            services: [
                { name: 'Tax Residency Certificate (TRC)', desc: 'Federal Tax Authority application, documentation preparation, and issuance timeline management.' },
                { name: 'Substance Requirements', desc: 'Physical presence planning, utility contracts, lease agreements, and evidence portfolio for substance compliance.' },
                { name: 'Double Tax Treaty Planning', desc: 'Analysis of applicable DTTs between UAE and client\'s home country. Structuring to optimize treaty benefits.' },
                { name: 'Exit Tax Advisory', desc: 'Pre-relocation planning for jurisdictions with exit taxes (Germany, Norway, France, etc.).' },
                { name: 'CRS/FATCA Compliance', desc: 'Automatic exchange of information preparation, self-certification, and reporting obligations management.' },
            ],
            redFlags: [
                'Client expects TRC without genuine UAE presence',
                'No intention to establish real substance',
                'Conflicting tax residency claims in multiple jurisdictions',
            ],
            result: 'Defensible UAE tax residency position with proper substance, documentation, and treaty utilization.',
        },
        'accounting': {
            title: 'Accounting & Compliance',
            subtitle: 'OPERATIONS',
            intro:
                'Financial operations that support — not undermine — your banking relationships. Every number, filing, and report is aligned with what banks and regulators expect.',
            services: [
                { name: 'Bookkeeping', desc: 'Monthly transaction recording, bank reconciliation, and financial statement preparation in compliance with IFRS.' },
                { name: 'VAT Filing', desc: 'Quarterly VAT return preparation, input tax recovery, and FTA portal management.' },
                { name: 'Corporate Tax Filing', desc: 'Annual corporate tax return, transfer pricing documentation, and tax computation for UAE entities.' },
                { name: 'Audit Preparation', desc: 'Audit-ready financial statements, supporting schedules, and auditor liaison for annual statutory audit.' },
                { name: 'Payroll & WPS', desc: 'Salary calculations, WPS compliance, end-of-service gratuity, and employee records management.' },
                { name: 'Economic Substance Reporting', desc: 'Annual ESR notifications and reports for relevant activities as required by UAE regulations.' },
            ],
            result: 'Clean books, filed taxes, and audit-ready financials that reinforce your banking compliance position.',
        },
        'real-estate': {
            title: 'Real Estate',
            subtitle: 'INVESTMENT',
            intro:
                'Real estate as a strategic tool — for visa qualification, capital deployment, or income generation. Every acquisition decision is evaluated against the broader case.',
            services: [
                { name: 'Residential Acquisition', desc: 'Primary residence or investment property selection, due diligence, and purchase execution in freehold areas.' },
                { name: 'Commercial Property', desc: 'Office, retail, and warehouse acquisition for operational or investment purposes.' },
                { name: 'Golden Visa Property', desc: 'Properties meeting the AED 2M+ threshold for 10-year Golden Visa qualification. Title deed structuring.' },
                { name: 'Conveyancing', desc: 'NOC, DLD transfer, mortgage registration, and escrow account management through closing.' },
                { name: 'Off-Plan Investment', desc: 'Developer due diligence, SPA review, payment plan structuring, and escrow verification.' },
                { name: 'Property Management', desc: 'Tenant placement, rental collection, maintenance coordination, and RERA compliance.' },
            ],
            redFlags: [
                'Anonymous purchase expectations',
                'No proof of source of funds for real estate',
                'Mismatched budget and stated Golden Visa goal',
            ],
            result: 'Property integrated into overall strategy: ownership, visa, tax, and banking all aligned.',
        },
        'wealth': {
            title: 'Wealth & Asset Protection',
            subtitle: 'LEGACY',
            intro:
                'Succession planning, asset protection, and wealth structuring — designed to preserve what\'s been built across jurisdictions and generations.',
            services: [
                { name: 'DIFC Wills', desc: 'Registered wills for UAE assets under common law. Prevents default Sharia inheritance distribution for non-Muslim residents.' },
                { name: 'DIFC Foundation', desc: 'Asset holding, succession planning, and privacy structuring through DIFC registered foundations.' },
                { name: 'Family Office Structuring', desc: 'Single or multi-family office setup in DIFC or ADGM. Governance, investment mandate, and regulatory compliance.' },
                { name: 'Capital Flow & Transfers', desc: 'Legal, controlled, and predictable movement of capital between jurisdictions with full audit trail.' },
                { name: 'Custody Solutions', desc: 'Access to regulated custody providers for financial instruments, precious metals, and digital assets.' },
                { name: 'Life Insurance Structuring', desc: 'Insurance wrappers for estate planning, tax optimization, and wealth transfer across jurisdictions.' },
            ],
            redFlags: [
                'Concealment intent without legal structure',
                'Sanctions-linked beneficial ownership',
                'No documentation for asset origins',
            ],
            result: 'Assets integrated into overall strategy: ownership, tax, residency, and succession aligned across generations.',
        },
    },
    ru: {
        'banking': {
            title: 'Корпоративный банкинг',
            subtitle: 'КЛЮЧЕВАЯ УСЛУГА',
            intro:
                'Корпоративный банкинг — фундамент каждого кейса. Мы работаем через призму комплаенса банка, чтобы счета были открыты, обслуживались и защищались.',
            services: [
                { name: 'Открытие корпоративного счёта', desc: 'Структурировано вокруг бизнес-профиля, транзакционной логики и требований банка. KYC-first подход, предварительное согласование с банкиром.' },
                { name: 'Платёжная инфраструктура', desc: 'Международные переводы, маршрутизация платежей, мультивалютная настройка и интеграция SWIFT.' },
                { name: 'Сопровождение комплаенса', desc: 'Управление отношениями с банком, ответы на EDD (Enhanced Due Diligence — углублённая проверка банком), обновление документов и ежегодные обзоры.' },
                { name: 'Мульти-банковская стратегия', desc: 'Диверсификация между локальными и международными банками для операционной устойчивости.' },
                { name: 'Торговое финансирование', desc: 'Аккредитивы, банковские гарантии и документарные инкассо для импортно-экспортного бизнеса.' },
                { name: 'Эквайринг', desc: 'POS-терминалы, интеграция платёжных шлюзов и расчётные счета для e-commerce.' },
                { name: 'Крипто-расчёты', desc: 'Расчёты в криптовалюте через сертифицированных OTC-подрядчиков и лицензированных провайдеров. Комплаентная инфраструктура для бизнесов, которым нужна конвертация фиат-крипто.' },
            ],
            redFlags: [
                'Отсутствие документов об источнике средств',
                'Высокорисковые отрасли: криптобиржи, форекс-брокеры, гемблинг, оборона',
                'Наличный бизнес без прозрачного аудиторского следа',
                'Компании-оболочки без операционной субстанции',
            ],
            result: 'Банковский счёт принят комплаенсом, с прозрачной транзакционной логикой и без неожиданностей.',
        },
        'premium-banking': {
            title: 'Премиум-банкинг',
            subtitle: 'ПЕРСОНАЛЬНЫЙ',
            intro:
                'Персональный банкинг для HNW-клиентов. Мы связываем клиентов с нужными private-банкирами и обеспечиваем гладкий onboarding.',
            services: [
                { name: 'Открытие персонального счёта', desc: 'Премиум и приоритетный банкинг с выделенными менеджерами в ведущих банках ОАЭ.' },
                { name: 'Знакомство с Private Banking', desc: 'Доступ к private banking с минимальными порогами AUM и индивидуальными инвестиционными мандатами.' },
                { name: 'Инвестиционные счета', desc: 'Брокерские счета, облигации, структурные продукты и дискреционное управление портфелем.' },
                { name: 'Кредитование', desc: 'Предварительное одобрение ипотеки, ломбардное кредитование, кредитные линии под залог депозитов.' },
                { name: 'Мультивалютное управление', desc: 'FX-стратегия, хеджирование валютных рисков и оптимизация мультивалютных депозитов.' },
            ],
            redFlags: [
                'Нет верифицируемого источника богатства',
                'PEP-статус без надлежащей документации',
                'Ожидание анонимности или номерных счетов',
            ],
            result: 'Персональные банковские отношения с правильным институтом, подобранным под профиль и долгосрочные цели.',
        },
        'business-setup': {
            title: 'Регистрация компаний',
            subtitle: 'ОПЕРАЦИИ',
            intro:
                'Регистрация компании — не цель, а шаг в процессе. Мы структурируем компанию под банковскую стратегию, а не наоборот.',
            services: [
                { name: 'Регистрация в свободной зоне', desc: 'Оптимизировано для банковского acceptance, налоговой эффективности и операционной простоты. Выбор зоны по совместимости с банками.' },
                { name: 'Регистрация на mainland', desc: 'Для операций на локальном рынке, госконтрактов или регулируемых видов деятельности. Координация с local service agent.' },
                { name: 'Торговая лицензия', desc: 'Выбор видов деятельности с учётом банковских и комплаенс-требований. Исключение несоответствий, ведущих к отказам банков.' },
                { name: 'Регистрация корпоративного налога', desc: 'Регистрация в Федеральной налоговой службе, настройка корпоративного налога и документация substance.' },
                { name: 'Регистрация НДС', desc: 'Обязательная и добровольная регистрация НДС, настройка деклараций и комплаенс-календарь.' },
                { name: 'Офис и Flexi-Desk', desc: 'Физический офис, flexi-desk или виртуальный офис в соответствии с требованиями зоны и ожиданиями банков.' },
            ],
            result: 'Корпоративная структура, спроектированная под банк. Лицензия, деятельность и зона выбраны для максимальной банкабельности.',
        },
        'residency': {
            title: 'Визы и резидентство',
            subtitle: 'ИДЕНТИЧНОСТЬ',
            intro:
                'Визовое оформление, интегрированное в общий кейс. Мы ведём рабочие визы, визы инвестора и Golden Visa — всегда в связке с налоговой и банковской стратегией.',
            services: [
                { name: 'Рабочая виза', desc: 'Стандартная или self-sponsored виза, привязанная к компании. Включает медицинское обследование, Emirates ID и смену статуса.' },
                { name: 'Виза инвестора / партнёра', desc: 'Для акционеров и бенефициарных владельцев. Структурирована для долгосрочного проживания и банковской eligibility.' },
                { name: 'Golden Visa (10 лет)', desc: 'На основе инвестиций в недвижимость (AED 2M+), владения бизнесом или профессиональной квалификации.' },
                { name: 'Семейная виза', desc: 'Супруг/а, дети, родители — требует легализованных документов (свидетельства о рождении, браке).' },
                { name: 'Emirates ID и биометрия', desc: 'Биометрическая регистрация, выпуск и продление ID-карты.' },
                { name: 'Продление и управление статусом', desc: 'Ежегодные продления, смена статуса, отмена визы и координация re-entry permit.' },
                { name: 'Переоценка недвижимости для Golden Visa', desc: 'Рыночная переоценка ранее купленной недвижимости для достижения порога AED 2M для Golden Visa. Использование текущей рыночной стоимости прежних инвестиций.' },
            ],
            result: 'Легальное резидентство в ОАЭ с документацией, выстроенной под банковские, налоговые и комплаенс-требования.',
        },
        'tax-residency': {
            title: 'Налоговое резидентство',
            subtitle: 'НАЛОГИ',
            intro:
                'Налоговое планирование для физических лиц и структур. Мы обеспечиваем обоснованную налоговую позицию в ОАЭ, которая выдержит проверку со стороны любого налогового органа, и согласовываем её с требованиями домашней юрисдикции клиента.',
            services: [
                { name: 'Сертификат налогового резидента (TRC)', desc: 'Заявка в FTA, подготовка документации и управление сроками выдачи.' },
                { name: 'Требования экономической субстанции (Substance)', desc: 'Планирование физического присутствия, коммунальные контракты, договоры аренды и доказательная база.' },
                { name: 'Планирование по СОИДН (соглашения об избежании двойного налогообложения)', desc: 'Анализ применимых соглашений между ОАЭ и страной клиента. Структурирование для оптимизации выгод.' },
                { name: 'Консультация по exit tax', desc: 'Предрелокационное планирование для юрисдикций с налогом на выезд (Германия, Норвегия, Франция и др.).' },
                { name: 'CRS/FATCA комплаенс', desc: 'Подготовка к автоматическому обмену информацией, самосертификация и управление отчётностью.' },
            ],
            redFlags: [
                'Клиент ожидает TRC без реального присутствия в ОАЭ',
                'Нет намерения создать реальную субстанцию',
                'Конфликтующие заявки на налоговое резидентство в нескольких юрисдикциях',
            ],
            result: 'Защитимая позиция налогового резидента ОАЭ с надлежащей субстанцией, документацией и использованием СОИДН.',
        },
        'accounting': {
            title: 'Бухгалтерия и комплаенс',
            subtitle: 'ОПЕРАЦИИ',
            intro:
                'Финансовые операции, которые поддерживают — а не подрывают — ваши банковские отношения. Каждая цифра, отчёт и декларация выстроены под ожидания банков и регуляторов.',
            services: [
                { name: 'Бухгалтерский учёт', desc: 'Ежемесячная фиксация операций, банковская сверка и подготовка финансовой отчётности по МСФО.' },
                { name: 'Декларация НДС', desc: 'Подготовка квартальных деклараций, возврат входящего НДС и работа с порталом FTA.' },
                { name: 'Корпоративный налог', desc: 'Годовая декларация, документация по трансфертному ценообразованию и расчёт налога для компаний ОАЭ.' },
                { name: 'Подготовка к аудиту', desc: 'Финансовая отчётность, готовая к аудиту, вспомогательные таблицы и координация с аудитором.' },
                { name: 'Расчёт зарплат и WPS', desc: 'Расчёт заработной платы, WPS-комплаенс, выходное пособие и ведение кадрового учёта.' },
                { name: 'Отчётность ESR', desc: 'Ежегодные уведомления и отчёты по экономической субстанции согласно требованиям ОАЭ.' },
            ],
            result: 'Чистый учёт, поданные декларации и аудит-ready отчётность, укрепляющая позицию банковского комплаенса.',
        },
        'real-estate': {
            title: 'Недвижимость',
            subtitle: 'ИНВЕСТИЦИИ',
            intro:
                'Недвижимость как стратегический инструмент — для визовой квалификации, размещения капитала или генерации дохода. Каждое решение о покупке оценивается в контексте общего кейса.',
            services: [
                { name: 'Жилая недвижимость', desc: 'Выбор основного жилья или инвестиционного объекта, due diligence и сопровождение покупки в freehold-зонах.' },
                { name: 'Коммерческая недвижимость', desc: 'Офисы, ритейл и склады для операционных или инвестиционных целей.' },
                { name: 'Объекты под Golden Visa', desc: 'Недвижимость от AED 2M+ для квалификации на 10-летнюю Golden Visa. Структурирование титула.' },
                { name: 'Сопровождение сделки', desc: 'NOC, перевод в DLD, регистрация ипотеки и управление эскроу-счётом до закрытия.' },
                { name: 'Off-plan инвестиции', desc: 'Due diligence застройщика, проверка SPA, структурирование графика платежей и верификация эскроу.' },
                { name: 'Управление недвижимостью', desc: 'Подбор арендаторов, сбор арендной платы, координация обслуживания и RERA-комплаенс.' },
            ],
            redFlags: [
                'Ожидание анонимной покупки',
                'Нет подтверждения источника средств для недвижимости',
                'Несоответствие бюджета и заявленной цели Golden Visa',
            ],
            result: 'Недвижимость, интегрированная в общую стратегию: собственность, виза, налоги и банкинг — всё выстроено.',
        },
        'wealth': {
            title: 'Активы и защита',
            subtitle: 'НАСЛЕДИЕ',
            intro:
                'Наследственное планирование, защита активов и структурирование состояния — для сохранения того, что построено, через юрисдикции и поколения.',
            services: [
                { name: 'Завещания DIFC', desc: 'Зарегистрированные завещания для активов в ОАЭ по общему праву. Защита от дефолтного распределения по шариату для немусульман.' },
                { name: 'Фонд DIFC', desc: 'Хранение активов, наследственное планирование и структурирование конфиденциальности через зарегистрированные фонды DIFC.' },
                { name: 'Family Office', desc: 'Создание single или multi-family office в DIFC или ADGM. Governance, инвестиционный мандат и регуляторный комплаенс.' },
                { name: 'Движение капитала', desc: 'Легальное, контролируемое и предсказуемое перемещение капитала между юрисдикциями с полным аудиторским следом.' },
                { name: 'Кастоди-решения', desc: 'Доступ к регулируемым кастодианам для финансовых инструментов, драгметаллов и цифровых активов.' },
                { name: 'Страховое структурирование', desc: 'Страховые обёртки для наследственного планирования, налоговой оптимизации и передачи состояния.' },
            ],
            redFlags: [
                'Намерение сокрытия без легальной структуры',
                'Санкционное бенефициарное владение',
                'Нет документации о происхождении активов',
            ],
            result: 'Активы интегрированы в общую стратегию: собственность, налоги, резидентство и наследование — выстроены через поколения.',
        },
    },
}

const ProductPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>()
    const { lang, t } = useLanguage()
    const data = slug ? productData[lang]?.[slug] || productData['en']?.[slug] : null

    if (!data) {
        return (
            <div className="container" style={{ paddingTop: '80px' }}>
                <Link to="/" className="label" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                    {t('product.back')}
                </Link>
                <h1>{t('product.notFound')}</h1>
                <p className="text-body">{t('product.notFoundText')}</p>
            </div>
        )
    }

    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {t('product.back')}
                    </Link>
                </div>
                <span className="label">{data.subtitle}</span>
                <h1 style={{ fontSize: '48px' }}>{data.title}</h1>
                <p className="subtitle" style={{ marginBottom: 0 }}>{data.intro}</p>
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('product.services')}</h2>
                    <span className="label">{t('product.scope')}</span>
                </div>
                <div className="grid-2">
                    {data.services.map((svc) => (
                        <Card key={svc.name} style={{ minHeight: '160px' }}>
                            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>{svc.name}</h3>
                            <p className="text-body" style={{ fontSize: '13px' }}>{svc.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {data.redFlags && (
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                        <h2>{t('product.redFlags')}</h2>
                        <span className="label">{t('product.attention')}</span>
                    </div>
                    <div className="grid-2">
                        {data.redFlags.map((flag, i) => (
                            <div key={i} className="list-item" style={{ borderTop: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ background: '#cd3e30', color: '#fff', fontSize: '12px', padding: '2px 8px', borderRadius: '4px', height: '20px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>!</div>
                                    <p className="text-body" style={{ width: '100%', color: 'var(--text-primary)' }}>{flag}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('product.result')}</h2>
                    <span className="label">{t('product.outcome')}</span>
                </div>
                <Card style={{ borderColor: 'var(--border-focus)', background: 'transparent' }}>
                    <p className="text-body" style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{data.result}</p>
                </Card>
            </section>

            <section style={{ textAlign: 'center', maxWidth: '600px', margin: '80px auto 0 auto' }}>
                <h2 style={{ fontSize: '32px' }}>{t('cta.title')}</h2>
                <p className="text-body" style={{ marginBottom: '32px' }}>
                    {t('cta.text')}
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <Button href="/partner-kit" onClick={() => trackCtaClick('partner_kit', `product_${slug}`)}>{t('cta.kit')}</Button>
                    <Button href="/submit-case" variant="outline" onClick={() => trackCtaClick('submit_case', `product_${slug}`)}>{t('cta.case')}</Button>
                </div>
            </section>
        </div>
    )
}

export default ProductPage
