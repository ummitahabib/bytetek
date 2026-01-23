"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote, Smartphone, Bot, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const students = [
  {
    name: "Musa Muhammad",
    course: "Mobile App Development",
    image: "/musa.png",
    quote:
      "I'm loving every moment of learning mobile app development at byteTek. The hands-on approach and supportive instructors make complex concepts easy to understand. I've already built my first functional app!",
    progress: "75%",
    currentProject: "E-commerce Mobile App",
    icon: Smartphone,
  },
  {
    name: "Muhammad Bello",
    course: "Robotics Lego",
    image: "/muhammad.png",
    quote:
      "Building and programming robots has been an amazing experience. The Robotics Lego course combines creativity with problem-solving in ways I never imagined. Can't wait to showcase my final project!",
    progress: "60%",
    currentProject: "Autonomous Navigation Robot",
    icon: Bot,
  },
  {
    name: "Aisha",
    course: "AI for Creatives",
    image: "/aisha.jpeg",
    quote:
      "As a creative person, I was amazed at how AI can enhance my work. This course opened up a whole new world of possibilities. I'm now creating AI-powered designs and content that I never thought possible.",
    progress: "80%",
    currentProject: "AI Art Generation Tool",
    icon: Sparkles,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % students.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + students.length) % students.length)
  }

  const IconComponent = students[currentIndex].icon

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">{"// Student Journeys"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Meet Our <span className="text-primary text-glow">Current Students</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from students currently learning and building amazing projects at byteTek.
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
                  <div className="w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden border-2 border-primary mb-4 bg-primary/10 flex items-center justify-center">
                    <img
                      src={students[currentIndex].image}
                      alt={students[currentIndex].name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-primary/20 text-primary text-2xl font-bold">${students[currentIndex].name.charAt(0)}</div>`
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-lg">{students[currentIndex].name}</h3>
                  <p className="text-primary text-sm flex items-center justify-center md:justify-start gap-2 mt-1">
                    <IconComponent className="w-4 h-4" />
                    {students[currentIndex].course}
                  </p>

                  {/* Progress & Project */}
                  <div className="mt-6 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Course Progress</span>
                        <span className="text-primary font-semibold">{students[currentIndex].progress}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-500"
                          style={{ width: students[currentIndex].progress }}
                        />
                      </div>
                    </div>
                    <div className="text-xs">
                      <span className="block text-muted-foreground mb-1">Current Project:</span>
                      <span className="text-foreground font-medium">
                        {students[currentIndex].currentProject}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="md:col-span-2 flex items-center">
                  <blockquote className="text-lg md:text-xl text-muted-foreground italic leading-relaxed">
                    &ldquo;{students[currentIndex].quote}&rdquo;
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
                aria-label="Previous student"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {students.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to student ${index + 1}`}
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
                aria-label="Next student"
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