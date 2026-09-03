---
weight: 2
featured: true
title: Genesis
kind: Compiler workbench and application factory
status: published on NuGet
tech: [C#, .NET 10, Parser combinators, EBNF, ASDL, TLA+, Symbolic algebra, LLM integration, RAG, Reinforcement learning]
links:
  - name: Documentation
    url: https://genesis.mlambda.net
  - name: NuGet
    url: https://www.nuget.org/packages/MLambda.Genesis.Parser
  - name: All Genesis packages
    url: https://www.nuget.org/packages?q=MLambda.Genesis
---

Eleven packages for building languages: a monadic parser-combinator library with LINQ
support, an EBNF grammar compiler that emits executable combinators, an ASDL schema parser
that generates C# AST types, a forward-chaining rule language, a TLA+ checker with LTL
evaluation, and a symbolic algebra system that differentiates, integrates, expands and
solves.

On top of that sits an application factory. A domain description becomes a formal
specification, the specification is model-checked before anything is built, and the build
follows from the specification rather than from a prompt. The method borrows TOGAF for what
exists, Gilb's Planguage for what must hold, and reactive DDD for what to build — with one
rule doing the real work: **the language model acquires content, rules admit it, and what is
missing is derived rather than guessed.**

The reasoning layer, Thinker, is where the neural and the symbolic meet: pluggable LLM
providers and retrieval-augmented generation acquire knowledge, a deterministic grammar
formalises it, a forward-chaining engine proves over it, and a symbolic reinforcement learner
improves what is believed over time. The LLM never answers — only proofs do.
