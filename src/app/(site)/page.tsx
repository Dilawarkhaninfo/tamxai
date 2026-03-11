import { AnimatedBackground } from '@/components/home/AnimatedBackground';
import { AtomicSphere } from '@/components/home/AtomicSphere';
import { HeroSection } from '@/components/home/HeroSection';
import { HeroScrollController } from '@/components/home/HeroScrollController';
import { ServicesSection } from '@/components/home/ServicesSection';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { TrustedBySection } from '@/components/home/TrustedBySection';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="relative">
      <main>
        <AnimatedBackground />
        <HeroScrollController />

        <div className="relative w-full h-screen z-40 overflow-x-hidden" id="hero-section">
          <h2
            id="hero-company"
            className="absolute top-30 left-1/2 -translate-x-1/2 text-[14vw] font-bold text-nowrap text-center opacity-5 pointer-events-none select-none"
          >
            TAMX AI
          </h2>

          <AtomicSphere />
          <HeroSection />
        </div>

        <div className="pt-40 sm:pt-60 overflow-x-hidden relative z-20">
          <div className="relative flex flex-col mb-40 sm:mb-60 gap-40 sm:gap-80 w-main m-auto">
            <ServicesSection />
            <CaseStudiesSection />
            <TrustedBySection />
            <CTASection />
          </div>
        </div>
      </main>
    </div>
  );
}
