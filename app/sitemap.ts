import { MetadataRoute } from 'next'
import { CATEGORIES, CITIES, MOCK_JOBS, MOCK_PROFESSIONALS, BusinessItem } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'
import { FEATURED_POSTS, RECENT_POSTS } from '@/app/blog/page'

export const revalidate = 3600 // Revalidate sitemap XML every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://listpak.com'
  const currentDate = new Date()
  const fixedPolicyDate = new Date('2026-08-01T00:00:00.000Z')

  // 1. Homepage (Priority: 1.0, Frequency: daily, Canonical trailing slash)
  const homepageRoute = {
    url: `${baseUrl}/`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }

  // 2. Core Portal Pages (Priority: 0.7, Frequency: weekly)
  const corePages = [
    '/search',
    '/categories',
    '/cities',
    '/jobs',
    '/post-job',
    '/professionals',
    '/blog',
    '/add-business',
    '/html-sitemap',
    '/about',
    '/contact',
    '/careers',
    '/advertise-with-us',
    '/faqs',
    '/help-center',
    '/support'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 3. Legal, Policies & Terms Pages (Priority: 0.3, Frequency: yearly)
  const policyPages = [
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
    '/editorial-policy',
    '/community-guidelines',
    '/business-listing-guidelines',
    '/verification-policy',
    '/refund-policy',
    '/accessibility',
    '/report-listing',
    '/report-abuse'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: fixedPolicyDate,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  // 4. Industry Category Pages (Priority: 0.9, Frequency: daily)
  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.id}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // 5. City Hub Pages (Priority: 0.9, Frequency: daily)
  const cityRoutes = CITIES.map((city) => ({
    url: `${baseUrl}/city/${encodeURIComponent(city.toLowerCase().trim().replace(/\s+/g, '-'))}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // 6. Dynamic Business Pages - ONLY Approved Businesses (Priority: 0.9, Frequency: weekly)
  let rawBusinesses: BusinessItem[] = []
  try {
    rawBusinesses = await getAllBusinesses(false)
  } catch (err) {
    console.error('Error fetching businesses for sitemap:', err)
  }

  // Strict filter: only approved items
  const approvedBusinesses = rawBusinesses.filter(b => (b.status || 'approved') === 'approved')

  const businessRoutes = approvedBusinesses.map((biz) => {
    let modDate = currentDate
    if (biz.approvedAt) {
      modDate = new Date(biz.approvedAt)
    } else if (biz.submittedAt) {
      modDate = new Date(biz.submittedAt)
    }

    return {
      url: `${baseUrl}/business/${biz.slug}`,
      lastModified: isNaN(modDate.getTime()) ? currentDate : modDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  })

  // 7. Dynamic Job Openings (Priority: 0.9, Frequency: weekly)
  const jobRoutes = MOCK_JOBS.map((job) => ({
    url: `${baseUrl}/jobs/${job.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 8. Dynamic Professional Profiles (Priority: 0.9, Frequency: weekly)
  const professionalRoutes = MOCK_PROFESSIONALS.map((pro) => ({
    url: `${baseUrl}/professionals/${pro.username}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 9. Blog Post Pages (Priority: 0.8, Frequency: weekly)
  const allBlogPosts = [...FEATURED_POSTS, ...RECENT_POSTS]
  const blogRoutes = allBlogPosts.map((post) => {
    const parsedDate = new Date(post.date)
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: isNaN(parsedDate.getTime()) ? currentDate : parsedDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })

  // Combine all routes
  const allRoutes = [
    homepageRoute,
    ...corePages,
    ...policyPages,
    ...categoryRoutes,
    ...cityRoutes,
    ...businessRoutes,
    ...jobRoutes,
    ...professionalRoutes,
    ...blogRoutes,
  ]

  // Deduplicate entries by URL to ensure XML validity
  const seenUrls = new Set<string>()
  const deduplicatedRoutes: MetadataRoute.Sitemap = []

  for (const item of allRoutes) {
    if (!seenUrls.has(item.url)) {
      seenUrls.add(item.url)
      deduplicatedRoutes.push(item)
    }
  }

  return deduplicatedRoutes
}
