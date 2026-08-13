import { MetadataRoute } from 'next'
import { CATEGORIES, CITIES, MOCK_JOBS, MOCK_PROFESSIONALS, BusinessItem, ProfessionalItem, CompanyItem, JobItem } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'
import { getAllProfessionals } from '@/lib/professional-service'
import { getAllCompanies } from '@/lib/company-service'
import { getAllJobs } from '@/lib/job-service'
import { FEATURED_POSTS, RECENT_POSTS } from '@/app/blog/page'
import { BLOG_POSTS } from '@/lib/blog-data'

export const revalidate = 3600 // Revalidate sitemap XML every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.listpak.com'
  const currentDate = new Date()
  const fixedPolicyDate = new Date('2026-08-01T00:00:00.000Z')

  // 1. Homepage
  const homepageRoute = {
    url: `${baseUrl}/`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }

  // 2. Core Portal Pages
  const corePages = [
    '/search',
    '/categories',
    '/cities',
    '/jobs',
    '/post-job',
    '/companies',
    '/add-company',
    '/professionals',
    '/add-professional',
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

  // 3. Policy Pages
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

  // 4. Industry Categories
  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.id}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // 5. City Hub Pages
  const cityRoutes = CITIES.map((city) => ({
    url: `${baseUrl}/city/${encodeURIComponent(city.toLowerCase().trim().replace(/\s+/g, '-'))}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // 6. Business Pages
  let rawBusinesses: BusinessItem[] = []
  try {
    rawBusinesses = await getAllBusinesses(false)
  } catch (err) {
    console.error('Error fetching businesses for sitemap:', err)
  }

  const approvedBusinesses = rawBusinesses.filter(b => (b.status || 'approved') === 'approved')
  const businessRoutes = approvedBusinesses.map((biz) => {
    let modDate = currentDate
    if (biz.approvedAt) modDate = new Date(biz.approvedAt)
    return {
      url: `${baseUrl}/business/${biz.slug}`,
      lastModified: isNaN(modDate.getTime()) ? currentDate : modDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  })

  // 7. Dynamic Job Openings
  let rawJobs: JobItem[] = []
  try {
    rawJobs = await getAllJobs(false)
  } catch (err) {
    console.error('Error fetching jobs for sitemap:', err)
  }
  const approvedJobs = rawJobs.length > 0 ? rawJobs : MOCK_JOBS
  const jobRoutes = approvedJobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug || job.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 8. Dynamic Companies
  let rawCompanies: CompanyItem[] = []
  try {
    rawCompanies = await getAllCompanies(false)
  } catch (err) {
    console.error('Error fetching companies for sitemap:', err)
  }
  const companyRoutes = rawCompanies.map((comp) => ({
    url: `${baseUrl}/companies/${comp.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 9. Dynamic Professional Profiles
  let rawProfessionals: ProfessionalItem[] = []
  try {
    rawProfessionals = await getAllProfessionals(false)
  } catch (err) {
    console.error('Error fetching professionals for sitemap:', err)
  }
  const approvedPros = rawProfessionals.length > 0 ? rawProfessionals : MOCK_PROFESSIONALS
  const professionalRoutes = approvedPros.map((pro) => ({
    url: `${baseUrl}/professionals/${pro.username}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 9. Blog Post Pages (Priority: 0.8, Frequency: weekly)
  const rawPostsList = [...Object.values(BLOG_POSTS), ...FEATURED_POSTS, ...RECENT_POSTS]
  const blogPostsBySlug = new Map<string, { slug: string; date: string }>()
  for (const post of rawPostsList) {
    if (post && post.slug && !blogPostsBySlug.has(post.slug)) {
      blogPostsBySlug.set(post.slug, post)
    }
  }
  const allBlogPosts = Array.from(blogPostsBySlug.values())
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
    ...companyRoutes,
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
