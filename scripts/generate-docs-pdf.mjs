/**
 * WTP Document Generator — Markdown → PDF
 *
 * Usage:
 *   node scripts/generate-docs-pdf.mjs                    # all .md in docs/
 *   node scripts/generate-docs-pdf.mjs docs/basics/01-glossary.md  # single file
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const CSS_PATH = path.join(DOCS_DIR, 'templates', 'doc-styles.css');
const OUTPUT_DIR = path.join(ROOT, 'public', 'docs');

// Simple Markdown → HTML converter (no external deps)
function mdToHtml(md) {
  let html = md;

  // Front matter → extract title/meta
  let title = '';
  let meta = {};
  const fmMatch = html.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    html = html.slice(fmMatch[0].length).trim();
    fmMatch[1].split('\n').forEach(line => {
      const [key, ...val] = line.split(':');
      if (key && val.length) {
        const k = key.trim();
        const v = val.join(':').trim();
        meta[k] = v;
        if (k === 'title') title = v;
      }
    });
  }

  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');

  // Tables
  html = html.replace(/^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)+)/gm, (match, headerRow, sepRow, bodyRows) => {
    const headers = headerRow.split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
    const rows = bodyRows.trim().split('\n').map(row => {
      const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('\n');
    return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
  });

  // Unordered lists
  html = html.replace(/^((?:- .+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('\n');
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/^((?:\d+\. .+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('\n');
    return `<ol>${items}</ol>`;
  });

  // Paragraphs (lines not already wrapped in tags)
  html = html.split('\n\n').map(block => {
    block = block.trim();
    if (!block) return '';
    if (block.startsWith('<')) return block;
    return `<p>${block.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  return { html, title, meta };
}

function buildHtmlDoc(content, cssContent, title, meta) {
  const date = meta.date || new Date().toISOString().split('T')[0];
  const category = meta.category || 'WTP';
  const version = meta.version || 'v1.0';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&subset=latin,cyrillic&display=swap" rel="stylesheet">
<style>${cssContent}</style>
</head>
<body>

<div class="doc-header">
  <div>
    <div class="label" style="margin-bottom: 8px;">${category}</div>
    <h1>${title}</h1>
  </div>
  <div class="doc-meta">
    <span>${date}</span>
    <span>${version}</span>
    <span>Confidential</span>
  </div>
</div>

${content}

<div class="doc-footer">
  <span>WTP — UAE Execution Partner</span>
  <span>${title}</span>
  <span>${date}</span>
</div>

</body>
</html>`;
}

async function generatePdf(mdPath, browser, cssContent) {
  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  const { html, title, meta } = mdToHtml(mdContent);

  const fullHtml = buildHtmlDoc(html, cssContent, title || path.basename(mdPath, '.md'), meta);

  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

  // Determine output path
  const relativePath = path.relative(DOCS_DIR, mdPath);
  const pdfName = relativePath.replace(/\.md$/, '.pdf');
  const outputPath = path.join(OUTPUT_DIR, pdfName);

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await page.close();
  console.log(`  ✅ ${pdfName}`);
  return outputPath;
}

function findMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'templates') {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'PROJECT_LOG.md') {
      files.push(fullPath);
    }
  }
  return files.sort();
}

// Main
(async () => {
  const args = process.argv.slice(2);
  let mdFiles;

  if (args.length > 0) {
    mdFiles = args.map(f => path.resolve(f));
  } else {
    mdFiles = findMarkdownFiles(DOCS_DIR);
  }

  if (mdFiles.length === 0) {
    console.log('No markdown files found in docs/');
    process.exit(0);
  }

  const cssContent = fs.readFileSync(CSS_PATH, 'utf-8');
  console.log(`\n📄 Generating ${mdFiles.length} PDF(s)...\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];
  for (const mdFile of mdFiles) {
    try {
      const pdfPath = await generatePdf(mdFile, browser, cssContent);
      results.push({ file: mdFile, pdf: pdfPath, ok: true });
    } catch (err) {
      console.error(`  ❌ ${path.basename(mdFile)}: ${err.message}`);
      results.push({ file: mdFile, ok: false, error: err.message });
    }
  }

  await browser.close();

  const ok = results.filter(r => r.ok).length;
  const fail = results.filter(r => !r.ok).length;
  console.log(`\n📊 Done: ${ok} generated, ${fail} failed\n`);

  if (fail > 0) process.exit(1);
})();
