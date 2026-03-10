'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  'All',
  'AI Solutions',
  'Web Platforms',
  'Enterprise Software',
  'Mobile Applications',
  'Data Platforms',
];

interface FilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function PortfolioFilter({ activeCategory, onCategoryChange }: FilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-20 px-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-500 overflow-hidden group ${
            activeCategory === category
              ? 'text-white'
              : 'text-text-secondary hover:text-white'
          }`}
        >
          {/* Background Glow */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            activeCategory === category ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
             <div className="absolute inset-0 bg-brand-purple/20 backdrop-blur-3xl" />
             <div className="absolute inset-0 border border-brand-purple/50 rounded-full" />
             <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10" />
          </div>

          <span className="relative z-10">{category}</span>
          
          {/* Active Dot */}
          {activeCategory === category && (
            <motion.div 
              layoutId="activeFilter"
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-lavender shadow-[0_0_10px_rgba(192,132,252,1)]"
            />
          )}
        </button>
      ))}
    </div>
  );
}
