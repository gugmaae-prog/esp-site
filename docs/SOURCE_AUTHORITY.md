# Source Authority

Verified: 6 October 2026

## Repository ownership

### `gugmaae-prog/esp-site`
Owns the Espacios **website/public-site source record**.

Current live public-site chain:

```text
espacios.me/*
  -> espacios-public-shell
     -> espacios-marketing-site
     -> espacios-seo
```

The snapshot in this repository was pulled from the live Cloudflare Workers without modifying production.

### `gugmaae-prog/espacios`
Owns the Espacios **Map and UAE intelligence/data product**.

Current Map chain:

```text
espacios.me/map*
  -> espacios-map-shell
  -> psr-portfolio-map-v2
  -> Cloudflare D1/R2 + PSR_PROPERTY
  -> Supabase Map control/audit plane
```

The current Map release is maintained and tested in the `espacios` repository. Do not copy Map production source into this repo as the canonical source.

## What is not yet fully mirrored

The broader Workspace/API back end remains Cloudflare-authoritative:
- `espacios-auth-central`
- `espacios-ai-router`
- Mail, Data Hub and Newsroom Workers

They are dependencies of the website/platform, but they are not website frontend source.

## Cloudflare live website Workers

- `espacios-public-shell`
- `espacios-marketing-site`
- `espacios-seo`

The exact deployed bundle is stored under `production-snapshot/2026-10-06/`.

## Deployment policy

Do not wire automatic production deployment from this snapshot until editable source is reconstructed and verified.

Recommended path:
1. Recover/refactor editable website source.
2. Reproduce the live bundle.
3. Verify desktop/mobile and hydration behavior.
4. Compare generated output with the live snapshot.
5. Only then introduce a reviewed deployment workflow.
