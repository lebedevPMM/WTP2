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
