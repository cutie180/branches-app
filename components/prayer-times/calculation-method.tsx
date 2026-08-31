import React from 'react'
import { Settings, ShieldCheck, Scale, Globe, Compass } from 'lucide-react'
import { CALCULATION_CONFIG } from '@/lib/prayer-service'

export default function CalculationMethod() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4" />
          <span>Calculation Standard</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Prayer Time Calculation Method
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete transparency on the astronomical parameters and jurisprudential methods applied for Pakistan.
        </p>
      </div>

      {/* Specifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Primary Authority</span>
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">
            {CALCULATION_CONFIG.methodName}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            The recognized official calculation authority utilized by government institutions, mosques, and Islamic organizations across Pakistan.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase">
            <Scale className="w-4 h-4" />
            <span>Asr Juristic Method</span>
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">
            {CALCULATION_CONFIG.juristicSchoolName}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Asr timing is computed when the shadow of an upright object equals twice the length of the object plus the shadow at noon.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase">
            <Compass className="w-4 h-4" />
            <span>Solar Twilight Angles</span>
          </div>
          <div className="space-y-1 pt-1 text-sm font-semibold text-slate-800">
            <div className="flex justify-between border-b border-slate-200/60 pb-1">
              <span>Fajr Angle:</span>
              <span className="font-mono text-purple-700">{CALCULATION_CONFIG.fajrAngle}° Below Horizon</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>Isha Angle:</span>
              <span className="font-mono text-purple-700">{CALCULATION_CONFIG.ishaAngle}° Below Horizon</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 pt-1 leading-relaxed">
            Astronomical twilight angles standard to South Asia for precise dawn and nightfall determination.
          </p>
        </div>

      </div>

      {/* Timezone Note */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
        <Globe className="w-4 h-4 text-slate-500 shrink-0" />
        <p>
          All daily timings and countdown timers are computed strictly according to <strong>Pakistan Standard Time (PKT / Asia/Karachi, UTC+05:00)</strong>.
        </p>
      </div>

    </div>
  )
}
