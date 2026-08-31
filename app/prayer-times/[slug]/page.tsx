import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CITIES, TOP_CITIES } from '@/lib/data'
import {
  getPrayerTimes,
  getPakistanDateTime,
  formatPakistanDisplayDate,
  PrayerDataResponse,
  CALCULATION_CONFIG,
} from '@/lib/prayer-service'
import PrayerTimesClient from '@/components/prayer-times/prayer-times-client'
import FeaturedPrayerCard from '@/components/prayer-times/featured-prayer-card'
import AdditionalIslamicTimes from '@/components/prayer-times/additional-islamic-times'
import PrayerTimesTable from '@/components/prayer-times/prayer-times-table'
import PakistanCitiesGrid from '@/components/prayer-times/pakistan-cities-grid'
import PrayerExplanation from '@/components/prayer-times/prayer-explanation'
import CalculationMethod from '@/components/prayer-times/calculation-method'
import ExplorePakistanLinks from '@/components/prayer-times/explore-pakistan-links'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MapPin, ChevronRight, Home, Calendar, Clock, Compass, HelpCircle, FileText, Sparkles, Sun } from 'lucide-react'

export const revalidate = 3600 // 1-hour ISR revalidation
export const dynamicParams = true

/**
 * Helper to match URL slug to Pakistani City Name
 */
function resolveCityFromSlug(slug: string): string | null {
  const cleanSlug = slug.toLowerCase().replace(/-today$/, '').trim()
  const found = CITIES.find(
    (c) => c.toLowerCase().replace(/\s+/g, '-') === cleanSlug
  )
  return found || null
}

/**
 * Generate static params for all Pakistani cities
 * Supporting both /prayer-times-[city]-today/ and /prayer-times-[city]/
 */
export async function generateStaticParams() {
  const params: { slug: string }[] = []
  for (const city of CITIES) {
    const base = city.toLowerCase().replace(/\s+/g, '-')
    params.push({ slug: `${base}-today` })
    params.push({ slug: base })
  }
  return params
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const cityName = resolveCityFromSlug(params.slug)

  if (!cityName) {
    return {
      title: 'City Prayer Times Not Found | ListPak',
      robots: { index: false, follow: false },
    }
  }

  const citySlug = cityName.toLowerCase().replace(/\s+/g, '-')
  const title = `Prayer Times in ${cityName} Today – Namaz Timings ${cityName}`
  const description = `Check today's prayer times in ${cityName}, Pakistan with Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha timings. Accurate live Namaz timings and countdown for ${cityName}.`
  const canonicalUrl = `https://www.listpak.com/prayer-times-${citySlug}-today/`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'ListPak',
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    keywords: [
      `Prayer Times in ${cityName} Today`,
      `${cityName} prayer timings`,
      `today prayer times ${cityName}`,
      `namaz timings ${cityName}`,
      `salah times ${cityName}`,
      `Fajr time ${cityName}`,
      `Dhuhr time ${cityName}`,
      `Asr time ${cityName}`,
      `Maghrib time ${cityName}`,
      `Isha time ${cityName}`,
      `sunrise time ${cityName}`,
      `Islamic prayer times ${cityName}`,
    ],
  }
}

export default async function CityPrayerTimesPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const cityName = resolveCityFromSlug(params.slug)

  if (!cityName) {
    notFound()
  }

  const citySlug = cityName.toLowerCase().replace(/\s+/g, '-')
  const baseUrl = 'https://www.listpak.com'
  const pageUrl = `${baseUrl}/prayer-times-${citySlug}-today/`
  const pkNow = getPakistanDateTime()
  const displayDate = formatPakistanDisplayDate(pkNow)

  // Fetch normalized prayer data for this city
  let prayerData: PrayerDataResponse
  try {
    prayerData = await getPrayerTimes(cityName, 'Pakistan', pkNow)
  } catch (e) {
    prayerData = await getPrayerTimes(cityName, 'Pakistan', pkNow)
  }

  // Localized FAQs for this specific city
  const cityFaqs = [
    {
      id: 'city-faq-1',
      question: `What are today's prayer times in ${cityName}?`,
      answer: `Today in ${cityName}, Fajr is at ${prayerData.timings.fajr}, Sunrise at ${prayerData.timings.sunrise}, Dhuhr at ${prayerData.timings.dhuhr}, Asr at ${prayerData.timings.asr}, Maghrib at ${prayerData.timings.maghrib}, and Isha at ${prayerData.timings.isha}. All timings are updated daily according to Pakistan Standard Time.`,
    },
    {
      id: 'city-faq-2',
      question: `What time is Fajr in ${cityName} today?`,
      answer: `Fajr prayer time in ${cityName} begins at ${prayerData.timings.fajr} at true dawn (Subh Sadiq) and concludes at sunrise (${prayerData.timings.sunrise}).`,
    },
    {
      id: 'city-faq-3',
      question: `What time is Maghrib in ${cityName} today?`,
      answer: `Maghrib prayer time in ${cityName} begins promptly at ${prayerData.timings.maghrib} right at sunset (Ghurub). This also marks the daily Iftar time for fasting Muslims.`,
    },
    {
      id: 'city-faq-4',
      question: `What time is Asr in ${cityName} today?`,
      answer: `Asr prayer in ${cityName} starts at ${prayerData.timings.asr}, calculated using the Hanafi juristic method (shadow length twice the object's height plus noon shadow).`,
    },
    {
      id: 'city-faq-5',
      question: `Which calculation method is used for ${cityName} prayer times?`,
      answer: `Timings for ${cityName} are calculated according to the University of Islamic Sciences, Karachi method with 18.0° twilight angles for Fajr and Isha, and Hanafi school for Asr.`,
    },
  ]

  // 1. WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `Prayer Times in ${cityName} Today – Namaz Timings ${cityName}`,
    description: `Check today's prayer times in ${cityName}, Pakistan with Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha timings.`,
    inLanguage: 'en-PK',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: 'ListPak',
      url: `${baseUrl}/`,
    },
  }

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Prayer Times in Pakistan',
        item: `${baseUrl}/prayer-times-pakistan/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${cityName} Prayer Times`,
        item: pageUrl,
      },
    ],
  }

  // 3. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cityFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([webPageSchema, breadcrumbSchema, faqSchema]),
        }}
      />

      <Navbar />

      {/* Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="bg-[#0F172A] border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-400 flex-wrap">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link href="/prayer-times-pakistan/" className="hover:text-white transition-colors">
            Prayer Times in Pakistan
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-emerald-400 font-semibold">{cityName} Prayer Times</span>
        </div>
      </nav>

      <main className="flex-1 w-full">
        {/* City Hero Section */}
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-5 relative z-10">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-semibold border border-emerald-500/20 shadow-xs">
              <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Today&apos;s Prayer Times – {displayDate}</span>
              <span className="hidden sm:inline opacity-40">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{cityName}, Pakistan</span>
              </span>
            </div>

            {/* City H1 with 'Today' */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Prayer Times in {cityName} Today
            </h1>

            {/* Subtext */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Today&apos;s Namaz timings for {cityName}, Pakistan: Fajr {prayerData.timings.fajr}, Sunrise {prayerData.timings.sunrise}, Dhuhr {prayerData.timings.dhuhr}, Asr {prayerData.timings.asr}, Maghrib {prayerData.timings.maghrib}, and Isha {prayerData.timings.isha}.
            </p>

            {/* Search Another City Link */}
            <div className="pt-2 flex items-center justify-center gap-3 text-xs">
              <Link
                href="/prayer-times-pakistan/"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-medium"
              >
                <span>← Search Another Pakistani City</span>
              </Link>
            </div>

          </div>
        </section>

        {/* Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          
          {/* 1. Featured Prayer Card with Live Countdown */}
          <FeaturedPrayerCard
            data={prayerData}
            isLoading={false}
            error={null}
          />

          {/* 2. Additional Islamic Times (Ishraq, Chasht, Tahajjud, Midnight, Thirds) */}
          <AdditionalIslamicTimes
            timings={prayerData.timings}
            derived={prayerData.derived}
            cityName={cityName}
          />

          {/* 3. Today's Prayer Times Table */}
          <PrayerTimesTable
            timings={prayerData.timings}
            cityName={cityName}
            displayDate={prayerData.displayDate}
          />

          {/* 4. Pakistani Cities Grid (Dedicated Links) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Other Major Hubs</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Prayer Times in Other Pakistani Cities
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Select any Pakistani city below to view localized Namaz timings and live countdowns.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {CITIES.slice(0, 15).map((city) => {
                const targetSlug = city.toLowerCase().replace(/\s+/g, '-')
                const isCurrent = city.toLowerCase() === cityName.toLowerCase()
                return (
                  <Link
                    key={city}
                    href={`/prayer-times-${targetSlug}-today/`}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                      isCurrent
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                        : 'bg-slate-50/70 border-slate-200/80 text-slate-800 hover:bg-blue-50/70 hover:border-blue-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-1.5 rounded-lg ${isCurrent ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors'}`}>
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h3 className={`font-extrabold text-sm ${isCurrent ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'}`}>
                        {city}
                      </h3>
                      <span className={`text-[11px] block mt-0.5 ${isCurrent ? 'text-blue-100' : 'text-slate-500'}`}>
                        Prayer Timings
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* 5. Understanding Today's Prayer Times */}
          <PrayerExplanation />

          {/* 6. Calculation Method */}
          <CalculationMethod />

          {/* 7. Localized City Editorial Content (300+ words) */}
          <article className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4" />
                <span>Local Guide</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Prayer Times in {cityName}, Pakistan Today
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Understanding daily Namaz timings, local mosque schedules, and solar shifts in {cityName}.
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
              <p>
                Observing the five daily prayers on time is a core religious pillar for residents and visitors in <strong>{cityName}</strong>. Because Islamic prayer times are directly governed by the sun&apos;s trajectory across {cityName}&apos;s geographical coordinates, timings continuously adjust by 1 to 2 minutes every day as seasons change.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Azaan & Jamaat Timings in {cityName}</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Local mosques across {cityName} generally begin Jamaat prayers 15 to 30 minutes after the initial Azaan / prayer start time to allow worshippers sufficient time for Wudu and congregation.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                  <Sun className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Solar Alignment & Fasting</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      During fasting (Ramadan or voluntary Nawafil), Sehri ends precisely at {cityName}&apos;s Fajr start time ({prayerData.timings.fajr}), while Iftar begins promptly at Maghrib sunset ({prayerData.timings.maghrib}).
                    </p>
                  </div>
                </div>
              </div>

              <p>
                All prayer timings displayed on this page are computed using the <strong>University of Islamic Sciences, Karachi</strong> standard and the <strong>Hanafi juristic methodology</strong> for Asr. You can bookmark this page for fast daily reference or explore other Pakistani cities through our comprehensive directory.
              </p>
            </div>
          </article>

          {/* 8. Localized City FAQs */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {cityName} Prayer Times FAQs
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Common questions regarding daily Namaz timings and mosque schedules in {cityName}.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {cityFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border border-slate-200/80 rounded-2xl px-5 py-1 bg-slate-50/50 data-[state=open]:bg-blue-50/40 data-[state=open]:border-blue-200 transition-colors"
                >
                  <AccordionTrigger className="text-left font-bold text-slate-900 text-sm sm:text-base hover:no-underline py-4">
                    <span>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-xs sm:text-sm leading-relaxed pb-4 pt-1">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* 9. Explore Pakistan Directory Links */}
          <ExplorePakistanLinks />

        </div>
      </main>

      <Footer />
    </div>
  )
}
