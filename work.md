---
layout: page
title: Work
subtitle: Eighteen years of architecture and engineering — trading platforms, logistics integration, enterprise products and 3D geospatial tooling.
description: Eighteen years of architecture and engineering — trading platforms, logistics integration, enterprise products and 3D geospatial tooling.
permalink: /work/
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
  <li><strong>Architecture</strong> — TOGAF, domain-driven design, event-driven and actor-model systems, microservices, evolutionary architecture.</li>
  <li><strong>Languages</strong> — C# and .NET first; Go, Rust, Python and C; TypeScript and React where the work reaches the browser.</li>
  <li><strong>Compilers and formal methods</strong> — parser combinators, type systems, code generation to LLVM and WebAssembly, TLA+ and Z specification, model checking.</li>
  <li><strong>Machine learning and neural networks</strong> — transformer architectures, graph attention, fast weights and meta-learning, LLM integration and retrieval-augmented generation; the neuro-symbolic work on the <a href="{{ '/research/' | relative_url }}">research</a> page.</li>
  <li><strong>Data</strong> — PostgreSQL, MongoDB, SQL Server, Apache Spark, Mondrian, Analysis Services; and a distributed database of my own.</li>
  <li><strong>Platform</strong> — Kubernetes, Helm, Terraform, AWS, Docker, CI/CD, observability.</li>
</ul>

<h2>Also</h2>

<ul>
  <li><strong>Certification</strong> — EPiServer, June 2014.</li>
  <li><strong>Languages</strong> — Spanish (native), English (advanced; ten years working with US teams).</li>
  <li><strong>Based in</strong> Heredia, Costa Rica. Remote since 2015.</li>
</ul>
