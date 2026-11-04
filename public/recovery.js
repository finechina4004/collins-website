/* One Collins world. Native navigation and an explicit, visitor-sent text handoff. */
(() => {
 'use strict';
 const $ = selector => document.querySelector(selector);
 const html=document.documentElement, pool=$('#pool');
 function navigation(){
  const route=html.dataset.route, link=$('.surface-link'), label=$('.surface-verb');
  const beneath=route==='pool'||route==='launch';
  link.href=beneath?'#home':'#launch';
  label.textContent=route==='pool'?'Back to poolside':route==='launch'?'Poolside':'Explore the pool';
  document.querySelectorAll('.main-nav a').forEach(a=>{
   const active=a.hash===location.hash;
   if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  });
 }
 new MutationObserver(navigation).observe(html,{attributes:true,attributeFilter:['data-route']});
 addEventListener('hashchange',navigation);navigation();
 function light(on){
  html.dataset.time=on?'evening':'day';
  const sceneImage=on?'assets/pool-night.webp':'assets/pool-day.webp';
  $('.launch-set').src=sceneImage;
  $('#periscope-view img').src=sceneImage;
  $('#periscope-view img').alt=on?'The same illustrative backyard above water, after dark.':'The same illustrative backyard above water, in afternoon light.';
  pool.classList.toggle('is-evening',on);
  $('.scene-light').classList.toggle('light-on',on);
  $('#night-window').setAttribute('aria-hidden',String(!on));
  $('#light-switch').setAttribute('aria-pressed',String(on));
  $('#light-switch-label').textContent=on?'Bring back the afternoon':'Switch on the evening';
  $('#evening-toggle').setAttribute('aria-pressed',String(on));
  $('#evening-toggle').textContent=on?'Afternoon light ◑':'Evening light ◐';
  $('#home-world').classList.toggle('after-hours',on);
  $('#world-light').setAttribute('aria-pressed',String(on));
  $('#world-light').textContent=on?'Back to the afternoon ◑':'Switch on the evening ◐';
  $('#scene-hour').textContent=on?'08:16':'04:37';
  $('#scene-time').textContent=on?'THE LIGHTS ARE ON':'BACK AT POOLSIDE';
  $('#findings-count').textContent=on?'FIELD NOTE / THE EVENING STAYS WITH YOU':'COLLINS / A SMALL SURVEY OUT BACK';
  $('#findings-status').textContent=on?'Evening light across the pool and backyard.':'Afternoon light across the pool and backyard.';
  $('#home-world .home-day').alt=on?'An imagined Collins miniature pool after dark.':'An original imagined Collins miniature pool in afternoon light.';
 }
 $('#evening-toggle').addEventListener('click',()=>light(pool.classList.contains('is-evening')));
 $('#light-switch').addEventListener('click',()=>light($('.scene-light').classList.contains('light-on')));
 $('#world-light').addEventListener('click',()=>light($('#home-world').classList.contains('after-hours')));
 light(false);
 $('#goggles').addEventListener('click',()=>{
  const on=$('#goggles').getAttribute('aria-pressed')==='true';
  $('#found-note').hidden=!on;
  $('#goggles').setAttribute('aria-expanded',String(on));
  $('#findings-count').textContent=on?'FILE 007 / OWNER STILL UNACCOUNTED FOR':'COLLINS / THE LOST PROPERTY OFFICE';
  $('#findings-status').textContent=on?'Goggles inspected. A towel is waiting upstairs. Its owner has not been interviewed.':'Goggles returned to the lost property office.';
 });
 $('#ring').addEventListener('click',()=>{
  const on=$('#ring').getAttribute('aria-pressed')==='true';
  $('#ring-result').textContent=on?'Item 008 / Back on the job. Please lose it responsibly.':'A diving ring, apparently on an extended break.';
  $('#findings-status').textContent=$('#ring-result').textContent;
 });
 $('#shade-control').addEventListener('click',()=>{
  const on=$('#shade-control').getAttribute('aria-pressed')==='true';
  $('#findings-status').textContent=on?'Periscope raised. The same backyard, above the waterline.':'Periscope lowered. Back below the waterline.';
 });
 $('#copy-brief').addEventListener('click',async()=>{
  const text=$('#brief-text').textContent;
  try{
   if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');
   await navigator.clipboard.writeText(text);
   $('#delivery-status').textContent='Note copied. Open Messages, paste it if needed, and tap Send. Nothing has been sent by this page.';
  }catch{
   $('#delivery-status').textContent='Copy is unavailable in this browser. Select your note above and copy it, or download a copy. Nothing has been sent.';
  }
 });
 $('#text-brief').addEventListener('click',()=>{
  $('#delivery-status').textContent='Your messaging app opens on your device. Review the note and tap Send there. If the note does not fill in, use Copy note and paste it. This page cannot confirm delivery.';
 });
})();
