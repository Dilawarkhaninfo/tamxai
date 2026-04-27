'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'
import { PageSection } from '@/components/layout/PageSection'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const carouselImages = [
  '/images/lms/env_1.png',
  '/images/lms/env_2.png',
  '/images/lms/env_3.png',
  '/images/lms/env_4.png'
]

export function LMSMediaCarousel() {
  return (
    <PageSection id="media-carousel" fullHeight={false} className="bg-dark-secondary py-20 lg:py-32 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/5 to-transparent pointer-events-none" />
      
      <div className="container-padding w-full max-w-7xl mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 px-4">
            Explore Our <span className="gradient-text">Virtual Learning</span> Environments
          </h2>
          <div className="h-1.5 w-20 md:w-24 bg-brand-purple/50 mx-auto rounded-full blur-[1px]" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="relative"
        >
          {/* Swiper implementation */}
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 1.5, spaceBetween: 30 },
              1024: { slidesPerView: 2, spaceBetween: 40 }
            }}
            className="pb-24 !overflow-visible"
          >
            {carouselImages.map((src, idx) => (
              <SwiperSlide key={idx} className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                <img 
                  src={src} 
                  alt={`Classroom Environment ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Footer Brand Logo */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex justify-center mt-12 md:mt-20 overflow-hidden w-full"
        >
           <h2 className="text-[10vw] md:text-[9rem] lg:text-[11rem] font-black text-white/5 uppercase tracking-tighter select-none transition-colors hover:text-white/10 duration-700 whitespace-nowrap leading-none max-w-full">
             E-Learning
           </h2>
        </motion.div>
      </div>
      
      {/* Custom styles for Swiper pagination to match TAMx theme */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2) !important;
          width: 10px !important;
          height: 10px !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #a855f7 !important; /* brand-purple */
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
          width: 24px !important;
          border-radius: 5px !important;
        }
      `}</style>
    </PageSection>
  )
}
