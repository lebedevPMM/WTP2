#!/usr/bin/env node
/**
 * Build all EN landings and merge into a single dist/cloudflare/ directory
 * for Cloudflare Pages deployment.
 *
 * Supports both:
 * - Path-based routing:     wtp2.pages.dev/banking/
 * - Subdomain routing:      banking.wtpref.com
 *
 * Usage: node scripts/build-cloudflare.mjs
 * CF Pages build command: node scripts/build-cloudflare.mjs
 * CF Pages output directory: dist/cloudflare
 */

import { execSync } from 'child_process'
import { cpSync, rmSync, mkdirSync, copyFileSync, writeFileSync } from 'fs'

// Each entry: [landing-id, lang]. Order matters — 'main' must be first
// (its dist is copied to the OUT_DIR root, others are merged under /{landing}/).
const LANDINGS = [
    ['main', 'en'],
    ['banking', 'en'],
    ['realestate', 'en'],
    ['partners', 'en'],
    ['client', 'en'],
    ['trc', 'ru'],
]
const OUT_DIR = 'dist/cloudflare'

// Essential public files to copy for sub-landings (not PDFs/ZIPs)
const ESSENTIAL_PUBLIC = [
    'favicon.svg', 'favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png',
    'favicon-512x512.png', 'apple-touch-icon.png',
    'og-image.png', 'logo-white.svg', 'logo-black.svg',
]

// 1. Type check once
console.log('=== Type checking ===')
execSync('npx tsc --noEmit', { stdio: 'inherit' })

// 2. Build each landing
for (const [landing, lang] of LANDINGS) {
    console.log(`\n=== Building ${landing}-${lang} ===`)
    execSync('npx vite build', {
        stdio: 'inherit',
        env: {
            ...process.env,
            VITE_LANDING: landing,
            VITE_LANG: lang,
            VITE_CF_PAGES: '1',
        },
    })
}

// 3. Merge into unified output
console.log(`\n=== Merging into ${OUT_DIR} ===`)
rmSync(OUT_DIR, { recursive: true, force: true })

// Main landing at root — full copy (includes all public assets, PDFs, etc.)
const [, mainLang] = LANDINGS[0]
cpSync(`dist/main-${mainLang}`, OUT_DIR, { recursive: true })

// Sub-landings — only index.html, assets/ (JS/CSS), and essential public files
for (const [landing, lang] of LANDINGS.slice(1)) {
    const src = `dist/${landing}-${lang}`
    const dest = `${OUT_DIR}/${landing}`

    // Copy index.html
    mkdirSync(dest, { recursive: true })
    copyFileSync(`${src}/index.html`, `${dest}/index.html`)

    // Copy JS/CSS bundles
    cpSync(`${src}/assets`, `${dest}/assets`, { recursive: true })

    // Copy essential public files (favicons, OG image, logos)
    for (const file of ESSENTIAL_PUBLIC) {
        try {
            copyFileSync(`${src}/${file}`, `${dest}/${file}`)
        } catch {
            // File may not exist — skip silently
        }
    }
}

// 4. _worker.js — handles subdomain routing + SPA fallback
// When _worker.js exists, _redirects is ignored — worker handles everything.
const worker = `
export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const host = url.hostname;
        const path = url.pathname;

        // --- 301 redirect from legacy wtpref.com to wtp.ae ---
        // Preserves path + query string. Maps subdomains 1:1:
        //   wtpref.com          → wtp.ae
        //   www.wtpref.com      → wtp.ae
        //   banking.wtpref.com  → banking.wtp.ae
        //   realestate.wtpref.com → realestate.wtp.ae
        //   partners.wtpref.com → partners.wtp.ae
        //   client.wtpref.com   → client.wtp.ae
        if (host === 'wtpref.com' || host.endsWith('.wtpref.com')) {
            let newHost;
            if (host === 'wtpref.com' || host === 'www.wtpref.com') {
                newHost = 'wtp.ae';
            } else {
                newHost = host.replace(/\.wtpref\.com$/, '.wtp.ae');
            }
            const target = 'https://' + newHost + path + url.search;
            return new Response(null, {
                status: 301,
                headers: {
                    'Location': target,
                    'Cache-Control': 'public, max-age=3600',
                },
            });
        }

        // Helper: fetch static asset by path only.
        // IMPORTANT: env.ASSETS.fetch() with custom domain hostnames (e.g. banking.wtp.ae)
        // causes SPA fallback instead of serving static files. Using a clean pages.dev URL avoids this.
        // Must NOT forward original request.headers — they contain Host: wtp.ae which
        // causes env.ASSETS.fetch() to return HTML fallback instead of the actual asset.
        const fetchAsset = (assetPath) => {
            const clean = new URL(assetPath, 'https://wtp2.pages.dev');
            return env.ASSETS.fetch(new Request(clean.toString()));
        };

        // Does the path look like a static file? (has a file extension)
        // IMPORTANT: env.ASSETS.fetch() returns 200 for ANY path (CF Pages built-in SPA fallback
        // serves root index.html). So we can NOT rely on res.ok to check if a file exists.
        // Instead: only try fetchAsset for paths with extensions; all others go to SPA fallback.
        const isStaticAsset = path.includes('.');

        // --- Subdomain routing (custom domain) ---
        let landing = null;
        if (host.startsWith('banking.')) landing = 'banking';
        else if (host.startsWith('realestate.')) landing = 'realestate';
        else if (host.startsWith('partners.')) landing = 'partners';
        else if (host.startsWith('client.')) landing = 'client';
        else if (host.startsWith('trc.')) landing = 'trc';

        if (landing) {
            if (isStaticAsset) {
                // Asset paths in HTML already include /{landing}/ prefix (base='/banking/').
                // So /banking/assets/chunk.js → file exists at that path.
                let assetPath;
                if (path.startsWith('/' + landing)) {
                    assetPath = path;
                } else {
                    assetPath = '/' + landing + path;
                }
                const res = await fetchAsset(assetPath);
                // CF Pages SPA fallback returns text/html for missing files.
                // If we asked for a non-HTML asset but got text/html, try root.
                const ct = res.headers.get('content-type') || '';
                if (!path.endsWith('.html') && ct.startsWith('text/html')) {
                    // File not in landing dir — try root (shared public assets like PDFs)
                    return fetchAsset(path.startsWith('/' + landing) ? path.slice(('/' + landing).length) || '/' : path);
                }
                return res;
            }
            // SPA route (no extension) — always serve landing's index.html
            return fetchAsset('/' + landing + '/index.html');
        }

        // --- Path-based routing (pages.dev or root domain) ---
        if (isStaticAsset) {
            return fetchAsset(path);
        }

        // SPA fallback — determine which landing's index.html to serve
        if (path.startsWith('/banking')) return fetchAsset('/banking/index.html');
        if (path.startsWith('/realestate')) return fetchAsset('/realestate/index.html');
        if (path.startsWith('/partners')) return fetchAsset('/partners/index.html');
        if (path.startsWith('/client')) return fetchAsset('/client/index.html');
        if (path.startsWith('/trc')) return fetchAsset('/trc/index.html');
        return fetchAsset('/index.html');
    }
};
`.trim()

writeFileSync(`${OUT_DIR}/_worker.js`, worker + '\n')

console.log(`\n=== Done! Output: ${OUT_DIR}/ ===`)
console.log('Routing:')
console.log('  Path-based (pages.dev):')
console.log('    /            → main')
console.log('    /banking/    → banking')
console.log('    /realestate/ → realestate')
console.log('    /partners/   → partners')
console.log('    /client/     → client')
console.log('  Subdomain (wtp.ae):')
console.log('    wtp.ae              → main')
console.log('    banking.wtp.ae      → banking')
console.log('    realestate.wtp.ae   → realestate')
console.log('    partners.wtp.ae     → partners')
console.log('    client.wtp.ae       → client')
console.log('    trc.wtp.ae          → trc (RU)')
console.log('  Legacy (301 redirect to wtp.ae):')
console.log('    *.wtpref.com        → *.wtp.ae')
