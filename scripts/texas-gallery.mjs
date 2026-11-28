/* Minimal Texas gallery. One screen at a time; accessible links; original photographs. */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const galleryStyles = readFileSync(new URL('../public/texas-gallery.css', import.meta.url));
const galleryVersion = createHash('sha256').update(galleryStyles).digest('hex').slice(0, 12);
const contactStyles = readFileSync(new URL('../public/texas-contact.css', import.meta.url));
const contactVersion = createHash('sha256').update(contactStyles).digest('hex').slice(0, 12);
const wallpaperStyles = readFileSync(new URL('../public/dfw-wallpapers.css', import.meta.url));
const wallpaperVersion = createHash('sha256').update(wallpaperStyles).digest('hex').slice(0, 12);

export function applyGalleryEdition(pages){
 const e=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const decode=s=>s.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");
 const link=(label,href)=>`<a href="${e(href)}">${e(label)}</a>`;
 const actions=(...links)=>links.length?`<div class="gallery-actions">${links.join("")}</div>`:"";
 const back=(href="#main",label="Back")=>`<a class="gallery-back" href="${e(href)}">← ${e(label)}</a>`;
 const d="/assets/dfw/";
 const artworks={
  dallas:{src:"/assets/collins-home-sunset.png",alt:"Backyard pool design inspiration with the Dallas skyline",credit:"Dallas skyline · Design inspiration",pos:"58% center",mobile:"64% center",grade:"none"},
  pegasus:{src:d+"magnolia-pegasus-dallas-at-night.webp",alt:"The illuminated Magnolia Pegasus above the Dallas skyline in a black-and-white photograph",credit:"Magnolia Pegasus · Dallas",pos:"51% top",mobile:"51% top",grade:"none",layout:"dfw-wallpaper pegasus"},
  stadium:{src:d+"arlington-stadium-1977.webp",alt:"A packed Arlington Stadium during a 1977 Texas Rangers game against the Chicago White Sox",credit:"Arlington Stadium · 1977",pos:"50% 39%",mobile:"center",grade:"none",layout:"portrait-print"},
  pool:{src:d+"texas-pool-overhead.webp",alt:"Overhead photograph of the Texas-shaped swimming pool in Plano",credit:"The Texas Pool · Plano",pos:"center",mobile:"center",grade:"none",layout:"dfw-wallpaper texas-pool"},
  tex:{src:d+"big-tex.webp",mobileSrc:d+"big-tex-approved-mobile.webp",alt:"Vintage Big Tex at the State Fair of Texas",credit:"Big Tex · State Fair of Texas",pos:"50% 25%",mobile:"center",grade:"none",layout:"portrait-print"},
  southfork:{src:d+"southfork-ranch-postcard.webp",alt:"Vintage color postcard showing the Southfork Ranch entrance and house in Parker",credit:"Southfork Ranch · Parker",pos:"53% 58%",mobile:"53% 54%",grade:"none",layout:"dfw-wallpaper southfork"},
  sixflags:{src:d+"six-flags-desktop.svg",mobileSrc:d+"six-flags-mobile.svg",alt:"Original Six Flags Over Texas entrance in black and white",credit:"Six Flags Over Texas",pos:"50% 50%",mobile:"50% 50%",grade:"none"},
  // Denton Chamber of Commerce Collection: https://texashistory.unt.edu/ark:/67531/metadc1996991/
  contact:{src:d+"campus-theatre-collins.webp",alt:"Denton's Campus Theatre at dusk with its vertical green neon sign edited to read Collins",credit:"Campus Theatre · Denton, Texas",pos:"30% 75%",mobile:"38% 65%",grade:"none",layout:"campus-contact"}
 };
 const project=(src,alt)=>({src,alt,credit:"",pos:"50% center",mobile:"50% center",grade:"none"});
 const picture = (art, detail) => {
  const image = `<img src="${e(art.src)}" alt="${e(art.alt)}" ${detail ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`;
  const mobile = art.mobileSrc ? `<source media="(orientation: portrait)" srcset="${e(art.mobileSrc)}">` : "";
  const wide = art.wideSrc ? `<source media="(min-aspect-ratio: 3/2)" srcset="${e(art.wideSrc)}">` : "";
  return `<picture class="wallpaper">${mobile}${wide}${image}</picture>`;
 };
 const frame = (art, title, sub, links, {id="", detail=false, extra="", credit=art.credit, backLink=""} = {}) =>
  `<section${id ? ` id="${e(id)}" tabindex="-1"` : ""} class="gallery-frame ${detail ? "gallery-detail" : "gallery-home"}${art.layout ? " " + art.layout : ""}" style="--position:${art.pos};--mobile-position:${art.mobile};--grade:${art.grade}">${picture(art, detail)}<div class="gallery-copy"><div>${backLink ? back(backLink) : ""}<h1>${e(title)}</h1>${sub ? `<p>${e(sub)}</p>` : ""}${extra}${actions(...links)}</div>${credit ? `<p class="gallery-caption">${e(credit)}</p>` : ""}</div></section>`;
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
  "services.html":frame(artworks.stadium,"Home field. Every season.","",[link("Custom pools","#custom-pools"),link("Complete backyards","#complete-backyards"),link("Spas & remodels","#spas-and-remodels")])+
  service("custom-pools","/assets/projects/black-tie-barefoot/02.webp","Pool and covered porch overlooking woodland","Custom pools.","Designed for your home and the way you live.","/albums/black-tie-barefoot")+
  service("complete-backyards","/assets/projects/the-sun-stayed-for-supper/7015ed67131d404e.webp","Outdoor kitchen and pergola","Complete backyards.","Patios, kitchens, pergolas, turf, fire features, saunas and courts.","/albums/the-sun-stayed-for-supper")+
  service("spas-and-remodels","/assets/projects/mr-bears-residence/e5050074673f3ad9.webp","Pool and pavilion at dusk","Spas & remodels.","A new finish, an added spa or a whole new look.","/albums/mr-bears-residence"),
  "pool-design.html":frame(artworks.pool,"Imagine.","Your backyard, designed around you.",[link("Start designing","/contact"),link("Find inspiration","/work#albums")]),
  "process.html":frame(artworks.tex,"Good honest work.","",[link("Our process","#chapter-content")])+frame(artworks.tex,"From dirt to water.","",[link("Start a project","/contact")],{id:"chapter-content",detail:true,extra:steps,backLink:"#main",credit:""}),
  "work.html":frame(artworks.southfork,"Life out back.","",[link("Explore projects","#albums")])+index,
  "financing.html":frame(artworks.sixflags,"Summer awaits.","Let's talk budget. Financing provider not yet announced.",[link("Contact us","/contact")]),
  "contact.html":frame(artworks.contact,"Howdy.","Aubrey, Texas · Denton County",[link("469-500-7713","tel:+14695007713"),link("Text us","sms:+14695007713"),link("info@collinscustompools.com","mailto:info@collinscustompools.com")])
 };
 const wallpapers = {
  'about.html': artworks.pegasus,
  'pool-design.html': artworks.pool,
  'work.html': artworks.southfork,
 };
 function page(file,body){
  let html=pages.get(file);
  if(!html||!html.includes('<main id="main">'))throw Error("Missing main "+file);
  html=html.replace(/<body(?:\s[^>]*)?>/,'<body class="collins-gallery">').replace(/<main id="main">[\s\S]*?<\/main>/,()=>`<main id="main" tabindex="-1">${body}</main>`).replace(/<footer class="site-footer">[\s\S]*?<\/footer>/,"").replace(/<dialog class="photo-viewer"[\s\S]*?<\/dialog>/,"").replace(/<script src="\/gallery\.js[^"]*"[^>]*><\/script>/,"").replace("</head>",`  <link rel="stylesheet" href="/texas-gallery.css?v=${galleryVersion}">\n</head>`);
  if(file==='index.html')html=html.replace(/(<meta property="og:image" content=")[^"]+"/,'$1https://collinscustompools.com/assets/collins-home-sunset.png"').replace(/(<meta property="og:image:alt" content=")[^"]+"/,'$1Backyard pool design inspiration with the Dallas skyline at sunset"');
  const featuredPhoto = file === 'contact.html' ? artworks.contact : wallpapers[file];
  if (featuredPhoto) {
   html = html
    .replace(/(<meta property="og:image" content=")[^"]+"/, `$1https://collinscustompools.com${e(featuredPhoto.src)}"`)
    .replace(/(<meta property="og:image:alt" content=")[^"]+"/, `$1${e(featuredPhoto.alt)}"`);
   const stylesheet = file === 'contact.html'
    ? `/texas-contact.css?v=${contactVersion}`
    : `/dfw-wallpapers.css?v=${wallpaperVersion}`;
   html = html.replace('</head>', `  <link rel="stylesheet" href="${stylesheet}">\n</head>`);
  }
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
