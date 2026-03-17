export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: 1,
    question: "What services does TAMx provide?",
    answer: "TAMx specializes in AI-driven solutions, web and mobile application development, SaaS platforms, and digital transformation for businesses of all sizes."
  },
  {
    id: 2,
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity, but most projects range between 4 to 12 weeks from planning to deployment."
  },
  {
    id: 3,
    question: "Do you work with startups or only enterprises?",
    answer: "We work with both startups and enterprise clients. Our solutions are tailored to fit each client’s stage, goals, and scalability needs."
  },
  {
    id: 4,
    question: "What technologies do you use?",
    answer: "We use modern technologies including React, Next.js, Node.js, Python, TensorFlow, AWS, Docker, and other scalable cloud solutions."
  },
  {
    id: 5,
    question: "How do we get started?",
    answer: "You can start by submitting a project request or scheduling a consultation. Our team will review your requirements and guide you through the next steps."
  },
  {
    id: 6,
    question: "Do you provide ongoing support?",
    answer: "Yes, we provide maintenance, scaling support, and continuous optimization after project delivery."
  },
  {
    id: 7,
    question: "Is my project idea secure?",
    answer: "Absolutely. We follow strict confidentiality practices and can sign NDAs to ensure your idea is fully protected."
  }
];
