"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submitMessage(event) {
    event.preventDefault();
    if (!message.trim() || sending) return;
    setSending(true);
    setStatus("Sending your test message...");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || `Server returned HTTP ${response.status}`);
      setStatus("Message submitted successfully.");
      setMessage("");
    } catch (error) {
      setStatus(`Submission failed: ${error.message}`);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="session-wrapper" aria-hidden="false">
      <section className="session-card" role="dialog" aria-modal="true" aria-labelledby="page-title" tabIndex={-1}>
        <div className="session-icon" aria-hidden="true"><i className="bi bi-shield-lock-fill" /></div>
        <div className="session-badge">SECURITY TESTING DEMO</div>
        <h1 id="page-title">Submit a Test Message</h1>
        <p className="session-description">
          Use this demo to submit a non-sensitive text message to the application API.
          Do not enter passwords, personal information, or other confidential data.
        </p>

        <div className="session-divider" />

        <form onSubmit={submitMessage}>
          <label className="field-label" htmlFor="message">Your message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={2000}
            required
            rows={5}
            placeholder="Enter a test message..."
          />
          <div className="field-meta"><span>Maximum 2,000 characters</span><span>{message.length}/2000</span></div>
          <button className="session-button" type="submit" disabled={!message.trim() || sending}>
            {sending ? "Submitting..." : "Submit Message"}
            <i className={`bi ${sending ? "bi-arrow-repeat" : "bi-arrow-right"}`} />
          </button>
        </form>

        <p className="form-status" role="status" aria-live="polite">{status || " "}</p>
        <div className="session-security">
          <i className="bi bi-shield-check" />
          For authorized testing only. Keep submitted data non-sensitive.
        </div>
        <footer className="session-footer">Security Testing Demo</footer>
      </section>
    </main>
  );
}
