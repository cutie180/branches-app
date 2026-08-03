import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CITIES, TOP_CITIES } from '@/lib/data'
import Link from 'next/link'
import { MapPin, Building2, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cities Directory Pakistan | ListPak Enterprise Hub',
  description: 'Explore business listings, companies, and jobs across 150+ Pakistani cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and Peshawar.',
}

export default function CitiesIndexPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pakistani Geographic Directory</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Business Ecosystem Across 150+ Cities</h1>
          <p className="text-slate-400 text-sm">
            Find local stores, services, verified employers, and professionals in every province of Pakistan.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-10">
        
        {/* Top Metropolitan Hubs */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Top Metropolitan Business Hubs</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TOP_CITIES.slice(0, 10).map((city) => (
              <Link
                key={city}
                href={`/city/${city.toLowerCase()}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all text-center space-y-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  {city}
                </h3>
                <span className="text-[11px] font-semibold text-emerald-600 block">Verified Directory</span>
              </Link>
            ))}
          </div>
        </div>

        {/* All 150+ Cities Index Grid */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900">
            Complete Index of Cities ({CITIES.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
            {CITIES.map((city) => (
              <Link
                key={city}
                href={`/city/${city.toLowerCase()}`}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 font-semibold transition-colors flex items-center justify-between"
              >
                <span>{city}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 opacity-60" />
              </Link>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
