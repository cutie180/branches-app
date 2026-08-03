'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MOCK_PROFESSIONALS } from '@/lib/data'
import Link from 'next/link'
import { Users, MapPin, Search, ShieldCheck, Star, ArrowRight, Award, CheckCircle2 } from 'lucide-react'

export default function ProfessionalsPage() {
  const [query, setQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const filtered = MOCK_PROFESSIONALS.filter(pro => {
    const matchesQuery = !query || 
      pro.name.toLowerCase().includes(query.toLowerCase()) ||
      pro.title.toLowerCase().includes(query.toLowerCase()) ||
      pro.skills.some(s => s.toLowerCase().includes(query.toLowerCase()))
    
    const matchesCity = !selectedCity || pro.city.toLowerCase() === selectedCity.toLowerCase()

    return matchesQuery && matchesCity
  })

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30 mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Pakistani Professional Network</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Verified Professionals & Subject Experts
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl">
              Connect with top engineers, charter accountants, medical consultants, legal advisors, and digital experts across Pakistan.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3 shadow-xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
            <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, title, or skill (e.g. Next.js, Tax, CA)..."
                className="w-full bg-transparent text-slate-900 text-sm focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-slate-900 text-sm focus:outline-none"
              >
                <option value="">All Cities in Pakistan</option>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Featured Talent Profiles ({filtered.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pro) => (
            <div key={pro.username} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-lg transition-all duration-200 space-y-4 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img src={pro.avatar} alt={pro.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-xs" />
                  <div className="space-y-0.5">
                    <Link href={`/professionals/${pro.username}`} className="font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      <span>{pro.name}</span>
                      {pro.verified && <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />}
                    </Link>
                    <p className="text-xs font-semibold text-slate-600">{pro.title}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{pro.city}</span>
                      <span>•</span>
                      <span className="font-bold text-amber-600">★ {pro.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {pro.bio}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {pro.skills.map((skill) => (
                    <span key={skill} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">{pro.hourlyRate}</span>
                <Link
                  href={`/professionals/${pro.username}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
