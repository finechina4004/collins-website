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
  let active='swim';
  const choose = key => {
    if (!notes[key]) return;
    active=key;
    const note=notes[key];
    document.querySelectorAll('[data-backyard]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.backyard===key)));
    $('#backyard-desk').dataset.selection=key;
    $('#desk-number').textContent=`FIELD NOTE ${note.number}`;
    $('#desk-title').textContent=note.title;
    $('#desk-description').textContent=note.description;
    $('#desk-materials').textContent=note.materials;
    $('#desk-carry').replaceChildren(document.createTextNode(note.action+' '));
    const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');$('#desk-carry').append(arrow);
  };
  document.querySelectorAll('[data-backyard]').forEach(button=>button.addEventListener('click',()=>choose(button.dataset.backyard)));
  $('#desk-carry').addEventListener('click',()=>{
    const note=notes[active],idea=$('[name="idea"]');
    $('#interest').value=note.interest;
    if(!idea.value.includes(note.idea))idea.value=[idea.value.trim(),note.idea].filter(Boolean).join('\n');
  });
  $('#world-light').addEventListener('click',()=>{
    const evening=$('#home-world').classList.toggle('after-hours');
    $('#world-light').setAttribute('aria-pressed',String(evening));
    $('#world-light').innerHTML=evening?'Back to the afternoon <span aria-hidden="true">◑</span>':'Stay until evening <span aria-hidden="true">◐</span>';
    $('#scene-hour').textContent=evening?'08:16':'04:37';
    $('#scene-time').textContent=evening?'NOBODY’S IN A HURRY':'THE AFTERNOON DEPARTMENT';
    $('#home-world .home-day').alt=evening?'An imagined Collins miniature pool after dark, with glowing pool light and a sage fence.':'An original imagined Collins miniature pool, with limestone coping, a sage fence and afternoon light';
  });
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
