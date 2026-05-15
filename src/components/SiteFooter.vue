<script setup>
const navLinks = [
  { label: 'Home',    href: '/#home' },
  { label: 'About',   href: '/about.html' },
  { label: 'Gallery', href: '/gallery.html' },
  { label: 'Booking', href: '/#booking' },
]
</script>

<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <div class="footer-brand-name">Ingonyama Rest</div>
          <div class="footer-brand-sub">Marloth Park · South Africa</div>
          <p class="footer-tagline">Where the wild things rest.</p>
        </div>
        <ul class="footer-nav">
          <li v-for="link in navLinks" :key="link.href">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">© 2026 Ingonyama Rest. All rights reserved.</span>
        <span class="footer-lion">🦁</span>
      </div>
    </div>
  </footer>
</template>