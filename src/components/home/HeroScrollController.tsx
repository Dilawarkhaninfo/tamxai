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
        const sphere = document.getElementById('particles3d');
        if (!sphere) return;

        const sphereWidth = sphere.offsetWidth || 700;

        gsap.to('#particles3d', {
          x: -(sphereWidth * 0.6),
          scale: 0.7,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

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
        gsap.to('#particles3d', {
          opacity: 0.1,
          scale: 0.8,
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
    });

    return () => ctx.revert();
  }, []);

  return null;
}
