import { MetadataRoute } from 'next'
import { CATEGORIES, BusinessItem, ProfessionalItem, CompanyItem, JobItem } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'
import { getAllProfessionals } from '@/lib/professional-service'
import { getAllCompanies } from '@/lib/company-service'
import { getAllJobs } from '@/lib/job-service'
import { getPublicJobPath } from '@/lib/job-url'
import { isExpiredJob } from '@/lib/job-schema-helpers'
import { BLOG_POSTS } from '@/lib/blog-data'
import {
  filterBusinessesByCategory,
  filterBusinessesByCity,
  filterBusinessesByCategoryAndCity,
  getPopulatedCategoryCityPairs,
  normalizeCitySlug
} from '@/lib/directory-helpers'

export const revalidate = 3600 // Revalidate sitemap XML every hour

// 13 kept prayer times slugs that remain indexed
export const KEPT_PRAYER_SLUGS = [
  'islamabad',
  'kallar-syedan',
  'lahore',
  'shujabad',
  'sohawa',
  'timergara',
  'rawalpindi',
  'sarai-alamgir',
  'samundri',
  'hassan-abdal',
  'batkhela',
  'peshawar',
  'karachi',
]

/**
 * Returns an HONEST lastmod date for the sitemap.
 * - Uses the real record timestamp when one exists (Firestore Timestamp, ISO string, or Date).
 * - Returns undefined when no real timestamp is available, so the URL ships WITHOUT lastmod
 *   instead of a fabricated "recently updated" date (which erodes Google's trust in the sitemap).
 */
function honestLastmod(originalInput?: unknown): Date | undefined {
  if (!originalInput) return undefined
  try {
    let date: Date | null = null
    if (originalInput instanceof Date) {
      date = originalInput
    } else if (typeof originalInput === 'string' || typeof originalInput === 'number') {
      date = new Date(originalInput)
    } else if (typeof originalInput === 'object' && originalInput !== null) {
      const o = originalInput as { toDate?: () => Date; seconds?: number }
      if (typeof o.toDate === 'function') {
        date = o.toDate() // Firestore Timestamp
      } else if (typeof o.seconds === 'number') {
        date = new Date(o.seconds * 1000)
      }
    }
    if (!date || isNaN(date.getTime())) return undefined
    if (date.getTime() > Date.now()) return undefined // never a future date
    return date
  } catch {
    return undefined
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.listpak.com'
  const canonicalUrl = (path: string) => path === '/' ? `${baseUrl}/` : `${baseUrl}/${path.replace(/^\/+|\/+$/g, '')}/`

  // 1. Homepage (Updated Today)
  const homepageRoute = {
    url: canonicalUrl('/'),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }

  // 2. Core Portal Hubs & Static Pages (Distributed between today, yesterday, and 2 days ago)
  const corePages = [
    '/categories',
    '/cities',
    '/prayer-times-pakistan',
    '/jobs',
    '/post-job',
    '/companies',
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
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 3. Policy & Trust Pages (Distributed between 3 to 6 days ago - never older than 7 days)
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
    changeFrequency: 'weekly' as const,
    priority: 0.3,
  }))

  // Fetch approved entities
  let rawBusinesses: BusinessItem[] = []
  try {
    rawBusinesses = await getAllBusinesses(false)
  } catch (err) {
    console.error('Error fetching businesses for sitemap:', err)
  }

  let rawJobs: JobItem[] = []
  try {
    rawJobs = await getAllJobs(false)
  } catch (err) {
    console.error('Error fetching jobs for sitemap:', err)
  }

  let rawProfessionals: ProfessionalItem[] = []
  try {
    rawProfessionals = await getAllProfessionals(false)
  } catch (err) {
    console.error('Error fetching professionals for sitemap:', err)
  }

  let rawCompanies: CompanyItem[] = []
  try {
    rawCompanies = await getAllCompanies(false)
  } catch (err) {
    console.error('Error fetching companies for sitemap:', err)
  }

  // 4. Industry Categories (Only categories with >= 3 listings, lastmod between today and 3 days ago)
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => {
    const bizInCat = filterBusinessesByCategory(rawBusinesses, cat.id)
    if (bizInCat.length < 3) return null

    return {
      url: canonicalUrl(`/category/${cat.id}`),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }
  }).filter((item): item is NonNullable<typeof item> => item !== null)

  // 5. Active Cities (Only index cities with listings, lastmod between today and 3 days ago)
  const activeCitySlugs = new Set<string>()
  rawBusinesses.forEach(b => {
    if (b.city) activeCitySlugs.add(normalizeCitySlug(b.city))
    if (b.cities) b.cities.forEach(c => activeCitySlugs.add(normalizeCitySlug(c)))
  })
  rawJobs.forEach(j => {
    if (j.city) activeCitySlugs.add(normalizeCitySlug(j.city))
    if (j.cities) j.cities.forEach(c => activeCitySlugs.add(normalizeCitySlug(c)))
  })
  rawProfessionals.forEach(p => {
    if (p.city) activeCitySlugs.add(normalizeCitySlug(p.city))
  })
  rawCompanies.forEach(comp => {
    if (comp.city) activeCitySlugs.add(normalizeCitySlug(comp.city))
    if (comp.branchLocations) comp.branchLocations.forEach(c => activeCitySlugs.add(normalizeCitySlug(c)))
  })
  activeCitySlugs.delete('pakistan')
  activeCitySlugs.delete('remote')

  const cityRoutes = Array.from(activeCitySlugs).map((citySlug) => ({
    url: canonicalUrl(`/city/${citySlug}`),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // 6. Populated Category + City Landing Pages (Only combinations with >= 3 listings, lastmod 1 to 4 days ago)
  const populatedCategoryCityPairs = getPopulatedCategoryCityPairs(rawBusinesses)
  const categoryCityRoutes = populatedCategoryCityPairs
    .filter((pair) => pair.count >= 3)
    .map((pair) => ({
      url: canonicalUrl(`/category/${pair.categorySlug}/${pair.citySlug}`),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

  // 7. Approved Business Pages (Distributed from today, yesterday, down to 5 days ago)
  const approvedBusinesses = rawBusinesses.filter(b => 
    (b.status || 'approved') === 'approved' && 
    Boolean(b.slug && b.slug.trim())
  )
  const businessRoutes = approvedBusinesses.map((biz) => ({
    url: canonicalUrl(`/business/${biz.slug}`),
    lastModified: honestLastmod(biz.approvedAt || biz.submittedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 8. Active Approved Job Openings (Today to 2 days ago)
  const approvedJobs = rawJobs.filter((job) => 
    (job.status || 'approved') === 'approved' && 
    !isExpiredJob(job) &&
    Boolean(job.slug || job.id)
  )
  const jobRoutes = approvedJobs.map((job) => ({
    url: canonicalUrl(getPublicJobPath(job)),
    lastModified: honestLastmod(job.postedDate || job.postedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 9. Approved Companies (Yesterday to 5 days ago)
  const approvedCompanies = rawCompanies.filter((comp) => 
    (comp.status || 'approved') === 'approved' && 
    Boolean(comp.slug && comp.slug.trim())
  )
  const companyRoutes = approvedCompanies.map((comp) => ({
    url: canonicalUrl(`/companies/${comp.slug}`),
    lastModified: honestLastmod(comp.approvedAt || comp.submittedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 10. Approved Professional Profiles (Yesterday to 5 days ago)
  const approvedPros = rawProfessionals.filter((pro) => 
    (pro.status || 'approved') === 'approved' && 
    (pro.profileStatus || 'APPROVED') === 'APPROVED' && 
    Boolean(pro.username || pro.slug)
  )
  const professionalRoutes = approvedPros.map((pro) => {
    const proId = (pro.username || pro.slug || 'pro').trim()
    return {
      url: canonicalUrl(`/professionals/${proId}`),
      lastModified: honestLastmod(pro.approvedAt || pro.submittedAt || pro.verifiedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  })

  // 11. Blog Post Pages (Today to 4 days ago)
  const rawPostsList = Object.values(BLOG_POSTS)
  const blogPostsBySlug = new Map<string, (typeof rawPostsList)[number]>()
  for (const post of rawPostsList) {
    if (post && post.slug && !blogPostsBySlug.has(post.slug)) {
      blogPostsBySlug.set(post.slug, post)
    }
  }
  const allBlogPosts = Array.from(blogPostsBySlug.values())
  const blogRoutes = allBlogPosts.map((post) => ({
    url: canonicalUrl(`/blog/${post.slug}`),
    lastModified: honestLastmod(post.dateModified || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 12. City Prayer Times Pages: Kept 13 Indexable Cities (Today or Yesterday)
  const prayerCityRoutes = KEPT_PRAYER_SLUGS.map((slug) => ({
    url: canonicalUrl(`/prayer-times-${slug}-today`),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Combine all routes
  const allRoutes = [
    homepageRoute,
    ...corePages,
    ...policyPages,
    ...categoryRoutes,
    ...cityRoutes,
    ...categoryCityRoutes,
    ...prayerCityRoutes,
    ...businessRoutes,
    ...jobRoutes,
    ...companyRoutes,
    ...professionalRoutes,
    ...blogRoutes,
  ]

  // Deduplicate entries by URL. Dates stay honest: a missing, invalid, or future
  // lastModified is dropped (no lastmod emitted) rather than fabricated.
  const seenUrls = new Set<string>()
  const deduplicatedRoutes: MetadataRoute.Sitemap = []
  const now = new Date()

  for (const item of allRoutes) {
    if (!seenUrls.has(item.url)) {
      seenUrls.add(item.url)

      const raw = (item as { lastModified?: string | Date }).lastModified
      const date = raw instanceof Date ? raw : raw ? new Date(raw) : undefined
      const validDate =
        date && !isNaN(date.getTime()) && date.getTime() <= now.getTime()
          ? date
          : undefined

      const entry: MetadataRoute.Sitemap[number] = {
        ...item,
        lastModified: validDate,
      }

      deduplicatedRoutes.push(entry)
    }
  }

  return deduplicatedRoutes
}
