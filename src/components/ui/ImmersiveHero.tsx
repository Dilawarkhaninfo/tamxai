'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShineButton } from '@/components/ui/ShineButton';

interface ImmersiveHeroProps {
  title: string;
  highlightedWord?: string;
  subheading: string;
  images: string[];
  ctaText?: string;
  onCtaClick?: () => void;
}

export function ImmersiveHero({
  title,
  highlightedWord,
  subheading,
  images,
  ctaText = "Get Your Project →",
  onCtaClick,
}: ImmersiveHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Images with Cinematic Transitions */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ opacity: 0.5, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          />
        </AnimatePresence>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-primary/80 via-dark-primary/40 to-dark-primary/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.4)_100%)]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8">
            {title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-[0.2em]">
                {word === highlightedWord ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            {subheading}
          </p>

          <div className="flex justify-center">
            <ShineButton onClick={onCtaClick}>
              {ctaText}
            </ShineButton>
          </div>
        </motion.div>
      </div>

      {/* 3D Background Decorative Element (Subtle) */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-dark-primary to-transparent z-10" />
      
      {/* Navigation Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === currentImageIndex ? 'w-12 bg-brand-lavender' : 'w-4 bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
