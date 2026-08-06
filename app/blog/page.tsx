import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Clock, ArrowRight, Sparkles, TrendingUp, ShieldCheck, Briefcase, FileText, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ListPak Blog – Free Business Listing Tips, SEO Guides & Pakistan Business News',
  description: 'Read ListPak blog for free business listing tips, local SEO guides, job posting strategies, and Pakistan business news. Expert advice for businesses in Karachi, Lahore, Islamabad.',
  keywords: 'ListPak blog, free business listing tips, local SEO Pakistan, business directory guide, job posting tips Pakistan, Pakistan business news, online business marketing',
  alternates: {
    canonical: 'https://www.listpak.com/blog',
  },
}

export const FEATURED_POSTS = [
  {
    slug: 'how-to-list-business-free-listpak-guide',
    title: 'How to List Your Business Free on ListPak – Complete Step-by-Step Guide 2026',
    excerpt: 'Learn exactly how to create your free business listing on ListPak in 5 minutes. This comprehensive guide covers everything from account creation to optimization tips for maximum visibility on Google.',
    category: 'Free Business Listing Guide',
    date: 'August 1, 2026',
    readTime: '8 min read',
    icon: Sparkles
  },
  {
    slug: 'local-seo-pakistan-businesses-google-ranking',
    title: 'Local SEO for Pakistani Businesses – Rank #1 on Google in Your City',
    excerpt: 'Discover proven local SEO strategies to rank your business on page 1 of Google for searches like "best restaurant in Lahore" or "plumber in Karachi". Includes free listing optimization tips.',
    category: 'Local SEO Pakistan',
    date: 'July 28, 2026',
    readTime: '12 min read',
    icon: TrendingUp
  },
  {
    slug: 'free-job-posting-pakistan-hire-employees',
    title: 'Free Job Posting in Pakistan – How to Hire Employees Without Spending Money',
    excerpt: 'Complete guide to posting jobs free on ListPak job portal. Learn how to write compelling job descriptions, attract qualified candidates, and hire employees in Pakistan, Dubai, Germany.',
    category: 'Free Job Portal Guide',
    date: 'July 25, 2026',
    readTime: '10 min read',
    icon: Briefcase
  }
]

export const RECENT_POSTS = [
  {
    slug: 'best-free-business-listing-websites-pakistan-2026',
    title: '10 Best Free Business Listing Websites in Pakistan 2026 – Complete Comparison',
    excerpt: 'Compare top 10 free business listing websites in Pakistan including ListPak. See which directory gives you the best Google ranking and customer reach.',
    category: 'Free Business Listing',
    date: 'July 30, 2026',
    readTime: '9 min read',
  },
  {
    slug: 'first-100-customers-free-business-directory',
    title: 'How to Get Your First 100 Customers Using Free Business Directory Listings',
    excerpt: 'Proven strategies to attract your first 100 customers using free business directories like ListPak. Includes keyword strategies and conversion tactics.',
    category: 'Business Growth',
    date: 'July 29, 2026',
    readTime: '11 min read',
  },
  {
    slug: 'google-my-business-vs-listpak-comparison',
    title: 'Google My Business vs ListPak – Which Free Listing is Better for Pakistani Businesses?',
    excerpt: 'Detailed comparison of Google My Business and ListPak free business listing. Learn which platform gives better visibility and customer calls in Pakistan.',
    category: 'Local SEO Pakistan',
    date: 'July 26, 2026',
    readTime: '8 min read',
  },
  {
    slug: 'free-job-posting-pakistan-5-platforms',
    title: 'Free Job Posting Pakistan – 5 Platforms to Hire Employees Without Paying',
    excerpt: 'Discover 5 free job posting platforms in Pakistan including ListPak job portal. Learn how to post jobs free and hire without recruitment fees.',
    category: 'Free Job Portal Guide',
    date: 'July 24, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'local-seo-keywords-pakistani-businesses',
    title: 'Local SEO Keywords for Pakistani Businesses – 100+ High-Volume Keywords',
    excerpt: 'Complete list of 100+ high-volume local SEO keywords for businesses in Karachi, Lahore, Islamabad. Includes search volume and optimization tips.',
    category: 'Local SEO Pakistan',
    date: 'July 22, 2026',
    readTime: '15 min read',
  },
  {
    slug: 'verify-business-listpak-step-by-step',
    title: 'How to Verify Your Business on ListPak – Step-by-Step Verification Guide',
    excerpt: 'Learn how to get the "✓ Verified" badge on your ListPak business listing. Verification increases customer trust by 3x and improves search ranking.',
    category: 'Free Business Listing Tips',
    date: 'July 20, 2026',
    readTime: '6 min read',
  }
]

const CATEGORIES = [
  { name: 'Free Business Listing Tips', count: '45 articles' },
  { name: 'Local SEO Pakistan', count: '38 articles' },
  { name: 'Free Job Posting Guide', count: '22 articles' },
  { name: 'Pakistan Business News', count: '56 articles' },
  { name: 'Digital Marketing Pakistan', count: '34 articles' },
  { name: 'Success Stories', count: '28 articles' },
]

export default function BlogPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ListPak Blog – Free Business Listing Tips & Pakistan Business News',
    url: 'https://www.listpak.com/blog',
    description: 'Expert guides on free business listing, local SEO, job posting, and growing your business in Pakistan',
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <main className="bg-[#F8FAFC] text-[#0F172A] font-sans pb-16">
        
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 sm:py-24 border-b border-slate-800 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>ListPak Knowledge Base & Business Guides</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              ListPak Blog – Business Listing Tips, SEO Guides & News
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              Your go-to resource for free business listing tips, local SEO strategies, job posting guides, and the latest Pakistan business growth news. Expert advice for businesses across Karachi, Lahore, Islamabad, and all cities.
            </p>
          </div>
        </section>

        {/* FEATURED POSTS */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Featured Guides & Must-Read Articles</h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Master free business listings and rank #1 on Google in your city.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURED_POSTS.map((post, idx) => {
                const IconComp = post.icon
                return (
                  <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 shadow-sm hover:border-[#2563EB] hover:shadow-xl transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full">{post.category}</span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors leading-snug">{post.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">{post.excerpt}</p>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1.5 pt-4 border-t border-slate-200"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CATEGORIES CHIPS */}
        <section className="py-12 bg-[#EEF4FF] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#0F172A]">Browse Blog Categories</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
              {CATEGORIES.map((cat, idx) => (
                <div key={idx} className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm hover:border-[#2563EB] transition-all">
                  <div className="font-bold text-[#0F172A] text-xs sm:text-sm mb-1">{cat.name}</div>
                  <div className="text-[10px] text-[#2563EB] font-semibold">{cat.count}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECENT POSTS GRID */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Latest Articles & Growth Tips</h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Updated weekly with new guides, local SEO strategies, and Pakistan business news.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RECENT_POSTS.map((post, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-bold text-[#2563EB]">{post.category}</span>
                      <span className="text-slate-400 font-medium">{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-base mb-2 leading-snug">{post.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">{post.excerpt}</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200 text-xs">
                    <span className="text-slate-400">{post.date}</span>
                    <Link href={`/blog/${post.slug}`} className="font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1">
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-md text-center">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Subscribe to ListPak Business Newsletter</h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">Get weekly free business listing tips, SEO strategies, and Pakistan business news delivered to your inbox.</p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-colors shadow-md text-sm shrink-0"
                >
                  Subscribe Free
                </button>
              </form>
              <p className="text-[10px] text-slate-400 mt-3">100% free forever. No spam, unsubscribe anytime with one click.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
