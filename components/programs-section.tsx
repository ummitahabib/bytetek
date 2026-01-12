"use client"

import { useState } from "react"
import { Clock, Users, Award, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { RegisterButton } from "@/components/register-button"

const programs = [
  {
    id: "fullstack-bootcamp",
    title: "Full-Stack Development",
    duration: "16 weeks",
    level: "Beginner to Advanced",
    students: "500+",
    description: "Master modern web development from front-end to back-end. React, Node.js, databases, and deployment.",
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    color: "from-cyan-500/20 to-blue-500/20",
    price: 450000,
    type: "bootcamp",
    startDates: ["2026-02-01", "2026-03-15", "2026-05-01"],
  },
  {
    id: "data-science",
    title: "Data Science & Analytics",
    duration: "12 weeks",
    level: "Intermediate",
    students: "350+",
    description: "Learn to analyze data, build ML models, and create actionable insights for business decisions.",
    skills: ["Python", "TensorFlow", "SQL", "Tableau", "Statistics"],
    color: "from-green-500/20 to-emerald-500/20",
    price: 380000,
    type: "professional",
    startDates: ["2026-02-15", "2026-04-01"],
  },
  {
    id: "devops",
    title: "DevOps Engineering",
    duration: "10 weeks",
    level: "Intermediate",
    students: "280+",
    description: "Automate deployments, manage infrastructure, and implement CI/CD pipelines at scale.",
    skills: ["Kubernetes", "Jenkins", "Terraform", "AWS", "Linux"],
    color: "from-orange-500/20 to-amber-500/20",
    price: 320000,
    type: "professional",
    startDates: ["2026-03-01", "2026-05-15"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Specialist",
    duration: "14 weeks",
    level: "Beginner to Intermediate",
    students: "420+",
    description: "Protect systems from threats. Learn ethical hacking, security auditing, and incident response.",
    skills: ["Pen Testing", "SIEM", "Compliance", "Cryptography", "Networks"],
    color: "from-red-500/20 to-pink-500/20",
    price: 400000,
    type: "bootcamp",
    startDates: ["2026-02-01", "2026-04-15"],
  },
]

export function ProgramsSection() {
  const [activeProgram, setActiveProgram] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(
      price,
    )
  }

  return (
    <section id="programs" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">{"// Training Programs"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Launch Your <span className="text-primary text-glow">Tech Career</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Industry-focused curriculum designed by experts. Hands-on projects and real-world experience.
          </p>
        </div>

        {/* Programs Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Program List */}
            <div className="lg:col-span-1 space-y-4">
              {programs.map((program, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProgram(index)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg transition-all duration-300",
                    "border border-border hover:border-primary/50",
                    activeProgram === index ? "bg-primary/10 border-primary" : "bg-card/50 hover:bg-card",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-semibold transition-colors",
                        activeProgram === index ? "text-primary" : "text-foreground",
                      )}
                    >
                      {program.title}
                    </span>
                    <ChevronRight
                      className={cn(
                        "w-5 h-5 transition-transform",
                        activeProgram === index ? "text-primary rotate-90" : "text-muted-foreground",
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">{program.duration}</span>
                    <span className="text-sm font-semibold text-primary">{formatPrice(program.price)}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Program Details */}
            <div className="lg:col-span-2">
              <div
                className={cn(
                  "relative p-8 rounded-xl border border-border bg-card overflow-hidden",
                  "transition-all duration-500",
                )}
              >
                {/* Background Gradient */}
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", programs[activeProgram].color)} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold">{programs[activeProgram].title}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(programs[activeProgram].price)}
                      </div>
                      <div className="text-xs text-muted-foreground">Full course fee</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{programs[activeProgram].description}</p>

                  {/* Meta Info */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{programs[activeProgram].duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{programs[activeProgram].level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{programs[activeProgram].students} enrolled</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                      Skills You&apos;ll Learn
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {programs[activeProgram].skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <RegisterButton
                      program={{
                        id: programs[activeProgram].id,
                        name: programs[activeProgram].title,
                        type: programs[activeProgram].type,
                        price: programs[activeProgram].price,
                        duration: programs[activeProgram].duration,
                        description: programs[activeProgram].description,
                        startDates: programs[activeProgram].startDates,
                      }}
                      showParticles
                    >
                      Enroll Now
                    </RegisterButton>
                    <Button variant="outline" className="border-border bg-transparent">
                      Download Syllabus
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
