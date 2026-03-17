'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, AnimatePresence } from 'framer-motion';
import { testimonialsData, Testimonial } from './TestimonialsData';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Duplicate data for infinite scroll effect on desktop
  const displayData = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop Auto-scroll Logic
  useEffect(() => {
    if (isMobile || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, isPaused]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section 
      id="testimonials" 
      className="relative w-full py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* Premium Radial Gradient Glow (matching ServicesSection pattern) */}
      <div className="block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-[radial-gradient(circle,#B4B5ED_0%,#696AAC_40%,transparent_70%)] opacity-10 pointer-events-none z-0" />

      <div className="relative z-10 w-main m-auto">
        {/* Section Header (matching ServicesSection layout) */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 xl:gap-24 justify-between mb-16 md:mb-24">
          <div className="whitespace-nowrap">
            <h2 className="text-3xl sm:text-5xl xl:text-6xl font-semibold leading-tight text-white">
              What Our Clients Say
            </h2>
          </div>
          <div className="font-light max-w-[450px] text-gray-400">
            <p>
              Trusted by startups, enterprises, and innovators building the future with TAMx.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center justify-center">
            <div className="w-full overflow-hidden py-10">
              <motion.div 
                className="flex gap-6 md:gap-8"
                animate={{
                  x: isMobile 
                    ? `calc(-${activeIndex * 100}% - ${activeIndex * 1.5}rem)` // 100% width + 1.5rem (gap-6)
                    : `calc(-${activeIndex * 33.33}% + 33.33%)`
                }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) handleNext();
                  else if (info.offset.x > 50) handlePrev();
                }}
              >
                {/* Mobile view shows single card, Desktop shows multiple */}
                {testimonialsData.map((item, index) => (
                  <TestimonialCard 
                    key={`${item.id}-${index}`}
                    item={item}
                    isActive={index === activeIndex}
                    isMobile={isMobile}
                  />
                ))}
                {/* For infinite feel on desktop, we show more if needed, but for now simple loop */}
              </motion.div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center mt-12 gap-8">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            
            {/* Pagination Bullets (matching ServicesSection custom-bullet style) */}
            <div className="flex gap-2">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`block w-1 h-7 transition-all duration-200 ${
                    activeIndex === i 
                      ? 'bg-white scale-y-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                      : 'bg-white/10 scale-y-75 hover:bg-white/30 hover:scale-y-90'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-3 rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item, isActive, isMobile }: { item: Testimonial, isActive: boolean, isMobile: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{
        scale: isActive && !isMobile ? 1.05 : 1,
        filter: isActive ? 'brightness(1.1)' : 'brightness(0.7)',
        opacity: isActive ? 1 : 0.6,
        backgroundColor: isActive ? '#0C1222' : '#08080c',
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
        backgroundColor: '#0C1222',
        borderColor: 'rgba(56, 189, 248, 0.2)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-21.33px)] p-8 md:p-10 rounded-[24px] border border-zinc-800/50 backdrop-blur-xl overflow-hidden group`}
    >
      {/* Top: Client Info */}
      <div className="flex flex-col h-full gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/20">
            {item.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg leading-tight">{item.name}</h4>
            <p className="text-white/40 text-sm font-light">{item.role}</p>
            <p className="text-brand-purple-light text-xs font-medium uppercase tracking-wider mt-0.5">{item.company}</p>
          </div>
        </div>

        {/* Middle: Testimonial Text */}
        <div className="flex-1">
          <p className="text-text-primary text-base md:text-lg leading-relaxed font-light italic">
            &ldquo;{item.text}&rdquo;
          </p>
        </div>

        {/* Bottom: Rating */}
        <div className="flex gap-1">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} size={16} className="fill-[#FFB800] text-[#FFB800]" />
          ))}
        </div>
      </div>

      {/* Subtle Radial glow on card */}
      <div className="block absolute inset-0 -translate-x-1/2 -translate-y-1/2 size-[400px] bg-[radial-gradient(circle,#B4B5ED_0%,#696AAC_40%,transparent_70%)] opacity-10 pointer-events-none z-0" />
    </motion.div>
  );
}
