import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import RiskRow from '../components/RiskRow'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick } from '../lib/analytics'

const RiskPage: React.FC = () => {
    const { t } = useLanguage()

    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            {/* Hero */}
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>{t('riskPage.back')}</Link>
                </div>
                <span className="label">{t('riskPage.label')}</span>
                <h1 style={{ fontSize: '48px' }}>{t('riskPage.title')}</h1>
                <p className="subtitle" style={{ marginBottom: 0 }}>{t('riskPage.subtitle')}</p>
            </section>

            {/* Summary row */}
            <section style={{ marginBottom: '80px' }}>
                <div className="risk-table">
                    <RiskRow dotColor="green" status={t('risk.green.status')} description={t('risk.green.desc')} />
                    <RiskRow dotColor="yellow" status={t('risk.yellow.status')} description={t('risk.yellow.desc')} />
                    <RiskRow dotColor="red" status={t('risk.red.status')} description={t('risk.red.desc')} noBorder />
                </div>
            </section>

            {/* Green */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('riskPage.green.title')}</h2>
                    <span className="label">{t('riskPage.green.label')}</span>
                </div>
                <p className="text-body" style={{ maxWidth: '700px', marginBottom: '32px', fontSize: '16px' }}>
                    {t('riskPage.green.intro')}
                </p>
                <h3 style={{ marginBottom: '24px' }}>{t('riskPage.green.criteria')}</h3>
                <div className="grid-2">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="list-item" style={{ borderTop: i <= 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div className="dot green" style={{ marginTop: '6px', flexShrink: 0 }} />
                                <p className="text-body" style={{ width: '100%', color: 'var(--text-primary)' }}>{t(`riskPage.green.c${i}`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Yellow */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('riskPage.yellow.title')}</h2>
                    <span className="label">{t('riskPage.yellow.label')}</span>
                </div>
                <p className="text-body" style={{ maxWidth: '700px', marginBottom: '32px', fontSize: '16px' }}>
                    {t('riskPage.yellow.intro')}
                </p>

                <h3 style={{ marginBottom: '24px' }}>{t('riskPage.yellow.criteria')}</h3>
                <div className="grid-2" style={{ marginBottom: '40px' }}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="list-item" style={{ borderTop: i <= 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div className="dot yellow" style={{ marginTop: '6px', flexShrink: 0 }} />
                                <p className="text-body" style={{ width: '100%', color: 'var(--text-primary)' }}>{t(`riskPage.yellow.c${i}`)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 style={{ marginBottom: '24px' }}>{t('riskPage.yellow.conditions')}</h3>
                <div className="grid-2">
                    {[1, 2, 3, 4].map(i => (
                        <Card key={i} style={{ minHeight: '120px' }}>
                            <p className="text-body" style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{t(`riskPage.yellow.cond${i}`)}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Red */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('riskPage.red.title')}</h2>
                    <span className="label">{t('riskPage.red.label')}</span>
                </div>
                <p className="text-body" style={{ maxWidth: '700px', marginBottom: '32px', fontSize: '16px' }}>
                    {t('riskPage.red.intro')}
                </p>
                <h3 style={{ marginBottom: '24px' }}>{t('riskPage.red.criteria')}</h3>
                <div className="grid-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="list-item" style={{ borderTop: i <= 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <div style={{ background: '#cd3e30', color: '#fff', fontSize: '12px', padding: '2px 8px', borderRadius: '4px', height: '20px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>!</div>
                                <p className="text-body" style={{ width: '100%', color: 'var(--text-primary)' }}>{t(`riskPage.red.c${i}`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', maxWidth: '600px', margin: '80px auto 0 auto' }}>
                <h2 style={{ fontSize: '32px' }}>{t('cta.title')}</h2>
                <p className="text-body" style={{ marginBottom: '32px' }}>{t('cta.text')}</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <Button href="/partner-kit" onClick={() => trackCtaClick('partner_kit', 'risk')}>{t('cta.kit')}</Button>
                    <Button href="/submit-case" variant="outline" onClick={() => trackCtaClick('submit_case', 'risk')}>{t('cta.case')}</Button>
                </div>
            </section>
        </div>
    )
}

export default RiskPage
