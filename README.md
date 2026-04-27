# schema-commun-etl

Pipeline ETL nocturne pour le schéma `schema_commun_v2` de l'API Communs (collectivités transition écologique).

> Repo public conforme à la politique open source [beta.gouv.fr](https://beta.gouv.fr/).

## Vue d'ensemble

Ce repo contient :

- **Migrations Drizzle** (`db/schema.ts` + `migrations/`) pour les tables et extensions du schéma `schema_commun_v2` (gérées indépendamment de l'API Communs)
- **Flows Prefect** (`flows/`) pour l'orchestration nocturne (Python)
- **Scripts TS** (`scripts/`) portés depuis `dashboard-te` (clustering, dedup, classification LLM)
- **Dockerfile + GitHub Actions** pour build/push de l'image Prefect agent vers GHCR

Spec figée dans `docs/REQUIREMENTS.md`, design dans `docs/DESIGN.md`, plan d'implémentation dans `docs/WORKFLOW.md` (à venir, miroirs des docs `dashboard-te/docs/*_ETL_NIGHTLY.md`).

## Architecture

```
┌──────────────────────────────────────────────────┐
│  Scalingo                                        │
│  ├ App API Communs (existante)                   │
│  ├ App etl-nightly-prefect-server (nouveau)      │
│  ├ App etl-nightly-prefect-agent (nouveau)       │
│  │  └ image GHCR ghcr.io/.../schema-commun-etl   │
│  └ Postgres (partagé)                            │
│     ├ public.* (API Communs, Drizzle séparé)     │
│     └ schema_commun_v2.* (CE REPO uniquement)    │
└──────────────────────────────────────────────────┘
```

**Isolation stricte de schéma** : ce repo ne touche **que** `schema_commun_v2.*`. Aucune migration ne modifie `public.*` ni les tables Drizzle de l'API Communs.

## Prérequis

- Node 22+ (cf. `.nvmrc`)
- pnpm 10+
- Postgres 16+ avec extension `vector` (pgvector)
- Accès à la base Communs prod (Tailscale ou SSH tunnel Scalingo)

## Setup local

```bash
pnpm install
cp .env.example .env
# remplir DATABASE_URL, ANTHROPIC_API_KEY, VOYAGE_API_KEY
pnpm db:generate     # générer une migration depuis db/schema.ts
pnpm db:migrate      # appliquer en local/sandbox
pnpm typecheck
pnpm lint
```

## Migrations DB

Les migrations sont versionnées dans `migrations/` et générées par `drizzle-kit` depuis `db/schema.ts`.

**Règle absolue** : aucun DDL manuel sur prod ou staging. Toute modification passe par :

1. Modifier `db/schema.ts`
2. `pnpm db:generate` → fichier SQL dans `migrations/`
3. Commit + PR + merge
4. Postdeploy hook Scalingo applique automatiquement

## Stack

| Composant | Tech |
|---|---|
| ORM / migrations | Drizzle ORM + drizzle-kit |
| Driver Postgres | `pg` |
| Scripts TS | tsx |
| Orchestrateur | Prefect 3 (self-hosted) |
| LLM | Anthropic Batch API (Sonnet 4.6) |
| Embeddings | Voyage AI (`voyage-3-large`) + pgvector |
| Hébergement | Scalingo |
| Registry | GHCR via GitHub Actions |

## Communication

- Code et commentaires : **anglais**
- Commits, PRs, issues, reviews : **français**
- UI éventuelle : **français**

## Licence

À définir (typiquement MIT ou licence Ouverte 2.0 pour beta.gouv.fr).
