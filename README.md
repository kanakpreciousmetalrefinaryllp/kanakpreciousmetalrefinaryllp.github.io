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

### Extra files for mobile / SEO
```
manifest.json   → makes the site installable ("Add to Home Screen")
sw.js           → service worker (offline caching + install support)
robots.txt      → tells search engines to index the site
sitemap.xml     → helps search engines discover the page
```

---

## 📱 Mobile & "Add to Home Screen"

Built mobile-first (90% of visitors are on phones):
- Fully responsive down to small phones, comfortable 48px+ tap targets, safe-area handling for
  notches, real-viewport height (no address-bar jump), and a **sticky bottom bar** (Call · WhatsApp ·
  Direction) on phones.
- **"Why Us" cards flip on tap** (mobile) as well as hover (desktop).
- Full **mobile meta tags**: `viewport-fit=cover`, `theme-color`, Apple web-app tags, etc.

**Add to Home Screen** works once the site is on **HTTPS** (GitHub Pages, Cloudflare, Netlify all
provide it — it won't work from a plain `file://` open):
- Android/Chrome: menu ⋮ → *Add to Home screen / Install app*.
- iPhone/Safari: Share → *Add to Home Screen*.
- It then opens full-screen like an app, using your `logo.png` as the icon.
  👉 For the crispest icon, provide a **square `logo.png` (512×512)** — the manifest references it.

## 🔎 SEO

- Keyword-rich, **locally-targeted** title, description & keywords (e.g. "gold refinery in Ahmedabad",
  "today gold rate Ahmedabad", "gold assaying laboratory Sanand").
- **LocalBusiness structured data** (JSON-LD) with address, geo-coordinates, opening hours, area
  served and founders — helps Google Business / Maps and rich results.
- `robots.txt` + `sitemap.xml`, canonical URL, Open Graph & Twitter cards (using a real gold photo).
- **Before going live:** if your final domain isn't `kanakpreciousmetalrefinaryllp.com`, update it in
  the `<link rel="canonical">` + Open Graph URLs in `index.html`, in `robots.txt`, and in `sitemap.xml`.
  Then submit the site in **Google Search Console** and create a **Google Business Profile** for the
  strongest local ranking.

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
var METALS_API_URL = '';   // override live prices with your own ₹/gram feed. Empty = auto live (default).
var WEB3FORMS_KEY  = '';    // EASIEST way to receive inquiries by email (see below).
var FORM_ENDPOINT  = '';    // OR a Formspree/custom endpoint URL.
var EMAIL          = 'info@kanakpreciousmetalrefinaryllp.com';
var SMOOTH_SCROLL  = false; // false = fast native scrolling (recommended). true = eased momentum feel.
```

### 📥 Contact form — where inquiries go & how to read them

By default (nothing configured) the form **opens the visitor's email app** pre-filled to your address —
which only works if that visitor has email set up and actually presses *Send*. **Not reliable.** Pick one
of these to actually *receive and read* every inquiry:

**Option A — Web3Forms (easiest, ~30 seconds, no signup):**
1. Go to **[web3forms.com](https://web3forms.com)**, type your email (`info@kanakpreciousmetalrefinaryllp.com`), get an **Access Key** emailed to you instantly.
2. Paste it into `WEB3FORMS_KEY` in `main.js`.
3. ✅ Every inquiry now arrives **in your email inbox** automatically. That inbox *is* where you read them.
   (Free: 250 submissions/month.)

**Option B — Formspree (adds an online dashboard):**
1. Sign up at **[formspree.io](https://formspree.io)**, create a form, set the notification email to yours.
2. Copy the endpoint (looks like `https://formspree.io/f/abcwxyz`) into `FORM_ENDPOINT`.
3. ✅ Inquiries arrive by **email** *and* are listed/searchable in the **Formspree dashboard**.
   (Free: 50 submissions/month.)

Both work on GitHub Pages / any static host with no server of your own. `WEB3FORMS_KEY` takes priority if
both are set. On success the button shows "✓ Received"; on failure it prompts to try email.

### 💰 How live prices work (and their source)

Prices are **fetched live in the browser** and shown in **₹ per gram and per 10 gram** (Indian style):

1. **International spot** (USD / troy oz) for gold, silver & platinum →
   **[gold-api.com](https://gold-api.com)** (free, no API key, CORS-enabled).
2. **Live USD → INR** → **[open.er-api.com](https://open.er-api.com)** (free, no key).
3. **Conversion:** `spot_usd_per_oz ÷ 31.1035 × USD_INR × (1 + INDIA_PREMIUM)`
   where `INDIA_PREMIUM` (default **0.16 = 16%**) covers **import duty + GST + local market premium**.
   Indian city retail rates run consistently above pure landed cost, so 16% (not just 9% duty+GST) is
   what actually matches real quotes — it's **calibrated to a real Bhopal 24K rate** (₹1,45,360/10g).
4. **Gold 22K** = Gold 24K × 0.916. **Per 10 g** = per gram × 10.
5. **"Today's change"** is measured from the first price seen each day (stored in the browser),
   so it reads 0.00% right after the day's first load, then moves with the market.

The exact source and premium are shown **on the page**, under the price cards.

> 🔧 **Keeping it accurate:** Indian retail rates vary by city and don't follow one clean formula, so the
> `INDIA_PREMIUM` is a calibration factor. To re-tune it any day, take your local **24K per-10g** rate and
> your current pure-spot value and set:
> `INDIA_PREMIUM = (local_24K_per_10g ÷ pure_spot_24K_per_10g) − 1`.
> As gold moves, the % premium stays roughly constant, so the page tracks the market automatically.
> Other options: set `USE_LIVE = false` and edit `OFFLINE_GRAM` with fixed ₹/gram numbers, or point
> `METALS_API_URL` at your own/paid Indian feed returning `{ gold24, gold22, silver, platinum }` in ₹/gram.
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
