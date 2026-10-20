import React from 'react'
import { Metadata } from 'next'
import { getAllBusinesses } from '@/lib/db-service'
import { getAllJobs } from '@/lib/job-service'
import { getAllProfessionals } from '@/lib/professional-service'
import { getCitySeoOverride } from '@/lib/city-seo-overrides'
import {
  filterBusinessesByCity,
  getCityDisplayName,
  normalizeCitySlug,
  toCanonicalUrl,
} from '@/lib/directory-helpers'
import CityPageContent from '@/components/city-page-content'

export const revalidate = 86400 // 24-hour ISR revalidation
export const dynamicParams = true

export async function generateStaticParams() {
  const allBiz = await getAllBusinesses(false)
  const allJobs = await getAllJobs(false)
  const allPros = await getAllProfessionals(false)

  const activeCitySlugs = new Set<string>()
  allBiz.forEach((b) => {
    if (b.city) activeCitySlugs.add(normalizeCitySlug(b.city))
    if (b.cities) b.cities.forEach((c) => activeCitySlugs.add(normalizeCitySlug(c)))
  })
  allJobs.forEach((j) => {
    if (j.city) activeCitySlugs.add(normalizeCitySlug(j.city))
  })
  allPros.forEach((p) => {
    if (p.city) activeCitySlugs.add(normalizeCitySlug(p.city))
  })

  activeCitySlugs.delete('pakistan')
  activeCitySlugs.delete('remote')

  return Array.from(activeCitySlugs).map((slug) => ({ slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const citySlug = params.slug.toLowerCase()
  const cityName = getCityDisplayName(citySlug)
  const citySeo = getCitySeoOverride(citySlug)

  const allApproved = await getAllBusinesses(false)
  const cityBusinesses = filterBusinessesByCity(allApproved, citySlug)

  const allJobs = await getAllJobs(false)
  const cityJobs = allJobs.filter(
    (job) =>
      normalizeCitySlug(job.city) === citySlug ||
      job.cities?.some((c) => normalizeCitySlug(c) === citySlug)
  )

  const allPros = await getAllProfessionals(false)
  const cityPros = allPros.filter((p) => normalizeCitySlug(p.city) === citySlug)

  const hasData =
    cityBusinesses.length > 0 || cityJobs.length > 0 || cityPros.length > 0

  const title = citySeo?.title || `Businesses in ${cityName}, Pakistan | ListPak`
  const description =
    citySeo?.description ||
    `Explore businesses, services, jobs and professionals in ${cityName}, Pakistan. Browse verified local listings on ListPak.`
  const canonicalUrl = toCanonicalUrl(`city/${citySlug}`)

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
      index: hasData,
      follow: true,
    },
  }
}

export default async function CityDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const citySlug = params.slug.toLowerCase()
  return <CityPageContent citySlug={citySlug} pageNumber={1} />
}
