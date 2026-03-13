'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import './CTASection.css';

import { PageSection } from '@/components/layout/PageSection';

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Slight delay ensures the DOM chars are fully mounted before GSAP calculates position
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const chars = textRef.current?.querySelectorAll<HTMLElement>('.wave-char');
        
        if (chars && chars.length > 0) {
          gsap.fromTo(chars, 
            { y: 0 },
            {
              y: -12,
              duration: 1.2,
              repeat: -1,
              yoyo: true,
              stagger: {
                each: 0.1,
                from: "start"
              },
              ease: "sine.inOut"
            }
          );
        }
      }, containerRef);
      return () => ctx.revert();
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Authentic HTML5 Canvas Wave Background to perfectly match Antimatter
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;

    const render = () => {
      time += 0.002; 
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear with absolute void
      ctx.fillStyle = '#010101';
      ctx.fillRect(0, 0, width, height);

      // Organic Bezier/Sine wave sweeping beam
      const drawAurora = (color: string, yOffset: number, amplitude: number, phase: number, speed: number = 1) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for(let x = 0; x <= width; x += 10) { // Higher fidelity
          const normalizedX = x / width;
          // Complex sine wave logic for "smooth continuous" movement
          const y = height * yOffset 
                  - (normalizedX * height * 0.25) // Subtle upward angle
                  + Math.sin(normalizedX * Math.PI * 1.8 + (time * speed) + phase) * amplitude
                  + Math.sin(normalizedX * Math.PI * 0.7 - (time * speed * 0.6)) * (amplitude * 0.4);
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        ctx.fillStyle = color;
        ctx.fill();
      };

      ctx.globalCompositeOperation = 'screen';
      
      // Deep Navy / Dark Blue palette for "before" feel with premium finish
      drawAurora('rgba(10, 15, 60, 0.8)', 0.4, 160, 0, 1.0);     
      drawAurora('rgba(15, 30, 90, 0.5)', 0.45, 130, 2, 1.1);     
      drawAurora('rgba(25, 45, 140, 0.3)', 0.5, 100, 4, 1.2);     
      drawAurora('rgba(40, 70, 200, 0.15)', 0.55, 70, 6, 1.3);      
      
      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    buttonRef.current.style.setProperty('--reflextX', `${x}px`);
  };

  const animatedText = "powerful digital realities.";

  return (
    <section id="cta" className="w-full relative py-10 lg:py-20" style={{ zIndex: 40 }}>
      {/* Container aligned with Logo and Header Button */}
      <div className="mx-auto" style={{ width: 'calc(100% - 60px)', maxWidth: '1400px' }}>
        <div 
          ref={containerRef}
          className="p-5 sm:p-20 md:p-30 pt-28 sm:pt-44 border border-foreground/15 rounded-2xl relative overflow-hidden bg-[#030303] flex flex-col justify-center"
        >
          {/* Background Wave Animation */}
          <div className="absolute w-full h-full top-0 left-0 saturate-50 z-0">
            <canvas 
              ref={canvasRef} 
              className="w-full h-full block" 
              width={1823} 
              height={515} 
            />
          </div>

          <div className="relative z-10 pb-10 sm:pb-0">
            <h2 className="text-2xl sm:text-4xl mb-10">
              We turn bold ideas into <br />
              <span 
                ref={textRef} 
                className="inline-flex flex-wrap font-semibold" 
                style={{ lineHeight: 1.1 }}
                aria-label={animatedText}
              >
                {animatedText.split('').map((char, i) => (
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
            
            <Link href="/contact" className="inline-block">
              <button 
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                type="button" 
                className="antimatter-button group relative overflow-hidden"
              >
                <span className="sm:text-xl flex items-center gap-5 relative z-10">
                  Let's work together
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
                    <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z"></path>
                  </svg>
                </span>
                {/* Hover spot effect */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[var(--reflextX,50%)] w-20 h-20 -ml-10 bg-white/20 rounded-full blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
