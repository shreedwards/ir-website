<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  navLinks: { type: Array, required: true },
})

const scrolled  = ref(false)
const menuOpen  = ref(false)

function handleScroll() { scrolled.value = window.scrollY > 60 }
function toggleMenu()   { menuOpen.value = !menuOpen.value }
function closeMenu()    { menuOpen.value = false }

onMounted(()   => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav :class="{ scrolled }">
    <div class="nav-brand">
      <span class="nav-brand-name">Ingonyama Rest</span>
      <span class="nav-brand-sub">Marloth Park</span>
    </div>

    <!-- Desktop links -->
    <ul class="nav-links">
      <li v-for="link in navLinks" :key="link.href">
        <a :href="link.href">{{ link.label }}</a>
      </li>
    </ul>

    <!-- Hamburger (mobile only) -->
    <button
      class="nav-burger"
      :class="{ open: menuOpen }"
      aria-label="Toggle navigation menu"
      :aria-expanded="menuOpen"
      @click="toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>

  <!-- Mobile full-screen menu -->
  <Teleport to="body">
    <div
      class="mobile-menu"
      :class="{ open: menuOpen }"
      aria-hidden="!menuOpen"
      @click="closeMenu"
    >
      <div class="mobile-menu-inner" @click.stop>
        <ul>
          <li
            v-for="(link, i) in navLinks"
            :key="link.href"
            :style="`transition-delay: ${menuOpen ? i * 0.06 + 0.12 : 0}s`"
            class="mobile-menu-item"
            :class="{ visible: menuOpen }"
          >
            <a :href="link.href" @click="closeMenu">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* ── Hamburger button ─────────────────────────────────── */
.nav-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 201;
  flex-shrink: 0;
}

.nav-burger span {
  display: block;
  width: 24px;
  height: 1.5px;
  background: var(--white);
  border-radius: 2px;
  transition: transform 0.32s cubic-bezier(.4,0,.2,1), opacity 0.2s;
  transform-origin: center;
}

/* Animate to X when open */
.nav-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.nav-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nav-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* ── Mobile full-screen overlay ───────────────────────── */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}

.mobile-menu.open {
  opacity: 1;
  pointer-events: auto;
}

.mobile-menu-inner {
  text-align: center;
}

.mobile-menu-inner ul {
  list-style: none;
}

.mobile-menu-item {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.mobile-menu-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.mobile-menu-inner a {
  font-family: var(--ff-display), serif;
  font-size: clamp(2rem, 8vw, 3.2rem);
  font-weight: 300;
  color: var(--white);
  text-decoration: none;
  letter-spacing: .04em;
  display: block;
  padding: 14px 0;
  transition: color 0.2s;
}

.mobile-menu-inner a:hover { color: var(--ember); }

/* ── Show hamburger on mobile, hide on desktop ─────────── */
@media (max-width: 600px) {
  .nav-burger { display: flex; }
}
</style>
