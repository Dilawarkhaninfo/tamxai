'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'
import Image from 'next/image'

const characters = [
  {
    name: 'Momo',
    description: 'Energetic and playful, Momo brings excitement to your learning adventure. Always ready with a smile, Momo keeps you motivated, turning challenges into fun and helping you stay engaged every step of the way.',
    image: 'https://edeviser.com/wp-content/uploads/2025/02/cute-tiger-studio-1-1.png',
    shadow: 'https://edeviser.com/wp-content/uploads/2025/02/shadow.png',
    bg: 'bg-white/5 border-white/10',
    hoverBg: 'hover:bg-brand-purple/action-glow group-hover:border-brand-purple/40',
    color: 'text-brand-lavender'
  },
  {
    name: 'Hami',
    description: 'Hami is curious, energetic, and always ready to explore new challenges! With a sharp mind and a fun-loving spirit, Hami encourages you to push your limits and stay motivated.',
    image: 'https://edeviser.com/wp-content/uploads/2025/02/cute-tiger-studio-1.png',
    shadow: 'https://edeviser.com/wp-content/uploads/2025/02/shadow.png',
    bg: 'bg-brand-purple/10 border-brand-purple/20 shadow-glow-purple',
    hoverBg: 'hover:bg-brand-purple/20 group-hover:border-brand-purple/50',
    color: 'text-white'
  },
  {
    name: 'Shibu',
    description: 'A curious and clever fox, always ready to guide you through challenges. Shibu learns with you, helps you stay on track, and celebrates every milestone in your learning journey.',
    image: 'https://edeviser.com/wp-content/uploads/2025/02/cute-tiger-studio-1-2.png',
    shadow: 'https://edeviser.com/wp-content/uploads/2025/02/shadow.png',
    bg: 'bg-white/5 border-white/10',
    hoverBg: 'hover:bg-brand-blue/action-glow group-hover:border-brand-blue/40',
    color: 'text-brand-lavender'
  }
]

export function LMSCharacters() {
  return (
    <PageSection id="lms-characters" fullHeight={false} className="bg-background relative py-32">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 px-4">
        <div className="max-w-2xl">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-brand-purple font-bold tracking-widest uppercase text-sm mb-4"
          >
            • Gamified Learning
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Discover Your Role <br />
            in the <span className="gradient-text">Gamified</span> Learning Adventure
          </motion.h2>
        </div>
        
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="hidden lg:block"
        >
          <img 
            src="https://edeviser.com/wp-content/uploads/2025/03/mic-and-star-circles.svg" 
            alt="Decoration"
            className="w-32 h-auto opacity-40 animate-pulse"
          />
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10">
        {characters.map((char, idx) => (
          <motion.div
            key={char.name}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -10 }}
            className={`group flex-1 flex flex-col items-center text-center p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border ${char.bg} ${char.hoverBg} transition-all duration-700 relative overflow-hidden h-full min-h-[450px] sm:min-h-[500px]`}
          >
            <div className="mb-12 relative flex flex-col items-center">
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <img 
                  src={char.image}
                  alt={char.name}
                  className="w-48 md:w-56 lg:w-48 xl:w-64 h-auto drop-shadow-2xl"
                />
              </motion.div>
              <img 
                src={char.shadow} 
                alt="shadow"
                className="w-40 md:w-48 lg:w-40 xl:w-56 h-auto -mt-6 opacity-30 group-hover:scale-125 transition-transform duration-700"
              />
            </div>

            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-6 ${char.name === 'Hami' ? 'text-white' : 'text-foreground/90'} group-hover:scale-110 transition-transform duration-500`}>
              {char.name}
            </h3>
            
            <p className={`text-lg leading-relaxed ${char.name === 'Hami' ? 'text-white/80' : 'text-text-secondary'} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
              {char.description}
            </p>

            {/* Shine Decoration */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${char.name === 'Hami' ? 'from-brand-purple' : 'from-transparent'} via-brand-lavender to-transparent group-hover:scale-x-125 transition-transform duration-700`} />
          </motion.div>
        ))}
      </div>
    </PageSection>
  )
}
