'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShineButton } from '@/components/ui/ShineButton';

interface AboutHeroProps {
  title: string;
  subheading: string;
  images: string[];
}

export function AboutHero({
  title,
  subheading,
  images,
}: AboutHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Dynamic Background with Cinematic Transitions */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.2, filter: 'blur(30px)' }}
            animate={{ opacity: 0.3, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          />
        </AnimatePresence>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-primary/80 via-transparent to-dark-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.9)_100%)]" />
        
        {/* Animated Light Waves */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <motion.div 
                animate={{ 
                    x: ['-20%', '20%'],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple to-transparent blur-[100px]"
            />
            <motion.div 
                animate={{ 
                    x: ['20%', '-20%'],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue to-transparent blur-[120px]"
            />
        </div>
      </div>


      {/* Content Layer */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.5em' }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-lavender text-[10px] font-bold uppercase mb-12 backdrop-blur-md"
          >
            Engineering the Future
          </motion.div>
          
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-8 md:mb-12 leading-none">
            {title.split(' ').map((word, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                className="inline-block mr-[0.2em]"
              >
                {word === 'TAMx' ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-base md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 md:mb-16 leading-relaxed font-medium opacity-80"
          >
            {subheading}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center"
          >
            <ShineButton>
              Get Your Project →
            </ShineButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-dark-primary to-transparent z-20 pointer-events-none" />
    </section>
  );
}
