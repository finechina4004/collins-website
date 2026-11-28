/* Restraint pass: preserve the original photograph composition; navigate between full-screen views. */
export function applyRestraint(pages,original){
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const css=`
body.tx-gallery-wall{display:flex;flex-direction:column;min-height:100vh;min-height:100svh;margin:0;background:var(--ink)}
.tx-gallery-wall>.site-header{flex:none}
.tx-gallery-wall>#main{display:flex;flex-direction:column;flex:1;min-height:0}
.tx-gallery-wall .tx-vintage,.tx-gallery-wall .tx-cover{flex:1;min-height:0}
.tx-gallery-wall .tx-vintage-copy{grid-template-columns:minmax(0,1fr) minmax(0,15rem)}
.tx-gallery-wall .tx-vintage-copy>div{min-width:0}
.tx-gallery-wall .tx-vintage .tx-kicker{display:none}
.tx-gallery-wall .tx-vintage-caption{font-size:.7rem}
.tx-gallery-wall .tx-vintage-caption span{font-size:.65rem}
.tx-gallery-wall .tx-vintage-link{margin-top:0;min-height:44px;padding:.2rem 0;gap:.3rem;text-decoration:underline;text-underline-offset:.35em}
.tx-gallery-wall .tx-wall-links{display:flex;flex-wrap:wrap;align-items:center;gap:0 1.8rem;margin-top:.9rem}
.tx-gallery-wall .tx-wall-links a{font-family:var(--sans);font-weight:400}
.tx-gallery-wall .tx-wall-detail{display:none}
.tx-gallery-wall .tx-wall-detail:target{display:grid}
.tx-gallery-wall #main:has(>.tx-wall-detail:target)>.tx-wall-hero{display:none}
.tx-gallery-wall .tx-wall-detail .tx-vintage-copy{grid-template-columns:minmax(0,1fr)}
.tx-gallery-wall .tx-wall-detail h1{font-size:clamp(2.3rem,5.4vw,5.5rem)}
.tx-gallery-wall .tx-wall-detail .tx-sub{max-width:53ch}
.tx-gallery-wall .tx-wall-detail .tx-vintage-photo{object-position:center}
.tx-gallery-wall .tx-wall-detail:after{background:linear-gradient(0deg,#10251df5,#10251d90 38%,#10251d20 76%,transparent)}
.tx-gallery-wall .tx-wall-albums{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));max-width:42rem;column-gap:1.6rem;margin-top:.6rem}
.tx-gallery-wall .tx-wall-albums a{min-height:44px;padding:.35rem 0;display:flex;align-items:center;color:inherit;text-decoration:underline;text-underline-offset:.3em}
.tx-gallery-wall a:focus-visible{outline:2px solid currentColor;outline-offset:4px}
@media(min-width:701px) and (min-height:530px){body.tx-gallery-wall{height:100vh;height:100svh}.tx-gallery-wall .tx-vintage-copy,.tx-gallery-wall .tx-cover-inner{max-height:100%;overflow:auto}}
@media(max-width:700px){
 .tx-gallery-wall #main{min-height:calc(100svh - 4.5rem)}
 .tx-gallery-wall .tx-vintage{display:grid;align-items:end;position:relative;isolation:isolate;overflow:hidden}
 .tx-gallery-wall .tx-vintage-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
 .tx-gallery-wall .tx-vintage::after{display:block;background:linear-gradient(0deg,#10251df5,#10251d90 37%,transparent 82%)}
 .tx-gallery-wall .tx-vintage-copy{display:block;padding-block:1.5rem 2rem}
 .tx-gallery-wall .tx-vintage-caption{border:0;margin-top:.5rem;padding:0}
 .tx-gallery-wall .tx-vintage h1{font-size:clamp(2.5rem,9.5vw,4rem)}
 .tx-gallery-wall .tx-wall-links{gap:0 1.1rem}
 .tx-gallery-wall .tx-wall-detail{display:none}
 .tx-gallery-wall .tx-wall-detail:target{display:grid}
 .tx-gallery-wall .tx-wall-albums{grid-template-columns:1fr 1fr;gap:0 1rem;font-size:.88rem}
}
@media(max-height:529px) and (min-width:701px){.tx-gallery-wall #main{min-height:22rem}.tx-gallery-wall .tx-vintage-copy,.tx-gallery-wall .tx-cover-inner{padding-block:1.3rem}.tx-gallery-wall .tx-vintage h1,.tx-gallery-wall .tx-cover h1{font-size:clamp(2.4rem,5.5vw,4rem)}}
@media(prefers-reduced-motion:reduce){.tx-gallery-wall *{scroll-behavior:auto!important}}
`;
 const a=(label,href)=>`<a class="tx-vintage-link" href="${escape(href)}">${escape(label)} <span aria-hidden="true">→</span></a>`;
 const actions=(...items)=>`<div class="tx-wall-links">${items.join("")}</div>`;
 const pic=(filename)=>"/assets/dfw/"+filename+".webp";
 const detail=(id,img,alt,title,sub,links,more="")=>`<section class="tx-vintage tx-wall-detail" id="${escape(id)}" tabindex="-1"><img class="tx-vintage-photo" src="${escape(img)}" alt="${escape(alt)}" loading="lazy" decoding="async"><div class="shell tx-vintage-copy"><div><h1>${escape(title)}</h1>${sub?`<p class="tx-sub">${escape(sub)}</p>`:""}${more}${actions(a("← Back","#main"),...links)}</div></div></section>`;
 const work=original.get("work.html");
 const albums=[...work.matchAll(/<a href="(\/albums\/[^"]+)"[^>]*data-album-slug="[^"]+"[^>]*>[\s\S]*?<h3>([\s\S]*?)<\/h3>/g)];
 if(albums.length!==8)throw Error("Missing albums");
 const albumLinks=`<div class="tx-wall-albums">${albums.map(m=>`<a href="${m[1]}">${m[2]} →</a>`).join("")}</div>`;
 const dallas="/assets/dallas-pool.webp", dallasAlt="Backyard pool design inspiration with the Dallas skyline";
 const defs={
  "about.html":{links:actions(a("Our story","#chapter-content")),detail:detail("chapter-content",pic("pegasus"),"Magnolia Pegasus, Dallas","Our story","Family-owned in Aubrey, Texas. We’ll help you design your backyard. Our family brings decades of pool-building experience to the work.",[a("Meet us","/contact")])},
  "services.html":{links:actions(a("Custom pools","#custom-pools"),a("Complete backyards","#complete-backyards"),a("Spas & remodels","#spas-and-remodels")),detail:
   detail("custom-pools","/assets/projects/black-tie-barefoot/02.webp","Collins pool overlooking the woods","Custom pools.","Built around your home and how you want to spend your summers.",[a("View project","/albums/black-tie-barefoot"),a("Let’s talk","/contact")])+
   detail("complete-backyards","/assets/projects/the-sun-stayed-for-supper/7015ed67131d404e.webp","Collins outdoor dining and pergola","Complete backyards.","Patios, outdoor kitchens, pergolas, turf, fire features, saunas and backyard courts.",[a("View project","/albums/the-sun-stayed-for-supper"),a("Let’s talk","/contact")])+
   detail("spas-and-remodels","/assets/projects/mr-bears-residence/e5050074673f3ad9.webp","Collins pool and pavilion at dusk","Spas & remodels.","Update your pool, add a spa or reimagine the whole backyard.",[a("View project","/albums/mr-bears-residence"),a("Let’s talk","/contact")])},
  "pool-design.html":{links:actions(a("Start designing","/contact")),detail:""},
  "process.html":{links:actions(a("How we build","#chapter-content")),detail:detail("chapter-content",pic("big-tex"),"Vintage Big Tex","How we build.","Walk the yard. Design and price. Coordinate permits. Build the pool. Start it up and enjoy it.",[a("Start a conversation","/contact")])},
  "work.html":{links:actions(a("Project albums","#chapter-content")),detail:detail("chapter-content",pic("southfork"),"Southfork Ranch entrance","The project collection.","",[],albumLinks)},
  "financing.html":{links:actions(a("Talk through the numbers","#chapter-content")),detail:detail("chapter-content",pic("six-flags"),"Original Six Flags Over Texas entrance","Let’s talk numbers.","We can discuss your budget and independent financing options. No lender or rates have been announced; approval and terms are determined by the lender.",[a("Contact Collins","/contact")])}
 };
 function replacePage(file,body){
  let html=original.get(file);
  if(!html||!/<body(?:\s[^>]*)?>/.test(html)||!html.includes('<main id="main">'))throw Error("Missing layout "+file);
  html=html.replace(/<body(?:\s[^>]*)?>/,'<body class="tx-gallery-wall">').replace(/<main id="main">[\s\S]*?<\/main>/,()=>`<main id="main">${body}</main>`).replace(/<footer class="site-footer">[\s\S]*?<\/footer>/,"").replace("</head>",`<style>${css}</style>\n</head>`);
  pages.set(file,html);
 }
 for(const [file,def] of Object.entries(defs)){
  const hero=original.get(file).match(/<header class="tx-vintage"[\s\S]*?<\/header>/)?.[0];
  if(!hero)throw Error("Missing original artwork "+file);
  const trimmed=hero.replace('class="tx-vintage"','class="tx-vintage tx-wall-hero"').replace(/<p class="tx-kicker">[\s\S]*?<\/p>/,"").replace(/<a class="tx-vintage-link"[\s\S]*?<\/a>/,()=>def.links);
  replacePage(file,trimmed+def.detail);
 }
 const home=original.get("index.html");
 const cover=home.match(/<section class="tx-cover"[\s\S]*?<\/section>/)?.[0];
 if(!cover)throw Error("Missing original home cover");
 const oldScript=home.match(/<script>\(\(\)=>\{const m=\{[\s\S]*?<\/script>/)?.[0]||"";
 const legacy=oldScript.replace("'#project':'#contact'","'#project':'/contact'");
 replacePage("index.html",cover.replace('class="tx-cover"','class="tx-cover tx-wall-hero"')+legacy);
 const contactHero=`<header class="tx-vintage tx-wall-hero" style="--vintage-position:55% center"><img class="tx-vintage-photo" src="${dallas}" alt="${dallasAlt}" fetchpriority="high" decoding="async"><div class="shell tx-vintage-copy"><div><h1>Give your boys at Collins a call.</h1><p class="tx-sub">Family-owned in Aubrey, Texas. Serving North DFW.</p>${actions(a("469-500-7713","tel:+14695007713"),a("Text us","sms:+14695007713"),a("Email us","mailto:info@collinscustompools.com"))}</div><p class="tx-vintage-caption">Dallas skyline · Design inspiration</p></div></header>`;
 replacePage("contact.html",contactHero);
}
