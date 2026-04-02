'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import './Footer.css';

const AnimatedDigit = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== displayValue) {
      const ctx = gsap.context(() => {
        const prevVal = displayValue;
        setDisplayValue(value);

        gsap.fromTo(
          currentRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        );

        if (prevRef.current) {
          prevRef.current.innerText = prevVal;
          gsap.fromTo(
            prevRef.current,
            { y: 0, opacity: 1 },
            { y: -20, opacity: 0, duration: 0.4, ease: 'power2.out' }
          );
        }
      }, containerRef);
      return () => ctx.revert();
    }
  }, [value, displayValue]);

  return (
    <span ref={containerRef} className="digit-slot">
      <span ref={prevRef} className="digit-ghost" aria-hidden="true" />
      <span ref={currentRef} className="digit-live">{displayValue}</span>
    </span>
  );
};

const LiveClock = () => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  if (!mounted) {
    return (
      <h3 
        className="mt-2" 
        style={{
          fontFamily: 'var(--font-jakarta)',
          fontWeight: 'var(--font-weight-semibold)',
          fontSize: 'var(--text-8xl)',
          lineHeight: 'var(--tw-leading, var(--text-8xl--line-height))'
        }}
        aria-hidden="true"
      >
        <span>00:00:00 <span className="text-xl align-bottom">AM</span></span>
      </h3>
    );
  }

  const hours = time.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hh = format(hours % 12 || 12);
  const mm = format(time.getMinutes());
  const ss = format(time.getSeconds());

  return (
    <h3 
      className="mt-2 text-[16vw] sm:text-[14vw] md:text-8xl whitespace-nowrap" 
      style={{
        fontFamily: 'var(--font-jakarta)',
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: '1'
      }}
      aria-live="polite"
    >
      <span className="inline-flex items-baseline gap-2">
        {hh}:{mm}:{ss}
        <span className="text-[0.3em] opacity-70 font-light uppercase tracking-wider">{ampm}</span>
      </span>
    </h3>
  );
};

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Product Design', href: '/services' },
      { label: 'Development', href: '/services' },
      { label: 'GTM Strategy', href: '/services' },
      { label: 'Healthcare Apps', href: '/services' },
      { label: 'AI Development', href: '/services' },
      { label: 'IoT Development', href: '/services' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Ecommerce', href: '#' },
      { label: 'LMS', href: '#' },
      { label: 'CRM', href: '#' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { label: 'GitHub', href: '#', icon: Github },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/tamxai/', icon: Linkedin },
      { label: 'Instagram', href: '#', icon: Instagram },
      { label: 'Facebook', href: '#', icon: Facebook },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-background border-t border-white/5">
      <div className="w-main mx-auto pt-24 md:pt-40 pb-5 md:pb-10 relative z-20">
        <div className="flex flex-col md:flex-row gap-20 md:gap-5 justify-between">

          {/* Left — Contact & Clock */}
          <div className="flex flex-col font-light text-lg items-start text-left">
            {/* Logo + Brand */}
            <div className="mb-6 h-9 md:block hidden" />

            <p className="text-2xl mt-4 md:mt-0">
              <a
                href="mailto:info@tamxai.com"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                info@tamxai.com
              </a>
            </p>

            <div className="flex gap-4 mt-3 justify-start">
              <a
                href="https://www.linkedin.com/company/tamxai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 border-b border-current pb-0.5 hover:opacity-70 transition-opacity duration-300"
              >
                Linkedin <ArrowUpRight className="size-4" />
              </a>
            </div>

            <div className="flex flex-col mt-8 md:mt-10 items-start w-full">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-left">
                <p>Based in Islamabad, PK</p>
                <p className="opacity-50">Serving clients globally</p>
              </div>
              <div className="w-full flex md:block justify-end mt-2 md:mt-0">
                <LiveClock />
              </div>
            </div>
          </div>

          {/* Right — Navigation Columns */}
          <div className="grid grid-cols-2 lg:flex lg:flex-row flex-wrap justify-start lg:justify-normal gap-10 sm:gap-14 md:gap-16 lg:gap-24 text-left">
            {columns.map((col) => (
              <div 
                key={col.title} 
                className={`
                  flex flex-col items-start
                  ${col.title === 'Services' ? 'order-1 col-span-1' : ''}
                  ${col.title === 'Product' ? 'order-2 col-span-1' : ''}
                  ${col.title === 'Socials' ? 'order-3 col-span-2 lg:order-3 mt-8 lg:mt-0' : ''}
                `}
              >
                <h2 className="text-foreground/50 mb-3 text-sm uppercase tracking-widest">{col.title}</h2>
                <div className={`${col.title === 'Socials' ? 'flex flex-row items-start gap-5 mt-2' : 'flex flex-col gap-3 font-light'}`}>
                  {col.links.map((link: any) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.label === 'LinkedIn' ? '_blank' : undefined}
                      className={`
                        group/link flex items-center transition-all duration-300
                        ${col.title === 'Socials' 
                          ? 'p-3 rounded-full hover:bg-white/10 bg-white/[0.03] border border-white/5 hover:border-brand-purple/50 active:scale-95 shadow-sm' 
                          : 'gap-2 hover:text-white justify-start'}
                      `}
                      title={col.title === 'Socials' ? link.label : undefined}
                    >
                      {link.icon && <link.icon size={col.title === 'Socials' ? 22 : 16} className="text-foreground/40 group-hover/link:text-white transition-colors duration-300" />}
                      {col.title !== 'Socials' && (
                        <span className="opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300">
                          {link.label}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Divider + Copyright */}
        <div className="border-t border-foreground/10 mt-20 pt-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-5 justify-between items-center font-light">
            <p className="text-foreground/40 text-sm text-left">
              &copy; {new Date().getFullYear()} TAMx. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-foreground/40">
              <Link href="#" className="hover:text-foreground/70 transition-colors duration-300">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground/70 transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient veil */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 sm:h-40 md:h-48 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to top, var(--background) 0%, var(--background) 20%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-primary blur-3xl scale-150 opacity-60">
        <div className="absolute left-0 bottom-20 w-full h-full scale-y-[2] origin-bottom rounded-[100%] bg-background" />
      </div>
    </footer>
  );
}
