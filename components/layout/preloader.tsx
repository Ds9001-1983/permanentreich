'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { preloader } from '@/content/copy.de';
import { media } from '@/lib/media';

const SESSION_KEY = 'pr-preloaded';

/** Lädt ein Bild vor; löst auch bei Fehler auf, damit der Progress nie hängt. */
function ladeBild(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.src = src;
    img
      .decode()
      .then(() => resolve())
      .catch(() => resolve());
  });
}

/**
 * SM-15 — Preloader mit echtem Asset-Progress (Fonts + Schlüsselbilder).
 * Vorhang-Exit nach 100 %, kurzer Fade beim zweiten Besuch in der Session,
 * sofort weg bei prefers-reduced-motion.
 */
export function Preloader() {
  const [sichtbar, setSichtbar] = useState(true);
  const [prozent, setProzent] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inhaltRef = useRef<HTMLDivElement>(null);

  // Wort-Split: Script-Akzent auf „Reich“ — Quelle bleibt copy.de
  const wort = preloader.wort;
  const scriptIndex = wort.lastIndexOf('Reich');
  const displayTeil = scriptIndex > 0 ? wort.slice(0, scriptIndex) : wort;
  const scriptTeil = scriptIndex > 0 ? wort.slice(scriptIndex) : '';

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Reduced Motion: sofort weg, ohne jede Animation
    if (prefersReducedMotion()) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setSichtbar(false);
      return;
    }

    let beendet = false;
    document.body.style.overflow = 'hidden';
    const scrollFreigeben = () => {
      document.body.style.overflow = '';
    };

    const ctx = gsap.context(() => {}, root);

    const abschliessen = () => {
      if (beendet) return;
      sessionStorage.setItem(SESSION_KEY, '1');
      scrollFreigeben();
      setSichtbar(false);
    };

    // Zweiter Besuch in der Session: nur kurzer 0.4s-Fade
    if (sessionStorage.getItem(SESSION_KEY)) {
      setProzent(100);
      ctx.add(() => {
        gsap.to(root, {
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: abschliessen,
        });
      });
      return () => {
        beendet = true;
        ctx.revert();
        scrollFreigeben();
      };
    }

    // Vorhang-Exit: Inhalt zieht leicht voraus, Fläche schiebt sich nach oben
    let exitGestartet = false;
    const exit = () => {
      if (beendet || exitGestartet) return;
      exitGestartet = true;
      ctx.add(() => {
        gsap
          .timeline({ onComplete: abschliessen })
          .to(
            inhaltRef.current,
            { yPercent: -60, opacity: 0, duration: 0.9, ease: 'power4.inOut' },
            0,
          )
          .to(root, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, 0.08);
      });
    };

    // Echter Progress: Fonts + drei lade-relevante Bilder, anteilig gezählt
    const zaehler = { wert: 0 };
    const aufgaben: Promise<unknown>[] = [
      document.fonts.ready,
      ladeBild(media.hero.posterDesktop),
      ladeBild(media.olga.portrait),
      ladeBild(media.wellness.sessel),
    ];

    let fertig = 0;
    const tick = () => {
      fertig += 1;
      const ziel = Math.round((fertig / aufgaben.length) * 100);
      ctx.add(() => {
        gsap.to(zaehler, {
          wert: ziel,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: () => {
            if (!beendet) setProzent(Math.round(zaehler.wert));
          },
          onComplete: () => {
            if (ziel >= 100 && !beendet) {
              setProzent(100);
              gsap.delayedCall(0.25, exit);
            }
          },
        });
      });
    };

    aufgaben.forEach((aufgabe) => {
      Promise.resolve(aufgabe).then(tick, tick);
    });

    // Harter Deckel (LCP/UX): Nach max. 1,8 s geht der Vorhang auf —
    // auch wenn einzelne Assets auf langsamen Verbindungen noch laden.
    const deckel = gsap.delayedCall(1.8, () => {
      if (beendet) return;
      setProzent(100);
      exit();
    });

    return () => {
      deckel.kill();
      beendet = true;
      ctx.revert();
      scrollFreigeben();
    };
  }, []);

  if (!sichtbar) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ivory select-none"
    >
      <div ref={inhaltRef} className="flex flex-col items-center gap-8 px-6 text-center">
        <p className="font-display text-umber text-[clamp(2.5rem,7vw,6rem)]">
          {displayTeil}
          {scriptTeil && <span className="font-script text-gold pl-[0.06em]">{scriptTeil}</span>}
        </p>

        <div className="h-px w-40 overflow-hidden bg-champagne">
          <div
            className="h-full origin-left bg-gold transition-transform duration-500 ease-out"
            style={{ transform: `scaleX(${prozent / 100})` }}
          />
        </div>

        <p className="eyebrow tabular-nums">
          <span className="inline-block min-w-[4ch] text-right">{prozent}</span> %
        </p>
      </div>
    </div>
  );
}
