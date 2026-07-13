'use client';

import { useEffect, useState } from 'react';
import { nav, kontakt } from '@/content/copy.de';
import { Magnetic } from '@/components/ui/magnetic';
import { prefersReducedMotion } from '@/lib/gsap';

/**
 * Fixed Header — transparent auf Ivory, blendet bei Scroll-down aus und
 * bei Scroll-up wieder ein (rAF-Scroll-Listener mit Hysterese).
 * Ab 80 px Scroll: zarte Ivory-Fläche + Blur. Mobile: nur Logo + Termin-Pill.
 */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 80);

      if (!reduced) {
        const delta = y - lastY;
        if (y < 120) {
          setHidden(false); // ganz oben: immer sichtbar
        } else if (delta > 6) {
          setHidden(true); // Scroll-down: ausblenden
        } else if (delta < -6) {
          setHidden(false); // Scroll-up: einblenden
        }
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-500 ease-[var(--ease-out-soft)] focus-within:translate-y-0 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'bg-ivory/85 backdrop-blur-sm' : 'bg-transparent'}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 py-4 md:px-10 lg:px-16">
        {/* Wortmarke (typografisch — gestochen scharf in jeder Größe) */}
        <Magnetic strength={0.25}>
          <a
            href="#start"
            aria-label={`${kontakt.name} — zum Seitenanfang`}
            className="flex items-baseline gap-1.5 whitespace-nowrap"
          >
            <span className="font-display text-[1.05rem] uppercase tracking-[0.18em] text-umber-soft">
              Permanent
            </span>
            <span className="font-script text-[1.7rem] leading-none text-gold">Reich</span>
          </a>
        </Magnetic>

        {/* Anchor-Nav — nur Desktop (One-Pager, mobil reicht die Pill) */}
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-9 lg:flex">
          {nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-line text-[0.9375rem] font-normal tracking-[0.02em] text-umber"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Termin-Pill — primärer CTA, min. 56 px Touch-Target */}
        <Magnetic strength={0.3}>
          <a
            href="#termin"
            data-cursor="Buchen"
            className="flex min-h-[56px] items-center rounded-full bg-umber px-8 text-[0.9375rem] font-semibold tracking-[0.04em] text-light transition-colors duration-500 ease-[var(--ease-out-soft)] hover:bg-gold"
          >
            {nav.cta}
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
