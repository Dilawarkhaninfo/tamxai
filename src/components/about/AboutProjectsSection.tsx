'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
interface DbProject {
  id: string;
  title: string;
  slug: string;
  industry: string;
  description: string;
  cover_url: string | null;
}

interface Props {
  projects: DbProject[];
}

export function AboutProjectsSection({ projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <section className="relative py-24 sm:py-32 bg-black overflow-hidden">
      <div className="w-main mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-lavender mb-4">Our Work</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto text-base sm:text-lg">
            A selection of projects where we delivered exceptional results for our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group rounded-3xl overflow-hidden border border-white/5 bg-[#0a0e1a] hover:border-brand-lavender/20 transition-all duration-500"
            >
              {project.cover_url ? (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.cover_url}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] to-transparent" />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-brand-purple/10 to-brand-blue/5 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/10">{project.title.charAt(0)}</span>
                </div>
              )}

              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-lavender">{project.industry}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3 group-hover:text-brand-lavender transition-colors">{project.title}</h3>
                <p className="text-sm text-foreground/50 line-clamp-2 leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
