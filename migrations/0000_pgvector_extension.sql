-- Migration P0.1 — Activer l'extension pgvector pour les embeddings cosine via SQL.
-- Idempotent : IF NOT EXISTS permet de rejouer sans erreur.
-- Note : l'extension est globale à la base, pas au schéma. La table embeddings
-- utilisera vector(1024) dans schema_commun_v2 (migration suivante P0.2).
CREATE EXTENSION IF NOT EXISTS vector;
