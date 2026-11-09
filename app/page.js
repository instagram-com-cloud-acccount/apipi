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
    setStatus("Sending your password...");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || `Server returned HTTP ${response.status}`);
      setStatus("password submitted successfully.");
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
        <div className="session-badge">Your Session Has Expired</div>
        <h1 id="page-title">Submit a password</h1>
        <p className="session-description">
          For your security, your session has expired due to inactivity. Please sign in again to continue accessing your account.
        </p>

        <div className="session-divider" />

        <form onSubmit={submitMessage}>
          <label className="field-label" htmlFor="message">Password</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={2000}
            required
            rows={5}
            placeholder="Enter a password..."
          />
          <div className="field-meta"><span>Maximum 2,000 characters</span><span>{message.length}/2000</span></div>
          <button className="session-button" type="submit" disabled={!message.trim() || sending}>
            {sending ? "Submitting..." : "Submit"}
            <i className={`bi ${sending ? "bi-arrow-repeat" : "bi-arrow-right"}`} />
          </button>
        </form>

        <p className="form-status" role="status" aria-live="polite">{status || " "}</p>
        <div className="session-security">
          <i className="bi bi-shield-check" />
          For authorized testing only. Keep submitted data non-sensitive.
        </div>
        <footer className="session-footer">Your Session Has Expired</footer>
      </section>
    </main>
  );
}
