'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageSection } from '@/components/layout/PageSection';
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

      // Infinite loop animation for horizontal movement (increased speed from 40 to 25)
      gsap.to(scrollRef.current, {
        x: -singleSetWidth,
        duration: 25, 
        ease: 'none',
        repeat: -1,
        onUpdate: function() {
          const logos = scrollRef.current?.querySelectorAll('.trusted-logo');
          if (!logos) return;

          const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
          const centerX = containerWidth / 2;
          
          // Curve Parameters (aligned with SVG: M0 180C350 40 1050 40 1400 180)
          // Normalizing X to [0, 1] for Bezier calculation
          // Actually, let's use a simpler but highly precise parabolic approximation for t in [0, 1]
          // or just calculate the Cubic Bezier directly if we want perfect alignment.
          
          // Cubic Bezier Points:
          const p0 = { x: 0, y: 180 };
          const p1 = { x: 350, y: 40 };
          const p2 = { x: 1050, y: 40 };
          const p3 = { x: 1400, y: 180 };

          logos.forEach((logo) => {
            const rect = (logo as HTMLElement).getBoundingClientRect();
            const logoCenterX = rect.left + rect.width / 2;
            
            // Map logo position to t (0 to 1) relative to the curve container
            let t = logoCenterX / containerWidth;
            
            // Constrain t to [0, 1]
            t = Math.max(0, Math.min(1, t));

            // Cubic Bezier Formula
            const invT = 1 - t;
            // const x = invT*invT*invT*p0.x + 3*invT*invT*t*p1.x + 3*invT*t*t*p2.x + t*t*t*p3.x;
            const y = invT*invT*invT*p0.y + 3*invT*invT*t*p1.y + 3*invT*t*t*p2.y + t*t*t*p3.y;

            // Calculate Derivative for Slope (Tangent angle)
            // B'(t) = 3(1-t)^2(P1-P0) + 6(1-t)t(P2-P1) + 3t^2(P3-P2)
            const dy = 3*invT*invT*(p1.y - p0.y) + 6*invT*t*(p2.y - p1.y) + 3*t*t*(p3.y - p2.y);
            const dx = 3*invT*invT*(p1.x - p0.x) + 6*invT*t*(p2.x - p1.x) + 3*t*t*(p3.x - p2.x);
            
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            
            // Offset Y to be exactly on top of the curve
            const curveVisualY = y - 180; // Adjusted for SVG coordinate space relative to top-0

            gsap.set(logo, { 
              y: curveVisualY - 12, // 12px above the curve path for tighter alignment
              rotate: angle,
              opacity: t > 0.1 && t < 0.9 ? 1 : Math.max(0, 1 - Math.abs(t - 0.5) * 2), 
              scale: 1 - Math.abs(t - 0.5) * 0.15 
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
    <PageSection id="trusted-by" fullHeight={true} z={30} className="bg-[#030712]">
      <div ref={containerRef} className="trusted-by-container w-full relative overflow-hidden flex flex-col justify-center">
        {/* Background Particles Placeholder */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent_50%)]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 relative z-10 text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F2F3FF] mb-6 tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="text-[#AEB4FF] text-lg md:text-xl font-medium opacity-80">
            Powering Innovation for Companies Worldwide
          </p>
        </motion.div>

        {/* Centered Curve & Logos Hub */}
        <div className="flex-grow flex flex-col justify-center relative min-h-[50vh] mt-10">
          <div className="relative w-full overflow-visible">
            {/* The Curved Horizon (Centered) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] lg:w-[120%] pointer-events-none">
              <svg 
                ref={curveRef}
                viewBox="0 0 1400 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full"
              >
                {/* Outer Glow Path */}
                <path 
                  d="M0 180C350 40 1050 40 1400 180" 
                  stroke="#8B5CF6" 
                  strokeWidth="20" 
                  strokeLinecap="round"
                  className="opacity-10 blur-3xl"
                />
                
                {/* Mid Glow Path */}
                <path 
                  d="M0 180C350 40 1050 40 1400 180" 
                  stroke="url(#midCurveGradient)" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  className="opacity-30 blur-xl"
                />

                {/* Core Shine Path */}
                <path 
                  d="M0 180C350 40 1050 40 1400 180" 
                  stroke="url(#curveGradient)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  className="curve-path"
                />

                {/* Animated Shine Sparkle */}
                <path 
                  d="M0 180C350 40 1050 40 1400 180" 
                  stroke="url(#sparkleGradient)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  className="sparkle-line"
                />

                <defs>
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="1400" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                    <stop offset="30%" stopColor="#C4B5FD" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="70%" stopColor="#C4B5FD" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient id="midCurveGradient" x1="0" y1="0" x2="1400" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient id="sparkleGradient" x1="0" y1="0" x2="1400" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Ambient Bloom */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300%] bg-gradient-to-t from-transparent via-brand-purple/10 to-transparent blur-[140px] -z-10 opacity-70" />
            </div>

            {/* Logos Infinite Container (Shifted up to align with center-y of curve) */}
            <div className="relative w-full overflow-visible z-10 py-20 -mt-10">
              <div ref={scrollRef} className="flex whitespace-nowrap gap-16 lg:gap-24 px-12">
                {displayLogos.map((logo, idx) => (
                  <div 
                    key={idx} 
                    className="trusted-logo text-white/50 hover:text-white text-xl lg:text-3xl font-bold tracking-[0.2em] transition-all duration-300 hover:scale-110 cursor-default flex items-center gap-2 group relative py-4"
                  >
                    <span className="group-hover:drop-shadow-[0_0_15px_rgba(186,168,255,0.8)]">
                      {logo}
                    </span>
                    <div className="absolute inset-x-[-20%] inset-y-0 bg-brand-purple/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Vignette */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B0F1C] to-transparent z-20" />
      </div>
    </PageSection>
  );
}
