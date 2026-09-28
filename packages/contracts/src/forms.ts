export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  company?: string;
}

export interface NewsletterSubscriptionRequest {
  email: string;
  website?: string;
}

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function object(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\u0000/g, "") : "";
}

export function parseContactRequest(input: unknown): ValidationResult<ContactRequest> {
  const source = object(input);
  if (!source) return { ok: false, errors: ["invalid_body"] };

  const name = cleanText(source.name);
  const email = cleanText(source.email).toLowerCase();
  const message = cleanText(source.message);
  const company = cleanText(source.company);
  const errors: string[] = [];

  if (company) errors.push("spam_detected");
  if (name.length < 2 || name.length > 80) errors.push("invalid_name");
  if (!EMAIL.test(email) || email.length > 254) errors.push("invalid_email");
  if (message.length < 10 || message.length > 5000) errors.push("invalid_message");

  return errors.length
    ? { ok: false, errors }
    : { ok: true, value: { name, email, message, ...(company ? { company } : {}) } };
}

export function parseNewsletterSubscription(input: unknown): ValidationResult<NewsletterSubscriptionRequest> {
  const source = object(input);
  if (!source) return { ok: false, errors: ["invalid_body"] };

  const email = cleanText(source.email).toLowerCase();
  const website = cleanText(source.website);
  const errors: string[] = [];

  if (website) errors.push("spam_detected");
  if (!EMAIL.test(email) || email.length > 254) errors.push("invalid_email");

  return errors.length
    ? { ok: false, errors }
    : { ok: true, value: { email, ...(website ? { website } : {}) } };
}
