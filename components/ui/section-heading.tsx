import { SplitReveal } from '@/components/ui/split-reveal';

/**
 * Editorial-Sektionskopf: Eyebrow (Caps + ✦) über Display-Headline mit Reveal.
 * Optionaler `script`-Einwurf (Pinyon, Gold): legt sich leicht gedreht und
 * sanft schwebend über die Oberkante der Headline — der verspielte Layer
 * über dem strengen Editorial (Verspielt-Paket, Stil-Nachtrag 2026-07-13).
 */
export function SectionHeading({
  eyebrow,
  headline,
  script,
  align = 'left',
  size = 'lg',
  className = '',
}: {
  eyebrow: string;
  headline: string;
  script?: string;
  align?: 'left' | 'center';
  size?: 'lg' | 'xl';
  className?: string;
}) {
  const sizeClass =
    size === 'xl'
      ? 'text-[clamp(2.8rem,7vw,6.5rem)]'
      : 'text-[clamp(2.2rem,5vw,4.5rem)]';

  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      <p className="eyebrow mb-5">{eyebrow}</p>
      {script && (
        <span
          aria-hidden
          className={`font-script pointer-events-none relative z-10 -mb-[0.28em] block w-fit text-[clamp(1.9rem,3.4vw,3.2rem)] text-gold-deep [--schweb-rot:-4deg] motion-safe:animate-[schweben_5.5s_ease-in-out_infinite_alternate] motion-reduce:-rotate-[4deg] ${
            align === 'center' ? 'mx-auto' : 'ml-[14%]'
          }`}
        >
          {script}
        </span>
      )}
      <SplitReveal as="h2" className={`font-display ${sizeClass} text-umber`}>
        {headline}
      </SplitReveal>
    </div>
  );
}
