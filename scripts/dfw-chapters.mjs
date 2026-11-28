import { existsSync } from 'node:fs';
export const chapters = [
  {
    "path": "about",
    "label": "About",
    "landmark": "Magnolia Pegasus",
    "place": "Dallas",
    "photo": "pegasus.webp",
    "pos": "50% 48%",
    "phonePos": "50% 45%",
    "source": "https://www.dallasnews.com/arts-entertainment/2015/06/29/top-10-dallas-landmarks-what-are-yours/",
    "headline": "Rooted right here.",
    "sub": "For the people who made North Texas what it is, and the ones making it what comes next.",
    "next": "services"
  },
  {
    "path": "services",
    "label": "Services",
    "landmark": "Arlington Stadium",
    "place": "Arlington",
    "photo": "arlington-stadium.webp",
    "pos": "50% 50%",
    "phonePos": "50% 50%",
    "source": "https://texashistory.unt.edu/ark:/67531/metadc1632302/",
    "headline": "Room for more.",
    "sub": "For long afternoons, good company and a little more time together.",
    "next": "pool-design"
  },
  {
    "path": "pool-design",
    "label": "Pool Design",
    "landmark": "The Texas Pool",
    "place": "Plano",
    "photo": "texas-pool.webp",
    "pos": "50% 50%",
    "phonePos": "50% 50%",
    "source": "https://texaspool.org/history/",
    "headline": "Make it yours.",
    "sub": "A good pool is more than water. It’s a place to make a life.",
    "next": "process"
  },
  {
    "path": "process",
    "label": "Process",
    "landmark": "Big Tex",
    "place": "Fair Park, Dallas",
    "photo": "big-tex.webp",
    "pos": "50% 43%",
    "phonePos": "48% 50%",
    "headline": "Good work takes good people.",
    "sub": "From the first walk through your yard to the first jump in.",
    "next": "portfolio"
  },
  {
    "path": "portfolio",
    "label": "Portfolio",
    "landmark": "Southfork Ranch",
    "place": "Parker",
    "photo": "southfork.webp",
    "pos": "50% 50%",
    "phonePos": "60% 50%",
    "source": "https://www.ebay.com/itm/336231351542",
    "headline": "Life out back.",
    "sub": "No two backyards are quite the same. That’s the good part.",
    "next": "areas-we-serve"
  },
  {
    "path": "areas-we-serve",
    "label": "Areas We Serve",
    "landmark": "Six Flags Over Texas",
    "place": "Arlington",
    "photo": "six-flags.webp",
    "pos": "50% 56%",
    "phonePos": "64% 56%",
    "headline": "Here’s to the next good summer.",
    "sub": "For the families who grew up here and the ones just getting here.",
    "next": "contact"
  }
];
const renderChapters = function applyDfwChapters(pages, available, chapters) {
 const brand="Collins Custom Pools & Backyards";
 const base="https://collinscustompools.com";
 const esc=s=>String(s).replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
 const paths=chapters.map(c=>[c.label,"/"+c.path]);
 const old=new Map(pages);
 const contact=old.get("contact.html");
 const intro=(title,body)=>`<section class="dfw-letter"><div><span class="dfw-small">Life out back</span><h2>${esc(title)}</h2></div><div class="dfw-prose">${body}</div></section>`;
 const nav=(path,overlay=false)=>{
   const items=paths.map(([label,href])=>`<a href="${href}"${path===href?' aria-current="page"':''}>${esc(label.toUpperCase())}</a>`).join("");
   const controls=`${items}<a class="dfw-number" href="tel:+14695007713">469-500-7713</a><a class="dfw-talk" href="/contact">Let’s Talk</a>`;
   return `<a class="dfw-skip" href="#main">Skip to content</a><header class="dfw-mast${overlay?' dfw-overlay':''}"><a class="dfw-brand" href="/" aria-label="Collins home"><img src="/assets/collins-wordmark.svg" width="560" height="150" alt="${esc(brand)}"></a><nav class="dfw-desktop" aria-label="Main navigation">${controls}</nav><details class="dfw-mobile"><summary>MENU <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation">${controls}</nav></details></header>`;
 };
 const footer=()=>`<footer class="dfw-footer"><div><a class="dfw-footer-brand" href="/">COLLINS</a><p>Custom Pools &amp; Backyards · Aubrey, Texas</p></div><div><a href="tel:+14695007713">469-500-7713</a><a href="mailto:info@collinscustompools.com">info@collinscustompools.com</a></div></footer>`;
 const next=(id)=>{
   const item=chapters.find(c=>c.path===id);const label=item?.label||"Let’s Talk";
   return `<section class="dfw-next"><div><span class="dfw-small">The next chapter</span><a href="/${id}">${esc(label)} <span aria-hidden="true">→</span></a></div>${id==='contact'?'':'<a class="dfw-talk" href="/contact">Let’s Talk</a>'}</section>`;
 };
 const cap=(c)=>`<figcaption class="dfw-caption"><span>North Texas · From the collection</span>${esc(c.landmark)} · ${esc(c.place)}</figcaption>`;
 const hero=(c,i)=>`<section class="dfw-hero" style="--position:${c.pos};--mobile-position:${c.phonePos}" aria-labelledby="chapter-title"><figure class="dfw-photograph">${available.includes(c.photo)?`<img src="/assets/dfw/${c.photo}" alt="${esc(c.landmark+', '+c.place)}" fetchpriority="high" decoding="async">`:`<div class="dfw-photo-pending"><span class="dfw-small">Private review · Original photo pending</span><p>${esc(c.landmark)}</p>${c.source?`<a href="${esc(c.source)}" rel="noopener noreferrer" target="_blank">View selected photograph source</a>`:''}</div>`}${cap(c)}</figure><div class="dfw-title"><span class="dfw-small">${String(i+1).padStart(2,"0")} / ${esc(c.label)}</span><h1 id="chapter-title">${esc(c.headline)}</h1><p>${esc(c.sub)}</p><a href="#chapter-content" class="dfw-scroll">Explore ${esc(c.label.toLowerCase())} ↓</a></div></section>`;
 const extract=html=>html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1]||"";
 const withoutBand=html=>html.replace(/<section class="contact-band" id="contact">[\s\S]*?<\/section>/,"");
 const services=withoutBand(extract(old.get("services.html")));
 const process=services.match(/<section class="build-strip">[\s\S]*?<\/section>/)?.[0]||"";
 const serviceBody=services.replace(process,"").replace(/<header class="page-intro">[\s\S]*?<\/header>/,"<header class=\"page-intro\"><h2>What we build.</h2></header>");
 const portfolio=withoutBand(extract(old.get("work.html"))).replace(/<header class="page-intro">[\s\S]*?<\/header>/,"<header class=\"page-intro\"><h2>Explore the project collection.</h2></header>").replace(/loading="eager"/g,'loading="lazy"').replace(/ fetchpriority="high"/g,"");
 const originalAbout=withoutBand(extract(old.get("about.html"))).replace(/<header class="page-intro">[\s\S]*?<\/header>/,"<header class=\"page-intro\"><span class=\"dfw-small\">Aubrey, Texas</span><h2>Meet the family behind Collins.</h2></header>");
 const bodies={
  about:intro("For the place we call home.","<p>North Texas is more than a skyline. It’s the people who built it, the people who have called it home for generations, and the people putting down roots today. We’re a family-owned business, and we’re grateful to build a small part of its next chapter.</p>")+originalAbout,
  services:intro("Make more of the place you live.","<p>From custom pools and spas to complete backyards, we bring the water and the spaces around it together. Somewhere to swim, eat, play and spend a little more time with your people.</p>")+serviceBody,
  "pool-design":intro("Start with how you want to live.","<p>Plano’s Texas Pool opened in 1961. It’s a reminder that good design can give a place a personality of its own.</p><p>We start with your yard, your ideas and the way you want to spend your time out back. From the pool layout and depth to the ledges, steps, shade and materials, we work through the choices together.</p><a class=\"dfw-inline\" href=\"/contact\">Talk through your ideas →</a>"),
  process:intro("From the first visit to the first swim.","<p>We believe in listening first, making a clear plan and doing the work right. We walk the yard with you, agree on design, scope and price, coordinate the permits and inspections your project requires, and build and start up your pool.</p>")+process,
  portfolio:intro("Places to make memories of your own.","<p>Here’s a look at the pool and backyard project photography in our collection. The historic photographs throughout this site are a tribute to North Texas, not projects we claim to have built.</p>")+portfolio,
  "areas-we-serve":intro("North Texas is home.","<p>Based in Aubrey, we work across Denton County and North DFW, including Denton, Little Elm, Prosper, Celina and Frisco. Tell us your town and what you have in mind.</p><p>To the people who have been here a lifetime and the ones who just unpacked their boxes: here’s to the next good summer.</p><a class=\"dfw-inline\" href=\"/contact\">Let’s talk about your backyard →</a>")
 };
 function head(c,desc) {
   const h=old.get("about.html").split("</head>")[0].replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(c.label)} | ${esc(brand)}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(desc)}">`).replace(/<link rel="canonical" href="[^"]*">/,`<link rel="canonical" href="${base}/${c.path}">`).replace(/<meta property="og:title" content="[^"]*">/,`<meta property="og:title" content="${esc(c.label+" | "+brand)}">`).replace(/<meta property="og:description" content="[^"]*">/,`<meta property="og:description" content="${esc(desc)}">`).replace(/<meta property="og:url" content="[^"]*">/,`<meta property="og:url" content="${base}/${c.path}">`).replace(/<meta name="robots" content="[^"]*">/,`<meta name="robots" content="${available.length===chapters.length?'index,follow':'noindex,follow'}">`);
   return h+`<link rel="stylesheet" href="/dfw-chapters.css">\n</head>`;
 }
 const wrap=(head,body)=>`${head}\n<body class="dfw-page">${body}\n</body>\n</html>\n`;
 for(const [i,c] of chapters.entries())pages.set(c.path+".html",wrap(head(c,c.sub),`${nav("/"+c.path,true)}<main id="main">${hero(c,i)}<div id="chapter-content">${bodies[c.path]}</div>${next(c.next)}</main>${footer()}`));
 // Keep the original home photo and brand. The same navigation and a quiet dedication are the only new elements.
 const h=old.get("index.html");
 pages.set("index.html",h.replace("</head>",'<link rel="stylesheet" href="/dfw-chapters.css">\n</head>').replace("<body>",'<body class="dfw-home">'+nav("/",true)).replace("<main>",'<main id="main">').replace('</h1>','</h1>\n    <div class="dfw-home-note"><p>For the place we call home.</p><a href="/about">Explore Collins →</a></div>'));
 // Existing deep links and gallery scripts remain intact; make their header and footer consistent with the chapter pages.
 for(const [file,html] of old) {
   if(!file.endsWith(".html")||file==="index.html"||["about.html","services.html"].includes(file))continue;
   if(!html.includes('<header class="site-header">'))continue;
   const path=file==="work.html"||file.startsWith("albums/")?"/portfolio":"/"+file.replace(/\.html$/,"");
   let out=html.replace("</head>",'<link rel="stylesheet" href="/dfw-chapters.css">\n</head>').replace("<body>",'<body class="dfw-page">').replace(/<a class="skip-link"[^>]*>[\s\S]*?<\/a>\s*<header class="site-header">[\s\S]*?<\/header>/,nav(path)).replace(/<footer class="site-footer">[\s\S]*?<\/footer>/,footer()).replaceAll('href="/work"','href="/portfolio"');
   if(file==="contact.html")out=out.replace('<div class="actions">','<p class="dfw-email"><a href="mailto:info@collinscustompools.com">info@collinscustompools.com</a></p><div class="actions">');
   if(file==="work.html")out=out.replace('<link rel="canonical" href="'+base+'/work">','<link rel="canonical" href="'+base+'/portfolio">').replace('<meta name="robots" content="index,follow">','<meta name="robots" content="noindex,follow">');
   pages.set(file,out);
 }
 // Chapter links must appear consistently, but an incomplete photo review must not add new public URLs to the sitemap.
 if(available.length===chapters.length){const sitemap=old.get("sitemap.xml");pages.set("sitemap.xml",sitemap.replace("</urlset>",chapters.filter(c=>!sitemap.includes(base+"/"+c.path+"</loc>")).map(c=>`  <url><loc>${base}/${c.path}</loc></url>\n`).join("")+"</urlset>"));}
};
export function applyDfwChapters(pages){const available=chapters.filter(c=>existsSync(new URL('../public/assets/dfw/'+c.photo,import.meta.url))).map(c=>c.photo);renderChapters(pages,available,chapters);}
