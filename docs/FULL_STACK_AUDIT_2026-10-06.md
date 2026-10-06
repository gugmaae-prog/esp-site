# Espacios Full-Stack Production Audit

Verified: 6 October 2026

This audit is read-only with respect to the live frontend and production data. No UI/style/content changes were made.

## Executive status

- Cloudflare: healthy
- GitHub source split: healthy
- Supabase: ACTIVE_HEALTHY
- Map release chain: reconciled
- Public website: live
- Workspace/auth: live
- AI router: live
- Mail: operational with SES identity-health warning
- Newsroom: operational with intermittent upstream/transient cron errors
- Data Hub: live
- Logos: live

## Current platform inventory

- 93 Cloudflare Workers
- 145 Worker routes
- 13 D1 databases
- 11 R2 buckets
- 9 queues
- 2 KV namespaces
- 1 Vectorize index
- 0 broken Worker routes
- 0 missing service-binding targets
- 0 active Cloudflare issue records across the critical Espacios Workers

## Source authority

### Website
Repository: `gugmaae-prog/esp-site`

Current snapshot parity:
- `espacios-public-shell`: exact byte-for-byte match with production
- `espacios-seo`: exact byte-for-byte match with production
- `espacios-marketing-site`: 23/23 live modules match the repository module inventory by name and size

The compiled marketing bundle is still Cloudflare-authoritative because the connected export path truncates the complete ~8.4 MB multipart Worker bundle.

### Map / intelligence
Repository: `gugmaae-prog/espacios`

Current production V9:
- GitHub main: `8ba4d609da30d2f6c771e243cf11d7102fe16623`
- V9 runtime merge: `40659db7c5a7ed86e0f20d38e36295e864177eba`
- Worker: `psr-portfolio-map-v2`
- Worker version: `45c1fc27-420d-4b9c-b276-d1b8c97cd466`
- Deployment: `5248c438-7a04-4e31-9f2c-4d232a8b3dfc`
- Supabase release: `20261006-history-v9`
- Source sync: reconciled

The only commits after the V9 runtime merge are README/documentation changes. No newer Map runtime code is waiting to deploy.

## Supabase

Project:
- name: `entity`
- ref: `ypkfganbwdvcjrcxygta`
- region: `ap-southeast-1`
- status: `ACTIVE_HEALTHY`
- PostgreSQL: 17.6

Current compact inventory:
- 82 public-schema tables
- 82/82 report RLS enabled
- 0 deterministic security-advisor findings
- 100 informational unused-index findings

Active Edge Functions:
- `sync-worker`
- `contacts-v2-api`
- `google-sync-v2`
- `smtp-send-v1`
- `psr-ai-api`
- `espacios-map-control`

The GitHub source for `espacios-map-control` exactly matches the live Supabase function.

### Migration-history note
The Map control-plane schema is already live in Supabase, but the production migration history timestamp does not match the Git migration filename timestamp exactly. Do not re-run the migration merely to align timestamps; reconcile migration history deliberately before future schema automation.

## Cloudflare critical Workers

Healthy / no active issues:
- `espacios-public-shell`
- `espacios-marketing-site`
- `espacios-auth-central`
- `espacios-ai-router`
- `espacios-map-shell`
- `psr-portfolio-map-v2`
- `espacios-logos-shell`
- `psr-logos-gallery`
- `espacios-mail`
- `espacios-data-hub`
- `espacios-project-publisher`
- `espacios-newsroom`

## Workspace / Aether

Core bindings remain intact:
- `WORKSPACE_DB -> paln`
- `PLUG_BUCKET -> espacios-plug`
- `FILE_INGESTION_QUEUE -> espacios-file-ingestion`
- `WORKSPACE_SEARCH -> espacios-workspace-search`
- `ROUTER -> espacios-ai-router`

Workspace database:
- `paln` ~5.87 GB
- imported Spaces project rows: 0
- active Workspace incidents: 0

### File ingestion
Normal queue backlog: 0.

Dead-letter queue:
- `espacios-file-ingestion-dlq`: 59 messages

Sampled failures are historical `folder_ai_job` jobs for generated landing/plans/deck artifacts. Preserve them until they are reconciled; do not purge blindly.

## AI

`espacios-ai-router` is healthy with no current active Cloudflare issue.

Bound provider paths include:
- Workers AI
- Groq
- Gemini
- Mistral
- Alibaba / DashScope
- Pollinations

Provider-health state uses KV `espacios_llm_health`.

## Map data

V9 production reports:
- 1,860 catalogue records
- 1,645 projects
- 215 communities
- 316,608 public aggregates
- 2,846 sources
- 3,946 sourced facts
- 92 dated events
- 5,682 event exposures
- 13,158 published history series

Cloudflare D1 currently also contains:
- 4,882 retained history-series rows
- 2,223 prediction runs
- 18 registered market-data sources
- 415 market observations

These are different data grains from the published V9 aggregate release and must not be forced into one count.

## Data Hub

Registry currently contains approximately:
- 1,091 projects
- 279 developers
- 2 current snapshots

This is a different publication/catalogue grain from the Map's 1,645 project/phase records.

## Mail

Queues:
- `espacios-mail-send`: 0 backlog
- send DLQ: 0
- `espacios-mail-events`: 0 backlog
- event DLQ: 0

Mail is operational.

Known issue:
- scheduled SES sending-domain identity health checks still return 403
- historical successful sends prove this is not a blanket SES-send outage
- likely IAM read/identity permission gap remains

## Newsroom

Public Newsroom routes are live.

Recent transient events:
- one upstream source 503
- one D1 network connection lost event during scheduled ingestion

Subsequent requests and scheduled activity continued successfully.

## Queue health

- Aether jobs: 0 backlog
- Workspace file ingestion: 0 backlog
- Workspace file-ingestion DLQ: 59
- Mail event/send queues: 0
- Mail DLQs: 0
- Ever Fortune refresh queue: 1
- Ever Fortune DLQ: 1

## Live route acceptance

Verified 200:
- `/`
- `/services`
- `/workspace`
- `/pricing`
- `/request-proposal`
- `/login`
- `/map`
- `/map/api/v1/status`
- `/map/api/system`
- `/map/api/control-plane`
- `/logos`
- `/data`
- `/news`
- `/robots.txt`
- `/sitemap.xml`

## Deployment reconciliation

Nothing release-ready is currently undeployed.

Do not redeploy:
- `esp-site` documentation/snapshots are not an application release.
- Map main is ahead of the deployed V9 runtime only by README documentation.
- Supabase Map control function already exactly matches Git.
- The saved next Map research packet is intentionally not production-ready.

Therefore no production redeployment was performed during this audit.

## Remaining priorities

1. Reconcile the 59 file-ingestion dead-letter jobs.
2. Fix SES identity-health IAM permissions.
3. Reconcile Supabase Map migration-history timestamp naming before automated migration workflows.
4. Investigate recurrent Newsroom source quality/retry behavior.
5. Continue recovering editable `espacios-marketing-site` source into `esp-site`.
6. Keep frontend/UI unchanged unless explicitly requested.
