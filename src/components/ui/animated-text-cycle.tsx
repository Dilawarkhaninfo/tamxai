import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
  externalIndex?: number;
}

export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
  externalIndex,
}: AnimatedTextCycleProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [width, setWidth] = useState<number | "auto">("auto");
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Use external index if provided, otherwise fallback to internal state
  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;

  // Smooth width transition based on current word measurement
  useEffect(() => {
    const currentWordElement = wordsRef.current[currentIndex];
    if (currentWordElement) {
      // Add a small buffer (12px) to prevent italic character clipping
      setWidth(currentWordElement.offsetWidth + 12);
    }
  }, [currentIndex, words]);

  // Handle word cycling (only if not controlled externally)
  useEffect(() => {
    if (externalIndex !== undefined) return;

    const timer = setInterval(() => {
      setInternalIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length, externalIndex]);

  return (
    <span className="relative inline-flex items-center align-baseline">
      {/* Hidden measurement area - Always rendered to ensure stable DOM */}
      <span 
        aria-hidden="true" 
        className="absolute top-0 left-0 flex flex-col opacity-0 pointer-events-none whitespace-nowrap"
      >
        {words.map((word, i) => (
          <span 
            key={`${word}-${i}`} 
            ref={(el) => { wordsRef.current[i] = el; }}
            className={className}
          >
            {word}
          </span>
        ))}
      </span>

      {/* Animated container */}
      <motion.span 
        className="inline-block overflow-hidden relative py-2 -my-2"
        animate={{ width: width === "auto" ? "auto" : width }}
        transition={{ 
          type: "spring",
          stiffness: 180,
          damping: 20,
          mass: 1
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className={`whitespace-nowrap inline-block py-1 ${className}`}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}