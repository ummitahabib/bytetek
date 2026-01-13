"use client"

import { useState } from "react"
import { Code, Cloud, Shield, Brain, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Code,
    title: "Software Development",
    description: "Custom software solutions built with cutting-edge technologies. From web apps to enterprise systems.",
    features: ["Full-Stack Development", "API Integration", "Mobile Apps", "DevOps"],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services. AWS, Azure, and Google Cloud expertise.",
    features: ["Cloud Migration", "Infrastructure Design", "Cost Optimization", "24/7 Monitoring"],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Protect your digital assets with comprehensive security solutions and threat assessment.",
    features: ["Penetration Testing", "Security Audits", "Compliance", "Incident Response"],
  },
  {
    icon: Brain,
    title: "AI for Creatives Services",
    description: "Harness the power of artificial intelligence and machine learning for your business.",
    features: ["Model Development", "Data Analytics", "NLP Solutions", "Computer Vision"],
  },
]

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="py-24 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 255, 200, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">{"// Our Services"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Enterprise-Grade <span className="text-primary text-glow">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive tech services designed to transform your business and accelerate digital innovation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "group relative p-8 rounded-xl transition-all duration-500 cursor-pointer",
                "bg-card/50 border border-border hover:border-primary/50",
                "hover:bg-card hover:shadow-[0_0_50px_rgba(0,255,200,0.1)]",
                hoveredIndex === index && "scale-[1.02]",
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Learn More Link */}
              <a
                href="#"
                className="inline-flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
              >
                Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
