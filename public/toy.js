/* A small optional toy. No boarding, route changes, timers or inquiry collection. */
(() => {
 'use strict';
 const toy=document.querySelector('#submarine-toy');
 if(!toy)return;
 const world=toy.parentElement;
 const start={x:55,y:75};let position={...start},drag=null;
 const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
 function move(x,y){position={x:clamp(x,28,73),y:clamp(y,75,80)};toy.style.left=position.x+'%';toy.style.top=position.y+'%';}
 toy.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.button!==0)return;
  const bounds=world.getBoundingClientRect();
  drag={id:event.pointerId,x:event.clientX,y:event.clientY,start:{...position},width:bounds.width,height:bounds.height};
  toy.setPointerCapture(event.pointerId);toy.classList.add('is-dragging');toy.focus({preventScroll:true});event.preventDefault();
 });
 toy.addEventListener('pointermove',event=>{if(!drag||event.pointerId!==drag.id)return;move(drag.start.x+(event.clientX-drag.x)/drag.width*100,drag.start.y+(event.clientY-drag.y)/drag.height*100);});
 function release(event){if(!drag||event.pointerId!==drag.id)return;drag=null;toy.classList.remove('is-dragging');if(toy.hasPointerCapture(event.pointerId))toy.releasePointerCapture(event.pointerId);}
 for(const type of ['pointerup','pointercancel','lostpointercapture'])toy.addEventListener(type,release);
 toy.addEventListener('keydown',event=>{
  const step=event.shiftKey?3:1;
  if(event.key==='Home'){event.preventDefault();move(start.x,start.y);return;}
  const delta={ArrowLeft:[-step,0],ArrowRight:[step,0],ArrowUp:[0,-step],ArrowDown:[0,step]}[event.key];
  if(delta){event.preventDefault();event.stopPropagation();move(position.x+delta[0],position.y+delta[1]);}
 });
 move(start.x,start.y);
})();
