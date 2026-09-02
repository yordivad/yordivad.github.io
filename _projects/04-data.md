---
weight: 4
featured: false
title: MLambda.Data
kind: Distributed database
status: in development
tech: [C#, .NET 10, LSM storage, CRDT, Consistent hashing, TLA+]
links:
  - name: Documentation
    url: https://data.mlambda.net
---

A distributed database in which every component is an actor — storage, indexes, filesystem,
query planning and authorisation alike. There is no shared mutable state and there are no
mutexes in the data path; correctness comes from message ordering rather than from locks.

The storage engine is log-structured: write-ahead log with CRC32 integrity, an in-memory
sorted memtable, immutable SSTables, and background compaction under a throttle. Indexes
cover sorted range queries, O(1) point lookups, probabilistic existence checks and full-text
search. The cluster layer places data on a consistent hash ring and replicates metadata
through CRDT gossip. The consistency model is specified in TLA+ and model-checked, not
merely described in prose.
