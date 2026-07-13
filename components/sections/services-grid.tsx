'use client';

import { useEffect, useRef } from 'react';
import { leistungen } from '@/content/copy.de';
import { media, VIDEOS_READY } from '@/lib/media';
import { SectionHeading } from '@/components/ui/section-heading';
import { VideoTile } from '@/components/ui/video-tile';
import { Magnetic } from '@/components/ui/magnetic';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

/**
 * Sektion #3 „Leistungen" — asymmetrisches Editorial-Grid (SM-10 + SM-05).
 * Drei Reiche als Hover-Video-Tiles mit bewusstem Spalten-Versatz und
 * sanftem Parallax beim Scroll (nur Desktop, nur ohne Reduced Motion).
 */

/** Editorial-Layout je Spalte: Span, Versatz, Parallax-Tempo, Bildgrößen. */
const columns = [
  {
    span: 'lg:col-span-5',
    offset: 'lg:mt-0',
    parallax: -8,
    sizes: '(max-width: 1023px) 92vw, 38vw',
  },
  {
    span: 'lg:col-span-4',
    offset: 'lg:mt-24',
    parallax: 5,
    sizes: '(max-width: 1023px) 92vw, 30vw',
  },
  {
    span: 'lg:col-span-3',
    offset: 'lg:mt-48',
    parallax: 14,
    sizes: '(max-width: 1023px) 92vw, 23vw',
  },
] as const;

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]', section).forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax ?? 0),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="leistungen"
      ref={sectionRef}
      className="bg-ivory py-[clamp(80px,10vw,160px)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow={leistungen.eyebrow}
          headline={leistungen.headline}
          className="max-w-3xl"
        />

        <div className="mt-16 grid grid-cols-1 gap-y-20 lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
          {leistungen.items.map((item, i) => {
            const col = columns[i % columns.length];
            const tile = media.tiles[item.id];

            return (
              <div
                key={item.id}
                data-parallax={col.parallax}
                className={`${col.span} ${col.offset} will-change-transform`}
              >
                <Magnetic strength={0.06}>
                  <a href={item.anchor} data-cursor="Entdecken" className="group block">
                    <VideoTile
                      poster={tile.poster}
                      videoSrc={VIDEOS_READY ? tile.video : undefined}
                      alt={item.titel}
                      sizes={col.sizes}
                    />
                    <div className="mt-7">
                      <p className="eyebrow mb-3">{item.eyebrow}</p>
                      <h3 className="font-display text-2xl text-umber transition-colors duration-500 group-hover:text-gold">
                        {item.titel}
                      </h3>
                      <p className="mt-3 max-w-[40ch] text-umber-soft">{item.text}</p>
                      <span className="link-line mt-6 inline-block text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-umber">
                        Mehr&nbsp;<span className="text-gold">✦</span>
                      </span>
                    </div>
                  </a>
                </Magnetic>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
