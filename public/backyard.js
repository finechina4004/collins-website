/* Illustrated entrances. All photographs and complete albums remain in the existing catalog. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s),html=document.documentElement,stage=$('.backyard-stage');
 const roomDetails={
  pools:{x:'50%',y:'50%',shelf:'Pick a backyard.',action:'Choose a real pool album ↓',inquiry:'Tell us about your pool idea ↗',idea:'I’d like to talk about a custom pool and the spaces around it.',caption:'THE SAME POOL. A SMALLER POINT OF VIEW.'},
  fire:{x:'22%',y:'51%',shelf:'Evenings, photographed.',action:'See the real fire features ↓',inquiry:'Add a fire feature to my note ↗',idea:'I’m interested in a fire feature for my backyard.',caption:'01 / THERE IS A CHAIR BY THE FIRE.'},
  kitchen:{x:'78%',y:'51%',shelf:'Something for supper.',action:'See the real cooking spaces ↓',inquiry:'Add an outdoor kitchen to my note ↗',idea:'I’m interested in an outdoor kitchen and a place to eat outside.',caption:'02 / SUPPER IS SOMEWHERE OUT HERE.'},
  shade:{x:'77%',y:'37%',shelf:'Under a little cover.',action:'See the real shade structures ↓',inquiry:'Add some shade to my note ↗',idea:'I’m interested in a pergola or shade structure for my backyard.',caption:'03 / THE AFTERNOON CAN WAIT.'}
 };
 const rooms={
  pools:{label:'THE POOL SURVEY',title:'A different point of view.',description:'From our painted pool to the real thing. Eight complete project albums, photographed in full. Choose a backyard and take a look around.',note:'Custom pools. Spas. Complete backyards.',items:null},
  fire:{label:'THE EVENING DEPARTMENT',title:'Pull up a chair.',description:'A fireplace, a fire table, a little light at the water’s edge. The evening has several places to settle. These are photographs from our project albums.',note:'There is no hurry to go inside.',items:[['lower-form-of-leisure','lower-form-of-leisure-ec6df443aae9a460'],['the-sun-stayed-for-supper','the-sun-stayed-for-supper-aaeed8c6ddbbeba0'],['a-minor-key','a-minor-key-fb0daa55b47d2949'],['dallas-with-feeling','dallas-with-feeling-1be9be01746f74d2'],['umpire-strikes-back','umpire-strikes-back-8c09430029ecd73c']]},
  kitchen:{label:'THE SUPPER SERVICE',title:'Dinner is somewhere out here.',description:'A grill under the slats. A table with a view. Follow these photographs into their complete backyard albums.',note:'Bring an appetite. And an idea.',items:[['the-sun-stayed-for-supper','the-sun-stayed-for-supper-350d699af84be8e5'],['strictly-striped-affair','strictly-striped-affair-19576c0fa80d7c81']]},
  shade:{label:'THE SHADE STUDY',title:'A very good place to do very little.',description:'Pergolas, pavilions, and the spaces beneath them. Take a closer look at the real photographs, then open the full backyard album.',note:'A little shelter. A longer afternoon.',items:[['the-sun-stayed-for-supper','the-sun-stayed-for-supper-7015ed67131d404e'],['mr-bears-residence','mr-bears-residence-e5050074673f3ad9'],['umpire-strikes-back','umpire-strikes-back-8b553df39a7d3a63']]}
 };
 let transition=0,pending='',lastEntrance='',generation=0;
 const roomPositions=new Map(),roomSelections=new Map();
 const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
 const calm=()=>html.classList.contains('calm')||matchMedia('(prefers-reduced-motion: reduce)').matches;
 const stopTransition=()=>{clearTimeout(transition);transition=0;pending='';stage.classList.remove('is-entering');};
 document.querySelectorAll('.world-portal').forEach(link=>link.addEventListener('click',event=>{
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();stopTransition();lastEntrance=link.id;
  if(calm()){location.hash=link.hash;return;}
  stage.style.setProperty('--entrance-x',link.dataset.x+'%');stage.style.setProperty('--entrance-y',link.dataset.y+'%');
  stage.classList.add('is-entering');pending=link.hash;
  transition=setTimeout(()=>{const hash=pending;stopTransition();if(hash)location.hash=hash;},230);
 }));
 $('.backyard-art').addEventListener('load',()=>{stage.classList.remove('has-error');$('#world-load-status').hidden=true;});
 $('.backyard-art').addEventListener('error',()=>{stage.classList.add('has-error');$('#world-load-status').hidden=false;});
 if($('.backyard-art').complete&&!$('.backyard-art').naturalWidth){stage.classList.add('has-error');$('#world-load-status').hidden=false;}
 $('#world-motion').addEventListener('click',()=>$('#motion-toggle').click());
 document.querySelectorAll('[data-world-pan]').forEach(button=>button.addEventListener('click',()=>stage.scrollTo({left:(stage.scrollWidth-stage.clientWidth)*Number(button.dataset.worldPan),behavior:calm()?'instant':'smooth'})));
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');if(!link)return;
  if(location.hash.startsWith('#experience/'))roomPositions.set(location.hash,scrollY);
  if(link.hash.startsWith('#work')&&!link.classList.contains('feature-card')){try{sessionStorage.removeItem('collins-feature-origin');}catch{}}
 },true);
 function syncArtwork(){
  const image=$('.feature-plate[data-plate=backyard]');
  if(image){const src=html.dataset.time==='evening'?'assets/backyard-evening-illustrated.webp':'assets/backyard-day-illustrated.webp';if(image.getAttribute('src')!==src)image.src=src;}
 }
 function navigation(){
  syncArtwork();
  const world=html.dataset.route==='world';$('#backyard').inert=!world;
  const link=$('.surface-link');link.href=world?'#home':'#backyard';$('.surface-verb').textContent=world?'Services & about':'Back to artwork';
  const still=html.classList.contains('calm');$('#world-motion').setAttribute('aria-pressed',String(still));$('#world-motion').textContent=still?'Motion off ◌':'Pause motion ◌';
 }
 new MutationObserver(navigation).observe(html,{attributes:true,attributeFilter:['data-route','class','data-time']});
 function visibility(){html.classList.toggle('world-paused',document.hidden);if(document.hidden&&pending){const hash=pending;stopTransition();location.hash=hash;}}
 document.addEventListener('visibilitychange',visibility);
 async function show(key){
  const token=++generation,root=$('#feature-detail'),room=rooms[key];root.replaceChildren();
  root.className='feature-detail feature-room-'+(room?key:'pools');
  const backline=make('nav','feature-backline');backline.setAttribute('aria-label','Experience navigation');
  for(const [label,hash] of [['← Back to the artwork','#backyard'],...(key==='pools'?[['Resume the submarine ↓','#pool']]:[]),['All eight albums ↗','#work'],['Let’s talk ↗','#project']]){const a=make('a','',label);a.href=hash;backline.append(a);}root.append(backline);
  if(!room){root.append(make('h1','','This corner is not available.'),make('p','','Return to the artwork or browse all eight albums.'));return;}
  const detail=roomDetails[key],front=make('section','feature-frontispiece'),intro=make('div','feature-introduction');
  intro.append(make('p','eyebrow',room.label),make('h1','',room.title),make('p','feature-description',room.description));
  const jump=make('button','feature-jump',detail.action);jump.type='button';jump.disabled=true;intro.append(jump);front.append(intro);
  const illustration=make('figure','feature-illustration'),plate=make('img','feature-plate');
  illustration.style.setProperty('--feature-x',detail.x);illustration.style.setProperty('--feature-y',detail.y);
  plate.src=key==='pools'?'assets/pool-panorama-illustrated.webp':html.dataset.time==='evening'?'assets/backyard-evening-illustrated.webp':'assets/backyard-day-illustrated.webp';
  plate.width=key==='pools'?2172:1672;plate.height=key==='pools'?724:941;
  plate.alt=key==='pools'?'The illustrated turquoise pool, with solid tiled steps and warm reflections.':`A closer view of the ${key==='fire'?'brick fireplace and reading chairs':key==='kitchen'?'striped outdoor kitchen and supper table':'striped pergola'} in the imagined Collins backyard.`;
  if(key!=='pools')plate.dataset.plate='backyard';plate.decoding='async';plate.fetchPriority='high';
  const artworkFallback=make('p','feature-art-fallback','The illustration could not load. The real project photographs are below.');artworkFallback.hidden=true;
  plate.addEventListener('error',()=>{illustration.classList.add('has-error');artworkFallback.hidden=false;});
  plate.addEventListener('load',()=>{illustration.classList.remove('has-error');artworkFallback.hidden=true;});
  const caption=make('figcaption');caption.append(make('span','',detail.caption),make('small','','AN ILLUSTRATED COLLINS WORLD'));
  illustration.append(plate,artworkFallback,caption);
  if(key==='pools'){
   const guide=make('a','feature-vessel');guide.href='#pool';guide.setAttribute('aria-label','Resume the submarine');
   const vessel=make('img');vessel.src='assets/vessel-illustrated.webp';vessel.alt='';vessel.width=1536;vessel.height=1024;
   vessel.addEventListener('error',()=>guide.classList.add('has-error'));
   const name=make('img','hull-nameplate');name.src='assets/hull-nameplate.svg';name.alt='';name.width=480;name.height=100;
   const guideArt=make('span','feature-guide-art');guideArt.append(vessel,name);guide.append(guideArt,make('span','feature-guide-label','RESUME THE SUBMARINE ↓'));illustration.append(guide);
  }
  front.append(illustration);root.append(front);
  const corners=make('nav','feature-corners');corners.setAttribute('aria-label','Explore another corner of the backyard');
  for(const [corner,label] of [['pools','Pool'],['fire','Fire'],['kitchen','Kitchen'],['shade','Shade']]){const a=make('a','',label);a.href=`#experience/${corner}`;if(corner===key)a.setAttribute('aria-current','page');corners.append(a);}root.append(corners);
  document.title=room.label.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())+' — Collins';
  const loading=make('p','feature-loading','Opening the photograph collection…');loading.setAttribute('role','status');root.append(loading);
  const catalog=await window.CollinsCatalog.ready;
  if(token!==generation||location.hash!==`#experience/${key}`)return;
  loading.remove();const projects=catalog.projects||[];
  const items=key==='fire'?[room.items[3],room.items[0],room.items[1],room.items[2],room.items[4]]:room.items;
  const pairs=items?items.map(([slug,id])=>{const project=projects.find(p=>p.slug===slug);return {project,photo:project?.photos.find(p=>p.id===id)};}):projects.map(project=>({project,photo:project.photos.find(p=>p.id===project.coverId)||project.photos[0]}));
  const valid=pairs.filter(p=>p.project&&p.photo);
  if(!valid.length){root.append(make('p','','The photographs could not load. You can still call or text us from Start a project.'));return;}
  const shelf=make('section','feature-shelf');shelf.setAttribute('aria-labelledby','feature-shelf-title');
  const shelfHeading=make('div','feature-shelf-heading'),shelfTitle=make('h2','',detail.shelf);shelfTitle.id='feature-shelf-title';shelfTitle.tabIndex=-1;
  const total=valid.reduce((count,item)=>count+item.project.photos.length,0);
  shelfHeading.append(shelfTitle,make('p','',key==='pools'?`${valid.length} COMPLETE ALBUMS / ${total} PHOTOGRAPHS`:`${valid.length} ALBUMS / SELECTED PROJECT PHOTOGRAPHS`));
  shelf.append(shelfHeading);const grid=make('div','feature-grid');
  jump.disabled=false;jump.addEventListener('click',()=>{shelf.scrollIntoView({block:'start',behavior:calm()?'instant':'smooth'});shelfTitle.focus({preventScroll:true});});
  valid.forEach(({project,photo},i)=>{const a=make('a','feature-card');a.href=`#work/${project.slug}`;a.setAttribute('aria-label',`Open complete album: ${project.title}`);a.dataset.album=project.slug;a.addEventListener('click',()=>{roomSelections.set(key,project.slug);try{sessionStorage.setItem('collins-feature-origin',key);}catch{}});
   const figure=make('figure'),image=make('img');image.src=photo.src;image.alt=photo.alt||photo.caption;image.width=photo.width;image.height=photo.height;image.loading=i?'lazy':'eager';image.decoding='async';
   const mount=make('div','feature-photo-mount');mount.append(image,make('span','feature-folio',`${String(i+1).padStart(2,'0')} / ${String(valid.length).padStart(2,'0')}`));
   const caption=make('figcaption'),text=make('div');text.append(make('strong','',project.title),make('span','feature-photo-caption',photo.caption||''),make('small','',`OPEN COMPLETE ALBUM / ${project.photos.length} PHOTOGRAPHS`));caption.append(text,make('span','','↗'));figure.append(mount,caption);a.append(figure);grid.append(a);
  });shelf.append(grid);root.append(shelf);
  const end=make('div','feature-end');end.append(make('p','',room.note));for(const [label,hash] of [[detail.inquiry,'#project'],...(key==='pools'?[['Resume the submarine ↓','#pool']]:[]),['← Back to the artwork','#backyard']]){const a=make('a','',label);a.href=hash;if(hash==='#project'){a.dataset.interest=key==='pools'?'New custom pool':'Outdoor living project';a.addEventListener('click',()=>{const idea=$('[name=idea]');if(idea&&!idea.value)idea.value=detail.idea;});}end.append(a);}root.append(end);
  requestAnimationFrame(()=>{
   if(location.hash!==`#experience/${key}`)return;
   if(roomPositions.has(location.hash))scrollTo({top:roomPositions.get(location.hash),behavior:'instant'});
   const selected=roomSelections.get(key),card=selected?[...grid.querySelectorAll('.feature-card')].find(a=>a.dataset.album===selected):null;
   if(card&&(document.activeElement===root||document.activeElement===document.body))card.focus({preventScroll:true});
  });
 }
 function albumReturn(){
  if(html.dataset.route!=='album')return;
  let key;try{key=sessionStorage.getItem('collins-feature-origin');}catch{}
  if(!rooms[key]||$('#album-detail .album-feature-return'))return;
  if(rooms[key].items&&!rooms[key].items.some(([slug])=>location.hash===`#work/${slug}`))return;
  const a=make('a','album-feature-return',`← Back to ${rooms[key].label.toLowerCase()}`);a.href=`#experience/${key}`;$('#album-detail').prepend(a);
 }
 new MutationObserver(albumReturn).observe($('#album-detail'),{childList:true});
 window.CollinsBackyard={show,restoreFocus(){if(lastEntrance)document.getElementById(lastEntrance)?.focus({preventScroll:true});}};
 addEventListener('hashchange',()=>{stopTransition();if(!location.hash.startsWith('#experience/'))generation++;navigation();});
 navigation();visibility();window.CollinsNavigation.refresh();
})();
