'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

/**
 * Signature-Move (Custom Micro): Vorher/Nachher-Drag-Slider mit Gold-Rauten-Griff.
 * Pointer-Drag + Tastatur (Pfeiltasten, role="slider"). Cursor-Label „Ziehen".
 */
export function BeforeAfterSlider({
  vorher,
  nachher,
  vorherLabel = 'Vorher',
  nachherLabel = 'Nachher',
  alt,
  aspect = 'aspect-[4/5]',
  className = '',
}: {
  vorher: string;
  nachher: string;
  vorherLabel?: string;
  nachherLabel?: string;
  alt: string;
  aspect?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const container = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = container.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(97, Math.max(3, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(3, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(97, p + 4));
  };

  return (
    <div
      ref={container}
      data-cursor="Ziehen"
      className={`group relative ${aspect} w-full touch-pan-y select-none overflow-hidden ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Nachher (volle Fläche, darunter) */}
      <Image src={nachher} alt={`${alt} — ${nachherLabel}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      {/* Vorher (oben, per clip-path freigegeben) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={vorher} alt={`${alt} — ${vorherLabel}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>

      {/* Trennlinie + Griff */}
      <div
        role="slider"
        aria-label={`${alt}: Vergleich ${vorherLabel}/${nachherLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 z-10 w-px bg-light/90"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="h-5 w-5 rotate-45 border border-light bg-gold shadow-[0_2px_16px_rgba(46,38,32,0.35)] transition-transform duration-300 group-hover:scale-110" />
        </span>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-umber/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-light backdrop-blur-[2px]">
        {vorherLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-gold/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-light">
        {nachherLabel}
      </span>
    </div>
  );
}
