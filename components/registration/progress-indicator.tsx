"use client"

import { useRegistration } from "@/lib/registration-context"
import { cn } from "@/lib/utils"
import { Check, User, GraduationCap, FileText, CreditCard } from "lucide-react"

const steps = [
  { number: 1, label: "Personal", icon: User },
  { number: 2, label: "Program", icon: GraduationCap },
  { number: 3, label: "Background", icon: FileText },
  { number: 4, label: "Payment", icon: CreditCard },
]

export function ProgressIndicator() {
  const { currentStep } = useRegistration()

  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />

      {/* Animated progress fill */}
      <div
        className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 ease-out"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      >
        {/* Byte particles along progress line */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,200,0.8)]" />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step) => {
          const Icon = step.icon
          const isCompleted = currentStep > step.number
          const isCurrent = currentStep === step.number

          return (
            <div key={step.number} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  "border-2",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                      ? "bg-background border-primary text-primary shadow-[0_0_15px_rgba(0,255,200,0.5)]"
                      : "bg-background border-border text-muted-foreground",
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium transition-colors",
                  isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
