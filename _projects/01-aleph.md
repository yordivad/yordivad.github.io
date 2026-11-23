---
weight: 1
featured: true
title: "Aleph: a language and its compiler"
kind: "Programming language and native compiler"
status: "released 0.2.62"
tech: ["Compiler design", "Hindley–Milner", "Type classes", "LLVM", "RISC-V", "WebAssembly", "Runtime and GC"]
links:
  - name: "Aleph, in detail"
    url: https://www.mlambda.net/products/aleph.html
  - name: "In the MLambda Store"
    url: https://store.mlambda.net/
images:
  - src: /images/work/aleph-terminal.png
    alt: "Aleph in the terminal"
---
I designed and built **Aleph**, a pure, lazy, Hindley–Milner typed language, and its **native compiler**, which is
written in Aleph itself. The compiler is a pipeline of small phases: a front end generated from its grammar, type
inference with traits and associated types, a pattern compiler, fifteen optimisation passes (inlining,
specialisation, defunctionalisation, tail-call contification), and LLVM code generation for **nine targets**:
Windows, Linux (glibc and static musl), ARM64, Android, macOS, RISC-V Linux and bare metal, and WebAssembly for the
browser.

What the compiler would usually hard-code (which platforms exist, how a test run is planned, how packages resolve)
is decided by logic rules instead. Its runtime, from the heap and the tracing collector to fibers, STM and a native
TLS 1.3, is written in Aleph too. Every MLambda program, from the database to the apps, is built with it.
