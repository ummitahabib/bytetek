import { type NextRequest, NextResponse } from "next/server"

interface PaymentInitRequest {
  amount: number
  email: string
  fullName: string
  phone: string
  program: string
  paymentRef: string
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
      console.error("[v0] Monify credentials not configured")
      return NextResponse.json(
        { error: "Payment service not properly configured. Please contact support." },
        { status: 500 },
      )
    }

    const paymentPayload = {
      amount: Math.round(body.amount * 100), // Convert to kobo (NGN smallest unit)
      currency: "NGN",
      merchantId,
      contractCode,
      customer: {
        name: body.fullName,
        email: body.email,
        phone: body.phone,
      },
      description: `ByteTek ${body.program} Enrollment`,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/registration-success`,
      metadata: {
        program: body.program,
        paymentRef: body.paymentRef,
      },
    }

    const response = await fetch(`${baseUrl}/api/v1/transactions/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Merchant-Id": merchantId,
        "X-Contract-Code": contractCode,
      },
      body: JSON.stringify(paymentPayload),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Monify API error:", error)
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: response.status })
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
