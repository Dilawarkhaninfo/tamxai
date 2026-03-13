'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { caseStudiesData } from './CaseStudiesData';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Smartphone, Globe, Code2, TrendingUp, Monitor, Layout } from 'lucide-react';
import { PageSection } from '@/components/layout/PageSection';

export function CaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
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


  return (
    <section id="case-studies" className="w-full relative pb-20">
      <div className="relative w-full" id="work-section">
        <div className="flex flex-col gap-20 md:gap-32">
          
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <h2 className="text-left" style={{ 
              fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", sans-serif',
              fontWeight: 'var(--font-weight-semibold, 600)',
              fontSize: '2.5rem',
              lineHeight: 'var(--leading-tight, 1.25)'
            }}>
              <span className="inline-flex flex-wrap justify-start gap-x-2 gap-y-1">
                <span data-word="true" className="inline-block">Case</span>
                <span data-word="true" className="inline-block">Studies</span>
              </span>
            </h2>
            <div>
              <p className="text-left md:text-right font-light">
                Proven results, measurable impact—explore <br className="hidden md:block"/> the transformations we've delivered.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            
            <div className="flex col-span-1 lg:col-span-7 flex-col">
              {caseStudiesData.map((caseStudy, index) => (
                <Link
                  key={caseStudy.id}
                  href={`/case-study/${caseStudy.name.toLowerCase().replace(/\s+/g, '')}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`py-7 px-3 border-b border-foreground/20 duration-200 group relative ${
                    activeIndex === index ? 'bg-foreground/5' : ''
                  }`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex gap-4 sm:gap-10 items-center flex-wrap">
                      <div className="text-lg">{caseStudy.id}</div>
                      <h3 className="text-lg font-semibold">{caseStudy.name}</h3>
                      <div className="hidden sm:flex gap-2 flex-wrap">
                        {caseStudy.tags.map((tag) => (
                          <div 
                            key={tag} 
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-foreground/20 bg-foreground/5 text-foreground/60 text-xs"
                          >
                            {getTagIcon(tag)}
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight className="size-7 absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-200 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="col-span-5 h-full items-center hidden lg:flex justify-center relative">
              <div className="absolute right-0 top-1/2 overflow-hidden -translate-y-1/2 w-full aspect-square">
                <div 
                  className="size-full flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
                  style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                >
                  {caseStudiesData.map((caseStudy) => (
                    <Image
                      key={caseStudy.id}
                      src={caseStudy.image}
                      alt={caseStudy.name}
                      width={1000}
                      height={1000}
                      className="w-full shrink-0 object-cover aspect-square"
                      quality={90}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
