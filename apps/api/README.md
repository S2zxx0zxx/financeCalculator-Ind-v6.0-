# FinCalc V7 API boundary

This directory is reserved for server-owned capabilities. Anonymous deterministic calculators do not depend on it.

## Server-owned capabilities
- contact-message delivery
- newsletter subscription and unsubscribe lifecycle
- optional authenticated cloud sync
- authoritative live-data proxy/cache with source and freshness metadata
- rate limiting / abuse controls
- future AI orchestration behind deterministic finance-core tools

## Explicit non-goals
- calculator formulas do not move to the server merely to call the app "full stack"
- secrets never ship in the web bundle
- contact/newsletter UIs must not display success until the server confirms acceptance
- analytics must not receive raw financial inputs

## Planned HTTP contracts
- `POST /api/contact`
- `POST /api/newsletter/subscriptions`
- `DELETE /api/newsletter/subscriptions/:token`
- future authenticated sync under `/api/v1/me/*`

Concrete provider/runtime selection happens only when deployment ownership is selected.
