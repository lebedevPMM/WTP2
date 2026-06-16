// Bitrix24 lead capture — mirrors the existing WTP app integration.
// Set VITE_BITRIX_WEBHOOK_URL (inbound webhook base, no trailing slash) to enable.
const BITRIX_WEBHOOK_URL = (import.meta.env.VITE_BITRIX_WEBHOOK_URL as string) || "";

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
  if (!BITRIX_WEBHOOK_URL) {
    // No webhook configured yet — surface gracefully; the UI falls back to channels.
    return { ok: false, offline: true };
  }
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

  const res = await fetch(`${BITRIX_WEBHOOK_URL}/crm.lead.add.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  return { ok: res.ok };
}
