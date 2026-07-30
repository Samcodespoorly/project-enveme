import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ENVEME 3D stage — real Soarer GLB, scroll-driven cinematic camera.
   Transparent canvas sits over a per-skin CSS gradient; fog + lights + exposure
   are re-skinned live. Camera follows a 6-keyframe path with critically-damped
   smoothing for a filmic feel. */

const Scene3D = (() => {
  let renderer, scene, camera, carGroup, floorMat, lights = {};
  let carModel = null;
  const _box = new THREE.Box3();
  const _bv = new THREE.Vector3();
  let ready = false;
  const readyCbs = [];
  let progress = 0;
  const camPos = new THREE.Vector3(4.2, 1.1, 6.5);
  const camTgt = new THREE.Vector3(-1.4, 0.2, 0);
  const desiredPos = new THREE.Vector3();
  const desiredTgt = new THREE.Vector3();
  let curSkin = null;
  let clock;
  let motion = 1;  // 0.4 slow … 1.8 snappy
  const frameCbs = [];
  const _projV = new THREE.Vector3();

  // pos = camera position · tgt = lookAt
  const PATH = [
    { p: 0.00, pos: [4.4, 1.05, 6.6],  tgt: [-1.5, 0.25, 0] },
    { p: 0.20, pos: [5.7, 0.95, 2.3],  tgt: [0.2, 0.35, 0] },
    { p: 0.40, pos: [0.6, 0.7, -6.4],  tgt: [0, 0.45, 0] },
    { p: 0.60, pos: [-5.4, 1.5, -2.6], tgt: [0, 0.4, 0] },
    { p: 0.80, pos: [-3.4, 3.7, 5.4],  tgt: [0, 0.2, 0] },
    { p: 1.00, pos: [0, 5.3, 7.6],     tgt: [0, 0.05, 0] },
  ];

  function smooth(t) { return t * t * (3 - 2 * t); }

  function samplePath(prog, outPos, outTgt) {
    const cp = Math.max(0, Math.min(1, prog));
    let a = PATH[0], b = PATH[PATH.length - 1];
    for (let i = 0; i < PATH.length - 1; i++) {
      if (cp >= PATH[i].p && cp <= PATH[i + 1].p) { a = PATH[i]; b = PATH[i + 1]; break; }
    }
    const span = (b.p - a.p) || 1;
    const t = smooth((cp - a.p) / span);
    outPos.set(
      a.pos[0] + (b.pos[0] - a.pos[0]) * t,
      a.pos[1] + (b.pos[1] - a.pos[1]) * t,
      a.pos[2] + (b.pos[2] - a.pos[2]) * t,
    );
    outTgt.set(
      a.tgt[0] + (b.tgt[0] - a.tgt[0]) * t,
      a.tgt[1] + (b.tgt[1] - a.tgt[1]) * t,
      a.tgt[2] + (b.tgt[2] - a.tgt[2]) * t,
    );
  }

  function shadowTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    g.addColorStop(0, 'rgba(0,0,0,0.55)');
    g.addColorStop(0.55, 'rgba(0,0,0,0.22)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }

  function init(canvas) {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x16100a, 9, 26);

    camera = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.copy(camPos);
    camera.lookAt(camTgt);

    // Image-based lighting for crisp reflections (essential for chrome skin)
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    lights.ambient = new THREE.AmbientLight(0xffffff, 0.7); scene.add(lights.ambient);
    lights.key = new THREE.DirectionalLight(0xffffff, 2.4); scene.add(lights.key);
    lights.fill = new THREE.DirectionalLight(0xffffff, 0.6); scene.add(lights.fill);
    lights.rim = new THREE.DirectionalLight(0xffffff, 1.3); scene.add(lights.rim);

    // Floor
    const floorGeo = new THREE.CircleGeometry(40, 64);
    floorMat = new THREE.MeshStandardMaterial({ color: 0x0c0907, metalness: 0.5, roughness: 0.3, transparent: true, opacity: 1 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.66;
    scene.add(floor);

    // Soft contact shadow
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false });
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(7, 4), shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.648;
    scene.add(shadow);

    carGroup = new THREE.Group();
    scene.add(carGroup);

    // Load the real Soarer
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    const ktx2 = new KTX2Loader()
      .setTranscoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/basis/')
      .detectSupport(renderer);
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);
    loader.setKTX2Loader(ktx2);
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load('../assets/toyota_soarer_modified.glb', (gltf) => {
      const model = gltf.scene || (gltf.scenes && gltf.scenes[0]);
      if (!model) { console.error('GLB has no scene'); ready = true; readyCbs.forEach((cb) => cb()); return; }
      model.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const scale = 4 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);
      model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
      carGroup.add(model);
      carModel = model;
      if (curSkin) applyEnvIntensity(curSkin.envIntensity);
      ready = true;
      renderer.render(scene, camera); // paint once on load (robust if rAF throttled)
      readyCbs.forEach((cb) => cb());
    }, undefined, (err) => {
      console.error('GLB load failed:', (err && (err.message || err.type)) || err, err && err.stack ? err.stack : '');
      ready = true;
      readyCbs.forEach((cb) => cb());
    });

    clock = new THREE.Clock();
    window.addEventListener('resize', onResize);
    onResize();
    animate();
  }

  function applyEnvIntensity(v) {
    carGroup.traverse((o) => {
      if (o.isMesh && o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => { if ('envMapIntensity' in m) { m.envMapIntensity = v; m.needsUpdate = true; } });
      }
    });
  }

  function applySkin(s) {
    curSkin = s;
    if (!renderer) return;
    renderer.toneMappingExposure = s.exposure;
    lights.ambient.color.set(s.ambient.color); lights.ambient.intensity = s.ambient.intensity;
    lights.key.color.set(s.key.color); lights.key.intensity = s.key.intensity; lights.key.position.set(...s.key.pos);
    lights.fill.color.set(s.fill.color); lights.fill.intensity = s.fill.intensity; lights.fill.position.set(...s.fill.pos);
    lights.rim.color.set(s.rim.color); lights.rim.intensity = s.rim.intensity; lights.rim.position.set(...s.rim.pos);
    scene.fog.color.set(s.fog.color); scene.fog.near = s.fog.near; scene.fog.far = s.fog.far;
    floorMat.color.set(s.floor.color); floorMat.metalness = s.floor.metalness; floorMat.roughness = s.floor.roughness; floorMat.opacity = s.floor.opacity;
    if (ready) applyEnvIntensity(s.envIntensity);
    renderer.render(scene, camera); // immediate paint (robust if rAF throttled)
  }

  function onResize() {
    const canvas = renderer.domElement;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function step() {
    if (!renderer) return;
    samplePath(progress, desiredPos, desiredTgt);
    const t = clock ? clock.getElapsedTime() : 0;
    desiredPos.y += Math.sin(t * 0.5) * 0.04 * motion;
    const damp = Math.min(0.2, 0.075 * motion);
    camPos.lerp(desiredPos, damp);
    camTgt.lerp(desiredTgt, damp);
    camera.position.copy(camPos);
    camera.lookAt(camTgt);
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    step();
    for (let i = 0; i < frameCbs.length; i++) frameCbs[i]();
  }

  // Project a world-space point to canvas pixel coords. Returns {x,y,behind}.
  function project(p) {
    if (!camera || !renderer) return { x: 0, y: 0, behind: true };
    _projV.set(p[0], p[1], p[2]).project(camera);
    const canvas = renderer.domElement;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    return {
      x: (_projV.x * 0.5 + 0.5) * w,
      y: (-_projV.y * 0.5 + 0.5) * h,
      behind: _projV.z > 1,
    };
  }

  // Project the car's world bounding box to a screen-space rect (px).
  // Returns {x,y,w,h,ok} — anchor markers via x+u*w, y+v*h.
  function carBounds() {
    if (!carModel || !camera || !renderer) return { ok: false };
    _box.setFromObject(carModel);
    const canvas = renderer.domElement;
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, anyFront = false;
    for (let xi = 0; xi < 2; xi++) for (let yi = 0; yi < 2; yi++) for (let zi = 0; zi < 2; zi++) {
      _bv.set(xi ? _box.max.x : _box.min.x, yi ? _box.max.y : _box.min.y, zi ? _box.max.z : _box.min.z);
      _bv.project(camera);
      if (_bv.z <= 1) anyFront = true;
      const sx = (_bv.x * 0.5 + 0.5) * cw, sy = (-_bv.y * 0.5 + 0.5) * ch;
      if (sx < minX) minX = sx; if (sx > maxX) maxX = sx;
      if (sy < minY) minY = sy; if (sy > maxY) maxY = sy;
    }
    return { ok: anyFront, x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }

  return {
    init,
    applySkin,
    setProgress(p) { progress = p; step(); },
    setMotion(m) { motion = m; },
    project,
    carBounds,
    onFrame(cb) { frameCbs.push(cb); },
    onReady(cb) { if (ready) cb(); else readyCbs.push(cb); },
    get ready() { return ready; },
  };
})();

window.Scene3D = Scene3D;
