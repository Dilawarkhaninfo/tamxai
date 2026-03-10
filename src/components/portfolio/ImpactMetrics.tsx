'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AtomicSphere } from '@/components/home/AtomicSphere';

const metrics = [
  { label: 'Projects Delivered', value: 50, suffix: '+' },
  { label: 'Global Clients', value: 30, suffix: '+' },
  { label: 'AI Products Built', value: 10, suffix: '+' },
  { label: 'Client Satisfaction', value: 98, suffix: '%' },
];

export function ImpactMetrics() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-[#030712] py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.05)_0%,transparent_70%)] opacity-60" />
        
        {/* Floating 3D Element */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-20 scale-150 pointer-events-none">
          <AtomicSphere />
        </div>

        {/* Subtle Grid */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px' 
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           viewport={{ once: true }}
           className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Driving <span className="gradient-text">Real Impact</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our numbers tell the story of innovation, dedication, and measurable success delivered to our global partners.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1, 
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-brand-purple/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10">
                <div className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  >
                    <Counter value={metric.value} />
                  </motion.span>
                  <span className="gradient-text">{metric.suffix}</span>
                </div>
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-text-muted transition-colors group-hover:text-brand-lavender">
                  {metric.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    let startTime: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={nodeRef}>{count}</span>;
}
