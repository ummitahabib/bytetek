"use client"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { RegisterButton } from "@/components/register-button"

const plans = [
  {
    name: "Kids Tech Explorers",
    description: "Ages 6–10 • 3-Month Program",
    startingPrice: 65000,
    features: ["2 course options", "Beginner-friendly", "Physical & Virtual", "Certificate included"],
    icon: "🎨",
    popular: false,
  },
  {
    name: "Junior Tech Innovators",
    description: "Ages 11–13 • 3-Month Program",
    startingPrice: 100000,
    features: ["3 course options", "Hands-on projects", "Physical & Virtual", "Portfolio building"],
    icon: "💻",
    popular: true,
  },
  {
    name: "Teen Tech Accelerator",
    description: "Ages 14–18 • 3-Month Program",
    startingPrice: 130000,
    features: ["6 professional courses", "Career-focused", "Physical & Virtual", "Job readiness"],
    icon: "🚀",
    popular: false,
  },
]

export function PricingSection() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm tracking-wider uppercase text-muted-foreground">{"// Pricing"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Invest in <span className="text-black dark:text-white font-black">Your Future</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flexible pricing and payment plans to suit every budget
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-8 rounded-xl transition-all duration-300",
                "border bg-white dark:bg-black",
                plan.popular
                  ? "border-black dark:border-white shadow-lg md:scale-105"
                  : "border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white",
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="text-4xl mb-2">{plan.icon}</div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-8 py-6 border-y border-gray-300 dark:border-gray-700">
                <div className="text-sm text-muted-foreground">Starting at</div>
                <div className="text-3xl font-bold">{formatPrice(plan.startingPrice)}</div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-black dark:text-white flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <RegisterButton
                className={cn(
                  "w-full",
                  plan.popular
                    ? "bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                    : "bg-gray-100 text-black dark:bg-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700",
                )}
                program={{
                  id: plan.name.toLowerCase().replace(/\s+/g, "-"),
                  name: plan.name,
                  type: "program",
                  price: plan.startingPrice,
                  duration: "3 Months",
                  description: plan.description,
                  startDates: ["2026-02-01", "2026-03-15", "2026-05-01"],
                }}
              >
                Explore Courses
              </RegisterButton>
            </div>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="max-w-2xl mx-auto mt-16 p-6 rounded-lg bg-black dark:bg-white text-white dark:text-black text-center border-2 border-black dark:border-white">
          <div className="text-lg font-bold mb-2">Early Registration Special!</div>
          <p className="text-sm">
            Get <span className="font-bold text-lg">30% OFF</span> on selected courses for early birds
          </p>
          <p className="text-xs mt-3 opacity-75">Plus installment payment plans available</p>
        </div>
      </div>
    </section>
  )
}
