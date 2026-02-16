#!/usr/bin/env node

/**
 * Attach PDF links to existing Notion document pages
 * Finds pages in the WTP Documents hub and adds PDF embed blocks
 * Usage: node scripts/attach-pdfs-to-notion.mjs
 */

const NOTION_TOKEN = process.env.NOTION_TOKEN || 'ntn_Z4285883376b84lt1QuyhBPBimJXxwyniO33jWJJyQa7Vj';
const NOTION_VERSION = '2022-06-28';
const BASE_PDF_URL = 'https://lebedevpmm.github.io/WTP2/docs';

// Hub page ID (WTP Documents / Документы)
// We'll find it by searching children of the parent page
const PARENT_PAGE_ID = '2f30ff75-63f0-804a-bcdb-fb0e184ce5a0';

// Map section dir names to match Notion page titles
const SECTION_MATCH = {
  'Basics': 'basics',
  'Process': 'process',
  'Partner': 'partner',
  'LinkedIn Content': 'linkedin',
};

// Map doc filenames to their PDF paths
const DOC_PDF_MAP = {
  // basics
  'Glossary': 'basics/01-glossary.pdf',
  'Глоссарий': 'basics/01-glossary.pdf',
  'Tone of Voice Guide': 'basics/02-tone-guide.pdf',
  'Тон и стиль коммуникации': 'basics/02-tone-guide.pdf',
  'Rejection Templates': 'basics/03-rejection-templates.pdf',
  'Шаблоны отказов': 'basics/03-rejection-templates.pdf',
  // process
  'Banking-First Process Map': 'process/01-process-map.pdf',
  'Карта процесса Banking-First': 'process/01-process-map.pdf',
  'KYC Light Intake Checklist': 'process/02-intake-checklist.pdf',
  'Чек-лист приёма клиента': 'process/02-intake-checklist.pdf',
  'Service Packages': 'process/03-packages.pdf',
  'Пакеты услуг': 'process/03-packages.pdf',
  'Commercial Proposal Template': 'process/04-commercial-proposal.pdf',
  'Шаблон коммерческого предложения': 'process/04-commercial-proposal.pdf',
  'Retainer Support': 'process/05-retainer.pdf',
  'Ретейнер-поддержка': 'process/05-retainer.pdf',
  'Risk Classification Policy': 'process/06-risk-policy.pdf',
  'Политика классификации рисков': 'process/06-risk-policy.pdf',
  // partner
  'One-Pager': 'partner/01-one-pager.pdf',
  'Ван-пейджер': 'partner/01-one-pager.pdf',
  'Email — First Touch': 'partner/02-email-first-touch.pdf',
  'Email — первый контакт': 'partner/02-email-first-touch.pdf',
  'Email — Follow-Up': 'partner/03-email-follow-up.pdf',
  'Email — фоллоу-ап': 'partner/03-email-follow-up.pdf',
  'Email — Pilot Request': 'partner/04-email-pilot-request.pdf',
  'Email — запрос пилота': 'partner/04-email-pilot-request.pdf',
  'Weekly Progress Report': 'partner/05-weekly-report.pdf',
  'Еженедельный отчёт': 'partner/05-weekly-report.pdf',
  // linkedin
  'Pinned Post #1 — Who We Are': 'linkedin/01-pinned-who-we-are.pdf',
  'Закреплённый пост #1 — Кто мы': 'linkedin/01-pinned-who-we-are.pdf',
  'Pinned Post #2 — What We Don\'t Do': 'linkedin/02-pinned-what-we-dont.pdf',
  'Закреплённый пост #2 — Что мы НЕ делаем': 'linkedin/02-pinned-what-we-dont.pdf',
  'Monthly Posts — Month 1': 'linkedin/03-monthly-posts.pdf',
  'Посты Месяца 1': 'linkedin/03-monthly-posts.pdf',
  'Flagship Case Study': 'linkedin/04-flagship-case.pdf',
  'Флагманский кейс': 'linkedin/04-flagship-case.pdf',
};

// --- Notion API ---

async function notionRequest(endpoint, method = 'GET', body = null) {
  const opts = {
    method,
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`https://api.notion.com/v1${endpoint}`, opts);
  const data = await res.json();
  if (!res.ok) {
    console.error(`Notion API error [${res.status}]:`, JSON.stringify(data, null, 2));
    throw new Error(`Notion API ${res.status}: ${data.message || 'Unknown error'}`);
  }
  return data;
}

async function getChildPages(blockId) {
  const pages = [];
  let cursor = undefined;
  do {
    const url = `/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`;
    const data = await notionRequest(url);
    for (const block of data.results) {
      if (block.type === 'child_page') {
        pages.push({ id: block.id, title: block.child_page.title });
      }
    }
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

async function prependBlocks(blockId, children) {
  // Notion appends to end, but we want PDFs at the top
  // We'll get existing first block and use "after" parameter...
  // Actually, Notion API doesn't support prepending. We'll append a divider + PDFs at the beginning
  // by using the approach: get first child, then patch with after=null (prepend not supported)
  // Alternative: just append at the end with a clear label

  // Simpler: append PDF section at the end of the page
  await notionRequest(`/blocks/${blockId}/children`, 'PATCH', { children });
}

function findPdfPath(pageTitle) {
  // Page titles are like "EN Title / RU Title"
  // Try to match either part
  const parts = pageTitle.split(' / ');
  for (const part of parts) {
    const trimmed = part.trim();
    if (DOC_PDF_MAP[trimmed]) return DOC_PDF_MAP[trimmed];
  }

  // Fuzzy match: check if any key is contained in the title
  for (const [key, val] of Object.entries(DOC_PDF_MAP)) {
    if (pageTitle.includes(key)) return val;
  }

  return null;
}

// --- Main ---

async function main() {
  console.log('=== Attaching PDFs to Notion pages ===\n');

  // 1. Find the WTP Documents hub
  console.log('Finding WTP Documents hub...');
  const topPages = await getChildPages(PARENT_PAGE_ID);
  const hubPage = topPages.find(p => p.title.includes('WTP Documents'));

  if (!hubPage) {
    console.error('Hub page "WTP Documents" not found! Children:', topPages.map(p => p.title));
    process.exit(1);
  }
  console.log(`  Hub: ${hubPage.title} (${hubPage.id})\n`);

  // 2. Get section pages
  const sectionPages = await getChildPages(hubPage.id);
  console.log(`  Sections: ${sectionPages.map(p => p.title).join(', ')}\n`);

  let totalAttached = 0;

  // 3. Process each section
  for (const section of sectionPages) {
    console.log(`\n--- ${section.title} ---`);

    // Get document pages in this section
    const docPages = await getChildPages(section.id);

    for (const doc of docPages) {
      const pdfRelPath = findPdfPath(doc.title);

      if (!pdfRelPath) {
        console.log(`  ⏭️  ${doc.title} — no PDF mapping found, skipping`);
        continue;
      }

      const enPdfUrl = `${BASE_PDF_URL}/${pdfRelPath}`;
      const ruPdfUrl = `${BASE_PDF_URL}/ru/${pdfRelPath}`;

      console.log(`  📎 ${doc.title}`);
      console.log(`     EN: ${enPdfUrl}`);
      console.log(`     RU: ${ruPdfUrl}`);

      // Create blocks: divider + heading + EN pdf + RU pdf
      const blocks = [
        { type: 'divider', divider: {} },
        { type: 'heading_2', heading_2: {
          rich_text: [{ type: 'text', text: { content: '📄 PDF Documents / PDF Документы' } }]
        }},
        { type: 'callout', callout: {
          rich_text: [{ type: 'text', text: { content: 'Download branded PDF versions below / Скачайте PDF в фирменном стиле ниже' } }],
          icon: { type: 'emoji', emoji: '📥' },
          color: 'blue_background',
        }},
        { type: 'paragraph', paragraph: {
          rich_text: [
            { type: 'text', text: { content: '🇬🇧 English: ' } },
            { type: 'text', text: { content: pdfRelPath.split('/').pop(), link: { url: enPdfUrl } }, annotations: { bold: true } },
          ]
        }},
        { type: 'paragraph', paragraph: {
          rich_text: [
            { type: 'text', text: { content: '🇷🇺 Русский: ' } },
            { type: 'text', text: { content: pdfRelPath.split('/').pop(), link: { url: ruPdfUrl } }, annotations: { bold: true } },
          ]
        }},
      ];

      await prependBlocks(doc.id, blocks);
      totalAttached++;
      console.log(`     ✅ Attached`);

      // Rate limiting
      await new Promise(r => setTimeout(r, 400));
    }
  }

  // 4. Marketing plan (direct child of hub)
  const mktPage = sectionPages.find(p => p.title.includes('Marketing Strategy') || p.title.includes('Маркетинговая'));
  if (mktPage) {
    console.log(`\n--- Marketing Plan ---`);
    const enUrl = `${BASE_PDF_URL}/marketing-plan-6mo.pdf`;
    console.log(`  📎 ${mktPage.title}`);
    console.log(`     EN: ${enUrl}`);

    const blocks = [
      { type: 'divider', divider: {} },
      { type: 'heading_2', heading_2: {
        rich_text: [{ type: 'text', text: { content: '📄 PDF Document' } }]
      }},
      { type: 'paragraph', paragraph: {
        rich_text: [
          { type: 'text', text: { content: '🇬🇧 English PDF: ' } },
          { type: 'text', text: { content: 'marketing-plan-6mo.pdf', link: { url: enUrl } }, annotations: { bold: true } },
        ]
      }},
    ];

    await prependBlocks(mktPage.id, blocks);
    totalAttached++;
    console.log(`     ✅ Attached`);
  }

  console.log(`\n=== Done! ${totalAttached} pages updated with PDF links ===`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
