import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Search, MapPin, Building2, Briefcase, Users, ShieldCheck, Star, ArrowRight, 
  Sparkles, TrendingUp, CheckCircle2, Award, ChevronRight, HelpCircle, Phone, 
  MessageSquare, FileText, Globe, Check, Quote, Mail, ExternalLink, Zap
} from 'lucide-react'
import { CATEGORIES, TOP_CITIES, MOCK_JOBS, MOCK_PROFESSIONALS } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'

export const revalidate = 3600

export const metadata: Metadata = {
  title: "ListPak: Pakistan Digital Business and Enterprise Ecosystem",
  description: "Discover businesses, services, companies, jobs, and professionals across Pakistan by category and city.",
  alternates: {
    canonical: 'https://www.listpak.com/',
  },
  openGraph: {
    title: "ListPak: Pakistan Digital Business Ecosystem",
    description: "Discover businesses, local services, companies, active jobs, and professional profiles across Pakistan.",
    url: 'https://www.listpak.com/',
    siteName: 'ListPak',
    locale: 'en_PK',
    type: 'website',
  },
}

const FAQS = [
  {
    question: 'What is ListPak Ecosystem?',
    answer: 'ListPak is a Pakistan-focused discovery platform connecting businesses, employers, job seekers, and professionals through category and city-based pages.'
  },
  {
    question: 'Is listing a business on ListPak free?',
    answer: 'Businesses can submit a listing through ListPak. Owners should provide accurate contact information, services, operating hours, and other details required during submission.'
  },
  {
    question: 'How do employers post jobs on ListPak?',
    answer: 'Employers can use the Post a Job flow to provide position details, experience requirements, location, and application information. Publication depends on the site’s current workflow and review requirements.'
  },
  {
    question: 'How does business verification work on ListPak?',
    answer: 'Business owners can use the available claim or verification workflow when it is offered for their listing and should submit only accurate supporting information.'
  }
]

const USE_CASES = [
  {
    title: 'Business discovery',
    body: 'People can explore available businesses and services by category, city, contact details, and public profile information.',
    link: '/categories',
    linkLabel: 'Browse categories'
  },
  {
    title: 'Professional discovery',
    body: 'Professionals can present relevant skills and public profile details, while users can review available information before contacting them.',
    link: '/professionals',
    linkLabel: 'Browse professionals'
  },
  {
    title: 'Job discovery',
    body: 'Employers can submit job information and candidates can review current opportunities, employer details, deadlines, and application routes.',
    link: '/jobs',
    linkLabel: 'Explore jobs'
  }
]
const RESOURCE_HIGHLIGHTS = [
  {
    title: 'How to list a business on ListPak',
    metrics: 'Listing guidance',
    category: 'Business listings',
    slug: 'how-to-list-business-free-listpak-guide'
  },
  {
    title: 'How to improve local visibility in Pakistan',
    metrics: 'Local SEO guidance',
    category: 'Local search',
    slug: 'local-seo-pakistan-businesses-google-ranking'
  }
]

const BUSINESS_RESOURCES = [
  {
    title: 'How to List Your Business Free on ListPak – Step-by-Step Guide 2026',
    date: 'August 1, 2026',
    category: 'Listing Guide',
    slug: 'how-to-list-business-free-listpak-guide'
  },
  {
    title: 'Local SEO for Pakistani Businesses: Improve Visibility in Your City',
    date: 'July 28, 2026',
    category: 'Local SEO',
    slug: 'local-seo-pakistan-businesses-google-ranking'
  },
  {
    title: 'Free Job Posting in Pakistan – How to Hire Employees Without Spending Money',
    date: 'July 25, 2026',
    category: 'Recruitment',
    slug: 'free-job-posting-pakistan-hire-employees'
  }
]

export default async function HomePage() {
  const allBiz = await getAllBusinesses()
  const featuredBusinesses = allBiz.slice(0, 6)
  const recentlyAddedBusinesses = allBiz.slice(6, 12).length > 0 ? allBiz.slice(6, 12) : allBiz.slice(0, 6)
  const featuredJobs = MOCK_JOBS.slice(0, 2)
  const latestJobs = MOCK_JOBS.slice(2, 6)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ListPak',
    url: 'https://www.listpak.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.listpak.com/search?q={search_term_string}',
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
      
      {/* 1. STICKY HEADER */}
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
        
        {/* 2. HERO SECTION */}
        <section className="bg-slate-50 text-slate-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Pakistan Flagship Enterprise Ecosystem</span>
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Discover Businesses, Jobs & Professionals in <span className="text-blue-700">Pakistan</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Discover businesses, companies, jobs, professionals, and local services across Pakistan by category and city.
              </p>
            </div>

            {/* Hero Search Box */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-900/5 border border-slate-200/90 text-left">
              <form action="/search" method="GET" className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-6 flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <label htmlFor="hero-search-q" className="sr-only">Search business or job title</label>
                  <input
                    id="hero-search-q"
                    type="text"
                    name="q"
                    placeholder="Search business, software, restaurant, or job title..."
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4 flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                  <label htmlFor="hero-city-select" className="sr-only">Select City</label>
                  <select
                    id="hero-city-select"
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
                    aria-label="Search ListPak Directory"
                    className="w-full h-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </form>

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
          </div>
        </section>

        {/* 3. TRUST METRICS */}
        <section className="bg-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-slate-900">Business discovery</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Search by category and city</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-emerald-600">Pakistan-wide</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">City-based local discovery</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-blue-600">Jobs</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Explore current opportunities</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-amber-500">People & teams</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Discover professionals and employers</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SEARCH BY CATEGORY */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Explore Industry Portals</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Search Businesses by Category
              </h2>
            </div>
            <Link href="/categories" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <span>View All 24 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.slice(0, 12).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all text-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-blue-600">
                  {cat.name}
                </h3>
                <p className="text-[11px] font-semibold text-emerald-600">
                  Browse listings
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. BROWSE BY CITY */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-900 text-white rounded-3xl my-8">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Geographic Directory</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Browse Businesses by City
                </h2>
                <p className="text-xs text-slate-400 mt-1">Explore businesses and services by city across Pakistan.</p>
              </div>
              <Link href="/cities" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                <span>Explore All Cities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
              {TOP_CITIES.map((city) => (
                <Link
                  key={city}
                  href={`/city/${city.toLowerCase()}`}
                  className="p-3.5 bg-slate-800/80 hover:bg-blue-600 rounded-xl border border-slate-700 text-slate-200 hover:text-white transition-all flex items-center justify-between font-semibold group"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                    <span>{city}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FEATURED BUSINESSES */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Verified Companies</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Featured Businesses
                </h2>
                <p className="text-slate-500 text-xs mt-1">Premier verified companies and institutions across Pakistan.</p>
              </div>
              <Link href="/search" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <span>Explore Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map((biz) => (
                <div key={biz.id} className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Image src={biz.logo} alt={biz.name} width={56} height={56} loading="lazy" sizes="56px" className="w-14 h-14 rounded-2xl object-cover border border-slate-200 bg-white" />
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

        {/* 7. RECENTLY ADDED BUSINESSES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Fresh Listings</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Recently Added Businesses
              </h2>
              <p className="text-xs text-slate-500 mt-1">Newly registered and validated companies in Pakistan.</p>
            </div>
            <Link href="/search" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <span>View All Additions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyAddedBusinesses.map((biz) => (
              <div key={biz.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-3">
                  <Image src={biz.logo} alt={biz.name} width={48} height={48} loading="lazy" sizes="48px" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                  <div>
                    <Link href={`/business/${biz.slug}`} className="font-bold text-slate-900 text-sm hover:text-blue-600">
                      {biz.name}
                    </Link>
                    <p className="text-xs text-slate-500">{biz.category} • {biz.city}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{biz.description}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-emerald-600 font-bold">{biz.verified ? 'Verified Listing' : 'Business Listing'}</span>
                  <Link href={`/business/${biz.slug}`} className="text-blue-600 font-semibold hover:underline">
                    View Listing &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. FEATURED JOBS */}
        <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Featured Placement</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Featured Career Vacancies
                </h2>
              </div>
              <Link href="/jobs" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                <span>All Featured Positions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredJobs.map((job) => (
                <div key={job.id} className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4 shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Image src={job.companyLogo} alt={job.company} width={48} height={48} loading="lazy" sizes="48px" className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-white" />
                      <div>
                        <h3 className="font-bold text-white text-base">{job.title}</h3>
                        <p className="text-xs text-slate-400">{job.company} • {job.city}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Featured
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{job.description}</p>
                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400">{job.salary}</span>
                    <Link href={`/jobs/${job.id}`} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold rounded-xl transition-colors">
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. LATEST JOBS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Fresh Hiring</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Latest Jobs Portal
              </h2>
            </div>
            <Link href="/jobs" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <span>View All Job Openings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between gap-4 hover:border-blue-500 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Image src={job.companyLogo} alt={job.company} width={48} height={48} loading="lazy" sizes="48px" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                        <p className="text-xs text-slate-500 font-medium">{job.company}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{job.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{job.salary}</span>
                  <Link href={`/jobs/${job.id}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. WHY LISTPAK */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Enterprise Value</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Why Choose ListPak Ecosystem?
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">Built to empower Pakistani companies, job seekers, and local customers.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Clear Business Details</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Clear business details and structured profiles help people compare local options more easily.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Instant WhatsApp Connect</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Direct WhatsApp connect links enabling instant customer communication without barriers.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <Award className="w-8 h-8 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">Search-Friendly Profiles</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Structured profile information helps users and search engines understand a listing’s purpose.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <Globe className="w-8 h-8 text-purple-600" />
                <h3 className="font-bold text-slate-900 text-base">City-Based Discovery</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Browse available businesses, services, companies, jobs, and professionals by location.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 11. HOW IT WORKS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">3-Step Process</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How ListPak Works
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">Connect, verify, and expand your market presence seamlessly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Search or Add Business</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Find services in your city or create a free business profile in 3 minutes with zero fees.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Get Verified & Connect</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unlock a verified green badge and enable one-tap direct WhatsApp customer inquiries.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Hire Talent & Grow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Post job vacancies, recruit verified professionals, and scale operations nationwide.
              </p>
            </div>
          </div>
        </section>

        {/* 12. FEATURED CATEGORIES */}
        <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Category Spotlights</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Featured Categories
                </h2>
              </div>
              <Link href="/categories" className="text-xs font-bold text-blue-400 hover:underline">
                View All Categories &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <Link key={cat.id} href={`/category/${cat.id}`} className="p-5 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors">
                  <Building2 className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">{cat.count.toLocaleString()} Active Listings</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 13. POPULAR SEARCHES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Popular Searches in Pakistan</h2>
          <div className="flex flex-wrap gap-2.5 text-xs">
            <Link href="/search?q=Banks" className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-blue-500 font-medium">Banks in Pakistan</Link>
            <Link href="/search?q=Restaurants" className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-blue-500 font-medium">Restaurants in Lahore</Link>
            <Link href="/search?q=Software" className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-blue-500 font-medium">Software Houses Islamabad</Link>
            <Link href="/search?q=Hospitals" className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-blue-500 font-medium">Doctors in Karachi</Link>
            <Link href="/search?q=Real+Estate" className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-blue-500 font-medium">Real Estate Rawalpindi</Link>
            <Link href="/jobs" className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 font-bold text-emerald-700">Jobs in Pakistan</Link>
          </div>
        </section>

        {/* 14. TESTIMONIALS */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Platform use cases</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Ways People Use ListPak
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {USE_CASES.map((item) => (
                <div key={item.title} className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-4 shadow-xs">
                  <Quote className="w-8 h-8 text-amber-500 opacity-60" />
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.body}</p>
                  <Link href={item.link} className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-2">
                    <span>{item.linkLabel}</span><ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 15. SUCCESS STORIES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Guides and next steps</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Practical Guides for Businesses and Job Seekers
              </h2>
            </div>
            <Link href="/blog" className="text-xs font-bold text-emerald-600 hover:underline">
              Read All Stories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCE_HIGHLIGHTS.map((story, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  {story.metrics}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">{story.title}</h3>
                <Link href={`/blog/${story.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-2">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 16. BUSINESS RESOURCES */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Guides & Insights</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Business Growth Resources
                </h2>
              </div>
              <Link href="/blog" className="text-xs font-bold text-blue-600 hover:underline">
                Explore Blog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BUSINESS_RESOURCES.map((res, i) => (
                <Link key={i} href={`/blog/${res.slug}`} className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3 hover:border-blue-500 transition-colors">
                  <span className="text-[11px] font-bold text-blue-600">{res.category}</span>
                  <h3 className="font-bold text-slate-900 text-sm">{res.title}</h3>
                  <p className="text-[11px] text-slate-400 pt-2">{res.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 17. FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Answers to common queries about ListPak business directory.
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

        {/* 18. NEWSLETTER */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto space-y-6">
            <Mail className="w-10 h-10 text-blue-400 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Subscribe to ListPak Business Insights
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Get weekly local SEO strategies, hiring guides, and market updates delivered directly to your inbox.
            </p>
            <form action="#" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="newsletter-email-input" className="sr-only">Email address</label>
              <input
                id="newsletter-email-input"
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              <button type="submit" aria-label="Subscribe to Newsletter" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shrink-0">
                Subscribe Free
              </button>
            </form>
          </div>
        </section>

        {/* 19. FINAL CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Ready to Grow Your Business or Hire Top Talent in Pakistan?
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                Share accurate business information and help people discover services, companies, jobs, and professionals across Pakistan.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-center shrink-0">
              <Link
                href="/add-business"
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2"
              >
                <span>Add Business Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* 20. FOOTER (Includes Universal Help Banner + 5 Column Links) */}
      <Footer />
    </div>
  )
}
