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

// Tracks which "YYYY-MM" keys have already been fetched so navigation never re-requests them.
const fetched = new Set()

// ── Navigation ────────────────────────────────────────

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

const monthLabel = computed(() => `${MONTH[viewMonth.value]} ${viewYear.value}`)

// ── Calendar grid ─────────────────────────────────────

const calDays = computed(() => {
  const y = viewYear.value
  const m = viewMonth.value
  const firstDow    = (new Date(y, m, 1).getDay() + 6) % 7  // Mon = 0
  const daysInMonth = new Date(y, m + 1, 0).getDate()

  const cells = Array.from({ length: firstDow }, () => null)

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d)
    const str  = fmt(date)
    cells.push({
      d,
      str,
      isToday:   str === todayStr,
      isPast:    date < today,
      isBlocked: blockedDates.value.has(str),
    })
  }

  return cells
})

// ── API fetch ─────────────────────────────────────────

async function loadMonth(year, month) {
  const key = `${year}-${String(month + 1).padStart(2, '0')}`
  if (fetched.has(key)) return
  fetched.add(key)

  loading.value = true
  error.value   = null

  const mm       = String(month + 1).padStart(2, '0')
  const lastDay  = new Date(year, month + 1, 0).getDate()
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
    fetched.delete(key) // allow retry on next navigation
  } finally {
    loading.value = false
  }
}

watch([viewYear, viewMonth], ([y, m]) => loadMonth(y, m))
onMounted(() => loadMonth(viewYear.value, viewMonth.value))

function fmt(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <div class="av-cal">

    <!-- Month nav -->
    <div class="av-header">
        <button
          class="av-nav"
          :disabled="!canGoPrev"
          @click="prevMonth"
          aria-label="Previous month"
        >&#8249;</button>

        <div class="av-month-wrap">
          <span class="av-month">{{ monthLabel }}</span>
          <span v-if="loading" class="av-spinner" aria-label="Loading"></span>
        </div>

        <button class="av-nav" @click="nextMonth" aria-label="Next month">&#8250;</button>
      </div>

      <!-- Day-of-week header -->
      <div class="av-dow">
        <span v-for="d in DOW" :key="d">{{ d }}</span>
      </div>

      <!-- Day grid -->
      <div class="av-grid">
        <div
          v-for="(cell, i) in calDays"
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

/* ── Month nav ───────────────────────────────────────── */
.av-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.av-month-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.av-month {
  font-family: var(--ff-display), serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--bark);
  letter-spacing: .02em;
  min-width: 200px;
  text-align: center;
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

/* ── Day-of-week row ─────────────────────────────────── */
.av-dow {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid rgba(61,43,26,.08);
  margin-bottom: 8px;
}
.av-dow span {
  text-align: center;
  font-size: .58rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--earth);
  font-weight: 500;
  padding: 4px 0 10px;
}

/* ── Day grid ────────────────────────────────────────── */
.av-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
}

.av-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .82rem;
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
  color: rgba(253,250,245,.15);
}

.av-cell--past {
  color: rgba(61,43,26,.28);
  background: rgba(242,223,195,.06);
}

/* Today ring — works on both available and blocked cells */
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
  .av-month { min-width: 160px; }
}

@media (max-width: 600px) {
  .av-cal    { padding: 24px 16px 20px; }
  .av-cell   { font-size: .7rem; }
  .av-month  { font-size: 1.2rem; min-width: 140px; }
  .av-nav    { width: 32px; height: 32px; font-size: 1.2rem; }
}
</style>
