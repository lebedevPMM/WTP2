import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import NavbarMinimal from './NavbarMinimal'
import Footer from './Footer'
import CookieBanner from './CookieBanner'
import { hasAnalyticsConsent } from '../lib/consent'
import { initGA4, trackPageView } from '../lib/analytics'
import { useLanguage, OTHER_DOMAIN } from '../lib/LanguageContext'
import { IS_FOCUSED_LANDING, getDomain } from '../config/landing'

const Layout: React.FC = () => {
    const { pathname } = useLocation()
    const { lang, t } = useLanguage()

    useEffect(() => {
        if (hasAnalyticsConsent()) {
            initGA4()
        }
    }, [])

    // Add hreflang alternate links for SEO (subdomain-aware)
    useEffect(() => {
        const otherLang = lang === 'en' ? 'ru' : 'en'
        const selfDomain = getDomain(lang as 'en' | 'ru')

        const linkSelf = document.createElement('link')
        linkSelf.rel = 'alternate'
        linkSelf.hreflang = lang
        linkSelf.href = `${selfDomain}${pathname}`
        document.head.appendChild(linkSelf)

        const linkOther = document.createElement('link')
        linkOther.rel = 'alternate'
        linkOther.hreflang = otherLang
        linkOther.href = `${OTHER_DOMAIN}${pathname}`
        document.head.appendChild(linkOther)

        return () => {
            document.head.removeChild(linkSelf)
            document.head.removeChild(linkOther)
        }
    }, [pathname, lang])

    useEffect(() => {
        window.scrollTo(0, 0)
        trackPageView(pathname)
    }, [pathname])

    return (
        <>
            <a href="#main-content" className="skip-link">
                {t('a11y.skipToContent')}
            </a>
            {IS_FOCUSED_LANDING ? <NavbarMinimal /> : <Navbar />}
            <main id="main-content">
                <Outlet />
            </main>
            <Footer />
            <CookieBanner />
        </>
    )
}

export default Layout
