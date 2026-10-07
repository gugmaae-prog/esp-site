# Marketing and Workspace source recovery

Verified 7 October 2026 against `espacios-marketing-site` version `643daaaf-38a5-4915-9b83-9ee46f449bda`, deployment `198f2392-b126-4e0b-89a5-ce8fd5bd21ce`, at 100% traffic.

The complete 23-module compiled Worker source is recovered under `production-snapshot/2026-10-07/espacios-marketing-site/modules/`. Every module matches a fresh production SHA256 and UTF8 byte-size check. The modules total 8,408,551 bytes. This includes all 108 immutable Workspace asset entries and preserves the current graph `20261005-3ee6fcf7622c`, seamless input policy and existing module import names.

## Fidelity

This is exact compiled runtime JavaScript, including readable SSR component functions and Marketing server actions. It is not the original TSX, source maps, original dependency lockfile or original Vite authoring project. None of those authoring files was found in the current repository tree or in the compiled export. Source authority remains `gugmaae-prog/esp-site` for website recovery; Cloudflare remains production runtime authority.

The connector received the entire closed multipart response. Hashing that response inside the connector and returning only bounded module metadata avoided large tool-output truncation. Existing local code was reused only after all 23 current module names, MIME types, UTF8 sizes and SHA256 hashes matched. The historical 6 October inventory is preserved; its `bytes` fields for Unicode modules used JavaScript string lengths. The new manifest records actual UTF8 sizes.

## Local verification and reconstruction

`npm run verify` uses only Node builtins. It verifies all 23 files, their syntax, embedded immutable asset hashes and the frozen input policy. It sends no network request.

`npm run build:snapshot` copies the verified exact modules into `dist/marketing-snapshot/` and writes `{main_module:"index.js"}` metadata. This is a verified reconstruction of the compiled upload parts, not an original source compilation. It contains no bindings, secrets, routes or automatic upload step.

After `npm ci --ignore-scripts`, `npm run verify:workspace-build` uses pinned esbuild 0.25.12 to transform the recovered readable SSR Workspace component and API adapter into their public client modules. Explicit import adapters reproduce both currently served public asset bodies byte for byte. This demonstrates a concrete readable-JavaScript recovery path for those two modules; it does not prove an original-project build or rebuild all 23 modules from original TSX.

The embedded current graph supplies the recovered Workspace assets. Stable framework/runtime files and the existing Cloudflare ASSETS binding remain external dependencies. The ASSETS resource is not reconstructed from authoring source by this snapshot.

## Publication boundary

The public record contains Marketing Worker code and source-recovery tooling only. Auth/AI Router Worker implementations, private fixtures, customer exports and runtime configuration are excluded. Credential/private-key/JWT/fixture scans and static email review are recorded in `PUBLICATION_REVIEW.json`. One owner email in Marketing SSR normalization already appears in the public 6 October deployment inventory; it is retained in the exact code and disclosed in the publication review.

The snapshot does not change the frontend, styles, behavior, data, bindings or deployed versions. `/map` source remains in `gugmaae-prog/espacios`; no Map runtime source is introduced here. References to existing routes in shared website code are preserved.

## Deployment policy

No CI/CD or deploy command is enabled. Before any future edited-code release, preserve this immutable baseline, assign a new client graph to changed asset bytes, update both SSR manifests, retain all old immutable paths, run full hydration/mobile/desktop acceptance and compare the proposed deployment against the current runtime. Original TSX recovery or deliberate authoring reconstruction remains a separate task.
