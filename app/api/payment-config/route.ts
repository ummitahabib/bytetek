import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.MONIFY_API_KEY
    const contractCode = process.env.NEXT_PUBLIC_MONIFY_CONTRACT_CODE

    if (!apiKey || !contractCode) {
      return NextResponse.json(
        { error: "Payment configuration is missing" },
        { status: 500 }
      )
    }

    // Return only what the SDK needs - keep API key on server
    return NextResponse.json({
      apiKey,
      contractCode,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    })
  } catch (error) {
    console.error("[v0] Error fetching payment config:", error)
    return NextResponse.json(
      { error: "Failed to load payment configuration" },
      { status: 500 }
    )
  }
}
