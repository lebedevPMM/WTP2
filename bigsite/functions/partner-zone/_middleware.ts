// Password gate for the partner zone (team meeting 16.07: partner materials should only be
// downloadable behind a password, starting with one shared login for everyone).
//
// One shared credential, held in the PARTNER_ZONE_PASSWORD secret on the wtp-main project:
//   npx wrangler pages secret put PARTNER_ZONE_PASSWORD --project-name wtp-main
// Username is fixed to "partner"; only the password is a secret. Rotating = put the secret again.
//
// The middleware covers every request under /partner-zone/*, static files included, so the ZIPs
// cannot be fetched by direct link without the password. When the secret is not configured the
// zone stays closed (503) rather than silently serving the files in the open.

const USER = "partner";
const REALM = "WTP Partner Zone";

function unauthorized(): Response {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
    },
  });
}

// Constant-time-ish comparison so the password is not trivially guessable by timing.
function equals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const onRequest: PagesFunction<{ PARTNER_ZONE_PASSWORD?: string }> = async (context) => {
  const expected = context.env.PARTNER_ZONE_PASSWORD;
  if (!expected) {
    return new Response("Partner zone is not configured yet.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const header = context.request.headers.get("Authorization") || "";
  if (!header.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(":");
  if (sep < 0) return unauthorized();
  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);

  if (!equals(user, USER) || !equals(pass, expected)) return unauthorized();

  const response = await context.next();
  // Never let a CDN or a shared proxy cache gated material.
  const gated = new Response(response.body, response);
  gated.headers.set("Cache-Control", "private, no-store");
  gated.headers.set("X-Robots-Tag", "noindex, nofollow");
  return gated;
};
