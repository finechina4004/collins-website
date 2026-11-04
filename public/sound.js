/* Original quiet instrumental loop. Sound starts only after an explicit visitor click. */
(() => {
 'use strict';
 const button=document.querySelector('#scene-sound');let context=null,gain=null,timer=0,enabled=false,step=0;
 const notes=[261.63,329.63,392,493.88,440,392,329.63,293.66,261.63,329.63,392,523.25,493.88,392,349.23,293.66];
 function note(){if(!enabled||document.hidden||!context)return;const now=context.currentTime,o=context.createOscillator(),g=context.createGain();o.type='triangle';o.frequency.value=notes[step++%notes.length];g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(.045,now+.025);g.gain.exponentialRampToValueAtTime(.0001,now+1.65);o.connect(g);g.connect(gain);o.start(now);o.stop(now+1.7);}
 function stop(){clearInterval(timer);timer=0;context?.suspend();}
 function label(){button.setAttribute('aria-pressed',String(enabled));button.setAttribute('aria-label',enabled?'Turn sound off':'Turn sound on');button.querySelector('.tool-label').textContent=enabled?'Sound on':'Sound off';}
 async function start(){await context.resume();clearInterval(timer);note();timer=setInterval(note,640);}
 button.addEventListener('click',async()=>{try{if(!context){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('No audio');context=new Audio();gain=context.createGain();gain.gain.value=.65;gain.connect(context.destination);}enabled=!enabled;label();if(enabled)await start();else stop();}catch{enabled=false;label();button.querySelector('.tool-label').textContent='Sound unavailable';}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else if(enabled)start().catch(()=>{});});
 addEventListener('pagehide',stop);label();
})();
