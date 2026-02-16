import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import ProcessStep from '../components/ProcessStep'
import RiskRow from '../components/RiskRow'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick } from '../lib/analytics'

const LandingPage: React.FC = () => {
    const { t } = useLanguage()

    return (
        <div className="container">
            {/* Hero */}
            <section className="hero-section">
                <div className="hero-bg-effect" />
                <span className="label">{t('hero.label')}</span>
                <h1>{t('hero.title')}</h1>
                <p className="subtitle">
                    {t('hero.subtitle')}
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Button href="/partner-kit" onClick={() => trackCtaClick('partner_kit', 'hero')}>{t('hero.cta.kit')}</Button>
                    <Button href="/submit-case" variant="outline" onClick={() => trackCtaClick('submit_case', 'hero')}>{t('hero.cta.case')}</Button>
                </div>
            </section>

            {/* Who it's for */}
            <section>
                <span className="label">{t('who.label')}</span>
                <div className="grid-2">
                    <div>
                        <h2>{t('who.title')}</h2>
                    </div>
                    <div className="flex-col">
                        <p className="text-body">
                            {t('who.text')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Partner Benefits */}
            <section id="partners">
                <span className="label">{t('benefits.label')}</span>
                <div className="grid-2">
                    <Card accentGradient="var(--accent-magma)" hasAccentTop>
                        <div>
                            <h4>{t('benefits.ownership.title')}</h4>
                            <p className="text-body">
                                {t('benefits.ownership.text')}
                            </p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-gold)" hasAccentTop className="card-transparency">
                        <div>
                            <h4>{t('benefits.transparency.title')}</h4>
                            <p className="text-body">
                                {t('benefits.transparency.text')}
                            </p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-teal)" hasAccentTop>
                        <div>
                            <h4>{t('benefits.control.title')}</h4>
                            <p className="text-body">
                                {t('benefits.control.text')}
                            </p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-nebula)" hasAccentTop>
                        <div>
                            <h4>{t('benefits.quality.title')}</h4>
                            <p className="text-body">
                                {t('benefits.quality.text')}
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Delivery Process */}
            <section id="process">
                <span className="label">{t('process.label')}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h2>{t('process.title')}</h2>
                    <Link to="/process/terms" className="label" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                        {t('process.terms')}
                    </Link>
                </div>
                <div className="grid-4" style={{ marginTop: '40px' }}>
                    <Link to="/process/pre-screen" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ProcessStep number="01" title={t('process.step1.title')} description={t('process.step1.desc')} active />
                    </Link>
                    <Link to="/process/banking-scenario" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ProcessStep number="02" title={t('process.step2.title')} description={t('process.step2.desc')} />
                    </Link>
                    <Link to="/process/delivery" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ProcessStep number="03" title={t('process.step3.title')} description={t('process.step3.desc')} />
                    </Link>
                    <Link to="/process/ongoing-support" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ProcessStep number="04" title={t('process.step4.title')} description={t('process.step4.desc')} />
                    </Link>
                </div>
            </section>

            {/* Engagement Models */}
            <section id="engagement">
                <span className="label">{t('engagement.label')}</span>
                <div className="grid-2">
                    <Link to="/engagement" className="list-item" style={{ borderTop: 'none', paddingTop: 0, textDecoration: 'none' }}>
                        <div>
                            <h3>{t('engagement.referral.title')}</h3>
                            <p className="text-body" style={{ width: '100%' }}>
                                {t('engagement.referral.text')}
                            </p>
                        </div>
                    </Link>
                    <Link to="/engagement" className="list-item" style={{ borderTop: 'none', paddingTop: 0, textDecoration: 'none' }}>
                        <div>
                            <h3>{t('engagement.whitelabel.title')}</h3>
                            <p className="text-body" style={{ width: '100%' }}>
                                {t('engagement.whitelabel.text')}
                            </p>
                        </div>
                    </Link>
                </div>

                <Card
                    style={{ marginTop: '24px', borderColor: 'var(--border-focus)', background: 'transparent' }}
                >
                    <h4 style={{ marginBottom: '24px' }}>{t('engagement.protection.title')}</h4>
                    <div className="grid-2">
                        <p className="text-body">&bull; {t('engagement.protection.crm')}</p>
                        <p className="text-body">&bull; {t('engagement.protection.contact')}</p>
                        <p className="text-body">&bull; {t('engagement.protection.terms')}</p>
                        <p className="text-body">&bull; {t('engagement.protection.commission')}</p>
                    </div>
                </Card>
            </section>

            {/* Risk Policy */}
            <section id="risk">
                <span className="label">{t('risk.label')}</span>
                <div className="risk-table">
                    <RiskRow
                        dotColor="green"
                        status={t('risk.green.status')}
                        description={t('risk.green.desc')}
                    />
                    <RiskRow
                        dotColor="yellow"
                        status={t('risk.yellow.status')}
                        description={t('risk.yellow.desc')}
                    />
                    <RiskRow
                        dotColor="red"
                        status={t('risk.red.status')}
                        description={t('risk.red.desc')}
                        noBorder
                    />
                </div>
            </section>

            {/* The Collection */}
            <section id="products" className="collection-section">
                <div className="collection-header">
                    <h2 className="collection-title">{t('products.label')}</h2>
                    <p className="collection-subtitle">{t('products.subtitle')}</p>
                </div>
                <div className="collection-grid">

                    <Link to="/products/banking" className="collection-card">
                        <div className="collection-card-bg" style={{ background: 'var(--accent-magma)' }} />
                        <div className="collection-card-inner">
                            <div className="collection-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>
                            </div>
                            <div className="collection-card-bottom">
                                <span className="collection-card-label">{t('products.banking.pill')}</span>
                                <h3 className="collection-card-name">{t('products.banking.title')}</h3>
                                <div className="collection-card-desc">
                                    <p>{t('products.banking.desc')}</p>
                                </div>
                                <span className="collection-card-cta">{t('products.banking.cta')}</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/products/premium-banking" className="collection-card collection-card--offset">
                        <div className="collection-card-bg" style={{ background: 'var(--accent-gold)' }} />
                        <div className="collection-card-inner">
                            <div className="collection-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            </div>
                            <div className="collection-card-bottom">
                                <span className="collection-card-label">{t('products.premium.pill')}</span>
                                <h3 className="collection-card-name">{t('products.premium.title')}</h3>
                                <div className="collection-card-desc">
                                    <p>{t('products.premium.desc')}</p>
                                </div>
                                <span className="collection-card-cta">{t('products.premium.cta')}</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/products/business-setup" className="collection-card">
                        <div className="collection-card-bg" style={{ background: 'var(--accent-teal)' }} />
                        <div className="collection-card-inner">
                            <div className="collection-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                            </div>
                            <div className="collection-card-bottom">
                                <span className="collection-card-label">{t('products.business.pill')}</span>
                                <h3 className="collection-card-name">{t('products.business.title')}</h3>
                                <div className="collection-card-desc">
                                    <p>{t('products.business.desc')}</p>
                                </div>
                                <span className="collection-card-cta">{t('products.business.cta')}</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/products/residency" className="collection-card collection-card--offset">
                        <div className="collection-card-bg" style={{ background: 'var(--accent-nebula)' }} />
                        <div className="collection-card-inner">
                            <div className="collection-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                            </div>
                            <div className="collection-card-bottom">
                                <span className="collection-card-label">{t('products.residency.pill')}</span>
                                <h3 className="collection-card-name">{t('products.residency.title')}</h3>
                                <div className="collection-card-desc">
                                    <p>{t('products.residency.desc')}</p>
                                </div>
                                <span className="collection-card-cta">{t('products.residency.cta')}</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/products/tax-residency" className="collection-card">
                        <div className="collection-card-bg" style={{ background: 'var(--accent-magma)' }} />
                        <div className="collection-card-inner">
                            <div className="collection-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 14l6-6M4 4h4v4M20 20h-4v-4M4 20l16-16"/></svg>
                            </div>
                            <div className="collection-card-bottom">
                                <span className="collection-card-label">{t('products.tax.pill')}</span>
                                <h3 className="collection-card-name">{t('products.tax.title')}</h3>
                                <div className="collection-card-desc">
                                    <p>{t('products.tax.desc')}</p>
                                </div>
                                <span className="collection-card-cta">{t('products.tax.cta')}</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/products/accounting" className="collection-card collection-card--offset">
                        <div className="collection-card-bg" style={{ background: 'var(--accent-gold)' }} />
                        <div className="collection-card-inner">
                            <div className="collection-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
                            </div>
                            <div className="collection-card-bottom">
                                <span className="collection-card-label">{t('products.accounting.pill')}</span>
                                <h3 className="collection-card-name">{t('products.accounting.title')}</h3>
                                <div className="collection-card-desc">
                                    <p>{t('products.accounting.desc')}</p>
                                </div>
                                <span className="collection-card-cta">{t('products.accounting.cta')}</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/products/real-estate" className="collection-card">
                        <div className="collection-card-bg" style={{ background: 'var(--accent-teal)' }} />
                        <div className="collection-card-inner">
                            <div className="collection-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/></svg>
                            </div>
                            <div className="collection-card-bottom">
                                <span className="collection-card-label">{t('products.realestate.pill')}</span>
                                <h3 className="collection-card-name">{t('products.realestate.title')}</h3>
                                <div className="collection-card-desc">
                                    <p>{t('products.realestate.desc')}</p>
                                </div>
                                <span className="collection-card-cta">{t('products.realestate.cta')}</span>
                            </div>
                        </div>
                    </Link>

                    <Link to="/products/wealth" className="collection-card collection-card--offset">
                        <div className="collection-card-bg" style={{ background: 'var(--accent-nebula)' }} />
                        <div className="collection-card-inner">
                            <div className="collection-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                            </div>
                            <div className="collection-card-bottom">
                                <span className="collection-card-label">{t('products.wealth.pill')}</span>
                                <h3 className="collection-card-name">{t('products.wealth.title')}</h3>
                                <div className="collection-card-desc">
                                    <p>{t('products.wealth.desc')}</p>
                                </div>
                                <span className="collection-card-cta">{t('products.wealth.cta')}</span>
                            </div>
                        </div>
                    </Link>

                </div>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 120px auto' }}>
                <h2 style={{ fontSize: '32px' }}>{t('cta.title')}</h2>
                <p className="text-body" style={{ marginBottom: '32px' }}>
                    {t('cta.text')}
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <Button href="/partner-kit" onClick={() => trackCtaClick('partner_kit', 'bottom_cta')}>{t('cta.kit')}</Button>
                    <Button href="/submit-case" variant="outline" onClick={() => trackCtaClick('submit_case', 'bottom_cta')}>{t('cta.case')}</Button>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
