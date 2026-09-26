import { Suspense } from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import PrayerTimesClient from '@/components/prayer-times/prayer-times-client'
import { PRAYER_FAQS } from '@/lib/prayer-service'

export const metadata: Metadata = {
  title: 'Prayer Times in Pakistan Today – Namaz Timings',
  description: "Check today's prayer times in Pakistan with Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha timings. Search your city for local Namaz times.",
  alternates: {
    canonical: 'https://www.listpak.com/prayer-times-pakistan/',
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
    title: 'Prayer Times in Pakistan Today – Namaz Timings',
    description: "Check today's prayer times in Pakistan with Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha timings. Search your city for local Namaz times.",
    url: 'https://www.listpak.com/prayer-times-pakistan/',
    siteName: 'ListPak',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prayer Times in Pakistan Today – Namaz Timings',
    description: "Check today's prayer times in Pakistan with Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha timings. Search your city for local Namaz times.",
  },
  keywords: [
    'Prayer Times in Pakistan Today',
    'prayer times Pakistan',
    'Pakistan prayer timings',
    'today prayer times Pakistan',
    'namaz timings Pakistan',
    'salah times Pakistan',
    'Fajr time Pakistan',
    'Dhuhr time Pakistan',
    'Asr time Pakistan',
    'Maghrib time Pakistan',
    'Isha time Pakistan',
    'sunrise time Pakistan',
    'Islamic prayer times Pakistan',
  ],
}

export default function PrayerTimesPakistanPage() {
  const baseUrl = 'https://www.listpak.com'
  const pageUrl = `${baseUrl}/prayer-times-pakistan/`

  // 1. WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Prayer Times in Pakistan Today – Namaz Timings',
    description: "Check today's prayer times in Pakistan with Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha timings. Search your city for local Namaz times.",
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
        item: pageUrl,
      },
    ],
  }

  // 3. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PRAYER_FAQS.map((faq) => ({
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
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, breadcrumbSchema, faqSchema]) }}
      />

      <Navbar />

      <main className="flex-1 w-full">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="font-semibold text-sm">Loading Pakistan Prayer Times...</p>
            </div>
          }
        >
          <PrayerTimesClient />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
