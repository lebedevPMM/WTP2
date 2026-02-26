import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const landing = process.env.VITE_LANDING || 'main'
const lang = process.env.VITE_LANG || 'en'

const subdomain = landing === 'main' ? '' : `${landing}.`
const tld = lang === 'en' ? 'com' : 'ru'
const siteUrl = `https://${subdomain}wtpref.${tld}`

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
    realestate: {
        en: {
            title: 'WTP - Real Estate Operations in UAE | Property Deals & Compliance',
            description: 'Professional real estate execution in the UAE. From property structuring to compliance, we handle operational complexity for real estate investors.',
            keywords: 'UAE real estate, property investment Dubai, real estate compliance, property structuring UAE',
        },
        ru: {
            title: 'WTP - Недвижимость в ОАЭ | Сделки и комплаенс',
            description: 'Профессиональное сопровождение сделок с недвижимостью в ОАЭ. Структурирование, комплаенс и операционная поддержка для инвесторов.',
            keywords: 'недвижимость ОАЭ, инвестиции Дубай, комплаенс недвижимость, структурирование сделок ОАЭ',
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
        },
    }
}

export default defineConfig({
    plugins: [react(), htmlMetaPlugin()],
    base: '/',
    build: {
        outDir: `dist/${landing}-${lang}`,
    },
    define: {
        'import.meta.env.VITE_LANDING': JSON.stringify(landing),
        'import.meta.env.VITE_LANG': JSON.stringify(lang),
    },
})
