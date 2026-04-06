'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'

const characters = [
  {
    name: 'Momo',
    description: 'Energetic and playful, Momo brings excitement to your learning adventure. Always ready with a smile, Momo keeps you motivated, turning challenges into fun and helping you stay engaged every step of the way.',
    image: 'https://edeviser.com/wp-content/uploads/2025/02/cute-tiger-studio-1-1.png',
    shadow: 'https://edeviser.com/wp-content/uploads/2025/02/shadow.png',
    accent: 'from-brand-purple/20 to-transparent'
  },
  {
    name: 'Hami',
    description: 'Hami is curious, energetic, and always ready to explore new challenges! With a sharp mind and a fun-loving spirit, Hami encourages you to push your limits and stay motivated.',
    image: 'https://edeviser.com/wp-content/uploads/2025/02/cute-tiger-studio-1.png',
    shadow: 'https://edeviser.com/wp-content/uploads/2025/02/shadow.png',
    accent: 'from-brand-lavender/30 to-transparent'
  },
  {
    name: 'Shibu',
    description: 'A curious and clever fox, always ready to guide you through challenges. Shibu learns with you, helps you stay on track, and celebrates every milestone in your learning journey.',
    image: 'https://edeviser.com/wp-content/uploads/2025/02/cute-tiger-studio-1-2.png',
    shadow: 'https://edeviser.com/wp-content/uploads/2025/02/shadow.png',
    accent: 'from-brand-blue/20 to-transparent'
  }
]

export function LMSCharacters() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <PageSection id="lms-characters" fullHeight={false} className="bg-background relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-purple/5 blur-[120px] -z-10" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 px-4 container-padding w-full max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-brand-lavender font-bold tracking-widest uppercase text-sm mb-4"
          >
            • Gamified Learning
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight"
          >
            Discover Your Role <br />
            in the <span className="gradient-text text-brand-purple">Gamified</span> Adventure
          </motion.h2>
        </div>
        
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="hidden lg:block opacity-30"
        >
          <img 
            src="https://edeviser.com/wp-content/uploads/2025/03/mic-and-star-circles.svg" 
            alt="Decoration"
            className="w-32 h-auto drop-shadow-glow-purple"
          />
        </motion.div>
      </div>

      <div className="container-padding w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
          {characters.map((char, idx) => {
            const isHovered = hoveredIndex === idx
            const isNoneHovered = hoveredIndex === null
            
            return (
              <motion.div
                key={char.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.5 }
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative flex flex-col items-center justify-center p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] 
                  border border-white/10 backdrop-blur-3xl overflow-hidden cursor-pointer
                  transition-all duration-500 group
                  ${isHovered ? 'flex-[2] lg:flex-[2.5] bg-white/10 border-brand-lavender/30 ring-1 ring-brand-lavender/20' : 'flex-[1] bg-white/5'}
                  ${isNoneHovered ? 'lg:flex-1' : ''}
                `}
              >
                {/* Aura Background */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 bg-gradient-to-b ${char.accent} -z-10`}
                    />
                  )}
                </AnimatePresence>

                {/* Character Image Area */}
                <div className="relative mb-8 flex flex-col items-center">
                  <motion.div
                    animate={isHovered ? { 
                      y: [0, -20, 0],
                      scale: 1.15
                    } : {
                      y: 0,
                      scale: 1
                    }}
                    transition={{ 
                      y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                      scale: { duration: 0.6 }
                    }}
                    className="relative z-10"
                  >
                    <img 
                      src={char.image}
                      alt={char.name}
                      className={`
                        transition-all duration-700
                        ${isHovered ? 'w-64 md:w-80 lg:w-72' : 'w-48 md:w-56 lg:w-56'} 
                        h-auto drop-shadow-2xl brightness-110
                      `}
                    />
                  </motion.div>
                  
                  {/* Character Shadow */}
                  <motion.img 
                    src={char.shadow} 
                    alt="shadow"
                    animate={isHovered ? { scale: 1.4, opacity: 0.4 } : { scale: 1, opacity: 0.2 }}
                    className="w-40 md:w-48 h-auto -mt-6 opacity-20 pointer-events-none transition-all duration-700"
                  />
                </div>

                {/* Text Content */}
                <div className={`text-center transition-all duration-500 ${isHovered ? 'mt-4' : 'mt-0'}`}>
                  <motion.h3 
                    layout="position"
                    className={`
                      font-black uppercase tracking-wider mb-4 transition-colors duration-300
                      ${isHovered ? 'text-4xl md:text-5xl text-white' : 'text-2xl md:text-3xl text-white/70'}
                    `}
                  >
                    {char.name}
                  </motion.h3>
                  
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="max-w-md mx-auto"
                      >
                        <p className="text-lg leading-relaxed text-text-secondary font-medium">
                          {char.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subtle shine on unhovered cards */}
                {!isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </PageSection>
  )
}

