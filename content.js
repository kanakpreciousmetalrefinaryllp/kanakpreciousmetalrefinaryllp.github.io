/* ============================================================
   Kanak — data-driven content injected into the page.
   Runs before main.js so reveal/filter/FAQ observers pick it up.
   Edit the arrays below to change site content.
   ============================================================ */
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- tiny inline icon set ---------- */
  var I = {
    truck: '<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    tube: '<path d="M14.5 2v17.5a3 3 0 0 1-6 0V2M9 2h6M8.5 8h7"/>',
    flask: '<path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    beaker: '<path d="M4.5 3h15M6 3v7L3 20a1 1 0 0 0 1 1.5h16A1 1 0 0 0 21 20l-3-10V3"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    drop: '<path d="M12 2.7 6.3 9a8 8 0 1 0 11.4 0z"/>',
    badge: '<path d="M12 2l2.4 2.4L18 4l-.4 3.6L20 10l-2.4 2.4L18 16l-3.6-.4L12 18l-2.4-2.4L6 16l.4-3.6L4 10l2.4-2.4L6 4l3.6.4z"/><path d="m9 11 2 2 4-4"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    pack: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m9 11 2.5 2.5L16 9"/>',
    ship: '<path d="M2 20a5 5 0 0 0 6 0 5 5 0 0 1 6 0 5 5 0 0 0 6 0M4 18l-2-6h20l-2 6M12 3v9M8 6h8"/>',
    gem: '<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6M2 9h20"/>',
    mountain: '<path d="m8 3 4 8 5-5 5 15H2z"/>',
    chip: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    car: '<path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M5 17h10"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.9.3l-.9.9 5.5 3.3-2.3 2.3-2.6-.4-1 1L7 18l2.7 2.3 1-1-.4-2.6 2.3-2.3 3.3 5.5.9-.9a1 1 0 0 0 .3-.9z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
    micro: '<path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1M9 14h2M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2z"/>',
    grad: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5"/>',
    bank: '<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',
    factory: '<path d="M2 20h20M4 20V8l6 4V8l6 4V8l4-2v14"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    dl: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>'
  };
  function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + p + '</svg>'; }

  /* ============================================================
     Refining process — 12 stages
     ============================================================ */
  var steps = [
    { icon: I.truck, t: 'Collection', d: 'Insured collection of scrap, dust, catalysts and concentrates with tamper-evident sealing and full chain-of-custody.', tech: 'GPS-tracked logistics · sealed containers', qc: 'Gross weight & seal integrity check', safe: 'Insured transit · dual-signature handover', rec: 'Input logged to the gram' },
    { icon: I.search, t: 'Material Inspection', d: 'Incoming lots are visually inspected, categorised by stream and weighed on calibrated precision scales in a monitored bay.', tech: 'Calibrated scales · CCTV intake bay', qc: 'Category classification & moisture screening', safe: 'PPE zones · dust extraction', rec: 'Baseline mass established' },
    { icon: I.tube, t: 'Sampling', d: 'Representative samples are drawn using homogenisation, riffle splitting and coning-and-quartering for a true assay basis.', tech: 'Riffle splitters · homogenisers', qc: 'Representative sampling (ISO 11648)', safe: 'Sealed sampling booth', rec: 'Sample integrity assured' },
    { icon: I.flask, t: 'Laboratory Testing', d: 'Samples are assayed by fire assay, XRF and ICP to determine precious-metal content before any value is agreed.', tech: 'Fire assay · XRF · ICP-OES / ICP-MS', qc: 'Duplicate assays & control standards', safe: 'Fume hoods · acid handling protocol', rec: 'Content confirmed to ±0.01%' },
    { icon: I.flame, t: 'Melting', d: 'Material is melted in induction furnaces to form a homogeneous bar, driving off volatiles and consolidating the metal.', tech: 'Induction furnaces up to 1,800°C', qc: 'Melt-loss reconciliation', safe: 'Thermal PPE · gas scrubbers', rec: 'Homogeneous melt achieved' },
    { icon: I.beaker, t: 'Chemical Refining', d: 'Aqua-regia and selective precipitation dissolve and separate gold and PGMs from base metals in scrubbed reactions.', tech: 'Aqua regia · selective precipitation', qc: 'Solution assay at each stage', safe: 'Acid-resistant reactors · scrubbers', rec: '99.9%+ selective separation' },
    { icon: I.zap, t: 'Electro Refining', d: 'Electrolytic cells deposit ultra-pure metal onto cathodes — Wohlwill for gold, Moebius for silver.', tech: 'Wohlwill & Moebius electrolysis', qc: 'Cathode purity monitoring', safe: 'DC isolation · ventilation', rec: 'Up to 999.9 fineness' },
    { icon: I.drop, t: 'Purification', d: 'Washing, filtration and re-precipitation remove residual impurities to meet Good Delivery specifications.', tech: 'Micro-filtration · DI washing', qc: 'Trace impurity verification', safe: 'Effluent treatment · recovery loop', rec: 'Impurities < 100 ppm' },
    { icon: I.badge, t: 'Quality Testing', d: 'Final metal is assayed and certified against LBMA / BIS fineness standards before it leaves the floor.', tech: 'ICP-MS · spark spectrometer', qc: 'Final fineness certification', safe: 'Independent QA sign-off', rec: 'Certified fineness confirmed' },
    { icon: I.box, t: 'Casting', d: 'Certified metal is cast or minted into bars, granules or coins with serial numbers, hallmark and tolerances.', tech: 'Bar casting · granulation · minting', qc: 'Weight & dimensional tolerance', safe: 'Controlled foundry environment', rec: 'Serialised finished goods' },
    { icon: I.pack, t: 'Packaging', d: 'Products are tamper-proof sealed with assay certificates, holograms and serialised documentation.', tech: 'Tamper-evident seals · holograms', qc: 'Certificate & serial reconciliation', safe: 'Secure packing vault', rec: 'Full traceability packaged' },
    { icon: I.ship, t: 'Delivery', d: 'Finished bullion is delivered via insured, secure logistics or credited to the client account with digital certificates.', tech: 'Insured secure logistics', qc: 'Delivery reconciliation & POD', safe: 'Armed transit · GPS tracking', rec: 'Settlement completed' }
  ];
  var tl = $('#timeline');
  if (tl) {
    tl.innerHTML = steps.map(function (s, i) {
      return '<div class="step reveal"><span class="step__node">' + svg(s.icon) + '</span>' +
        '<div class="glass-strong step__body"><span class="step__no">Stage ' + ('0' + (i + 1)).slice(-2) + '</span>' +
        '<h3>' + s.t + '</h3><p class="step__desc">' + s.d + '</p><div class="step__meta">' +
        metaBox(I.chip, 'Technology', s.tech) + metaBox(I.badge, 'Quality Check', s.qc) +
        metaBox(I.shield, 'Safety', s.safe) + metaBox(I.check, 'Recovery', s.rec) +
        '</div></div></div>';
    }).join('');
  }
  function metaBox(icon, label, val) {
    return '<div class="meta-box"><div class="meta-box__label">' + svg(icon) + label + '</div><p>' + val + '</p></div>';
  }

  /* ============================================================
     Industries
     ============================================================ */
  var industries = [
    { icon: I.gem, n: 'Jewellery', m: ['Gold', 'Silver', 'Platinum'] },
    { icon: I.mountain, n: 'Mining', m: ['Gold', 'Silver', 'PGMs'] },
    { icon: I.chip, n: 'Electronics', m: ['Gold', 'Palladium', 'Copper'] },
    { icon: I.car, n: 'Automotive', m: ['Platinum', 'Palladium', 'Rhodium'] },
    { icon: I.beaker, n: 'Chemical', m: ['Platinum', 'Nickel'] },
    { icon: I.heart, n: 'Medical', m: ['Gold', 'Platinum'] },
    { icon: I.plane, n: 'Aerospace', m: ['Platinum', 'Iridium'] },
    { icon: I.shield, n: 'Defense', m: ['Gold', 'PGMs'] },
    { icon: I.sun, n: 'Solar', m: ['Silver', 'Copper'] },
    { icon: I.micro, n: 'Research', m: ['Platinum', 'Gold'] },
    { icon: I.grad, n: 'Universities', m: ['Gold', 'Silver'] },
    { icon: I.factory, n: 'Manufacturing', m: ['Gold', 'Nickel'] }
  ];
  var ig = $('#industriesGrid');
  if (ig) {
    ig.innerHTML = industries.map(function (x) {
      return '<div class="glass card-lift tile reveal" style="padding:22px"><div class="tile__icon">' + svg(x.icon) + '</div>' +
        '<h3 style="font-size:1.1rem;margin-top:16px">' + x.n + '</h3>' +
        '<div class="chips">' + x.m.map(function (m) { return '<span class="chip">' + m + '</span>'; }).join('') + '</div></div>';
    }).join('');
  }

  /* ============================================================
     Products
     ============================================================ */
  var products = [
    { cat: 'Gold', name: 'Gold Cast Bars', purity: '999.9 fineness', avail: 'In Stock', accent: '#d4af37', spec: 'LBMA-referenced cast bars with serialised assay certificate.', w: ['1 g', '10 g', '50 g', '100 g', '1 kg'], a: ['Investment', 'Jewellery stock', 'Reserves'] },
    { cat: 'Gold', name: 'Gold Granules', purity: '999.9 fineness', avail: 'In Stock', accent: '#e6c766', spec: 'Uniform grain for precise alloying and rapid melting.', w: ['100 g', '500 g', '1 kg'], a: ['Manufacturing', 'Alloying', 'Casting'] },
    { cat: 'Silver', name: 'Silver Cast Bars', purity: '999.0 fineness', avail: 'In Stock', accent: '#c0c0c0', spec: 'High-purity cast silver bars with certified fineness.', w: ['1 kg', '5 kg', '30 kg'], a: ['Investment', 'Industrial', 'Electronics'] },
    { cat: 'Silver', name: 'Silver Granules', purity: '999.0 fineness', avail: 'In Stock', accent: '#d8d8d8', spec: 'Consistent grain size for industrial and jewellery use.', w: ['1 kg', '5 kg'], a: ['Contacts', 'Silverware', 'Chemicals'] },
    { cat: 'Silver', name: 'Silver Coins', purity: '999.0 fineness', avail: 'Made to Order', accent: '#e5e4e2', spec: 'Custom-minted coins with bespoke branding and packaging.', w: ['5 g', '10 g', '20 g', '50 g'], a: ['Gifting', 'Investment', 'Corporate'] },
    { cat: 'Platinum', name: 'Platinum Bars & Grain', purity: '999.5 fineness', avail: 'On Request', accent: '#e5e4e2', spec: 'Refined platinum in bar and grain form with assay certificate.', w: ['5 g', '10 g', '50 g'], a: ['Investment', 'Catalysts', 'Jewellery'] },
    { cat: 'Custom', name: 'Custom Bullion', purity: 'As specified', avail: 'Made to Order', accent: '#d4af37', spec: 'Bespoke bars, coins and medallions with custom hallmark and design.', w: ['Bespoke'], a: ['Corporate gifting', 'Private mint'] },
    { cat: 'Industrial', name: 'Industrial Grade Metals', purity: 'App-specific', avail: 'On Request', accent: '#b87333', spec: 'Precious and base metals supplied to industrial specification.', w: ['Bulk'], a: ['Plating', 'Catalysts', 'Electronics'] }
  ];
  var availClr = { 'In Stock': 'background:rgba(52,211,153,.12);color:#34d399', 'Made to Order': 'background:rgba(212,175,55,.12);color:#f6e0a0', 'On Request': 'background:rgba(56,189,248,.12);color:#38bdf8' };
  var pg = $('#productGrid');
  if (pg) {
    pg.innerHTML = products.map(function (p) {
      return '<div class="glass card-lift product reveal" data-cat="' + p.cat + '">' +
        '<div class="product__thumb" style="background:linear-gradient(135deg,' + p.accent + '22,' + p.accent + '05),radial-gradient(circle at 30% 25%,' + p.accent + '66,transparent 60%)">' +
        '<span class="product__avail" style="' + availClr[p.avail] + '">' + p.avail + '</span>' +
        '<span class="product__cat">' + p.cat + '</span></div>' +
        '<div class="product__body"><h3>' + p.name + '</h3><div class="product__purity">' + p.purity + '</div>' +
        '<p class="product__spec">' + p.spec + '</p>' +
        '<div class="mini-label">Weights</div><div class="weights">' + p.w.map(function (w) { return '<span>' + w + '</span>'; }).join('') + '</div>' +
        '<div class="mini-label">Applications</div><ul class="apps">' + p.a.map(function (a) { return '<li>' + svg(I.check) + a + '</li>'; }).join('') + '</ul>' +
        '<div class="product__foot"><a href="#contact" class="btn btn-primary btn-block">Inquire ' + svg(I.arrow) + '</a></div></div></div>';
    }).join('');
  }

  /* ============================================================
     Certificates
     ============================================================ */
  var certs = [
    { t: 'ISO 9001:2015', a: 'Quality Management System', s: 'Refining & assay operations', y: '2023' },
    { t: 'ISO 14001:2015', a: 'Environmental Management', s: 'Effluent & emissions control', y: '2023' },
    { t: 'ISO 45001:2018', a: 'Occupational Health & Safety', s: 'Plant safety systems', y: '2022' },
    { t: 'NABL Accreditation', a: 'ISO/IEC 17025', s: 'Assay laboratory scope', y: '2024' },
    { t: 'BIS Hallmarking', a: 'Bureau of Indian Standards', s: 'Bullion fineness', y: '2023' },
    { t: 'Responsible Recycling', a: 'R2 Framework', s: 'E-waste handling', y: '2023' }
  ];
  var cg = $('#certGrid');
  if (cg) {
    cg.innerHTML = certs.map(function (c) {
      return '<div class="glass card-lift tile reveal" style="flex-direction:row;gap:16px;align-items:flex-start">' +
        '<span style="color:var(--gold-light);flex-shrink:0">' + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="34" height="34">' + I.shield + '</svg></span>' +
        '<div><h3 style="margin-top:0;font-size:1.1rem">' + c.t + '</h3>' +
        '<div class="product__purity">' + c.a + '</div>' +
        '<p style="margin-top:6px;color:var(--muted);font-size:.88rem;flex:none">' + c.s + '</p>' +
        '<div style="margin-top:10px;font-size:12px;color:var(--faint)">Verified &amp; current · ' + c.y + '</div></div></div>';
    }).join('');
  }

  /* ============================================================
     FAQ
     ============================================================ */
  var faqs = [
    { q: 'What types of material do you accept for refining?', a: 'We accept jewellery scrap, filings, polishing and sweeping dust, casting waste, industrial scrap, electronic waste, PCBs, automotive and spent catalysts, mining concentrates, dental scrap and precious-metal-bearing by-products.' },
    { q: 'How is the value of my material determined?', a: 'Every lot is weighed, sampled and assayed using fire assay, XRF and ICP methods. The certified content is valued against live benchmark prices, and you receive a full assay report before settlement.' },
    { q: 'How long does the refining process take?', a: 'Jewellery scrap is typically assayed the same day and settled within 24–48 hours. Complex industrial streams, catalysts and e-waste take 3–10 working days depending on volume and chemistry.' },
    { q: 'What purity levels can you achieve?', a: 'Our lines produce gold up to 999.9, silver up to 999.9, and platinum/palladium up to 999.5 fineness, certified against LBMA and BIS standards.' },
    { q: 'How will I be paid or settled?', a: 'You can choose settlement in refined bullion, metal credit to your account, or bank transfer at the agreed benchmark-linked price. Terms are confirmed in your service agreement.' },
    { q: 'Do you arrange secure collection and transport?', a: 'Yes — insured, GPS-tracked collection with tamper-evident sealing and full chain-of-custody documentation from your premises to our refinery.' },
    { q: 'Are you certified and environmentally compliant?', a: 'Kanak operates under ISO 9001, ISO 14001 and ISO 45001 systems, holds NABL (ISO/IEC 17025) laboratory accreditation, and processes e-waste under authorised, environment-compliant conditions.' },
    { q: 'Can I buy investment-grade bullion from Kanak?', a: 'Yes. Our trading desk sells certified gold, silver and platinum bars, granules and coins at transparent, benchmark-linked pricing, with secure logistics and an optional buy-back guarantee.' }
  ];
  var fl = $('#faqList');
  if (fl) {
    fl.innerHTML = faqs.map(function (f) {
      return '<div class="glass faq__item"><button class="faq__q">' + f.q +
        '<span class="faq__icon">' + svg(I.plus) + '</span></button>' +
        '<div class="faq__a"><p>' + f.a + '</p></div></div>';
    }).join('');
  }
})();
