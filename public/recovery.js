/* Shared lighting, stable navigation and visitor-sent project notes. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s),html=document.documentElement;
 function navigation(){const hash=location.hash||'#backyard';document.querySelectorAll('.main-nav a').forEach(a=>{const active=a.hash===hash||(a.hash==='#work'&&(hash.startsWith('#work/')||hash.startsWith('#experience/')))||(a.hash==='#build'&&hash==='#about');if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
 addEventListener('hashchange',navigation);navigation();
 function light(on){
  html.dataset.time=on?'evening':'day';const file='assets/collins-cover.webp';html.style.setProperty('--backyard-plate',`url('${file}')`);
  $('.backyard-art').src=file;$('.backyard-art').alt='A vintage painted Italian villa backyard, with a standing diver on the board, vineyard hills, fireplace, outdoor kitchen and turquoise pool.';
  document.querySelectorAll('[data-plate="backyard"]').forEach(img=>img.src=file);
  $('#backyard-light').setAttribute('aria-pressed',String(on));$('#backyard-light').setAttribute('aria-label',on?'Switch to daylight':'Switch to evening');$('#backyard-light .tool-label').textContent=on?'Night':'Day';
  try{sessionStorage.setItem('collins-time',on?'evening':'day');}catch{}
 }
 $('#backyard-light').addEventListener('click',()=>light(html.dataset.time!=='evening'));
 let saved='day';try{saved=sessionStorage.getItem('collins-time')||'day';}catch{}light(saved==='evening');
 $('#copy-brief').addEventListener('click',async()=>{try{if(!navigator.clipboard?.writeText)throw Error();await navigator.clipboard.writeText($('#brief-text').textContent);$('#delivery-status').textContent='Copied. Paste into Messages and tap Send. Nothing has been sent by this page.';}catch{$('#delivery-status').textContent='Select and copy the note, or download a copy. Nothing has been sent.';}});
 $('#text-brief').addEventListener('click',()=>{$('#delivery-status').textContent='Review the note in Messages and tap Send there. This page cannot confirm delivery.';});
})();
