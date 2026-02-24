/**
 * WTP Partner Kit — ZIP Archive Builder
 *
 * Creates two ZIP archives:
 *   public/WTP_Partner_Kit_EN.zip
 *   public/WTP_Partner_Kit_RU.zip
 *
 * Each contains 7 documents:
 *   1. WTP_One_Pager.pdf (visual)
 *   2. How_We_Work.pdf
 *   3. What_We_Need_Upfront.pdf
 *   4. Service_Packages.pdf
 *   5. Process_Map.pdf
 *   6. Risk_Policy.pdf
 *   7. Intake_Checklist.pdf
 *
 * Usage: node scripts/build-partner-kit.mjs
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const kits = {
  en: {
    zipName: 'WTP_Partner_Kit_EN.zip',
    folder: 'WTP_Partner_Kit_EN',
    files: [
      { src: 'public/WTP_One_Pager_EN.pdf', dest: '01_WTP_One_Pager.pdf' },
      { src: 'public/docs/partner/06-how-we-work.pdf', dest: '02_How_We_Work.pdf' },
      { src: 'public/docs/partner/07-what-we-need-upfront.pdf', dest: '03_What_We_Need_Upfront.pdf' },
      { src: 'public/docs/process/03-packages.pdf', dest: '04_Service_Packages.pdf' },
      { src: 'public/docs/process/01-process-map.pdf', dest: '05_Process_Map.pdf' },
      { src: 'public/docs/process/06-risk-policy.pdf', dest: '06_Risk_Policy.pdf' },
      { src: 'public/docs/process/02-intake-checklist.pdf', dest: '07_Intake_Checklist.pdf' },
    ],
  },
  ru: {
    zipName: 'WTP_Partner_Kit_RU.zip',
    folder: 'WTP_Partner_Kit_RU',
    files: [
      { src: 'public/WTP_One_Pager_RU.pdf', dest: '01_WTP_One_Pager.pdf' },
      { src: 'public/docs/ru/partner/06-how-we-work.pdf', dest: '02_Как_мы_работаем.pdf' },
      { src: 'public/docs/ru/partner/07-what-we-need-upfront.pdf', dest: '03_Что_нужно_на_старте.pdf' },
      { src: 'public/docs/ru/process/03-packages.pdf', dest: '04_Пакеты_услуг.pdf' },
      { src: 'public/docs/ru/process/01-process-map.pdf', dest: '05_Карта_процесса.pdf' },
      { src: 'public/docs/ru/process/06-risk-policy.pdf', dest: '06_Риск_политика.pdf' },
      { src: 'public/docs/ru/process/02-intake-checklist.pdf', dest: '07_Анкета_приема.pdf' },
    ],
  },
};

for (const [lang, kit] of Object.entries(kits)) {
  console.log(`\n📦 Building ${kit.zipName}...`);

  const tmpDir = path.join(ROOT, '.tmp', kit.folder);

  // Clean and create tmp dir
  fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  let missing = 0;
  for (const { src, dest } of kit.files) {
    const srcPath = path.join(ROOT, src);
    const destPath = path.join(tmpDir, dest);

    if (!fs.existsSync(srcPath)) {
      console.log(`  ❌ Missing: ${src}`);
      missing++;
      continue;
    }

    fs.copyFileSync(srcPath, destPath);
    const size = (fs.statSync(srcPath).size / 1024).toFixed(0);
    console.log(`  ✅ ${dest} (${size} KB)`);
  }

  if (missing > 0) {
    console.log(`\n  ⚠️  ${missing} file(s) missing — ZIP not created for ${lang.toUpperCase()}`);
    fs.rmSync(tmpDir, { recursive: true, force: true });
    continue;
  }

  // Create ZIP
  const zipPath = path.join(PUBLIC, kit.zipName);
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

  execSync(`cd "${path.join(ROOT, '.tmp')}" && zip -r "${zipPath}" "${kit.folder}"`, { stdio: 'pipe' });

  const zipSize = (fs.statSync(zipPath).size / 1024).toFixed(0);
  console.log(`\n  📁 ${kit.zipName} — ${zipSize} KB`);

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

// Cleanup tmp dir
fs.rmSync(path.join(ROOT, '.tmp'), { recursive: true, force: true });

console.log('\n✅ Done!\n');
