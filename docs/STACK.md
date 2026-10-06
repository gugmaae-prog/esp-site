# Espacios Website Stack

Verified: 6 October 2026.

## Request path

```text
espacios.me/*
  -> espacios-public-shell
     -> MARKETING -> espacios-marketing-site
     -> SEO       -> espacios-seo
```

More-specific Cloudflare routes override the public catch-all for Workspace/API/Map/Logos/Data/News surfaces.

## Public website Workers

### espacios-public-shell

Role:
- public host shell;
- canonical/meta composition;
- website-level runtime composition;
- service forwarding.

Current production:
- deployment: `64d179ef-f7f9-4330-b15b-eca51b1dec38`
- version: `100f0ffc-2569-45cf-90dd-0cdc659d1afe`

Bindings:
- `MARKETING -> espacios-marketing-site`
- `SEO -> espacios-seo`

### espacios-marketing-site

Role:
- marketing/public pages;
- selected Workspace/public surfaces;
- website server rendering and assets.

Current production:
- deployment: `198f2392-b126-4e0b-89a5-ce8fd5bd21ce`
- version: `643daaaf-38a5-4915-9b83-9ee46f449bda`

Bindings:
- `ASSETS`
- `DB -> D1 espacios-marketing-site`
- `EMAIL`
- `IMAGES`
- `MEDIA -> R2 espacios-marketing-media`
- `NEWSROOM -> espacios-newsroom`

### espacios-seo

Role:
- `robots.txt`
- `sitemap.xml`
- `site-core.xml`

Current production:
- deployment: `c781f1bf-1b69-45ac-84f0-575f914ef3a7`
- version: `2139aae5-6b36-4e08-8230-7150ed0b6cb6`

## Related platform back ends

### espacios-auth-central

Owns most:
- auth callbacks;
- Workspace APIs;
- CRM/database/research/social/team APIs;
- file ingestion;
- Workspace D1/R2/search integration.

### espacios-ai-router

Owns:
- provider routing;
- Workers AI fallback;
- image generation;
- provider-health state.

## Supabase

Supabase is a shared backend/control dependency, not the website marketing database.

See `../supabase/README.md`.

## Map exclusion

`/map*` is intentionally outside this repo's source ownership.

Map source authority: `gugmaae-prog/espacios`.
