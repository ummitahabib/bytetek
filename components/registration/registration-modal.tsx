"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { useRegistration } from "@/lib/registration-context"
import { ProgressIndicator } from "./progress-indicator"
import { StepPersonalInfo } from "./step-personal-info"
import { StepProgramSelection } from "./step-program-selection"
import { StepBackgroundInfo } from "./step-background-info"
import { StepReviewPayment } from "./step-review-payment"
import { cn } from "@/lib/utils"

export function RegistrationModal() {
  const { isOpen, setIsOpen, currentStep, resetData } = useRegistration()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => resetData(), 300)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full max-w-2xl max-h-[90vh] overflow-hidden",
          "bg-card border border-border rounded-2xl shadow-2xl",
          "animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300",
        )}
      >
        {/* Binary pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <div className="font-mono text-xs text-primary whitespace-nowrap">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                {Array.from({ length: 100 })
                  .map(() => Math.round(Math.random()))
                  .join("")}
              </div>
            ))}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="relative p-6 pb-0">
          <h2 className="text-2xl font-bold font-mono">
            <span className="text-primary">{"<"}</span>
            Register
            <span className="text-primary">{"/>"}</span>
          </h2>
          <p className="text-muted-foreground mt-1">Begin your tech journey with byteTek</p>
        </div>

        {/* Progress Indicator */}
        <div className="relative px-6 py-4">
          <ProgressIndicator />
        </div>

        {/* Step Content */}
        <div className="relative px-6 pb-6 max-h-[60vh] overflow-y-auto">
          {currentStep === 1 && <StepPersonalInfo />}
          {currentStep === 2 && <StepProgramSelection />}
          {currentStep === 3 && <StepBackgroundInfo />}
          {currentStep === 4 && <StepReviewPayment />}
        </div>
      </div>
    </div>
  )
}
