import { useState, type FormEvent } from "react";
import { parseNewsletterSubscription } from "@fincalc/contracts";
import { createPublicApiClient, type SubmissionResult } from "../../shared/api/public-api";

const api=createPublicApiClient(import.meta.env.VITE_API_BASE_URL as string | undefined);

function message(result: SubmissionResult|null) {
  if (!result) return "";
  if (result.status==="accepted") return "Subscription request accepted.";
  if (result.status==="invalid") return "Enter a valid email address.";
  if (result.status==="rate_limited") return "Too many attempts. Please try again later.";
  if (result.status==="unavailable") return "Newsletter delivery is not configured or is temporarily unavailable. You were not subscribed.";
  return "Subscription could not be completed.";
}

export function NewsletterForm() {
  const [email,setEmail]=useState("");
  const [website,setWebsite]=useState("");
  const [result,setResult]=useState<SubmissionResult|null>(null);
  const [sending,setSending]=useState(false);

  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed=parseNewsletterSubscription({email,website});
    if(!parsed.ok){setResult({status:"invalid",fields:parsed.errors});return;}
    setSending(true);
    const next=await api.subscribeNewsletter(parsed.value);
    setSending(false);
    setResult(next);
    if(next.status==="accepted") setEmail("");
  }

  return (
    <section className="newsletter-card" aria-labelledby="newsletter-title">
      <div>
        <span className="eyebrow">FINCALC NOTES</span>
        <h2 id="newsletter-title">Get useful finance updates, not fake signup confirmations.</h2>
        <p>The email is sent only to the configured subscription backend after you submit.</p>
      </div>
      <form onSubmit={submit} noValidate>
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={event=>setEmail(event.target.value)} required />
        <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={event=>setWebsite(event.target.value)} /></label>
        <button type="submit" disabled={sending}>{sending?"Submitting…":"Subscribe"}</button>
      </form>
      <span className={`form-status ${result?.status ?? ""}`} role="status" aria-live="polite">{message(result)}</span>
    </section>
  );
}
