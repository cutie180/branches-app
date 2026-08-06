import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { AlertTriangle, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Report a Listing | ListPak Business Directory Integrity',
  description: 'Report inaccurate, closed, copyright infringing, or fraudulent business listings on ListPak for rapid admin review.',
  alternates: {
    canonical: 'https://www.listpak.com/report-listing',
  },
}

export default function ReportListingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen pb-16">
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Report an Inaccurate Listing
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Help us maintain Pakistan&apos;s most accurate business directory ecosystem.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Why are you reporting this listing?</h2>
            
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-200"><strong>Business Permanently Closed:</strong> The entity no longer operates at this physical location.</li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-200"><strong>Incorrect Contact / Phone:</strong> The telephone number belongs to a different individual or organization.</li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-200"><strong>Unauthorized Ownership Claim:</strong> Someone listed your company without legal authorization.</li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-200"><strong>Fraudulent or Misleading Activity:</strong> The listing engages in deceptive trade practices.</li>
            </ul>

            <div className="pt-4 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
              >
                Submit Listing Audit Report
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
