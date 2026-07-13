// CF Pages Function: server-side proxy for Bitrix24 lead capture.
// The inbound webhook URL is a project secret (BITRIX_WEBHOOK_URL) — never shipped in
// the client bundle, so it can't be scraped and spammed. Until the secret is set the
// endpoint answers { ok:false, offline:true } and the UI falls back to direct channels.
//
// Set the secret once the webhook arrives:
//   npx wrangler pages secret put BITRIX_WEBHOOK_URL --project-name <project>
interface Env {
  BITRIX_WEBHOOK_URL?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

  const webhook = (context.env.BITRIX_WEBHOOK_URL || "").replace(/\/$/, "");
  if (!webhook) return json({ ok: false, offline: true });

  let fields: Record<string, unknown>;
  try {
    const body = (await context.request.json()) as { fields?: Record<string, unknown> };
    fields = body.fields ?? {};
  } catch {
    return json({ ok: false, error: "bad request" }, 400);
  }

  // Minimal server-side sanity: a lead needs at least a title.
  if (typeof fields.TITLE !== "string" || !fields.TITLE.trim()) {
    return json({ ok: false, error: "missing TITLE" }, 400);
  }

  const res = await fetch(`${webhook}/crm.lead.add.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  return json({ ok: res.ok }, res.ok ? 200 : 502);
};
