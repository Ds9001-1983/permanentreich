#!/usr/bin/env node
/**
 * Image-to-Video via RunPod seedance-v1-5-pro-i2v.
 * Nutzung:
 *   node scripts/gen-video.mjs --slot hero-desktop --image <URL> \
 *     --prompt "slow silk ripple ..." --ar 16:9 [--duration 5] [--resolution 1080p]
 * Output: assets/videos/<slot>-raw.mp4
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ENDPOINT = 'https://api.runpod.ai/v2/seedance-v1-5-pro-i2v';
const API_KEY = process.env.RUNPOD_KEY_SEEDANCE ?? 'RUNPOD_KEY_AUS_ENV';

function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const slot = arg('slot');
const image = arg('image');
const prompt = arg('prompt');
const ar = arg('ar', '16:9');
const duration = Number(arg('duration', 5));
const resolution = arg('resolution', '1080p');

if (!slot || !image || !prompt) {
  console.error('Pflicht: --slot, --image, --prompt');
  process.exit(1);
}

await mkdir('assets/videos', { recursive: true });

const res = await fetch(`${ENDPOINT}/run`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
  body: JSON.stringify({
    input: {
      prompt,
      image,
      aspect_ratio: ar,
      duration,
      resolution,
      seed: -1,
      camera_fixed: true,
      generate_audio: false,
    },
  }),
});
if (!res.ok) {
  console.error(`run HTTP ${res.status}: ${await res.text()}`);
  process.exit(1);
}
let job = await res.json();
const started = Date.now();

while (job.status === 'IN_QUEUE' || job.status === 'IN_PROGRESS') {
  if (Date.now() - started > 15 * 60 * 1000) {
    console.error(`Timeout nach 15min, Job ${job.id}`);
    process.exit(1);
  }
  await new Promise((r) => setTimeout(r, 8000));
  const poll = await fetch(`${ENDPOINT}/status/${job.id}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  job = await poll.json();
}

if (job.status !== 'COMPLETED') {
  console.error(`Job endete mit ${job.status}: ${JSON.stringify(job).slice(0, 600)}`);
  process.exit(1);
}

const out = job.output ?? {};
const url =
  out.result ?? out.video_url ?? out.video ?? out.url ?? (Array.isArray(out.videos) ? out.videos[0]?.url ?? out.videos[0] : undefined);

if (typeof url !== 'string' || !url.startsWith('http')) {
  console.error(`Unbekanntes Output-Format: ${JSON.stringify(out).slice(0, 600)}`);
  process.exit(1);
}

const file = path.join('assets/videos', `${slot}-raw.mp4`);
const dl = await fetch(url);
if (!dl.ok) {
  console.error(`Download HTTP ${dl.status}`);
  process.exit(1);
}
await writeFile(file, Buffer.from(await dl.arrayBuffer()));
console.log(JSON.stringify({ slot, file, remoteUrl: url, seconds: Math.round((Date.now() - started) / 1000) }));
