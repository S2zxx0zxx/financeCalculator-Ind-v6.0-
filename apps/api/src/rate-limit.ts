import type { RateLimitDecision, RateLimiterPort } from "./ports";

interface Entry { count: number; resetAt: number }

export class InMemoryFixedWindowRateLimiter implements RateLimiterPort {
  private readonly entries = new Map<string, Entry>();

  constructor(
    private readonly limit = 8,
    private readonly windowMs = 60_000,
    private readonly now: () => number = Date.now
  ) {}

  consume(key: string): RateLimitDecision {
    const now = this.now();
    const current = this.entries.get(key);
    if (!current || current.resetAt <= now) {
      this.entries.set(key, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    if (current.count >= this.limit) {
      return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
    }

    current.count += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  }
}
