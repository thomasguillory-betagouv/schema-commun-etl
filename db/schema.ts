/**
 * Drizzle schema for schema_commun_v2.
 *
 * IMPORTANT: this repo manages ONLY tables/extensions in the `schema_commun_v2`
 * Postgres schema. Never reference tables in `public.*` here — those belong to
 * the API Communs Drizzle schema (separate repo).
 *
 * Tables/extensions added in P0.1 (pgvector extension) and P0.2 (etl_run_log,
 * embeddings, projet_external_ids, ALTERs on existing tables).
 */
import { pgSchema } from 'drizzle-orm/pg-core'

export const schemaCommunV2 = pgSchema('schema_commun_v2')
