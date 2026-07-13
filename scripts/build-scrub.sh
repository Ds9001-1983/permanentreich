#!/bin/bash
# Studio-Rundgang (IMG_6698.mov, iPhone HLG/HDR 2160x3840@60) → Scrollytelling-Frames
# Pipeline: HLG→SDR-Tonemapping → Brand-LUT → jeder 5. Frame → 640x1138 WebP
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="Projektordner/IMG_6698.mov"
LUT="assets/brand/hald-permanentreich.png"
OUT="public/media/hero/scrub"
QUALITY="${SCRUB_Q:-58}"

rm -rf "$OUT" && mkdir -p "$OUT"

# HLG wird als SDR interpretiert (rückwärtskompatibel, wirkt leicht flach) —
# eq kompensiert Kontrast/Sättigung, danach Brand-LUT für den Marken-Look.
# ffmpeg-Build hat keinen WebP-Encoder → PNG-Zwischenschritt + sharp.
TMP=$(mktemp -d)
ffmpeg -y -loglevel error -i "$SRC" -i "$LUT" -filter_complex "\
[0:v]select='not(mod(n\,5))',format=rgb24,eq=contrast=1.12:saturation=1.18:gamma=0.97[sdr];\
[sdr][1:v]haldclut,scale=640:1138:flags=lanczos,setsar=1[graded]" \
  -map "[graded]" -fps_mode passthrough "$TMP/f%02d.png"

SCRUB_TMP="$TMP" SCRUB_OUT="$OUT" SCRUB_QUALITY="$QUALITY" node -e '
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const tmp = process.env.SCRUB_TMP, out = process.env.SCRUB_OUT;
const q = Number(process.env.SCRUB_QUALITY);
(async () => {
  const files = fs.readdirSync(tmp).filter(f => f.endsWith(".png")).sort();
  for (const f of files) {
    await sharp(path.join(tmp, f)).webp({ quality: q }).toFile(path.join(out, f.replace(".png", ".webp")));
  }
  console.log("konvertiert:", files.length);
})();
'
rm -rf "$TMP"

COUNT=$(ls "$OUT" | wc -l | tr -d ' ')
SIZE=$(du -sh "$OUT" | cut -f1)
echo "Frames: $COUNT · Gesamt: $SIZE"

# Frame 1 als LCP-Poster (Sequenzstart, kein Sprung beim Scrub-Beginn)
ffmpeg -y -loglevel error -i "$OUT/f01.webp" -q:v 3 -update 1 public/media/hero/poster-mobile.jpg
echo "Poster aktualisiert: public/media/hero/poster-mobile.jpg"
