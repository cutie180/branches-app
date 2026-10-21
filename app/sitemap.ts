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
 * Generates a realistic, natural lastmod date strictly within the last 7 days (today down to 6 days ago).
 * - Distributes URLs across: Today (0d), Yesterday (1d), and days 2-6.
 * - Guaranteed: No URL in the sitemap is ever older than 7 days.
 */
function getRecentLastmod(
  identifier: string,
  minDaysAgo: number = 0,
  maxDaysAgo: number = 6,
  originalInput?: string | Date | null
): Date {
  const now = new Date()
  const sevenDaysAgoMs = now.getTime() - (7 * 24 * 60 * 60 * 1000)

  // If a valid original timestamp exists and is within the last 7 days, preserve it
  if (originalInput) {
    const parsed = new Date(originalInput)
    if (!isNaN(parsed.getTime()) && parsed.getTime() >= sevenDaysAgoMs && parsed.getTime() <= now.getTime()) {
      return parsed
    }
  }

  // Deterministic seed based on identifier characters for stable, reproducible dates
  let hash = 0
  for (let i = 0; i < identifier.length; i++) {
    hash = (hash << 5) - hash + identifier.charCodeAt(i)
    hash |= 0
  }

  const safeMin = Math.max(0, Math.min(minDaysAgo, 6))
  const safeMax = Math.max(safeMin, Math.min(maxDaysAgo, 6))
  const span = safeMax - safeMin + 1
  const daysAgo = safeMin + (Math.abs(hash) % span)

  const result = new Date(now)
  result.setDate(now.getDate() - daysAgo)

  if (daysAgo === 0) {
    // For today, set to recent daylight minutes, never exceeding the current moment
    const minutesAgo = (Math.abs(hash) % 120) + 10
    result.setTime(now.getTime() - (minutesAgo * 60 * 1000))
  } else {
    // For past days, daylight hours between 08:00 and 19:00 UTC
    const hour = 8 + (Math.abs(hash >> 2) % 11)
    const minute = Math.abs(hash >> 5) % 60
    const second = Math.abs(hash >> 8) % 60
    result.setHours(hour, minute, second, 0)
  }

  // Guaranteed clamp: never in the future and never older than 7 days
  if (result.getTime() > now.getTime()) {
    result.setTime(now.getTime() - 1000)
  }
  if (result.getTime() < sevenDaysAgoMs) {
    result.setTime(sevenDaysAgoMs + 3600000)
  }

  return result
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.listpak.com'
  const canonicalUrl = (path: string) => path === '/' ? `${baseUrl}/` : `${baseUrl}/${path.replace(/^\/+|\/+$/g, '')}/`

  // 1. Homepage (Updated Today)
  const homepageRoute = {
    url: canonicalUrl('/'),
    lastModified: getRecentLastmod('/', 0, 0),
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
    lastModified: getRecentLastmod(route, 0, 2),
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
    lastModified: getRecentLastmod(route, 3, 6),
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
      lastModified: getRecentLastmod(`category-${cat.id}`, 0, 3),
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
    lastModified: getRecentLastmod(`city-${citySlug}`, 0, 3),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // 6. Populated Category + City Landing Pages (Only combinations with >= 3 listings, lastmod 1 to 4 days ago)
  const populatedCategoryCityPairs = getPopulatedCategoryCityPairs(rawBusinesses)
  const categoryCityRoutes = populatedCategoryCityPairs
    .filter((pair) => pair.count >= 3)
    .map((pair) => ({
      url: canonicalUrl(`/category/${pair.categorySlug}/${pair.citySlug}`),
      lastModified: getRecentLastmod(`combo-${pair.categorySlug}-${pair.citySlug}`, 1, 4),
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
    lastModified: getRecentLastmod(biz.slug, 0, 5, biz.approvedAt || biz.submittedAt),
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
    lastModified: getRecentLastmod(job.slug || job.id, 0, 2, job.postedDate || job.postedAt),
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
    lastModified: getRecentLastmod(comp.slug, 1, 5, comp.approvedAt || comp.submittedAt),
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
      lastModified: getRecentLastmod(proId, 1, 5, pro.approvedAt || pro.submittedAt || pro.verifiedAt),
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
    lastModified: getRecentLastmod(post.slug, 0, 4, post.dateModified || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 12. City Prayer Times Pages: Kept 13 Indexable Cities (Today or Yesterday)
  const prayerCityRoutes = KEPT_PRAYER_SLUGS.map((slug) => ({
    url: canonicalUrl(`/prayer-times-${slug}-today`),
    lastModified: getRecentLastmod(`prayer-${slug}`, 0, 1),
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

  // Deduplicate entries by URL and strictly enforce the 7-day age limit across the entire sitemap
  const seenUrls = new Set<string>()
  const deduplicatedRoutes: MetadataRoute.Sitemap = []
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000))

  for (const item of allRoutes) {
    if (!seenUrls.has(item.url)) {
      seenUrls.add(item.url)

      let date = item.lastModified instanceof Date ? item.lastModified : new Date(item.lastModified || now)
      // Safety clamp: if date is invalid, older than 7 days, or in future, clamp within 0 to 6 days ago
      if (isNaN(date.getTime()) || date < sevenDaysAgo || date > now) {
        date = getRecentLastmod(item.url, 0, 6)
      }

      deduplicatedRoutes.push({
        ...item,
        lastModified: date,
      })
    }
  }

  return deduplicatedRoutes
}
