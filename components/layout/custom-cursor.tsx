'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Custom Cursor (Pflicht, gesamte Site): Gold-Ring, der Interaktives umspielt.
 * Kontext-Labels über `data-cursor="Entdecken|Ziehen|Buchen|Halten"` an
 * beliebigen Elementen. Auf Touch-Geräten deaktiviert (pointer: fine only).
 */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !ring.current || !dot.current) return;

    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' });
    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power2.out' });

    const onMove = (e: MouseEvent) => {
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);

      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button');
      const text = target?.dataset.cursor ?? '';
      if (label.current) label.current.textContent = text;
      gsap.to(ring.current, {
        scale: text ? 3.2 : target ? 1.6 : 1,
        backgroundColor: text ? 'rgba(191, 136, 90, 0.92)' : 'rgba(191, 136, 90, 0)',
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(dot.current, { opacity: text ? 0 : 1, duration: 0.2 });
    };

    const onDown = () => gsap.to(ring.current, { scale: 0.85, duration: 0.15 });
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.3, ease: 'back.out(2)' });

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold"
      >
        <span
          ref={label}
          className="select-none text-[9px] font-semibold uppercase tracking-[0.15em] text-light"
        />
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold"
      />
    </>
  );
}
