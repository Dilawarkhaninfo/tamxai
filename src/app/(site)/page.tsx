import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FaqSection } from '@/components/home/FaqSection';
import { TrustedBySection } from '@/components/home/TrustedBySection';
import { CTASection } from '@/components/home/CTASection';
import { HomeVideoSection } from '@/components/home/HomeVideoSection';
import { getPublishedServices } from '@/app/_actions/services';
import { getActiveTestimonials } from '@/app/_actions/testimonials';

const AnimatedBackground = dynamic(() => import('@/components/home/AnimatedBackground').then(m => m.AnimatedBackground));
const AtomicSphere = dynamic(() => import('@/components/home/AtomicSphere').then(m => m.AtomicSphere));
const HeroScrollController = dynamic(() => import('@/components/home/HeroScrollController').then(m => m.HeroScrollController));

export const metadata: Metadata = {
  title: 'TAMx — AI-Powered Digital Solutions for Modern Businesses',
  description: 'TAMx builds intelligent software, AI-powered products, and scalable digital platforms. From product design to deployment — we deliver solutions that drive growth.',
  openGraph: {
    title: 'TAMx — AI-Powered Digital Solutions for Modern Businesses',
    description: 'Intelligent software, AI-powered products, and scalable digital platforms for startups and enterprises.',
    url: '/',
  },
};

export default async function Home() {
  const [services, testimonials] = await Promise.all([
    getPublishedServices(),
    getActiveTestimonials(),
  ]);
  return (
    <div className="relative">
      <main>
        <AnimatedBackground />
        <HeroScrollController />

        <div className="relative w-full h-screen z-40 overflow-hidden" id="hero-section">
          <h2
            id="hero-company"
            className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[18vw] sm:text-[14vw] font-bold text-nowrap text-center opacity-[0.03] pointer-events-none select-none"
          >
            TAMX.AI &nbsp; TAMX.AI &nbsp; TAMX.AI
          </h2>

          <AtomicSphere />
          <HeroSection />
        </div>

        <HomeVideoSection />

        <div className="pt-40 sm:pt-60 overflow-x-hidden relative z-20">
          <div className="relative flex flex-col mb-40 sm:mb-60 gap-20 sm:gap-32 w-main m-auto">
            <ServicesSection services={services} />
            <TestimonialsSection dbTestimonials={testimonials} />
            <TrustedBySection />
            <FaqSection />
            <CTASection />
          </div>
        </div>
      </main>
    </div>
  );
}
