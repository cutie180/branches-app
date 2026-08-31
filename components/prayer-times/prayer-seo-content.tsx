import React from 'react'
import { FileText, MapPin, Compass, Sun, ShieldCheck } from 'lucide-react'

export default function PrayerSeoContent() {
  return (
    <article className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
          <FileText className="w-4 h-4" />
          <span>In-Depth Information</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Prayer Times in Pakistan
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          A comprehensive guide to understanding daily Namaz timings, geographical variations, and solar calculations across Pakistan.
        </p>
      </div>

      {/* Structured Editorial Content (350–450 words) */}
      <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-5">
        
        <p>
          Determining accurate <strong>prayer times in Pakistan today</strong> is essential for millions of Muslims observing their five daily obligations (Salah / Namaz). Because Pakistan spans a wide geographical area—from the coastal plains of Sindh and the Balochistan coastline to the Potohar plateau, the Indus river valley, and the northern mountain ranges—exact prayer timings differ noticeably from one city to another.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Geographical Variation</h3>
              <p className="text-xs text-slate-600 mt-1">
                There can be a difference of 20 to 45 minutes between eastern cities like Lahore or Sialkot and western regions like Quetta, Turbat, or Gwadar for Fajr, Sunrise, and Maghrib timings.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
            <Sun className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Daily Solar Shifts</h3>
              <p className="text-xs text-slate-600 mt-1">
                As the Earth orbits the Sun, day length and solar noon shift continuously throughout the year, causing daily Namaz timings to advance or recede by 1 to 2 minutes daily.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 not-prose pt-2">
          Why Selecting Your Specific City Matters
        </h3>

        <p>
          Because Islamic prayer times are strictly tied to astronomical solar positions, using a single generalized schedule for the entire country is inaccurate. For instance, when the <strong>Maghrib time in Pakistan</strong> begins in Lahore, worshippers in Karachi or Quetta still have considerable daylight remaining before sunset. By utilizing our intelligent city search above, you can access pinpoint timings tailored to your exact district, tehsil, or metropolitan division.
        </p>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 not-prose pt-2">
          The Five Obligatory Prayers in Daily Life
        </h3>

        <p>
          Each of the five daily prayers represents a spiritual pause during different junctures of the day:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li><strong>Fajr:</strong> The dawn prayer offered before sunrise, inaugurating the day with spiritual devotion and gratitude.</li>
          <li><strong>Dhuhr:</strong> The midday prayer observed just after the sun reaches its zenith (Zawal), providing a spiritual recess during the workday.</li>
          <li><strong>Asr:</strong> The afternoon prayer observed during the latter half of the day. In Pakistan, the majority of mosques adhere to the Hanafi calculation (2x shadow length).</li>
          <li><strong>Maghrib:</strong> The sunset prayer performed promptly after the sun dips below the horizon, also marking the time for breaking fasts (Iftar).</li>
          <li><strong>Isha:</strong> The night prayer performed once twilight has completely faded, concluding the day’s obligatory worship.</li>
        </ul>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 not-prose pt-2">
          Calculation Methodology & Accuracy
        </h3>

        <p>
          Timings presented on ListPak are aligned with the renowned <strong>University of Islamic Sciences, Karachi</strong> convention and the <strong>Hanafi juristic school</strong> for Asr. Whether you are searching for today&apos;s Fajr time, Dhuhr time, Asr time, Maghrib time, or Isha time, our system continuously synchronizes with local astronomical data to provide reliable, authentic, and live countdowns.
        </p>

      </div>

    </article>
  )
}
