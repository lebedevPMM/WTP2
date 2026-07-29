import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick } from '../lib/analytics'
import './ClientLandingPage.css'

const JURISDICTIONS = ['uae', 'sg', 'pt', 'ch', 'mt'] as const
const COMPARE_COLS = ['jurisdiction', 'corpTax', 'setup', 'banking', 'visa', 'substance'] as const

const ClientLandingPage: React.FC = () => {
    const { t, tRich } = useLanguage()

    return (
        <div className="container">
            {/* 1. Hero */}
            <section className="cl-hero">
                <span className="label">{t('cl.hero.label')}</span>
                <h1>{t('cl.hero.title')}</h1>
                <p className="subtitle">{tRich('cl.hero.subtitle')}</p>
                <Button href="/roadmap" onClick={() => trackCtaClick('roadmap', 'client_hero')}>
                    {t('cl.hero.cta')}
                </Button>
                <p className="cl-hero-sub">{t('cl.hero.ctaSub')}</p>
            </section>

            {/* 2. Bridge — exit | connector | entry */}
            <section>
                <span className="label">{t('cl.bridge.label')}</span>
                <h2>{t('cl.bridge.title')}</h2>
                <div className="cl-bridge-grid">
                    <div className="cl-bridge-card">
                        <h3>{t('cl.bridge.exitTitle')}</h3>
                        <p className="text-body">{tRich('cl.bridge.exitDesc')}</p>
                    </div>
                    <div className="cl-bridge-connector">
                        <span className="cl-bridge-label">{t('cl.bridge.bridgeTitle')}</span>
                    </div>
                    <div className="cl-bridge-card">
                        <h3>{t('cl.bridge.entryTitle')}</h3>
                        <p className="text-body">{tRich('cl.bridge.entryDesc')}</p>
                    </div>
                </div>
                <p className="cl-bridge-note">{tRich('cl.bridge.otherCountry')}</p>
            </section>

            {/* 3. Who This Is For */}
            <section>
                <span className="label">{t('cl.who.label')}</span>
                <h2>{t('cl.who.title')}</h2>
                <div className="cl-who-grid">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="cl-who-card">
                            <h3>{t(`cl.who.card${i}.title`)}</h3>
                            <p className="text-body">{tRich(`cl.who.card${i}.desc`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Banking-First Method (dark section) */}
            <section className="cl-method">
                <span className="label">{t('cl.method.label')}</span>
                <h2>{t('cl.method.title')}</h2>
                <p className="subtitle">{tRich('cl.method.subtitle')}</p>
                <div className="cl-method-grid">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="cl-method-step">
                            <span className="cl-method-num">{t(`cl.method.step${i}.num`)}</span>
                            <h3>{t(`cl.method.step${i}.title`)}</h3>
                            <p>{tRich(`cl.method.step${i}.desc`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Jurisdiction Comparison */}
            <section>
                <span className="label">{t('cl.compare.label')}</span>
                <h2>{t('cl.compare.title')}</h2>
                <table className="cl-compare-table">
                    <thead>
                        <tr>
                            {COMPARE_COLS.map((col) => (
                                <th key={col}>{t(`cl.compare.col.${col}`)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {JURISDICTIONS.map((jur) => (
                            <tr key={jur} className={jur === 'uae' ? 'cl-compare-highlight' : ''}>
                                <td>{t(`cl.compare.${jur}.name`)}</td>
                                <td>{t(`cl.compare.${jur}.tax`)}</td>
                                <td>{t(`cl.compare.${jur}.setup`)}</td>
                                <td>{t(`cl.compare.${jur}.banking`)}</td>
                                <td>{t(`cl.compare.${jur}.visa`)}</td>
                                <td>{t(`cl.compare.${jur}.substance`)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="cl-compare-conclusion">{tRich('cl.compare.conclusion')}</p>
            </section>

            {/* 6. How We're Different */}
            <section>
                <span className="label">{t('cl.diff.label')}</span>
                <h2>{t('cl.diff.title')}</h2>
                <div className="cl-diff-grid">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="cl-diff-item">
                            <h3>{t(`cl.diff.item${i}.title`)}</h3>
                            <p>{tRich(`cl.diff.item${i}.desc`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. Common Scenarios */}
            <section>
                <span className="label">{t('cl.scenarios.label')}</span>
                <h2>{t('cl.scenarios.title')}</h2>
                <div className="cl-scenarios-grid">
                    <div className="cl-scenario-card">
                        <h3>{t('cl.scenarios.uk.title')}</h3>
                        <p>{tRich('cl.scenarios.uk.desc')}</p>
                        <Link to="/uk-non-dom" className="cl-scenario-link">
                            {t('cl.scenarios.uk.link')} &rarr;
                        </Link>
                    </div>
                    <div className="cl-scenario-card">
                        <h3>{t('cl.scenarios.de.title')}</h3>
                        <p>{tRich('cl.scenarios.de.desc')}</p>
                        <Link to="/german-exit-tax" className="cl-scenario-link">
                            {t('cl.scenarios.de.link')} &rarr;
                        </Link>
                    </div>
                    <div className="cl-scenario-card">
                        <h3>{t('cl.scenarios.nl.title')}</h3>
                        <p>{tRich('cl.scenarios.nl.desc')}</p>
                        <Link to="/dutch-box3" className="cl-scenario-link">
                            {t('cl.scenarios.nl.link')} &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* 8. FAQ */}
            <section>
                <span className="label">{t('cl.faq.label')}</span>
                <h2>{t('cl.faq.title')}</h2>
                <div className="cl-faq-list">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <details key={i} className="cl-faq-item">
                            <summary>
                                <span>{t(`cl.faq.q${i}`)}</span>
                                <svg
                                    className="cl-faq-chevron"
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
                            </summary>
                            <div className="cl-faq-answer">
                                <p>{tRich(`cl.faq.a${i}`)}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            {/* 9. Final CTA */}
            <section className="cl-final-cta">
                <h2>{t('cl.cta.title')}</h2>
                <p className="text-body">{tRich('cl.cta.text')}</p>
                <Button href="/roadmap" onClick={() => trackCtaClick('roadmap', 'client_final')}>
                    {t('cl.cta.button')}
                </Button>
                <p className="cl-final-sub">{t('cl.cta.sub')}</p>
            </section>
        </div>
    )
}

export default ClientLandingPage
