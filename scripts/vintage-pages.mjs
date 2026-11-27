// Apply after the existing renderer has assembled its pages, before it writes or checks output.
import { existsSync } from 'node:fs';
const links = [['ABOUT','/about'],['SERVICES','/services'],['POOL DESIGN','/pool-design'],['PROCESS','/process'],['PORTFOLIO','/portfolio'],['AREAS WE SERVE','/areas-we-serve']];
const images = [ ['big-tex','Big Tex at the State Fair of Texas'], ['stockyards','Longhorn cattle drive at the Fort Worth Stockyards'], ['stadium','AT&T Stadium at sunset'], ['bridge','Margaret Hunt Hill Bridge and the Dallas skyline'], ['reunion','Historic postcard of Reunion Tower'], ['six-flags','Vintage Six Flags Over Texas grounds'] ];
const origin='https://collinscustompools.com';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const css='<link rel="stylesheet" href="/vintage.css">';
const mast=(active,overlay=false)=>`<header class="collins-mast${overlay?' collins-overlay':''}"><a class="collins-brand" href="/" aria-label="Collins home"><img src="/assets/collins-wordmark.svg" alt="Collins Custom Pools &amp; Backyards" width="560" height="150"></a><nav class="collins-desktop" aria-label="Main navigation">${links.map(([name,url])=>`<a href="${url}"${active===url?' aria-current="page"':''}>${name}</a>`).join('')}<a class="collins-number" href="tel:+14695007713">469-500-7713</a><a class="collins-talk" href="/contact">Let's Talk</a></nav><details class="collins-mobile"><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation">${links.map(([name,url])=>`<a href="${url}"${active===url?' aria-current="page"':''}>${name}</a>`).join('')}<a href="tel:+14695007713">469-500-7713</a><a class="collins-talk" href="/contact">Let's Talk</a></nav></details></header>`;
const wallpaper=(name,i)=>`<section class="collins-wallpaper wall-${images[i][0]}" aria-labelledby="page-title"><img src="/assets/dfw/${images[i][0]}.webp" alt="${esc(images[i][1])}" fetchpriority="high" decoding="async"><div class="collins-caption"><h1 id="page-title">${esc(name)}</h1></div></section>`;
const bodyOf=html=>html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1]||'';
const softenHeading=s=>s.replace(/<h1([\s>])/g,'<h2$1').replace(/<\/h1>/g,'</h2>');
function head(name,path){return `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#203326"><title>${esc(name)} | Collins Custom Pools &amp; Backyards</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="${origin}${path}"><link rel="icon" href="/assets/collins-favicon.svg"><link rel="stylesheet" href="/site.css">${css}</head>`;}
export function applyVintage(pages, {requireAssets=true}={}) {
  if(requireAssets) for(const [file] of images) if(!existsSync(new URL(`../public/assets/dfw/${file}.webp`,import.meta.url))) throw Error(`Missing reviewed wallpaper: ${file}.webp. Do not deploy.`);
  const prior=new Map(pages);
  const oldHeader=/<header class="site-header">[\s\S]*?<\/header>/;
  for(const [file,html] of prior) if(file.endsWith('.html') && file!=='index.html' && oldHeader.test(html)){
    let path='/'+file.replace(/\.html$/,'');
    if(path==='/work'||path.startsWith('/albums/'))path='/portfolio';
    let next=html.replace('</head>',`${css}</head>`).replace(oldHeader,mast(path));
    if(file==='contact.html') next=next.replace('<div class="actions">','<p><a href="mailto:info@collinscustompools.com">info@collinscustompools.com</a></p><div class="actions">');
    pages.set(file,next);
  }
  const home=prior.get('index.html');
  pages.set('index.html',home.replace('</head>',`${css}</head>`).replace('<body>','<body class="collins-home">'+mast('/',true)));
  for(let i=0;i<links.length;i++){
    const [name,path]=links[i];
    const file=path.slice(1)+'.html';
    const source=path==='/portfolio'?prior.get('work.html'):prior.get(file);
    const body=source?softenHeading(bodyOf(source)):'';
    const footer=source?.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0]||'';
    const existingHead=source?.match(/^[\s\S]*?<\/head>/)?.[0];
    const pageHead=existingHead?existingHead.replaceAll(`${origin}/work`,`${origin}/portfolio`).replace('</head>',`${css}</head>`):head(name,path);
    pages.set(file,`${pageHead}<body class="collins-interior">${mast(path,true)}<main id="main">${wallpaper(name,i)}${body?`<div class="collins-existing">${body}</div>`:''}</main>${footer}</body></html>\n`);
  }
  const sitemap=pages.get('sitemap.xml');
  if(sitemap)pages.set('sitemap.xml',sitemap.replace('</urlset>',links.filter(([,p])=>!sitemap.includes(`${origin}${p}</loc>`)).map(([,p])=>`  <url><loc>${origin}${p}</loc>\n`).join('')+'</urlset>'));
  return pages;
}
