'use client';

import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { ablauf } from '@/content/copy.de';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

/**
 * Sektion #8 „Ablauf" (SM-14 Counter): drei editoriale Spalten mit riesigen
 * Gold-Nummern, die bei InView von 00 hochzählen — Hemmschwelle senken.
 * Raster-Spec: komponenten-raster.md #8.
 */
export function ProcessSteps() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Stagger-Fade der drei Spalten (0.15 s Versatz)
      gsap.from('[data-step]', {
        opacity: 0,
        y: 32,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '[data-steps-list]',
          start: 'top 82%',
          once: true,
        },
      });

      // SM-14: Nummern zählen von 00 hoch (textContent-Tween mit Snap, once)
      gsap.utils.toArray<HTMLElement>('[data-step-nr]').forEach((nr, i) => {
        const ziel = Number(nr.dataset.stepNr ?? '0');
        const proxy = { val: 0 };
        nr.textContent = '00';

        gsap.to(proxy, {
          val: ziel,
          duration: 1.2,
          delay: 0.2 + i * 0.15,
          ease: 'power2.inOut',
          snap: { val: 1 },
          scrollTrigger: {
            trigger: '[data-steps-list]',
            start: 'top 82%',
            once: true,
          },
          onUpdate: () => {
            nr.textContent = String(Math.round(proxy.val)).padStart(2, '0');
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ablauf" ref={root} className="bg-ivory py-[clamp(80px,10vw,160px)]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeading eyebrow={ablauf.eyebrow} headline={ablauf.headline} align="center" />

        <ol
          data-steps-list
          className="mt-16 border-l border-champagne pl-7 md:mt-24 md:grid md:grid-cols-3 md:gap-10 md:border-l-0 md:pl-0 lg:gap-14"
        >
          {ablauf.schritte.map((schritt) => (
            <li
              key={schritt.nr}
              data-step
              className="border-champagne pb-12 last:pb-0 [&:not(:first-child)]:border-t [&:not(:first-child)]:pt-10 md:border-t md:pt-10 md:pb-0 md:nth-2:mt-12 md:nth-3:mt-24"
            >
              <span
                data-step-nr={Number(schritt.nr)}
                aria-hidden
                className="block font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none tracking-[-0.02em] text-gold-deep"
              >
                {schritt.nr}
              </span>

              <h3 className="mt-6 font-display text-xl text-umber">{schritt.titel}</h3>
              <p className="mt-3 max-w-[42ch] text-umber-soft">{schritt.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
