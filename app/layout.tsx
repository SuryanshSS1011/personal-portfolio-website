import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  themeColor: "#d4af37",
}

export const metadata: Metadata = {
  title: {
    default: "Suryansh Sijwali - Full-Stack Developer & AI Researcher",
    template: "%s | Suryansh Sijwali"
  },
  description: "Full-Stack Developer, Multi-Domain AI Researcher, and Published Author at Penn State. Specializing in performance optimization, machine learning, and innovative web solutions.",
  keywords: [
    "Suryansh Sijwali",
    "Full-Stack Developer",
    "AI Researcher", 
    "Machine Learning",
    "Penn State",
    "Computer Science",
    "Physics",
    "React",
    "Next.js",
    "Python",
    "Java",
    "Research",
    "IEEE",
    "Publications"
  ],
  authors: [{ name: "Suryansh Sijwali" }],
  creator: "Suryansh Sijwali",
  publisher: "Suryansh Sijwali",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://suryansh-sijwali-portfolio-suryanshss1011s-projects.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Suryansh Sijwali - Full-Stack Developer & AI Researcher",
    description: "Full-Stack Developer, Multi-Domain AI Researcher, and Published Author at Penn State. Specializing in performance optimization, machine learning, and innovative web solutions.",
    siteName: "Suryansh Sijwali Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Suryansh Sijwali - Full-Stack Developer & AI Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suryansh Sijwali - Full-Stack Developer & AI Researcher",
    description: "Full-Stack Developer, Multi-Domain AI Researcher, and Published Author at Penn State.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <style>{`
      .theme-transition {
        transition: background-color 0.5s ease, color 0.5s ease;
      }
      .no-transitions * {
        transition: none !important;
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `}</style>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-500">{children}</div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
