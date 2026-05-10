import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Preloader } from "@/components/layout/Preloader";
import { PreloaderProvider } from "@/context/PreloaderContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

const customDisplay = localFont({
  src: "../../public/6fe53d21e6e7ebd8-s.woff2",
  variable: "--font-custom-display",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tamxai.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'TAMx — AI-Powered Digital Solutions for Modern Businesses',
    template: '%s | TAMx',
  },
  description:
    'TAMx delivers AI-driven software development, product design, and go-to-market strategy. We build scalable web apps, healthcare platforms, IoT systems, and intelligent automation for startups and enterprises.',
  keywords: [
    'AI development', 'software development', 'product design', 'digital transformation',
    'web development', 'mobile app development', 'healthcare software', 'IoT solutions',
    'machine learning', 'SaaS development', 'Next.js', 'React', 'go-to-market strategy',
  ],
  authors: [{ name: 'TAMx', url: SITE_URL }],
  creator: 'TAMx',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'TAMx',
    title: 'TAMx — AI-Powered Digital Solutions for Modern Businesses',
    description:
      'TAMx delivers AI-driven software development, product design, and go-to-market strategy for startups and enterprises.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAMx — AI-Powered Digital Solutions',
    description:
      'AI-driven software development, product design, and go-to-market strategy for modern businesses.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: SITE_URL },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} ${customDisplay.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <PreloaderProvider>
          <Preloader />
          {children}
        </PreloaderProvider>
      </body>
    </html>
  );
}
