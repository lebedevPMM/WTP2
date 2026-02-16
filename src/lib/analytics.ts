/**
 * GA4 Analytics — lightweight wrapper for gtag
 *
 * Events tracked:
 *  - page_view        (SPA route changes)
 *  - form_submit      (Submit Case form)
 *  - pdf_download     (One Pager + Partner Kit docs)
 *  - cta_click        (Submit Case / Partner Kit buttons)
 *  - language_switch  (EN ↔ RU)
 */

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void
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
