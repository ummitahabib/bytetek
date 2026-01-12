"use client"

import { useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RegisterButton } from "@/components/register-button"

const plans = [
  {
    name: "Self-Paced",
    price: { monthly: 49000, annual: 39000 },
    description: "Learn at your own pace with recorded content",
    features: [
      "Access to all course materials",
      "Community forum access",
      "Monthly Q&A sessions",
      "Certificate of completion",
      "6-month access",
    ],
    popular: false,
    programId: "python-basics",
    programType: "short",
  },
  {
    name: "Bootcamp",
    price: { monthly: 299000, annual: 249000 },
    description: "Intensive live training with career support",
    features: [
      "Everything in Self-Paced",
      "Live instructor-led sessions",
      "1-on-1 mentorship",
      "Career coaching",
      "Job placement assistance",
      "Lifetime access",
      "Real-world projects",
    ],
    popular: true,
    programId: "fullstack-bootcamp",
    programType: "bootcamp",
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "Custom training solutions for teams",
    features: [
      "Everything in Bootcamp",
      "Custom curriculum",
      "Dedicated account manager",
      "Team analytics dashboard",
      "On-site training options",
      "Volume discounts",
      "Priority support",
    ],
    popular: false,
    programId: null,
    programType: null,
  },
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom"
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(
      price,
    )
  }

  return (
    <section id="pricing" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">{"// Pricing"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Invest in Your <span className="text-primary text-glow">Future</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Flexible pricing options to match your learning goals and budget.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm", !isAnnual ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn("relative w-14 h-8 rounded-full transition-colors", isAnnual ? "bg-primary" : "bg-muted")}
            >
              <div
                className={cn(
                  "absolute top-1 w-6 h-6 rounded-full bg-foreground transition-transform",
                  isAnnual ? "translate-x-7" : "translate-x-1",
                )}
              />
            </button>
            <span className={cn("text-sm", isAnnual ? "text-foreground" : "text-muted-foreground")}>
              Annual <span className="text-primary font-semibold">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-8 rounded-2xl transition-all duration-300",
                "border bg-card",
                plan.popular
                  ? "border-primary shadow-[0_0_50px_rgba(0,255,200,0.15)] scale-105"
                  : "border-border hover:border-primary/50",
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                {plan.price.monthly !== null ? (
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">
                      {formatPrice(isAnnual ? plan.price.annual : plan.price.monthly)}
                    </span>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-primary">Custom</div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.programId ? (
                <RegisterButton
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                  program={{
                    id: plan.programId,
                    name: plan.name,
                    type: plan.programType!,
                    price: isAnnual ? plan.price.annual! : plan.price.monthly!,
                    duration: plan.name === "Bootcamp" ? "16 weeks" : "4 weeks",
                    description: plan.description,
                    startDates: ["2026-02-01", "2026-03-15", "2026-05-01"],
                  }}
                >
                  Get Started
                </RegisterButton>
              ) : (
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Contact Sales
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-12 p-6 rounded-xl bg-primary/10 border border-primary/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Early Bird Discount</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Use code <span className="font-mono text-primary font-bold">EARLYBIRD</span> at checkout to get 15% off your
            enrollment!
          </p>
        </div>
      </div>
    </section>
  )
}
