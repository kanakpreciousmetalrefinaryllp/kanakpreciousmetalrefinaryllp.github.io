# Kanak Precious Metal Refinery — Website

A premium, fully **static** website for **Kanak Precious Metal Refinery LLP** — precious metal
recycling, refining, recovery, assaying and bullion trading.

**No build step. No dependencies. No Node.js.** Just plain HTML, CSS and JavaScript — open it in a
browser or drop the folder on any static host (GitHub Pages, Cloudflare Pages, Netlify, any web
server).

---

## ▶️ How to run

**Option A — just open it:** double-click `index.html`.
(Live rates, animations and forms all work. The Google Map and web fonts need internet.)

**Option B — local server (recommended, avoids browser file:// quirks):**

```bash
# Python (built into most systems)
python -m http.server 8000
# then open http://localhost:8000

# …or Node, if you have it
npx serve
```

---

## 🎨 Add your real logo

The header and footer look for **`assets/logo.png`**. Save your company logo image there and it will
appear automatically. Until you do, a built-in SVG version (`assets/logo.svg`) is shown as a
fallback, so nothing ever looks broken.

- Recommended: a PNG with a **transparent or white background**, roughly 460×150px (it sits on a
  light rounded plaque, so white backgrounds look fine).
- To swap the browser tab icon, replace `assets/favicon.svg`.

---

## 📁 Structure

```
kanakwebsite/
├── index.html          # The whole single-page site
├── css/
│   └── styles.css      # Design system + all styling (dark + gold + burgundy)
├── js/
│   ├── content.js      # Data for process, industries, products, certs, FAQs (edit content here)
│   └── main.js         # Interactions: rates, animations, carousel, filters, forms
├── assets/
│   ├── logo.png        # ← drop your logo here
│   ├── logo.svg        # fallback logo
│   └── favicon.svg     # browser icon
├── .nojekyll           # lets GitHub Pages serve the folder as-is
└── README.md
```

---

## ✏️ Editing content

- **Text in the main sections** (hero, about, services, contact, footer) → edit `index.html`.
- **Process steps, industries, products, certificates, FAQs** → edit the arrays at the top of
  `js/content.js`. Each is a plain list of objects — change the text and it updates on refresh.
- **Colours, spacing, fonts** → CSS variables at the top of `css/styles.css` (`:root { … }`).
- **Contact details / phone / email / WhatsApp** → search-and-replace in `index.html`
  (e.g. `+91 22 4000 1234`, `info@kanakrefinery.com`, the `wa.me/919820012345` link).

---

## ⚙️ Optional integrations (in `js/main.js`)

```js
var METALS_API_URL = '';   // a URL returning { gold, silver, platinum, palladium } USD/oz
var FORM_ENDPOINT  = '';   // a form POST endpoint (e.g. Formspree). Empty = opens email instead
var SALES_EMAIL    = 'trade@kanakrefinery.com';
```

- **Live rates:** with `METALS_API_URL` empty, the site shows realistic simulated prices that
  fluctuate and auto-refresh every 60s. Set a real endpoint to go live.
- **Contact form:** with `FORM_ENDPOINT` empty, submitting opens the visitor's email client
  pre-filled to `SALES_EMAIL`. Set a Formspree/Worker URL to capture submissions server-side.

---

## 🚀 Deploy to GitHub Pages

1. Create a repository and push these files (keep the `.nojekyll` file).
2. Repository **Settings → Pages → Source: Deploy from branch**, pick your branch and `/ (root)`.
3. Your site goes live at `https://<user>.github.io/<repo>/`.

No configuration needed — every link is a relative anchor, so it works from any sub-path.

---

## ✅ What's included

Single-page experience with: sticky nav + mobile drawer, live-rates ticker & cards with
sparklines, hero, about, metals grid, services, **12-stage animated refining process**, accredited
laboratory, industries, animated stat counters, products with category filters, certifications,
testimonial carousel, FAQ accordion, contact form with map, WhatsApp float, scroll-to-top, and full
SEO meta + Organization JSON-LD.

© Kanak Precious Metal Refinery LLP. Replace placeholder legal/contact details before going live.
