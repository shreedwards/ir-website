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
  { label: 'Contact', href: '/#contact' },
]

const sections = [
  {
    id: 'bedrooms',
    title: 'Bedrooms',
    photos: [
      { name: 'Master Bedroom',       src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&auto=format&fit=crop&q=80' },
      { name: 'Master Bedroom Detail', src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Guest Bedroom 1',       src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Guest Bedroom 2',       src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Bedroom Linens',        src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'bathrooms',
    title: 'Bathrooms',
    photos: [
      { name: 'Master En-suite',  src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&auto=format&fit=crop&q=80' },
      { name: 'Rainfall Shower',  src: 'https://images.unsplash.com/photo-1620626011761-996317702b6f?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Guest Bathroom',   src: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Vanity Detail',    src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    photos: [
      { name: 'Kitchen Overview', src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&auto=format&fit=crop&q=80' },
      { name: 'Dining Area',      src: 'https://images.unsplash.com/photo-1617098474202-0d0d7f60ed8e?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Kitchen Counter',  src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Bush Braai Setup', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'living',
    title: 'Living Areas',
    photos: [
      { name: 'Main Lounge',        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80' },
      { name: 'Living Room',        src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Lounge Seating',     src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Indoor Dining',      src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Entertainment Area', src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 'patio-pool',
    title: 'Patio & Pool',
    photos: [
      { name: 'Infinity Pool',     src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&auto=format&fit=crop&q=80' },
      { name: 'Pool Deck',         src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Bush Views',        src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Outdoor Seating',   src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Evening on the Deck', src: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&auto=format&fit=crop&q=80' },
      { name: 'Sundowner Views',   src: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&auto=format&fit=crop&q=80' },
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
  <header id="top" class="gallery-page-header">
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
          :key="photo.name"
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
    url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1800&auto=format&fit=crop&q=80') center/cover no-repeat;
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
  .back-strip { padding: 48px 24px; }
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