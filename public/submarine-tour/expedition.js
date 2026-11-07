(() => {
 'use strict';
 const $ = s => document.querySelector(s);
 const $$ = s => [...document.querySelectorAll(s)];
 const html=document.documentElement, pool=$('#pool'), journey=$('#journey'), viewport=$('.pool-window'), world=$('#world'), submarine=$('#submarine'), launch=window.CollinsLaunch;
 const scenes=$$('.scene'), stops=$$('[data-stop]');
 const labels=['The Shallow End','An Unscheduled Arrival','The Unexpected Dive','The Evening Shift','Back at Poolside'];
 // Every route restores its own scroll position; avoid a second browser history restoration.
 if('scrollRestoration' in history)history.scrollRestoration='manual';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let pointerFocus=false,manualCalm=false,calm=reduced.matches,selected=0,progress=0,remembered=0,width=innerWidth,height=innerHeight,range=1,raf=0,lastProgress=0,brief='',transitionTimer=0,dockTimer=0;
 const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
 const inPool=()=>html.dataset.route==='pool';
 function storage(key,value){try{if(value===undefined)return sessionStorage.getItem(key);sessionStorage.setItem(key,value);}catch{}return null;}
 const restored=Number(storage('collins-expedition-stop'));if(Number.isInteger(restored)&&restored>=0&&restored<=4)remembered=restored;
 function announce(i){selected=i;stops.forEach((b,n)=>{if(i===n)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});scenes.forEach((s,n)=>{s.inert=n!==i;s.setAttribute('aria-hidden',String(n!==i));});$('#previous').disabled=i===0;$('#next').disabled=i===4;$('#expedition-status').textContent=`Discovery ${i+1} of 5: ${labels[i]}.`;storage('collins-expedition-stop',String(i));remembered=i;pool.dataset.stop=String(i);}
 function poses(){return innerWidth<=720?[[.63,.72],[.80,.80],[.20,.49],[.20,.67],[.30,.85]]:innerHeight<=560?[[.56,.75],[.60,.80],[.50,.78],[.55,.50],[.57,.78]]:[[.51,.74],[.40,.77],[.53,.78],[.49,.75],[.58,.68]];}
 function render(){raf=0;if(!inPool())return;const previous=progress;progress=clamp(scrollY/range*4,0,4);const rendered=calm?Math.round(progress):progress;world.style.transform=`translate3d(${-rendered*width}px,0,0)`;$('#route-progress').style.transform=`scaleX(${progress/4})`;const nearest=Math.round(progress);if(nearest!==selected)announce(nearest);
 const points=poses(),a=Math.floor(rendered),b=Math.min(4,a+1),fraction=rendered-a;const pose=[points[a][0]+(points[b][0]-points[a][0])*fraction,points[a][1]+(points[b][1]-points[a][1])*fraction];
 const size=innerWidth<=720?(selected>0&&selected<4?110:151):innerHeight<=560?120:210;submarine.style.width=`${size}px`;const pitch=calm?0:clamp((progress-previous)*-60,-8,8);submarine.style.transform=`translate3d(${clamp(pose[0]*width-size/2,2,width-size-2)}px,${clamp(pose[1]*height-size/3,5,height-size*.67-6)}px,0) rotate(${pitch}deg)`;const moving=!calm&&Math.abs(progress-lastProgress)>.002;submarine.classList.toggle('underway',moving);clearTimeout(dockTimer);if(moving)dockTimer=setTimeout(()=>submarine.classList.remove('underway'),180);lastProgress=progress;
 pool.style.setProperty('--rail-opacity',String(clamp((1-Math.min(progress,Math.abs(4-progress)))*4-3,0,1)));
 }
 function requestRender(){if(!raf&&!document.hidden)raf=requestAnimationFrame(render);}
 function resize(keep=true){const old=progress;width=viewport.clientWidth||innerWidth;height=viewport.clientHeight||innerHeight*.7;const header=$('.site-header').getBoundingClientRect().height;journey.style.height=`${Math.max(250,innerHeight-header)*5}px`;range=Math.max(1,journey.offsetHeight-pool.offsetHeight);$('#instruction').textContent=innerWidth<=720?'Swipe up to explore.':'Scroll to explore. Take your time.';if(inPool()){if(keep)scrollTo({top:range*old/4,behavior:'instant'});render();}}
 function setStop(i){if(!inPool())return;const target=clamp(i,0,4);scrollTo({top:range*target/4,behavior:calm?'instant':'smooth'});if(calm)render();}
 function updateMotion(){calm=manualCalm||reduced.matches;html.classList.toggle('calm',calm);$('#motion-toggle').setAttribute('aria-pressed',String(calm));launch?.setCalm(calm);requestRender();}
 addEventListener('scroll',()=>{if(inPool())requestRender();},{passive:true});addEventListener('resize',()=>resize(),{passive:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden)requestRender();});reduced.addEventListener('change',updateMotion);
 stops.forEach(b=>b.addEventListener('click',()=>setStop(Number(b.dataset.stop))));$('#previous').addEventListener('click',()=>setStop(selected-1));$('#next').addEventListener('click',()=>setStop(selected+1));$('#motion-toggle').addEventListener('click',()=>{manualCalm=!manualCalm;updateMotion();});
 pool.addEventListener('mousedown',e=>{const control=e.target.closest('button,a');if(control&&e.button===0){e.preventDefault();pointerFocus=true;try{control.focus({preventScroll:true});}finally{pointerFocus=false;}}});
 pool.addEventListener('focusin',e=>{if(pointerFocus||!inPool())return;const scene=e.target.closest('[data-scene]'),fixedControl=e.target.closest('.expedition-controls,.evening-toggle');if(!scene&&!fixedControl)return;const i=scene?Number(scene.dataset.scene):selected;scrollTo({top:range*i/4,behavior:'instant'});render();});
 pool.addEventListener('keydown',e=>{if(e.key==='Escape')location.hash='#backyard';if(e.target===pool&&['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();setStop(e.key==='Home'?0:e.key==='End'?4:selected+(e.key==='ArrowRight'?1:-1));}});
 $('#evening-toggle').addEventListener('click',()=>{const on=pool.classList.toggle('is-evening');$('#evening-toggle').setAttribute('aria-pressed',String(on));$('#evening-toggle').innerHTML=on?'Back to daylight <span aria-hidden="true">◑</span>':'Evening light <span aria-hidden="true">◐</span>';});
  $('#goggles').addEventListener('click', () => {
    const inspected = $('#goggles').classList.toggle('inspected');
    $('#goggles-result').textContent = inspected ? 'Visibility restored. Owner still missing.' : 'Owner: probably looking for these.';
    $('#goggles').setAttribute('aria-pressed', String(inspected));
  });
  $('#ring').addEventListener('click', () => {
    const nudged = $('#ring').classList.toggle('nudged');
    $('#ring-result').textContent = nudged ? 'Item 008. Recovered. Misplaced again.' : 'Survey route: shallow end to the far skimmer.';
    $('#ring').setAttribute('aria-pressed', String(nudged));
  });
  $('#light-switch').addEventListener('click', () => {
    const on = $('.scene-light').classList.toggle('light-on');
    $('#light-switch').setAttribute('aria-pressed', String(on));
    $('#light-switch-label').textContent = on ? 'Switch off the pool light' : 'Switch on the pool light';
    $('#night-window').setAttribute('aria-hidden', String(!on));
  });
  $('#shade-control').addEventListener('click', () => {
    const moved = $('.scene-above').classList.toggle('shifted');
    $('#shade-control').setAttribute('aria-pressed', String(moved));
    $('#shade-control').textContent = moved ? 'Lower the periscope ↓' : 'Raise the periscope ↑';
    $('#periscope-view').hidden = !moved;
    pool.classList.toggle('periscope-open',moved);
  });


 function showSite(hash,focus=true){launch?.cancel();document.title='Collins — Custom pools & complete backyards';html.dataset.route='site';pool.inert=true;$('#website').inert=false;$('#album-detail').hidden=true;$('#studio').hidden=true;$('#feature-detail').hidden=true;const target=document.getElementById((hash||'#home').slice(1))||$('#home');requestAnimationFrame(()=>{if(target.id==='home')scrollTo({top:0,behavior:'instant'});else target.scrollIntoView({block:'start',behavior:'instant'});if(focus)target.focus({preventScroll:true});});}
 function showPool(focus=true,preserveLaunch=false,initialStop=remembered){document.title='Collins — A small backyard expedition';if(!preserveLaunch)launch?.cancel();clearTimeout(transitionTimer);$('#surface-transition').classList.remove('active');html.dataset.route='pool';pool.inert=preserveLaunch;$('#website').inert=true;progress=initialStop;resize(false);scrollTo({top:range*initialStop/4,behavior:'instant'});announce(initialStop);render();if(focus)pool.focus({preventScroll:true});}
 function showLaunch(focus=true){document.title='Collins — Step aboard vessel 01';clearTimeout(transitionTimer);$('#surface-transition').classList.remove('active');html.dataset.route='launch';pool.inert=true;$('#website').inert=true;launch?.show(calm);scrollTo(0,0);if(focus)$('#launch').focus({preventScroll:true});}
 function showWorld(focus=true){launch?.cancel();html.dataset.route='world';pool.inert=true;$('#website').inert=true;$('#backyard').inert=false;document.title='Collins Custom Pools & Backyards | Denton County, Texas';scrollTo({top:0,behavior:'instant'});if(focus){$('#backyard').focus({preventScroll:true});window.CollinsBackyard?.restoreFocus();}}
 function showSpecial(kind,focus=true){launch?.cancel();document.title=kind==='studio'?'Album studio — Collins':'Project album — Collins';html.dataset.route=kind;pool.inert=true;$('#website').inert=false;$('#album-detail').hidden=kind!=='album';$('#studio').hidden=kind!=='studio';$('#feature-detail').hidden=kind!=='feature';if(kind==='feature')window.CollinsBackyard?.show(location.hash.split('/')[1]);if(kind==='album')window.CollinsCatalog?.show(location.hash.split('/').slice(1).join('/'));if(kind==='studio')window.CollinsStudio?.show();requestAnimationFrame(()=>{scrollTo({top:0,behavior:'instant'});if(focus)$(kind==='album'?'#album-detail':kind==='feature'?'#feature-detail':'#studio').focus({preventScroll:true});});}
 function route(initial=false){clearTimeout(transitionTimer);$('#surface-transition').classList.remove('active');const hash=location.hash;if(!hash||hash==='#backyard'){showWorld(!initial);return;}if(hash==='#launch'){showLaunch(!initial);return;}if(hash.startsWith('#experience/')){showSpecial('feature',!initial);return;}if(hash==='#pool'){showPool(!initial);return;}if(hash.startsWith('#work/')){showSpecial('album',!initial);return;}if(hash==='#studio'){showSpecial('studio',!initial);return;}if(inPool()&&!initial&&!calm){$('#surface-transition').classList.add('active');clearTimeout(transitionTimer);transitionTimer=setTimeout(()=>{showSite(hash);$('#surface-transition').classList.remove('active');},405);}else showSite(hash,!initial);}
 document.addEventListener('click',e=>{const anchor=e.target.closest('a[href^="#"]');if(!anchor)return;if(anchor.dataset.interest)$('#interest').value=anchor.dataset.interest;if(anchor.hash===location.hash){e.preventDefault();route();}});
 addEventListener('hashchange',()=>route());addEventListener('popstate',()=>route());addEventListener('pageshow',e=>{if(e.persisted)route(true);});
  $('#project-form').addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const phone = event.currentTarget.elements.phone;
    phone.setCustomValidity(phone.value.replace(/\D/g,'').length >= 10 && phone.value.replace(/\D/g,'').length <= 15 ? '' : 'Enter a phone number with 10 to 15 digits.');
    if (!event.currentTarget.reportValidity()) return;
    brief = ['COLLINS CUSTOM POOLS & BACKYARDS', 'A NOTE ABOUT MY BACKYARD', '', `Name: ${values.get('name')}`, `Phone: ${values.get('phone')}`, `Town / neighborhood: ${values.get('location')}`, `Project: ${values.get('interest')}`, '', String(values.get('idea') || ''), '', 'Prepared on the Collins website. Please review and send this message.'].join('\n');
    $('#brief-text').textContent = brief;
    $('#text-brief').href = `sms:${window.COLLINS_SITE_CONFIG.phone}?body=${encodeURIComponent(brief)}`;
    $('#delivery-status').textContent = 'Nothing has been sent. Review the message and tap Send in your messaging app. If the note does not fill in, use Copy note and paste it.';
    $('#brief-review').hidden = false;
    $('#brief-review').focus({preventScroll:true});
    $('#brief-review').scrollIntoView({ block: 'start', behavior: calm ? 'instant' : 'smooth' });
  });
  $('#project-form').addEventListener('reset',()=>{$('[name=phone]').setCustomValidity('');brief='';$('#brief-text').textContent='';$('#text-brief').removeAttribute('href');$('#brief-review').hidden=true;$('#brief-review-note').textContent='';});
  $('#download-brief').addEventListener('click', () => {
    if (!brief) return;
    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Collins-project-brief-not-sent.txt';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

 const configuration=window.COLLINS_SITE_CONFIG||{};
 if(typeof configuration.phone==='string'&&/^\+[1-9]\d{7,14}$/.test(configuration.phone)){$('#call-collins').href=`tel:${configuration.phone}`;$('#call-collins').textContent=`Call ${configuration.phoneLabel||'Collins'} ↗`;$('#text-collins').href=`sms:${configuration.phone}`;$('#contact-actions').hidden=false;$('#contact-pending').hidden=true;}
 $('#brief-fields').disabled=false;
 $('[name=phone]').addEventListener('input',e=>e.target.setCustomValidity(''));
 launch?.configure({guide:()=>submarine.getBoundingClientRect(),reveal:()=>{showPool(false,true,0);return viewport.getBoundingClientRect();},complete:()=>{if(location.hash!=='#pool')history.pushState({collins:'pool'},'','#pool');showPool(true,false,0);}});
 announce(remembered);updateMotion();route(true);const shot=new URLSearchParams(location.search).get('shot');if(['launch','boarding','cockpit','descent'].includes(shot)){showLaunch(false);launch?.inspectShot(shot);}window.COLLINS_READY=true;window.CollinsNavigation={refresh:()=>route(true)};
})();
