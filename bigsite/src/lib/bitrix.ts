// Bitrix24 lead capture — posts to our own /api/lead Pages Function, which holds the
// inbound webhook URL as a server-side secret (BITRIX_WEBHOOK_URL). Shipping the webhook
// in the client bundle would let anyone scrape it and spam the CRM.
// The function answers { ok:false, offline:true } until the secret is configured, and the
// UI falls back to direct channels — same graceful behavior as before.

interface LeadFields {
  TITLE: string;
  NAME?: string;
  EMAIL?: { VALUE: string; VALUE_TYPE: string }[];
  COMMENTS?: string;
  SOURCE_ID?: string;
}

export async function submitPreScreen(data: {
  name: string;
  email: string;
  origin?: string;
  note?: string;
}): Promise<{ ok: boolean; offline?: boolean }> {
  const comments = [
    `Relocating from: ${data.origin || "—"}`,
    "",
    "Situation:",
    data.note || "—",
  ].join("\n");

  const fields: LeadFields = {
    TITLE: `WTP pre-screen: ${data.name.slice(0, 50)}`,
    NAME: data.name,
    EMAIL: [{ VALUE: data.email, VALUE_TYPE: "WORK" }],
    COMMENTS: comments,
    SOURCE_ID: "WEB",
  };

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
    });
    const body = (await res.json().catch(() => ({}))) as { ok?: boolean; offline?: boolean };
    return { ok: res.ok && body.ok === true, offline: body.offline };
  } catch {
    return { ok: false, offline: true };
  }
}
