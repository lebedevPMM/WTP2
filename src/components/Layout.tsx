import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import NavbarMinimal from './NavbarMinimal'
import Footer from './Footer'
import CookieBanner from './CookieBanner'
import { hasAnalyticsConsent } from '../lib/consent'
import { initGA4, trackPageView } from '../lib/analytics'
import { useLanguage } from '../lib/LanguageContext'
import { IS_FOCUSED_LANDING, getDomain } from '../config/landing'

const Layout: React.FC = () => {
    const { pathname } = useLocation()
    const { lang, t } = useLanguage()

    useEffect(() => {
        if (hasAnalyticsConsent()) {
            initGA4()
        }
    }, [])

    // Keep the (static) canonical tag pointing at the self-canonical URL of the current
    // route. Uses the build-time canonical host (getDomain), NOT window.location, so that
    // visitors arriving via a path-duplicate or *.pages.dev host still canonicalize to the
    // subdomain. Static hreflang/canonical for landing roots are injected at build time
    // (htmlMetaPlugin); this updater only refreshes canonical for SPA sub-routes.
    // Shared routes (legal/contact/etc.) render on every subdomain build — canonicalize
    // them to the ROOT host so the 5 copies consolidate to one indexable page.
    useEffect(() => {
        const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
        if (!canonical) return
        const SHARED_ROUTES = ['/privacy', '/terms-of-service', '/contact', '/submit-case', '/partner-kit', '/library', '/documents']
        const rootHost = lang === 'en' ? 'https://wtp.ae' : 'https://wtpref.ru'
        const host = SHARED_ROUTES.includes(pathname) ? rootHost : getDomain(lang as 'en' | 'ru')
        canonical.href = `${host}${pathname}`
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
