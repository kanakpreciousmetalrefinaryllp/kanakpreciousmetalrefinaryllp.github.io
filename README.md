# Kanak Precious Metal Refinery LLP — Website (v3.0)

A premium, luxury, highly-animated single-page corporate website — **Purity · Precision · Trust**.

Pure **static** site (HTML + CSS + JavaScript). No build step. Animation libraries load from CDN with
graceful offline fallbacks, so it works on any static host (GitHub Pages, Cloudflare Pages, Netlify).

---

## ▶️ Run it

**Just open `index.html`** in a browser, or use a tiny local server (recommended):

```bash
python -m http.server 8000     # → http://localhost:8000
```

> Web fonts, the Google Map, and the animation libraries (AOS, Swiper, Lenis, CountUp) load from the
> internet. Offline, the site still works — animations simply fall back to a static, visible state.

---

## 🎨 Add your logo

Save your circular emblem as **`logo.png`** (same folder as `index.html`). It appears automatically in
the loader, header and footer. Until then, `logo.svg` (a built-in circular fallback) is shown.

- A square PNG works best (it's masked into a circle). ~256×256 or larger.
- Replace `favicon.svg` to change the browser tab icon.

---

## 📁 Files (flat structure)

```
index.html    → all sections + CDN library links
styles.css    → design system + every component (gold + burgundy on near-black)
content.js    → data: process, why-us, leadership, history, gallery, testimonials  (edit content here)
main.js       → loader, smooth scroll, live rates, typing, counters, sliders, forms  (settings at top)
logo.png      → ← your logo (add this)      logo.svg → fallback      favicon.svg → tab icon
photo-goldbars.jpg · photo-bullion.jpg · photo-jewellery.jpg · photo-earrings.jpg → real photos
forging.svg · scrap.svg · refining.svg · casting.svg → scene artwork (also used as photo fallbacks)
```

### Photos
Real photography is used for the hero, About panel and gallery (free-license stock, bundled so the
site works offline). Each `<img>` falls back to a matching scene illustration if a photo is missing.
To use your own facility photos, just replace the `photo-*.jpg` files (keep the same names), or point
the `src` in `index.html` / `content.js` at your image.

---

## ✏️ Edit content

- **Leadership, process steps, why-us, history (1969→2026), testimonials, gallery** → arrays at the top
  of `content.js`. Change the text, refresh — done.
- **Hero text, headline typing words** → `main.js` (`words = [...]`) and `index.html` hero section.
- **Contact details** (already set): phone `+91 98241 53695`, email
  `info@kanakpreciousmetalrefinaryllp.com`, address *111 Mahagujarat Industrial Estate, Moraiya,
  Sanand, Ahmedabad, Gujarat 382213*. Search-replace in `index.html` to change.
- **Colours & fonts** → CSS variables at the top of `styles.css` (`:root { … }`).
  Palette: gold `#C9A227`, bright `#FFD700`, burgundy `#7C1F2C`, black `#0B0B0B`, bg `#111111`.
  Fonts: Playfair Display (headings), Montserrat (labels), Poppins (body), Space Grotesk (numbers).

---

## ⚙️ Settings (top of `main.js`)

```js
var METALS_API_URL = '';   // feed returning { gold24, gold22, silver, platinum } as INR per gram. Empty = live simulation.
var FORM_ENDPOINT  = '';   // form POST endpoint (e.g. Formspree). Empty = opens the visitor's email app.
var EMAIL          = 'info@kanakpreciousmetalrefinaryllp.com';
```

- **Forms** open a pre-filled email when no endpoint is set (works with zero backend).

### 💰 How live prices work (and their source)

Prices are **fetched live in the browser** and shown in **₹ per gram and per 10 gram** (Indian style):

1. **International spot** (USD / troy oz) for gold, silver & platinum →
   **[gold-api.com](https://gold-api.com)** (free, no API key, CORS-enabled).
2. **Live USD → INR** → **[open.er-api.com](https://open.er-api.com)** (free, no key).
3. **Conversion:** `spot_usd_per_oz ÷ 31.1035 × USD_INR × (1 + INDIA_PREMIUM)`
   where `INDIA_PREMIUM` (default **9%**) approximates **import duty (~6%) + GST (~3%)**.
4. **Gold 22K** = Gold 24K × 0.916. **Per 10 g** = per gram × 10.
5. **"Today's change"** is measured from the first price seen each day (stored in the browser),
   so it reads 0.00% right after the day's first load, then moves with the market.

The exact source and premium are shown **on the page**, under the price cards.

> ⚠️ **Important:** this is an **international-spot-based estimate + standard duty/GST**. It will be
> *close* to Indian rates but **not identical** to your local IBJA / jeweller quote (which also carries
> city premiums, making charges, etc.). To make it exact you have three options — all at the top of the
> rates block in `main.js`:
> - **Tune `INDIA_PREMIUM`** (e.g. `0.11`) until it matches your city's rate, **or**
> - **Set `USE_LIVE = false`** and edit `OFFLINE_GRAM` with your own ₹/gram numbers (update daily), **or**
> - **Point `METALS_API_URL`** at your own/paid Indian feed returning `{ gold24, gold22, silver, platinum }` in ₹/gram.
>
> If the live fetch fails (offline), a clearly-labelled static estimate is shown instead.

---

## ✨ What's included

Premium **loader** (gold fill 0→100%) · sticky **glass header** with magnetic buttons · cinematic
**hero** (rotating background, typing headline, floating gold particles, scroll cue) · live-rate
**ticker** · animated **price cards** with sparklines · floating **live-price widget** · **material-
streams marquee** · animated **counters** · interactive **6-step process timeline** with drawing gold
line · **flip hexagon** "Why Us" cards · **About** with 1969→2026 heritage timeline · **Executive
Leadership** (4 directors) · company **highlights** · **gallery** slider (Swiper) · **testimonials**
slider · **CTA** with animated gold waves · **contact** with floating-label form + glass map · **footer**
with gold particles + newsletter · **floating** WhatsApp / scroll-progress ring / back-to-top · **mobile
bottom bar** (Call · WhatsApp · Direction) · film-grain texture · full SEO meta + Organization JSON-LD.

**Libraries (CDN):** AOS · Swiper · Lenis (smooth scroll) · CountUp — all optional, guarded, with fallbacks.

© Kanak Precious Metal Refinery LLP. Replace any placeholder figures before going live.
