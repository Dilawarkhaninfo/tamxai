'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import './CTASection.css';

gsap.registerPlugin(ScrollTrigger);

import { PageSection } from '@/components/layout/PageSection';
import { InfinityScientist } from './InfinityScientist';

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveTextRef = useRef<HTMLSpanElement>(null);
  const [stars, setStars] = React.useState<any[]>([]);

  useEffect(() => {
    // Generate stars only on the client to avoid hydration mismatch
    const generatedStars = [...Array(80)].map((_, i) => ({
      id: i,
      width: Math.random() * 2 + 0.5 + 'px',
      height: Math.random() * 2 + 0.5 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      animation: `glow ${Math.random() * 4 + 2}s infinite alternate ease-in-out`,
      animationDelay: Math.random() * 5 + 's'
    }));
    setStars(generatedStars);

    const ctx = gsap.context(() => {
      // 1. Text Wave Animation
      const words = waveTextRef.current?.querySelectorAll('.wave-word');
      if (words) {
        gsap.to(words, {
          y: -12,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.15,
            from: 'center',
          },
          ease: 'power1.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const secondLine = "powerful digital AI realities.";
  const thirdLine = "that redefine the future.";
  const secondWords = secondLine.split(' ');

  return (
    <PageSection id="cta" fullHeight={true} z={40} className="bg-black overflow-hidden relative">
      {/* Cinematic Galaxy Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-black">
        {/* Deep Space Gradient - Subtle */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.06),transparent_80%)]" />
        
        {/* Animated Gradient Waves */}
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 w-full h-full bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-blue/20 animate-pulse" />
            <motion.div 
               animate={{ 
                 x: [-100, 100],
                 opacity: [0.1, 0.3, 0.1]
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/4 -left-1/4 w-[150%] h-1/2 bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent blur-[120px] rotate-12"
            />
            <motion.div 
               animate={{ 
                 x: [100, -100],
                 opacity: [0.1, 0.2, 0.1]
               }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute bottom-1/4 -right-1/4 w-[150%] h-1/2 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent blur-[120px] -rotate-12"
            />
        </div>

        {/* Starfield / Galaxy Dots - Placed behind everything */}
        <div className="starfield-layer absolute inset-0 z-0 opacity-40">
          {stars.map((star) => (
            <div 
              key={star.id} 
              className="star absolute bg-white rounded-full opacity-0"
              style={{
                width: star.width,
                height: star.height,
                top: star.top,
                left: star.left,
                animation: star.animation,
                animationDelay: star.animationDelay
              }}
            />
          ))}
        </div>

        {/* Cinematic Fog & Lighting - Very subtle to avoid wash-out */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.02),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 h-full flex flex-col items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-[1400px]"
        >
          {/* Left Content */}
          <div className="cta-content-inner text-left lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-brand-lavender/30" />
              <span className="text-brand-lavender font-bold uppercase tracking-[0.4em] text-[10px]">Visionaries only</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-[68px] font-bold text-white leading-[0.9] tracking-tighter mb-10">
              <span className="block opacity-50 font-light mb-2">We turn bold ideas into</span>
              <span ref={waveTextRef} className="block mb-2">
                <span className="gradient-text drop-shadow-[0_10px_30px_rgba(139,92,246,0.3)]">
                  {secondWords.map((word, i) => (
                    <span key={i} className="wave-word inline-block mr-[0.2em] relative">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
              <span className="block opacity-90 text-[clamp(1.5rem,4vw,2.8rem)] font-medium text-brand-lavender/80">
                {thirdLine}
              </span>
            </h2>

            <div className="flex flex-wrap gap-6 items-center">
              <button className="cta-button-pill group relative flex items-center gap-4 px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] bg-brand-purple shadow-[0_15px_40px_rgba(94,92,237,0.3)]">
                <span className="relative z-10 text-white font-bold text-xl tracking-tight">Launch Your Project</span>
                <div className="relative z-10 p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="w-5 h-5 text-white transition-transform duration-500 group-hover:translate-x-1" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
            </div>
          </div>

          {/* Right Visual Content */}
          <div className="cta-visual-container relative h-[450px] md:h-[650px] lg:h-[850px] flex items-center justify-center">
            <InfinityScientist />
          </div>
        </motion.div>
      </div>

      {/* Subtle Bottom Ambient Finish */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent" />
    </PageSection>
  );
}
