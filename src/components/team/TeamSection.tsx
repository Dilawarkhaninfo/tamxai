'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { teamData } from './teamData';
import TeamCard from './TeamCard';

export default function TeamSection() {
  return (
    <section 
      id="team-grid" 
      className="relative py-24 md:py-32 bg-background overflow-hidden min-h-screen flex items-center"
    >
      {/* Background ambient glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 size-[600px] bg-brand-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 size-[500px] bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-main mx-auto">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-semibold text-white mb-6"
          >
            Core Leadership
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/50 text-lg md:text-xl font-light max-w-2xl"
          >
            A dedicated group of visionaries and technical experts committed to <br /> pushing the boundaries of AI.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {teamData.map((member) => (
            <TeamCard key={member.id} item={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
