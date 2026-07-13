/* ============================================================
   KANAK — interactions (vanilla JS + guarded CDN libraries)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Config ---------- */
  var METALS_API_URL = '';                 // set to a feed returning {gold,silver,platinum,palladium} USD/oz
  var FORM_ENDPOINT = '';                  // form POST endpoint; empty => opens email
  var EMAIL = 'info@kanakpreciousmetalrefinaryllp.com';

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
  if (typeof Lenis !== 'undefined' && !reduce) {
    try {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
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
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
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
     LIVE metal rates — INDIA (₹ per gram / 10 gram)
     ------------------------------------------------------------
     HOW THE PRICE IS FETCHED & DISPLAYED
       1. International SPOT price (USD / troy ounce) for gold, silver and
          platinum is fetched live from  https://gold-api.com  (free, no key,
          CORS-enabled).
       2. Live USD -> INR is fetched from  https://open.er-api.com  (free, no key).
       3. Converted to ₹ per gram:
              spot_usd_per_oz / 31.1035  ×  USD_INR  ×  (1 + INDIA_PREMIUM)
          INDIA_PREMIUM approximates Indian import duty (~6%) + GST (~3%).
       4. Gold 22K = Gold 24K × 0.916.  Per-10-gram = per-gram × 10.
       5. "Today's change" is measured from the first price seen each calendar
          day (remembered in the browser via localStorage).
     If the live fetch fails (e.g. offline) a clearly-labelled static estimate
     is shown instead. This is a SPOT-BASED estimate + standard duty/GST — for
     exact IBJA / local-jeweller rates, tune INDIA_PREMIUM below, hardcode
     OFFLINE_GRAM, or point METALS_API_URL at your own ₹/gram feed.
     ============================================================ */
  var USE_LIVE = true;            // fetch real live spot prices
  var INDIA_PREMIUM = 0.09;       // ~6% import duty + ~3% GST over intl spot (tune per city)
  var USD_INR_FALLBACK = 95.5;    // used only if the forex fetch fails
  var OZ = 31.1034768;            // grams per troy ounce

  var METALS = [
    { key: 'gold24', name: 'Gold 24K', color: '#d4af37', spot: 'XAU', factor: 1 },
    { key: 'gold22', name: 'Gold 22K', color: '#e6c766', spot: 'XAU', factor: 0.916 },
    { key: 'silver', name: 'Silver', color: '#c0c0c0', spot: 'XAG', factor: 1 },
    { key: 'platinum', name: 'Platinum', color: '#e5e4e2', spot: 'XPT', factor: 1 }
  ];
  var OFFLINE_GRAM = { gold24: 11800, gold22: 10800, silver: 112, platinum: 3400 }; // fallback only
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
    return { key: m.key, name: m.name, color: m.color, gram: Math.round(gramNow), per10: Math.round(gramNow * 10), change10: Math.round(chg * 10), pct: open ? Math.round(chg / open * 10000) / 100 : 0 };
  }
  function fetchLive() {
    var forex = fetch('https://open.er-api.com/v6/latest/USD').then(function (r) { return r.json(); })
      .then(function (d) { return (d && d.rates && d.rates.INR) || USD_INR_FALLBACK; }).catch(function () { return USD_INR_FALLBACK; });
    var metals = Promise.all(['XAU', 'XAG', 'XPT'].map(function (s) {
      return fetch('https://api.gold-api.com/price/' + s).then(function (r) { return r.json(); })
        .then(function (d) { return { s: s, p: +d.price }; }).catch(function () { return null; });
    }));
    return Promise.all([forex, metals]).then(function (a) {
      var usdinr = a[0], sp = {};
      a[1].forEach(function (x) { if (x && x.p) sp[x.s] = x.p; });
      if (sp.XAU == null || sp.XAG == null) throw new Error('no spot');
      var perg = {};
      ['XAU', 'XAG', 'XPT'].forEach(function (s) { if (sp[s] != null) perg[s] = sp[s] / OZ * usdinr * (1 + INDIA_PREMIUM); });
      var rates = METALS.filter(function (m) { return perg[m.spot] != null; }).map(function (m) { return finalize(m, perg[m.spot] * m.factor); });
      return { rates: rates, live: true, usdinr: usdinr };
    });
  }
  function fallbackSim() {
    var mn = new Date().getMinutes();
    return { rates: METALS.map(function (meta, i) { return finalize(meta, OFFLINE_GRAM[meta.key] * (1 + Math.sin((mn + i) / 3) * .004)); }), live: false };
  }
  function getRates() {
    if (METALS_API_URL) {
      return fetch(METALS_API_URL, { cache: 'no-store' }).then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function (d) { var rr = METALS.filter(function (m) { return d[m.key] != null; }).map(function (m) { return finalize(m, +d[m.key]); }); return rr.length ? { rates: rr, live: true } : fallbackSim(); })
        .catch(function () { return USE_LIVE ? fetchLive().catch(fallbackSim) : fallbackSim(); });
    }
    if (USE_LIVE) return fetchLive().catch(function () { return fallbackSim(); });
    return Promise.resolve(fallbackSim());
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

  function renderRates(res) {
    var rates = res.rates, live = res.live;
    var tk = $('#rateTicker');
    if (tk) { var one = rates.map(function (r) { var u = r.change10 >= 0; return '<span class="ticker__item"><b>' + r.name + '</b> ' + inr(r.per10) + '/10g <span class="' + (u ? 'up' : 'down') + '">' + arrow(u) + ' ' + Math.abs(r.pct).toFixed(2) + '%</span></span>'; }).join(''); tk.innerHTML = one + one; }
    var cg = $('#priceCards');
    if (cg) cg.innerHTML = rates.map(function (r) {
      var u = r.change10 >= 0;
      return '<div class="price-card glass lift">' +
        '<div class="price-card__ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="' + r.color + '" opacity="0.9"/><circle cx="12" cy="12" r="9" fill="none" stroke="rgba(255,255,255,.4)"/></svg></div>' +
        '<h3>' + r.name + '</h3><div class="unit">' + inr(r.gram) + ' / gram</div>' +
        '<div class="val text-gold">' + inr(r.per10) + '<span style="font-size:.5em;color:var(--faint);font-family:var(--font-sub)"> / 10g</span></div>' +
        '<div class="price-card__foot"><span class="' + (u ? 'up' : 'down') + '">' + arrow(u) + ' ' + (u ? '+' : '−') + inr(Math.abs(r.change10)) + ' (' + r.pct.toFixed(2) + '%)</span>' + spark(r.gram, u) + '</div></div>';
    }).join('');
    if (typeof AOS !== 'undefined') AOS.refreshHard && AOS.refreshHard();
    var pw = $('#pwBody');
    if (pw) pw.innerHTML = rates.slice(0, 3).map(function (r) { var u = r.change10 >= 0; return '<div class="pw-row"><span class="m">' + r.name + '</span><span class="p">' + inr(r.per10) + '</span><span class="c ' + (u ? 'up' : 'down') + '">' + (u ? '+' : '') + r.pct.toFixed(2) + '%</span></div>'; }).join('');
    var src = $('#rateSrc');
    if (src) src.innerHTML = live
      ? 'Live · spot via <a href="https://gold-api.com" target="_blank" rel="noopener">gold-api.com</a> · USD→INR via <a href="https://open.er-api.com" target="_blank" rel="noopener">open.er-api.com</a> · incl. est. ' + Math.round(INDIA_PREMIUM * 100) + '% India duty &amp; GST · updated ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      : 'Offline estimate — live price source unavailable. Figures are indicative only.';
    var wt = $('#pwTime'); if (wt) wt.textContent = (live ? 'Live · ' : 'Offline · ') + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
  function loadRates() { getRates().then(renderRates); }
  loadRates(); setInterval(loadRates, 60000);

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
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      function done() { if (btn) btn.textContent = '✓ Received'; form.reset(); setTimeout(function () { if (btn) { btn.disabled = false; btn.innerHTML = orig; } }, 4000); }
      if (FORM_ENDPOINT) { fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) }).then(done).catch(done); }
      else {
        var sub = encodeURIComponent('Website Enquiry — ' + (data.name || ''));
        var body = encodeURIComponent(Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n'));
        window.location.href = 'mailto:' + EMAIL + '?subject=' + sub + '&body=' + body; done();
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
})();
