/* ENVEME — orchestration: intro, Lenis smooth-scroll, GSAP-pinned cinematic
   scroll, HUD beat choreography, live skin switching, fine-tune panel. */

gsap.registerPlugin(ScrollTrigger);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

const ACCENTS = {
  heritage:  ['#BF4A23', '#9A7B2E', '#7A3526', '#3F6B4A'],
  cinematic: ['#E58E3C', '#C25A3A', '#D9A86A', '#B5664A'],
  chrome:    ['#DBA968', '#C98E6B', '#CBB68A', '#B98B4E'],
};

let current = 'heritage';

/* ── logo marks ─────────────────────────────────────────────── */
$('#navmark').innerHTML = LOGO.monogram(30);
$('#footmark').innerHTML = LOGO.monogram(28);
$('#introseal').innerHTML = LOGO.seal(150);
$('#introword').innerHTML = [...'ENVEME'].map((c) => `<span>${c}</span>`).join('');

/* ── skin application ───────────────────────────────────────── */
function applySkin(key, { keepTune = false } = {}) {
  const s = window.SKINS[key];
  if (!s) return;
  current = key;
  const root = document.documentElement;
  for (const [k, v] of Object.entries(s.css)) root.style.setProperty(k, v);
  root.style.setProperty('--font-display', s.fonts.display);
  root.style.setProperty('--font-body', s.fonts.body);
  root.style.setProperty('--font-mono', s.fonts.mono);
  root.style.setProperty('--logo-accent', s.css['--accent']);
  if (window.Scene3D) window.Scene3D.applySkin(s.scene);

  $$('.dock .pill').forEach((p) => p.classList.toggle('active', p.dataset.skin === key));

  if (!keepTune) {
    $('#t-grain').value = s.css['--grain'];
    $('#t-motion').value = 1;
    if (window.Scene3D) window.Scene3D.setMotion(1);
    buildSwatches(key);
  }
}

function buildSwatches(key) {
  const wrap = $('#t-accent');
  wrap.innerHTML = '';
  ACCENTS[key].forEach((c, i) => {
    const b = document.createElement('div');
    b.className = 'sw';
    b.style.background = c;
    if (i === 0) b.style.outline = '2px solid var(--ink)';
    b.onclick = () => {
      document.documentElement.style.setProperty('--accent', c);
      document.documentElement.style.setProperty('--logo-accent', c);
      $$('#t-accent .sw').forEach((x) => (x.style.outline = 'none'));
      b.style.outline = '2px solid var(--ink)';
    };
    wrap.appendChild(b);
  });
}

/* ── HUD beat choreography ──────────────────────────────────── */
const beats = [
  { el: $('[data-beat="hero"]'),      base: 'translateY(-50%)', in0: 0, in1: 0,    out0: 0.09, out1: 0.16, enter: [0, 0],   exit: [0, -48], blur: 6 },
  { el: $('[data-beat="engine"]'),    base: 'translateY(-50%)', in0: 0.20, in1: 0.29, out0: 0.34, out1: 0.41, enter: [-60, 0], exit: [0, -28], blur: 9 },
  { el: $('[data-beat="chassis"]'),   base: 'translateY(-50%)', in0: 0.45, in1: 0.54, out0: 0.59, out1: 0.66, enter: [60, 0],  exit: [0, -28], blur: 9 },
  { el: $('[data-beat="telemetry"]'), base: 'translateX(-50%)', in0: 0.62, in1: 0.70, out0: 0.78, out1: 0.84, enter: [0, 34],  exit: [0, -18], blur: 7 },
  { el: $('[data-beat="cta"]'),       base: '',                 in0: 0.86, in1: 0.94, out0: 1.1,  out1: 1.2,  enter: [0, 26],  exit: [0, 0],   blur: 8 },
];

function paintBeat(b, p) {
  let op, ox, oy, bl;
  if (p < b.in0)        { op = 0; ox = b.enter[0]; oy = b.enter[1]; bl = b.blur; }
  else if (p < b.in1)   { const t = (p - b.in0) / (b.in1 - b.in0); op = t; ox = b.enter[0] * (1 - t); oy = b.enter[1] * (1 - t); bl = b.blur * (1 - t); }
  else if (p < b.out0)  { op = 1; ox = 0; oy = 0; bl = 0; }
  else if (p < b.out1)  { const t = (p - b.out0) / (b.out1 - b.out0); op = 1 - t; ox = b.exit[0] * t; oy = b.exit[1] * t; bl = b.blur * t; }
  else                  { op = 0; ox = b.exit[0]; oy = b.exit[1]; bl = b.blur; }
  b.el.style.opacity = op.toFixed(3);
  b.el.style.transform = `${b.base} translate(${ox.toFixed(1)}px,${oy.toFixed(1)}px)`;
  b.el.style.filter = bl > 0.05 ? `blur(${bl.toFixed(1)}px)` : 'none';
}

const rScene = $('#r-scene'), rOrbit = $('#r-orbit'), rFrame = $('#r-frame'), rBar = $('#r-bar');
function paintRail(p) {
  const sc = p < 0.18 ? 1 : p < 0.42 ? 2 : p < 0.60 ? 3 : p < 0.78 ? 4 : 5;
  rScene.textContent = String(sc).padStart(2, '0');
  rOrbit.textContent = String(Math.round(p * 360)).padStart(3, '0') + '°';
  rFrame.textContent = String(Math.round(p * 100)).padStart(2, '0') + '%';
  rBar.style.top = (p * 102) + 'px';
}

function onProgress(p) {
  if (window.Scene3D) window.Scene3D.setProgress(p);
  beats.forEach((b) => paintBeat(b, p));
  paintRail(p);
  if (window.__twinVisible) window.__twinVisible(p);
}

/* ── boot ───────────────────────────────────────────────────── */
applySkin(current);
window.Scene3D.init($('#stage'));
window.Scene3D.applySkin(window.SKINS[current].scene);

/* Lenis smooth scroll */
const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
lenis.stop(); // locked during intro
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

/* page progress bar */
lenis.on('scroll', ({ scroll, limit }) => {
  $('#progress').style.width = (limit ? (scroll / limit) * 100 : 0) + '%';
});

/* pinned cinematic hero */
ScrollTrigger.create({
  trigger: '#hero',
  start: 'top top',
  end: '+=540%',
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
  onUpdate: (self) => onProgress(self.progress),
});
onProgress(0);

/* ── digital twin hotspots (clickable car parts, rest beat only) ─────────────
   Anchored parametrically over the car's projected screen footprint: uv:[u,v]
   with u=0 left .. 1 right, v=0 top .. 1 bottom of the car. Stable across the
   camera bob. Fine-tune the uv pairs in Claude Code against the live model. */
const HOTSPOTS = [
  { id: 'engine', label: 'Engine', uv: [0.74, 0.40], cat: 'Powerplant', title: '2JZ-GE',
    brand: 'Toyota · 3.0L DOHC inline-6',
    desc: 'Naturally-aspirated 2JZ-GE. This is an early non-VVT-i example — thicker connecting rods and a distributor, the version you want as a foundation.',
    specs: [['Power', '168 kW'], ['Torque', '285 Nm'], ['Aspiration', 'NA']], href: '#instrument', hrefLabel: 'See the instrument cluster' },
  { id: 'intake', label: 'Intake', uv: [0.62, 0.30], cat: 'Intake', title: 'K&N Drop-in',
    brand: 'K&N · performance panel',
    desc: 'Reusable performance panel filter fitted into the factory airbox during the first service — a direct replacement for the OE paper element.',
    specs: [['Type', 'Panel'], ['Housing', 'Factory airbox']], href: '#provenance', hrefLabel: 'View parts fitted' },
  { id: 'security', label: 'Security', uv: [0.46, 0.34], cat: 'Security System', title: 'Avital 5308L',
    brand: 'Avital · two-way',
    desc: 'Two-way alarm hard-wired into the loom: remote start, impact & shock sensing, bonnet trigger, and a starter-kill immobiliser. Every circuit back-probed before cutting.',
    specs: [['Remote start', 'Yes'], ['Sensing', 'Impact · bonnet'], ['Immobiliser', 'Starter-kill']], href: '#journal', hrefLabel: 'Read the install journal' },
  { id: 'drivetrain', label: 'Gearbox', uv: [0.26, 0.58], cat: 'Drivetrain', title: 'R154 Manual',
    brand: 'Kaspa Transmissions · 2020',
    desc: 'A genuine R154 5-speed manual conversion done in 2020 — what turns a luxury GT into a proper driver’s car. Rear-wheel drive.',
    specs: [['Gears', '5-speed'], ['Layout', 'RWD'], ['Year', '2020']], href: '#provenance', hrefLabel: 'View full specification' },
];

(function setupTwin() {
  const layer = $('#twinlayer');
  const spotsWrap = $('#twinspots');
  const panel = $('#twinpanel');
  const hint = $('#twinhint');
  if (!layer) return;

  let activeId = null;

  const spots = HOTSPOTS.map((h) => {
    const s = document.createElement('button');
    s.className = 'tspot';
    s.type = 'button';
    s.innerHTML = `<span class="dot"></span><span class="tlabel">${h.label}</span>`;
    s.onclick = (e) => { e.stopPropagation(); openSpot(h.id); };
    spotsWrap.appendChild(s);
    return { def: h, el: s };
  });

  function openSpot(id) {
    const h = HOTSPOTS.find((x) => x.id === id);
    if (!h) return;
    activeId = id;
    spots.forEach((s) => s.el.classList.toggle('active', s.def.id === id));
    panel.innerHTML = `
      <div class="tp-cat"><span class="tp-k">${h.cat}</span>
        <span class="tp-x" id="twinclose"><svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span></div>
      <h4>${h.title}</h4>
      <div class="tp-brand">${h.brand}</div>
      <p class="tp-desc">${h.desc}</p>
      <div class="tp-specs">${h.specs.map(([k, v]) => `<div><span class="sk">${k}</span><span class="sv">${v}</span></div>`).join('')}</div>
      <a class="tp-link" href="${h.href}">${h.hrefLabel} <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`;
    panel.hidden = false;
    hint.style.display = 'none';
    $('#twinclose').onclick = (e) => { e.stopPropagation(); closeSpot(); };
  }

  function closeSpot() {
    activeId = null;
    panel.hidden = true;
    hint.style.display = '';
    spots.forEach((s) => s.el.classList.remove('active'));
  }

  // visibility tied to scroll: only at the resting hero beat
  let shown = false;
  window.__twinVisible = (p) => {
    const vis = p < 0.075;
    if (vis !== shown) {
      shown = vis;
      layer.classList.toggle('show', vis);
      layer.style.pointerEvents = vis ? '' : 'none';
      if (!vis && activeId) closeSpot();
    }
  };

  // position markers every frame over the car's projected screen footprint
  Scene3D.onFrame(() => {
    if (!shown || !Scene3D.ready) return;
    const b = Scene3D.carBounds();
    if (!b.ok || !(b.w > 0)) { spots.forEach((s) => (s.el.style.opacity = '0')); return; }
    spots.forEach((s) => {
      const [u, v] = s.def.uv;
      s.el.style.opacity = '1';
      s.el.style.pointerEvents = 'auto';
      s.el.style.left = (b.x + u * b.w) + 'px';
      s.el.style.top = (b.y + v * b.h) + 'px';
    });
  });

  window.__twinVisible(0);
})();

/* ── dock + tweaks ──────────────────────────────────────────── */
$$('.dock .pill').forEach((p) => (p.onclick = () => applySkin(p.dataset.skin)));
$('#gear').onclick = () => $('#tweaks').classList.toggle('open');
$('#t-grain').oninput = (e) => document.documentElement.style.setProperty('--grain', e.target.value);
$('#t-motion').oninput = (e) => { if (window.Scene3D) window.Scene3D.setMotion(parseFloat(e.target.value)); };

/* ── intro reveal (CSS/timer driven — robust to rAF throttling) ─ */
function runIntro() {
  const intro = $('#intro');
  setTimeout(() => intro.classList.add('show'), 90);

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    intro.classList.add('hide');
    $('.b-hero').classList.add('hero-revealed');
    setTimeout(() => {
      intro.style.display = 'none';
      lenis.start();
      ScrollTrigger.refresh();
    }, 900);
  };

  const minTime = new Promise((r) => setTimeout(r, 2000));
  const modelReady = new Promise((r) => window.Scene3D.onReady(r));
  Promise.all([minTime, modelReady]).then(finish);
  setTimeout(finish, 6500); // hard fallback
}
runIntro();

/* keep canvas crisp on resize during pin */
window.addEventListener('resize', () => ScrollTrigger.refresh());

/* debug/verify hook — drive scroll state without rAF/scroll */
window.ENVEME = { setProgress: onProgress, applySkin };
