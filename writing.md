---
layout: page
title: Writing
eyebrow: Essays
subtitle: Essays on consciousness, attention, formal systems and what it costs to live unexamined. In Spanish, with an English note on each.
description: Essays on consciousness, attention, formal systems and what it costs to live unexamined. In Spanish, with an English note on each.
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

<h2>Articles</h2>

<p class="muted">Published on <a href="{{ site.data.publications.index }}">LinkedIn</a>.</p>

<ul>
{% for a in site.data.publications.articles %}
  <li>{% if a.url %}<a href="{{ a.url }}">{{ a.title }}</a>{% else %}{{ a.title }}{% endif %}
  <span class="muted">— {{ a.date }}</span></li>
{% endfor %}
</ul>
