import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json({ error: "Missing payment reference" }, { status: 400 })
    }

    const merchantId = process.env.NEXT_PUBLIC_MONIFY_MERCHANT_ID
    const contractCode = process.env.NEXT_PUBLIC_MONIFY_CONTRACT_CODE
    const apiKey = process.env.MONIFY_API_KEY
    const baseUrl = process.env.MONIFY_API_BASE_URL

    if (!merchantId || !apiKey || !baseUrl || !contractCode) {
      return NextResponse.json({ error: "Payment service not configured" }, { status: 500 })
    }

    const response = await fetch(`${baseUrl}/api/v1/transactions/verify/${reference}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
      },
    })

    if (!response.ok) {
      console.error("[v0] Monify verification failed")
      return NextResponse.json({ error: "Failed to verify payment" }, { status: response.status })
    }

    const data = await response.json()

    const isSuccessful =
      data.data?.status === "success" || data.status === "success" || data.data?.status === "completed"

    return NextResponse.json({
      success: isSuccessful,
      data: data.data || data,
      message: isSuccessful ? "Payment verified successfully" : "Payment not yet completed",
    })
  } catch (error) {
    console.error("[v0] Payment verification error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
