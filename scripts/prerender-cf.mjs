#!/usr/bin/env node
/**
 * Prerender the merged Cloudflare bundle into static HTML snapshots.
 *
 * Why this exists: banking / setup / partners / client / realestate.wtp.ae were shipping
 * an empty <div id="root">. A 2026-07-28 crawl of the live domains returned 10-12 words
 * of text per page — the entire landing is client-rendered, so non-JS crawlers (most
 * LLM/AI crawlers, and every SEO tool that doesn't run Chrome) saw nothing at all.
 *
 * This mirrors bigsite/scripts/prerender.mjs: boot the built bundle in headless Chrome,
 * let React render, then write the resulting DOM back over index.html. React re-renders
 * over the snapshot on load, so runtime behaviour is unchanged.
 *
 * Usage: node scripts/prerender-cf.mjs   (after scripts/build-cloudflare.mjs)
 */
import { chromium } from 'playwright-core'
import { createServer } from 'http'
import { readFileSync, writeFileSync, existsSync, statSync } from 'fs'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(root, 'dist/cloudflare')
const PORT = 8937

// Path in the merged bundle → the file to overwrite. 'main' lives at the root.
const LANDINGS = [
    { id: 'main', path: '/' },
    { id: 'banking', path: '/banking/' },
    { id: 'realestate', path: '/realestate/' },
    { id: 'partners', path: '/partners/' },
    { id: 'client', path: '/client/' },
    // Language folder inside a landing — must be listed after its parent and matched
    // by longest prefix, or /client/ru/ renders the English page into the RU file.
    { id: 'client/ru', path: '/client/ru/' },
]

// Longest path first so /client/ru/ wins over /client/.
const BY_DEPTH = LANDINGS.filter((l) => l.id !== 'main').sort((a, b) => b.path.length - a.path.length)

if (!existsSync(OUT)) {
    console.error(`prerender-cf: ${OUT} not found — run scripts/build-cloudflare.mjs first`)
    process.exit(1)
}

const MIME = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
    '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.json': 'application/json',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.webp': 'image/webp', '.pdf': 'application/pdf',
}

// Static server over the merged bundle. Mirrors the _worker.js SPA fallback closely
// enough for rendering: a path with no extension serves that landing's index.html.
const server = createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    let file = join(OUT, p)
    if (!extname(p)) {
        const withSlash = p.endsWith('/') ? p : `${p}/`
        const landing = BY_DEPTH.find((l) => withSlash.startsWith(l.path))
        file = landing ? join(OUT, landing.id, 'index.html') : join(OUT, 'index.html')
    }
    if (!existsSync(file) || statSync(file).isDirectory()) {
        res.writeHead(404).end('not found')
        return
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' })
    res.end(readFileSync(file))
})
await new Promise((r) => server.listen(PORT, r))

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

let ok = 0
let fail = 0
for (const l of LANDINGS) {
    const target = l.id === 'main' ? join(OUT, 'index.html') : join(OUT, l.id, 'index.html')
    try {
        await page.goto(`http://localhost:${PORT}${l.path}`, { waitUntil: 'networkidle', timeout: 30000 })
        await page.waitForTimeout(300)
        const html = await page.content()
        const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
        // Guard: never overwrite a good file with an empty render.
        if (words < 200) {
            console.error(`  FAIL ${l.id}: rendered only ${words} words — not writing`)
            fail++
            continue
        }
        writeFileSync(target, '<!doctype html>\n' + html)
        console.log(`  ok   ${l.id.padEnd(11)} ${words} words`)
        ok++
    } catch (e) {
        console.error(`  FAIL ${l.id}: ${e.message}`)
        fail++
    }
}

await browser.close()
server.close()
console.log(`prerender-cf: ${ok}/${LANDINGS.length} landings${fail ? `, ${fail} FAILED` : ''}`)
process.exit(fail ? 1 : 0)
