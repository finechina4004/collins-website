import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../public/',import.meta.url);
const files=JSON.parse(readFileSync(new URL('./style-sources.json',import.meta.url),'utf8'));
const css=files.map(name=>`/* Collins source: ${name} */\n${readFileSync(new URL(name,root),'utf8').trim()}\n`).join('\n');
const hash=createHash('sha256').update(css).digest('hex').slice(0,12);
const link=`<link href="site.css?v=${hash}" rel="stylesheet"/>`;
const indexURL=new URL('index.html',root),bundleURL=new URL('site.css',root),html=readFileSync(indexURL,'utf8');
const links=html.match(/<link\b[^>]*\brel="stylesheet"[^>]*\/?\s*>/g)||[];
if(process.argv.includes('--check')){
 if(!existsSync(bundleURL)||readFileSync(bundleURL,'utf8')!==css||links.length!==1||links[0]!==link){
  console.error('Styles are stale. Run npm run build:assets before previewing or deploying.');process.exit(1);
 }
 console.log(`Style bundle current: ${files.length} sources, one request (${hash}).`);
}else{
 if(!links.length)throw Error('No stylesheet link found in index.html.');
 let first=true;
 const next=html.replace(/<link\b[^>]*\brel="stylesheet"[^>]*\/?\s*>/g,()=>{if(first){first=false;return link;}return '';});
 writeFileSync(bundleURL,css);writeFileSync(indexURL,next);
 console.log(`Bundled ${files.length} stylesheets into one request (${hash}).`);
}
