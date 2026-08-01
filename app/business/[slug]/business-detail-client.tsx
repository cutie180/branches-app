'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle, Building2 } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CATEGORIES } from '@/lib/data'
import CountdownLoader from '@/components/ui/countdown-loader'
import { getBusinessLogoUrl } from '@/lib/utils'

interface Business {
  id: string
  businessName: string
  contactPerson?: string
  email?: string
  phone: string
  whatsapp?: string
  city: string
  address: string
  category: string
  subCategory?: string
  description: string
  logoUrl?: string
  websiteUrl?: string
  facebookPage?: string
  googleBusiness?: string
  youtubeChannel?: string
  createdAt: any
  status: string
  slug: string
}

function renderDescriptionWithLinks(text: string) {
  if (!text) return null
  const parts = []
  let currentIndex = 0
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, linkUrl] = match
    const matchIndex = match.index

    if (matchIndex > currentIndex) {
      parts.push(text.substring(currentIndex, matchIndex))
    }

    parts.push(
      <Link key={matchIndex} href={linkUrl} className="text-[#60a5fa] hover:underline font-semibold">
        {linkText}
      </Link>
    )

    currentIndex = matchIndex + fullMatch.length
  }

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex))
  }

  return parts.length > 0 ? parts : text
}

export default function BusinessDetailClient({ slug }: { slug: string }) {
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [countdownDone, setCountdownDone] = useState(false)

  useEffect(() => {
    // Generate business detail dynamically from slug
    const cleanName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    const sampleBiz: Business = {
      id: slug,
      businessName: cleanName || 'Verified Business',
      slug: slug,
      city: 'Pakistan',
      category: 'services',
      address: 'Main Commercial Area',
      phone: '+92 300 0000000',
      whatsapp: '+92 300 0000000',
      email: 'contact@business.pk',
      description: `Welcome to ${cleanName}. We are a verified business providing top-quality local services. Contact us today for inquiries and quotes.`,
      status: 'approved',
      createdAt: new Date().toISOString()
    }

    setBusiness(sampleBiz)
    setLoading(false)
  }, [slug])

  if (loading || !business || !countdownDone) {
    return (
      <>
        <Navbar />
        <CountdownLoader 
          isDataLoading={loading || !business} 
          onComplete={() => setCountdownDone(true)} 
        />
        <Footer />
      </>
    )
  }

  const category = CATEGORIES.find(c => c.id === business.category)
  const whatsappUrl = business.whatsapp
    ? `https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`
    : null
  const mapQuery = encodeURIComponent(`${business.address}, ${business.city}, Pakistan`)
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&output=embed`

  const pageUrl = `https://www.pakbizbranhces.online/business/${slug}`
  const finalLogoUrl = getBusinessLogoUrl(business.logoUrl, business.businessName, business.slug)

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': pageUrl,
    name: business.businessName,
    description: business.description,
    url: pageUrl,
    telephone: business.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.city,
      addressCountry: 'PK',
    },
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main className="bg-[#f8fafc] min-h-screen">
        {/* Header */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#60a5fa] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/add-business" className="hover:text-[#60a5fa] transition-colors">Business</Link>
              <span>/</span>
              <span className="text-gray-800 font-medium truncate">{business.businessName}</span>
            </nav>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Logo */}
              <div className="shrink-0">
                {finalLogoUrl ? (
                  <img
                    src={finalLogoUrl}
                    alt={`${business.businessName} logo`}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-2xl object-cover border border-gray-200 shadow-sm"
                    loading="eager"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#0f2b3d] to-[#1a3f57] flex items-center justify-center border border-gray-200">
                    <Building2 className="w-16 h-16 text-white/60" />
                  </div>
                )}
              </div>

              {/* Business Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl md:text-4xl font-bold text-[#0f2b3d] mb-2">
                  {business.businessName}
                </h1>
                <p className="text-sm text-gray-500 mb-4">
                  Verified Contact Details
                </p>

                <div className="text-gray-600 text-lg leading-relaxed mb-6 whitespace-pre-line">
                  {renderDescriptionWithLinks(business.description)}
                </div>

                {/* Contact Actions */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`tel:${business.phone}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f2b3d] text-white rounded-xl font-semibold hover:bg-[#1a3f57] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  )}

                  {business.email && (
                    <a
                      href={`mailto:${business.email}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Details & Location */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-[#0f2b3d] mb-4">About {business.businessName}</h2>
                  <p className="text-gray-600 leading-relaxed">{business.description}</p>
                </div>

                {/* Google Map */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-[#0f2b3d] mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#60a5fa]" />
                    Location
                  </h2>
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={`Map of ${business.businessName}`}
                    className="w-full rounded-xl"
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-[#0f2b3d] mb-4">Contact Info</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#60a5fa]" /> {business.phone}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#60a5fa]" /> {business.address}, {business.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
