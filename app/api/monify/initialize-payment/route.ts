import { type NextRequest, NextResponse } from "next/server"

interface PaymentInitRequest {
  amount: number
  email: string
  fullName: string
  phone: string
  program: string
  paymentRef: string
  paymentType: "full" | "installment"
  totalAmount: number
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentInitRequest = await request.json()

    if (!body.amount || !body.email || !body.fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const merchantId = process.env.NEXT_PUBLIC_MONIFY_MERCHANT_ID
    const contractCode = process.env.NEXT_PUBLIC_MONIFY_CONTRACT_CODE
    const apiKey = process.env.MONIFY_API_KEY
    const baseUrl = process.env.MONIFY_API_BASE_URL

    if (!merchantId || !apiKey || !baseUrl || !contractCode) {
      console.error("[v0] Monify credentials not configured:", {
        hasMerchantId: !!merchantId,
        hasApiKey: !!apiKey,
        hasBaseUrl: !!baseUrl,
        hasContractCode: !!contractCode,
      })
      return NextResponse.json(
        { error: "Payment service configuration incomplete. Please check environment variables." },
        { status: 500 },
      )
    }

    if (
      merchantId === "YOUR_WALLET_ACCOUNT_NUMBER_HERE" ||
      apiKey === "YOUR_API_KEY_HERE" ||
      baseUrl === "YOUR_BASE_URL_HERE" ||
      contractCode === "YOUR_CONTRACT_CODE_HERE"
    ) {
      return NextResponse.json(
        {
          error: "Payment credentials not configured. Please update .env.local with your actual Monify credentials.",
        },
        { status: 500 },
      )
    }

    const paymentDescription =
      body.paymentType === "installment"
        ? `ByteTek ${body.program} - Installment 1 of 3`
        : `ByteTek ${body.program} - Full Payment`

    const paymentPayload = {
      amount: Math.round(body.amount * 100), // Convert to kobo (NGN smallest unit)
      currency: "NGN",
      walletAccountNumber: merchantId,
      contractCode,
      customer: {
        name: body.fullName,
        email: body.email,
        phoneNumber: body.phone,
      },
      description: paymentDescription,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/monify/webhook`,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/registration-success`,
      metadata: {
        program: body.program,
        paymentRef: body.paymentRef,
        paymentType: body.paymentType,
        currentAmount: body.amount,
        totalAmount: body.totalAmount,
        installmentNumber: body.paymentType === "installment" ? 1 : 0,
      },
    }

    console.log("[v0] Initializing Monify payment with payload:", paymentPayload)

    const response = await fetch(`${baseUrl}/api/v1/transactions/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify(paymentPayload),
    })

    const contentType = response.headers.get("content-type")
    if (!response.ok) {
      let errorMessage = "Failed to initialize payment"

      if (contentType?.includes("application/json")) {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } else {
        const errorText = await response.text()
        console.error("[v0] Monify returned non-JSON error:", {
          status: response.status,
          statusText: response.statusText,
          preview: errorText.substring(0, 200),
        })
        errorMessage = `API Error: ${response.status} ${response.statusText}`
      }

      return NextResponse.json({ error: errorMessage }, { status: response.status })
    }

    if (!contentType?.includes("application/json")) {
      console.error("[v0] Monify returned non-JSON response:", contentType)
      return NextResponse.json({ error: "Invalid response from payment service" }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      authorizationUrl: data.data?.authorization_url || data.authorization_url,
      accessCode: data.data?.access_code || data.access_code,
      reference: data.data?.reference || data.reference,
    })
  } catch (error) {
    console.error("[v0] Payment initialization error:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}
