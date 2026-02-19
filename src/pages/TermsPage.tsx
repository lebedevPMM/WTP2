import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { useLanguage } from '../lib/LanguageContext'

const TermsPage: React.FC = () => {
    const { t } = useLanguage()

    return (
        <div className="container" style={{ paddingBottom: '120px' }}>
            <section className="hero-section" style={{ minHeight: 'auto', marginBottom: '80px' }}>
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/#process" style={{ textDecoration: 'none', color: 'inherit' }}>{t('terms.back')}</Link>
                </div>
                <h1>{t('terms.title')}</h1>
                <div className="label" style={{ marginBottom: '16px' }}>{t('terms.label')}</div>
                <p className="subtitle" style={{ marginBottom: 0 }}>
                    {t('terms.subtitle')}
                </p>
            </section>

            {/* Core Principles */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('terms.principles')}</h2>
                    <span className="label">{t('terms.foundation')}</span>
                </div>
                <div className="grid-2">
                    <Card style={{ minHeight: '160px' }}>
                        <h4>{t('terms.bankingFirst')}</h4>
                        <p className="text-body">{t('terms.bankingFirstDesc')}</p>
                    </Card>
                    <Card style={{ minHeight: '160px' }}>
                        <h4>{t('terms.compliance')}</h4>
                        <p className="text-body">{t('terms.complianceDesc')}</p>
                    </Card>
                    <Card style={{ minHeight: '160px' }}>
                        <h4>{t('terms.scope')}</h4>
                        <p className="text-body">{t('terms.scopeDesc')}</p>
                    </Card>
                    <Card style={{ minHeight: '160px' }}>
                        <h4>{t('terms.written')}</h4>
                        <p className="text-body">{t('terms.writtenDesc')}</p>
                    </Card>
                </div>
            </section>

            {/* Risk Verdict */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('terms.riskTitle')}</h2>
                    <span className="label">{t('terms.gatekeeping')}</span>
                </div>
                <div className="grid-3">
                    <Card style={{ height: '100%' }}>
                        <div className="label" style={{ color: '#4CAF50', marginBottom: '16px' }}>{t('terms.accept')}</div>
                        <ul className="text-body" style={{ paddingLeft: '20px', margin: 0 }}>
                            <li>{t('terms.accept1')}</li>
                            <li>{t('terms.accept2')}</li>
                            <li>{t('terms.accept3')}</li>
                            <li>{t('terms.accept4')}</li>
                        </ul>
                    </Card>
                    <Card style={{ height: '100%' }}>
                        <div className="label" style={{ color: '#FFC107', marginBottom: '16px' }}>{t('terms.conditions')}</div>
                        <ul className="text-body" style={{ paddingLeft: '20px', margin: 0, marginBottom: '16px' }}>
                            <li>{t('terms.conditions1')}</li>
                            <li>{t('terms.conditions2')}</li>
                            <li>{t('terms.conditions3')}</li>
                        </ul>
                        <p className="text-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                            {t('terms.conditionsNote')}
                        </p>
                    </Card>
                    <Card style={{ height: '100%' }}>
                        <div className="label" style={{ color: '#F44336', marginBottom: '16px' }}>{t('terms.decline')}</div>
                        <ul className="text-body" style={{ paddingLeft: '20px', margin: 0 }}>
                            <li>{t('terms.decline1')}</li>
                            <li>{t('terms.decline2')}</li>
                            <li>{t('terms.decline3')}</li>
                            <li>{t('terms.decline4')}</li>
                            <li>{t('terms.decline5')}</li>
                        </ul>
                    </Card>
                </div>
            </section>

            {/* What We Never Do */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
                    <h2>{t('terms.neverTitle')}</h2>
                    <span className="label">{t('terms.redLines')}</span>
                </div>
                <div className="grid-2">
                    {[1, 2, 3, 4, 5, 6].map((n, i) => (
                        <div key={i} className="list-item" style={{ borderTop: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <span style={{ color: '#F44336' }}>{'\u2715'}</span>
                                <p className="text-body" style={{ width: '100%', color: 'var(--text-primary)' }}>{t(`terms.never${n}`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default TermsPage
