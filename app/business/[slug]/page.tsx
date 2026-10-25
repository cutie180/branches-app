import React from 'react'
import { excerpt, clampMeta, fitTitle } from '@/lib/utils'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Star, Clock, CheckCircle2, Building2, Briefcase, Award, Sparkles, Globe, ExternalLink, ArrowRight, HelpCircle } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getAllBusinesses, getBusinessBySlug } from '@/lib/db-service'
import LazyMap from '@/components/business/lazy-map'
import { BusinessHeroActions, BusinessReviewsSection } from './business-interactive-actions'
import {
  toCanonicalUrl,
  normalizeBusinessCategoryId,
  normalizeCitySlug,
  VERIFICATION_DISCLAIMER
} from '@/lib/directory-helpers'
import {
  getBusinessSeoOverride,
  stripMarkdown,
  getRealReviews
} from '@/lib/business-seo-overrides'

export const dynamicParams = true
export const revalidate = 0

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

  const override = getBusinessSeoOverride(slug)

  const rawTitle = override?.title || biz?.seoTitle || biz?.metaTitle
  const title = rawTitle
    ? clampMeta(rawTitle, 65)
    : fitTitle([
        biz?.category && biz?.city ? `${businessName} – ${biz.category} in ${biz.city} | ListPak` : '',
        biz?.category && biz?.city ? `${businessName} – ${biz.category} in ${biz.city}` : '',
        biz?.city ? `${businessName} in ${biz.city} | ListPak` : '',
        `${businessName} | ListPak`,
        businessName,
      ])
  // Contact-intent snippet: searchers looking for "X helpline / contact number" see the
  // real phone number right in the SERP snippet instead of a generic promise.
  // Never use the placeholder default number (+92 305 7860084) in metadata.
  const realPhone = biz?.phone?.trim() && biz.phone.trim() !== '+92 305 7860084' ? biz.phone.trim() : null
  const realAddress = biz?.address?.trim() || null
  // Keep only a short form of the address: multi-location businesses store every
  // branch address in one field, which previously produced 800+ char descriptions.
  const shortAddress = realAddress ? excerpt(realAddress, 60) : null
  const autoDescription = biz
    ? `${biz.name}${realPhone ? ` – Call ${realPhone}` : ''}${biz.category ? `, ${biz.category}` : ''}${biz.city ? ` in ${biz.city}` : ''}, Pakistan.${shortAddress ? ` ${shortAddress}.` : ''} Find phone number, location, operating hours and services on ListPak.`
    : `View business details, phone number, location, and contact information for ${businessName} on the ListPak business directory.`
  const rawDescription = override?.description || biz?.seoDescription || biz?.metaDescription || autoDescription
  let description = clampMeta(rawDescription, 160)
  if (!override?.description && description.length < 120) {
    description = clampMeta(`${description} Get contact details, services and directions on ListPak.`, 160)
  }
  const canonicalUrl = toCanonicalUrl(`business/${slug}`)

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      siteName: 'ListPak',
      url: canonicalUrl,
      locale: 'en_PK',
      type: 'website',
      images: biz?.coverImage ? [{ url: biz.coverImage, alt: businessName }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

  const override = getBusinessSeoOverride(slug)

  const allBiz = await getAllBusinesses(false)
  const catId = normalizeBusinessCategoryId(biz)
  const citySlug = normalizeCitySlug(biz.city)
  const canonicalUrl = toCanonicalUrl(`business/${slug}`)

  // Related businesses in same category or city
  const relatedBusinesses = allBiz
    .filter(b => b.slug !== biz.slug && (normalizeBusinessCategoryId(b) === catId || normalizeCitySlug(b.city) === citySlug))
    .slice(0, 4)

  const realReviews = getRealReviews(biz.reviews)

  const rawPhone = override?.phone || biz.phone || '+92 305 7860084'
  const intlPhone = rawPhone.replace(/\s+/g, '')
  const whatsappNum = override?.whatsapp || biz.whatsapp
  const bizAddress = override?.address || biz.address

  // Ensure multi-location support
  const locationsList = biz.locations && biz.locations.length > 0
    ? biz.locations
    : [{ city: biz.city, address: bizAddress, isPrimary: true }]

  const rawDescription = override?.description || biz.metaDescription || biz.description || ''
  const cleanDescription = stripMarkdown(rawDescription)

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': biz.schemaType || 'LocalBusiness',
    name: biz.name,
    description: cleanDescription,
    url: canonicalUrl,
    sameAs: biz.website && biz.website !== 'https://listpak.com' && biz.website !== 'https://www.listpak.com' ? [biz.website] : undefined,
    telephone: intlPhone,
    email: biz.email,
    image: biz.coverImage || biz.logo,
    logo: biz.logo,
    address: {
      '@type': 'PostalAddress',
      streetAddress: bizAddress,
      addressLocality: biz.city,
      addressRegion: biz.province || 'Punjab',
      addressCountry: 'PK',
    },
    priceRange: '$$',
    ...(biz.city ? {
      areaServed: {
        '@type': 'City',
        name: biz.city
      }
    } : {}),
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
    ...(realReviews.length > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: Number((realReviews.reduce((sum, r) => sum + (r.rating || 5), 0) / realReviews.length).toFixed(1)),
        reviewCount: realReviews.length,
      },
    } : {}),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '10:00',
        closes: '21:00'
      }
    ],
    ...(biz.services && biz.services.length > 0 ? {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${biz.name} Services`,
        itemListElement: biz.services.map((svc) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: svc
          }
        }))
      }
    } : {})
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://listpak.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Categories',
        item: 'https://listpak.com/categories/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: biz.category || 'Business Directory',
        item: toCanonicalUrl(`category/${catId}`),
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: biz.city,
        item: toCanonicalUrl(`city/${citySlug}`),
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: biz.name,
        item: canonicalUrl,
      },
    ],
  }

  const faqs = (override?.faqs && override.faqs.length > 0) ? override.faqs : (biz.faqs || [])

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 text-xs text-slate-500 flex items-center flex-wrap gap-1.5">
        <Link href="/" className="hover:text-blue-700 underline">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-blue-700 underline">Categories</Link>
        <span>/</span>
        <Link href={`/category/${catId}`} className="hover:text-blue-700 underline">{biz.category || 'Directory'}</Link>
        <span>/</span>
        <Link href={`/city/${citySlug}`} className="hover:text-blue-700 underline">{biz.city}</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">{biz.name}</span>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Cover Banner */}
      <section className="relative bg-slate-900 text-white overflow-hidden mt-3">
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
                  unoptimized={typeof biz.logo === 'string' && (biz.logo.startsWith('data:') || biz.logo.startsWith('/'))}
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
                  {biz.secondaryCategories && biz.secondaryCategories.slice(0, 2).map((cat) => (
                    <span key={cat} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/40 hidden sm:inline-flex">
                      {cat}
                    </span>
                  ))}
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Open Now</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>{biz.name}</span>
                  {biz.verified && (
                    <span title="Verified Business" className="inline-flex">
                      <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                    </span>
                  )}
                </h1>

                <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{bizAddress || `${biz.city}, Punjab, Pakistan`}</span>
                    {locationsList.length > 1 && ` (+${locationsList.length - 1} branches)`}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {realReviews.length > 0 ? (
                      <span>{Number((realReviews.reduce((sum, r) => sum + (r.rating || 5), 0) / realReviews.length).toFixed(1))} ({realReviews.length} customer reviews)</span>
                    ) : (
                      <span>0 customer reviews</span>
                    )}
                  </span>
                  {biz.website && biz.website !== 'https://www.listpak.com' && (
                    <>
                      <span>•</span>
                      <a
                        href={biz.website.startsWith('http') ? biz.website : `https://${biz.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-300 hover:text-white transition-colors underline decoration-blue-400/50 hover:decoration-white font-medium"
                        title={`Visit official website: ${biz.website}`}
                      >
                        <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{biz.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                        <ExternalLink className="w-3 h-3 opacity-75" />
                      </a>
                    </>
                  )}
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
        
        {/* Verification Info Callout */}
        {biz.verified && (
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Verified Profile:</strong> {VERIFICATION_DISCLAIMER}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">

            {/* SEO Short Introduction Card */}
            {biz.introduction && (
              <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-slate-50 border border-blue-100/90 rounded-2xl p-5 sm:p-6 text-sm text-slate-800 leading-relaxed font-medium shadow-xs">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p>{biz.introduction}</p>
                </div>
              </div>
            )}
            
            {/* About Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">About {biz.name}</h2>
              <div className="text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line">
                {biz.description}
              </div>
            </div>

            {/* Detailed Products & Services Offered */}
            {biz.detailedServices && biz.detailedServices.length > 0 ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Products & Services Offered</h2>
                  <p className="text-xs text-slate-500 mt-1">Specialized real estate and construction solutions provided in Sargodha.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {biz.detailedServices.map((service, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all space-y-1.5">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{service.title}</span>
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed pl-5.5">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              biz.services && biz.services.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                  <h2 className="text-xl font-extrabold text-slate-900">Products & Services Offered</h2>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {biz.services.map((service) => (
                      <span key={service} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800">
                        ✓ {service}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* Custom Structured SEO Sections */}
            {biz.sections && biz.sections.length > 0 && (
              biz.sections.map((section, sIdx) => (
                <div key={sIdx} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
                  <h2 className="text-xl font-extrabold text-slate-900">{section.heading}</h2>
                  
                  {section.content && (
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  )}

                  {section.subSections && section.subSections.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      {section.subSections.map((sub, subIdx) => (
                        <div key={subIdx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            <span>{sub.heading}</span>
                          </h3>
                          {sub.content && (
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {sub.content}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.items && section.items.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-xs font-medium text-slate-700 flex items-start gap-2 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}

            {/* Locations & Branches Card List */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Business Location & Branches ({locationsList.length})</span>
                </h2>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {Array.from(new Set(locationsList.map(l => l.city))).join(', ')}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-1">
                {locationsList.map((loc, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border space-y-2 transition-all ${
                      loc.isPrimary 
                        ? 'bg-blue-50/40 border-blue-200/80 shadow-xs' 
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
                          Primary Office
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
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

            {/* Frequently Asked Questions */}
            {faqs.length > 0 && (
              <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Common questions and verified details about {biz.name}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  {faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      open={idx === 0}
                      className="group border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50 open:bg-white open:border-blue-200 open:shadow-xs transition-all"
                    >
                      <summary className="w-full p-4 text-left font-bold text-sm text-slate-900 flex justify-between items-center bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer list-none select-none transition-colors">
                        <span className="pr-4">{faq.question}</span>
                        <span className="text-blue-600 font-extrabold text-lg transition-transform group-open:rotate-45 shrink-0">+</span>
                      </summary>
                      <div className="p-4 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Deferred / Lazy Map */}
            <LazyMap address={bizAddress} city={biz.city} name={biz.name} />

          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Contact {biz.name}</h2>
              
              <div className="space-y-2.5">
                {biz.website && biz.website !== 'https://www.listpak.com' && (
                  <a
                    href={biz.website.startsWith('http') ? biz.website : `https://${biz.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                )}

                <a
                  href={`tel:${rawPhone}`}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {rawPhone}</span>
                </a>

                {whatsappNum && (
                  <a
                    href={`https://wa.me/${whatsappNum}`}
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

            {/* Key Business Highlights */}
            {biz.features && biz.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
                <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Business Highlights</span>
                </h2>
                <div className="space-y-2 text-xs">
                  {biz.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-slate-700 py-1 border-b border-slate-50 last:border-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Operating Hours */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Operating Hours</span>
              </h2>
              <div className="space-y-2 text-xs">
                {Object.entries(biz.operatingHours || {}).map(([day, hours]) => (
                  <div key={day} className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">{day}</span>
                    <span className="font-bold text-slate-900">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Directory Navigation Links */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Explore Directory</span>
              </h2>
              <div className="space-y-2 text-xs">
                <Link
                  href={`/category/${catId}/${citySlug}`}
                  className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-700 font-bold hover:bg-blue-100 transition-colors flex items-center justify-between"
                >
                  <span>{biz.category} in {biz.city}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/city/${citySlug}`}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-semibold hover:bg-slate-100 transition-colors flex items-center justify-between"
                >
                  <span>All Businesses in {biz.city}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/category/${catId}`}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-semibold hover:bg-slate-100 transition-colors flex items-center justify-between"
                >
                  <span>All {biz.category} in Pakistan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Related Businesses Section */}
        {relatedBusinesses.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Related Businesses in {biz.city} & {biz.category}</span>
              </h2>
              <Link href={`/category/${catId}/${citySlug}`} className="text-xs font-bold text-blue-600 hover:underline">
                View All in {biz.city} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              {relatedBusinesses.map((rel) => (
                <div
                  key={rel.id}
                  className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={rel.logo}
                        alt={rel.name}
                        width={36}
                        height={36}
                        loading="lazy"
                        sizes="36px"
                        className="w-9 h-9 rounded-lg object-cover border border-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          href={`/business/${rel.slug}`}
                          className="font-bold text-slate-900 text-xs hover:text-blue-600 truncate block"
                        >
                          {rel.name}
                        </Link>
                        <p className="text-[11px] text-slate-500">{rel.city}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {excerpt(rel.description, 180)}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-amber-600 font-bold">
                      {rel.reviewCount > 0 && rel.rating > 0 ? `★ ${rel.rating}` : 'Active'}
                    </span>
                    <Link
                      href={`/business/${rel.slug}`}
                      className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Database Customer Reviews */}
        <BusinessReviewsSection
          businessName={biz.name}
          initialReviews={realReviews}
          initialRating={realReviews.length > 0 ? Number((realReviews.reduce((sum, r) => sum + (r.rating || 5), 0) / realReviews.length).toFixed(1)) : 0}
          initialReviewCount={realReviews.length}
        />

      </main>

      <Footer />
    </div>
  )
}
