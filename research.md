---
layout: page
title: Research
eyebrow: MLambda · independent research
subtitle: MLambda — one family of software I have been building since 2019, from the compiler up.
description: A language and its compiler, a database engine, an actor model, an embedded operating system, tensors redefined from scratch, Turing, Max, Neuron and Science.
permalink: /research/
wide: true
---

<p>Everything below is something I designed and built. Each entry links to its page on
<a href="https://www.mlambda.net/products/">www.mlambda.net</a>, where it is documented in detail. The repositories
themselves are private, so the links go to documentation and to the <a href="https://store.mlambda.net/">MLambda
Store</a> rather than to source.</p>

{% assign items = site.projects | sort: "weight" %}
{% for project in items %}{% include project.html project=project %}{% endfor %}

<h2>Across all of it</h2>

<p><strong>Aleph</strong> is where all of this is written now: the compilers, the runtime, the database, the
services and the applications. What was once C# has been rewritten natively and moved aside. Every rule and every
inference is a <strong>Shin</strong> theory, every formula is <strong>Hilbert</strong>, every screen is
<strong>Aphrodite</strong> and every test is <strong>Dream</strong>. Earlier, <strong>Go</strong> came from years of
production back-end work at TradeStation and <a href="https://github.com/mlambda-net/go-reactive">a reactive framework
of its own</a>. The through-line is not the languages: it is compilers, type systems, formal verification, storage
engines and distributed systems, the five things I keep coming back to.</p>

<p><strong>Machine learning and neural networks</strong> run through the newer half of this
work. <a href="https://www.mlambda.net/products/neuron.html">Neuron</a> runs language, vision, speech, diffusion and 3D
models on the tensor engine I wrote, and <a href="https://www.mlambda.net/products/max.html">Max</a> puts them inside
belief–desire–intention agents whose norms are derived by logic. The position behind both is the same: neural
networks are extraordinary at acquiring content and poor at guaranteeing it, so the guarantee has to come from
somewhere else.</p>
