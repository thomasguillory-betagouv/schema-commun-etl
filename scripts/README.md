# Scripts TS

Scripts TypeScript portés depuis `dashboard-te/scripts/` en Phase 2.

Liste cible (cf. `dashboard-te/docs/WORKFLOW_ETL_NIGHTLY.md` Phase 2) :

- `dedupe-mec-from-mapping.ts` (orphelins)
- `cleanup-orphan-clusters.ts`
- `cluster-intra-source-strict.ts` (Phase A auto)
- `cluster-projects.ts` (cross-source incrémental)
- `llm-match-pairs.ts` (Sonnet grey-zone + cache)
- `clean-nom-propre.ts`
- `clean-nom-propre-fiches.ts`
- `precompute-embeddings.ts` → adaptation pgvector

Conventions :

- Exécution via `tsx` (pas de bundler)
- DB connection via `DATABASE_URL` (jamais en clair)
- Idempotence : chaque script doit pouvoir être rejoué sans corruption
- Logs JSON structurés vers stdout (parsés par Prefect)
