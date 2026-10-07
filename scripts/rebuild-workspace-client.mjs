import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {transform} from 'esbuild';
import {verifySnapshot} from './verify-marketing-snapshot.mjs';

const root=new URL('../',import.meta.url),snapshot=new URL('production-snapshot/2026-10-07/espacios-marketing-site/',root),out=new URL('dist/workspace-client-rebuild/',root);
await verifySnapshot();
const read=path=>readFile(new URL('modules/'+path,snapshot),'utf8');
const hash=value=>createHash('sha256').update(value).digest('hex');
const imports={
  './link-R7mqIJIC.js':'./link-D3XaM6C4.js',
  './EspaciosLogo-28bELevs.js':'./EspaciosLogo-ClghS4jE.js',
  './ThemeControl-Bm6QZOLR.js':'./ThemeControl-BPc6yYwU.js',
  './route-contract-DKMZR9ZL.js':'./route-contract-B_0TQhCy.js',
  './workspace-client-C-s0XeLI.js':'./workspace-client-CGDFqu1O.js',
  './Icon-CHj4xEMx.js':'./Icon-DVcSq3_c.js'
};
let source=await read('ssr/assets/WorkspaceApp-DD_ApiM-.js');
const serverReact='import { C as __commonJSMin, T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";';
assert.equal(source.split(serverReact).length,2);
source=source.replace(serverReact,'import { t as __commonJSMin, r as __toESM } from "./rolldown-runtime-S-ySWqyJ.js";\nimport { r as require_jsx_runtime, i as require_react } from "./framework-CXnKph_e.js";');
for(const[before,after]of Object.entries(imports)){assert.equal(source.split('"'+before+'"').length,2);source=source.replace('"'+before+'"','"'+after+'"');}
assert.equal(source.includes('from "../index.js"'),false);
const assetSource=await read('workspace-ui-assets.js'),assets=JSON.parse(assetSource.split('const assets=',2)[1].split(';\nexport function',1)[0]);
const prefix='/__espacios/workspace-ui/20261005-3ee6fcf7622c/';
const paths=Object.fromEntries(Object.keys(assets).filter(path=>path.startsWith(prefix)).map(path=>[path.slice(prefix.length),path]));
const modules=[];
await mkdir(out,{recursive:true});
for(const[name,body]of [['WorkspaceApp-E-tE3LmW.js',source],['workspace-client-CGDFqu1O.js',await read('ssr/assets/workspace-client-C-s0XeLI.js')]]){
  const result=await transform(body,{format:'esm',target:'es2022',minifySyntax:true,minifyWhitespace:true,minifyIdentifiers:false,legalComments:'none'});
  const built=result.code.replace(/(["'`])(\.\/[^"'`]+\.js)\1/g,(all,quote,relative)=>quote+(paths[relative.slice(2)]||'/assets/'+relative.slice(2))+quote);
  const expected=assets[prefix+name];assert.equal(built,expected.body,'Rebuilt public bytes differ: '+name);assert.equal(hash(built),expected.etag);
  await writeFile(new URL(name,out),built);
  modules.push({name,sha256:hash(built),utf8Bytes:Buffer.byteLength(built),exactLiveAssetParity:true});
}
const proof={passed:true,method:'Pinned esbuild transform of recovered readable compiled SSR JavaScript plus explicit public import adapters; no bundling or original TSX compilation.',modules,currentGraph:'20261005-3ee6fcf7622c',uiOrBehaviorChanged:false,productionUploadPerformed:false};
await writeFile(new URL('REBUILD_PROOF.json',out),JSON.stringify(proof,null,2)+'\n');
console.log(JSON.stringify(proof));
