import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../lib/LanguageContext'
import { trackPdfDownload } from '../lib/analytics'

const DocCard: React.FC<{
    title: string
    desc: React.ReactNode
    href: string
    btnLabel: string
    icon: React.ReactNode
    onDownload?: () => void
}> = ({ title, desc, href, btnLabel, icon, onDownload }) => (
    <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    }}
        onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
        }}
    >
        <div>
            <div style={{ marginBottom: '16px', color: 'var(--text-tertiary)' }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{title}</h3>
            <p className="text-body" style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                {desc}
            </p>
        </div>
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-outline"
            onClick={onDownload}
            style={{ alignSelf: 'flex-start', padding: '10px 24px', fontSize: '13px' }}>
            {btnLabel}
        </a>
    </div>
)

const IconProcess = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
)

const IconRisk = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
)

const IconPackages = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
)

const IconChecklist = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
)

const IconHowWeWork = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
)

const IconWhatWeNeed = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
)

const IconZip = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
)

const PartnerKitPage: React.FC = () => {
    const { t, tRich, lang } = useLanguage()
    const base = import.meta.env.BASE_URL
    const suffix = lang.toUpperCase()
    const pdfUrl = `${base}WTP_One_Pager_${suffix}.pdf`
    const previewUrl = `${base}WTP_One_Pager_${suffix}_preview.png`

    const processPath = lang === 'ru' ? `${base}docs/ru/process` : `${base}docs/process`
    const partnerPath = lang === 'ru' ? `${base}docs/ru/partner` : `${base}docs/partner`
    const kitZipUrl = `${base}WTP_Partner_Kit_${suffix}.zip`

    const docs = [
        {
            key: 'howWeWork',
            icon: <IconHowWeWork />,
            href: `${partnerPath}/06-how-we-work.pdf`,
        },
        {
            key: 'whatWeNeed',
            icon: <IconWhatWeNeed />,
            href: `${partnerPath}/07-what-we-need-upfront.pdf`,
        },
        {
            key: 'process',
            icon: <IconProcess />,
            href: `${processPath}/01-process-map.pdf`,
        },
        {
            key: 'risk',
            icon: <IconRisk />,
            href: `${processPath}/06-risk-policy.pdf`,
        },
        {
            key: 'packages',
            icon: <IconPackages />,
            href: `${processPath}/03-packages.pdf`,
        },
        {
            key: 'intake',
            icon: <IconChecklist />,
            href: `${processPath}/02-intake-checklist.pdf`,
        },
    ]

    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            {/* Hero */}
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>← {t('partnerKit.back')}</Link>
                </div>
                <h1>{t('partnerKit.title')}</h1>
                <div className="label" style={{ marginBottom: '16px' }}>{t('partnerKit.label')}</div>
                <p className="subtitle" style={{ marginBottom: 0 }}>
                    {tRich('partnerKit.subtitle')}
                </p>
            </section>

            {/* Featured — One Pager */}
            <section style={{ marginBottom: '80px' }}>
                <div className="label">{t('partnerKit.featured')}</div>
                <div className="grid-2">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>{t('partnerKit.onepager.title')}</h2>
                        <p className="text-body" style={{ marginBottom: '32px', maxWidth: '440px' }}>
                            {tRich('partnerKit.onepager.desc')}
                        </p>
                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn"
                            onClick={() => trackPdfDownload('one_pager', lang)}
                            style={{ alignSelf: 'flex-start' }}>
                            {t('partnerKit.download.btn')}
                        </a>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{
                            display: 'block',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            maxWidth: '320px',
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)'
                                e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.15)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'
                            }}
                        >
                            <img src={previewUrl} alt="WTP One Pager Preview" style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Documentation Grid */}
            <section style={{ marginBottom: '80px' }}>
                <div className="label">{t('partnerKit.docs')}</div>
                <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>{t('partnerKit.docsSubtitle')}</h2>
                <div style={{ height: '32px' }} />
                <div className="grid-2">
                    {docs.map(doc => (
                        <DocCard
                            key={doc.key}
                            title={t(`partnerKit.${doc.key}.title`)}
                            desc={tRich(`partnerKit.${doc.key}.desc`)}
                            href={doc.href}
                            btnLabel={t('partnerKit.download.btn')}
                            icon={doc.icon}
                            onDownload={() => trackPdfDownload(doc.key, lang)}
                        />
                    ))}
                </div>
            </section>

            {/* Full Kit Download */}
            <section style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '40px',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap',
            }}>
                <div style={{ color: 'var(--text-tertiary)' }}>
                    <IconZip />
                </div>
                <div style={{ flex: 1, minWidth: '240px' }}>
                    <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>{t('partnerKit.kit.title')}</h3>
                    <p className="text-body" style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                        {tRich('partnerKit.kit.desc')}
                    </p>
                </div>
                <a href={kitZipUrl} target="_blank" rel="noopener noreferrer" className="btn"
                    onClick={() => trackPdfDownload('partner_kit_zip', lang)}
                    style={{ whiteSpace: 'nowrap' }}>
                    {t('partnerKit.kit.btn')}
                </a>
            </section>

            {/* CTA */}
            <section style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '48px',
                textAlign: 'center',
                marginBottom: '40px',
            }}>
                <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>{t('partnerKit.cta.title')}</h2>
                <p className="text-body" style={{ marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
                    {tRich('partnerKit.cta.text')}
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/submit-case" className="btn">{t('partnerKit.cta.btn')}</Link>
                    <Link to="/" className="btn btn-outline">{t('partnerKit.backHome')}</Link>
                </div>
            </section>
        </div>
    )
}

export default PartnerKitPage
