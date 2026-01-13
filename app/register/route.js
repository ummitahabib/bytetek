export async function POST(request) {
  const body = await request.json();

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

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
