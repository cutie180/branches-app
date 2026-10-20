'use client'

import React, { useState, useMemo } from 'react'
import { Search, MapPin, Filter, Briefcase, Plus } from 'lucide-react'
import Link from 'next/link'
import type { JobItem } from '@/lib/data'
import JobCardExpandable from './job-card-expandable'
import { getPublicJobPath } from '@/lib/job-url'

interface JobsFilterClientProps {
  initialJobs: JobItem[]
}

export default function JobsFilterClient({ initialJobs }: JobsFilterClientProps) {
  const [query, setQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        (job.skills || []).some((s) => s.toLowerCase().includes(q)) ||
        (job.category || '').toLowerCase().includes(q)

      const matchesType = !selectedType || job.type === selectedType

      const matchesCity =
        !selectedCity ||
        job.city.toLowerCase().includes(selectedCity.toLowerCase()) ||
        (job.cities && job.cities.some((c) => c.toLowerCase() === selectedCity.toLowerCase()))

      return matchesQuery && matchesType && matchesCity
    })
  }, [initialJobs, query, selectedCity, selectedType])

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-3 shadow-xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, skill, or company..."
            className="w-full bg-transparent text-slate-900 text-xs focus:outline-none"
            aria-label="Search jobs by title, skill, or company"
          />
        </div>

        <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
          <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-transparent text-slate-900 text-xs focus:outline-none cursor-pointer"
            aria-label="Filter jobs by city"
          >
            <option value="">All Cities in Pakistan</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Remote">Remote (Work from Home)</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Multan">Multan</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Quetta">Quetta</option>
            <option value="Sialkot">Sialkot</option>
            <option value="Gujranwala">Gujranwala</option>
          </select>
        </div>

        <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
          <Filter className="w-5 h-5 text-slate-400 shrink-0" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-transparent text-slate-900 text-xs focus:outline-none cursor-pointer"
            aria-label="Filter jobs by employment type"
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-900">
          Open Vacancies ({filteredJobs.length})
        </h2>
        <span className="text-xs text-slate-500 font-medium">
          Verified Employers • Updated Daily
        </span>
      </div>

      {/* Jobs Grid (Server Rendered through initialJobs) */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-200">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No open positions found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your keyword, city, or job type filters.
          </p>
          <button
            onClick={() => {
              setQuery('')
              setSelectedCity('')
              setSelectedType('')
            }}
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredJobs.map((job) => (
            <JobCardExpandable key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
