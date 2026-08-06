import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, CheckCircle2, Building2, User, HelpCircle } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cleanTitle = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return {
    title: `${cleanTitle} | ListPak Business Blog`,
    description: `Read ${cleanTitle} on ListPak Blog. Expert guide on free business listing, local SEO, and Pakistan business growth.`,
    alternates: {
      canonical: `https://www.listpak.com/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cleanTitle = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: cleanTitle,
    description: `Expert guide on ${cleanTitle} for Pakistani businesses`,
    author: {
      '@type': 'Organization',
      name: 'ListPak Editorial Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ListPak',
      logo: 'https://www.listpak.com/logo.png',
    },
    datePublished: '2026-08-01',
    mainEntityOfPage: `https://www.listpak.com/blog/${slug}`,
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <main className="bg-[#F8FAFC] text-[#0F172A] font-sans pb-16">
        
        {/* HERO SECTION */}
        <section className="bg-white border-b border-[#E2E8F0] py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-[#2563EB] hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to All Blog Posts
            </Link>

            <div className="flex items-center gap-3 text-xs font-semibold text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full w-fit mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Free Business Listing & Growth Guide</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight mb-6">
              {cleanTitle}
            </h1>

            <div className="flex items-center gap-6 text-xs text-slate-500 font-medium pt-4 border-t border-slate-100">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[#2563EB]" /> ListPak SEO Team</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> August 1, 2026</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> 8 min read</span>
            </div>
          </div>
        </section>

        {/* ARTICLE CONTENT */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 shadow-sm space-y-6 text-slate-600 leading-relaxed text-base sm:text-lg">
              
              <p className="text-lg font-normal text-slate-700 leading-relaxed">
                Listing your business free on ListPak takes less than 5 minutes and can help you reach thousands of potential customers across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and 150+ cities in Pakistan. In this comprehensive guide, we show you step-by-step how to optimize your listing for maximum visibility on Google search and ListPak local directory.
              </p>

              <h2 className="text-2xl font-bold text-[#0F172A] pt-4">1. Why Free Business Listing is Essential for Pakistani Businesses</h2>
              <p>
                In 2026, over 90% of Pakistani consumers search for local products and services on their smartphones before making a purchase or visiting a store. If your business is not listed on a high-authority directory like ListPak, you are losing customers to competitors who are visible online.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 pl-4 border-l-2 border-[#2563EB]">
                <li>✓ 100% Free Forever – No hidden fees, monthly subscriptions, or credit card requirements.</li>
                <li>✓ Page 1 Google Ranking – High domain authority helps your business rank for local keywords.</li>
                <li>✓ Direct WhatsApp & Click-to-Call – Connect directly with potential customers in one click.</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#0F172A] pt-4">2. Step-by-Step Guide to Listing Your Business Free</h2>
              <p>
                To create your free business listing, simply visit the ListPak Add Business page, enter your business name, select your primary category (e.g. Restaurants, Technology, Healthcare), choose your city, and provide your address and phone number.
              </p>

              <div className="bg-[#EEF4FF] border border-[#D9E2F1] p-6 rounded-xl text-sm space-y-2 text-[#0F172A]">
                <div className="font-bold text-base">Key Optimization Tip:</div>
                <p className="text-slate-600">
                  Include relevant local keywords in your business description (e.g. &quot;Best fast food restaurant in Gulshan Karachi&quot; or &quot;Expert web developer in Gulberg Lahore&quot;) to rank higher in local search results.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-[#0F172A] pt-4">3. Verification & Getting Customer Inquiries</h2>
              <p>
                Once submitted, your listing is live instantly on ListPak. Our team conducts a routine verification to award the &quot;✓ Verified&quot; badge, which increases customer conversion rates by 3x.
              </p>

              {/* Callout Box */}
              <div className="mt-8 pt-8 border-t border-slate-200 text-center bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0]">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Ready to List Your Business Free?</h3>
                <p className="text-xs text-slate-600 mb-6">Join 10,000+ businesses already growing on Pakistan&apos;s #1 free directory.</p>
                <Link
                  href="/add-business"
                  className="px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-colors shadow-md text-sm inline-block"
                >
                  Create Your Free Business Listing Now
                </Link>
              </div>

            </article>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
