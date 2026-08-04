'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';

const SESSION_STORAGE_KEY = 'tamx_preloader_played';

export const Preloader = () => {
  const pathname = usePathname();
  const { setFinished } = usePreloader();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Only run preloader on Homepage ('/') on initial session load
    if (pathname !== '/') {
      setFinished();
      setRemoved(true);
      return;
    }

    if (typeof window !== 'undefined') {
      const alreadyPlayed = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (alreadyPlayed) {
        setFinished();
        setRemoved(true);
        return;
      }
    }

    setIsVisible(true);
    document.body.style.overflow = 'hidden';

    // Fast, responsive timeline (~1.1s total)
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1100);

    return () => {
      clearTimeout(exitTimer);
      document.body.style.overflow = '';
    };
  }, [pathname, setFinished]);

  const handleExitComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    }
    document.body.style.overflow = '';
    setFinished();
    setRemoved(true);
  };

  if (removed || pathname !== '/') return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          key="tamx-preloader-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030308] overflow-hidden select-none pointer-events-auto"
          role="status"
          aria-label="Loading Tamx website"
        >
          {/* Deep elegant ambient background radial glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.45, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(133,135,227,0.18)_0%,rgba(76,77,172,0.06)_45%,transparent_70%)] blur-[100px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center p-4">
            {/* Logo Container with Entrance & Exit animations */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 0.88,
                      y: 12,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                scale: 1.04,
                y: -8,
                opacity: 0,
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ willChange: 'transform, opacity' }}
              className="relative flex items-center justify-center overflow-hidden rounded-lg p-2"
            >
              {/* Tamx Logo Image */}
              <Image
                src="/logo_name.png"
                alt="Tamx Logo"
                width={400}
                height={100}
                quality={100}
                className="w-[130px] xs:w-[150px] sm:w-[190px] md:w-[230px] h-auto object-contain relative z-10"
                priority
              />

              {/* Single Subtle Light Sweep Effect across logo */}
              {!shouldReduceMotion && (
                <motion.div
                  initial={{ x: '-120%' }}
                  animate={{ x: '220%' }}
                  transition={{
                    duration: 0.65,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.85,
                  }}
                  style={{ willChange: 'transform' }}
                  className="absolute inset-0 z-20 pointer-events-none w-[45%] h-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-25deg]"
                />
              )}
            </motion.div>

            {/* Thin Elegant Loading Indicator Line */}
            {!shouldReduceMotion && (
              <div className="mt-6 w-[110px] sm:w-[130px] h-[2px] rounded-full bg-white/10 relative overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 1.4,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.35,
                  }}
                  style={{ willChange: 'width' }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-purple via-[#8587e3] to-[#a2a3e9] shadow-[0_0_8px_#8587e3]"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
