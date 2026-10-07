import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';

const root=new URL('../',import.meta.url),snapshot=new URL('production-snapshot/2026-10-07/espacios-marketing-site/',root);
const manifest=JSON.parse(await readFile(new URL('MODULE_MANIFEST.json',snapshot),'utf8'));
const sha=value=>createHash('sha256').update(value).digest('hex');
const patterns={
  privateKey:/-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----/g,
  jwtLiteral:/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g,
  githubToken:/\b(?:gh[pousr]_[A-Za-z0-9_]{24,}|github_pat_[A-Za-z0-9_]{30,})\b/g,
  awsAccessKey:/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g,
  googleApiKey:/\bAIza[A-Za-z0-9_-]{30,}\b/g,
  openaiLikeKey:/\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}\b/g,
  privateFixtureMarker:/(?:UNSAVED_PLAN_SENTINEL|Recovered fixture plan|Synthetic international product launch|Synthetic course \d|audited@example\.com|fixture-attachment)/g
};
const strings=[],findings=[],assignmentReview=[],emailReview=new Map();
for(const part of manifest.parts){
  const body=await readFile(new URL('modules/'+part.name,snapshot),'utf8');strings.push({name:part.name,body});
  assert.ok(!/espacios-(?:auth-central|ai-router)\//.test(part.name));
}
const assetSource=strings.find(x=>x.name==='workspace-ui-assets.js').body;
const assets=JSON.parse(assetSource.split('const assets=',2)[1].split(';\nexport function',1)[0]);
for(const[path,asset]of Object.entries(assets))strings.push({name:'embedded:'+path,body:asset.body});
const knownPublicOwnerHash='0d3130093db05afdb931914b33dea1a2fb3fd6a10443ec3478810c345d773395';
let runtimeBearerTemplates=0,sourceMaps=0;
for(const{name,body}of strings){
  for(const[category,pattern]of Object.entries(patterns))for(const match of body.matchAll(pattern))findings.push({file:name,category,offset:match.index,length:match[0].length,valueSha256:sha(match[0])});
  for(const match of body.matchAll(/(?:api_?key|access_?token|client_?secret|password|authorization|secret|aws_?secret_?access_?key)\s*[:=]\s*(["'`])([^"'`\n]{8,})\1/gi)){
    const value=match[2],runtime=value.includes('${');
    if(runtime)runtimeBearerTemplates++;
    else assignmentReview.push({file:name,offset:match.index,length:value.length,valueSha256:sha(value),classification:'unreviewed static assignment'});
  }
  for(const match of body.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)){
    const email=match[0],hash=sha(email),domain=email.split('@')[1];
    const classification=hash===knownPublicOwnerHash?'already-public deployment author used in SSR profile normalization':domain==='espacios.me'?'public product/service email':domain==='company.com'?'login placeholder':'unreviewed email literal';
    const record=emailReview.get(hash)||{valueSha256:hash,domain,classification,occurrences:0};record.occurrences++;emailReview.set(hash,record);
  }
  sourceMaps+=(body.match(/sourceMappingURL=/g)||[]).length;
}
const unreviewedEmails=[...emailReview.values()].filter(x=>x.classification==='unreviewed email literal');
const passed=findings.length===0&&assignmentReview.length===0&&unreviewedEmails.length===0;
const result={passed,reviewedAt:new Date().toISOString(),scope:'Exact 23-module Marketing source plus decoded 108 public assets. No Auth/Router Worker implementations/config, customer exports or private fixtures are proposed.',credentialAndPrivateFixtureFindings:findings,staticAssignmentReview:assignmentReview,runtimeTokenInterpolationMatches:runtimeBearerTemplates,staticEmailReview:[...emailReview.values()],unreviewedEmailCount:unreviewedEmails.length,originalAuthoringSourceMapsFound:sourceMaps,customerApisRead:false,rawSecretsPrinted:false,limitation:'Pattern scans support review; they are not a guarantee against every unknown secret format. Compiled Marketing SSR/server actions and the already-public owner email remain visible in exact code.',publicationDecision:'Prepared for root review; no GitHub write or deployment performed.'};
if(process.argv.includes('--write-review'))await writeFile(new URL('PUBLICATION_REVIEW.json',snapshot),JSON.stringify(result,null,2)+'\n');
if(!passed)throw Error('Unreviewed privacy findings; see hashed/redacted publication review');
console.log(JSON.stringify({passed,moduleCount:23,embeddedAssets:108,credentialOrPrivateFixtureFindings:0,unreviewedStaticAssignments:0,unreviewedEmails:0,sourceMaps,scope:result.scope}));
