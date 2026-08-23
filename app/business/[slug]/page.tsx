import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Star, Clock, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getAllBusinesses, getBusinessBySlug } from '@/lib/db-service'
import LazyMap from '@/components/business/lazy-map'
import { BusinessHeroActions, BusinessReviewsSection } from './business-interactive-actions'

// Enable Incremental Static Regeneration (ISR) with 24h revalidation
export const revalidate = 86400

export async function generateStaticParams() {
  const businesses = await getAllBusinesses()
  return businesses.map((biz) => ({
    slug: biz.slug,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const slug = params.slug

  const biz = await getBusinessBySlug(slug)
  const businessName = biz ? biz.name : slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const title = `${businessName} - Contact, Reviews & Location | ListPak Pakistan`
  const description = biz ? biz.description : `Verified details, phone number, location, and contact info for ${businessName} on ListPak business directory.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.listpak.com/business/${slug}`,
    },
    openGraph: {
      title,
      description,
      siteName: 'ListPak',
      url: `https://www.listpak.com/business/${slug}`,
      locale: 'en_PK',
      type: 'website',
      images: biz?.coverImage ? [{ url: biz.coverImage, alt: businessName }] : undefined,
    },
  }
}

export default async function BusinessPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const slug = params.slug

  const biz = await getBusinessBySlug(slug)

  if (!biz) {
    notFound()
  }

  const reviewsList = biz.reviews || []

  // Ensure multi-location support
  const locationsList = biz.locations && biz.locations.length > 0
    ? biz.locations
    : [{ city: biz.city, address: biz.address, isPrimary: true }]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: biz.name,
    description: biz.description,
    url: `https://www.listpak.com/business/${slug}`,
    telephone: biz.phone,
    email: biz.email,
    image: biz.coverImage || biz.logo,
    logo: biz.logo,
    address: {
      '@type': 'PostalAddress',
      streetAddress: biz.address,
      addressLocality: biz.city,
      addressRegion: biz.province || 'Pakistan',
      addressCountry: 'PK',
    },
    department: locationsList.map(loc => ({
      '@type': 'LocalBusiness',
      name: `${biz.name} - ${loc.city}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.address,
        addressLocality: loc.city,
        addressRegion: 'Pakistan',
        addressCountry: 'PK'
      }
    })),
    ...(reviewsList.length > 0 && biz.rating > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: biz.rating,
        reviewCount: biz.reviewCount || reviewsList.length,
      },
    } : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.listpak.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: biz.category || 'Business Directory',
        item: `https://www.listpak.com/category/${biz.categoryId || 'services'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: biz.name,
        item: `https://www.listpak.com/business/${slug}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 text-xs text-slate-500"><Link href="/" className="hover:text-blue-700 underline">Home</Link><span className="mx-2">/</span><Link href={`/category/${biz.categoryId || 'services'}`} className="hover:text-blue-700 underline">{biz.category || 'Business Directory'}</Link><span className="mx-2">/</span><span>{biz.name}</span></nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Cover Banner */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="h-64 sm:h-80 w-full relative">
          <Image
            src={biz.coverImage}
            alt={biz.name}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1200px"
            quality={80}
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white shrink-0">
                <Image
                  src={biz.logo}
                  alt={biz.name}
                  width={144}
                  height={144}
                  priority
                  sizes="(max-width: 640px) 112px, 144px"
                  quality={85}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {biz.category}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Open Now</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>{biz.name}</span>
                  {biz.verified && (
                    <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                  )}
                </h1>

                <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {biz.address || biz.city}
                    {locationsList.length > 1 && ` (+${locationsList.length - 1} branches)`}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {biz.rating} ({biz.reviewCount || reviewsList.length} customer reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Client Island */}
            <BusinessHeroActions
              businessName={biz.name}
              isClaimed={!!biz.isClaimed}
            />
          </div>
        </div>
      </section>

      {/* Main Profile Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">About {biz.name}</h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{biz.description}</p>

              {biz.services && biz.services.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Products & Services Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {biz.services.map((service) => (
                      <span key={service} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800">
                        ✓ {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Locations & Branches Card List */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Physical Locations & Branches ({locationsList.length})</span>
                </h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {Array.from(new Set(locationsList.map(l => l.city))).join(', ')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {locationsList.map((loc, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border space-y-2 transition-all ${
                      loc.isPrimary 
                        ? 'bg-blue-50/50 border-blue-200 shadow-xs' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        {loc.city} Branch
                      </span>
                      {loc.isPrimary && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold">
                          Primary
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {loc.address || 'Street address available on inquiry.'}
                    </p>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((loc.address || '') + ', ' + loc.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold text-blue-600 hover:text-blue-800 transition-colors pt-1"
                    >
                      <span>View on Google Maps</span>
                      <span>→</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Deferred / Lazy Map */}
            <LazyMap address={biz.address} city={biz.city} name={biz.name} />

          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Direct Actions</h3>
              
              <div className="space-y-2.5">
                <a
                  href={`tel:${biz.phone}`}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {biz.phone}</span>
                </a>

                {biz.whatsapp && (
                  <a
                    href={`https://wa.me/${biz.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                )}

                {biz.email && (
                  <a
                    href={`mailto:${biz.email}`}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                )}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Operating Hours</span>
              </h3>
              <div className="space-y-2 text-xs">
                {Object.entries(biz.operatingHours || {}).map(([day, hours]) => (
                  <div key={day} className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{day}</span>
                    <span className="font-bold text-slate-900">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Database Customer Reviews - Placed after all business page details and right before Footer / ListPak 24/7 Support Desk */}
        <BusinessReviewsSection
          businessName={biz.name}
          initialReviews={reviewsList}
          initialRating={biz.rating || 5.0}
          initialReviewCount={biz.reviewCount || reviewsList.length}
        />

      </main>

      <Footer />
    </div>
  )
}
