'use client';

import dynamic from 'next/dynamic';

/**
 * Lazy-Wrapper: Three.js/R3F wird erst im Browser geladen (kein SSR,
 * kein Eintrag im Initial-Bundle der Server-Sektionen).
 */
export const LazySilk = dynamic(
  () => import('./silk-shader').then((m) => m.SilkCanvas),
  { ssr: false },
);

export const LazyGoldParticles = dynamic(
  () => import('./gold-particles').then((m) => m.GoldParticles),
  { ssr: false },
);
