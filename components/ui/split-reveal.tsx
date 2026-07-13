'use client';

import { createElement, useEffect, useRef, type ElementType } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  /** true = sofort beim Mount (Hero), false = beim Scroll-Eintritt */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
};

/**
 * SM-01 Split-Text-Reveal: Wörter steigen aus einer Maske auf (organic-flowing).
 * Split via Intl.Segmenter (kein GSAP-Club nötig). Script-Wörter bleiben ganz.
 */
export function SplitReveal({
  children,
  as = 'span',
  className,
  immediate = false,
  delay = 0,
  stagger = 0.055,
}: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.visibility = 'visible';
      return;
    }

    const targets = el.querySelectorAll<HTMLElement>('[data-word-inner]');
    el.style.visibility = 'visible';
    gsap.set(targets, { yPercent: 115 });

    const tween = gsap.to(targets, {
      yPercent: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger,
      delay,
      ...(immediate
        ? {}
        : {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }),
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [children, immediate, delay, stagger]);

  const segmenter = new Intl.Segmenter('de', { granularity: 'word' });
  const words: string[] = [];
  let buffer = '';
  for (const seg of segmenter.segment(children)) {
    if (/^\s+$/.test(seg.segment)) {
      if (buffer) words.push(buffer);
      buffer = '';
    } else {
      buffer += seg.segment;
    }
  }
  if (buffer) words.push(buffer);

  return createElement(
    as,
    { ref: root, className, style: { visibility: 'hidden' }, 'aria-label': children },
    words.map((word, i) => (
      <span
        key={`${word}-${i}`}
        aria-hidden
        className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-baseline"
      >
        <span data-word-inner className="inline-block will-change-transform">
          {word}
        </span>
        {i < words.length - 1 ? ' ' : ''}
      </span>
    )),
  );
}
