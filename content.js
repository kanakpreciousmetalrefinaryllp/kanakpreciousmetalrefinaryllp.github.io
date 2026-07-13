/* ============================================================
   KANAK — content data injected into the page (runs before main.js)
   Edit the arrays here to change site content.
   ============================================================ */
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  function svg(p, sw) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>'; }

  var I = {
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    flask: '<path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    beaker: '<path d="M4.5 3h15M6 3v7L3 20a1 1 0 0 0 1 1.5h16A1 1 0 0 0 21 20l-3-10V3"/>',
    badge: '<path d="M12 2l2.4 2.4L18 4l-.4 3.6L20 10l-2.4 2.4L18 16l-3.6-.4L12 18l-2.4-2.4L6 16l.4-3.6L4 10l2.4-2.4L6 4l3.6.4z"/><path d="m9 11 2 2 4-4"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    lab: '<path d="M9 3h6M10 3v6l-4 8a2 2 0 0 0 1.8 3h8.4a2 2 0 0 0 1.8-3l-4-8V3"/><path d="M7 15h10"/>',
    gem: '<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6M2 9h20"/>',
    bar: '<path d="M2 20h20M4 20V8l6 4V8l6 4V8l4-2v14"/>',
    cert: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 20h10M8 8h8M8 12h5"/><circle cx="17" cy="12" r="2"/>',
    scale: '<path d="M12 3v18M7 21h10M6 7l-4 7h8zM18 7l-4 7h8zM6 7h12"/>',
    micro: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.2.61.79 1 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    dollar: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.18 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>'
  };

  /* -------- Process (6 steps) -------- */
  var steps = [
    { i: I.inbox, t: 'Receive Material', d: 'Weighed, sealed & logged' },
    { i: I.flask, t: 'Testing', d: 'Fire assay · XRF · ICP' },
    { i: I.flame, t: 'Melting', d: 'Induction to 1,800°C' },
    { i: I.beaker, t: 'Chemical Refining', d: 'Aqua regia & electrolysis' },
    { i: I.badge, t: 'Purity Test', d: 'Certified fineness' },
    { i: I.truck, t: 'Delivery', d: 'Insured & serialised' }
  ];
  var pt = $('#procTrack');
  if (pt) pt.innerHTML = steps.map(function (s, n) {
    return '<div class="step" data-aos="fade-up" data-aos-delay="' + (n * 90) + '">' +
      '<div class="step__node"><span class="step__no num">' + (n + 1) + '</span>' + svg(s.i) + '</div>' +
      '<h3>' + s.t + '</h3><p>' + s.d + '</p></div>';
  }).join('');

  /* -------- Why choose (6 hexagons) -------- */
  var why = [
    { i: I.shield, t: 'Assured Trust', d: 'Transparent, assay-backed settlement on every lot — no surprises.' },
    { i: I.lab, t: 'Modern Laboratory', d: 'Fire assay, XRF, ICP-OES & ICP-MS for defensible results.' },
    { i: I.gem, t: 'Guaranteed Purity', d: 'Refined to 999.9 fineness against LBMA & BIS standards.' },
    { i: I.bar, t: 'Full Recovery', d: 'Precious, PGM and base metals recovered end-to-end.' },
    { i: I.cert, t: 'Certified', d: 'ISO-aligned systems and serialised certification.' },
    { i: I.truck, t: 'Secure Delivery', d: 'Insured, GPS-tracked collection and delivery.' }
  ];
  var wg = $('#whyGrid');
  if (wg) wg.innerHTML = why.map(function (w, n) {
    return '<div class="hex" data-aos="zoom-in" data-aos-delay="' + (n % 3 * 90) + '"><div class="hex__inner">' +
      '<div class="hex__face hex__front"><div class="hex__ico">' + svg(w.i) + '</div><h3>' + w.t + '</h3></div>' +
      '<div class="hex__face hex__back"><h3>' + w.t + '</h3><p>' + w.d + '</p></div>' +
      '</div></div>';
  }).join('');

  /* -------- Highlights (6) -------- */
  var hls = [
    { i: I.cert, t: 'ISO Certified' }, { i: I.badge, t: 'Hallmarked' }, { i: I.gear, t: 'Modern Machinery' },
    { i: I.users, t: 'Experienced Team' }, { i: I.scale, t: 'Transparent Pricing' }, { i: I.shield, t: 'Secure Process' }
  ];
  var hg = $('#hlGrid');
  if (hg) hg.innerHTML = hls.map(function (h, n) {
    return '<div class="hl glass lift" data-aos="fade-up" data-aos-delay="' + (n % 3 * 80) + '"><div class="hl__ico">' + svg(h.i) + '</div><h3>' + h.t + '</h3></div>';
  }).join('');

  /* -------- Leadership (real) -------- */
  var leaders = [
    { n: 'Mr. Ambalal Patel', r: 'Founder & Executive Chairman', in: 'AP', p: 'Sets the company’s long-term vision, guiding strategy, investment and industry relations toward internationally recognised standards.', t: ['Corporate Vision', 'Business Expansion', 'Governance', 'Industry Relations'] },
    { n: 'Mrs. Seema Ambalal Patel', r: 'Director – Compliance, Quality & ESG', in: 'SP', p: 'Leads governance, quality management systems, regulatory compliance and ESG initiatives with a culture of accountability.', t: ['Compliance', 'Quality Systems', 'Sustainability', 'Risk & Policy'] },
    { n: 'Mr. Jitendra Patel', r: 'Managing Director – Operations & Technology', in: 'JP', p: 'Drives refinery operations, process engineering and technology adoption for productivity and product quality.', t: ['Refinery Operations', 'Process Engineering', 'Automation', 'Business Dev'] },
    { n: 'Mrs. Suman Patel', r: 'Director – Finance & Supply Chain', in: 'SP', p: 'Oversees financial planning, procurement, commercial documentation and customer account management.', t: ['Financial Strategy', 'Procurement', 'Customer Accounts', 'Budgeting'] }
  ];
  var lg = $('#leaderGrid');
  if (lg) lg.innerHTML = leaders.map(function (l, n) {
    return '<div class="leader glass lift" data-aos="fade-up" data-aos-delay="' + (n % 2 * 90) + '">' +
      '<div class="leader__ava">' + l.in + '</div><div>' +
      '<h3>' + l.n + '</h3><div class="role">' + l.r + '</div><p>' + l.p + '</p>' +
      '<div class="leader__tags">' + l.t.map(function (x) { return '<span class="tag">' + x + '</span>'; }).join('') + '</div>' +
      '</div></div>';
  }).join('');

  /* -------- History timeline -------- */
  var history = [
    { y: '1969', e: 'Mullarram Patel (Pahalvan) — Banaras Metal Grinding Works founded.' },
    { y: '2013', e: 'Naval Metal Grinding Works — Jitendra Mullarram Patel.' },
    { y: '2021', e: 'Ambalal Mullarram Patel — Banaras Metal Grinding Works.' },
    { y: '2026', e: 'Kanak Precious Metal Refinery LLP — present.', now: true }
  ];
  var ht = $('#history');
  if (ht) ht.innerHTML = history.map(function (h) {
    return '<div class="hitem' + (h.now ? ' now' : '') + '"><div class="yr num">' + h.y + '</div><div class="ev">' + h.e + '</div></div>';
  }).join('');

  /* -------- Gallery scenes -------- */
  var scenes = [
    { img: 'photo-goldbars.jpg', fb: 'casting.svg', tg: 'Bullion', h: 'Fine Gold Bars' },
    { img: 'photo-jewellery.jpg', fb: 'scrap.svg', tg: 'Jewellery', h: 'Gold Ornaments' },
    { img: 'forging.svg', fb: 'forging.svg', tg: 'Forging', h: 'Molten Gold Pour' },
    { img: 'photo-bullion.jpg', fb: 'casting.svg', tg: 'Trading', h: 'Bars & Coins' },
    { img: 'refining.svg', fb: 'refining.svg', tg: 'Processing', h: 'Chemical Refining' },
    { img: 'photo-earrings.jpg', fb: 'scrap.svg', tg: 'Craft', h: 'Fine Jewellery' }
  ];
  var gw = $('#galleryWrap');
  if (gw) gw.innerHTML = scenes.map(function (s) {
    return '<div class="swiper-slide"><div class="scene"><img src="' + s.img + '" alt="' + s.h + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + s.fb + '\'"/>' +
      '<div class="scene__cap"><span class="tg">' + s.tg + '</span><h3>' + s.h + '</h3></div></div></div>';
  }).join('');

  /* -------- Testimonials -------- */
  var tst = [
    { q: 'Kanak turned our bench sweeps into certified bullion faster than any refiner we have used. The transparency is unmatched.', n: 'Rajesh Mehta', r: 'Mehta Jewellers, Ahmedabad', a: 'RM' },
    { q: 'PGM recovery yields on our autocatalysts consistently beat our previous partner, with audit-ready documentation.', n: 'Anita Sharma', r: 'DriveTech Components', a: 'AS' },
    { q: 'Meticulous lab reports and settlement exactly to the gram. Kanak is now our default recovery partner.', n: 'Vikram Nair', r: 'GreenCircuit Recyclers', a: 'VN' },
    { q: 'Professional, precise and responsive. We moved our entire silver recovery programme to Kanak in a quarter.', n: 'Priya Desai', r: 'SolarEdge Manufacturing', a: 'PD' }
  ];
  var tw = $('#testiWrap');
  if (tw) tw.innerHTML = tst.map(function (t) {
    var stars = ''; for (var i = 0; i < 5; i++) stars += '<svg viewBox="0 0 24 24"><path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"/></svg>';
    return '<div class="swiper-slide"><div class="tcard glass"><div class="stars">' + stars + '</div>' +
      '<blockquote>“' + t.q + '”</blockquote>' +
      '<div class="who"><div class="av">' + t.a + '</div><div><b>' + t.n + '</b><span>' + t.r + '</span></div></div></div></div>';
  }).join('');

  /* -------- Material streams ticker text -------- */
  var streams = ['Jewellery Scrap', 'Jewellery Dust', 'Sweeping Dust', 'Polishing Waste', 'Casting Waste', 'E-Waste & PCB', 'Automotive Catalysts', 'Spent Catalyst', 'Mining Concentrates', 'Gold Plating Waste', 'Refinery By-products'];
  var sm = $('#streamTrack');
  if (sm) { var o = streams.map(function (s) { return '<span class="ticker__item"><b style="color:var(--gold)">◆</b> ' + s + '</span>'; }).join(''); sm.innerHTML = o + o; }

  /* expose data for main.js */
  window.KANAK = { steps: steps };
})();
