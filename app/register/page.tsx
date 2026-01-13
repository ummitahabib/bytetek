"use client"

import { useState } from "react"
import { ArrowRight, Check, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function N8nRegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courseOfStudy: "",
    trainingFormat: "",
    additionalDetails: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  // Generic handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Submit handler using Vercel serverless proxy
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      const data = await response.json()
      console.log("Registration success:", data)

      setIsSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        courseOfStudy: "",
        trainingFormat: "",
        additionalDetails: "",
      })
    } catch (err) {
      console.error(err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-background">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 mb-6 mx-auto rounded-full border-2 border-accent bg-accent/20 flex items-center justify-center animate-pulse">
            <Check className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Registration Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for registering with byteTek. Check your email for confirmation and next steps.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Register Another
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-background">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src="/bytetek-logo.svg" alt="byteTek" width={50} height={50} className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Build Your Tech Skills Byte by Byte</h1>
          <p className="text-muted-foreground">Start your tech journey with us</p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex gap-3 p-4 mb-5 border rounded-lg bg-destructive/10 border-destructive/30">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {["firstName", "lastName"].map((field) => (
              <div key={field}>
                <label className="block mb-2 text-sm font-medium text-foreground">
                  {field === "firstName" ? "First Name" : "Last Name"} <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  placeholder={field === "firstName" ? "John" : "Doe"}
                  className="w-full px-4 py-3 border rounded-lg bg-card border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            ))}
          </div>

          {[
            { name: "email", type: "email", placeholder: "john@example.com" },
            { name: "phone", type: "tel", placeholder: "+234 801 234 5678" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-2 text-sm font-medium text-foreground">
                {field.name === "email" ? "Email Address" : "Phone Number"} <span className="text-destructive">*</span>
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="w-full px-4 py-3 border rounded-lg bg-card border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          ))}

          {[
            { name: "courseOfStudy", label: "Course of Study", options: ["Web Development","Mobile Development","Data Science","Cybersecurity","Cloud Computing","AI/ML"] },
            { name: "trainingFormat", label: "Training Format", options: ["Virtual","Physical","Hybrid"] },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-2 text-sm font-medium text-foreground">
                {field.label} <span className="text-destructive">*</span>
              </label>
              <select
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg bg-card border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
              >
                <option value="">Select {field.label.toLowerCase()}...</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Additional Information</label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your experience and goals..."
              className="w-full px-4 py-3 border rounded-lg bg-card border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Submitting..." : "Complete Registration"}
            {!isLoading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </button>

          <div className="pt-4 text-sm text-center text-muted-foreground">
            Need help? Contact us at{" "}
            <a href="mailto:byteteklimited@gmail.com" className="text-primary hover:underline">
              byteteklimited@gmail.com
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
