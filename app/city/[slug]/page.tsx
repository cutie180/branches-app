import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MOCK_BUSINESSES, MOCK_JOBS, MOCK_PROFESSIONALS } from '@/lib/data'
import Link from 'next/link'
import { MapPin, ShieldCheck, Star, ArrowRight, ArrowLeft, Building2, Briefcase, Users } from 'lucide-react'
import { Metadata } from 'next'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const cityName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)
  return {
    title: `${cityName} Business Directory & Jobs | ListPak`,
    description: `Explore top verified businesses, software houses, restaurants, hospitals, job openings, and professionals in ${cityName}, Pakistan.`
  }
}

export default async function CityDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const cityName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  const cityBusinesses = MOCK_BUSINESSES.filter(
    b => b.city.toLowerCase() === params.slug.toLowerCase()
  )

  const cityJobs = MOCK_JOBS.filter(
    j => j.city.toLowerCase() === params.slug.toLowerCase()
  )

  const cityPros = MOCK_PROFESSIONALS.filter(
    p => p.city.toLowerCase() === params.slug.toLowerCase()
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link href="/cities" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Pakistani Cities</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">{cityName} Business Ecosystem</h1>
              <p className="text-slate-400 text-sm">Verified directory, employment center, and talent network in {cityName}.</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
        
        {/* City Businesses */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Businesses in {cityName}</span>
            </h2>
            <Link href={`/search?city=${encodeURIComponent(cityName)}`} className="text-xs font-bold text-blue-600 hover:underline">
              View All &rarr;
            </Link>
          </div>

          {cityBusinesses.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <p className="text-slate-600 text-sm">No businesses listed in {cityName} yet.</p>
              <Link href="/add-business" className="inline-block mt-3 px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-xl">
                Add Your {cityName} Business Free
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityBusinesses.map((biz) => (
                <div key={biz.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                        <span>{biz.name}</span>
                        {biz.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                      </h3>
                      <span className="text-xs font-bold text-amber-600">★ {biz.rating}</span>
                    </div>
                    <p className="text-xs text-slate-500">{biz.category}</p>
                    <p className="text-xs text-slate-600 line-clamp-2">{biz.description}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end">
                    <Link href={`/business/${biz.slug}`} className="text-xs font-bold text-blue-600 flex items-center gap-1">
                      <span>View Listing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* City Jobs */}
        {cityJobs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              <span>Jobs in {cityName}</span>
            </h2>
            <div className="space-y-3">
              {cityJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex justify-between items-center">
                  <div>
                    <Link href={`/jobs/${job.id}`} className="font-bold text-slate-900 text-base hover:text-blue-600">
                      {job.title}
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5">{job.company} • {job.salary}</p>
                  </div>
                  <Link href={`/jobs/${job.id}`} className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-xl">
                    Apply
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
