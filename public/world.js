/* A backyard to explore. All choices are browser-local; no inquiry is sent. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const notes = {
    swim: { number:'01', title:'Custom pools & spas.', description:'New custom pools, integrated spas and pool remodels, planned around your yard.', materials:'CUSTOM POOLS / SPAS / POOL REMODELS', action:'Put a pool in my brief', interest:'New custom pool', idea:'I’d like to talk about a custom pool or spa.' },
    cook: { number:'02', title:'Outdoor kitchens.', description:'Outdoor kitchens, grills and dining spaces, planned with your patio and pool.', materials:'OUTDOOR KITCHENS / PATIOS / GATHERING SPACES', action:'Put an outdoor kitchen in my brief', interest:'Outdoor living project', idea:'I’d like to talk about an outdoor kitchen and a place to eat outside.' },
    shade: { number:'03', title:'Pergolas & shade.', description:'Pergolas, shade structures and covered patios.', materials:'PERGOLAS / SHADE STRUCTURES / PATIOS', action:'Put some shade in my brief', interest:'Outdoor living project', idea:'I’d like to talk about a pergola or shade structure.' },
    stay: { number:'04', title:'Patios & fire features.', description:'Patios, fireplaces, fire pits and complete outdoor living spaces.', materials:'FIRE FEATURES / PATIOS / COMPLETE BACKYARDS', action:'Put a gathering space in my brief', interest:'Complete backyard', idea:'I’d like to talk about a patio, fire feature, and room to gather.' }
  };
  const examples={swim:['#experience/pools','See the real pool albums ↗'],cook:['#experience/kitchen','Explore real outdoor kitchens ↗'],shade:['#experience/shade','Explore real shade structures ↗'],stay:['#experience/fire','Explore real fire features ↗']};
  let active='swim',photoRequest=0;
  const references={swim:['a-minor-key',null],cook:['the-sun-stayed-for-supper','the-sun-stayed-for-supper-350d699af84be8e5'],shade:['mr-bears-residence','mr-bears-residence-e5050074673f3ad9'],stay:['dallas-with-feeling','dallas-with-feeling-1be9be01746f74d2']};
  async function showProjectPhoto(key){
    const request=++photoRequest,catalog=await window.CollinsCatalog.ready;
    if(request!==photoRequest)return;
    const [slug,id]=references[key],project=catalog.projects.find(p=>p.slug===slug),photo=project?.photos.find(p=>p.id===(id||project.coverId))||project?.photos[0];
    if(!photo){$('#desk-art').classList.add('has-error');$('#desk-art-note').textContent='Project photographs could not load. Use the service links below.';return;}
    $('#desk-art').classList.remove('has-error');
    const image=$('#desk-art-image');image.src=photo.preview||photo.src;image.alt=photo.alt||photo.caption||project.title;image.width=photo.width;image.height=photo.height;
    $('#desk-art-note').textContent='PROJECT PHOTOGRAPH / '+project.title;
  }
  const choose = key => {
    if (!notes[key]) return;
    active=key;showProjectPhoto(key);
    try{sessionStorage.setItem('collins-desk-selection',key);}catch{}
    const note=notes[key];
    document.querySelectorAll('[data-backyard]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.backyard===key)));
    $('#backyard-desk').dataset.selection=key;
    $('#desk-number').textContent=`BACKYARD / ${note.number}`;
    $('#desk-title').textContent=note.title;
    $('#desk-description').textContent=note.description;
    $('#desk-materials').textContent=note.materials;
    $('#desk-examples').href=examples[key][0];$('#desk-examples').textContent=examples[key][1];
    $('#desk-carry').replaceChildren(document.createTextNode(note.action+' '));
    const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');$('#desk-carry').append(arrow);
  };
  document.querySelectorAll('[data-backyard]').forEach(button=>button.addEventListener('click',()=>choose(button.dataset.backyard)));
  let savedSelection='swim';try{savedSelection=sessionStorage.getItem('collins-desk-selection')||'swim';}catch{}
  choose(notes[savedSelection]?savedSelection:'swim');
  $('#desk-carry').addEventListener('click',()=>{
    const note=notes[active],idea=$('[name="idea"]');
    $('#interest').value=note.interest;
    if(!idea.value.includes(note.idea)){const next=[idea.value.trim(),note.idea].filter(Boolean).join('\n');if(next.length<=idea.maxLength)idea.value=next;else $('#brief-review-note').textContent='Your note is already full. We kept what you wrote.';}
  });
  const drawing=$('#desk-art-image');
  drawing.addEventListener('error',()=>{$('#desk-art').classList.add('has-error');$('#desk-art-note').textContent='The drawing could not load. Use Swim, Cook, Shade or Stay to explore.';});
  drawing.addEventListener('load',()=>{$('#desk-art').classList.remove('has-error');/* Keep the selected real project credit. */});
  // Escape the drawing with its ordinary links; no wheel interception or cursor tricks.
  const form=$('#project-form');
  $('#write-project-note').addEventListener('click',()=>{form.querySelector('input').focus({preventScroll:true});form.scrollIntoView({block:'start',behavior:'instant'});});
  const invalidateBrief = () => {
    if(!$('#brief-review').hidden){$('#brief-review').hidden=true;$('#brief-review-note').textContent='Your notes changed. Review the brief again to update your copy.';}
  };
  form.addEventListener('input',invalidateBrief);
  form.addEventListener('change',invalidateBrief);
  document.addEventListener('click',event=>{if(event.target.closest('a[href="#project"]'))invalidateBrief();});
  form.addEventListener('submit',()=>{$('#brief-review-note').textContent='';});
})();
