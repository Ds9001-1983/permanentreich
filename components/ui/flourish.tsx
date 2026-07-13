'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

/**
 * Verspielt-Paket — handgezeichneter Gold-Swash, der sich beim Scrollen
 * selbst zeichnet (stroke-dashoffset). Rein dekorativ (aria-hidden);
 * bei reduced-motion steht er sofort vollständig da.
 */
const PATHS = {
  /** geschwungene Unterstreichung mit kleiner Schleife */
  swash:
    'M3 24 C 48 34, 118 8, 176 15 C 208 19, 216 32, 199 33 C 186 34, 190 15, 226 12 C 252 10, 278 15, 297 19',
  /** kurzer Bogen für Signaturen */
  bogen: 'M3 20 C 60 32, 150 4, 297 16',
} as const;

export function Flourish({
  variant = 'swash',
  className = '',
}: {
  variant?: keyof typeof PATHS;
  className?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || prefersReducedMotion()) return;

    const laenge = path.getTotalLength();
    const tween = gsap.fromTo(
      path,
      { strokeDasharray: laenge, strokeDashoffset: laenge },
      {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: path, start: 'top 88%', once: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <svg
      aria-hidden
      viewBox="0 0 300 40"
      fill="none"
      className={`text-gold ${className}`}
    >
      <path
        ref={pathRef}
        d={PATHS[variant]}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
