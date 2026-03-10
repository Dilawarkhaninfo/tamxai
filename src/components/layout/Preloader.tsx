'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import './Preloader.css';

export const Preloader = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!overlayRef.current || !logoRef.current || !brandRef.current || !contentRef.current) return;

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => setComplete(true)
        });
      }
    });

    // Initial state
    gsap.set(logoRef.current, { scale: 1.5, opacity: 0, filter: 'blur(10px)' });
    gsap.set('.brand-char', { opacity: 0, y: 20, filter: 'blur(5px)' });

    // 1. Logo "Lands" smoothly
    timeline.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'expo.out',
    });

    // 2. Subtle Logo Pulse/Glow
    timeline.to(logoRef.current, {
      filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.4))',
      duration: 0.8,
      ease: 'power2.inOut',
    }, "-=0.4");

    // 3. Staggered Brand Text Reveal below logo
    timeline.to('.brand-char', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    }, "-=0.6");

    // 4. Ambient Glow Expansion
    timeline.to(['.preloader-glow-1', '.preloader-glow-2'], {
      opacity: 0.6,
      scale: 1.5,
      duration: 2,
      ease: 'sine.inOut',
    }, 0);

  }, []);

  if (complete) return null;

  return (
    <div ref={overlayRef} className="preloader-overlay">
      <div className="preloader-glow-1" />
      <div className="preloader-glow-2" />

      <div ref={contentRef} className="preloader-content">
        {/* Brand Logo Container */}
        <div ref={logoRef} className="preloader-logo-container">
          <Image
            src="/Logo_tamx.png"
            alt="TAMx Logo"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>

        {/* Branding Text */}
        <div ref={brandRef} className="preloader-brand">
          {['T', 'A', 'M'].map((char, i) => (
            <span key={i} className="brand-char">
              {char}
            </span>
          ))}
          <span className="brand-char text-brand-purple">x</span>
        </div>
      </div>
    </div>
  );
};
