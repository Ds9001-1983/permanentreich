'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { media } from '@/lib/media';
import { hero } from '@/content/copy.de';

/**
 * SM-02/SM-04 — Mobiler Scrollytelling-Hero: Studio-Rundgang als
 * Canvas-Frame-Sequenz (76 Frames), per Scroll gescrubbt (iOS-sicher,
 * kein video.currentTime). Der Text-Overlay fadet über die ersten ~18 %
 * aus, dann führt der Rundgang durch dein Reich bis zum goldenen Sessel.
 *
 * Fallbacks: reduced-motion / Save-Data / Ladefehler → statischer Hero
 * (Poster, keine Pin-Strecke). Poster = Frame 1 → LCP bleibt früh, kein Sprung.
 */
export function HeroScrubMobile({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedMaxRef = useRef(0); // höchster durchgängig geladener Index
  const frameIdxRef = useRef(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Nur Phones, nur ohne Motion-Einschränkung, nicht bei Save-Data
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (
      !window.matchMedia('(max-width: 767px)').matches ||
      prefersReducedMotion() ||
      nav.connection?.saveData
    ) {
      return;
    }

    const { count, frame } = media.hero.scrub;
    let cancelled = false;

    // Progressives Laden: der Reihe nach, damit loadedMax lückenlos wächst
    const ladeFrames = async () => {
      for (let i = 0; i < count && !cancelled; i++) {
        await new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            framesRef.current[i] = img;
            loadedMaxRef.current = i;
            resolve();
          };
          img.onerror = () => resolve(); // Lücke bleibt null, Clamp fängt es
          img.src = frame(i);
        });
        if (i === 0 && !cancelled && framesRef.current[0]) {
          setActive(true); // Pin-Strecke + Canvas erst mit Frame 1 aktivieren
        }
      }
    };
    ladeFrames();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(frameIdxRef.current);
    };

    // object-cover-Zeichnung des Frames auf die Canvas
    const draw = (idx: number) => {
      const img = framesRef.current[Math.min(idx, loadedMaxRef.current)];
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx2d.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    resize();
    window.addEventListener('resize', resize);

    const gctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (media.hero.scrub.count - 1));
          if (idx !== frameIdxRef.current) {
            frameIdxRef.current = idx;
            draw(idx);
          }
        },
      });

      // Text-Overlay fadet über die ersten ~18 % der Strecke aus
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: '18% top',
            scrub: 0.3,
          },
        });
      }
    }, wrap);

    // Die Aktivierung hat die Seite um 150vh verlängert — alle zuvor
    // berechneten Trigger-Positionen (Sektionen, Footer) sind sonst stale.
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', resize);
      gctx.revert();
    };
  }, [active]);

  return (
    <div
      ref={wrapRef}
      className={`relative md:hidden ${active ? 'h-[250vh]' : 'h-[100svh]'}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Poster = Frame 1 (LCP); Canvas übernimmt nahtlos darüber */}
        <Image
          src={media.hero.posterMobile}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <canvas
          ref={canvasRef}
          aria-hidden
          className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Lesbarkeits-Verlauf wie im Desktop-Hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-ivory/70 via-ivory/20 to-transparent"
        />

        {/* Text-Overlay (SSR-sichtbar → LCP), fadet beim Scrubben aus */}
        <div ref={overlayRef} className="relative h-full">
          {children}
        </div>

        {/* Dezenter Hint für den Rundgang */}
        {active && (
          <p
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs uppercase tracking-[0.25em] text-umber-soft"
          >
            {hero.scrollHint}
          </p>
        )}
      </div>
    </div>
  );
}
