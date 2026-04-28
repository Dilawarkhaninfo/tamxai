'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';
import AnimatedTextCycle from '@/components/ui/animated-text-cycle';

const prefixWords = ["Artificial", "Data", "Product", "Growth"];
const suffixWords = ["Intelligence", "Intelligence", "Innovation", "Strategies"];
const interval = 4000;

export function HeroSection() {
  const { finished } = usePreloader();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!finished) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % prefixWords.length);
    }, interval);
    return () => clearInterval(timer);
  }, [finished]);

  return (
    <div className="relative z-20 h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={finished ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col w-main m-auto pt-6 pb-10 h-full relative z-10 justify-center md:justify-between gap-12 md:gap-0"
      >
        <div className="flex justify-center items-center flex-1 min-h-0">
          <h2
            id="hero-company"
            className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[15vw] sm:text-[14vw] font-bold text-nowrap text-center opacity-[0.03] pointer-events-none select-none overflow-hidden w-full"
          >
            TAMX.AI &nbsp; TAMX.AI
          </h2>

          <h1
            id="hero-title"
            className="grid grid-cols-1 md:grid-cols-[auto_auto_auto] gap-y-3 md:gap-y-2 md:gap-x-4 items-center justify-center text-center md:text-left w-fit mx-auto"
          >
            {/* Row 1: Building Business (Col 1) + Prefix Cycle (Col 2) */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={finished ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-start-1 md:col-span-1 flex items-center justify-center md:justify-end gap-x-1 md:gap-x-5"
            >
              <span className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-extralight tracking-tight text-white/90 whitespace-nowrap">
                Building Business
              </span>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={finished ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-start-2 md:col-span-1 flex justify-center md:justify-start"
            >
              <AnimatedTextCycle 
                words={prefixWords} 
                externalIndex={currentIndex}
                className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl italic font-bold text-brand-purple drop-shadow-2xl translate-y-[-2px]"
              />
            </motion.div>

            {/* Row 2: Suffix Cycle (Col 2) + that matters (Col 3) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={finished ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="md:col-start-2 md:col-span-1 flex justify-center md:justify-start"
            >
              <AnimatedTextCycle 
                words={suffixWords} 
                externalIndex={currentIndex}
                className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl italic font-bold text-brand-purple drop-shadow-2xl translate-y-[2px]"
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={finished ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="md:col-start-3 md:col-span-1 flex items-center justify-center md:justify-start"
            >
              <span className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-extralight tracking-tight text-white/70 whitespace-nowrap">
              that matters
              </span>
            </motion.div>
          </h1>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={finished ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1.8, ease: 'anticipate', delay: finished ? 0.2 : 0 }}
          className="shrink-0"
        >
          <div
            id="hero-stats"
            className="flex flex-col md:flex-row justify-between w-full gap-6 md:gap-0 items-center md:items-end"
          >
            <div className="flex max-w-xs lg:max-w-lg flex-col gap-6 md:gap-10 md:items-start items-center text-center md:text-left">
              <p className="text-base md:text-base opacity-80 leading-relaxed">
                We empower organizations with AI to transform complex challenges into real world solutions.
              </p>
              <div className="flex text-lg">
                <a href="/contact">
                  <button
                    type="button"
                    className="group relative overflow-hidden rounded-full px-10 py-3.5 md:py-2.5 text-base md:text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(93.92deg, #8587e3 -13.51%, #4c4dac 40.91%, #696aac 113.69%)',
                      boxShadow: '0 0 10px #696aac, inset 0 0 2px rgba(255, 255, 255, 0.61)',
                    }}
                  >
                    <span className="relative z-10">Start Your Project</span>
                    <motion.div
                      className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[30%] h-full skew-x-[-25deg]"
                      animate={{
                        left: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        repeatDelay: 1,
                      }}
                    />
                  </button>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-6 md:gap-16 justify-center w-full md:w-auto">
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-semibold whitespace-nowrap">
                  30<span className="text-foreground/40">+</span>
                </h3>
                <h3 className="text-xs sm:text-sm text-center leading-tight opacity-60">
                  Projects <br className="hidden xs:block" /> Delivered
                </h3>
              </div>

              <div className="flex flex-col items-center gap-1">
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-semibold whitespace-nowrap">
                  100<span className="text-foreground/40">%</span>
                </h3>
                <h3 className="text-xs sm:text-sm text-center leading-tight opacity-60">
                  Satisfaction <br className="hidden xs:block" /> Rate
                </h3>
              </div>

              <div className="flex flex-col items-center gap-1">
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-semibold whitespace-nowrap">
                  24<span className="text-foreground/40">/</span>7
                </h3>
                <h3 className="text-xs sm:text-sm text-center leading-tight opacity-60">
                  Support <br className="hidden xs:block" /> Anytime
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
