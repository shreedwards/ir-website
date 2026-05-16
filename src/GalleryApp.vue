<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SiteFooter from '@/components/SiteFooter.vue'

const scrolled = ref(false)
const lightbox = ref(null)

const navLinks = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/about.html' },
  { label: 'Gallery', href: '#top' },
  { label: 'Booking', href: '/#booking' },
]

const allPhotos = import.meta.glob('./assets/photography/**/*.webp', { eager: true, import: 'default' })
const p = (path) => allPhotos[`./assets/photography/${path}`]

const heroImg = p('patio/sunset.webp')

const sections = [
  {
    id: 'bedrooms',
    title: 'Bedrooms',
    photos: [
      { name: 'Master Bedroom',       src: p('bedrooms/main-1.webp') },
      { name: 'Master Bedroom',       src: p('bedrooms/main-2.webp') },
      { name: 'Guest Bedroom',        src: p('bedrooms/guest-a.webp') },
      { name: 'Twin Bedroom',         src: p('bedrooms/guest-b-1.webp') },
      { name: 'Twin Bedroom',         src: p('bedrooms/guest-b-2.webp') },
    ],
  },
  {
    id: 'bathrooms',
    title: 'Bathrooms',
    photos: [
      { name: 'Master En-Suite', src: p('bathrooms/main.webp') },
      { name: 'En-Suite Vanity', src: p('bathrooms/guest-c.webp') },
    ],
  },
  {
    id: 'living',
    title: 'Living Spaces',
    photos: [
      { name: 'Open-Plan Living',    src: p('open-space/dining-room-1.webp') },
      { name: 'Dining Area',         src: p('open-space/dining-room-2.webp') },
      { name: 'Entrance Hall',       src: p('open-space/entrance.webp') },
      { name: 'Lounge',              src: p('open-space/lounge.webp') },
      { name: 'Indoor/Outdoor Flow', src: p('open-space/patio-exit.webp') },
    ],
  },
  {
    id: 'patio-pool',
    title: 'Patio & Pool',
    photos: [
      { name: 'Infinity Pool',      src: p('patio/pool.webp') },
      { name: 'Fire Pit at Sunset', src: p('patio/sunset.webp') },
      { name: 'Covered Patio',      src: p('patio/indoor-1.webp') },
      { name: 'Evening Patio',      src: p('patio/indoor-2.webp') },
      { name: 'Property Exterior',  src: p('patio/front-view.webp') },
      { name: 'Weber Braai',        src: p('patio/braai.webp') },
      { name: 'Fire Pit',           src: p('patio/firepit.webp') },
    ],
  },
  {
    id: 'wildlife',
    title: 'Nature & Wildlife',
    photos: [
      { name: 'Zebras at the Pool', src: p('nature/zebra-drinking.webp') },
      { name: 'Zebra Visitors',     src: p('nature/zebra.webp') },
      { name: 'Wildebeest',         src: p('nature/wildebeest.webp') },
      { name: 'Kudu Bull',          src: p('nature/kudu-bull.webp') },
      { name: 'Kudu & Warthog',     src: p('nature/kudu-warthog.webp') },
      { name: 'Bush Sunset',        src: p('nature/sunset-late.webp') },
      { name: 'Golden Hour',        src: p('nature/sunset-early.webp') },
      { name: 'Full Moon',          src: p('nature/night-sky.webp') },
      { name: 'Bush Surroundings',  src: p('nature/knob-thorn.webp') },
    ],
  },
]

const tileClass = (i) => i % 5 === 0 ? 'tile-wide' : ''

const openLightbox = (photo) => { lightbox.value = photo }
const closeLightbox = () => { lightbox.value = null }

const handleScroll = () => { scrolled.value = window.scrollY > 60 }
const handleKey = (e) => { if (e.key === 'Escape') closeLightbox() }

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKey)
})
</script>

<template>
  <!-- NAV -->
  <nav :class="{ scrolled }">
    <a href="/" class="nav-brand" style="text-decoration:none">
      <span class="nav-brand-name">Ingonyama Rest</span>
      <span class="nav-brand-sub">Marloth Park</span>
    </a>
    <ul class="nav-links">
      <li v-for="link in navLinks" :key="link.label">
        <a :href="link.href">{{ link.label }}</a>
      </li>
    </ul>
  </nav>

  <!-- PAGE HEADER -->
  <header id="top" class="gallery-page-header" :style="{ '--hero-img': `url(${heroImg})` }">
    <div class="gallery-header-content">
      <p class="hero-eyebrow">Visual Journey</p>
      <h1 class="gallery-page-title"><em>Gallery</em></h1>
      <div class="hero-divider"></div>
      <p class="hero-sub">Inside Ingonyama Rest</p>
    </div>
  </header>

  <!-- SECTION QUICK-NAV -->
  <div class="section-quicknav">
    <a v-for="s in sections" :key="s.id" :href="'#' + s.id" class="quicknav-link">{{ s.title }}</a>
  </div>

  <!-- PHOTO SECTIONS -->
  <main>
    <section
      v-for="(section, si) in sections"
      :key="section.id"
      :id="section.id"
      class="photo-section"
      :class="si % 2 === 0 ? 'bg-smoke' : 'bg-white'"
    >
      <div class="photo-section-header">
        <p class="section-label">{{ section.title }}</p>
        <h2 class="photo-section-title">{{ section.title }}</h2>
      </div>
      <div class="photo-grid">
        <div
          v-for="(photo, i) in section.photos"
          :key="photo.name + i"
          class="photo-tile"
          :class="tileClass(i)"
          @click="openLightbox(photo)"
          role="button"
          tabindex="0"
          :aria-label="`View ${photo.name}`"
          @keydown.enter="openLightbox(photo)"
        >
          <img :src="photo.src" :alt="photo.name" loading="lazy" />
          <div class="tile-label">{{ photo.name }}</div>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <SiteFooter />

  <!-- LIGHTBOX -->
  <Transition name="lb">
    <div v-if="lightbox" class="lightbox" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox" aria-label="Close">×</button>
      <img class="lightbox-img" :src="lightbox.src" :alt="lightbox.name" />
      <p class="lightbox-caption">{{ lightbox.name }}</p>
    </div>
  </Transition>
</template>

<style>
/* ── GALLERY PAGE HEADER ─────────────────────────────── */
.gallery-page-header {
  height: 52vh;
  min-height: 360px;
  background:
    linear-gradient(to bottom, rgba(28,18,10,.45) 0%, rgba(28,18,10,.65) 100%),
    var(--hero-img) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}

.gallery-header-content { position: relative; }

.gallery-page-title {
  font-family: var(--ff-display), serif;
  font-size: clamp(4rem, 8vw, 7.5rem);
  font-weight: 300;
  color: var(--white);
  line-height: 1;
  letter-spacing: -.01em;
}

/* ── SECTION QUICK-NAV ───────────────────────────────── */
.section-quicknav {
  position: sticky;
  top: var(--nav-h);
  z-index: 90;
  background: var(--ink);
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
}
.section-quicknav::-webkit-scrollbar { display: none; }

.quicknav-link {
  flex: none;
  padding: 14px 32px;
  font-size: .65rem;
  font-weight: 500;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(253,250,245,.45);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: color .2s, border-color .2s;
  white-space: nowrap;
}
.quicknav-link:hover {
  color: var(--ember);
  border-bottom-color: var(--ember);
}

/* ── PHOTO SECTIONS ──────────────────────────────────── */
.photo-section {
  padding: 80px 48px;
  scroll-margin-top: calc(var(--nav-h) + 46px);
}
.bg-smoke { background: var(--smoke); }
.bg-white  { background: var(--white); }

.photo-section-header {
  max-width: 1200px;
  margin: 0 auto 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(61,43,26,.12);
}

.photo-section-title {
  font-family: var(--ff-display), serif;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 300;
  color: var(--bark);
  margin-top: 6px;
}

/* ── PHOTO GRID ──────────────────────────────────────── */
.photo-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 280px;
  gap: 6px;
  grid-auto-flow: dense;
}

.tile-wide { grid-column: span 2; }

.photo-tile {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: var(--dust);
}
.photo-tile:focus-visible { outline: 2px solid var(--ember); outline-offset: 2px; }

.photo-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .55s cubic-bezier(.25,.46,.45,.94);
}
.photo-tile:hover img { transform: scale(1.06); }

.tile-label {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 32px 16px 14px;
  background: linear-gradient(to top, rgba(28,18,10,.78) 0%, transparent 100%);
  font-family: var(--ff-display), serif;
  font-size: .95rem;
  font-weight: 400;
  color: var(--white);
  letter-spacing: .03em;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity .28s, transform .28s;
}
.photo-tile:hover .tile-label,
.photo-tile:focus-visible .tile-label {
  opacity: 1;
  transform: translateY(0);
}

/* ── LIGHTBOX ────────────────────────────────────────── */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(28,18,10,.96);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 48px 48px;
}

.lightbox-img {
  max-width: 100%;
  max-height: 76vh;
  object-fit: contain;
  box-shadow: 0 32px 80px rgba(0,0,0,.5);
}

.lightbox-caption {
  font-family: var(--ff-display), serif;
  font-size: 1.05rem;
  font-weight: 300;
  font-style: italic;
  color: var(--ember);
  margin-top: 22px;
  letter-spacing: .06em;
}

.lightbox-close {
  position: absolute;
  top: calc(var(--nav-h) + 16px);
  right: 32px;
  width: 44px;
  height: 44px;
  font-size: 1.6rem;
  color: rgba(253,250,245,.55);
  background: none;
  border: 1px solid rgba(253,250,245,.18);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color .2s, border-color .2s;
}
.lightbox-close:hover {
  color: var(--white);
  border-color: rgba(253,250,245,.45);
}

.lb-enter-active, .lb-leave-active { transition: opacity .22s; }
.lb-enter-from, .lb-leave-to { opacity: 0; }

/* ── GALLERY RESPONSIVE ──────────────────────────────── */
@media (max-width: 900px) {
  .photo-section { padding: 60px 24px; }
  .photo-grid { grid-auto-rows: 220px; }
}

@media (max-width: 600px) {
  .gallery-page-header { height: 40vh; min-height: 280px; }
  .photo-section { padding: 48px 16px; }
  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
    gap: 4px;
  }
  .tile-wide { grid-column: span 2; }
  .lightbox { padding: 64px 16px 32px; }
  .lightbox-close { right: 16px; }
}
</style>
