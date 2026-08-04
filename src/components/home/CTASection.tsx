'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SplineScene } from '@/components/ui/SplineScene';
import './CTASection.css';

const ANIMATED_TEXT = 'powerful digital realities.';

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999, isHovered: false });

  useEffect(() => {
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const chars = textRef.current?.querySelectorAll<HTMLElement>('.wave-char');
        if (!chars?.length) return;

        gsap.fromTo(
          chars,
          { y: 0 },
          {
            y: -12,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            stagger: { each: 0.1, from: 'start' },
            ease: 'sine.inOut',
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    buttonRef.current.style.setProperty('--reflextX', `${e.clientX - rect.left}px`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-5 sm:p-12 md:p-16 lg:p-20 rounded-2xl relative overflow-hidden flex flex-col md:grid md:grid-cols-12 items-center gap-8 md:gap-12 min-h-[420px] bg-black/40 border border-white/10 backdrop-blur-md"
    >
      {/* Sleek, professional single-color brand purple cursor glow that quickly disappears on leave */}
      <div
        className="absolute w-[320px] h-[320px] rounded-full pointer-events-none z-0 transition-opacity duration-200 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(133, 135, 227, 0.35) 0%, rgba(76, 77, 172, 0.12) 45%, rgba(0, 0, 0, 0) 70%)',
          opacity: mousePos.isHovered ? 1 : 0,
        }}
      />

      {/* 3D Floating Glass Ring / Torus (Far Top Left) */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotateX: [0, 45, 0],
          rotateZ: [0, 180, 360],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-6 left-6 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[5px] border-white/20 bg-gradient-to-br from-white/10 via-purple-500/10 to-transparent backdrop-blur-xl shadow-[0_8px_32px_0_rgba(133,135,227,0.25)] pointer-events-none select-none z-0 will-change-transform"
      />

      {/* 3D Floating Glossy Cube (Far Bottom Left) */}
      <motion.div
        animate={{
          y: [12, -12, 12],
          rotate: [15, 60, 15],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
        className="absolute bottom-6 left-8 sm:left-14 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-white/25 bg-gradient-to-tr from-brand-purple/20 via-white/10 to-cyan-400/20 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_30px_rgba(0,0,0,0.5)] pointer-events-none select-none z-0 will-change-transform"
      />

      {/* 3D Floating Glass Sphere (Center Left - Far from Robot) */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
        className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[40%] w-16 h-16 rounded-full border border-white/20 bg-gradient-to-br from-white/15 via-brand-purple/15 to-transparent backdrop-blur-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] pointer-events-none select-none z-0 opacity-50 will-change-transform"
      />

      {/* Ambient Glass Sparkle (Far Left) */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-10 w-3 h-3 rounded-full bg-white/40 backdrop-blur-md shadow-[0_0_10px_white] pointer-events-none z-0"
      />

      <div className="relative z-10 pb-10 sm:pb-0 md:col-span-7 lg:col-span-6 w-full">
        <h2 className="text-2xl sm:text-4xl mb-10">
          We turn bold ideas into <br />
          <span
            ref={textRef}
            className="inline-flex flex-wrap font-semibold text-white"
            style={{ lineHeight: 1.1 }}
            aria-label={ANIMATED_TEXT}
          >
            {ANIMATED_TEXT.split('').map((char, i) => (
              <span
                key={i}
                className="wave-char inline-block tracking-normal will-change-transform"
                style={{ minWidth: char === ' ' ? '0.25em' : 'auto' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h2>

        <Link href="/contact">
          <button
            ref={buttonRef}
            onMouseMove={handleButtonMouseMove}
            type="button"
            className="antimatter-button group relative overflow-hidden z-10"
          >
            <span className="sm:text-xl flex items-center gap-5 relative z-10">
              Let&apos;s work together
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="size-6 sm:size-8 transition-transform group-hover:translate-x-1"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z" />
              </svg>
            </span>
            <div className="absolute top-1/2 -translate-y-1/2 left-[var(--reflextX,50%)] w-20 h-20 -ml-10 bg-white/20 rounded-full blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />
          </button>
        </Link>
      </div>

      {/* Fixed, static Robot Container */}
      <div className="robot-container absolute md:relative w-full md:w-full h-full md:h-[450px] top-0 left-0 md:top-auto md:left-auto md:col-span-5 lg:col-span-6 pointer-events-none select-none z-10 flex items-center justify-center overflow-hidden">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full object-cover opacity-90 z-10 relative"
        />
      </div>
    </div>
  );
}
