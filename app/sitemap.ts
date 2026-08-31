import { MetadataRoute } from 'next'
import { CATEGORIES, CITIES, BusinessItem, ProfessionalItem, CompanyItem, JobItem } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'
import { getAllProfessionals } from '@/lib/professional-service'
import { getAllCompanies } from '@/lib/company-service'
import { getAllJobs } from '@/lib/job-service'
import { getPublicJobPath } from '@/lib/job-url'
import { BLOG_POSTS } from '@/lib/blog-data'

export const revalidate = 3600 // Revalidate sitemap XML every hour

function safeDate(input?: string | null, fallback: Date = new Date()): Date {
  if (!input) return fallback
  const d = new Date(input)
  return isNaN(d.getTime()) ? fallback : d
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.listpak.com'
  const currentDate = new Date()
  const canonicalUrl = (path: string) => path === '/' ? `${baseUrl}/` : `${baseUrl}/${path.replace(/^\/+|\/+$/g, '')}/`

  // 1. Homepage
  const homepageRoute = {
    url: canonicalUrl('/'),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }

  // 2. Core Portal Pages
  const corePages = [
    '/search',
    '/categories',
    '/cities',
    '/prayer-times-pakistan',
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
    url: canonicalUrl(route),
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
    url: canonicalUrl(route),
    lastModified: currentDate,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  // 4. Industry Categories
  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: canonicalUrl(`/category/${cat.id}`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // 5. City Hub Pages
  const cityRoutes = CITIES.map((city) => ({
    url: canonicalUrl(`/city/${encodeURIComponent(city.toLowerCase().trim().replace(/\s+/g, '-'))}`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // 6. All Approved Business Pages
  let rawBusinesses: BusinessItem[] = []
  try {
    rawBusinesses = await getAllBusinesses(false)
  } catch (err) {
    console.error('Error fetching businesses for sitemap:', err)
  }

  const approvedBusinesses = rawBusinesses.filter(b => 
    (b.status || 'approved') === 'approved' && 
    Boolean(b.slug && b.slug.trim())
  )
  const businessRoutes = approvedBusinesses.map((biz) => ({
    url: canonicalUrl(`/business/${biz.slug}`),
    lastModified: safeDate(biz.approvedAt || biz.submittedAt, currentDate),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 7. All Approved Job Openings
  let rawJobs: JobItem[] = []
  try {
    rawJobs = await getAllJobs(false)
  } catch (err) {
    console.error('Error fetching jobs for sitemap:', err)
  }
  const approvedJobs = rawJobs.filter((job) => 
    (job.status || 'approved') === 'approved' && 
    Boolean(job.slug || job.id)
  )
  const jobRoutes = approvedJobs.map((job) => ({
    url: canonicalUrl(getPublicJobPath(job)),
    lastModified: safeDate(job.postedDate || job.postedAt, currentDate),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 8. All Approved Companies
  let rawCompanies: CompanyItem[] = []
  try {
    rawCompanies = await getAllCompanies(false)
  } catch (err) {
    console.error('Error fetching companies for sitemap:', err)
  }
  const approvedCompanies = rawCompanies.filter((comp) => 
    (comp.status || 'approved') === 'approved' && 
    Boolean(comp.slug && comp.slug.trim())
  )
  const companyRoutes = approvedCompanies.map((comp) => ({
    url: canonicalUrl(`/companies/${comp.slug}`),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 9. All Approved Professional Profiles
  let rawProfessionals: ProfessionalItem[] = []
  try {
    rawProfessionals = await getAllProfessionals(false)
  } catch (err) {
    console.error('Error fetching professionals for sitemap:', err)
  }
  const approvedPros = rawProfessionals.filter((pro) => 
    (pro.status || 'approved') === 'approved' && 
    (pro.profileStatus || 'APPROVED') === 'APPROVED' && 
    Boolean(pro.username || pro.slug)
  )
  const professionalRoutes = approvedPros.map((pro) => ({
    url: canonicalUrl(`/professionals/${pro.username || pro.slug}`),
    lastModified: safeDate(pro.approvedAt || pro.submittedAt || pro.verifiedAt, currentDate),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 10. Blog Post Pages
  const rawPostsList = Object.values(BLOG_POSTS)
  const blogPostsBySlug = new Map<string, { slug: string; date: string }>()
  for (const post of rawPostsList) {
    if (post && post.slug && !blogPostsBySlug.has(post.slug)) {
      blogPostsBySlug.set(post.slug, post)
    }
  }
  const allBlogPosts = Array.from(blogPostsBySlug.values())
  const blogRoutes = allBlogPosts.map((post) => ({
    url: canonicalUrl(`/blog/${post.slug}`),
    lastModified: safeDate(post.date, currentDate),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 11. City Prayer Times Pages (SEO Target)
  const prayerCityRoutes = CITIES.map((city) => ({
    url: canonicalUrl(`/prayer-times-${city.toLowerCase().replace(/\s+/g, '-')}-today`),
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Combine all routes
  const allRoutes = [
    homepageRoute,
    ...corePages,
    ...policyPages,
    ...categoryRoutes,
    ...cityRoutes,
    ...prayerCityRoutes,
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
