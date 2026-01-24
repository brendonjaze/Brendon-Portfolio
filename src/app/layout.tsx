import type { Metadata } from "next";
import "./globals.css";

import CursorLight from "@/components/CursorLight";

export const metadata: Metadata = {
  title: "Brendon Jaze M. Lambago | Creative Developer Portfolio",
  description: "Explore the portfolio of Brendon Jaze M. Lambago, a creative developer specializing in modern web experiences, UI/UX design, and innovative digital solutions.",
  keywords: ["Brendon Jaze M. Lambago", "Developer Portfolio", "Next.js", "Creative Developer", "Web Design"],
  authors: [{ name: "Brendon Jaze M. Lambago" }],
  verification: {
    google: "mIJ3tDNVQvrvqdfF7Ky0qGhrTGTWO05MKOPL4raz8aL0",
  },
  openGraph: {
    title: "Brendon Jaze M. Lambago | Portfolio",
    description: "Creative Developer & UI/UX Enthusiast",
    url: "https://brendon-portfolio-p95hpqedp-brendon-jazes-projects.vercel.app/",
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <CursorLight />
        {children}
      </body>
    </html>
  );
}
