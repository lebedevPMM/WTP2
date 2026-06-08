/**
 * Build-time JSON-LD schema for WTP G1 landings (EN).
 * Imported by vite.config.ts htmlMetaPlugin() and injected statically into <head>.
 *
 * Architecture:
 *  - ORG: ONE shared Organization node (@id https://wtp.ae/#organization), identical on
 *    every landing. Real legal entity + postal address (E-E-A-T). Email hello@wtp.ae per
 *    owner decision 2026-06-08 (NOTE: wtp.ae MX must be fixed for this address to receive
 *    mail; live footer/contact still use hello@wtpbrokers.com).
 *  - SERVICE / BREADCRUMB: per-landing, from seo/artifacts/G1/{landing}.md §5.
 *  - FAQ: only banking / partners / client (the 3 landings that render a visible FAQ).
 *    SOURCE OF TRUTH = the EN i18n FAQ in src/lib/LanguageContext.tsx
 *    (keys bf.faq.qN + aN, ml.faq.qN + aN, cl.faq.qN + aN). Mirrored here verbatim so the
 *    FAQPage schema matches on-page text (Google requires parity). Keep in sync if the
 *    i18n FAQ copy changes. main / realestate have NO visible FAQ -> NO FAQPage (avoids
 *    structured-data-without-visible-content guideline violation).
 */

const ORG = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://wtp.ae/#organization',
    name: 'WTP',
    legalName: 'WELLCOME TO PARADISE REAL ESTATE BROKERS LLC',
    url: 'https://wtp.ae/',
    logo: 'https://wtp.ae/og-image.png',
    email: 'hello@wtp.ae',
    telephone: '+971600575294',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Office 1207, Arenco Tower, Media City',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
    },
    areaServed: 'AE',
    knowsAbout: [
        'UAE corporate banking',
        'Banking-First company setup',
        'DIFC and ADGM company formation',
        'UAE Golden Visa',
        'Exit-tax coordination',
        'UK non-dom relocation',
        'German exit tax (Wegzugsteuer)',
        'Dutch Box 3 wealth tax',
        'UAE tax residency certificate',
        'Dubai real estate transactions',
    ],
}

const SERVICE = {
    main: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://wtp.ae/#service',
        name: 'UAE Business Relocation & Execution Partner',
        serviceType: 'Banking-First UAE relocation and company setup',
        provider: { '@id': 'https://wtp.ae/#organization' },
        areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
        audience: {
            '@type': 'Audience',
            audienceType: 'Brokers, wealth advisors, family offices and HNWI relocating to the UAE',
        },
        description:
            'An on-ground UAE execution partner that confirms bank approval before company registration, then delivers setup, residency, Golden Visa and assets through one team.',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'WTP service line',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate banking (Banking-First)', url: 'https://banking.wtp.ae/' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bankable company setup' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residency and Golden Visa', url: 'https://client.wtp.ae/' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Partner monetisation', url: 'https://partners.wtp.ae/' } },
            ],
        },
    },
    banking: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://banking.wtp.ae/#service',
        name: 'UAE Corporate Bank Account Opening (Banking-First)',
        serviceType: 'Corporate bank account opening and pre-screening',
        provider: { '@id': 'https://wtp.ae/#organization' },
        areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
        audience: {
            '@type': 'Audience',
            audienceType: 'Foreign-owned companies and high-net-worth individuals relocating to the UAE',
        },
        description:
            "We confirm the bank's Go/No-Go on a corporate account before the company is registered. Pre-Screen returns a decision in 5-7 business days, with bank-segment routing across mainland, freezone, DIFC and ADGM.",
        offers: {
            '@type': 'Offer',
            category: 'Banking Pre-Screen and corporate account opening',
            availability: 'https://schema.org/InStock',
        },
        url: 'https://banking.wtp.ae/',
    },
    realestate: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://realestate.wtp.ae/#service',
        name: 'WTP Post-Deal Commission Program for Dubai Real Estate Agents',
        serviceType: 'Real estate agent referral and commission program',
        url: 'https://realestate.wtp.ae/',
        provider: { '@id': 'https://wtp.ae/#organization' },
        areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
        audience: {
            '@type': 'BusinessAudience',
            audienceType: 'UAE real estate agents and brokers',
        },
        description:
            "Real estate agents refer their buyers' after-sale needs - UAE corporate banking, residency and visas, company setup and asset structuring - to WTP and earn commission averaging $3,500+ per client at no cost.",
        offers: {
            '@type': 'Offer',
            category: 'Referral commission',
            description: 'Agents earn commission averaging $3,500+ per referred client across banking, visa and setup services.',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'After-deal services buyers need',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UAE corporate bank account opening (Banking-First)', url: 'https://banking.wtp.ae/' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UAE residency and Golden Visa' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Company setup and asset structuring' } },
            ],
        },
    },
    partners: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://partners.wtp.ae/#service',
        name: 'WTP Partner Monetization Program',
        serviceType: 'Referral and white-label UAE execution partnership',
        url: 'https://partners.wtp.ae/',
        provider: { '@id': 'https://wtp.ae/#organization' },
        areaServed: 'AE',
        audience: {
            '@type': 'Audience',
            audienceType: 'Wealth advisors, family offices, tax advisors and brokers handling UAE relocations',
        },
        description:
            'Monetize the client referrals you already make. WTP opens the Dubai corporate bank account Banking-First, handles compliance, setup and visas, protects your client relationship with a non-compete, and pays commission on every closed service.',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Commission-bearing services',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Banking (Banking-First)' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Company Setup' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tax & Compliance' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Asset & Real Estate' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residency & Visas' } },
            ],
        },
    },
    client: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://client.wtp.ae/#service',
        name: 'UAE Relocation for High-Net-Worth Individuals',
        serviceType: 'UAE relocation and bankable company setup for high-net-worth individuals',
        provider: { '@id': 'https://wtp.ae/#organization' },
        areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
        audience: {
            '@type': 'Audience',
            audienceType: 'High-net-worth individuals relocating to the UAE',
        },
        url: 'https://client.wtp.ae/',
        description:
            'Coordinated home-jurisdiction exit (UK non-dom, German exit tax, Dutch Box 3) plus a bankable UAE company setup. Banking is assessed and secured before company registration.',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Relocation services',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Banking-First bankability assessment' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bankable UAE company setup' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UAE Golden Visa via AED 2M property route' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cross-border exit coordination (UK / Germany / Netherlands)' } },
            ],
        },
    },
}

const BREADCRUMB = {
    main: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'WTP', item: 'https://wtp.ae/' },
        ],
    },
    banking: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'WTP', item: 'https://wtp.ae/' },
            { '@type': 'ListItem', position: 2, name: 'UAE Corporate Bank Account Opening', item: 'https://banking.wtp.ae/' },
        ],
    },
    realestate: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'WTP', item: 'https://wtp.ae/' },
            { '@type': 'ListItem', position: 2, name: 'For Real Estate Agents', item: 'https://realestate.wtp.ae/' },
        ],
    },
    partners: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'WTP', item: 'https://wtp.ae/' },
            { '@type': 'ListItem', position: 2, name: 'Partners', item: 'https://partners.wtp.ae/' },
        ],
    },
    client: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'WTP', item: 'https://wtp.ae/' },
            { '@type': 'ListItem', position: 2, name: 'UAE Relocation for HNWI', item: 'https://client.wtp.ae/' },
        ],
    },
}

// FAQ mirrors the EN visible on-page FAQ (LanguageContext.tsx). Only landings with a
// rendered FAQ block get a FAQPage. Keep verbatim-in-sync with the i18n source.
function faqPage(id, qa) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': id,
        mainEntity: qa.map(([q, a]) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
        })),
    }
}

const FAQ = {
    // banking -> bf.faq.q1..q8 + a1..a8 (8 pairs)
    banking: faqPage('https://banking.wtp.ae/#faq', [
        ['What is Banking-First and why does it matter?', 'Most contractors start with company registration and then "try" to open an account. We reverse the order: first we build a banking scenario — select a bank, verify KYC/AML readiness, fix the plan. Only after a GO from the banking side do we start registration. This way you don\'t pay for a company that can\'t operate.'],
        ['What if the bank still declines?', 'Pre-screen identifies risk factors before work begins. If we see a high risk of decline — we give a written GO/NO-GO decision with an explanation. You don\'t waste money and time on a hopeless case.'],
        ['Which banks do you work with?', 'We work with a pool of banks in the UAE: from retail to premium and private banking. The specific bank is selected based on the client\'s profile — jurisdiction, business type, volume, Source of Funds.'],
        ['How long does a full case take?', 'Pre-screen: 5-7 business days. Full case (company + bank + visa): 4-8 weeks. Complex cases (multi-jurisdiction, golden visa, asset protection): up to 12 weeks. Timeline is fixed in Scenario Approval.'],
        ['How does the partner model work?', 'Two modes: (1) Referral — you send the client, we close, you earn a commission. (2) White-Label — we work as your invisible back-office, you sell under your own brand. In both cases — Non-Circumvention in the contract.'],
        ['Do you work with clients from Russia / CIS?', 'Yes, with transparent Source of Funds and no sanctions restrictions. A Russian passport is not a blocking factor — the profile matters, not the jurisdiction.'],
        ['What does ongoing support include?', 'Accounting, ESR/substance filing, VAT/CT declarations, license and visa renewals, compliance monitoring. The client is not left alone after setup — that\'s where the LTV for the partner comes from.'],
        ['How much does Pre-screen cost?', 'Pre-screen is free. The budget for execution is fixed in Scenario Approval — before work begins, no surprises.'],
    ]),
    // partners -> ml.faq.q1..q8 / a1..a8 (8 pairs)
    partners: faqPage('https://partners.wtp.ae/#faq', [
        ['How do you guarantee you won\'t steal my client?', 'Non-circumvention is fixed in the partnership agreement. We are legally prohibited from contacting the client directly or selling around you.'],
        ['What if the bank rejects the client?', 'We work on a Banking-First principle: we don\'t start processing until the pre-screen confirms the bank will open the account. You don\'t waste time on hopeless cases.'],
        ['What\'s the minimum commission?', 'Depends on the model: Referral — fixed amount or % of the deal; White-Label — you set your own markup. Details in the Partner Kit.'],
        ['How long does a typical case take?', 'Pre-screen: 5–7 business days. Full case (company + bank + visa): 4–8 weeks depending on complexity.'],
        ['Do I need banking or compliance experience?', 'No. For the Referral model — just a warm intro. We handle everything else.'],
        ['Will the client know about WTP?', 'In the White-Label model — no. We operate as your invisible back-office. All documents and communications go under your brand.'],
        ['Do you work with clients from Russia?', 'Yes, provided there is a transparent source of funds and no sanctions exposure. A Russian passport is not a blocking factor.'],
        ['How do I start?', 'Submit your first case through the form or request the Partner Kit. The pre-screen is free.'],
    ]),
    // client -> cl.faq.q0..q6 / a0..a6 (7 pairs)
    client: faqPage('https://client.wtp.ae/#faq', [
        ['I already have a tax advisor in my country. Do I need your partner firm?', 'Not necessarily. We work with your existing advisor using our cross-border coordination protocol. If you don\'t have one, we can connect you with our partner firm in your jurisdiction.'],
        ['What countries do your partner firms cover?', 'We have established relationships in the UK, Germany, and the Netherlands. For other jurisdictions, we either connect you with a vetted firm or coordinate directly with your advisor.'],
        ['Who manages the process — you or the partner firm?', 'We do. WTP is the single point of coordination. You get one timeline, one project manager, one communication channel. Your exit advisor handles their scope; we handle ours; decisions are synchronized.'],
        ['Can you guarantee the bank account will open?', 'No one can guarantee a bank decision. What we guarantee is that we won\'t start registration until we\'ve assessed bankability, chosen the right routing, and prepared a compliant package.'],
        ['I\'m from a country not listed. Can you help?', 'If your profile passes our pre-check, yes. We work with clients from around the world. The key factors are source of funds, business model, and compliance readiness — not nationality.'],
        ['I already have a UAE company but the bank rejected me.', 'Compliance Rescue is one of our core services. We assess what went wrong, restructure if needed, and re-apply through the correct banking channel.'],
        ['Do I need to physically move to the UAE?', 'It depends on your substance requirements for tax residency. We design the minimum viable presence that satisfies both UAE regulations and your home country\'s exit criteria.'],
    ]),
}

// client carries an extra ItemList (jurisdiction comparison) shown on-page.
const EXTRA = {
    client: [
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': 'https://client.wtp.ae/#jurisdiction-comparison',
            name: 'UAE vs Singapore, Portugal, Switzerland and Malta for HNWI relocation',
            itemListOrder: 'https://schema.org/ItemListOrderAscending',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'United Arab Emirates' },
                { '@type': 'ListItem', position: 2, name: 'Singapore' },
                { '@type': 'ListItem', position: 3, name: 'Portugal' },
                { '@type': 'ListItem', position: 4, name: 'Switzerland' },
                { '@type': 'ListItem', position: 5, name: 'Malta' },
            ],
        },
    ],
}

/**
 * Returns the JSON-LD <script> blocks (as an HTML string) for a landing.
 * EN only (G1). Unknown landing -> main.
 */
export function getSchemaJsonLd(landing) {
    const key = SERVICE[landing] ? landing : 'main'
    const blocks = [ORG, SERVICE[key], BREADCRUMB[key]]
    if (FAQ[key]) blocks.push(FAQ[key])
    if (EXTRA[key]) blocks.push(...EXTRA[key])
    return blocks
        .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
        .join('\n    ')
}
