import { applyRestraint } from './texas-restraint.mjs';
import { applyPostcards } from './texas-postcards.mjs';
/* Original selected archive photographs. Keep paths and generated output synchronized. */
const assets = [
  [
    "about",
    "pegasus.webp",
    "",
    "Magnolia Pegasus at sunset, Dallas",
    "50% 18%",
    "About"
  ],
  [
    "services",
    "arlington-stadium.webp",
    "",
    "Historic aerial of Arlington Stadium",
    "50% 50%",
    "Services"
  ],
  [
    "pool-design",
    "texas-pool.webp",
    "",
    "Early aerial photograph of the Texas-shaped pool in Plano",
    "50% 50%",
    "Pool Design"
  ],
  [
    "process",
    "big-tex.webp",
    "",
    "Vintage Big Tex at the State Fair of Texas, Dallas",
    "50% 22%",
    "Process"
  ],
  [
    "work",
    "southfork.webp",
    "",
    "Vintage Southfork Ranch entrance postcard, Parker",
    "50% 48%",
    "Portfolio"
  ],
  [
    "financing",
    "six-flags.webp",
    "",
    "Black-and-white photograph of the original Six Flags Over Texas entrance",
    "50% 53%",
    "Financing"
  ]
];
export function applyVintageWallpaper(pages, collection = assets){
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const link='<link rel="stylesheet" href="/texas-wallpaper.css?v=1">';
 for(const [path,photo,sha,caption,pos,label] of collection){
  const file=path+".html";
  let html=pages.get(file);
  const re=/<main id="main">(\s*<div class="shell section(?: about-spread)?">\s*)(<header class="tx-chapter">[\s\S]*?<\/header>)/;
  const match=html.match(re);
  if(!match)throw new Error("Missing chapter template "+file);
  const old=match[2];
  const title=old.match(/<h1>[\s\S]*?<\/h1>/)?.[0];
  const kicker=old.match(/<p class="tx-kicker">[\s\S]*?<\/p>/)?.[0];
  const sub=old.match(/<p class="tx-sub">[\s\S]*?<\/p>/)?.[0];
  const note=old.match(/<p class="tx-homage">([\s\S]*?)<\/p>/)?.[1];
  if(!title||!kicker||!sub||!note)throw new Error("Invalid chapter copy "+file);
  const cta=path==="work"?"See the project collection":path==="financing"?"Talk through the numbers":"Explore "+label.toLowerCase();
  const hero=`<header class="tx-vintage" style="--vintage-position:${pos}"><img class="tx-vintage-photo" src="/assets/dfw/${photo}" alt="${esc(caption)}" fetchpriority="high" decoding="async"><div class="shell tx-vintage-copy"><div>${kicker}${title}${sub}<a class="tx-vintage-link" href="#chapter-content">${esc(cta)} ↓</a></div><p class="tx-vintage-caption"><span>A love letter to Texas</span>${esc(caption)}</p></div></header>`;
  const body=match[1].replace('class="shell section','id="chapter-content" class="shell section tx-vintage-body');
  html=html.replace(re,()=>`<main id="main">${hero}${body}<p class="tx-vintage-note">${note} Landmark photography is a tribute to Texas, not a Collins project.</p>`);
  if(path==="work")html=html.replace('loading="eager" decoding="async" fetchpriority="high"','loading="lazy" decoding="async"');
  html=html.replace("</head>",`  ${link}\n</head>`);
  pages.set(file,html);
 }
 let home=pages.get("index.html");
 for(const [path,photo,sha,caption,pos,label] of collection){
  const r=new RegExp('(<a href="/'+path+'">)(<span>[^<]*</span><strong>[^<]*</strong><small>[^<]*</small>)(</a>)');
  if(!r.test(home))throw new Error("Missing home chapter "+path);
  home=home.replace(r,(_,start,copy,end)=>`${start}<img class="tx-grid-photo" src="/assets/dfw/${photo}" alt="" loading="lazy" decoding="async" style="--vintage-position:${pos}"><div class="tx-grid-copy">${copy}</div>${end}`);
 }
 home=home.replace("</head>",`  ${link}\n</head>`);
 pages.set("index.html",home);
 const original=new Map(pages);
 applyPostcards(pages);
 applyRestraint(pages,original);
}
