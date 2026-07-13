import { Preloader } from '@/components/layout/preloader';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { HookStatement } from '@/components/sections/hook-statement';
import { ServicesGrid } from '@/components/sections/services-grid';
import { Pmu } from '@/components/sections/pmu';
import { Smp } from '@/components/sections/smp';
import { WellnessPin } from '@/components/sections/wellness-pin';
import { AboutOlga } from '@/components/sections/about-olga';
import { ProcessSteps } from '@/components/sections/process-steps';
import { VoicesMarquee } from '@/components/sections/voices-marquee';
import { BookingCta } from '@/components/sections/booking-cta';

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <HookStatement />
        <ServicesGrid />
        <Pmu />
        <Smp />
        <WellnessPin />
        <AboutOlga />
        <ProcessSteps />
        <VoicesMarquee />
        <BookingCta />
      </main>
      <Footer />
    </>
  );
}
