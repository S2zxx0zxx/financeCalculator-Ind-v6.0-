# Revival branch baseline

Source: main at 3c5cccb0413e5e2d1a454d72c436127a48ed46f8 (2026-09-27 inspection).
This branch is the first vertical slice, not the completion of the full PRD/TRD.

- Keep the original homepage, hash calculator links, 29 existing blog article URLs, CNAME, RSS, sitemap and static hosting intact during incremental migration.
- Homepage implements eleven calculator topics in inline JavaScript. EMI lives in calcEMI in index.html; the new standalone EMI route is the first extracted pure domain example. It does not replace the legacy route yet, because parity and edge-case review are pending.
- Historical contact messages may exist only in a visitor's localStorage key fincalc-contact-msgs. Do not upload or delete that history without explicit user action. Contact now opens a mail draft and does not assert delivery.
- Historical fake newsletter state may exist in fincalc-subs and fincalc-nl-subscribed; neither proves subscription. Public enrollment surfaces are paused until a verified delivery system exists.
- Prior podcast page pointed to missing podcast/audio/ep*.mp3 files and incremented a timer without playing audio. Public route now tells visitors audio is unavailable. Publish genuine media and transcripts before restoring episode controls.
- The source still contains unreviewed finance and marketing claims beyond these fixes. Audit with a source register before treating them as current.

## Next implementation slices

1. Capture versioned golden fixtures for each original calculator and review with a domain owner; record deliberate corrections.
2. Build shared category registry and navigation while maintaining original URLs.
3. Move article content and calculator UI incrementally into static, schema-checked modules; evaluate Astro only after a production route proof.
4. Replace unverified promotional statements, tax freshness and credit-score claims with sourced, dated descriptions.
5. Add local-first compare and saved scenarios only after rule and storage contracts are reviewed.
