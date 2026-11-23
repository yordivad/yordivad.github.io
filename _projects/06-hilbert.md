---
weight: 6
featured: false
title: "Hilbert and Shin: mathematics and logic programming"
kind: "Languages for mathematics and logic"
status: "in use across MLambda"
tech: ["Rewriting", "Computer algebra", "Proof kernel", "Datalog and Prolog", "Tabling", "Stratified negation", "Abduction"]
links:
  - name: "Hilbert"
    url: https://www.mlambda.net/products/hilbert.html
  - name: "Hilbert Shin"
    url: https://www.mlambda.net/products/shin.html
images:
  - src: /images/science/circuit.png
    alt: "Quantum mechanics as Hilbert laws"
  - src: /images/science/learn-chapter.png
    alt: "A chapter that teaches as it computes"
  - src: /images/science/inspector.png
    alt: "The state, inspected"
---
**Hilbert** is the language where MLambda's mathematics lives: a model is a set of laws, computing is rewriting by
them, and the compiler turns them into native code. **Shin** is its logic-programming dialect: rules and facts with
semi-naive forward chaining, tabled resolution, stratified negation, modal operators, aggregation and abduction. Every
inference in every MLambda system, from the compiler's platforms to a mail guard's verdict, is a Shin rule.
