/* A backyard to explore. All choices are browser-local; no inquiry is sent. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const notes = {
    swim: { number:'01', title:'The long way through an afternoon.', description:'A few laps. A shallow step. A spa when the air gets cool. A custom pool begins with how you want to spend your time.', materials:'CUSTOM POOLS / SPAS / POOL REMODELS', action:'Put a pool in my brief', interest:'New custom pool', idea:'I’d like to talk about a custom pool or spa.' },
    cook: { number:'02', title:'Supper has moved outside.', description:'A kitchen close to the conversation. Somewhere to set a plate. A little room for whoever stays for one more. Let’s plan an outdoor kitchen around how you cook.', materials:'OUTDOOR KITCHENS / PATIOS / GATHERING SPACES', action:'Put an outdoor kitchen in my brief', interest:'Outdoor living project', idea:'I’d like to talk about an outdoor kitchen and a place to eat outside.' },
    shade: { number:'03', title:'A little less Texas sun.', description:'Somewhere to read. Somewhere for a second cup. Pergolas and shade structures give an afternoon a comfortable place to settle.', materials:'PERGOLAS / SHADE STRUCTURES / PATIOS', action:'Put some shade in my brief', interest:'Outdoor living project', idea:'I’d like to talk about a pergola or shade structure.' },
    stay: { number:'04', title:'Nobody’s checking the time.', description:'The sun drops. The fire comes on. The chairs turn toward each other. Patios and fire features make room for the part of the evening you didn’t plan.', materials:'FIRE FEATURES / PATIOS / COMPLETE BACKYARDS', action:'Put a gathering space in my brief', interest:'Complete backyard', idea:'I’d like to talk about a patio, fire feature, and room to gather.' }
  };
  const examples={swim:['#experience/pools','See the real pool albums ↗'],cook:['#experience/kitchen','Explore real outdoor kitchens ↗'],shade:['#experience/shade','Explore real shade structures ↗'],stay:['#experience/fire','Explore real fire features ↗']};
  let active='swim';
  const choose = key => {
    if (!notes[key]) return;
    active=key;
    try{sessionStorage.setItem('collins-desk-selection',key);}catch{}
    const note=notes[key];
    document.querySelectorAll('[data-backyard]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.backyard===key)));
    $('#backyard-desk').dataset.selection=key;
    $('#desk-number').textContent=`FIELD NOTE ${note.number}`;
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
  $('#world-light').addEventListener('click',()=>{
    const evening=$('#home-world').classList.toggle('after-hours');
    $('#world-light').setAttribute('aria-pressed',String(evening));
    $('#world-light').innerHTML=evening?'Back to the afternoon <span aria-hidden="true">◑</span>':'Stay until evening <span aria-hidden="true">◐</span>';
    $('#scene-hour').textContent=evening?'08:16':'04:37';
    $('#scene-time').textContent=evening?'NOBODY’S IN A HURRY':'THE AFTERNOON DEPARTMENT';
    $('#home-world .home-day').alt=evening?'The imagined painted Collins backyard in evening light.':'The imagined painted Collins backyard in afternoon light.';
  });
  const drawing=$('#desk-art-image');
  drawing.addEventListener('error',()=>{$('#desk-art').classList.add('has-error');$('#desk-art-note').textContent='The drawing could not load. Use Swim, Cook, Shade or Stay to explore.';});
  drawing.addEventListener('load',()=>{$('#desk-art').classList.remove('has-error');$('#desk-art-note').textContent='AN ILLUSTRATED COLLINS BACKYARD / CHOOSE A PLACE TO BEGIN.';});
  // Escape the drawing with its ordinary links; no wheel interception or cursor tricks.
  const form=$('#project-form');
  const invalidateBrief = () => {
    if(!$('#brief-review').hidden){$('#brief-review').hidden=true;$('#brief-review-note').textContent='Your notes changed. Review the brief again to update your copy.';}
  };
  form.addEventListener('input',invalidateBrief);
  form.addEventListener('change',invalidateBrief);
  document.addEventListener('click',event=>{if(event.target.closest('a[href="#project"]'))invalidateBrief();});
  form.addEventListener('submit',()=>{$('#brief-review-note').textContent='';});
})();
