<script setup>
import { onMounted, onUnmounted } from 'vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteNav from '@/components/SiteNav.vue'
import AvailabilityCalendar from '@/components/AvailabilityCalendar.vue'
import { Phone, Mail, MapPin } from '@lucide/vue'
import imgPool    from '@/assets/photography/patio/pool.webp'
import imgMaster  from '@/assets/photography/bedrooms/main-1.webp'
import imgLiving  from '@/assets/photography/open-space/dining-room-1.webp'
import imgZebras  from '@/assets/photography/nature/zebra-drinking.webp'

const navLinks = [
  { label: 'Home',    href: '#home' },
  { label: 'About',   href: '/about.html' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Booking', href: '#booking' },
]

const amenities = [
  { icon: '🛏️', title: 'Sleeps 6',      sub: 'Three air-conditioned bedrooms' },
  { icon: '🚿', title: '3½ Bathrooms',  sub: 'Three En-suite & one guest' },
  { icon: '🏊', title: 'Infinity Pool', sub: 'With elevated patio' },
  { icon: '🍳', title: 'Full Kitchen',  sub: 'Perfect for bush braais' },
]

const reviews = [
  {
    text: "An unforgettable stay surrounded by wildlife. It was comfortable, peaceful, and felt like a true home away from home. We would absolutely stay here again.",
    name: 'C.N. Amour',
    origin: 'Booking.com',
  },
  {
    text: "A fantastic getaway. The host was super friendly and professional, and the service was top notch. Highly recommended!",
    name: 'Sarah B.',
    origin: 'LekkeSlaap',
  },
  {
    text: "A beautiful home with everything you need! Air-cons, fans and the pool are perfect for the heat. Would absolutely recommend.",
    name: 'Lorinda',
    origin: 'Airbnb',
  },
]

const rates = [
  { label: 'Standard Rate',   price: 'R2 700', per: 'per night', note: 'Year-round base rate' },
  { label: 'Weekly Rate',     price: 'R2 430', per: 'per night', note: '7 nights or more' },
  { label: 'School Holidays', price: 'R3 000', per: 'per night', note: 'Easter, July & Sept/Oct' },
  { label: 'Festive Season',  price: 'R3 500', per: 'per night', note: '16 Dec – 15 Jan' },
]

const galleryCards = [
  { title: 'The Infinity Pool',    img: imgPool,   href: 'gallery.html#patio-pool' },
  { title: 'Master Bedroom',       img: imgMaster, href: 'gallery.html#bedrooms' },
  { title: 'Open Living Area',     img: imgLiving, href: 'gallery.html#living' },
  { title: 'Wildlife at the Pool', img: imgZebras, href: 'gallery.html#wildlife' },
]

let observer

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.12 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <!-- NAV -->
  <SiteNav :nav-links="navLinks" />

  <!-- HERO -->
  <section id="home">
    <div class="hero-bg"></div>
    <div class="hero-grain"></div>
    <div class="hero-content">
      <p class="hero-eyebrow">Marloth Park · South Africa</p>
      <h1 class="hero-title">Where the<br><em>lion</em> rests</h1>
      <div class="hero-divider"></div>
      <p class="hero-sub">Ingonyama Rest</p>
    </div>
    <div class="hero-location">
      <p class="hero-location-label">Location</p>
      <p class="hero-location-text">Marloth Park<br>Adjacent to Kruger National Park<br>Mpumalanga, South Africa</p>
    </div>
    <div class="hero-scroll">
      <div class="scroll-line"></div>
      <span>Scroll</span>
    </div>
  </section>

  <!-- ABOUT + AMENITIES -->
  <section id="about" class="section-pad">
    <div class="about-inner">
      <div class="about-text-block reveal">
        <p class="section-label">Your Home in the Wild</p>
        <h2 class="about-title">Luxury comforts inside.<br><em>The full Kruger<br>experience outside.</em></h2>
        <p class="about-desc">
          Ingonyama Rest is a private holiday home nestled in the heart of Marloth Park,
          where unfenced wilderness meets refined comfort. Wake to the sound of birdsong,
          watch giraffes stroll past at dusk, and return each evening to every luxury
          you could want. Africa, in its full, untamed glory — right at your doorstep.
        </p>
        <div class="cta-group">
          <a href="#booking" class="btn-primary">Book Your Stay →</a>
          <a href="#gallery-highlights" class="btn-outline">Explore the Space</a>
        </div>
      </div>
      <div class="amenities-grid reveal" style="transition-delay:.15s">
        <div v-for="a in amenities" :key="a.title" class="amenity-card">
          <div class="amenity-icon">{{ a.icon }}</div>
          <div class="amenity-title">{{ a.title }}</div>
          <div class="amenity-sub">{{ a.sub }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- REVIEWS -->
  <section id="reviews" class="section-pad">
    <div class="reviews-header reveal">
      <p class="section-label" style="color:var(--clay)">Guest Experiences</p>
      <h2 class="reviews-title">Reviews from the<br>bush</h2>
    </div>
    <div class="reviews-grid">
      <div
        v-for="(r, i) in reviews"
        :key="r.name"
        class="review-card reveal"
        :style="`transition-delay:${i * .12}s`"
      >
        <div class="review-stars">★★★★★</div>
        <p class="review-text">"{{ r.text }}"</p>
        <div class="review-author">
          <div class="review-avatar">{{ r.name[0] }}</div>
          <div>
            <div class="review-name">{{ r.name }}</div>
            <div class="review-origin">{{ r.origin }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- GALLERY HIGHLIGHTS -->
  <section id="gallery-highlights">
    <div class="gallery-header reveal">
      <p class="section-label" style="color:var(--ember)">Gallery</p>
      <h2 class="gallery-title" style="color:var(--white)">Inside Ingonyama Rest</h2>
    </div>
    <div class="gallery-grid reveal" style="transition-delay:.1s">
      <a
        v-for="(card, i) in galleryCards"
        :key="card.title"
        :href="card.href"
        class="gallery-card"
        :style="`transition-delay:${i * .08}s`"
      >
        <img class="gallery-card-img" :src="card.img" :alt="card.title" loading="lazy" />
        <div class="gallery-card-overlay"></div>
        <div class="gallery-card-label">
          <div class="gallery-card-title">{{ card.title }}</div>
          <div class="gallery-card-link">View Gallery →</div>
        </div>
      </a>
    </div>
  </section>

  <!-- BOOKING & CONTACT -->
  <section id="booking" class="section-pad">
    <div class="contact-inner">
      <div class="contact-header reveal">
        <p class="section-label" style="color:var(--clay)">Plan Your Visit</p>
        <h2 class="contact-title">Book Your Stay</h2>
      </div>

      <div class="contact-body">
        <div class="contact-details reveal">
          <p class="contact-label" style="margin-bottom:20px">Contact Us</p>
          <div class="booking-grid">
            <a href="tel:+27824645826" class="booking-card"><Phone :size="16" />+27 82 464 5826</a>
            <a href="mailto:leighanne@ingonyamarest.co.za" class="booking-card"><Mail :size="16" />bookings@ingonyama-rest.co.za</a>
            <a href="https://maps.app.goo.gl/rbEFiqR4MfDLUmPx5" class="booking-card"><MapPin :size="16" />2667 Hartbees Ave, Marloth Park</a>
          </div>
        </div>
        <div class="booking-links reveal" style="transition-delay:.15s">
          <p class="contact-label" style="margin-bottom:20px">Book via</p>
          <div class="booking-grid">
            <a href="https://www.booking.com/hotel/za/ingonyama-rest-marloth-park1.html" class="booking-card">Booking.com</a>
            <a href="https://lks.io/UmTJu312" class="booking-card">LekkeSlaap</a>
            <a href="https://www.airbnb.com/rooms/1331854868811267063" class="booking-card">Airbnb</a>
          </div>
        </div>
      </div>

      <div class="rates-block reveal">
        <p class="contact-label" style="margin-bottom:28px">Bookings & Rates</p>
        <div class="rates-layout">
          <div class="rules-cards">
            <div class="rule-card">
              <div class="rule-card-label">Booking Rules</div>
              <p class="rule-card-text">The entire property is booked as a unit regardless of the number of guests (maximum 6). A minimum stay of 3 nights is required.</p>
            </div>
            <div class="rule-card">
              <div class="rule-card-label">Payment</div>
              <p class="rule-card-text">A 50% deposit is required on booking, with the balance payable one month before arrival.</p>
            </div>
            <div class="rule-card rule-card--cancel">
              <div class="rule-card-label">Cancellation</div>
              <p class="rule-card-text">More than 30 days before arrival — free of charge. 7–30 days before — 50% of rent. Within 7 days of arrival — 100% of rent.</p>
            </div>
          </div>
          <div class="rate-tiers">
            <div
              v-for="(rate, i) in rates"
              :key="rate.label"
              class="rate-card"
            >
              <div class="rate-label">{{ rate.label }}</div>
              <div class="rate-price">{{ rate.price }} <span class="rate-per">{{ rate.per }}</span></div>
              <div class="rate-note">{{ rate.note }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="calendar-block reveal">
        <p class="contact-label" style="margin-bottom:20px">Availability</p>
        <AvailabilityCalendar />
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <SiteFooter />
</template>

<style scoped>
/* ── RATES BLOCK ─────────────────────────────────────── */
.rates-block {
  margin-top: 48px;
  padding-top: 40px;
  border-top: 1px solid rgba(196,130,74,.18);
}

.rates-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.rules-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rule-card {
  background: var(--white);
  border: 1px solid rgba(196,130,74,.2);
  border-left: 3px solid var(--clay);
  padding: 20px 20px 18px;
  transition: border-color .22s, box-shadow .22s;
}
.rule-card:hover {
  border-left-color: var(--ember);
  box-shadow: 0 4px 18px rgba(61,43,26,.08);
}
.rule-card--cancel {
  border-left-color: #b84040;
  background: rgba(184,64,64,.04);
}
.rule-card--cancel:hover {
  border-left-color: #c94a4a;
  box-shadow: 0 4px 18px rgba(184,64,64,.1);
}

.rule-card-label {
  font-size: .67rem;
  font-weight: 500;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--clay);
  margin-bottom: 10px;
}
.rule-card--cancel .rule-card-label { color: #b84040; }

.rule-card-text {
  font-size: .93rem;
  line-height: 1.75;
  color: var(--earth);
  font-weight: 300;
}

.rate-tiers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.rate-card {
  background: var(--white);
  border: 1px solid rgba(196,130,74,.2);
  border-left: 3px solid var(--clay);
  padding: 20px 20px 18px;
  transition: border-color .22s, box-shadow .22s;
}
.rate-card:hover {
  border-left-color: var(--ember);
  box-shadow: 0 4px 18px rgba(61,43,26,.08);
}

.rate-label {
  font-size: .67rem;
  font-weight: 500;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--clay);
  margin-bottom: 10px;
}

.rate-price {
  font-family: var(--ff-display), serif;
  font-size: 1.65rem;
  font-weight: 600;
  color: var(--bark);
  line-height: 1;
  margin-bottom: 8px;
}

.rate-per {
  font-family: var(--ff-body), sans-serif;
  font-size: .77rem;
  font-weight: 300;
  color: var(--earth);
  letter-spacing: .04em;
}

.rate-note {
  font-size: .83rem;
  color: rgba(61,43,26,.5);
  font-weight: 300;
}

@media (max-width: 860px) {
  .rates-layout { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 480px) {
  .rate-tiers { grid-template-columns: 1fr; }
}
</style>