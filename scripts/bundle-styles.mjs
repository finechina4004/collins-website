import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../public/',import.meta.url);
const files=JSON.parse(readFileSync(new URL('./style-sources.json',import.meta.url),'utf8'));
const css=files.map(name=>'/* Collins source: '+name+' */\n'+readFileSync(new URL(name,root),'utf8').trim()+'\n').join('\n');
const output=new URL('site.css',root);
if(process.argv.includes('--check')){if(!existsSync(output)||readFileSync(output,'utf8')!==css)throw Error('Styles are stale. Run npm run build:assets.');}
else writeFileSync(output,css);
console.log('Style bundle: '+createHash('sha256').update(css).digest('hex').slice(0,12));
