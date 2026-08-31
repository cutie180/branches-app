'use client'

import React from 'react'
import { Sparkles, SunMedium, MoonStar, Info, Compass, Clock, Sunrise } from 'lucide-react'
import { PrayerTimings, DerivedCalculations } from '@/lib/prayer-service'

interface AdditionalIslamicTimesProps {
  timings: PrayerTimings
  derived: DerivedCalculations
  cityName: string
}

export default function AdditionalIslamicTimes({ timings, derived, cityName }: AdditionalIslamicTimesProps) {
  const voluntaryTimes = [
    {
      name: 'Ishraq',
      arabic: 'الإشراق',
      urdu: 'اشراق',
      time: derived.ishraq,
      sourceType: 'Calculated (Sunrise + 18m)',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      description: 'Observed ~15–20 minutes after sunrise once the sun has completely risen 1 spear above the horizon.',
      icon: Sparkles,
      color: 'text-amber-600 bg-amber-50 border-amber-200/60',
    },
    {
      name: 'Chasht (Duha)',
      arabic: 'الضحى',
      urdu: 'چاشت / ضحیٰ',
      time: derived.chasht,
      sourceType: 'Calculated (Midpoint Sun–Dhuhr)',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      description: 'Mid-morning voluntary prayer timing, calculated at the midpoint between sunrise and Dhuhr.',
      icon: SunMedium,
      color: 'text-orange-600 bg-orange-50 border-orange-200/60',
    },
    {
      name: 'Tahajjud Window',
      arabic: 'التهجد',
      urdu: 'تہجد',
      time: derived.tahajjud,
      sourceType: 'Derived from Last Third to Fajr',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Starts at the Last Third of the night and continues until the onset of Fajr dawn.',
      icon: Compass,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/60',
    },
  ]

  const nocturnalApiTimes = [
    {
      name: 'Islamic Midnight',
      arabic: 'نصف الليل',
      urdu: 'نصف اللیل',
      time: timings.midnight,
      sourceType: 'AlAdhan API',
      description: 'Standard midpoint of the night between sunset and dawn.',
      icon: MoonStar,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200/60',
    },
    {
      name: 'First Third of Night',
      arabic: 'ثلث الليل الأول',
      urdu: 'پہلا تہائی حصہ',
      time: timings.firstThird,
      sourceType: 'AlAdhan API',
      description: 'One third into the nocturnal duration from Maghrib.',
      icon: Clock,
      color: 'text-blue-600 bg-blue-50 border-blue-200/60',
    },
    {
      name: 'Last Third of Night',
      arabic: 'ثلث الليل الأخير',
      urdu: 'آخری تہائی حصہ',
      time: timings.lastThird,
      sourceType: 'AlAdhan API',
      description: 'Two thirds into the night duration, marking prime nocturnal prayer time.',
      icon: MoonStar,
      color: 'text-purple-600 bg-purple-50 border-purple-200/60',
    },
    {
      name: 'Imsak (Sehri Caution)',
      arabic: 'الإمساك',
      urdu: 'امساک (احتیاطِ سحر)',
      time: timings.imsak,
      sourceType: 'AlAdhan API',
      description: 'Standard ~10 minutes precautionary window prior to Fajr during fasting.',
      icon: Sunrise,
      color: 'text-rose-600 bg-rose-50 border-rose-200/60',
    },
  ]

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-8">
      
      {/* 1. Derived Voluntary Times (Ishraq, Chasht, Tahajjud) */}
      <div className="space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Voluntary (Nawafil) Prayer Timings</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Calculated Additional Islamic Times for {cityName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Voluntary daylight and nocturnal prayer windows derived from local solar coordinates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {voluntaryTimes.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">{item.name}</h3>
                      <span className="text-xs text-slate-400 font-arabic">{item.arabic} • {item.urdu}</span>
                    </div>
                    <div className={`p-2 rounded-xl border ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {item.time}
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.sourceType}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-200/60 pt-2.5 mt-1">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Direct AlAdhan Nocturnal Partitions (Midnight, First Third, Last Third, Imsak) */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Nocturnal Partitions & Night Quarters (AlAdhan API)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Standard Islamic night divisions computed directly by the AlAdhan service from Maghrib sunset to Fajr dawn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {nocturnalApiTimes.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="p-4 rounded-2xl bg-slate-50/50 border border-slate-200/70 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{item.name}</h4>
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
                    {item.time}
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 font-arabic block mb-2">
                    {item.arabic} • {item.urdu}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal border-t border-slate-100 pt-2">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Informational Disclaimer Note */}
      <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Calculation note:</strong> Ishraq is calculated as Sunrise + 18 mins. Chasht (Duha) is calculated as the midpoint between Sunrise and Dhuhr. Midnight, First Third, Last Third, and Imsak are provided directly by AlAdhan according to standard astronomical sunset-to-sunrise partition. Additional voluntary timings can vary slightly by juristic methodology.
        </p>
      </div>

    </div>
  )
}
