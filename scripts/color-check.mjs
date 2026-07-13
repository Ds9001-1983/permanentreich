#!/usr/bin/env node
/**
 * Farbtemperatur-Gate (content/LOOK.md, Messkriterien).
 * Prüft Bilder auf die warme Ivory/Gold-Welt:
 *   - Hue des Bildmittels in 25°–55°
 *   - Warm-Bias der hellsten 10 % Pixel: R−B in +6…+30
 *   - Sättigung des Bildmittels 8–35 %
 * Nutzung: node scripts/color-check.mjs <bild1> [bild2 ...] [--json]
 * Videos vorher: ffmpeg -i v.mp4 -vf "select='eq(n\,0)+eq(n\,60)+eq(n\,120)'" -vsync 0 f%d.png
 */

import sharp from 'sharp';

const files = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const asJson = process.argv.includes('--json');

function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
    case g: h = ((b - r) / d + 2) / 6; break;
    default: h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s, l };
}

const results = [];
for (const file of files) {
  const { data, info } = await sharp(file)
    .resize(64, 64, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = [];
  for (let i = 0; i < data.length; i += info.channels) {
    px.push([data[i], data[i + 1], data[i + 2]]);
  }

  const mean = px
    .reduce((a, p) => [a[0] + p[0], a[1] + p[1], a[2] + p[2]], [0, 0, 0])
    .map((v) => v / px.length);
  const { h, s } = rgbToHsl(...mean);

  // hellste 10 % („Weiß-Patch")
  const bright = [...px].sort((a, b) => b[0] + b[1] + b[2] - (a[0] + a[1] + a[2])).slice(0, Math.ceil(px.length * 0.1));
  const bMean = bright
    .reduce((a, p) => [a[0] + p[0], a[1] + p[1], a[2] + p[2]], [0, 0, 0])
    .map((v) => v / bright.length);
  const warmBias = bMean[0] - bMean[2];

  const checks = {
    hue: h >= 25 && h <= 55,
    warmBias: warmBias >= 6 && warmBias <= 30,
    saturation: s >= 0.08 && s <= 0.35,
  };
  const pass = Object.values(checks).every(Boolean);
  results.push({
    file,
    pass,
    hue: Math.round(h * 10) / 10,
    saturation: Math.round(s * 1000) / 10,
    warmBias: Math.round(warmBias * 10) / 10,
    checks,
  });
}

// Set-Konsistenz: Std-Abweichung der Hues < 12°
if (results.length > 1) {
  const hues = results.map((r) => r.hue);
  const m = hues.reduce((a, b) => a + b, 0) / hues.length;
  const sd = Math.sqrt(hues.reduce((a, b) => a + (b - m) ** 2, 0) / hues.length);
  results.push({ file: '(SET)', pass: sd < 12, hueStdDev: Math.round(sd * 10) / 10 });
}

if (asJson) {
  console.log(JSON.stringify(results, null, 2));
} else {
  for (const r of results) {
    const flag = r.pass ? 'PASS' : 'FAIL';
    console.log(
      `${flag}  ${r.file}` +
        (r.hueStdDev !== undefined
          ? `  hue-sd=${r.hueStdDev}°`
          : `  hue=${r.hue}° sat=${r.saturation}% warmBias=${r.warmBias}`),
    );
  }
}
process.exitCode = results.every((r) => r.pass) ? 0 : 1;
