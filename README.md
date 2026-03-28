<div align="center">

<br/>

<img src="https://img.shields.io/badge/₹-FinCalc_India-1b1710?style=for-the-badge&labelColor=c8821a&logoColor=white" height="40" />

<br/><br/>

# FinCalc India `v2.0`

### India's Most Powerful Free Finance Calculator Suite + Blog

**13+ Calculators · 5+ Expert Blog Guides · Zero Signup · 100% Free**

[**satzzxzxx.me**](https://satzzxzxx.me) · [**Blog**](https://satzzxzxx.me/blog/) · [**Calculators**](https://satzzxzxx.me/)

<br/>

[![MIT License](https://img.shields.io/badge/License-MIT-c8821a?style=flat-square)](LICENSE)
[![Lighthouse Performance](https://img.shields.io/badge/Performance-98-1a7a3a?style=flat-square)](#-performance)
[![Lighthouse SEO](https://img.shields.io/badge/SEO-100-1a4a8a?style=flat-square)](#-performance)
[![HTML5](https://img.shields.io/badge/HTML5-Single_File-E34F26?style=flat-square)](#)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-6a3a9a?style=flat-square)](#)
[![Blog Posts](https://img.shields.io/badge/Blog_Posts-5+-c8821a?style=flat-square)](#-blog--content-system)

<br/>

</div>

---

## What is FinCalc India?

A single-file (~85KB) finance calculator suite built for every Indian — from a ₹1,000 two-wheeler loan to a ₹10 Crore commercial property. No signup, no server, no tracking. Open the page, calculate, done.

Plus a growing **personal finance blog** with expert guides on EMI, SIP, Tax, GST — written in simple Hinglish for real Indians.

**Live at** → [satzzxzxx.me](https://satzzxzxx.me)

---

## 13+ Calculators

| Calculator | What It Does |
|:--|:--|
| **EMI** | Home loan, car loan, personal loan EMI with principal vs interest breakup |
| **SIP Returns** | Mutual fund wealth projection with compounding |
| **Income Tax 2025-26** | New vs Old Regime side-by-side comparison |
| **GST** | Add/Remove GST with CGST + SGST split |
| **Fixed Deposit** | Maturity value with quarterly/monthly/yearly compounding |
| **Recurring Deposit** | Monthly deposit growth calculator |
| **Retirement Planning** | Corpus needed based on age, expenses, inflation |
| **Inflation Impact** | Future value of money over time |
| **Loan Eligibility** | How much loan you can get based on salary |
| **Rent vs Buy** | Should you rent or buy — total cost comparison |
| **PPF** | Public Provident Fund 15-year calculator |
| **NPS** | National Pension Scheme projection |
| **Gratuity** | Gratuity amount based on years of service |

Every calculator has: animated donut charts (Canvas API), WhatsApp/Telegram share, PDF download, calculation history, and works in both Hindi and English.

---

## Blog & Content System

The blog lives at [satzzxzxx.me/blog/](https://satzzxzxx.me/blog/) — expert finance guides written for real Indians in simple language.

**Published Articles:**

| # | Article | Category |
|:--|:--|:--|
| 1 | [₹50 Lakh Home Loan EMI — SBI, HDFC, ICICI Comparison 2026](https://satzzxzxx.me/blog/home-loan-emi-50-lakh-2026.html) | Loans & EMI |
| 2 | [GST Calculation Guide — Slabs, ITC, HSN Codes & Filing](https://satzzxzxx.me/blog/gst-calculation-guide-india.html) | GST |
| 3 | [SIP vs FD in 2026 — Where Should You Invest?](https://satzzxzxx.me/blog/sip-vs-fd-2026-v2.html) | Investment |
| 4 | [Income Tax 2026-27 — New vs Old Regime Complete Guide](https://satzzxzxx.me/blog/income-tax-2026-27-guide.html) | Tax & ITR |
| 5 | [Privacy Policy](https://satzzxzxx.me/privacy-policy.html) | Legal |

**Blog Features:**
- Table of Contents with smooth scroll
- Author bio section with social links
- Related posts grid at the end of each article
- Reading progress bar
- Reading time estimate
- Newsletter signup
- FAQ section with expandable answers
- Social share buttons (WhatsApp, X, Telegram)
- Schema.org Article + FAQ + Breadcrumb markup
- Dark/Light mode support
- Mobile-first responsive design

**Design System:** DM Sans + Playfair Display fonts, accent `#c8821a`, animated bar charts with IntersectionObserver, 3 AdSense slots per article.

---

## Design & UI

**Header** — Mascot logo + "FinCalc India" (tricolor gradient) + Calc/Blog toggle pill + dark mode toggle

**Theme** — Warm parchment light mode (`#faf8f5`), rich dark mode (`#0f0d0a`). 50+ CSS custom properties for consistent theming.

**Typography** — DM Sans (body, 400-800) + Playfair Display (headings, italic accents)

**Colors:**

```
Accent (₹ Gold)     #c8821a
Profit / Positive    #1a7a3a
Loss / Negative      #a82828
Information          #1a4a8a
Premium              #6a3a9a
```

**Footer** — Calculator nav links, social icons (Instagram, X, GitHub, Telegram) with brand colors and glow hover, monospace "built by Satzzxzxx" branding, MIT license.

---

## Architecture

```
satzzxzxx.me/
│
├── index.html                 # Main calculator app (~85KB, 3200+ LOC)
│                              #   ├── <style>    ~1000 lines CSS
│                              #   ├── <body>     ~1000 lines HTML
│                              #   └── <script>   ~1200 lines JS
│
├── blog/
│   ├── index.html             # Blog listing page with category filters
│   ├── home-loan-emi-50-lakh-2026.html
│   ├── gst-calculation-guide-india.html
│   ├── sip-vs-fd-2026-v2.html
│   └── income-tax-2026-27-guide.html
│
├── about.html                 # About FinCalc India
├── contact.html               # Contact information
├── disclaimer.html            # Financial disclaimer
├── privacy-policy.html        # Privacy policy (GDPR + AdSense)
│
├── sitemap.xml                # All pages for Google indexing
├── robots.txt                 # Crawler instructions
├── manifest.json              # PWA manifest
├── CNAME                      # Custom domain (satzzxzxx.me)
├── README.md                  # This file
└── LICENSE                    # MIT License
```

**Single-file philosophy:** The main calculator is one HTML file with zero dependencies. CSS, HTML, JS all inline. No build step, no npm, no webpack. Download and open — it works.

**Blog pages** are also single-file — each article is a standalone HTML with all styles inline. Same design system, same color tokens, same fonts.

---

## Tech Stack

| Layer | Technology | Why |
|:--|:--|:--|
| Markup | HTML5 Semantic | Accessibility + SEO |
| Styling | Pure CSS3 + Custom Properties | Zero framework overhead |
| Logic | Vanilla JavaScript ES6+ | No build step, no dependencies |
| Charts | Canvas API (Donut Charts) | Hardware accelerated, no library |
| Fonts | Google Fonts (DM Sans + Playfair Display) | Premium typography, free |
| Analytics | Google Analytics 4 + GTM | Event-driven tracking |
| Ads | Google AdSense | Monetization (pending approval) |
| SEO | JSON-LD + OpenGraph + Twitter Cards | Rich search results |
| Hosting | GitHub Pages + Cloudflare | Free, fast, global CDN |
| Domain | Namecheap (.me domain) | Custom domain via GitHub Student Pack |
| i18n | Custom JS Engine | English + Hindi |
| Storage | localStorage | Client-side history, no server |
| PWA | Service Worker + Manifest | Installable, offline capable |

---

## Performance

Actual Lighthouse scores (not targets):

| Metric | Score |
|:--|:--|
| **Performance** | 98 |
| **SEO** | 100 |
| **First Contentful Paint** | < 0.8s |
| **Total File Size** | ~85KB (single file) |
| **External Requests** | 2 (fonts only, ads load on production domain only) |
| **JavaScript Dependencies** | Zero |
| **CSS Frameworks** | Zero |

---

## Monetization

**7 AdSense slots** — strategically placed for maximum RPM without hurting UX:

1. Top Banner (below hero)
2. Sidebar Top (next to calculator)
3. Sidebar Bottom (below results)
4. Mid Content (between sections)
5. In-Article (blog posts)
6. Bottom Banner (above footer)
7. Sticky Mobile (fixed bottom, mobile only)

**6 Affiliate partner cards** — Demat accounts, home loans, credit cards, insurance, FD comparison, health insurance.

**Newsletter email capture** — on blog pages and exit intent popup.

All monetization loads conditionally — only on the production domain (`satzzxzxx.me`). Local development and other domains get a clean, ad-free experience.

---

## SEO & Analytics

| Feature | Implementation |
|:--|:--|
| Google Analytics 4 | `G-NTKNL4QDZN` — event tracking for calculator usage, affiliate clicks |
| Google Tag Manager | `GTM-TDMQCPRQ` |
| AdSense | `ca-pub-2931447769544799` |
| JSON-LD Schema | WebApplication, FAQPage, Article, BreadcrumbList |
| Open Graph | Title, description, image for social sharing |
| Twitter Cards | Summary large image |
| Sitemap | Auto-updated XML sitemap |
| Canonical URLs | On every page |
| RSS Feed | `blog/feed.xml` for RSS readers |

---

## Infrastructure

All built on **free tiers** via GitHub Student Developer Pack:

| Service | Usage |
|:--|:--|
| GitHub Pages | Hosting (free) |
| Namecheap | `.me` domain (free via Student Pack) |
| Cloudflare | CDN + DNS + SSL (free tier) |
| GitHub Copilot | Development assistant (Student Pack) |
| Google Analytics | Traffic analytics (free) |
| Google AdSense | Revenue (free, pending approval) |

---

## Quick Start

**Just want to use it?** → Go to [satzzxzxx.me](https://satzzxzxx.me)

**Want to run locally?**

```bash
git clone https://github.com/S2zxx0zxx/financeCalculator-Ind-v6.0-.git
cd financeCalculator-Ind-v6.0-
# Just open index.html in any browser — that's it
open index.html
```

**Want to deploy your own?**

```bash
# Fork this repo → Settings → Pages → Deploy from main branch
# Your site will be live at: https://YOUR_USERNAME.github.io/financeCalculator-Ind-v6.0-/
```

---

## Contributing

Contributions welcome. Fork, branch, code, PR.

```bash
git checkout -b feature/your-feature
# Make changes
git commit -m "feat: description"
git push origin feature/your-feature
# Open Pull Request
```

**Ideas:**
- New calculators (PPF, NPS, ELSS, HRA)
- More blog articles (mutual fund comparison, tax saving guide)
- More languages (Tamil, Telugu, Bengali, Marathi)
- Accessibility improvements
- New themes

---

## Connect

| Platform | Handle |
|:--|:--|
| Instagram | [@__.satzzxzxx](https://www.instagram.com/__.satzzxzxx) |
| X (Twitter) | [@satzzxzxx](https://x.com/satzzxzxx) |
| GitHub | [@S2zxx0zxx](https://github.com/S2zxx0zxx) |
| Telegram | [@InvestGrow_IN](https://t.me/InvestGrow_IN) |

---

## License

MIT License — free forever. Use it, modify it, deploy it, monetize it. Just keep the license file.

---

<div align="center">

```
/* built with ⚡ by Satzzxzxx */
```

**[satzzxzxx.me](https://satzzxzxx.me)** · Star ⭐ the repo if you like it

</div>
