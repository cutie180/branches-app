import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'
import BottomNav from '@/components/bottom-nav'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Free Business Listing Website Pakistan | List Your Business Free - ListPak',
  description: 'ListPak is Pakistan\'s #1 free business listing website & free directory. List your business free forever, post jobs, find employees. 100% free with high Google ranking.',
  metadataBase: new URL('https://listpak.com/'),
  icons: {
    icon: [{ url: '/favicon.png', sizes: 'any' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Free Business Listing Website Pakistan | ListPak Directory',
    description: 'Pakistan\'s #1 free business listing website. List your business free forever, reach thousands of customers across Karachi, Lahore, Islamabad.',
    url: 'https://listpak.com/',
    siteName: 'ListPak',
    locale: 'en_PK',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-[#0F172A] pb-16 md:pb-0">
        {children}
        <BottomNav />
        <SpeedInsights />
      </body>
    </html>
  )
}
