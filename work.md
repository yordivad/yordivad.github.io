---
layout: page
title: Work
eyebrow: Experience
subtitle: Eighteen years of architecture and engineering — trading platforms, logistics integration, enterprise products and 3D geospatial tooling.
description: Eighteen years of architecture and engineering — trading platforms, logistics integration, enterprise products and 3D geospatial tooling.
permalink: /work/
wide: true
---

<p><a class="btn" href="{{ '/assets/Roy-Gonzalez-CV.pdf' | relative_url }}">Download CV (PDF)</a></p>

{% assign roles = site.experience | sort: "weight" %}
{% for role in roles %}{% include role.html role=role %}{% endfor %}

<h2>Education</h2>

<div class="grid entry">
  <div class="entry__meta"><span class="entry__dates">2002 – 2006</span></div>
  <div class="entry__body">
    <p><strong>BS, Computer Software Engineering</strong><br>
    <strong>Bachelor, Philosophy of Formal Science</strong><br>
    <span class="muted">Universidad Nacional, Costa Rica</span></p>
    <p class="muted">Two degrees taken together — the engineering one taught me to build
    systems, the formal-science one taught me to ask what a system provably does. Everything
    on the <a href="{{ '/research/' | relative_url }}">research</a> page comes out of that pairing.</p>
  </div>
</div>

<h2>What I work in</h2>

<ul>
  <li><strong>Architecture</strong> — TOGAF, the SEI's quality attributes, domain-driven design, event-driven and actor-model systems, microservices, evolutionary architecture.</li>
  <li><strong>Distributed applications</strong> — actor models and clusters, replication and consistency, sagas, integration by events, Kubernetes deployments per client.</li>
  <li><strong>Design</strong> — product research, prototypes of every screen and state, design systems, a UI language of my own, and windows proved against their prototypes side by side.</li>
  <li><strong>Languages</strong> — Aleph (my own) first; C# and .NET, Go, Rust, Python and C; TypeScript and React where the work reaches the browser.</li>
  <li><strong>Compilers and formal methods</strong> — type systems, optimisation, code generation to LLVM, RISC-V and WebAssembly, logic programming, TLA+ and Z specification, model checking.</li>
  <li><strong>Systems</strong> — a database engine, an actor runtime, an embedded operating system on RISC-V, a tensor engine on the GPU.</li>
  <li><strong>Machine learning and neural networks</strong> — a neural engine on the GPU, transformers, diffusion and speech models, BDI agents, LLM integration and retrieval-augmented generation; the neuro-symbolic work on the <a href="{{ '/research/' | relative_url }}">research</a> page.</li>
  <li><strong>Data</strong> — PostgreSQL, MongoDB, SQL Server, Apache Spark, Mondrian, Analysis Services; and a distributed database of my own.</li>
  <li><strong>Platform</strong> — Kubernetes, Helm, Terraform, AWS, Docker, CI/CD, observability.</li>
</ul>

<h2>Also</h2>

<ul>
  <li><strong>Certification</strong> — EPiServer, June 2014.</li>
  <li><strong>Languages</strong> — Spanish (native), English (advanced; ten years working with US teams).</li>
  <li><strong>Based in</strong> Heredia, Costa Rica. Remote since 2015.</li>
</ul>
