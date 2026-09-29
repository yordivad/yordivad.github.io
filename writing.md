---
layout: page
title: Writing
eyebrow: Essays
subtitle: Essays on consciousness, attention, formal systems and what it costs to live unexamined, in Spanish with an English note on each; and academic papers on projection, mind and machines, in English and Spanish.
description: Essays on consciousness, attention, formal systems and what it costs to live unexamined, in Spanish with an English note on each; and academic papers on projection, mind and machines, in English and Spanish.
permalink: /writing/
---

<h2>Essays</h2>

<p class="muted">Published at <a href="{{ site.data.writing.base }}/">{{ site.data.writing.base | remove: "https://" }}</a>. Written in Spanish.</p>

{% for e in site.data.writing.essays %}
<article class="essay">
  <h3 class="essay__title" lang="es"><a href="{{ site.data.writing.base }}/{{ e.slug }}.html">{{ e.title }}</a></h3>
  <p class="essay__subtitle" lang="es">{{ e.subtitle }}</p>
  <p class="essay__gloss">{{ e.gloss }}</p>
</article>
{% endfor %}

<h2>Papers</h2>

<p class="muted">Academic papers, typeset for print. Each in English and in Spanish, as PDF, at <a href="{{ site.data.writing.base }}/">{{ site.data.writing.base | remove: "https://" }}</a>.</p>

{% for p in site.data.writing.papers %}
<article class="essay">
  <h3 class="essay__title"><a href="{{ site.data.writing.base }}/papers/{{ p.slug }}-en.pdf">{{ p.title_en }}</a></h3>
  <p class="essay__subtitle">{{ p.subtitle }}</p>
  <p class="essay__gloss">{{ p.gloss }}</p>
  <p class="essay__links"><a href="{{ site.data.writing.base }}/papers/{{ p.slug }}-en.pdf">English (PDF)</a>
    · <a href="{{ site.data.writing.base }}/papers/{{ p.slug }}-es.pdf" lang="es">{{ p.title_es }} — español (PDF)</a></p>
</article>
{% endfor %}

<h2>Articles</h2>

<p class="muted">Published on <a href="{{ site.data.publications.index }}">LinkedIn</a>.</p>

<ul>
{% for a in site.data.publications.articles %}
  <li>{% if a.url %}<a href="{{ a.url }}">{{ a.title }}</a>{% else %}{{ a.title }}{% endif %}
  <span class="muted">— {{ a.date }}</span></li>
{% endfor %}
</ul>
