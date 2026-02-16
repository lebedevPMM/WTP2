import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick } from '../lib/analytics'

const PartnersPage: React.FC = () => {
    const { t } = useLanguage()

    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            {/* Hero */}
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>{t('partnersPage.back')}</Link>
                </div>
                <span className="label">{t('partnersPage.label')}</span>
                <h1 style={{ fontSize: '48px' }}>{t('partnersPage.title')}</h1>
                <p className="subtitle" style={{ marginBottom: 0 }}>{t('partnersPage.subtitle')}</p>
            </section>

            {/* Who we work with */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('partnersPage.who.title')}</h2>
                    <span className="label">{t('partnersPage.who.label')}</span>
                </div>
                <div className="grid-2">
                    {[1, 2, 3, 4].map(i => (
                        <Card key={i} style={{ minHeight: '160px' }}>
                            <h4 style={{ fontSize: '18px' }}>{t(`partnersPage.who${i}.title`)}</h4>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t(`partnersPage.who${i}.desc`)}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Why partners choose us */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2 style={{ maxWidth: '500px' }}>{t('partnersPage.why.label')}</h2>
                </div>
                <div className="grid-2">
                    <Card accentGradient="var(--accent-magma)" hasAccentTop>
                        <div>
                            <h4>{t('partnersPage.own.title')}</h4>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t('partnersPage.own.desc')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-gold)" hasAccentTop>
                        <div>
                            <h4>{t('partnersPage.trans.title')}</h4>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t('partnersPage.trans.desc')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-teal)" hasAccentTop>
                        <div>
                            <h4>{t('partnersPage.ctrl.title')}</h4>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t('partnersPage.ctrl.desc')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-nebula)" hasAccentTop>
                        <div>
                            <h4>{t('partnersPage.qual.title')}</h4>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t('partnersPage.qual.desc')}</p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Engagement models link */}
            <section>
                <Card style={{ borderColor: 'var(--border-focus)', background: 'transparent' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
                        <div>
                            <h4 style={{ marginBottom: '8px' }}>{t('engagement.label')}</h4>
                            <p className="text-body">{t('engPage.subtitle')}</p>
                        </div>
                        <Link to="/engagement" className="btn">{t('products.banking.cta')}</Link>
                    </div>
                </Card>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', maxWidth: '600px', margin: '80px auto 0 auto' }}>
                <h2 style={{ fontSize: '32px' }}>{t('cta.title')}</h2>
                <p className="text-body" style={{ marginBottom: '32px' }}>{t('cta.text')}</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <Button href="/partner-kit" onClick={() => trackCtaClick('partner_kit', 'partners')}>{t('cta.kit')}</Button>
                    <Button href="/submit-case" variant="outline" onClick={() => trackCtaClick('submit_case', 'partners')}>{t('cta.case')}</Button>
                </div>
            </section>
        </div>
    )
}

export default PartnersPage
