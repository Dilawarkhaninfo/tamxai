'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroScrollController() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        gsap.to('#hero-title', {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        gsap.to('#hero-stats', {
          y: 50,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-section',
            start: '40% top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        gsap.to('#hero-company', {
          y: 200,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        gsap.to('.light-rays-bg', {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-section',
            start: '30% top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.to('.light-rays-bg', {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-section',
            start: '30% top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
