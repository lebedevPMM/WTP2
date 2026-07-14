// Prerender every sitemap route of the built SPA into static HTML snapshots.
// Why: crawlers that don't execute JS (most AI/LLM crawlers, some SEO tools) currently
// see an empty <div id="root">, and mobile FCP/LCP pays the full JS-boot tax. Snapshots
// give instant first paint + real HTML for SEO/AEO; React re-renders over the snapshot
// on load (createRoot render — same markup, no visible flash in practice).
//
// Usage: node scripts/prerender.mjs   (after `npm run build`; needs Chrome installed)
import { chromium } from "playwright-core";
import { spawn } from "child_process";
import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 8935;

const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");
const paths = [...sitemap.matchAll(/<loc>https:\/\/wtp\.ae([^<]*)<\/loc>/g)].map(m => m[1] || "/");
// worth prerendering even though excluded from sitemap (UX routes)
paths.push("/thank-you");

const preview = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
  cwd: root, stdio: "ignore", detached: false,
});
await new Promise(r => setTimeout(r, 2500));

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
// Seed a declined cookie consent (key mirrors src/lib/consent.ts) so snapshots never
// bake in the consent banner or dynamically-injected tracker <script> tags. Affects
// only the prerender browser: real visitors' React re-render uses their own choice.
await page.addInitScript(() => {
  try {
    localStorage.setItem(
      "wtp-consent-v1",
      JSON.stringify({ analytics: false, marketing: false, decidedAt: new Date().toISOString() }),
    );
  } catch {}
});
let ok = 0, fail = 0;
for (const p of paths) {
  try {
    await page.goto(`http://localhost:${PORT}${p}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(300); // let Seo.tsx upsert head tags
    let html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
    // The async-fonts link's onload flips media to "all" before capture; restore "print"
    // so the snapshot keeps the non-blocking pattern (noscript fallback covers no-JS).
    html = html.replace(/(<link[^>]*fonts\.googleapis\.com[^>]*media=")all("[^>]*onload=)/g, "$1print$2");
    // The hero-frame preload only helps the home route; drop it elsewhere (wasted 47KB otherwise).
    if (p !== "/") html = html.replace(/\s*<link rel="preload" as="image" href="\/hero\/frames\/[^"]*"[^>]*>/, "");
    const out = p === "/" ? join(root, "dist/index.html") : join(root, "dist", p.slice(1), "index.html");
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    ok++;
  } catch (e) {
    console.error(`FAIL ${p}: ${String(e).slice(0, 120)}`);
    fail++;
  }
}
await browser.close();
preview.kill();
console.log(`prerendered ${ok}/${paths.length} routes${fail ? `, ${fail} FAILED` : ""}`);
process.exit(fail ? 1 : 0);
