/* Minimal Texas gallery. One screen at a time; accessible links; original photographs. */
export function applyGalleryEdition(pages){
 const e=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const decode=s=>s.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");
 const link=(label,href)=>`<a href="${e(href)}">${e(label)}</a>`;
 const actions=(...links)=>links.length?`<div class="gallery-actions">${links.join("")}</div>`:"";
 const back=(href="#main",label="Back")=>`<a class="gallery-back" href="${e(href)}">← ${e(label)}</a>`;
 const d="/assets/dfw/";
 const artworks={
  dallas:{src:"/assets/dallas-pool.webp",alt:"Backyard pool design inspiration with the Dallas skyline",credit:"Dallas skyline · Design inspiration",pos:"55% center",mobile:"59% center",grade:"saturate(.84) contrast(.94) sepia(.09)"},
  pegasus:{src:d+"pegasus.webp",alt:"Magnolia Pegasus at sunset in Dallas",credit:"Magnolia Pegasus · Dallas",pos:"50% 30%",mobile:"43% 28%",grade:"saturate(.65) contrast(.92) brightness(1.06) sepia(.10)"},
  stadium:{src:d+"arlington-stadium.webp",alt:"Historic aerial photograph of Arlington Stadium",credit:"Arlington Stadium",pos:"50% 48%",mobile:"51% center",grade:"saturate(.85) contrast(.94) sepia(.12)"},
  pool:{src:d+"texas-pool.webp",alt:"Early aerial photograph of the Texas-shaped pool in Plano",credit:"The Texas Pool · Plano",pos:"50% 48%",mobile:"48% center",grade:"saturate(.92) contrast(.94) brightness(1.12) sepia(.04)"},
  tex:{src:d+"big-tex.webp",alt:"Vintage Big Tex at the State Fair of Texas",credit:"Big Tex · State Fair of Texas",pos:"50% 25%",mobile:"49% 30%",grade:"saturate(.96) contrast(.98) sepia(.04)"},
  southfork:{src:d+"southfork.webp",alt:"Vintage postcard of the Southfork Ranch entrance in Parker",credit:"Southfork Ranch · Parker",pos:"50% 49%",mobile:"61% center",grade:"saturate(.74) contrast(.90) brightness(1.05) sepia(.10)"},
  sixflags:{src:d+"six-flags.webp",alt:"Original Six Flags Over Texas entrance in black and white",credit:"Six Flags Over Texas",pos:"50% 58%",mobile:"62% 54%",grade:"grayscale(1) sepia(.13) contrast(.94)"},
  contact:{src:"/assets/projects/strictly-striped-affair/d12025f874e49421.webp",alt:"Pool and striped loungers in the Collins project collection",credit:"A Strictly Striped Affair",pos:"50% center",mobile:"50% center",grade:"none"}
 };
 const project=(src,alt)=>({src,alt,credit:"",pos:"50% center",mobile:"50% center",grade:"none"});
 const frame=(art,title,sub,links,{id="",detail=false,extra="",credit=art.credit,backLink=""}={})=>`<section${id?` id="${e(id)}" tabindex="-1"`:""} class="gallery-frame ${detail?"gallery-detail":"gallery-home"}" style="--position:${art.pos};--mobile-position:${art.mobile};--grade:${art.grade}"><img class="wallpaper" src="${e(art.src)}" alt="${e(art.alt)}" ${detail?'loading="lazy"':'fetchpriority="high"'} decoding="async"><div class="gallery-copy"><div>${backLink?back(backLink):""}<h1>${e(title)}</h1>${sub?`<p>${e(sub)}</p>`:""}${extra}${actions(...links)}</div>${credit?`<p class="gallery-caption">${e(credit)}</p>`:""}</div></section>`;
 const work=pages.get("work.html");
 const cards=[...work.matchAll(/<a href="(\/albums\/[^"]+)"[^>]*data-album-slug="[^"]+"[^>]*>([\s\S]*?)<\/a>/g)].map(m=>{
  const src=m[2].match(/<img src="([^"]+)"/)?.[1],alt=m[2].match(/<img[^>]*alt="([^"]*)"/)?.[1],name=m[2].match(/<h3>([\s\S]*?)<\/h3>/)?.[1];
  if(!src||alt===undefined||!name)throw Error("Invalid album cover "+m[1]);
  return {url:m[1],src,alt,name};
 });
 if(cards.length!==8)throw Error("Expected all eight album covers");
 const index=`<section class="gallery-frame gallery-detail album-index" id="albums" tabindex="-1"><div class="album-index-inner"><div class="album-index-header"><h1>Our work.</h1>${back()}</div><div class="album-index-grid">${cards.map(c=>`<a href="${c.url}"><img src="${c.src}" alt="${c.alt}" loading="lazy" decoding="async"><span>${c.name}</span></a>`).join("")}</div></div></section>`;
 const service=(id,src,alt,title,sub,url)=>frame(project(src,alt),title,sub,[link("View project",url),link("Contact","/contact")],{id,detail:true,backLink:"#main"});
 const steps=`<ol class="gallery-process"><li><strong>Meet.</strong><p>Walk the yard.</p></li><li><strong>Design.</strong><p>Scope, price and permits.</p></li><li><strong>Build.</strong><p>Excavation through finishes.</p></li><li><strong>Swim.</strong><p>Startup and walkthrough.</p></li></ol>`;
 const home=pages.get("index.html");
 const legacy=home.match(/<script>\(\(\)=>\{const m=\{[\s\S]*?<\/script>/)?.[0]?.replace("'#project':'#contact'","'#project':'/contact'").replace("'#work':'/work'","'#work':'/work'")||"";
 const definitions={
  "index.html":frame(artworks.dallas,"For the place we call home.","Custom pools & complete backyards. North DFW.",[link("Our work","/work#albums"),link("Start a project","/contact")],{id:"backyard"})+legacy,
  "about.html":frame(artworks.pegasus,"Texas raised.","Family-owned in Aubrey. Decades of pool-building experience.",[link("Meet us","/contact"),link("Our work","/work#albums")]),
  "services.html":frame(artworks.stadium,"Room for more.","",[link("Custom pools","#custom-pools"),link("Complete backyards","#complete-backyards"),link("Spas & remodels","#spas-and-remodels")])+
  service("custom-pools","/assets/projects/black-tie-barefoot/02.webp","Pool and covered porch overlooking woodland","Custom pools.","Designed for your home and the way you live.","/albums/black-tie-barefoot")+
  service("complete-backyards","/assets/projects/the-sun-stayed-for-supper/7015ed67131d404e.webp","Outdoor kitchen and pergola","Complete backyards.","Patios, kitchens, pergolas, turf, fire features, saunas and courts.","/albums/the-sun-stayed-for-supper")+
  service("spas-and-remodels","/assets/projects/mr-bears-residence/e5050074673f3ad9.webp","Pool and pavilion at dusk","Spas & remodels.","A new finish, an added spa or a whole new look.","/albums/mr-bears-residence"),
  "pool-design.html":frame(artworks.pool,"Imagine.","Your backyard, designed around you.",[link("Start designing","/contact"),link("Find inspiration","/work#albums")]),
  "process.html":frame(artworks.tex,"Good honest work.","",[link("Our process","#chapter-content")])+frame(artworks.tex,"From dirt to water.","",[link("Start a project","/contact")],{id:"chapter-content",detail:true,extra:steps,backLink:"#main",credit:""}),
  "work.html":frame(artworks.southfork,"Life out back.","",[link("Explore projects","#albums")])+index,
  "financing.html":frame(artworks.sixflags,"Summer awaits.","Let's talk budget. Financing provider not yet announced.",[link("Contact us","/contact")]),
  "contact.html":frame(artworks.contact,"Howdy.","Aubrey, Texas · North DFW",[link("469-500-7713","tel:+14695007713"),link("Text us","sms:+14695007713"),link("info@collinscustompools.com","mailto:info@collinscustompools.com")])
 };
 function page(file,body){
  let html=pages.get(file);
  if(!html||!html.includes('<main id="main">'))throw Error("Missing main "+file);
  html=html.replace(/<body(?:\s[^>]*)?>/,'<body class="collins-gallery">').replace(/<main id="main">[\s\S]*?<\/main>/,()=>`<main id="main">${body}</main>`).replace(/<footer class="site-footer">[\s\S]*?<\/footer>/,"").replace(/<dialog class="photo-viewer"[\s\S]*?<\/dialog>/,"").replace(/<script src="\/gallery\.js[^"]*"[^>]*><\/script>/,"").replace("</head>",'  <link rel="stylesheet" href="/texas-gallery.css?v=1">\n</head>');
  pages.set(file,html);
 }
 for(const [file,body] of Object.entries(definitions))page(file,body);
 for(const [file,html] of [...pages]){
  if(!file.startsWith("albums/")||!file.endsWith(".html"))continue;
  const title=html.match(/<header class="album-intro">\s*<div><h1>([\s\S]*?)<\/h1>/)?.[1];
  const photos=[...html.matchAll(/<a class="photo-open"[^>]*>[\s\S]*?<\/a>/g)].map(m=>{
   const t=m[0];return {id:t.match(/data-photo="(\d+)"/)?.[1],src:t.match(/<img src="([^"]+)"/)?.[1],alt:t.match(/<img[^>]*alt="([^"]*)"/)?.[1],caption:t.match(/data-caption="([^"]*)"/)?.[1]};
  });
  if(!title||!photos.length||photos.some(p=>!p.id||!p.src||p.alt===undefined||p.caption===undefined))throw Error("Invalid album "+file);
  page(file,photos.map((p,i)=>`<section class="album-photo${i===0?" album-first":""}" id="photo-${p.id}" tabindex="-1" aria-label="${e(decode(title))}, photograph ${i+1} of ${photos.length}"><div class="album-picture"><img src="${p.src}" alt="${p.alt}" ${i===0?'fetchpriority="high"':'loading="lazy"'} decoding="async"></div><div class="gallery-controls"><div><h1>${title}</h1><p class="photo-description">${p.caption}</p></div><div class="album-navigation">${back("/work#albums","All projects")}<a href="#photo-${photos[(i+photos.length-1)%photos.length].id}" aria-label="Previous photograph">← Prev</a><span>${i+1} / ${photos.length}</span><a href="#photo-${photos[(i+1)%photos.length].id}" aria-label="Next photograph">Next →</a></div></div></section>`).join(""));
 }
}
