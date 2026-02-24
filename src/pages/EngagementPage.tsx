import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick } from '../lib/analytics'

const EngagementPage: React.FC = () => {
    const { t } = useLanguage()

    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            {/* Hero */}
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>{t('engPage.back')}</Link>
                </div>
                <span className="label">{t('engPage.label')}</span>
                <h1 style={{ fontSize: '48px' }}>{t('engPage.title')}</h1>
                <p className="subtitle" style={{ marginBottom: 0 }}>{t('engPage.subtitle')}</p>
            </section>

            {/* Referral Model */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('engPage.referral.title')}</h2>
                    <span className="label">{t('engPage.referral.label')}</span>
                </div>
                <p className="text-body" style={{ maxWidth: '700px', marginBottom: '40px', fontSize: '16px' }}>
                    {t('engPage.referral.intro')}
                </p>

                <h3 style={{ marginBottom: '24px' }}>{t('engPage.referral.how')}</h3>
                <div className="grid-2" style={{ marginBottom: '40px' }}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="list-item" style={{ borderTop: i <= 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                                <span className="label" style={{ marginBottom: 0 }}>0{i}</span>
                                <p className="text-body" style={{ width: '100%', color: 'var(--text-primary)' }}>
                                    {t(`engPage.referral.step${i}`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 style={{ marginBottom: '16px' }}>{t('engPage.referral.best')}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                            <span style={{ color: 'var(--text-tertiary)' }}>-</span>
                            <p className="text-body">{t(`engPage.referral.best${i}`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '60px 0' }} />

            {/* White-label Model */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('engPage.whitelabel.title')}</h2>
                    <span className="label">{t('engPage.whitelabel.label')}</span>
                </div>
                <p className="text-body" style={{ maxWidth: '700px', marginBottom: '40px', fontSize: '16px' }}>
                    {t('engPage.whitelabel.intro')}
                </p>

                <h3 style={{ marginBottom: '24px' }}>{t('engPage.whitelabel.how')}</h3>
                <div className="grid-2" style={{ marginBottom: '40px' }}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="list-item" style={{ borderTop: i <= 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                                <span className="label" style={{ marginBottom: 0 }}>0{i}</span>
                                <p className="text-body" style={{ width: '100%', color: 'var(--text-primary)' }}>
                                    {t(`engPage.whitelabel.step${i}`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 style={{ marginBottom: '16px' }}>{t('engPage.whitelabel.best')}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                            <span style={{ color: 'var(--text-tertiary)' }}>-</span>
                            <p className="text-body">{t(`engPage.whitelabel.best${i}`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Partner Protection */}
            <section style={{ marginTop: '80px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                    <h2>{t('engPage.protection.title')}</h2>
                    <span className="label">{t('engPage.protection.label')}</span>
                </div>
                <p className="text-body" style={{ marginBottom: '40px' }}>{t('engPage.protection.subtitle')}</p>
                <div className="grid-2">
                    {(['crm', 'contact', 'terms', 'commission'] as const).map(key => (
                        <Card key={key} accentGradient="var(--accent-gold)" hasAccentTop>
                            <div>
                                <h3 className="card-heading" style={{ fontSize: '18px' }}>{t(`engPage.prot.${key}`)}</h3>
                                <p className="text-body" style={{ fontSize: '13px' }}>{t(`engPage.prot.${key}Desc`)}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', maxWidth: '600px', margin: '80px auto 0 auto' }}>
                <h2 style={{ fontSize: '32px' }}>{t('cta.title')}</h2>
                <p className="text-body" style={{ marginBottom: '32px' }}>{t('cta.text')}</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <Button href="/partner-kit" onClick={() => trackCtaClick('partner_kit', 'engagement')}>{t('cta.kit')}</Button>
                    <Button href="/submit-case" variant="outline" onClick={() => trackCtaClick('submit_case', 'engagement')}>{t('cta.case')}</Button>
                </div>
            </section>
        </div>
    )
}

export default EngagementPage
