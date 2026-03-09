'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  z?: number | string;
}

export function PageSection({ 
  children, 
  className, 
  id, 
  fullHeight = true,
  z = 1
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex items-center justify-center overflow-hidden w-full",
        fullHeight ? "min-h-screen" : "py-24 md:py-32",
        "px-6 lg:px-12",
        className
      )}
      style={{ zIndex: z }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-7xl relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
