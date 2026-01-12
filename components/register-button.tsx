"use client"

import { useRegistration, type Program } from "@/lib/registration-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"
import type { ReactNode } from "react"

type RegisterButtonProps = {
  children?: ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  program?: Program
  showParticles?: boolean
}

export function RegisterButton({
  children = "Register Now",
  className,
  variant = "default",
  size = "default",
  program,
  showParticles = false,
}: RegisterButtonProps) {
  const { setIsOpen, setSelectedProgram, updateData } = useRegistration()

  const handleClick = () => {
    if (program) {
      setSelectedProgram(program)
      updateData({ specificCourse: program.id, programType: program.type })
    }
    setIsOpen(true)
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={cn(
        "relative group overflow-hidden",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        className,
      )}
    >
      {showParticles && (
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <Sparkles
              key={i}
              className="absolute w-3 h-3 text-primary-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                left: `${20 + i * 30}%`,
                top: "50%",
                transform: "translateY(-50%)",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </span>
      )}
      {children}
    </Button>
  )
}
