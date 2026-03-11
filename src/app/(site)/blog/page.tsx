'use client';

import React, { useState } from 'react';
import { ImmersiveHero } from '@/components/ui/ImmersiveHero';
import { PageSection } from '@/components/layout/PageSection';
import { CTASection } from '@/components/home/CTASection';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, Clock, User, ChevronRight } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import Link from 'next/link';

const blogImages = [
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop', // Workspace with laptop
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop', // Data on screen
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop', // Coding React
];

const categories = ['All', 'AI', 'Engineering', 'Design', 'Strategy', 'Healthcare'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="bg-dark-primary min-h-screen">
      {/* Section 1 — Hero */}
      <ImmersiveHero
        title="Insights and Articles"
        highlightedWord="Insights"
        subheading="Expert analysis and research on the technologies shaping the future of digital innovation."
        images={blogImages}
      />

      {/* Section 2 — Featured Blog highlight + Categories */}
      <PageSection id="featured-blog" className="bg-[#030712] relative">
         <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20 relative z-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
                Latest <span className="gradient-text">Research</span>
            </h2>
            <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                            activeCategory === cat 
                            ? 'bg-brand-purple border-brand-purple text-white shadow-glow-purple' 
                            : 'bg-white/5 border-white/10 text-text-secondary hover:border-brand-purple/40 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
         </div>

         {/* Featured Card */}
         {activeCategory === 'All' && blogPosts.find(p => p.featured) && (
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="mb-32 rounded-[4rem] overflow-hidden bg-[#0F172A] border border-white/5 hover:border-brand-purple/40 transition-all duration-700 group flex flex-col lg:flex-row shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
            >
                {(() => {
                    const featuredPost = blogPosts.find(p => p.featured)!;
                    return (
                        <>
                            <div className="lg:w-[55%] aspect-video lg:aspect-auto overflow-hidden relative">
                                <img 
                                    src={featuredPost.image} 
                                    alt={featuredPost.title} 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-transparent opacity-40 hidden lg:block" />
                            </div>
                            <div className="lg:w-[45%] p-12 lg:p-24 flex flex-col justify-center relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 blur-[100px] pointer-events-none" />
                                
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="px-4 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-[10px] font-bold text-brand-lavender uppercase tracking-[0.2em]">Featured</span>
                                    <div className="h-px w-12 bg-white/10" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">{featuredPost.date}</span>
                                </div>

                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-[1.15] group-hover:text-brand-lavender transition-colors duration-500">
                                    {featuredPost.title}
                                </h3>
                                
                                <p className="text-text-secondary text-xl leading-relaxed mb-12 opacity-90 max-w-lg">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex flex-wrap items-center gap-10 mb-12 py-8 border-y border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-lavender">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-widest text-text-muted">Author</span>
                                            <span className="text-sm font-bold text-white">{featuredPost.author}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-widest text-text-muted">Reading Time</span>
                                            <span className="text-sm font-bold text-white">{featuredPost.readTime}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href={`/blog/${featuredPost.slug}`} className="group relative flex items-center gap-4 px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 bg-white w-fit">
                                    <span className="relative z-10 text-dark-primary font-bold">Read Analysis</span>
                                    <div className="w-8 h-8 rounded-full bg-dark-primary/5 flex items-center justify-center group-hover:bg-dark-primary/10 transition-colors">
                                        <ArrowUpRight className="w-5 h-5 text-dark-primary transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>
                                </Link>
                            </div>
                        </>
                    );
                })()}
            </motion.div>
         )}

         {/* Section 3 — Blog Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
                {filteredPosts.filter(p => !p.featured || activeCategory !== 'All').map((post, idx) => (
                    <motion.div
                        key={post.slug}
                        layout
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                            duration: 0.6, 
                            delay: idx * 0.1,
                            ease: [0.22, 1, 0.36, 1] 
                        }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden bg-[#0F172A] border border-white/5 hover:border-brand-purple/50 transition-all duration-500 group flex flex-col h-full shadow-22xl hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                    >
                        <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-30" />
                        
                        {/* Animated Border Overlay */}
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                        
                        <div className="aspect-[16/11] overflow-hidden relative">
                            {/* Parallax-style image hover */}
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
                            
                            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-brand-purple/20 backdrop-blur-xl border border-brand-purple/30 text-[10px] font-bold text-brand-lavender uppercase tracking-widest">
                                {post.category}
                            </div>
                        </div>

                        <div className="p-12 pb-10 flex flex-col flex-grow relative">
                            <h3 className="text-2xl font-bold text-white mb-6 leading-snug group-hover:text-brand-lavender transition-colors duration-300">
                                {post.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed mb-auto opacity-80 line-clamp-3">
                                {post.excerpt}
                            </p>
                            
                            <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Published</span>
                                    <span className="text-xs font-medium text-white/60">{post.date}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Reading Time</span>
                                    <span className="text-xs font-medium text-brand-lavender/80 flex items-center gap-1.5">
                                        <Clock className="w-3 h-3" /> {post.readTime}
                                    </span>
                                </div>
                            </div>

                            {/* Hover Reveal Arrow */}
                            <div className="absolute bottom-10 right-12 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                <ArrowUpRight className="w-6 h-6 text-brand-purple" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
         </div>
      </PageSection>

      {/* Section 4 — Newsletter */}
      <PageSection id="newsletter" className="bg-black">
        <div className="max-w-4xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-[#0F172A] to-[#030712] border border-white/5 shadow-2xl relative overflow-hidden text-center group">
            <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                <div className="p-4 rounded-2xl bg-brand-purple/20 border border-brand-purple/30 text-brand-lavender w-fit mx-auto mb-10">
                    <Search className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                    Stay Ahead of the <span className="gradient-text">Curve</span>
                </h2>
                <p className="text-text-secondary text-lg max-w-xl mx-auto mb-12 leading-relaxed">
                    Join our newsletter to receive the latest research and technical insights from the TAMx engineering team.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="flex-grow px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-brand-purple transition-all"
                    />
                    <button className="px-8 py-4 rounded-full bg-brand-purple text-white font-bold hover:shadow-glow-purple transition-all active:scale-95">
                        Subscribe
                    </button>
                </form>
            </motion.div>
        </div>
      </PageSection>

      {/* Section 5 — CTA */}
      <CTASection />
    </main>
  );
}
