import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import { Search, MapPin, Building2, Briefcase, Users, ShieldCheck, Star, ArrowRight, Sparkles, TrendingUp, CheckCircle2, Award, ChevronRight } from 'lucide-react'
import { CATEGORIES, TOP_CITIES, MOCK_JOBS } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'

export const metadata: Metadata = {
  title: "ListPak: Pakistan Digital Business and Enterprise Ecosystem",
  description: "Explore verified businesses, post jobs, find employees, and connect with top Pakistani professionals across Karachi, Lahore, Islamabad, and nationwide.",
  alternates: {
    canonical: 'https://listpak.com/',
  },
  openGraph: {
    title: "ListPak: Pakistan Digital Business Ecosystem",
    description: "Discover verified companies, local services, active hiring jobs, and talent in Pakistan. 100 percent verified directory.",
    url: 'https://listpak.com/',
    siteName: 'ListPak',
    locale: 'en_PK',
    type: 'website',
  },
}

const FAQS = [
  {
    question: 'What is ListPak Ecosystem?',
    answer: 'ListPak is Pakistan largest enterprise digital platform connecting verified local businesses, employers, job seekers, and professionals across all 150+ cities nationwide.'
  },
  {
    question: 'Is listing a business on ListPak free?',
    answer: 'Yes, listing your business on ListPak is 100 percent free. You can add contact info, services, operating hours, and receive customer inquiries with zero monthly fees.'
  },
  {
    question: 'How do employers post jobs on ListPak?',
    answer: 'Employers can navigate to Post a Job, enter position details, required experience, and salary range to immediately publish hiring openings.'
  },
  {
    question: 'How does business verification work on ListPak?',
    answer: 'Business owners can click Claim Business on their profile, submit CNIC or registration documents, and receive a verified green trust badge.'
  }
]

export default async function HomePage() {
  const allBiz = await getAllBusinesses()
  const featured9 = allBiz.slice(0, 9)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ListPak',
    url: 'https://listpak.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://listpak.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    description: 'Pakistan digital business platform for local businesses, job listings, and verified professionals'
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main id="main-content">
        
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-b from-blue-50/70 via-slate-50 to-[#F8FAFC] text-slate-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 space-y-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200 text-xs font-bold tracking-wide uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Pakistan Flagship Enterprise Ecosystem</span>
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Discover Businesses, Jobs & Professionals in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600">Pakistan</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Connect with verified companies, top hiring employers, and skilled talent across Karachi, Lahore, Islamabad, and 150+ cities.
              </p>
            </div>

            {/* Predictive Multi-Tab Search Box */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-900/5 border border-slate-200/90 text-left">
              <form action="/search" method="GET" className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-6 flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Search business, software, restaurant, or job title..."
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4 flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                  <select
                    name="city"
                    className="w-full bg-transparent text-slate-900 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="">All Cities in Pakistan</option>
                    {TOP_CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full h-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              {/* Quick Keywords */}
              <div className="pt-3 px-2 flex items-center gap-2 flex-wrap text-xs text-slate-500">
                <span className="font-bold text-slate-400">Popular:</span>
                <Link href="/search?q=Banks" className="hover:text-blue-600 font-semibold">Banks</Link>
                <span>•</span>
                <Link href="/search?q=Restaurants" className="hover:text-blue-600 font-semibold">Restaurants</Link>
                <span>•</span>
                <Link href="/search?q=Software" className="hover:text-blue-600 font-semibold">Software Houses</Link>
                <span>•</span>
                <Link href="/search?q=Real+Estate" className="hover:text-blue-600 font-semibold">Real Estate</Link>
                <span>•</span>
                <Link href="/jobs" className="hover:text-emerald-600 font-bold">Hiring Jobs &rarr;</Link>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 text-left">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-2xl font-extrabold text-slate-900">150,000+</span>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Verified Listings</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-2xl font-extrabold text-emerald-600">150+</span>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Cities Covered</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-2xl font-extrabold text-blue-600">12,500+</span>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Active Jobs Posted</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-2xl font-extrabold text-amber-600">4.9 / 5</span>
                <p className="text-xs font-medium text-slate-500 mt-0.5">User Trust Rating</p>
              </div>
            </div>

          </div>
        </section>

        {/* FEATURED CATEGORIES GRID */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Browse Ecosystem</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Top Industry Categories
              </h2>
            </div>
            <Link href="/categories" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <span>View All 24 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-200 space-y-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {cat.desc}
                </p>
                <div className="pt-2 text-[11px] font-bold text-emerald-600 flex items-center justify-between">
                  <span>{cat.count.toLocaleString()} Listings</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED VERIFIED BUSINESSES SECTION (EXACTLY 9 CARDS FROM DATABASE) */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Enterprise Standard</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Featured Verified Companies
                </h2>
                <p className="text-slate-500 text-xs mt-1">Database driven featured companies and institutions across Pakistan.</p>
              </div>
              <Link href="/search" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <span>Explore Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured9.map((biz) => (
                <div key={biz.id} className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={biz.logo} alt={biz.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 bg-white" />
                        <div>
                          <Link href={`/business/${biz.slug}`} className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                            <span>{biz.name}</span>
                            {biz.verified && <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />}
                          </Link>
                          <p className="text-xs text-slate-500 font-medium">{biz.category}</p>
                        </div>
                      </div>
                      
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg shrink-0">
                        ★ {biz.rating}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {biz.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{biz.city}, Pakistan</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-600">Verified Listing</span>
                    <Link href={`/business/${biz.slug}`} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOBS & HIRING SECTION */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Active Hiring Portal</span>
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Hire Talent or Find Your Next Career Step
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect directly with top Pakistani engineers, managers, accountants, and consultants. Post job openings or submit your profile.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap w-full lg:w-auto">
              <Link
                href="/jobs"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                Browse Jobs Portal
              </Link>
              <Link
                href="/post-job"
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                Post Job Free
              </Link>
            </div>
          </div>
        </section>

        {/* FAQS SECTION */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Everything you need to know about Pakistan digital business ecosystem.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                <h3 className="font-bold text-slate-900 text-base">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
