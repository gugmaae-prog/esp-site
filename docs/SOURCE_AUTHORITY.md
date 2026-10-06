# Espacios Source Authority

Verified: 6 October 2026.

## Repo 1 — Website

`gugmaae-prog/esp-site`

Owns the public website/source-recovery record for:
- `espacios-public-shell`
- `espacios-marketing-site`
- `espacios-seo`

The small wrapper Workers are fully mirrored here. The large compiled marketing bundle is inventoried, but is still Cloudflare-authoritative until its editable build source is recovered.

## Repo 2 — Map / Intelligence

`gugmaae-prog/espacios`

Owns:
- `espacios.me/map`
- `psr-portfolio-map-v2`
- Map assets/tests/builds
- historical intelligence and Smart Estimates
- production Map manifests
- Supabase `espacios-map-control` source
- Map release evidence and data methodology

Do not move Map code into `esp-site` as canonical source.

## Platform back ends

The following remain Cloudflare-authoritative and are dependencies, not website frontend source:
- `espacios-auth-central`
- `espacios-ai-router`
- `espacios-mail`
- `espacios-data-hub`
- `espacios-newsroom`

## Production rule

Do not auto-deploy `esp-site` to production from the compiled snapshot.

First recover editable source, reproduce the live output, run desktop/mobile/hydration acceptance, compare to the production snapshot, and only then introduce reviewed CI/CD.
