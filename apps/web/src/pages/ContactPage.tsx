import { useState, type FormEvent } from "react";
import { parseContactRequest } from "@fincalc/contracts";
import { createPublicApiClient, type SubmissionResult } from "../shared/api/public-api";

const api = createPublicApiClient(import.meta.env.VITE_API_BASE_URL as string | undefined);

function statusText(result: SubmissionResult | null): string {
  if (!result) return "";
  if (result.status === "accepted") return "Message accepted for delivery. Thank you.";
  if (result.status === "invalid") return "Please check the highlighted form details and try again.";
  if (result.status === "rate_limited") return `Too many attempts. Try again in about ${result.retryAfterSeconds || 60} seconds.`;
  if (result.status === "unavailable") return "Delivery is not configured or temporarily unavailable. Your message was not sent.";
  return "The message could not be sent. Your message was not stored locally.";
}

export function ContactPage() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");
  const [company,setCompany]=useState("");
  const [result,setResult]=useState<SubmissionResult|null>(null);
  const [sending,setSending]=useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed=parseContactRequest({name,email,message,company});
    if (!parsed.ok) {
      setResult({status:"invalid",fields:parsed.errors});
      return;
    }
    setSending(true);
    const next=await api.submitContact(parsed.value);
    setSending(false);
    setResult(next);
    if (next.status==="accepted") setMessage("");
  }

  return (
    <div className="contact-page">
      <section className="calc-intro">
        <span className="eyebrow">CONTACT & SUPPORT</span>
        <h1>Send a message that actually gets delivered.</h1>
        <p>V7 does not save your message in browser storage and pretend it was sent. Success appears only after the configured server delivery adapter accepts the request.</p>
      </section>

      <section className="contact-layout">
        <form className="contact-form" onSubmit={submit} noValidate>
          <label>Name
            <input autoComplete="name" value={name} onChange={event=>setName(event.target.value)} minLength={2} maxLength={80} required />
          </label>
          <label>Email
            <input type="email" autoComplete="email" value={email} onChange={event=>setEmail(event.target.value)} maxLength={254} required />
          </label>
          <label>Message
            <textarea value={message} onChange={event=>setMessage(event.target.value)} minLength={10} maxLength={5000} rows={8} required />
          </label>
          <label className="honeypot" aria-hidden="true">Company
            <input tabIndex={-1} autoComplete="off" value={company} onChange={event=>setCompany(event.target.value)} />
          </label>
          <button className="primary-button" type="submit" disabled={sending}>{sending ? "Sending…" : "Send message"}</button>
          <p className={`form-status ${result?.status ?? ""}`} role="status" aria-live="polite">{statusText(result)}</p>
        </form>

        <aside className="contact-trust-card">
          <span className="eyebrow">PRIVACY FIRST</span>
          <h2>What happens to this message?</h2>
          <ul>
            <li>Validation happens before network delivery.</li>
            <li>The API has request-size, origin and rate-limit controls.</li>
            <li>Raw message text is not sent to analytics.</li>
            <li>No browser localStorage copy is created.</li>
            <li>If delivery is unavailable, FinCalc says so instead of showing fake success.</li>
          </ul>
        </aside>
      </section>
    </div>
  );
}
