import type { DeliveryPort, DeliveryResult } from "./ports";

export interface HttpDeliveryOptions {
  endpoint?: string;
  bearerToken?: string;
  timeoutMs?: number;
}

export class HttpDeliveryPort<T> implements DeliveryPort<T> {
  constructor(private readonly options: HttpDeliveryOptions) {}

  async deliver(payload: T, context: { requestId: string; kind: "contact" | "newsletter" }): Promise<DeliveryResult> {
    const endpoint = this.options.endpoint?.trim();
    if (!endpoint) return { accepted: false, reason: "not_configured" };

    let url: URL;
    try { url = new URL(endpoint); } catch { return { accepted: false, reason: "not_configured" }; }
    if (url.protocol !== "https:" && !["localhost","127.0.0.1"].includes(url.hostname)) {
      return { accepted: false, reason: "not_configured" };
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.options.timeoutMs ?? 5_000);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-fincalc-request-id": context.requestId,
          ...(this.options.bearerToken ? { authorization: `Bearer ${this.options.bearerToken}` } : {})
        },
        body: JSON.stringify({ kind: context.kind, payload }),
        signal: controller.signal
      });
      if (!response.ok) return { accepted: false, reason: "upstream_rejected" };
      const externalId = response.headers.get("x-request-id") ?? undefined;
      return { accepted: true, ...(externalId ? { externalId } : {}) };
    } catch {
      return { accepted: false, reason: "upstream_error" };
    } finally {
      clearTimeout(timer);
    }
  }
}
