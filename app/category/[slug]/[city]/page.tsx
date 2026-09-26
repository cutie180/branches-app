import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getAllBusinesses } from '@/lib/db-service'
import {
  filterBusinessesByCategoryAndCity,
  getPopulatedCategoryCityPairs,
  getCategoriesWithListingsForCity,
  getCitiesWithListingsForCategory,
  getCategoryDisplayName,
  getCityDisplayName,
  toCanonicalUrl,
  VERIFICATION_DISCLAIMER
} from '@/lib/directory-helpers'
import { CATEGORIES } from '@/lib/data'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import {
  Building2,
  MapPin,
  ShieldCheck,
  Star,
  ArrowRight,
  ArrowLeft,
  Phone,
  CheckCircle2,
  Globe,
  Sparkles
} from 'lucide-react'

export const revalidate = 86400
export const dynamicParams = true

export async function generateStaticParams() {
  const allBiz = await getAllBusinesses(false)
  const pairs = getPopulatedCategoryCityPairs(allBiz)
  return pairs.map(p => ({
    slug: p.categorySlug,
    city: p.citySlug
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; city: string }>
}): Promise<Metadata> {
  const params = await props.params
  const catSlug = params.slug.toLowerCase()
  const citySlug = params.city.toLowerCase()

  const allBiz = await getAllBusinesses(false)
  const matchingBusinesses = filterBusinessesByCategoryAndCity(allBiz, catSlug, citySlug)

  if (matchingBusinesses.length === 0) {
    return {
      title: 'Directory Page Not Found | ListPak',
      robots: { index: false, follow: false }
    }
  }

  const categoryName = getCategoryDisplayName(catSlug)
  const cityName = getCityDisplayName(citySlug)

  const title = `${categoryName} in ${cityName}, Pakistan | ListPak`
  const description = `Find ${categoryName.toLowerCase()} in ${cityName}, Pakistan. Browse local listings, contact details and useful business information on ListPak.`
  const canonicalUrl = toCanonicalUrl(`category/${catSlug}/${citySlug}`)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'ListPak',
      locale: 'en_PK',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

export default async function CategoryCityLandingPage(props: {
  params: Promise<{ slug: string; city: string }>
}) {
  const params = await props.params
  const catSlug = params.slug.toLowerCase()
  const citySlug = params.city.toLowerCase()

  const allBiz = await getAllBusinesses(false)
  const businesses = filterBusinessesByCategoryAndCity(allBiz, catSlug, citySlug)

  if (businesses.length === 0) {
    notFound()
  }

  const categoryName = getCategoryDisplayName(catSlug)
  const cityName = getCityDisplayName(citySlug)
  const currentPath = `category/${catSlug}/${citySlug}`
  const canonicalUrl = toCanonicalUrl(currentPath)

  const otherCategoriesInCity = getCategoriesWithListingsForCity(allBiz, citySlug).filter(
    c => c.categorySlug !== catSlug
  )
  const otherCitiesForCategory = getCitiesWithListingsForCategory(allBiz, catSlug).filter(
    c => c.citySlug !== citySlug
  )

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName} in ${cityName}, Pakistan`,
    description: `Find ${categoryName.toLowerCase()} in ${cityName}, Pakistan. Browse local business listings, contact details and verified directory information on ListPak.`,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'ListPak',
      url: 'https://www.listpak.com/'
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: businesses.map((biz, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: biz.name,
        url: toCanonicalUrl(`business/${biz.slug}`)
      }))
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://listpak.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Categories',
        item: 'https://listpak.com/categories/'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryName,
        item: toCanonicalUrl(`category/${catSlug}`)
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: cityName,
        item: canonicalUrl
      }
    ]
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <BreadcrumbSchema pathname={`/${currentPath}`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([collectionSchema, breadcrumbSchema]) }}
      />

      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex items-center flex-wrap gap-1.5">
            <Link href="/" className="hover:text-white underline">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white underline">Categories</Link>
            <span>/</span>
            <Link href={`/category/${catSlug}`} className="hover:text-white underline">{categoryName}</Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">{cityName}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                  <MapPin className="w-3 h-3" />
                  <span>{cityName}, Pakistan</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <span>{businesses.length} Verified {businesses.length === 1 ? 'Listing' : 'Listings'}</span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {categoryName} in {cityName}
              </h1>
              <p className="text-slate-400 text-sm max-w-3xl mt-2 leading-relaxed">
                Find {categoryName.toLowerCase()} in {cityName}, Pakistan. Browse verified local business profiles, services, phone numbers, addresses, and official locations on ListPak.
              </p>
            </div>

            <Link
              href="/add-business"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all self-start sm:self-auto"
            >
              <span>List Your {cityName} Business</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
        
        {/* Verification Info Callout */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Directory Trust Notice:</strong> {VERIFICATION_DISCLAIMER}
          </p>
        </div>

        {/* Business Listings Grid */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Available {categoryName} in {cityName}</span>
            </h2>
            <Link href={`/city/${citySlug}`} className="text-xs font-bold text-blue-600 hover:underline">
              All Businesses in {cityName} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businesses.map((biz) => (
              <div
                key={biz.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <Image
                        src={biz.logo}
                        alt={biz.name}
                        width={52}
                        height={52}
                        loading="lazy"
                        sizes="52px"
                        className="w-13 h-13 rounded-xl object-cover border border-slate-100 shrink-0"
                      />
                      <div>
                        <Link
                          href={`/business/${biz.slug}`}
                          className="font-bold text-slate-900 text-base hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                        >
                          <span>{biz.name}</span>
                          {biz.verified && (
                            <span title="Verified Business" className="inline-flex">
                              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                            </span>
                          )}
                        </Link>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{biz.address || `${cityName}, Pakistan`}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-700 text-xs font-bold bg-amber-50 px-2 py-1 rounded-lg shrink-0">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>{biz.reviewCount > 0 && biz.rating > 0 ? biz.rating : 'Active'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {biz.description}
                  </p>

                  {biz.services && biz.services.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {biz.services.slice(0, 4).map((svc) => (
                        <span
                          key={svc}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  {biz.phone ? (
                    <a
                      href={`tel:${biz.phone}`}
                      className="font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-600" />
                      <span>{biz.phone}</span>
                    </a>
                  ) : (
                    <span className="text-slate-400">Contact via Profile</span>
                  )}

                  <Link
                    href={`/business/${biz.slug}`}
                    className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Link Section 1: Other Popular Categories in this City */}
        {otherCategoriesInCity.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-extrabold text-slate-900">
                Other Popular Categories in {cityName}
              </h2>
              <Link href={`/city/${citySlug}`} className="text-xs font-bold text-blue-600 hover:underline">
                Explore All {cityName} Categories &rarr;
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {otherCategoriesInCity.map((cat) => (
                <Link
                  key={cat.categorySlug}
                  href={`/category/${cat.categorySlug}/${citySlug}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{cat.categoryName}</span>
                  <span className="text-[10px] text-slate-400 bg-white px-1.5 py-0.2 rounded border">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Cross-Link Section 2: Other Cities for this Category */}
        {otherCitiesForCategory.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-extrabold text-slate-900">
                Find {categoryName} in Other Pakistani Cities
              </h2>
              <Link href={`/category/${catSlug}`} className="text-xs font-bold text-blue-600 hover:underline">
                All {categoryName} in Pakistan &rarr;
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {otherCitiesForCategory.map((c) => (
                <Link
                  key={c.citySlug}
                  href={`/category/${catSlug}/${c.citySlug}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{c.cityName}</span>
                  <span className="text-[10px] text-slate-400 bg-white px-1.5 py-0.2 rounded border">
                    {c.count}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Hub Navigation Bar */}
        <div className="flex flex-wrap gap-3 pt-2 justify-center text-xs">
          <Link
            href={`/category/${catSlug}`}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            ← Back to All {categoryName} in Pakistan
          </Link>
          <Link
            href={`/city/${citySlug}`}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            Businesses in {cityName}, Pakistan →
          </Link>
          <Link
            href="/categories"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            All 26 Business Categories
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  )
}
