---
layout: home
title: Roy Gonzalez
description: Roy Gonzalez — software architect and designer, expert in architecture, DDD and distributed applications. I built a language and its compiler, a database engine and an actor model, and I am building an embedded operating system.
---

<section class="hero">
  <div class="hero__text">
    <span class="eyebrow">Software architect · Heredia, Costa Rica</span>
    <h1>Roy Gonzalez</h1>
    <p class="hero__tagline">I built a programming language and its compiler, a database engine and an actor model, I redefined the tensor from scratch, and I am building an embedded operating system: the whole stack, so that software can be <em>provably</em> correct.</p>
    <ul class="hero__actions">
      <li><a class="btn btn--primary" href="{{ '/work/' | relative_url }}">See the work</a></li>
      <li><a class="btn" href="{{ '/assets/Roy-Gonzalez-CV.pdf' | relative_url }}">Download CV</a></li>
      <li><a class="btn btn--ghost" href="{{ site.linkedin }}">LinkedIn</a></li>
    </ul>
  </div>
  <div class="hero__portrait">
    <div class="portrait"><img src="{{ '/images/me/roy.svg' | relative_url }}" alt="Illustrated portrait of Roy Gonzalez" width="240" height="240"></div>
  </div>
</section>

<div class="prose">

  <p class="lede">Eighteen years of systems that could not be wrong. A whole stack, built so that being right is the default.</p>

  <p>For eighteen years I have designed and built systems that have to stay correct under load: a mission-critical
  trading platform, logistics integration across DHL, enterprise analytics, 3D geospatial tooling, at companies from
  Accenture to TradeStation. I am an expert in <strong>software architecture</strong> (TOGAF, the SEI's quality
  attributes), <strong>domain-driven design</strong> and <strong>distributed applications</strong>: actors, events,
  microservices and the guarantees between them.</p>

  <p>Since 2019 I have been building <a href="{{ site.mlambda }}">MLambda</a>, one family of software written from the
  compiler up:</p>

  <ul>
    <li><strong>I built a language.</strong> <a href="https://www.mlambda.net/products/aleph.html">Aleph</a>, pure and
    strongly typed, and its native compiler, written in Aleph and emitting LLVM for nine targets, from Windows to
    RISC-V and WebAssembly.</li>
    <li><strong>I built a database engine.</strong> <a href="https://www.mlambda.net/products/data/">MLambda.Data</a>, from the
    write-ahead log and SSTables up to the query planner and replication on a ring, every part an actor.</li>
    <li><strong>I created an actor model.</strong> <a href="https://www.mlambda.net/products/actors/">MLambda.Actors</a>,
    addressed by route, so the same actor runs in one process or across a cluster, its behaviour proved in TLA+.</li>
    <li><strong>I am creating an embedded operating system.</strong> <a href="https://www.mlambda.net/products/os.html">MLambda.OS</a>,
    a Minix-style microkernel on RISC-V, with drivers in user space and machines that join into one system.</li>
    <li><strong>I redefined the tensor from scratch.</strong> <a href="https://www.mlambda.net/products/tensor.html">Hilbert.Tensor</a>:
    a tensor is a term of mathematics in a lazy graph, planned, fused and compiled for the GPU, with no BLAS, CUDA
    library or Python underneath.</li>
    <li><strong>And Turing.</strong> <a href="https://www.mlambda.net/products/turing.html">Turing</a> is rational software: it
    takes a description of a project and reasons about its architecture (contexts, sub-systems, aggregates,
    services) before any code exists, every step judged by TOGAF, the SEI and DDD.</li>
  </ul>

  <p>Around those sit <a href="https://www.mlambda.net/products/hilbert.html">Hilbert</a> and
  <a href="https://www.mlambda.net/products/shin.html">Shin</a> for mathematics and logic programming,
  <a href="https://www.mlambda.net/products/max.html">Max</a> agents with the <a href="https://www.mlambda.net/products/neuron.html">Neuron</a>
  engine, the tools that prove and deploy every change, and the applications a company runs, every one of which I also
  design: research, a prototype of every screen, and the built window proved against it side by side.</p>

  <p>My degrees are in software engineering and in the philosophy of formal science, taken together. That pairing is
  the whole of my work: I am interested in what a system <em>provably</em> does, not in what it appears to do.</p>

  <ul class="proof">
    <li><span class="proof__num">18+</span><span class="proof__label">years building software</span></li>
    <li><span class="proof__num">8</span><span class="proof__label">companies, US and Latin America</span></li>
    <li><span class="proof__num">~70</span><span class="proof__label">repositories in the MLambda family</span></li>
    <li><span class="proof__num">9</span><span class="proof__label">targets my compiler emits</span></li>
  </ul>
</div>

<div class="wide">
  <ul class="doors">
    <li><a class="door" href="{{ '/work/' | relative_url }}">
      <h2>Work →</h2>
      <p>Eighteen years, eight companies, and what I actually did at each.</p>
    </a></li>
    <li><a class="door" href="{{ '/research/' | relative_url }}">
      <h2>Research →</h2>
      <p>A language and its compiler, a database engine, an actor model, an operating system, tensors, Turing and Science.</p>
    </a></li>
    <li><a class="door" href="{{ '/writing/' | relative_url }}">
      <h2>Writing →</h2>
      <p>Essays on consciousness, attention and formal systems.</p>
    </a></li>
  </ul>

  <h2>What I am expert in</h2>

  <ul class="doors">
    <li><div class="door">
      <h2>Architecture</h2>
      <p>TOGAF and the SEI's quality attributes, evolutionary and event-driven architecture, made executable in Turing.</p>
    </div></li>
    <li><div class="door">
      <h2>Domain-driven design</h2>
      <p>Bounded contexts, aggregates derived from invariants, commands, events and policies, as languages and code.</p>
    </div></li>
    <li><div class="door">
      <h2>Distributed applications</h2>
      <p>Actors, clusters, replication and consistency, microservices that talk only by events, proved in TLA+.</p>
    </div></li>
    <li><div class="door">
      <h2>Languages and compilers</h2>
      <p>Type systems, optimisation, code generation for LLVM, RISC-V and WebAssembly, logic programming.</p>
    </div></li>
    <li><div class="door">
      <h2>Design</h2>
      <p>Product research, prototypes of every screen and state, design systems and a UI language, windows proved side by side.</p>
    </div></li>
    <li><div class="door">
      <h2>Machine learning</h2>
      <p>Neural engines on the GPU, BDI agents whose decisions are logic and whose perception is neural.</p>
    </div></li>
  </ul>

  <h2>Selected work</h2>

  {% assign featured = site.projects | where: "featured", true | sort: "weight" %}
  <ul class="doors">
  {% for p in featured %}
    <li><a class="door" href="{{ '/research/' | relative_url }}#{{ p.title | slugify }}">
      <h2>{{ p.title }}</h2>
      <p>{{ p.kind }} · {{ p.status }}</p>
    </a></li>
  {% endfor %}
  </ul>
</div>
