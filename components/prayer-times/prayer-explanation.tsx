import React from 'react'
import { BookOpen, Moon, Sunrise, Sun, CloudSun, Sunset } from 'lucide-react'

export default function PrayerExplanation() {
  const prayers = [
    {
      name: 'Fajr',
      arabic: 'صلاة الفجر',
      urdu: 'نماز فجر',
      icon: Moon,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200/60',
      summary: 'The dawn prayer observed before sunrise.',
      details: 'Begins at true dawn (Subh Sadiq) when vertical light appears on the eastern horizon and ends right before the upper edge of the sun crosses the horizon.',
    },
    {
      name: 'Sunrise',
      arabic: 'شروق الشمس',
      urdu: 'طلوع آفتاب',
      icon: Sunrise,
      color: 'text-amber-600 bg-amber-50 border-amber-200/60',
      summary: 'The calculated local astronomical sunrise time.',
      details: 'Marks the conclusion of the Fajr prayer window. Performing voluntary or obligatory prayers is prohibited during the immediate ~15-20 minutes of the sun rising.',
    },
    {
      name: 'Dhuhr',
      arabic: 'صلاة الظهر',
      urdu: 'نماز ظہر',
      icon: Sun,
      color: 'text-sky-600 bg-sky-50 border-sky-200/60',
      summary: 'The midday prayer time.',
      details: 'Commences just after the sun passes its highest celestial zenith point (Zawal / solar noon) and extends until the beginning of the Asr prayer window.',
    },
    {
      name: 'Asr',
      arabic: 'صلاة العصر',
      urdu: 'نماز عصر',
      icon: CloudSun,
      color: 'text-orange-600 bg-orange-50 border-orange-200/60',
      summary: 'The afternoon prayer time.',
      details: 'In Pakistan, standard calculations adhere to the Hanafi juristic methodology, where Asr begins when an object’s shadow reaches twice its midday length.',
    },
    {
      name: 'Maghrib',
      arabic: 'صلاة المغرب',
      urdu: 'نماز مغرب',
      icon: Sunset,
      color: 'text-rose-600 bg-rose-50 border-rose-200/60',
      summary: 'The prayer time beginning around sunset.',
      details: 'Starts immediately when the entire solar disk completely sinks below the western horizon (sunset/Ghurub) and continues until the red twilight fades.',
    },
    {
      name: 'Isha',
      arabic: 'صلاة العشاء',
      urdu: 'نماز عشاء',
      icon: Moon,
      color: 'text-purple-600 bg-purple-50 border-purple-200/60',
      summary: 'The night prayer time.',
      details: 'Begins once the evening twilight has completely disappeared and the darkness of night fully sets in, lasting until the arrival of the next morning’s Fajr.',
    },
  ]

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
      
      {/* Section Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Educational Guide</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Understanding Today&apos;s Prayer Times
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          An overview of the five obligatory daily Islamic prayers and astronomical milestones.
        </p>
      </div>

      {/* Grid of Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {prayers.map((prayer) => {
          const Icon = prayer.icon
          return (
            <div
              key={prayer.name}
              className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">{prayer.name}</h3>
                    <span className="text-xs text-slate-400 font-arabic">{prayer.arabic} • {prayer.urdu}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${prayer.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-700 mb-2">
                  {prayer.summary}
                </p>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-200/60 pt-2.5 mt-2">
                {prayer.details}
              </p>
            </div>
          )
        })}
      </div>

    </div>
  )
}
