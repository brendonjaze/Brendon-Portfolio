import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Inter, Outfit } from "next/font/google";

import CursorLight from "@/components/CursorLight";
import CursorParticles from "@/components/CursorParticles";
import CursorComet from "@/components/CursorComet";
import SiteIntro from "@/components/SiteIntro";
import InteractiveRobot from "@/components/InteractiveRobot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: "Brendon Jaze M. Lambago | Creative Developer Portfolio",
  description: "Explore the portfolio of Brendon Jaze M. Lambago, a creative developer specializing in modern web experiences, UI/UX design, and innovative digital solutions.",
  keywords: ["Brendon Jaze M. Lambago", "Developer Portfolio", "Next.js", "Creative Developer", "Web Design"],
  authors: [{ name: "Brendon Jaze M. Lambago" }],
  verification: {
    google: "mIJ3tDNVQvrvqdF7Ky0qGhrTGTWO05MKOPL4raz8aL0",
  },
  openGraph: {
    title: "Brendon Jaze M. Lambago | Portfolio",
    description: "Creative Developer & UI/UX Enthusiast",
    url: "https://brendon-portfolio-mu.vercel.app/",
    siteName: "Brendon Lambago Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body>
        <CursorLight />
        <CursorParticles />
        <CursorComet />
        <SiteIntro />
        <InteractiveRobot />
        {children}
      </body>
    </html>
  );
}
