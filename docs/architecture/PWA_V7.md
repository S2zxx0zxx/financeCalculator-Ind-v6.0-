# FinCalc V7 PWA Contract

The legacy service worker remains production owner until V7 cutover.

## V7 behavior
- V7 worker source lives inside `apps/web/public/sw.js`.
- Registration is gated behind `VITE_ENABLE_PWA=true`.
- Preview builds therefore cannot accidentally replace the legacy root worker.
- Navigation is network-first with cached-route and explicit offline fallbacks.
- Same-origin static assets use cache-first behavior.
- Old V7 cache versions are deleted on activation.
- A waiting service worker does not force-refresh an active session; the UI offers an Update action.
- Online/offline state is surfaced to the user.
- Install prompt is user-triggered when the browser exposes `beforeinstallprompt`.

## Cutover checklist
1. V7 production artifact must include manifest, offline page and worker.
2. Existing root icons must be copied into the artifact or otherwise retained.
3. Set `VITE_ENABLE_PWA=true` only for the production V7 build.
4. Verify installability and standalone launch.
5. Verify all 11 calculator routes offline after first load/install.
6. Verify update from one cache version to the next without stale HTML.
7. Verify old `fincalc-v6` cache cleanup/migration during final production worker transition.
