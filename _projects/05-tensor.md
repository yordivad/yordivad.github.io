---
weight: 5
featured: true
title: "Hilbert.Tensor: tensors redefined from scratch"
kind: "Tensor engine on the GPU"
status: "in use by every numeric part of MLambda"
tech: ["Lazy graphs", "Einstein summation", "Kernel fusion", "Cost-based planning", "GPU code generation", "f64"]
links:
  - name: "Hilbert.Tensor"
    url: https://www.mlambda.net/products/tensor.html
---
I **redefined the tensor from scratch**. A tensor is a term, not a buffer: an operation adds a node of mathematics
to a lazy graph, so the graph can be rewritten by laws before it runs, and gradients come from the same calculus
laws as the rest of Hilbert rather than a separate autograd. A cost-based planner decides per graph whether it runs
at once on the host or is cut into fused kernels for the GPU, which are generated as LLVM IR and compiled by the
system's own driver. No BLAS, no CUDA library, no Python. When the planner landed, a quantum bond computation fell
from 4 216 s to 0.375 s.
