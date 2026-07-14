// /api/lead — Cloudflare Pages Function: proxies the TRC lead form to Bitrix24.
//
// ⚠️ RECONSTRUCTION (2026-07-15). The original source of this function was lost;
// production trc.wtp.ae/api/lead responds 405 JSON to GET, i.e. a live Function
// exists there today. An atomic static redeploy WITHOUT this file would delete
// it and break the lead form (form.js POSTs to /api/lead).
//
// Rebuilt from:
//   - mirrors/trc/form.js payload: { name, phone, messenger, utm{}, page, referrer }
//   - the same developer's Bitrix mapping on local.wtp.ae (crm.lead.add.json,
//     TITLE/NAME/PHONE/COMMENTS/SOURCE_ID pattern, webhook wtp.bitrix24.ru/rest/6729/…)
// Field mapping may differ in detail from the lost original — verify one test
// lead lands in Bitrix after deploy. Prefer setting BITRIX_WEBHOOK as a Pages
// project env var; the fallback below is the webhook already public in
// local.wtp.ae page source.

const PHONE_RE = /^[+\d\s\-()]{7,20}$/;
const MESSENGERS = ['telegram', 'whatsapp', 'phone'];

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let body;
  try {
    body = await request.json();
  } catch (_) {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const name = String(body.name || '').trim().slice(0, 100);
  const phone = String(body.phone || '').trim();
  const messenger = String(body.messenger || '');
  const utm = body.utm && typeof body.utm === 'object' ? body.utm : {};
  const page = String(body.page || '').slice(0, 500);
  const referrer = String(body.referrer || '').slice(0, 500);

  if (name.length < 2) return json({ error: 'Invalid name' }, 400);
  if (!PHONE_RE.test(phone)) return json({ error: 'Invalid phone' }, 400);
  if (!MESSENGERS.includes(messenger)) return json({ error: 'Invalid messenger' }, 400);

  const utmStr = Object.entries(utm)
    .filter(([k, v]) => k.startsWith('utm_') && v)
    .map(([k, v]) => `${k}=${String(v).slice(0, 200)}`)
    .join(', ');

  const commentsLines = [
    `Контактное лицо: ${name}`,
    `Телефон: ${phone}`,
    `Способ связи: ${messenger}`,
    '',
    'Источник: trc.wtp.ae',
  ];
  if (utmStr) commentsLines.push(`UTM: ${utmStr}`);
  if (page) commentsLines.push(`Страница: ${page}`);
  if (referrer) commentsLines.push(`Referrer: ${referrer}`);

  const fields = {
    TITLE: `WTP TRC: ${name.slice(0, 60)}`,
    NAME: name,
    PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
    COMMENTS: commentsLines.join('\n'),
    SOURCE_ID: 'WEB',
  };

  const webhook =
    env.BITRIX_WEBHOOK || 'https://wtp.bitrix24.ru/rest/6729/f2xixkhx9cl9v35c';

  try {
    const resp = await fetch(`${webhook}/crm.lead.add.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields }),
    });
    const data = await resp.json();
    if (!resp.ok || !data.result) {
      return json({ error: 'CRM error' }, 502);
    }
    return json({ ok: true, id: data.result });
  } catch (_) {
    return json({ error: 'CRM unreachable' }, 502);
  }
}
