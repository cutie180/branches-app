/**
 * Pakistan Prayer Times Service Layer
 * 
 * Integrates with AlAdhan Public API:
 * Endpoint: GET https://api.aladhan.com/v1/timingsByCity/{date}
 * 
 * Configuration parameters:
 * - date (Path param): DD-MM-YYYY in Asia/Karachi timezone
 * - city (Query param): Selected Pakistani city
 * - country (Query param): 'Pakistan'
 * - method (Query param): 1 (University of Islamic Sciences, Karachi)
 * - school (Query param): 1 (Hanafi)
 * - timezonestring (Query param): 'Asia/Karachi'
 * - midnightMode (Query param): 0 (Standard: Mid Sunset to Sunrise)
 * - iso8601 (Query param): false
 * 
 * Excludes non-essential params: geocodingProvider, geocodingKey, state, shafaq, tune, latitudeAdjustmentMethod, calendarMethod
 * 
 * Caching Key: prayer:{city}:{country}:{YYYY-MM-DD}:method{method}:school{school}
 */

export interface PrayerTimings {
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  sunset: string
  maghrib: string
  isha: string
  imsak: string
  midnight: string
  firstThird: string
  lastThird: string
}

export interface DerivedCalculations {
  ishraq: string
  chasht: string
  tahajjud: string
  calculationNote: string
}

export interface PrayerDataResponse {
  city: string
  country: string
  date: string // e.g. "2026-08-31"
  displayDate: string // e.g. "Monday, August 31, 2026"
  hijriDate?: string // e.g. "18 Safar 1448 AH"
  method: string
  juristicSchool: string
  midnightMode: string
  timezone: string
  timings: PrayerTimings
  derived: DerivedCalculations
  cacheKey: string
  source: 'api' | 'cache' | 'fallback'
}

export interface NextPrayerInfo {
  name: string
  arabicName: string
  time: string
  timeRemainingFormatted: string
  timeRemainingSeconds: number
  isTomorrow: boolean
}

export const CALCULATION_CONFIG = {
  methodId: 1,
  methodName: 'University of Islamic Sciences, Karachi',
  juristicSchoolId: 1,
  juristicSchoolName: 'Hanafi (Asr: 2x shadow)',
  midnightModeId: 0,
  midnightModeName: 'Standard (Mid Sunset to Sunrise)',
  timezone: 'Asia/Karachi',
  fajrAngle: 18.0,
  ishaAngle: 18.0,
  apiBaseUrl: 'https://api.aladhan.com/v1',
}

export interface PrayerFaqItem {
  id: string
  question: string
  answer: string
}

export const PRAYER_FAQS: PrayerFaqItem[] = [
  {
    id: 'faq-1',
    question: "What are today's prayer times in Pakistan?",
    answer: "Today's prayer times in Pakistan depend on your exact city and geographical coordinates. Across major cities like Lahore, Karachi, and Islamabad, the five daily prayers (Fajr, Dhuhr, Asr, Maghrib, and Isha) and Sunrise occur at precise solar times. You can use our city search above to see current, accurate timings and live countdowns for any city in Pakistan.",
  },
  {
    id: 'faq-2',
    question: "What time is Fajr in Pakistan today?",
    answer: "Fajr begins at true dawn (Subh Sadiq) when twilight first becomes visible in the east, approximately 1 hour and 20 minutes before sunrise. Exact Fajr times vary by city—for example, Lahore and Islamabad experience Fajr earlier in the morning than Karachi or Quetta due to eastern longitudes.",
  },
  {
    id: 'faq-3',
    question: "What time is Maghrib in Pakistan today?",
    answer: "Maghrib begins immediately when the sun sets below the horizon (Ghurub). Sunset times vary across Pakistani provinces: eastern cities like Sialkot and Lahore have earlier Maghrib timings compared to western and southern cities like Quetta, Turbat, and Karachi.",
  },
  {
    id: 'faq-4',
    question: "How can I check prayer times for my city?",
    answer: "Simply type your city name (e.g., Lahore, Karachi, Rawalpindi, Peshawar, Multan, or any other Pakistani town) in the search box at the top of this page. The prayer card will immediately update to show local timings, sunrise, voluntary prayer windows, and a live countdown to the next prayer.",
  },
  {
    id: 'faq-5',
    question: "Do prayer times change every day?",
    answer: "Yes. Because Islamic prayer times are determined by the sun's position relative to the Earth's seasonal tilt and orbit, prayer times shift by 1 to 2 minutes each day throughout the year. Our tool automatically updates daily to reflect these shifts in real-time.",
  },
  {
    id: 'faq-6',
    question: "Which calculation method is used for Pakistan prayer times?",
    answer: "Our system defaults to the calculation standards of the University of Islamic Sciences, Karachi (UISK), using 18.0° twilight angles for Fajr and Isha, alongside the Hanafi juristic methodology (2x shadow length) for Asr, which is the predominant standard across Pakistani mosques and institutions.",
  },
]

// In-memory runtime cache
const memoryCache = new Map<string, { data: PrayerDataResponse; timestamp: number }>()
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Get current date & time in Pakistan Timezone (Asia/Karachi)
 */
export function getPakistanDateTime(): Date {
  const now = new Date()
  const pkDateString = now.toLocaleString('en-US', { timeZone: CALCULATION_CONFIG.timezone })
  return new Date(pkDateString)
}

/**
 * Format date string into YYYY-MM-DD for Pakistan date identification
 */
export function formatPakistanDateKey(date: Date = getPakistanDateTime()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Format date string into DD-MM-YYYY for AlAdhan path parameter
 */
export function formatAlAdhanDateParam(date: Date = getPakistanDateTime()): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

/**
 * Format friendly display date (e.g. "Monday, August 31, 2026")
 */
export function formatPakistanDisplayDate(date: Date = getPakistanDateTime()): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: CALCULATION_CONFIG.timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Generate normalized Cache Key according to specification:
 * prayer:{city}:{country}:{YYYY-MM-DD}:method{method}:school{school}
 */
export function generateCacheKey(
  city: string,
  country: string = 'Pakistan',
  dateKey: string = formatPakistanDateKey(),
  method: number = CALCULATION_CONFIG.methodId,
  school: number = CALCULATION_CONFIG.juristicSchoolId
): string {
  return `prayer:${city.toLowerCase().trim()}:${country.toLowerCase().trim()}:${dateKey}:method${method}:school${school}`
}

/**
 * Clean & normalize time string from API (e.g. "04:35 (PKT)" -> "04:35 AM")
 */
export function normalizeTimeString(rawTime: string | undefined | null): string {
  if (!rawTime) return '--:--'
  const cleaned = rawTime.replace(/\s*\([A-Z]+\)/i, '').trim()
  
  const match = cleaned.match(/^(\d{1,2}):(\d{2})/)
  if (!match) return cleaned

  let hours = parseInt(match[1], 10)
  const minutes = match[2]
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const formattedHours = String(hours).padStart(2, '0')

  return `${formattedHours}:${minutes} ${period}`
}

/**
 * Parse a 12-hour or 24-hour time string into minutes from start of day
 */
export function timeStringToMinutes(timeStr: string): number {
  if (!timeStr) return 0
  const is12Hour = /AM|PM/i.test(timeStr)
  
  if (is12Hour) {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i)
    if (!match) return 0
    let hours = parseInt(match[1], 10)
    const minutes = parseInt(match[2], 10)
    const period = match[3].toUpperCase()
    if (period === 'PM' && hours < 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
    return hours * 60 + minutes
  } else {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})/)
    if (!match) return 0
    const hours = parseInt(match[1], 10)
    const minutes = parseInt(match[2], 10)
    return hours * 60 + minutes
  }
}

/**
 * Convert minutes from midnight to a 12-hour formatted string
 */
export function minutesToTimeString(totalMinutes: number): string {
  let normalized = Math.round(totalMinutes) % (24 * 60)
  if (normalized < 0) normalized += 24 * 60
  
  let hours = Math.floor(normalized / 60)
  const minutes = normalized % 60
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`
}

/**
 * Separate calculation layer for derived voluntary timings:
 * - Ishraq: Sunrise + 18 minutes (sun risen 1 spear above horizon)
 * - Chasht (Duha): Midpoint between Sunrise and Dhuhr
 * - Tahajjud: Commences at Last Third of Night (directly from API Lastthird parameter)
 */
export function calculateDerivedTimes(
  sunriseStr: string,
  dhuhrStr: string,
  apiLastThirdStr: string
): DerivedCalculations {
  const sunriseMin = timeStringToMinutes(sunriseStr)
  const dhuhrMin = timeStringToMinutes(dhuhrStr)

  // 1. Ishraq: Sunrise + 18 minutes
  const ishraq = minutesToTimeString(sunriseMin + 18)

  // 2. Chasht / Duha: Midpoint between Sunrise and Dhuhr
  const chashtMin = Math.round(sunriseMin + (dhuhrMin - sunriseMin) / 2)
  const chasht = minutesToTimeString(chashtMin)

  // 3. Tahajjud: Starts at the last third of the night (aligned with API Lastthird)
  const tahajjud = apiLastThirdStr || minutesToTimeString(sunriseMin - 120)

  return {
    ishraq,
    chasht,
    tahajjud,
    calculationNote: 'Ishraq is calculated as Sunrise + 18 mins. Chasht (Duha) is calculated as the midpoint between Sunrise and Dhuhr. Midnight, First Third, and Last Third (Tahajjud start) are computed by AlAdhan using standard nocturnal partition (sunset to sunrise).',
  }
}

/**
 * Fallback solar calculation if external API is unreachable
 */
function calculateFallbackTimings(cityName: string, date: Date): PrayerTimings {
  const coords: Record<string, { lat: number; lng: number }> = {
    karachi: { lat: 24.8607, lng: 67.0011 },
    lahore: { lat: 31.5204, lng: 74.3587 },
    islamabad: { lat: 33.6844, lng: 73.0479 },
    rawalpindi: { lat: 33.5651, lng: 73.0169 },
    faisalabad: { lat: 31.4504, lng: 73.1350 },
    multan: { lat: 30.1575, lng: 71.5249 },
    peshawar: { lat: 34.0151, lng: 71.5249 },
    quetta: { lat: 30.1798, lng: 66.9750 },
    gujranwala: { lat: 32.1877, lng: 74.1945 },
    sialkot: { lat: 32.4945, lng: 74.5229 },
  }
  const cityKey = cityName.toLowerCase().trim()
  const coord = coords[cityKey] || { lat: 31.5204, lng: 74.3587 }

  const startOfYear = new Date(date.getFullYear(), 0, 1)
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))
  const declination = 23.45 * Math.sin(((284 + dayOfYear) / 365) * 2 * Math.PI)
  const meridianOffset = (coord.lng - 75.0) * 4
  const solarNoonMin = 12 * 60 - meridianOffset
  const sunHalfDayMin = 6 * 60 - declination * 4.2 * Math.cos((coord.lat * Math.PI) / 180)

  const sunriseMin = solarNoonMin - sunHalfDayMin
  const sunsetMin = solarNoonMin + sunHalfDayMin
  const fajrMin = sunriseMin - 80
  const asrMin = solarNoonMin + (sunsetMin - solarNoonMin) * 0.72
  const maghribMin = sunsetMin
  const ishaMin = sunsetMin + 78
  const imsakMin = fajrMin - 10
  const midnightMin = sunsetMin + (fajrMin + 24 * 60 - sunsetMin) / 2
  const nightDuration = fajrMin + 24 * 60 - sunsetMin
  const firstThirdMin = sunsetMin + nightDuration / 3
  const lastThirdMin = sunsetMin + (nightDuration * 2) / 3

  return {
    fajr: minutesToTimeString(fajrMin),
    sunrise: minutesToTimeString(sunriseMin),
    dhuhr: minutesToTimeString(solarNoonMin),
    asr: minutesToTimeString(asrMin),
    sunset: minutesToTimeString(sunsetMin),
    maghrib: minutesToTimeString(maghribMin),
    isha: minutesToTimeString(ishaMin),
    imsak: minutesToTimeString(imsakMin),
    midnight: minutesToTimeString(midnightMin),
    firstThird: minutesToTimeString(firstThirdMin),
    lastThird: minutesToTimeString(lastThirdMin),
  }
}

/**
 * Primary function to fetch and normalize prayer times using AlAdhan /v1/timingsByCity/{date}
 */
export async function getPrayerTimes(
  city: string = 'Lahore',
  country: string = 'Pakistan',
  targetDate: Date = getPakistanDateTime()
): Promise<PrayerDataResponse> {
  const dateKey = formatPakistanDateKey(targetDate)
  const cacheKey = generateCacheKey(city, country, dateKey)

  // 1. Check in-memory cache
  const cached = memoryCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return { ...cached.data, source: 'cache' }
  }

  // 2. Check browser sessionStorage if running client-side
  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem(cacheKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed && parsed.timings && parsed.timings.fajr) {
          memoryCache.set(cacheKey, { data: parsed, timestamp: Date.now() })
          return { ...parsed, source: 'cache' }
        }
      }
    } catch {
      // Storage errors ignored
    }
  }

  const displayDate = formatPakistanDisplayDate(targetDate)
  const dateParam = formatAlAdhanDateParam(targetDate)

  // Build AlAdhan URL with required parameters only
  const queryParams = new URLSearchParams({
    city: city.trim(),
    country: country.trim(),
    method: String(CALCULATION_CONFIG.methodId),
    school: String(CALCULATION_CONFIG.juristicSchoolId),
    midnightMode: String(CALCULATION_CONFIG.midnightModeId),
    timezonestring: CALCULATION_CONFIG.timezone,
    iso8601: 'false',
  })

  const apiUrl = `${CALCULATION_CONFIG.apiBaseUrl}/timingsByCity/${dateParam}?${queryParams.toString()}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    })

    if (!response.ok) {
      throw new Error(`AlAdhan API returned HTTP status ${response.status}`)
    }

    const json = await response.json()
    if (json.code !== 200 || !json.data || !json.data.timings) {
      throw new Error(json.status || 'Malformed payload from AlAdhan API')
    }

    const raw = json.data.timings

    // Normalize all times from API response
    const fajr = normalizeTimeString(raw.Fajr)
    const sunrise = normalizeTimeString(raw.Sunrise)
    const dhuhr = normalizeTimeString(raw.Dhuhr)
    const asr = normalizeTimeString(raw.Asr)
    const sunset = normalizeTimeString(raw.Sunset)
    const maghrib = normalizeTimeString(raw.Maghrib)
    const isha = normalizeTimeString(raw.Isha)
    const imsak = normalizeTimeString(raw.Imsak)
    const midnight = normalizeTimeString(raw.Midnight)
    const firstThird = normalizeTimeString(raw.Firstthird)
    const lastThird = normalizeTimeString(raw.Lastthird)

    // Calculate derived voluntary times (Ishraq, Chasht, Tahajjud)
    const derived = calculateDerivedTimes(sunrise, dhuhr, lastThird)

    // Hijri date
    let hijriDate: string | undefined
    if (json.data.date?.hijri) {
      const h = json.data.date.hijri
      hijriDate = `${h.day} ${h.month?.en || ''} ${h.year} AH`
    }

    const normalizedData: PrayerDataResponse = {
      city: city.trim(),
      country: country.trim(),
      date: dateKey,
      displayDate,
      hijriDate,
      method: CALCULATION_CONFIG.methodName,
      juristicSchool: CALCULATION_CONFIG.juristicSchoolName,
      midnightMode: CALCULATION_CONFIG.midnightModeName,
      timezone: CALCULATION_CONFIG.timezone,
      timings: {
        fajr,
        sunrise,
        dhuhr,
        asr,
        sunset,
        maghrib,
        isha,
        imsak,
        midnight,
        firstThird,
        lastThird,
      },
      derived,
      cacheKey,
      source: 'api',
    }

    // Save in caches
    memoryCache.set(cacheKey, { data: normalizedData, timestamp: Date.now() })
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(normalizedData))
      } catch {
        // Ignore storage exceptions
      }
    }

    return normalizedData
  } catch (error) {
    console.warn(`[PrayerService] AlAdhan API fetch error for ${city} on ${dateParam}:`, error)

    const fallbackTimings = calculateFallbackTimings(city, targetDate)
    const derived = calculateDerivedTimes(fallbackTimings.sunrise, fallbackTimings.dhuhr, fallbackTimings.lastThird)

    const fallbackData: PrayerDataResponse = {
      city: city.trim(),
      country: country.trim(),
      date: dateKey,
      displayDate,
      method: CALCULATION_CONFIG.methodName,
      juristicSchool: CALCULATION_CONFIG.juristicSchoolName,
      midnightMode: CALCULATION_CONFIG.midnightModeName,
      timezone: CALCULATION_CONFIG.timezone,
      timings: fallbackTimings,
      derived,
      cacheKey,
      source: 'fallback',
    }

    return fallbackData
  }
}

/**
 * Local Next Prayer Calculation
 * Compares current Pakistan time with prayer timestamps to find the next prayer
 * and compute precise countdown without triggering API calls.
 */
export function getNextPrayerInfo(timings: PrayerTimings, nowPk: Date = getPakistanDateTime()): NextPrayerInfo {
  const currentMinutes = nowPk.getHours() * 60 + nowPk.getMinutes() + nowPk.getSeconds() / 60

  const prayers = [
    { name: 'Fajr', arabicName: 'الفجر', minutes: timeStringToMinutes(timings.fajr), time: timings.fajr },
    { name: 'Sunrise', arabicName: 'الشروق', minutes: timeStringToMinutes(timings.sunrise), time: timings.sunrise },
    { name: 'Dhuhr', arabicName: 'الظهر', minutes: timeStringToMinutes(timings.dhuhr), time: timings.dhuhr },
    { name: 'Asr', arabicName: 'العصر', minutes: timeStringToMinutes(timings.asr), time: timings.asr },
    { name: 'Maghrib', arabicName: 'المغرب', minutes: timeStringToMinutes(timings.maghrib), time: timings.maghrib },
    { name: 'Isha', arabicName: 'العشاء', minutes: timeStringToMinutes(timings.isha), time: timings.isha },
  ]

  // Find next upcoming prayer today
  for (const prayer of prayers) {
    if (prayer.minutes > currentMinutes) {
      const remainingSeconds = Math.max(0, Math.floor((prayer.minutes - currentMinutes) * 60))
      const hrs = Math.floor(remainingSeconds / 3600)
      const mins = Math.floor((remainingSeconds % 3600) / 60)
      const secs = remainingSeconds % 60
      const formatted = `${String(hrs).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`

      return {
        name: prayer.name,
        arabicName: prayer.arabicName,
        time: prayer.time,
        timeRemainingFormatted: formatted,
        timeRemainingSeconds: remainingSeconds,
        isTomorrow: false,
      }
    }
  }

  // After Isha, next prayer is Tomorrow's Fajr
  const tomorrowFajrMinutes = 24 * 60 + prayers[0].minutes
  const remainingSeconds = Math.max(0, Math.floor((tomorrowFajrMinutes - currentMinutes) * 60))
  const hrs = Math.floor(remainingSeconds / 3600)
  const mins = Math.floor((remainingSeconds % 3600) / 60)
  const secs = remainingSeconds % 60
  const formatted = `${String(hrs).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`

  return {
    name: 'Fajr',
    arabicName: 'الفجر',
    time: prayers[0].time,
    timeRemainingFormatted: formatted,
    timeRemainingSeconds: remainingSeconds,
    isTomorrow: true,
  }
}
