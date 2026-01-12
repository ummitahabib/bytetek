import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { RegistrationProvider } from "@/lib/registration-context"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "byteTek | Building Tech Skills Byte by Byte",
  description:
    "byteTek is a premier tech company specializing in tech services, programming training, bootcamps, and professional development. Transform your career with cutting-edge technology education.",
  keywords: [
    "tech training",
    "bootcamp",
    "programming",
    "software development",
    "cybersecurity",
    "AI",
    "machine learning",
  ],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased ${_inter.variable} ${_jetbrainsMono.variable}`}>
        <RegistrationProvider>{children}</RegistrationProvider>
        <Analytics />
      </body>
    </html>
  )
}
