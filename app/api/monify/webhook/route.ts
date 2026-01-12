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
    const eventType = data.event_type || data.type
    const transactionStatus = data.data?.status || data.status

    if (eventType === "transaction.successful" || transactionStatus === "success") {
      console.log("[v0] Payment successful webhook:", {
        reference: data.data?.reference || data.reference,
        amount: data.data?.amount || data.amount,
        customer: data.data?.customer || data.customer,
      })

      // TODO: Store payment record in your database
      // TODO: Send enrollment confirmation email to customer
      // TODO: Update enrollment status to active
    } else if (eventType === "transaction.failed" || transactionStatus === "failed") {
      console.log("[v0] Payment failed webhook:", data.data?.reference || data.reference)
      // TODO: Send payment failure notification
    } else if (eventType === "refund.successful" || eventType === "refund.completed") {
      console.log("[v0] Refund processed webhook:", data.data?.reference || data.reference)
      // TODO: Process refund and update enrollment records
    } else if (eventType === "disbursement.successful" || eventType === "disbursement.completed") {
      console.log("[v0] Disbursement webhook:", data.data?.reference || data.reference)
      // TODO: Handle disbursement for payouts if needed
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
