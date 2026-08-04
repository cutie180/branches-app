import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Verification Policy | ListPak - Verified Business Directory',
  description: 'How ListPak verifies business profiles, addresses, contact details, and NTN registration credentials in Pakistan.',
  alternates: {
    canonical: 'https://listpak.com/verification-policy',
  },
}

export default function VerificationPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Verification Policy & Badge Protocol
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: August 2026 • ListPak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              The <strong>Verified Business Badge</strong> on ListPak signifies that a business listing has undergone manual validation to confirm its physical existence, operational phone number, and administrative legitimacy.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. Verification Steps</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Phone & WhatsApp Call Validation:</strong> Direct contact confirmation with business management.</li>
              <li><strong>Physical Address Verification:</strong> Geolocation and NAP mapping across Pakistani cities.</li>
              <li><strong>Documentation (Optional/Premium):</strong> FBR NTN certificate or SECP registration review.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Revocation of Verified Status</h2>
            <p>
              ListPak reserves the right to revoke verification status if a business changes contact information without notice or receives multiple unresolved customer grievances.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
