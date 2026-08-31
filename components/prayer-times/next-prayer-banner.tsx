'use client'

import React, { useEffect, useState } from 'react'
import { Clock, Bell, Sparkles } from 'lucide-react'
import { PrayerTimings, getNextPrayerInfo, getPakistanDateTime, NextPrayerInfo } from '@/lib/prayer-service'

interface NextPrayerBannerProps {
  timings: PrayerTimings
  cityName: string
}

export default function NextPrayerBanner({ timings, cityName }: NextPrayerBannerProps) {
  const [nextPrayer, setNextPrayer] = useState<NextPrayerInfo | null>(null)

  useEffect(() => {
    // Immediate calculation
    const update = () => {
      const pkNow = getPakistanDateTime()
      setNextPrayer(getNextPrayerInfo(timings, pkNow))
    }
    update()

    // 1-second accurate interval
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [timings])

  if (!nextPrayer) {
    return (
      <div className="animate-pulse bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 flex items-center justify-between text-slate-400 text-sm">
        <span>Calculating upcoming prayer time for {cityName}...</span>
        <div className="h-6 w-24 bg-slate-700 rounded-lg" />
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900/80 border border-blue-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        
        {/* Left: Next Prayer Label & Arabic */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
            <Bell className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Next Prayer</span>
              </span>
              {nextPrayer.isTomorrow && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Tomorrow
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h3 className="text-2xl font-black text-white tracking-tight">{nextPrayer.name}</h3>
              <span className="text-sm font-medium text-slate-300 font-arabic">{nextPrayer.arabicName}</span>
              <span className="text-sm text-slate-300 font-semibold">• {nextPrayer.time}</span>
            </div>
          </div>
        </div>

        {/* Right: Countdown Counter */}
        <div className="w-full sm:w-auto bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-2.5 sm:text-right flex items-center sm:flex-col justify-between sm:justify-center">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Time Remaining</span>
          </div>
          <span className="font-mono text-lg sm:text-xl font-extrabold text-emerald-400 tracking-wider">
            {nextPrayer.timeRemainingFormatted}
          </span>
        </div>

      </div>
    </div>
  )
}
