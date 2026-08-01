import { Metadata } from 'next'
import BusinessDetailClient from './business-detail-client'
import React from 'react'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const slug = params.slug

  const businessName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const title = `${businessName} - Business Details | PakBizBranches`
  const description = `Verified details, phone number, location, and contact info for ${businessName} on PakBizBranches business directory.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'PakBizBranches',
    },
  }
}

export default async function BusinessPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  return <BusinessDetailClient slug={params.slug} />
}
