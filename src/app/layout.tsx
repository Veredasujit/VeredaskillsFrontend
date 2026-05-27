import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/home/Footer";
import { Providers } from '@/lib/Providers'
import { Toaster } from "react-hot-toast";
import WhatsAppButton from "@/components/home/Whatsapp";
// import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vereda Digital Learning – Learn, Grow, and Succeed",
    template: "%s | Vereda Digital Learning",
  },
  description:
    "Vereda Digital Learning is India’s leading online education platform, offering career-focused, skill-based, and industry-aligned training programs. Learn from expert mentors, gain certifications, and unlock global opportunities.",
  icons: {
    icon: "/vereda.ico", // Ensure this file exists in your public directory
    shortcut: "/logo.svg", // Ensure this file exists in your public directory
    // apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Vereda Digital Learning – Learn, Grow, and Succeed",
    description:
      "Empowering learners through modern digital education. Build real-world skills with online courses, live classes, and mentor support at Vereda.",
    url: "https://vereda.co.in", // Replace with your live site URL
    siteName: "Vereda Digital Learning",
    type: "website",
    images: [
      {
        url: "/images/aboutus.jpg", // Replace with a high-quality homepage or banner image
        width: 1200,
        height: 630,
        alt: "Vereda Digital Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vereda Digital Learning – Learn, Grow, and Succeed",
    description:
      "Join Vereda — India’s top platform for modern, skill-based learning. Get certified, gain expertise, and advance your career today.",
    images: ["/images/aboutus.jpg"],
  },
  keywords: [
    "Vereda",
    "Vereda Digital Learning",
    "online learning India",
    "tech education",
    "career training",
    "professional courses",
    "digital learning platform",
    "online certification",
    "learn coding",
    "learn digital marketing",
    "best online education platform",
    "Vereda courses",
    "live classes India",
    "skill-based education",
    "edtech India",
  ],
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>

      {/* ⭐ Remix Icons CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
        rel="stylesheet"
      />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WhatsAppButton/>
        <Providers>{children}</Providers>
        <Toaster position="top-right" reverseOrder={false} />
        <Footer />
      </body>
    </html>
  );
}

