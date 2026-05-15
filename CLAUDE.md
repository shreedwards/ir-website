# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (hot reload)
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
```

No test runner or linter is configured.

## Stack

- **Vue 3** (Composition API) with **Vite** as the build tool
- **JavaScript** (no TypeScript); path alias `@` maps to `./src`
- SPA with a single `index.html` entry point mounting to `<div id="app">`

## Architecture

Currently a clean Vite scaffold — no router, no state management, no backend integration. The meaningful files are:

- `src/main.js` — creates and mounts the Vue app
- `src/App.vue` — root component
- `src/components/` — reusable SFC components
- `src/assets/` — global CSS (`base.css` → `main.css`) and static assets

When adding features, use the `@/` alias for imports (e.g. `import Foo from '@/components/Foo.vue'`).
