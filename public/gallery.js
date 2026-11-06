/* Native, keyboard-accessible photo viewer. Albums also work without JavaScript. */
(() => {
 'use strict';
 const links = [...document.querySelectorAll('[data-photo]')];
 const dialog = document.querySelector('#photo-viewer');
 if (!links.length || !dialog || typeof dialog.showModal !== 'function') return;
 const image = dialog.querySelector('img');
 const caption = dialog.querySelector('.viewer-caption');
 const count = dialog.querySelector('.viewer-count');
 const error = dialog.querySelector('.viewer-error');
 let index = 0, opener = null, touch = null;
 function show(i, updateHistory = true) {
  index = (i + links.length) % links.length;
  const link = links[index];
  error.hidden = true;
  image.src = link.href;
  image.alt = link.querySelector('img')?.alt || link.dataset.caption;
  caption.textContent = link.dataset.caption;
  count.textContent = `${index + 1} / ${links.length}`;
  if (updateHistory && dialog.open) history.replaceState(history.state, '', `#photo-${index + 1}`);
 }
 function open(i) {
  show(i, false);
  if (!dialog.open) {
   dialog.showModal();
   document.documentElement.classList.add('viewer-open');
  }
 }
 function close() {
  if (history.state?.collinsPhotoViewer) history.back();
  else {
   history.replaceState(history.state, '', location.pathname + location.search);
   dialog.close();
  }
 }
 function restore() {
  const match = /^#photo-(\d+)$/.exec(location.hash);
  const photo = match ? Number(match[1]) - 1 : -1;
  if (photo >= 0 && photo < links.length) {
   if (!opener) opener = links[photo];
   open(photo);
  } else if (dialog.open) dialog.close();
 }
 links.forEach((link, i) => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault(); opener = link;
  history.pushState({...history.state, collinsPhotoViewer:true}, '', `#photo-${i + 1}`);
  open(i);
 }));
 dialog.querySelector('[data-close]').addEventListener('click', close);
 dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
 dialog.querySelector('[data-previous]').addEventListener('click', () => show(index - 1));
 dialog.querySelector('[data-next]').addEventListener('click', () => show(index + 1));
 dialog.addEventListener('keydown', event => {
  if (['ArrowLeft','ArrowRight'].includes(event.key)) {
   event.preventDefault(); show(index + (event.key === 'ArrowLeft' ? -1 : 1));
  }
 });
 image.addEventListener('error', () => { error.hidden = false; });
 image.addEventListener('load', () => { error.hidden = true; });
 const stage = dialog.querySelector('.viewer-stage');
 stage.addEventListener('touchstart', event => {
  touch = event.touches.length === 1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null;
 }, {passive:true});
 stage.addEventListener('touchend', event => {
  if (!touch || !event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - touch.x;
  const dy = event.changedTouches[0].clientY - touch.y;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)*1.5) show(index + (dx < 0 ? 1 : -1));
  touch = null;
 }, {passive:true});
 dialog.addEventListener('close', () => {
  document.documentElement.classList.remove('viewer-open');
  if (opener?.isConnected) opener.focus({preventScroll:true});
 });
 addEventListener('popstate', restore);
 addEventListener('hashchange', restore);
 addEventListener('pageshow', restore);
 restore();
})();
