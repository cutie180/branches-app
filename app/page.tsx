import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import HeroSection from '@/components/home/hero-section'
import AboutSection from '@/components/home/about-section'
import StatsSection from '@/components/home/stats-section'
import TrustSection from '@/components/home/trust-section'
import CTASection from '@/components/home/cta-section'
import FAQSection from '@/components/home/faq-section'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pakistan Free Business Directory – PakBizBranches',
  description:
    'Register or submit your business on the premier Pakistan free business directory. Verified contact details, phone numbers, and WhatsApp submission.',
  alternates: {
    canonical: 'https://www.pakbizbranhces.online/',
  },
  openGraph: {
    title: 'Pakistan Free Business Directory – PakBizBranches',
    description:
      'Register or submit your business on the premier Pakistan free business directory. Verified contact details, phone numbers, and WhatsApp submission.',
    url: 'https://www.pakbizbranhces.online/',
    siteName: 'PakBizBranches',
    locale: 'en_PK',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
