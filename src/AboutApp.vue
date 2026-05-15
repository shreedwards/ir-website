<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SiteFooter from '@/components/SiteFooter.vue'

const scrolled = ref(false)

const navLinks = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '#top' },
  { label: 'Gallery', href: '/gallery.html' },
  { label: 'Booking', href: '/#booking' },
]

const propertyStats = [
  { figure: '6',     label: 'Guests' },
  { figure: '3',     label: 'Bedrooms' },
  { figure: '3+1',   label: 'Bathrooms' },
  { figure: 'Pool',  label: 'Infinity Edge' },
  { figure: 'A/C',   label: 'Every Room' },
  { figure: 'Solar', label: 'Power Backup' },
]

const amenityGroups = [
  {
    icon: '🍳',
    title: 'Kitchen & Scullery',
    items: [
      { name: 'Major Appliances',  desc: 'Large fridge-freezer, electric oven, and gas stove top.' },
      { name: 'Small Appliances',  desc: 'Microwave, kettle, toaster, and air-fryer.' },
      { name: 'Crockery & Cutlery', desc: 'Full set of kitchenware including specialised items for young children.' },
      { name: 'Water Filtration',  desc: 'Filter fitted at prep sink for drinkable water.' },
      { name: 'Laundry & Cleaning', desc: 'Dishwasher, washing machine, iron, ironing board, outdoor line, and indoor drying rack.' },
    ],
  },
  {
    icon: '⚡',
    title: 'Utilities & Backup',
    items: [
      { name: 'Solar Power System', desc: '10 solar panels, an 8 KVA hybrid inverter, and two 5.12 kWh batteries for uninterrupted power.' },
      { name: 'Water Backup',       desc: '10,000L Jojo tank connected to municipal mains with a manual switch-over for outages.' },
      { name: 'Gas Supply',         desc: 'Two 19kg outdoor gas cylinders dedicated to the kitchen stove.' },
    ],
  },
  {
    icon: '🌿',
    title: 'Patio & Outdoor',
    items: [
      { name: 'Seating & Climate', desc: 'Indoor/outdoor seating with a large umbrella and heat-shielding aluminium shutters.' },
      { name: 'Cooking & Fire',    desc: 'Weber braai with utensils, mini-pizza oven with stone, and a separate fire pit.' },
    ],
  },
  {
    icon: '📺',
    title: 'Lounge & Entertainment',
    items: [
      { name: 'Media & Tech', desc: 'TV with HDMI cable and Xiaomi TV box.' },
      { name: 'Board Games',  desc: 'Selection including Jenga, Uno, and Boggle.' },
    ],
  },
  {
    icon: '🛁',
    title: 'Personal Care & Linens',
    items: [
      { name: 'Linens & Towels', desc: 'Fresh bed linen and bath towels provided.' },
      { name: 'Toiletries',      desc: 'Starter supply of toilet rolls (guests should bring extra for long stays).' },
      { name: 'Grooming',        desc: 'Hairdryer located in the main bedroom.' },
    ],
  },
]

const attractionZones = [
  {
    label: 'In the Park',
    eyebrow: 'Marloth Park',
    items: [
      { name: 'Walking & Running Trails', desc: 'Daytime routes (6am–6pm) along park roads; Seekoie Road offers river views into Kruger.' },
      { name: 'Marloth Bike Hire',        desc: 'Bicycle rentals for exploring the local park terrain.' },
      { name: 'Atlantis Water Park',      desc: 'Water slides and entertainment at the Bush Centre, plus putt-putt golf.' },
      { name: 'Local Centres & Dining',   desc: 'Two shopping centres and multiple restaurants and pubs within the park.' },
      { name: 'Tourist Information',      desc: 'Information hub on Olifants Drive for local events and happenings.' },
      { name: 'Grand Kruger Spa',         desc: 'Luxury lodge and spa 150m from the property offering wellness treatments.' },
    ],
  },
  {
    label: 'Local Area',
    eyebrow: 'Day Trips',
    items: [
      { name: 'Kruger National Park', desc: 'Premier wildlife reserve via Crocodile Bridge or Malelane Gate; ideal for self-drives.' },
      { name: 'Komatipoort',          desc: 'Border town with restaurants, seafood at Tamborina, and grocery options.' },
      { name: 'Kambaku Golf Club',    desc: 'Local golf course hosting the weekly Vitality ParkRun on Saturdays.' },
      { name: 'Komati Archery',       desc: 'Target archery experiences for an alternative outdoor adventure.' },
    ],
  },
  {
    label: 'Further Away',
    eyebrow: 'Explore More',
    items: [
      { name: 'Lowveld National Gardens', desc: 'Botanical gardens in Mbombela with scenic walks and on-site dining.' },
      { name: 'Kaapschehoop',             desc: 'Arty mountain village with bouldering, quaint shops, and a hike to Battery Creek waterfall.' },
      { name: 'Sudwala Caves',            desc: "World's oldest known cave system with guided tours, ziplining, and a Zen garden." },
    ],
  },
]

const handleScroll = () => { scrolled.value = window.scrollY > 60 }

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
  <header id="top" class="about-page-header">
    <div class="about-header-content">
      <p class="hero-eyebrow">Marloth Park · South Africa</p>
      <h1 class="about-page-title">The <em>Home</em></h1>
      <div class="hero-divider"></div>
      <p class="hero-sub">Ingonyama Rest</p>
    </div>
  </header>

  <!-- DESCRIPTION -->
  <section class="desc-section section-pad">
    <div class="desc-inner">

      <div class="desc-lead reveal">
        <p class="section-label">Your Home in the Wild</p>
        <h2 class="desc-title">A self-catering retreat<br>in the <em>Lowveld bush</em></h2>
      </div>

      <div class="desc-body reveal" style="transition-delay:.1s">
        <p>Ingonyama Rest is a self-catering home sleeping 6 individuals. The house is a free-standing home in the bush complete with your own patio, pool and surrounding garden.</p>
        <p>There are 3 bedrooms, each en-suite plus a separate guest toilet, fully equipped kitchen and scullery with a dishwasher and washing machine. The open-plan living room with elevated ceilings leads out to the indoor/outdoor patio and infinity-edge pool.</p>
        <p>The main bedroom has a queen-size bed, the other two rooms having two single beds each. Every room is air-conditioned with additional ceiling fans in each living area and bedrooms.</p>
      </div>

      <div class="stats-row reveal" style="transition-delay:.2s">
        <div v-for="stat in propertyStats" :key="stat.label" class="stat-item">
          <div class="stat-figure">{{ stat.figure }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <div class="desc-cta reveal" style="transition-delay:.3s">
        <a href="/#booking" class="btn-primary">Book Your Stay →</a>
        <a href="/gallery.html" class="btn-outline">View Gallery</a>
      </div>

    </div>
  </section>

  <!-- AMENITIES -->
  <section class="amenities-section section-pad">
    <div class="amenities-inner">

      <div class="amenities-head reveal">
        <p class="section-label" style="color:var(--ember)">What's Included</p>
        <h2 class="page-h2 light">Amenities</h2>
      </div>

      <div class="amenity-groups">
        <div
          v-for="(group, i) in amenityGroups"
          :key="group.title"
          class="amenity-group reveal"
          :style="`transition-delay:${i * .09}s`"
        >
          <div class="ag-head">
            <span class="ag-icon">{{ group.icon }}</span>
            <h3 class="ag-title">{{ group.title }}</h3>
          </div>
          <ul class="ag-list">
            <li v-for="item in group.items" :key="item.name" class="ag-row">
              <span class="ag-name">{{ item.name }}</span>
              <span class="ag-desc">{{ item.desc }}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>

  <!-- ATTRACTIONS -->
  <section class="attractions-section section-pad">
    <div class="attractions-inner">

      <div class="attractions-head reveal">
        <p class="section-label">Things to Do</p>
        <h2 class="page-h2 dark">Attractions &amp; Experiences</h2>
        <p class="attractions-sub">Explore the best of Marloth Park and beyond</p>
      </div>

      <div class="zones-grid">
        <div
          v-for="(zone, zi) in attractionZones"
          :key="zone.label"
          class="zone reveal"
          :class="`zone-${zi}`"
          :style="`transition-delay:${zi * .12}s`"
        >
          <div class="zone-head">
            <p class="zone-eyebrow">{{ zone.eyebrow }}</p>
            <h3 class="zone-title">{{ zone.label }}</h3>
          </div>
          <div class="zone-items">
            <div v-for="item in zone.items" :key="item.name" class="attr-card">
              <div class="attr-name">{{ item.name }}</div>
              <p class="attr-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="cta-strip">
    <div class="cta-inner reveal">
      <p class="section-label" style="color:var(--ember)">Plan Your Visit</p>
      <h2 class="cta-title">Ready to experience<br><em>Ingonyama Rest?</em></h2>
      <div class="cta-buttons">
        <a href="/#booking" class="btn-primary">Book Your Stay →</a>
        <a href="/gallery.html" class="btn-outline cta-outline">View Gallery</a>
      </div>
    </div>
  </section>

  <SiteFooter />
</template>

<style>
/* ── PAGE HEADER ─────────────────────────────────────── */
.about-page-header {
  height: 52vh;
  min-height: 360px;
  background:
    linear-gradient(to bottom, rgba(28,18,10,.42) 0%, rgba(28,18,10,.68) 100%),
    url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1800&auto=format&fit=crop&q=80') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}

.about-header-content { position: relative; }

.about-page-title {
  font-family: var(--ff-display), serif;
  font-size: clamp(4rem, 8vw, 7.5rem);
  font-weight: 300;
  color: var(--white);
  line-height: 1;
  letter-spacing: -.01em;
}
.about-page-title em {
  font-style: italic;
  color: var(--ember);
}

/* ── SHARED HEADING STYLE ────────────────────────────── */
.page-h2 {
  font-family: var(--ff-display), serif;
  font-size: clamp(2rem, 3.5vw, 2.9rem);
  font-weight: 300;
  line-height: 1.15;
  margin-top: 12px;
}
.page-h2.light { color: var(--white); }
.page-h2.dark  { color: var(--bark); }

/* ── DESCRIPTION SECTION ─────────────────────────────── */
.desc-section { background: var(--smoke); }

.desc-inner {
  max-width: 820px;
  margin: 0 auto;
}

.desc-lead {
  text-align: center;
  margin-bottom: 44px;
}

.desc-title {
  font-family: var(--ff-display), serif;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 300;
  color: var(--bark);
  line-height: 1.15;
  margin-top: 16px;
}
.desc-title em {
  font-style: italic;
  color: var(--clay);
}

.desc-body {
  margin-bottom: 52px;
}
.desc-body p {
  font-size: .98rem;
  line-height: 1.9;
  color: var(--earth);
  font-weight: 300;
  margin-bottom: 1.1em;
}
.desc-body p:last-child { margin-bottom: 0; }

/* ── STATS ROW ───────────────────────────────────────── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1px;
  background: rgba(196,130,74,.18);
  border: 1px solid rgba(196,130,74,.18);
  margin-bottom: 48px;
}

.stat-item {
  text-align: center;
  padding: 28px 12px;
  background: var(--smoke);
}

.stat-figure {
  font-family: var(--ff-display), serif;
  font-size: 1.85rem;
  font-weight: 600;
  color: var(--clay);
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -.01em;
}

.stat-label {
  font-size: .6rem;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--earth);
  font-weight: 400;
}

/* ── DESC CTA ────────────────────────────────────────── */
.desc-cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

/* ── AMENITIES SECTION ───────────────────────────────── */
.amenities-section {
  background: var(--bark);
  position: relative;
  overflow: hidden;
}
.amenities-section::before {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 420px; height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(196,130,74,.12) 0%, transparent 70%);
  pointer-events: none;
}

.amenities-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.amenities-head {
  text-align: center;
  margin-bottom: 56px;
}

.amenity-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.amenity-group {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(196,130,74,.2);
  padding: 32px 28px;
  transition: background .25s, border-color .25s;
}
.amenity-group:hover {
  background: rgba(196,130,74,.08);
  border-color: rgba(196,130,74,.42);
}

.ag-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(196,130,74,.18);
}

.ag-icon { font-size: 1.5rem; line-height: 1; flex-shrink: 0; }

.ag-title {
  font-family: var(--ff-display), serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--white);
  letter-spacing: .02em;
}

.ag-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.ag-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ag-name {
  font-size: .68rem;
  font-weight: 500;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--ember);
}

.ag-desc {
  font-size: .87rem;
  line-height: 1.65;
  color: rgba(253,250,245,.58);
  font-weight: 300;
}

/* ── ATTRACTIONS SECTION ─────────────────────────────── */
.attractions-section { background: var(--smoke); }

.attractions-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.attractions-head {
  text-align: center;
  margin-bottom: 60px;
}

.attractions-sub {
  font-size: .88rem;
  color: rgba(61,43,26,.45);
  margin-top: 16px;
  letter-spacing: .05em;
}

.zones-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px;
  align-items: start;
}

.zone-head {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--clay);
}

.zone-1 .zone-head { border-color: var(--earth); }
.zone-2 .zone-head { border-color: var(--sage); }

.zone-eyebrow {
  font-size: .6rem;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: var(--clay);
  margin-bottom: 6px;
}
.zone-1 .zone-eyebrow { color: var(--earth); }
.zone-2 .zone-eyebrow { color: var(--sage); }

.zone-title {
  font-family: var(--ff-display), serif;
  font-size: 1.85rem;
  font-weight: 300;
  color: var(--bark);
  line-height: 1.1;
}

.zone-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.attr-card {
  background: var(--white);
  padding: 18px 20px;
  border-left: 3px solid rgba(196,130,74,.35);
  box-shadow: 0 2px 10px rgba(61,43,26,.05);
  transition: border-color .25s, box-shadow .25s, transform .22s;
}
.attr-card:hover {
  border-left-color: var(--clay);
  box-shadow: 0 6px 22px rgba(61,43,26,.1);
  transform: translateX(4px);
}

.zone-1 .attr-card { border-left-color: rgba(122,82,48,.3); }
.zone-1 .attr-card:hover { border-left-color: var(--earth); }

.zone-2 .attr-card { border-left-color: rgba(139,158,122,.35); }
.zone-2 .attr-card:hover { border-left-color: var(--sage); }

.attr-name {
  font-size: .72rem;
  font-weight: 500;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--bark);
  margin-bottom: 6px;
}

.attr-desc {
  font-size: .85rem;
  line-height: 1.65;
  color: rgba(61,43,26,.58);
  font-weight: 300;
}

/* ── CTA STRIP ───────────────────────────────────────── */
.cta-strip {
  background: var(--bark);
  padding: 100px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-strip::before {
  content: '';
  position: absolute;
  bottom: -80px; left: -80px;
  width: 420px; height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(196,130,74,.12) 0%, transparent 70%);
  pointer-events: none;
}

.cta-inner {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.cta-title {
  font-family: var(--ff-display), serif;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 300;
  color: var(--white);
  line-height: 1.15;
  margin-top: 12px;
  margin-bottom: 44px;
}
.cta-title em {
  font-style: italic;
  color: var(--ember);
}

.cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-outline {
  border-color: rgba(253,250,245,.35) !important;
  color: rgba(253,250,245,.7) !important;
}
.cta-outline:hover {
  background: rgba(253,250,245,.1) !important;
  color: var(--white) !important;
}

/* ── RESPONSIVE ──────────────────────────────────────── */
@media (max-width: 900px) {
  .stats-row { grid-template-columns: repeat(3, 1fr); }
  .amenity-groups { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
  .zones-grid { grid-template-columns: 1fr; gap: 40px; }
  .zone-head { margin-bottom: 20px; }
  .cta-strip { padding: 80px 24px; }
}

@media (max-width: 600px) {
  .about-page-header { height: 40vh; min-height: 280px; }
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .amenity-groups { grid-template-columns: 1fr; }
}
</style>
