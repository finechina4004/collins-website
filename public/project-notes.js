/* A project note stays in this tab. Native Messages is opened only by the visitor. */
(() => {
 'use strict';
 const form=document.querySelector('#project-form');
 const status=document.querySelector('#draft-status'),clearButton=document.querySelector('#clear-project-draft');
 const key='collins-project-note-v1',limits={name:100,phone:40,location:120,interest:60,idea:3000};
 const names=Object.keys(limits),defaultInterest=form.elements.interest.options[0].value;
 const interests=[...form.elements.interest.options].map(option=>option.value);
 let timer=0,undo=null,changing=false,storageAvailable=true;
 const fields=()=>Object.fromEntries(names.map(name=>[name,form.elements[name].value]));
 const hasDraft=values=>names.some(name=>name==='interest'?values[name]!==defaultInterest:values[name].trim().length>0);
 function say(message){if(status.textContent!==message)status.textContent=message;}
 function controls(){clearButton.hidden=!undo&&!hasDraft(fields());clearButton.textContent=undo?'Undo clear':'Clear this note';}
 function persist(message){
  clearTimeout(timer);timer=0;const values=fields(),present=hasDraft(values);
  try{if(present)sessionStorage.setItem(key,JSON.stringify({version:1,fields:values}));else sessionStorage.removeItem(key);storageAvailable=true;}
  catch{storageAvailable=false;}
  controls();
  say(message||(storageAvailable?'Your draft is kept in this tab. Nothing sent.':'Your draft stays on this page. Nothing sent.'));
 }
 function apply(values){
  changing=true;
  for(const name of names)form.elements[name].value=values[name]||'';
  form.dispatchEvent(new Event('input',{bubbles:true}));changing=false;
 }
 let saved=null;
 try{const raw=sessionStorage.getItem(key);try{saved=JSON.parse(raw||'null');}catch{}}
 catch{storageAvailable=false;}
 if(saved?.version===1&&saved.fields&&names.every(name=>typeof saved.fields[name]==='string'&&saved.fields[name].length<=limits[name])&&interests.includes(saved.fields.interest)){
  apply(saved.fields);say('Your draft was restored in this tab. Nothing sent.');
 }
 controls();if(!storageAvailable)say('Your draft stays on this page. Nothing sent.');
 const edited=()=>{if(changing)return;undo=null;controls();clearTimeout(timer);timer=setTimeout(()=>persist(),150);};
 form.addEventListener('input',edited);form.addEventListener('change',edited);
 form.addEventListener('submit',()=>persist());
 document.addEventListener('click',event=>{
  if(event.target.closest('a[href="#project"]'))queueMicrotask(()=>{undo=null;persist();});
 });
 addEventListener('pagehide',()=>persist());
 clearButton.addEventListener('click',()=>{
  clearTimeout(timer);timer=0;
  if(undo){const previous=undo;undo=null;apply(previous);persist('Your draft was restored. Review it when you’re ready.');}
  else{
   undo=fields();changing=true;form.reset();form.dispatchEvent(new Event('input',{bubbles:true}));changing=false;
   persist('Note cleared in this tab. Undo is available.');
  }
 });
})();
