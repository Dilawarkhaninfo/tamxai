'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShineButton } from '@/components/ui/ShineButton';

interface PortfolioHeroProps {
  title: string;
  subheading: string;
  images: string[];
}

export function PortfolioHero({
  title,
  subheading,
  images,
}: PortfolioHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Images with Cinematic Transitions */}
      <div className="absolute inset-0 z-0 select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.15, filter: 'blur(20px)' }}
            animate={{ opacity: 0.4, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          />
        </AnimatePresence>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-primary/60 via-transparent to-dark-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.8)_100%)]" />
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: `80px 80px`
        }} />
      </div>


      {/* Content Layer */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span 
             initial={{ opacity: 0, letterSpacing: '0.1em' }}
             animate={{ opacity: 1, letterSpacing: '0.4em' }}
             transition={{ duration: 1.5, delay: 0.5 }}
             className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-lavender text-[10px] font-bold uppercase mb-12"
          >
            Engineering Excellence
          </motion.span>
          
          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-10 leading-none">
            {title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-[0.2em]">
                {word === 'Portfolio' ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
            {subheading}
          </p>

          <div className="flex justify-center gap-6">
            <ShineButton>
              Launch Your Project →
            </ShineButton>
          </div>
        </motion.div>
      </div>

      {/* 3D Background Decorative Element (Subtle) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-dark-primary via-dark-primary/20 to-transparent z-20 pointer-events-none" />
      
      {/* Navigation Indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 flex gap-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            className={`h-[3px] transition-all duration-700 rounded-full ${
              i === currentImageIndex ? 'w-16 bg-brand-lavender' : 'w-6 bg-white/10'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
