'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { caseStudiesData } from './CaseStudiesData';
import Image from 'next/image';
import { ArrowUpRight, Smartphone, Globe, Code2, TrendingUp, Monitor, Layout } from 'lucide-react';
import { PageSection } from '@/components/layout/PageSection';

export function CaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Helper to get tag icons matches user screenshot spirit
  const getTagIcon = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('app')) return <Smartphone className="w-3 h-3" />;
    if (t.includes('web')) return <Globe className="w-3 h-3" />;
    if (t.includes('ai') || t.includes('dev')) return <Code2 className="w-3 h-3" />;
    if (t.includes('gtm')) return <TrendingUp className="w-3 h-3" />;
    return <Layout className="w-3 h-3" />;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial positions: Active at center, others pushed away
      caseStudiesData.forEach((_, index) => {
        if (index === activeIndex) {
          gsap.set(`.case-image-${index}`, { opacity: 1, y: 0, zIndex: 10 });
        } else {
          gsap.set(`.case-image-${index}`, { opacity: 0, y: 150, zIndex: 0 });
        }
      });

      // Mouse move parallax on the image panel
      const handleMouseMove = (e: MouseEvent) => {
        if (!imagePanelRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = imagePanelRef.current.getBoundingClientRect();
        const xPos = ((clientX - left) / width - 0.5) * 25;
        const yPos = ((clientY - top) / height - 0.5) * 25;

        gsap.to('.case-image-inner', {
          x: xPos,
          y: yPos,
          duration: 1.2,
          ease: 'power2.out',
        });
      };

      imagePanelRef.current?.addEventListener('mousemove', handleMouseMove);
      return () => imagePanelRef.current?.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []); // Run once on mount

  useEffect(() => {
    if (activeIndex === prevIndex) return;

    const isNext = activeIndex > prevIndex;
    const ctx = gsap.context(() => {
      // 1. Kill any existing animations on ALL case images to prevent overlap
      gsap.killTweensOf('.case-image');

      // 2. Animate out the PREVIOUS image
      // If moving DOWN (next), previous goes UP (-150)
      // If moving UP (prev), previous goes DOWN (150)
      gsap.to(`.case-image-${prevIndex}`, {
        y: isNext ? -150 : 150,
        opacity: 0,
        zIndex: 0,
        duration: 0.8,
        ease: 'power4.inOut',
      });

      // 3. Animate in the NEW active image
      // If moving DOWN (next), new enters from BOTTOM (150)
      // If moving UP (prev), new enters from TOP (-150)
      gsap.fromTo(`.case-image-${activeIndex}`,
        { 
          y: isNext ? 150 : -150, 
          opacity: 0, 
          zIndex: 20 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power4.inOut',
          clearProps: 'zIndex' // Reset zIndex after animation
        }
      );

      // 4. Reset z-indices for all others to be safe
      gsap.set('.case-image', { zIndex: 0, delay: 0.8 });
      gsap.set(`.case-image-${activeIndex}`, { zIndex: 10, delay: 0.8 });

    }, containerRef);

    setPrevIndex(activeIndex);
    return () => ctx.revert();
  }, [activeIndex, prevIndex]);

  return (
    <PageSection id="case-studies" fullHeight={true} z={20} className="bg-black">
      <div ref={containerRef} className="max-w-[1400px] mx-auto w-full">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12 px-4"
        >
          <div className="flex flex-col gap-4">
            <span className="text-brand-purple font-bold uppercase tracking-[0.4em] text-xs">Portfolio</span>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
              Case <span className="gradient-text">Studies</span>
            </h2>
          </div>
          <p className="text-text-secondary text-lg md:text-xl max-w-md md:text-right leading-relaxed font-medium pb-1">
            Proven results, measurable impact—explore <br className="hidden md:block"/> 
            the transformations we've delivered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-12 items-start">
          
          {/* Left Side - Refined Case List */}
          <div ref={listRef} className="space-y-0 border-t border-white/5">
            {caseStudiesData.map((caseStudy, index) => (
              <div
                key={caseStudy.id}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group relative py-6 border-b border-white/5 cursor-pointer transition-all duration-500 overflow-hidden ${
                  activeIndex === index ? 'bg-white/[0.03]' : ''
                }`}
              >
                {/* Accent Glow Line */}
                <div 
                  className={`absolute left-0 top-0 w-[2px] bg-brand-lavender h-full transition-transform duration-500 origin-top scale-y-0 ${
                    activeIndex === index ? 'scale-y-100' : ''
                  }`}
                />
                
                <div className="flex items-center gap-8 px-6 relative z-10">
                  <span className={`text-base font-display font-black transition-colors duration-300 ${
                    activeIndex === index ? 'text-brand-lavender' : 'text-white/10'
                  }`}>
                    {caseStudy.id}
                  </span>
                  
                  <div className="flex flex-row items-center gap-6 flex-grow">
                    <h3 className={`text-2xl font-bold transition-all duration-300 ${
                      activeIndex === index ? 'text-white' : 'text-white/30'
                    }`}>
                      {caseStudy.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag) => (
                        <div 
                          key={tag}
                          className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all duration-300 ${
                            activeIndex === index 
                              ? 'border-white/20 bg-white/10 text-white' 
                              : 'border-white/5 text-white/20'
                          }`}
                        >
                          {getTagIcon(tag)}
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <ArrowUpRight className={`w-5 h-5 transition-all duration-500 ${
                    activeIndex === index ? 'text-white translate-x-0 opacity-100' : 'text-white/10 translate-x-2 opacity-0'
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Image Preview Panel */}
          <div 
            ref={imagePanelRef}
            className="relative h-[580px] w-full rounded-2xl overflow-hidden border border-white/5 bg-[#050505] shadow-2xl"
          >
            {/* Background Texture/Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(90,63,216,0.1),transparent_80%)]" />
            
            {/* Glows */}
            <div className="image-glow absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-purple/10 to-transparent opacity-50" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full" />

            {/* Images Container */}
            <div className="case-image-inner relative w-full h-full p-4 flex items-center justify-center">
              {caseStudiesData.map((caseStudy, index) => (
                <div
                  key={caseStudy.id}
                  className={`case-image case-image-${index} absolute inset-0 w-full h-full p-8 flex items-center justify-center`}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] group/img border border-white/5 bg-[#111]">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover/img:scale-105"
                      priority={index === 0}
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
              ))}
            </div>

            {/* Corner Decorative */}
            <div className="absolute top-8 left-8 w-2 h-2 border-t-2 border-l-2 border-white/10" />
            <div className="absolute bottom-8 right-8 w-2 h-2 border-b-2 border-r-2 border-white/10" />
          </div>

        </div>
      </div>
    </PageSection>
  );
}
