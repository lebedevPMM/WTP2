import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import ProcessStep from '../components/ProcessStep'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick } from '../lib/analytics'
import './RealEstateLandingPage.css'

const RealEstateLandingPage: React.FC = () => {
    const { t } = useLanguage()

    return (
        <div className="container">
            {/* Hero */}
            <section className="hero-section">
                <div className="hero-bg-effect" />
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {t('reLanding.back')}
                    </Link>
                </div>
                <span className="label">{t('reLanding.label')}</span>
                <h1>{t('reLanding.hero.title')}</h1>
                <p className="subtitle">
                    {t('reLanding.hero.subtitle')}
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 're_landing_hero')}>
                        {t('reLanding.hero.cta')}
                    </Button>
                    <Button href="#process" variant="outline" onClick={() => trackCtaClick('see_process', 're_landing_hero')}>
                        {t('reLanding.hero.ctaSecondary')}
                    </Button>
                </div>
            </section>

            {/* Problem Section */}
            <section>
                <span className="label">{t('reLanding.problem.label')}</span>
                <h2>{t('reLanding.problem.title')}</h2>
                <div className="grid-3 re-problem-grid">
                    <Card accentGradient="var(--accent-magma)" hasAccentTop>
                        <div>
                            <h3 className="card-heading">{t('reLanding.problem.banking.title')}</h3>
                            <p className="text-body">{t('reLanding.problem.banking.text')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-gold)" hasAccentTop>
                        <div>
                            <h3 className="card-heading">{t('reLanding.problem.visa.title')}</h3>
                            <p className="text-body">{t('reLanding.problem.visa.text')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-teal)" hasAccentTop>
                        <div>
                            <h3 className="card-heading">{t('reLanding.problem.tax.title')}</h3>
                            <p className="text-body">{t('reLanding.problem.tax.text')}</p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Solution Section */}
            <section>
                <span className="label">{t('reLanding.solution.label')}</span>
                <div className="grid-2">
                    <div>
                        <h2>{t('reLanding.solution.title')}</h2>
                    </div>
                    <div className="flex-col">
                        <p className="text-body">{t('reLanding.solution.text')}</p>
                    </div>
                </div>
                <div className="grid-2 re-solution-cards">
                    <div className="re-solution-item">
                        <div className="re-solution-number">01</div>
                        <h3>{t('reLanding.solution.point1.title')}</h3>
                        <p className="text-body">{t('reLanding.solution.point1.text')}</p>
                    </div>
                    <div className="re-solution-item">
                        <div className="re-solution-number">02</div>
                        <h3>{t('reLanding.solution.point2.title')}</h3>
                        <p className="text-body">{t('reLanding.solution.point2.text')}</p>
                    </div>
                    <div className="re-solution-item">
                        <div className="re-solution-number">03</div>
                        <h3>{t('reLanding.solution.point3.title')}</h3>
                        <p className="text-body">{t('reLanding.solution.point3.text')}</p>
                    </div>
                    <div className="re-solution-item">
                        <div className="re-solution-number">04</div>
                        <h3>{t('reLanding.solution.point4.title')}</h3>
                        <p className="text-body">{t('reLanding.solution.point4.text')}</p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section>
                <span className="label">{t('reLanding.services.label')}</span>
                <h2>{t('reLanding.services.title')}</h2>
                <div className="grid-3 re-services-grid">
                    <Card style={{ minHeight: '200px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
                                {t('reLanding.svc1.title')}
                            </h3>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t('reLanding.svc1.text')}</p>
                        </div>
                    </Card>
                    <Card style={{ minHeight: '200px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
                                {t('reLanding.svc2.title')}
                            </h3>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t('reLanding.svc2.text')}</p>
                        </div>
                    </Card>
                    <Card style={{ minHeight: '200px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
                                {t('reLanding.svc3.title')}
                            </h3>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t('reLanding.svc3.text')}</p>
                        </div>
                    </Card>
                    <Card style={{ minHeight: '200px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
                                {t('reLanding.svc4.title')}
                            </h3>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t('reLanding.svc4.text')}</p>
                        </div>
                    </Card>
                    <Card style={{ minHeight: '200px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
                                {t('reLanding.svc5.title')}
                            </h3>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t('reLanding.svc5.text')}</p>
                        </div>
                    </Card>
                    <Card style={{ minHeight: '200px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
                                {t('reLanding.svc6.title')}
                            </h3>
                            <p className="text-body" style={{ fontSize: '13px' }}>{t('reLanding.svc6.text')}</p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Market Insight */}
            <section className="re-market-section">
                <span className="label">{t('reLanding.market.label')}</span>
                <h2>{t('reLanding.market.title')}</h2>
                <div className="grid-3 re-market-grid">
                    <div className="re-market-card">
                        <div className="re-market-value">{t('reLanding.market.stat1.value')}</div>
                        <div className="re-market-label">{t('reLanding.market.stat1.label')}</div>
                        <p className="text-body" style={{ marginTop: '16px', fontSize: '13px' }}>
                            {t('reLanding.market.stat1.text')}
                        </p>
                    </div>
                    <div className="re-market-card">
                        <div className="re-market-value">{t('reLanding.market.stat2.value')}</div>
                        <div className="re-market-label">{t('reLanding.market.stat2.label')}</div>
                        <p className="text-body" style={{ marginTop: '16px', fontSize: '13px' }}>
                            {t('reLanding.market.stat2.text')}
                        </p>
                    </div>
                    <div className="re-market-card">
                        <div className="re-market-value">{t('reLanding.market.stat3.value')}</div>
                        <div className="re-market-label">{t('reLanding.market.stat3.label')}</div>
                        <p className="text-body" style={{ marginTop: '16px', fontSize: '13px' }}>
                            {t('reLanding.market.stat3.text')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section id="process">
                <span className="label">{t('reLanding.process.label')}</span>
                <h2>{t('reLanding.process.title')}</h2>
                <div className="re-process-grid">
                    <ProcessStep number="01" title={t('reLanding.process.step1.title')} description={t('reLanding.process.step1.desc')} active />
                    <ProcessStep number="02" title={t('reLanding.process.step2.title')} description={t('reLanding.process.step2.desc')} />
                    <ProcessStep number="03" title={t('reLanding.process.step3.title')} description={t('reLanding.process.step3.desc')} />
                    <ProcessStep number="04" title={t('reLanding.process.step4.title')} description={t('reLanding.process.step4.desc')} />
                    <ProcessStep number="05" title={t('reLanding.process.step5.title')} description={t('reLanding.process.step5.desc')} />
                </div>
            </section>

            {/* Red Flags */}
            <section>
                <span className="label">{t('reLanding.redflags.label')}</span>
                <h2>{t('reLanding.redflags.title')}</h2>
                <div className="re-redflags-list">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="re-redflag-item">
                            <div className="re-redflag-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                            <p className="text-body" style={{ color: 'var(--text-primary)' }}>
                                {t(`reLanding.redflags.item${i}`)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 120px auto' }}>
                <h2 style={{ fontSize: '32px' }}>{t('reLanding.cta.title')}</h2>
                <p className="text-body" style={{ marginBottom: '32px' }}>
                    {t('reLanding.cta.text')}
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 're_landing_bottom')}>
                        {t('reLanding.cta.primary')}
                    </Button>
                    <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 're_landing_bottom')}>
                        {t('reLanding.cta.secondary')}
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default RealEstateLandingPage
