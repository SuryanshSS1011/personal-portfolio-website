import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Suryansh's Portfolio",
  description: "Suryansh's personal portfolio website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <style>{`
      .theme-transition {
        transition: background-color 0.5s ease, color 0.5s ease;
      }
      .no-transitions * {
        transition: none !important;
      }
    `}</style>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500">{children}</div>
      </body>
    </html>
  )
}
