/* Small stories from above the pool. Playback starts only after the chapter docks. */
(() => {
 'use strict';
 const pool=document.querySelector('#pool'),html=document.documentElement,viewport=document.querySelector('.pool-window');
 const dog=document.querySelector('.scene-dog'),phone=document.querySelector('.scene-phone');
 const vessel=document.querySelector('#submarine'),dogAsset=dog.querySelector('.diving-dog');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const seen=new Set();let timers=[],entryTimer=0,active=-1;
 const still=()=>html.classList.contains('calm')||reduced.matches;
 const inStory=i=>html.dataset.route==='pool'&&Number(pool.dataset.stop)===i&&!document.hidden;
 function later(fn,ms){timers.push(setTimeout(fn,ms));}
 function cancel(){
  clearTimeout(entryTimer);timers.forEach(clearTimeout);timers=[];
  for(const [scene,id,message] of [[dog,'#dog-story-status','The survey continues. Replay the entrance whenever you like.'],[phone,'#phone-story-status','One phone on the bottom. Replay its arrival whenever you like.']]){
   if(scene.classList.contains('story-playing')){scene.classList.add('story-settled');document.querySelector(id).textContent=message;}
   scene.classList.remove('story-playing');
  }
  vessel.classList.remove('is-startled','is-searching');
 }
 function dogReady(){
  const failed=dogAsset.complete&&!dogAsset.naturalWidth;dog.classList.toggle('asset-unavailable',failed);
  if(dogAsset.complete&&dogAsset.naturalWidth)return true;
  document.querySelector('#dog-story-status').textContent=failed?'The dog scene couldn’t load. You can keep exploring or try replay.':'The dog scene is loading. You can keep exploring.';
  return false;
 }
 function settle(i){
  (i===1?dog:phone).classList.add('story-settled');
  document.querySelector(i===1?'#dog-story-status':'#phone-story-status').textContent=i===1?'Ball retrieved. Survey temporarily postponed.':'Found: one phone. Owner: suddenly interested in swimming.';
 }
 function play(i){
  if(!inStory(i))return;
  cancel();active=i;
  if(i===1&&!dogReady())return;
  seen.add(i);const scene=i===1?dog:phone;scene.classList.remove('story-settled');
  if(still()){settle(i);return;}
  void scene.offsetWidth;scene.classList.add('story-playing');
  if(i===1){
   document.querySelector('#dog-story-status').textContent='A ball. An enthusiastic arrival. A brief interruption.';
   later(()=>vessel.classList.add('is-startled'),1000);
   later(()=>vessel.classList.remove('is-startled'),2200);
   later(()=>{settle(i);scene.classList.remove('story-playing');},6500);
  }else{
   document.querySelector('#phone-story-status').textContent='A phone is taking the scenic route to the bottom.';
   later(()=>vessel.classList.add('is-searching'),1500);
   later(()=>{settle(i);vessel.classList.remove('is-searching');scene.classList.remove('story-playing');},5200);
  }
 }
 function queueEntry(i){
  clearTimeout(entryTimer);
  entryTimer=setTimeout(()=>{
   if(!inStory(i)||seen.has(i))return;
   const scene=i===1?dog:phone;
   // A nearby chapter can become current mid-scroll; wait until its composition is actually in view.
   if(Math.abs(scene.getBoundingClientRect().left-viewport.getBoundingClientRect().left)>8)return;
   play(i);
  },220);
 }
 function sync(){
  const i=Number(pool.dataset.stop),inPool=html.dataset.route==='pool';
  if(!inPool||i!==active){cancel();active=inPool?i:-1;}
  if(!inPool||document.hidden||!(i===1||i===2))return;
  if(still()){cancel();if(i===1&&!dogReady())return;seen.add(i);settle(i);return;}
  if(!seen.has(i))queueEntry(i);
 }
 document.querySelector('#replay-dog').addEventListener('click',()=>{
  if(dogAsset.complete&&!dogAsset.naturalWidth){dogAsset.src=dogAsset.getAttribute('src');seen.delete(1);}
  play(1);
 });
 document.querySelector('#replay-phone').addEventListener('click',()=>play(2));
 dogAsset.addEventListener('load',()=>{dog.classList.remove('asset-unavailable');sync();});
 dogAsset.addEventListener('error',()=>{dog.classList.add('asset-unavailable');if(inStory(1)){cancel();dogReady();}});
 new MutationObserver(sync).observe(pool,{attributes:true,attributeFilter:['data-stop']});
 new MutationObserver(sync).observe(html,{attributes:true,attributeFilter:['data-route','class']});
 addEventListener('scroll',()=>{if(html.dataset.route==='pool'&&!seen.has(Number(pool.dataset.stop)))sync();},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();else sync();});
 reduced.addEventListener('change',sync);sync();
})();
