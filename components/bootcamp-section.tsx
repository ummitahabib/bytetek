"use client"

import { useEffect, useState } from "react"
import { Calendar, Users, TrendingUp, MapPin, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { RegisterButton } from "@/components/register-button"
import { CLASS_INFO } from "@/lib/programs-data"

export function BootcampSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [animatedStats, setAnimatedStats] = useState({
    placement: 0,
    avgSalary: 0,
    satisfaction: 0,
  })

  useEffect(() => {
    // Set target date to 30 days from now
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)

    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animate stats on mount
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const statsInterval = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setAnimatedStats({
        placement: Math.round(95 * easeOut),
        avgSalary: Math.round(85000 * easeOut),
        satisfaction: Math.round(98 * easeOut),
      })

      if (step >= steps) clearInterval(statsInterval)
    }, interval)

    return () => clearInterval(statsInterval)
  }, [])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <section
      id="bootcamp"
      className="py-24 bg-white dark:bg-black border-t border-b border-gray-300 dark:border-gray-700"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm tracking-wider uppercase text-muted-foreground">{"// Quick Info"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">Get Started Today</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join ByteTek&apos;s intensive 3-month programs and accelerate your tech career.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-muted-foreground">Next cohort starts in</h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className={cn(
                  "relative p-6 rounded-xl bg-card border border-border",
                  "hover:border-primary/50 transition-all duration-300",
                  "group",
                )}
              >
                <div className="text-4xl md:text-5xl font-bold font-mono text-primary text-glow mb-2">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{unit.label}</div>
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="text-center p-8 rounded-xl bg-card/50 border border-border">
            <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
            <div className="text-4xl font-bold text-primary text-glow mb-2">{animatedStats.placement}%</div>
            <div className="text-muted-foreground">Job Placement Rate</div>
          </div>
          <div className="text-center p-8 rounded-xl bg-card/50 border border-border">
            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
            <div className="text-4xl font-bold text-primary text-glow mb-2">
              ${animatedStats.avgSalary.toLocaleString()}
            </div>
            <div className="text-muted-foreground">Average Starting Salary</div>
          </div>
          <div className="text-center p-8 rounded-xl bg-card/50 border border-border">
            <Calendar className="w-10 h-10 text-primary mx-auto mb-4" />
            <div className="text-4xl font-bold text-primary text-glow mb-2">{animatedStats.satisfaction}%</div>
            <div className="text-muted-foreground">Student Satisfaction</div>
          </div>
        </div>

        {/* Capacity Meter */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Spots Remaining</span>
            <span className="text-sm font-mono text-primary">12 / 30</span>
          </div>
          <div className="h-4 rounded-full bg-secondary overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 animate-pulse-glow"
              style={{ width: "60%" }}
            />
          </div>
          <RegisterButton
            size="lg"
            className="animate-pulse-glow"
            program={{
              id: "fullstack-bootcamp",
              name: "Full-Stack Development Bootcamp",
              type: "bootcamp",
              price: 450000,
              duration: "16 weeks",
              description: "Intensive program covering React, Node.js, PostgreSQL, and deployment",
              startDates: ["2026-02-01", "2026-03-15", "2026-05-01"],
            }}
            showParticles
          >
            Reserve Your Spot
          </RegisterButton>
        </div>

        {/* Location & Contact Highlight */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
              <div className="font-semibold mb-2">Visit Us</div>
              <div className="text-sm text-muted-foreground">{CLASS_INFO.physical.location}</div>
            </div>

            <div className="p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center">
              <Phone className="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
              <div className="font-semibold mb-2">Call Us</div>
              <a href={`tel:${CLASS_INFO.physical.phone}`} className="text-sm hover:underline">
                {CLASS_INFO.physical.phone}
              </a>
            </div>

            <div className="p-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center">
              <Mail className="w-8 h-8 mx-auto mb-3 text-black dark:text-white" />
              <div className="font-semibold mb-2">Email Us</div>
              <a href={`mailto:${CLASS_INFO.contact.email}`} className="text-sm hover:underline">
                {CLASS_INFO.contact.email}
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <RegisterButton
              size="lg"
              program={{
                id: "bytetek-programs",
                name: "ByteTek Training Programs",
                type: "bootcamp",
                price: 65000,
                duration: "3 Months",
                description: "Intensive tech training for kids, teens, and professionals",
                startDates: ["2026-02-01", "2026-03-15", "2026-05-01"],
              }}
              className="px-8 py-3 font-semibold"
            >
              Start Your Journey
            </RegisterButton>
          </div>
        </div>
      </div>
    </section>
  )
}
