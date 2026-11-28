/* One-screen postcard edition. Original wallpapers, direct navigation and optional native dialogs. */
export function applyPostcards(pages){
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const css=`
body.tx-postcard{display:flex;flex-direction:column;min-height:100vh;min-height:100svh;margin:0;background:var(--ink);font-family:var(--sans)}
.tx-postcard>.site-header{flex:none;z-index:5}
.tx-postcard #main{display:flex;flex-direction:column;flex:1;min-height:0}
.tx-postcard .postcard{position:relative;isolation:isolate;display:flex;flex:1;align-items:flex-end;min-height:0;color:var(--cream);background:var(--ink);overflow:hidden}
.postcard-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:var(--photo-position,50% 50%);z-index:-2}
.postcard:after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(0deg,rgba(16,37,29,.94) 0%,rgba(16,37,29,.62) 25%,rgba(16,37,29,.12) 60%,transparent 80%);pointer-events:none}
.postcard-inner{width:min(89%,88rem);margin-inline:auto;padding-block:clamp(2rem,5vh,4.5rem);display:grid;grid-template-columns:minmax(0,1fr) auto;gap:1rem 2.2rem;align-items:end}
.postcard h1{color:inherit;font-family:var(--serif);font-weight:400;font-size:clamp(2.6rem,6.2vw,6.7rem);line-height:1.01;letter-spacing:-.035em;margin:0;max-width:21ch;text-wrap:balance}
.postcard p{font:400 clamp(.98rem,1.4vw,1.18rem)/1.55 var(--sans);max-width:49ch;margin:.7rem 0 0;color:inherit}
.postcard-actions{display:flex;flex-wrap:wrap;gap:.15rem 1.7rem;margin-top:1rem}
.postcard-action{appearance:none;background:transparent;border:0;padding:.35rem 0;min-height:44px;display:inline-flex;align-items:center;gap:.35em;color:inherit;font:400 .93rem/1.4 var(--sans);text-decoration:underline;text-underline-offset:.4em;cursor:pointer;max-width:100%;overflow-wrap:anywhere}
.postcard-action:hover{color:#f0d5a6}
.postcard-action:focus-visible,.postcard-dialog a:focus-visible,.postcard-close:focus-visible{outline:2px solid currentColor;outline-offset:4px}
.postcard-credit{color:var(--cream);font:400 .68rem/1.5 var(--sans);text-align:right;max-width:18rem;opacity:.94}
.postcard-credit span{display:block;letter-spacing:.08em;margin-bottom:.25rem}
.postcard-dialog{box-sizing:border-box;background:var(--paper);color:var(--ink);border:1px solid var(--line);margin:auto;padding:clamp(1.2rem,3vw,2.5rem);width:min(92vw,38rem);max-height:88svh;overflow:auto;overscroll-behavior:contain;box-shadow:0 16px 70px #0005}
.postcard-dialog:not([open]):not(:target){display:none}
.postcard-dialog:target:not([open]){display:block;position:fixed;inset:0;z-index:20}
.postcard-dialog::backdrop{background:rgba(18,34,29,.67)}
.postcard-dialog h2{font:400 clamp(1.7rem,4vw,2.7rem)/1.1 var(--serif);margin:.25rem 0 1rem;max-width:22ch}
.postcard-dialog p{font:400 1rem/1.55 var(--sans);margin:.7rem 0}
.postcard-dialog .postcard-action{color:var(--ink)}
.postcard-dialog .postcard-action:hover{color:var(--copper)}
.postcard-close{display:flex;align-items:center;justify-content:flex-end;min-height:44px;color:var(--ink);font:400 .85rem/1.3 var(--sans);text-underline-offset:.35em}
.postcard-links{display:grid;grid-template-columns:1fr 1fr;gap:0 1.2rem;margin:.6rem 0 0}
.postcard-links a{min-height:44px;display:flex;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--line);text-decoration:none;color:var(--ink)}
.postcard-links a:hover{text-decoration:underline}
.postcard-steps{list-style:none;padding:0;margin:0}
.postcard-steps li{padding:.6rem 0;border-top:1px solid var(--line)}
.postcard-steps strong{display:block;font-weight:400;color:var(--copper)}
.postcard-steps p{margin:.2rem 0}
@media(min-width:701px) and (min-height:530px){body.tx-postcard{height:100vh;height:100svh}.postcard-inner{max-height:100%;overflow:auto}}
@media(max-width:700px){body.tx-postcard{min-height:100svh}.tx-postcard #main{min-height:calc(100svh - 4.5rem)}.postcard-inner{grid-template-columns:1fr;gap:1rem;padding-block:1.5rem;width:calc(100% - 2rem)}.postcard h1{font-size:clamp(2.2rem,9vw,3.7rem);max-width:17ch}.postcard-photo{object-position:var(--mobile-position,var(--photo-position,50% 50%))}.postcard:after{background:linear-gradient(0deg,#10251df5,#10251d9c 30%,transparent 70%)}.postcard-credit{text-align:left;font-size:.63rem;max-width:none}.postcard-credit span{display:inline;margin-right:.5rem}.postcard-actions{gap:0 1.2rem;margin-top:.65rem}.postcard-links{grid-template-columns:1fr}}
@media(max-height:529px) and (min-width:701px){.tx-postcard #main{min-height:24rem}.postcard-inner{padding-block:1.2rem}.postcard h1{font-size:clamp(2.2rem,5vw,4rem)}}
@media(prefers-reduced-motion:reduce){.tx-postcard *{scroll-behavior:auto!important;animation:none!important;transition:none!important}}
`;
 const script=`<script>(()=>{const dialogs=[...document.querySelectorAll('.postcard-dialog')];if(!dialogs.length||typeof HTMLDialogElement==='undefined'||!HTMLDialogElement.prototype.showModal)return;let opener;function restore(){const id=location.hash.slice(1),d=dialogs.find(x=>x.id===id);for(const item of dialogs)if(item!==d&&item.open)item.close();if(d&&!d.open)d.showModal();}function dismiss(){if(history.state?.collinsPostcard)history.back();else{history.replaceState(history.state,'',location.pathname+location.search);restore();}if(opener?.isConnected)opener.focus({preventScroll:true});}document.querySelectorAll('[data-postcard-open]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();opener=a;history.pushState({...history.state,collinsPostcard:true},'',a.getAttribute('href'));restore();}));dialogs.forEach(d=>{d.querySelector('.postcard-close').addEventListener('click',e=>{e.preventDefault();dismiss();});d.addEventListener('cancel',e=>{e.preventDefault();dismiss();});});addEventListener('popstate',restore);addEventListener('hashchange',restore);restore();})()</script>`;
 const link=(text,url,modal=false)=>`<a class="postcard-action" href="${esc(url)}"${modal?' data-postcard-open':''}>${esc(text)} <span aria-hidden="true">→</span></a>`;
 const panel=(id,title,body)=>`<dialog class="postcard-dialog" id="${id}" aria-labelledby="${id}-title"><a class="postcard-close" href="#main" aria-label="Close ${esc(title)}">Close ×</a><h2 id="${id}-title">${esc(title)}</h2>${body}</dialog>`;
 const phone=link("Call","tel:+14695007713"), sms=link("Text","sms:+14695007713"), email=link("Email","mailto:info@collinscustompools.com");
 const art=(image,alt,position,title,sub,actions,credit,extra="")=>`<section class="postcard" id="backyard" style="--photo-position:${position}"><img class="postcard-photo" src="${image}" alt="${esc(alt)}" fetchpriority="high" decoding="async"><div class="postcard-inner"><div><h1>${esc(title)}</h1>${sub?`<p>${esc(sub)}</p>`:""}<div class="postcard-actions">${actions}</div></div>${credit?`<div class="postcard-credit"><span>A love letter to Texas</span>${esc(credit)}</div>`:""}</div></section>${extra}`;
 const oldWork=pages.get("work.html");
 const albums=[...oldWork.matchAll(/<a href="(\/albums\/[^"]+)"[^>]*data-album-slug="[^"]+"[^>]*>[\s\S]*?<h3>([\s\S]*?)<\/h3>/g)];
 if(albums.length!==8)throw Error("Expected eight portfolio albums; found "+albums.length);
 const portfolio=panel("project-albums","The project collection",`<div class="postcard-links">${albums.map(m=>`<a href="${m[1]}">${m[2]} <span aria-hidden="true"> →</span></a>`).join("")}</div>`);
 const service=(id,title,body,url)=>panel(id,title,`<p>${esc(body)}</p>${link("See a project",url)} ${link("Let’s talk","/contact")}`);
 const services=service("custom-pools","Custom pools","A pool designed around your home, your yard and how you spend your summers.","/albums/black-tie-barefoot")+service("complete-backyards","Complete backyards","Patios, outdoor kitchens, pergolas, turf, fire features, saunas and backyard courts. Designed to work together.","/albums/the-sun-stayed-for-supper")+service("spas-and-remodels","Spas & remodels","Add a spa, update your finish or tile, or reimagine the pool you already have.","/albums/mr-bears-residence");
 const story=panel("our-story","Our story",`<p>Howdy, I’m Chase. I graduated from Gunter, and my family and I run Collins Custom Pools &amp; Backyards out of Aubrey, Texas.</p><p>My stepdad has been building pools for decades. We’ll walk your yard together and work out what makes sense for your family.</p>${link("Meet us","/contact")}`);
 const process=panel("how-we-build","From the first visit to the first swim",`<ol class="postcard-steps"><li><strong>01 · Meet</strong><p>Walk the yard and talk ideas.</p></li><li><strong>02 · Plan</strong><p>Design, scope, price and permits.</p></li><li><strong>03 · Build</strong><p>Excavation, steel, plumbing, shell, decking and finishes.</p></li><li><strong>04 · Enjoy</strong><p>Startup, walkthrough and the first swim.</p></li></ol>${link("Start a conversation","/contact")}`);
 const finance=panel("financing-options","Let’s talk numbers",`<p>We can discuss your project budget and whether independent financing might be an option.</p><p>No financing provider or specific terms have been announced. Any loan is subject to independent lender approval.</p>${link("Talk to Collins","/contact")}`);
 const home=pages.get("index.html");
 const oldRedirect=home.match(/<script>\(\(\)=>\{const m=\{[\s\S]*?<\/script>/)?.[0]||"";
 const legacy=oldRedirect.replaceAll("'#project':'#contact'","'#project':'/contact'").replaceAll("'#home':'#backyard'","'#home':'#backyard'");
 const dallas="/assets/dallas-pool.webp", dallasAlt="Backyard pool design inspiration with the Dallas skyline";
 const definitions={
  "index.html":art(dallas,dallasAlt,"55% center","For the place we call home.","Custom pools & complete backyards. Built for life in Texas. Based in Aubrey, serving North DFW.",link("See our work","/work")+link("Get in touch","/contact"),"Dallas skyline · Design inspiration",legacy),
  "about.html":art("/assets/dfw/pegasus.webp","Magnolia Pegasus at sunset, Dallas","50% 18%","Rooted right here.","For the people who made Texas what it is, and the families making it what comes next.",link("Our story","#our-story",true),"Magnolia Pegasus, Dallas",story),
  "services.html":art("/assets/dfw/arlington-stadium.webp","Historic aerial of Arlington Stadium","50% 50%","Room for more.","Long afternoons, good company and days you wish would never end.",link("Custom pools","#custom-pools",true)+link("Complete backyards","#complete-backyards",true)+link("Spas & remodels","#spas-and-remodels",true),"Historic aerial of Arlington Stadium",services),
  "pool-design.html":art("/assets/dfw/texas-pool.webp","Early aerial photograph of the Texas-shaped pool in Plano","50% 50%","Make it yours.","A backyard designed around the way you actually live.",link("Start designing","/contact"),"The Texas Pool, Plano"),
  "process.html":art("/assets/dfw/big-tex.webp","Vintage Big Tex at the State Fair of Texas, Dallas","50% 22%","Good work takes good people.","From the first backyard walk to the first swim.",link("How we build","#how-we-build",true),"Big Tex, State Fair of Texas",process),
  "work.html":art("/assets/dfw/southfork.webp","Vintage Southfork Ranch entrance postcard, Parker","50% 48%","Life out back.","Eight project albums. Real backyards, real work.",link("Project albums","#project-albums",true),"Southfork Ranch, Parker",portfolio),
  "financing.html":art("/assets/dfw/six-flags.webp","Black-and-white photograph of the original Six Flags Over Texas entrance","50% 53%","Here’s to the next good summer.","A great backyard starts with a plan that works for your family.",link("Explore financing","#financing-options",true),"Original Six Flags Over Texas entrance",finance),
  "contact.html":art(dallas,dallasAlt,"55% center","Give your boys at Collins a call.","Aubrey, Texas · North DFW. Tell us what you’ve got in mind.",link("469-500-7713","tel:+14695007713")+sms+link("info@collinscustompools.com","mailto:info@collinscustompools.com"),"Dallas skyline · Design inspiration")
 };
 function replacePage(file,body){
  let html=pages.get(file);
  if(!html||!html.includes('<main id="main">')||!/<body(?:\s[^>]*)?>/.test(html))throw Error("Missing page structure: "+file);
  html=html.replace(/<body(?:\s[^>]*)?>/,'<body class="tx-postcard">').replace(/<main id="main">[\s\S]*?<\/main>/,()=>`<main id="main">${body}</main>`).replace(/<footer class="site-footer">[\s\S]*?<\/footer>/,"").replace("</head>",`<style>${css}</style>\n</head>`).replace("</body>",`${script}\n</body>`);
  pages.set(file,html);
 }
 for(const [file,body] of Object.entries(definitions))replacePage(file,body);
 for(const [file,html] of [...pages]){
  if(!file.startsWith("albums/")||!file.endsWith(".html"))continue;
  const title=html.match(/<header class="album-intro">\s*<div><h1>([\s\S]*?)<\/h1>/)?.[1];
  const photos=[...html.matchAll(/<a class="photo-open"[^>]*>[\s\S]*?<\/a>/g)].map(m=>m[0]);
  if(!title||!photos.length)throw Error("Invalid album "+file);
  const first=photos[0],src=first.match(/<img src="([^"]+)"/)?.[1],alt=first.match(/<img[^>]*alt="([^"]*)"/)?.[1];
  if(!src||alt===undefined)throw Error("Missing cover "+file);
  const strip=p=>p.replace(/<img[^>]*>/,"");
  const coverLink=strip(first).replace('class="photo-open"','class="photo-open postcard-action"').replace("</a>","View photographs →</a>");
  const hidden=`<div hidden style="display:none">${photos.slice(1).map(p=>strip(p).replace("</a>","Photograph</a>")).join("")}</div>`;
  const nojs=`<noscript><section class="shell" style="color:var(--cream);padding:1rem"><details><summary>All photographs</summary>${photos.map((p,i)=>strip(p).replace("</a>",`Photo ${i+1}</a>`)).join(" ")}</details></section></noscript>`;
  const decode=s=>s.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");
  replacePage(file,art(src,decode(alt),"50% 50%",decode(title),"",link("All projects","/work")+coverLink,"",hidden+nojs));
 }
}
