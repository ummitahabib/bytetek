"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { BinaryRain } from "@/components/binary-rain"
import { FloatingBytes } from "@/components/floating-bytes"
import { RegisterButton } from "@/components/register-button"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Building Tech Skills Byte by Byte"
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let index = 0
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typeInterval)
      }
    }, 80)

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typeInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <BinaryRain />
      <FloatingBytes />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background pointer-events-none" />

      {/* Scan Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-32 animate-scan" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tight">
            <span className="text-primary text-glow animate-glitch inline-block">{"<"}</span>
            <span className="text-foreground">byte</span>
            <span className="text-primary text-glow">Tek</span>
            <span className="text-primary text-glow animate-glitch inline-block">{"/>"}</span>
          </h1>
        </div>

        {/* Typewriter Headline */}
        <div className="mb-8 h-16 md:h-20 flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <p className="text-xl md:text-3xl lg:text-4xl text-muted-foreground font-mono">
            {displayText}
            <span
              className={`inline-block w-0.5 h-6 md:h-8 bg-primary ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}
            />
          </p>
        </div>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          Transform your career with cutting-edge tech education. Master programming, cloud solutions, cybersecurity,
          and AI with industry experts.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
          <RegisterButton size="lg" className="text-lg px-8 py-6 animate-pulse-glow group" showParticles>
            Enroll Today
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </RegisterButton>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary text-lg px-8 py-6 group bg-transparent"
            asChild
          >
            <a href="#programs">
              Explore Programs
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
          {[
            { value: "10K+", label: "Students Trained" },
            { value: "95%", label: "Job Placement" },
            { value: "200+", label: "Partner Companies" },
            { value: "50+", label: "Expert Mentors" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-primary text-glow group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  )
}
