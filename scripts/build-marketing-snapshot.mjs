import {mkdir,copyFile,writeFile} from 'node:fs/promises';
import {verifySnapshot} from './verify-marketing-snapshot.mjs';
const root=new URL('../',import.meta.url),base=new URL('production-snapshot/2026-10-07/espacios-marketing-site/',root),out=new URL('dist/marketing-snapshot/',root);
const proof=await verifySnapshot();
const manifest=JSON.parse(await(await import('node:fs/promises')).readFile(new URL('MODULE_MANIFEST.json',base),'utf8'));
for(const part of manifest.parts){const target=new URL(part.name,out);await mkdir(new URL('./',target),{recursive:true});await copyFile(new URL('modules/'+part.name,base),target);}
await writeFile(new URL('upload-metadata.json',out),JSON.stringify({main_module:'index.js'},null,2)+'\n');
console.log(JSON.stringify({...proof,action:'Verified exact module-copy build; original TSX compilation is unavailable.',productionUploadPerformed:false,configurationIncluded:false}));
