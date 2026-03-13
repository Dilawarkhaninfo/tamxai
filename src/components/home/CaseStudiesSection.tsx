'use client';

import { useState } from 'react';
import { caseStudiesData } from './CaseStudiesData';
import Image from 'next/image';
import Link from 'next/link';
import { Smartphone, PenTool, Code2, TrendingUp, Layout } from 'lucide-react';

function getTagIcon(tag: string) {
  const t = tag.toLowerCase();
  if (t.includes('web')) return <PenTool className="size-3" />;
  if (t.includes('app')) return <Smartphone className="size-3" />;
  if (t.includes('ai') || t.includes('dev')) return <Code2 className="size-3" />;
  if (t.includes('gtm')) return <TrendingUp className="size-3" />;
  return <Layout className="size-3" />;
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" />
    </svg>
  );
}

export function CaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="case-studies" className="w-full relative">
      <div className="relative w-full" id="work-section">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between gap-5">
            <h2 className="text-3xl sm:text-5xl xl:text-6xl font-semibold leading-tight text-left">
              <span className="inline-flex flex-wrap justify-start gap-x-2 gap-y-1">
                <span data-word="true" className="inline-block">Case</span>
                <span data-word="true" className="inline-block">Studies</span>
              </span>
            </h2>
            <div>
              <p className="text-left md:text-right font-light">
                Proven results, measurable impact—explore <br className="hidden md:block" /> the transformations we&apos;ve delivered.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="flex col-span-1 lg:col-span-7 flex-col">
              {caseStudiesData.map((caseStudy, index) => (
                <Link
                  key={caseStudy.id}
                  href={`/case-study/${caseStudy.slug}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`py-7 px-3 border-b border-foreground/20 duration-200 group relative ${
                    activeIndex === index ? 'bg-foreground/5' : ''
                  }`}
                >
                  <div className="flex justify-between items-center relative">
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
                    <ArrowIcon className="size-7 absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-200 transition-opacity" />
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
