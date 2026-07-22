/* ============================================================
   KANAK — interactions (vanilla JS + guarded CDN libraries)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Config ---------- */
  // Live gold/silver rates stream from the Aarav Bullion feed — see the
  // "LIVE metal rates" section below (FEED_URL / FEED_ID / REFRESH_MS).
  // === CONTACT FORM — where inquiries go (pick ONE; easiest first) ===
  // 1) EASIEST: paste a free Web3Forms access key (get it in 30s at https://web3forms.com —
  //    just enter your email, no signup). Inquiries then arrive in your email inbox automatically.
  var WEB3FORMS_KEY = '';
  // 2) OR a Formspree / custom endpoint URL (POSTs JSON of the form fields).
  var FORM_ENDPOINT = '';
  // 3) If BOTH are empty, the form opens the visitor's email app (mailto) pre-filled.
  var EMAIL = 'info@kanakpreciousmetalrefinaryllp.com';

  // Smooth-scroll momentum (Lenis). false = fast native scrolling (recommended). true = eased/premium feel.
  var SMOOTH_SCROLL = false;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     Loader
     ============================================================ */
  var loader = $('#loader'), fill = $('#loaderFill'), pct = $('#loaderPct');
  var p = 0;
  var li = setInterval(function () {
    p += Math.random() * 18 + 6;
    if (p >= 100) { p = 100; clearInterval(li); setTimeout(hideLoader, 350); }
    if (fill) fill.style.width = p + '%';
    if (pct) pct.textContent = Math.floor(p) + '%';
  }, 180);
  var hidden = false;
  function hideLoader() {
    if (hidden) return; hidden = true;
    if (loader) loader.classList.add('done');
    document.body.classList.remove('loading');
    startHero();
  }
  // safety: never trap the page
  setTimeout(hideLoader, 3500);

  /* ============================================================
     Smooth scroll (Lenis) — guarded
     ============================================================ */
  var lenis = null;
  if (SMOOTH_SCROLL && typeof Lenis !== 'undefined' && !reduce) {
    try {
      lenis = new Lenis({ duration: 0.8, lerp: 0.12, smoothWheel: true, wheelMultiplier: 1.1 });
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    } catch (e) { lenis = null; }
  }
  // anchor smooth scrolling that works with or without Lenis
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      closeDrawer();
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ============================================================
     AOS — guarded + offline fallback
     ============================================================ */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 450, once: true, offset: 30, delay: 0, easing: 'ease-out', disable: reduce });
  } else {
    document.documentElement.classList.add('no-aos');
  }

  /* ============================================================
     Header scroll + mobile drawer
     ============================================================ */
  var header = $('#header');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 20);
    var ring = $('#progressRing'); if (ring) ring.classList.toggle('show', y > 500);
    var pw = $('#priceWidget'); if (pw) pw.classList.toggle('show', y > 700);
    updateProgress();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var drawer = $('#drawer'), toggle = $('#navToggle');
  function closeDrawer() { if (drawer) drawer.classList.remove('open'); }
  if (toggle) toggle.addEventListener('click', function () { drawer.classList.toggle('open'); });

  /* ============================================================
     Scroll progress ring + back to top
     ============================================================ */
  var bar = $('#ringBar');
  var CIRC = 2 * Math.PI * 22;
  if (bar) { bar.style.strokeDasharray = CIRC; bar.style.strokeDashoffset = CIRC; }
  function updateProgress() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var r = h > 0 ? window.scrollY / h : 0;
    if (bar) bar.style.strokeDashoffset = CIRC * (1 - r);
  }
  var toTop = $('#toTop');
  if (toTop) toTop.addEventListener('click', function () { lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ============================================================
     Magnetic buttons + ripple (desktop)
     ============================================================ */
  if (window.matchMedia('(pointer:fine)').matches) {
    $$('.magnetic').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * .25 + 'px,' + (e.clientY - r.top - r.height / 2) * .35 + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }
  $$('.btn').forEach(function (b) {
    b.addEventListener('click', function (e) {
      var r = b.getBoundingClientRect();
      var s = document.createElement('span'); s.className = 'ripple';
      var d = Math.max(r.width, r.height);
      s.style.width = s.style.height = d + 'px';
      s.style.left = (e.clientX - r.left - d / 2) + 'px';
      s.style.top = (e.clientY - r.top - d / 2) + 'px';
      b.appendChild(s); setTimeout(function () { s.remove(); }, 600);
    });
  });

  /* ============================================================
     Hero: typing + background slider + particles
     ============================================================ */
  function startHero() {
    typeLoop();
    heroSlides();
  }
  var typeEl = $('#typed');
  var words = ['Precious Metal Refinery', 'Gold & Silver Recovery', 'Purity You Can Trust'];
  function typeLoop() {
    if (!typeEl) return;
    var wi = 0;
    function type() {
      var w = words[wi], i = 0;
      var t = setInterval(function () {
        typeEl.textContent = w.slice(0, ++i);
        if (i >= w.length) {
          clearInterval(t);
          setTimeout(erase, 2000);
        }
      }, 70);
      function erase() {
        var e = setInterval(function () {
          typeEl.textContent = w.slice(0, --i);
          if (i <= 0) { clearInterval(e); wi = (wi + 1) % words.length; setTimeout(type, 300); }
        }, 40);
      }
    }
    type();
  }
  function heroSlides() {
    var slides = $$('.hero__slide');
    if (slides.length < 2) return;
    var idx = 0; slides[0].classList.add('active');
    setInterval(function () {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 5000);
  }

  // gold particles
  function particles(host, n) {
    if (!host || reduce) return;
    var h = '';
    for (var i = 0; i < n; i++) {
      var sz = 1.5 + Math.random() * 3;
      h += '<span style="left:' + (Math.random() * 100) + '%;top:' + (50 + Math.random() * 55) + '%;width:' + sz + 'px;height:' + sz + 'px;animation-duration:' + (6 + Math.random() * 8) + 's;animation-delay:' + (Math.random() * 8) + 's"></span>';
    }
    host.innerHTML = h;
  }
  particles($('#heroParticles'), 34);
  particles($('#footParticles'), 20);

  /* ============================================================
     LIVE metal rates — AHMEDABAD (₹ per gram / 10 gram / kg)
     ------------------------------------------------------------
     HOW THE PRICE IS FETCHED & DISPLAYED
       1. Real local Ahmedabad rates are streamed from the Aarav Bullion
          broadcast feed (FEED_URL). A fresh, un-cached request is made every
          REFRESH_MS (5 seconds) — each URL is unique (?_=timestamp) so no
          proxy/browser cache can serve a stale price.
       2. The feed is a TAB-separated text table, one metal per line:
              <id> <tab> <name> <tab> <rate> <tab> <ask> <tab> <high> <tab> <low>
          The first three rows (Gold($), Silver, USD) are USD spot prices; the
          rest are the live INR rates we display.
       3. Rows are mapped to the cards by their numeric id (see FEED_ID):
              Gold 24K = "GOLD 999 IMP (AMD)"  — quoted per 10 gram  → ÷10 = ₹/g
              Silver   = "SILVER 999 GGC-1KG"  — quoted per kg       → ÷1000 = ₹/g
              Gold 22K = Gold 24K × 0.916 (the feed has no 22K line).
       4. "Today's change" is measured from the first price seen each calendar
          day (remembered in the browser via localStorage).
     If the live fetch fails (e.g. offline) a clearly-labelled static estimate
     is shown instead. To retarget a card at a different feed row, just change
     the id in FEED_ID below (ids are stable across the feed).
     ============================================================ */
  // Aarav Bullion live broadcast feed (CORS-open, no key). ?_=timestamp is
  // appended on every request so each poll returns a fresh, uncached price.
  var FEED_URL = 'https://bcast.aaravbullion.in/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/aarav';
  // Which feed row (by numeric id) drives each metal. Change these to switch
  // between Ahmedabad / Rajkot / import / SAM-BIS quotes.
  var FEED_ID = {
    gold24_per10g: 2148,   // 2148 GOLD 999 IMP (AMD)   — per 10g   (2252 = SAM/BIS AMD)
    silver_perkg: 2259     // 2259 SILVER 999 GGC-1KG   — per kg    (2174 = PETI 30kg)
  };
  var REFRESH_MS = 5000;          // poll the feed every 5 seconds
  var CITY = 'Ahmedabad';          // city name shown with the live rates

  var METALS = [
    { key: 'gold24', name: 'Gold 24K', color: '#d4af37', factor: 1 },
    { key: 'gold22', name: 'Gold 22K', color: '#e6c766', factor: 0.916 },
    { key: 'silver', name: 'Silver', color: '#c0c0c0', factor: 1 }
  ];
  var OFFLINE_GRAM = { gold24: 15089, gold22: 13822, silver: 235 }; // fallback only
  var lastGram = {};

  function dayOpen(key, val) {
    try {
      var k = 'kanak_open_' + key + '_' + new Date().toISOString().slice(0, 10);
      var s = localStorage.getItem(k);
      if (s == null) { localStorage.setItem(k, val); return val; }
      return parseFloat(s);
    } catch (e) { if (lastGram[key] == null) lastGram[key] = val; return lastGram[key]; }
  }
  function finalize(m, gramNow) {
    var open = dayOpen(m.key, gramNow), chg = gramNow - open;
    return { key: m.key, name: m.name, color: m.color, gram: Math.round(gramNow), per10: Math.round(gramNow * 10), perkg: Math.round(gramNow * 1000), change10: Math.round(chg * 10), pct: open ? Math.round(chg / open * 10000) / 100 : 0 };
  }
  // Parse the tab-separated broadcast feed into a map keyed by numeric row id.
  // Each line: <id> <tab> <name> <tab> <rate> <tab> <ask> <tab> <high> <tab> <low>
  // (a leading/trailing tab produces empty cells, which we drop).
  function parseFeed(txt) {
    var map = {};
    txt.split(/\r?\n/).forEach(function (line) {
      var c = line.split('\t').map(function (s) { return s.trim(); })
        .filter(function (s) { return s !== ''; });
      if (c.length < 3) return;                 // need at least id, name, rate
      var id = c[0], rate = parseFloat(c[2]);
      if (!/^\d+$/.test(id) || isNaN(rate)) return;
      map[id] = { name: c[1], rate: rate, high: parseFloat(c[4]) || rate, low: parseFloat(c[5]) || rate };
    });
    return map;
  }
  // Turn a parsed feed into the {gold24, gold22, silver} cards (all ₹ / gram).
  function ratesFromFeed(map) {
    var g = map[FEED_ID.gold24_per10g];   // quoted per 10 gram
    var s = map[FEED_ID.silver_perkg];    // quoted per kg
    if (!g || !s) throw new Error('feed row missing');
    var gold24gram = g.rate / 10, silvergram = s.rate / 1000;
    var gram = { gold24: gold24gram, gold22: gold24gram * 0.916, silver: silvergram };
    return { rates: METALS.map(function (m) { return finalize(m, gram[m.key]); }), live: true };
  }
  function fallbackSim() {
    var mn = new Date().getMinutes();
    return { rates: METALS.map(function (meta, i) { return finalize(meta, OFFLINE_GRAM[meta.key] * (1 + Math.sin((mn + i) / 3) * .004)); }), live: false };
  }
  function getRates() {
    return fetch(FEED_URL + '?_=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw 0; return r.text(); })
      .then(function (t) { return ratesFromFeed(parseFeed(t)); })
      .catch(function () { return fallbackSim(); });
  }
  function inr(n) { return '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 }); }
  function arrow(up) { return up ? '▲' : '▼'; }
  function spark(base, up) {
    var w = 96, h = 34, n = 20, pts = [], v = base * .985;
    for (var i = 0; i < n; i++) { v += (Math.sin(i / 3) + (Math.random() - .5)) * base * .005; v = Math.max(base * .96, Math.min(base * 1.03, v)); pts.push(v); }
    var mn = Math.min.apply(null, pts), mx = Math.max.apply(null, pts), rg = (mx - mn) || 1;
    var d = pts.map(function (pp, i) { return (i ? 'L' : 'M') + (i / (n - 1) * w).toFixed(1) + ',' + (h - (pp - mn) / rg * h).toFixed(1); }).join(' ');
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '"><path d="' + d + '" fill="none" stroke="' + (up ? '#37d39a' : '#ff6b7d') + '" stroke-width="1.6"/></svg>';
  }

  /* View state for the toggles: gold purity + silver unit */
  var view = { gold: '24', silverKg: false };
  var lastRates = null, lastLive = false, lastT = '';
  function rateOf(key) { return (lastRates || []).filter(function (r) { return r.key === key; })[0]; }

  function priceCard(name, color, gram, bigVal, suffix, change, pct) {
    var u = change >= 0;
    return '<div class="price-card glass lift">' +
      '<span class="price-card__time"><span class="dot' + (lastLive ? '' : ' off') + '"></span>' + (lastLive ? '' : 'est · ') + lastT + '</span>' +
      '<div class="price-card__ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="' + color + '" opacity="0.9"/><circle cx="12" cy="12" r="9" fill="none" stroke="rgba(255,255,255,.4)"/></svg></div>' +
      '<h3>' + name + '</h3><div class="unit">' + inr(gram) + ' / gram</div>' +
      '<div class="val text-gold">' + bigVal + '<span style="font-size:.5em;color:var(--faint);font-family:var(--font-sub)"> ' + suffix + '</span></div>' +
      '<div class="price-card__foot"><span class="' + (u ? 'up' : 'down') + '">' + arrow(u) + ' ' + (u ? '+' : '−') + inr(Math.abs(change)) + ' (' + pct.toFixed(2) + '%)</span>' + spark(gram, u) + '</div></div>';
  }
  function paintCards() {
    var cg = $('#priceCards'); if (!cg || !lastRates) return;
    var g = rateOf(view.gold === '22' ? 'gold22' : 'gold24'), s = rateOf('silver');
    var out = [];
    if (g) out.push(priceCard(g.name, g.color, g.gram, inr(g.per10), '/ 10g', g.change10, g.pct));
    if (s) out.push(view.silverKg
      ? priceCard('Silver', s.color, s.gram, inr(s.perkg), '/ kg', s.change10 * 100, s.pct)
      : priceCard('Silver', s.color, s.gram, inr(s.per10), '/ 10g', s.change10, s.pct));
    cg.innerHTML = out.join('');
  }
  function paintWidget() {
    var pw = $('#pwBody'); if (!pw || !lastRates) return;
    var g = rateOf(view.gold === '22' ? 'gold22' : 'gold24'), s = rateOf('silver');
    pw.innerHTML = [g, s].filter(Boolean).map(function (r) {
      var u = r.change10 >= 0;
      var val = (r.key === 'silver' && view.silverKg) ? inr(r.perkg) : inr(r.per10);
      return '<div class="pw-row"><span class="m">' + r.name + '</span><span class="p">' + val + '</span><span class="c ' + (u ? 'up' : 'down') + '">' + (u ? '+' : '') + r.pct.toFixed(2) + '%</span></div>';
    }).join('');
  }
  function renderRates(res) {
    lastRates = res.rates; lastLive = res.live;
    lastT = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    var tk = $('#rateTicker');
    if (tk) { var one = res.rates.map(function (r) { var u = r.change10 >= 0; return '<span class="ticker__item"><b>' + r.name + '</b> ' + inr(r.per10) + '/10g <span class="' + (u ? 'up' : 'down') + '">' + arrow(u) + ' ' + Math.abs(r.pct).toFixed(2) + '%</span></span>'; }).join(''); tk.innerHTML = one + one; }
    paintCards();
    paintWidget();
    var src = $('#rateSrc');
    if (src) src.innerHTML = res.live
      ? 'Live ' + CITY + ' rates — Gold 999 &amp; Silver 999 · streamed from Aarav Bullion · refreshed every ' + (REFRESH_MS / 1000) + 's · updated ' + lastT
      : 'Offline estimate — live price feed unavailable. Figures are indicative only.';
    var wt = $('#pwTime'); if (wt) wt.textContent = (res.live ? 'Live · ' : 'Offline · ') + lastT;
  }

  // Wire the Gold 24K/22K and Silver 10g/kg toggles.
  $$('#rateToggles [data-gold]').forEach(function (b) {
    b.addEventListener('click', function () {
      view.gold = b.getAttribute('data-gold');
      $$('#rateToggles [data-gold]').forEach(function (x) { x.classList.toggle('on', x === b); });
      paintCards(); paintWidget();
    });
  });
  $$('#rateToggles [data-silver]').forEach(function (b) {
    b.addEventListener('click', function () {
      view.silverKg = b.getAttribute('data-silver') === 'kg';
      $$('#rateToggles [data-silver]').forEach(function (x) { x.classList.toggle('on', x === b); });
      paintCards(); paintWidget();
    });
  });
  function loadRates() {
    // Don't re-render (and reflow the page) while the visitor is typing in a
    // field — that was causing the form to "jump". Resume on the next tick.
    var ae = document.activeElement;
    if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return;
    getRates().then(renderRates);
  }
  loadRates(); setInterval(loadRates, REFRESH_MS);

  /* ============================================================
     Counters
     ============================================================ */
  var counted = false;
  function runCounters() {
    if (counted) return; counted = true;
    $$('[data-count]').forEach(function (el) {
      var end = parseFloat(el.getAttribute('data-count'));
      var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      if (typeof countUp !== 'undefined' && countUp.CountUp) {
        try { new countUp.CountUp(el, end, { decimalPlaces: dec, duration: 2, suffix: el.getAttribute('data-suffix') || '' }).start(); return; } catch (e) {}
      }
      // fallback
      var s = performance.now(), suf = el.getAttribute('data-suffix') || '';
      (function tick(t) { var pr = Math.min((t - s) / 1800, 1); var e = 1 - Math.pow(2, -10 * pr); el.textContent = (end * e).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; if (pr < 1) requestAnimationFrame(tick); })(s);
    });
  }
  var cSec = $('#counters');
  if (cSec) new IntersectionObserver(function (en, o) { en.forEach(function (e) { if (e.isIntersecting) { runCounters(); o.disconnect(); } }); }, { threshold: .3 }).observe(cSec);

  /* ============================================================
     Process line draw
     ============================================================ */
  var pline = $('#procLine');
  if (pline) new IntersectionObserver(function (en, o) { en.forEach(function (e) { if (e.isIntersecting) { pline.classList.add('draw'); o.disconnect(); } }); }, { threshold: .4 }).observe(pline);

  /* ============================================================
     Swiper sliders — guarded
     ============================================================ */
  if (typeof Swiper !== 'undefined') {
    if ($('#gallerySwiper')) new Swiper('#gallerySwiper', { slidesPerView: 1.15, spaceBetween: 18, loop: true, autoplay: { delay: 2600, disableOnInteraction: false }, breakpoints: { 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } } });
    if ($('#testiSwiper')) new Swiper('#testiSwiper', { slidesPerView: 1, spaceBetween: 24, loop: true, autoplay: { delay: 4500 }, pagination: { el: '#testiSwiper .swiper-pagination', clickable: true }, breakpoints: { 768: { slidesPerView: 2 } } });
  } else {
    document.documentElement.classList.add('no-swiper');
  }

  /* ============================================================
     Forms (mailto fallback) + newsletter
     ============================================================ */
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = $('button[type="submit"]', form), orig = btn ? btn.innerHTML : '';
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });
      var kind = form.getAttribute('data-lead') === 'news' ? 'Newsletter' : 'Enquiry';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      function ok() { if (btn) btn.textContent = '✓ Received — we’ll be in touch'; form.reset(); setTimeout(function () { if (btn) { btn.disabled = false; btn.innerHTML = orig; } }, 4500); }
      function fail() { if (btn) { btn.textContent = '⚠ Could not send — try email'; setTimeout(function () { btn.disabled = false; btn.innerHTML = orig; }, 4000); } }

      if (WEB3FORMS_KEY) {
        // Web3Forms — inquiries are emailed to your inbox automatically.
        data.access_key = WEB3FORMS_KEY;
        data.subject = 'Kanak Website — ' + kind + (data.name ? ' from ' + data.name : '');
        data.from_name = data.name || 'Kanak Website';
        fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { return r.json(); }).then(function (j) { j && j.success ? ok() : fail(); }).catch(fail);
      } else if (FORM_ENDPOINT) {
        fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { return r.ok ? ok() : fail(); }).catch(fail);
      } else {
        // No backend configured: open the visitor's email app pre-filled.
        var sub = encodeURIComponent('Kanak Website ' + kind + ' — ' + (data.name || ''));
        var body = encodeURIComponent(Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n'));
        window.location.href = 'mailto:' + EMAIL + '?subject=' + sub + '&body=' + body; ok();
      }
    });
  });

  /* ============================================================
     Active nav highlight + year
     ============================================================ */
  var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
  var secs = $$('section[id]'), links = $$('.nav__links a');
  if (secs.length && links.length) {
    var spy = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { spy.observe(s); });
  }

  onScroll();

  /* ============================================================
     Touch: tap the hexagon cards to flip (hover doesn't exist on mobile)
     ============================================================ */
  $$('.hex').forEach(function (h) {
    h.addEventListener('click', function () { h.classList.toggle('flipped'); });
  });

  /* ============================================================
     Service worker — enables "Add to Home Screen" + fast repeat loads.
     Registers only over http/https (skips file://). Safe if it fails.
     ============================================================ */
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
