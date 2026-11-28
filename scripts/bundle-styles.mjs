import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../public/',import.meta.url);
const files=JSON.parse(readFileSync(new URL('./style-sources.json',import.meta.url),'utf8'));
const css=files.map(name=>`/* Collins source: ${name} */\n${readFileSync(new URL(name,root),'utf8').trim()}\n`).join('\n');
const hash=createHash('sha256').update(css).digest('hex').slice(0,12);
const bundleURL=new URL('site.css',root);
if(process.argv.includes('--check')){
 if(!existsSync(bundleURL)||readFileSync(bundleURL,'utf8')!==css){
  console.error('Styles are stale. Run npm run build:assets before previewing or deploying.');process.exit(1);
 }
 console.log(`Style bundle current: ${files.length} sources (${hash}).`);
}else{
 writeFileSync(bundleURL,css);
 console.log(`Bundled ${files.length} stylesheets into one request (${hash}).`);
}
