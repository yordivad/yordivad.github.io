---
weight: 5
featured: true
title: Hilbert — Incremental Strange Loop Transformer
kind: Neuro-symbolic artificial intelligence
status: research, not yet published
tech: [Python, PyTorch, Transformers, Graph attention networks, Fast weights, Meta-learning (MAML), Modal logic, Temporal logic]
---

Neuro-symbolic AI built on a claim worth testing: a transformer's attention layer is
mathematically an adaptive filter with feedback, which means it can be made to *learn from
each input without retraining*.

Five levels, each carrying a different logic — first-order, relational with graph attention,
modal with a multi-world attention matrix, temporal with LTL and dual causal/bidirectional
attention, and sortal with ontology-biased attention. They are connected by fast weights and
episodic memory, and by a strange loop after Hofstadter that feeds the top level's error
signal back down to refine the lower four at inference time. A genetic layer maintains
populations of fast-weight configurations, so evolutionary exploration and gradient descent
run against each other.

This is active research. There is no public release yet.
