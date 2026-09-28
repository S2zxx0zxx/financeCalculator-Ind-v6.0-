export interface DeliveryResult {
  accepted: boolean;
  externalId?: string;
  reason?: "not_configured" | "upstream_rejected" | "upstream_error";
}

export interface DeliveryPort<T> {
  deliver(payload: T, context: { requestId: string; kind: "contact" | "newsletter" }): Promise<DeliveryResult>;
}

export interface RateLimitDecision {
  allowed: boolean;
  retryAfterSeconds: number;
}

export interface RateLimiterPort {
  consume(key: string): RateLimitDecision;
}
