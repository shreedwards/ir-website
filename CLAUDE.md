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
- Multi-page application (MPA) — no router; each page is a separate HTML entry point

## Pages

| File | Entry JS | Root Component | URL |
|---|---|---|---|
| `index.html` | `src/main.js` | `src/App.vue` | `/` |
| `gallery.html` | `src/gallery.js` | `src/GalleryApp.vue` | `/gallery.html` |
| `about.html` | `src/about.js` | `src/AboutApp.vue` | `/about.html` |

All three pages are registered in `vite.config.js` under `build.rollupOptions.input`.

## Architecture

No router, no state management, no backend integration. Shared files:

- `src/assets/main.css` — all global styles (design tokens, nav, hero, buttons, footer, reveal animation, responsive breakpoints). Every page entry imports this.
- `src/components/SiteFooter.vue` — shared footer used on all three pages
- `src/assets/photography/` — actual property photos (`.webp`), organised by room/category (see below)

Page-specific styles live in `<style>` blocks inside each `*App.vue` component.

## Design System

Defined as CSS custom properties in `main.css`:

```css
--clay:  #C4824A   /* primary CTA, accents */
--ember: #E0A264   /* warm accent, nav underline */
--dust:  #F2DFC3
--bark:  #3D2B1A   /* dark section backgrounds */
--earth: #7A5230
--sage:  #8B9E7A   /* used for "Further Away" zone accent */
--smoke: #F7F1E8   /* light section backgrounds */
--ink:   #1C120A   /* darkest, footer/nav */
--gold:  #D4A55A
--white: #FDFAF5

--ff-display: 'Cormorant Garamond', Georgia, serif
--ff-body:    'Jost', sans-serif
--nav-h: 72px
```

Sections alternate between `--bark` (dark) and `--smoke` (light) backgrounds. Scroll-reveal uses the `.reveal` / `.reveal.visible` classes driven by `IntersectionObserver` in each page's `onMounted`.

## Photography

All property photos live in `src/assets/photography/` and are imported via Vite's `import.meta.glob`:

```js
const allPhotos = import.meta.glob('./assets/photography/**/*.webp', { eager: true, import: 'default' })
const p = (path) => allPhotos[`./assets/photography/${path}`]
```

Folder structure:

```
src/assets/photography/
  bedrooms/      main-1, main-2, guest-a, guest-b-1, guest-b-2, guest-b-3
  bathrooms/     main, guest-a-1, guest-a-2, guest-b, guest-c
  open-space/    entrance, lounge, dining-room-1, dining-room-2, scullery, wet-room, patio-exit
  patio/         pool, sunset, indoor-1, indoor-2, outdoor, front-view, braai, firepit
  nature/        zebra-drinking, zebra, wildebeest, kudu-bull, kudu-warthog,
                 sunset-late, sunset-early, night-sky, knob-thorn
```

The homepage hero (`#home`) still uses an Unsplash image (hardcoded in `main.css` on `.hero-bg`) — this is intentional.

## Nav Links

All pages share the same nav destinations. When adding a new page, update the `navLinks` array in all three `*App.vue` files **and** `src/components/SiteFooter.vue`.

| Label | Destination |
|---|---|
| Home | `/` |
| About | `/about.html` |
| Gallery | `/gallery.html` |
| Booking | `/#booking` |
