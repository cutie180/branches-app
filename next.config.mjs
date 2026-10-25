/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  compress: true,
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      'recharts',
      'date-fns',
    ],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    localPatterns: [
      {
        pathname: '/api/**',
      },
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.imrandigitals.com',
      },
      {
        protocol: 'https',
        hostname: 'imrandigitals.com',
      },
    ],
  },

  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return []
    }
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/((?!_next|api).*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/businesses',
        destination: '/search/',
        permanent: true,
      },
      {
        source: '/businesses/',
        destination: '/search/',
        permanent: true,
      },
      // Phase 0 SEO: old UBL slug is a dead 404 — consolidate its impressions onto the live slug
      {
        source: '/business/ubl-united-bank-limited',
        destination: '/business/united-bank-limited-ubl/',
        permanent: true,
      },
      {
        source: '/business/ubl-united-bank-limited/',
        destination: '/business/united-bank-limited-ubl/',
        permanent: true,
      },
      // Phase 0 SEO: duplicate professional profile — consolidate onto the canonical username slug
      {
        source: '/professionals/salim-ghauri-founder-ceo-netsol-technologies',
        destination: '/professionals/salim-ghauri-lahore/',
        permanent: true,
      },
      {
        source: '/professionals/salim-ghauri-founder-ceo-netsol-technologies/',
        destination: '/professionals/salim-ghauri-lahore/',
        permanent: true,
      },
      // Phase 0 SEO: old slugs that still earn GSC impressions but return 404 —
      // consolidate each onto its live canonical page (targets verified live, 2026-10-23)
      {
        source: '/business/kolachi-restaurant-karachi',
        destination: '/business/kolachi-restaurant/',
        permanent: true,
      },
      {
        source: '/business/kolachi-restaurant-karachi/',
        destination: '/business/kolachi-restaurant/',
        permanent: true,
      },
      {
        source: '/business/meezan-bank-pakistan',
        destination: '/business/meezan-bank-limited/',
        permanent: true,
      },
      {
        source: '/business/meezan-bank-pakistan/',
        destination: '/business/meezan-bank-limited/',
        permanent: true,
      },
      {
        source: '/professionals/monis-rahman-founder-chairman-rozee',
        destination: '/professionals/monis-rahman-lahore/',
        permanent: true,
      },
      {
        source: '/professionals/monis-rahman-founder-chairman-rozee/',
        destination: '/professionals/monis-rahman-lahore/',
        permanent: true,
      },
      {
        source: '/professionals/jehan-ara-founder-ceo-katalyst-labs',
        destination: '/professionals/jehan-ara-karachi/',
        permanent: true,
      },
      {
        source: '/professionals/jehan-ara-founder-ceo-katalyst-labs/',
        destination: '/professionals/jehan-ara-karachi/',
        permanent: true,
      },
      {
        source: '/professionals/kalsoom-lakhani-cofounder-general-partner-i2i-ventures',
        destination: '/professionals/kalsoom-lakhani-karachi/',
        permanent: true,
      },
      {
        source: '/professionals/kalsoom-lakhani-cofounder-general-partner-i2i-ventures/',
        destination: '/professionals/kalsoom-lakhani-karachi/',
        permanent: true,
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: '/prayer-times-:slug-today/',
        destination: '/prayer-times/:slug-today/',
      },
      {
        source: '/prayer-times-:slug/',
        destination: '/prayer-times/:slug-today/',
      },
    ]
  },
}

export default nextConfig
