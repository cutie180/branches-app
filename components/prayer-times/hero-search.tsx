'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, MapPin, X, Calendar, Compass } from 'lucide-react'
import { CITIES } from '@/lib/data'

interface HeroSearchProps {
  selectedCity: string
  displayDate: string
  onSelectCity: (city: string) => void
}

export default function HeroSearch({ selectedCity, displayDate, onSelectCity }: HeroSearchProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter matching Pakistani cities
  const filteredCities = query.trim() === ''
    ? []
    : CITIES.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase().trim())
      ).slice(0, 8)

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (city: string) => {
    onSelectCity(city)
    setQuery('')
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredCities.length === 0) {
      if (e.key === 'ArrowDown' && filteredCities.length > 0) {
        setIsOpen(true)
        setHighlightedIndex(0)
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev < filteredCities.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredCities.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightedIndex >= 0 && highlightedIndex < filteredCities.length) {
        handleSelect(filteredCities[highlightedIndex])
      } else if (filteredCities.length > 0) {
        handleSelect(filteredCities[0])
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
    }
  }

  return (
    <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        
        {/* Dynamic Date & Location Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-semibold border border-emerald-500/20 shadow-xs">
          <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Today&apos;s Prayer Times – {displayDate}</span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>Pakistan Standard Time (PST)</span>
          </span>
        </div>

        {/* Primary Page H1 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Prayer Times in Pakistan Today
        </h1>

        {/* Supporting Hero Text */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          View today&apos;s Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha timings for Pakistan. Search for your city to see local prayer times.
        </p>

        {/* Prominent City Search Interface */}
        <div className="pt-2 max-w-2xl mx-auto text-left relative">
          <label htmlFor="city-prayer-search" className="block text-xs font-semibold text-slate-300 mb-2">
            Search your city in Pakistan
          </label>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>

            <input
              id="city-prayer-search"
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setIsOpen(true)
                setHighlightedIndex(-1)
              }}
              onFocus={() => {
                if (query.trim()) setIsOpen(true)
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search city e.g. Lahore, Karachi, Islamabad..."
              aria-label="Search Pakistani city for local prayer times"
              aria-autocomplete="list"
              aria-expanded={isOpen && filteredCities.length > 0}
              aria-controls="city-search-results"
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base shadow-xl transition-all"
            />

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setIsOpen(false)
                  inputRef.current?.focus()
                }}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                aria-label="Clear city search input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isOpen && query.trim() !== '' && (
            <div
              id="city-search-results"
              ref={dropdownRef}
              role="listbox"
              className="absolute left-0 right-0 top-full mt-2 bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in-50 duration-150"
            >
              {filteredCities.length > 0 ? (
                <ul className="py-2 divide-y divide-slate-800/60 max-h-72 overflow-y-auto">
                  {filteredCities.map((city, idx) => {
                    const isSelected = city.toLowerCase() === selectedCity.toLowerCase()
                    const isHighlighted = idx === highlightedIndex
                    return (
                      <li
                        key={city}
                        id={`city-opt-${idx}`}
                        role="option"
                        aria-selected={isHighlighted}
                        onClick={() => handleSelect(city)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
                          isHighlighted
                            ? 'bg-blue-600/30 text-white'
                            : isSelected
                            ? 'bg-slate-800/80 text-emerald-400'
                            : 'text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-blue-400'}`} />
                          <span className="font-medium text-sm sm:text-base">{city}</span>
                        </div>
                        <span className="text-xs text-slate-400">Pakistan</span>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-slate-400">
                  <p>We couldn&apos;t find that city.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Please select a Pakistani city from the suggestions or check spelling.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
          <span className="font-medium text-slate-300">Popular cities:</span>
          {['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Faisalabad'].map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onSelectCity(city)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                selectedCity.toLowerCase() === city.toLowerCase()
                  ? 'bg-blue-600 text-white border-blue-500 font-bold'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
