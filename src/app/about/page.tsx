'use client';

import React from 'react';
import { ImmersiveHero } from '@/components/ui/ImmersiveHero';
import { PageSection } from '@/components/layout/PageSection';
import { NeuralNetwork3D } from '@/components/ui/NeuralNetwork3D';
import { CTASection } from '@/components/home/CTASection';
import { motion } from 'framer-motion';

const aboutImages = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', // Deep space network
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2064&auto=format&fit=crop', // Abstract tech
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', // Blue circuit
];

export default function AboutPage() {
  return (
    <main className="bg-dark-primary min-h-screen">
      {/* Section 1 — Hero */}
      <ImmersiveHero
        title="About TAMx"
        highlightedWord="TAMx"
        subheading="Building intelligent digital systems that empower modern businesses through cutting-edge AI and human-centric design."
        images={aboutImages}
      />

      {/* Section 2 — Company Story */}
      <PageSection id="story" fullHeight={true} className="bg-[#030712] relative">
        <NeuralNetwork3D />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
             initial={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
             whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
             transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
             viewport={{ once: true }}
             className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-brand-purple/40" />
                <span className="text-brand-lavender font-bold uppercase tracking-[0.3em] text-xs">Our Narrative</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tighter">
              The <span className="gradient-text">Human Element</span> behind AI
            </h2>
            <div className="space-y-8 text-xl text-text-secondary leading-relaxed max-w-xl">
              <p>
                At TAMx, we believe that technology should be more than just a tool—it should be a catalyst for meaningful change. Founded by a team of visionary engineers and designers, our mission is to bridge the gap between complex AI capabilities and real-world business outcomes.
              </p>
              <p>
                We collaborate with forward-thinking organizations to design, develop, and deploy intelligent systems that are not only powerful but also intuitive and ethical.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="aspect-[4/5] md:aspect-square relative rounded-[4rem] overflow-hidden glass-effect group shadow-22xl"
            style={{ perspective: '1000px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/30 to-brand-blue/30 group-hover:opacity-50 transition-opacity duration-1000" />
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              alt="TAMx Innovation" 
              className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-[2000ms]"
            />
            {/* Floating UI Elements Overlay */}
            <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="p-8 rounded-[2rem] bg-dark-primary/60 backdrop-blur-2xl border border-white/10 max-w-sm"
                >
                    <p className="text-[10px] font-bold text-brand-lavender mb-3 uppercase tracking-[0.3em]">Innovation First</p>
                    <p className="text-white text-2xl font-bold leading-tight">Driven by the pursuit of engineering excellence.</p>
                </motion.div>
            </div>
          </motion.div>
        </div>
      </PageSection>

      {/* Section 3 — Our Approach */}
      <PageSection id="approach" fullHeight={true} className="bg-black">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Approach</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A precise, iterative methodology designed to deliver exceptional results at every stage of the product lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { step: '01', title: 'Discovery', desc: 'In-depth research and strategic alignment to uncover your unique needs.' },
            { step: '02', title: 'Strategy', desc: 'Crafting a roadmap that balances technical feasibility with business goals.' },
            { step: '03', title: 'Development', desc: 'Agile execution using the latest AI and web technologies.' },
            { step: '04', title: 'Launch', desc: 'Seamless deployment and continuous optimization for peak performance.' },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, rotateX: -30, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="p-12 rounded-[3rem] bg-[#0F172A] border border-white/5 hover:border-brand-purple/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)] transition-all duration-700 group relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="block text-6xl font-black text-white/5 mb-8 group-hover:text-brand-purple/10 transition-colors tracking-tighter">{item.step}</span>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-brand-lavender transition-colors">{item.title}</h3>
              <p className="text-text-secondary leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{item.desc}</p>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-purple/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Section 4 — Technology Stack */}
      <PageSection id="tech" fullHeight={true} className="bg-[#030712]">
         <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Technology <span className="gradient-text">Ecosystem</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                We leverage a world-class technology stack to build resilient, state-of-the-art digital infrastructure.
            </p>
         </div>

         <div className="flex flex-wrap justify-center gap-12 max-w-4xl mx-auto">
            {['Next.js', 'React', 'TypeScript', 'Node.js', 'PyTorch', 'TensorFlow', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'].map((tech, idx) => (
                <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        type: 'spring', 
                        stiffness: 100, 
                        delay: idx * 0.05,
                        duration: 0.8 
                    }}
                    viewport={{ once: true }}
                    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-brand-purple/10 hover:border-brand-purple/30 hover:shadow-glow-purple cursor-default transition-all duration-300"
                >
                    {tech}
                </motion.div>
            ))}
         </div>
      </PageSection>

      {/* Section 5 — CTA */}
      <CTASection />
    </main>
  );
}
