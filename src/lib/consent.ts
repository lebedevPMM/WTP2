/**
 * Cookie Consent Management
 * Stores user's consent decision in localStorage.
 * Used by analytics.ts to conditionally load GA4.
 */

const CONSENT_KEY = 'wtp-cookie-consent'

export type ConsentStatus = 'accepted' | 'rejected' | null

export function getConsentStatus(): ConsentStatus {
    try {
        const value = localStorage.getItem(CONSENT_KEY)
        if (value === 'accepted' || value === 'rejected') return value
    } catch {
        // localStorage unavailable (e.g. private browsing in some browsers)
    }
    return null
}

export function setConsentStatus(status: 'accepted' | 'rejected'): void {
    try {
        localStorage.setItem(CONSENT_KEY, status)
    } catch {
        // localStorage unavailable
    }
}

export function resetConsentStatus(): void {
    try {
        localStorage.removeItem(CONSENT_KEY)
    } catch {
        // localStorage unavailable
    }
}

export function hasAnalyticsConsent(): boolean {
    return getConsentStatus() === 'accepted'
}
