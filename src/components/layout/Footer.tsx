'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
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
      <h3 className="font-semibold text-5xl sm:text-6xl lg:text-8xl mt-2 opacity-0" aria-hidden="true">
        00:00:00 <span className="text-xl align-bottom">AM</span>
      </h3>
    );
  }

  const hours = time.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hh = format(hours % 12 || 12);
  const mm = format(time.getMinutes());
  const ss = format(time.getSeconds());

  return (
    <h3 className="font-semibold text-5xl sm:text-6xl lg:text-8xl mt-2" aria-live="polite">
      <span className="clock-digits">
        <AnimatedDigit value={hh[0]} />
        <AnimatedDigit value={hh[1]} />
        <span className="clock-sep">:</span>
        <AnimatedDigit value={mm[0]} />
        <AnimatedDigit value={mm[1]} />
        <span className="clock-sep">:</span>
        <AnimatedDigit value={ss[0]} />
        <AnimatedDigit value={ss[1]} />
        {' '}
        <span className="text-xl align-bottom">{ampm}</span>
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
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Product', href: '/product' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/contact' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Case Studies', href: '/product' },
      { label: 'Projects', href: '/product' },
      { label: 'Testimonials', href: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-background">
      <div className="w-main mx-auto pb-5 md:pb-10 relative z-20">
        <div className="flex flex-col md:flex-row gap-20 md:gap-5 justify-between">

          {/* Left — Contact & Clock */}
          <div className="flex flex-col font-light text-lg">
            {/* Logo + Brand */}
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <Image
                src="/Logo_tamx.png"
                alt="TAMx Logo"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-[17px] font-semibold tracking-[0.22em] uppercase text-foreground">
                TAMx
              </span>
            </Link>

            <p className="text-2xl">
              <a
                href="mailto:info@tamxai.com"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                info@tamxai.com
              </a>
            </p>

            <div className="flex gap-4 mt-3">
              <a
                href="https://www.linkedin.com/company/tamxai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 border-b border-current pb-0.5 hover:opacity-70 transition-opacity duration-300"
              >
                Linkedin <ArrowUpRight className="size-4" />
              </a>
            </div>

            <div className="flex flex-col mt-10">
              <div className="flex flex-col lg:flex-row gap-0 lg:gap-4">
                <p>Based in Islamabad, PK</p>
                <p className="opacity-50">Serving clients globally</p>
              </div>
              <LiveClock />
            </div>
          </div>

          {/* Right — Navigation Columns */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-between sm:justify-normal gap-10 sm:gap-14 md:gap-16 lg:gap-24">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-foreground/50 mb-2">{col.title}</h2>
                <div className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="hover:opacity-70 transition-opacity duration-300"
                    >
                      {link.label}
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
            <p className="text-foreground/40 text-sm text-center">
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
