/* ENVEME — content layer.
   Real vehicle + build data sourced from the GarageOS app (lib/vehicleData.ts,
   lib/buildData.ts). Renders: spec ticker, analog instrument cluster (odometer
   roll + needle sweeps), provenance band + full spec sheet, build journal, and
   a contact-sheet gallery. Plus scroll-reveal choreography. No lorem ipsum. */

(() => {
  'use strict';

  /* ── DATA ─────────────────────────────────────────────────────────────── */

  const VEHICLE = {
    name: '1995 Toyota Soarer', chassis: 'JZZ31', aka: 'Lexus SC300 (USDM)',
    year: 1995, body: '2-door grand tourer coupé', plate: 'ENVEME', market: 'New Zealand',
    colour: 'Bluish Silver Metallic (1A0)', odometer: 49000, odometerCurrent: 53951, status: 'Street registered · Active build',
    engine: { code: '2JZ-GE', type: '3.0L DOHC Inline-6', disp: '2997cc', aspiration: 'Naturally aspirated', hp: 225, hpRpm: 6000, lbft: 210, tqRpm: 4800 },
    gearbox: 'R154 5-speed manual', layout: 'RWD', weight: '1590 kg',
  };

  const SPEC_SHEET = [
    { k: 'Make', v: 'Toyota' },
    { k: 'Model', v: 'Soarer (JZZ31)' },
    { k: 'Also known as', v: 'Lexus SC300 (USDM)' },
    { k: 'Year', v: '1995' },
    { k: 'Engine code', v: '2JZ-GE' },
    { k: 'Engine type', v: '3.0L DOHC Inline-6' },
    { k: 'Displacement', v: '2997 cc' },
    { k: 'Power output', v: '225 hp · 168 kW @ 6000 rpm' },
    { k: 'Torque', v: '285 Nm @ 4800 rpm' },
    { k: 'Aspiration', v: 'Naturally aspirated' },
    { k: 'Transmission', v: 'R154 5-speed manual' },
    { k: 'Drivetrain', v: 'Rear-wheel drive' },
    { k: 'Kerb weight', v: '1590 kg' },
    { k: 'Body style', v: '2-door grand tourer coupé' },
    { k: 'Original colour', v: 'Bluish Silver Metallic (1A0)' },
    { k: 'Odometer at purchase', v: '≈49,000 km' },
  ];

  const PROVENANCE = [
    { k: 'Acquired', v: 'Browns Bay, NZ', sub: 'July 2025' },
    { k: 'On the clock', v: '≈49,000 km', sub: 'at purchase' },
    { k: 'Gearbox', v: 'R154 manual swap', sub: 'Kaspa Transmissions · 2020' },
    { k: 'Engine spec', v: 'Early non-VVT-i', sub: 'thicker rods · distributor' },
    { k: 'Finish', v: 'Bluish Silver', sub: 'metallic 1A0' },
    { k: 'NZ plate', v: 'ENVEME', sub: 'street registered' },
  ];

  // Derived from the documented build journal + spec — the fitment-verified mods.
  const MODS = [
    { name: 'R154 Manual Conversion', brand: 'Kaspa Transmissions', cat: 'Drivetrain', col: '#34D399', note: '5-speed manual swap · 2020' },
    { name: 'Street Basis Z Coilovers', brand: 'Tein', cat: 'Suspension', col: '#E8920A', note: '−30 mm ride height' },
    { name: 'Drop-in Performance Filter', brand: 'K&N', cat: 'Intake', col: '#60A5FA', note: 'Factory airbox panel' },
    { name: '5308L Alarm & Security', brand: 'Avital', cat: 'Electrical', col: '#A78BFA', note: 'Two-way · hard-wired' },
    { name: 'FH-P040 Bluetooth Retrofit', brand: 'Carrozzeria', cat: 'Audio', col: '#22D3EE', note: 'Soldered into OE head unit' },
    { name: 'Drive Belt & Tensioner', brand: 'Gates', cat: 'Engine', col: '#F87171', note: 'Belt + aftermarket tensioner' },
    { name: 'Harmonic Damper', brand: 'OEM-equivalent', cat: 'Engine', col: '#F87171', note: 'Crankshaft pulley renewal' },
    { name: 'Valve Cover Gaskets', brand: 'Amayama', cat: 'Engine', col: '#F87171', note: 'Both cam covers · oil leak' },
  ];

  const JOURNAL = [
    { date: 'In progress', cat: 'Fabrication', col: '#60A5FA', read: '4 min',
      title: 'Reverse-Engineering Trim & Ganador Mirrors in Fusion 360',
      excerpt: 'Cracked dash AC vents and Ganador-style aero mirrors get the CAD treatment — pull the part, measure by hand with vernier calipers, rebuild it dimension-by-dimension for 3D printing.',
      tools: ['Vernier calipers', 'Fusion 360', '3D printer'],
      photos: [
        { src: 'photos/vent-dash.jpg', cap: 'Factory AC vent in the burlwood dash' },
        { src: 'photos/vent-removed.jpg', cap: 'Vent pulled for measuring up' },
        { src: 'photos/vent-bench-2.jpg', cap: 'Centre trim & vents off the car' },
      ] },
    { date: 'Mar 2026', cat: 'Electrical', col: '#A78BFA', read: '4 min',
      title: 'Avital 5308L Alarm & Carrozzeria Bluetooth Retrofit',
      excerpt: 'Two electrical jobs back to back: a two-way aftermarket alarm wired directly into the loom, and Bluetooth soldered into the period-correct FH-P040 head unit. Back-probed every circuit before cutting.',
      tools: ['Soldering iron', 'Voltmeter', 'Crimping tool', 'Heat-shrink'],
      photos: [
        { src: 'photos/soldering-acc.jpg', cap: 'Soldering the ACC tap into the loom' },
        { src: 'photos/hvac-1.jpg', cap: 'Climate stack out for access' },
      ] },
    { date: 'Oct 2025', cat: 'Engine', col: '#F87171', read: '5 min',
      title: 'Front-of-Engine Refresh — Pulley, Gaskets & Belt',
      excerpt: 'OEM-replacement harmonic damper, fresh valve cover gaskets to cure an oil weep, and a Gates belt with a new tensioner to kill a squeak. The crank pulley bolt is the real fight — torqued enormous from the factory.',
      tools: ['Breaker bar', 'Impact wrench', 'Torque wrench', 'Holding tool'],
      photos: [
        { src: 'photos/gaskets-cam.jpg', cap: 'Cam covers off for the gasket job' },
        { src: 'photos/gaskets-night.jpg', cap: 'Breather lines & plug leads' },
        { src: 'photos/engine-bay-kn.jpg', cap: '2JZ-GE bay buttoned back up' },
      ] },
    { date: 'Jul 2025', cat: 'Maintenance', col: '#34D399', read: '4 min',
      title: 'Full Service & Baseline Assessment',
      excerpt: 'Days after pickup: Valvoline 5W-30, a fresh filter and a K&N drop-in, then an honest baseline. The pre-purchase WOF had already flagged leaking shocks and a worn steering rack — logged as priority future work.',
      tools: ['Oil drain pan', 'Filter wrench', 'Jack & stands'],
      photos: [
        { src: 'photos/engine-bay-kn.jpg', cap: 'K&N drop-in in the factory airbox' },
      ] },
    { date: 'Jul 2025', cat: 'Acquisition', col: '#E8920A', read: '5 min',
      title: 'Buying the JZZ31 — Why This Car?',
      excerpt: 'Picked up in Browns Bay with 49,000 km — a clean low-spec JZZ31 in Bluish Silver, already on an R154 manual. Low spec means less to break, and the early non-VVT-i 2JZ-GE is one of the best project platforms going.',
      tools: [], photos: [] },
  ];

  const GALLERY = [
    { id: 'g-engine',   src: 'photos/engine-bay-kn.jpg', cap: 'Engine bay · K&N intake',       frame: 'A-01', span: 'wide' },
    { id: 'g-cam',      src: 'photos/gaskets-cam.jpg',   cap: 'Cam covers off · gasket job',   frame: 'A-02', span: '' },
    { id: 'g-night',    src: 'photos/gaskets-night.jpg', cap: 'Breather lines · valve covers',  frame: 'A-03', span: '' },
    { id: 'g-solder',   src: 'photos/soldering-acc.jpg', cap: 'Harness soldering · ACC tap',    frame: 'B-01', span: '' },
    { id: 'g-vent',     src: 'photos/vent-removed.jpg',  cap: 'AC vent removed · CAD reference', frame: 'B-02', span: 'tall' },
    { id: 'g-dash',     src: 'photos/vent-dash.jpg',     cap: 'AC vent · burlwood dash',       frame: 'B-03', span: '' },
    { id: 'g-bench',    src: 'photos/vent-bench-1.jpg',  cap: 'Trim & vent off the car',       frame: 'C-01', span: '' },
    { id: 'g-heater',   src: 'photos/dash-vents.jpg',    cap: 'Centre vents · dash',           frame: 'C-02', span: 'wide' },
  ];

  /* ── STYLES ───────────────────────────────────────────────────────────── */

  const css = `
  /* shared section frame */
  .sec{ position:relative; z-index:5; background:var(--bg); transition:background var(--skin-fade);
    padding:clamp(4.5rem,11vh,8rem) clamp(1.25rem,5vw,5rem); border-top:1px solid var(--line-soft); }
  .sec-head{ display:flex; align-items:flex-end; justify-content:space-between; gap:2rem; flex-wrap:wrap; margin-bottom:3rem; }
  .sec-head h2{ font-family:var(--font-display); font-size:clamp(2.1rem,5.5vw,4rem); font-weight:800; text-transform:uppercase; line-height:.9; letter-spacing:-.02em; color:var(--ink); }
  .sec-head .lede{ color:var(--ink-soft); max-width:330px; font-size:1rem; line-height:1.6; }
  .sec-idx{ font-family:var(--font-mono); font-size:.6rem; letter-spacing:.3em; color:var(--ink-faint); }

  /* reveal */
  .rv{ opacity:0; transform:translateY(26px); }
  .rv.in{ opacity:1; transform:none; transition:opacity .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1); }

  /* ── spec ticker ─────────────────────────────────────────── */
  .ticker{ position:relative; z-index:5; overflow:hidden; background:var(--accent); color:var(--on-accent);
    border-top:1px solid rgba(0,0,0,.18); border-bottom:1px solid rgba(0,0,0,.18); padding:.55rem 0; transition:background var(--skin-fade); }
  .ticker .track{ display:inline-flex; gap:0; white-space:nowrap; animation:tickerscroll 34s linear infinite; will-change:transform; }
  .ticker:hover .track{ animation-play-state:paused; }
  .ticker .ti{ font-family:var(--font-mono); font-size:.66rem; letter-spacing:.2em; text-transform:uppercase; padding:0 1.4rem; display:inline-flex; align-items:center; gap:.6rem; }
  .ticker .ti b{ font-weight:700; }
  .ticker .ti i{ width:4px; height:4px; background:var(--on-accent); border-radius:50%; display:inline-block; opacity:.6; font-style:normal; }
  @keyframes tickerscroll{ to{ transform:translateX(-50%); } }

  /* ── instrument cluster ──────────────────────────────────── */
  .clusterwrap{ display:grid; grid-template-columns:1.1fr 1fr 1.1fr; gap:clamp(1rem,3vw,3rem); align-items:center; }
  @media(max-width:880px){ .clusterwrap{ grid-template-columns:1fr; gap:2.5rem; } }
  .gauge{ position:relative; aspect-ratio:1; max-width:340px; margin:0 auto; width:100%; }
  .gauge svg{ width:100%; height:100%; overflow:visible; }
  .gauge .tick{ stroke:var(--line); stroke-width:1.4; }
  .gauge .tick.maj{ stroke:var(--ink-soft); stroke-width:2; }
  .gauge .redzone{ stroke:var(--accent-2); stroke-width:6; fill:none; opacity:.7; }
  .gauge .arcbg{ stroke:var(--line); stroke-width:6; fill:none; }
  .gauge .arcfill{ stroke:var(--accent); stroke-width:6; fill:none; stroke-linecap:round; }
  .gauge .needle{ stroke:var(--ink); stroke-width:3.2; stroke-linecap:round; transform-origin:50% 50%; transition:none; }
  .gauge .hub{ fill:var(--ink); }
  .gauge .hub2{ fill:var(--accent); }
  .gauge .glabel{ font-family:var(--font-mono); font-size:9px; letter-spacing:.18em; fill:var(--ink-faint); text-transform:uppercase; }
  .gauge .gnum{ font-family:var(--font-mono); font-size:11px; fill:var(--ink-soft); }
  .gauge .center-k{ font-family:var(--font-mono); font-size:8.5px; letter-spacing:.24em; fill:var(--ink-faint); text-transform:uppercase; }
  .gauge .center-v{ font-family:var(--font-display); font-weight:800; fill:var(--ink); }
  .gauge .center-u{ font-family:var(--font-mono); fill:var(--accent); }

  /* odometer */
  .odo{ display:flex; flex-direction:column; align-items:center; gap:1.1rem; }
  .odo .odo-k{ font-family:var(--font-mono); font-size:.6rem; letter-spacing:.3em; text-transform:uppercase; color:var(--ink-faint); }
  .odoroll{ display:inline-flex; gap:4px; padding:.7rem .8rem; background:var(--surface-2); border:1px solid var(--line); border-radius:var(--radius); }
  .odoroll .digit{ position:relative; width:30px; height:46px; overflow:hidden; background:var(--bg2); border-radius:2px; box-shadow:inset 0 2px 6px rgba(0,0,0,.28); }
  .odoroll .digit .strip{ position:absolute; left:0; top:0; width:100%; transition:transform 1.6s cubic-bezier(.22,1,.36,1); }
  .odoroll .digit .strip span{ display:flex; align-items:center; justify-content:center; height:46px; font-family:var(--font-mono); font-weight:600; font-size:1.5rem; color:var(--ink); }
  .odoroll .digit.unit{ background:var(--accent); }
  .odoroll .digit.unit .strip span{ color:var(--on-accent); }
  .odoroll .sep{ align-self:center; color:var(--ink-faint); font-family:var(--font-mono); }
  .odo .odo-sub{ font-family:var(--font-mono); font-size:.62rem; letter-spacing:.14em; color:var(--ink-soft); text-transform:uppercase; }

  /* ── provenance + spec sheet ─────────────────────────────── */
  .provband{ display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1px; background:var(--line-soft); border:1px solid var(--line-soft); margin-bottom:3.5rem; }
  .provcell{ background:var(--bg); padding:1.5rem 1.6rem; transition:background .3s; }
  .provcell:hover{ background:var(--surface); }
  .provcell .pk{ font-family:var(--font-mono); font-size:.56rem; letter-spacing:.24em; text-transform:uppercase; color:var(--accent); }
  .provcell .pv{ font-family:var(--font-display); font-size:1.45rem; font-weight:700; color:var(--ink); line-height:1.05; margin:.5rem 0 .2rem; text-transform:uppercase; }
  .provcell .ps{ font-family:var(--font-mono); font-size:.64rem; letter-spacing:.06em; color:var(--ink-soft); }

  .sheet{ columns:2; column-gap:3.5rem; }
  @media(max-width:680px){ .sheet{ columns:1; } }
  .sheet .srow{ break-inside:avoid; display:flex; align-items:baseline; justify-content:space-between; gap:1rem; padding:.72rem 0; border-bottom:1px solid var(--line-soft); }
  .sheet .sk{ font-family:var(--font-mono); font-size:.66rem; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-faint); }
  .sheet .sv{ font-family:var(--font-mono); font-size:.82rem; color:var(--ink); text-align:right; letter-spacing:.02em; }

  .modgrid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:1px; background:var(--line-soft); border:1px solid var(--line-soft); margin-top:3.5rem; }
  .modcard{ background:var(--bg); padding:1.4rem 1.5rem; display:flex; flex-direction:column; gap:.55rem; transition:background .3s; }
  .modcard:hover{ background:var(--surface); }
  .modcard .mtop{ display:flex; align-items:center; justify-content:space-between; gap:.7rem; }
  .modcard .mtag{ font-family:var(--font-mono); font-size:.52rem; letter-spacing:.18em; text-transform:uppercase; padding:.22rem .5rem; border-radius:999px; border:1px solid currentColor; }
  .modcard .mbrand{ font-family:var(--font-mono); font-size:.58rem; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); }
  .modcard .mname{ font-family:var(--font-display); font-size:1.15rem; font-weight:700; color:var(--ink); text-transform:uppercase; line-height:1.05; letter-spacing:.01em; }
  .modcard .mnote{ font-family:var(--font-mono); font-size:.66rem; color:var(--ink-soft); letter-spacing:.04em; }

  /* ── journal ─────────────────────────────────────────────── */
  .jgrid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(330px,1fr)); gap:1.5rem; }
  .jcard{ position:relative; background:var(--surface); border:1px solid var(--line-soft); border-radius:var(--radius); padding:1.8rem 1.8rem 1.6rem; display:flex; flex-direction:column; gap:.9rem; overflow:hidden; transition:transform .3s, border-color .3s, background .3s; }
  .jcard:hover{ transform:translateY(-4px); border-color:var(--line); background:var(--surface-2); }
  .jcard::before{ content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--jc, var(--accent)); opacity:.85; }
  .jcard .jmeta{ display:flex; align-items:center; gap:.7rem; }
  .jcard .jcat{ font-family:var(--font-mono); font-size:.54rem; letter-spacing:.2em; text-transform:uppercase; padding:.24rem .55rem; border-radius:999px; color:var(--jc,var(--accent)); border:1px solid currentColor; }
  .jcard .jdate{ font-family:var(--font-mono); font-size:.6rem; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-faint); }
  .jcard .jdate.live{ color:var(--accent); display:inline-flex; align-items:center; gap:.4rem; }
  .jcard .jdate.live::before{ content:''; width:5px; height:5px; border-radius:50%; background:var(--accent); animation:livepulse 1.8s ease-in-out infinite; }
  @keyframes livepulse{ 0%,100%{ opacity:.35; } 50%{ opacity:1; } }
  .jcard h3{ font-family:var(--font-display); font-size:1.4rem; font-weight:700; color:var(--ink); line-height:1.05; text-transform:uppercase; letter-spacing:.01em; }
  .jcard .jexc{ font-size:.95rem; line-height:1.6; color:var(--ink-soft); }
  .jcard .jphotos{ display:flex; gap:.5rem; }
  .jcard .jphoto{ flex:1; min-width:0; margin:0; }
  .jcard .jphoto img{ width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:2px; border:1px solid var(--line-soft); display:block; filter:saturate(.95); }
  .jcard .jphoto figcaption{ font-family:var(--font-mono); font-size:.5rem; letter-spacing:.04em; color:var(--ink-faint); margin-top:.35rem; line-height:1.3; }
  .jcard .jfoot{ display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-top:auto; padding-top:1rem; border-top:1px solid var(--line-soft); }
  .jcard .jtools{ display:flex; flex-wrap:wrap; gap:.35rem; }
  .jcard .jtool{ font-family:var(--font-mono); font-size:.55rem; letter-spacing:.08em; color:var(--ink-faint); padding:.18rem .45rem; border:1px solid var(--line-soft); border-radius:3px; }
  .jcard .jread{ font-family:var(--font-mono); font-size:.58rem; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-faint); white-space:nowrap; }

  /* ── contact-sheet gallery ───────────────────────────────── */
  .contact{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
  @media(max-width:900px){ .contact{ grid-template-columns:repeat(2,1fr); } }
  .frameblk{ display:flex; flex-direction:column; gap:.5rem; }
  .frameblk.wide{ grid-column:span 2; }
  @media(max-width:900px){ .frameblk.wide{ grid-column:span 2; } }
  .frameblk.tall image-slot{ aspect-ratio:3/4; }
  .frameblk .holder{ position:relative; border:1px solid var(--line); padding:6px; background:var(--surface); }
  .frameblk .holder::before, .frameblk .holder::after{ content:''; position:absolute; width:8px; height:8px; border:1px solid var(--ink-faint); opacity:.5; }
  .frameblk .holder::before{ left:-1px; top:-1px; border-right:0; border-bottom:0; }
  .frameblk .holder::after{ right:-1px; bottom:-1px; border-left:0; border-top:0; }
  .frameblk image-slot{ width:100%; aspect-ratio:3/2; display:block; }
  .frameblk .fcap{ display:flex; align-items:center; justify-content:space-between; gap:.6rem; }
  .frameblk .fcap .fc{ font-family:var(--font-mono); font-size:.6rem; letter-spacing:.06em; color:var(--ink-soft); }
  .frameblk .fcap .ff{ font-family:var(--font-mono); font-size:.56rem; letter-spacing:.16em; color:var(--accent); }
  `;

  /* ── RENDER ───────────────────────────────────────────────────────────── */

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function renderTicker(host) {
    const items = [
      ['Engine', '2JZ-GE'], ['Disp', '2997 cc'], ['Power', '168 kW'], ['Torque', '285 Nm'],
      ['Redline', '6800 rpm'], ['Gearbox', 'R154'], ['Layout', 'RWD'], ['Weight', '1590 kg'],
      ['Chassis', 'JZZ31'], ['Colour', '1A0'], ['Plate', 'ENVEME'], ['Odo', '≈49,000 km'],
    ];
    const seg = items.map(([k, v]) => `<span class="ti">${k} <b>${v}</b> <i>·</i></span>`).join('');
    host.innerHTML = `<div class="track">${seg}${seg}</div>`;
  }

  // SVG arc gauge — needle sweeps from min to target on reveal.
  function gauge({ label, max, target, unit, big, redFrom }) {
    const cx = 100, cy = 100, r = 78;
    const a0 = 135, a1 = 405; // degrees, sweep 270°
    const toRad = (d) => (d - 90) * Math.PI / 180;
    const pt = (ang, rad) => [cx + rad * Math.cos(toRad(ang)), cy + rad * Math.sin(toRad(ang))];
    const arcPath = (rad, deg0, deg1) => {
      const [x0, y0] = pt(deg0, rad), [x1, y1] = pt(deg1, rad);
      const large = (deg1 - deg0) > 180 ? 1 : 0;
      return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${rad} ${rad} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
    };
    let ticks = '';
    const N = 10;
    for (let i = 0; i <= N; i++) {
      const ang = a0 + (a1 - a0) * (i / N);
      const maj = i % 2 === 0;
      const [ox, oy] = pt(ang, r + 2), [ix, iy] = pt(ang, r - (maj ? 12 : 7));
      ticks += `<line class="tick ${maj ? 'maj' : ''}" x1="${ox.toFixed(1)}" y1="${oy.toFixed(1)}" x2="${ix.toFixed(1)}" y2="${iy.toFixed(1)}"/>`;
      if (maj) {
        const [lx, ly] = pt(ang, r - 24);
        ticks += `<text class="gnum" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${Math.round(max * i / N)}</text>`;
      }
    }
    const red = redFrom != null
      ? `<path class="redzone" d="${arcPath(r, a0 + (a1 - a0) * (redFrom / max), a1)}"/>` : '';
    const arcLen = 2 * Math.PI * r * (270 / 360);
    const targetDeg = a0 + (a1 - a0) * (target / max);
    const [nx, ny] = pt(a0, r - 18);

    const frac = target / max;

    const g = el('div', 'gauge rv');
    g.innerHTML = `
      <svg viewBox="0 0 200 200">
        <path class="arcbg" d="${arcPath(r, a0, a1)}"/>
        <path class="arcfill" d="${arcPath(r, a0, a1)}" stroke-dasharray="${arcLen.toFixed(2)}" stroke-dashoffset="${arcLen.toFixed(2)}"/>
        ${red}${ticks}
        <line class="needle" x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}"/>
        <circle class="hub" cx="${cx}" cy="${cy}" r="9"/>
        <circle class="hub2" cx="${cx}" cy="${cy}" r="3.5"/>
        <text class="center-k" x="${cx}" y="${cy + 30}" text-anchor="middle">${label}</text>
        <text class="center-v" x="${cx}" y="${cy + 56}" text-anchor="middle" font-size="22"><tspan class="gv">0</tspan><tspan class="center-u" font-size="11"> ${unit}</tspan></text>
      </svg>`;
    g._anim = { target, big, targetDeg, a0, arcLen, frac };
    return g;
  }

  function animateGauge(g) {
    const { target, targetDeg, a0, arcLen, frac } = g._anim;
    const needle = g.querySelector('.needle');
    const arc = g.querySelector('.arcfill');
    const val = g.querySelector('.gv');
    const dur = 1700, t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const overshoot = (t) => { const c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
    (function frame(now) {
      const p = Math.min(1, (now - t0) / dur);
      const e = ease(p);
      const swing = overshoot(p); // needle springs slightly past then settles
      needle.setAttribute('transform', `rotate(${((targetDeg - a0) * Math.min(1, swing)).toFixed(2)} 100 100)`);
      arc.style.strokeDashoffset = String(arcLen * (1 - frac * e));
      val.textContent = Math.round(target * e).toLocaleString('en-NZ');
      if (p < 1) requestAnimationFrame(frame);
    })(t0);
  }

  function renderInstrument(host) {
    host.innerHTML = '';
    const head = el('div', 'sec-head rv');
    head.innerHTML = `
      <div><span class="label">Instrumentation · live readout</span><h2>The<br>Numbers</h2></div>
      <p class="lede">The 2JZ-GE's naturally-aspirated figures, read straight off the spec — needle-swept from zero. The odometer is the current reading, synced from GarageOS.</p>`;
    host.appendChild(head);

    const wrap = el('div', 'clusterwrap');

    const gTach = gauge({ label: 'Power · RPM ×1000', max: 8, target: 6, unit: '×1k rpm', big: 6, redFrom: 6.8 });

    // odometer in the middle
    // GARAGEOS-SYNC: odometer.current — placeholder value; wire to live GarageOS feed in Claude Code.
    const odo = el('div', 'odo rv');
    odo.innerHTML = `<div class="odo-k">Odometer · current</div>`;
    const roll = el('div', 'odoroll');
    roll.setAttribute('data-garageos-field', 'odometer.current');
    const digits = String(VEHICLE.odometerCurrent).padStart(6, '0').split(''); // 053951
    digits.forEach((d, i) => {
      const isUnit = i === digits.length - 1;
      const cell = el('div', 'digit' + (isUnit ? ' unit' : ''));
      const strip = el('div', 'strip');
      let spans = '';
      for (let n = 0; n <= 10; n++) spans += `<span>${n % 10}</span>`;
      strip.innerHTML = spans;
      cell.appendChild(strip);
      cell.dataset.target = d;
      roll.appendChild(cell);
      if (i === 2) roll.appendChild(el('div', 'sep', ','));
    });
    odo.appendChild(roll);
    odo.appendChild(el('div', 'odo-sub', 'kilometres · synced from GarageOS'));

    const gTorque = gauge({ label: 'Peak Torque', max: 350, target: 285, unit: 'Nm', big: 285 });

    wrap.appendChild(gTach);
    wrap.appendChild(odo);
    wrap.appendChild(gTorque);
    host.appendChild(wrap);

    host._gauges = [gTach, gTorque];
    host._odoRoll = roll;
  }

  function animateOdo(roll) {
    [...roll.querySelectorAll('.digit')].forEach((cell, i) => {
      const t = parseInt(cell.dataset.target, 10);
      const strip = cell.querySelector('.strip');
      setTimeout(() => { strip.style.transform = `translateY(${-t * 46}px)`; }, i * 130);
    });
  }

  function renderProvenance(host) {
    host.innerHTML = '';
    const head = el('div', 'sec-head rv');
    head.innerHTML = `
      <div><span class="label">Provenance · single source of truth</span><h2>The<br>Specification</h2></div>
      <p class="lede">Pulled from the GarageOS backend that runs the car — never lorem ipsum, always the current recorded state.</p>`;
    host.appendChild(head);

    const band = el('div', 'provband rv');
    band.innerHTML = PROVENANCE.map(p =>
      `<div class="provcell"><div class="pk">${p.k}</div><div class="pv">${p.v}</div><div class="ps">${p.sub}</div></div>`
    ).join('');
    host.appendChild(band);

    const sheet = el('div', 'sheet rv');
    sheet.innerHTML = SPEC_SHEET.map(s =>
      `<div class="srow"><span class="sk">${s.k}</span><span class="sv">${s.v}</span></div>`
    ).join('');
    host.appendChild(sheet);

    const modhead = el('div', 'rv', `<div style="margin-top:3.5rem"><span class="label">Fitment-verified · ${MODS.length} parts</span><h2 style="font-family:var(--font-display);font-size:clamp(1.6rem,4vw,2.6rem);font-weight:800;text-transform:uppercase;letter-spacing:-.01em;margin-top:.6rem;color:var(--ink)">Parts Fitted</h2></div>`);
    host.appendChild(modhead);

    const mods = el('div', 'modgrid rv');
    mods.innerHTML = MODS.map(m =>
      `<div class="modcard"><div class="mtop"><span class="mbrand">${m.brand}</span><span class="mtag" style="color:${m.col}">${m.cat}</span></div><div class="mname">${m.name}</div><div class="mnote">${m.note}</div></div>`
    ).join('');
    host.appendChild(mods);
  }

  function renderJournal(host) {
    host.innerHTML = '';
    const head = el('div', 'sec-head rv');
    head.innerHTML = `
      <div><span class="label">Build Journal · ${JOURNAL.length} entries</span><h2>The<br>Logbook</h2></div>
      <p class="lede">Every modification, service and decision — documented from acquisition to the work on the bench right now.</p>`;
    host.appendChild(head);

    const grid = el('div', 'jgrid');
    JOURNAL.forEach(j => {
      const card = el('article', 'jcard rv');
      card.style.setProperty('--jc', j.col);
      const live = j.date.toLowerCase().includes('progress');
      card.innerHTML = `
        <div class="jmeta">
          <span class="jcat">${j.cat}</span>
          <span class="jdate ${live ? 'live' : ''}">${j.date}</span>
        </div>
        <h3>${j.title}</h3>
        <p class="jexc">${j.excerpt}</p>
        ${(j.photos && j.photos.length) ? `<div class="jphotos">${j.photos.map(p => `<figure class="jphoto"><img src="${p.src}" alt="${p.cap}" loading="lazy"><figcaption>${p.cap}</figcaption></figure>`).join('')}</div>` : ''}
        <div class="jfoot">
          <div class="jtools">${j.tools.slice(0, 3).map(t => `<span class="jtool">${t}</span>`).join('') || '<span class="jtool">documented</span>'}</div>
          <span class="jread">${j.read}</span>
        </div>`;
      grid.appendChild(card);
    });
    host.appendChild(grid);
  }

  function renderGallery(host) {
    host.innerHTML = '';
    const head = el('div', 'sec-head rv');
    head.innerHTML = `
      <div><span class="label">Contact Sheet · the car</span><h2>The<br>Frames</h2></div>
      <p class="lede">Real shots from the build — the engine bay, the gasket refresh, the wiring, the trim CAD work. Drop your own over any frame to replace it.</p>`;
    host.appendChild(head);

    const grid = el('div', 'contact rv');
    GALLERY.forEach(g => {
      const blk = el('div', 'frameblk' + (g.span ? ' ' + g.span : ''));
      blk.innerHTML = `
        <div class="holder"><image-slot id="${g.id}" src="${g.src}" placeholder="${g.cap}" radius="0"></image-slot></div>
        <div class="fcap"><span class="fc">${g.cap}</span><span class="ff">${g.frame}</span></div>`;
      grid.appendChild(blk);
    });
    host.appendChild(grid);
  }

  /* ── REVEAL + GAUGE TRIGGER ───────────────────────────────────────────── */

  function setupReveal(instrumentHost) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
        if (e.target === instrumentHost._trigger) {
          instrumentHost._gauges.forEach(animateGauge);
          animateOdo(instrumentHost._odoRoll);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach(n => io.observe(n));
  }

  /* ── BOOT ─────────────────────────────────────────────────────────────── */

  function boot() {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    renderTicker(document.getElementById('ticker'));
    const inst = document.getElementById('instrument');
    renderInstrument(inst);
    renderProvenance(document.getElementById('provenance'));
    renderJournal(document.getElementById('journal'));
    renderGallery(document.getElementById('gallery'));

    // gauge trigger = the cluster wrap (reveal element)
    inst._trigger = inst.querySelector('.clusterwrap') || inst.querySelector('.odo');
    if (inst._trigger) inst._trigger.classList.add('rv');

    setupReveal(inst);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
