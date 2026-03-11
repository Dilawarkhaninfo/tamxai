'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { usePreloader } from '@/context/PreloaderContext';
import './Preloader.css';

export const Preloader = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);
  const { setFinished } = usePreloader();

  useEffect(() => {
    if (!overlayRef.current || !logoRef.current || !brandRef.current || !contentRef.current) return;

    document.body.style.overflow = 'hidden';

    gsap.set(logoRef.current, { scale: 1.5, opacity: 0, filter: 'blur(10px)' });
    gsap.set('.brand-char', { opacity: 0, y: 20, filter: 'blur(5px)' });

    const tl = gsap.timeline({
      onComplete: () => {
        exitAnimation();
      },
    });

    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'expo.out',
    });

    tl.to(
      logoRef.current,
      {
        filter: 'drop-shadow(0 0 20px rgba(105, 106, 172, 0.4))',
        duration: 0.8,
        ease: 'power2.inOut',
      },
      '-=0.4'
    );

    tl.to(
      '.brand-char',
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      },
      '-=0.6'
    );

    tl.to(
      ['.preloader-glow-1', '.preloader-glow-2'],
      {
        opacity: 0.6,
        scale: 1.5,
        duration: 2,
        ease: 'sine.inOut',
      },
      0
    );

    tl.addPause('+=0.3');
    tl.play();

    function exitAnimation() {
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setFinished();
          setRemoved(true);
        },
      });

      exitTl.to(contentRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      });

      exitTl.to(
        ['.preloader-glow-1', '.preloader-glow-2'],
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '<'
      );

      exitTl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut',
      });
    }
  }, [setFinished]);

  if (removed) return null;

  return (
    <div ref={overlayRef} className="preloader-overlay">
      <div className="preloader-glow-1" />
      <div className="preloader-glow-2" />

      <div ref={contentRef} className="preloader-content">
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
