'use client';

import React, { useState } from 'react';
import { PageSection } from '@/components/layout/PageSection';
import { CTASection } from '@/components/home/CTASection';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// New specialized components
import { PortfolioHero } from '@/components/portfolio/PortfolioHero';
import { PortfolioFilter } from '@/components/portfolio/PortfolioFilter';
import { ImpactMetrics } from '@/components/portfolio/ImpactMetrics';
import { ProcessSection } from '@/components/portfolio/ProcessSection';
import { TechStack } from '@/components/portfolio/TechStack';
import { TestimonialSection } from '@/components/portfolio/TestimonialSection';
import { MagneticCard } from '@/components/ui/MagneticCard';
import { Project3Preview } from '@/components/portfolio/Project3Preview';
import Link from 'next/link';

const portfolioImages = [
  'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2072&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
];

const allProjects = [
  {
    title: 'Nexus AI Platform',
    category: 'AI Solutions',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    description: 'A comprehensive enterprise AI suite for predictive analytics and automated customer insights.',
    tech: ['TensorFlow', 'Python', 'React'],
    duration: '6 Months',
    role: 'AI Strategy & Development',
    slug: 'nexus-ai-platform'
  },
  {
    title: 'HealSync Mobile',
    category: 'Mobile Applications',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2000&auto=format&fit=crop',
    description: 'Real-time patient monitoring system with encrypted cloud synchronization and edge processing.',
    tech: ['React Native', 'AWS', 'Node.js'],
    duration: '4 Months',
    role: 'Full-Cycle Eng.',
    slug: 'healsync-mobile'
  },
  {
    title: 'Lumina Dashboard',
    category: 'Web Platforms',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda5366991?q=80&w=2000&auto=format&fit=crop',
    description: 'High-fidelity financial visualization tool with real-time trading signals and audit logging.',
    tech: ['Next.js', 'D3.js', 'Typescript'],
    duration: '3 Months',
    role: 'Frontend Architecture',
    slug: 'lumina-dashboard'
  },
  {
    title: 'Quantix Supply Chain',
    category: 'Enterprise Software',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop',
    description: 'Autonomous supply chain optimization platform utilizing reinforcement learning for route efficiency.',
    tech: ['Python', 'Docker', 'Kubernetes'],
    duration: '5 Months',
    role: 'System Design',
    slug: 'quantix-supply-chain'
  },
  {
    title: 'DataMesh Orchestrator',
    category: 'Data Platforms',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop',
    description: 'Distributed data processing engine capable of handling petabytes of unstructured information.',
    tech: ['Go', 'Apache Spark', 'AWS'],
    duration: '8 Months',
    role: 'Backend Engineering',
    slug: 'datamesh-orchestrator'
  },
  {
    title: 'Vanguard FinTech',
    category: 'Web Platforms',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    description: 'Advanced banking infrastructure for modern digital assets and institutional trading.',
    tech: ['React', 'Next.js', 'PostgreSQL'],
    duration: '6 Months',
    role: 'Technical Lead',
    slug: 'vanguard-fintech'
  }
];

const ProjectCard = ({ project }: { project: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full">
      <Link href={`/portfolio/${project.slug || project.title.toLowerCase().replace(/ /g, '-')}`}>
        <motion.div
          whileHover={{ y: -8 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative rounded-[1.5rem] overflow-hidden bg-[#0F172A]/40 border border-white/5 hover:border-brand-lavender/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] h-full flex flex-col"
        >
          <div className="aspect-[16/9] overflow-hidden relative bg-[#0F172A]">
            <img 
              src={project.image} 
              alt={project.title} 
              className={`w-full h-full object-cover transition-all duration-[800ms] ${isHovered ? 'scale-105 opacity-50 blur-[2px]' : 'scale-100 opacity-100 blur-0'}`}
            />
            
            {/* Interactive 3D Preview (Subtle Overlay) */}
            <Project3Preview type={project.category} isHovered={isHovered} />

            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-40" />
            
            <div className="absolute top-5 left-5 py-1.5 px-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 z-20">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/70">{project.category}</span>
            </div>
          </div>

          <div className="p-8 relative flex-grow flex flex-col">
            <div className="flex justify-between items-start mb-5">
              <div className="flex-grow pr-4">
                <h3 className="text-xl font-bold text-white group-hover:text-brand-lavender transition-colors duration-300 tracking-tight leading-tight mb-3">{project.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t: string) => (
                    <span key={t} className="text-[7.5px] uppercase tracking-widest text-text-muted px-2 py-0.5 rounded bg-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-brand-lavender group-hover:border-brand-lavender transition-all duration-300 flex-shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:text-dark-primary" />
              </div>
            </div>
            
            <p className="text-text-secondary text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 mb-8">
              {project.description}
            </p>
            
            <div className="pt-6 border-t border-white/5 flex gap-8 mt-auto">
                <div className="flex flex-col">
                    <span className="text-[7.5px] uppercase tracking-widest text-text-muted mb-1 opacity-50">Timeline</span>
                    <span className="text-[11px] font-semibold text-white/70">{project.duration}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[7.5px] uppercase tracking-widest text-text-muted mb-1 opacity-50">Role</span>
                    <span className="text-[11px] font-semibold text-white/70">{project.role}</span>
                </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <main className="bg-dark-primary min-h-screen">
      {/* Section 1 — Hero */}
      <PortfolioHero
        title="Our Portfolio"
        subheading="A showcase of high-impact digital products and AI solutions delivered for global industry leaders."
        images={portfolioImages}
      />

      {/* Section 2 — Filter System & Grid (Merged) */}
      <section className="bg-black pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-white text-sm font-bold uppercase tracking-[0.5em] mb-4"
          >
            Curated Excellence
          </motion.h2>
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: '80px' }}
             className="h-[1px] bg-brand-purple mx-auto mb-10"
          />
        </div>
        <PortfolioFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        <div className="max-w-[1700px] mx-auto px-6 mt-12">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Section 4 — Featured High-Impact Section */}
      <PageSection id="featured" className="bg-[#030712] border-y border-white/5">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               viewport={{ once: true }}
            >
                 <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-brand-lavender text-[10px] font-bold uppercase tracking-widest mb-8">
                    Global Impact Case Study
                 </span>
                 <h2 className="text-4xl md:text-7xl font-bold text-white mb-10 leading-tight tracking-tighter">
                    Quantum <span className="gradient-text">OS</span>
                 </h2>
                 <p className="text-xl text-text-secondary leading-relaxed mb-12">
                    Redefining enterprise computing with the first intuitive interface for quantum systems. We reduced complex qubit manipulations into elegant, visual workflows that power next-gen research.
                 </p>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {['Zero-latency visualization', 'Adaptive AI error correction', 'Cloud-scale orchestration', 'Real-time telemetry'].map((item) => (
                        <li key={item} className="flex items-center gap-4 text-white font-medium bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shadow-[0_0_10px_rgba(147,51,234,1)]" />
                            <span className="text-sm uppercase tracking-wide opacity-80">{item}</span>
                        </li>
                    ))}
                 </ul>
                 <button className="text-white font-bold flex items-center gap-3 group border-b border-white/20 pb-2 hover:border-brand-purple transition-all duration-500">
                    View Impact Analysis <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-[4rem] overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/40 to-brand-blue/40 mix-blend-overlay opacity-60 z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Featured Platform" 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                />
                
                {/* Floating Glass Element */}
                <motion.div 
                    animate={{ y: [-20, 20, -20] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center p-16 z-20"
                >
                    <div className="w-full h-full border border-white/20 rounded-[3rem] bg-black/40 backdrop-blur-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        <div className="p-12 text-center">
                            <div className="w-24 h-24 rounded-full bg-brand-purple/20 border border-brand-purple/30 mx-auto mb-10 flex items-center justify-center">
                                <ArrowUpRight className="w-12 h-12 text-white" />
                            </div>
                            <h4 className="text-white text-3xl font-bold tracking-tight mb-4">Active Pulse Engine</h4>
                            <p className="text-text-muted text-sm uppercase tracking-widest">v4.0.2 Deployment</p>
                            <div className="mt-10 flex justify-center gap-3">
                                <div className="w-16 h-1.5 bg-brand-purple rounded-full" />
                                <div className="w-6 h-1.5 bg-white/10 rounded-full" />
                                <div className="w-6 h-1.5 bg-white/10 rounded-full" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
         </div>
      </PageSection>

      {/* Section 5 — Project Impact Metrics */}
      <ImpactMetrics />

      {/* Section 6 — Process Behind Projects */}
      <ProcessSection />

      {/* Section 7 — Technology Stack */}
      <TechStack />

      {/* Section 8 — Client Testimonials */}
      <TestimonialSection />

      {/* Section 9 — CTA */}
      <CTASection />
    </main>
  );
}
