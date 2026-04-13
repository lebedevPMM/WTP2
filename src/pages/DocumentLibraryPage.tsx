import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../lib/LanguageContext'
import { trackPdfDownload } from '../lib/analytics'

// Document catalog — single source of truth.
// Each entry maps to a real file in /public/docs/products/ or /public/docs/.
// Filtered by language + audience. Grouped by category in the UI.
type Audience = 'b2c' | 'partner' | 'all'
type DocCategory = 'onepager' | 'presentation' | 'process' | 'partner' | 'lead-magnet'

interface DocEntry {
    id: string
    category: DocCategory
    product: string // human-readable product/topic
    audience: Audience
    pdfEN: string
    pdfRU: string
}

// 8 products × b2c/partner one-pagers (16) + presentations (32) + extras
const PRODUCTS: { slug: string; nameEN: string; nameRU: string }[] = [
    { slug: 'open-bank-account', nameEN: 'Open Bank Account', nameRU: 'Открытие банковского счёта' },
    { slug: 'open-company', nameEN: 'Open Company', nameRU: 'Регистрация компании' },
    { slug: 'golden-visa', nameEN: 'Golden Visa', nameRU: 'Golden Visa' },
    { slug: 'last-will', nameEN: 'Last Will', nameRU: 'Завещание' },
    { slug: 'foundation', nameEN: 'Foundation', nameRU: 'Фонд (Foundation)' },
    { slug: 'escrow', nameEN: 'Escrow', nameRU: 'Эскроу' },
    { slug: 'factoring', nameEN: 'Factoring', nameRU: 'Факторинг' },
    { slug: 'xray', nameEN: 'X-Ray Audit', nameRU: 'X-Ray аудит' },
]

const buildCatalog = (): DocEntry[] => {
    const docs: DocEntry[] = []

    // Product one-pagers (B2C facing — single version per product)
    for (const p of PRODUCTS) {
        docs.push({
            id: `onepager-${p.slug}`,
            category: 'onepager',
            product: p.slug,
            audience: 'b2c',
            pdfEN: `docs/products/onepagers/WTP_${p.slug}_EN.pdf`,
            pdfRU: `docs/products/onepagers/WTP_${p.slug}_RU.pdf`,
        })
    }

    // Product presentations B2C
    for (const p of PRODUCTS) {
        docs.push({
            id: `presentation-${p.slug}-b2c`,
            category: 'presentation',
            product: p.slug,
            audience: 'b2c',
            pdfEN: `docs/products/presentations/WTP_${p.slug}_b2c_EN.pdf`,
            pdfRU: `docs/products/presentations/WTP_${p.slug}_b2c_RU.pdf`,
        })
    }

    // Product presentations Partner
    for (const p of PRODUCTS) {
        docs.push({
            id: `presentation-${p.slug}-partner`,
            category: 'presentation',
            product: p.slug,
            audience: 'partner',
            pdfEN: `docs/products/presentations/WTP_${p.slug}_partner_EN.pdf`,
            pdfRU: `docs/products/presentations/WTP_${p.slug}_partner_RU.pdf`,
        })
    }

    // Pre-screen presentation (B2C + Partner)
    docs.push({
        id: 'presentation-pre-screen-b2c',
        category: 'presentation',
        product: 'pre-screen',
        audience: 'b2c',
        pdfEN: 'docs/products/presentations/WTP_pre-screen_b2c_EN.pdf',
        pdfRU: 'docs/products/presentations/WTP_pre-screen_b2c_RU.pdf',
    })
    docs.push({
        id: 'presentation-pre-screen-partner',
        category: 'presentation',
        product: 'pre-screen',
        audience: 'partner',
        pdfEN: 'docs/products/presentations/WTP_pre-screen_partner_EN.pdf',
        pdfRU: 'docs/products/presentations/WTP_pre-screen_partner_RU.pdf',
    })

    // Pricing
    docs.push({
        id: 'presentation-pricing',
        category: 'presentation',
        product: 'pricing',
        audience: 'all',
        pdfEN: 'docs/products/presentations/WTP_pricing_EN.pdf',
        pdfRU: 'docs/products/presentations/WTP_pricing_RU.pdf',
    })

    // RE Partnership presentation
    docs.push({
        id: 'presentation-re-partnership',
        category: 'presentation',
        product: 're-partnership',
        audience: 'partner',
        pdfEN: 'docs/products/presentations/WTP_re-partnership_EN.pdf',
        pdfRU: 'docs/products/presentations/WTP_re-partnership_RU.pdf',
    })

    // Process docs (existing in /docs/process/ + /docs/ru/process/)
    const processDocs = [
        { slug: '01-process-map', nameEN: 'Process Map', nameRU: 'Карта процесса' },
        { slug: '02-intake-checklist', nameEN: 'Intake Checklist', nameRU: 'Чек-лист приёма' },
        { slug: '03-packages', nameEN: 'Service Packages', nameRU: 'Пакеты услуг' },
        { slug: '04-commercial-proposal', nameEN: 'Commercial Proposal', nameRU: 'Коммерческое предложение' },
        { slug: '05-retainer', nameEN: 'Retainer Agreement', nameRU: 'Ретейнер' },
        { slug: '06-risk-policy', nameEN: 'Risk Policy', nameRU: 'Политика рисков' },
    ]
    for (const d of processDocs) {
        docs.push({
            id: `process-${d.slug}`,
            category: 'process',
            product: d.slug,
            audience: 'partner',
            pdfEN: `docs/process/${d.slug}.pdf`,
            pdfRU: `docs/ru/process/${d.slug}.pdf`,
        })
    }

    // Partner docs (existing in /docs/partner/ + /docs/ru/partner/)
    const partnerDocs = [
        { slug: '01-one-pager', nameEN: 'Partner One-Pager', nameRU: 'Партнёрский one-pager' },
        { slug: '06-how-we-work', nameEN: 'How We Work', nameRU: 'Как мы работаем' },
        { slug: '07-what-we-need-upfront', nameEN: 'What We Need Upfront', nameRU: 'Что нужно от клиента' },
        { slug: '02-email-first-touch', nameEN: 'Email — First Touch', nameRU: 'Email — первое касание' },
        { slug: '03-email-follow-up', nameEN: 'Email — Follow-Up', nameRU: 'Email — фоллоу-ап' },
        { slug: '04-email-pilot-request', nameEN: 'Email — Pilot Request', nameRU: 'Email — заявка на пилот' },
        { slug: '05-weekly-report', nameEN: 'Weekly Report Template', nameRU: 'Шаблон еженедельного отчёта' },
    ]
    for (const d of partnerDocs) {
        docs.push({
            id: `partner-${d.slug}`,
            category: 'partner',
            product: d.slug,
            audience: 'partner',
            pdfEN: `docs/partner/${d.slug}.pdf`,
            pdfRU: `docs/ru/partner/${d.slug}.pdf`,
        })
    }

    // Lead magnets
    docs.push({
        id: 'lead-magnet-banking-readiness',
        category: 'lead-magnet',
        product: 'banking-readiness',
        audience: 'b2c',
        pdfEN: 'docs/products/lead-magnets/Banking_Readiness_Checklist_EN.pdf',
        pdfRU: 'docs/products/lead-magnets/Banking_Readiness_Checklist_RU.pdf',
    })

    return docs
}

// Display labels (minimal i18n — most labels live inline)
const labels = {
    en: {
        title: 'Document Library',
        subtitle: 'All publicly available WTP documents — one-pagers, presentations, process docs, lead magnets. Filter by audience.',
        back: '← Back to Home',
        filterAudience: 'Audience',
        filterAll: 'All',
        filterB2C: 'B2C',
        filterPartner: 'Partner',
        download: 'Download',
        sectionOnepagers: 'Product One-Pagers',
        sectionPresentations: 'Product Presentations',
        sectionProcess: 'Process & Operations',
        sectionPartner: 'Partner Documents',
        sectionLeadMagnets: 'Lead Magnets',
        productOpenBank: 'Open Bank Account',
        productOpenCompany: 'Open Company',
        productGoldenVisa: 'Golden Visa',
        productLastWill: 'Last Will',
        productFoundation: 'Foundation',
        productEscrow: 'Escrow',
        productFactoring: 'Factoring',
        productXray: 'X-Ray Audit',
        productPreScreen: 'Pre-Screen',
        productPricing: 'Pricing',
        productRePartnership: 'RE Partnership',
        audB2C: 'For Clients',
        audPartner: 'For Partners',
        audAll: 'All audiences',
        contactCta: 'Need something specific? Contact us →',
    },
    ru: {
        title: 'Каталог документов',
        subtitle: 'Все публичные документы WTP — one-pager\u2019ы, презентации, процессы, лид-магниты. Фильтр по аудитории.',
        back: '← На главную',
        filterAudience: 'Аудитория',
        filterAll: 'Все',
        filterB2C: 'Клиент',
        filterPartner: 'Партнёр',
        download: 'Скачать',
        sectionOnepagers: 'One-pager\u2019ы по продуктам',
        sectionPresentations: 'Презентации по продуктам',
        sectionProcess: 'Процессы и операции',
        sectionPartner: 'Партнёрские документы',
        sectionLeadMagnets: 'Лид-магниты',
        productOpenBank: 'Открытие банковского счёта',
        productOpenCompany: 'Регистрация компании',
        productGoldenVisa: 'Golden Visa',
        productLastWill: 'Завещание',
        productFoundation: 'Фонд (Foundation)',
        productEscrow: 'Эскроу',
        productFactoring: 'Факторинг',
        productXray: 'X-Ray аудит',
        productPreScreen: 'Pre-Screen аудит',
        productPricing: 'Цены и условия',
        productRePartnership: 'Партнёрство в недвижимости',
        audB2C: 'Для клиентов',
        audPartner: 'Для партнёров',
        audAll: 'Все аудитории',
        contactCta: 'Нужен другой документ? Свяжитесь с нами →',
    },
} as const

const productLabel = (slug: string, lang: 'en' | 'ru'): string => {
    const map: Record<string, keyof typeof labels.en> = {
        'open-bank-account': 'productOpenBank',
        'open-company': 'productOpenCompany',
        'golden-visa': 'productGoldenVisa',
        'last-will': 'productLastWill',
        'foundation': 'productFoundation',
        'escrow': 'productEscrow',
        'factoring': 'productFactoring',
        'xray': 'productXray',
        'pre-screen': 'productPreScreen',
        'pricing': 'productPricing',
        're-partnership': 'productRePartnership',
    }
    const key = map[slug]
    if (key) return labels[lang][key]
    // For process/partner slugs, return a humanized version
    return slug.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

const audienceLabel = (a: Audience, lang: 'en' | 'ru'): string => {
    if (a === 'b2c') return labels[lang].audB2C
    if (a === 'partner') return labels[lang].audPartner
    return labels[lang].audAll
}

const IconPdf = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
)

const DocCard: React.FC<{
    title: string
    audienceText: string
    href: string
    onDownload: () => void
    downloadLabel: string
}> = ({ title, audienceText, href, onDownload, downloadLabel }) => (
    <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
        onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-tertiary)' }}>
            <IconPdf />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                PDF · {audienceText}
            </span>
        </div>
        <h3 style={{ fontSize: '17px', margin: 0, lineHeight: '1.3' }}>{title}</h3>
        <a href={href} target="_blank" rel="noopener noreferrer"
            onClick={onDownload}
            className="btn btn-outline"
            style={{ alignSelf: 'flex-start', padding: '8px 18px', fontSize: '12px', marginTop: '4px' }}>
            {downloadLabel}
        </a>
    </div>
)

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            {title}
        </h2>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
        }}>
            {children}
        </div>
    </section>
)

const FilterButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button onClick={onClick} style={{
        padding: '8px 18px',
        fontSize: '13px',
        borderRadius: '999px',
        border: '1px solid var(--border-subtle)',
        background: active ? 'var(--text-primary)' : 'transparent',
        color: active ? 'var(--bg-primary)' : 'var(--text-primary)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all 0.2s ease',
    }}>
        {children}
    </button>
)

const DocumentLibraryPage: React.FC = () => {
    const { lang } = useLanguage()
    const base = import.meta.env.BASE_URL
    const L = labels[lang as 'en' | 'ru']
    const [audience, setAudience] = useState<Audience>('all')

    const allDocs = useMemo(() => buildCatalog(), [])

    const filtered = useMemo(() => {
        if (audience === 'all') return allDocs
        return allDocs.filter(d => d.audience === audience || d.audience === 'all')
    }, [allDocs, audience])

    const byCategory = useMemo(() => {
        const groups: Record<DocCategory, DocEntry[]> = {
            onepager: [],
            presentation: [],
            process: [],
            partner: [],
            'lead-magnet': [],
        }
        for (const d of filtered) groups[d.category].push(d)
        return groups
    }, [filtered])

    const renderCard = (doc: DocEntry) => {
        const href = base + (lang === 'ru' ? doc.pdfRU : doc.pdfEN)
        return (
            <DocCard
                key={doc.id}
                title={productLabel(doc.product, lang as 'en' | 'ru')}
                audienceText={audienceLabel(doc.audience, lang as 'en' | 'ru')}
                href={href}
                downloadLabel={L.download}
                onDownload={() => trackPdfDownload(doc.id, lang)}
            />
        )
    }

    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '48px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>{L.back}</Link>
                </div>
                <h1>{L.title}</h1>
                <p className="subtitle" style={{ marginBottom: 0, maxWidth: '640px' }}>
                    {L.subtitle}
                </p>
            </section>

            {/* Filter bar */}
            <section style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>
                    {L.filterAudience}:
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <FilterButton active={audience === 'all'} onClick={() => setAudience('all')}>{L.filterAll}</FilterButton>
                    <FilterButton active={audience === 'b2c'} onClick={() => setAudience('b2c')}>{L.filterB2C}</FilterButton>
                    <FilterButton active={audience === 'partner'} onClick={() => setAudience('partner')}>{L.filterPartner}</FilterButton>
                </div>
            </section>

            {byCategory.onepager.length > 0 && (
                <Section title={L.sectionOnepagers}>
                    {byCategory.onepager.map(renderCard)}
                </Section>
            )}

            {byCategory.presentation.length > 0 && (
                <Section title={L.sectionPresentations}>
                    {byCategory.presentation.map(renderCard)}
                </Section>
            )}

            {byCategory.process.length > 0 && (
                <Section title={L.sectionProcess}>
                    {byCategory.process.map(renderCard)}
                </Section>
            )}

            {byCategory.partner.length > 0 && (
                <Section title={L.sectionPartner}>
                    {byCategory.partner.map(renderCard)}
                </Section>
            )}

            {byCategory['lead-magnet'].length > 0 && (
                <Section title={L.sectionLeadMagnets}>
                    {byCategory['lead-magnet'].map(renderCard)}
                </Section>
            )}

            <section style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                textAlign: 'center',
                marginTop: '40px',
            }}>
                <Link to="/contact" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontSize: '15px' }}>
                    {L.contactCta}
                </Link>
            </section>
        </div>
    )
}

export default DocumentLibraryPage
