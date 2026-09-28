import { describe, expect, it } from "vitest";
import { InMemoryFixedWindowRateLimiter } from "./rate-limit";

describe("fixed-window rate limiter", () => {
  it("blocks after the limit and resets after the window", () => {
    let now=0;
    const limiter=new InMemoryFixedWindowRateLimiter(2,1000,()=>now);
    expect(limiter.consume("a").allowed).toBe(true);
    expect(limiter.consume("a").allowed).toBe(true);
    expect(limiter.consume("a").allowed).toBe(false);
    now=1001;
    expect(limiter.consume("a").allowed).toBe(true);
  });
});
