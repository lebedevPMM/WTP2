import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../lib/LanguageContext'
import { getConsentStatus, setConsentStatus } from '../lib/consent'
import { initGA4, removeGA4Cookies } from '../lib/analytics'

const CookieBanner: React.FC = () => {
    const { t } = useLanguage()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (getConsentStatus() === null) {
            setVisible(true)
        }
    }, [])

    const handleAccept = () => {
        setConsentStatus('accepted')
        initGA4()
        setVisible(false)
    }

    const handleReject = () => {
        setConsentStatus('rejected')
        removeGA4Cookies()
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="cookie-banner" role="dialog" aria-label={t('cookie.ariaLabel')}>
            <div className="cookie-banner-content">
                <p className="cookie-banner-text">
                    {t('cookie.text')}{' '}
                    <Link to="/privacy" className="cookie-banner-link">
                        {t('cookie.learnMore')}
                    </Link>
                </p>
                <div className="cookie-banner-actions">
                    <button className="btn cookie-btn-reject" onClick={handleReject}>
                        {t('cookie.reject')}
                    </button>
                    <button className="btn cookie-btn-accept" onClick={handleAccept}>
                        {t('cookie.accept')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CookieBanner
