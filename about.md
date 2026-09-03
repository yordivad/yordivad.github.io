---
layout: page
title: About
subtitle: How a degree in the philosophy of formal science turned into a programming language.
permalink: /about/
---

<p>I studied two things at once at Universidad Nacional: computer software engineering, and
the Philosophy of Formal Science. At the time it looked like an indulgence. It turned out to
be the only training that made sense for the work I would spend the next twenty years doing.</p>

<h2>The problem I keep returning to</h2>

<p>Gödel showed that any formal system rich enough to be interesting contains truths it
cannot prove. I have never been able to treat that as a curiosity. If our knowledge is
bounded by the systems we express it in, then every science and every piece of software is
circumstantial — true within a frame, silent about the frame itself. For years I described
myself as a student of Wittgenstein, holding that the only truth is logical truth. I have
since come to think that the axioms and rules need auditing too, which is a more Socratic
position and a less comfortable one: we do not know very much, and we are not going to.</p>

<p>The engineering consequence is direct. If I cannot know a system is right by looking at
it, I want the machine to tell me. That is why my work keeps ending up in the same three
places — <strong>type systems</strong>, which reject bad programs before they run;
<strong>formal specification and model checking</strong>, which prove properties before code
exists; and the <strong>actor model</strong>, which makes concurrency tractable by removing
shared state instead of guarding it.</p>

<h2>What that has looked like in practice</h2>

<p>Enterprise architecture first: TOGAF, domain-driven design, distributed systems at
Accenture, Aurea, Mobilize.Net and TradeStation, where a trading platform's fault tolerance
is not an abstract concern. Then, from 2019, <a href="{{ '/research/' | relative_url }}">MLambda</a>
— an actor framework, then a database built entirely out of actors, then a compiler workbench,
then a language of my own, then an operating system, and now neuro-symbolic AI that puts
modal and temporal logic inside a neural architecture rather than bolting a reasoner onto the
side of one.</p>

<p>The sequence was not planned. Each project turned out to need the one after it. The
database needed a specification language, which needed a parser framework, which became
Genesis; Genesis needed a target language worth compiling to, which became Aleph.</p>

<h2>Outside the machine</h2>

<p>I research more or less continuously — quantum fields, relativity, category theory,
philosophy of language and of mind, neuroscience, modal logic, linear and abstract algebra,
and Kabbalah. The <a href="{{ '/writing/' | relative_url }}">essays</a> are where that goes:
on attention as a currency, on the loss of self, on what it would mean for a consciousness to
read its own documentation.</p>

<p>In recent years the Kabbalistic material has stopped being a research interest and become
something closer to a practice. It has taught me something the formal training could not:
that altruism is not sentiment but structure, and that the point of being able to build
things is to be of use.</p>

<h2>Where to find me</h2>

<ul>
  <li><a href="mailto:{{ site.email }}">{{ site.email }}</a></li>
  <li><a href="{{ site.linkedin }}">LinkedIn</a></li>
  <li><a href="{{ site.github }}">GitHub</a></li>
  <li><a href="{{ '/assets/Roy-Gonzalez-CV.pdf' | relative_url }}">CV (PDF)</a></li>
</ul>
