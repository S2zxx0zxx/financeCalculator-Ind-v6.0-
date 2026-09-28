# FinCalc V7 — Blog, Podcast, Forms & Analytics Audit

Baseline: `0447f1cb465f02dc3b23cbbdafa8ad00fcfb90e3`.

## Blog
- 29 standalone article HTML routes confirmed and frozen in `@fincalc/content`.
- Canonical article URLs are already present and must remain unchanged by default.
- Breadcrumb structured data and TOC patterns are widespread.
- Reading-progress behavior is inconsistent between generations of articles.
- Many articles contain one-off visualizations, including Canvas/pie-style graphics.
- Article-to-calculator links mostly target legacy homepage anchors such as `/#sip`, `/#emi`, `/#tax` and `/#fd`.
- Presentation/theme/navigation/analytics/ad scripts are duplicated across article files.
- Factual migration and visual migration are separate jobs: an article is not marked "updated" merely because its UI changed.

## Podcast
- Five episode records are present in `podcast/index.html`.
- UI references:
  - `/podcast/audio/ep001-ppf-guide.mp3`
  - `/podcast/audio/ep002-sip-vs-fd.mp3`
  - `/podcast/audio/ep003-home-loan.mp3`
  - `/podcast/audio/ep004-income-tax.mp3`
  - `/podcast/audio/ep005-cibil.mp3`
- Repository tree contains no `podcast/audio/` files. Current playable-audio claims are therefore incomplete.
- Podcast stores progress, ratings, volume, dismissed-continuation state and locally captured emails in localStorage.
- Podcast calculator links target legacy homepage anchors.

## Contact / Newsletter
- Current Contact form validates input, stores the message in `fincalc-contact-msgs`, hides the form and displays success. No server delivery occurs.
- Blog-index newsletter marks `fincalc-nl-subscribed` locally without a real subscription backend.
- These flows must not retain fake-success semantics in V7.

## Analytics / Ads
- GA4 ID `G-NTKNL4QDZN` appears across the site.
- README also documents GTM `GTM-TDMQCPRQ`.
- Legacy calculator events include `calculation` and `affiliate_click`.
- Some newer blogs track scroll depth and time on page.
- Some blog pages include Microsoft Clarity code with literal placeholder `CLARITY_TAG_ID`; this is not evidence of a working Clarity deployment.
- Google AdSense client `ca-pub-2931447769544799` is embedded across calculator/static/blog/podcast surfaces.
- V7 centralizes event definitions and intentionally forbids raw financial values, email addresses and free-form input in analytics payloads.

## Migration rules
1. Preserve article URLs and current SEO metadata until a verified replacement exists.
2. Convert old calculator anchors through compatibility mapping to dedicated V7 calculator routes.
3. Centralize article layout, theme, progress, share, ads and analytics.
4. Preserve useful local podcast state, but do not advertise unavailable audio as playable.
5. Contact/newsletter success requires a real accepted server response.
6. Ads and affiliate surfaces remain clearly labeled and visually separated from deterministic results.
