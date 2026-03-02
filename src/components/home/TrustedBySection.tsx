'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TrustedBySection.css';

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  'Toyota', 'OWASP', 'Injazat', 'Lowes', 'Cognizant', 'Trimble',
  'e2open', 'Devkey Tech', 'TAMx', 'CloudNova', 'NeuralWorks', 'NextBridge AI'
];

export function TrustedBySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<SVGSVGElement>(null);

  // Triple the logos for seamless infinite scroll
  const displayLogos = useMemo(() => [...LOGOS, ...LOGOS, ...LOGOS], []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const singleSetWidth = scrollWidth / 3;

      // Infinite loop animation
      gsap.to(scrollRef.current, {
        x: -singleSetWidth,
        duration: 30,
        ease: 'none',
        repeat: -1,
        onUpdate: function() {
          // Update Y position of each logo based on its X position to follow the curve
          const logos = scrollRef.current?.querySelectorAll('.trusted-logo');
          if (!logos) return;

          const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
          const centerX = containerWidth / 2;
          const curveDepth = 150; // Intensity of the dome

          logos.forEach((logo) => {
            const rect = (logo as HTMLElement).getBoundingClientRect();
            const logoCenterX = rect.left + rect.width / 2;
            
            // Calculate relative X from center (-1 to 1)
            const relX = (logoCenterX - centerX) / (containerWidth / 2);
            
            // Smooth Dome Formula: y = h * (1 - x^2)
            // This makes logos start LOW at edges, go HIGH in middle, and LOW again
            // We want them to follow the SVG which is high in middle: d="M0 180C350 40 1050 40 1400 180"
            // So y should be minimal at relX=0 and high at relX=1/-1
            const yOffset = Math.pow(Math.abs(relX), 2) * curveDepth;
            
            gsap.set(logo, { 
              y: yOffset,
              rotate: relX * 15, // Tilt to follow the curve slope
              opacity: 1 - Math.pow(Math.abs(relX), 2) * 0.4, // Fade at edges
              scale: 1 - Math.abs(relX) * 0.15 // Scale down at edges for depth
            });
          });
        }
      });

      // Initial fade in
      gsap.from('.trusted-header', {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.trusted-header',
          start: 'top 85%',
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="trusted-section bg-[#0B0F1C] py-32 overflow-hidden relative">
      {/* Background Particles Placeholder */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10 text-center mb-24">
        <h2 className="trusted-header text-4xl md:text-5xl lg:text-6xl font-bold text-[#F2F3FF] mb-6 tracking-tight">
          Trusted by Industry Leaders
        </h2>
        <p className="text-[#AEB4FF] text-lg md:text-xl font-medium opacity-80">
          Powering Innovation for Companies Worldwide
        </p>
      </div>

      <div className="relative mt-20 h-64">
        {/* The Curved Horizon */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] lg:w-[120%] pointer-events-none">
          <svg 
            ref={curveRef}
            viewBox="0 0 1400 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            <path 
              d="M0 180C350 40 1050 40 1400 180" 
              stroke="url(#curveGradient)" 
              strokeWidth="4" 
              strokeLinecap="round"
              className="curve-path"
            />

            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="1400" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
                <stop offset="30%" stopColor="#C4B5FD" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#C4B5FD" />
                <stop offset="70%" stopColor="#C4B5FD" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
              </linearGradient>

              <filter id="glow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>
          
          {/* Blur Overlay & Bloom */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-[#0B0F1C]/20 to-transparent blur-3xl -z-10" />
        </div>

        {/* Logos Infinite Container */}
        <div className="absolute top-0 left-0 w-full overflow-visible py-4">
          <div ref={scrollRef} className="flex whitespace-nowrap gap-16 lg:gap-24 px-12">
            {displayLogos.map((logo, idx) => (
              <div 
                key={idx} 
                className="trusted-logo text-white/50 hover:text-white text-xl lg:text-3xl font-bold tracking-[0.2em] transition-all duration-300 hover:scale-110 cursor-default flex items-center gap-2 group relative py-4"
              >
                <span className="group-hover:drop-shadow-[0_0_15px_rgba(186,168,255,0.8)]">
                  {logo}
                </span>
                {/* Refined glow behind logo on hover */}
                <div className="absolute inset-x-[-20%] inset-y-0 bg-brand-purple/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Vignette */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B0F1C] to-transparent z-20" />
    </section>
  );
}
