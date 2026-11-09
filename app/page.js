"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function submitMessage(event) {
    event.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || `Server returned HTTP ${response.status}`);
      }

      setStatus("Message submitted successfully.");
      setMessage("");
    } catch (error) {
      setStatus(`Submission failed: ${error.message}`);
    }
  }

  return (
    <main style={{ maxWidth: 620, margin: "60px auto", padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>Security Testing Demo</h1>
      <p>This demo submits a non-sensitive text message to this site's API.</p>
      <form onSubmit={submitMessage}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={2000}
          required
          rows={6}
          style={{ display: "block", width: "100%", margin: "10px 0 16px", padding: 12 }}
          placeholder="Enter a test message"
        />
        <button type="submit" disabled={!message.trim()} style={{ padding: "10px 18px" }}>
          Submit
        </button>
      </form>
      <p role="status" aria-live="polite">{status}</p>
    </main>
  );
}
