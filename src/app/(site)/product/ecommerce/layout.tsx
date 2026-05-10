import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ecommerce Platform',
  description: 'TAMx Ecommerce — a scalable, AI-enhanced online store platform. Inventory management, secure payments, and intelligent product recommendations.',
  openGraph: {
    title: 'Ecommerce Platform | TAMx',
    description: 'Scalable ecommerce platform with AI-enhanced shopping and inventory management.',
    url: '/product/ecommerce',
  },
};

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
