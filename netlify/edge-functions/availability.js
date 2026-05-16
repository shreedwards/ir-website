import ICAL from 'ical.js'

export default async function handler(request, _context) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() })
  }

  const { searchParams } = new URL(request.url)
  const startDateStr = searchParams.get('start_date')
  const endDateStr   = searchParams.get('end_date')

  if (!startDateStr || !endDateStr) {
    return jsonResponse({ error: 'start_date and end_date query parameters are required' }, 400)
  }

  const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
  if (!ISO_DATE.test(startDateStr) || !ISO_DATE.test(endDateStr)) {
    return jsonResponse({ error: 'Dates must be in YYYY-MM-DD format' }, 400)
  }

  if (startDateStr > endDateStr) {
    return jsonResponse({ error: 'start_date must not be after end_date' }, 400)
  }

  const icalUrl = Deno.env.get('ICAL_URL')
  if (!icalUrl) {
    return jsonResponse({ error: 'Calendar not configured' }, 500)
  }

  let icsText
  try {
    const res = await fetch(icalUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    icsText = await res.text()
  } catch {
    return jsonResponse({ error: 'Failed to fetch calendar data' }, 502)
  }

  let events
  try {
    const jcalData = ICAL.parse(icsText)
    const comp = new ICAL.Component(jcalData)
    events = comp.getAllSubcomponents('vevent').map(v => new ICAL.Event(v))
  } catch {
    return jsonResponse({ error: 'Failed to parse calendar data' }, 502)
  }

  const rangeStart = new Date(startDateStr + 'T00:00:00Z')
  const rangeEnd   = new Date(endDateStr   + 'T00:00:00Z')
  const bookedDates = buildBookedSet(events, rangeStart, rangeEnd)

  const results = []
  const cur = new Date(rangeStart)
  while (cur <= rangeEnd) {
    const dateStr = cur.toISOString().slice(0, 10)
    results.push({ date: dateStr, booked: bookedDates.has(dateStr) })
    cur.setUTCDate(cur.getUTCDate() + 1)
  }

  return jsonResponse(results)
}

// ── helpers ──────────────────────────────────────────────────────────────────

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  })
}

// Returns "YYYY-MM-DD" for both DATE and DATETIME ICAL values.
function icalTimeToDateStr(icalTime) {
  if (icalTime.isDate) {
    return icalTime.toString()
  }
  return icalTime.toJSDate().toISOString().slice(0, 10)
}

// Returns a Set of "YYYY-MM-DD" strings that are covered by at least one event
// within [rangeStart, rangeEnd] (both dates inclusive).
function buildBookedSet(events, rangeStart, rangeEnd) {
  const booked = new Set()
  // rangeEndExclusive is used as the exclusive upper bound for window clamping
  const rangeEndExclusive = new Date(rangeEnd.getTime() + 86_400_000)

  for (const event of events) {
    if (event.isRecurring()) {
      const iter = event.iterator()
      const fence = ICAL.Time.fromJSDate(rangeEndExclusive, false)
      let dtstart
      while ((dtstart = iter.next())) {
        if (dtstart.compare(fence) >= 0) break
        const dtend = dtstart.clone()
        dtend.addDuration(event.getDuration())
        markDates(
          new Date(icalTimeToDateStr(dtstart) + 'T00:00:00Z'),
          new Date(icalTimeToDateStr(dtend)   + 'T00:00:00Z'),
          rangeStart,
          rangeEndExclusive,
          booked,
        )
      }
    } else {
      markDates(
        new Date(icalTimeToDateStr(event.startDate) + 'T00:00:00Z'),
        new Date(icalTimeToDateStr(event.endDate)   + 'T00:00:00Z'),
        rangeStart,
        rangeEndExclusive,
        booked,
      )
    }
  }

  return booked
}

// Marks all dates in [evStart, evEnd) that also fall in [windowStart, windowEnd).
// DTEND in iCalendar is exclusive — the checkout day itself is free.
function markDates(evStart, evEnd, windowStart, windowEnd, booked) {
  const from = evStart > windowStart ? evStart : windowStart
  const to   = evEnd   < windowEnd   ? evEnd   : windowEnd
  const cur  = new Date(from)
  while (cur < to) {
    booked.add(cur.toISOString().slice(0, 10))
    cur.setUTCDate(cur.getUTCDate() + 1)
  }
}
