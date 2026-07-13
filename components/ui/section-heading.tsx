import { SplitReveal } from '@/components/ui/split-reveal';

/**
 * Editorial-Sektionskopf: Eyebrow (Caps + ✦) über Display-Headline mit Reveal.
 */
export function SectionHeading({
  eyebrow,
  headline,
  align = 'left',
  size = 'lg',
  className = '',
}: {
  eyebrow: string;
  headline: string;
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
      <SplitReveal as="h2" className={`font-display ${sizeClass} text-umber`}>
        {headline}
      </SplitReveal>
    </div>
  );
}
