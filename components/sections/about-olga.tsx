'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { SectionHeading } from '@/components/ui/section-heading';
import { olga, kontakt } from '@/content/copy.de';
import { media } from '@/lib/media';

/**
 * Sektion #7 „Über Olga" — asymmetrisches 5/7-Editorial-Layout.
 * SM-13: Portrait scrollt mit sanftem Parallax (nur Desktop, scrub),
 * BTS-Bild liegt versetzt wie ein editorial eingelegtes Polaroid darauf.
 */
export function AboutOlga() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const tween = gsap.fromTo(
        parallaxRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="olga"
      ref={sectionRef}
      className="bg-light py-[clamp(80px,10vw,160px)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          {/* Portrait mit Parallax + eingelegtem BTS-Polaroid */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden">
              {/* Innerer Frame ist auf Desktop 20 % höher, damit yPercent ±8 nie Ränder freilegt */}
              <div
                ref={parallaxRef}
                className="absolute inset-0 will-change-transform lg:-inset-y-[10%]"
              >
                <Image
                  src={media.olga.portrait}
                  alt={kontakt.inhaberin}
                  fill
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>

            <figure className="absolute -bottom-8 -right-2 w-40 rotate-3 border border-champagne bg-light p-2 md:-right-8">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={media.olga.bts}
                  alt={olga.bts}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <figcaption className="eyebrow mt-2 leading-snug">
                {olga.bts}
              </figcaption>
            </figure>
          </div>

          {/* Textspalte */}
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow={olga.eyebrow} headline={olga.headline} />

            <p className="font-script mt-8 text-[clamp(1.8rem,3vw,2.6rem)] text-gold-deep">
              {olga.zitat}
            </p>

            <div className="mt-8 max-w-[54ch] space-y-6">
              {olga.text.map((absatz) => (
                <p key={absatz} className="text-umber-soft">
                  {absatz}
                </p>
              ))}
            </div>

            <p className="font-script mt-10 text-2xl text-umber">
              {olga.signatur}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
