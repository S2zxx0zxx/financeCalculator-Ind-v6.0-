# 🤝 Contributing to FinCalc India

<div align="center">

![FinCalc India](https://img.shields.io/badge/FinCalc-India-c8821a?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJMMiA3bDEwIDUgMTAtNUwxMiAyek0yIDE3bDEwIDUgMTAtNVYxMkwyIDEydjV6Ii8+PC9zdmc+)
![Open Source](https://img.shields.io/badge/Open%20Source-MIT-22c55e?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-4888d8?style=for-the-badge)
![Made for India](https://img.shields.io/badge/Made%20for-India%20🇮🇳-FF9933?style=for-the-badge)

**India ka #1 Free Finance Calculator Suite — aur yeh aapki wajah se aur better banta hai.**

[🌐 Live Site](https://satzzxzxx.me) · [📝 Blog](https://satzzxzxx.me/blog) · [🐛 Report Bug](https://github.com/S2zxx0zxx/financeCalculator-Ind-v6.0-/issues) · [💡 Request Feature](https://github.com/S2zxx0zxx/financeCalculator-Ind-v6.0-/issues/new)

</div>

---

## 📋 Table of Contents

- [🙏 Pehle Yeh Padho](#-pehle-yeh-padho)
- [🚀 Getting Started](#-getting-started)
- [🌿 Branch Strategy](#-branch-strategy)
- [✅ Types of Contributions](#-types-of-contributions)
- [📐 Code Standards](#-code-standards)
- [🧪 Testing Checklist](#-testing-checklist)
- [📝 Blog Contributions](#-blog-contributions)
- [🔄 Pull Request Process](#-pull-request-process)
- [🐛 Bug Reports](#-bug-reports)
- [💡 Feature Requests](#-feature-requests)
- [🏆 Contributors](#-contributors)

---

## 🙏 Pehle Yeh Padho

FinCalc India ek **zero-dependency, pure HTML/CSS/JS** project hai. Koi React nahi, koi npm nahi, koi build step nahi. Yahi iska superpower hai — ek file, sab kuch.

> **Philosophy:** "Itna simple raho ki koi bhi contribute kar sake — developer ho ya nahin."

Contribution karne se pehle sirf teen cheezein samjho:

| Rule | Matlab |
|------|--------|
| 🎨 **Design mat todo** | Colors, fonts, layout — kabhi mat badlo bina permission ke |
| ⚡ **Zero dependencies** | Koi npm package, koi CDN library (already listed waale ke alawa) mat add karo |
| 📱 **Mobile first** | Har change mobile pe test karo pehle — 70%+ users mobile pe hain |

---

## 🚀 Getting Started

### Step 1 — Fork karo

```bash
# GitHub pe fork button dabaao, phir:
git clone https://github.com/YOUR-USERNAME/financeCalculator-Ind-v6.0-.git
cd financeCalculator-Ind-v6.0-
```

### Step 2 — Local mein chalao

Koi server setup nahi chahiye. Sirf file browser mein kholo:

```bash
# Option A: VS Code Live Server (recommended)
code .
# Live Server extension install karo, phir index.html pe right click → Open with Live Server

# Option B: Python simple server
python3 -m http.server 8080
# Browser mein: http://localhost:8080

# Option C: Direct file open
# index.html ko browser mein drag karo — bas!
```

### Step 3 — Project structure samjho

```
financeCalculator-Ind-v6.0-/
│
├── index.html              ← Main app — SAB KUCH yahan hai (5,271 lines)
├── sw.js                   ← Service Worker (PWA offline support)
├── manifest.json           ← PWA manifest
├── ads.txt                 ← Google AdSense authorization
├── sitemap.xml             ← SEO sitemap
├── robots.txt              ← Search engine instructions
│
├── blog/
│   ├── index.html          ← Blog listing page
│   ├── feed.xml            ← RSS feed
│   ├── iran-war-india-impact-2026.html
│   ├── akshaya-tritiya-2026-gold-price-guide.html
│   ├── gold-vs-mutual-fund-india.html
│   ├── cibil-score-guide-2026.html
│   ├── home-loan-emi-50-lakh-2026.html
│   ├── gst-calculation-guide-india.html
│   ├── sip-vs-fd-2026-v2.html
│   └── income-tax-2026-27-guide.html
│
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── fincalc-logo-splash.png
│
├── about.html
├── contact.html
├── disclaimer.html
└── privacy-policy.html
```

---

## 🌿 Branch Strategy

```
main                    ← Production (satzzxzxx.me live)
  └── feat/calculator-name    ← Naya calculator add karna
  └── fix/bug-description     ← Bug fix
  └── blog/post-slug          ← Naya blog post
  └── ui/component-name       ← UI improvement
  └── seo/page-name           ← SEO/meta improvements
```

**Branch naming examples:**
```bash
git checkout -b feat/ppf-calculator
git checkout -b fix/sip-chart-dark-mode
git checkout -b blog/rbi-rate-cut-guide-2026
git checkout -b ui/mobile-tab-scroll
```

---

## ✅ Types of Contributions

### 🧮 Naya Calculator Add Karna

FinCalc mein currently 11 calculators hain. Naye calculators ke liye **high priority** list:

| Calculator | Priority | Complexity |
|-----------|----------|------------|
| PPF Calculator | 🔴 High | Medium |
| SSY (Sukanya Samriddhi) Calculator | 🔴 High | Medium |
| NPS Calculator | 🟡 Medium | High |
| HRA Exemption Calculator | 🟡 Medium | Low |
| Gratuity Calculator | 🟢 Low | Low |
| TDS Calculator | 🟡 Medium | Medium |
| Gold Loan EMI Calculator | 🟢 Low | Low |

**Naya calculator kaise add karein:**

1. `index.html` mein tab button add karo (`.tabs-scroll` section mein)
2. Calculator section HTML add karo (`<!-- ===== CALCULATOR NAME ===== -->` format follow karo)
3. JavaScript function add karo (`calcXXX()` naming convention)
4. Sidebar quick facts update karo agar relevant ho
5. FAQ section mein 2-3 relevant Q&A add karo
6. `sitemap.xml` mein URL add karo agar dedicated page hai

### 📝 Blog Post Likhna

Naye blog posts **sabse valuable contribution** hai abhi — AdSense approval ke liye 15+ blogs chahiye.

**Blog post template:** `blog/iran-war-india-impact-2026.html` ko reference use karo — same CSS, same structure.

**High-priority blog topics (abhi likhne chahiye):**

```
✅ SSY (Sukanya Samriddhi Yojana) — Complete Guide 2026
✅ HRA Exemption Kaise Calculate Karein — Salaried Employees Guide  
✅ TDS Kya Hai — Form 16, 26AS, Refund Complete Guide
✅ Gratuity Calculation — Formula, Tax, Eligibility 2026
✅ Mutual Fund Types India — Large Cap vs Mid Cap vs ELSS
✅ Term Insurance — Best Plans, Premium Calculator, Tax Benefits
✅ NPS vs PPF vs ELSS — Best Tax Saving Option 2026
✅ Home Loan vs Rent — Should You Buy a House in 2026?
```

**Blog naming convention:**
```
blog/topic-keywords-year.html
blog/ssy-sukanya-samriddhi-yojana-guide-2026.html
blog/hra-exemption-calculator-guide-2026.html
```

### 🐛 Bug Fix Karna

Current known bugs aur issues [Issues tab](https://github.com/S2zxx0zxx/financeCalculator-Ind-v6.0-/issues) pe dekhein.

### 🔍 SEO Improvements

- Meta descriptions improve karna
- Schema markup add karna
- Alt text missing images pe
- Internal linking improve karna

### 🌐 Hindi Translation

`data-i18n` attribute wale elements pe Hindi translations add karna — `translations.hi` object mein.

---

## 📐 Code Standards

### HTML

```html
<!-- ✅ SAHI — Comment section clearly -->
<!-- ===== CALCULATOR NAME ===== -->
<div class="calc-section" id="sec-xyz" role="tabpanel">

<!-- ❌ GALAT — Koi comment nahi, unclear ID -->
<div id="x1">
```

```html
<!-- ✅ SAHI — CSS variables use karo -->
<div style="color:var(--accent); background:var(--surface);">

<!-- ❌ GALAT — Hardcoded colors -->
<div style="color:#c8821a; background:#ffffff;">
```

### CSS (index.html ke andar)

```css
/* ✅ SAHI — Mobile-first responsive */
.my-component { font-size: 14px; }
@media(max-width: 768px) { .my-component { font-size: 12px; } }

/* ❌ GALAT — Desktop-first ya koi responsive nahi */
.my-component { font-size: 14px; }
```

**Available CSS Variables (kabhi override mat karo):**

```css
--bg, --bg2, --surface, --surface2
--border, --border2
--text, --text2, --muted, --muted2
--accent, --accent2, --accent-bg        /* amber/gold — #c8821a */
--green, --green-bg, --green2
--red, --red-bg
--blue, --blue-bg
--purple, --purple-bg
--shadow, --shadow-lg
--radius, --radius-sm, --radius-lg
--font, --font-display
--header-bg
```

### JavaScript

```javascript
// ✅ SAHI — Helper functions use karo
const formatted = fmt(amount);        // ₹1,23,456
const formatted = fmtCr(amount);      // ₹1.23 Cr
const element = $('element-id');      // document.getElementById shorthand
const value = val('input-id');        // parseFloat value

// ✅ SAHI — Live calc pattern follow karo
function calcXXX() {
  const input = val('xxx-input');
  if(!input) return;
  // ... calculation ...
  $('xxx-result').classList.add('show');
  if(typeof trackCalc === 'function') trackCalc('XXX');
}

// ❌ GALAT — Direct DOM manipulation bina helpers ke
document.getElementById('x').innerHTML = '₹' + (Math.round(n)).toLocaleString('en-IN');
```

### Blog Posts

```html
<!-- ✅ SAHI — Same CSS variables, same structure -->
<div class="highlight-box">
  <strong>💡 Key Insight:</strong> Content yahan...
</div>

<!-- ✅ SAHI — Data tables scrollable on mobile -->
<div class="data-table">
  <table>...</table>
</div>

<!-- ❌ GALAT — Inline styles jo theme se break karein -->
<div style="background:#fff; color:#000;">
```

---

## 🧪 Testing Checklist

Har PR submit karne se pehle yeh sab check karo:

### Calculator Tests
- [ ] Default values ke saath calculation correct hai
- [ ] Edge cases: `0`, negative numbers, very large numbers
- [ ] Live calc (slider/input sync) kaam kar raha hai
- [ ] Results box animate ho ke appear hota hai
- [ ] Dark mode mein chart colors correct hain
- [ ] Share button results show karta hai
- [ ] Save History kaam kar raha hai

### Mobile Tests (MANDATORY)
- [ ] iPhone SE (375px) pe overflow nahi hai
- [ ] Android (360px) pe sab readable hai
- [ ] Tables horizontally scroll ho rahe hain
- [ ] Buttons tap-friendly hain (min 44px)
- [ ] Calculator tabs scroll ho rahe hain
- [ ] Sidebar desktop pe hai, mobile pe neeche hai

### Blog Post Tests
- [ ] Dark mode mein sab readable hai
- [ ] Progress bar scroll ke saath move karta hai
- [ ] FAQ accordion open/close hota hai
- [ ] Share buttons sahi URL share karte hain
- [ ] Related cards links sahi pages pe jaate hain
- [ ] Canonical URL correct hai
- [ ] Schema markup valid hai (schema.org validator se)

### SEO Tests
- [ ] Title tag 60 characters se kam hai
- [ ] Meta description 160 characters se kam hai
- [ ] Canonical URL set hai
- [ ] OG tags complete hain
- [ ] Schema markup add kiya hai

---

## 📝 Blog Contributions

Blog likhne ke liye **yeh exact template follow karo** — structure, CSS classes, sab same rakhna hai.

### Blog File Banane ke Steps

```bash
# Step 1: Reference file copy karo
cp blog/iran-war-india-impact-2026.html blog/YOUR-TOPIC-2026.html

# Step 2: Yeh cheezein replace karo:
# - <title> tag
# - meta description, keywords
# - canonical URL
# - og:url, og:title, og:description
# - JSON-LD schema (headline, url, datePublished, description)
# - Article title (h1)
# - Article meta (date, read time)
# - Breadcrumb last item
# - Share button URLs
# - All article content
# - Related articles (relevant blogs link karo)
# - Footer links (same rakhna)
```

### Blog SEO Checklist

| Element | Requirement | Example |
|---------|------------|---------|
| Title | 50-60 chars, keyword first | `SSY Calculator 2026 — Sukanya Samriddhi Yojana Complete Guide` |
| Meta Desc | 150-160 chars, CTA include | `SSY 2026 interest rate 8.2%...` |
| H1 | Exact title match | Same as title |
| H2s | 6-10 sections, keywords | `SSY Interest Rate History` |
| Word Count | Minimum 2,000 words | More = better ranking |
| Internal Links | 3-5 min | Link to related calculators |
| Schema | BlogPosting + FAQPage | Copy from reference |

### Blog Content Requirements (AdSense ke liye)

Google AdSense "Low Value Content" reject karta hai. Content mein yeh hona **ZARURI** hai:

- ✅ **Original data** — actual numbers, real statistics
- ✅ **Expert analysis** — sirf facts nahi, insights bhi
- ✅ **Practical examples** — real rupee amounts ke saath
- ✅ **Tables/Charts** — visual data
- ✅ **FAQs** — minimum 5, schema markup ke saath
- ✅ **Author bio** — Satyam Kumar ka section
- ✅ **Last updated date** — recent content signal

---

## 🔄 Pull Request Process

### PR Title Format

```
feat: [Calculator] PPF Calculator with maturity chart
fix: [Blog] Iran War blog filename 404 error
blog: [New Post] SSY Sukanya Samriddhi Guide 2026
ui: [Mobile] Fix tab scroll overflow on small screens
seo: [Sitemap] Add new blog URLs to sitemap.xml
chore: [SW] Cache version bump to v4
```

### PR Description Template

```markdown
## What does this PR do?
Brief description...

## Type of Change
- [ ] Bug fix
- [ ] New calculator
- [ ] New blog post
- [ ] UI improvement
- [ ] SEO improvement
- [ ] Other

## Screenshots (Mobile)
<!-- Mobile screenshot attach karo — mandatory for UI changes -->

## Testing Done
- [ ] Tested on mobile (375px)
- [ ] Tested in dark mode
- [ ] Tested with 0/edge case values
- [ ] Sitemap updated (if new page added)
- [ ] Feed.xml updated (if new blog added)

## Checklist
- [ ] No hardcoded colors (only CSS variables)
- [ ] No new external dependencies added
- [ ] Mobile responsive
- [ ] Dark mode compatible
```

### Review Process

1. PR submit karo
2. **Automated checks** run honge (GitHub Actions)
3. **Maintainer review** — usually 24-48 hours
4. **Changes requested** honge toh fix karo
5. **Approved** → Merge → GitHub Pages pe live (2-5 min)

---

## 🐛 Bug Reports

Bug mila? [New Issue](https://github.com/S2zxx0zxx/financeCalculator-Ind-v6.0-/issues/new) pe yeh format use karo:

```markdown
**Bug Description**
EMI calculator wrong result de raha hai...

**Steps to Reproduce**
1. EMI tab open karo
2. Principal: 50,00,000
3. Rate: 8.5%
4. Tenure: 20 years
5. Calculate karo

**Expected Result**
EMI should be: ₹43,391

**Actual Result**
EMI showing: ₹4,339

**Device/Browser**
- Device: Samsung Galaxy S22
- Browser: Chrome 120
- Screen: 360px width

**Screenshots**
[attach screenshot]
```

---

## 💡 Feature Requests

Naya idea? [Feature Request](https://github.com/S2zxx0zxx/financeCalculator-Ind-v6.0-/issues/new) pe:

```markdown
**Feature Description**
PPF Calculator add karo...

**Why is this needed?**
PPF India ka most popular tax-saving instrument hai, currently koi calculator nahi hai site pe.

**Proposed Solution**
New tab "PPF" add karo with:
- Annual investment input (₹500 - ₹1,50,000)
- Tenure (15 years fixed, optional extension)
- Current interest rate (8.2% p.a.)
- Maturity amount calculation
- Year-by-year table
- Tax savings (80C benefit show karo)

**Additional Context**
Reference: https://www.nsiindia.gov.in/
```

---

## ⚠️ What NOT to Contribute

Inhe accept nahi karenge:

| ❌ Not Accepted | Reason |
|----------------|--------|
| React/Vue/Angular conversion | Philosophy ke against |
| New npm dependencies | Zero-dependency rule |
| Design system change | Brand consistency |
| Calculator result manipulation | Financial accuracy |
| Fake/incorrect financial data | User trust |
| Spammy blog content | AdSense compliance |
| AI-generated blogs (unchecked) | Quality standard |
| Breaking change without discussion | Stability |

---

## 🏆 Contributors

FinCalc India ke sabse important contributors:

<table>
<tr>
<td align="center">
<img src="https://github.com/S2zxx0zxx.png" width="80px" style="border-radius:50%"/><br>
<strong>Satyam Kumar</strong><br>
<sub>🏗️ Founder & Maintainer</sub><br>
<a href="https://twitter.com/satzzxzxx">𝕏 Twitter</a> ·
<a href="https://github.com/S2zxx0zxx">GitHub</a>
</td>
</tr>
</table>

**Tum bhi yahan ho sakte ho!** First contribution karo aur contributors list mein add ho jao.

---

## 📜 License

FinCalc India **MIT License** ke under open source hai.

Matlab:
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ Liability — koi nahi
- ❌ Warranty — koi nahi

Sirf ek rule: **Copyright notice preserve karna** (`© 2026 FinCalc India · Built by Satzzxzxx`).

---

## 💬 Contact & Community

| Platform | Link | Purpose |
|----------|------|---------|
| 🐛 GitHub Issues | [Issues](https://github.com/S2zxx0zxx/financeCalculator-Ind-v6.0-/issues) | Bugs & Feature Requests |
| ✈️ Telegram | [@InvestGrow_IN](https://t.me/InvestGrow_IN) | Community & Updates |
| 𝕏 Twitter | [@satzzxzxx](https://twitter.com/satzzxzxx) | Announcements |
| 📸 Instagram | [@__.satzzxzxx](https://www.instagram.com/__.satzzxzxx) | Behind the Scenes |

---

<div align="center">

**Agar FinCalc India se aapko faida hua, toh ⭐ star zaroor do!**

*Yeh project 100% free hai, ads-free, no signup — sirf isliye ki har Indian ko best financial tools milein.*

[![Star on GitHub](https://img.shields.io/github/stars/S2zxx0zxx/financeCalculator-Ind-v6.0-?style=for-the-badge&color=c8821a)](https://github.com/S2zxx0zxx/financeCalculator-Ind-v6.0-)

**Made with ❤️ for India 🇮🇳 by [Satzzxzxx](https://satzzxzxx.me)**

</div>
