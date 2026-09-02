---
weight: 8
featured: false
title: Automation architectures — the BEAM method
kind: Methodology and tooling
status: in use across MLambda
tech: [Z notation, TLA+, Reqnroll, Docker, Kubernetes]
links:
  - name: The method
    url: https://genesis.mlambda.net
---

The pipeline that produces the systems above, and the reason they get built at the pace they
do. A business domain is decomposed into a knowledge graph, turned into an actor topology
with an explicit supervision hierarchy, refined into a purified Z specification, and
model-checked in TLA+ — and only then implemented, with the tests derived from the model
rather than invented afterwards.

Four claims hold it together: a missing requirement is an unfulfilled obligation to be
deduced rather than guessed; a waiver is a belief and closes nothing until a person grounds
it; the aggregation is derivable, because the connected components of the invariant graph
*are* the aggregates; and design estimates while verification measures — the difference
between them is what the method learns.
