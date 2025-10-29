import { Inter } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Next.js Turborepo Starter",
    template: "%s | Next.js Turborepo Starter",
  },
  description: "A modern Next.js monorepo starter with Turborepo, TypeScript, and shared packages",
  keywords: ["nextjs", "turborepo", "monorepo", "typescript", "starter", "boilerplate"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Next.js Turborepo Starter",
    description: "A modern Next.js monorepo starter with Turborepo, TypeScript, and shared packages",
    siteName: "Next.js Turborepo Starter",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}

