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

const LANDINGS = ['main', 'banking', 'realestate', 'partners']
const LANG = 'en'
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
for (const landing of LANDINGS) {
    console.log(`\n=== Building ${landing}-${LANG} ===`)
    execSync('npx vite build', {
        stdio: 'inherit',
        env: {
            ...process.env,
            VITE_LANDING: landing,
            VITE_LANG: LANG,
            VITE_CF_PAGES: '1',
        },
    })
}

// 3. Merge into unified output
console.log(`\n=== Merging into ${OUT_DIR} ===`)
rmSync(OUT_DIR, { recursive: true, force: true })

// Main landing at root — full copy (includes all public assets, PDFs, etc.)
cpSync(`dist/main-${LANG}`, OUT_DIR, { recursive: true })

// Sub-landings — only index.html, assets/ (JS/CSS), and essential public files
for (const landing of LANDINGS.slice(1)) {
    const src = `dist/${landing}-${LANG}`
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

        // Helper: fetch static asset by path only.
        // IMPORTANT: env.ASSETS.fetch() with custom domain hostnames (e.g. banking.wtpref.com)
        // causes SPA fallback instead of serving static files. Using a clean pages.dev URL avoids this.
        const fetchAsset = (assetPath) => {
            const clean = new URL(assetPath, 'https://wtp2.pages.dev');
            return env.ASSETS.fetch(new Request(clean, { headers: request.headers }));
        };

        // --- Subdomain routing (custom domain) ---
        let landing = null;
        if (host.startsWith('banking.')) landing = 'banking';
        else if (host.startsWith('realestate.')) landing = 'realestate';
        else if (host.startsWith('partners.')) landing = 'partners';

        if (landing) {
            // Asset paths in HTML already include /{landing}/ prefix (base='/banking/').
            // So /banking/assets/chunk.js → file exists, serve directly.
            // Only root (/) and SPA routes (/privacy) need prefixing.
            if (path.startsWith('/' + landing)) {
                const res = await fetchAsset(path);
                if (res.ok) return res;
            }

            // Prefix path with landing dir
            const prefixedPath = '/' + landing + path;
            const res = await fetchAsset(prefixedPath);
            if (res.ok) return res;

            // SPA fallback
            return fetchAsset('/' + landing + '/index.html');
        }

        // --- Path-based routing (pages.dev) ---
        const res = await fetchAsset(path);
        if (res.ok) return res;

        // SPA fallback — determine which landing's index.html to serve
        if (path.startsWith('/banking')) return fetchAsset('/banking/index.html');
        if (path.startsWith('/realestate')) return fetchAsset('/realestate/index.html');
        if (path.startsWith('/partners')) return fetchAsset('/partners/index.html');
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
console.log('  Subdomain (wtpref.com):')
console.log('    wtpref.com          → main')
console.log('    banking.wtpref.com  → banking')
console.log('    realestate.wtpref.com → realestate')
console.log('    partners.wtpref.com → partners')
