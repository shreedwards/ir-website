<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const DOW   = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTH = ['January','February','March','April','May','June','July','August','September','October','November','December']

const today = new Date()
today.setHours(0, 0, 0, 0)
const todayStr = fmt(today)

const viewYear  = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())

const blockedDates = ref(new Set())
const loading      = ref(false)
const error        = ref(null)

const fetched = new Set()

// ── Three visible months ───────────────────────────────

const months = computed(() => {
  return [0, 1, 2].map(offset => {
    let m = viewMonth.value + offset
    let y = viewYear.value
    while (m > 11) { m -= 12; y++ }
    return { year: y, month: m, label: `${MONTH[m]} ${y}` }
  })
})

// ── Navigation ─────────────────────────────────────────

const canGoPrev = computed(() =>
  !(viewYear.value === today.getFullYear() && viewMonth.value === today.getMonth())
)

function prevMonth() {
  if (!canGoPrev.value) return
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
  else viewMonth.value--
}

function nextMonth() {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
  else viewMonth.value++
}

// ── Calendar grid ──────────────────────────────────────

function calDaysFor(y, m) {
  const firstDow    = (new Date(y, m, 1).getDay() + 6) % 7  // Mon = 0
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const cells = Array.from({ length: firstDow }, () => null)
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d)
    const str  = fmt(date)
    cells.push({ d, str, isToday: str === todayStr, isPast: date < today, isBlocked: blockedDates.value.has(str) })
  }
  return cells
}

// ── API fetch ──────────────────────────────────────────

async function loadMonth(year, month) {
  const key = `${year}-${String(month + 1).padStart(2, '0')}`
  if (fetched.has(key)) return
  fetched.add(key)

  const mm      = String(month + 1).padStart(2, '0')
  const lastDay = new Date(year, month + 1, 0).getDate()
  const startDate = `${year}-${mm}-01`
  const endDate   = `${year}-${mm}-${String(lastDay).padStart(2, '0')}`

  try {
    const res = await fetch(`/api/availability?start_date=${startDate}&end_date=${endDate}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const merged = new Set(blockedDates.value)
    for (const { date, booked } of data) {
      if (booked) merged.add(date)
    }
    blockedDates.value = merged
  } catch (e) {
    error.value = 'Live availability could not be loaded — please contact us to confirm dates.'
    console.error('[AvailabilityCalendar]', e)
    fetched.delete(key)
  }
}

async function loadVisible() {
  loading.value = true
  error.value   = null
  await Promise.all(months.value.map(({ year, month }) => loadMonth(year, month)))
  loading.value = false
}

watch([viewYear, viewMonth], loadVisible)
onMounted(loadVisible)

function fmt(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <div class="av-cal">

    <!-- Top nav bar -->
    <div class="av-header">
      <button class="av-nav" :disabled="!canGoPrev" @click="prevMonth" aria-label="Previous month">&#8249;</button>
      <span v-if="loading" class="av-spinner" aria-label="Loading"></span>
      <button class="av-nav" @click="nextMonth" aria-label="Next month">&#8250;</button>
    </div>

    <!-- Three month columns -->
    <div class="av-months">
      <div
        v-for="{ year, month, label } in months"
        :key="`${year}-${month}`"
        class="av-month-col"
      >
        <!-- Month label -->
        <div class="av-month-label">{{ label }}</div>

        <!-- Day-of-week header -->
        <div class="av-dow">
          <span v-for="d in DOW" :key="d">{{ d }}</span>
        </div>

        <!-- Day grid -->
        <div class="av-grid">
          <div
            v-for="(cell, i) in calDaysFor(year, month)"
            :key="i"
            class="av-cell"
            :class="{
              'av-cell--empty':   !cell,
              'av-cell--blocked': cell?.isBlocked,
              'av-cell--past':    cell?.isPast && !cell?.isBlocked,
              'av-cell--today':   cell?.isToday,
            }"
            :aria-label="cell ? `${cell.str} — ${cell.isBlocked ? 'booked' : 'available'}` : undefined"
          >
            <span v-if="cell">{{ cell.d }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Error notice -->
    <p v-if="error" class="av-error">{{ error }}</p>

    <!-- Legend -->
    <div class="av-legend">
      <span class="av-legend-item">
        <span class="av-pip av-pip--available"></span>Available
      </span>
      <span class="av-legend-item">
        <span class="av-pip av-pip--booked"></span>Booked
      </span>
    </div>

  </div>
</template>

<style scoped>
/* ── Container ───────────────────────────────────────── */
.av-cal {
  border: 1px solid rgba(196,130,74,.22);
  background: var(--white);
  padding: 36px 36px 28px;
  width: 100%;
}

/* ── Top nav bar ─────────────────────────────────────── */
.av-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.av-nav {
  width: 38px;
  height: 38px;
  background: none;
  border: 1px solid rgba(196,130,74,.3);
  color: var(--clay);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background .2s, border-color .2s, color .2s;
}
.av-nav:hover:not(:disabled) {
  background: var(--clay);
  border-color: var(--clay);
  color: var(--white);
}
.av-nav:disabled {
  opacity: .2;
  cursor: default;
}

/* ── Loading spinner ─────────────────────────────────── */
.av-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(196,130,74,.25);
  border-top-color: var(--ember);
  border-radius: 50%;
  animation: spin .8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Three-column month layout ───────────────────────── */
.av-months {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.av-month-col {
  min-width: 0;
}

.av-month-label {
  font-family: var(--ff-display), serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--bark);
  letter-spacing: .02em;
  text-align: center;
  margin-bottom: 16px;
}

/* ── Day-of-week row ─────────────────────────────────── */
.av-dow {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid rgba(61,43,26,.08);
  margin-bottom: 8px;
}
.av-dow span {
  text-align: center;
  font-size: .52rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--earth);
  font-weight: 500;
  padding: 4px 0 8px;
}

/* ── Day grid ────────────────────────────────────────── */
.av-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.av-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .72rem;
  font-weight: 400;
  color: var(--bark);
  background: rgba(242,223,195,.18);
  position: relative;
  border-radius: 1px;
  transition: background .18s;
  user-select: none;
}

.av-cell--empty   { background: transparent; }

.av-cell--blocked {
  background: var(--bark);
  color: rgba(253,250,245,.75);
}

.av-cell--past {
  color: rgba(61,43,26,.28);
  background: rgba(242,223,195,.06);
}

.av-cell--today {
  box-shadow: inset 0 0 0 2px var(--ember);
  font-weight: 700;
}
.av-cell--today:not(.av-cell--blocked) { color: var(--clay); }
.av-cell--today.av-cell--blocked       { color: rgba(253,250,245,.7); }

/* ── Error ───────────────────────────────────────────── */
.av-error {
  margin-top: 18px;
  font-size: .75rem;
  color: var(--clay);
  letter-spacing: .04em;
  text-align: center;
  font-style: italic;
}

/* ── Legend ──────────────────────────────────────────── */
.av-legend {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  justify-content: flex-end;
  align-items: center;
}
.av-legend-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: .6rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(61,43,26,.5);
}
.av-pip {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  border-radius: 1px;
}
.av-pip--available {
  background: rgba(242,223,195,.4);
  border: 1px solid rgba(196,130,74,.28);
}
.av-pip--booked { background: var(--bark); }

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 900px) {
  .av-months { grid-template-columns: 1fr; gap: 36px; }
  .av-month-label { font-size: 1.3rem; }
}

@media (max-width: 600px) {
  .av-cal  { padding: 24px 16px 20px; }
  .av-cell { font-size: .65rem; }
  .av-nav  { width: 32px; height: 32px; font-size: 1.2rem; }
}
</style>
