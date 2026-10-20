import React from 'react'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getAllBusinesses } from '@/lib/db-service'
import { getCitySeoOverride } from '@/lib/city-seo-overrides'
import {
  filterBusinessesByCity,
  getCityDisplayName,
  normalizeCitySlug,
  toCanonicalUrl,
} from '@/lib/directory-helpers'
import CityPageContent from '@/components/city-page-content'

export const revalidate = 86400
export const dynamicParams = true

const PAGE_SIZE = 20

export async function generateStaticParams() {
  const allBiz = await getAllBusinesses(false)
  const activeCitySlugs = new Set<string>()

  allBiz.forEach((b) => {
    if (b.city) activeCitySlugs.add(normalizeCitySlug(b.city))
    if (b.cities) b.cities.forEach((c) => activeCitySlugs.add(normalizeCitySlug(c)))
  })
  activeCitySlugs.delete('pakistan')
  activeCitySlugs.delete('remote')

  const params: { slug: string; page: string }[] = []
  for (const slug of activeCitySlugs) {
    const cityBusinesses = filterBusinessesByCity(allBiz, slug)
    const totalPages = Math.ceil(cityBusinesses.length / PAGE_SIZE)
    for (let p = 2; p <= totalPages; p++) {
      params.push({ slug, page: String(p) })
    }
  }
  return params
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; page: string }>
}): Promise<Metadata> {
  const params = await props.params
  const citySlug = params.slug.toLowerCase()
  const pageNumber = parseInt(params.page, 10)
  const cityName = getCityDisplayName(citySlug)
  const citySeo = getCitySeoOverride(citySlug)

  const allApproved = await getAllBusinesses(false)
  const cityBusinesses = filterBusinessesByCity(allApproved, citySlug)
  const totalPages = Math.max(1, Math.ceil(cityBusinesses.length / PAGE_SIZE))

  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return {
      title: 'Page Not Found | ListPak',
      robots: { index: false, follow: false },
    }
  }

  const baseTitle = citySeo?.title
    ? citySeo.title.replace(/ \| ListPak$/, '')
    : `Businesses in ${cityName}`
  const title = `${baseTitle} – Page ${pageNumber} | ListPak`
  const description = `Browse page ${pageNumber} of verified businesses in ${cityName}, Pakistan on ListPak.`
  const canonicalUrl = toCanonicalUrl(`city/${citySlug}/page/${pageNumber}`)

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

export default async function PaginatedCityPage(props: {
  params: Promise<{ slug: string; page: string }>
}) {
  const params = await props.params
  const citySlug = params.slug.toLowerCase()
  const pageNumber = parseInt(params.page, 10)

  if (isNaN(pageNumber) || pageNumber <= 1) {
    redirect(`/city/${citySlug}/`)
  }

  const allApproved = await getAllBusinesses(false)
  const cityBusinesses = filterBusinessesByCity(allApproved, citySlug)
  const totalPages = Math.max(1, Math.ceil(cityBusinesses.length / PAGE_SIZE))

  if (pageNumber > totalPages) {
    notFound()
  }

  return <CityPageContent citySlug={citySlug} pageNumber={pageNumber} />
}
