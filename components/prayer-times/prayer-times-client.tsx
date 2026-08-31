'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import HeroSearch from './hero-search'
import FeaturedPrayerCard from './featured-prayer-card'
import AdditionalIslamicTimes from './additional-islamic-times'
import PrayerTimesTable from './prayer-times-table'
import PakistanCitiesGrid from './pakistan-cities-grid'
import PrayerExplanation from './prayer-explanation'
import CalculationMethod from './calculation-method'
import PrayerSeoContent from './prayer-seo-content'
import PrayerFaqs from './prayer-faqs'
import ExplorePakistanLinks from './explore-pakistan-links'
import {
  getPrayerTimes,
  getPakistanDateTime,
  formatPakistanDisplayDate,
  formatPakistanDateKey,
  PrayerDataResponse,
} from '@/lib/prayer-service'
import { CITIES } from '@/lib/data'

export default function PrayerTimesClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Initialize city from query param if valid Pakistani city, otherwise default to Lahore
  const initialCity = (() => {
    const cityParam = searchParams.get('city')
    if (cityParam) {
      const match = CITIES.find((c) => c.toLowerCase() === cityParam.toLowerCase().trim())
      if (match) return match
    }
    return 'Lahore'
  })()

  const [selectedCity, setSelectedCity] = useState<string>(initialCity)
  const [prayerData, setPrayerData] = useState<PrayerDataResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentDateKey, setCurrentDateKey] = useState<string>(() => formatPakistanDateKey())
  const [displayDate, setDisplayDate] = useState<string>(() => formatPakistanDisplayDate())

  // Fetch prayer timings for the selected city
  const loadPrayerData = useCallback(async (city: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const pkNow = getPakistanDateTime()
      const data = await getPrayerTimes(city, 'Pakistan', pkNow)
      setPrayerData(data)
      setDisplayDate(data.displayDate)
      setCurrentDateKey(data.date)
    } catch (err: unknown) {
      console.error('Error fetching prayer times:', err)
      setError('Unable to load prayer times for this location. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial load & city change handler
  useEffect(() => {
    loadPrayerData(selectedCity)
  }, [selectedCity, loadPrayerData])

  // Periodic check for Pakistan midnight date change to auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      const pkNow = getPakistanDateTime()
      const newDateKey = formatPakistanDateKey(pkNow)
      if (newDateKey !== currentDateKey) {
        setCurrentDateKey(newDateKey)
        setDisplayDate(formatPakistanDisplayDate(pkNow))
        loadPrayerData(selectedCity)
      }
    }, 60 * 1000) // Check every minute

    return () => clearInterval(interval)
  }, [currentDateKey, selectedCity, loadPrayerData])

  // Handle city selection (updates state and optionally query param without hard reload)
  const handleSelectCity = (city: string) => {
    setSelectedCity(city)
    // Update shallow URL query state for shareability without navigation reload
    const params = new URLSearchParams(searchParams.toString())
    params.set('city', city)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. Hero Section with Search Interface */}
      <HeroSearch
        selectedCity={selectedCity}
        displayDate={displayDate}
        onSelectCity={handleSelectCity}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 2. Current Selected City Featured Card (with Next Prayer Banner) */}
        <div id="featured-prayer-card">
          <FeaturedPrayerCard
            data={prayerData}
            isLoading={isLoading}
            error={error}
            onRetry={() => loadPrayerData(selectedCity)}
          />
        </div>

        {/* 3. Additional Islamic Times (Ishraq, Chasht, Tahajjud, Midnight, Thirds) */}
        {prayerData && (
          <AdditionalIslamicTimes
            timings={prayerData.timings}
            derived={prayerData.derived}
            cityName={prayerData.city}
          />
        )}

        {/* 4. Today's Prayer Times Table */}
        {prayerData && (
          <PrayerTimesTable
            timings={prayerData.timings}
            cityName={prayerData.city}
            displayDate={prayerData.displayDate}
          />
        )}

        {/* 5. Pakistan City Preview Grid (15 Major Hubs) */}
        <PakistanCitiesGrid
          selectedCity={selectedCity}
          onSelectCity={handleSelectCity}
        />

        {/* 6. Understanding Today's Prayer Times */}
        <PrayerExplanation />

        {/* 7. Prayer Time Calculation Method */}
        <CalculationMethod />

        {/* 8. Comprehensive SEO Content Section (300-500 words) */}
        <PrayerSeoContent />

        {/* 9. Frequently Asked Questions */}
        <PrayerFaqs />

        {/* 10. Explore Pakistan Internal Directory Links */}
        <ExplorePakistanLinks />

      </div>

    </div>
  )
}
