'use client';

import React from 'react';
import { ModernPricingPage, PricingCardProps } from "@/components/animated-glassy-pricing";

const FALLBACK_PLANS: PricingCardProps[] = [
  {
    planName: "Starter Plan",
    description: "Best for startups, personal brands, and small businesses",
    price: "129",
    features: ["Website Development (Basic)", "AI Chatbot Integration", "Landing Page Design", "Basic SEO Setup", "1 Project Support", "Email Support", "Basic Analytics Dashboard"],
    buttonText: "Start Your Project",
    buttonVariant: "secondary"
  },
  {
    planName: "Business Plan",
    description: "Perfect for growing startups and companies",
    price: "350",
    features: ["Full Website / Web App Development", "AI Chatbot + LLM Integration", "CRM System Integration", "Custom UI/UX Design", "API Integrations", "Marketing Automation Tools", "5 Active Projects", "Priority Support"],
    buttonText: "Choose Business Plan",
    buttonVariant: "primary",
    isPopular: true
  },
  {
    planName: "Enterprise Plan",
    description: "For companies that need complete digital infrastructure",
    price: "Custom",
    features: ["Custom Software Development", "AI Automation Systems", "Advanced AI Chatbots & LLM Integration", "ERP / CRM Development", "Business Intelligence Dashboards", "Dedicated Development Team", "System Architecture & Scalability Planning", "24/7 Technical Support", "Startup Growth & Technology Consulting"],
    buttonText: "Contact TAMx",
    buttonVariant: "secondary"
  }
];

const FALLBACK_FEATURED = {
  planName: "Startup Builder",
  description: "For founders who want to launch a startup. We turn your vision into a market-ready reality with complete end-to-end support.",
  buttonText: "Consult with TAMx Experts",
  features: ["Idea Validation", "Product Development", "MVP Development", "Pitch Deck", "Growth Strategy", "Marketing System"]
};

interface DbPlan {
  plan_name: string;
  description: string;
  price: string;
  button_text: string;
  is_popular: boolean;
  plan_features?: { label: string; position: number }[];
}

interface PricingPageClientProps {
  dbPlans?: DbPlan[];
}

export default function PricingPageClient({ dbPlans }: PricingPageClientProps) {
  const plans: PricingCardProps[] = dbPlans && dbPlans.length > 0
    ? dbPlans.map((p, idx) => ({
        planName: p.plan_name,
        description: p.description,
        price: p.price,
        features: (p.plan_features ?? [])
          .sort((a, b) => a.position - b.position)
          .map(f => f.label),
        buttonText: p.button_text || 'Get Started',
        isPopular: p.is_popular,
        buttonVariant: p.is_popular ? 'primary' as const : 'secondary' as const,
      }))
    : FALLBACK_PLANS;

  return (
    <ModernPricingPage
      title="Build, Launch & Scale Your Business with TAMx AI Solutions"
      subtitle="Experience the next generation of digital infrastructure. From early-stage startups to global enterprises, we provide the tools you need to dominate your market."
      plans={plans}
      featuredPlan={FALLBACK_FEATURED}
    />
  );
}
