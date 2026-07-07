import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "art&fact — Signalétique, Enseignes et Communication Visuelle à Koléa",
  description:
    "art&fact conçoit, fabrique et installe des solutions de signalétique, enseignes, covering et communication visuelle à Koléa et ses environs. Qualité, durabilité et impact visuel garanti.",
  keywords: [
    "art&fact",
    "enseignes",
    "signalétique",
    "covering",
    "communication visuelle",
    "Koléa",
    "Tipaza",
    "enseigne lumineuse",
    "habillage véhicule",
    "plaque professionnelle",
    "store banne",
  ],
  icons: {
    icon: "/branding-digital.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}