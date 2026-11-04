(() => {
 'use strict';
 const launch = document.querySelector('#launch');
 const board = document.querySelector('#board-vessel');
 const status = document.querySelector('#launch-status');
 const skip = document.querySelector('#skip-launch');
 const revealVessel = document.querySelector('#reveal-vessel');
 let callbacks = {};
 let timers = [];
 let animation = null;
 let running = false;
 let calm = false;
 let showing = false;
 const delay = (fn, ms) => timers.push(setTimeout(fn, ms));
 function clear() {
  timers.forEach(clearTimeout); timers = [];
  if (animation) { animation.cancel(); animation = null; }
 }
 function say(phase, label) {
  launch.dataset.phase = phase;
  board.textContent = label;
  status.textContent = label;
 }
 function cancel() {
  clear(); running = false; showing = false;
  launch.classList.remove('is-active');
  document.documentElement.classList.remove('revealing');
  launch.inert = true;
  launch.dataset.phase = 'ready';
  delete launch.dataset.review;
 }
 function show(isCalm) {
  clear(); running = false; showing = true; calm = isCalm;
  launch.inert = false;
  delete launch.dataset.review;
  launch.classList.add('is-active');
  launch.dataset.phase = 'ready';
  board.disabled = false;
  board.innerHTML = `${calm ? 'Enter the pool' : 'Step aboard'} <span aria-hidden="true">↗</span>`;
  skip.textContent = 'Skip the boarding →';
  status.textContent = 'Vessel ready. Step aboard or go straight to the pool.';
 }
 function finish() {
  if (!running) return;
  clear(); running = false;
  launch.classList.remove('is-active'); showing = false;
  document.documentElement.classList.remove('revealing');
  callbacks.complete?.();
 }
 function reveal(instant = false) {
  if (!running) return;
  say('reveal', 'Entering the pool');
  document.documentElement.classList.add('revealing');
  const viewport = callbacks.reveal?.();
  if (instant || calm || !viewport || !revealVessel.animate) { finish(); return; }
  const w = viewport.width, h = viewport.height;
  const port = Math.min(w * (w < 721 ? .77 : .65), w < 721 ? 400 : 720);
  const startScale = port / 510;
  const endWidth = w < 721 ? 151 : 210;
  const endScale = endWidth / 1536;
  const startX = w * .5 - 1040 * startScale;
  const startY = h * .46 - 640 * startScale;
  const endX = w * (w < 721 ? .62 : .54) - endWidth * .5;
  const endY = h * (w < 721 ? .65 : .69) - endWidth / 3;
  const from = `translate3d(${startX}px,${startY}px,0) scale(${startScale})`;
  const to = `translate3d(${endX}px,${endY}px,0) scale(${endScale})`;
  revealVessel.style.transform = from;
  animation = revealVessel.animate([{transform:from},{transform:to}],{duration:1400,easing:'cubic-bezier(.55,.05,.2,1)',fill:'forwards'});
  animation.finished.then(() => { if (running) finish(); }).catch(() => {});
 }
 function start() {
  if (running || !showing) return;
  running = true;
  board.disabled = true;
  skip.textContent = 'Skip descent →';
  if (calm) { reveal(true); return; }
  say('boarding', 'Boarding vessel 01…');
  delay(() => say('cockpit', 'Preparing to lower…'), 900);
  delay(() => say('descent', 'Lowering into the pool…'), 1400);
  delay(() => reveal(), 3800);
 }
 board.addEventListener('click', start);
 launch.addEventListener('keydown', e => { if (e.key === 'Escape') location.hash = '#home'; });
 // Interrupted sequences settle at a usable scene rather than strand a visitor.
 addEventListener('resize', () => { if (running) { callbacks.reveal?.(); finish(); } });
 document.addEventListener('visibilitychange', () => { if (document.hidden && running) { callbacks.reveal?.(); finish(); } });
 document.querySelector('#launch-vessel').addEventListener('error', () => {
  board.textContent = 'Enter the pool →';
  status.textContent = 'The launch image could not load. You can still enter the pool or view the website.';
 });
 window.CollinsLaunch = { show, cancel, start, inspectShot: phase => { show(true); launch.dataset.phase = phase === 'launch' ? 'ready' : phase; launch.dataset.review = phase; }, configure: value => { callbacks = value; }, setCalm: value => { calm = value; if (running && calm) { callbacks.reveal?.(); finish(); } }, get running(){ return running; } };
})();
