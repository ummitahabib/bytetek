"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type RegistrationData = {
  // Step 1: Personal Information
  fullName: string
  email: string
  phone: string
  countryCode: string
  dateOfBirth: string
  gender: string

  // Step 2: Program Selection
  programType: string
  specificCourse: string
  trainingFormat: string
  preferredStartDate: string

  // Step 3: Background Information
  occupation: string
  educationLevel: string
  programmingExperience: string
  referralSource: string
  learningGoals: string

  // Step 4: Payment
  paymentPlan: "full" | "installment"
  promoCode: string
  discountApplied: number
  agreedToTerms: boolean
}

type RegistrationContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  data: RegistrationData
  updateData: (updates: Partial<RegistrationData>) => void
  resetData: () => void
  selectedProgram: Program | null
  setSelectedProgram: (program: Program | null) => void
}

export type Program = {
  id: string
  name: string
  type: string
  price: number
  duration: string
  description: string
  startDates: string[]
}

const defaultData: RegistrationData = {
  fullName: "",
  email: "",
  phone: "",
  countryCode: "+234",
  dateOfBirth: "",
  gender: "",
  programType: "",
  specificCourse: "",
  trainingFormat: "",
  preferredStartDate: "",
  occupation: "",
  educationLevel: "",
  programmingExperience: "",
  referralSource: "",
  learningGoals: "",
  paymentPlan: "full",
  promoCode: "",
  discountApplied: 0,
  agreedToTerms: false,
}

const RegistrationContext = createContext<RegistrationContextType | null>(null)

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<RegistrationData>(defaultData)
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)

  const updateData = (updates: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const resetData = () => {
    setData(defaultData)
    setCurrentStep(1)
    setSelectedProgram(null)
  }

  return (
    <RegistrationContext.Provider
      value={{
        isOpen,
        setIsOpen,
        currentStep,
        setCurrentStep,
        data,
        updateData,
        resetData,
        selectedProgram,
        setSelectedProgram,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistration() {
  const context = useContext(RegistrationContext)
  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider")
  }
  return context
}
