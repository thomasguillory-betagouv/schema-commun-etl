# Claude Code — Project instructions for `schema-commun-etl`

## Contexte

Ce repo contient le **pipeline ETL nocturne** pour le schéma `schema_commun_v2` de la base Postgres de l'API Communs (collectivités transition écologique).

Spec, design et workflow vivent provisoirement dans `dashboard-te/docs/*_ETL_NIGHTLY.md` (à migrer ici à terme).

## Règles spécifiques à ce repo

### Isolation de schéma — RÈGLE ABSOLUE

Ce repo gère **uniquement** les objets dans le schéma Postgres `schema_commun_v2`.

- **Ne jamais** créer/modifier/supprimer des objets dans `public.*` (réservé à l'API Communs)
- **Ne jamais** référencer les tables Drizzle de l'API Communs dans `db/schema.ts`
- Toutes les définitions Drizzle utilisent `pgSchema('schema_commun_v2')`

### Migrations

- Toutes les migrations passent par Drizzle (`pnpm db:generate` puis commit du fichier SQL généré)
- **Aucun DDL manuel** sur prod ou staging (exécution exclusive via postdeploy hook Scalingo)
- Migrations versionnées dans `migrations/`, jamais éditées après merge

### Langues

- Code et commentaires : **anglais**
- Commits, PRs, issues, code review : **français**

### Stack

- Node 22+, pnpm 10+
- TypeScript strict mode, pas de `any`
- Drizzle ORM + `pg` driver
- Scripts via `tsx` (pas de bundler)
- Flows Prefect en Python 3.12 (Phase 2)

### Sécurité

- Aucun secret en clair dans le repo (utiliser `.env` local + env vars Scalingo en prod)
- Aucune connexion DB hardcodée — toujours via `DATABASE_URL`

### CI

- Workflow `.github/workflows/ci.yml` doit passer (lint + typecheck) avant tout merge
- Image Docker buildée et poussée sur GHCR via workflow séparé (P0.3)

## Commandes utiles

```bash
pnpm install
pnpm validate              # lint + typecheck
pnpm db:generate           # génère une migration depuis db/schema.ts
pnpm db:migrate            # applique en local (DATABASE_URL pointant vers sandbox)
```

## Workflow de contribution

1. Créer une branche `feat/...` ou `fix/...`
2. Commit en français (`feat: ...`, `fix: ...`, etc.)
3. PR sur `main` (jamais merge direct sauf bootstrap initial)
4. Attendre CI verte avant merge
5. **Ne jamais** activer `gh pr merge --auto` au moment de la création de la PR
