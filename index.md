---
layout: home
title: Roy Gonzalez
description: Roy Gonzalez — software architect with 18 years in distributed systems, and the researcher behind MLambda, Aleph, Genesis and Hilbert.
---

<section class="hero">
  <div class="hero__text">
    <span class="eyebrow">Software architect · Heredia, Costa Rica</span>
    <h1>Roy Gonzalez</h1>
    <p class="hero__tagline">I build distributed systems that have to stay <em>provably</em> correct — and the languages, compilers and neuro-symbolic tools that make that the default.</p>
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

  <p class="lede">Eighteen years of systems that could not be wrong. One research programme about making that ordinary.</p>

  <p>For eighteen years I have built systems that have to stay correct under load — a
  mission-critical trading platform, logistics integration across DHL, enterprise analytics,
  3D geospatial tooling — mostly in C# and Go, on Kubernetes, at companies from
  Accenture to TradeStation.</p>

  <p>Alongside that I run <a href="{{ '/research/' | relative_url }}">MLambda</a>, an
  independent research programme. I designed and implemented <strong>Aleph</strong>, a
  functional language with a native foreign-function interface; <strong>Genesis</strong>, a
  compiler workbench that model-checks a specification before it builds anything from it; an
  actor-native distributed database; and Hilbert, a neuro-symbolic transformer architecture
  that reasons across five systems of logic and learns from each input without retraining.</p>

  <p>My degrees are in software engineering and in the philosophy of formal science, taken
  together. That pairing is the whole of my work: I am interested in what a system
  <em>provably</em> does, not in what it appears to do.</p>

  <ul class="proof">
    <li><span class="proof__num">18+</span><span class="proof__label">years building software</span></li>
    <li><span class="proof__num">8</span><span class="proof__label">companies, US and Latin America</span></li>
    <li><span class="proof__num">4</span><span class="proof__label">documentation sites at mlambda.net</span></li>
    <li><span class="proof__num">5</span><span class="proof__label">published essays</span></li>
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
      <p>A language, a compiler workbench, a distributed database, a microkernel, and neuro-symbolic AI.</p>
    </a></li>
    <li><a class="door" href="{{ '/writing/' | relative_url }}">
      <h2>Writing →</h2>
      <p>Essays on consciousness, attention and formal systems.</p>
    </a></li>
  </ul>

  <h2>Selected research</h2>

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
