const BITRIX_WEBHOOK_URL = import.meta.env.VITE_BITRIX_WEBHOOK_URL as string

interface BitrixLeadFields {
    TITLE: string
    NAME?: string
    EMAIL?: { VALUE: string; VALUE_TYPE: string }[]
    PHONE?: { VALUE: string; VALUE_TYPE: string }[]
    COMMENTS?: string
    SOURCE_ID?: string
    UF_CRM_TELEGRAM?: string
}

interface BitrixResponse {
    result: number
    time: {
        start: number
        finish: number
        duration: number
    }
}

async function createLead(fields: BitrixLeadFields): Promise<BitrixResponse> {
    const url = `${BITRIX_WEBHOOK_URL}/crm.lead.add.json`

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
    })

    if (!response.ok) {
        throw new Error(`Bitrix24 API error: ${response.status}`)
    }

    return response.json()
}

export async function submitCaseToBitrix(data: {
    whoAreYou: string
    howToContact: string
    howCanWeHelp: string
}): Promise<BitrixResponse> {
    const comments = [
        `Who: ${data.whoAreYou}`,
        `Contact: ${data.howToContact}`,
        '',
        `Request:`,
        data.howCanWeHelp,
    ].join('\n')

    return createLead({
        TITLE: `WTP Lead: ${data.whoAreYou.slice(0, 50)}`,
        NAME: data.whoAreYou,
        COMMENTS: comments,
        SOURCE_ID: 'WEB',
    })
}

export async function submitContactToBitrix(data: {
    name: string
    email: string
    telegram?: string
    message: string
}): Promise<BitrixResponse> {
    const comments = [
        data.message,
        data.telegram ? `\nTelegram: ${data.telegram}` : '',
    ].join('\n')

    return createLead({
        TITLE: `WTP Contact: ${data.name}`,
        NAME: data.name,
        EMAIL: [{ VALUE: data.email, VALUE_TYPE: 'WORK' }],
        COMMENTS: comments,
        SOURCE_ID: 'WEB',
    })
}

// TRC Lead (UAE Tax Residency Certificate landing — 3 fields + UTM)
export async function submitTrcLeadToBitrix(data: {
    name: string
    phone: string
    messenger: 'telegram' | 'whatsapp' | 'phone'
    utm?: Record<string, string>
}): Promise<BitrixResponse> {
    const messengerLabel: Record<typeof data.messenger, string> = {
        telegram: 'Telegram',
        whatsapp: 'WhatsApp',
        phone: 'Звонок',
    }

    const utm = data.utm || {}
    const utmEntries = Object.entries(utm).filter(([, v]) => v)
    const utmLines = utmEntries.length
        ? utmEntries.map(([k, v]) => `  ${k}: ${v}`).join('\n')
        : '  нет'

    const comments = [
        'Продукт: Налоговый сертификат резидента ОАЭ (TRC)',
        `Предпочтительный мессенджер: ${messengerLabel[data.messenger]}`,
        'Источник: TRC Landing (trc.wtp.ae)',
        'UTM:',
        utmLines,
    ].join('\n')

    const fields: BitrixLeadFields = {
        TITLE: `TRC Lead: ${data.name}`,
        NAME: data.name,
        PHONE: [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }],
        COMMENTS: comments,
        SOURCE_ID: 'WEB',
    }

    if (data.messenger === 'telegram') {
        fields.UF_CRM_TELEGRAM = data.phone
    }

    return createLead(fields)
}

// Banking Roadmap request (B2C client form)
export async function submitRoadmapToBitrix(data: {
    name: string
    email: string
    country: string
    situation: string
}): Promise<BitrixResponse> {
    const comments = [
        `Source: B2C Client Landing — Banking Roadmap Request`,
        `Country of residence: ${data.country}`,
        '',
        `Situation:`,
        data.situation,
    ].join('\n')

    return createLead({
        TITLE: `WTP B2C Roadmap: ${data.name} (${data.country})`,
        NAME: data.name,
        EMAIL: [{ VALUE: data.email, VALUE_TYPE: 'WORK' }],
        COMMENTS: comments,
        SOURCE_ID: 'WEB',
    })
}
