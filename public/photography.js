/* A quiet photographic album. Owner-supplied images retain their actual geometry. */
(() => {
 'use strict';
 const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
 const src=p=>p.preview||p.src||'';
 let active=null,openedAt=null,dialog=null,index=0;
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
 function chapter(number,label,title,description){const section=make('section','photographic-chapter photo-shell');section.id=`photo-chapter-${number}`;const heading=make('div','photographic-chapter-heading'),left=make('div');left.append(make('p','eyebrow',`${number} / ${label}`),make('h2','',title));heading.append(left,make('p','',description));section.append(heading);return section;}
 function render({root,project,local=false,allProjects=[]}){
 clear();active=project;root.replaceChildren();root.classList.add('photographic-album');const photos=project.photos,byId=id=>photos.find(p=>p.id===id),chapters=(project.editorial?.chapters||[]).filter(c=>(c.blocks||[]).some(b=>(b.photoIds||[]).some(id=>byId(id)))),ordinal=allProjects.findIndex(p=>p.id===project.id)+1;
 const shell=make('div','photo-shell');const topline=make('div','photographic-topline'),back=make('a','','← The project shelf');back.href='#work';topline.append(back,make('span','',`COLLINS / ALBUM ${pad(ordinal||1)}`));shell.append(topline);
 if(local)shell.append(make('p','photographic-preview','LOCAL DRAFT PREVIEW · WEBSITE CONTENT HAS NOT CHANGED'));
 const heading=make('div','photographic-heading'),left=make('div');left.append(make('p','eyebrow','COLLINS / THE POOLSIDE ARCHIVE'));const h1=make('h1');const parts=project.title.split(', ');if(parts.length===2)h1.append(document.createTextNode(parts[0]+','),document.createElement('br'),make('em','',parts[1]));else h1.textContent=project.title;left.append(h1);const right=make('div','photographic-introduction');right.append(make('p','photographic-lead',project.summary||''),make('p','photographic-count',`${photos.length} PHOTOGRAPHS / ${project.editorial?.sequenceLabel||'COLLINS / THE POOLSIDE ARCHIVE'}`));const nav=make('nav','photographic-jumps');nav.setAttribute('aria-label','Jump to a part of the photo album');for(const [i,c] of chapters.entries()){const num=pad(i+1),label=c.navigation||c.label;const b=make('button','',label+' ↓');b.type='button';b.addEventListener('click',()=>document.getElementById(`photo-chapter-${num}`)?.querySelector('.photographic-chapter-heading')?.scrollIntoView({block:'start',behavior:document.documentElement.classList.contains('calm')?'instant':'smooth'}));nav.append(b);}right.append(nav);heading.append(left,right);shell.append(heading);root.append(shell);
 const hero=photos.find(p=>p.id===project.coverId)||byId(project.editorial?.heroId)||photos[0];root.append(figure(hero,'photographic-hero photo-shell',true));
 for(const [i,c] of chapters.entries()){
  const section=chapter(pad(i+1),c.label,c.title,c.description);
  for(const block of c.blocks||[]){
   const selected=(block.photoIds||[]).map(byId).filter(Boolean);if(!selected.length)continue;
   if(block.layout==='wide'){selected.forEach(p=>section.append(figure(p,'photographic-wide')));continue;}
   const style=block.layout==='feature'?'photographic-evening-feature':block.layout==='pair-offset'?'photographic-pair photographic-pair-offset':'photographic-pair';
   const group=make('div',style);selected.forEach(p=>group.append(figure(p)));
   if(block.note){const note=make('aside','photographic-margin-note');note.append(make('span','eyebrow',block.note.label),make('p','',block.note.text),make('span','photographic-small-rule'));group.append(note);}
   section.append(group);
  }
  root.append(section);
 }
 const all=make('section','photographic-all photo-shell');const allheading=make('div','photographic-all-heading');allheading.append(make('h2','','Every angle.'),make('p','',`All ${photos.length} photographs. Open any image for a closer look.`));all.append(allheading);const grid=make('div','photographic-contact-sheet');for(const p of photos)grid.append(figure(p,'photographic-thumbnail'));all.append(grid);root.append(all);
 const end=make('div','photographic-end photo-shell');end.append(make('p','eyebrow','BACK TO YOUR BACKYARD'),make('h2','','What would your afternoons look like?'));const cta=make('a','ink-button','Put your idea on paper ↗');cta.href='#project';cta.addEventListener('click',()=>{const idea=document.querySelector('[name="idea"]');if(idea&&!idea.value)idea.value=`I’m interested in the album “${project.title}”. `;});const returnLink=make('a','photographic-return','← Back to the project shelf');returnLink.href='#work';end.append(cta,returnLink);const more=make('nav','album-adjacent');more.setAttribute('aria-label','Continue through the project albums');const n=allProjects.findIndex(p=>p.id===project.id);for(const [offset,label] of [[-1,'Previous album'],[1,'Next album']]){const p=allProjects[n+offset];if(p){const a=make('a','',`${label}: ${p.title} ${offset<0?'←':'→'}`);a.href=`#work/${p.slug}`;more.append(a);}}const dive=make('a','album-dive','Return to the miniature world ↓');dive.href='#launch';end.append(more,dive);root.append(end);document.title=`${project.title} — Collins Custom Pools & Backyards`;
 }
 addEventListener('hashchange',()=>{if(dialog?.open)dialog.close();});
 window.CollinsPhotoAlbum={render,clear};
})();
