import { 
  Paintbrush, Code, TrendingUp, Brain, Stethoscope, Cpu,
  ShoppingCart, GraduationCap, LayoutGrid 
} from 'lucide-react';

export const SERVICES = [
  {
    title: 'Product Design',
    icon: Paintbrush,
    href: '/services',
    desc: 'Crafting premium, user-centric experiences that define modern digital products.',
    items: ['User Research & Design Strategy', 'UX Architecture & Wireframing', 'High-Fidelity UI Design', 'Design Systems & Dev-Handoff']
  },
  {
    title: 'AI Software Development',
    icon: Code,
    href: '/services',
    desc: 'Building intelligent, scalable AI-powered applications for web and mobile.',
    items: ['WEB DEVELOPMENT', 'APP DEVELOPMENT', 'Cloud-Native AI Architecture', 'Scalable Microservices']
  },
  {
    title: 'Digital Marketing',
    icon: TrendingUp,
    href: '/services',
    desc: 'Driving exponential growth with performance-led digital marketing strategies.',
    items: ['Growth Hacking & Performance Marketing', 'Social Media Branding & Strategy', 'Content Strategy & Lifecycle Marketing', 'Conversion Rate Optimization (CRO)']
  },
  {
    title: 'Research & Development',
    icon: Brain,
    href: '/services',
    desc: 'Pioneering frontier technologies through deep AI research and R&D.',
    items: ['Neural Network Research', 'Generative AI Prototyping', 'Predictive Modeling & Data Science', 'Proof-of-Concept Development']
  },
  {
    title: 'SEO',
    icon: Stethoscope,
    href: '/services',
    desc: 'Dominating search rankings with professional, performance-driven SEO.',
    items: ['Technical SEO & Performance Audit', 'Competitive Keyword Strategy', 'Semantic Content Optimization', 'Authority & Link Building Building']
  },
  {
    title: 'Solutions',
    icon: Cpu,
    href: '/services',
    desc: 'Comprehensive enterprise solutions tailored for digital transformation.',
    items: ['Enterprise AI Implementation', 'Operational Tech Consulting', 'Digital Transformation Strategy', 'Modernization & Infrastructure Scale']
  }
];

export const PRODUCTS = [
  {
    title: 'Ecommerce',
    icon: ShoppingCart,
    href: '/product/ecommerce',
    desc: 'Full-featured ecommerce platform with inventory management, payments, and analytics.',
  },
  {
    title: 'LMS',
    icon: GraduationCap,
    href: '/lms',
    desc: 'Learning management system with E-Courses, assessments, and progress tracking.',
  },
  {
    title: 'CRM',
    icon: LayoutGrid,
    href: '/product/crm',
    desc: 'Customer relationship management system to streamline your sales and support.',
  },
];
