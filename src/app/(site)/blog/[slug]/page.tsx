'use client';

import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { blogPosts } from '@/data/blogPosts';
import { PageSection } from '@/components/layout/PageSection';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, ChevronRight, List, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('');
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const post = useMemo(() => 
    blogPosts.find((p) => p.slug === slug), 
  [slug]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (post && contentRef.current) {
      const elements = contentRef.current.querySelectorAll('h2, h3');
      const foundHeadings: { id: string; text: string; level: number }[] = [];
      
      elements.forEach((el, index) => {
        const text = el.textContent || '';
        const id = text.toLowerCase().replace(/\s+/g, '-') + '-' + index;
        el.id = id;
        foundHeadings.push({
          id,
          text,
          level: parseInt(el.tagName.substring(1))
        });
      });
      
      setHeadings(foundHeadings);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-20% 0% -35% 0%', threshold: 0.5 }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [post]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Sticky header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const relatedPosts = useMemo(() => 
    blogPosts
      .filter((p) => p.category === post?.category && p.slug !== slug)
      .slice(0, 3),
  [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center text-white">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-brand-lavender hover:underline flex items-center gap-2 justify-center">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-dark-primary min-h-screen">
      {/* Premium Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-[100] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-purple via-brand-lavender to-blue-400 origin-left shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          style={{ scaleX }}
        />
      </div>

      {/* Mobile ToC Toggle Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed bottom-8 right-8 z-[90] lg:hidden p-4 rounded-full bg-brand-purple text-white shadow-2xl shadow-brand-purple/40 hover:scale-110 active:scale-95 transition-all"
      >
        {isMobileMenuOpen ? <X /> : <List />}
      </button>

      {/* Mobile ToC Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-dark-primary/80 backdrop-blur-md z-[95] lg:hidden"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-dark-navy border-t border-white/10 p-8 rounded-t-[3rem] z-[100] lg:hidden max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
                  <List className="text-brand-purple" /> Contents
                </h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/40 hover:text-white">
                  <X />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`text-left transition-all duration-300 ${
                      activeSection === heading.id 
                      ? 'text-brand-lavender font-bold translate-x-4 pl-4 border-l-2 border-brand-purple' 
                      : 'text-text-muted hover:text-white'
                    } ${heading.level === 3 ? 'ml-6 text-sm opacity-80' : 'text-lg'}`}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 1. Immersive Hero Section */}
      <section className="relative h-[85vh] w-full flex items-end overflow-hidden">
        {/* Background Image with Parallax & Blur */}
        <div className="absolute inset-0 z-0 scale-105">
          <motion.div 
            initial={{ scale: 1.2, filter: 'blur(30px)', opacity: 0 }}
            animate={{ scale: 1, filter: 'blur(0px)', opacity: 0.3 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${post.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-primary via-dark-primary/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.8)_100%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 pb-24">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="flex items-center gap-4 mb-10">
                    <button 
                        onClick={() => router.back()}
                        className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand-purple/20 transition-all group backdrop-blur-md"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="h-px w-16 bg-brand-purple/40" />
                    <span className="px-5 py-2 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-[10px] font-black text-brand-lavender uppercase tracking-[0.3em]">
                        {post.category}
                    </span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black text-white mb-12 leading-[0.95] tracking-tighter max-w-5xl">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-12 text-text-secondary py-10 border-t border-white/10">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/20 shadow-glow-purple/20 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt={post.author} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">Thought Leader</span>
                            <span className="text-base font-black text-white">{post.author}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <Calendar className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">Release Date</span>
                            <span className="text-base font-black text-white">{post.date}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-brand-lavender/10 flex items-center justify-center border border-brand-lavender/20">
                            <Clock className="w-6 h-6 text-brand-lavender" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">Insight Depth</span>
                            <span className="text-base font-black text-white">{post.readTime}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Scroll to Read</span>
          <ChevronDown className="w-5 h-5 text-brand-purple" />
        </motion.div>
      </section>

      {/* 2. Content Section */}
      <PageSection id="post-content" fullHeight={false} className="bg-dark-primary pt-32 pb-40">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 px-6 md:px-0">
            {/* Sidebar Left: Premium ToC */}
            <aside className="hidden lg:block lg:w-96 py-4 sticky top-40 h-fit">
                <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-3xl">
                    <div className="flex items-center gap-4 mb-10 text-white font-black">
                        <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center border border-brand-purple/30">
                          <List className="w-5 h-5 text-brand-lavender" />
                        </div>
                        <span className="uppercase tracking-[0.3em] text-xs">Navigation Hub</span>
                    </div>
                    <nav className="flex flex-col gap-6">
                        {headings.map((heading) => (
                            <button
                                key={heading.id}
                                onClick={() => scrollToHeading(heading.id)}
                                className={`text-left text-sm transition-all duration-500 group flex items-start gap-4 ${
                                    activeSection === heading.id 
                                    ? 'text-brand-lavender font-bold translate-x-2' 
                                    : 'text-text-muted hover:text-white'
                                } ${heading.level === 3 ? 'ml-6 opacity-80' : ''}`}
                            >
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                                  activeSection === heading.id ? 'bg-brand-purple scale-150' : 'bg-white/10'
                                }`} />
                                <span>{heading.text}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="mt-16 pt-10 border-t border-white/10 space-y-6">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">Share Research</p>
                        <div className="flex gap-4">
                            <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-brand-lavender hover:border-brand-lavender hover:bg-brand-lavender/10 transition-all group">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-brand-lavender hover:border-brand-lavender hover:bg-brand-lavender/10 transition-all group">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <article className="w-full lg:w-[calc(100%-28rem)]">
                <div 
                    ref={contentRef}
                    className="prose prose-invert prose-2xl max-w-none 
                    prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter prose-headings:mb-16
                    prose-h2:text-4xl md:prose-h2:text-6xl prose-h2:mt-32 prose-h2:leading-[1.1]
                    prose-h3:text-2xl md:prose-h3:text-4xl prose-h3:mt-20 prose-h3:text-brand-lavender
                    prose-p:text-text-secondary prose-p:leading-[1.9] prose-p:mb-12 prose-p:text-xl md:prose-p:text-2xl prose-p:font-medium
                    prose-li:text-text-secondary prose-li:text-lg md:prose-li:text-xl prose-li:mb-8
                    prose-strong:text-white prose-strong:font-black
                    prose-img:rounded-[4rem] prose-img:border prose-img:border-white/10 prose-img:shadow-3xl prose-img:my-24
                    prose-blockquote:border-l-[6px] prose-blockquote:border-brand-purple prose-blockquote:bg-gradient-to-r prose-blockquote:from-brand-purple/10 prose-blockquote:to-transparent prose-blockquote:p-14 prose-blockquote:rounded-r-[4rem] prose-blockquote:italic prose-blockquote:text-white/90 prose-blockquote:text-2xl md:prose-blockquote:text-4xl prose-blockquote:my-24 prose-blockquote:font-bold"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-40 pt-20 border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-black mb-8">Metadata Tags</p>
                    <div className="flex flex-wrap gap-4">
                        {['Innovation', post.category, 'Future Stack', 'Research', 'TAMx'].map(tag => (
                            <span key={tag} className="px-10 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-black text-text-secondary hover:text-brand-lavender hover:border-brand-lavender/40 hover:bg-brand-lavender/5 transition-all cursor-pointer">
                                #{tag.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        </div>
      </PageSection>

      {/* 3. Related Posts */}
      {relatedPosts.length > 0 && (
        <PageSection 
          id="related-posts" 
          fullHeight={false}
          className="bg-dark-primary border-t border-white/10 pt-32 pb-40"
        >
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
                <div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Explore <span className="gradient-text">Related</span> Insight</h2>
                    <p className="text-text-secondary text-2xl max-w-2xl font-medium">Continue your journey with more specialized research and engineering deep-dives.</p>
                </div>
                <Link href="/blog" className="group flex items-center gap-6 px-12 py-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white hover:text-dark-primary transition-all duration-700 text-lg">
                    View All Articles <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {relatedPosts.map((relatedPost, idx) => (
                    <motion.div
                        key={relatedPost.slug}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 1 }}
                        viewport={{ once: true }}
                        className="group"
                    >
                        <Link href={`/blog/${relatedPost.slug}`} className="block h-full">
                            <div className="relative aspect-[16/11] rounded-[4rem] overflow-hidden mb-10 border border-white/5 shadow-3xl">
                                <img 
                                    src={relatedPost.image} 
                                    alt={relatedPost.title} 
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/90 via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-8 left-10">
                                    <span className="px-5 py-2 rounded-full bg-brand-purple/20 backdrop-blur-md border border-brand-purple/30 text-[10px] font-black text-brand-lavender uppercase tracking-[0.2em]">
                                        {relatedPost.category}
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-white group-hover:text-brand-lavender transition-all duration-500 leading-tight tracking-tight mt-6 line-clamp-2">
                                {relatedPost.title}
                            </h3>
                            <div className="mt-8 flex items-center gap-6 text-text-muted text-xs font-bold uppercase tracking-widest">
                                <span>{relatedPost.date}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/40" />
                                <span>{relatedPost.readTime}</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </PageSection>
      )}

      {/* 4. Final CTA removed as per user request */}
    </main>
  );
}
