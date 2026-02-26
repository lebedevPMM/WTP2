import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import ProcessStep from '../components/ProcessStep'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick, trackEvent } from '../lib/analytics'
import './MonetizationLandingPage.css'

const MonetizationLandingPage: React.FC = () => {
    const { t, tRich } = useLanguage()
    const [activeModel, setActiveModel] = useState<'referral' | 'whitelabel'>('referral')
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const toggleFaq = (index: number) => {
        const next = openFaq === index ? null : index
        setOpenFaq(next)
        if (next !== null) {
            trackEvent('faq_expand', { question_id: index + 1 })
        }
    }

    const switchModel = (model: 'referral' | 'whitelabel') => {
        setActiveModel(model)
        trackEvent('model_tab_switch', { model })
    }

    return (
        <div className="container">
            {/* 1. Hero */}
            <section className="hero-section ml-hero">
                <div className="hero-bg-effect ml-hero-glow" />
                <div className="label ml-back-link">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {t('ml.back')}
                    </Link>
                </div>
                <span className="label">{t('ml.hero.label')}</span>
                <h1>{t('ml.hero.title')}</h1>
                <p className="subtitle">{tRich('ml.hero.subtitle')}</p>
                <div className="ml-hero-ctas">
                    <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 'ml_hero')}>
                        {t('ml.hero.cta.case')}
                    </Button>
                    <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 'ml_hero')}>
                        {t('ml.hero.cta.kit')}
                    </Button>
                </div>
            </section>

            {/* 2. Social Proof Bar */}
            <section className="ml-proof-bar">
                <div className="ml-proof-item">
                    <span className="ml-proof-number">{t('ml.proof.partners.value')}</span>
                    <span className="ml-proof-label">{t('ml.proof.partners.label')}</span>
                </div>
                <div className="ml-proof-divider" />
                <div className="ml-proof-item">
                    <span className="ml-proof-number">{t('ml.proof.cases.value')}</span>
                    <span className="ml-proof-label">{t('ml.proof.cases.label')}</span>
                </div>
                <div className="ml-proof-divider" />
                <div className="ml-proof-item">
                    <span className="ml-proof-number">{t('ml.proof.jurisdictions.value')}</span>
                    <span className="ml-proof-label">{t('ml.proof.jurisdictions.label')}</span>
                </div>
            </section>

            {/* Trust Seals */}
            <div className="ml-trust-seals">
                <span className="ml-trust-seal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    {t('ml.trust.nda')}
                </span>
                <span className="ml-trust-seal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    {t('ml.trust.licensed')}
                </span>
                <span className="ml-trust-seal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    {t('ml.trust.protection')}
                </span>
            </div>

            {/* 3. Problem → Solution */}
            <section>
                <span className="label">{t('ml.problem.label')}</span>
                <h2>{t('ml.problem.title')}</h2>
                <div className="grid-3 ml-problem-grid">
                    <Card accentGradient="var(--accent-magma)" hasAccentTop>
                        <p className="text-body">{t('ml.problem.card1')}</p>
                    </Card>
                    <Card accentGradient="var(--accent-gold)" hasAccentTop>
                        <p className="text-body">{t('ml.problem.card2')}</p>
                    </Card>
                    <Card accentGradient="var(--accent-teal)" hasAccentTop>
                        <p className="text-body">{t('ml.problem.card3')}</p>
                    </Card>
                </div>
                <div className="ml-solution-bridge">
                    <p className="ml-solution-text">{t('ml.problem.solution')}</p>
                </div>
            </section>

            {/* 4. Partner Protection */}
            <section>
                <span className="label">{t('ml.protection.label')}</span>
                <h2>{t('ml.protection.title')}</h2>
                <div className="grid-3 ml-protection-grid">
                    <Card accentGradient="var(--accent-gold)" hasAccentTop>
                        <div>
                            <div className="ml-protection-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                            </div>
                            <h3 className="card-heading">{t('ml.protection.nc.title')}</h3>
                            <p className="text-body">{tRich('ml.protection.nc.text')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-teal)" hasAccentTop>
                        <div>
                            <div className="ml-protection-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            </div>
                            <h3 className="card-heading">{t('ml.protection.crm.title')}</h3>
                            <p className="text-body">{tRich('ml.protection.crm.text')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-nebula)" hasAccentTop>
                        <div>
                            <div className="ml-protection-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                            </div>
                            <h3 className="card-heading">{t('ml.protection.ltv.title')}</h3>
                            <p className="text-body">{tRich('ml.protection.ltv.text')}</p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* 5. How It Works */}
            <section>
                <span className="label">{t('ml.how.label')}</span>
                <h2>{t('ml.how.title')}</h2>
                <div className="grid-4 ml-how-grid">
                    <ProcessStep number="01" title={t('ml.how.step1.title')} description={tRich('ml.how.step1.desc')} active />
                    <ProcessStep number="02" title={t('ml.how.step2.title')} description={tRich('ml.how.step2.desc')} />
                    <ProcessStep number="03" title={t('ml.how.step3.title')} description={tRich('ml.how.step3.desc')} />
                    <ProcessStep number="04" title={t('ml.how.step4.title')} description={tRich('ml.how.step4.desc')} />
                </div>
            </section>

            {/* Mid-page CTA */}
            <section className="ml-mid-cta">
                <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 'ml_mid')}>
                    {t('ml.hero.cta.case')}
                </Button>
                <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 'ml_mid')}>
                    {t('ml.hero.cta.kit')}
                </Button>
            </section>

            {/* 6. Products (5 cards) */}
            <section>
                <span className="label">{t('ml.products.label')}</span>
                <h2>{t('ml.products.title')}</h2>
                <div className="ml-products-grid">
                    <div className="ml-product-card">
                        <div className="ml-product-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>
                        </div>
                        <h3>{t('ml.products.banking.title')}</h3>
                        <p className="text-body">{tRich('ml.products.banking.desc')}</p>
                    </div>
                    <div className="ml-product-card">
                        <div className="ml-product-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                        </div>
                        <h3>{t('ml.products.setup.title')}</h3>
                        <p className="text-body">{tRich('ml.products.setup.desc')}</p>
                    </div>
                    <div className="ml-product-card">
                        <div className="ml-product-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 14l6-6M4 4h4v4M20 20h-4v-4M4 20l16-16"/></svg>
                        </div>
                        <h3>{t('ml.products.tax.title')}</h3>
                        <p className="text-body">{tRich('ml.products.tax.desc')}</p>
                    </div>
                    <div className="ml-product-card">
                        <div className="ml-product-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <h3>{t('ml.products.asset.title')}</h3>
                        <p className="text-body">{tRich('ml.products.asset.desc')}</p>
                    </div>
                    <div className="ml-product-card">
                        <div className="ml-product-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/><path d="M14.05 2a9 9 0 018 7.94"/><path d="M14.05 6A5 5 0 0118 9.94"/></svg>
                        </div>
                        <h3>{t('ml.products.visas.title')}</h3>
                        <p className="text-body">{tRich('ml.products.visas.desc')}</p>
                    </div>
                </div>
            </section>

            {/* 7. Models — Tabs */}
            <section>
                <span className="label">{t('ml.models.label')}</span>
                <h2>{t('ml.models.title')}</h2>
                <div className="ml-model-tabs">
                    <button
                        className={`ml-tab ${activeModel === 'referral' ? 'ml-tab--active' : ''}`}
                        onClick={() => switchModel('referral')}
                    >
                        {t('ml.models.referral.tab')}
                    </button>
                    <button
                        className={`ml-tab ${activeModel === 'whitelabel' ? 'ml-tab--active' : ''}`}
                        onClick={() => switchModel('whitelabel')}
                    >
                        {t('ml.models.whitelabel.tab')}
                    </button>
                </div>

                {activeModel === 'referral' ? (
                    <div className="ml-model-content">
                        <h3>{t('ml.models.referral.title')}</h3>
                        <p className="text-body">{tRich('ml.models.referral.desc')}</p>
                        <div className="ml-model-flow">
                            <div className="ml-model-step">
                                <span className="ml-model-step-num">1</span>
                                <span>{t('ml.models.referral.step1')}</span>
                            </div>
                            <div className="ml-model-step">
                                <span className="ml-model-step-num">2</span>
                                <span>{t('ml.models.referral.step2')}</span>
                            </div>
                            <div className="ml-model-step">
                                <span className="ml-model-step-num">3</span>
                                <span>{t('ml.models.referral.step3')}</span>
                            </div>
                        </div>
                        <div className="ml-model-highlight">
                            <strong>{t('ml.models.referral.highlight')}</strong>
                        </div>
                    </div>
                ) : (
                    <div className="ml-model-content">
                        <h3>{t('ml.models.whitelabel.title')}</h3>
                        <p className="text-body">{tRich('ml.models.whitelabel.desc')}</p>
                        <div className="ml-model-flow">
                            <div className="ml-model-step">
                                <span className="ml-model-step-num">1</span>
                                <span>{t('ml.models.whitelabel.step1')}</span>
                            </div>
                            <div className="ml-model-step">
                                <span className="ml-model-step-num">2</span>
                                <span>{t('ml.models.whitelabel.step2')}</span>
                            </div>
                            <div className="ml-model-step">
                                <span className="ml-model-step-num">3</span>
                                <span>{t('ml.models.whitelabel.step3')}</span>
                            </div>
                        </div>
                        <div className="ml-model-highlight">
                            <strong>{t('ml.models.whitelabel.highlight')}</strong>
                        </div>
                    </div>
                )}
            </section>

            {/* 8. Case Study */}
            <section className="ml-case-section">
                <span className="label">{t('ml.case.label')}</span>
                <h2>{t('ml.case.title')}</h2>
                <div className="ml-case-card">
                    <div className="ml-case-header">
                        <span className="ml-case-tag">{t('ml.case.tag')}</span>
                    </div>
                    <div className="ml-case-body">
                        <div className="ml-case-row">
                            <span className="ml-case-label">{t('ml.case.situation.label')}</span>
                            <p>{t('ml.case.situation.text')}</p>
                        </div>
                        <div className="ml-case-row">
                            <span className="ml-case-label">{t('ml.case.partner.label')}</span>
                            <p>{t('ml.case.partner.text')}</p>
                        </div>
                        <div className="ml-case-row">
                            <span className="ml-case-label">{t('ml.case.wtp.label')}</span>
                            <p>{t('ml.case.wtp.text')}</p>
                        </div>
                        <div className="ml-case-result">
                            <span className="ml-case-label">{t('ml.case.result.label')}</span>
                            <p>{t('ml.case.result.text')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Post-case-study CTA */}
            <section className="ml-mid-cta">
                <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 'ml_casestudy')}>
                    {t('ml.hero.cta.case')}
                </Button>
                <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 'ml_casestudy')}>
                    {t('ml.hero.cta.kit')}
                </Button>
            </section>

            {/* 9. Risk Policy */}
            <section>
                <span className="label">{t('ml.risk.label')}</span>
                <h2>{t('ml.risk.title')}</h2>
                <div className="ml-risk-grid">
                    <div className="ml-risk-col ml-risk-accept">
                        <h3>
                            <span className="ml-risk-dot ml-risk-dot--green" />
                            {t('ml.risk.accept.title')}
                        </h3>
                        <ul>
                            <li>{t('ml.risk.accept.item1')}</li>
                            <li>{t('ml.risk.accept.item2')}</li>
                            <li>{t('ml.risk.accept.item3')}</li>
                            <li>{t('ml.risk.accept.item4')}</li>
                        </ul>
                    </div>
                    <div className="ml-risk-col ml-risk-decline">
                        <h3>
                            <span className="ml-risk-dot ml-risk-dot--red" />
                            {t('ml.risk.decline.title')}
                        </h3>
                        <ul>
                            <li>{t('ml.risk.decline.item1')}</li>
                            <li>{t('ml.risk.decline.item2')}</li>
                            <li>{t('ml.risk.decline.item3')}</li>
                            <li>{t('ml.risk.decline.item4')}</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 10. FAQ */}
            <section>
                <span className="label">{t('ml.faq.label')}</span>
                <h2>{t('ml.faq.title')}</h2>
                <div className="ml-faq-list">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className={`ml-faq-item ${openFaq === i ? 'ml-faq-item--open' : ''}`}>
                            <button
                                className="ml-faq-question"
                                onClick={() => toggleFaq(i)}
                                aria-expanded={openFaq === i}
                                aria-controls={`ml-faq-answer-${i}`}
                                id={`ml-faq-q-${i}`}
                            >
                                <span>{t(`ml.faq.q${i}`)}</span>
                                <svg
                                    className="ml-faq-chevron"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden="true"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            {openFaq === i && (
                                <div
                                    className="ml-faq-answer"
                                    id={`ml-faq-answer-${i}`}
                                    role="region"
                                    aria-labelledby={`ml-faq-q-${i}`}
                                >
                                    <p className="text-body">{t(`ml.faq.a${i}`)}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 11. Final CTA */}
            <section className="ml-final-cta">
                <h2 className="ml-final-title">{t('ml.cta.title')}</h2>
                <p className="text-body ml-final-subtitle">
                    {t('ml.cta.text')}
                </p>
                <div className="ml-final-buttons">
                    <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 'ml_final')}>
                        {t('ml.cta.primary')}
                    </Button>
                    <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 'ml_final')}>
                        {t('ml.cta.secondary')}
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default MonetizationLandingPage
