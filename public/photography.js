/* A quiet photographic album. Owner-supplied images retain their actual geometry. */
(() => {
 'use strict';
 const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
 const src=p=>p.preview||p.src||'';
 let active=null,openedAt=null,dialog=null,index=0;const selections=new Map();
 const pad=n=>String(n).padStart(2,'0');
 function clear(){if(dialog?.open)dialog.close();active=null;}
 function mountViewer(){if(dialog)return;dialog=make('dialog','photograph-viewer');dialog.id='photograph-viewer';dialog.setAttribute('aria-label','Full-screen project photographs');
 const header=make('div','viewer-header');const title=make('p','viewer-album');title.id='viewer-album';const close=make('button','viewer-close','Close ×');close.type='button';close.setAttribute('aria-label','Close full-screen photograph');close.addEventListener('click',()=>dialog.close());header.append(title,close);
 const stage=make('div','viewer-stage');const image=make('img');image.id='viewer-image';stage.append(image);
 const bottom=make('div','viewer-bottom'),text=make('div'),caption=make('p','viewer-caption');caption.id='viewer-caption';const count=make('span','viewer-count');count.id='viewer-count';count.setAttribute('role','status');count.setAttribute('aria-live','polite');text.append(caption,count);
 const nav=make('div','viewer-controls');for(const [id,label,symbol,delta] of [['viewer-previous','Previous photograph','←',-1],['viewer-next','Next photograph','→',1]]){const b=make('button','',symbol);b.id=id;b.type='button';b.setAttribute('aria-label',label);b.addEventListener('click',()=>turn(delta));nav.append(b);}bottom.append(text,nav);dialog.append(header,stage,bottom);document.body.append(dialog);
 dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();turn(event.key==='ArrowLeft'?-1:1);}});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.documentElement.classList.remove('photograph-is-open');if(openedAt?.isConnected)openedAt.focus({preventScroll:true});openedAt=null;});
 }
 function turn(delta){if(!active)return;index=(index+delta+active.photos.length)%active.photos.length;const p=active.photos[index],image=dialog.querySelector('#viewer-image');image.src=src(p);image.alt=p.alt||p.caption||active.title;image.width=p.width||1200;image.height=p.height||800;dialog.querySelector('#viewer-album').textContent=active.title;dialog.querySelector('#viewer-caption').textContent=p.caption||'';dialog.querySelector('#viewer-count').textContent=`${pad(index+1)} / ${pad(active.photos.length)}`;
 const next=active.photos[(index+1)%active.photos.length];if(next){const preload=new Image();preload.src=src(next);}
 }
 function open(photoId,button){if(!active)return;mountViewer();openedAt=button;index=active.photos.findIndex(p=>p.id===photoId);if(index<0)index=0;turn(0);dialog.showModal();document.documentElement.classList.add('photograph-is-open');}
 function figure(photo,style='',eager=false){const f=make('figure','editorial-photo '+style),b=make('button','photo-open'),img=make('img');b.type='button';b.setAttribute('aria-label',`View photograph: ${photo.caption||active.title}`);b.addEventListener('click',()=>open(photo.id,b));img.src=src(photo);img.alt=photo.alt||photo.caption||active.title;img.width=photo.width||1200;img.height=photo.height||800;if(!style.includes('photographic-thumbnail'))img.style.aspectRatio=String(img.width/img.height);img.loading=eager?'eager':'lazy';img.decoding='async';if(eager)img.fetchPriority='high';b.append(img,make('span','photo-open-cue','View photograph ↗'));f.append(b);const caption=make('figcaption');caption.append(make('span','',photo.caption||''),make('span','photo-folio',pad(active.photos.indexOf(photo)+1)));f.append(caption);return f;}
 function render({root,project,local=false,allProjects=[]}){
  clear();active=project;root.replaceChildren();root.classList.add('photographic-album','folio-album');
  const ordinal=Math.max(0,allProjects.findIndex(p=>p.id===project.id)),photos=project.photos;
  window.CollinsPostcards?.apply(root,project,ordinal);
  root.style.setProperty('--folio-accent',ordinal%2?'#946649':'#4c624b');
  const chapters=(project.editorial?.chapters||[]).map(c=>({...c,ids:(c.blocks||[]).flatMap(b=>b.photoIds||[])}));
  const shell=make('div','folio-shell'),topline=make('nav','folio-topline');topline.setAttribute('aria-label','Album navigation');
  for(const [label,hash] of [['← All albums','#work'],['The backyard','#backyard'],['Resume the submarine ↓','#pool'],['Start a project ↗','#project']]){const a=make('a','',label);a.href=hash;topline.append(a);}shell.append(topline);
  if(local)shell.append(make('p','photographic-preview','LOCAL DRAFT PREVIEW · WEBSITE CONTENT HAS NOT CHANGED'));
  const heading=make('header','folio-heading');heading.append(make('p','eyebrow',`COLLINS / ALBUM ${pad(ordinal+1)}`),make('h1','',project.title),make('p','folio-subtitle',`${photos.length} photographs. One backyard.`));shell.append(heading);
  const reader=make('section','folio-reader');reader.setAttribute('aria-label',`${project.title} photograph album`);
  const left=make('div','folio-left'),right=make('aside','folio-right'),photo=make('button','folio-main-photo'),image=make('img');photo.type='button';image.decoding='async';image.fetchPriority='high';
  photo.append(image,make('span','folio-enlarge','Open full screen ↗'));
  const caption=make('p','folio-caption'),controls=make('div','folio-controls'),previous=make('button','','← Previous'),next=make('button','','Next →'),count=make('span','folio-page-number');
  previous.type=next.type='button';previous.setAttribute('aria-label','Previous album photograph');next.setAttribute('aria-label','Next album photograph');
  controls.append(previous,count,next);left.append(photo,caption,controls);
  right.append(make('span','folio-imprint','COLLINS / PROJECT PHOTOGRAPHS'),make('h2','','In this album.'));
  const tabs=make('nav','folio-chapters');tabs.setAttribute('aria-label','Album chapters');const chapterButtons=[];
  for(const c of chapters){const first=c.ids.map(id=>photos.findIndex(p=>p.id===id)).find(i=>i>=0)??-1;if(first<0)continue;const b=make('button','',c.navigation||c.label);b.type='button';b.addEventListener('click',()=>select(first));tabs.append(b);chapterButtons.push({button:b,ids:c.ids});}right.append(tabs);
  const indexHeading=make('p','folio-index-label','CHOOSE A PHOTOGRAPH'),thumbs=make('div','folio-thumbnails');thumbs.setAttribute('aria-label','Photograph index');const thumbButtons=[];
  photos.forEach((p,i)=>{const b=make('button','folio-thumb');b.type='button';b.setAttribute('aria-label',`Photograph ${i+1}: ${p.caption||project.title}`);const img=make('img');img.src=src(p);img.alt='';img.loading='lazy';img.decoding='async';img.width=p.width||1200;img.height=p.height||800;b.append(img,make('span','',pad(i+1)));b.addEventListener('click',()=>select(i));thumbButtons.push(b);thumbs.append(b);});
  const status=make('p','folio-status sr-only');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  const inquiry=make('a','folio-inquiry','Use this album in my project note ↗');inquiry.href='#project';inquiry.addEventListener('click',()=>{const idea=document.querySelector('[name="idea"]');if(idea&&!idea.value)idea.value=`I’m interested in the album “${project.title}”. `;});
  right.append(indexHeading,thumbs,status,inquiry);reader.append(left,right);shell.append(reader);
  let selected=0;
  function keepThumbInView(){
   if(!reader.isConnected)return;
   const b=thumbButtons[selected],r=b.getBoundingClientRect(),t=thumbs.getBoundingClientRect();
   if(matchMedia('(max-width:720px)').matches){if(r.left<t.left)thumbs.scrollLeft-=t.left-r.left+4;else if(r.right>t.right)thumbs.scrollLeft+=r.right-t.right+4;}
   else{if(r.top<t.top)thumbs.scrollTop-=t.top-r.top+4;else if(r.bottom>t.bottom)thumbs.scrollTop+=r.bottom-t.bottom+4;}
  }
  function select(i){
   selected=Math.max(0,Math.min(photos.length-1,i));selections.set(project.id,selected);const p=photos[selected];
   image.src=src(p);image.alt=p.alt||p.caption||project.title;image.width=p.width||1200;image.height=p.height||800;
   photo.setAttribute('aria-label',`View photograph: ${p.caption||project.title}`);caption.textContent=p.caption||project.title;
   count.textContent=`${pad(selected+1)} / ${pad(photos.length)}`;previous.disabled=selected===0;next.disabled=selected===photos.length-1;
   thumbButtons.forEach((b,n)=>b.setAttribute('aria-pressed',String(n===selected)));
   chapterButtons.forEach(c=>c.button.setAttribute('aria-pressed',String(c.ids.includes(p.id))));
   status.textContent=`Photograph ${selected+1} of ${photos.length}. ${p.caption||''}`;keepThumbInView();
  }
  previous.addEventListener('click',()=>select(selected-1));next.addEventListener('click',()=>select(selected+1));photo.addEventListener('click',()=>open(photos[selected].id,photo));
  reader.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();select(selected+(e.key==='ArrowRight'?1:-1));});
  image.addEventListener('error',()=>{status.classList.remove('sr-only');status.textContent='This photograph could not load. Choose another photograph, or return to all albums.';});
  select(selections.get(project.id)??Math.max(0,photos.findIndex(p=>p.id===project.coverId)));
  const all=make('details','folio-all');const summary=make('summary','',`All ${photos.length} photographs`);all.append(summary);
  const grid=make('div','photographic-contact-sheet');photos.forEach(p=>grid.append(figure(p,'photographic-thumbnail')));all.append(grid);shell.append(all);
  const end=make('nav','folio-end');end.setAttribute('aria-label','Continue through the albums');
  for(const [offset,label] of [[-1,'← Previous album'],[1,'Next album →']]){const p=allProjects[ordinal+offset];if(p){const a=make('a','');a.href=`#work/${p.slug}`;a.append(make('span','',label),make('strong','',p.title));end.append(a);}}
  shell.append(end);const back=make('a','folio-return','← Back to all eight albums');back.href='#work';shell.append(back);root.append(shell);requestAnimationFrame(keepThumbInView);
  document.title=`${project.title} — Collins Custom Pools & Backyards`;
 }
 addEventListener('hashchange',()=>{if(dialog?.open)dialog.close();});
 window.CollinsPhotoAlbum={render,clear};
})();
