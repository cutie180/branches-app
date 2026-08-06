import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | ListPak - Pakistan Business Directory',
  description: 'Understand how ListPak uses cookies and web tracking technologies to provide a secure and customized experience across our business directory.',
  alternates: {
    canonical: 'https://www.listpak.com/cookie-policy',
  },
}

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: August 2026 • ListPak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              This Cookie Policy explains how <strong>ListPak</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar tracking technologies when you visit our website at <a href="https://www.listpak.com" className="text-blue-600 underline">https://www.listpak.com</a>.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small data files stored on your browser or device by web servers. They help websites remember your preferences, keep you logged in, analyze site traffic, and optimize performance.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Types of Cookies We Use</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the core functionality of the platform, including security and session management.</li>
              <li><strong>Analytics Cookies:</strong> Help us measure visitor engagement and improve search features (e.g., Google Analytics).</li>
              <li><strong>Preference Cookies:</strong> Remember your city, search choices, and display settings for future visits.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">3. Managing Your Cookies</h2>
            <p>
              You can control or disable cookies through your web browser settings. Disabling essential cookies may impair your ability to log in or use certain directory features.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">4. Contact Us</h2>
            <p>
              If you have any questions regarding our Cookie Policy, please contact our support team at <a href="mailto:admin@listpak.com" className="text-blue-600 underline">admin@listpak.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
