'use client'

import React from 'react'
import { Clock, Calendar, CheckCircle2, Circle } from 'lucide-react'
import { PrayerTimings, timeStringToMinutes, getPakistanDateTime } from '@/lib/prayer-service'

interface PrayerTimesTableProps {
  timings: PrayerTimings
  cityName: string
  displayDate: string
}

export default function PrayerTimesTable({ timings, cityName, displayDate }: PrayerTimesTableProps) {
  const currentPkMinutes = (() => {
    const pk = getPakistanDateTime()
    return pk.getHours() * 60 + pk.getMinutes()
  })()

  const rows = [
    {
      id: 'fajr',
      name: 'Fajr',
      arabic: 'صلاة الفجر',
      urdu: 'نماز فجر',
      time: timings.fajr,
      period: 'Dawn prayer before sunrise',
    },
    {
      id: 'sunrise',
      name: 'Sunrise',
      arabic: 'شروق الشمس',
      urdu: 'طلوع آفتاب',
      time: timings.sunrise,
      period: 'Prohibited prayer time until sun rises',
    },
    {
      id: 'dhuhr',
      name: 'Dhuhr',
      arabic: 'صلاة الظهر',
      urdu: 'نماز ظہر',
      time: timings.dhuhr,
      period: 'Midday prayer after zenith (Zawal)',
    },
    {
      id: 'asr',
      name: 'Asr',
      arabic: 'صلاة العصر',
      urdu: 'نماز عصر',
      time: timings.asr,
      period: 'Afternoon prayer (Hanafi shadow 2x)',
    },
    {
      id: 'maghrib',
      name: 'Maghrib',
      arabic: 'صلاة المغرب',
      urdu: 'نماز مغرب',
      time: timings.maghrib,
      period: 'Evening prayer right after sunset',
    },
    {
      id: 'isha',
      name: 'Isha',
      arabic: 'صلاة العشاء',
      urdu: 'نماز عشاء',
      time: timings.isha,
      period: 'Night prayer when red twilight disappears',
    },
  ]

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Today&apos;s Prayer Times in {cityName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete schedule of mandatory five daily prayers (Namaz) and sunrise time.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{displayDate}</span>
        </div>
      </div>

      {/* Responsive Table / Card Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider font-semibold">
              <th scope="col" className="py-3.5 px-4 sm:px-6">Prayer</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6 hidden md:table-cell">Arabic & Urdu</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Time</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6 hidden sm:table-cell">Description</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {rows.map((row, idx) => {
              const prayerMin = timeStringToMinutes(row.time)
              const isPassed = currentPkMinutes > prayerMin
              const isEven = idx % 2 === 0

              return (
                <tr
                  key={row.id}
                  className={`hover:bg-blue-50/50 transition-colors ${
                    isEven ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  <td className="py-3.5 px-4 sm:px-6 font-extrabold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{row.name}</span>
                    </div>
                  </td>
                  
                  <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                    <span className="font-arabic font-semibold text-slate-700">{row.arabic}</span>
                    <span className="mx-1.5">•</span>
                    <span>{row.urdu}</span>
                  </td>

                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-900 text-base">
                    {row.time}
                  </td>

                  <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-500 hidden sm:table-cell">
                    {row.period}
                  </td>

                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    {row.id === 'sunrise' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        Sunrise
                      </span>
                    ) : isPassed ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-slate-400" />
                        <span>Passed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" />
                        <span>Upcoming</span>
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}
