# Espacios Website

This repository is the **website/public-site source repository** for `espacios.me`.

## Two-repository split

| Repository | Authority |
| --- | --- |
| `gugmaae-prog/esp-site` | Espacios website/public shell and website deployment snapshots |
| `gugmaae-prog/espacios` | Espacios Map, UAE intelligence/data research, Map tests, Map production manifests and Supabase Map control-plane source |

This split is intentional. Do **not** deploy the Map from this repository and do **not** treat the `espacios` Map repository as a full website source mirror.

## Current live website topology

```text
Browser
  -> espacios.me/*
     -> espacios-public-shell
        -> MARKETING service -> espacios-marketing-site
        -> SEO service       -> espacios-seo
```

Important API/Workspace routes are still handled by `espacios-auth-central`; AI routing is handled by `espacios-ai-router`. Those back-end Workers are not mirrored here yet because this repository is for the website/public site.

## Production snapshot

A read-only snapshot of the **currently deployed website Workers** was added under:

```text
production-snapshot/2026-10-06/
  espacios-public-shell/
  espacios-marketing-site/
  espacios-seo/
```

The marketing Worker is a compiled Cloudflare/Vite/SSR bundle. The snapshot is for **recovery, diffing and source reconciliation**. It should not be mistaken for clean editable application source.

See:
- `docs/SOURCE_AUTHORITY.md`
- `cloudflare/live-website-bindings.json`

## Safety

This repository is public.

Never commit:
- Cloudflare API tokens
- Supabase service-role keys
- OAuth client secrets
- customer/lead exports
- private CRM records
- mail provider credentials
- source-embedded tokens

The production snapshot was scanned for common credential formats before commit. Secret **binding names** may appear in deployment documentation, but secret values must remain in Cloudflare/Supabase secret stores.

## Frontend rule

The October 6 snapshot was created **without changing the live frontend**. It is a source-control synchronization only.
