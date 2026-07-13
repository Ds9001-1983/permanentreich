#!/usr/bin/env node
/**
 * KI-Bild-Generierung via RunPod z-image-turbo mit automatischer
 * LOOK-Baustein-Injektion (content/LOOK.md ist Gesetz — kein Prompt ohne Look).
 *
 * Nutzung:
 *   node scripts/gen-image.mjs --slot hero-desktop --size "1920*1080" \
 *     --prompt "macro shot of cream silk fabric ..." [--seed 12345] [--count 1]
 *
 * Output: assets/candidates/<slot>/<slot>-<seed>.png + Log-Zeile (JSON) auf stdout.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ENDPOINT = 'https://api.runpod.ai/v2/z-image-turbo';
const API_KEY = process.env.RUNPOD_KEY_ZIMAGE ?? 'RUNPOD_KEY_AUS_ENV';

const LOOK = `editorial luxury beauty photography, warm ivory cream palette (#f5f0e8 background, #e8dcc8 midtones, #bf885a gold accents), soft diffused warm morning light (~4800K), gentle golden backlight, lifted shadows, creamy soft highlights, subtle fine film grain (Fuji Pro 400H pastel emulation), airy negative space, high-key brightness, shot on medium format 80mm — no text, no logos, no watermark, no harsh contrast, no cool or blue tones, no purple, no distorted anatomy`;

function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const slot = arg('slot');
const prompt = arg('prompt');
const size = arg('size', '1920*1080');
const seed = Number(arg('seed', -1));
const count = Number(arg('count', 1));

if (!slot || !prompt) {
  console.error('Pflicht: --slot und --prompt');
  process.exit(1);
}

const outDir = path.join('assets', 'candidates', slot);
await mkdir(outDir, { recursive: true });

async function generateOne(runSeed) {
  const body = {
    input: {
      prompt: `${LOOK}. ${prompt}`,
      size,
      strength: 0.8,
      seed: runSeed,
      output_format: 'png',
      enable_safety_checker: true,
    },
  };

  const res = await fetch(`${ENDPOINT}/runsync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`runsync HTTP ${res.status}: ${await res.text()}`);
  let job = await res.json();

  // Falls der Job asynchron weiterläuft: pollen
  while (job.status === 'IN_QUEUE' || job.status === 'IN_PROGRESS') {
    await new Promise((r) => setTimeout(r, 3000));
    const poll = await fetch(`${ENDPOINT}/status/${job.id}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    job = await poll.json();
  }
  if (job.status !== 'COMPLETED') {
    throw new Error(`Job ${job.id} endete mit ${job.status}: ${JSON.stringify(job).slice(0, 500)}`);
  }

  const out = job.output ?? {};
  // Mögliche Antwortformen abdecken: result-URL (z-image-turbo), URL, Array, base64
  const url =
    out.result ?? out.image_url ?? out.image ?? out.url ?? (Array.isArray(out.images) ? out.images[0]?.url ?? out.images[0] : undefined) ?? (Array.isArray(out) ? out[0]?.url ?? out[0] : undefined);

  const usedSeed = out.seed ?? runSeed;
  const file = path.join(outDir, `${slot}-${usedSeed}.png`);

  if (typeof url === 'string' && url.startsWith('http')) {
    const img = await fetch(url);
    if (!img.ok) throw new Error(`Download HTTP ${img.status}`);
    await writeFile(file, Buffer.from(await img.arrayBuffer()));
  } else if (typeof url === 'string' && url.length > 1000) {
    await writeFile(file, Buffer.from(url.replace(/^data:image\/\w+;base64,/, ''), 'base64'));
  } else {
    throw new Error(`Unbekanntes Output-Format: ${JSON.stringify(out).slice(0, 500)}`);
  }

  // Sidecar-JSON: Remote-URL für i2v-Video-Generierung + Reproduzierbarkeit
  await writeFile(
    `${file}.json`,
    JSON.stringify({ slot, seed: usedSeed, size, remoteUrl: typeof url === 'string' && url.startsWith('http') ? url : null, prompt }, null, 2),
  );

  console.log(JSON.stringify({ slot, file, seed: usedSeed, size }));
  return file;
}

for (let i = 0; i < count; i++) {
  const runSeed = seed === -1 ? Math.floor(Math.random() * 2 ** 31) : seed + i;
  try {
    await generateOne(runSeed);
  } catch (err) {
    console.error(JSON.stringify({ slot, seed: runSeed, error: String(err.message ?? err) }));
    process.exitCode = 1;
  }
}
