import { Marquee } from '@/components/ui/marquee';
import { stimmen } from '@/content/copy.de';

/**
 * Sektion #9 „Stimmen" (SM-07): zwei gegenläufige Marquee-Bänder —
 * Band 1 trägt die Kundinnen-Zitate, Band 2 wiederholt den Claim
 * als riesige Champagne-Typo. Full-width, Hover pausiert (im Primitive).
 */
export function VoicesMarquee() {
  return (
    <section className="overflow-clip bg-light py-[clamp(60px,8vw,120px)]">
      {/* Eyebrow zentriert, einziger Container-Teil der Sektion */}
      <div className="mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
        <h2 className="eyebrow">{stimmen.eyebrow}</h2>
      </div>

      {/* Band 1: Kundinnen-Zitate */}
      <Marquee duration={55} className="mt-[clamp(40px,5vw,72px)]">
        {stimmen.zitate.map((zitat) => (
          <figure
            key={zitat.name}
            className="mr-16 inline-flex max-w-md flex-col items-start border-l border-gold pl-6"
          >
            <blockquote
              className="font-display text-lg italic text-umber"
              style={{ lineHeight: 1.4 }}
            >
              „{zitat.text}“
            </blockquote>
            <figcaption className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-umber-soft">
              {zitat.name} · {zitat.ort}
            </figcaption>
          </figure>
        ))}
      </Marquee>

      {/* Band 2: Claim-Repetition — rein dekorativ, daher aria-hidden */}
      <div aria-hidden>
        <Marquee reverse duration={40} className="mt-12">
          {stimmen.marquee.map((wort) => (
            <span key={wort} className="flex items-center">
              <span className="whitespace-nowrap font-display text-[clamp(2.5rem,6vw,5rem)] text-gold-deep">
                {wort}
              </span>
              <span className="mx-[clamp(1.25rem,3vw,2.75rem)] text-[clamp(1.25rem,2.5vw,2rem)] text-gold">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
