import { MetadataRoute } from 'next'
import { CATEGORIES, TOP_CITIES, MOCK_BUSINESSES, MOCK_JOBS, MOCK_PROFESSIONALS } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://listpak.com'

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

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const cityRoutes = TOP_CITIES.map((city) => ({
    url: `${baseUrl}/city/${city.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const businessRoutes = MOCK_BUSINESSES.map((biz) => ({
    url: `${baseUrl}/business/${biz.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  const jobRoutes = MOCK_JOBS.map((job) => ({
    url: `${baseUrl}/jobs/${job.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const professionalRoutes = MOCK_PROFESSIONALS.map((pro) => ({
    url: `${baseUrl}/professionals/${pro.username}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...cityRoutes,
    ...businessRoutes,
    ...jobRoutes,
    ...professionalRoutes
  ]
}
