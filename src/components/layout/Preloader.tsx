'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

export const Preloader = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const pulseContainerRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!overlayRef.current || !brandRef.current || !pulseContainerRef.current) return;

    const timeline = gsap.timeline({
      onComplete: () => {
        // Delayed fade out for ultra-premium feel
        gsap.to(overlayRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => setComplete(true)
        });
      }
    });

    // 1. Initial State
    gsap.set('.brand-char', { opacity: 0, y: 30, filter: 'blur(10px)' });

    // 2. Neural Pulse Wave
    const rings = pulseContainerRef.current.querySelectorAll('.pulse-ring');
    timeline.to(rings, {
      opacity: 0.6,
      scale: 4,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power1.out',
    }, 0.2);

    timeline.to(rings, {
      opacity: 0,
      duration: 0.6,
      ease: 'power1.in',
    }, 0.8);

    // 3. Staggered Brand Reveal (T -> A -> M -> x)
    timeline.to('.brand-char', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.12,
      ease: 'expo.out',
    }, 0.6);

    // 4. Subtle Shimmer Pass
    if (shimmerRef.current) {
        timeline.to(shimmerRef.current, {
            left: '150%',
            duration: 1.2,
            ease: 'power2.inOut'
        }, 1.2);
    }

    // 5. Ambient Ambient Pulse & Final Glow Expansion
    timeline.to('.preloader-glow-1', {
      scale: 1.2,
      opacity: 0.4,
      duration: 1.5,
      repeat: 1,
      yoyo: true,
      ease: 'sine.inOut',
    }, 1.0);

  }, []);

  if (complete) return null;

  return (
    <div ref={overlayRef} className="preloader-overlay">
      {/* Dynamic Ambient Backgrounds */}
      <div className="preloader-glow-1" />
      <div className="preloader-glow-2" />

      <div className="preloader-content">
        {/* Neural Pulse Circles */}
        <div ref={pulseContainerRef} className="neural-pulse-container">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="pulse-ring" />
          ))}
        </div>

        {/* Branding Reveal */}
        <div ref={brandRef} className="preloader-brand">
          {['T', 'A', 'M', 'x'].map((char, i) => (
            <span key={i} className="brand-char">
              {char}
            </span>
          ))}
          <div ref={shimmerRef} className="brand-shimmer" />
        </div>
      </div>
    </div>
  );
};
