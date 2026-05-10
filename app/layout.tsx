import { MagneticProvider } from "@/components/effects/magnetic-provider";
import type { Metadata } from "next";
import { Syne, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingNavbar } from "@/components/navigation/floating-navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SiteLoader } from "@/components/ui/site-loader";
import { SiteFooter } from "@/components/navigation/site-footer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuantaTechLabs",
  description: "Cinematic digital product and engineering studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <SiteLoader />
        <SmoothScrollProvider />
        <MagneticProvider />
        <CustomCursor />
        <FloatingNavbar />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
