'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';

const team = [
  {
    name: 'Alexander Chen',
    role: 'Founder & CEO',
    desc: 'Ex-DeepMind researcher focused on ethical AI orchestration and large-scale autonomous systems.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop',
    social: { linkedin: '#', twitter: '#', github: '#' }
  },
  {
    name: 'Elena Rodriguez',
    role: 'Head of Engineering',
    desc: 'Systems architect with a decade of experience in distributed infrastructure and cloud-native AI.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop',
    social: { linkedin: '#', github: '#' }
  },
  {
    name: 'Marcus Thorne',
    role: 'Principal AI Researcher',
    desc: 'Expert in neural architectures and predictive modeling, driving the R&D behind our core engine.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop',
    social: { linkedin: '#', twitter: '#' }
  }
];

export function TeamSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black py-32 overflow-hidden border-t border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-24">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-lavender text-[10px] uppercase tracking-[0.4em] mb-8 font-bold"
            >
                The Experts
            </motion.div>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-7xl font-bold text-white tracking-tighter"
            >
                Built by <span className="gradient-text">Pioneers</span>
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Profile Card */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white/[0.02] border border-white/5 group-hover:border-brand-purple/30 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1000ms]"
                />
                
                {/* Info Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                    <h3 className="text-white text-3xl font-bold mb-1 tracking-tight">{member.name}</h3>
                    <p className="text-brand-lavender text-[10px] uppercase tracking-widest font-black mb-6">{member.role}</p>
                    <p className="text-text-muted text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 line-clamp-3">
                        {member.desc}
                    </p>
                </div>

                {/* Social Links on Hover */}
                <div className="absolute top-8 right-8 flex flex-col gap-4 z-30 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    {member.social.linkedin && (
                        <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-brand-purple active:scale-90 transition-all">
                            <Linkedin className="w-4 h-4 text-white" />
                        </a>
                    )}
                    {member.social.twitter && (
                        <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-brand-purple active:scale-90 transition-all">
                            <Twitter className="w-4 h-4 text-white" />
                        </a>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/10 to-transparent blur-[100px]" />
    </section>
  );
}
