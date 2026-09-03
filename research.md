---
layout: page
title: Research
subtitle: MLambda — an independent research programme in language design, distributed systems and neuro-symbolic AI, running since 2019.
description: MLambda — an independent research programme in language design, distributed systems and neuro-symbolic AI, running since 2019.
permalink: /research/
wide: true
---

<p>Everything below is something I designed and built. Where there is a public artifact —
documentation, a published package — it is linked; where there is not, the entry says so.
The repositories themselves are private, so these links go to documentation and packages
rather than to source.</p>

{% assign items = site.projects | sort: "weight" %}
{% for project in items %}{% include project.html project=project %}{% endfor %}

<h2>Across all of it</h2>

<p><strong>C#</strong> is where most of this is written — Genesis, Actors, Data and the UI
framework are .NET 10. <strong>Rust</strong> and <strong>C</strong> carry the microkernel and
the parts of Aleph that touch hardware. <strong>Go</strong> came from years of production
backend work at TradeStation and <a href="https://github.com/mlambda-net/go-reactive">a
reactive framework of its own</a>.
<strong>Python</strong> is the neuro-symbolic research. The through-line is not the
languages — it is compilers, type systems, formal verification and storage engines, which
are the four things I keep coming back to.</p>

<p><strong>Machine learning and neural networks</strong> run through the newer half of this
work. Hilbert is a transformer architecture built from the inside — attention as an adaptive
filter, fast weights updated per input, a MAML inner loop, graph attention for relational
structure, and evolutionary search over memory populations. Genesis's Thinker module puts
LLMs and retrieval-augmented generation to work as knowledge acquisition under a symbolic
reasoner, with a reinforcement learner tuning what the system believes. The position behind
both is the same: neural networks are extraordinary at acquiring content and poor at
guaranteeing it, so the guarantee has to come from somewhere else.</p>
