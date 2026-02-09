import { AnimatedBackground } from '@/components/home/AnimatedBackground';
import { AtomicSphere } from '@/components/home/AtomicSphere';
import { HeroSection } from '@/components/home/HeroSection';

export default function Home() {
  return (
    <div className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background Layer - z-0 */}
      <AnimatedBackground />
      
      {/* Atomic Sphere - z-10 */}
      <AtomicSphere />
      
      {/* Hero Content - z-20 */}
      <HeroSection />
    </div>
  );
}
