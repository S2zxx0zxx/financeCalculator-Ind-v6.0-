import { describe, expect, it, vi } from "vitest";
import { createPublicApiClient } from "./public-api";

describe("public API client", () => {
  it("never fakes success when API base is absent", async () => {
    const client=createPublicApiClient(undefined, vi.fn());
    expect(await client.submitContact({name:"Satyam",email:"x@example.com",message:"A valid support message."})).toEqual({status:"unavailable"});
  });

  it("maps accepted and validation responses without leaking payload logic", async () => {
    const accepted=vi.fn(async()=>new Response(JSON.stringify({accepted:true,requestId:"r1"}),{status:202,headers:{"content-type":"application/json"}}));
    const client=createPublicApiClient("https://api.example.com",accepted);
    expect(await client.subscribeNewsletter({email:"x@example.com"})).toEqual({status:"accepted",requestId:"r1"});

    const invalid=vi.fn(async()=>new Response(JSON.stringify({fields:["invalid_email"],requestId:"r2"}),{status:422,headers:{"content-type":"application/json"}}));
    const client2=createPublicApiClient("https://api.example.com",invalid);
    expect(await client2.subscribeNewsletter({email:"bad"})).toEqual({status:"invalid",fields:["invalid_email"],requestId:"r2"});
  });

  it("maps rate limits and delivery outages honestly", async () => {
    const limited=vi.fn(async()=>new Response(JSON.stringify({requestId:"r3"}),{status:429,headers:{"retry-after":"30","content-type":"application/json"}}));
    expect(await createPublicApiClient("https://api.example.com",limited).subscribeNewsletter({email:"x@example.com"}))
      .toEqual({status:"rate_limited",retryAfterSeconds:30,requestId:"r3"});

    const down=vi.fn(async()=>new Response(JSON.stringify({requestId:"r4"}),{status:503,headers:{"content-type":"application/json"}}));
    expect(await createPublicApiClient("https://api.example.com",down).subscribeNewsletter({email:"x@example.com"}))
      .toEqual({status:"unavailable",requestId:"r4"});
  });
});
