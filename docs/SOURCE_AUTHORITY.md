# Espacios Source Authority

Verified: 6 October 2026.

## Website source

`gugmaae-prog/esp-site`

Owns the website/public-site source record for:

- `espacios-public-shell`
- `espacios-marketing-site`
- `espacios-seo`

The wrapper Workers are mirrored here. The large compiled marketing bundle is inventoried, while Cloudflare remains authoritative for its full compiled multipart source until editable source is recovered.

## Map / intelligence source

`gugmaae-prog/espacios`

Owns:

- `espacios.me/map`
- `psr-portfolio-map-v2`
- historical intelligence and provenance
- Smart Estimates
- Map tests/build scripts
- production Map manifests
- Supabase `espacios-map-control` source
- Map release evidence

Do not treat `esp-site` as Map source.

## Supabase

Project:

```text
entity
ref: ypkfganbwdvcjrcxygta
region: ap-southeast-1
status: ACTIVE_HEALTHY
```

Role:

- shared backend for Aether/platform data;
- Google/contact/email integration tables;
- selected Edge Functions;
- Map runtime/release control registry.

Supabase is **not** the public website's primary marketing-content database.

## Cloudflare

Cloudflare remains production runtime authority for:

- website Workers and routes;
- Workspace/auth Workers;
- AI router;
- D1 / R2 / Queues / KV / Vectorize;
- Mail / Newsroom / Data Hub;
- Map runtime.

## Back ends not yet mirrored as website source

- `espacios-auth-central`
- `espacios-ai-router`
- `espacios-mail`
- `espacios-data-hub`
- `espacios-newsroom`

These are platform services, not frontend source.

## Rule

`esp-site` = website source.
`espacios` = Map/intelligence source.
Supabase = shared backend/control.
Cloudflare = runtime.
