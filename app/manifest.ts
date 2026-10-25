import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ListPak — Pakistan's Digital Business & Enterprise Ecosystem",
    short_name: 'ListPak',
    description: "Discover local businesses, jobs and professionals across Pakistan. Free business listings, a job portal and professional profiles on ListPak.",
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#2563EB',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
