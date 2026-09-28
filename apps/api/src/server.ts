import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import type { IncomingHttpHeaders } from "node:http";
import { handleApiRequest } from "./app";
import { HttpDeliveryPort } from "./http-delivery";
import { InMemoryFixedWindowRateLimiter } from "./rate-limit";

const port = Number(process.env.PORT ?? "8787");
const allowedOrigins = (process.env.FINCALC_ALLOWED_ORIGINS ?? "https://satzzxzxx.me,https://www.satzzxzxx.me,http://localhost:5173")
  .split(",").map(value => value.trim()).filter(Boolean);

const bearerToken = process.env.FINCALC_DELIVERY_BEARER_TOKEN;
const contactEndpoint = process.env.FINCALC_CONTACT_DELIVERY_URL;
const newsletterEndpoint = process.env.FINCALC_NEWSLETTER_DELIVERY_URL;

const deps = {
  contactDelivery: new HttpDeliveryPort({
    ...(contactEndpoint ? { endpoint: contactEndpoint } : {}),
    ...(bearerToken ? { bearerToken } : {})
  }),
  newsletterDelivery: new HttpDeliveryPort({
    ...(newsletterEndpoint ? { endpoint: newsletterEndpoint } : {}),
    ...(bearerToken ? { bearerToken } : {})
  }),
  rateLimiter: new InMemoryFixedWindowRateLimiter(8, 60_000),
  allowedOrigins
};

function headersFromNode(headers: IncomingHttpHeaders): Headers {
  const result = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value)) for (const item of value) result.append(key, item);
    else if (typeof value === "string") result.set(key, value);
  }
  return result;
}

const server = createServer(async (req, res) => {
  const requestId = randomUUID();
  try {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    const headers = headersFromNode(req.headers);
    headers.set("x-request-id", requestId);
    if (!headers.has("x-forwarded-for") && req.socket.remoteAddress) headers.set("x-client-ip", req.socket.remoteAddress);

    const host = headers.get("host") || `localhost:${port}`;
    const method = req.method || "GET";
    const requestBody = chunks.length && !["GET","HEAD"].includes(method) ? Buffer.concat(chunks) : undefined;
    const request = new Request(`http://${host}${req.url || "/"}`, {
      method,
      headers,
      ...(requestBody ? { body: requestBody } : {})
    });

    const response = await handleApiRequest(request, deps);
    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.end(Buffer.from(await response.arrayBuffer()));
    console.info(JSON.stringify({ requestId, method:req.method, path:req.url?.split("?")[0], status:response.status }));
  } catch {
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error:"internal_error", requestId }));
    console.error(JSON.stringify({ requestId, method:req.method, path:req.url?.split("?")[0], status:500 }));
  }
});

server.listen(port, () => {
  console.info(`FinCalc API listening on :${port}`);
});
