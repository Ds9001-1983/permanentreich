'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/gsap';

/**
 * Capability-Gate für WebGL: false bei reduced-motion, Save-Data,
 * fehlendem WebGL-Kontext oder sehr kleiner Hardware-Concurrency.
 * Fallback ist immer die CSS-Ivory-Welt — kein Layout-Shift.
 */
export function useWebglCapable(): boolean {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    if (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency < 4) return;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
      if (!gl) return;
      setCapable(true);
    } catch {
      /* Fallback bleibt aktiv */
    }
  }, []);

  return capable;
}

/**
 * true, sobald das Element im Viewport ist (Render-Pause außerhalb).
 * `enabled` MUSS neu getriggert werden, wenn das Ziel-Element erst nach
 * einem Capability-Check gerendert wird — sonst wird nie observiert.
 */
export function useInView(
  ref: React.RefObject<Element | null>,
  enabled = true,
  margin = '20%',
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: margin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled, margin]);

  return inView;
}
