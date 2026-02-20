# emergence

A minimal Jekyll portfolio theme for researchers and academics. Built with a custom design system featuring dual dark/light themes, glass morphism aesthetics, and content collections for projects, notes, and readings.

**Live demo:** [sungmin-park-dev.github.io/emergence-theme](https://sungmin-park-dev.github.io/emergence-theme)

---

## Features

- **Dual theme** — Dark (Stellar Blue) and Light (Deep Glacier), toggled at runtime via CSS custom properties
- **Content collections** — Projects, Notes, Readings with tag filtering and sort controls
- **Responsive bento grid** homepage
- **Post layout** with TOC sidebar, breadcrumb navigation, and [Utterances](https://utteranc.es/) comments
- **No theme gem dependency** — pure Jekyll 4.3 + individual plugins
- **Math rendering** — KaTeX support via front matter flag (`math: true`)
- **2,800+ line SCSS design system** — fully tokenized, easy to customize via `_data/` YAML files

---

## Quick Start

### Prerequisites

- Ruby 3.x
- Bundler

### Installation

1. **Use this template** (click "Use this template" on GitHub) or clone:

   ```bash
   git clone https://github.com/sungmin-park-dev/emergence-theme.git my-site
   cd my-site
   ```

2. **Install dependencies:**

   ```bash
   bundle install
   ```

3. **Serve locally:**

   ```bash
   bundle exec jekyll s -l
   ```

4. Open `http://localhost:4000` in your browser.

---

## Customization

### 1. Site info — `_config.yml`

```yaml
title: "emergence · Your Name"
tagline: "your · research · tagline"
author: "Your Name"
url: "https://yourusername.github.io"
baseurl: ""

github:
  username: yourusername
```

Set `baseurl: ""` for a root-level GitHub Pages site (`username.github.io`).
Set `baseurl: "/repo-name"` for a project page (`username.github.io/repo-name`).

### 2. Profile — `_data/profile.yml`

```yaml
name: "Your Name"
program: "PhD in Physics"
institution: "Your University"
email: "you@example.com"
cv_url: "/assets/cv.pdf"
social:
  github: "https://github.com/yourusername"
  linkedin: "https://linkedin.com/in/yourprofile"
```

### 3. Theme colors — `_data/theme_dark.yml` / `theme_light.yml`

All color tokens are defined as CSS custom properties in these YAML files. No SCSS knowledge required — edit values directly:

```yaml
# _data/theme_dark.yml
color-accent: "rgba(0, 200, 255, 0.92)"
color-text-primary: "rgba(240, 248, 255, 0.98)"
# ... 100+ tokens
```

### 4. Background images — `assets/img/common/`

Replace `bg-dark.jpg` and `bg-light.jpg` with your own images (used on the homepage).

---

## Adding Content

### Projects — `_projects/`

```markdown
---
title: "My Project"
description: "One-line description"
icon: fas fa-atom
tags: [Python, Physics, ML]
link: "https://github.com/username/repo"
order: 1
status: active   # active | completed | planned
---

Project body content (optional — shown on detail page).
```

### Notes — `_notes/<category>/filename.md`

```markdown
---
title: "Tensor Networks"
date: 2025-01-01 00:00:00 +0900
description: "Introduction to MPS and DMRG"
subcategory: physics   # physics | machine-learning | computation | ai-physics
tags: [tensor-networks, MPS]
math: true
toc: true
---

Note content with $\LaTeX$ math support.
```

### Readings — `_readings/<category>/filename.md`

```markdown
---
title: "Paper Review: Attention Is All You Need"
date: 2025-01-01 00:00:00 +0900
subcategory: papers   # papers | tech | perspectives
tags: [transformers, NLP]
paper:
  title: "Attention Is All You Need"
  authors: "Vaswani et al."
  year: 2017
  arxiv: "1706.03762"
---

Review content.
```

### Subcategories

The `subcategory` field controls which filter tab the content appears under. Add new subcategories by editing the filter buttons in `_tabs/notes.md` or `_tabs/readings.md`.

---

## Deployment

### GitHub Pages (recommended)

This repo includes a GitHub Actions workflow that builds and deploys automatically on push to `main`.

1. Push your site to a GitHub repository
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Push any change to `main` — the site deploys automatically

### Manual build

```bash
LANG=en_US.UTF-8 bundle exec jekyll build
```

Output is in `_site/`.

---

## Project Structure

```
emergence-theme/
├── _config.yml          # Site configuration
├── _data/
│   ├── profile.yml      # Personal info (used in About page and nav)
│   ├── theme_dark.yml   # Dark theme color tokens
│   └── theme_light.yml  # Light theme color tokens
├── _layouts/
│   ├── base.html        # HTML shell (head, body, theme toggle)
│   ├── minimal.html     # Homepage layout
│   ├── custom-page.html # Tab pages layout (nav + container)
│   └── post.html        # Content page layout (TOC, breadcrumb, comments)
├── _tabs/               # Main navigation pages
│   ├── projects.md
│   ├── notes.md
│   ├── readings.md
│   └── about.md
├── _projects/           # Projects collection
├── _notes/              # Notes collection
├── _readings/           # Readings collection
├── _sass/emergence/     # SCSS design system (~2,800 lines)
│   ├── _variables.scss
│   ├── _base.scss
│   ├── _typography.scss
│   ├── _components.scss
│   ├── _navigation.scss
│   └── pages/
└── assets/
    ├── css/emergence.scss  # SCSS entry point
    ├── js/tag-filter.js
    └── img/
```

---

## SCSS Architecture

New styles go into `_sass/emergence/` partials. Never add style rules to `assets/css/emergence.scss` (imports only).

```
_sass/emergence/
├── _variables.scss    # Design tokens (colors, fonts, spacing, breakpoints)
├── _base.scss         # Reset and utilities
├── _typography.scss   # Type system
├── _components.scss   # Reusable components (cards, buttons, tags)
├── _navigation.scss   # Top navigation bar
└── pages/
    ├── _home.scss
    ├── _projects.scss
    ├── _notes.scss
    ├── _readings.scss
    ├── _about.scss
    └── _post.scss
```

When adding a new partial, add a corresponding `@use` or `@import` line to `assets/css/emergence.scss`.

---

## Comments (Utterances)

Edit `_config.yml`:

```yaml
comments:
  provider: utterances
  utterances:
    repo: yourusername/your-repo
    issue_term: pathname
```

Set `provider: ""` to disable comments entirely.

---

## License

MIT License — see [LICENSE](LICENSE) for details.
