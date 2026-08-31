'use client'

import React from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight, Check } from 'lucide-react'

interface PakistanCitiesGridProps {
  selectedCity?: string
  onSelectCity?: (city: string) => void
}

const MAJOR_PAKISTAN_CITIES = [
  { name: 'Karachi', province: 'Sindh', region: 'Southern Pakistan' },
  { name: 'Lahore', province: 'Punjab', region: 'Central Punjab' },
  { name: 'Islamabad', province: 'Federal Capital', region: 'Capital Territory' },
  { name: 'Rawalpindi', province: 'Punjab', region: 'Potohar Region' },
  { name: 'Faisalabad', province: 'Punjab', region: 'Central Punjab' },
  { name: 'Multan', province: 'Punjab', region: 'Southern Punjab' },
  { name: 'Peshawar', province: 'Khyber Pakhtunkhwa', region: 'Northern Pakistan' },
  { name: 'Quetta', province: 'Balochistan', region: 'Western Pakistan' },
  { name: 'Gujranwala', province: 'Punjab', region: 'Central Punjab' },
  { name: 'Sialkot', province: 'Punjab', region: 'North-East Punjab' },
  { name: 'Hyderabad', province: 'Sindh', region: 'Lower Sindh' },
  { name: 'Bahawalpur', province: 'Punjab', region: 'Southern Punjab' },
  { name: 'Sargodha', province: 'Punjab', region: 'Central Punjab' },
  { name: 'Sukkur', province: 'Sindh', region: 'Upper Sindh' },
  { name: 'Abbottabad', province: 'Khyber Pakhtunkhwa', region: 'Hazara Division' },
]

export default function PakistanCitiesGrid({ selectedCity = '', onSelectCity }: PakistanCitiesGridProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4" />
            <span>Geographic Selection</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Prayer Times Across Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select your city to open its dedicated daily Namaz schedule and live countdown.
          </p>
        </div>

        {selectedCity && (
          <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Current City: <strong className="text-blue-600">{selectedCity}</strong>
          </div>
        )}
      </div>

      {/* Grid of 15 Cities with dedicated SEO URLs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {MAJOR_PAKISTAN_CITIES.map((cityObj) => {
          const isSelected = cityObj.name.toLowerCase() === selectedCity.toLowerCase()
          const citySlug = cityObj.name.toLowerCase().replace(/\s+/g, '-')
          const targetUrl = `/prayer-times-${citySlug}-today/`

          return (
            <Link
              key={cityObj.name}
              href={targetUrl}
              onClick={(e) => {
                if (onSelectCity) {
                  // If on main page and user prefers in-page switch or navigation
                  onSelectCity(cityObj.name)
                }
              }}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20 ring-2 ring-blue-400/40'
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-800 hover:bg-blue-50/70 hover:border-blue-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors'}`}>
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                {isSelected ? (
                  <span className="p-0.5 rounded-full bg-white text-blue-600">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                )}
              </div>

              <div>
                <h3 className={`font-extrabold text-sm ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'}`}>
                  {cityObj.name}
                </h3>
                <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {cityObj.province}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

    </div>
  )
}
