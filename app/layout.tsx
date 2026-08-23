import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import ClientProviders from '@/components/client-providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '600', '700'],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
  weight: ['600', '700'],
})

export const metadata: Metadata = {
  title: "ListPak — Pakistan Business Directory, Jobs & Professionals",
  description: "Find Pakistani businesses, jobs, professionals, and companies by category and city on ListPak.",
  metadataBase: new URL('https://www.listpak.com'),
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
    title: "ListPak — Pakistan Business Directory, Jobs & Professionals",
    description: "Find Pakistani businesses, jobs, professionals, and companies by category and city on ListPak.",
    url: 'https://www.listpak.com/',
    siteName: 'ListPak',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ListPak — Pakistan Business Directory, Jobs & Professionals",
    description: "Find Pakistani businesses, jobs, professionals, and companies by category and city on ListPak.",
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
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ListPak',
    url: 'https://www.listpak.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.listpak.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ListPak',
    url: 'https://www.listpak.com',
    logo: 'https://www.listpak.com/logo.png',
    telephone: '+92 334 5636230',
    email: 'admin@listpak.com',
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
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <meta name="msvalidate.01" content="32107703ABE97F472472231CBA07F2E5" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#F8FAFC] text-[#0F172A] pb-16 md:pb-0 min-h-screen selection:bg-blue-500 selection:text-white">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KNK59XWQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Deferred Non-Blocking Scripts via Next/Script */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "y0jpwahv9h");
            `,
          }}
        />
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KNK59XWQ');`,
          }}
        />
        <Script
          id="gtag-js"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-N09JN0NJ2R"
        />
        <Script
          id="gtag-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N09JN0NJ2R');
            `,
          }}
        />

        {children}
        <ClientProviders />
      </body>
    </html>
  )
}
