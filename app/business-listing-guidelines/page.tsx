import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Business Listing Guidelines | ListPak',
  description: 'Requirements for adding your company, shop, or professional service to ListPak free business directory.',
  alternates: {
    canonical: 'https://listpak.com/business-listing-guidelines',
  },
}

export default function BusinessListingGuidelinesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Business Listing Guidelines
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: August 2026 • ListPak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              To ensure high search quality and fast indexing for all Pakistani enterprises, business owners must adhere to the following listing criteria when submitting their profile to ListPak.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. Eligible Businesses</h2>
            <p>
              Any legally operating business, professional service provider, retail store, educational institute, healthcare provider, or tech company located in Pakistan is eligible for listing.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Accurate NAP Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Business Name:</strong> Must match your official trade name without keyword stuffing.</li>
              <li><strong>Address:</strong> Accurate physical address including street, area, and city.</li>
              <li><strong>Phone & WhatsApp:</strong> Valid Pakistani telephone number for customer inquiries.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">3. Prohibited Content</h2>
            <p>
              Listings promoting illegal activities, adult content, unauthorized financial schemes, or misleading medical claims will be rejected automatically by our verification system.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
