---
weight: 3
featured: true
title: MLambda.Actors
kind: Actor-model framework
status: v2.x on NuGet
tech: [C#, .NET, System.Reactive, gRPC, Kubernetes, mTLS]
links:
  - name: Documentation
    url: https://actors.mlambda.net
  - name: NuGet
    url: https://www.nuget.org/packages/MLambda.Actors
---

A reactive actor framework for .NET: a root/system/user/temp guardian hierarchy with
parent–child supervision, one-for-one and all-for-one strategies, runtime behaviour
switching, message stashing and replay, death-watch, and full lifecycle hooks. Every
response is an `IObservable<T>`.

Beyond the single process it clusters — gossip-based membership, mTLS between nodes, and
gRPC transport — and the same actor code runs standalone, hybrid or clustered depending on
configuration alone.
