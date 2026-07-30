/* ENVEME brand mark — "The Datum Seal".
   A gauge-bezel roundel (analog instrument = the car + precision of a resto-mod),
   a measured tick ring + accent sweep (calibration / preservation), curved
   heritage lettering, and a geometric E monogram at the datum line.
   Strokes use currentColor; the accent sweep uses var(--logo-accent).
   Recolours per skin for free. */

(function () {
  const CX = 100, CY = 100;

  // deg measured clockwise from 12 o'clock
  function pt(r, deg) {
    const a = (deg - 90) * Math.PI / 180;
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
  }
  function arc(r, d0, d1, sweep) {
    const [x0, y0] = pt(r, d0);
    const [x1, y1] = pt(r, d1);
    const large = Math.abs(d1 - d0) > 180 ? 1 : 0;
    return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }

  function ticks() {
    let out = '';
    for (let i = 0; i < 60; i++) {
      const deg = i * 6;
      const major = i % 5 === 0;
      const r1 = 90;
      const r2 = major ? 80 : 85;
      const [x1, y1] = pt(r1, deg);
      const [x2, y2] = pt(r2, deg);
      out += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="currentColor" stroke-width="${major ? 1.6 : 0.8}" opacity="${major ? 0.85 : 0.4}"/>`;
    }
    return out;
  }

  // Curved text arcs (invisible paths used by <textPath>)
  const topArc = arc(70, -74, 74, 1);          // left→right over the top
  const botArc = arc(70, 254, 106, 0);         // left→right along the bottom

  // Geometric "E" monogram sitting on the datum line
  const E = `
    <g stroke="currentColor" stroke-width="6.5" stroke-linecap="round" fill="none">
      <line x1="82" y1="78" x2="82" y2="122"/>
      <line x1="82" y1="78"  x2="120" y2="78"/>
      <line x1="82" y1="122" x2="120" y2="122"/>
    </g>
    <!-- datum needle: the centre stroke as a gauge needle, in accent -->
    <line x1="76" y1="100" x2="132" y2="100" stroke="var(--logo-accent, #BF4A23)" stroke-width="6.5" stroke-linecap="round"/>
    <circle cx="79" cy="100" r="4.5" fill="var(--logo-accent, #BF4A23)"/>
  `;

  window.LOGO = {
    /* full seal mark */
    seal(size = 120) {
      return `
<svg class="enveme-seal" width="${size}" height="${size}" viewBox="0 0 200 200" fill="none" role="img" aria-label="ENVEME">
  <defs>
    <path id="emSealTop" d="${topArc}"/>
    <path id="emSealBot" d="${botArc}"/>
  </defs>
  <circle cx="100" cy="100" r="94" stroke="currentColor" stroke-width="1.4" opacity="0.9"/>
  <circle cx="100" cy="100" r="57" stroke="currentColor" stroke-width="0.8" opacity="0.3"/>
  ${ticks()}
  <path d="${arc(88, -30, 30, 1)}" stroke="var(--logo-accent, #BF4A23)" stroke-width="3" stroke-linecap="round" fill="none"/>
  <g fill="currentColor" font-family="var(--font-mono, monospace)" font-size="8" letter-spacing="2.4" font-weight="600">
    <text text-anchor="middle"><textPath href="#emSealTop" startOffset="50%">PROJECT ENVEME</textPath></text>
    <text text-anchor="middle" opacity="0.65"><textPath href="#emSealBot" startOffset="50%">JZZ31 · 2JZ-GE</textPath></text>
  </g>
  ${E}
</svg>`;
    },

    /* compact monogram (no lettering) for nav / favicon-scale */
    monogram(size = 40) {
      return `
<svg class="enveme-monogram" width="${size}" height="${size}" viewBox="0 0 200 200" fill="none" role="img" aria-label="ENVEME">
  <circle cx="100" cy="100" r="94" stroke="currentColor" stroke-width="2.4" opacity="0.9"/>
  <path d="${arc(82, -40, 40, 1)}" stroke="var(--logo-accent, #BF4A23)" stroke-width="6" stroke-linecap="round" fill="none"/>
  ${E}
</svg>`;
    },
  };
})();
