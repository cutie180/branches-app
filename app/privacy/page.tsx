import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Privacy Policy | ListPak Pakistan Business Directory',
  description: 'Read the ListPak privacy policy. Learn how we collect, store, and protect your data, including Google AdSense advertising cookie disclosures and GDPR compliance.',
  alternates: {
    canonical: 'https://www.listpak.com/privacy',
  },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b3d] mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8 border-b border-slate-200 pb-4">
          Last Updated: September 2026 • ListPak Digital Directory Platform
        </p>

        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            At <strong>ListPak</strong> (accessible via <a href="https://www.listpak.com" className="text-blue-600 hover:underline">https://www.listpak.com</a>), the privacy and protection of our users, business owners, professionals, and visitors is of paramount importance. This Privacy Policy describes the types of personal and business information collected, recorded, and utilized by ListPak, as well as the safeguards and rights available to you.
          </p>
          <p>
            If you have questions or require more information about our Privacy Policy, please contact our administrative team at <a href="mailto:admin@listpak.com" className="text-blue-600 hover:underline">admin@listpak.com</a>.
          </p>
          
          <h2 className="text-xl font-bold text-[#0f2b3d] pt-4">1. Information We Collect</h2>
          <p>
            We collect information from users through direct submissions, automated technologies, and interactions across the platform:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li><strong>Personal Contact Data:</strong> When registering an account, submitting a contact inquiry, or reporting a listing, we may collect your name, email address, telephone number, and optional verification credentials.</li>
            <li><strong>Public Business & Professional Listings:</strong> When submitting a business, company, job vacancy, or professional talent profile, you voluntarily supply public data including trade names, addresses, WhatsApp contacts, job descriptions, service categories, logos, and business hours. This information is published publicly by design to enable customer discovery.</li>
            <li><strong>Automated Device & Log Data:</strong> Like most online platforms, our servers automatically log technical information when you navigate the site, including your IP address, browser user-agent, operating system, referring/exit pages, date/time stamps, and interaction metrics.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0f2b3d] pt-4">2. Use of Information</h2>
          <p>
            ListPak utilizes the collected information for transparent, legitimate operational purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>To publish, index, and organize public business listings, professional profiles, and job opportunities across Pakistani cities.</li>
            <li>To enable direct consumer-to-business communications via phone, email, and WhatsApp.</li>
            <li>To conduct administrative moderation, anti-spam validation, and credential verification.</li>
            <li>To monitor server performance, diagnose technical errors, and optimize search responsiveness.</li>
            <li>To detect, prevent, and mitigate fraudulent submissions, abusive behavior, and impersonation.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0f2b3d] pt-4">3. Google AdSense & Third-Party Advertising Policy</h2>
          <p>
            ListPak may partner with third-party advertising companies, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website. These advertising networks may use cookies, web beacons, and related tracking technologies to collect non-personally identifiable information regarding your visits to this and other websites in order to provide relevant advertisements about goods and services of interest to you.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-sm text-slate-700">
            <h3 className="font-bold text-slate-900">Mandatory Google Advertising Disclosures:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Third-Party Vendor Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.</li>
              <li><strong>Google Advertising Cookies:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
              <li><strong>Personalized Ads Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">Google Ads Settings</a>.</li>
              <li><strong>Industry Opt-Out Portals:</strong> Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting the <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">www.aboutads.info</a> consumer choice page or the <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">Your Online Choices</a> portal.</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-[#0f2b3d] pt-4">4. Cookies & Web Beacons</h2>
          <p>
            ListPak uses essential session cookies, user preference cookies, and analytics tags (including Google Analytics and Microsoft Clarity). You can configure your web browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. For detailed technical information regarding the specific cookie categories utilized across our platform, please consult our dedicated <Link href="/cookie-policy" className="text-blue-600 underline">Cookie Policy</Link>.
          </p>

          <h2 className="text-xl font-bold text-[#0f2b3d] pt-4">5. European Economic Area (EEA), UK & Swiss User Rights</h2>
          <p>
            In compliance with the General Data Protection Regulation (GDPR), the UK Data Protection Act, and the Swiss Federal Act on Data Protection (FADP), users residing in the EEA, UK, or Switzerland possess defined legal rights regarding their personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li><strong>Right of Access:</strong> You may request copies of your personal data held by ListPak.</li>
            <li><strong>Right to Rectification:</strong> You may request correction of inaccurate or incomplete listing details.</li>
            <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request deletion of your account or personal information under certain circumstances.</li>
            <li><strong>Right to Restrict or Object to Processing:</strong> You may restrict or object to our processing of your personal data.</li>
            <li><strong>Right to Withdraw Consent:</strong> You have the right to withdraw your cookie or advertising consent at any time via our on-site cookie preferences.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0f2b3d] pt-4">6. Public Directory Listings & Content Removal</h2>
          <p>
            Business listings, professional profiles, and job announcements on ListPak are published for public business discovery. If you are the authorized owner of a business listed on ListPak and wish to update, claim, or permanently remove your listing, you may:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Click the &quot;Claim Business&quot; button on your business profile to verify ownership.</li>
            <li>Submit a ticket through our <Link href="/report-listing" className="text-blue-600 underline">Report Listing Portal</Link>.</li>
            <li>Email our data compliance desk directly at <a href="mailto:admin@listpak.com" className="text-blue-600 underline">admin@listpak.com</a> with verification proof for prompt removal within 24–48 business hours.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0f2b3d] pt-4">7. Data Security Safeguards</h2>
          <p>
            We implement administrative, technical, and physical security measures—including TLS encryption, role-based Firestore database rules, and strict administrative authentication—to safeguard your information. While no internet transmission is 100% immune, we regularly update our infrastructure to prevent unauthorized access or disclosure.
          </p>

          <h2 className="text-xl font-bold text-[#0f2b3d] pt-4">8. Policy for Children</h2>
          <p>
            ListPak does not knowingly collect or solicit personal identifiable information from children under the age of 13. If you believe your child has submitted personal information on our website, please notify us immediately at <a href="mailto:admin@listpak.com" className="text-blue-600 underline">admin@listpak.com</a> and we will swiftly remove such data.
          </p>

          <h2 className="text-xl font-bold text-[#0f2b3d] pt-4">9. Contact Information</h2>
          <p>
            For questions, data access requests, or policy inquiries, contact our data administration desk:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-1 text-slate-800">
            <p className="font-bold text-slate-900">ListPak Administration &amp; Data Compliance</p>
            <p>Office 303, Evacuee Trust Complex, F-5/1, Islamabad, Pakistan</p>
            <p>Email: <a href="mailto:admin@listpak.com" className="text-blue-600 underline">admin@listpak.com</a></p>
            <p>Direct Inquiries / Support: +92 334 563 6230</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
