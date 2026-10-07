import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {relative,join,sep} from 'node:path';
import assert from 'node:assert/strict';

const root=new URL('../',import.meta.url),snapshot=new URL('production-snapshot/2026-10-07/espacios-marketing-site/',root);
const read=async path=>readFile(new URL(path,snapshot),'utf8');
const sha=value=>createHash('sha256').update(value).digest('hex');
export async function verifySnapshot(){
  const manifest=JSON.parse(await read('MODULE_MANIFEST.json'));
  const moduleRoot=fileURLToPath(new URL('modules/',snapshot));
  const actual=(await readdir(new URL('modules/',snapshot),{recursive:true,withFileTypes:true})).filter(x=>x.isFile()).map(x=>relative(moduleRoot,join(x.parentPath||x.path,x.name)).split(sep).join('/')).sort();
  assert.deepEqual(actual,manifest.parts.map(x=>x.name).sort());
  let total=0;
  for(const part of manifest.parts){
    const url=new URL('modules/'+part.name,snapshot),source=await readFile(url);
    assert.equal(source.byteLength,part.bytes,part.name);
    assert.equal(sha(source),part.sha256,part.name);
    assert.equal(part.type,'application/javascript+module',part.name);
    execFileSync(process.execPath,['--check',fileURLToPath(url)],{stdio:'pipe'});
    total+=source.byteLength;
  }
  assert.equal(total,8408551);assert.equal(total,manifest.total_utf8_bytes);
  assert.equal(manifest.parts.length,23);
  const source=await read('modules/workspace-ui-assets.js');
  const assets=JSON.parse(source.split('const assets=',2)[1].split(';\nexport function',1)[0]);
  assert.equal(Object.keys(assets).length,108);
  for(const[path,asset]of Object.entries(assets)){assert.equal(sha(asset.body),asset.etag,path);assert.ok(path.startsWith('/__espacios/workspace-ui/'));}
  const css=assets['/__espacios/workspace-ui/20261005-3ee6fcf7622c/workspace.css'];
  assert.equal(css.etag,'969beca4d56be7ee3b130d832fd3d8f9a881f6cf20fbc72bf2e708525d5afbc2');
  const bootstrap=assets['/__espacios/workspace-ui/20261005-3ee6fcf7622c/index-C5rSNAIW.js'].body;
  assert.ok(bootstrap.includes('__ESPACIOS_INPUT_MODALITY_SYNC__'));
  assert.ok(bootstrap.startsWith('(function () {\n  if (/^\\/map'));
  assert.equal(manifest.ui_or_behavior_changed,false);
  assert.equal(manifest.deploy_automation_enabled,false);
  return{passed:true,moduleCount:23,totalUtf8Bytes:total,immutableAssets:108,currentGraph:manifest.current_graph_revision,syntaxValid:true,seamlessPolicyPreserved:true,scope:'Offline bytes/syntax only. No live requests, application writes or deployment.'};
}
if(process.argv[1]===fileURLToPath(import.meta.url))console.log(JSON.stringify(await verifySnapshot()));
