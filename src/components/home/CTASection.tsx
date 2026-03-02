'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import './CTASection.css';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const waveTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Wave Animation for the second line
      const words = waveTextRef.current?.querySelectorAll('.wave-word');
      if (words) {
        gsap.to(words, {
          y: -8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.2,
            from: 'start',
          },
          ease: 'sine.inOut',
        });
      }

      // 2. Continuous Light Sweep Animation
      gsap.to('.cta-light-sweep', {
        x: '200%',
        duration: 4,
        repeat: -1,
        ease: 'power2.inOut',
        repeatDelay: 6
      });

      // 3. Entrance Animations
      gsap.from('.cta-content-inner', {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });

      // 4. Subtle Parallax on Mouse Move
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const moveX = ((clientX - left) / width - 0.5) * 15;
        const moveY = ((clientY - top) / height - 0.5) * 15;

        gsap.to('.cta-content-inner', {
          x: moveX,
          y: moveY,
          duration: 2,
          ease: 'power3.out'
        });

        // Inverse move for background glows
        gsap.to('.cta-bg-glow', {
          x: -moveX * 2,
          y: -moveY * 2,
          duration: 3,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const secondLine = "powerful digital realities.";
  const words = secondLine.split(' ');

  return (
    <section ref={containerRef} className="cta-section py-32 px-6 lg:px-20 relative overflow-hidden bg-[#030712]">
      {/* Cinematic Background System */}
      <div className="cta-bg-system absolute inset-0 pointer-events-none">
        <div className="cta-bg-glow glow-1 absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-purple/10 blur-[120px] rounded-full animate-pulse" />
        <div className="cta-bg-glow glow-2 absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-blue/10 blur-[120px] rounded-full animate-pulse-slow" />
        
        {/* Animated Light Wave Mesh */}
        <div className="cta-wave-mesh absolute inset-0 opacity-40">
          <div className="wave-element wave-1" />
          <div className="wave-element wave-2" />
          <div className="wave-element wave-3" />
        </div>
        
        {/* Particle Overlay */}
        <div className="cta-particles absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
      </div>

      {/* Main Container */}
      <div className="cta-outer min-h-[400px] flex items-center p-12 md:p-20 relative z-10">
        <div className="cta-content-inner relative max-w-2xl text-left">
          
          {/* Headline Section */}
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-medium text-[#F2F3FF] leading-[1.2] tracking-tight mb-10">
            <span className="opacity-90 block mb-2">We turn bold ideas into</span>
            <span ref={waveTextRef} className="block font-bold text-white">
              {words.map((word, i) => (
                <span key={i} className="wave-word inline-block mr-[0.2em]">
                  {word}
                </span>
              ))}
            </span>
          </h2>

          {/* CTA Button */}
          <div className="flex justify-start">
            <button className="cta-button-pill group relative flex items-center gap-4 px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 bg-[#5E5CED] border border-white/10 shadow-[0_0_20px_rgba(94,92,237,0.4)]">
              <span className="relative z-10 text-white font-medium text-lg">Let's work together</span>
              <div className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors group-hover:bg-white/20">
                <ArrowRight className="w-5 h-5 text-white transition-transform duration-500 group-hover:translate-x-1" />
              </div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </div>
        </div>

        {/* Floating Light Sweep across the outer container */}
        <div className="cta-light-sweep absolute top-[-50%] left-[-100%] w-[150%] h-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 pointer-events-none" />
      </div>

      {/* Infinity Light Trail background glow */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 opacity-20 pointer-events-none blur-3xl">
        <div className="w-full h-full bg-gradient-to-r from-brand-purple via-brand-lavender to-brand-blue rounded-full animate-infinity-trail" />
      </div>
    </section>
  );
}
