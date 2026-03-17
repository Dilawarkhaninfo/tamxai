export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image?: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "01",
    name: "Sarah Khan",
    role: "Chief Technology Officer",
    company: "Finova AI",
    text: "TAMx delivered a production-ready AI platform that scaled seamlessly with our growth. Their engineering precision and architectural thinking set them apart from typical development teams.",
    rating: 5,
  },
  {
    id: "02",
    name: "James Walker",
    role: "Head of Product",
    company: "CloudSync Systems",
    text: "The TAMx team translated our complex requirements into an elegant and scalable system. Their ability to combine design, AI, and backend engineering is truly exceptional.",
    rating: 5,
  },
  {
    id: "03",
    name: "Ahmed Raza",
    role: "Founder & CEO",
    company: "DataBridge Analytics",
    text: "We partnered with TAMx to build our AI-driven analytics platform, and the results exceeded expectations. Their speed, communication, and execution are world-class.",
    rating: 5,
  },
  {
    id: "04",
    name: "Emily Carter",
    role: "VP Engineering",
    company: "MedixCore",
    text: "TAMx built a secure and compliant healthcare platform for us with flawless execution. Their understanding of complex domains like healthcare and AI is outstanding.",
    rating: 5,
  },
  {
    id: "05",
    name: "Daniel Kim",
    role: "Director of Innovation",
    company: "NexaTech Labs",
    text: "What impressed us most about TAMx is their strategic mindset. They don’t just build software — they build solutions that align with long-term business growth.",
    rating: 5,
  },
  {
    id: "06",
    name: "Hassan Ali",
    role: "Co-Founder",
    company: "Devkey Tech",
    text: "Working with TAMx has been a game-changer. Their ability to deliver high-performance systems with modern UI and AI capabilities helped us scale faster than expected.",
    rating: 5,
  },
];
