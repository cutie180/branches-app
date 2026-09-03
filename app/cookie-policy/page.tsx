import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | ListPak - Pakistan Business Directory',
  description: 'Understand how ListPak uses cookies, web analytics, and Google AdSense advertising tracking technologies to provide a secure and customized experience.',
  alternates: {
    canonical: 'https://www.listpak.com/cookie-policy',
  },
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Cookie &amp; Tracking Policy
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: September 2026 • ListPak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              This Cookie Policy explains how <strong>ListPak</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies, web beacons, and similar tracking technologies when you visit our website at <a href="https://www.listpak.com" className="text-blue-600 underline">https://www.listpak.com</a>. It outlines the specific types of cookies used, why they are deployed, and how you can manage your preferences at any time.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small data files stored on your browser, device, or computer by web servers when you browse a website. They serve critical functional purposes, such as keeping you authenticated, remembering your chosen city or language preferences, analyzing web traffic, and enabling advertising partners like <strong>Google AdSense</strong> to deliver relevant advertisements.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Categories of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-1">A. Strictly Necessary / Essential Cookies</h3>
                <p className="text-xs text-slate-600">
                  Essential cookies are required for the basic operation and security of the website. These include session tokens, CSRF protection, and administrative authentication state. The platform cannot function properly without these cookies, and they cannot be deactivated in our systems.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-1">B. Performance &amp; Analytics Cookies</h3>
                <p className="text-xs text-slate-600">
                  We utilize analytics tools, including <strong>Google Analytics</strong> (tag: <code>G-N09JN0NJ2R</code>), Google Tag Manager (<code>GTM-KNK59XWQ</code>), and Microsoft Clarity (<code>y0jpwahv9h</code>), to measure user engagement, monitor page speed, and detect technical errors. These cookies collect aggregated, anonymous diagnostic metrics without directly identifying individual visitors.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-1">C. Functionality &amp; Preference Cookies</h3>
                <p className="text-xs text-slate-600">
                  These cookies allow our website to remember choices you make during your visit, such as your selected Pakistani city filter, category search query, bookmarked businesses, and display preferences.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-1">D. Advertising &amp; Google AdSense Cookies</h3>
                <p className="text-xs text-slate-600">
                  ListPak works with third-party vendors and ad networks, including <strong>Google AdSense</strong>, to display commercial advertisements. Third-party vendors, including Google, use cookies (such as DoubleClick cookies) to serve ads based on a user&apos;s prior visits to this website or other websites across the internet. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to ListPak and/or other websites.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 pt-4">3. Managing and Opting Out of Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your preferences through several channels:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>On-Site Consent Manager:</strong> You can manage or revoke cookie consent directly on ListPak using our interactive cookie preferences banner.
              </li>
              <li>
                <strong>Google Ads Settings:</strong> You can opt out of personalized advertising from Google by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">Google Ads Settings</a>.
              </li>
              <li>
                <strong>Digital Advertising Alliance (DAA):</strong> You can opt out of targeted advertising from participating companies via <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">www.aboutads.info</a>.
              </li>
              <li>
                <strong>European Interactive Digital Advertising Alliance (EDAA):</strong> Visitors in Europe can manage ad cookies at <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">Your Online Choices</a>.
              </li>
              <li>
                <strong>Browser Settings:</strong> You can configure your browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge) to reject cookies, clear cache, or notify you when a cookie is placed.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">4. Compliance with Google Publisher Policies &amp; EU User Consent</h2>
            <p>
              For users located in the European Economic Area (EEA), the United Kingdom, or Switzerland, ListPak adheres to the Google EU User Consent Policy and applicable data protection regulations. Advertising and non-essential analytics cookies are governed by user consent in accordance with Google Consent Mode v2 standards.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">5. Contact Our Data Desk</h2>
            <p>
              If you have any questions or require further clarification regarding our use of cookies or tracking technologies, please consult our <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link> or email our support desk directly at <a href="mailto:admin@listpak.com" className="text-blue-600 underline">admin@listpak.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
