# Prefect flows

Flows Python pour l'orchestration nocturne de l'ETL `schema_commun_v2`.

À implémenter en Phase 2 (cf. `dashboard-te/docs/WORKFLOW_ETL_NIGHTLY.md`) :

- `nightly_etl_v1` : flow principal cron 03 h CET
- Tasks : `snapshot_db`, `ingest_sources`, `detect_changes`, `submit_classification_batch`, `wait_classification_batch`, `process_classification_results`, `embed_new_projets`, `cluster_intra_source_strict`, `cluster_incremental_cross_source`, `apply_orphan_dedup`, `cleanup_orphan_clusters`, `write_etl_run_log`

Stack : Prefect 3, Python 3.12, déploiement Scalingo via image Docker GHCR.
