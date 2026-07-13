'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { hook } from '@/content/copy.de';
import { media } from '@/lib/media';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Flourish } from '@/components/ui/flourish';
import { Sparkles } from '@/components/ui/sparkles';

/**
 * Sektion #2 „Hook" (SM-12 Mask-Reveal): drei Mega-Typo-Zeilen,
 * die per Scroll-Scrub aus einer Maske aufsteigen — ruhig, organic-flowing.
 */
export function HookStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('[data-hook-line]');

      // Drei nacheinander getriggerte Scrub-Reveals (80/70/60 % der Viewport-Höhe)
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { yPercent: 105, opacity: 0.2 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: `top ${80 - i * 10}%`,
              end: `top ${42 - i * 10}%`,
              scrub: 0.6,
            },
          },
        );
      });

      gsap.fromTo(
        '[data-hook-sub]',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-hook-sub]', start: 'top 88%', once: true },
        },
      );

      gsap.fromTo(
        '[data-hook-ornament]',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.6,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: '[data-hook-sub]', start: 'top 88%', once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reich"
      className="relative overflow-hidden bg-light py-[clamp(80px,10vw,160px)]"
    >
      {/* Dekorative Papiertextur */}
      <Image
        src={media.textures.paper}
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="pointer-events-none select-none object-cover opacity-60"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
        {/* Zugängliche Überschrift — die animierten Zeilen sind dekorativ */}
        <h2 className="sr-only">{hook.lines.join(' ')}</h2>

        <div aria-hidden>
          {hook.lines.map((line, i) => (
            <div key={line} className="-mb-[0.1em] overflow-hidden pb-[0.1em]">
              <span
                data-hook-line
                className={`block font-display text-[clamp(3rem,11vw,10rem)] leading-[1.02] tracking-[-0.03em] will-change-transform ${
                  i === 1 ? 'italic text-gold-deep' : 'text-umber'
                }`}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        <p
          data-hook-sub
          className="mx-auto mt-10 max-w-lg text-lg leading-relaxed text-umber-soft md:mt-14"
        >
          {hook.sub}
        </p>

        {/* Verspielt: Gold-Swash zeichnet sich als Abschluss */}
        <div data-hook-ornament className="mt-10 flex justify-center">
          <Flourish className="h-8 w-56" />
        </div>
      </div>

      {/* Schwebende Gold-Funken über der Sektion */}
      <Sparkles />
    </section>
  );
}
