import { MetadataRoute } from 'next'
import { CATEGORIES, CITIES, MOCK_BUSINESSES, MOCK_COMPANIES, MOCK_JOBS, MOCK_PROFESSIONALS, BusinessItem, ProfessionalItem, CompanyItem, JobItem } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'
import { getAllProfessionals } from '@/lib/professional-service'
import { getAllCompanies } from '@/lib/company-service'
import { getAllJobs } from '@/lib/job-service'
import { getPublicJobPath } from '@/lib/job-url'
import { BLOG_POSTS } from '@/lib/blog-data'

export const revalidate = 3600 // Revalidate sitemap XML every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.listpak.com'
  const currentDate = new Date()
  const fixedPolicyDate = new Date('2026-08-01T00:00:00.000Z')
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

  // 6. Business Pages
  let rawBusinesses: BusinessItem[] = []
  try {
    rawBusinesses = await getAllBusinesses(false)
  } catch (err) {
    console.error('Error fetching businesses for sitemap:', err)
  }

  const mockBusinessIds = new Set(MOCK_BUSINESSES.map((business) => business.id))
  const approvedBusinesses = rawBusinesses.filter(b => (b.status || 'approved') === 'approved' && !mockBusinessIds.has(b.id))
  const businessRoutes = approvedBusinesses.map((biz) => ({
    url: canonicalUrl(`/business/${biz.slug}`),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 7. Dynamic Job Openings
  let rawJobs: JobItem[] = []
  try {
    rawJobs = await getAllJobs(false)
  } catch (err) {
    console.error('Error fetching jobs for sitemap:', err)
  }
  const mockJobIds = new Set(MOCK_JOBS.map((job) => job.id))
  const approvedJobs = rawJobs.filter((job) => (job.status || 'approved') === 'approved' && !mockJobIds.has(job.id))
  // Preserve the explicitly requested short alias in the sitemap when its active
  // job resolves through the approved service, even if the legacy mock-cache
  // exclusion would otherwise omit that aliased public URL.
  const activeAliasedJobs = rawJobs.filter((job) =>
    (job.status || 'approved') === 'approved' &&
    getPublicJobPath(job) !== `/jobs/${job.slug || job.id}`
  )
  const sitemapJobs = Array.from(new Map(
    [...approvedJobs, ...activeAliasedJobs].map((job) => [job.id, job])
  ).values())
  const jobRoutes = sitemapJobs.map((job) => ({
    url: canonicalUrl(getPublicJobPath(job)),
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
  const mockCompanyIds = new Set(MOCK_COMPANIES.map((company) => company.id))
  const companyRoutes = rawCompanies.filter((comp) => !mockCompanyIds.has(comp.id) && (comp.status || 'approved') === 'approved').map((comp) => ({
    url: canonicalUrl(`/companies/${comp.slug}`),
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
  const mockProfessionalIds = new Set(MOCK_PROFESSIONALS.map((pro) => pro.id))
  const approvedPros = rawProfessionals.filter((pro) => (pro.status || 'approved') === 'approved' && !mockProfessionalIds.has(pro.id))
  const professionalRoutes = approvedPros.map((pro) => ({
    url: canonicalUrl(`/professionals/${pro.username}`),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 10. Blog Post Pages (Priority: 0.8, Frequency: weekly)
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
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

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
