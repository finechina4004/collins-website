/* Consistent project covers. Photographs remain original project evidence. */
(() => {
 'use strict';
 const palettes=[
  ['#e9e6d1','#3d4b3d','#7b8154','botanical'],
  ['#252b28','#f1e7d0','#c3aa6a','blacktie'],
  ['#b6624c','#fff0d8','#55382d','dallas'],
  ['#d9e5e4','#25444d','#987954','leisure'],
  ['#e5c4b8','#553f3d','#9f6955','residence'],
  ['#f3e8ce','#294856','#ce754a','striped'],
  ['#edce87','#455344','#b46b45','supper'],
  ['#344e43','#f4e8ca','#d49c55','umpire']
 ];
 const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
 function theme(project,index){const p=palettes[index]||palettes[0];return {paper:p[0],ink:p[1],accent:p[2],style:p[3]};}
 function apply(el,project,index){const p=theme(project,index);el.dataset.postcard=p.style;for(const [k,v] of Object.entries(p))if(k!=='style')el.style.setProperty('--card-'+k,v);}
 function card(project,index){
  const a=make('a','postcard album-entry');a.href='#work/'+project.slug;a.setAttribute('aria-label','Open album: '+project.title);apply(a,project,index);
  const photos=project.photos||[],cover=photos.find(p=>p.id===project.coverId)||photos[0];
  const img=(photo,cls)=>{const e=make('img',cls);e.src=photo.preview||photo.src;e.alt=photo.alt||photo.caption||project.title;e.width=photo.width;e.height=photo.height;e.loading='lazy';return e;};
  const picture=make('div','postcard-picture');if(cover)picture.append(img(cover,'postcard-photo'));

  const title=make('h3','postcard-title',project.title),stamp=make('span','postcard-stamp','COLLINS'),number=make('span','postcard-number',String(index+1).padStart(2,'0'));
  const meta=make('span','postcard-meta',photos.length+' photographs'),open=make('span','postcard-open','View project ↗');
  a.append(picture,title,stamp,number,meta,open);return a;
 }
 window.CollinsPostcards={card,apply};
})();
