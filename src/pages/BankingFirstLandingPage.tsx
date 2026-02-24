import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import ProcessStep from '../components/ProcessStep'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick, trackEvent } from '../lib/analytics'
import './BankingFirstLandingPage.css'

const BankingFirstLandingPage: React.FC = () => {
    const { t } = useLanguage()
    const [activeModel, setActiveModel] = useState<'referral' | 'whitelabel'>('referral')
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const toggleFaq = (index: number) => {
        const next = openFaq === index ? null : index
        setOpenFaq(next)
        if (next !== null) {
            trackEvent('faq_expand', { question_id: index + 1, source: 'banking_first' })
        }
    }

    const switchModel = (model: 'referral' | 'whitelabel') => {
        setActiveModel(model)
        trackEvent('model_tab_switch', { model, source: 'banking_first' })
    }

    return (
        <div className="container">
            {/* 1. Hero — dark institutional */}
            <section className="hero-section bf-hero">
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {t('bf.back')}
                    </Link>
                </div>
                <span className="label bf-hero-label">{t('bf.hero.label')}</span>
                <h1>{t('bf.hero.title')}</h1>
                <p className="subtitle">{t('bf.hero.subtitle')}</p>
                <div className="bf-hero-ctas">
                    <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 'bf_hero')}>
                        {t('bf.hero.cta.prescreen')}
                    </Button>
                    <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 'bf_hero')}>
                        {t('bf.hero.cta.catalog')}
                    </Button>
                </div>
            </section>

            {/* 2. Anti-Commodity Statement */}
            <section>
                <span className="label">{t('bf.anti.label')}</span>
                <h2>{t('bf.anti.title')}</h2>
                <div className="grid-3 bf-anti-grid">
                    <Card accentGradient="var(--accent-magma)" hasAccentTop>
                        <div>
                            <p className="text-body bf-anti-situation">{t('bf.anti.card1.situation')}</p>
                            <p className="bf-anti-result">{t('bf.anti.card1.result')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-gold)" hasAccentTop>
                        <div>
                            <p className="text-body bf-anti-situation">{t('bf.anti.card2.situation')}</p>
                            <p className="bf-anti-result">{t('bf.anti.card2.result')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-teal)" hasAccentTop>
                        <div>
                            <p className="text-body bf-anti-situation">{t('bf.anti.card3.situation')}</p>
                            <p className="bf-anti-result">{t('bf.anti.card3.result')}</p>
                        </div>
                    </Card>
                </div>
                <div className="bf-solution-bridge">
                    <p className="bf-solution-text">{t('bf.anti.solution')}</p>
                </div>
            </section>

            {/* 3. Banking-First USP — 4 pillars */}
            <section>
                <span className="label">{t('bf.usp.label')}</span>
                <h2>{t('bf.usp.title')}</h2>
                <div className="bf-pillars-grid">
                    <div className="bf-pillar-card">
                        <div className="bf-pillar-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>
                        </div>
                        <h3>{t('bf.usp.banking.title')}</h3>
                        <p className="text-body">{t('bf.usp.banking.text')}</p>
                    </div>
                    <div className="bf-pillar-card">
                        <div className="bf-pillar-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                        </div>
                        <h3>{t('bf.usp.gonogo.title')}</h3>
                        <p className="text-body">{t('bf.usp.gonogo.text')}</p>
                    </div>
                    <div className="bf-pillar-card">
                        <div className="bf-pillar-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                        </div>
                        <h3>{t('bf.usp.protection.title')}</h3>
                        <p className="text-body">{t('bf.usp.protection.text')}</p>
                    </div>
                    <div className="bf-pillar-card">
                        <div className="bf-pillar-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 009 9"/></svg>
                        </div>
                        <h3>{t('bf.usp.modes.title')}</h3>
                        <p className="text-body">{t('bf.usp.modes.text')}</p>
                    </div>
                </div>
            </section>

            {/* 4. How It Works — 4 steps */}
            <section>
                <span className="label">{t('bf.how.label')}</span>
                <h2>{t('bf.how.title')}</h2>
                <div className="grid-4 bf-how-grid">
                    <ProcessStep number="01" title={t('bf.how.step1.title')} description={t('bf.how.step1.desc')} active />
                    <ProcessStep number="02" title={t('bf.how.step2.title')} description={t('bf.how.step2.desc')} />
                    <ProcessStep number="03" title={t('bf.how.step3.title')} description={t('bf.how.step3.desc')} />
                    <ProcessStep number="04" title={t('bf.how.step4.title')} description={t('bf.how.step4.desc')} />
                </div>
            </section>

            {/* Mid-page CTA */}
            <section className="bf-mid-cta">
                <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 'bf_mid')}>
                    {t('bf.hero.cta.prescreen')}
                </Button>
                <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 'bf_mid')}>
                    {t('bf.hero.cta.catalog')}
                </Button>
            </section>

            {/* Social Proof Bar */}
            <section className="bf-proof-bar">
                <div className="bf-proof-item">
                    <span className="bf-proof-number">{t('bf.proof.cases.value')}</span>
                    <span className="bf-proof-label">{t('bf.proof.cases.label')}</span>
                </div>
                <div className="bf-proof-divider" />
                <div className="bf-proof-item">
                    <span className="bf-proof-number">{t('bf.proof.prescreen.value')}</span>
                    <span className="bf-proof-label">{t('bf.proof.prescreen.label')}</span>
                </div>
                <div className="bf-proof-divider" />
                <div className="bf-proof-item">
                    <span className="bf-proof-number">{t('bf.proof.approval.value')}</span>
                    <span className="bf-proof-label">{t('bf.proof.approval.label')}</span>
                </div>
            </section>

            {/* Trust Seals */}
            <div className="bf-trust-seals">
                <span className="bf-trust-seal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    {t('bf.trust.nda')}
                </span>
                <span className="bf-trust-seal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    {t('bf.trust.licensed')}
                </span>
                <span className="bf-trust-seal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11"/></svg>
                    {t('bf.trust.banking')}
                </span>
            </div>

            {/* 5. Service Map — 6 categories */}
            <section>
                <span className="label">{t('bf.services.label')}</span>
                <h2>{t('bf.services.title')}</h2>
                <div className="bf-services-grid">
                    <div className="bf-service-card">
                        <div className="bf-service-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>
                        </div>
                        <h3>{t('bf.services.banking.title')}</h3>
                        <p className="text-body">{t('bf.services.banking.desc')}</p>
                    </div>
                    <div className="bf-service-card">
                        <div className="bf-service-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                        </div>
                        <h3>{t('bf.services.setup.title')}</h3>
                        <p className="text-body">{t('bf.services.setup.desc')}</p>
                    </div>
                    <div className="bf-service-card">
                        <div className="bf-service-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                        </div>
                        <h3>{t('bf.services.residency.title')}</h3>
                        <p className="text-body">{t('bf.services.residency.desc')}</p>
                    </div>
                    <div className="bf-service-card">
                        <div className="bf-service-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                        </div>
                        <h3>{t('bf.services.operations.title')}</h3>
                        <p className="text-body">{t('bf.services.operations.desc')}</p>
                    </div>
                    <div className="bf-service-card">
                        <div className="bf-service-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        </div>
                        <h3>{t('bf.services.realestate.title')}</h3>
                        <p className="text-body">{t('bf.services.realestate.desc')}</p>
                    </div>
                    <div className="bf-service-card">
                        <div className="bf-service-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <h3>{t('bf.services.wealth.title')}</h3>
                        <p className="text-body">{t('bf.services.wealth.desc')}</p>
                    </div>
                </div>
            </section>

            {/* 6. Models — Tabs */}
            <section>
                <span className="label">{t('bf.models.label')}</span>
                <h2>{t('bf.models.title')}</h2>
                <div className="bf-model-tabs">
                    <button
                        className={`bf-tab ${activeModel === 'referral' ? 'bf-tab--active' : ''}`}
                        onClick={() => switchModel('referral')}
                    >
                        {t('bf.models.referral.tab')}
                    </button>
                    <button
                        className={`bf-tab ${activeModel === 'whitelabel' ? 'bf-tab--active' : ''}`}
                        onClick={() => switchModel('whitelabel')}
                    >
                        {t('bf.models.whitelabel.tab')}
                    </button>
                </div>

                {activeModel === 'referral' ? (
                    <div className="bf-model-content">
                        <h3>{t('bf.models.referral.title')}</h3>
                        <p className="text-body">{t('bf.models.referral.desc')}</p>
                        <div className="bf-model-flow">
                            <div className="bf-model-step">
                                <span className="bf-model-step-num">1</span>
                                <span>{t('bf.models.referral.step1')}</span>
                            </div>
                            <div className="bf-model-step">
                                <span className="bf-model-step-num">2</span>
                                <span>{t('bf.models.referral.step2')}</span>
                            </div>
                            <div className="bf-model-step">
                                <span className="bf-model-step-num">3</span>
                                <span>{t('bf.models.referral.step3')}</span>
                            </div>
                        </div>
                        <div className="bf-model-highlight">
                            <strong>{t('bf.models.referral.highlight')}</strong>
                        </div>
                    </div>
                ) : (
                    <div className="bf-model-content">
                        <h3>{t('bf.models.whitelabel.title')}</h3>
                        <p className="text-body">{t('bf.models.whitelabel.desc')}</p>
                        <div className="bf-model-flow">
                            <div className="bf-model-step">
                                <span className="bf-model-step-num">1</span>
                                <span>{t('bf.models.whitelabel.step1')}</span>
                            </div>
                            <div className="bf-model-step">
                                <span className="bf-model-step-num">2</span>
                                <span>{t('bf.models.whitelabel.step2')}</span>
                            </div>
                            <div className="bf-model-step">
                                <span className="bf-model-step-num">3</span>
                                <span>{t('bf.models.whitelabel.step3')}</span>
                            </div>
                        </div>
                        <div className="bf-model-highlight">
                            <strong>{t('bf.models.whitelabel.highlight')}</strong>
                        </div>
                    </div>
                )}
            </section>

            {/* 7. Result Statement */}
            <section className="bf-result-section">
                <div className="bf-result-card">
                    <span className="label">{t('bf.result.label')}</span>
                    <h2 className="bf-result-heading">{t('bf.result.title')}</h2>
                    <div className="bf-result-items">
                        <div className="bf-result-item">
                            <span className="bf-result-check">✓</span>
                            <span>{t('bf.result.item1')}</span>
                        </div>
                        <div className="bf-result-item">
                            <span className="bf-result-check">✓</span>
                            <span>{t('bf.result.item2')}</span>
                        </div>
                        <div className="bf-result-item">
                            <span className="bf-result-check">✓</span>
                            <span>{t('bf.result.item3')}</span>
                        </div>
                        <div className="bf-result-item">
                            <span className="bf-result-check">✓</span>
                            <span>{t('bf.result.item4')}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Case Study */}
            <section className="bf-case-section">
                <span className="label">{t('bf.case.label')}</span>
                <h2>{t('bf.case.title')}</h2>
                <div className="bf-case-card">
                    <div className="bf-case-header">
                        <span className="bf-case-tag">{t('bf.case.tag')}</span>
                    </div>
                    <div className="bf-case-body">
                        <div className="bf-case-row">
                            <span className="bf-case-label">{t('bf.case.situation.label')}</span>
                            <p>{t('bf.case.situation.text')}</p>
                        </div>
                        <div className="bf-case-row">
                            <span className="bf-case-label">{t('bf.case.wtp.label')}</span>
                            <p>{t('bf.case.wtp.text')}</p>
                        </div>
                        <div className="bf-case-result">
                            <span className="bf-case-label">{t('bf.case.result.label')}</span>
                            <p>{t('bf.case.result.text')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Post-case CTA */}
            <section className="bf-mid-cta">
                <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 'bf_casestudy')}>
                    {t('bf.hero.cta.prescreen')}
                </Button>
                <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 'bf_casestudy')}>
                    {t('bf.hero.cta.catalog')}
                </Button>
            </section>

            {/* 9. Boundaries (Pratfall Effect) */}
            <section>
                <span className="label">{t('bf.bounds.label')}</span>
                <h2>{t('bf.bounds.title')}</h2>
                <div className="bf-bounds-grid">
                    <div className="bf-bounds-col bf-bounds-do">
                        <h3>
                            <span className="bf-bounds-dot bf-bounds-dot--green" />
                            {t('bf.bounds.do.title')}
                        </h3>
                        <ul>
                            <li>{t('bf.bounds.do.item1')}</li>
                            <li>{t('bf.bounds.do.item2')}</li>
                            <li>{t('bf.bounds.do.item3')}</li>
                            <li>{t('bf.bounds.do.item4')}</li>
                        </ul>
                    </div>
                    <div className="bf-bounds-col bf-bounds-dont">
                        <h3>
                            <span className="bf-bounds-dot bf-bounds-dot--red" />
                            {t('bf.bounds.dont.title')}
                        </h3>
                        <ul>
                            <li>{t('bf.bounds.dont.item1')}</li>
                            <li>{t('bf.bounds.dont.item2')}</li>
                            <li>{t('bf.bounds.dont.item3')}</li>
                            <li>{t('bf.bounds.dont.item4')}</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 10. FAQ */}
            <section>
                <span className="label">{t('bf.faq.label')}</span>
                <h2>{t('bf.faq.title')}</h2>
                <div className="bf-faq-list">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className={`bf-faq-item ${openFaq === i ? 'bf-faq-item--open' : ''}`}>
                            <button
                                className="bf-faq-question"
                                onClick={() => toggleFaq(i)}
                                aria-expanded={openFaq === i}
                                aria-controls={`bf-faq-answer-${i}`}
                                id={`bf-faq-q-${i}`}
                            >
                                <span>{t(`bf.faq.q${i}`)}</span>
                                <svg
                                    className="bf-faq-chevron"
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
                                    className="bf-faq-answer"
                                    id={`bf-faq-answer-${i}`}
                                    role="region"
                                    aria-labelledby={`bf-faq-q-${i}`}
                                >
                                    <p className="text-body">{t(`bf.faq.a${i}`)}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 11. Final CTA */}
            <section className="bf-final-cta">
                <h2 className="bf-final-title">{t('bf.cta.title')}</h2>
                <p className="text-body bf-final-subtitle">
                    {t('bf.cta.text')}
                </p>
                <div className="bf-final-buttons">
                    <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 'bf_final')}>
                        {t('bf.cta.primary')}
                    </Button>
                    <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 'bf_final')}>
                        {t('bf.cta.secondary')}
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default BankingFirstLandingPage
