/* Keep previously shared Collins links useful on the simple landing page. */
(() => {
 'use strict';
 const aliases = {'#home':'#backyard','#launch':'#backyard','#pool':'#backyard','#project':'#contact','#about':'#contact','#services':'#build','#projects':'#work'};
 function recover() {
  const hash = location.hash;
  if (hash.startsWith('#work/')) {
   const slug = hash.slice(6);
   const link = [...document.querySelectorAll('[data-album-slug]')].find(a => a.dataset.albumSlug === slug);
   if (link) { location.replace(link.href); return; }
   location.replace('#work'); return;
  }
  const target = aliases[hash] || (hash.startsWith('#experience/') ? '#work' : null);
  if (target) { location.replace(target); return; }
  if (hash && !document.getElementById(hash.slice(1))) location.replace('#backyard');
 }
 const copyButton = document.querySelector('[data-copy-phone]');
 if (copyButton) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
   const status = document.querySelector('.contact-copy-status');
   try {
    await navigator.clipboard.writeText(copyButton.dataset.copyPhone);
    status.textContent = 'Number copied. Talk soon.';
   } catch {
    status.textContent = 'Select and copy the number above: ' + copyButton.dataset.copyPhone;
   }
  });
 }
 addEventListener('hashchange', recover);
 recover();
})();
