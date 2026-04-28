'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PageSection } from '@/components/layout/PageSection'
import { Cpu, Network } from 'lucide-react'

const agents = [
  { name: 'Dr. Mathematics', image: '/images/lms/dr_math.png', color: 'from-[#4F46E5] to-[#7C3AED]' },
  { name: 'Dr. Chemistry', image: '/images/lms/dr_chem.png', color: 'from-[#10B981] to-[#3B82F6]' },
  { name: 'Dr. Physics', image: '/images/lms/dr_phy.png', color: 'from-[#F59E0B] to-[#EF4444]' }
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
              • Expert-Level AI Faculty 
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Master Any Discipline with <span className="gradient-text">Autonomous AI Instructors</span>
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
            Intelligent Inquiry & <br /> <span className="gradient-text">Cognitive</span> Answering
          </motion.h2>
          
          <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="relative group/icon flex-shrink-0"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 relative">
                <div className="absolute inset-0 bg-brand-purple/20 rounded-2xl blur-xl group-hover/icon:bg-brand-purple/40 transition-colors" />
                <div className="relative h-full w-full rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/10 to-transparent" />
                  <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="flex -space-x-2">
                       <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center border border-white/30">
                         <Cpu className="w-5 h-5 md:w-7 md:h-7 text-white" />
                       </div>
                       <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mt-2">
                         <Network className="w-5 h-5 md:w-7 md:h-7 text-brand-lavender" />
                       </div>
                    </div>
                    <span className="text-[8px] md:text-[10px] text-brand-lavender font-bold tracking-tighter uppercase">Expert Sync</span>
                  </div>
                </div>
              </div>
            </motion.div>
 
            <p className="text-xl text-text-secondary leading-relaxed max-w-xl opacity-70">
              Our advanced AI inquiry engine deciphers intent with surgical precision, delivering authoritative and contextually aware responses. Experience a seamless knowledge exchange that accelerates comprehension and empowers research.
            </p>
          </div>
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
            src="/images/lms/ai_qa_process.png" 
            alt="Intelligent Response Ecosystem" 
            className="w-full h-auto relative z-10 drop-shadow-[0_0_50px_rgba(168,85,247,0.15)] group-hover:drop-shadow-[0_0_80px_rgba(168,85,247,0.3)] transition-all duration-700 rounded-3xl"
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
          Query any subject and receive <span className="gradient-text">Expert-Level Assistance</span> from the AI Professor
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-brand-purple to-brand-lavender mx-auto rounded-full group-hover:w-48 transition-all duration-700" />
      </motion.div>
    </PageSection>
  )
}
