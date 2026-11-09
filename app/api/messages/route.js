export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return Response.json(
        { success: false, error: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    const body = await request.json();
    const message = body?.message;

    if (typeof message !== "string" || !message.trim()) {
      return Response.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return Response.json(
        { success: false, error: "Message must be 2000 characters or fewer" },
        { status: 400 }
      );
    }

    // Demo only: Vercel runtime logs are not permanent storage.
    console.info("DEMO_MESSAGE_RECEIVED", {
      message: message.trim(),
      timestamp: new Date().toISOString()
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
