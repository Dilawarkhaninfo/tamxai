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

export const metadata: Metadata = {
  title: "TAMx - Building Digital Solutions That Matter",
  description:
    "AI-driven technology solutions for modern businesses. Transform your business with cutting-edge AI and technology solutions.",
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
