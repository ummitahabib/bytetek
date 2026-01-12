"use client"

import { useState } from "react"
import { useRegistration } from "@/lib/registration-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { ChevronLeft, Lock, ShieldCheck, CreditCard, Tag, Check, AlertCircle, Loader2 } from "lucide-react"

const validPromoCodes: Record<string, number> = {
  EARLYBIRD: 15,
  STUDENT10: 10,
  BYTETECH20: 20,
  REFERRAL15: 15,
}

export function StepReviewPayment() {
  const { data, updateData, setCurrentStep, selectedProgram, setIsOpen, resetData } = useRegistration()
  const [promoInput, setPromoInput] = useState("")
  const [promoError, setPromoError] = useState("")
  const [promoSuccess, setPromoSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState("")

  const basePrice = selectedProgram?.price || 0
  const discount = data.discountApplied
  const discountAmount = (basePrice * discount) / 100
  const installmentFee = data.paymentPlan === "installment" ? basePrice * 0.05 : 0
  const finalPrice = basePrice - discountAmount + installmentFee

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(price)
  }

  const applyPromoCode = () => {
    const code = promoInput.toUpperCase().trim()
    if (validPromoCodes[code]) {
      updateData({ promoCode: code, discountApplied: validPromoCodes[code] })
      setPromoSuccess(true)
      setPromoError("")
    } else {
      setPromoError("Invalid promo code")
      setPromoSuccess(false)
    }
  }

  const handlePayWithOpay = async () => {
    if (!data.agreedToTerms) {
      setPaymentError("Please agree to the terms and conditions")
      return
    }

    setIsProcessing(true)
    setPaymentError("")

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const paymentRef = `BT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`

    // Store payment data in sessionStorage for success page
    sessionStorage.setItem(
      "bytetek_payment",
      JSON.stringify({
        ...data,
        program: selectedProgram,
        finalAmount: finalPrice,
        paymentRef,
        paymentDate: new Date().toISOString(),
        transactionId: `TXN${Date.now()}`,
      }),
    )

    setIsProcessing(false)
    setIsOpen(false)
    resetData()

    // Navigate to success page
    window.location.href = "/registration-success"
  }

  const handlePayWithMonify = async () => {
    if (!data.agreedToTerms) {
      setPaymentError("Please agree to the terms and conditions")
      return
    }

    setIsProcessing(true)
    setPaymentError("")

    try {
      const paymentRef = `BT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`

      const response = await fetch("/api/monify/initialize-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalPrice,
          email: data.email,
          fullName: data.fullName,
          phone: data.phone,
          program: selectedProgram?.name,
          paymentRef,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        setPaymentError(error.error || "Failed to initialize payment")
        setIsProcessing(false)
        return
      }

      const paymentData = await response.json()

      sessionStorage.setItem(
        "bytetek_payment",
        JSON.stringify({
          ...data,
          program: selectedProgram,
          finalAmount: finalPrice,
          paymentRef,
          paymentDate: new Date().toISOString(),
          reference: paymentData.reference,
        }),
      )

      setIsProcessing(false)
      setIsOpen(false)
      resetData()

      if (paymentData.authorizationUrl) {
        window.location.href = paymentData.authorizationUrl
      } else {
        setPaymentError("Payment gateway URL not available")
      }
    } catch (error) {
      console.error("[v0] Payment error:", error)
      setPaymentError("An error occurred while processing your payment")
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Order Summary */}
      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Order Summary
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Program</span>
            <span className="font-medium text-right max-w-48 truncate">{selectedProgram?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span>{selectedProgram?.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Format</span>
            <span className="capitalize">{data.trainingFormat}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Start Date</span>
            <span>
              {data.preferredStartDate &&
                new Date(data.preferredStartDate).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
            </span>
          </div>

          <div className="border-t border-border my-3" />

          <div className="flex justify-between">
            <span className="text-muted-foreground">Course Fee</span>
            <span>{formatPrice(basePrice)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-primary">
              <span>Discount ({discount}%)</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          )}

          {data.paymentPlan === "installment" && (
            <div className="flex justify-between text-muted-foreground">
              <span>Installment Fee (5%)</span>
              <span>+{formatPrice(installmentFee)}</span>
            </div>
          )}

          <div className="border-t border-border my-3" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">{formatPrice(finalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Payment Plan Toggle */}
      <div className="space-y-3">
        <Label>Payment Plan</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateData({ paymentPlan: "full" })}
            className={cn(
              "p-4 rounded-lg border text-left transition-all",
              data.paymentPlan === "full"
                ? "border-primary bg-primary/10"
                : "border-border bg-secondary/30 hover:border-primary/50",
            )}
          >
            <div className="font-semibold">Pay in Full</div>
            <div className="text-sm text-muted-foreground">One-time payment</div>
          </button>
          <button
            onClick={() => updateData({ paymentPlan: "installment" })}
            className={cn(
              "p-4 rounded-lg border text-left transition-all",
              data.paymentPlan === "installment"
                ? "border-primary bg-primary/10"
                : "border-border bg-secondary/30 hover:border-primary/50",
            )}
          >
            <div className="font-semibold">3 Installments</div>
            <div className="text-sm text-muted-foreground">+5% processing fee</div>
          </button>
        </div>
      </div>

      {/* Promo Code */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Promo Code
        </Label>
        <div className="flex gap-2">
          <Input
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Enter code"
            className="bg-secondary/50 border-border"
            disabled={promoSuccess}
          />
          <Button
            variant="outline"
            onClick={applyPromoCode}
            disabled={!promoInput || promoSuccess}
            className="bg-transparent"
          >
            {promoSuccess ? <Check className="w-4 h-4" /> : "Apply"}
          </Button>
        </div>
        {promoError && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {promoError}
          </p>
        )}
        {promoSuccess && (
          <p className="text-sm text-primary flex items-center gap-1">
            <Check className="w-3 h-3" />
            {data.discountApplied}% discount applied!
          </p>
        )}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={data.agreedToTerms}
          onCheckedChange={(checked) => updateData({ agreedToTerms: checked as boolean })}
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
          I agree to the Terms of Service and Privacy Policy. I understand that my enrollment is subject to the
          cancellation and refund policy.
        </Label>
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center gap-6 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure Payment</span>
        </div>
      </div>

      {/* Payment Error */}
      {paymentError && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {paymentError}
        </div>
      )}

      {/* Opay Payment Button */}
      <Button
        onClick={handlePayWithOpay}
        disabled={isProcessing}
        className={cn(
          "w-full h-14 text-lg font-semibold transition-all",
          "bg-[#04AA6D] hover:bg-[#039960] text-white",
          isProcessing && "opacity-80",
        )}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="mr-2 w-5 h-5" />
            Pay {formatPrice(finalPrice)} with Opay
          </>
        )}
      </Button>

      {/* Monify Payment Button */}
      <Button
        onClick={handlePayWithMonify}
        disabled={isProcessing}
        className={cn(
          "w-full h-14 text-lg font-semibold transition-all",
          "bg-black hover:bg-gray-800 text-white border border-gray-700",
          isProcessing && "opacity-80",
        )}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="mr-2 w-5 h-5" />
            Pay {formatPrice(finalPrice)} with Monify
          </>
        )}
      </Button>

      {/* Payment Methods */}
      <div className="flex items-center justify-center gap-4 text-muted-foreground">
        <span className="text-xs">Secured by:</span>
        <div className="text-xs">Monify by Monypoint</div>
      </div>

      {/* Back Button */}
      <Button variant="ghost" onClick={() => setCurrentStep(3)} className="w-full">
        <ChevronLeft className="mr-2 w-4 h-4" />
        Back to Background
      </Button>
    </div>
  )
}
