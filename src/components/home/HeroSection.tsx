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
        className="flex flex-col w-main m-auto pt-10 pb-14 h-full relative z-10 justify-between"
      >
        <div className="flex justify-center items-center flex-1 min-h-0">
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
              <span className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-extralight tracking-tight text-white/90 whitespace-nowrap">
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
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl italic font-bold text-brand-purple drop-shadow-2xl translate-y-[-2px]"
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
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl italic font-bold text-brand-purple drop-shadow-2xl translate-y-[2px]"
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={finished ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="md:col-start-3 md:col-span-1 flex items-center justify-center md:justify-start"
            >
              <span className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-extralight tracking-tight text-white/70 whitespace-nowrap">
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
              <p className="text-sm md:text-base">
                We empower organizations with AI to transfrom complex challenges into real world solutions.
              </p>
              <div className="flex text-lg">
                <a href="/contact">
                  <button
                    type="button"
                    className="group relative overflow-hidden rounded-full px-10 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105"
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

            <div className="flex text-xs md:text-sm gap-6 mobile:gap-8 lg:gap-16 sm:justify-center md:justify-end justify-between w-full md:w-auto">
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl flex items-center font-semibold text-nowrap">
                  30<span className="text-foreground/40">+</span>
                </h3>
                <h3 className="text-xs sm:text-sm leading-tight">
                  Projects <br /> Delivered
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl flex items-center font-semibold text-nowrap">
                  100<span className="text-foreground/40">%</span>
                </h3>
                <h3 className="text-xs sm:text-sm leading-tight">
                  Client<br />Satisfaction
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl flex items-center font-semibold text-nowrap">
                  24<span className="text-foreground/40">/</span>7
                </h3>
                <h3 className="text-xs sm:text-sm leading-tight">
                  Support<br />Available
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
