---
weight: 2
featured: true
title: "MLambda.Data: a database engine"
kind: "Distributed database engine"
status: "in production under MLambda's services"
tech: ["LSM storage", "WAL", "B-tree, hash, bloom and inverted indexes", "Query planning", "Consistent hashing", "TLA+"]
links:
  - name: "MLambda.Data"
    url: https://www.mlambda.net/products/data/
images:
  - src: /images/work/data-overview.png
    alt: "The database's admin"
---
I built a **database engine** from the storage up: a write-ahead log, memtables, SSTables with bloom blocks and
compaction, four kinds of index, a query planner and joins, schema evolution and constraints, and replication on a
consistent-hash ring with One, Quorum or All per request. It is **actor-native**: every component is an actor, the
actor framework is the cluster, and a query is a typed value the compiler checks, so there is no query text to parse
or inject. Its consistency model is a TLA+ specification, model-checked.
