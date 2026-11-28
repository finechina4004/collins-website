import { existsSync } from 'node:fs';
import { chapters } from './dfw-chapters.mjs';
const missing=chapters.filter(c=>!existsSync(new URL('../public/assets/dfw/'+c.photo,import.meta.url)));
if(missing.length)throw Error('Do not deploy: original approved photographs missing: '+missing.map(c=>c.photo).join(', '));
