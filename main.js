/* ============================================================
   Kanak Precious Metal Refinery — Static site interactions
   Pure vanilla JS, no build step, no dependencies.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Config ---------- */
  // Optional: set a real metals feed URL that returns
  // { gold, silver, platinum, palladium } in USD/oz.
  var METALS_API_URL = '';
  // Optional: a form POST endpoint (e.g. Formspree). Empty = mailto fallback.
  var FORM_ENDPOINT = '';
  var SALES_EMAIL = 'trade@kanakrefinery.com';

  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  /* ============================================================
     Header scroll state
     ============================================================ */
  var header = $('#header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 16);
    var top = $('#fabTop');
    if (top) top.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============================================================
     Mobile menu
     ============================================================ */
  var toggle = $('#navToggle');
  var mobile = $('#mobileMenu');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('a', mobile).forEach(function (a) {
      a.addEventListener('click', function () { mobile.classList.remove('open'); });
    });
  }

  /* ============================================================
     Scroll-to-top
     ============================================================ */
  var fabTop = $('#fabTop');
  if (fabTop) fabTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ============================================================
     Reveal on scroll
     ============================================================ */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        if (e.target.hasAttribute('data-counter')) runCounter(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '-40px' });
  $$('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
    io.observe(el);
  });

  /* ============================================================
     Animated counters
     ============================================================ */
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-counter'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1700, start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      var val = target * eased;
      el.textContent = prefix + val.toLocaleString('en-US', {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      }) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ============================================================
     Live metal rates (with offline simulation)
     ============================================================ */
  var BASELINE = {
    XAU: { name: 'Gold', price: 2418.5, unit: 'USD / troy oz' },
    XAG: { name: 'Silver', price: 30.42, unit: 'USD / troy oz' },
    XPT: { name: 'Platinum', price: 1012.75, unit: 'USD / troy oz' },
    XPD: { name: 'Palladium', price: 978.3, unit: 'USD / troy oz' }
  };
  var API_MAP = { XAU: 'gold', XAG: 'silver', XPT: 'platinum', XPD: 'palladium' };

  function fluctuate(base, seed) {
    var m = new Date().getMinutes();
    var wobble = Math.sin((m + seed) / 3) * 0.008 + Math.cos(seed * 1.7) * 0.004;
    var price = base * (1 + wobble);
    return { price: price, change: price - base, changePct: ((price - base) / base) * 100 };
  }

  function fallbackRates() {
    return Object.keys(BASELINE).map(function (sym, i) {
      var meta = BASELINE[sym];
      var f = fluctuate(meta.price, i + 1);
      return {
        symbol: sym, name: meta.name, unit: meta.unit,
        price: Math.round(f.price * 100) / 100,
        change: Math.round(f.change * 100) / 100,
        changePct: Math.round(f.changePct * 100) / 100
      };
    });
  }

  function getRates() {
    if (!METALS_API_URL) return Promise.resolve({ rates: fallbackRates(), live: false });
    return fetch(METALS_API_URL, { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (data) {
        var rates = Object.keys(BASELINE).filter(function (s) { return data[API_MAP[s]] != null; })
          .map(function (s) {
            var meta = BASELINE[s], price = Number(data[API_MAP[s]]);
            return {
              symbol: s, name: meta.name, unit: meta.unit, price: price,
              change: Math.round((price - meta.price) * 100) / 100,
              changePct: Math.round(((price - meta.price) / meta.price) * 10000) / 100
            };
          });
        return rates.length ? { rates: rates, live: true } : { rates: fallbackRates(), live: false };
      })
      .catch(function () { return { rates: fallbackRates(), live: false }; });
  }

  function money(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function sparkline(base, up) {
    var w = 110, h = 38, n = 22, pts = [], v = base * 0.97;
    for (var i = 0; i < n; i++) {
      v += (Math.sin(i / 3) + (Math.random() - 0.5)) * base * 0.006;
      v = Math.max(base * 0.92, Math.min(base * 1.06, v));
      pts.push(v);
    }
    var min = Math.min.apply(null, pts), max = Math.max.apply(null, pts), range = (max - min) || 1;
    var d = pts.map(function (p, i) {
      var x = (i / (n - 1)) * w, y = h - ((p - min) / range) * h;
      return (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    var color = up ? '#34d399' : '#fb7185';
    return '<svg class="rate-card__spark" viewBox="0 0 ' + w + ' ' + h + '"><path d="' + d +
      '" fill="none" stroke="' + color + '" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function arrow(up) {
    return up
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="12" height="12"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="12" height="12"><path d="M7 7l10 10M17 17H8M17 17V8"/></svg>';
  }

  function renderTicker(rates) {
    var el = $('#ticker');
    if (!el) return;
    var one = rates.map(function (r) {
      var up = r.change >= 0;
      return '<span class="ticker__item"><b>' + r.name + '</b> ' + money(r.price) +
        ' <span class="' + (up ? 'up' : 'down') + '">' + arrow(up) + Math.abs(r.changePct).toFixed(2) +
        '%</span> <span style="color:var(--faint)">/ oz</span></span>';
    }).join('');
    el.innerHTML = one + one; // duplicate for seamless loop
  }

  function renderCards(rates, live) {
    var el = $('#rateCards');
    if (!el) return;
    el.innerHTML = rates.map(function (r) {
      var up = r.change >= 0;
      return '<div class="rate-card glass card-lift">' +
        '<div class="rate-card__top"><div><div class="rate-card__name">' + r.name + '</div>' +
        '<div class="rate-card__unit">' + r.unit + '</div></div>' +
        '<span class="rate-card__chip ' + (up ? 'up' : 'down') + '">' + arrow(up) + Math.abs(r.changePct).toFixed(2) + '%</span></div>' +
        '<div class="rate-card__price text-gold">' + money(r.price) + '</div>' +
        '<div class="rate-card__foot"><span class="' + (up ? 'up' : 'down') + '" style="font-size:12px">' +
        (up ? '+' : '') + r.change.toFixed(2) + '</span>' + sparkline(r.price, up) + '</div></div>';
    }).join('');
    var note = $('#rateNote');
    if (note) {
      var t = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      note.innerHTML = '<span class="dot"></span>' + (live ? 'Live feed' : 'Indicative rates') +
        ' · updated ' + t + ' · refreshes every 60s';
    }
  }

  function loadRates() {
    getRates().then(function (res) {
      renderTicker(res.rates);
      renderCards(res.rates, res.live);
    });
  }
  loadRates();
  setInterval(loadRates, 60000);

  /* ============================================================
     Product filters
     ============================================================ */
  $$('.filter').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      $$('.filter').forEach(function (b) { b.classList.toggle('active', b === btn); });
      $$('.product').forEach(function (p) {
        var show = cat === 'All' || p.getAttribute('data-cat') === cat;
        p.classList.toggle('hide', !show);
      });
    });
  });

  /* ============================================================
     Testimonials carousel
     ============================================================ */
  var quotes = $$('#quoteData > div').map(function (d) {
    return { quote: d.getAttribute('data-quote'), who: d.getAttribute('data-who'), role: d.getAttribute('data-role') };
  });
  var qIndex = 0;
  var qText = $('#quoteText'), qWho = $('#quoteWho'), qRole = $('#quoteRole'), qDots = $('#quoteDots');
  function renderQuote() {
    if (!qText || !quotes.length) return;
    var q = quotes[qIndex];
    qText.style.opacity = 0;
    setTimeout(function () {
      qText.textContent = '“' + q.quote + '”';
      qWho.textContent = q.who;
      qRole.textContent = q.role;
      qText.style.opacity = 1;
    }, 150);
    if (qDots) $$('button', qDots).forEach(function (b, i) { b.classList.toggle('active', i === qIndex); });
  }
  if (quotes.length && qDots) {
    qDots.innerHTML = quotes.map(function (_, i) { return '<button aria-label="Quote ' + (i + 1) + '"></button>'; }).join('');
    $$('button', qDots).forEach(function (b, i) { b.addEventListener('click', function () { qIndex = i; renderQuote(); }); });
    var prev = $('#quotePrev'), next = $('#quoteNext');
    if (prev) prev.addEventListener('click', function () { qIndex = (qIndex - 1 + quotes.length) % quotes.length; renderQuote(); });
    if (next) next.addEventListener('click', function () { qIndex = (qIndex + 1) % quotes.length; renderQuote(); });
    if (qText) qText.style.transition = 'opacity .3s ease';
    renderQuote();
    setInterval(function () { qIndex = (qIndex + 1) % quotes.length; renderQuote(); }, 7000);
  }

  /* ============================================================
     FAQ accordion
     ============================================================ */
  $$('.faq__item').forEach(function (item) {
    var q = $('.faq__q', item), a = $('.faq__a', item);
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      $$('.faq__item').forEach(function (it) {
        it.classList.remove('open');
        var aa = $('.faq__a', it); if (aa) aa.style.maxHeight = null;
      });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ============================================================
     Contact / quote form
     ============================================================ */
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = $('button[type="submit"]', form);
      var original = btn ? btn.innerHTML : '';
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      function done() {
        if (btn) { btn.textContent = '✓ Received — we’ll be in touch'; }
        form.reset();
        setTimeout(function () { if (btn) { btn.disabled = false; btn.innerHTML = original; } }, 5000);
      }

      if (FORM_ENDPOINT) {
        fetch(FORM_ENDPOINT, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        }).then(done).catch(done);
      } else {
        var subject = encodeURIComponent((form.getAttribute('data-lead') === 'quote' ? 'Quote Request' : 'Enquiry') + ' — ' + (data.name || 'Website'));
        var body = encodeURIComponent(Object.keys(data).map(function (k) {
          return k.charAt(0).toUpperCase() + k.slice(1) + ': ' + data[k];
        }).join('\n'));
        window.location.href = 'mailto:' + SALES_EMAIL + '?subject=' + subject + '&body=' + body;
        done();
      }
    });
  });

  /* ============================================================
     Footer year & active nav highlight
     ============================================================ */
  var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  var sections = $$('section[id]');
  var navLinks = $$('.nav__links a');
  if (sections.length && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.getAttribute('id');
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
