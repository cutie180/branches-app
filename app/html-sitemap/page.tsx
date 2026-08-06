import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CATEGORIES, TOP_CITIES } from '@/lib/data'
import { MapPin, Sparkles, FileText, Briefcase, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HTML Sitemap | ListPak Directory Structure',
  description: 'Complete directory index of all categories, major cities, job portals, blogs, and legal pages on ListPak.',
  alternates: {
    canonical: 'https://www.listpak.com/html-sitemap',
  },
}

export default function HTMLSitemapPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              ListPak Complete Website HTML Sitemap
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Browse the hierarchical index of all public sections, industry categories, city business hubs, and support policies.
            </p>
          </div>

          {/* Core App Pages */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Main Portal Sections</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-700">
              <Link href="/" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Homepage</Link>
              <Link href="/about" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">About Us</Link>
              <Link href="/contact" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Contact Us</Link>
              <Link href="/search" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Business Search</Link>
              <Link href="/add-business" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Add Business</Link>
              <Link href="/categories" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Categories Index</Link>
              <Link href="/cities" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Cities Index</Link>
              <Link href="/jobs" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Jobs Portal</Link>
              <Link href="/post-job" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Post a Job</Link>
              <Link href="/professionals" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Professionals</Link>
              <Link href="/blog" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Business Blog</Link>
              <Link href="/login" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Login</Link>
              <Link href="/register" className="p-2.5 bg-slate-50 rounded-xl hover:text-blue-600 border border-slate-100">Register Account</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Industry Categories ({CATEGORIES.length})</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs text-slate-600">
              {CATEGORIES.map(cat => (
                <Link key={cat.id} href={`/category/${cat.id}`} className="hover:text-blue-600 hover:underline">
                  • {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Major Cities */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span>Pakistani City Directories ({TOP_CITIES.length})</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs text-slate-600">
              {TOP_CITIES.map(city => (
                <Link key={city} href={`/city/${city.toLowerCase()}`} className="hover:text-emerald-600 hover:underline">
                  • {city} Business Directory
                </Link>
              ))}
            </div>
          </div>

          {/* Trust, Support & Legal Policies */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span>Trust, Support & Legal Documentation</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-700">
              <Link href="/privacy" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Privacy Policy</Link>
              <Link href="/terms" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Terms of Service</Link>
              <Link href="/cookie-policy" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Cookie Policy</Link>
              <Link href="/disclaimer" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Disclaimer</Link>
              <Link href="/editorial-policy" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Editorial Policy</Link>
              <Link href="/community-guidelines" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Community Guidelines</Link>
              <Link href="/business-listing-guidelines" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Listing Guidelines</Link>
              <Link href="/verification-policy" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Verification Policy</Link>
              <Link href="/refund-policy" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Refund Policy</Link>
              <Link href="/advertise-with-us" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Advertise With Us</Link>
              <Link href="/careers" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Careers</Link>
              <Link href="/faqs" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">FAQs</Link>
              <Link href="/help-center" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Help Center</Link>
              <Link href="/support" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Customer Support</Link>
              <Link href="/report-listing" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Report Listing</Link>
              <Link href="/report-abuse" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Report Abuse</Link>
              <Link href="/accessibility" className="p-2 bg-slate-50 rounded-lg hover:text-purple-600">Accessibility Statement</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
