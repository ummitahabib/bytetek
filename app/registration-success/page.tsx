"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Download, Mail, Home, Calendar, Clock, User, Receipt, Share2, Sparkles } from "lucide-react"
import Link from "next/link"

type PaymentData = {
  fullName: string
  email: string
  program: {
    name: string
    duration: string
    price: number
  }
  preferredStartDate: string
  trainingFormat: string
  finalAmount: number
  paymentRef: string
  transactionId: string
  paymentDate: string
}

export default function RegistrationSuccessPage() {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem("bytetek_payment")
    if (stored) {
      setPaymentData(JSON.parse(stored))
    }

    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

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

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Payment Found</h1>
          <p className="text-muted-foreground mb-6">It looks like you haven&apos;t completed a registration yet.</p>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground">
              <Home className="mr-2 w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Success Particles */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              <Sparkles
                className="text-primary"
                style={{
                  width: `${10 + Math.random() * 20}px`,
                  height: `${10 + Math.random() * 20}px`,
                  opacity: 0.6 + Math.random() * 0.4,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Binary Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="font-mono text-xs text-primary whitespace-nowrap">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i}>
              {Array.from({ length: 200 })
                .map(() => Math.round(Math.random()))
                .join("")}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-in zoom-in duration-500">
                  <Check className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
              {/* Byte particles forming checkmark */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
                    style={{
                      left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                      top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500 text-balance">
              <span className="text-primary">Congratulations,</span> {paymentData.fullName.split(" ")[0]}!
            </h1>
            <p className="text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              Your enrollment is confirmed. Welcome to the byteTek family!
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                Payment Receipt
              </h2>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">Paid</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Transaction ID</span>
                  <p className="font-mono font-medium">{paymentData.transactionId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Payment Reference</span>
                  <p className="font-mono font-medium">{paymentData.paymentRef}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Student Name
                  </span>
                  <span className="font-medium">{paymentData.fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </span>
                  <span className="font-medium">{paymentData.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Program</span>
                  <span className="font-medium text-right max-w-48">{paymentData.program.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration
                  </span>
                  <span className="font-medium">{paymentData.program.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-medium capitalize">{paymentData.trainingFormat}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </span>
                  <span className="font-medium">{formatDate(paymentData.preferredStartDate)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Payment Date</span>
                  <span>{formatDateTime(paymentData.paymentDate)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Amount Paid</span>
                  <span className="text-primary">{formatPrice(paymentData.finalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <Button variant="outline" className="h-12 bg-transparent">
              <Download className="mr-2 w-4 h-4" />
              Download Receipt
            </Button>
            <Button variant="outline" className="h-12 bg-transparent">
              <Mail className="mr-2 w-4 h-4" />
              Email Receipt
            </Button>
          </div>

          {/* Next Steps */}
          <div className="bg-card/50 border border-border rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
            <h3 className="text-lg font-semibold mb-4">What&apos;s Next?</h3>
            <ul className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Check Your Email",
                  description: "We've sent a confirmation email with your login credentials and course materials.",
                },
                {
                  icon: User,
                  title: "Access Student Portal",
                  description: "Log in to your student portal to view your schedule and prepare for the course.",
                },
                {
                  icon: Calendar,
                  title: "Mark Your Calendar",
                  description: `Your program starts on ${formatDate(paymentData.preferredStartDate)}. Be ready!`,
                },
              ].map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Share & Return */}
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share2 className="mr-2 w-4 h-4" />
              Share Your Achievement
            </Button>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Home className="mr-2 w-4 h-4" />
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
