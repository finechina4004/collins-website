/* One Collins world. Native navigation and an explicit, visitor-sent text handoff. */
(() => {
 'use strict';
 const $ = selector => document.querySelector(selector);
 const html=document.documentElement, pool=$('#pool');
 function navigation(){
  const hash=location.hash||'#backyard';
  document.querySelectorAll('.main-nav a').forEach(a=>{
   const active=a.hash===hash||(a.hash==='#work'&&hash.startsWith('#work/'))||(a.hash==='#build'&&['#home','#about'].includes(hash));
   if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  });
 }
 new MutationObserver(navigation).observe(html,{attributes:true,attributeFilter:['data-route']});
 addEventListener('hashchange',navigation);navigation();
 function light(on){
  html.dataset.time=on?'evening':'day';
  const sceneImage=on?'assets/backyard-evening-illustrated.webp':'assets/backyard-day-illustrated.webp';
  document.documentElement.style.setProperty('--backyard-plate',`url('${sceneImage}')`);
  const artwork=$('.backyard-art');artwork.src=sceneImage;
  artwork.alt=`An imagined painted Collins backyard in ${on?'evening':'afternoon'} light: cream poolhouse, brick fireplace, striped pergola and cutaway pool.`;
  $('#backyard-light').setAttribute('aria-pressed',String(on));
  $('#backyard-light').textContent=on?'Afternoon light ◑':'Evening light ◐';
  try{sessionStorage.setItem('collins-time',on?'evening':'day');}catch{}
  $('.launch-set').src=sceneImage;
  $('#desk-art-image').src=sceneImage;
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
  $('#home-world .home-day').alt=on?'The imagined painted Collins backyard in evening light.':'The imagined painted Collins backyard in afternoon light.';
 }
 $('#evening-toggle').addEventListener('click',()=>light(pool.classList.contains('is-evening')));
 $('#light-switch').addEventListener('click',()=>light($('.scene-light').classList.contains('light-on')));
 $('#world-light').addEventListener('click',()=>light($('#home-world').classList.contains('after-hours')));
 $('#backyard-light').addEventListener('click',()=>light(html.dataset.time!=='evening'));
 let savedTime='day';try{savedTime=sessionStorage.getItem('collins-time')||'day';}catch{}
 light(savedTime==='evening');
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
