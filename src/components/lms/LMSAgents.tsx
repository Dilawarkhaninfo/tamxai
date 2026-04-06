'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'

const agents = [
  { name: 'Dr. Mathematics', image: 'https://edeviser.com/wp-content/uploads/2025/03/dr-math.jpg', color: 'from-[#4F46E5] to-[#7C3AED]' },
  { name: 'Dr. Chemistry', image: 'https://edeviser.com/wp-content/uploads/2025/03/dr-chem.jpg', color: 'from-[#10B981] to-[#3B82F6]' },
  { name: 'Dr. Physics', image: 'https://edeviser.com/wp-content/uploads/2025/03/dr-phy.jpg', color: 'from-[#F59E0B] to-[#EF4444]' }
]

const stats = [
  { name: 'Physics', progress: 100 },
  { name: 'Chemistry', progress: 100 },
  { name: 'Math', progress: 30 }
]

export function LMSAgents() {
  return (
    <PageSection id="lms-agents" fullHeight={false} className="bg-dark-secondary py-32">
      {/* AI Agents Subsection */}
      <div className="mb-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 px-4">
          <div className="max-w-xl">
             <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-purple font-bold tracking-widest uppercase text-sm mb-4"
            >
              • AI Based Learning 
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Learn using planned lessons from <span className="gradient-text">Specialized AI Agents</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {agents.map((agent, idx) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 hover:border-brand-purple/40 transition-all duration-500 shadow-2xl"
            >
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={agent.image} 
                  alt={agent.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                  <h3 className="text-2xl font-black text-white group-hover:text-brand-lavender transition-colors duration-300">
                    {agent.name}
                  </h3>
                </div>
              </div>
              {/* Highlight border line */}
              <div className={`absolute left-0 bottom-0 h-1.5 w-0 group-hover:w-full bg-gradient-to-r ${agent.color} transition-all duration-700`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistics & Quizzes Subsection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xl w-full"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 leading-tight">
            Personalized <span className="gradient-text">Quizzes</span> According To Your Subject Statistics
          </h2>
          
          <div className="space-y-10 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <h3 className="text-xl font-bold text-white/90 mb-6 flex items-center gap-4">
               <img src="https://edeviser.com/wp-content/uploads/2025/02/Rectangle-168.png" className="w-10 h-10 rounded-lg" alt="User Profile" />
               John’s Subjects Statistics
            </h3>
            
            <div className="space-y-8">
              {stats.map((stat) => (
                <div key={stat.name} className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-text-secondary">
                    <span>{stat.name}</span>
                    <span className="text-brand-lavender">{stat.progress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${stat.progress === 100 ? 'from-green-500 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'from-brand-purple to-brand-lavender shadow-glow-purple'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-brand-purple/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-brand-purple/30 transition-all duration-1000 -z-10" />
          
          <div className="grid grid-cols-2 gap-6 relative z-10">
             <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="pt-12"
             >
                <img 
                  src="https://edeviser.com/wp-content/uploads/2025/03/statistics-850x1024.png" 
                  alt="Statistics Dashboard" 
                  className="w-full h-auto rounded-3xl border border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-700" 
                />
             </motion.div>
             <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
             >
                <img 
                  src="https://edeviser.com/wp-content/uploads/2025/02/Mockup2.png" 
                  alt="Mobile Quiz Mockup" 
                  className="w-full h-auto rounded-3xl border border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-700" 
                />
             </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Personalized Learning Subsection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center mt-40 px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight"
          >
            Personalized Learning Through <span className="gradient-text">AI-Powered</span> Question Answering
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <img 
              src="https://edeviser.com/wp-content/uploads/2025/02/Group-11.png" 
              alt="AI Analytics Badge" 
              className="w-32 h-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </motion.div>

          <p className="text-xl text-text-secondary leading-relaxed max-w-xl opacity-70">
            Our AI-driven question-answering system understands intent, verifies information, and delivers precise, personalized responses to enhance student learning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 relative group"
        >
          <div className="absolute -inset-4 bg-brand-purple/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <img 
            src="https://edeviser.com/wp-content/uploads/2025/02/ChartPoints.svg" 
            alt="Analytics Chart" 
            className="w-full h-auto relative z-10 drop-shadow-[0_0_50px_rgba(168,85,247,0.15)] group-hover:drop-shadow-[0_0_80px_rgba(168,85,247,0.3)] transition-all duration-700"
          />
        </motion.div>
      </div>

      {/* Ask Questions Subtitle */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-32 max-w-4xl mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
          Ask questions from any Topic and get instant help from Professor AI
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-brand-purple to-brand-lavender mx-auto rounded-full group-hover:w-48 transition-all duration-700" />
      </motion.div>
    </PageSection>
  )
}
