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
        gsap.to(overlayRef.current, {
          opacity: 0,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => setComplete(true)
        });
      }
    });

    // Neural Pulse Wave
    const rings = pulseContainerRef.current.querySelectorAll('.pulse-ring');
    timeline.to(rings, {
      opacity: 0.6,
      scale: 4,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power1.out',
    }, 0.1);

    timeline.to(rings, {
      opacity: 0,
      duration: 0.4,
      ease: 'power1.in',
    }, 0.5);

    // Staggered Brand Reveal
    timeline.to('.brand-char', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.5,
      stagger: 0.08,
      ease: 'expo.out',
    }, 0.3);

    // Shimmer Pass
    if (shimmerRef.current) {
        timeline.to(shimmerRef.current, {
            left: '150%',
            duration: 0.8,
            ease: 'power2.inOut'
        }, 0.8);
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
