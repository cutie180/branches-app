import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CATEGORIES } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'
import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, Star, ArrowRight, ArrowLeft, MapPin, Building2 } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import { getCategorySeoCopy } from '@/lib/seo-directory-content'
import {
  filterBusinessesByCategory,
  getCitiesWithListingsForCategory,
  toCanonicalUrl,
  VERIFICATION_DISCLAIMER
} from '@/lib/directory-helpers'

export const revalidate = 86400 // 24-hour ISR revalidation
export const dynamicParams = false

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.id,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const cat = CATEGORIES.find(c => c.id === params.slug)
  if (!cat) {
    return {
      title: 'Category not found | ListPak',
      robots: { index: false, follow: false },
    }
  }
  const title = `${cat.name} in Pakistan | ListPak`
  const description = `Find ${cat.name} in Pakistan by city. Browse local businesses, services and listings on ListPak.`
  const canonicalUrl = toCanonicalUrl(`category/${cat.id}`)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'ListPak',
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: canonicalUrl },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function CategoryDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const cat = CATEGORIES.find(c => c.id === params.slug)
  if (!cat) notFound()

  const allApproved = await getAllBusinesses(false)
  const businesses = filterBusinessesByCategory(allApproved, cat.id)
  const activeCities = getCitiesWithListingsForCategory(allApproved, cat.id)
  const relatedCategories = CATEGORIES.filter(c => c.id !== cat.id).slice(0, 8)
  const seoCopy = getCategorySeoCopy(cat.id)

  const currentPath = `category/${cat.id}`
  const canonicalUrl = toCanonicalUrl(currentPath)

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} in Pakistan`,
    description: `Find ${cat.name} in Pakistan by city. Browse local businesses, services and listings on ListPak.`,
    url: canonicalUrl,
    isPartOf: { '@type': 'WebSite', name: 'ListPak', url: 'https://www.listpak.com/' },
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
        name: cat.name,
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

      <section className="bg-[#0F172A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex items-center flex-wrap gap-1.5">
            <Link href="/" className="hover:text-white underline">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white underline">Categories</Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">{cat.name}</span>
          </nav>
          
          <Link href="/categories" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All 26 Business Categories</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{cat.name} in Pakistan</h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            {cat.desc}. Browse verified {cat.name.toLowerCase()} listings across Pakistani cities by location, services, and direct contact details.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* Verification Info Callout */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Directory Trust Notice:</strong> {VERIFICATION_DISCLAIMER}
          </p>
        </div>

        {/* Cities with real listings in this category */}
        {activeCities.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-3 shadow-xs">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Browse {cat.name} by City</span>
              </h2>
              <span className="text-xs text-slate-500">{activeCities.length} {activeCities.length === 1 ? 'City with Listings' : 'Cities with Listings'}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeCities.map((city) => (
                <Link
                  key={city.citySlug}
                  href={`/category/${cat.id}/${city.citySlug}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{cat.name} in {city.cityName}</span>
                  <span className="text-[10px] text-slate-400 bg-white px-1.5 py-0.2 rounded border">
                    {city.count}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {seoCopy && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">{seoCopy.intro}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{seoCopy.guidance}</p>
            <nav aria-label="Related ListPak guides" className="flex flex-wrap gap-2">
              {seoCopy.links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>{cat.name} Businesses and Services ({businesses.length})</span>
          </h2>
          <Link href={`/search?category=${encodeURIComponent(cat.name)}`} className="text-xs font-bold text-blue-600 hover:underline">
            View in Advanced Search &rarr;
          </Link>
        </div>

        {businesses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <p className="text-slate-600 text-sm font-semibold">No businesses currently listed under {cat.name}.</p>
            <p className="text-slate-400 text-xs">Are you an owner in this sector? Register your listing for free discovery.</p>
            <Link href="/add-business" className="inline-block px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-xl mt-2">
              Be the first to list your business free!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businesses.map((biz) => (
              <div key={biz.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Image src={biz.logo} alt={biz.name} width={48} height={48} loading="lazy" sizes="48px" className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
                      <div>
                        <Link href={`/business/${biz.slug}`} className="font-bold text-slate-900 text-base hover:text-blue-600 flex items-center gap-1.5">
                          <span>{biz.name}</span>
                          {biz.verified && (
                            <span title="Verified Business">
                              <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            </span>
                          )}
                        </Link>
                        <p className="text-xs text-slate-500">{biz.city}, Pakistan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-700 text-xs font-bold bg-amber-50 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>{biz.reviewCount > 0 && biz.rating > 0 ? biz.rating : 'Active'}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{biz.description}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">
                    {biz.city}
                  </span>
                  <Link href={`/business/${biz.slug}`} className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Related Categories */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-3 shadow-xs">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Explore Other Industry Categories
          </h2>
          <div className="flex flex-wrap gap-2 pt-1">
            {relatedCategories.map((rc) => (
              <Link
                key={rc.id}
                href={`/category/${rc.id}`}
                className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
              >
                {rc.name}
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
