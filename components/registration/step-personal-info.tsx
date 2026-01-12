"use client"

import { useState } from "react"
import { useRegistration } from "@/lib/registration-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Check, AlertCircle, ChevronRight } from "lucide-react"

const countryCodes = [
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+233", country: "Ghana" },
  { code: "+254", country: "Kenya" },
  { code: "+27", country: "South Africa" },
]

export function StepPersonalInfo() {
  const { data, updateData, setCurrentStep } = useRegistration()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "fullName":
        if (!value.trim()) return "Full name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters"
        return ""
      case "email":
        if (!value.trim()) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email"
        return ""
      case "phone":
        if (!value.trim()) return "Phone number is required"
        if (!/^\d{10,11}$/.test(value.replace(/\D/g, ""))) return "Please enter a valid phone number"
        return ""
      default:
        return ""
    }
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, data[field as keyof typeof data] as string)
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleNext = () => {
    const fields = ["fullName", "email", "phone"]
    const newErrors: Record<string, string> = {}
    let hasErrors = false

    fields.forEach((field) => {
      const error = validateField(field, data[field as keyof typeof data] as string)
      if (error) {
        newErrors[field] = error
        hasErrors = true
      }
    })

    setErrors(newErrors)
    setTouched({ fullName: true, email: true, phone: true })

    if (!hasErrors) {
      setCurrentStep(2)
    }
  }

  const isValid = (field: string) => touched[field] && !errors[field] && data[field as keyof typeof data]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="flex items-center gap-2">
          Full Name <span className="text-destructive">*</span>
          {isValid("fullName") && <Check className="w-4 h-4 text-primary" />}
        </Label>
        <div className="relative">
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            placeholder="Enter your full name"
            className={cn(
              "bg-secondary/50 border-border focus:border-primary transition-all",
              errors.fullName && touched.fullName ? "border-destructive" : "",
              isValid("fullName") ? "border-primary/50" : "",
            )}
          />
        </div>
        {errors.fullName && touched.fullName && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-3 h-3" />
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          Email Address <span className="text-destructive">*</span>
          {isValid("email") && <Check className="w-4 h-4 text-primary" />}
        </Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="you@example.com"
          className={cn(
            "bg-secondary/50 border-border focus:border-primary transition-all",
            errors.email && touched.email ? "border-destructive" : "",
            isValid("email") ? "border-primary/50" : "",
          )}
        />
        {errors.email && touched.email && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-3 h-3" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          Phone Number <span className="text-destructive">*</span>
          {isValid("phone") && <Check className="w-4 h-4 text-primary" />}
        </Label>
        <div className="flex gap-2">
          <Select value={data.countryCode} onValueChange={(value) => updateData({ countryCode: value })}>
            <SelectTrigger className="w-28 bg-secondary/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((cc) => (
                <SelectItem key={cc.code} value={cc.code}>
                  {cc.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ""))}
            onBlur={() => handleBlur("phone")}
            placeholder="8012345678"
            className={cn(
              "flex-1 bg-secondary/50 border-border focus:border-primary transition-all",
              errors.phone && touched.phone ? "border-destructive" : "",
              isValid("phone") ? "border-primary/50" : "",
            )}
          />
        </div>
        {errors.phone && touched.phone && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-3 h-3" />
            {errors.phone}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
            className="bg-secondary/50 border-border focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
            <SelectTrigger className="bg-secondary/50 border-border">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4">
        <Button onClick={handleNext} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group">
          Continue
          <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
