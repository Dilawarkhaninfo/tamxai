'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TrustedBySection.css';

gsap.registerPlugin(ScrollTrigger);

// ── Company names for Tamx AI ──────────────────────────────────────────────
const CLIENTS = [
  { name: 'Devkeytech',    id: 'devkeytech' },
  { name: 'Ignite',        id: 'ignite' },
  { name: 'MOIT',          id: 'moit' },
  { name: 'MetaverseDeviser', id: 'metaversedeviser' },
  { name: 'QuickSilver',   id: 'quicksilver' },
  { name: 'NICAT',         id: 'nicat' },
  { name: 'RegionalPlan9', id: 'regionalplan9' },
];

// Triple the list for seamless infinite loop
const ORBIT_LOGOS = [...CLIENTS, ...CLIENTS, ...CLIENTS];

// Full orbit cycle duration (seconds)
const ORBIT_DURATION = 35;

// Reference curve path (exact match to Antimatter AI)
// viewBox: 0 0 1200 400 | rendered at 1500px wide
const SVG_PATH = 'M0.5 86.5004C471.448 -28.4531 738.829 -27.0502 1221.5 86.5004';

export function TrustedBySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.trusted-word',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="clients-section"
      ref={sectionRef}
      className="flex flex-col gap-20"
    >
      {/* ── Header ── */}
      <div className="flex flex-col text-center gap-3 items-center justify-center">
        <h2 className="text-center" style={{ 
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", sans-serif',
          fontWeight: 'var(--font-weight-semibold, 600)',
          fontSize: '2.5rem',
          lineHeight: 'var(--leading-tight, 1.25)'
        }}>
          <span className="inline-flex flex-wrap justify-center gap-x-2 gap-y-1">
            {['Trusted', 'by', 'Industry', 'Leaders'].map((w) => (
              <span
                key={w}
                data-word="true"
                className="trusted-word inline-block will-change-transform opacity-0"
              >
                {w}
              </span>
            ))}
          </span>
        </h2>
        <p className="font-light relative z-10" style={{
          fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", sans-serif'
        }}>
          Powering Innovation for Companies Worldwide
        </p>
      </div>

      {/* ── Curve + Orbiting Logos ── */}
      <div className="w-full h-[600px] -mb-96 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="relative w-full h-full">

          {/* ── SVG: Glowing curve (exact reference viewBox + path) ── */}
          <svg
            viewBox="0 0 1200 400"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[1500px] h-full absolute left-1/2 -translate-x-1/2 top-0 z-10 pointer-events-none"
          >
            <defs>
              {/* Gradient along curve — fades at edges, bright in center */}
              <linearGradient id="cg" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#fff" stopOpacity="0" />
                <stop offset="12%"  stopColor="#a2a3e9" stopOpacity="0.15" />
                <stop offset="30%"  stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="50%"  stopColor="#fff" stopOpacity="0.75" />
                <stop offset="70%"  stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="88%"  stopColor="#a2a3e9" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>

              {/* Blue/purple atmospheric glow gradient */}
              <linearGradient id="glowGrad" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#3e3f7e" stopOpacity="0" />
                <stop offset="15%"  stopColor="#3e3f7e" stopOpacity="0.25" />
                <stop offset="40%"  stopColor="#6366f1" stopOpacity="0.45" />
                <stop offset="50%"  stopColor="#4f46e5" stopOpacity="0.5" />
                <stop offset="60%"  stopColor="#6366f1" stopOpacity="0.45" />
                <stop offset="85%"  stopColor="#3e3f7e" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3e3f7e" stopOpacity="0" />
              </linearGradient>

              {/* Sparkle travelling gradient */}
              <linearGradient id="sg" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#fff" stopOpacity="0" />
                <stop offset="44%"  stopColor="#fff" stopOpacity="0" />
                <stop offset="50%"  stopColor="#fff" stopOpacity="1" />
                <stop offset="56%"  stopColor="#fff" stopOpacity="0" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>

              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="softGlow">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="wideGlow">
                <feGaussianBlur stdDeviation="24" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Invisible guide path */}
            <path
              id="curvePath"
              d={SVG_PATH}
              fill="transparent"
              stroke="transparent"
            />

            {/* Wide atmospheric glow — the "planet atmosphere" below the horizon */}
            <path
              d={SVG_PATH}
              fill="transparent"
              stroke="url(#glowGrad)"
              strokeWidth="50"
              opacity="0.3"
              filter="url(#wideGlow)"
            />

            {/* Medium glow halo */}
            <path
              d={SVG_PATH}
              fill="transparent"
              stroke="url(#glowGrad)"
              strokeWidth="20"
              opacity="0.35"
              filter="url(#softGlow)"
            />

            {/* Outer soft halo */}
            <path
              d={SVG_PATH}
              fill="transparent"
              stroke="url(#cg)"
              strokeWidth="10"
              opacity="0.3"
              filter="url(#softGlow)"
            />

            {/* Core bright line */}
            <path
              d={SVG_PATH}
              fill="transparent"
              stroke="url(#cg)"
              strokeWidth="1.5"
              opacity="0.9"
              filter="url(#glow)"
            />

            {/* Animated sparkle travelling along the curve */}
            <path
              d={SVG_PATH}
              fill="transparent"
              stroke="url(#sg)"
              strokeWidth="3"
              strokeDasharray="600"
              strokeDashoffset="600"
              className="curve-sparkle"
            />
          </svg>

          {/* ── Orbiting company names (CSS offset-path) ── */}
          {/* Path is scaled 1.25× from SVG coords + 50px y-offset for vertical centering */}
          <div className="orbit-container absolute left-1/2 -translate-x-1/2 top-0 z-20">
            {ORBIT_LOGOS.map((client, i) => {
              const delay = -(ORBIT_DURATION / CLIENTS.length) * i;
              const isShort = client.name.length <= 6;

              return (
                <div
                  key={`${client.id}-${i}`}
                  className={`orbit-logo ${isShort ? 'orbit-logo--large' : ''}`}
                  style={{
                    '--orbit-duration': `${ORBIT_DURATION}s`,
                    '--orbit-delay': `${delay}s`,
                  } as React.CSSProperties}
                  aria-label={`Client: ${client.name}`}
                >
                  {client.name}
                </div>
              );
            })}
          </div>

          {/* Left fade */}
          <div
            className="top-0 -left-[130px] h-[200px] w-[300px] absolute z-20 pointer-events-none"
            style={{
              transform: 'rotate(-15deg)',
              background: 'radial-gradient(ellipse at 20% 50%, #020202 30%, transparent 70%)',
            }}
          />

          {/* Right fade */}
          <div
            className="top-0 -right-[130px] h-[200px] w-[300px] absolute z-20 pointer-events-none"
            style={{
              transform: 'rotate(195deg)',
              background: 'radial-gradient(ellipse at 20% 50%, #020202 30%, transparent 70%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
