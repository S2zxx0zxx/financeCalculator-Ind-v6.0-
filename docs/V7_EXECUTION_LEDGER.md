# FinCalc V7 — Master Execution Ledger

This is the single source of truth for the preservation-first rebuild. Nothing is considered complete until implementation and verification gates pass.

## Status legend
- [ ] pending
- [~] in progress
- [x] verified

## Stage A — Architecture first
- [x] A1 Inventory real implemented behavior vs README/planned claims.
- [x] A2 Freeze public routes, storage keys, calculator inputs/outputs, formula behavior, charts, analytics and PWA behavior.
- [x] A3 Create regression fixtures before migrating calculator math.
- [x] A4 Establish modular application boundaries and migration adapters.
- [x] A5 Introduce build/type/test gates without replacing production entry.
- [~] A6 Move legacy implementation only after a tested replacement exists.

Verified architecture gate: V7 CI passes install, strict TypeScript, 14 finance-core tests, web architecture tests and production build while `main` remains untouched.

## 35-point product plan
1. [x] Current Reality Map.
2. [x] Separate calculator engine from UI.
3. [x] Organize calculator catalog by user intent.
4. [~] Premium consistent calculator interaction system.
5. [~] Rebuild charts/visualization from tested result data.
6. [~] Real responsive application shell.
7. [~] Rebuild blog as a product subsystem.
8. [~] Remove duplicated blog presentation architecture.
9. [~] Zero-loss SEO migration.
10. [ ] Upgrade PWA/offline experience.
11. [~] Centralize Hindi/English i18n.
12. [~] Structured useful calculation history.
13. [~] Saved scenarios and comparison.
14. [~] Rebuild PDF/export/share.
15. [~] Replace fake local-only contact submission with real backend delivery.
16. [~] Add server capabilities only where server ownership is required.
17. [ ] Build authoritative real-time financial data layer with freshness/fallback.
18. [x] Keep ambitious AI capabilities as a separate controlled phase.
19. [x] Deterministic financial engine remains source of truth under AI.
20. [~] Explicit, privacy-respecting personalization.
21. [x] Financial Twin/prediction outside core V7 until data foundation is reliable.
22. [~] Build 2026–27 FinCalc design system.
23. [~] Premium restrained decoration and meaningful motion.
24. [~] Mobile-first first-class experience.
25. [~] Accessibility as an acceptance criterion.
26. [~] Performance budgets and route/feature splitting.
27. [~] Privacy-safe analytics/event architecture.
28. [ ] Trust-first monetization and affiliate presentation.
29. [~] Upgrade legal/trust/formula-source layer.
30. [~] CI/CD quality gates.
31. [~] Separate static frontend and server deployment concerns where necessary.
32. [x] Enforce dependency/code ownership boundaries.
33. [~] Four-layer testing: formula, component, integration, E2E.
34. [x] Separate visual content migration from current-fact verification.
35. [~] Synchronize documentation with implemented reality.

## Release gates
- No legacy capability silently removed.
- Formula parity proven with fixtures.
- Existing valuable URLs preserved or explicitly redirected.
- Mobile and desktop journeys pass E2E.
- Accessibility/performance/security checks pass.
- Offline calculator path verified.
- SEO metadata/schema/sitemap verified.
- Production build green.
- Main is not merged until review.
