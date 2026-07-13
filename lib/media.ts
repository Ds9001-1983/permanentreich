/**
 * Zentrale Medien-Map — einzige Quelle für Medien-Pfade in Sektionen.
 * Phase 5b ersetzt Platzhalter (Hero-Video, Tiles) durch Judging-Gewinner;
 * die Pfade bleiben stabil.
 */

export const media = {
  hero: {
    posterDesktop: '/media/hero/poster-desktop.jpg',
    posterMobile: '/media/hero/poster-mobile.jpg',
    videoDesktopMp4: '/media/hero/hero.mp4',
    videoDesktopWebm: '/media/hero/hero.webm',
    videoMobileMp4: '/media/hero/hero-mobile.mp4',
    /** Mobiler Scrollytelling-Rundgang (scripts/build-scrub.sh) */
    scrub: {
      count: 76,
      frame: (i: number) => `/media/hero/scrub/f${String(i + 1).padStart(2, '0')}.webp`,
    },
  },
  tiles: {
    pmu: { poster: '/media/tiles/pmu.jpg', video: '/media/tiles/pmu.mp4' },
    smp: { poster: '/media/tiles/smp.jpg', video: '/media/tiles/smp.mp4' },
    wellness: { poster: '/media/tiles/wellness.jpg', video: '/media/tiles/wellness.mp4' },
  },
  results: {
    pmu: { vorher: '/media/results/pmu-vorher.jpg', nachher: '/media/results/pmu-nachher.jpg' },
    smpFrau: { vorher: '/media/results/smp-frau-vorher.jpg', nachher: '/media/results/smp-frau-nachher.jpg' },
    smpMann: { vorher: '/media/results/smp-mann-vorher.jpg', nachher: '/media/results/smp-mann-nachher.jpg' },
  },
  olga: {
    portrait: '/media/olga/portrait-1.jpg',
    portraitAlt: '/media/olga/portrait-2.jpg',
    bts: '/media/olga/bts.jpg',
  },
  wellness: {
    sessel: '/media/wellness/sessel.jpg',
  },
  textures: {
    paper: '/media/textures/paper.jpg',
    interior: '/media/textures/interior.jpg',
  },
  logo: '/logo.svg',
} as const;

/** Hover-Videos + Hero-Videos sind generiert, komprimiert und farb-geprüft */
export const VIDEOS_READY = true;
