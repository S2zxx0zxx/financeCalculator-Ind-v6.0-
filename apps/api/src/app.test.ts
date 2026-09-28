import { describe, expect, it } from "vitest";
import { handleApiRequest, type ApiDependencies } from "./app";
import type { DeliveryPort, RateLimiterPort } from "./ports";

function delivery<T>(accepted: boolean): DeliveryPort<T> {
  return { deliver: async () => ({ accepted, ...(accepted ? {} : { reason:"not_configured" as const }) }) };
}

const allowAll: RateLimiterPort = { consume: () => ({ allowed:true, retryAfterSeconds:0 }) };

function deps(accepted=true): ApiDependencies {
  return {
    contactDelivery: delivery(accepted),
    newsletterDelivery: delivery(accepted),
    rateLimiter: allowAll,
    allowedOrigins:["https://satzzxzxx.me"]
  };
}

function post(path:string, body:unknown, origin="https://satzzxzxx.me") {
  return new Request(`https://api.satzzxzxx.me${path}`, {
    method:"POST",
    headers:{ "content-type":"application/json", origin },
    body:JSON.stringify(body)
  });
}

describe("FinCalc API", () => {
  it("accepts valid contact only after delivery adapter accepts it", async () => {
    const response=await handleApiRequest(post("/api/contact",{name:"Satyam",email:"x@example.com",message:"This is a valid message."}),deps(true));
    expect(response.status).toBe(202);
  });

  it("never fakes success when delivery is unconfigured", async () => {
    const response=await handleApiRequest(post("/api/contact",{name:"Satyam",email:"x@example.com",message:"This is a valid message."}),deps(false));
    expect(response.status).toBe(503);
  });

  it("rejects invalid input and disallowed origins", async () => {
    const invalid=await handleApiRequest(post("/api/newsletter/subscriptions",{email:"bad"}),deps());
    expect(invalid.status).toBe(422);
    const forbidden=await handleApiRequest(post("/api/contact",{name:"Satyam",email:"x@example.com",message:"This is a valid message."},"https://evil.example"),deps());
    expect(forbidden.status).toBe(403);
  });

  it("enforces rate limiter decisions", async () => {
    const blocked: ApiDependencies={...deps(),rateLimiter:{consume:()=>({allowed:false,retryAfterSeconds:30})}};
    const response=await handleApiRequest(post("/api/contact",{name:"Satyam",email:"x@example.com",message:"This is a valid message."}),blocked);
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("30");
  });
});
