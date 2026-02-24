export type LandingId = 'main' | 'banking' | 'realestate' | 'partners'

export const LANDING_ID: LandingId =
    (import.meta.env.VITE_LANDING as LandingId) || 'main'

export const IS_FOCUSED_LANDING = LANDING_ID !== 'main'

/**
 * Subdomain prefix for the current landing.
 * 'main' -> '' (root domain), others -> 'banking.' etc.
 */
const SUBDOMAIN_MAP: Record<LandingId, string> = {
    main: '',
    banking: 'banking.',
    realestate: 'realestate.',
    partners: 'partners.',
}

export const SUBDOMAIN_PREFIX = SUBDOMAIN_MAP[LANDING_ID]

/**
 * Full domain for a given language version of THIS landing.
 */
export function getDomain(lang: 'en' | 'ru'): string {
    const tld = lang === 'en' ? 'com' : 'ru'
    return `https://${SUBDOMAIN_PREFIX}wtpref.${tld}`
}

/**
 * Domain for the OTHER language version of THIS landing.
 */
export function getOtherLangDomain(currentLang: 'en' | 'ru'): string {
    const otherLang = currentLang === 'en' ? 'ru' : 'en'
    return getDomain(otherLang)
}
