"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full-Stack Developer at Google",
    image: "/professional-asian-woman-headshot.jpg",
    quote:
      "byteTek transformed my career. I went from a marketing role to a software engineer at Google in just 6 months. The hands-on projects and mentor support were invaluable.",
    beforeRole: "Marketing Coordinator",
    salaryIncrease: "+120%",
  },
  {
    name: "Marcus Johnson",
    role: "DevOps Engineer at AWS",
    image: "/professional-black-man-headshot.png",
    quote:
      "The DevOps bootcamp gave me exactly what I needed to break into cloud infrastructure. The curriculum is cutting-edge and the career support is exceptional.",
    beforeRole: "IT Support",
    salaryIncrease: "+85%",
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist at Netflix",
    image: "/professional-latina-woman-headshot.png",
    quote:
      "Best investment I've ever made in myself. The data science program covered everything from Python basics to advanced ML models. Now I'm working on recommendation systems at Netflix!",
    beforeRole: "Business Analyst",
    salaryIncrease: "+95%",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">{"// Success Stories"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Student <span className="text-primary text-glow">Transformations</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real graduates who changed their lives with byteTek.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <Quote className="absolute -top-4 -left-4 w-16 h-16 text-primary/20" />

            {/* Testimonial Card */}
            <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Profile */}
                <div className="md:col-span-1 text-center md:text-left">
                  <div className="w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden border-2 border-primary mb-4">
                    <img
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{testimonials[currentIndex].name}</h3>
                  <p className="text-primary text-sm">{testimonials[currentIndex].role}</p>

                  {/* Before/After */}
                  <div className="mt-6 space-y-2">
                    <div className="text-xs text-muted-foreground">
                      <span className="block">Previously:</span>
                      <span className="text-foreground">{testimonials[currentIndex].beforeRole}</span>
                    </div>
                    <div className="text-xs">
                      <span className="block text-muted-foreground">Salary Increase:</span>
                      <span className="text-primary font-bold text-lg">
                        {testimonials[currentIndex].salaryIncrease}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="md:col-span-2 flex items-center">
                  <blockquote className="text-lg md:text-xl text-muted-foreground italic leading-relaxed">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-border hover:border-primary hover:bg-primary/10 bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentIndex ? "w-8 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                    )}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-border hover:border-primary hover:bg-primary/10 bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
