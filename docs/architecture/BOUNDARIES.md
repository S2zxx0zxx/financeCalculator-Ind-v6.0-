# FinCalc V7 Architecture Boundaries

## Migration rule
Do not physically reorganize legacy files merely for cleanliness. First establish new boundaries, migrate behavior behind tests, then retire duplication. This prevents broken URLs, SEO loss and calculator regressions.

## Target dependency direction
app -> pages -> features -> domain -> shared

### app
Router, providers, application shell, global error boundaries and bootstrapping.

### pages
Route composition only. Pages orchestrate features; they do not own financial formulas.

### features
Calculator experiences, discovery, favorites, history, comparisons, export/share, blog journeys and account/cloud capabilities.

### domain
Pure financial calculations, rule sets, validation contracts, rounding policies, result types and source metadata. No React imports, DOM access, analytics or storage.

### shared
Design-system primitives, charts, formatters, generic hooks/utilities and accessibility helpers. Shared modules cannot import product features.

### server
Authentication, cloud sync, contact/feedback delivery, authoritative live-data proxy/cache, server-side rate limiting and future AI orchestration. Anonymous deterministic calculators must not depend on server availability.

### content
Articles/podcast metadata and structured content. Content rendering is separate from factual verification/update workflows.

## Data flow
User input -> typed validation -> deterministic domain calculation -> typed result -> explanation/chart/export adapters -> UI.

Charts, PDFs and textual totals consume the same typed result object.

## State ownership
- Calculator form state: local feature state.
- Theme/language/recent/favorites/local history: versioned local persistence.
- Cloud state: opt-in and synchronized through explicit server adapters.
- Financial formulas: stateless pure functions.
- Live external data: timestamped source objects with freshness and fallback metadata.

## Compatibility
Legacy URLs, CNAME, sitemap, robots, feed, manifest, service-worker behavior, analytics semantics and storage are migration inputs. Breaking changes require explicit migration/redirect adapters.
