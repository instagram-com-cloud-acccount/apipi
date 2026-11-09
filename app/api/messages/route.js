export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return Response.json(
        { success: false, message: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    const body = await request.json();
    const message = body?.message;

    if (typeof message !== "string" || !message.trim()) {
      return Response.json(
        { success: false, message: "A message is required." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return Response.json(
        { success: false, message: "Message must be 2,000 characters or fewer." },
        { status: 400 }
      );
    }

    // Demo endpoint: logs only the message explicitly submitted by the user.
    // Runtime logs are temporary and are not permanent database storage.
    console.info("DEMO_MESSAGE_RECEIVED", {
      message: message.trim(),
      received_at: new Date().toISOString()
    });

    return Response.json({
      success: true,
      message: "Your demo message was received."
    });
  } catch {
    return Response.json(
      { success: false, message: "Invalid JSON request." },
      { status: 400 }
    );
  }
}
