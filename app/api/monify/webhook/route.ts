import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-monify-signature") || request.headers.get("x-signature")
    const body = await request.text()

    const webhookSecret = process.env.MONIFY_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error("[v0] Webhook secret not configured")
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 })
    }

    const hash = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex")

    if (signature !== hash) {
      console.error("[v0] Invalid webhook signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const data = JSON.parse(body)
    const eventType = data.event || data.event_type || data.type
    const transactionData = data.data || data

    if (eventType === "transaction.completed" || eventType === "transaction.successful") {
      console.log("[v0] Transaction completed webhook:", {
        reference: transactionData.reference || transactionData.transactionReference,
        amount: transactionData.amount,
        status: transactionData.status,
      })
      // TODO: Store payment record in database
      // TODO: Send enrollment confirmation email
      // TODO: Update enrollment status to active
    } else if (eventType === "transaction.failed") {
      console.log("[v0] Transaction failed webhook:", transactionData.reference || transactionData.transactionReference)
      // TODO: Send payment failure notification
    } else if (eventType === "refund.completed" || eventType === "refund.successful") {
      console.log("[v0] Refund completed webhook:", transactionData.reference || transactionData.transactionReference)
      // TODO: Process refund and update enrollment records
    } else if (eventType === "disbursement.completed" || eventType === "disbursement.successful") {
      console.log(
        "[v0] Disbursement completed webhook:",
        transactionData.reference || transactionData.transactionReference,
      )
      // TODO: Handle disbursement for settlements
    } else if (eventType === "settlement.completed") {
      console.log("[v0] Settlement completed webhook:", transactionData)
      // TODO: Record settlement transaction
    } else if (eventType === "mandate.created" || eventType === "mandate.updated") {
      console.log("[v0] Mandate webhook:", transactionData)
      // TODO: Track mandate for recurring payments
    } else if (eventType === "wallet.activity") {
      console.log("[v0] Wallet activity webhook:", transactionData)
      // TODO: Log wallet activities
    } else if (eventType === "wallet.lowBalance") {
      console.log("[v0] Low balance notification:", transactionData)
      // TODO: Alert on low wallet balance
    } else {
      console.log("[v0] Unknown webhook event:", eventType, transactionData)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
