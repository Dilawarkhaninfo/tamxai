'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { Facebook, Github, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import './Footer.css';

// Sub-component for individual animated digits
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

        gsap.fromTo(currentRef.current, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        );

        if (prevRef.current) {
          prevRef.current.innerText = prevVal;
          gsap.fromTo(prevRef.current,
            { y: 0, opacity: 1 },
            { y: -20, opacity: 0, duration: 0.4, ease: 'power2.out' }
          );
        }
      }, containerRef);
      return () => ctx.revert();
    }
  }, [value, displayValue]);

  return (
    <div ref={containerRef} className="digit-container relative inline-block overflow-hidden h-[1.1em] align-bottom">
      <div ref={prevRef} className="digit-prev absolute inset-0 opacity-0 pointer-events-none" aria-hidden="true" />
      <div ref={currentRef} className="digit-current relative leading-none">
        {displayValue}
      </div>
    </div>
  );
};

const DigitalClock = () => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="digital-clock-wrapper flex items-baseline gap-2 md:gap-4 font-bold tracking-tighter opacity-0" aria-hidden="true">
        00:00:00 AM
      </div>
    );
  }

  const format = (num: number) => num.toString().padStart(2, '0');
  
  const hours = time.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = format(hours % 12 || 12);
  const minutes = format(time.getMinutes());
  const seconds = format(time.getSeconds());

  return (
    <div className="digital-clock-wrapper flex items-baseline gap-2 md:gap-4 font-bold tracking-tighter text-[#F2F3FF]" aria-live="polite">
      <div className="flex">
        <AnimatedDigit value={displayHours[0]} />
        <AnimatedDigit value={displayHours[1]} />
      </div>
      <span className="colon">:</span>
      <div className="flex">
        <AnimatedDigit value={minutes[0]} />
        <AnimatedDigit value={minutes[1]} />
      </div>
      <span className="colon">:</span>
      <div className="flex">
        <AnimatedDigit value={seconds[0]} />
        <AnimatedDigit value={seconds[1]} />
      </div>
      <span className="ampm uppercase">
        {ampm}
      </span>
    </div>
  );
};

export function Footer() {
  return (
    <footer className="footer-section bg-[#03040b] pt-24 pb-12 px-6 lg:px-20 relative overflow-hidden border-t border-white/5">
      {/* Cinematic Background Glows */}
      <div className="footer-bg-glow absolute bottom-0 right-0 w-[50%] h-[50%] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="footer-bg-glow absolute top-0 left-0 w-[40%] h-[40%] bg-brand-blue/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start pb-20">
          
          {/* Left Side: Contact / Clock / Socials */}
          <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                {/* Email Item */}
                <a href="mailto:info@tamxai.com" className="footer-email text-xl md:text-2xl text-[#F2F3FF] hover:text-brand-lavender transition-all font-medium flex items-center gap-3 group w-fit">
                  <div className="p-2 rounded-lg bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  info@tamxai.com
                </a>

                {/* Phone Item */}
                <a href="tel:+923155320243" className="text-lg md:text-xl text-[#F2F3FF] hover:text-brand-lavender transition-all font-medium flex items-center gap-3 group w-fit">
                  <div className="p-2 rounded-lg bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  +92 315-5320243
                </a>

                {/* Location Item */}
                <div className="text-lg md:text-xl text-[#F2F3FF] font-medium flex items-center gap-3 group w-fit">
                  <div className="p-2 rounded-lg bg-brand-purple/10 text-brand-purple transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  Islamabad, Pakistan
                </div>
              </div>
              
              {/* Social Icons Row */}
              <div className="flex items-center gap-4 mt-2">
                {[
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" }
                ].map((social, i) => (
                  <Link 
                    key={i}
                    href={social.href} 
                    className="social-icon-link group relative p-3 rounded-full bg-white/5 border border-white/10 transition-all hover:bg-brand-purple/20 hover:border-brand-purple/50"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-[#AEB4FF] group-hover:text-white transition-colors" />
                    <div className="absolute inset-0 rounded-full bg-brand-purple/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="footer-clock-container">
              <DigitalClock />
            </div>
          </div>

          {/* Right Side: Link Columns */}
          <div className="lg:col-span-12 xl:col-span-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold text-sm tracking-[0.2em] uppercase opacity-90">Services</h4>
              <ul className="flex flex-col gap-4">
                {['Product Design', 'Development', 'GTM Strategy', 'AI Development'].map(link => (
                  <li key={link}><Link href="#" className="text-[#AEB4FF]/70 hover:text-white transition-colors flex items-center gap-1 group">{link} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" /></Link></li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold text-sm tracking-[0.2em] uppercase opacity-90">Resources</h4>
              <ul className="flex flex-col gap-4">
                {['Clinix AI', 'Synergies4', 'Curehire', 'Contact'].map(link => (
                  <li key={link}><Link href="#" className="text-[#AEB4FF]/70 hover:text-white transition-colors flex items-center gap-1 group">{link} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" /></Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#AEB4FF]/40 text-sm">
            TAMx AI, © 2026. All rights reserved.
          </p>
          <div className="flex gap-8 text-[#AEB4FF]/40 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
