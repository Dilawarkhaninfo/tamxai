export interface TeamMember {
  id: number;
  name: string;
  role: string;
  company: string;
  description: string;
  image: string;
}

export const teamData: TeamMember[] = [
  {
    id: 1,
    name: 'Hunain Ahmed',
    role: 'Founder & Lead Engineer',
    company: 'TAMx',
    description: 'Visionary architect specializing in scalable AI infrastructure and end-to-end system design.',
    image: '/team/hunain.jpg'
  },
  {
    id: 2,
    name: 'AI Engineer',
    role: 'Principal AI Scientist',
    company: 'TAMx',
    description: 'Expert in large language models and neural network optimization for enterprise-grade solutions.',
    image: '/team/ai-engineer.jpg'
  },
  {
    id: 3,
    name: 'Frontend Architect',
    role: 'Design & UX Lead',
    company: 'TAMx',
    description: 'Crafting immersive digital experiences with high-performance animations and modern UI systems.',
    image: '/team/frontend.jpg'
  },
  {
    id: 4,
    name: 'Backend Engineer',
    role: 'Distributed Systems Lead',
    company: 'TAMx',
    description: 'Building robust, secure API ecosystems and managing global-scale microservices.',
    image: '/team/backend.jpg'
  },
  {
    id: 5,
    name: 'Product Designer',
    role: 'Product Strategy',
    company: 'TAMx',
    description: 'Bridging technical capabilities with market needs to build intuitive, successful products.',
    image: '/team/designer.jpg'
  }
];
