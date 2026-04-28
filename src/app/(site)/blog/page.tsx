'use client';

import React, { useState } from 'react';
import { BlogHero3D } from '@/components/blog/BlogHero3D';
import { PageSection } from '@/components/layout/PageSection';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, Clock, User, ChevronRight, Bookmark } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const categories = ['All', 'AI', 'Engineering', 'Design', 'Strategy', 'Healthcare'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(p => p.featured);
  const showFeaturedHero = activeCategory === 'All' && searchQuery === '';
  
  const gridPosts = showFeaturedHero 
    ? filteredPosts.filter(p => !p.featured)
    : filteredPosts;

  return (
    <main className="bg-dark-primary min-h-screen text-slate-200">
      {/* Section 1 — Unique 3D Hero */}
      <BlogHero3D />

      {/* Section 2 — Filter & Featured Selection */}
      <PageSection id="blog-content" fullHeight={false} className="bg-transparent -mt-20 relative z-20 pb-24">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 px-4">
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                            activeCategory === cat 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all w-full md:w-64 text-white"
                />
            </div>
         </div>

         {/* Featured Card - Resized for Professionalism */}
         {showFeaturedHero && featuredPost && (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-24 mx-auto max-w-6xl rounded-[2.5rem] overflow-hidden bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all duration-500 group flex flex-col lg:flex-row shadow-2xl backdrop-blur-sm"
            >
                <div className="lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden relative">
                    <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent hidden lg:block" />
                </div>
                <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">Featured</span>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500">{featuredPost.date}</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                        {featuredPost.title}
                    </h3>
                    
                    <p className="text-slate-400 text-lg leading-relaxed mb-8 line-clamp-3">
                        {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400">
                                <User className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-300">{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span className="text-xs font-bold text-slate-300">{featuredPost.readTime}</span>
                        </div>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`} className="mt-8 flex items-center gap-2 text-blue-400 font-bold hover:gap-3 transition-all text-sm">
                        Read Analysis <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </motion.div>
         )}

         {/* Mobile Editorial Carousel */}
         <div className="lg:hidden w-full relative -mx-4 px-4 overflow-visible">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 15,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination]}
                className="blog-swiper pb-16"
            >
                {gridPosts.map((post) => (
                    <SwiperSlide key={post.slug} className="!w-[85vw] pb-4">
                        <BlogCard post={post} />
                    </SwiperSlide>
                ))}
            </Swiper>
         </div>

         {/* Blog Grid (Desktop Only) */}
         <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
                {gridPosts.map((post, idx) => (
                    <motion.div
                        key={post.slug}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                    >
                        <BlogCard post={post} />
                    </motion.div>
                ))}
            </AnimatePresence>
         </div>
      </PageSection>

      {/* Section 4 — Professional Newsletter */}
      <PageSection id="newsletter" fullHeight={false} className="bg-dark-primary pt-32 pb-60">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-10 md:p-16 bg-gradient-to-br from-slate-900/60 to-slate-900/20 border border-white/5 shadow-2xl relative overflow-hidden text-center group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Connect with our <span className="gradient-text">Research</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed opacity-70">
                    Join our technical community for high-fidelity updates on engineering breakthroughs and product strategy.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder="Expert email address..." 
                        className="flex-grow px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                    />
                    <button className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                        Join Hub
                    </button>
                </form>
            </motion.div>
        </div>
      </PageSection>
    </main>
  );
}

function BlogCard({ post }: { post: any }) {
  return (
    <div className="group relative flex flex-col bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 hover:bg-slate-900/60 transition-all duration-500 shadow-xl h-full backdrop-blur-sm">
        <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-20" />
        
        <div className="aspect-[16/10] overflow-hidden relative">
            <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.05]" 
            />
            <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-all transform hover:scale-110">
                    <Bookmark size={18} />
                </button>
            </div>
        </div>

        <div className="p-8 flex flex-col flex-grow relative">
             <div className="flex items-center gap-3 mb-5">
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">{post.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{post.date}</span>
             </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
                {post.excerpt}
            </p>
            
            <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800/50 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all">
                        <User size={14} />
                    </div>
                    {post.author}
                </div>
                <div className="flex items-center gap-2.5">
                    <Clock size={14} className="text-slate-600" />
                    {post.readTime}
                </div>
            </div>
        </div>
    </div>
  );
}
