import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { getSchemaJsonLd } from './scripts/seo-schema.mjs'

const landing = process.env.VITE_LANDING || 'main'
const lang = process.env.VITE_LANG || 'en'

const subdomain = landing === 'main' ? '' : `${landing}.`
const domain = lang === 'en' ? 'wtp.ae' : 'wtpref.ru'
const siteUrl = `https://${subdomain}${domain}`
// EN host of THIS landing — the hreflang x-default target (EN is primary).
const enSiteUrl = `https://${subdomain}wtp.ae`

const meta: Record<string, Record<string, { title: string; description: string; keywords: string }>> = {
    main: {
        en: {
            title: 'WTP — UAE Execution Partner: Banking-First Setup',
            description: 'Your UAE execution partner. We confirm the bank will open before you register a company — banking-first setup, exit coordination, Golden Visa.',
            keywords: 'UAE business relocation partner, UAE corporate banking, Banking-First company setup, DIFC, ADGM, Golden Visa, exit tax coordination',
        },
        ru: {
            title: 'WTP - Партнер по операциям в ОАЭ | Регистрация компаний и банкинг',
            description: 'WTP — ваш операционный партнер в ОАЭ: регистрация компаний, корпоративный банкинг и комплаенс. Мы берем на себя сложность, чтобы вы могли сосредоточиться на росте.',
            keywords: 'регистрация компании ОАЭ, корпоративный банкинг, открытие бизнеса Дубай, DIFC, комплаенс, WTP',
        },
    },
    banking: {
        en: {
            title: 'UAE Corporate Bank Account Opening | Banking-First',
            description: 'Open a UAE corporate bank account before you register the company. Pre-Screen tells you the bank\'s answer in 5–7 days. Foreign owners, DIFC, ADGM.',
            keywords: 'UAE corporate bank account opening, business bank account UAE, Banking-First, bank account opening Dubai, DIFC, ADGM, banking compliance',
        },
        ru: {
            title: 'WTP - Корпоративный банкинг в ОАЭ | Открытие счетов',
            description: 'Экспертные услуги корпоративного банкинга в ОАЭ. Открытие счетов, комплаенс и решение банковских задач для международного бизнеса.',
            keywords: 'корпоративный банкинг ОАЭ, открытие счета ОАЭ, бизнес счет Дубай, банковский комплаенс',
        },
    },
    realestate: {
        en: {
            title: 'Earn $3,500+ Per Client | Dubai Agent Referral | WTP',
            description: 'Dubai real estate agents: earn $3,500+ per client on the banking, visa and setup your buyers need after the deal. Refer in 3 messages, zero cost.',
            keywords: 'Dubai real estate agent referral, earn commission referring clients, post-deal commission UAE, after-sale banking visa setup, real estate agent partner program',
        },
        ru: {
            title: 'WTP - Недвижимость в ОАЭ | Сделки и комплаенс',
            description: 'Профессиональное сопровождение сделок с недвижимостью в ОАЭ. Структурирование, комплаенс и операционная поддержка для инвесторов.',
            keywords: 'недвижимость ОАЭ, инвестиции Дубай, комплаенс недвижимость, структурирование сделок ОАЭ',
        },
    },
    partners: {
        en: {
            title: 'Monetize UAE Referrals | We Open the Bank, You Earn',
            description: 'Refer the clients you already send for free. We open the Dubai bank and handle compliance; you keep the client and earn commission on every deal.',
            keywords: 'monetize client referrals UAE, UAE referral partner program, white-label company setup, Banking-First, earn commission Dubai banking, wealth advisor partner',
        },
        ru: {
            title: 'WTP - Партнерская программа | Рекомендуйте клиентов',
            description: 'Присоединяйтесь к партнерской программе WTP. Рекомендуйте клиентов для регистрации компаний, банкинга и комплаенса в ОАЭ.',
            keywords: 'партнерская программа WTP, рекомендации ОАЭ, бизнес-партнер Дубай, партнер по регистрации компаний',
        },
    },
    client: {
        en: {
            title: 'UAE Relocation for HNWI | Exit + Bankable Setup | WTP',
            description: 'Relocating to the UAE? We coordinate your home-jurisdiction exit and a bankable company setup — one team, banking sorted before you register.',
            keywords: 'UAE relocation for HNWI, UAE relocation, exit tax coordination, UK non-dom UAE, German exit tax, Dutch Box 3, Banking-First, Golden Visa, bankable company setup',
        },
        ru: {
            title: 'WTP - Релокация бизнеса в ОАЭ | Координация выхода и Banking-First',
            description: 'WTP координирует вашу полную релокацию — выход из текущей юрисдикции и создание банковской структуры в ОАЭ через международную партнерскую сеть.',
            keywords: 'релокация ОАЭ, регистрация компании ОАЭ, корпоративный банкинг Дубай, координация выхода, Banking-First, Golden Visa',
        },
    },
}

const currentMeta = meta[landing]?.[lang] || meta.main.en

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
                // Self-canonical (landing root). Runtime updater in Layout.tsx keeps this
                // tag current for SPA sub-routes (client spokes).
                .replace(
                    '<link rel="canonical" href="" />',
                    `<link rel="canonical" href="${siteUrl}/" />`,
                )
                // hreflang cluster: self + x-default(EN). RU partner pairing ships in G2.
                .replace(
                    '<!--HREFLANG-->',
                    [
                        `<link rel="alternate" hreflang="${lang}" href="${siteUrl}/" />`,
                        lang !== 'en'
                            ? `<link rel="alternate" hreflang="en" href="${enSiteUrl}/" />`
                            : '',
                        `<link rel="alternate" hreflang="x-default" href="${enSiteUrl}/" />`,
                    ]
                        .filter(Boolean)
                        .join('\n    '),
                )
                // Static JSON-LD (Organization + Service + BreadcrumbList [+ FAQPage / ItemList]).
                .replace('<!--JSONLD-->', getSchemaJsonLd(landing))
        },
    }
}

const cfPages = process.env.VITE_CF_PAGES === '1'
const base = cfPages && landing !== 'main' ? `/${landing}/` : '/'

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
