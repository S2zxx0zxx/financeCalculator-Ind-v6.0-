# FinCalc V7 Live-Data Contract

The restored codebase does not contain the "Real-Time Data Engine" described in README. Current gold, repo-rate, inflation and FD-rate material is primarily static snapshot content.

V7 therefore requires every external financial datum to use `LiveDataEnvelope<T>` with:

- `value`
- `unit` where applicable
- explicit source ID/name/URL
- `asOf` timestamp from the source
- `fetchedAt`
- `staleAfter`
- status: `fresh | stale | unavailable`

## Rules
1. No "LIVE" badge without an actual data fetch and freshness metadata.
2. Stale data remains visibly stale; it is never silently presented as current.
3. Unavailable upstreams produce `unavailable`, not made-up fallback numbers.
4. Calculators remain deterministic and work without live data unless the user explicitly chooses a live-rate helper.
5. External adapters live server-side when secrets, rate limits or source normalization require server ownership.
6. Every source adapter needs a fixture test and failure/freshness test before UI use.
