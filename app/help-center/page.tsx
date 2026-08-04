import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { LifeBuoy, Search, BookOpen, ShieldCheck, Briefcase, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help Center | ListPak Support Knowledgebase',
  description: 'Search guidebooks, step-by-step tutorials, and documentation for business owners, job seekers, and recruiters on ListPak.',
  alternates: {
    canonical: 'https://listpak.com/help-center',
  },
}

export default function HelpCenterPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen pb-16">
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              ListPak Knowledgebase & Help Center
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              How can we help you expand your business or career today?
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/business-listing-guidelines" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Business Owner Guide</h3>
              <p className="text-xs text-slate-600 mt-2">Learn how to claim, edit, optimize, and verify your local business listing.</p>
            </Link>

            <Link href="/jobs" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Jobs & Employer Guide</h3>
              <p className="text-xs text-slate-600 mt-2">How to post vacancies, manage applicant resumes, and hire top talent in Pakistan.</p>
            </Link>

            <Link href="/verification-policy" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-500 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Trust & Verification</h3>
              <p className="text-xs text-slate-600 mt-2">Understand verified badges, safety guidelines, and reporting suspicious activity.</p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
