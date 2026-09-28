import { createHash, randomUUID } from "node:crypto";
import {
  parseContactRequest,
  parseNewsletterSubscription,
  type ContactRequest,
  type NewsletterSubscriptionRequest
} from "@fincalc/contracts";
import type { DeliveryPort, RateLimiterPort } from "./ports";

export interface ApiDependencies {
  contactDelivery: DeliveryPort<ContactRequest>;
  newsletterDelivery: DeliveryPort<NewsletterSubscriptionRequest>;
  rateLimiter: RateLimiterPort;
  allowedOrigins: readonly string[];
}

const MAX_BODY_BYTES = 24 * 1024;

function json(status: number, body: unknown, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers }
  });
}

function cors(origin: string | null, allowed: readonly string[]): HeadersInit {
  return origin && allowed.includes(origin)
    ? { "access-control-allow-origin": origin, vary: "Origin" }
    : {};
}

function originAllowed(origin: string | null, allowed: readonly string[]): boolean {
  return !origin || allowed.includes(origin);
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const candidate = forwarded || request.headers.get("x-client-ip") || "unknown";
  return createHash("sha256").update(candidate).digest("hex").slice(0, 24);
}

async function readJsonBody(request: Request): Promise<{ ok: true; value: unknown } | { ok: false; status: number }> {
  const type = request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  if (type !== "application/json") return { ok: false, status: 415 };
  const length = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) return { ok: false, status: 413 };
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) return { ok: false, status: 413 };
  try { return { ok: true, value: JSON.parse(text) }; } catch { return { ok: false, status: 400 }; }
}

export async function handleApiRequest(request: Request, deps: ApiDependencies): Promise<Response> {
  const requestId = request.headers.get("x-request-id") || randomUUID();
  const origin = request.headers.get("origin");
  const corsHeaders = cors(origin, deps.allowedOrigins);
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    if (!originAllowed(origin, deps.allowedOrigins)) return json(403, { error: "origin_not_allowed", requestId });
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        "access-control-allow-methods": "POST,OPTIONS",
        "access-control-allow-headers": "content-type,x-request-id",
        "access-control-max-age": "86400"
      }
    });
  }

  if (url.pathname === "/health" && request.method === "GET") {
    return json(200, { status: "ok", requestId });
  }

  if (!originAllowed(origin, deps.allowedOrigins)) return json(403, { error: "origin_not_allowed", requestId }, corsHeaders);
  if (request.method !== "POST") return json(405, { error: "method_not_allowed", requestId }, corsHeaders);

  const rate = deps.rateLimiter.consume(`${clientKey(request)}:${url.pathname}`);
  if (!rate.allowed) {
    return json(429, { error: "rate_limited", requestId }, {
      ...corsHeaders,
      "retry-after": String(rate.retryAfterSeconds)
    });
  }

  const body = await readJsonBody(request);
  if (!body.ok) return json(body.status, { error: "invalid_request", requestId }, corsHeaders);

  if (url.pathname === "/api/contact") {
    const parsed = parseContactRequest(body.value);
    if (!parsed.ok) return json(422, { error: "validation_failed", fields: parsed.errors, requestId }, corsHeaders);
    const result = await deps.contactDelivery.deliver(parsed.value, { requestId, kind: "contact" });
    if (!result.accepted) {
      return json(503, { error: "delivery_unavailable", requestId }, corsHeaders);
    }
    return json(202, { accepted: true, requestId }, corsHeaders);
  }

  if (url.pathname === "/api/newsletter/subscriptions") {
    const parsed = parseNewsletterSubscription(body.value);
    if (!parsed.ok) return json(422, { error: "validation_failed", fields: parsed.errors, requestId }, corsHeaders);
    const result = await deps.newsletterDelivery.deliver(parsed.value, { requestId, kind: "newsletter" });
    if (!result.accepted) {
      return json(503, { error: "delivery_unavailable", requestId }, corsHeaders);
    }
    return json(202, { accepted: true, requestId }, corsHeaders);
  }

  return json(404, { error: "not_found", requestId }, corsHeaders);
}
