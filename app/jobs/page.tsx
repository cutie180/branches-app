'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { JobItem } from '@/lib/data'
import { getAllJobs } from '@/lib/job-service'
import Link from 'next/link'
import { Briefcase, MapPin, Search, Filter, Plus, Building2, CheckCircle2, ArrowRight, DollarSign } from 'lucide-react'

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>([])
  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const data = await getAllJobs(false)
        setJobs(data)
      } catch (err) {
        console.error('Error fetching jobs:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredJobs = jobs.filter(job => {
    const matchesQuery = !query || 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      (job.skills || []).some(s => s.toLowerCase().includes(query.toLowerCase()))
    
    const matchesType = !selectedType || job.type === selectedType
    const matchesCity = !selectedCity || job.city.toLowerCase() === selectedCity.toLowerCase()

    return matchesQuery && matchesType && matchesCity
  })

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* Jobs Hero Header */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Pakistan Employment Portal</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Find Your Next Career Opportunity
              </h1>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
                Connect directly with verified Pakistani companies, tech hubs, and employers hiring across Karachi, Lahore, Islamabad, and nationwide.
              </p>
            </div>

            <Link
              href="/post-job"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post a Job Free</span>
            </Link>
          </div>

          {/* Job Search Input Bar */}
          <div className="bg-white rounded-2xl p-3 shadow-xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job title, skill, or company..."
                className="w-full bg-transparent text-slate-900 text-xs focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-slate-900 text-xs focus:outline-none"
              >
                <option value="">All Cities in Pakistan</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </select>
            </div>

            <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <Filter className="w-5 h-5 text-slate-400 shrink-0" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent text-slate-900 text-xs focus:outline-none"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Jobs Listing Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">
        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
          <h2 className="text-xl font-extrabold text-slate-900">
            Open Vacancies ({filteredJobs.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">Sorted by Recently Posted</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs">Loading job openings...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-200">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No open positions found</h3>
            <p className="text-xs text-slate-500">Try adjusting your keyword, city, or job type filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-xs shrink-0" />
                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                        {job.type}
                      </span>
                      <Link href={`/jobs/${job.slug || job.id}`} className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors block truncate">
                        {job.title}
                      </Link>
                      <Link href={`/companies/${job.companySlug}`} className="text-xs font-semibold text-blue-600 hover:underline block truncate">
                        {job.company}
                      </Link>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Salary</span>
                      <span className="font-extrabold text-slate-900">{job.salary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Location</span>
                      <span className="font-semibold text-slate-800">📍 {job.city}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{job.postedDate}</span>
                  <Link
                    href={`/jobs/${job.slug || job.id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1"
                  >
                    <span>View & Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
