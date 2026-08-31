'use client'

import React from 'react'
import { MapPin, Sun, Sunset, Sunrise, Moon, CloudSun, RefreshCw, AlertCircle, Calendar } from 'lucide-react'
import { PrayerDataResponse, timeStringToMinutes, getPakistanDateTime } from '@/lib/prayer-service'
import NextPrayerBanner from './next-prayer-banner'

interface FeaturedPrayerCardProps {
  data: PrayerDataResponse | null
  isLoading: boolean
  error: string | null
  onRetry?: () => void
}

export default function FeaturedPrayerCard({ data, isLoading, error, onRetry }: FeaturedPrayerCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6 animate-pulse">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-slate-200 rounded-md" />
            <div className="h-4 w-32 bg-slate-100 rounded-md" />
          </div>
          <div className="h-8 w-40 bg-slate-100 rounded-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-28 bg-slate-100 rounded-2xl p-4 flex flex-col justify-between" />
          ))}
        </div>
        <div className="h-20 bg-slate-100 rounded-2xl" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-1 max-w-md mx-auto">
          <h3 className="text-lg font-bold text-slate-900">Prayer times are temporarily unavailable</h3>
          <p className="text-sm text-slate-600">
            {error || 'Unable to retrieve latest prayer timings for this city. Please try again shortly.'}
          </p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Loading</span>
          </button>
        )}
      </div>
    )
  }

  // Calculate current prayer statuses
  const currentPkMinutes = (() => {
    const pk = getPakistanDateTime()
    return pk.getHours() * 60 + pk.getMinutes()
  })()

  const prayerItems = [
    {
      key: 'fajr',
      name: 'Fajr',
      arabic: 'الفجر',
      urdu: 'فجر',
      time: data.timings.fajr,
      icon: Moon,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      activeColor: 'ring-2 ring-indigo-500 bg-indigo-50/80',
    },
    {
      key: 'sunrise',
      name: 'Sunrise',
      arabic: 'الشروق',
      urdu: 'طلوع آفتاب',
      time: data.timings.sunrise,
      icon: Sunrise,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      activeColor: 'ring-2 ring-amber-500 bg-amber-50/80',
      isSunrise: true,
    },
    {
      key: 'dhuhr',
      name: 'Dhuhr',
      arabic: 'الظهر',
      urdu: 'ظہر',
      time: data.timings.dhuhr,
      icon: Sun,
      color: 'text-sky-600 bg-sky-50 border-sky-100',
      activeColor: 'ring-2 ring-sky-500 bg-sky-50/80',
    },
    {
      key: 'asr',
      name: 'Asr',
      arabic: 'العصر',
      urdu: 'عصر',
      time: data.timings.asr,
      icon: CloudSun,
      color: 'text-orange-600 bg-orange-50 border-orange-100',
      activeColor: 'ring-2 ring-orange-500 bg-orange-50/80',
    },
    {
      key: 'maghrib',
      name: 'Maghrib',
      arabic: 'المغرب',
      urdu: 'مغرب',
      time: data.timings.maghrib,
      icon: Sunset,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
      activeColor: 'ring-2 ring-rose-500 bg-rose-50/80',
    },
    {
      key: 'isha',
      name: 'Isha',
      arabic: 'العشاء',
      urdu: 'عشاء',
      time: data.timings.isha,
      icon: Moon,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      activeColor: 'ring-2 ring-purple-500 bg-purple-50/80',
    },
  ]

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6 transition-all">
      
      {/* Featured Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm tracking-wide mb-1">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span>📍 {data.city}, Pakistan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Prayer Times for Today
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{data.displayDate}</span>
            </span>
            {data.hijriDate && (
              <>
                <span>•</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200/60">
                  {data.hijriDate}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Pakistan Timings</span>
        </div>
      </div>

      {/* 6 Primary Prayer Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {prayerItems.map((prayer) => {
          const Icon = prayer.icon
          const prayerMin = timeStringToMinutes(prayer.time)
          const isPassed = currentPkMinutes > prayerMin

          return (
            <div
              key={prayer.key}
              className={`rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between group hover:shadow-md ${
                isPassed ? 'bg-slate-50/70 border-slate-200 opacity-90' : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              {/* Card Top: Icon & Labels */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{prayer.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                    <span className="font-arabic">{prayer.arabic}</span>
                    <span>•</span>
                    <span>{prayer.urdu}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-xl border shrink-0 ${prayer.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Card Bottom: Prayer Time & Status */}
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {prayer.time}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                  {prayer.isSunrise ? (
                    <span className="text-amber-700">Tulu Time</span>
                  ) : isPassed ? (
                    <span className="text-slate-400">Passed</span>
                  ) : (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Upcoming</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Next Prayer Live Countdown Banner */}
      <NextPrayerBanner timings={data.timings} cityName={data.city} />

    </div>
  )
}
