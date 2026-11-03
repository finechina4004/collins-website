import { cpSync, rmSync } from 'node:fs';
rmSync(new URL('../dist/', import.meta.url), {recursive: true, force: true});
cpSync(new URL('../public/', import.meta.url), new URL('../dist/', import.meta.url), {recursive: true});
console.log('Prepared static Site output from public/.');
