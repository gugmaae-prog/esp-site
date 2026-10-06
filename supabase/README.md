# Supabase in the Espacios Platform

Verified: 6 October 2026.

## Project

```text
name: entity
ref: ypkfganbwdvcjrcxygta
region: ap-southeast-1
status: ACTIVE_HEALTHY
PostgreSQL: 17.6
```

## Role

Supabase is a **shared backend/control dependency** for the wider Espacios platform.

It contains platform/Aether data, Google/contact/email integration tables, commerce/shared historical tables and the Espacios Map control registry.

It is **not** the canonical source repository for the website and it is **not** the public marketing Worker's primary content database.

## Website relationship

The public marketing Worker primarily uses:

- Cloudflare D1 `espacios-marketing-site`;
- R2 `espacios-marketing-media`;
- Cloudflare Images / Assets / Email;
- `espacios-newsroom` service binding.

Supabase is reached through other platform services and specific control/integration surfaces.

## Current security posture

Deterministic security-advisor findings:

```text
0
```

Public-schema tables returned by the current compact inventory:

- total: 82
- RLS enabled: 82
- RLS disabled: 0

RLS being enabled does not by itself prove every policy is logically correct; policy changes still require review.

## Edge Functions

| Function | Status | JWT |
| --- | --- | --- |
| `sync-worker` | ACTIVE | enabled |
| `contacts-v2-api` | ACTIVE | enabled |
| `google-sync-v2` | ACTIVE | enabled |
| `smtp-send-v1` | ACTIVE | enabled |
| `psr-ai-api` | ACTIVE | enabled |
| `espacios-map-control` | ACTIVE | disabled / custom-public flow |

`espacios-map-control` belongs to the Map/control-plane architecture. Its canonical source remains in `gugmaae-prog/espacios`.

## Performance advisor

Current informational unused-index findings: **100**.

Do not delete indexes automatically from this lint. Use workload/query evidence first.

## Secrets

Never commit:

- service-role keys;
- secret keys;
- OAuth tokens;
- private user/customer data.

Frontend-safe publishable configuration, if ever added here, must be kept separate from server credentials.
