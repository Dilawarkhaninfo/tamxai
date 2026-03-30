'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'
import { Trophy, ShieldCheck, Coins } from 'lucide-react'

const rewards = [
  {
    title: 'Leaderboard',
    description: 'Track your progress, challenge peers, and climb the leaderboard as you master new skills. Our AI-driven system ensures fair competition by analyzing performance and adapting challenges to your learning journey.',
    image: 'https://edeviser.com/wp-content/uploads/2025/03/virtual-leaderboard-highlighting-top-players-winnings.jpg',
    icon: Trophy,
    color: 'from-brand-purple to-brand-lavender'
  },
  {
    title: 'Level Unlocks',
    description: 'Power Up Your Learning Buddies! As you progress, unlock new levels to enhance their abilities, outfits, and personalities. Keep learning, and watch your companions evolve with you!',
    image: 'https://edeviser.com/wp-content/uploads/2025/03/6.jpg',
    icon: ShieldCheck,
    color: 'from-brand-blue to-brand-purple'
  },
  {
    title: 'Points & Tokens',
    description: 'Earn points as you learn and redeem them for exciting rewards, use tokens to explore advanced lessons and challenges. Redeem tokens for certifications, scholarships, or exclusive discounts.',
    image: 'https://edeviser.com/wp-content/uploads/2025/02/icons-prizes-computer-game-1.jpg',
    icon: Coins,
    color: 'from-brand-lavender to-[#e3e3f8]'
  }
]

export function LMSRewards() {
  return (
    <PageSection id="lms-rewards" fullHeight={false} className="bg-dark-secondary py-32">
      <div className="text-center mb-24 max-w-4xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
        >
          Unlock <span className="gradient-text">Rewards, Climb</span> <br />
          Leaderboards and Earn Points
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary text-lg opacity-80"
        >
          Your learning journey is recognized and rewarded every step of the way. 
          Celebrate your milestones with high-value points and exclusive achievements.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4">
        {rewards.map((reward, idx) => (
          <motion.div
            key={reward.title}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative flex flex-col h-full bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-brand-purple/40 transition-all duration-500 shadow-2xl"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={reward.image} 
                alt={reward.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-secondary to-transparent opacity-60" />
              
              <div className={`absolute bottom-6 left-6 p-3 rounded-2xl bg-gradient-to-br ${reward.color} shadow-lg shadow-black/30 group-hover:scale-110 transition-transform`}>
                <reward.icon className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Content Container */}
            <div className="p-8 sm:p-10 flex-grow flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-brand-lavender transition-colors duration-300">
                {reward.title}
              </h3>
              <p className="text-text-secondary leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {reward.description}
              </p>
            </div>
            
            {/* Highlight Line */}
            <div className={`absolute bottom-0 left-0 w-1 bg-gradient-to-b ${reward.color} h-0 group-hover:h-full transition-all duration-700`} />
          </motion.div>
        ))}
      </div>
    </PageSection>
  )
}
