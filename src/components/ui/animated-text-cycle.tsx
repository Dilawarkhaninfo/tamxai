import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
  externalIndex?: number;
}

/**
 * Ultimate Stable AnimatedTextCycle
 * Uses an "Invisible Mirror" technique to drive layout width via CSS,
 * combined with a safe AnimatePresence implementation for the slide effect.
 * This ensures the container width is always controlled by the DOM (not Framer),
 * prevent 'removeChild' crashes during rapid resizing.
 */
export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
  externalIndex,
}: AnimatedTextCycleProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Hydration guard to ensure stable initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;

  // Internal timer if not controlled externally
  useEffect(() => {
    if (!mounted || externalIndex !== undefined) return;

    const timer = setInterval(() => {
      setInternalIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length, externalIndex, mounted]);

  const activeWord = words[currentIndex] || words[0] || "";

  if (!mounted) {
    return (
      <span className="inline-block relative py-2 -my-2 overflow-hidden">
        <span className={`whitespace-nowrap inline-block py-1 ${className}`}>
          {words[0]}
        </span>
      </span>
    );
  }

  return (
    <span className="relative inline-flex items-center align-baseline select-none">
      {/* 
        The "Invisible Mirror": 
        Always present and drives the width of the container via standard CSS.
        This ensures the surrounding text doesn't jitter and the layout is 100% stable.
      */}
      <span 
        aria-hidden="true" 
        className={`${className} invisible pointer-events-none whitespace-nowrap`}
      >
        {activeWord}
        <span className="inline-block w-[12px]" />
      </span>

      {/* 
        The Animated Layer:
        Positioned absolutely to overlay the mirror. 
        Note: We use py-6/-my-6 to ensure deep descenders like 'g' have perfect clearance,
        especially for large italic font sizes.
      */}
      <span className="absolute inset-0 flex items-center overflow-hidden py-6 -my-6">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={`cycle-${currentIndex}`}
            initial={{ y: 22, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -22, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className={`whitespace-nowrap inline-block py-2 ${className}`}
          >
            {activeWord}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
} 