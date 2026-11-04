/* Dog enters first; the diver follows. One scene, no text chapters. */
(() => {
 'use strict';
 const html=document.documentElement,scene=document.querySelector('#pool-scene');let timer=0,played=false;
 const calm=()=>html.classList.contains('calm')||matchMedia('(prefers-reduced-motion: reduce)').matches;
 function settle(){clearTimeout(timer);scene.classList.remove('dive-playing');scene.classList.add('dive-settled');}
 function play(){clearTimeout(timer);if(html.dataset.route!=='pool')return;played=true;if(calm()||document.hidden){settle();return;}scene.classList.remove('dive-playing','dive-settled');void scene.offsetWidth;scene.classList.add('dive-playing');timer=setTimeout(settle,6400);}
 function sync(){if(html.dataset.route!=='pool'){clearTimeout(timer);scene.classList.remove('dive-playing');played=false;return;}if(calm()){settle();played=true;}else if(!played)play();}
 new MutationObserver(sync).observe(html,{attributes:true,attributeFilter:['data-route','class']});
 document.querySelector('#replay-pool').addEventListener('click',play);document.addEventListener('visibilitychange',()=>{if(document.hidden)settle();});
 for(const image of scene.querySelectorAll('img'))image.addEventListener('error',()=>image.classList.add('asset-error'));
 window.CollinsPoolStory={play};sync();
})();
