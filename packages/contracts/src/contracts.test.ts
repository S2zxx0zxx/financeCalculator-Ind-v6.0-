import { describe, expect, it } from "vitest";
import { classifyFreshness, parseContactRequest, parseNewsletterSubscription } from "./index";

describe("public form contracts", () => {
  it("normalizes a valid contact request", () => {
    expect(parseContactRequest({ name:"  Satyam  ", email:"USER@EXAMPLE.COM", message:"A real support message." }))
      .toEqual({ ok:true, value:{ name:"Satyam", email:"user@example.com", message:"A real support message." } });
  });

  it("rejects honeypot, malformed email and oversized/short messages", () => {
    expect(parseContactRequest({ name:"A", email:"bad", message:"short", company:"bot" })).toEqual({
      ok:false,
      errors:["spam_detected","invalid_name","invalid_email","invalid_message"]
    });
  });

  it("validates newsletter email and honeypot", () => {
    expect(parseNewsletterSubscription({ email:"hello@example.com" }).ok).toBe(true);
    expect(parseNewsletterSubscription({ email:"bad", website:"spam" })).toEqual({
      ok:false,
      errors:["spam_detected","invalid_email"]
    });
  });
});

describe("live-data freshness contract", () => {
  it("distinguishes fresh, stale and unavailable snapshots", () => {
    expect(classifyFreshness("2026-09-28T10:00:00Z","2026-09-28T12:00:00Z",new Date("2026-09-28T11:00:00Z"))).toBe("fresh");
    expect(classifyFreshness("2026-09-28T10:00:00Z","2026-09-28T12:00:00Z",new Date("2026-09-28T13:00:00Z"))).toBe("stale");
    expect(classifyFreshness(null,"2026-09-28T12:00:00Z",new Date("2026-09-28T11:00:00Z"))).toBe("unavailable");
  });
});
