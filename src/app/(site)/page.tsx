import { AnimatedBackground } from '@/components/home/AnimatedBackground';
import { AtomicSphere } from '@/components/home/AtomicSphere';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { TrustedBySection } from '@/components/home/TrustedBySection';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <main className="relative bg-[#030712]">
      <div className="relative h-screen gradient-hero overflow-hidden">
        {/* Background Layer - z-0 */}
        <AnimatedBackground />
        
        {/* Atomic Sphere - z-10 */}
        <AtomicSphere />
        
        {/* Hero Content - z-20 */}
        <HeroSection />
      </div>

      <ServicesSection />
      <CaseStudiesSection />
      <TrustedBySection />
      <CTASection />
    </main>
  );
}
