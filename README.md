# Espacios Website

This repository is the source-control home for the **Espacios website/public-site layer** at `espacios.me`.

## Two-repository architecture

| Repository | Canonical responsibility |
| --- | --- |
| `gugmaae-prog/esp-site` | Website/public shell, website deployment snapshots, website recovery/source reconciliation |
| `gugmaae-prog/espacios` | Espacios Map, UAE intelligence/data research, Map tests, Map manifests, historical intelligence and Supabase Map control-plane source |

The split is intentional.

## Live website chain

```text
Browser
  -> espacios.me/*
     -> espacios-public-shell
        -> MARKETING -> espacios-marketing-site
        -> SEO       -> espacios-seo
```

Workspace/API back-end routes are still handled by `espacios-auth-central` and AI routing by `espacios-ai-router`. Those are platform back ends, not frontend source, and are not mirrored here yet.

## 6 October 2026 production snapshot

This repo contains:
- the **complete live `espacios-public-shell` Worker source**;
- the **complete live `espacios-seo` Worker source**;
- exact Cloudflare binding/deployment metadata for all three website Workers;
- the **module inventory** for the live `espacios-marketing-site` compiled bundle.

The marketing Worker is a 23-module compiled Cloudflare/Vite/SSR bundle of roughly 8.36 MB. The current connector cannot export that complete multipart bundle without truncation, so this repo **does not falsely claim a full marketing-site source mirror**. Cloudflare remains authoritative for that compiled bundle until editable source is recovered/reconciled.

Paths:

```text
production-snapshot/2026-10-06/
  espacios-public-shell/worker.js
  espacios-seo/worker.js
  espacios-marketing-site/MODULE_INVENTORY.json
cloudflare/live-website-bindings.json
docs/SOURCE_AUTHORITY.md
```

## Safety

This repo is public. Never commit Cloudflare tokens, Supabase service-role keys, OAuth secrets, lead/CRM exports, mail credentials or private customer data.

No live frontend changes were made when creating this repository snapshot.
