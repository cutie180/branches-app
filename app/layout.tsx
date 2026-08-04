import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from 'sonner'
import './globals.css'
import BottomNav from '@/components/bottom-nav'

export const metadata: Metadata = {
  title: "ListPak — Pakistan's Digital Business & Enterprise Ecosystem",
  description: "Discover, connect, and grow with Pakistan's largest digital business platform. Explore verified business listings, jobs, professional talent, and enterprise services across Karachi, Lahore, Islamabad, and nationwide.",
  metadataBase: new URL('https://listpak.com/'),
  keywords: [
    'ListPak Pakistan',
    'Pakistan business directory',
    'free business listing Pakistan',
    'jobs in Pakistan',
    'Pakistani professionals',
    'verified companies Lahore Karachi Islamabad',
    'ListPak enterprise ecosystem'
  ],
  icons: {
    icon: [{ url: '/favicon.png', sizes: 'any' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: "ListPak — Pakistan's Digital Business & Enterprise Ecosystem",
    description: "Discover, connect, and grow with Pakistan's largest digital business platform. Verified businesses, hiring portal, and professional talent.",
    url: 'https://listpak.com/',
    siteName: 'ListPak',
    locale: 'en_PK',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'L_LW7Dtxekn-M81A11zjxYVWGI7LGGoI-bJw02chIc8',
    other: {
      'msvalidate.01': '32107703ABE97F472472231CBA07F2E5',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ListPak',
    url: 'https://listpak.com',
    logo: 'https://listpak.com/logo.png',
    telephone: '+92 334 5636230',
    email: 'info@listpak.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office 303, Evacuee Trust Complex, F-5/1',
      addressLocality: 'Islamabad',
      postalCode: '44000',
      addressCountry: 'PK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92 334 5636230',
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['en', 'ur'],
    },
  }

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KNK59XWQ');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta name="msvalidate.01" content="32107703ABE97F472472231CBA07F2E5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#F8FAFC] text-[#0F172A] pb-16 md:pb-0 min-h-screen selection:bg-blue-500 selection:text-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KNK59XWQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <BottomNav />
        <Toaster position="top-right" richColors />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
