#!/usr/bin/env node
/**
 * Visuelle QA: Screenshots aller Sektionen (Desktop + Mobile) via Playwright.
 * Nutzung: node scripts/screenshot.mjs [--url http://localhost:3311] [--out assets/qa]
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const url = arg('url', 'http://localhost:3311');
const out = arg('out', 'assets/qa');
await mkdir(out, { recursive: true });

const anchors = ['start', 'reich', 'leistungen', 'pmu', 'smp', 'wellness', 'olga', 'ablauf', 'termin'];

const browser = await chromium.launch();

for (const [name, vp] of [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle' });
  // Preloader abwarten (max 8s)
  await page.waitForTimeout(4500);

  for (const a of anchors) {
    const el = page.locator(`#${a}`);
    try {
      await el.scrollIntoViewIfNeeded({ timeout: 3000 });
      await page.waitForTimeout(1400); // Animationen einlaufen lassen
      await page.screenshot({ path: `${out}/${name}-${a}.png` });
    } catch {
      console.error(`Anker #${a} (${name}) nicht gefunden/scrollbar`);
    }
  }
  // Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${out}/${name}-footer.png` });
  await page.close();
}

await browser.close();
console.log('Screenshots fertig in', out);
