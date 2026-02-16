import React, { createContext, useContext, useState, useEffect } from 'react'
import { trackLanguageSwitch } from './analytics'

type Language = 'en' | 'ru'

interface LanguageContextType {
    lang: Language
    setLang: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) throw new Error('useLanguage must be used within LanguageProvider')
    return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLangState] = useState<Language>(() => {
        const saved = localStorage.getItem('wtp-lang')
        return (saved === 'ru' || saved === 'en') ? saved : 'en'
    })

    const setLang = (newLang: Language) => {
        setLangState(newLang)
        localStorage.setItem('wtp-lang', newLang)
        trackLanguageSwitch(newLang)
    }

    useEffect(() => {
        document.documentElement.lang = lang
    }, [lang])

    const t = (key: string): string => {
        const translation = translations[lang]?.[key]
        if (!translation) {
            // Fallback to English, then to key itself
            return translations['en']?.[key] || key
        }
        return translation
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

// ---- Translations ----

const translations: Record<string, Record<string, string>> = {
    en: {
        // Navbar
        'nav.process': 'Process',
        'nav.partners': 'Partners',
        'nav.risk': 'Risk',
        'nav.contact': 'Contact',

        // Hero
        'hero.label': 'For Brokers & Advisors',
        'hero.title': 'A reliable UAE execution partner built for bankability and compliance.',
        'hero.subtitle': 'WTP is an on-the-ground operator taking clients from intent to outcome safely, without reputational risk.',
        'hero.cta.kit': 'Get the Partner Kit',
        'hero.cta.case': 'Submit a Case',

        // Who it's for
        'who.label': 'Who it\'s for',
        'who.title': 'Partners who need on-site quality control.',
        'who.text': 'You have clients, but lack strong local execution. Designed for brokers, private bankers, advisors, family offices, lawyers, and agencies outside the UAE.',

        // Partner Benefits
        'benefits.label': 'Partner Benefits',
        'benefits.ownership.title': 'Ownership Protection',
        'benefits.ownership.text': 'We never bypass the partner, and we don\'t sell directly around you. Your client relationships remain yours.',
        'benefits.transparency.title': 'Transparency',
        'benefits.transparency.text': 'Clear status updates, scope and change control, and defined checkpoints throughout the process.',
        'benefits.control.title': 'Control',
        'benefits.control.text': 'Decisions are made upfront: whether we can proceed, and under exactly what conditions.',
        'benefits.quality.title': 'Quality',
        'benefits.quality.text': 'Optimized for banks and regulators, not "speed at any cost." We prioritize long-term stability.',

        // Process
        'process.label': 'Delivery Process',
        'process.title': 'How we work',
        'process.terms': 'See full terms →',
        'process.step1.title': 'Pre-screen',
        'process.step1.desc': 'Documents, KYC/AML, Source of Funds, and risk map before any action.',
        'process.step2.title': 'Banking Scenario',
        'process.step2.desc': 'Bank routing and requirements selection. No "guaranteed account" promises.',
        'process.step3.title': 'Delivery',
        'process.step3.desc': 'Company setup, accounts, visas, and operations support within agreed scenario.',
        'process.step4.title': 'Ongoing',
        'process.step4.desc': 'Retainer support to ensure stability and maximize LTV.',

        // Engagement
        'engagement.label': 'Engagement Models',
        'engagement.referral.title': 'Referral',
        'engagement.referral.text': 'The client knows WTP. The partner is paid a commission under agreed rules.',
        'engagement.whitelabel.title': 'White-label',
        'engagement.whitelabel.text': 'The client may not know WTP. We work as a subcontractor; all communication goes through the partner.',
        'engagement.protection.title': 'Partner Protection Policy',
        'engagement.protection.crm': 'Client assigned to partner in CRM registry',
        'engagement.protection.contact': 'Direct contact only in agreed format',
        'engagement.protection.terms': 'Terms don\'t change without approval',
        'engagement.protection.commission': 'Commissions agreed upfront',

        // Risk
        'risk.label': 'Risk Policy',
        'risk.green.status': 'We Accept',
        'risk.green.desc': 'Transparent business rationale, document readiness, no critical red flags, realistic expectations.',
        'risk.yellow.status': 'Accept w/ Conditions',
        'risk.yellow.desc': 'Higher risk, complex structure, non-standard operations. Requires enhanced control, fixed scope, separate pricing, written risk acknowledgment.',
        'risk.red.status': 'We Decline',
        'risk.red.desc': 'Sanctions/toxic exposure, missing documents, "do it with no questions asked" requests, pressure to break rules.',

        // Products
        'products.label': 'Product Line',
        'products.subtitle': 'End-to-end services designed for the discerning partner and their clients.',
        'products.banking.pill': 'Core Service',
        'products.banking.title': 'Corporate Banking',
        'products.banking.desc': 'Corporate account opening, payment infrastructure, and ongoing compliance support. We navigate the bank\'s requirements so you don\'t have to.',
        'products.banking.cta': 'View Details',
        'products.premium.pill': 'Personal',
        'products.premium.title': 'Premium Banking',
        'products.premium.desc': 'Personal accounts, private banking introductions, and investment access for HNW individuals relocating to the UAE.',
        'products.premium.cta': 'View Details',
        'products.business.pill': 'Operations',
        'products.business.title': 'Company Formation',
        'products.business.desc': 'Free zone and mainland registration, trade licensing, and corporate structuring — all designed around banking acceptance.',
        'products.business.cta': 'View Details',
        'products.residency.pill': 'Identity',
        'products.residency.title': 'Visa & Residency',
        'products.residency.desc': 'Employment visas, investor visas, Golden Visa, Emirates ID — integrated with tax logic and banking requirements.',
        'products.residency.cta': 'View Details',
        'products.tax.pill': 'Tax',
        'products.tax.title': 'Tax Residency',
        'products.tax.desc': 'Tax residency certificates, substance requirements, and double tax treaty planning for individuals and holding structures.',
        'products.tax.cta': 'View Details',
        'products.accounting.pill': 'Operations',
        'products.accounting.title': 'Accounting',
        'products.accounting.desc': 'Bookkeeping, VAT filing, corporate tax, audit preparation, and payroll — aligned with banking compliance from day one.',
        'products.accounting.cta': 'View Details',
        'products.realestate.pill': 'Investment',
        'products.realestate.title': 'Real Estate',
        'products.realestate.desc': 'Residential and commercial acquisition, Golden Visa qualifying properties, conveyancing, and title deed management.',
        'products.realestate.cta': 'View Details',
        'products.wealth.pill': 'Legacy',
        'products.wealth.title': 'Wealth & Protection',
        'products.wealth.desc': 'Wills, foundations, family office structuring, and private custody solutions for long-term asset protection.',
        'products.wealth.cta': 'View Details',

        // CTA
        'cta.title': 'Start with a Pilot',
        'cta.text': 'Get a pre-screen verdict, a commercial offer with clear boundaries, and a delivery plan with control points.',
        'cta.kit': 'Request Partner Kit',
        'cta.case': 'Submit a Case',

        // Partner Kit
        'partnerKit.back': 'Back to Overview',
        'partnerKit.title': 'Partner Kit',
        'partnerKit.label': 'PARTNER DOCUMENTATION',
        'partnerKit.subtitle': 'Everything you need to understand how we work, evaluate fit, and present WTP to your clients.',
        'partnerKit.featured': 'Overview',
        'partnerKit.onepager.title': 'WTP One Pager',
        'partnerKit.onepager.desc': 'A concise overview of our partnership model, risk framework, and product lines. Ideal for sharing with involved stakeholders.',
        'partnerKit.download.btn': 'Download PDF',
        'partnerKit.docs': 'Documentation',
        'partnerKit.docsSubtitle': 'Detailed documents for you and your clients.',
        'partnerKit.process.title': 'Process Map',
        'partnerKit.process.desc': '10-stage banking-first delivery workflow. Understand what happens after you refer a client.',
        'partnerKit.risk.title': 'Risk Policy',
        'partnerKit.risk.desc': '3-tier client classification (Green / Yellow / Red). Know who to refer and who to skip.',
        'partnerKit.packages.title': 'Service Packages',
        'partnerKit.packages.desc': 'L0 to L3 — scope, pricing ranges, and what\'s included. Share with clients to set expectations.',
        'partnerKit.intake.title': 'Intake Checklist',
        'partnerKit.intake.desc': 'KYC Light — documents your client needs to prepare before submission.',
        'partnerKit.cta.title': 'Ready to start?',
        'partnerKit.cta.text': 'Submit your first case — we\'ll do a free pre-screen within 5-7 business days.',
        'partnerKit.cta.btn': 'Submit a Case',
        'partnerKit.backHome': 'Back to Home',

        // Submit Case
        'submitCase.label': 'Partner Portal',
        'submitCase.title': 'Submit a Case',
        'submitCase.subtitle': 'Start the pre-screen process. Please provide the following details about your client.',
        'submitCase.contact': 'Contact Information',
        'submitCase.name': 'Your Name',
        'submitCase.email': 'Email',
        'submitCase.telegram': 'Telegram',
        'submitCase.client': 'Client Details',
        'submitCase.nationality': 'Client Nationality',
        'submitCase.residency': 'Current Residency',
        'submitCase.activity': 'Business Activity',
        'submitCase.activityPlaceholder': 'Describe the client\'s business activity in detail...',
        'submitCase.banking': 'Banking & Compliance',
        'submitCase.jurisdiction': 'Preferred Banking Jurisdiction',
        'submitCase.funds': 'Source of Funds',
        'submitCase.fundsPlaceholder': 'Describe the origin of funds in detail...',
        'submitCase.success': 'Your case has been submitted successfully! We\'ll review it and get back to you within 24 hours.',
        'submitCase.error': 'Something went wrong. Please try again or contact us directly.',
        'submitCase.submitting': 'Submitting...',
        'submitCase.submit': 'Submit Case',
        'submitCase.backHome': 'Back to Home',

        // Footer
        'footer.tagline': 'UAE Execution Partner.',
        'footer.contact': 'Contact',
        'footer.legal': 'Legal',
        'footer.terms': 'Terms of Service',
        'footer.privacy': 'Privacy Policy',
        'footer.office': 'Office',
        'footer.address': 'Dubai International Financial Centre\nDubai, UAE',
    },
    ru: {
        // Navbar
        'nav.process': 'Процесс',
        'nav.partners': 'Партнёрам',
        'nav.risk': 'Риски',
        'nav.contact': 'Контакт',

        // Hero
        'hero.label': 'Для брокеров и консультантов',
        'hero.title': 'Надёжный execution-партнёр в ОАЭ, построенный вокруг банков и комплаенса.',
        'hero.subtitle': 'WTP — оператор на земле, который проводит клиента от намерения до результата безопасно и без репутационных рисков.',
        'hero.cta.kit': 'Получить Partner Kit',
        'hero.cta.case': 'Отправить кейс',

        // Who it's for
        'who.label': 'Для кого',
        'who.title': 'Партнёры, которым нужен контроль качества на месте.',
        'who.text': 'У вас есть клиенты, но нет сильного локального исполнителя. Для брокеров, частных банкиров, консультантов, семейных офисов, юристов и агентств за пределами ОАЭ.',

        // Partner Benefits
        'benefits.label': 'Преимущества для партнёра',
        'benefits.ownership.title': 'Защита клиента',
        'benefits.ownership.text': 'Мы никогда не обходим партнёра и не продаём напрямую мимо вас. Ваши клиентские отношения остаются вашими.',
        'benefits.transparency.title': 'Прозрачность',
        'benefits.transparency.text': 'Чёткие статусы, контроль объёма и изменений, определённые контрольные точки на каждом этапе.',
        'benefits.control.title': 'Контроль',
        'benefits.control.text': 'Решения принимаются заранее: можем ли мы двигаться дальше и на каких именно условиях.',
        'benefits.quality.title': 'Качество',
        'benefits.quality.text': 'Оптимизировано для банков и регуляторов, а не для «скорости любой ценой». Мы ставим на долгосрочную устойчивость.',

        // Process
        'process.label': 'Процесс работы',
        'process.title': 'Как мы работаем',
        'process.terms': 'Полные условия →',
        'process.step1.title': 'Pre-screen',
        'process.step1.desc': 'Документы, KYC/AML, источник средств и карта рисков до начала любых действий.',
        'process.step2.title': 'Банковский сценарий',
        'process.step2.desc': 'Выбор банков и требований. Без обещаний «гарантированного счёта».',
        'process.step3.title': 'Исполнение',
        'process.step3.desc': 'Регистрация, счета, визы и операционная поддержка в рамках согласованного сценария.',
        'process.step4.title': 'Сопровождение',
        'process.step4.desc': 'Ретейнер для обеспечения стабильности и максимизации LTV.',

        // Engagement
        'engagement.label': 'Модели сотрудничества',
        'engagement.referral.title': 'Referral',
        'engagement.referral.text': 'Клиент знает о WTP. Партнёр получает комиссию по согласованным правилам.',
        'engagement.whitelabel.title': 'White-label',
        'engagement.whitelabel.text': 'Клиент может не знать о WTP. Мы работаем как субподрядчик; коммуникация идёт через партнёра.',
        'engagement.protection.title': 'Политика защиты партнёра',
        'engagement.protection.crm': 'Клиент закреплён за партнёром в CRM',
        'engagement.protection.contact': 'Прямой контакт только в согласованном формате',
        'engagement.protection.terms': 'Условия не меняются без согласования',
        'engagement.protection.commission': 'Комиссии согласованы заранее',

        // Risk
        'risk.label': 'Риск-политика',
        'risk.green.status': 'Берём в работу',
        'risk.green.desc': 'Прозрачная бизнес-логика, готовность документов, отсутствие критичных red flags, реалистичные ожидания.',
        'risk.yellow.status': 'Берём с условиями',
        'risk.yellow.desc': 'Повышенный риск, сложная структура, нестандартные операции. Усиленный контроль, фиксированный объём, отдельное ценообразование.',
        'risk.red.status': 'Отказываем',
        'risk.red.desc': 'Санкции, токсичная экспозиция, отсутствие документов, запросы «сделайте без вопросов», давление с нарушением правил.',

        // Products
        'products.label': 'Продуктовая линейка',
        'products.subtitle': 'Специализированные услуги для требовательных партнёров и их клиентов.',
        'products.banking.pill': 'Ключевая услуга',
        'products.banking.title': 'Корпоративный банкинг',
        'products.banking.desc': 'Открытие корпоративных счетов, платёжная инфраструктура и сопровождение комплаенса. Мы ведём переговоры с банком за вас.',
        'products.banking.cta': 'Подробнее',
        'products.premium.pill': 'Персональный',
        'products.premium.title': 'Премиум-банкинг',
        'products.premium.desc': 'Персональные счета, private banking, инвестиционный доступ для HNW-клиентов, переезжающих в ОАЭ.',
        'products.premium.cta': 'Подробнее',
        'products.business.pill': 'Операции',
        'products.business.title': 'Регистрация компаний',
        'products.business.desc': 'Свободные зоны и mainland, торговые лицензии, корпоративное структурирование — всё под банковский acceptance.',
        'products.business.cta': 'Подробнее',
        'products.residency.pill': 'Идентичность',
        'products.residency.title': 'Визы и резидентство',
        'products.residency.desc': 'Рабочие визы, визы инвестора, Golden Visa, Emirates ID — интегрировано с налоговой логикой и банковскими требованиями.',
        'products.residency.cta': 'Подробнее',
        'products.tax.pill': 'Налоги',
        'products.tax.title': 'Налоговое резидентство',
        'products.tax.desc': 'Сертификаты налогового резидентства, substance requirements и планирование по соглашениям об избежании двойного налогообложения.',
        'products.tax.cta': 'Подробнее',
        'products.accounting.pill': 'Операции',
        'products.accounting.title': 'Бухгалтерия',
        'products.accounting.desc': 'Бухучёт, НДС, корпоративный налог, подготовка к аудиту и расчёт зарплат — в связке с банковским комплаенсом.',
        'products.accounting.cta': 'Подробнее',
        'products.realestate.pill': 'Инвестиции',
        'products.realestate.title': 'Недвижимость',
        'products.realestate.desc': 'Жилая и коммерческая недвижимость, объекты под Golden Visa, сопровождение сделок и управление правами собственности.',
        'products.realestate.cta': 'Подробнее',
        'products.wealth.pill': 'Наследие',
        'products.wealth.title': 'Активы и защита',
        'products.wealth.desc': 'Завещания, фонды, структурирование family office и кастоди-решения для долгосрочной защиты активов.',
        'products.wealth.cta': 'Подробнее',

        // CTA
        'cta.title': 'Начните с пилотного кейса',
        'cta.text': 'Получите вердикт pre-screen, коммерческое предложение с чёткими границами и план работы с контрольными точками.',
        'cta.kit': 'Запросить Partner Kit',
        'cta.case': 'Отправить кейс',

        // Partner Kit
        'partnerKit.back': 'Назад к обзору',
        'partnerKit.title': 'Partner Kit',
        'partnerKit.label': 'ПАРТНЁРСКАЯ ДОКУМЕНТАЦИЯ',
        'partnerKit.subtitle': 'Всё, что нужно, чтобы понять, как мы работаем, оценить совместимость и представить WTP вашим клиентам.',
        'partnerKit.featured': 'Обзор',
        'partnerKit.onepager.title': 'WTP One Pager',
        'partnerKit.onepager.desc': 'Краткий обзор нашей партнёрской модели, риск-фреймворка и продуктовой линейки. Идеально для передачи заинтересованным сторонам.',
        'partnerKit.download.btn': 'Скачать PDF',
        'partnerKit.docs': 'Документация',
        'partnerKit.docsSubtitle': 'Подробные документы для вас и ваших клиентов.',
        'partnerKit.process.title': 'Карта процесса',
        'partnerKit.process.desc': '10-этапный banking-first workflow. Что происходит после того, как вы направили клиента.',
        'partnerKit.risk.title': 'Риск-политика',
        'partnerKit.risk.desc': '3-уровневая классификация клиентов (Green / Yellow / Red). Кого направлять, а кого — нет.',
        'partnerKit.packages.title': 'Пакеты услуг',
        'partnerKit.packages.desc': 'L0–L3 — объём, ценовые диапазоны и что входит. Для передачи клиентам.',
        'partnerKit.intake.title': 'Чеклист приёма',
        'partnerKit.intake.desc': 'KYC Light — какие документы клиент должен подготовить до подачи кейса.',
        'partnerKit.cta.title': 'Готовы начать?',
        'partnerKit.cta.text': 'Отправьте первый кейс — мы проведём бесплатный pre-screen за 5-7 рабочих дней.',
        'partnerKit.cta.btn': 'Отправить кейс',
        'partnerKit.backHome': 'На главную',

        // Submit Case
        'submitCase.label': 'Партнёрский портал',
        'submitCase.title': 'Отправить кейс',
        'submitCase.subtitle': 'Начните процесс pre-screen. Пожалуйста, предоставьте следующую информацию о вашем клиенте.',
        'submitCase.contact': 'Контактная информация',
        'submitCase.name': 'Ваше имя',
        'submitCase.email': 'Email',
        'submitCase.telegram': 'Telegram',
        'submitCase.client': 'Данные клиента',
        'submitCase.nationality': 'Гражданство клиента',
        'submitCase.residency': 'Текущая резиденция',
        'submitCase.activity': 'Деятельность',
        'submitCase.activityPlaceholder': 'Опишите бизнес-деятельность клиента подробно...',
        'submitCase.banking': 'Банкинг и комплаенс',
        'submitCase.jurisdiction': 'Предпочтительная банковская юрисдикция',
        'submitCase.funds': 'Источник средств',
        'submitCase.fundsPlaceholder': 'Опишите происхождение средств подробно...',
        'submitCase.success': 'Ваш кейс успешно отправлен! Мы рассмотрим его и свяжемся с вами в течение 24 часов.',
        'submitCase.error': 'Что-то пошло не так. Попробуйте ещё раз или свяжитесь с нами напрямую.',
        'submitCase.submitting': 'Отправка...',
        'submitCase.submit': 'Отправить кейс',
        'submitCase.backHome': 'На главную',

        // Footer
        'footer.tagline': 'Execution-партнёр в ОАЭ.',
        'footer.contact': 'Контакты',
        'footer.legal': 'Юридическое',
        'footer.terms': 'Условия использования',
        'footer.privacy': 'Политика конфиденциальности',
        'footer.office': 'Офис',
        'footer.address': 'Dubai International Financial Centre\nDubай, ОАЭ',
    }
}
