/* Direct customer routes and visitor-reviewed project notes. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s),html=document.documentElement;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let manual=false,calm=reduced.matches,brief='',recoveredLink=false;
 if('scrollRestoration' in history)history.scrollRestoration='manual';
 function motion(){calm=manual||reduced.matches;html.classList.toggle('calm',calm);const button=$('#world-motion');button.setAttribute('aria-pressed',String(calm));button.setAttribute('aria-label',calm?'Resume motion':'Pause motion');button.querySelector('.tool-label').textContent=calm?'Paused':'Motion';}
 $('#world-motion').addEventListener('click',()=>{manual=!manual;motion();});reduced.addEventListener('change',motion);
 function base(kind){html.dataset.route=kind;$('#backyard').inert=kind!=='world';$('#website').inert=kind==='world';}
 function route(initial=false){
  let hash=location.hash||'#backyard';
  if(!['#backyard','#home','#launch','#pool','#build','#work','#about','#project','#studio'].includes(hash)&&!hash.startsWith('#work/')&&!hash.startsWith('#experience/')){recoveredLink=true;hash='#build';history.replaceState(null,'',hash);}
  $('#route-notice').hidden=!recoveredLink;
  if(['#home','#launch','#pool'].includes(hash)){history.replaceState(null,'','#backyard');return route(initial);}
  if(hash==='#backyard'){base('world');document.title='Collins Custom Pools & Backyards | Denton County, Texas';scrollTo({top:0,behavior:'instant'});if(!initial){$('#backyard').focus({preventScroll:true});window.CollinsBackyard?.restoreFocus();}return;}
  const kind=hash.startsWith('#work/')?'album':hash.startsWith('#experience/')?'feature':hash==='#studio'?'studio':'site';base(kind);
  for(const [id,k] of [['album-detail','album'],['feature-detail','feature'],['studio','studio']])$('#'+id).hidden=kind!==k;
  if(kind==='album')window.CollinsCatalog?.show(hash.slice(6));if(kind==='feature')window.CollinsBackyard?.show(hash.split('/')[1]);if(kind==='studio')window.CollinsStudio?.show();
  document.title=kind==='site'?'Collins — Custom pools & complete backyards':document.title;
  requestAnimationFrame(()=>{const target=$(kind==='album'?'#album-detail':kind==='feature'?'#feature-detail':kind==='studio'?'#studio':'#build');const section=kind==='site'?(document.getElementById(hash.slice(1))||$('#build')):target;if(kind==='site')section.scrollIntoView({block:'start',behavior:'instant'});else scrollTo({top:0,behavior:'instant'});if(!initial)section.focus({preventScroll:true});});
 }
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;if(a.dataset.interest)$('#interest').value=a.dataset.interest;if(a.hash===location.hash){e.preventDefault();recoveredLink=false;route();}});
 addEventListener('hashchange',()=>{recoveredLink=false;route();});addEventListener('pageshow',e=>{if(e.persisted)route(true);});
  $('#project-form').addEventListener('submit', event => {
    event.preventDefault();
    for(const name of ['name','location']){const field=event.currentTarget.elements[name];field.value=field.value.trim();field.setCustomValidity(field.value?'':'Please enter '+(name==='name'?'your name.':'your town or neighborhood.'));}
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
  $('#project-form').addEventListener('reset',()=>{for(const name of ['name','location','phone'])$('[name='+name+']').setCustomValidity('');brief='';$('#brief-text').textContent='';$('#text-brief').removeAttribute('href');$('#brief-review').hidden=true;$('#brief-review-note').textContent='';});
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
 for(const name of ['name','location'])$('[name='+name+']').addEventListener('input',e=>e.target.setCustomValidity(''));

 motion();route(true);window.COLLINS_READY=true;window.CollinsNavigation={refresh:()=>route(true)};
})();
