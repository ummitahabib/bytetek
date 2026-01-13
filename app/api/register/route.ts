// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the incoming request body
//     const body = await req.json();

//     // Forward the request to your n8n webhook
//     const response = await fetch(
//       "https://n8n.srv1240013.hstgr.cloud/webhook/student-registration",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     // Get the JSON response from n8n
//     const data = await response.json();

//     // Return the response back to the frontend
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error("Error forwarding to n8n:", error);
//     return NextResponse.json(
//       { error: "Failed to register. Please try again later." },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward to n8n webhook
    const response = await fetch(
  "https://n8n.srv1240013.hstgr.cloud/webhook/student-registration",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    // Log the response to make sure n8n received it
    console.log("n8n webhook response:", data);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Error sending to n8n:", err);
    return NextResponse.json(
      { error: "Failed to register. Please try again." },
      { status: 500 }
    );
  }
}
