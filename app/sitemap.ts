import { MetadataRoute } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

function safeDate(val: any): Date {
  if (!val) return new Date()
  try {
    const d = new Date(val)
    return isNaN(d.getTime()) ? new Date() : d
  } catch (e) {
    return new Date()
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://listpak.com'

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/add-business',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Static Blog Posts
  const blogPosts = [
    'how-to-list-business-free-listpak-guide',
    'local-seo-pakistan-businesses-google-ranking',
    'free-job-posting-pakistan-hire-employees',
    'best-free-business-listing-websites-pakistan-2026',
    'first-100-customers-free-business-directory',
    'google-my-business-vs-listpak-comparison',
    'free-job-posting-pakistan-5-platforms',
    'local-seo-keywords-pakistani-businesses',
    'verify-business-listpak-step-by-step',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Dynamic business profiles from Firestore
  let businessRoutes: MetadataRoute.Sitemap = []
  try {
    const snapshot = await getDocs(collection(db, 'businesses'))
    snapshot.forEach((doc) => {
      const data = doc.data()
      if (data.slug) {
        businessRoutes.push({
          url: `${baseUrl}/business/${data.slug}`,
          lastModified: safeDate(data.updatedAt || data.createdAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        })
      }
    })
  } catch (err) {
    console.warn('Sitemap Firestore fetch warning:', err)
  }

  return [...staticRoutes, ...blogPosts, ...businessRoutes]
}
