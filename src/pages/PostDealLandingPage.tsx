import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useLanguage } from '../lib/LanguageContext'
import { trackCtaClick, trackEvent } from '../lib/analytics'
import './PostDealLandingPage.css'

const WA_MESSAGES = {
    en: "Hello, I'd like to refer a client for after-sale services (visas/banking/setup). My name is [NAME], I work at [AGENCY].",
    ru: 'Здравствуйте, хочу направить клиента на after-sale услуги (визы/банки/регистрация). Меня зовут [ИМЯ], я работаю в [АГЕНТСТВО].',
}

const WA_DOWNLOAD_MESSAGES = {
    en: "Hello, I'd like to receive the Commission Rate Card (PDF). My name is [NAME], I work at [AGENCY].",
    ru: 'Здравствуйте, хотел бы получить карточку комиссий (PDF). Меня зовут [ИМЯ], я работаю в [АГЕНТСТВО].',
}

const PostDealLandingPage: React.FC = () => {
    const { t, tRich, lang } = useLanguage()
    const WA_LINK = 'https://wa.me/971600575294?text=' + encodeURIComponent(WA_MESSAGES[lang])
    const WA_DOWNLOAD_LINK = 'https://wa.me/971600575294?text=' + encodeURIComponent(WA_DOWNLOAD_MESSAGES[lang])
    const [clients, setClients] = useState(1)

    const commissionPerClient = 3500
    const monthly = clients * commissionPerClient
    const yearly = monthly * 12

    const formatMoney = (n: number) =>
        '$' + n.toLocaleString('en-US')

    const handleSlider = (val: number) => {
        setClients(val)
        trackEvent('money_math_slider', { clients: val, monthly: val * commissionPerClient, yearly: val * commissionPerClient * 12 })
    }

    const waClick = (source: string) => {
        trackCtaClick('whatsapp', `pd_${source}`)
        trackEvent('whatsapp_click', { source })
    }

    const dlClick = (source: string) => {
        trackCtaClick('download', `pd_${source}`)
        trackEvent('download_click', { source })
    }

    return (
        <div className="container">
            {/* 1. Hero */}
            <section className="hero-section pd-hero">
                <div className="hero-bg-effect pd-hero-glow" />
                <div className="label" style={{ marginBottom: '32px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {t('pd.back')}
                    </Link>
                </div>
                <span className="label">{t('pd.hero.label')}</span>
                <h1>{t('pd.hero.title')}</h1>
                <p className="subtitle">{tRich('pd.hero.subtitle')}</p>
                <div className="pd-hero-ctas">
                    <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pd-wa-btn"
                        onClick={() => waClick('hero')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        {t('pd.hero.cta.whatsapp')}
                    </a>
                    <a
                        href={WA_DOWNLOAD_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pd-wa-btn pd-wa-btn-outline"
                        onClick={() => dlClick('hero')}
                    >
                        {t('pd.hero.cta.download')}
                    </a>
                </div>
            </section>

            {/* 2. Money Math */}
            <section className="pd-math-section" id="pd-math">
                <span className="label">{t('pd.math.label')}</span>
                <h2>{t('pd.math.title')}</h2>
                <div className="pd-math-table">
                    <div className="pd-math-row">
                        <span className="pd-math-service">{t('pd.math.setup.label')}</span>
                        <span className="pd-math-commission">{t('pd.math.setup.commission')}</span>
                    </div>
                    <div className="pd-math-row">
                        <span className="pd-math-service">{t('pd.math.visa.label')}</span>
                        <span className="pd-math-commission">{t('pd.math.visa.commission')}</span>
                    </div>
                    <div className="pd-math-row">
                        <span className="pd-math-service">{t('pd.math.retainer.label')}</span>
                        <span className="pd-math-commission">{t('pd.math.retainer.commission')}</span>
                    </div>
                    <div className="pd-math-row pd-math-total">
                        <span>{t('pd.math.total')}</span>
                    </div>
                </div>

                {/* Slider */}
                <div className="pd-slider-wrap">
                    <label htmlFor="pd-slider" className="pd-slider-label">{t('pd.math.slider.label')}</label>
                    <div className="pd-slider-row">
                        <span className="pd-slider-val">{clients}</span>
                        <input
                            id="pd-slider"
                            type="range"
                            min={1}
                            max={10}
                            value={clients}
                            aria-valuemin={1}
                            aria-valuemax={10}
                            aria-valuenow={clients}
                            aria-label={t('pd.math.slider.label')}
                            onChange={(e) => handleSlider(Number(e.target.value))}
                            className="pd-slider"
                        />
                        <span className="pd-slider-val">10</span>
                    </div>
                    <div className="pd-slider-result">
                        <span className="pd-slider-amount">{formatMoney(monthly)}{t('pd.math.slider.monthly')}</span>
                        <span className="pd-slider-amount-yearly">= {formatMoney(yearly)}{t('pd.math.slider.yearly')}</span>
                    </div>
                </div>

                {/* Zero badges */}
                <div className="pd-zero-row">
                    <div className="pd-zero-badge">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                        <span>{t('pd.math.zero.cost')}</span>
                    </div>
                    <div className="pd-zero-badge">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>{t('pd.math.zero.time')}</span>
                    </div>
                    <div className="pd-zero-badge">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <span>{t('pd.math.zero.risk')}</span>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="pd-wa-btn" onClick={() => waClick('math')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        {t('pd.math.cta')}
                    </a>
                </div>
            </section>

            {/* 3. Pain / FOMO */}
            <section>
                <span className="label">{t('pd.pain.label')}</span>
                <h2>{t('pd.pain.title')}</h2>
                <div className="pd-pain-grid">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="pd-pain-card">
                            <h3 className="pd-pain-need">{t(`pd.pain.card${i}.need`)}</h3>
                            <p className="pd-pain-budget">{t(`pd.pain.card${i}.budget`)}</p>
                            <p className="pd-pain-commission">{t(`pd.pain.card${i}.commission`)}</p>
                        </div>
                    ))}
                </div>
                <div className="pd-pain-transition">
                    <p>{t('pd.pain.transition')}</p>
                </div>
            </section>

            {/* 4. Process — "Easier than selling an apartment" */}
            <section>
                <span className="label">{t('pd.process.label')}</span>
                <h2>{t('pd.process.title')}</h2>
                <div className="pd-process-steps">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="pd-process-step">
                            <div className="pd-process-num">{t(`pd.process.step${i}.number`)}</div>
                            <h3>{t(`pd.process.step${i}.title`)}</h3>
                            <p className="text-body">{tRich(`pd.process.step${i}.desc`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Services (3 cards) */}
            <section>
                <span className="label">{t('pd.services.label')}</span>
                <h2>{t('pd.services.title')}</h2>
                <div className="pd-services-grid">
                    {/* Banking */}
                    <div className="pd-service-card">
                        <div className="pd-service-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>
                        </div>
                        <h3>{t('pd.services.banking.title')}</h3>
                        <p className="text-body">{tRich('pd.services.banking.desc')}</p>
                        <span className="pd-service-commission">{t('pd.services.banking.commission')}</span>
                    </div>
                    {/* Visa */}
                    <div className="pd-service-card">
                        <div className="pd-service-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 00-16 0"/><path d="M12 2v1M4.93 4.93l.7.7M2 12h1M4.93 19.07l.7-.7M12 22v-1M19.07 19.07l-.7-.7M22 12h-1M19.07 4.93l-.7.7"/></svg>
                        </div>
                        <h3>{t('pd.services.visa.title')}</h3>
                        <p className="text-body">{tRich('pd.services.visa.desc')}</p>
                        <span className="pd-service-commission">{t('pd.services.visa.commission')}</span>
                    </div>
                    {/* Asset */}
                    <div className="pd-service-card">
                        <div className="pd-service-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <h3>{t('pd.services.asset.title')}</h3>
                        <p className="text-body">{tRich('pd.services.asset.desc')}</p>
                        <span className="pd-service-commission">{t('pd.services.asset.commission')}</span>
                    </div>
                </div>
            </section>

            {/* 6. Social Proof */}
            <section className="pd-proof-bar">
                <div className="pd-proof-item">
                    <span className="pd-proof-number">{t('pd.proof.partners.value')}</span>
                    <span className="pd-proof-label">{t('pd.proof.partners.label')}</span>
                </div>
                <div className="pd-proof-divider" />
                <div className="pd-proof-item">
                    <span className="pd-proof-number">{t('pd.proof.cases.value')}</span>
                    <span className="pd-proof-label">{t('pd.proof.cases.label')}</span>
                </div>
                <div className="pd-proof-divider" />
                <div className="pd-proof-item">
                    <span className="pd-proof-number">{t('pd.proof.payout.value')}</span>
                    <span className="pd-proof-label">{t('pd.proof.payout.label')}</span>
                </div>
            </section>

            {/* Trust Seals */}
            <div className="pd-trust-seals">
                <span className="pd-trust-seal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    {t('pd.trust.nda')}
                </span>
                <span className="pd-trust-seal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    {t('pd.trust.licensed')}
                </span>
                <span className="pd-trust-seal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {t('pd.trust.payout')}
                </span>
            </div>

            {/* 7. Case Study */}
            <section>
                <span className="label">{t('pd.case.label')}</span>
                <h2>{t('pd.case.title')}</h2>
                <div className="pd-case-card">
                    <div className="pd-case-header">
                        <span className="pd-case-tag">{t('pd.case.tag')}</span>
                    </div>
                    <div className="pd-case-body">
                        <div className="pd-case-row">
                            <span className="pd-case-label">{t('pd.case.situation.label')}</span>
                            <p>{tRich('pd.case.situation.text')}</p>
                        </div>
                        <div className="pd-case-row">
                            <span className="pd-case-label">{t('pd.case.action.label')}</span>
                            <p>{tRich('pd.case.action.text')}</p>
                        </div>
                        <div className="pd-case-result">
                            <span className="pd-case-label">{t('pd.case.result.label')}</span>
                            <p>{tRich('pd.case.result.text')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Post-case CTA */}
            <div className="pd-mid-cta">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="pd-wa-btn" onClick={() => waClick('casestudy')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {t('pd.hero.cta.whatsapp')}
                </a>
            </div>

            {/* 8. Objection Buster */}
            <section>
                <span className="label">{t('pd.objections.label')}</span>
                <h2>{t('pd.objections.title')}</h2>
                <div className="pd-objections-grid">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="pd-objection-card">
                            <h3>{t(`pd.objections.q${i}`)}</h3>
                            <p className="text-body">{tRich(`pd.objections.a${i}`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 9. Lead Magnet */}
            <section className="pd-magnet-section" id="pd-magnet">
                <h2>{t('pd.magnet.title')}</h2>
                <p className="pd-magnet-sub">{t('pd.magnet.subtitle')}</p>
                <ul className="pd-magnet-list">
                    <li>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D8B4E" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {t('pd.magnet.bullet1')}
                    </li>
                    <li>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D8B4E" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {t('pd.magnet.bullet2')}
                    </li>
                    <li>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D8B4E" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {t('pd.magnet.bullet3')}
                    </li>
                </ul>
                <a
                    href={WA_DOWNLOAD_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-wa-btn pd-wa-btn-outline"
                    onClick={() => dlClick('magnet')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {t('pd.magnet.cta')}
                </a>
            </section>

            {/* 10. Final CTA */}
            <section style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 120px auto' }}>
                <h2 style={{ fontSize: '32px' }}>{t('pd.cta.title')}</h2>
                <p className="text-body" style={{ marginBottom: '32px' }}>
                    {tRich('pd.cta.subtitle')}
                </p>
                <div className="pd-hero-ctas" style={{ justifyContent: 'center' }}>
                    <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pd-wa-btn"
                        onClick={() => waClick('final')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        {t('pd.cta.whatsapp')}
                    </a>
                    <a
                        href={WA_DOWNLOAD_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pd-wa-btn pd-wa-btn-outline"
                        onClick={() => dlClick('final')}
                    >
                        {t('pd.cta.download')}
                    </a>
                </div>
            </section>

            {/* Sticky Mobile CTA */}
            <div className="pd-sticky">
                <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-sticky-btn"
                    onClick={() => { waClick('sticky'); trackEvent('sticky_cta_click', { mobile: true }) }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {t('pd.hero.cta.whatsapp')}
                </a>
            </div>
        </div>
    )
}

export default PostDealLandingPage
