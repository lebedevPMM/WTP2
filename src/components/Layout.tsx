import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieBanner from './CookieBanner'
import { hasAnalyticsConsent } from '../lib/consent'
import { initGA4, trackPageView } from '../lib/analytics'
import { useLanguage } from '../lib/LanguageContext'

const Layout: React.FC = () => {
    const { pathname } = useLocation()
    const { t } = useLanguage()

    useEffect(() => {
        if (hasAnalyticsConsent()) {
            initGA4()
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        trackPageView(pathname)
    }, [pathname])

    return (
        <>
            <a href="#main-content" className="skip-link">
                {t('a11y.skipToContent')}
            </a>
            <Navbar />
            <main id="main-content">
                <Outlet />
            </main>
            <Footer />
            <CookieBanner />
        </>
    )
}

export default Layout
