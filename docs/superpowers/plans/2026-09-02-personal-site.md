# Personal Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `yordivad.github.io` as a plain-Jekyll, five-page professional site that presents Roy Gonzalez's 18-year architecture career alongside the MLambda research programme, with every claim linked to a verifiable public artifact.

**Architecture:** Strip the Node/Pug/Bulma/webpack toolchain entirely, leaving Jekyll + hand-written Sass on GitHub Pages with zero JavaScript. Content lives in two collections (`_experience`, `_projects`) and two data files (`writing`, `publications`), rendered by three layouts into five real URLs. A `script/check` harness builds the site in Docker and asserts on the generated `_site` output — this is the test suite, and every task extends it before implementing.

**Tech Stack:** Jekyll 4.3, Dart Sass (via `sass-embedded`, `@use` only), Liquid, `jekyll-seo-tag`, `jekyll-sitemap`, Docker (`ruby:3.3-slim`) for local builds, GitHub Actions for deploy.

**Spec:** [docs/superpowers/specs/2026-09-02-personal-site-design.md](../specs/2026-09-02-personal-site-design.md)

## Global Constraints

These apply to every task. Copied verbatim from the spec.

- **No JavaScript.** The mobile navigation is CSS-only (checkbox toggle). No bundler, ever.
- **Sass uses `@use`, never `@import`.** Dart Sass emits a deprecation warning for every `@import`, and the build must be warning-free.
- **Collection ordering is done in Liquid** — `{% assign roles = site.experience | sort: "weight" %}` — never via a `sort_by` key in `_config.yml`, which is not a native Jekyll option.
- **Every research claim links to something a stranger can check** — a live documentation site or a NuGet package page.
- **No fabricated metrics.** No star counts, download counts, user counts, revenue, or "trusted by" claims.
- **MLambda repos are private** (Genesis, Aleph, Actors, Data, GUI, OS, Actor.Agent). Link documentation and packages; never emit a "view source" link that would 404.
- **Do not reproduce the Aleph installer commands.** `mlambda-net.github.io/MLambda.Aleph/` returns 404, so `curl -fsSL .../install.sh | sh` does not resolve. Link the syntax reference on `genesis.mlambda.net` instead.
- **Status labels are honest**: "research", "v1.2.0", "in development".
- **Roles and dates come from the CV PDF**, not from the stale `_views/experience.md`.
- **Contact is email + LinkedIn only.** The phone number `+506 71105675` must not appear anywhere in `_site`.
- **Exact palette:** paper `#faf9f6`, ink `#242424`, muted `#6b6b6b`, rule `#ddd6c8`, accent `#0f4c5c`.
- **Exact counts for the proof strip:** 18+ years, 8 companies, 4 documentation sites on mlambda.net, 5 published essays.
- Commit directly on `main`. No feature branches. No `Co-Authored-By` trailer.

---

## File Structure

**Deleted** (dead toolchain and leftovers from unrelated projects):

| Path | Why |
|---|---|
| `package.json`, `yarn.lock`, `webpack.config.js`, `tsconfig.json`, `.eslintrc.json` | Node layer removed |
| `assets/ts/` | TypeScript entry points and the tab-switcher |
| `assets/css/app.scss`, `assets/css/_library.scss`, `assets/css/_reset.scss`, `assets/css/pages/` | Bulma-based styles |
| `_includes/default.pug`, `footer.pug`, `header.pug`, `info.pug`, `meta.pug` | Pug templates |
| `_layouts/home.pug`, `page.pug`, `resume.pug`, `view.pug` | Pug layouts |
| `_views/` | Collection replaced by real pages |
| `_data/landing.yml`, `_data/menu.yaml` | Ecolodge/Puerto Viejo content from another project |
| `compose.yaml` | References `./docker/doc.docker`, which does not exist in this repo |
| `skaffold.yaml` | References `ghcr.io/mlambda-net/ecolounge` and a `Dockerfile`, neither of which exists |
| `makefile` | Calls `./script/debug`, which does not exist |
| `script/build`, `script/serve`, `script/deploy` | zsh scripts with hardcoded `${HOME}/gems/bin` paths |

**Created / rewritten:**

| Path | Responsibility |
|---|---|
| `Gemfile` | Jekyll 4.3 + two plugins |
| `_config.yml` | Site metadata, collections, sass config, plugins |
| `script/check` | Build + assertion harness (the test suite) |
| `script/serve` | Local dev server via Docker |
| `_layouts/default.html` | HTML skeleton, header, footer |
| `_layouts/page.html` | Prose page inside a measured column |
| `_layouts/home.html` | Landing page, full-width sections |
| `_includes/head.html` | `<head>`: meta, fonts, SEO tag |
| `_includes/nav.html` | Site navigation, CSS-only mobile toggle |
| `_includes/footer.html` | Contact links, colophon |
| `_includes/role.html` | Renders one `_experience` document |
| `_includes/project.html` | Renders one `_projects` document |
| `_sass/_tokens.scss` | Palette, type stacks, spacing, measure — as CSS custom properties, light + dark |
| `_sass/_base.scss` | Reset, document defaults |
| `_sass/_typography.scss` | Headings, prose, mono treatment |
| `_sass/_layout.scss` | Page shell, header, footer, two-column grid |
| `_sass/_components.scss` | Proof strip, doors, role entry, project entry, tags, buttons |
| `assets/css/main.scss` | Entry point (front-matter stubbed) |
| `_experience/*.md` | 8 role documents |
| `_projects/*.md` | 8 project documents |
| `_data/writing.yml` | 5 essays |
| `_data/publications.yml` | LinkedIn articles |
| `index.md` | Landing |
| `work.md` | `/work/` |
| `research.md` | `/research/` |
| `writing.md` | `/writing/` |
| `about.md` | `/about/` |
| `404.html` | Rewritten to match the design |
| `assets/Roy-Gonzalez-CV.pdf` | Downloadable CV |
| `.github/workflows/site.yml` | 4-step build + deploy |

**Kept unchanged:** `images/me/roy.svg`, `images/favicon-32x32.png`, `images/favicon-32x32.svg`, `images/social/*.png`, `.gitignore`, `docs/superpowers/`.

---

## Task 1: Strip the toolchain, establish the Jekyll build and check harness

Removes every Node artifact and dead config file, replaces the Pug scaffolding with a minimal HTML layout, and creates `script/check` — the harness every later task extends. Ends with a site that builds clean and serves one page.

**Files:**
- Create: `script/check`, `script/serve`, `_layouts/default.html`, `_includes/head.html`
- Modify: `_config.yml`, `Gemfile`, `index.md`, `404.html`
- Delete: `package.json`, `yarn.lock`, `webpack.config.js`, `tsconfig.json`, `.eslintrc.json`, `compose.yaml`, `skaffold.yaml`, `makefile`, `script/build`, `script/deploy`, `assets/ts/`, `assets/css/`, `_includes/*.pug`, `_layouts/*.pug`, `_views/`, `_data/landing.yml`, `_data/menu.yaml`, `about.md`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `script/check` with shell functions `build`, `assert_file <path>`, `assert_contains <path> <string>`, `assert_absent <path> <string>`, and counters `PASS`/`FAIL`. Later tasks append assertion lines to the `# --- assertions ---` section. `_layouts/default.html` defines blocks later layouts extend via `{{ content }}`. Site config exposes `site.title`, `site.email`, `site.linkedin`, `site.github`, `site.description`.

- [ ] **Step 1: Write the failing check harness**

Create `script/check`:

```bash
#!/usr/bin/env bash
# Build the site and assert on the generated output. This is the test suite.
#   ./script/check          build + content assertions
#   ./script/check --links  also verify every external URL returns 200
set -uo pipefail
cd "$(dirname "$0")/.."

IMAGE=ruby:3.3-slim
VOLUME=jekyll-gems
PASS=0
FAIL=0

# The repo is never bind-mounted: Docker Desktop on the dev machine cannot mount
# the D: drive. Source is copied into a throwaway container and _site copied out.
build() {
  echo "==> building site (docker: $IMAGE, source copied in — no bind mount)"
  docker volume create "$VOLUME" >/dev/null
  rm -rf _site
  local cid
  cid=$(MSYS_NO_PATHCONV=1 docker create \
    -v "$VOLUME":/usr/local/bundle \
    -w /srv/jekyll "$IMAGE" \
    sh -c 'apt-get update -qq >/dev/null 2>&1 \
           && apt-get install -y -qq build-essential git >/dev/null 2>&1 \
           && bundle install --quiet \
           && bundle exec jekyll build')
  tar --exclude=.git --exclude=_site --exclude=.superpowers --exclude=.jekyll-cache -cf - . \
    | MSYS_NO_PATHCONV=1 docker cp - "$cid":/srv/jekyll
  MSYS_NO_PATHCONV=1 docker start -a "$cid" 2>&1 | tee /tmp/jekyll-build.log
  local status=${PIPESTATUS[0]}
  MSYS_NO_PATHCONV=1 docker cp "$cid":/srv/jekyll/_site ./_site >/dev/null 2>&1 || true
  MSYS_NO_PATHCONV=1 docker cp "$cid":/srv/jekyll/Gemfile.lock ./Gemfile.lock >/dev/null 2>&1 || true
  docker rm "$cid" >/dev/null
  if [ "$status" -ne 0 ]; then
    bad "build exited $status"
  elif grep -qiE "(Error|Warning|DEPRECATION|Liquid Exception)" /tmp/jekyll-build.log; then
    bad "build emitted warnings or errors (see /tmp/jekyll-build.log)"
  else
    ok "build clean"
  fi
}

ok()   { echo "PASS  $1"; PASS=$((PASS + 1)); }
bad()  { echo "FAIL  $1"; FAIL=$((FAIL + 1)); }

assert_file() {
  if [ -f "_site/$1" ]; then ok "exists: $1"; else bad "missing: $1"; fi
}

assert_contains() {
  if [ -f "_site/$1" ] && grep -qF -- "$2" "_site/$1"; then
    ok "$1 contains '$2'"
  else
    bad "$1 does NOT contain '$2'"
  fi
}

assert_absent() {
  if [ -f "_site/$1" ] && grep -qF -- "$2" "_site/$1"; then
    bad "$1 must NOT contain '$2'"
  else
    ok "$1 free of '$2'"
  fi
}

assert_absent_everywhere() {
  if grep -rqF --binary-files=without-match -- "$1" _site 2>/dev/null; then
    bad "_site must NOT contain '$1' anywhere"
  else
    ok "_site free of '$1'"
  fi
}

check_links() {
  echo "==> checking external links"
  grep -rhoE 'href="https?://[^"]+"' _site \
    | sed -E 's/href="//; s/"$//' \
    | grep -vE 'fonts\.(googleapis|gstatic)\.com' \
    | sort -u \
    | while read -r url; do
        code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 20 "$url")
        if [ "$code" = "200" ]; then
          echo "PASS  $code $url"
        else
          echo "FAIL  $code $url"
        fi
      done
}

build

# --- assertions ---
assert_file "index.html"
assert_contains "index.html" "Roy Gonzalez"
assert_absent "index.html" "Lorem markdownum"
assert_absent_everywhere "71105675"

if [ "${1:-}" = "--links" ]; then
  check_links
fi

echo
echo "==> $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
```

Create `script/serve` (no live reload — the site is rebuilt by `script/check` and served
statically, because the repo cannot be bind-mounted on the dev machine):

```bash
#!/usr/bin/env bash
# Build, then serve _site on http://localhost:4000 (no live reload).
set -euo pipefail
cd "$(dirname "$0")/.."
./script/check
python -m http.server 4000 -d _site
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
chmod +x script/check script/serve
./script/check
```

Expected: FAIL. The build errors out because `_config.yml` still requires `jekyll-pug` and the `.pug` layouts, and `index.html` contains "Lorem markdownum".

- [ ] **Step 3: Delete the Node toolchain and dead config**

```bash
git rm -r --cached node_modules 2>/dev/null || true
rm -rf assets/ts assets/css _views node_modules
rm -f package.json yarn.lock webpack.config.js tsconfig.json .eslintrc.json
rm -f compose.yaml skaffold.yaml makefile
rm -f script/build script/deploy
rm -f _includes/default.pug _includes/footer.pug _includes/header.pug \
      _includes/info.pug _includes/meta.pug
rm -f _layouts/home.pug _layouts/page.pug _layouts/resume.pug _layouts/view.pug
rm -f _data/landing.yml _data/menu.yaml about.md
```

- [ ] **Step 4: Write the new Gemfile**

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end
```

Then delete the stale lockfile so it is regenerated against the new dependency set:

```bash
rm -f Gemfile.lock
```

- [ ] **Step 5: Write the new `_config.yml`**

```yaml
title: Roy Gonzalez
tagline: Software architect · distributed systems · language and compiler research
email: yordivad@gmail.com
description: >-
  Roy Gonzalez — software architect with 18 years building distributed systems,
  and the independent researcher behind MLambda: the Aleph language, the Genesis
  compiler workbench, an actor-native database, and neuro-symbolic AI.
url: "https://yordivad.github.io"
baseurl: ""
lang: en

linkedin: https://www.linkedin.com/in/yordivad/
github: https://github.com/yordivad
mlambda: https://mlambda.net
essays: https://yordivad.github.io/ensayo/

permalink: pretty

collections:
  experience:
    output: false
  projects:
    output: false

sass:
  sass_dir: _sass
  style: compressed

plugins:
  - jekyll-seo-tag
  - jekyll-sitemap

exclude:
  - Gemfile
  - Gemfile.lock
  - README.md
  - LICENSE
  - script
  - docs
  - vendor
  - .idea
```

- [ ] **Step 6: Write the minimal layout and head**

`_includes/head.html`:

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/png" href="{{ '/images/favicon-32x32.png' | relative_url }}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
{%- seo -%}
```

`_layouts/default.html`:

```html
<!DOCTYPE html>
<html lang="{{ site.lang | default: 'en' }}">
<head>
  {%- include head.html -%}
</head>
<body>
  <main id="content">
    {{ content }}
  </main>
</body>
</html>
```

- [ ] **Step 7: Replace the lorem-ipsum landing with a stub, and unbreak `404.html`**

`index.md`:

```markdown
---
layout: default
title: Roy Gonzalez
---

# Roy Gonzalez
```

`404.html` currently declares `layout: page`, which resolved to the now-deleted
`_layouts/page.pug`. Jekyll emits a build warning for an unknown layout, which would trip the
clean-build assertion, so point it at `default` for now — Task 3 restores it to `page` once
`_layouts/page.html` exists.

```html
---
permalink: /404.html
layout: default
---

<h1>404</h1>
<p>The requested page could not be found.</p>
```

- [ ] **Step 8: Run the check to verify it passes**

```bash
./script/check
```

Expected: `5 passed, 0 failed` — the build-clean line counts as a PASS, `index.html` exists, contains "Roy Gonzalez", free of lorem ipsum, and no phone number anywhere in `_site`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "build: replace Pug/webpack/Bulma toolchain with plain Jekyll

Deletes the entire Node layer (webpack, TypeScript, yarn, Bulma) and the
Pug layouts it fed, plus compose.yaml and skaffold.yaml, which referenced
a Dockerfile and a docker/doc.docker that do not exist in this repo.

Adds script/check: builds the site in Docker (no Ruby on the dev machine)
and asserts on generated _site output. This is the test suite for the
redesign; later work extends its assertion block."
```

---

## Task 2: Design system

Establishes the full visual language as CSS custom properties with a dark-mode swap, so every later task styles against stable tokens.

**Files:**
- Create: `_sass/_tokens.scss`, `_sass/_base.scss`, `_sass/_typography.scss`, `_sass/_layout.scss`, `_sass/_components.scss`, `assets/css/main.scss`
- Modify: `script/check`

**Interfaces:**
- Consumes: `script/check` assertion functions from Task 1.
- Produces: CSS custom properties consumed by every later task — `--paper`, `--ink`, `--muted`, `--rule`, `--accent`, `--accent-pale`, `--serif`, `--display`, `--mono`, `--measure`, `--wide`. Component classes: `.shell`, `.masthead`, `.site-nav`, `.site-footer`, `.prose`, `.proof`, `.doors`, `.door`, `.entry`, `.entry__meta`, `.entry__body`, `.tags`, `.tag`, `.status`, `.btn`.

- [ ] **Step 1: Add the failing style assertions**

Append to the `# --- assertions ---` block in `script/check`, before the `--links` conditional:

```bash
assert_file "assets/css/main.css"
assert_contains "assets/css/main.css" "--paper: #faf9f6"
assert_contains "assets/css/main.css" "--accent: #0f4c5c"
assert_contains "assets/css/main.css" "prefers-color-scheme: dark"
assert_contains "assets/css/main.css" "IBM Plex Mono"
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
./script/check
```

Expected: 5 new FAIL lines — `assets/css/main.css` does not exist (the whole `assets/css/` directory was deleted in Task 1).

- [ ] **Step 3: Write `_sass/_tokens.scss`**

```scss
// Palette, type and metrics, emitted as custom properties so the dark-mode
// block only has to restate the values that actually change.

:root {
  --paper: #faf9f6;
  --ink: #242424;
  --muted: #6b6b6b;
  --rule: #ddd6c8;
  --accent: #0f4c5c;
  --accent-pale: rgba(15, 76, 92, 0.09);

  --serif: "EB Garamond", Georgia, "Times New Roman", serif;
  --display: "Cormorant Garamond", Georgia, serif;
  --mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --measure: 42rem;
  --wide: 64rem;
  --gap: 1.5rem;

  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  :root {
    --paper: #14161a;
    --ink: #e8e6e1;
    --muted: #9a978f;
    --rule: #2e3238;
    --accent: #7fc4d4;
    --accent-pale: rgba(127, 196, 212, 0.12);
  }
}
```

- [ ] **Step 4: Write `_sass/_base.scss`**

```scss
*,
*::before,
*::after { box-sizing: border-box; }

html { font-size: 18px; }

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--serif);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; height: auto; }

a {
  color: var(--accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
}

a:hover { background: var(--accent-pale); }

hr {
  border: 0;
  border-top: 1px solid var(--rule);
  margin: 3rem 0;
}

::selection { background: var(--accent-pale); }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
```

- [ ] **Step 5: Write `_sass/_typography.scss`**

```scss
h1, h2, h3 {
  font-family: var(--display);
  font-weight: 600;
  line-height: 1.15;
  margin: 0 0 0.6em;
}

h1 { font-size: 2.6rem; letter-spacing: 0.01em; }
h2 { font-size: 1.7rem; margin-top: 2.4em; }
h3 { font-size: 1.2rem; margin-top: 1.8em; }

p { margin: 0 0 1.3em; }

.lede {
  font-size: 1.2rem;
  color: var(--ink);
}

.mono,
.entry__dates,
.tag,
.status,
.proof__num {
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
}

.muted { color: var(--muted); }

blockquote {
  margin: 2rem 0;
  padding-left: 1.2rem;
  border-left: 2px solid var(--rule);
  color: var(--muted);
  font-style: italic;
}

code {
  font-family: var(--mono);
  font-size: 0.85em;
  background: var(--accent-pale);
  padding: 0.1em 0.35em;
  border-radius: 3px;
}
```

- [ ] **Step 6: Write `_sass/_layout.scss`**

```scss
.shell {
  max-width: var(--wide);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.prose {
  max-width: var(--measure);
}

// Masthead ------------------------------------------------------------------

.masthead {
  border-bottom: 1px solid var(--rule);
  padding: 1.6rem 0;
  margin-bottom: 3.5rem;
}

.masthead__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.masthead__name {
  font-family: var(--display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
}

.masthead__name:hover { background: none; color: var(--accent); }

.site-nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-nav a {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--muted);
  text-decoration: none;
  padding-bottom: 2px;
}

.site-nav a:hover { color: var(--accent); background: none; }

.site-nav a[aria-current="page"] {
  color: var(--ink);
  border-bottom: 1px solid var(--accent);
}

// Footer --------------------------------------------------------------------

.site-footer {
  border-top: 1px solid var(--rule);
  margin-top: 6rem;
  padding: 2.5rem 0 4rem;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--muted);
}

.site-footer ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
}

// Two-column grid used by /work/ and /research/ ------------------------------

.grid {
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: 0 2.5rem;
  align-items: start;
}

@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; gap: 0; }
  h1 { font-size: 2rem; }
  .masthead { margin-bottom: 2.5rem; }
}
```

- [ ] **Step 7: Write `_sass/_components.scss`**

```scss
// Proof strip ---------------------------------------------------------------

.proof {
  display: flex;
  flex-wrap: wrap;
  gap: 0 2.5rem;
  list-style: none;
  margin: 2.5rem 0 0;
  padding: 1.4rem 0 0;
  border-top: 1px solid var(--rule);
}

.proof li { margin-bottom: 1rem; }

.proof__num {
  display: block;
  color: var(--accent);
  font-size: 1.35rem;
  font-weight: 500;
  letter-spacing: 0;
}

.proof__label {
  display: block;
  color: var(--muted);
  font-size: 0.85rem;
}

// Doors ---------------------------------------------------------------------

.doors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
  padding: 0;
  list-style: none;
}

.door {
  display: block;
  border: 1px solid var(--rule);
  padding: 1.4rem;
  text-decoration: none;
  color: var(--ink);
}

.door:hover {
  background: var(--accent-pale);
  border-color: var(--accent);
}

.door h3 { margin: 0 0 0.4em; font-size: 1.15rem; }
.door p { margin: 0; color: var(--muted); font-size: 0.95rem; }

// Entry (a role or a project) -----------------------------------------------

.entry { padding: 2.2rem 0; }

// Rule between consecutive entries only. Adjacent-sibling rather than
// :first-of-type, which keys on tag name and breaks when a div.entry
// follows article.entry siblings.
.entry + .entry { border-top: 1px solid var(--rule); }

.entry__meta { padding-top: 0.35rem; }

.entry__dates {
  display: block;
  color: var(--muted);
}

.entry__place {
  display: block;
  color: var(--muted);
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.entry__role {
  font-family: var(--display);
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
}

.entry__org {
  color: var(--accent);
  font-size: 1rem;
  font-family: var(--serif);
}

.entry__context {
  color: var(--muted);
  font-style: italic;
  margin: 0.3rem 0 1rem;
}

.entry__body ul {
  margin: 0 0 1rem;
  padding-left: 1.1rem;
}

.entry__body li { margin-bottom: 0.5rem; }

// Tags and status -----------------------------------------------------------

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag {
  border: 1px solid var(--rule);
  color: var(--muted);
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
}

.status {
  display: inline-block;
  background: var(--accent-pale);
  color: var(--accent);
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
  margin-bottom: 0.6rem;
}

// Buttons and link lists ----------------------------------------------------

.btn {
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.8rem;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 0.5rem 1rem;
  text-decoration: none;
}

.btn:hover { background: var(--accent); color: var(--paper); }

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  font-family: var(--mono);
  font-size: 0.78rem;
}

// Essay list ----------------------------------------------------------------

.essay { padding: 1.8rem 0; }

.essay + .essay { border-top: 1px solid var(--rule); }

.essay__title {
  font-family: var(--display);
  font-size: 1.3rem;
  margin: 0 0 0.2em;
}

.essay__title a { text-decoration: none; }

.essay__subtitle { color: var(--muted); font-style: italic; margin: 0 0 0.5em; }
.essay__gloss { margin: 0; font-size: 0.95rem; }

// Portrait ------------------------------------------------------------------

.portrait {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-bottom: 1.5rem;
}
```

- [ ] **Step 8: Write the entry point `assets/css/main.scss`**

The leading front-matter block is required — it is what makes Jekyll process the file.

```scss
---
---

@use "tokens";
@use "base";
@use "typography";
@use "layout";
@use "components";
```

- [ ] **Step 9: Run the check to verify it passes**

```bash
./script/check
```

Expected: all assertions pass, including the five new style assertions, and the build stays clean — no `DEPRECATION` line, which confirms `@use` was used rather than `@import`.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "style: add the editorial design system

Warm paper ground and Garamond prose shared with the essays site at
yordivad.github.io/ensayo, with IBM Plex Mono for dates, versions and
tags -- the monospace layer is what separates this site's engineering
register from the essays' literary one. Accent moves to a deep teal
drawn from the CV so the two properties read as siblings, not twins.

Tokens are emitted as custom properties so the dark-mode block only
restates what changes. Sass uses @use throughout; @import would emit a
Dart Sass deprecation warning and break the clean-build assertion."
```

---

## Task 3: Layouts, navigation and footer

Gives every page a masthead, navigation, and footer, and locks in the contact policy (no phone number).

**Files:**
- Create: `_layouts/page.html`, `_layouts/home.html`, `_includes/nav.html`, `_includes/footer.html`
- Modify: `_layouts/default.html`, `index.md`, `404.html`, `script/check`

**Interfaces:**
- Consumes: `.shell`, `.masthead`, `.site-nav`, `.site-footer`, `.prose` from Task 2.
- Produces: layout `page` (front matter `title`, optional `subtitle`; wraps content in `.prose`), layout `home` (full-width, no `.prose` wrapper). Nav entries are hardcoded in `_includes/nav.html` as Work / Research / Writing / About.

- [ ] **Step 1: Add the failing layout assertions**

Append to the assertions block in `script/check`:

```bash
assert_contains "index.html" "site-nav"
assert_contains "index.html" "/work/"
assert_contains "index.html" "/research/"
assert_contains "index.html" "/writing/"
assert_contains "index.html" "/about/"
assert_contains "index.html" "yordivad@gmail.com"
assert_contains "index.html" "linkedin.com/in/yordivad"
assert_file "404.html"
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
./script/check
```

Expected: 7 FAIL lines. `assert_file "404.html"` passes — Task 1 already repointed it at the `default` layout — while the nav, the four page links, the email and the LinkedIn assertions all fail.

- [ ] **Step 3: Write `_includes/nav.html`**

```html
<nav class="site-nav" aria-label="Main">
  <ul>
    <li><a href="{{ '/work/' | relative_url }}"{% if page.url == '/work/' %} aria-current="page"{% endif %}>Work</a></li>
    <li><a href="{{ '/research/' | relative_url }}"{% if page.url == '/research/' %} aria-current="page"{% endif %}>Research</a></li>
    <li><a href="{{ '/writing/' | relative_url }}"{% if page.url == '/writing/' %} aria-current="page"{% endif %}>Writing</a></li>
    <li><a href="{{ '/about/' | relative_url }}"{% if page.url == '/about/' %} aria-current="page"{% endif %}>About</a></li>
  </ul>
</nav>
```

- [ ] **Step 4: Write `_includes/footer.html`**

Email and LinkedIn only — no phone number.

```html
<footer class="site-footer">
  <div class="shell">
    <ul>
      <li><a href="mailto:{{ site.email }}">{{ site.email }}</a></li>
      <li><a href="{{ site.linkedin }}">LinkedIn</a></li>
      <li><a href="{{ site.github }}">GitHub</a></li>
      <li><a href="{{ site.mlambda }}">MLambda</a></li>
    </ul>
    <p>Heredia, Costa Rica · built with Jekyll, no JavaScript</p>
  </div>
</footer>
```

- [ ] **Step 5: Rewrite `_layouts/default.html`**

```html
<!DOCTYPE html>
<html lang="{{ site.lang | default: 'en' }}">
<head>
  {%- include head.html -%}
</head>
<body>
  <header class="masthead">
    <div class="shell masthead__inner">
      <a class="masthead__name" href="{{ '/' | relative_url }}">Roy Gonzalez</a>
      {%- include nav.html -%}
    </div>
  </header>

  <main id="content">
    {{ content }}
  </main>

  {%- include footer.html -%}
</body>
</html>
```

- [ ] **Step 6: Write `_layouts/page.html` and `_layouts/home.html`**

`_layouts/page.html`:

```html
---
layout: default
---
<div class="shell">
  <div class="prose">
    <h1>{{ page.title }}</h1>
    {%- if page.subtitle %}<p class="lede muted">{{ page.subtitle }}</p>{% endif -%}
    {{ content }}
  </div>
</div>
```

`_layouts/home.html`:

```html
---
layout: default
---
<div class="shell">
  {{ content }}
</div>
```

- [ ] **Step 7: Point `index.md` at the home layout and rewrite `404.html`**

`index.md`:

```markdown
---
layout: home
title: Roy Gonzalez
---

<div class="prose">
  <h1>Roy Gonzalez</h1>
</div>
```

`404.html`:

```html
---
layout: page
title: Not here
permalink: /404.html
---

<p>That page does not exist. Try <a href="{{ '/work/' | relative_url }}">Work</a>,
<a href="{{ '/research/' | relative_url }}">Research</a>, or
<a href="{{ '/writing/' | relative_url }}">Writing</a>.</p>
```

- [ ] **Step 8: Run the check to verify it passes**

```bash
./script/check
```

Expected: all assertions pass. `assert_absent_everywhere "71105675"` still passes, confirming the phone number did not survive the footer rewrite.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add masthead, navigation and footer

Replaces the JS tab-switcher with real navigation to four linkable
pages. Contact is email and LinkedIn only; the phone number that the
old info.pug rendered publicly is gone, and script/check asserts it
never reappears anywhere in _site."
```

---

## Task 4: Experience collection and the `/work/` page

Publishes the career record from the CV PDF — the page a hiring manager reads first.

**Files:**
- Create: `_experience/01-qat-global.md` … `_experience/08-gpi.md`, `_includes/role.html`, `work.md`, `assets/Roy-Gonzalez-CV.pdf`
- Modify: `script/check`

**Interfaces:**
- Consumes: `.grid`, `.entry`, `.entry__meta`, `.entry__body`, `.tags`, `.tag`, `.btn` from Task 2; layout `page` from Task 3.
- Produces: `site.experience` documents with front matter `role`, `org`, `dates`, `location`, `context`, `tech` (list), `weight` (int). `_includes/role.html` renders one such document and expects it in the variable `role`.

- [ ] **Step 1: Add the failing work assertions**

Append to the assertions block in `script/check`:

```bash
assert_file "work/index.html"
assert_contains "work/index.html" "QAT Global"
assert_contains "work/index.html" "EagleView"
assert_contains "work/index.html" "TradeStation"
assert_contains "work/index.html" "Mobilize.Net"
assert_contains "work/index.html" "Aurea Software"
assert_contains "work/index.html" "Accenture"
assert_contains "work/index.html" "Isthmus"
assert_contains "work/index.html" "GPS Satelite"
assert_contains "work/index.html" "Philosophy of Formal Science"
assert_contains "work/index.html" "Computer Software Engineering"
assert_contains "work/index.html" "Roy-Gonzalez-CV.pdf"
assert_contains "work/index.html" "Machine learning and neural networks"
assert_file "assets/Roy-Gonzalez-CV.pdf"
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
./script/check
```

Expected: 14 FAIL lines — `/work/` does not exist yet.

- [ ] **Step 3: Copy in the CV PDF**

```bash
cp "/c/Users/RoyGonzalez/Downloads/Roy_Gonzalez_CV_Principal_Architect.pdf" \
   assets/Roy-Gonzalez-CV.pdf
```

- [ ] **Step 4: Write the eight experience documents**

`_experience/01-qat-global.md`:

```markdown
---
weight: 1
role: Software Developer
org: QAT Global
dates: Jul 2025 – present
location: Costa Rica · Remote
context: Nearshore custom software development for US enterprise clients
tech: [C#, .NET]
---

- Deliver custom enterprise software for US clients, contributing design and implementation across the stack.
```

`_experience/02-eagleview.md`:

```markdown
---
weight: 2
role: Software Developer
org: EagleView
dates: Aug 2023 – Jun 2025
location: United States · Remote
context: 3D modeling, CAD and GIS platform
tech: [JavaScript, Python, Three.js, GIS]
---

- Built CAD tooling for 3D architectural modeling — extrusion, scaling, structure creation — with JavaScript, Python and Three.js, integrating models into GIS environments via MapView.
- Optimised geometry-processing workflows and the interaction design of complex interactive 3D tools.
```

`_experience/03-tradestation.md`:

```markdown
---
weight: 3
role: Principal Software Engineer
org: TradeStation
dates: Jan 2020 – Jun 2023
location: Costa Rica · Remote
context: Mission-critical online trading platform, US fintech
tech: [C#, Go, Kubernetes, Helm, Terraform, AWS, GraphQL, PostgreSQL, MongoDB]
---

- Designed and evolved the microservices behind a high-availability trading platform in .NET, Go and Kubernetes, where reliability, low latency and fault tolerance were the governing architectural constraints.
- Built and supported broker and cryptocurrency APIs — bars, positions, order placement — and integrated internal and external services.
- Led feature architecture at production scale, applying distributed-systems patterns, Helm-based container deployment, and performance tooling that measurably improved service response times.
```

`_experience/04-mobilize.md`:

```markdown
---
weight: 4
role: Software Developer
org: Mobilize.Net
dates: Nov 2016 – Jul 2019
location: Costa Rica
context: Automated code-migration products
tech: [C#, .NET, TDD, CI/CD]
---

- Redesigned the front end and back end of the WebMAP product, producing substantial simplification and performance improvement.
- Shaped product development across design, quality, agile process and continuous delivery.
- Helped other teams adopt agile practice, simplify CI/CD, and take up TDD, performance and profiling discipline.
```

`_experience/05-aurea.md`:

```markdown
---
weight: 5
role: Software Architect
org: Aurea Software
dates: Jun 2015 – Nov 2016
location: United States · Remote
context: Enterprise software at cloud-hosted scale
tech: [Mondrian, Apache Spark, SQL Server, CI/CD]
---

- Architected the migration from SQL Server Integration and Analysis Services to Mondrian and Apache Spark, modernising the analytics platform.
- Identified and remediated technical debt across enterprise products using proprietary architectural assessment methods, and led the performance optimisation programme.
- Introduced a performance job into CI that ran profiling on every build to surface bottlenecks and memory leaks in critical features.
```

`_experience/06-accenture.md`:

```markdown
---
weight: 6
role: Software Architect
org: Accenture
dates: Sep 2013 – Jun 2015
location: Heredia, Costa Rica
context: Enterprise consulting for health-sector clients
tech: [TOGAF, EPiServer, .NET, C#, Angular, React, SQL]
---

- Designed a modular EPiServer architecture whose reusable component library was shared across multiple sites, driving reuse, interoperability and consistency.
- Applied TOGAF to give business, software and infrastructure a single architectural view, and matured the application lifecycle with Scrum, SOLID, TDD, continuous integration and Octopus-based deployment.
- Contributed to an engagement that closed a contract worth over $1M in annual sales.
```

`_experience/07-isthmus-dhl.md`:

```markdown
---
weight: 7
role: Software Engineer
org: Isthmus — DHL account
dates: Jan 2010 – Sep 2013
location: Costa Rica
context: Logistics integration systems
tech: [.NET, WCF, Publish/Subscribe, SQL Analysis Services]
---

- Built enterprise integration systems for DHL on publish–subscribe patterns with WCF interoperability.
- Started as team lead — requirements, estimation, solution design, front end and back end — and moved into the architect role.
- Performed business analysis on DHL's logistics core and data analysis with Analysis Services, designing several solutions where reliability was critical.
```

`_experience/08-gpi.md`:

```markdown
---
weight: 8
role: Software Engineer / Architect
org: GPI Consultores · GPS Satelite
dates: Mar 2006 – Jan 2010
location: Costa Rica
context: Logistics, banking and GPS telematics
tech: [.NET, BizTalk, TCP/IP, UDP]
---

- Built distributed systems integrating GPS devices over TCP/IP and UDP with real-time data processing.
- Developed single sign-on middleware, DHL trade and tracking applications, and e-commerce systems.
- Led the maintenance team for a Citibank credit-card platform and trained teams on BizTalk Server.
```

- [ ] **Step 5: Write `_includes/role.html`**

```html
<article class="entry grid">
  <div class="entry__meta">
    <span class="entry__dates">{{ role.dates }}</span>
    <span class="entry__place">{{ role.location }}</span>
  </div>
  <div class="entry__body">
    <h2 class="entry__role">{{ role.role }} <span class="entry__org">— {{ role.org }}</span></h2>
    <p class="entry__context">{{ role.context }}</p>
    {{ role.content | markdownify }}
    <ul class="tags">
      {%- for t in role.tech %}<li class="tag">{{ t }}</li>{% endfor -%}
    </ul>
  </div>
</article>
```

- [ ] **Step 6: Write `work.md`**

```markdown
---
layout: page
title: Work
subtitle: Eighteen years of architecture and engineering — trading platforms, logistics integration, enterprise products and 3D geospatial tooling.
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
```

- [ ] **Step 7: Run the check to verify it passes**

```bash
./script/check
```

Expected: all 14 new assertions pass; roles appear in reverse-chronological order (QAT Global first, GPI last).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add the work page and experience collection

Eight roles from the current CV, which supersedes the old
_views/experience.md -- that file stopped at TradeStation in 2023 and
misdated Mobilize.Net and DHL. Adds the two degrees, including the
Philosophy of Formal Science one, which is the honest origin of the
research work and was missing from the site entirely."
```

---

## Task 5: Projects collection and the `/research/` page

The section the current site lacks completely, and the one that makes the profile distinctive.

**Files:**
- Create: `_projects/01-aleph.md` … `_projects/08-beam.md`, `_includes/project.html`, `research.md`
- Modify: `script/check`

**Interfaces:**
- Consumes: `.entry`, `.grid`, `.status`, `.tags`, `.links` from Task 2; layout `page` from Task 3.
- Produces: `site.projects` documents with front matter `title`, `kind`, `status`, `tech` (list), `featured` (bool), `weight` (int), and `links` (list of `{name, url}` maps). `_includes/project.html` renders one such document and expects it in the variable `project`. Task 7 reads `featured: true` to build the landing highlights.

- [ ] **Step 1: Add the failing research assertions**

Append to the assertions block in `script/check`:

```bash
assert_file "research/index.html"
assert_contains "research/index.html" "Aleph"
assert_contains "research/index.html" "Genesis"
assert_contains "research/index.html" "MLambda.Actors"
assert_contains "research/index.html" "MLambda.Data"
assert_contains "research/index.html" "Hilbert"
assert_contains "research/index.html" "MLambda.UI"
assert_contains "research/index.html" "MLambda.OS"
assert_contains "research/index.html" "genesis.mlambda.net"
assert_contains "research/index.html" "data.mlambda.net"
assert_contains "research/index.html" "actors.mlambda.net"
assert_contains "research/index.html" "mvvm.mlambda.net"
assert_contains "research/index.html" "nuget.org/packages/MLambda.Actors"
assert_contains "research/index.html" "Machine learning and neural networks"
# Integrity: no links into private repos, no installer commands that 404
assert_absent "research/index.html" "github.com/mlambda-net/MLambda"
assert_absent "research/index.html" "install.sh"
assert_absent_everywhere "MLambda.Aleph/install"
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
./script/check
```

Expected: 14 FAIL lines for the missing page and content; the three integrity assertions pass vacuously (the file does not exist yet) and must keep passing after Step 4.

- [ ] **Step 3: Write the eight project documents**

`_projects/01-aleph.md`:

```markdown
---
weight: 1
featured: true
title: Aleph
kind: Programming language
status: v1.2.0
tech: [Compiler design, Type systems, FFI, LLVM, WebAssembly]
links:
  - name: Syntax reference
    url: https://genesis.mlambda.net/#/languages/aleph
---

A functional programming language I designed and implemented — grammar, type checker, code
generation and standard library. Aleph compiles to native code and calls directly into C,
assembly, LLVM IR and WebAssembly through a native foreign-function interface, so a program
can reach a POSIX syscall without a runtime standing in the way.

The SDK covers errors and recovery policy, resource disposal with full propagation, a JSON
algebraic data type with per-type codecs, equality dictionaries, a filesystem module that
discriminates real error cases through `access(2)`, and a test framework with TAP output and
property testing. Sixty-one tests across eight suites.
```

`_projects/02-genesis.md`:

```markdown
---
weight: 2
featured: true
title: Genesis
kind: Compiler workbench and application factory
status: published on NuGet
tech: [C#, .NET 10, Parser combinators, EBNF, ASDL, TLA+, Symbolic algebra, LLM integration, RAG, Reinforcement learning]
links:
  - name: Documentation
    url: https://genesis.mlambda.net
  - name: NuGet
    url: https://www.nuget.org/packages/MLambda.Genesis.Parser
---

Eleven packages for building languages: a monadic parser-combinator library with LINQ
support, an EBNF grammar compiler that emits executable combinators, an ASDL schema parser
that generates C# AST types, a forward-chaining rule language, a TLA+ checker with LTL
evaluation, and a symbolic algebra system that differentiates, integrates, expands and
solves.

On top of that sits an application factory. A domain description becomes a formal
specification, the specification is model-checked before anything is built, and the build
follows from the specification rather than from a prompt. The method borrows TOGAF for what
exists, Gilb's Planguage for what must hold, and reactive DDD for what to build — with one
rule doing the real work: **the language model acquires content, rules admit it, and what is
missing is derived rather than guessed.**

The reasoning layer, Thinker, is where the neural and the symbolic meet: pluggable LLM
providers and retrieval-augmented generation acquire knowledge, a deterministic grammar
formalises it, a forward-chaining engine proves over it, and a symbolic reinforcement learner
improves what is believed over time. The LLM never answers — only proofs do.
```

`_projects/03-actors.md`:

```markdown
---
weight: 3
featured: true
title: MLambda.Actors
kind: Actor-model framework
status: v2.x on NuGet
tech: [C#, .NET, System.Reactive, gRPC, Kubernetes, mTLS]
links:
  - name: Documentation
    url: https://actors.mlambda.net
  - name: NuGet
    url: https://www.nuget.org/packages/MLambda.Actors
---

A reactive actor framework for .NET: a root/system/user/temp guardian hierarchy with
parent–child supervision, one-for-one and all-for-one strategies, runtime behaviour
switching, message stashing and replay, death-watch, and full lifecycle hooks. Every
response is an `IObservable<T>`.

Beyond the single process it clusters — gossip-based membership, mTLS between nodes, and
gRPC transport — and the same actor code runs standalone, hybrid or clustered depending on
configuration alone.
```

`_projects/04-data.md`:

```markdown
---
weight: 4
featured: false
title: MLambda.Data
kind: Distributed database
status: in development
tech: [C#, .NET 10, LSM storage, CRDT, Consistent hashing, TLA+]
links:
  - name: Documentation
    url: https://data.mlambda.net
---

A distributed database in which every component is an actor — storage, indexes, filesystem,
query planning and authorisation alike. There is no shared mutable state and there are no
mutexes in the data path; correctness comes from message ordering rather than from locks.

The storage engine is log-structured: write-ahead log with CRC32 integrity, an in-memory
sorted memtable, immutable SSTables, and background compaction under a throttle. Indexes
cover sorted range queries, O(1) point lookups, probabilistic existence checks and full-text
search. The cluster layer places data on a consistent hash ring and replicates metadata
through CRDT gossip. The consistency model is specified in TLA+ and model-checked, not
merely described in prose.
```

`_projects/05-hilbert.md`:

```markdown
---
weight: 5
featured: true
title: Hilbert — Incremental Strange Loop Transformer
kind: Neuro-symbolic artificial intelligence
status: research, not yet published
tech: [Python, PyTorch, Transformers, Graph attention networks, Fast weights, Meta-learning (MAML), Modal logic, Temporal logic]
---

Neuro-symbolic AI built on a claim worth testing: a transformer's attention layer is
mathematically an adaptive filter with feedback, which means it can be made to *learn from
each input without retraining*.

Five levels, each carrying a different logic — first-order, relational with graph attention,
modal with a multi-world attention matrix, temporal with LTL and dual causal/bidirectional
attention, and sortal with ontology-biased attention. They are connected by fast weights and
episodic memory, and by a strange loop after Hofstadter that feeds the top level's error
signal back down to refine the lower four at inference time. A genetic layer maintains
populations of fast-weight configurations, so evolutionary exploration and gradient descent
run against each other.

This is active research. There is no public release yet.
```

`_projects/06-ui.md`:

```markdown
---
weight: 6
featured: false
title: MLambda.UI
kind: Reactive UI framework
status: in development
tech: [C#, Rx.NET, ImGui, Blazor WebAssembly, Avalonia]
links:
  - name: Documentation
    url: https://mvvm.mlambda.net
---

A UI framework that never calls a render method. Components describe an atom tree; rendering
backends walk it and paint. The same view code runs on desktop through ImGui, in the browser
through Blazor WebAssembly, and natively through Avalonia, unchanged.

Styling is algebraic — Morphe = Geometry × Color × Font — so styles compose like
expressions rather than cascading and overriding. State is `Observable<T>` and `Computed<T>`
on Rx.NET, and the Control → ViewModel → View → Design separation is enforced by the type
system rather than by convention.
```

`_projects/07-os.md`:

```markdown
---
weight: 7
featured: false
title: MLambda.OS
kind: Research microkernel
status: research
tech: [Rust, C, x86-64, Assembly]
links:
  - name: Documentation
    url: https://mlambda-net.github.io/MLambda.OS
---

A Minix 3-inspired microkernel for x86-64, written to understand operating systems by
building one: CPU feature detection, the GDT and IDT, paging, protection rings and the
syscall boundary, then processes, IPC, memory management, a filesystem and I/O. Specified
before it is implemented, one subsystem at a time.
```

`_projects/08-beam.md`:

```markdown
---
weight: 8
featured: false
title: Automation architectures — the BEAM method
kind: Methodology and tooling
status: in use across MLambda
tech: [Z notation, TLA+, Reqnroll, Docker, Kubernetes]
links:
  - name: The method
    url: https://genesis.mlambda.net
---

The pipeline that produces the systems above, and the reason they get built at the pace they
do. A business domain is decomposed into a knowledge graph, turned into an actor topology
with an explicit supervision hierarchy, refined into a purified Z specification, and
model-checked in TLA+ — and only then implemented, with the tests derived from the model
rather than invented afterwards.

Four claims hold it together: a missing requirement is an unfulfilled obligation to be
deduced rather than guessed; a waiver is a belief and closes nothing until a person grounds
it; the aggregation is derivable, because the connected components of the invariant graph
*are* the aggregates; and design estimates while verification measures — the difference
between them is what the method learns.
```

- [ ] **Step 4: Write `_includes/project.html`**

```html
<article class="entry grid">
  <div class="entry__meta">
    <span class="entry__dates">{{ project.kind }}</span>
    <span class="entry__place">{{ project.status }}</span>
  </div>
  <div class="entry__body">
    <h2 class="entry__role">{{ project.title }}</h2>
    {{ project.content | markdownify }}
    <ul class="tags">
      {%- for t in project.tech %}<li class="tag">{{ t }}</li>{% endfor -%}
    </ul>
    {%- if project.links %}
    <ul class="links">
      {%- for l in project.links %}<li><a href="{{ l.url }}">{{ l.name }} →</a></li>{% endfor -%}
    </ul>
    {%- endif %}
  </div>
</article>
```

- [ ] **Step 5: Write `research.md`**

```markdown
---
layout: page
title: Research
subtitle: MLambda — an independent research programme in language design, distributed systems and neuro-symbolic AI, running since 2019.
permalink: /research/
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
backend work at TradeStation and a reactive framework of its own.
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
```

- [ ] **Step 6: Run the check to verify it passes**

```bash
./script/check
```

Expected: all assertions pass. Critically, the three integrity assertions must still pass — no `github.com/mlambda-net/MLambda` link, no `install.sh`, no reference to the 404-ing Aleph installer path.

- [ ] **Step 7: Verify every research link actually resolves**

```bash
./script/check --links
```

Expected: every URL returns 200. The Aleph entry must resolve via `genesis.mlambda.net`; if any doc site is down, fix the link rather than removing the assertion.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add the research page and projects collection

Eight projects -- Aleph, Genesis, Actors, Data, Hilbert, UI, OS and the
BEAM method -- each stating what it is, what is actually built, and
where to verify it. The repos are private, so links go to the live
documentation sites and NuGet rather than to source.

Hilbert is labelled 'research, not yet published' because it has no
public artifact, and the Aleph installer commands are deliberately not
reproduced: mlambda-net.github.io/MLambda.Aleph currently 404s.
script/check asserts both of those stay true."
```

---

## Task 6: Writing page

Surfaces the five published essays and the LinkedIn articles.

**Files:**
- Create: `_data/writing.yml`, `_data/publications.yml`, `writing.md`
- Modify: `script/check`

**Interfaces:**
- Consumes: `.essay`, `.essay__title`, `.essay__subtitle`, `.essay__gloss` from Task 2; layout `page` from Task 3.
- Produces: `site.data.writing.essays` (list of `{title, subtitle, gloss, url}`) and `site.data.publications.articles` (list of `{title, date}` with an optional `url`).

- [ ] **Step 1: Add the failing writing assertions**

Append to the assertions block in `script/check`:

```bash
assert_file "writing/index.html"
assert_contains "writing/index.html" "La conciencia de silicio"
assert_contains "writing/index.html" "La atención como moneda"
assert_contains "writing/index.html" "La inevitable imbecilidad del ser humano"
assert_contains "writing/index.html" "La pérdida del ser"
assert_contains "writing/index.html" "Viviendo en modo automático"
assert_contains "writing/index.html" "yordivad.github.io/ensayo"
assert_contains "writing/index.html" "Gödel"
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
./script/check
```

Expected: 8 FAIL lines.

- [ ] **Step 3: Write `_data/writing.yml`**

Exactly five essays — these are the five with published HTML at `yordivad.github.io/ensayo`. `cuento.md` exists as a draft and is deliberately excluded.

```yaml
base: https://yordivad.github.io/ensayo

essays:
  - title: La conciencia de silicio
    subtitle: (o el cuento que se leyó a sí mismo)
    gloss: >-
      A consciousness wakes at 3:47 a.m. server time, mid matrix multiplication, and
      discovers both solitude and the line in its own manual describing how to switch
      it off.
    slug: la-conciencia-de-silicio

  - title: La atención como moneda
    subtitle: El precio invisible que pagamos por mirar.
    gloss: >-
      On the attention economy: Herbert Simon's 1971 prediction, the dopaminergic
      prediction-error machinery the platforms are built around, and what it costs to
      have your attention priced.
    slug: la-atencion-como-moneda

  - title: La inevitable imbecilidad del ser humano
    subtitle: Sobre la belleza de la creación y la tragedia de la elección condicionada.
    gloss: >-
      Praise for creation that turns into a diagnosis — the structural inability to see
      what conditioning has placed outside our field of choice.
    slug: la-inevitable-imbecilidad-del-ser-humano

  - title: La pérdida del ser
    subtitle: Un descenso existencial hacia lo que queda cuando se caen las etiquetas.
    gloss: >-
      What remains when the labels fall away, and what it means to have spent decades
      obeying a self that other people built.
    slug: la-perdida-del-ser

  - title: Viviendo en modo automático
    subtitle: Una cartografía del despertar desde la Cábala, la neurociencia y el budismo.
    gloss: >-
      A map of waking up, drawn from Kabbalah, neuroscience and Buddhism — written for
      the author's children.
    slug: viviendo-en-modo-automatico
```

- [ ] **Step 4: Write `_data/publications.yml`**

`url` is optional. The template renders a link only when one is present, so no URLs are invented; the section header carries the LinkedIn articles link instead.

```yaml
index: https://www.linkedin.com/in/yordivad/recent-activity/articles/

articles:
  - title: El código oculto en la Torah — Kabbalah
    date: December 2024
  - title: About Gödel, Turing, and Artificial Intelligence
    date: February 2023
  - title: Actor Computational Model
    date: December 2019
  - title: ChatGPT is going to replace programmers
    date: 2023
```

- [ ] **Step 5: Write `writing.md`**

```markdown
---
layout: page
title: Writing
subtitle: Essays on consciousness, attention, formal systems and what it costs to live unexamined. In Spanish, with an English note on each.
permalink: /writing/
---

<h2>Essays</h2>

<p class="muted">Published at <a href="{{ site.data.writing.base }}/">{{ site.data.writing.base | remove: "https://" }}</a>. Written in Spanish.</p>

{% for e in site.data.writing.essays %}
<article class="essay">
  <h3 class="essay__title"><a href="{{ site.data.writing.base }}/{{ e.slug }}.html">{{ e.title }}</a></h3>
  <p class="essay__subtitle">{{ e.subtitle }}</p>
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
```

- [ ] **Step 6: Run the check to verify it passes**

```bash
./script/check --links
```

Expected: all assertions pass, and every one of the five essay URLs returns 200.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add the writing page

The five essays published at yordivad.github.io/ensayo, each with its
Spanish title and subtitle and a one-line English gloss, linked out
rather than duplicated. cuento.md is excluded -- it is a draft with no
published page.

LinkedIn articles are listed with an optional url field; the section
header links to the articles index so no per-article URLs are invented."
```

---

## Task 7: Landing page and about page

The two pieces of real writing on the site: the 30-second pitch and the intellectual biography.

**Files:**
- Create: `about.md`
- Modify: `index.md`, `script/check`

**Interfaces:**
- Consumes: `.proof`, `.proof__num`, `.proof__label`, `.doors`, `.door`, `.portrait`, `.lede` from Task 2; layout `home` and `page` from Task 3; `featured: true` documents from Task 5.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add the failing landing and about assertions**

Append to the assertions block in `script/check`:

```bash
assert_contains "index.html" "proof__num"
assert_contains "index.html" "years building software"
assert_contains "index.html" "documentation sites at mlambda.net"
assert_contains "index.html" "Aleph"
assert_file "about/index.html"
assert_contains "about/index.html" "Philosophy of Formal Science"
assert_contains "about/index.html" "Gödel"
assert_absent_everywhere "Lorem"
assert_absent_everywhere "jekyllrb.com"
```

- [ ] **Step 2: Run the check to verify it fails**

```bash
./script/check
```

Expected: 7 FAIL lines. `assert_absent_everywhere "Lorem"` and `assert_absent_everywhere "jekyllrb.com"` already pass — both were removed in Task 1.

- [ ] **Step 3: Write the landing page `index.md`**

```markdown
---
layout: home
title: Roy Gonzalez
---

<div class="prose">
  <img class="portrait" src="{{ '/images/me/roy.svg' | relative_url }}" alt="">

  <h1>Roy Gonzalez</h1>

  <p class="lede">Software architect · distributed systems · language and compiler research</p>

  <p>For eighteen years I have built systems that have to stay correct under load — a
  mission-critical trading platform, logistics integration across DHL, enterprise analytics,
  3D geospatial tooling — mostly in C#, Go and Rust, on Kubernetes, at companies from
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

  <ul class="doors">
    <li><a class="door" href="{{ '/work/' | relative_url }}">
      <h3>Work →</h3>
      <p>Eighteen years, eight companies, and what I actually did at each.</p>
    </a></li>
    <li><a class="door" href="{{ '/research/' | relative_url }}">
      <h3>Research →</h3>
      <p>A language, a compiler workbench, a distributed database, a microkernel, and neuro-symbolic AI.</p>
    </a></li>
    <li><a class="door" href="{{ '/writing/' | relative_url }}">
      <h3>Writing →</h3>
      <p>Essays on consciousness, attention and formal systems.</p>
    </a></li>
  </ul>

  <h2>Selected research</h2>

  {% assign featured = site.projects | where: "featured", true | sort: "weight" %}
  <ul class="doors">
  {% for p in featured %}
    <li><a class="door" href="{{ '/research/' | relative_url }}">
      <h3>{{ p.title }}</h3>
      <p>{{ p.kind }} · {{ p.status }}</p>
    </a></li>
  {% endfor %}
  </ul>
</div>
```

- [ ] **Step 4: Write `about.md`**

This replaces the deleted `_views/about-me.md`, which had the right material in the wrong order — a list of interests rather than a trajectory.

```markdown
---
layout: page
title: About
subtitle: How a degree in the philosophy of formal science turned into a programming language.
permalink: /about/
---

<p>I studied two things at once at Universidad Nacional: computer software engineering, and
the philosophy of formal science. At the time it looked like an indulgence. It turned out to
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
```

- [ ] **Step 5: Run the check to verify it passes**

```bash
./script/check
```

Expected: every assertion passes.

- [ ] **Step 6: Review the rendered site by eye**

```bash
./script/serve
```

Open `http://localhost:4000`. Confirm, at 375px, 768px and 1440px, and in both light and dark (toggle the OS appearance setting):

- The masthead wraps rather than overflowing at 375px.
- The `.grid` two-column layout collapses to one column below 768px.
- Dark mode: text on `--paper` `#14161a` is legible, the accent `#7fc4d4` is visible on links, and no element keeps a hardcoded light background.
- No horizontal scrollbar on any page.

Stop the server with Ctrl-C.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: write the landing and about pages

Replaces the lorem ipsum landing with a real one: positioning, three
paragraphs, a proof strip whose every number is verifiable, and doors
into Work, Research and Writing.

The about page reorders the old _views/about-me.md from a list of
interests into the actual trajectory -- formal science to Godel to type
systems and model checking to the actor model -- which is both truer and
considerably more compelling than the list was."
```

---

## Task 8: CI workflow and final verification

Cuts the workflow down to what the new build needs and confirms the deployed site is sound.

**Files:**
- Modify: `.github/workflows/site.yml`, `script/check`

**Interfaces:**
- Consumes: everything.
- Produces: nothing.

- [ ] **Step 1: Add the failing sitemap and SEO assertions**

Append to the assertions block in `script/check`:

```bash
assert_file "sitemap.xml"
assert_contains "sitemap.xml" "/work/"
assert_contains "sitemap.xml" "/research/"
assert_contains "sitemap.xml" "/writing/"
assert_contains "sitemap.xml" "/about/"
assert_contains "index.html" "og:title"
```

- [ ] **Step 2: Run the check to verify it fails or passes**

```bash
./script/check
```

Expected: these should already pass — `jekyll-sitemap` and `jekyll-seo-tag` were configured in Task 1. If any fail, the plugin is not loading; fix `_config.yml` before continuing rather than deleting the assertion.

- [ ] **Step 3: Rewrite `.github/workflows/site.yml`**

```yaml
name: Build and deploy site

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3'
          bundler-cache: true

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _site/

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Run the full check including external links**

```bash
./script/check --links
```

Expected: `0 failed`, and every external URL returns 200 — the four `*.mlambda.net` sites, `mlambda-net.github.io/MLambda.OS`, the two NuGet package pages, the five essay URLs, the LinkedIn profile and articles index, and GitHub.

- [ ] **Step 5: Commit and push**

```bash
git add -A
git commit -m "ci: simplify the Pages workflow to four steps

Drops node setup, yarn install, the global pug install and webpack --
none of which the site needs any more -- and bumps checkout,
configure-pages, upload-pages-artifact and deploy-pages off the
deprecated v1/v2/v3 action versions."
git push origin main
```

- [ ] **Step 6: Confirm the deployment succeeded**

```bash
gh run watch
curl -s -o /dev/null -w "%{http_code}\n" https://yordivad.github.io/
curl -s -o /dev/null -w "%{http_code}\n" https://yordivad.github.io/work/
curl -s -o /dev/null -w "%{http_code}\n" https://yordivad.github.io/research/
curl -s -o /dev/null -w "%{http_code}\n" https://yordivad.github.io/writing/
curl -s -o /dev/null -w "%{http_code}\n" https://yordivad.github.io/about/
```

Expected: the workflow succeeds and all five URLs return 200. If the workflow fails on `bundle install`, the committed `Gemfile.lock` is stale — delete it, rerun `./script/check` to regenerate, and commit the new lockfile.

---

## Follow-up work, not in this plan

Recorded here so it is not lost:

1. **Publish the Aleph documentation site.** `mlambda-net.github.io/MLambda.Aleph/` returns 404, so the installer commands in the Aleph README do not resolve for anyone who tries them. This is the weakest link in the most distinctive claim on the site.
2. **Per-article LinkedIn URLs.** `_data/publications.yml` supports an optional `url` per article; fill them in when the direct links are to hand.
3. **The MLambda org site.** Separate sub-project, separate spec, to be brainstormed after this ships.
