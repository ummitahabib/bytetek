import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await req.json();

    // Forward the request to your n8n webhook
    const response = await fetch(
      "https://n8n.srv1240013.hstgr.cloud/webhook/student-registration",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    // Get the JSON response from n8n
    const data = await response.json();

    // Return the response back to the frontend
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error forwarding to n8n:", error);
    return NextResponse.json(
      { error: "Failed to register. Please try again later." },
      { status: 500 }
    );
  }
}
