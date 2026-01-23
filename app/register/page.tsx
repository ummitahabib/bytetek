"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { AlertCircle, Loader2, ArrowRight, Check, Copy, CheckCheck, Tag } from "lucide-react"
import { BYTETEK_PROGRAMS } from "@/lib/programs-data"

type PaymentType = "full" | "installment"

const DISCOUNT_CODES = {
  BT2026: 0.3, // 30% off
  BT2026PLT: 0.5, // 50% off
}

const calculateInstallments = (totalPrice: number, discountPercent: number = 0) => {
  const discountedPrice = Math.floor(totalPrice * (1 - discountPercent))
  const monthlyAmount = Math.floor(discountedPrice / 3)
  const finalAmount = discountedPrice - monthlyAmount * 2

  return {
    monthly: monthlyAmount,
    final: finalAmount,
    total: discountedPrice,
    originalPrice: totalPrice,
    discount: totalPrice - discountedPrice,
    discountPercent: discountPercent * 100,
  }
}

const PROGRAM_START_DATE = new Date(2025, 0, 29) // January 29, 2025

const getInstallmentDates = () => {
  return [
    {
      installment: 1,
      dueDate: new Date(2025, 0, 25),
      label: "Jan 25, 2025 (Before Program Start)",
    },
    {
      installment: 2,
      dueDate: new Date(2025, 1, 25),
      label: "Feb 25, 2025",
    },
    {
      installment: 3,
      dueDate: new Date(2025, 2, 25),
      label: "Mar 25, 2025",
    },
  ]
}

// Bank account details - UPDATE THESE WITH YOUR ACTUAL DETAILS
const BANK_DETAILS = {
  bankName: "Monie Point",
  accountName: "ByteTek Limited",
  accountNumber: "7064686613",
}

export default function RegisterPage() {
  const [step, setStep] = useState<"form" | "payment-type" | "payment">("form")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courseOfStudy: "",
    trainingFormat: "",
    additionalDetails: "",
  })

  const [paymentType, setPaymentType] = useState<PaymentType>("full")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [courseDetails, setCourseDetails] = useState<any>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  
  // Discount code states
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [discountError, setDiscountError] = useState("")
  const [isDiscountApplied, setIsDiscountApplied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "courseOfStudy") {
      const selected = BYTETEK_PROGRAMS.flatMap((program) => program.courses).find((c) => c.id === value)
      setCourseDetails(selected)
      // Reset discount when course changes
      setDiscountCode("")
      setAppliedDiscount(0)
      setIsDiscountApplied(false)
      setDiscountError("")
    }
  }

  const handleApplyDiscount = () => {
    setDiscountError("")
    
    const code = discountCode.trim().toUpperCase()
    
    if (!code) {
      setDiscountError("Please enter a discount code")
      return
    }

    if (code in DISCOUNT_CODES) {
      setAppliedDiscount(DISCOUNT_CODES[code as keyof typeof DISCOUNT_CODES])
      setIsDiscountApplied(true)
      setDiscountError("")
    } else {
      setDiscountError("Invalid discount code")
      setAppliedDiscount(0)
      setIsDiscountApplied(false)
    }
  }

  const handleRemoveDiscount = () => {
    setDiscountCode("")
    setAppliedDiscount(0)
    setIsDiscountApplied(false)
    setDiscountError("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    // Validate all required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.courseOfStudy ||
      !formData.trainingFormat
    ) {
      setError("Please fill in all required fields")
      return
    }

    // Move to payment type selection
    setStep("payment-type")
  }

  const handlePaymentTypeSelect = (type: PaymentType) => {
    setPaymentType(type)
    setStep("payment")
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    })
  }

  const handlePaymentConfirmation = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Submit form data to n8n webhook
      const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

      if (n8nWebhookUrl) {
        const installments = calculateInstallments(courseDetails.price, appliedDiscount)
        const paymentAmount = paymentType === "full" ? installments.total : installments.monthly

        await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            courseOfStudy: courseDetails.name,
            trainingFormat: formData.trainingFormat,
            additionalDetails: formData.additionalDetails,
            paymentStatus: "PENDING_VERIFICATION",
            paymentMethod: "Bank Transfer",
            amount: paymentAmount,
            totalAmount: installments.total,
            originalPrice: courseDetails.price,
            discountCode: isDiscountApplied ? discountCode.toUpperCase() : null,
            discountPercent: installments.discountPercent,
            discountAmount: installments.discount,
            paymentType: paymentType,
            timestamp: new Date().toISOString(),
          }),
        })
      }

      setPaymentConfirmed(true)
      setIsSubmitted(true)
    } catch (err) {
      console.error("[v0] Error submitting form:", err)
      setError("Failed to submit registration. Please try again or contact support.")
    } finally {
      setIsLoading(false)
    }
  }

  // Success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-6 animate-pulse">
              <Check className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Registration Submitted!</h1>
            <p className="text-muted-foreground mb-4">
              Thank you for registering with byteTek. We've received your details.
            </p>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6 text-left w-full">
              <p className="text-sm text-foreground font-medium mb-2">Next Steps:</p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Complete your bank transfer using the details provided</li>
                <li>Keep your payment receipt/transaction reference</li>
                <li>We'll verify your payment within 24 hours</li>
                <li>You'll receive a confirmation email with next steps</li>
              </ol>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              For any questions, contact us at{" "}
              <a href="mailto:byteteklimited@gmail.com" className="text-primary hover:underline">
                byteteklimited@gmail.com
              </a>
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setPaymentConfirmed(false)
                setStep("form")
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  courseOfStudy: "",
                  trainingFormat: "",
                  additionalDetails: "",
                })
                setDiscountCode("")
                setAppliedDiscount(0)
                setIsDiscountApplied(false)
                setDiscountError("")
              }}
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Register Another
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Payment details screen
  if (step === "payment" && courseDetails) {
    const installments = calculateInstallments(courseDetails.price, appliedDiscount)
    const paymentAmount = paymentType === "full" ? installments.total : installments.monthly

    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20 pb-10">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image src="/bytetek-logo.svg" alt="byteTek" width={50} height={50} className="h-12 w-auto" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Payment</h1>
            <p className="text-muted-foreground">Transfer to the account below to complete registration</p>
          </div>

          {/* Payment Amount */}
          <div className="bg-primary/5 border-2 border-primary rounded-lg p-6 mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Amount to Pay</p>
            <p className="text-4xl font-bold text-foreground mb-2">₦{paymentAmount.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">
              {paymentType === "full" ? "Full Payment" : "First Installment (1/3)"}
            </p>
            
            {/* Show discount applied */}
            {isDiscountApplied && installments.discount > 0 && (
              <div className="mt-4 pt-4 border-t border-primary/20">
                <div className="flex items-center justify-center gap-2 text-accent mb-2">
                  <Tag className="w-4 h-4" />
                  <span className="text-sm font-semibold">Discount Applied: {installments.discountPercent}% OFF</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="line-through">₦{installments.originalPrice.toLocaleString()}</span>
                  <span className="mx-2">→</span>
                  <span className="text-accent font-semibold">₦{installments.total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  You save ₦{installments.discount.toLocaleString()}!
                </p>
              </div>
            )}
          </div>

          {/* Bank Account Details */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Bank Transfer Details</h2>

            <div className="space-y-4">
              {/* Bank Name */}
              <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Bank Name</p>
                  <p className="text-lg font-semibold text-foreground">{BANK_DETAILS.bankName}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(BANK_DETAILS.bankName, "bank")}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                  title="Copy bank name"
                >
                  {copiedField === "bank" ? (
                    <CheckCheck className="w-5 h-5 text-accent" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Account Name */}
              <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Account Name</p>
                  <p className="text-lg font-semibold text-foreground">{BANK_DETAILS.accountName}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(BANK_DETAILS.accountName, "name")}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                  title="Copy account name"
                >
                  {copiedField === "name" ? (
                    <CheckCheck className="w-5 h-5 text-accent" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                  <p className="text-2xl font-bold text-foreground tracking-wider">{BANK_DETAILS.accountNumber}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(BANK_DETAILS.accountNumber, "number")}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                  title="Copy account number"
                >
                  {copiedField === "number" ? (
                    <CheckCheck className="w-5 h-5 text-accent" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Important Instructions */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-2">Important Instructions:</p>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>Transfer exactly ₦{paymentAmount.toLocaleString()} to the account above</li>
                <li>Use "{formData.firstName} {formData.lastName} - {courseDetails.name}" as the transfer description</li>
                <li>Keep your transaction receipt or reference number</li>
                <li>Payment verification takes up to 24 hours</li>
                <li>Program starts January 29, 2025 - complete payment before this date</li>
              </ul>
            </div>
          </div>

          {/* Registration Summary */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Registration Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="text-foreground font-medium">
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Course:</span>
                <span className="text-foreground font-medium">{courseDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format:</span>
                <span className="text-foreground font-medium">{formData.trainingFormat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Plan:</span>
                <span className="text-foreground font-medium">
                  {paymentType === "full" ? "Full Payment" : "3-Month Installment"}
                </span>
              </div>
              {isDiscountApplied && (
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">Discount Code:</span>
                  <span className="text-accent font-semibold">{discountCode.toUpperCase()} ({installments.discountPercent}% OFF)</span>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-destructive mb-1">Submission Error</p>
                <p className="text-destructive/90">{error}</p>
              </div>
            </div>
          )}

          <button
            onClick={handlePaymentConfirmation}
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                I've Made the Transfer
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            onClick={() => setStep("payment-type")}
            className="w-full mt-3 bg-card border border-border text-foreground py-3 px-6 rounded-lg font-semibold hover:bg-accent/5 transition-colors"
          >
            Change Payment Plan
          </button>

          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>
              Need help? Contact us at{" "}
              <a href="mailto:byteteklimited@gmail.com" className="text-primary hover:underline">
                byteteklimited@gmail.com
              </a>
              {" "}or{" "}
              <a href="tel:+2347064686613" className="text-primary hover:underline">
                +234 706 468 6613
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Payment type selection step
  if (step === "payment-type" && courseDetails) {
    const installments = calculateInstallments(courseDetails.price, appliedDiscount)
    const installmentDates = getInstallmentDates()

    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20 pb-10">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image src="/bytetek-logo.svg" alt="byteTek" width={50} height={50} className="h-12 w-auto" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Choose Payment Plan</h1>
            <p className="text-muted-foreground">Select how you'd like to pay for your course</p>
          </div>

          {/* Discount Code Section */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Have a Discount Code?</h2>
            </div>
            
            {!isDiscountApplied ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  placeholder="Enter discount code"
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all uppercase"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
            ) : (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {discountCode} - {installments.discountPercent}% OFF Applied!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You're saving ₦{installments.discount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveDiscount}
                  className="text-sm text-destructive hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
            
            {discountError && (
              <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {discountError}
              </p>
            )}
          </div>

          {/* Price Summary */}
          {isDiscountApplied && installments.discount > 0 && (
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Original Price:</span>
                <span className="text-foreground line-through">₦{installments.originalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Discount ({installments.discountPercent}%):</span>
                <span className="text-accent font-semibold">-₦{installments.discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="font-semibold text-foreground">New Price:</span>
                <span className="text-xl font-bold text-accent">₦{installments.total.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Full Payment Option */}
            <button
              onClick={() => setPaymentType("full")}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                paymentType === "full" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Full Payment</h3>
                  <p className="text-sm text-muted-foreground mt-1">Pay in one installment</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentType === "full" ? "border-primary bg-primary" : "border-border"
                  }`}
                >
                  {paymentType === "full" && <div className="w-2 h-2 bg-primary-foreground rounded-full" />}
                </div>
              </div>
              <div className="bg-accent/5 rounded p-3 mb-4">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                {isDiscountApplied && installments.discount > 0 && (
                  <p className="text-sm text-muted-foreground line-through">
                    ₦{installments.originalPrice.toLocaleString()}
                  </p>
                )}
                <p className="text-2xl font-bold text-foreground">₦{installments.total.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">Due before Jan 29, 2025</p>
              </div>
            </button>

            {/* Installment Payment Option */}
            <button
              onClick={() => setPaymentType("installment")}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                paymentType === "installment"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">3-Month Plan</h3>
                  <p className="text-sm text-muted-foreground mt-1">Pay monthly installments</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentType === "installment" ? "border-primary bg-primary" : "border-border"
                  }`}
                >
                  {paymentType === "installment" && <div className="w-2 h-2 bg-primary-foreground rounded-full" />}
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-accent/5 rounded p-2">
                  <p className="text-xs text-muted-foreground">Month 1 & 2</p>
                  <p className="font-bold text-foreground">₦{installments.monthly.toLocaleString()} each</p>
                </div>
                <div className="bg-accent/5 rounded p-2">
                  <p className="text-xs text-muted-foreground">Month 3</p>
                  <p className="font-bold text-foreground">₦{installments.final.toLocaleString()}</p>
                </div>
              </div>
            </button>
          </div>

          {/* Payment Schedule Display */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Payment Schedule</h2>
            <div className="space-y-3">
              {paymentType === "full" ? (
                <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Full Payment</p>
                    <p className="text-xs text-muted-foreground mt-1">Due before Jan 29, 2025</p>
                  </div>
                  <p className="text-xl font-bold text-foreground">₦{installments.total.toLocaleString()}</p>
                </div>
              ) : (
                installmentDates.map((date, idx) => {
                  const amount = idx === 2 ? installments.final : installments.monthly
                  return (
                    <div key={idx} className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground">Installment {idx + 1}</p>
                        <p className="text-xs text-muted-foreground mt-1">{date.label}</p>
                      </div>
                      <p className="text-lg font-bold text-foreground">₦{amount.toLocaleString()}</p>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-8 flex gap-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Program Starts January 29, 2025</p>
              <p className="text-muted-foreground">
                You must complete your first payment before this date to be accepted into the program.
              </p>
            </div>
          </div>

          <button
            onClick={() => handlePaymentTypeSelect(paymentType)}
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            Continue to Payment Details
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setStep("form")}
            className="w-full mt-3 bg-card border border-border text-foreground py-3 px-6 rounded-lg font-semibold hover:bg-accent/5 transition-colors"
          >
            Back to Form
          </button>
        </div>
      </div>
    )
  }

  // Form step
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image src="/bytetek-logo.svg" alt="byteTek" width={50} height={50} className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Join byteTek</h1>
          <p className="text-muted-foreground">Start your tech journey with us</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

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
              {BYTETEK_PROGRAMS.map((program) =>
                program.courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name} - ₦{course.price.toLocaleString()}
                  </option>
                )),
              )}
            </select>
          </div>

          {courseDetails && (
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Selected course fee:</p>
              <p className="text-lg font-bold text-foreground">₦{courseDetails.price.toLocaleString()}</p>
            </div>
          )}

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
              <option value="Physical">Physical (In-Person) - Kaduna</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label htmlFor="additionalDetails" className="block text-sm font-medium text-foreground mb-2">
              Additional Information
            </label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={3}
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
              placeholder="Tell us about your experience and goals..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Continue to Payment
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

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