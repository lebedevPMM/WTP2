import React from 'react'
import Button from '../components/Button'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick } from '../lib/analytics'

interface SpokePageProps {
    market: 'uk' | 'de' | 'nl'
}

const SpokePage: React.FC<SpokePageProps> = ({ market }) => {
    const { t } = useLanguage()
    const p = `cl.${market}` // translation prefix

    return (
        <div className="container">
            {/* Hero */}
            <section className="hero-section" style={{ textAlign: 'center' }}>
                <span className="label">{t(`${p}.label`)}</span>
                <h1>{t(`${p}.title`)}</h1>
                <p className="subtitle">{t(`${p}.subtitle`)}</p>
            </section>

            {/* What changed */}
            <section>
                <h2>{t(`${p}.trigger.title`)}</h2>
                <p className="text-body">{t(`${p}.trigger.desc`)}</p>
            </section>

            {/* What's at stake */}
            <section>
                <h2>{t(`${p}.risk.title`)}</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {[1, 2, 3].map((i) => (
                        <li
                            key={i}
                            style={{
                                padding: '12px 0',
                                borderBottom: '1px solid var(--border-subtle)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                fontSize: '15px',
                                lineHeight: '1.6',
                            }}
                        >
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '8px',
                                    height: '8px',
                                    minWidth: '8px',
                                    borderRadius: '50%',
                                    background: '#ef4444',
                                    marginTop: '7px',
                                }}
                                aria-hidden="true"
                            />
                            <span>{t(`${p}.risk.item${i}`)}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* How we coordinate */}
            <section>
                <h2>{t(`${p}.exit.title`)}</h2>
                <p className="text-body">{t(`${p}.exit.desc`)}</p>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '60px 0 120px' }}>
                <Button href="/roadmap" onClick={() => trackCtaClick('roadmap', `spoke_${market}`)}>
                    {t(`${p}.cta`)}
                </Button>
                <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '12px' }}>
                    {t('cl.hero.ctaSub')}
                </p>
            </section>
        </div>
    )
}

export default SpokePage
