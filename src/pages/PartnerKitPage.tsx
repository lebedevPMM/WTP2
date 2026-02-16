import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../lib/LanguageContext'
import { trackPdfDownload } from '../lib/analytics'

const DocCard: React.FC<{
    title: string
    desc: string
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
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
)

const IconRisk = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
)

const IconPackages = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
)

const IconChecklist = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
)

const PartnerKitPage: React.FC = () => {
    const { t, lang } = useLanguage()
    const base = import.meta.env.BASE_URL
    const suffix = lang.toUpperCase()
    const pdfUrl = `${base}WTP_One_Pager_${suffix}.pdf`
    const previewUrl = `${base}WTP_One_Pager_${suffix}_preview.png`

    const docsPath = lang === 'ru' ? `${base}docs/ru/process` : `${base}docs/process`

    const docs = [
        {
            key: 'process',
            icon: <IconProcess />,
            href: `${docsPath}/01-process-map.pdf`,
        },
        {
            key: 'risk',
            icon: <IconRisk />,
            href: `${docsPath}/06-risk-policy.pdf`,
        },
        {
            key: 'packages',
            icon: <IconPackages />,
            href: `${docsPath}/03-packages.pdf`,
        },
        {
            key: 'intake',
            icon: <IconChecklist />,
            href: `${docsPath}/02-intake-checklist.pdf`,
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
                    {t('partnerKit.subtitle')}
                </p>
            </section>

            {/* Featured — One Pager */}
            <section style={{ marginBottom: '80px' }}>
                <div className="label">{t('partnerKit.featured')}</div>
                <div className="grid-2">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>{t('partnerKit.onepager.title')}</h2>
                        <p className="text-body" style={{ marginBottom: '32px', maxWidth: '440px' }}>
                            {t('partnerKit.onepager.desc')}
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
                            desc={t(`partnerKit.${doc.key}.desc`)}
                            href={doc.href}
                            btnLabel={t('partnerKit.download.btn')}
                            icon={doc.icon}
                            onDownload={() => trackPdfDownload(doc.key, lang)}
                        />
                    ))}
                </div>
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
                    {t('partnerKit.cta.text')}
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
