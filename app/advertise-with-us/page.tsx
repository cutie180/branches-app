import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Megaphone, Target, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advertise With Us | ListPak Commercial & Targeted Media',
  description: 'Reach thousands of active consumers, employers, and enterprise clients across Pakistan with high-impact targeted advertising on ListPak.',
  alternates: {
    canonical: 'https://www.listpak.com/advertise-with-us',
  },
}

export default function AdvertiseWithUsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen pb-16">
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 sm:py-20 border-b border-slate-800 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-4">
              <Megaphone className="w-3.5 h-3.5" /> High-Impact Local Advertising
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Grow Your Brand Across Pakistan
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Connect directly with customers searching for services in Karachi, Lahore, Islamabad, and 150+ cities nationwide.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <Target className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 text-lg">Hyper-Targeted Traffic</h3>
              <p className="text-xs text-slate-600 mt-2">Display your banner ads by specific city or industry category for maximum ROI.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <BarChart3 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 text-lg">Measurable Results</h3>
              <p className="text-xs text-slate-600 mt-2">Get direct click-throughs to your website, store, or official WhatsApp contact.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <CheckCircle2 className="w-10 h-10 text-amber-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 text-lg">Featured Badging</h3>
              <p className="text-xs text-slate-600 mt-2">Stand out at the top of category searches with prominent gold verified tags.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900">Request Media Kit & Custom Quote</h2>
            <p className="text-sm text-slate-600 mt-2 mb-6">Our advertising specialists will design a campaign tailored to your budget and expansion goals.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
            >
              <span>Contact Advertising Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
