/**
 * GA4 Analytics — lightweight wrapper for gtag
 *
 * GA4 is loaded DYNAMICALLY only after user consent (GDPR/PDPL).
 * If consent is not given, all track* functions are silent no-ops.
 *
 * Events tracked:
 *  - page_view        (SPA route changes)
 *  - form_submit      (Submit Case form)
 *  - pdf_download     (One Pager + Partner Kit docs)
 *  - cta_click        (Submit Case / Partner Kit buttons)
 *  - language_switch  (EN ↔ RU)
 */

import { hasAnalyticsConsent } from './consent'

// GA4 disabled — WTP needs to create their own GA4 property
// and replace this with their Measurement ID (G-XXXXXXXXXX)
const GA4_ID = ''
let ga4Initialized = false

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void
        dataLayer?: unknown[]
    }
}

/** Dynamically load GA4 script — only call after consent */
export function initGA4(): void {
    if (!GA4_ID || ga4Initialized || typeof window === 'undefined') return
    if (!hasAnalyticsConsent()) return

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function (...args: unknown[]) {
        window.dataLayer!.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID, { send_page_view: false })

    ga4Initialized = true
}

/** Remove GA4 cookies when user rejects consent */
export function removeGA4Cookies(): void {
    if (typeof document === 'undefined') return
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
        const name = cookie.split('=')[0].trim()
        if (name.startsWith('_ga') || name.startsWith('_gid')) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        }
    }
}

function gtag(...args: unknown[]) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag(...args)
    }
}

/** Track SPA page view */
export function trackPageView(path: string, title?: string) {
    gtag('event', 'page_view', {
        page_path: path,
        page_title: title || document.title,
    })
}

/** Track custom event */
export function trackEvent(
    eventName: string,
    params?: Record<string, string | number | boolean>,
) {
    gtag('event', eventName, params)
}

/** Track PDF download */
export function trackPdfDownload(documentName: string, language: string) {
    trackEvent('pdf_download', {
        document_name: documentName,
        language,
    })
}

/** Track form submission */
export function trackFormSubmit(formName: string) {
    trackEvent('form_submit', {
        form_name: formName,
    })
}

/** Track CTA click */
export function trackCtaClick(ctaName: string, location: string) {
    trackEvent('cta_click', {
        cta_name: ctaName,
        cta_location: location,
    })
}

/** Track language switch */
export function trackLanguageSwitch(newLanguage: string) {
    trackEvent('language_switch', {
        language: newLanguage,
    })
}
