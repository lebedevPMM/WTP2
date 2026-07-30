export type LandingId = 'main' | 'banking' | 'realestate' | 'partners' | 'client'

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
    client: 'client.',
}

export const SUBDOMAIN_PREFIX = SUBDOMAIN_MAP[LANDING_ID]

/**
 * Landings whose RU version has been moved onto Cloudflare, served as a /ru/ path of
 * the same host instead of the Timeweb mirror. Client moved 2026-07-30 (it was the
 * only client-facing page still living on a bare pages.dev URL); the rest keep
 * pointing at wtpref.ru until that segment is migrated.
 */
const RU_ON_SAME_HOST: Partial<Record<LandingId, true>> = {
    client: true,
}

/**
 * Full domain (optionally with a language path) for a given language version of THIS
 * landing. EN lives on wtp.ae (migrated 2026-04-13); RU is either a /ru/ path on the
 * same host or the Timeweb mirror, depending on the landing.
 *
 * Callers append a router pathname to this, and the router pathname excludes the
 * basename — so `${getDomain('ru')}${pathname}` yields /ru/… exactly once.
 */
export function getDomain(lang: 'en' | 'ru'): string {
    if (lang === 'ru' && RU_ON_SAME_HOST[LANDING_ID]) {
        return `https://${SUBDOMAIN_PREFIX}wtp.ae/ru`
    }
    const rootDomain = lang === 'en' ? 'wtp.ae' : 'wtpref.ru'
    return `https://${SUBDOMAIN_PREFIX}${rootDomain}`
}

/**
 * Domain for the OTHER language version of THIS landing.
 */
export function getOtherLangDomain(currentLang: 'en' | 'ru'): string {
    const otherLang = currentLang === 'en' ? 'ru' : 'en'
    return getDomain(otherLang)
}
