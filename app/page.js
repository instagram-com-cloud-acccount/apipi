export default function Home() {
  return (
    <main style={{
      minHeight: "100vh", display: "grid", placeItems: "center",
      padding: 24, background: "#f4f6fa",
      fontFamily: "Arial, sans-serif", color: "#1d2939"
    }}>
      <section style={{
        width: "100%", maxWidth: 520, background: "#fff",
        padding: 32, borderRadius: 14,
        boxShadow: "0 12px 40px rgba(16,24,40,.10)"
      }}>
        <p style={{
          display: "inline-block", padding: "6px 10px",
          borderRadius: 5, background: "#eaf2ff", color: "#1849a9",
          fontSize: 12, fontWeight: 700
        }}>SECURITY TESTING DEMO</p>

        <h1 style={{ margin: "16px 0 8px", fontSize: 25 }}>
          Submit a test message
        </h1>
        <p style={{ color: "#667085", lineHeight: 1.6, fontSize: 14 }}>
          This demo sends the text you enter to this site's API endpoint.
          Do not submit passwords, account details, or other sensitive information.
        </p>

        <form id="message-form" style={{ marginTop: 24 }}>
          <label htmlFor="message" style={{
            display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8
          }}>Message</label>
          <textarea id="message" name="message" maxLength={2000} required
            placeholder="Write a non-sensitive test message..."
            style={{
              width: "100%", minHeight: 130, resize: "vertical",
              padding: 12, border: "1px solid #d0d5dd",
              borderRadius: 8, font: "inherit", boxSizing: "border-box"
            }} />
          <p style={{ fontSize: 12, color: "#667085", lineHeight: 1.5 }}>
            By selecting Submit, you agree to send this message to the demo server.
          </p>
          <button type="submit" id="submit-button" style={{
            width: "100%", marginTop: 12, padding: 13, border: 0,
            borderRadius: 8, background: "#16325c", color: "#fff",
            fontWeight: 700, cursor: "pointer"
          }}>Submit message</button>
          <p id="status" role="status" aria-live="polite"
            style={{ marginTop: 14, fontSize: 13 }} />
        </form>
      </section>

      <script dangerouslySetInnerHTML={{__html: `
        document.getElementById("message-form").addEventListener("submit", async (event) => {
          event.preventDefault();
          const field = document.getElementById("message");
          const button = document.getElementById("submit-button");
          const status = document.getElementById("status");
          const message = field.value.trim();
          if (!message) return;

          button.disabled = true;
          button.textContent = "Submitting...";
          status.textContent = "";

          try {
            const response = await fetch("/api/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Request failed");
            status.textContent = result.message;
            status.style.color = "#027a48";
            field.value = "";
          } catch (error) {
            status.textContent = error.message || "Unable to submit message.";
            status.style.color = "#b42318";
          } finally {
            button.disabled = false;
            button.textContent = "Submit message";
          }
        });
      `}} />
    </main>
  );
}
