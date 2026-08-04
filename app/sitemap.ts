import { MetadataRoute } from 'next'
import { CATEGORIES, CITIES, MOCK_JOBS, MOCK_PROFESSIONALS, BusinessItem } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'
import { FEATURED_POSTS, RECENT_POSTS } from '@/app/blog/page'

export const revalidate = 3600 // Revalidate sitemap XML every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://listpak.com'

  // 1. Static Pages
  const staticRoutes = [
    '',
    '/search',
    '/jobs',
    '/post-job',
    '/professionals',
    '/categories',
    '/cities',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
    '/editorial-policy',
    '/community-guidelines',
    '/business-listing-guidelines',
    '/verification-policy',
    '/refund-policy',
    '/advertise-with-us',
    '/careers',
    '/faqs',
    '/help-center',
    '/support',
    '/report-listing',
    '/report-abuse',
    '/accessibility',
    '/html-sitemap',
    '/add-business'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. Industry Category Pages
  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 3. City Pages (All Pakistani Cities)
  const cityRoutes = CITIES.map((city) => ({
    url: `${baseUrl}/city/${encodeURIComponent(city.toLowerCase().trim().replace(/\s+/g, '-'))}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 4. Dynamic Business Pages (Real Firebase Businesses + Fallbacks)
  let businesses: BusinessItem[] = []
  try {
    businesses = await getAllBusinesses(false)
  } catch (err) {
    console.error('Error fetching businesses for sitemap:', err)
  }

  const businessRoutes = businesses.map((biz) => ({
    url: `${baseUrl}/business/${biz.slug}`,
    lastModified: biz.submittedAt ? new Date(biz.submittedAt) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // 5. Job Openings
  const jobRoutes = MOCK_JOBS.map((job) => ({
    url: `${baseUrl}/jobs/${job.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // 6. Professional Profiles
  const professionalRoutes = MOCK_PROFESSIONALS.map((pro) => ({
    url: `${baseUrl}/professionals/${pro.username}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 7. Blog Posts
  const allBlogPosts = [...FEATURED_POSTS, ...RECENT_POSTS]
  const blogRoutes = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...cityRoutes,
    ...businessRoutes,
    ...jobRoutes,
    ...professionalRoutes,
    ...blogRoutes,
  ]
}
