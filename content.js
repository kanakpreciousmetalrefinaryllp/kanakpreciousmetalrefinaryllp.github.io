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

  /* -------- Process (6 steps) --------
     Each step carries a hand-built SVG illustration (s.g) so visitors can
     see, not just read, what happens at that stage. viewBox 320x180. */
  var PA = {
    // 1 — Receive Material: sealed parcel weighed on a calibrated scale
    receive:
      '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="a1b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151210"/><stop offset="1" stop-color="#0a0806"/></linearGradient>' +
      '<linearGradient id="a1g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e2a0"/><stop offset="1" stop-color="#c9a227"/></linearGradient></defs>' +
      '<rect width="320" height="180" fill="url(#a1b)"/>' +
      '<ellipse cx="160" cy="158" rx="120" ry="20" fill="#c9a227" opacity="0.10"/>' +
      '<rect x="92" y="146" width="136" height="10" rx="4" fill="#2b2620"/>' +
      '<rect x="150" y="120" width="20" height="28" fill="#37312a"/>' +
      '<rect x="100" y="110" width="120" height="12" rx="4" fill="#4a4335"/>' +
      '<circle cx="250" cy="104" r="18" fill="#17130d" stroke="url(#a1g)" stroke-width="2"/>' +
      '<path d="M250 104 l9 -5" stroke="#f6e2a0" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="250" cy="104" r="2.5" fill="#f6e2a0"/>' +
      '<rect x="118" y="58" width="84" height="54" rx="4" fill="#7c5f1a"/>' +
      '<rect x="118" y="58" width="84" height="54" rx="4" fill="url(#a1g)" opacity="0.22"/>' +
      '<path d="M118 80 h84" stroke="#4f3d10" stroke-width="3"/>' +
      '<rect x="152" y="58" width="16" height="54" fill="#4f3d10" opacity="0.55"/>' +
      '<circle cx="160" cy="80" r="9" fill="url(#a1g)"/>' +
      '<path d="M156 80 l3 3 5 -6" stroke="#1c1405" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>',
    // 2 — Testing: flask sample under a magnifier beside an assay spectrum
    testing:
      '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="a2b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101413"/><stop offset="1" stop-color="#080a0a"/></linearGradient>' +
      '<linearGradient id="a2l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd35c"/><stop offset="1" stop-color="#e07a1e"/></linearGradient>' +
      '<linearGradient id="a2g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e2a0"/><stop offset="1" stop-color="#c9a227"/></linearGradient></defs>' +
      '<rect width="320" height="180" fill="url(#a2b)"/>' +
      '<ellipse cx="120" cy="160" rx="120" ry="20" fill="#c9a227" opacity="0.10"/>' +
      '<g fill="url(#a2g)" opacity="0.85"><rect x="212" y="96" width="10" height="48" rx="2"/><rect x="228" y="74" width="10" height="70" rx="2"/><rect x="244" y="108" width="10" height="36" rx="2"/><rect x="260" y="60" width="10" height="84" rx="2"/><rect x="276" y="90" width="10" height="54" rx="2"/></g>' +
      '<rect x="206" y="144" width="92" height="4" rx="2" fill="#4a4335"/>' +
      '<rect x="104" y="52" width="16" height="26" fill="#0f1413" stroke="#bfe6df" stroke-width="2" stroke-opacity="0.45"/>' +
      '<path d="M96 76 L128 76 L150 132 A8 8 0 0 1 143 144 L81 144 A8 8 0 0 1 74 132 Z" fill="#0f1413" stroke="#bfe6df" stroke-width="2" stroke-opacity="0.5"/>' +
      '<path d="M86 116 L138 116 L143 132 A8 8 0 0 1 136 144 L88 144 A8 8 0 0 1 81 132 Z" fill="url(#a2l)" opacity="0.92"/>' +
      '<circle cx="112" cy="94" r="22" fill="#ffffff" opacity="0.05"/>' +
      '<circle cx="112" cy="94" r="22" fill="none" stroke="url(#a2g)" stroke-width="4"/>' +
      '<path d="M128 110 l16 16" stroke="url(#a2g)" stroke-width="6" stroke-linecap="round"/>' +
      '</svg>',
    // 3 — Melting: crucible pouring molten gold into an ingot mould over flame
    melting:
      '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><radialGradient id="a3glow" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#ff9d2e" stop-opacity="0.5"/><stop offset="1" stop-color="#ff9d2e" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="a3b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#161210"/><stop offset="1" stop-color="#0a0705"/></linearGradient>' +
      '<linearGradient id="a3m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3c4"/><stop offset="0.5" stop-color="#ffb347"/><stop offset="1" stop-color="#e0641e"/></linearGradient>' +
      '<linearGradient id="a3g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e2a0"/><stop offset="1" stop-color="#c9a227"/></linearGradient></defs>' +
      '<rect width="320" height="180" fill="url(#a3b)"/>' +
      '<rect width="320" height="180" fill="url(#a3glow)"/>' +
      '<rect x="150" y="130" width="96" height="24" rx="4" fill="#2a2620"/>' +
      '<rect x="156" y="126" width="84" height="10" rx="4" fill="url(#a3m)"/>' +
      '<path d="M150 92 q4 26 42 40" stroke="url(#a3m)" stroke-width="6" fill="none" stroke-linecap="round"/>' +
      '<g transform="rotate(-22 118 84)"><path d="M88 66 h60 l-10 44 a4 4 0 0 1 -4 3 h-28 a4 4 0 0 1 -4 -3 z" fill="#332c22" stroke="url(#a3g)" stroke-width="2"/><ellipse cx="118" cy="66" rx="30" ry="8" fill="url(#a3m)"/></g>' +
      '<g fill="url(#a3m)" opacity="0.9"><path d="M120 150 q-8 -16 0 -28 q8 12 0 28 z"/><path d="M140 152 q-7 -14 0 -24 q7 10 0 24 z"/><path d="M100 152 q-6 -12 0 -22 q6 9 0 22 z"/></g>' +
      '</svg>',
    // 4 — Chemical Refining: bench of beakers with reacting solutions & vapour
    refining:
      '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="a4b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e1413"/><stop offset="1" stop-color="#070a0a"/></linearGradient>' +
      '<linearGradient id="a4l1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd35c"/><stop offset="1" stop-color="#e07a1e"/></linearGradient>' +
      '<linearGradient id="a4l2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fe3d2"/><stop offset="1" stop-color="#1c8f86"/></linearGradient></defs>' +
      '<rect width="320" height="180" fill="url(#a4b)"/>' +
      '<ellipse cx="160" cy="160" rx="130" ry="20" fill="#37d0c0" opacity="0.10"/>' +
      '<path d="M96 70 v56 a10 10 0 0 0 10 10 h34 a10 10 0 0 0 10 -10 v-56" fill="#ffffff" opacity="0.05"/>' +
      '<path d="M96 70 v56 a10 10 0 0 0 10 10 h34 a10 10 0 0 0 10 -10 v-56" fill="none" stroke="#bfe6df" stroke-width="2" stroke-opacity="0.5"/>' +
      '<path d="M96 100 v26 a10 10 0 0 0 10 10 h34 a10 10 0 0 0 10 -10 v-26 z" fill="url(#a4l1)" opacity="0.9"/>' +
      '<line x1="92" y1="70" x2="154" y2="70" stroke="#bfe6df" stroke-width="3" stroke-opacity="0.6" stroke-linecap="round"/>' +
      '<circle cx="112" cy="118" r="3" fill="#fff6d8"/><circle cx="130" cy="112" r="2.4" fill="#fff6d8"/>' +
      '<rect x="196" y="46" width="16" height="30" fill="#ffffff" opacity="0.05"/>' +
      '<rect x="196" y="46" width="16" height="30" fill="none" stroke="#bfe6df" stroke-width="2" stroke-opacity="0.5"/>' +
      '<circle cx="204" cy="104" r="34" fill="#ffffff" opacity="0.05"/>' +
      '<circle cx="204" cy="104" r="34" fill="none" stroke="#bfe6df" stroke-width="2" stroke-opacity="0.5"/>' +
      '<path d="M174 112 a34 34 0 0 0 60 0 a30 30 0 0 1 -60 0 z" fill="url(#a4l2)" opacity="0.9"/>' +
      '<circle cx="198" cy="112" r="3" fill="#dffaf5"/><circle cx="214" cy="118" r="2.4" fill="#dffaf5"/>' +
      '<g fill="#bfe6df" opacity="0.35"><circle cx="204" cy="40" r="7"/><circle cx="120" cy="56" r="6"/></g>' +
      '</svg>',
    // 5 — Purity Test: 999.9 gold bar with a certified seal & checkmark
    purity:
      '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="a5b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151210"/><stop offset="1" stop-color="#0a0806"/></linearGradient>' +
      '<linearGradient id="a5g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6d8"/><stop offset="0.5" stop-color="#f6e2a0"/><stop offset="1" stop-color="#c9a227"/></linearGradient></defs>' +
      '<rect width="320" height="180" fill="url(#a5b)"/>' +
      '<ellipse cx="150" cy="150" rx="120" ry="22" fill="#c9a227" opacity="0.12"/>' +
      '<path d="M74 92 L166 92 L182 140 L58 140 Z" fill="url(#a5g)"/>' +
      '<path d="M74 92 L166 92 L160 104 L80 104 Z" fill="#fff6d8" opacity="0.5"/>' +
      '<text x="120" y="128" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="20" font-weight="700" fill="#5c4713">999.9</text>' +
      '<circle cx="238" cy="74" r="30" fill="#7c1f2c"/>' +
      '<circle cx="238" cy="74" r="30" fill="none" stroke="url(#a5g)" stroke-width="3"/>' +
      '<path d="M226 74 l8 9 15 -18" stroke="#f6e2a0" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M228 100 l-6 22 12 -8 12 8 -6 -22 z" fill="#7c1f2c"/>' +
      '<path d="M60 58 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" fill="#fff6d8"/>' +
      '</svg>',
    // 6 — Delivery: secure, shielded van carrying serialised bullion
    delivery:
      '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="a6b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#131210"/><stop offset="1" stop-color="#0a0806"/></linearGradient>' +
      '<linearGradient id="a6g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e2a0"/><stop offset="1" stop-color="#c9a227"/></linearGradient></defs>' +
      '<rect width="320" height="180" fill="url(#a6b)"/>' +
      '<ellipse cx="160" cy="150" rx="140" ry="18" fill="#c9a227" opacity="0.10"/>' +
      '<g stroke="#c9a227" stroke-width="3" stroke-linecap="round" opacity="0.5"><path d="M20 78 h34"/><path d="M14 98 h44"/><path d="M24 118 h30"/></g>' +
      '<path d="M70 60 h96 v64 h-96 z" fill="#2b2721" stroke="url(#a6g)" stroke-width="2"/>' +
      '<path d="M166 82 h30 l22 22 v20 h-52 z" fill="#332e26" stroke="url(#a6g)" stroke-width="2"/>' +
      '<rect x="172" y="88" width="24" height="16" rx="2" fill="#0f1413" stroke="#bfe6df" stroke-width="1.5" stroke-opacity="0.4"/>' +
      '<path d="M104 74 l16 6 v14 c0 12 -16 20 -16 20 s-16 -8 -16 -20 v-14 z" fill="#7c1f2c" stroke="url(#a6g)" stroke-width="2"/>' +
      '<path d="M97 94 l6 6 12 -12" stroke="#f6e2a0" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="102" cy="126" r="14" fill="#17130d" stroke="url(#a6g)" stroke-width="3"/>' +
      '<circle cx="186" cy="126" r="14" fill="#17130d" stroke="url(#a6g)" stroke-width="3"/>' +
      '<circle cx="102" cy="126" r="4" fill="#c9a227"/><circle cx="186" cy="126" r="4" fill="#c9a227"/>' +
      '</svg>'
  };
  var steps = [
    { i: I.inbox, g: PA.receive, t: 'Receive Material', d: 'Every lot is weighed on calibrated scales, photographed, sealed and logged with a unique reference in front of you — a fully traceable record from the moment it arrives.' },
    { i: I.flask, g: PA.testing, t: 'Testing', d: 'A representative sample is drawn and analysed by fire assay, XRF and ICP-OES/MS to establish exact gold, silver and PGM content before any processing begins.' },
    { i: I.flame, g: PA.melting, t: 'Melting', d: 'Homogenised material is induction-melted up to 1,800°C, then poured and sampled so the assayed value reflects the true, thoroughly mixed content of the whole lot.' },
    { i: I.beaker, g: PA.refining, t: 'Chemical Refining', d: 'Metals are separated and purified through aqua regia dissolution, precipitation and electrolysis — driving gold and silver to 999.9 fineness while recovering base and PGM values.' },
    { i: I.badge, g: PA.purity, t: 'Purity Test', d: 'The finished metal is re-assayed and certified against LBMA and BIS standards, with a serialised fineness certificate documenting the exact purity of every bar.' },
    { i: I.truck, g: PA.delivery, t: 'Delivery', d: 'Refined bullion or transparent, assay-backed settlement is delivered through insured, GPS-tracked logistics — each bar serialised and reconciled to your original lot.' }
  ];
  var pt = $('#procTrack');
  if (pt) pt.innerHTML = steps.map(function (s, n) {
    return '<div class="step" data-aos="fade-up" data-aos-delay="' + (n * 45) + '">' +
      '<div class="step__art">' + s.g + '</div>' +
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
    { n: 'Mr. Jitendra Patel', r: 'Managing Director – Operations & Technology', in: 'JP', p: 'Drives refinery operations, process engineering and technology adoption for productivity and product quality.', t: ['Refinery Operations', 'Process Engineering', 'Automation', 'Business Dev'] }
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
    { y: '2013', e: 'Jitendra Mullarram Patel. — Naval Metal Grinding Works' },
    { y: '2021', e: 'Ambalal Mullarram Patel — Banaras Metal Grinding Works.' },
    { y: '2026', e: 'Kanak Precious Metal Refinery LLP — present.', now: true }
  ];
  var ht = $('#history');
  if (ht) ht.innerHTML = history.map(function (h) {
    return '<div class="hitem' + (h.now ? ' now' : '') + '"><div class="yr num">' + h.y + '</div><div class="ev">' + h.e + '</div></div>';
  }).join('');

  /* -------- Gallery scenes -------- */
  var scenes = [
    {
      img: 'photo-goldbars.jpg', fb: 'casting.svg', tg: 'Bullion', h: 'Fine Gold Bars',
      d: 'These are cast bars of refined gold, drawn to 999.9 fineness — the highest purity grade traded in the bullion market. Each bar begins as mixed scrap, dust or old ornaments and leaves our refinery as certified, investment-grade metal. Before casting, the melt is homogenised and sampled so the stamped weight and purity exactly match an independent assay. Every bar is serialised with a unique number, its fineness, weight and our refinery mark. That serial links the finished bar back to the original lot it was refined from, giving a complete, auditable chain of custody. Bars are produced in a range of standard sizes to suit jewellers, investors and institutional buyers. Each one ships with a fineness certificate recognised against LBMA and BIS standards. The consistent colour and mirror finish you see are a direct visual sign of high, uniform purity. For clients, this is the end product of the entire refining journey — value they can store, trade or convert with total confidence.'
    },
    {
      img: 'photo-jewellery.jpg', fb: 'scrap.svg', tg: 'Jewellery', h: 'Gold Ornaments',
      d: 'Old and broken gold ornaments are one of the most common materials we receive for refining. Bangles, chains, rings and worn hallmark jewellery all carry gold locked up alongside alloys, solder and stones. On arrival, every piece is weighed and logged in front of you, then carefully sorted so that stones and non-gold attachments are separated and returned or accounted for. A representative sample is assayed to establish the true gold content, because stamped karat marks are often unreliable on older pieces. Only the assayed value — not the visible weight — determines your settlement, which keeps the process transparent and fair. The ornaments are then melted, homogenised and refined back to pure gold. This is how families and jewellers unlock the real, current value of pieces that are outdated, damaged or simply no longer worn. Nothing is estimated by eye; every figure is backed by laboratory testing. The result is a clear, documented conversion from sentimental scrap into certified, tradeable metal.'
    },
    {
      img: 'forging.svg', fb: 'forging.svg', tg: 'Forging', h: 'Molten Gold Pour',
      d: 'This is the melting stage, where sorted material is brought together and heated in an induction furnace to as high as 1,800°C. Melting does far more than liquefy the metal — it blends everything into one uniform mass so that a single sample truly represents the whole lot. Induction heating is clean, fast and precisely controlled, which protects the metal and the assay accuracy. As the charge becomes molten, dross and lighter impurities rise and are skimmed away from the precious metal beneath. The glowing pour you see is carefully directed into moulds or sampling dishes under strict safety controls. A sample taken at this exact moment is what the laboratory tests to confirm gold, silver and PGM content. Because the melt is fully mixed, that number applies fairly across every gram in the batch. This stage is the bridge between raw incoming material and precise chemical refining. It is where disparate scrap becomes one measurable, homogeneous unit ready for purification.'
    },
    {
      img: 'photo-bullion.jpg', fb: 'casting.svg', tg: 'Trading', h: 'Bars & Coins',
      d: 'Alongside refining, Kanak deals in finished bullion — bars and coins ready for investment and trade. These products represent gold in its most liquid, universally recognised form. Coins and small bars suit individual buyers, while larger cast bars serve jewellers and institutional clients. Each item carries clear markings of weight, purity and origin so its value can be verified anywhere. Pricing is tied transparently to live Ahmedabad market rates, which you can see updating on this very site. Because our bullion is refined and certified in-house, buyers get a clean, traceable product with no hidden quality risk. Bars and coins are also an easy way to convert refined scrap value into a portable, storable asset. Whether you are buying to invest or selling to release capital, every transaction is documented and settled to the gram. This blend of refining and trading lets clients complete the full cycle — from old metal to certified bullion to market value — under one roof.'
    },
    {
      img: 'refining.svg', fb: 'refining.svg', tg: 'Processing', h: 'Chemical Refining',
      d: 'Chemical refining is the heart of the purification process, where melted metal is separated into its individual precious components. Gold is dissolved using aqua regia, then selectively precipitated back out as a high-purity powder, leaving impurities behind in solution. Silver is recovered through its own precipitation and electrolytic steps, and platinum-group metals are captured rather than lost. Electrolysis further drives the metal toward 999.9 fineness by depositing pure gold onto cathodes under controlled current. Every chemical stage is monitored so yields are maximised and nothing of value is wasted. The process also safely manages and neutralises spent chemicals in line with environmental practice. What makes this stage powerful is its precision: it can pull real value even from low-grade sweeps, e-waste and spent catalysts. The purified metal that emerges is then re-assayed to confirm it meets certification standards. This is where the promise of full, transparent recovery is actually delivered — atom by atom, gram by gram.'
    },
    {
      img: 'photo-earrings.jpg', fb: 'scrap.svg', tg: 'Craft', h: 'Fine Jewellery',
      d: 'Fine jewellery like these earrings shows the final destination of much of the gold we refine — beautiful, wearable craftsmanship. High-purity refined gold gives artisans a clean, consistent base to alloy and work with, which shows in the finish of the finished piece. When such jewellery eventually returns as old or broken items, the same gold can be recovered and refined once more, completing a natural cycle. For jewellers, reliable purity at the refining stage means predictable results at the workbench and fewer surprises in casting. For customers, it means the karat they pay for is genuinely the karat they receive. Our assaying services also let jewellers verify incoming metal and certify their own stock with confidence. This connection between refining and craft is central to what Kanak does — we sit at the point where raw value becomes finished art. Every ornament represents trust that the metal beneath the design is exactly what it claims to be. That trust, verified by testing, is what we ultimately refine and protect.'
    }
  ];
  var gw = $('#galleryWrap');
  if (gw) gw.innerHTML = scenes.map(function (s, n) {
    return '<div class="swiper-slide"><button type="button" class="scene" data-scene="' + n + '" aria-label="View details: ' + s.h + '"><img src="' + s.img + '" alt="' + s.h + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + s.fb + '\'"/>' +
      '<span class="scene__badge">Tap for details</span>' +
      '<div class="scene__cap"><span class="tg">' + s.tg + '</span><h3>' + s.h + '</h3></div></button></div>';
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
  window.KANAK = { steps: steps, scenes: scenes };
})();
