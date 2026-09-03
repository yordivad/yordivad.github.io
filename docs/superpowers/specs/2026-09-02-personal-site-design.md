# Personal site redesign — yordivad.github.io

**Date:** 2026-09-02
**Status:** approved design, ready for implementation planning
**Scope:** this spec covers the personal site only. The MLambda org site
(`mlambda-net/mlambda-net.github.io`) is a separate sub-project with its own spec.

---

## 1. Goal

Turn `yordivad.github.io` from a placeholder into the primary professional artifact for
Roy Gonzalez — legible to an engineering hiring manager in 30 seconds, and deep enough
that a technical reader can verify every claim.

Two audiences, one page set:

- **Hiring managers / recruiters** — need role, seniority, stack, dates, and proof, fast.
- **Technical peers** — need the research to be real: linkable artifacts, honest status.

Positioning chosen: **software architect · distributed systems · language and compiler
research**. Eighteen years of enterprise architecture is the trunk; MLambda, Aleph, and
neuro-symbolic AI are the branch that makes the profile distinctive.

## 2. Current state

| Aspect | Today |
|---|---|
| Landing (`index.md`) | Lorem ipsum |
| `about.md` | Unedited Jekyll/Minima boilerplate |
| `_views/experience.md` | Real, but stale — ends at TradeStation (Jun 2023); misdates Mobilize.Net and DHL |
| `_views/projects.md` | An `# Projects` heading and nothing else |
| `_data/landing.yml` | Ecolodge / Puerto Viejo content from an unrelated project |
| Navigation | JS tab-switcher; no linkable URLs, no content in search results |
| Build | Jekyll + `jekyll-pug` + Bulma + webpack + TypeScript + yarn (10-step CI) |
| Research work | Entirely absent |

## 3. Source of truth

`Roy_Gonzalez_CV_Principal_Architect.pdf` is canonical for roles, dates, and education — it
supersedes `_views/experience.md`, which is out of date.

Career record to be published:

| Role | Company | Dates | Note |
|---|---|---|---|
| Software Developer | QAT Global | Jul 2025 – present | Costa Rica, remote; nearshore for US enterprise clients |
| Software Developer | EagleView | Aug 2023 – Jun 2025 | US, remote; 3D modeling / CAD / GIS |
| Principal Software Engineer | TradeStation | Jan 2020 – Jun 2023 | Mission-critical trading platform |
| Software Developer | Mobilize.Net | Nov 2016 – Jul 2019 | Code-migration products |
| Software Architect | Aurea Software | Jun 2015 – Nov 2016 | Enterprise software, cloud |
| Software Architect | Accenture | Sep 2013 – Jun 2015 | Enterprise consulting |
| Software Engineer | Isthmus (DHL account) | Jan 2010 – Sep 2013 | Logistics integration |
| Software Engineer / Architect | GPI Consultores · GPS Satelite | Mar 2006 – Jan 2010 | Logistics, banking, GPS telematics |

Education — Universidad Nacional, Costa Rica, 2002–2006:
**BS, Computer Software Engineering** and **Bachelor, Philosophy of Formal Science**.

Certification: EPiServer (Jun 2014). Languages: Spanish (native), English (advanced).

The Philosophy of Formal Science degree is the narrative spine of `/about/`: it is the
honest origin of the logic → compilers → neuro-symbolic AI trajectory, and it is the single
most differentiating fact on the site.

## 4. Architecture

### 4.1 Stack

Jekyll on GitHub Pages, with the entire Node layer removed.

**Removed:** `package.json`, `yarn.lock`, `webpack.config.js`, `tsconfig.json`,
`.eslintrc.json`, `assets/ts/`, `script/build`, `compose.yaml`, `skaffold.yaml`,
`_data/landing.yml`, all `.pug` layouts and includes, the `_views` collection.

**Plugins:** reduced from `jekyll-environment-variables`, `jekyll-mermaid`,
`jekyll-liquify`, `jekyll-pug` to `jekyll-seo-tag` and `jekyll-sitemap`.

**Styling:** hand-written Sass compiled by Jekyll's built-in Sass support. Bulma and
`bulma-carousel` are dropped.

**JavaScript:** none. The navigation is four plain links that wrap beneath the name on
narrow viewports — no toggle of any kind. If a later feature genuinely requires script, it
is added as a small inline module, never a bundler.

**Sass module system:** stylesheets use `@use`, never `@import`. Verified 2026-09-02: Dart
Sass emits a deprecation warning for every `@import`, which would violate the warning-free
build required by section 8. `@use` compiles silently.

**Local build:** there is no Ruby toolchain on the development machine, so local builds run
in Docker — `ruby:3.3-slim` with `build-essential` and `git`, and a named volume
(`jekyll-gems`) mounted at `/usr/local/bundle` to cache gems. Verified working 2026-09-02:
first run ~3 min, subsequent builds ~0.6 s. This is a developer convenience only; CI
continues to use `ruby/setup-ruby` directly.

### 4.2 CI

`.github/workflows/site.yml` collapses from ten steps to four: checkout → setup-ruby
(bundler cache) → `bundle exec jekyll build` → `upload-pages-artifact`, then the existing
deploy job. The node setup, yarn install, global pug install, and webpack steps are deleted.
Action versions are bumped (`checkout@v4`, `configure-pages@v5`, `upload-pages-artifact@v3`,
`deploy-pages@v4`) since the pinned v1/v2/v3 actions are deprecated.

### 4.3 Content model

```
_experience/          one file per role; front matter: company, role, dates, location,
                      context, tech[], weight; body = achievement bullets
_projects/            one file per research project; front matter: title, kind, status,
                      version, links[], tech[], featured, weight; body = description
_data/writing.yml     the five essays: title, subtitle, gloss (English), url
_data/publications.yml LinkedIn articles: title, date, url
_layouts/             default.html, page.html, home.html
_includes/            head.html, nav.html, footer.html, role.html, project.html
_sass/                _tokens.scss, _base.scss, _typography.scss, _layout.scss,
                      _components.scss  (dark mode is a token override block inside
                      _tokens.scss, not a separate file)
assets/css/main.scss  front-matter-stubbed entry point
assets/Roy-Gonzalez-CV.pdf
```

Collection documents carry an integer `weight` (ascending = most recent first). Ordering is
applied in Liquid with `{% assign roles = site.experience | sort: "weight" %}`, **not** via a
`sort_by` key in `_config.yml` — `sort_by` is not a native Jekyll collection option, and the
existing `_views` config only appeared to work because those three files happened to sort
correctly by filename.

## 5. Information architecture

Five pages, each with a real URL.

### `/` — Landing

- Name, positioning line, three-sentence intro.
- **Proof strip** — every item verifiable: 18+ years · 8 companies · packages published on
  NuGet · 4 live documentation sites · 5 published essays.
- Three doors: Work · Research · Writing.
- Three or four highlighted items pulled from `_projects` (`featured: true`).

### `/work/` — Career

Reverse-chronological, rendered from `_experience`. Each entry: role, company, dates,
location, one context line, two or three achievement bullets, tech tags in mono.
Followed by education (both degrees), certification, languages, and the CV download link.

### `/research/` — MLambda and independent research

The section the current site lacks entirely. Rendered from `_projects`. Each entry states
what it is, what is actually built, and links to a live artifact.

| Project | Substance | Public artifact |
|---|---|---|
| **Aleph** | Language created by Roy. Native FFI (`c` / `asm` / `llvm` / `wasm`), v1.2.0, 61 tests across 8 suites, one-line installers, SDK with Prelude, Json, Codec, Disposable, Fs, property testing | `genesis.mlambda.net/#/languages/aleph` (syntax reference) |
| **Genesis** | Meta-language workbench and application factory. Parser combinators, EBNF/ASDL → C# generation, TLA+ checker, symbolic algebra, TOGAF · Gilb · Reactive-DDD method, Guimel→Samek→TLA+→build pipeline | `genesis.mlambda.net`, NuGet (11 packages) |
| **MLambda.Actors** | Actor-model framework for .NET: guardian hierarchy, supervision strategies, become/unbecome, stashing, DeathWatch, clustering, gossip, mTLS | `actors.mlambda.net`, NuGet (2.x) |
| **MLambda.Data** | Actor-native distributed database. WAL, memtable/SSTable, B-tree / hash / bloom / inverted indexes, consistent-hash ring, CRDT gossip, TLA+ specs, whitepaper | `data.mlambda.net` |
| **Hilbert / ISLT** | Neuro-symbolic AI. Five logic levels (FOL, relational+GAT, modal, temporal LTL, sortal), fast weights, Hofstadter strange-loop cross-level feedback, genetic evolution of memory populations | none yet — see note below |
| **MLambda.UI** | Backend-agnostic reactive MVVM for C#. Morphe algebra (Geometry × Color × Font), ImGui / Blazor WASM / Avalonia backends | `mvvm.mlambda.net` |
| **MLambda.OS** | Minix-3-inspired x86-64 research microkernel | `mlambda-net.github.io/MLambda.OS` |
| **Automation architectures** | BEAM methodology and the Actor.Agent: business description → formal spec → TLA+ verification → generated, tested, containerised system | Genesis method book on `genesis.mlambda.net` |

**Verified reachable as of 2026-09-02:** `genesis.mlambda.net`, `data.mlambda.net`,
`actors.mlambda.net`, `mvvm.mlambda.net`, `mlambda-net.github.io/MLambda.OS`,
`nuget.org/packages/MLambda.Actors`, `nuget.org/packages/MLambda.Genesis.Parser`.

**Known gap:** `mlambda-net.github.io/MLambda.Aleph/` returns 404, so the one-line installer
URLs printed in the Aleph README do not currently resolve. The site therefore links Aleph to
its syntax reference on the Genesis docs site and **must not** reproduce the installer
commands until that page is published. Publishing an Aleph docs site is separate work,
tracked outside this spec. Hilbert / ISLT likewise has no public URL: it is described on the
page with no outbound link, labelled "research, not yet published".

Languages surfaced across these, honestly attributed: **C#**, **Rust**, **Go**, **Python**,
**C/C++**, TypeScript.

### `/writing/` — Essays and publications

The five essays at `yordivad.github.io/ensayo`, listed with Spanish title, Spanish subtitle,
and a one-line English gloss, linking out to the existing pages. No translation, no
duplicated text. Below them, the LinkedIn publications (Gödel/Turing/AI, Actor Computational
Model, the Torah code piece, and the rest).

### `/about/` — Intellectual biography

A rewrite of `_views/about-me.md`. The existing text has the right material but reads as an
unordered list of interests. Restructured as a trajectory: formal-science training → logic
and the limits of formal systems → language design and compilers → actor systems and
distributed correctness → neuro-symbolic AI. The philosophical and Kabbalistic material
stays, framed as intellectual biography rather than as a creed.

## 6. Visual design

Editorial register, sharing typographic DNA with `yordivad.github.io/ensayo` so the two
properties read as one person's work — but deliberately distinct.

**Type.** EB Garamond for prose, Cormorant Garamond for display — both already in use on the
essays site. IBM Plex Mono for dates, version numbers, tech tags, and project metadata. The
monospace layer is the entire difference between the two sites: it is what makes the essays
site read as a writer's and this one as an engineer's.

**Color.** Carried from the essays: paper `#faf9f6`, ink `#242424`, muted `#6b6b6b`, rule
`#ddd6c8`. The accent departs — deep teal-blue `#0f4c5c`, drawn from the `#002642` already
used in the site's Sass and on the CV — so the sites are siblings, not twins.

**Dark mode.** Full palette defined on `:root`; only tokens are redefined under
`@media (prefers-color-scheme: dark)`. Both themes verified.

**Layout.** Prose measure 680–720px. `/work/` and `/research/` use a two-column grid on wide
viewports (a metadata rail beside the content) collapsing to a single column below 768px.
Portrait: the existing `images/me/roy.svg` illustrated avatar is retained.

**Contact.** Email and LinkedIn only. The phone number currently rendered in `info.pug` is
removed from the public site.

## 7. Content integrity rules

These are binding on implementation:

1. Every research claim links to something a stranger can check — a live documentation site
   or a NuGet package page.
2. No fabricated metrics. No star counts, download counts, user counts, revenue, or
   "trusted by" claims.
3. The MLambda repositories (Genesis, Aleph, Actors, Data, GUI, OS, Actor.Agent) are
   **private**. The site links documentation and packages; it never offers a "view source"
   link that would 404.
4. Status is labelled honestly: "research", "v1.2.0", "in development".
5. Roles and dates come from the CV PDF, not from the stale `_views/experience.md`.

## 8. Verification

- `bundle exec jekyll build` completes with no warnings.
- All five routes render locally and contain their expected content.
- A link-check script confirms every external URL on the site returns HTTP 200 — including
  the four `*.mlambda.net` doc sites, the five essay URLs, and the NuGet package pages.
- Layout verified at 375px, 768px, and 1440px.
- Both light and dark themes verified.
- The GitHub Pages workflow succeeds on push to `main`.

## 9. Out of scope

- The MLambda org site — separate sub-project, separate spec, built after this one.
- Translating the essays into English.
- Any change to the `yordivad/ensayo` repository.
- A blog or CMS on this site; writing lives at `ensayo`.
