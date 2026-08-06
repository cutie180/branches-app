import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/*', '/api/*', '/login', '/register', '/dashboard/*'],
    },
    sitemap: 'https://www.listpak.com/sitemap.xml',
  }
}
