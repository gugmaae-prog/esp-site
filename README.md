# Espacios Website

This repository is the source-control home for the **Espacios website/public-site layer** at `espacios.me`.

## Platform authority

Espacios has three distinct authority layers:

| Layer | Authority | Responsibility |
| --- | --- | --- |
| Website source | `gugmaae-prog/esp-site` | Public website, website shell, SEO snapshots, recovery and website source reconciliation |
| Map / intelligence source | `gugmaae-prog/espacios` | Espacios Map, UAE intelligence/data research, history, Smart Estimates, Map tests/manifests and Map control-plane source |
| Shared backend / control | Cloudflare + Supabase `entity` | Runtime, Workspace/auth/AI services, selected shared data and release/control metadata |

This split is intentional.

## Live website runtime

```text
Browser
  -> espacios.me/*
     -> espacios-public-shell
        -> MARKETING -> espacios-marketing-site
        -> SEO       -> espacios-seo
```

Workspace/API back-end routes are primarily handled by `espacios-auth-central`.
AI routing is handled by `espacios-ai-router`.

Those back-end Workers are dependencies of the platform, but they are **not the public website frontend source**.

## Supabase relationship

Current Supabase project:

- name: `entity`
- ref: `ypkfganbwdvcjrcxygta`
- region: `ap-southeast-1`
- status: `ACTIVE_HEALTHY`
- PostgreSQL: 17.6
- deterministic security-advisor findings: **0**

Supabase is a **shared backend/control plane**. It is not the canonical source repository for the website and it is not the public marketing Worker's primary content database.

The public marketing Worker currently uses:

- Cloudflare D1 `espacios-marketing-site`
- R2 `espacios-marketing-media`
- Cloudflare Assets / Images / Email
- service binding `NEWSROOM -> espacios-newsroom`

Supabase supports other parts of the wider platform, including Aether/shared platform data and Map release/control metadata.

See `supabase/README.md`.

## Map ownership

The Map does **not** live in this repository.

Canonical Map repository:

```text
gugmaae-prog/espacios
```

Current Map architecture:

```text
espacios.me/map*
  -> espacios-map-shell
  -> psr-portfolio-map-v2
  -> Cloudflare D1/R2 + PSR_PROPERTY
  -> Supabase Map control/audit plane
```

Do not move Map code into `esp-site` as canonical source.

## 6 October 2026 website production snapshot

This repository contains:

- complete live `espacios-public-shell` Worker source;
- complete live `espacios-seo` Worker source;
- exact Cloudflare binding/deployment metadata for the website Workers;
- exact module inventory for the live `espacios-marketing-site` compiled bundle.

```text
production-snapshot/2026-10-06/
  espacios-public-shell/worker.js
  espacios-seo/worker.js
  espacios-marketing-site/MODULE_INVENTORY.json

cloudflare/live-website-bindings.json
docs/SOURCE_AUTHORITY.md
docs/STACK.md
supabase/README.md
supabase/PROJECT_STATE.json
```

### Marketing bundle limitation

`espacios-marketing-site` is currently a 23-module compiled Cloudflare/Vite/SSR bundle of about 8.4 MB.

The connected Cloudflare export interface truncates very large multipart Worker downloads, so this repo does **not** claim to contain the complete compiled marketing Worker bundle. Cloudflare remains runtime-authoritative for that bundle until editable source is fully recovered and reconciled.

## Safety

This repository is public.

Never commit:

- Cloudflare API tokens
- Supabase service-role or secret keys
- OAuth client secrets
- customer/lead exports
- private CRM records
- mail credentials
- source-embedded access tokens

Runtime secrets remain in Cloudflare/Supabase secret stores.

## Deployment policy

Do **not** enable automatic production deployment from this recovered snapshot yet.

Before GitHub-driven website deployment:

1. recover/reconstruct editable website source;
2. reproduce the live `espacios-marketing-site` bundle;
3. run desktop/mobile and hydration acceptance;
4. compare generated output against production;
5. preserve current Cloudflare bindings;
6. only then introduce reviewed CI/CD.

## Frontend status

This repository/documentation update does **not** modify the live frontend.
