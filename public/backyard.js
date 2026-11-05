/* Illustrated entrances. All photographs and complete albums remain in the existing catalog. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s),html=document.documentElement,stage=$('.backyard-stage');
 const roomDetails={
  pools:{x:'50%',y:'50%',shelf:'Project postcards.',action:'Choose a real pool album ↓',inquiry:'Tell us about your pool idea ↗',idea:'I’d like to talk about a custom pool and the spaces around it.',caption:'POOLS & BACKYARDS'},
  fire:{x:'27%',y:'60%',shelf:'Fire features in real projects.',action:'See the real fire features ↓',inquiry:'Add a fire feature to my note ↗',idea:'I’m interested in a fire feature for my backyard.',caption:'FIRE FEATURES'},
  kitchen:{x:'75%',y:'60%',shelf:'Outdoor kitchen projects.',action:'See the real cooking spaces ↓',inquiry:'Add an outdoor kitchen to my note ↗',idea:'I’m interested in an outdoor kitchen and a place to eat outside.',caption:'OUTDOOR KITCHENS'},
  shade:{x:'75%',y:'50%',shelf:'Shade and covered spaces.',action:'See the real shade structures ↓',inquiry:'Add some shade to my note ↗',idea:'I’m interested in a pergola or shade structure for my backyard.',caption:'SHADE & STRUCTURES'}
 };
 const rooms={
  pools:{label:'POOLS & BACKYARDS',title:'Pools & backyards.',description:'Eight complete project albums.',note:'Custom pools. Spas. Complete backyards.',items:null},
  fire:{label:'FIRE FEATURES',title:'Fire features.',description:'Fireplaces, fire pits and fire features from our project albums.',note:'Plan a fire feature for your backyard.',items:[['lower-form-of-leisure','lower-form-of-leisure-ec6df443aae9a460'],['the-sun-stayed-for-supper','the-sun-stayed-for-supper-aaeed8c6ddbbeba0'],['a-minor-key','a-minor-key-fb0daa55b47d2949'],['dallas-with-feeling','dallas-with-feeling-1be9be01746f74d2'],['umpire-strikes-back','umpire-strikes-back-8c09430029ecd73c']]},
  kitchen:{label:'OUTDOOR KITCHENS',title:'Outdoor kitchens.',description:'Outdoor kitchens and dining spaces, planned around the way you cook and gather.',note:'Plan your outdoor kitchen.',items:[['the-sun-stayed-for-supper','the-sun-stayed-for-supper-350d699af84be8e5'],['strictly-striped-affair','strictly-striped-affair-19576c0fa80d7c81']]},
  shade:{label:'SHADE & STRUCTURES',title:'Shade & structures.',description:'Pergolas, pavilions and covered spaces from our project albums.',note:'Plan a pergola or covered space.',items:[['the-sun-stayed-for-supper','the-sun-stayed-for-supper-7015ed67131d404e'],['mr-bears-residence','mr-bears-residence-e5050074673f3ad9'],['umpire-strikes-back','umpire-strikes-back-8b553df39a7d3a63']]}
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
 function panState(){const max=stage.scrollWidth-stage.clientWidth;document.querySelectorAll('[data-world-pan]').forEach(b=>b.disabled=max<2||(b.dataset.worldPan==='0'?stage.scrollLeft<2:stage.scrollLeft>max-2));}
 stage.addEventListener('scroll',panState,{passive:true});addEventListener('resize',panState);
 document.querySelectorAll('[data-world-pan]').forEach(button=>button.addEventListener('click',()=>stage.scrollTo({left:(stage.scrollWidth-stage.clientWidth)*Number(button.dataset.worldPan),behavior:'instant'})));
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');if(!link)return;
  if(location.hash.startsWith('#experience/'))roomPositions.set(location.hash,scrollY);
  if(link.hash.startsWith('#work')&&!link.classList.contains('feature-card')){try{sessionStorage.removeItem('collins-feature-origin');}catch{}}
 },true);
 function syncArtwork(){
  const image=$('.feature-plate[data-plate=backyard]');
  if(image){const src='assets/collins-cover.webp';if(image.getAttribute('src')!==src)image.src=src;}
 }
 let centered=false;
 function navigation(){
  syncArtwork();if(!centered&&html.dataset.route==='world'){requestAnimationFrame(()=>{stage.scrollLeft=(stage.scrollWidth-stage.clientWidth)/2;panState();});centered=true;}
  const world=html.dataset.route==='world';if(world)requestAnimationFrame(panState);$('#backyard').inert=!world;
  const still=html.classList.contains('calm');$('#world-motion').setAttribute('aria-pressed',String(still));$('#world-motion').setAttribute('aria-label',still?'Resume motion':'Pause motion');$('#world-motion .tool-label').textContent=still?'Paused':'Motion';
 }
 new MutationObserver(navigation).observe(html,{attributes:true,attributeFilter:['data-route','class','data-time']});
 function visibility(){html.classList.toggle('world-paused',document.hidden);if(document.hidden&&pending){const hash=pending;stopTransition();location.hash=hash;}}
 document.addEventListener('visibilitychange',visibility);
 async function show(key){
  const token=++generation,root=$('#feature-detail'),room=rooms[key];root.replaceChildren();
  root.className='feature-detail feature-room-'+(room?key:'pools');
  const backline=make('nav','feature-backline');backline.setAttribute('aria-label','Experience navigation');
  for(const [label,hash] of [['← Back to the artwork','#backyard'],['All eight albums ↗','#work'],['Let’s talk ↗','#project']]){const a=make('a','',label);a.href=hash;backline.append(a);}root.append(backline);
  if(!room){root.append(make('h1','','This corner is not available.'),make('p','','Return to the artwork or browse all eight albums.'));return;}
  const detail=roomDetails[key],front=make('section','feature-frontispiece'),intro=make('div','feature-introduction');
  intro.append(make('p','eyebrow',room.label),make('h1','',room.title),make('p','feature-description',room.description));
  const actions=make('div','room-actions'),see=make('a','','See the real projects ↓'),plan=make('a','','Add to my project note ↗');see.href='#';see.addEventListener('click',e=>{e.preventDefault();const title=$('#feature-shelf-title');title?.focus({preventScroll:true});title?.scrollIntoView({block:'start',behavior:'instant'});});plan.href='#project';plan.dataset.interest=key==='pools'?'New custom pool':'Outdoor living project';plan.addEventListener('click',()=>{const idea=$('[name=idea]');if(idea&&!idea.value)idea.value=detail.idea;});actions.append(see,plan);intro.append(actions);
  const scene=make('figure','room-vignette room-vignette-'+key),painting=make('div','room-painting');painting.setAttribute('role','img');painting.setAttribute('aria-label','A detail of the illustrated Collins '+(key==='pools'?'pool':key==='fire'?'fireplace':key==='kitchen'?'outdoor kitchen':'pergola')+'.');scene.append(painting,make('figcaption','','FROM THE ILLUSTRATED BACKYARD'));
  front.append(intro,scene);root.append(front);
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
  shelf.append(shelfHeading);const grid=make('div','feature-grid');grid.dataset.count=String(valid.length);

  valid.forEach(({project,photo},i)=>{const a=make('a','feature-card');a.href=`#work/${project.slug}`;a.setAttribute('aria-label',`Open complete album: ${project.title}`);a.dataset.album=project.slug;a.addEventListener('click',()=>{roomSelections.set(key,project.slug);try{sessionStorage.setItem('collins-feature-origin',key);}catch{}});
   const figure=make('figure'),image=make('img');image.src=photo.src;image.alt=photo.alt||photo.caption;image.width=photo.width;image.height=photo.height;image.loading=i?'lazy':'eager';image.decoding='async';
   const mount=make('div','feature-photo-mount');mount.append(image,make('span','feature-folio',`${String(i+1).padStart(2,'0')} / ${String(valid.length).padStart(2,'0')}`));
   const caption=make('figcaption'),text=make('div');text.append(make('strong','',project.title),make('span','feature-photo-caption',photo.caption||''),make('small','',`OPEN COMPLETE ALBUM / ${project.photos.length} PHOTOGRAPHS`));caption.append(text,make('span','','↗'));figure.append(mount,caption);a.append(figure);grid.append(a);
  });shelf.append(grid);root.append(shelf);
  const end=make('div','feature-end');end.append(make('p','',room.note));for(const [label,hash] of [[detail.inquiry,'#project'],['← Back to the artwork','#backyard']]){const a=make('a','',label);a.href=hash;if(hash==='#project'){a.dataset.interest=key==='pools'?'New custom pool':'Outdoor living project';a.addEventListener('click',()=>{const idea=$('[name=idea]');if(idea&&!idea.value)idea.value=detail.idea;});}end.append(a);}root.append(end);
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
