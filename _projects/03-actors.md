---
weight: 3
featured: true
title: "MLambda.Actors: an actor model"
kind: "Actor model and cluster runtime"
status: "in production under every MLambda service"
tech: ["Actor model", "Supervision", "Gossip", "CRDTs", "Phi accrual failure detection", "Sagas", "TLA+"]
links:
  - name: "MLambda.Actors"
    url: https://www.mlambda.net/products/actors/
---
I created an **actor model** whose actors are addressed by route rather than by location, so the same actor runs
unchanged in one process, in a cluster or on a node that is both. It has supervision trees, behaviour switching,
death watch, timers and circuit breakers, sagas with compensations, gossip membership with phi accrual failure
detection, a CRDT route table, and encrypted frames between nodes. Its behaviour (delivery, routing, supervision,
gossip) is specified in TLA+ and model-checked. It is the runtime of every service I build.
