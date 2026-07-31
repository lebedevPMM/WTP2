import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const landing = process.env.VITE_LANDING || 'main'
const lang = process.env.VITE_LANG || 'en'

const subdomain = landing === 'main' ? '' : `${landing}.`
// Landings whose RU version now lives as a /ru/ path on the same wtp.ae host rather
// than on the Timeweb mirror. Keep this in step with RU_ON_SAME_HOST in
// src/config/landing.ts — that one drives the runtime hreflang, this one drives the
// canonical, og:url and JSON-LD baked in at build time. They disagreed once and the
// RU relocation page shipped declaring client.wtpref.ru canonical, a host that has
// never existed.
const RU_ON_SAME_HOST = ['client']
const ruOnSameHost = lang === 'ru' && RU_ON_SAME_HOST.includes(landing)
const domain = lang === 'en' || ruOnSameHost ? 'wtp.ae' : 'wtpref.ru'
const siteUrl = `https://${subdomain}${domain}${ruOnSameHost ? `/${lang}` : ''}`

const meta: Record<string, Record<string, { title: string; description: string; keywords: string }>> = {
    main: {
        en: {
            title: 'WTP - UAE Execution Partner | Company Formation & Banking',
            description: 'WTP is your UAE execution partner for company formation, corporate banking, and compliance. We handle the complexity so you can focus on growth.',
            keywords: 'UAE company formation, corporate banking, Dubai business setup, DIFC, compliance, WTP',
        },
        ru: {
            title: 'WTP - Партнер по операциям в ОАЭ | Регистрация компаний и банкинг',
            description: 'WTP — ваш операционный партнер в ОАЭ: регистрация компаний, корпоративный банкинг и комплаенс. Мы берем на себя сложность, чтобы вы могли сосредоточиться на росте.',
            keywords: 'регистрация компании ОАЭ, корпоративный банкинг, открытие бизнеса Дубай, DIFC, комплаенс, WTP',
        },
    },
    banking: {
        en: {
            title: 'WTP - Corporate Banking in UAE | Account Opening & Compliance',
            description: 'Expert corporate banking services in the UAE. We open accounts, handle compliance, and solve banking challenges for international businesses.',
            keywords: 'UAE corporate banking, business account UAE, bank account opening Dubai, banking compliance',
        },
        ru: {
            title: 'WTP - Корпоративный банкинг в ОАЭ | Открытие счетов',
            description: 'Экспертные услуги корпоративного банкинга в ОАЭ. Открытие счетов, комплаенс и решение банковских задач для международного бизнеса.',
            keywords: 'корпоративный банкинг ОАЭ, открытие счета ОАЭ, бизнес счет Дубай, банковский комплаенс',
        },
    },
    // This landing renders PostDealLandingPage — the co-brokerage offer for agents,
    // headlined "Earn $3,500+ from every client after the deal closes". The meta used
    // to describe property structuring for investors, i.e. a different audience than
    // the page actually serves; buyers are handled by re.wtp.ae, not here.
    realestate: {
        en: {
            title: 'WTP - Co-brokerage for UAE Agents | Earn After the Deal Closes',
            description: 'For Dubai real estate agents: your client still needs a company, a bank account, a Golden Visa and a will. You refer, we execute, you earn a commission on each one.',
            keywords: 'co-brokerage Dubai, real estate agent commission UAE, referral partner Dubai property, after-sale services UAE',
        },
        ru: {
            title: 'WTP - Ко-брокеридж для агентов ОАЭ | Заработок после сделки',
            description: 'Агентам по недвижимости в Дубае: клиенту после покупки нужны компания, счёт, Golden Visa и завещание. Вы приводите — мы исполняем — вы получаете комиссию с каждой услуги.',
            keywords: 'ко-брокеридж Дубай, комиссия агента недвижимости ОАЭ, партнёрская программа брокеров, услуги после сделки ОАЭ',
        },
    },
    partners: {
        en: {
            title: 'WTP - Partner Program | Refer Clients to UAE Services',
            description: 'Join WTP Partner Program. Refer clients for UAE company formation, banking, and compliance services. Transparent process and reliable execution.',
            keywords: 'WTP partner program, UAE services referral, business partner Dubai, company formation partner',
        },
        ru: {
            title: 'WTP - Партнерская программа | Рекомендуйте клиентов',
            description: 'Присоединяйтесь к партнерской программе WTP. Рекомендуйте клиентов для регистрации компаний, банкинга и комплаенса в ОАЭ.',
            keywords: 'партнерская программа WTP, рекомендации ОАЭ, бизнес-партнер Дубай, партнер по регистрации компаний',
        },
    },
    client: {
        en: {
            title: 'WTP - UAE Relocation Partner | Exit Coordination & Banking-First Setup',
            description: 'WTP orchestrates your complete relocation — coordinated exit from your jurisdiction and bankable company setup in the UAE through our international partner network.',
            keywords: 'UAE relocation, company formation UAE, corporate banking Dubai, exit tax coordination, UK non-dom UAE, German exit tax, Banking-First, Golden Visa',
        },
        ru: {
            title: 'WTP - Релокация бизнеса в ОАЭ | Координация выхода и Banking-First',
            description: 'WTP координирует вашу полную релокацию — выход из текущей юрисдикции и создание банковской структуры в ОАЭ через международную партнерскую сеть.',
            keywords: 'релокация ОАЭ, регистрация компании ОАЭ, корпоративный банкинг Дубай, координация выхода, Banking-First, Golden Visa',
        },
    },
}

const currentMeta = meta[landing]?.[lang] || meta.main.en

// Per-landing service description for JSON-LD. The Organization @id is deliberately
// `https://wtp.ae/#organization` on EVERY landing — banking.wtp.ae, partners.wtp.ae etc.
// are surfaces of ONE company, so they must resolve to one entity rather than minting a
// separate "WTP" per subdomain.
const ORG_ID = 'https://wtp.ae/#organization'

const serviceMeta: Record<string, { name: string; type: string }> = {
    main: { name: 'UAE execution partner — company formation, banking, compliance', type: 'Business Formation Service' },
    banking: { name: 'UAE corporate bank account opening and compliance', type: 'Corporate Banking Service' },
    realestate: { name: 'UAE real estate transaction structuring and compliance', type: 'Real Estate Service' },
    partners: { name: 'WTP partner and referral programme', type: 'Referral Programme' },
    client: { name: 'UAE relocation, exit coordination and banking-first setup', type: 'Relocation Service' },
}

function jsonLdFor(): string {
    const svc = serviceMeta[landing] || serviceMeta.main
    const graph = [
        {
            '@type': 'ProfessionalService',
            '@id': ORG_ID,
            name: 'WTP',
            legalName: 'WTP — Wellcome to Paradise',
            url: 'https://wtp.ae',
            email: 'hello@wtp.ae',
            telephone: '+971 600 575-294',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Dubai Media City, Arenco Tower, Office 1207',
                addressLocality: 'Dubai',
                addressCountry: 'AE',
            },
            areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
            sameAs: [
                'https://www.linkedin.com/company/welcome-to-paradise-professional-services',
                'https://t.me/wtpbrokers',
            ],
        },
        {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: `${siteUrl}/`,
            name: currentMeta.title,
            publisher: { '@id': ORG_ID },
            inLanguage: lang === 'ru' ? 'ru-RU' : 'en-AE',
        },
        {
            '@type': 'WebPage',
            '@id': `${siteUrl}/#webpage`,
            url: `${siteUrl}/`,
            name: currentMeta.title,
            description: currentMeta.description,
            isPartOf: { '@id': `${siteUrl}/#website` },
            about: { '@id': ORG_ID },
            inLanguage: lang === 'ru' ? 'ru-RU' : 'en-AE',
        },
        {
            '@type': 'Service',
            '@id': `${siteUrl}/#service`,
            name: svc.name,
            serviceType: svc.type,
            description: currentMeta.description,
            provider: { '@id': ORG_ID },
            areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
            url: `${siteUrl}/`,
        },
    ]
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}

function htmlMetaPlugin(): Plugin {
    return {
        name: 'html-meta-transform',
        transformIndexHtml(html) {
            return html
                .replace('<html lang="en">', `<html lang="${lang}">`)
                .replace(
                    /<title>.*?<\/title>/,
                    `<title>${currentMeta.title}</title>`,
                )
                .replace(
                    /<meta name="description" content=".*?" \/>/,
                    `<meta name="description" content="${currentMeta.description}" />`,
                )
                .replace(
                    /<meta name="keywords" content=".*?" \/>/,
                    `<meta name="keywords" content="${currentMeta.keywords}" />`,
                )
                .replace(
                    /<meta property="og:title" content=".*?" \/>/,
                    `<meta property="og:title" content="${currentMeta.title}" />`,
                )
                .replace(
                    /<meta property="og:description" content=".*?" \/>/,
                    `<meta property="og:description" content="${currentMeta.description}" />`,
                )
                .replace(
                    /<meta property="og:url" content=".*?" \/>/,
                    `<meta property="og:url" content="${siteUrl}/" />`,
                )
                .replace(
                    /<meta property="og:image" content=".*?" \/>/,
                    `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
                )
                .replace(
                    /<meta name="twitter:title" content=".*?" \/>/,
                    `<meta name="twitter:title" content="${currentMeta.title}" />`,
                )
                .replace(
                    /<meta name="twitter:description" content=".*?" \/>/,
                    `<meta name="twitter:description" content="${currentMeta.description}" />`,
                )
                .replace(
                    /<meta name="twitter:image" content=".*?" \/>/,
                    `<meta name="twitter:image" content="${siteUrl}/og-image.png" />`,
                )
                // Self-referencing canonical + JSON-LD. Neither existed before: every
                // landing was served with no canonical at all, so banking.wtp.ae,
                // partners.wtp.ae etc. had nothing telling Google which URL is the real one.
                .replace(
                    '</head>',
                    `    <link rel="canonical" href="${siteUrl}/" />\n` +
                    `    <script type="application/ld+json">${jsonLdFor()}</script>\n` +
                    `  </head>`,
                )
        },
    }
}

const cfPages = process.env.VITE_CF_PAGES === '1'
// On Cloudflare each landing is served from its own folder, and a non-English build
// gets a language folder inside it: /client/ → EN, /client/ru/ → RU. The worker maps
// client.wtp.ae/ru/ onto the latter. EN keeps its existing paths untouched.
const langFolder = lang === 'en' ? '' : `${lang}/`
const base = cfPages
    ? landing === 'main'
        ? `/${langFolder}`
        : `/${landing}/${langFolder}`
    : '/'

export default defineConfig({
    plugins: [react(), htmlMetaPlugin()],
    base,
    build: {
        outDir: `dist/${landing}-${lang}`,
    },
    define: {
        'import.meta.env.VITE_LANDING': JSON.stringify(landing),
        'import.meta.env.VITE_LANG': JSON.stringify(lang),
    },
})
