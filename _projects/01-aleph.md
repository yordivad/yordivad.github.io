---
weight: 1
featured: true
title: Aleph
kind: Programming language
status: v1.2.0
tech: [Compiler design, Type systems, FFI, LLVM, WebAssembly]
links:
  - name: Syntax reference
    url: https://genesis.mlambda.net/#/languages/aleph
---

A functional programming language I designed and implemented — grammar, type checker, code
generation and standard library. Aleph compiles to native code and calls directly into C,
assembly, LLVM IR and WebAssembly through a native foreign-function interface, so a program
can reach a POSIX syscall without a runtime standing in the way.

The SDK covers errors and recovery policy, resource disposal with full propagation, a JSON
algebraic data type with per-type codecs, equality dictionaries, a filesystem module that
discriminates real error cases through `access(2)`, and a test framework with TAP output and
property testing. Sixty-one tests across eight suites.
