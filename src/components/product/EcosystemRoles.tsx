'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Factory, ShoppingBag, UserCheck, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

const cards = [
  {
    title: 'For Wholesalers',
    subtitle: 'Expand your reach without handling customers',
    icon: Factory,
    items: ['Upload products', 'Get bulk + automated orders', 'Zero marketing effort'],
    color: '#00D1FF',
    image: '/images/ecommerce/wholesaler.png'
  },
  {
    title: 'For Sellers / Dropshippers',
    subtitle: 'Launch a business without inventory',
    icon: ShoppingBag,
    items: ['Ready-made storefront', 'One-click product import', 'Automated fulfillment'],
    color: '#7A5CFF',
    image: '/images/ecommerce/seller.png'
  },
  {
    title: 'For Customers',
    subtitle: 'Fast, reliable, and seamless shopping',
    icon: UserCheck,
    items: ['Verified sellers', 'Transparent tracking', 'Consistent experience'],
    color: '#FFFFFF',
    image: '/images/ecommerce/customer.png'
  }
]

export function EcosystemRoles() {
  return (
    <section id="ecosystem" className="py-24 px-6 relative overflow-hidden bg-white/[0.02]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-[#7A5CFF]/5 to-transparent blur-[120px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Designed for Every Player in the <br />
            <span className="text-[#00D1FF]">Ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/60 text-xl max-w-3xl mx-auto font-light"
          >
            One platform that empowers businesses of all sizes to thrive in a unified marketplace.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ rotateY: 5, rotateX: 5, scale: 1.05 }}
              className="relative group p-8 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 overflow-hidden"
              style={{
                perspective: '1000px'
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${card.color}11 0%, transparent 70%)`
                }}
              />
              
              <div className="mb-10 relative">
                <div 
                  className="w-16 h-16 rounded-[20px] flex items-center justify-center p-4 relative z-10 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${card.color}15`, border: `1px solid ${card.color}33` }}
                >
                  <card.icon className="w-8 h-8" style={{ color: card.color }} />
                </div>
                <div className="absolute top-0 left-0 w-16 h-16 blur-2xl opacity-50 transition-opacity group-hover:opacity-100" style={{ backgroundColor: card.color }} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-white/50 mb-8 font-light text-sm leading-relaxed">{card.subtitle}</p>

              <ul className="space-y-4 mb-10">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/80 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: card.color }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 shadow-inner">
                <Image 
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
