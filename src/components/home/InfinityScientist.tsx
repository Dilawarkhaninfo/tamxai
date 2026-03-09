'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export function InfinityScientist() {
  const astronautRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!astronautRef.current) return;

    const ctx = gsap.context(() => {
      // ultra-smooth but faster vertical floating animation
      gsap.to(astronautRef.current, {
        y: -30,
        rotationZ: 2,
        rotationX: 4,
        duration: 3, // Faster for "smooth and fast" requirement
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
 
      // Snappier pulse scale
      gsap.to(astronautRef.current, {
        scale: 1.015,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <div 
        ref={astronautRef}
        className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px] will-change-transform"
      >
        <Image
          src="/infinity-scientist.png"
          alt="Infinity Scientist"
          fill
          className="object-contain"
          priority
        />
        
        {/* Subtle Ambient Glow centered on the body */}
        <div className="absolute inset-[20%] bg-brand-purple/5 blur-[100px] rounded-full -z-10" />
      </div>
    </div>
  );
}
