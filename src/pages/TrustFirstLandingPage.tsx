import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick } from '../lib/analytics'
import './TrustFirstLandingPage.css'

const TrustFirstLandingPage: React.FC = () => {
    const { t, tRich } = useLanguage()

    return (
        <div className="container">
            {/* Hero */}
            <section className="hero-section">
                <div className="hero-bg-effect" aria-hidden="true" />
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {t('trustLanding.back')}
                    </Link>
                </div>
                <span className="label">{t('trustLanding.label')}</span>
                <h1>{t('trustLanding.hero.title')}</h1>
                <p className="subtitle">
                    {tRich('trustLanding.hero.subtitle')}
                </p>
                <div className="tf-cta-row">
                    <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 'trust_landing_hero')}>
                        {t('trustLanding.hero.cta')}
                    </Button>
                    <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 'trust_landing_hero')}>
                        {t('trustLanding.hero.ctaSecondary')}
                    </Button>
                </div>
            </section>

            {/* Three Principles — Central Block */}
            <section>
                <span className="label">{t('trustLanding.principles.label')}</span>
                <h2>{t('trustLanding.principles.title')}</h2>
                <div className="grid-3 tf-principles-grid">
                    <Card accentGradient="var(--accent-magma)" hasAccentTop>
                        <div>
                            <h3 className="card-heading">{t('trustLanding.principles.protection.title')}</h3>
                            <p className="text-body">{tRich('trustLanding.principles.protection.text')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-gold)" hasAccentTop>
                        <div>
                            <h3 className="card-heading">{t('trustLanding.principles.banking.title')}</h3>
                            <p className="text-body">{tRich('trustLanding.principles.banking.text')}</p>
                        </div>
                    </Card>
                    <Card accentGradient="var(--accent-teal)" hasAccentTop>
                        <div>
                            <h3 className="card-heading">{t('trustLanding.principles.transparency.title')}</h3>
                            <p className="text-body">{tRich('trustLanding.principles.transparency.text')}</p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Competencies — 4 Domains */}
            <section>
                <span className="label">{t('trustLanding.competencies.label')}</span>
                <h2>{t('trustLanding.competencies.title')}</h2>
                <div className="grid-2 tf-competencies-grid">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="tf-competency-item">
                            <div className="tf-competency-number">{String(i).padStart(2, '0')}</div>
                            <h3>{t(`trustLanding.comp${i}.title`)}</h3>
                            <p className="text-body">{tRich(`trustLanding.comp${i}.text`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Engagement Models */}
            <section>
                <span className="label">{t('trustLanding.models.label')}</span>
                <h2>{t('trustLanding.models.title')}</h2>
                <div className="grid-2 tf-models-grid">
                    <Card className="tf-model-recommended">
                        <div>
                            <h3 className="card-heading">{t('trustLanding.models.referral.title')}</h3>
                            <div className="tf-model-detail">
                                <strong>{t('trustLanding.models.mechanicLabel')}</strong>
                                <span>{t('trustLanding.models.referral.mechanic')}</span>
                            </div>
                            <div className="tf-model-detail">
                                <strong>{t('trustLanding.models.roleLabel')}</strong>
                                <span>{t('trustLanding.models.referral.role')}</span>
                            </div>
                            <div className="tf-model-detail">
                                <strong>{t('trustLanding.models.termsLabel')}</strong>
                                <span>{t('trustLanding.models.referral.terms')}</span>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div>
                            <h3 className="card-heading">{t('trustLanding.models.whitelabel.title')}</h3>
                            <div className="tf-model-detail">
                                <strong>{t('trustLanding.models.mechanicLabel')}</strong>
                                <span>{t('trustLanding.models.whitelabel.mechanic')}</span>
                            </div>
                            <div className="tf-model-detail">
                                <strong>{t('trustLanding.models.roleLabel')}</strong>
                                <span>{t('trustLanding.models.whitelabel.role')}</span>
                            </div>
                            <div className="tf-model-detail">
                                <strong>{t('trustLanding.models.termsLabel')}</strong>
                                <span>{t('trustLanding.models.whitelabel.terms')}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Risk Appetite */}
            <section>
                <span className="label">{t('trustLanding.risk.label')}</span>
                <h2>{t('trustLanding.risk.title')}</h2>
                <div className="grid-2 tf-risk-grid">
                    <div className="tf-risk-block tf-risk-accept">
                        <h3>{t('trustLanding.risk.accept.title')}</h3>
                        <p className="text-body">{tRich('trustLanding.risk.accept.text')}</p>
                    </div>
                    <div className="tf-risk-block tf-risk-decline">
                        <h3>{t('trustLanding.risk.decline.title')}</h3>
                        <p className="text-body">{tRich('trustLanding.risk.decline.text')}</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 120px auto' }}>
                <h2 style={{ fontSize: '32px' }}>{t('trustLanding.cta.title')}</h2>
                <p className="text-body" style={{ marginBottom: '32px' }}>
                    {tRich('trustLanding.cta.text')}
                </p>
                <div className="tf-cta-row" style={{ justifyContent: 'center' }}>
                    <Button href="/submit-case" onClick={() => trackCtaClick('submit_case', 'trust_landing_bottom')}>
                        {t('trustLanding.cta.primary')}
                    </Button>
                    <Button href="/partner-kit" variant="outline" onClick={() => trackCtaClick('partner_kit', 'trust_landing_bottom')}>
                        {t('trustLanding.cta.secondary')}
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default TrustFirstLandingPage
