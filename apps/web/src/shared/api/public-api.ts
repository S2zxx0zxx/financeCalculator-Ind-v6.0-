import type { ContactRequest, NewsletterSubscriptionRequest } from "@fincalc/contracts";

export type SubmissionResult =
  | { status: "accepted"; requestId?: string }
  | { status: "invalid"; fields: string[]; requestId?: string }
  | { status: "rate_limited"; retryAfterSeconds: number; requestId?: string }
  | { status: "unavailable"; requestId?: string }
  | { status: "failed"; requestId?: string };

type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

async function responseBody(response: Response): Promise<Record<string, unknown>> {
  try {
    const value = await response.json();
    return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

export function createPublicApiClient(baseUrl: string | undefined, fetcher?: Fetcher) {
  const normalized = baseUrl?.trim().replace(/\/$/, "");

  async function submit(path: string, payload: unknown): Promise<SubmissionResult> {
    if (!normalized) return { status: "unavailable" };

    let url: string;
    try {
      url = new URL(path, `${normalized}/`).toString();
    } catch {
      return { status: "unavailable" };
    }

    const transport = fetcher ?? globalThis.fetch;
    if (!transport) return { status: "unavailable" };

    try {
      const response = await transport(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = await responseBody(response);
      const requestId = typeof body.requestId === "string" ? body.requestId : undefined;

      if (response.status === 202) return { status: "accepted", ...(requestId ? { requestId } : {}) };
      if (response.status === 422) {
        const fields = Array.isArray(body.fields) ? body.fields.filter((item): item is string => typeof item === "string") : [];
        return { status: "invalid", fields, ...(requestId ? { requestId } : {}) };
      }
      if (response.status === 429) {
        const retryHeader = Number(response.headers.get("retry-after") ?? "0");
        return {
          status: "rate_limited",
          retryAfterSeconds: Number.isFinite(retryHeader) ? Math.max(0, retryHeader) : 0,
          ...(requestId ? { requestId } : {})
        };
      }
      if (response.status === 503) return { status: "unavailable", ...(requestId ? { requestId } : {}) };
      return { status: "failed", ...(requestId ? { requestId } : {}) };
    } catch {
      return { status: "unavailable" };
    }
  }

  return {
    submitContact(payload: ContactRequest) {
      return submit("/api/contact", payload);
    },
    subscribeNewsletter(payload: NewsletterSubscriptionRequest) {
      return submit("/api/newsletter/subscriptions", payload);
    }
  };
}
