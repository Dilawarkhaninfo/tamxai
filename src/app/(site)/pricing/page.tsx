'use client';

import React from 'react';
import { ModernPricingPage, PricingCardProps } from "@/components/animated-glassy-pricing";

const pricingPlans: PricingCardProps[] = [
  {
    planName: "Starter Plan",
    description: "Best for startups, personal brands, and small businesses",
    price: "129",
    features: [
      "Website Development (Basic)",
      "AI Chatbot Integration",
      "Landing Page Design",
      "Basic SEO Setup",
      "1 Project Support",
      "Email Support",
      "Basic Analytics Dashboard"
    ],
    buttonText: "Start Your Project",
    buttonVariant: "secondary"
  },
  {
    planName: "Business Plan",
    description: "Perfect for growing startups and companies",
    price: "350",
    features: [
      "Full Website / Web App Development",
      "AI Chatbot + LLM Integration",
      "CRM System Integration",
      "Custom UI/UX Design",
      "API Integrations",
      "Marketing Automation Tools",
      "5 Active Projects",
      "Priority Support"
    ],
    buttonText: "Choose Business Plan",
    buttonVariant: "primary",
    isPopular: true
  },
  {
    planName: "Enterprise Plan",
    description: "For companies that need complete digital infrastructure",
    price: "Custom",
    features: [
      "Custom Software Development",
      "AI Automation Systems",
      "Advanced AI Chatbots & LLM Integration",
      "ERP / CRM Development",
      "Business Intelligence Dashboards",
      "Dedicated Development Team",
      "System Architecture & Scalability Planning",
      "24/7 Technical Support",
      "Startup Growth & Technology Consulting"
    ],
    buttonText: "Contact TAMx",
    buttonVariant: "secondary"
  }
];

const startupBuilderPlan = {
  planName: "Startup Builder",
  description: "For founders who want to launch a startup. We turn your vision into a market-ready reality with complete end-to-end support.",
  features: [
    "Idea Validation",
    "Product Development",
    "MVP Development",
    "Pitch Deck",
    "Growth Strategy",
    "Marketing System"
  ]
};

export default function PricingPage() {
  return (
    <ModernPricingPage
      title="Build, Launch & Scale Your Business with TAMx AI Solutions"
      subtitle="Experience the next generation of digital infrastructure. From early-stage startups to global enterprises, we provide the tools you need to dominate your market."
      plans={pricingPlans}
      featuredPlan={startupBuilderPlan}
    />
  );
}
