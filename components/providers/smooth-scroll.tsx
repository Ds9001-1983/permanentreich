'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });

    instance.on('scroll', ScrollTrigger.update);
    // Abgesichert: Ein Fehler aus einem einzelnen Frame (z. B. WebGL-Context-
    // Loss in Safari) darf niemals das Scrolling dauerhaft einfrieren.
    const raf = (time: number) => {
      try {
        instance.raf(time * 1000);
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') console.error(err);
      }
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
