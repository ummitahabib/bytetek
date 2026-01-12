"use client"

import { useRegistration } from "@/lib/registration-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

const occupations = [
  { value: "student", label: "Student" },
  { value: "employed", label: "Employed" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "unemployed", label: "Unemployed / Job Seeking" },
  { value: "career-change", label: "Career Changer" },
]

const educationLevels = [
  { value: "high-school", label: "High School / Secondary" },
  { value: "diploma", label: "Diploma / OND" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "phd", label: "PhD" },
  { value: "other", label: "Other" },
]

const experienceLevels = [
  { value: "beginner", label: "Beginner (No experience)" },
  { value: "some", label: "Some Experience (< 1 year)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced (3+ years)" },
]

const referralSources = [
  { value: "google", label: "Google Search" },
  { value: "social-media", label: "Social Media (Instagram, Twitter, etc.)" },
  { value: "friend", label: "Friend / Family Referral" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "event", label: "Tech Event / Conference" },
  { value: "blog", label: "Blog / Article" },
  { value: "other", label: "Other" },
]

export function StepBackgroundInfo() {
  const { data, updateData, setCurrentStep } = useRegistration()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <Label>Current Occupation</Label>
        <Select value={data.occupation} onValueChange={(value) => updateData({ occupation: value })}>
          <SelectTrigger className="bg-secondary/50 border-border">
            <SelectValue placeholder="Select your occupation" />
          </SelectTrigger>
          <SelectContent>
            {occupations.map((occ) => (
              <SelectItem key={occ.value} value={occ.value}>
                {occ.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Education Level</Label>
        <Select value={data.educationLevel} onValueChange={(value) => updateData({ educationLevel: value })}>
          <SelectTrigger className="bg-secondary/50 border-border">
            <SelectValue placeholder="Select education level" />
          </SelectTrigger>
          <SelectContent>
            {educationLevels.map((edu) => (
              <SelectItem key={edu.value} value={edu.value}>
                {edu.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Programming Experience</Label>
        <Select
          value={data.programmingExperience}
          onValueChange={(value) => updateData({ programmingExperience: value })}
        >
          <SelectTrigger className="bg-secondary/50 border-border">
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((exp) => (
              <SelectItem key={exp.value} value={exp.value}>
                {exp.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>How did you hear about us?</Label>
        <Select value={data.referralSource} onValueChange={(value) => updateData({ referralSource: value })}>
          <SelectTrigger className="bg-secondary/50 border-border">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            {referralSources.map((src) => (
              <SelectItem key={src.value} value={src.value}>
                {src.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>What are your learning goals?</Label>
        <Textarea
          value={data.learningGoals}
          onChange={(e) => updateData({ learningGoals: e.target.value })}
          placeholder="Tell us what you hope to achieve from this program..."
          className="bg-secondary/50 border-border min-h-24 resize-none"
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1 bg-transparent">
          <ChevronLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep(4)}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 group"
        >
          Review & Pay
          <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
