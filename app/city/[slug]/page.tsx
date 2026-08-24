import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CITIES } from '@/lib/data'
import { getAllJobs } from '@/lib/job-service'
import { getAllBusinesses } from '@/lib/db-service'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ShieldCheck, Star, ArrowRight, ArrowLeft, Building2, Briefcase } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import { getCitySeoCopy } from '@/lib/seo-directory-content'

export const revalidate = 86400 // 24-hour ISR revalidation
export const dynamicParams = false

export async function generateStaticParams() {
  return CITIES.map((city) => ({ slug: city.toLowerCase().replace(/\s+/g, '-') }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const cityName = CITIES.find((city) => city.toLowerCase().replace(/\s+/g, '-') === params.slug.toLowerCase())
  if (!cityName) {
    return { title: 'City not found | ListPak', robots: { index: false, follow: false } }
  }
  const title = `${cityName} Business Directory & Jobs: ListPak`
  return {
    title,
    description: `Explore current businesses, services, jobs, and professional discovery in ${cityName}, Pakistan.`,
    openGraph: { title, description: `Explore current businesses, services, jobs, and professional discovery in ${cityName}, Pakistan.`, url: `https://www.listpak.com/city/${params.slug.toLowerCase()}`, type: 'website' },
    alternates: { canonical: `https://www.listpak.com/city/${params.slug.toLowerCase()}` },
  }
}

export default async function CityDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const cityName = CITIES.find((city) => city.toLowerCase().replace(/\s+/g, '-') === params.slug.toLowerCase())
  if (!cityName) notFound()

  const allApproved = await getAllBusinesses(false)
  const cityBusinesses = allApproved.filter(
    b => 
      b.city.toLowerCase() === cityName.toLowerCase() ||
      (b.cities && b.cities.some(c => c.toLowerCase() === cityName.toLowerCase())) ||
      (b.locations && b.locations.some(l => l.city.toLowerCase() === cityName.toLowerCase()))
  )

  const allJobs = await getAllJobs(false)
  const cityJobs = allJobs.filter((job) => job.city.toLowerCase() === cityName.toLowerCase() || job.cities?.some((city) => city.toLowerCase() === cityName.toLowerCase()))
  const seoCopy = getCitySeoCopy(params.slug)

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <BreadcrumbSchema pathname={`/city/${params.slug.toLowerCase()}`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${cityName} Business Directory`, description: `Businesses, jobs, and professional discovery in ${cityName}, Pakistan.`, url: `https://www.listpak.com/city/${params.slug.toLowerCase()}` }) }} />

      <section className="bg-[#0F172A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400"><Link href="/" className="hover:text-white underline">Home</Link><span className="mx-2">/</span><Link href="/cities" className="hover:text-white underline">Cities</Link><span className="mx-2">/</span><span>{cityName}</span></nav>
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
              <p className="text-slate-400 text-sm">Explore available businesses, services, jobs, and professional profiles in {cityName}.</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
        {seoCopy && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">{seoCopy.intro}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{seoCopy.guidance}</p>
            <nav aria-label="Related ListPak guides" className="flex flex-wrap gap-2">
              {seoCopy.links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>
        )}
        
        {/* City Businesses */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Businesses in {cityName} ({cityBusinesses.length})</span>
            </h2>
            <Link href={`/search?city=${encodeURIComponent(cityName)}`} className="text-xs font-bold text-blue-600 hover:underline">
              View All &rarr;
            </Link>
          </div>

          {cityBusinesses.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <p className="text-slate-600 text-sm">No businesses currently listed in {cityName}.</p>
              <Link href="/add-business" className="inline-block mt-3 px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-xl">
                Add Your {cityName} Business Free
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityBusinesses.map((biz) => (
                <div key={biz.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Image src={biz.logo} alt={biz.name} width={48} height={48} loading="lazy" sizes="48px" className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0" />
                        <div>
                          <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                            <span>{biz.name}</span>
                            {biz.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                          </h3>
                          <p className="text-xs text-slate-500">{biz.category}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg shrink-0">{biz.reviewCount > 0 && biz.rating > 0 ? `★ ${biz.rating}` : 'No rating yet'}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{biz.description}</p>
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
                    <Link href={`/jobs/${job.slug || job.id}`} className="font-bold text-slate-900 text-base hover:text-blue-600">
                      {job.title}
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5">{job.company} • {job.salary}</p>
                  </div>
                  <Link href={`/jobs/${job.slug || job.id}`} className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-xl">
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
