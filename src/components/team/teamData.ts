export interface TeamMember {
  id: number;
  name: string;
  role: string;
  company: string;
  description: string;
  image: string;
  category: string;
  isFounder?: boolean;
  quote?: string;
}

export const teamData: TeamMember[] = [
  {
    id: 1,
    name: 'Ahmed Abdullah',
    role: 'Founder and CEO',
    company: 'TAMx',
    description: 'Visionary leader driving the future of enterprise AI with a focus on scalable intelligence.',
    image: '/images/AhmedAbdullah.png',
    category: 'Leadership',
    isFounder: true,
    quote: "At TAMx, we don't just build AI; we architect the intelligence that empowers the next generation of human potential. Our mission is to make advanced technology as intuitive as thought itself."
  },
  {
    id: 2,
    name: 'Talha Yaseen',
    role: 'CTO',
    company: 'TAMx',
    description: 'Technical architect specializing in high-performance neural networks and distributed systems.',
    image: '/images/talha.png',
    category: 'Engineering'
  },
  {
    id: 3,
    name: 'Taha Khan',
    role: 'CMO',
    company: 'TAMx',
    description: 'Strategic marketer connecting advanced AI capabilities with global enterprise needs.',
    image: '/images/Taha.png',
    category: 'Leadership'
  },
  {
    id: 4,
    name: 'Hunain Ahmed',
    role: 'Software Engineer',
    company: 'TAMx',
    description: 'Full-stack specialist building the core infrastructure for next-gen digital workflows.',
    image: '/images/HunainAhmed.png',
    category: 'Engineering'
  },
  {
    id: 5,
    name: 'Julia Tidbill',
    role: 'Developer',
    company: 'TAMx',
    description: 'Front-end expert crafting immersive, data-driven interfaces for complex AI systems.',
    image: '/team/julia.jpg',
    category: 'Design'
  },
  {
    id: 6,
    name: 'Allison Pick',
    role: 'COO',
    company: 'neurolyze Inc',
    description: 'Operational lead focused on scaling AI research and integrating intelligent systems into healthcare.',
    image: '/team/allison.jpg',
    category: 'Leadership'
  },
  {
    id: 7,
    name: 'Sarah Chen',
    role: 'Senior Product Designer',
    company: 'TAMx',
    description: 'Translating complex AI workflows into elegant, intuitive user experiences.',
    image: '/team/sarah.jpg',
    category: 'Design'
  }
];
