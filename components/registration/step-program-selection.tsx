"use client"

import { useState } from "react"
import { useRegistration, type Program } from "@/lib/registration-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Clock, Calendar, Check, AlertCircle } from "lucide-react"

const programs: Program[] = [
  {
    id: "fullstack-bootcamp",
    name: "Full-Stack Development Bootcamp",
    type: "bootcamp",
    price: 450000,
    duration: "16 weeks",
    description: "Intensive program covering React, Node.js, PostgreSQL, and deployment",
    startDates: ["2026-02-01", "2026-03-15", "2026-05-01"],
  },
  {
    id: "data-science",
    name: "Data Science & Analytics",
    type: "professional",
    price: 380000,
    duration: "12 weeks",
    description: "Python, Machine Learning, SQL, and Data Visualization",
    startDates: ["2026-02-15", "2026-04-01"],
  },
  {
    id: "devops",
    name: "DevOps Engineering",
    type: "professional",
    price: 320000,
    duration: "10 weeks",
    description: "Kubernetes, CI/CD, Terraform, and Cloud Infrastructure",
    startDates: ["2026-03-01", "2026-05-15"],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Specialist",
    type: "bootcamp",
    price: 400000,
    duration: "14 weeks",
    description: "Ethical hacking, security auditing, and incident response",
    startDates: ["2026-02-01", "2026-04-15"],
  },
  {
    id: "frontend-short",
    name: "Frontend Development",
    type: "short",
    price: 150000,
    duration: "6 weeks",
    description: "HTML, CSS, JavaScript, and React fundamentals",
    startDates: ["2026-01-20", "2026-02-10", "2026-03-01"],
  },
  {
    id: "python-basics",
    name: "Python Programming Basics",
    type: "short",
    price: 100000,
    duration: "4 weeks",
    description: "Introduction to Python for beginners",
    startDates: ["2026-01-15", "2026-02-01", "2026-02-15"],
  },
]

const programTypes = [
  { value: "bootcamp", label: "Bootcamp (Intensive)" },
  { value: "professional", label: "Professional Training" },
  { value: "short", label: "Short Course" },
]

const trainingFormats = [
  { value: "online", label: "Online (100% Remote)" },
  { value: "hybrid", label: "Hybrid (Online + In-Person)" },
  { value: "in-person", label: "In-Person (Lagos Campus)" },
]

export function StepProgramSelection() {
  const { data, updateData, setCurrentStep, selectedProgram, setSelectedProgram } = useRegistration()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const filteredPrograms = data.programType ? programs.filter((p) => p.type === data.programType) : programs

  const handleProgramSelect = (programId: string) => {
    const program = programs.find((p) => p.id === programId)
    if (program) {
      setSelectedProgram(program)
      updateData({ specificCourse: programId })
    }
  }

  const handleNext = () => {
    const newErrors: Record<string, string> = {}

    if (!data.specificCourse) newErrors.specificCourse = "Please select a program"
    if (!data.trainingFormat) newErrors.trainingFormat = "Please select a training format"
    if (!data.preferredStartDate) newErrors.preferredStartDate = "Please select a start date"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(3)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(price)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Program Type Filter */}
      <div className="space-y-2">
        <Label>Program Type</Label>
        <div className="grid grid-cols-3 gap-2">
          {programTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => {
                updateData({ programType: type.value, specificCourse: "", preferredStartDate: "" })
                setSelectedProgram(null)
              }}
              className={cn(
                "p-3 rounded-lg border text-sm transition-all",
                data.programType === type.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/50",
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Selection */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          Select Course <span className="text-destructive">*</span>
        </Label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {filteredPrograms.map((program) => (
            <button
              key={program.id}
              onClick={() => handleProgramSelect(program.id)}
              className={cn(
                "w-full p-4 rounded-lg border text-left transition-all",
                selectedProgram?.id === program.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary/30 hover:border-primary/50",
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={cn("font-semibold", selectedProgram?.id === program.id && "text-primary")}>
                    {program.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {program.duration}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{formatPrice(program.price)}</div>
                  {selectedProgram?.id === program.id && <Check className="w-5 h-5 text-primary mt-2 ml-auto" />}
                </div>
              </div>
            </button>
          ))}
        </div>
        {errors.specificCourse && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.specificCourse}
          </p>
        )}
      </div>

      {/* Training Format */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          Training Format <span className="text-destructive">*</span>
        </Label>
        <Select value={data.trainingFormat} onValueChange={(value) => updateData({ trainingFormat: value })}>
          <SelectTrigger className={cn("bg-secondary/50", errors.trainingFormat && "border-destructive")}>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {trainingFormats.map((format) => (
              <SelectItem key={format.value} value={format.value}>
                {format.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.trainingFormat && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.trainingFormat}
          </p>
        )}
      </div>

      {/* Start Date */}
      {selectedProgram && (
        <div className="space-y-2 animate-in fade-in duration-200">
          <Label className="flex items-center gap-2">
            Preferred Start Date <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {selectedProgram.startDates.map((date) => (
              <button
                key={date}
                onClick={() => updateData({ preferredStartDate: date })}
                className={cn(
                  "p-3 rounded-lg border text-sm flex items-center gap-2 transition-all",
                  data.preferredStartDate === date
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/50",
                )}
              >
                <Calendar className="w-4 h-4" />
                {formatDate(date)}
              </button>
            ))}
          </div>
          {errors.preferredStartDate && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.preferredStartDate}
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1 bg-transparent">
          <ChevronLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 group">
          Continue
          <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
