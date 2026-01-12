"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import { FloatingBytes } from "@/components/floating-bytes"
import { RegisterButton } from "@/components/register-button"

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <FloatingBytes />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-mono">Limited spots available</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Ready to <span className="text-primary text-glow">Level Up</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of developers who have transformed their careers with byteTek. Start your journey today.
          </p>

          {/* CTA Buttons - replaced Apply Now with RegisterButton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <RegisterButton size="lg" className="text-lg px-8 py-6 animate-pulse-glow group" showParticles>
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </RegisterButton>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6 bg-transparent"
            >
              Schedule Consultation
            </Button>
            <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground text-lg">
              Download Syllabus
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-6">Trusted by engineers at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {["Google", "Amazon", "Meta", "Microsoft", "Netflix", "Stripe"].map((company) => (
                <span key={company} className="text-lg font-bold text-foreground">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
