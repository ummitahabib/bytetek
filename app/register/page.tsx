// "use client"

// import type React from "react"

// import { useState } from "react"
// import { ArrowRight, Check, AlertCircle } from "lucide-react"
// import Image from "next/image"

// const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://n8n.srv1240013.hstgr.cloud/webhook-test/student-registration"

// export default function N8nRegistrationPage() {
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     courseOfStudy: "",
//     trainingFormat: "",
//     additionalDetails: "",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")

//     try {
//       const response = await fetch(WEBHOOK_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       if (response.ok) {
//         setIsSubmitted(true)
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           phone: "",
//           courseOfStudy: "",
//           trainingFormat: "",
//           additionalDetails: "",
//         })
//       } else {
//         setError("Registration failed. Please try again.")
//       }
//     } catch (err) {
//       setError("An error occurred. Please check the webhook URL and try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
//         <div className="w-full max-w-md">
//           {/* Success Animation */}
//           <div className="flex flex-col items-center text-center">
//             <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-6 animate-pulse">
//               <Check className="w-10 h-10 text-accent" />
//             </div>

//             <h1 className="text-3xl font-bold text-foreground mb-2">Registration Successful!</h1>
//             <p className="text-muted-foreground mb-8">
//               Thank you for registering with byteTek. Check your email for confirmation and next steps.
//             </p>

//             <button
//               onClick={() => setIsSubmitted(false)}
//               className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
//             >
//               Register Another
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <Image src="/bytetek-logo.svg" alt="byteTek" width={50} height={50} className="h-12 w-auto" />
//           </div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">Join byteTek</h1>
//           <p className="text-muted-foreground">Start your tech journey with us</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Error Message */}
//           {error && (
//             <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3">
//               <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
//               <p className="text-sm text-destructive">{error}</p>
//             </div>
//           )}

//           {/* Name Fields */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
//                 First Name <span className="text-destructive">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                 placeholder="John"
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
//                 Last Name <span className="text-destructive">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                 placeholder="Doe"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
//               Email Address <span className="text-destructive">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//               placeholder="john@example.com"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
//               Phone Number <span className="text-destructive">*</span>
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//               placeholder="+234 801 234 5678"
//             />
//           </div>

//           {/* Course Selection */}
//           <div>
//             <label htmlFor="courseOfStudy" className="block text-sm font-medium text-foreground mb-2">
//               Course of Study <span className="text-destructive">*</span>
//             </label>
//             <select
//               id="courseOfStudy"
//               name="courseOfStudy"
//               value={formData.courseOfStudy}
//               onChange={handleChange}
//               required
//               className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
//             >
//               <option value="">Select a course...</option>
//               <option value="Web Development">Web Development</option>
//               <option value="Mobile Development">Mobile Development</option>
//               <option value="Data Science">Data Science</option>
//               <option value="Cybersecurity">Cybersecurity</option>
//               <option value="Cloud Computing">Cloud Computing</option>
//               <option value="AI/ML">AI & Machine Learning</option>
//             </select>
//           </div>

//           {/* Training Format */}
//           <div>
//             <label htmlFor="trainingFormat" className="block text-sm font-medium text-foreground mb-2">
//               Training Format <span className="text-destructive">*</span>
//             </label>
//             <select
//               id="trainingFormat"
//               name="trainingFormat"
//               value={formData.trainingFormat}
//               onChange={handleChange}
//               required
//               className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
//             >
//               <option value="">Select format...</option>
//               <option value="Virtual">Virtual (Online)</option>
//               <option value="Physical">Physical (In-Person)</option>
//               <option value="Hybrid">Hybrid</option>
//             </select>
//           </div>

//           {/* Additional Details */}
//           <div>
//             <label htmlFor="additionalDetails" className="block text-sm font-medium text-foreground mb-2">
//               Additional Information
//             </label>
//             <textarea
//               id="additionalDetails"
//               name="additionalDetails"
//               value={formData.additionalDetails}
//               onChange={handleChange}
//               rows={4}
//               className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
//               placeholder="Tell us about your experience and goals..."
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 group"
//           >
//             {isLoading ? "Submitting..." : "Complete Registration"}
//             {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
//           </button>

//           {/* Contact Info */}
//           <div className="text-center text-sm text-muted-foreground pt-4">
//             <p>
//               Need help? Contact us at{" "}
//               <a href="mailto:byteteklimited@gmail.com" className="text-primary hover:underline">
//                 byteteklimited@gmail.com
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }




"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Check, AlertCircle } from "lucide-react"
import Image from "next/image"

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://n8n.srv1240013.hstgr.cloud/webhook-test/student-registration"

export default function N8nRegistrationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courseOfStudy: "",
    trainingFormat: "",
    additionalDetails: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
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
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please check the webhook URL and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          {/* Success Animation */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-6 animate-pulse">
              <Check className="w-10 h-10 text-accent" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">Registration Successful!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for registering with byteTek. Check your email for confirmation and next steps.
            </p>

            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
            >
              Register Another
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image src="/bytetek-logo.png" alt="byteTek" width={50} height={50} className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Join byteTek</h1>
          <p className="text-muted-foreground">Start your tech journey with us</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                First Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                Last Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="+234 801 234 5678"
            />
          </div>

          {/* Course Selection */}
          <div>
            <label htmlFor="courseOfStudy" className="block text-sm font-medium text-foreground mb-2">
              Course of Study <span className="text-destructive">*</span>
            </label>
            <select
              id="courseOfStudy"
              name="courseOfStudy"
              value={formData.courseOfStudy}
              onChange={handleChange}
              required
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
            >
              <option value="">Select a course...</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="AI/ML">AI & Machine Learning</option>
            </select>
          </div>

          {/* Training Format */}
          <div>
            <label htmlFor="trainingFormat" className="block text-sm font-medium text-foreground mb-2">
              Training Format <span className="text-destructive">*</span>
            </label>
            <select
              id="trainingFormat"
              name="trainingFormat"
              value={formData.trainingFormat}
              onChange={handleChange}
              required
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
            >
              <option value="">Select format...</option>
              <option value="Virtual">Virtual (Online)</option>
              <option value="Physical">Physical (In-Person)</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Additional Details */}
          <div>
            <label htmlFor="additionalDetails" className="block text-sm font-medium text-foreground mb-2">
              Additional Information
            </label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={4}
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              placeholder="Tell us about your experience and goals..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 group"
          >
            {isLoading ? "Submitting..." : "Complete Registration"}
            {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>

          {/* Contact Info */}
          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>
              Need help? Contact us at{" "}
              <a href="mailto:byteteklimited@gmail.com" className="text-primary hover:underline">
                byteteklimited@gmail.com
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
