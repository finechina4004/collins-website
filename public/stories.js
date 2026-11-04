/* Little interruptions from life above the pool. Illustrative, optional and replayable. */
(() => {
 'use strict';
 const pool=document.querySelector('#pool'), html=document.documentElement;
 const dog=document.querySelector('.scene-dog'), phone=document.querySelector('.scene-phone');
 const vessel=document.querySelector('#submarine');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const seen=new Set(); let timers=[],active=-1;
 const still=()=>html.classList.contains('calm')||reduced.matches;
 function later(fn,ms){timers.push(setTimeout(fn,ms));}
 function cancel(){timers.forEach(clearTimeout);timers=[];dog.classList.remove('story-playing');phone.classList.remove('story-playing');vessel.classList.remove('is-startled','is-searching');}
 function settle(i){
  const scene=i===1?dog:phone;scene.classList.add('story-settled');
  document.querySelector(i===1?'#dog-story-status':'#phone-story-status').textContent=i===1?'Ball retrieved. Survey temporarily postponed.':'Found: one phone. Owner: suddenly interested in swimming.';
 }
 function play(i){
  if(html.dataset.route!=='pool'||Number(pool.dataset.stop)!==i)return;
  cancel();seen.add(i);active=i;
  const scene=i===1?dog:phone;scene.classList.remove('story-settled');
  if(still()){settle(i);return;}
  // Restart through normal CSS animation lifecycle; never move the document or take focus.
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
 function sync(){
  const i=Number(pool.dataset.stop),inPool=html.dataset.route==='pool';
  if(!inPool||i!==active){cancel();active=inPool?i:-1;}
  if(!inPool||document.hidden)return;
  if(still()){cancel();if(i===1||i===2){seen.add(i);settle(i);}return;}
  if((i===1||i===2)&&!seen.has(i)){seen.add(i);later(()=>play(i),700);}
 }
 document.querySelector('#replay-dog').addEventListener('click',()=>play(1));
 document.querySelector('#replay-phone').addEventListener('click',()=>play(2));
 new MutationObserver(sync).observe(pool,{attributes:true,attributeFilter:['data-stop']});
 new MutationObserver(sync).observe(html,{attributes:true,attributeFilter:['data-route','class']});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();else sync();});
 reduced.addEventListener('change',sync);sync();
})();
