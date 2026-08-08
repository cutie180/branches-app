'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ProfessionalItem } from '@/lib/data'
import { getAllProfessionals } from '@/lib/professional-service'
import Link from 'next/link'
import { 
  Users, MapPin, Search, ShieldCheck, Star, ArrowRight, Award, CheckCircle2, 
  Linkedin, Briefcase, Filter, Sparkles, UserPlus, Globe, Check
} from 'lucide-react'

const QUICK_PROFESSIONS = [
  'All Professions',
  'Software Developer',
  'Doctor',
  'Accountant',
  'Teacher',
  'Graphic Designer',
  'Electrician',
  'Lawyer',
  'Freelancer'
]

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState<ProfessionalItem[]>([])
  const [loading, setLoading] = useState(true)

  // Search & Filters
  const [query, setQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedProfession, setSelectedProfession] = useState('All Professions')
  const [selectedAvailability, setSelectedAvailability] = useState('')
  const [onlyVerified, setOnlyVerified] = useState(false)
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'name'>('rating')

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const data = await getAllProfessionals(false)
        setProfessionals(data)
      } catch (err) {
        console.error('Error fetching professionals:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Multi-facet filtering logic
  const filtered = professionals.filter(pro => {
    const q = query.toLowerCase().trim()
    const matchesQuery = !q || 
      pro.name.toLowerCase().includes(q) ||
      pro.title.toLowerCase().includes(q) ||
      pro.profession.toLowerCase().includes(q) ||
      (pro.specialization && pro.specialization.toLowerCase().includes(q)) ||
      pro.skills.some(s => s.toLowerCase().includes(q)) ||
      (pro.education && pro.education.some(e => e.degree.toLowerCase().includes(q) || e.institution.toLowerCase().includes(q)))

    const matchesCity = !selectedCity || pro.city.toLowerCase() === selectedCity.toLowerCase()
    const matchesProfession = selectedProfession === 'All Professions' || pro.profession.toLowerCase() === selectedProfession.toLowerCase()
    const matchesAvailability = !selectedAvailability || (pro.availability && pro.availability.toLowerCase().includes(selectedAvailability.toLowerCase()))
    const matchesVerified = !onlyVerified || pro.verified

    return matchesQuery && matchesCity && matchesProfession && matchesAvailability && matchesVerified
  }).sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5)
    if (sortBy === 'experience') return (b.experienceYears || 0) - (a.experienceYears || 0)
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                <Users className="w-3.5 h-3.5" />
                <span>Pakistani Professional & Freelancer Network</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Verified Professionals & Subject Experts
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
                Discover software developers, doctors, charter accountants, teachers, skilled technicians, lawyers, and creative talent across Pakistan.
              </p>
            </div>

            <Link
              href="/add-professional"
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Professional Profile</span>
            </Link>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5 flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, profession, skill (e.g. Next.js, Doctor, Tax)..."
                className="w-full bg-transparent text-slate-900 text-xs focus:outline-none"
              />
            </div>

            <div className="md:col-span-3 flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-slate-900 text-xs focus:outline-none"
              >
                <option value="">All Cities in Pakistan</option>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
              </select>
            </div>

            <div className="md:col-span-4 flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full bg-transparent text-slate-900 text-xs focus:outline-none"
              >
                <option value="">All Availability</option>
                <option value="Open to Work">Open to Work (Full-time)</option>
                <option value="Freelance">Freelance / Contracts</option>
                <option value="Consulting">Consulting / In-Clinic</option>
              </select>
            </div>
          </div>

          {/* Quick Profession Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
            {QUICK_PROFESSIONS.map(p => (
              <button
                key={p}
                onClick={() => setSelectedProfession(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  selectedProfession === p
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Verified Professional Talent ({filtered.length})
            </h2>
            <p className="text-xs text-slate-500">Public profiles indexed and discoverable across Pakistan.</p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Verified Only</span>
            </label>

            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="rating">Sort: Highest Rating</option>
              <option value="experience">Sort: Most Experience</option>
              <option value="name">Sort: Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12 text-center">
            <div className="col-span-full text-slate-400 text-sm">Loading professional profiles...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No professionals found matching your filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Try clearing search terms or selected city to view all profiles.</p>
            <button
              onClick={() => { setQuery(''); setSelectedCity(''); setSelectedProfession('All Professions'); setOnlyVerified(false) }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pro) => (
              <div
                key={pro.username}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-4">
                  {/* Top Profile Header */}
                  <div className="flex items-start gap-4">
                    <Image
                      src={pro.avatar}
                      alt={pro.name}
                      width={64}
                      height={64}
                      loading="lazy"
                      sizes="64px"
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-xs shrink-0"
                    />
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Link
                          href={`/professionals/${pro.username}`}
                          className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors truncate"
                        >
                          {pro.name}
                        </Link>
                        {pro.verified && (
                          <span title="Verified Professional">
                            <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-bold text-blue-600 line-clamp-1">{pro.title}</p>
                      
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {pro.city}
                        </span>
                        <span>•</span>
                        <span className="font-extrabold text-amber-500 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {pro.rating}
                        </span>
                        <span>•</span>
                        <span className="text-slate-600 font-semibold">{pro.experienceYears}y Exp</span>
                      </div>
                    </div>
                  </div>

                  {/* Short Bio */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {pro.bio}
                  </p>

                  {/* Skills Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {pro.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        {skill}
                      </span>
                    ))}
                    {pro.skills.length > 4 && (
                      <span className="text-[10px] text-slate-400 font-bold">+{pro.skills.length - 4} more</span>
                    )}
                  </div>
                </div>

                {/* Card Footer with LinkedIn & CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {pro.linkedin && (
                      <a
                        href={pro.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View LinkedIn Profile"
                        className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <span className="text-xs font-extrabold text-slate-900">{pro.hourlyRate}</span>
                  </div>

                  <Link
                    href={`/professionals/${pro.username}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1 shadow-xs"
                  >
                    <span>View Profile</span>
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
