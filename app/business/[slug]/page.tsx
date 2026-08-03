import { Metadata } from 'next'
import BusinessDetailClient from './business-detail-client'
import React from 'react'
import { getAllBusinesses, getBusinessBySlug } from '@/lib/db-service'

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
      canonical: `https://listpak.com/business/${slug}`,
    },
    openGraph: {
      title,
      description,
      siteName: 'ListPak',
      url: `https://listpak.com/business/${slug}`
    },
  }
}

export default async function BusinessPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  return <BusinessDetailClient slug={params.slug} />
}
