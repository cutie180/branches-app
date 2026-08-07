import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
  ArrowLeft, Clock, Calendar, Sparkles, CheckCircle2, Building2, User, 
  HelpCircle, ArrowRight, ShieldCheck, MapPin, Globe, Briefcase, Search, Star
} from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog-data'

export const revalidate = 86400

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS[slug]
  const cleanTitle = post ? post.metaTitle : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const description = post ? post.metaDescription : `Read ${cleanTitle} on ListPak Blog.`

  return {
    title: `${cleanTitle} | ListPak Business Directory`,
    description,
    keywords: post ? [post.focusKeyword, 'Business Directory Pakistan', 'Pakistan Business Directory', 'Local Business Directory', 'Company Directory Pakistan'] : [],
    alternates: {
      canonical: `https://www.listpak.com/blog/${slug}`,
    },
    openGraph: {
      title: `${cleanTitle} | ListPak`,
      description,
      url: `https://www.listpak.com/blog/${slug}`,
      siteName: 'ListPak',
      locale: 'en_PK',
      type: 'article',
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = BLOG_POSTS[slug]

  const title = post ? post.title : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const publishDate = post ? post.date : 'August 7, 2026'
  const readTime = post ? post.readTime : '8 min read'
  const category = post ? post.category : 'Business Guide'

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: post ? post.metaDescription : `Guide on ${title}`,
    author: {
      '@type': 'Organization',
      name: 'ListPak Editorial Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ListPak',
      logo: 'https://www.listpak.com/logo.png',
    },
    datePublished: '2026-08-07',
    mainEntityOfPage: `https://www.listpak.com/blog/${slug}`,
  }

  const faqSchema = post && post.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="bg-[#F8FAFC] text-[#0F172A] font-sans pb-16">
        
        {/* HERO SECTION */}
        <section className="bg-white border-b border-[#E2E8F0] py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" aria-label="Back to All Blog Posts" className="inline-flex items-center gap-2 text-xs font-bold text-[#2563EB] hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Blog Posts</span>
            </Link>

            <div className="flex items-center gap-3 text-xs font-semibold text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full w-fit mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>{category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight mb-6 tracking-tight">
              {title}
            </h1>

            <div className="flex items-center gap-6 text-xs text-slate-500 font-medium pt-4 border-t border-slate-100 flex-wrap">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[#2563EB]" /> ListPak Editorial Team</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {publishDate}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {readTime}</span>
            </div>
          </div>
        </section>

        {/* ARTICLE CONTENT */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-12 shadow-sm space-y-8 text-slate-700 leading-relaxed text-base sm:text-lg">
              
              {slug === 'top-business-directory-websites-pakistan' ? (
                <>
                  {/* Article Intro */}
                  <p className="text-lg font-medium text-slate-800 leading-relaxed bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                    Finding trustworthy businesses online has become more important than ever. Whether you are looking for a nearby restaurant, hospital, software company, real estate agency, electrician, plumber, freelancer, or any other service, a reliable business directory can save time and help you make informed decisions.
                  </p>

                  <p>
                    Business directory websites have become an essential part of Pakistan&apos;s growing digital economy. They connect customers with businesses while giving companies an opportunity to increase their online visibility, attract new customers, and improve their local search rankings.
                  </p>

                  <p>
                    In this comprehensive guide, we&apos;ll explain what business directories are, why they matter, how they benefit both businesses and customers, and what features make a high-quality directory platform.
                  </p>

                  {/* Section 1: What is a Business Directory */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                      What Is a Business Directory?
                    </h2>
                    <p>
                      A business directory is an online platform that organizes businesses into categories, industries, cities, and locations. It allows users to search for companies based on their needs and provides detailed information such as:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <li className="flex items-center gap-2">✓ Business Name</li>
                      <li className="flex items-center gap-2">✓ Address & City</li>
                      <li className="flex items-center gap-2">✓ Phone Number</li>
                      <li className="flex items-center gap-2">✓ Website URL</li>
                      <li className="flex items-center gap-2">✓ Email Contact</li>
                      <li className="flex items-center gap-2">✓ Business Hours</li>
                      <li className="flex items-center gap-2">✓ List of Services</li>
                      <li className="flex items-center gap-2">✓ Customer Reviews & Ratings</li>
                      <li className="flex items-center gap-2">✓ Photos & Media</li>
                      <li className="flex items-center gap-2">✓ Social Media Links</li>
                      <li className="flex items-center gap-2">✓ Maps and Directions</li>
                    </ul>
                    <p>
                      Instead of searching through multiple websites, users can quickly compare businesses in one place.
                    </p>
                  </div>

                  {/* Section 2: Why Business Directories Are Important */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                      Why Business Directories Are Important
                    </h2>
                    <p>
                      Business directories serve as a bridge between customers and businesses.
                    </p>
                    <p>
                      For customers, they make it easier to discover trusted local services. For businesses, they improve online visibility and help generate qualified leads.
                    </p>
                    <p className="font-bold text-[#0F172A]">Some of the biggest advantages include:</p>
                    <ul className="space-y-2 text-sm text-slate-700 pl-4 border-l-4 border-blue-600">
                      <li>• Better local search visibility on Google and search engines</li>
                      <li>• Increased website traffic and direct phone inquiries</li>
                      <li>• More customer inquiries via WhatsApp and call buttons</li>
                      <li>• Stronger online presence and digital entity trust</li>
                      <li>• Higher brand credibility with verified badges</li>
                      <li>• Improved trust through authentic customer reviews</li>
                      <li>• Easier customer discovery across 150+ Pakistani cities</li>
                      <li>• More authoritative citations and backlinks for local SEO</li>
                      <li>• Greater exposure in search engines and AI engines</li>
                    </ul>
                  </div>

                  {/* Section 3: Benefits for Businesses */}
                  <div className="space-y-6 pt-4 border-t border-slate-100">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                      Benefits for Businesses
                    </h2>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-blue-700">Improve Local SEO</h3>
                      <p>
                        Business directories help search engines verify business information, making it easier for customers to find businesses in local search results. Consistent business information (NAP: Name, Address, Phone) across multiple platforms improves search engine trust.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-blue-700">Reach More Customers</h3>
                      <p>
                        People search online before purchasing products or hiring services. A business directory increases the chances of being discovered by new customers actively searching in your city.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-blue-700">Build Trust</h3>
                      <p>
                        Detailed business profiles with contact information, descriptions, photos, and customer reviews create confidence among potential customers.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-blue-700">Generate Quality Leads</h3>
                      <p>
                        Visitors searching a business directory already have buying intent. This means businesses receive highly targeted traffic that is more likely to convert into paying customers.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-blue-700">Increase Brand Visibility</h3>
                      <p>
                        Every business profile acts as an additional online presence that can appear in Google Search and AI-powered search engines like ChatGPT, Gemini, and Perplexity.
                      </p>
                    </div>
                  </div>

                  {/* Section 4: Benefits for Customers */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                      Benefits for Customers
                    </h2>
                    <p>Customers benefit from business directories by:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                      <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">✓ Finding trusted local companies</li>
                      <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">✓ Comparing multiple businesses side-by-side</li>
                      <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">✓ Reading real customer reviews & ratings</li>
                      <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">✓ Viewing direct contact info & WhatsApp links</li>
                      <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">✓ Discovering nearby services in their city</li>
                      <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">✓ Saving time with quick phone connects</li>
                      <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">✓ Making informed purchasing decisions</li>
                    </ul>
                  </div>

                  {/* Section 5: Essential Features of a Great Business Directory */}
                  <div className="space-y-6 pt-4 border-t border-slate-100">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                      Essential Features of a Great Business Directory
                    </h2>
                    <p>A modern directory website should include:</p>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">Advanced Search</h3>
                      <p>Users should be able to search by Business Name, Category, City, Area, Service, and Keywords.</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">Categories</h3>
                      <p>Businesses should be organized into comprehensive categories such as Restaurants, Hospitals, Clinics, Hotels, Schools, Universities, Software Companies, Digital Marketing Agencies, Lawyers, Accountants, Real Estate, Construction, Automotive, Beauty Salons, Gyms, Freelancers, Professionals, Job Seekers, Hiring Companies, Electronics, Shopping, Tourism, and Manufacturing.</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">City Pages</h3>
                      <p>Business directories become more useful when businesses are grouped by city. Examples include Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, Gujranwala, Hyderabad, and Bahawalpur. City-based pages dramatically improve local search visibility.</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">Detailed Business Profiles</h3>
                      <p>Every listing should include business logo, cover image, description, services list, phone number, email, website link, social media profiles, Google Maps coordinates, operating hours, photos, FAQs, and customer reviews.</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">Reviews and Ratings</h3>
                      <p>Customer feedback helps users choose trustworthy businesses while encouraging companies to maintain service quality.</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">Mobile-Friendly Experience & Fast Loading Speed</h3>
                      <p>Most users browse directories using smartphones. A responsive design with optimized loading speed improves usability, user engagement, and Google search engine rankings.</p>
                    </div>
                  </div>

                  {/* Section 6: Why Business Listings Matter for SEO */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                      Why Business Listings Matter for SEO
                    </h2>
                    <p>Business listings provide valuable signals to search engines. Key benefits include:</p>
                    <ul className="space-y-2 text-sm text-slate-700 pl-4 border-l-4 border-emerald-500">
                      <li>• More indexed pages for brand terms</li>
                      <li>• Improved topical relevance in local niches</li>
                      <li>• Stronger entity recognition by search engines</li>
                      <li>• Better local rankings on Google Maps & Search</li>
                      <li>• Increased referral traffic directly to your website</li>
                      <li>• Higher domain authority and brand trust</li>
                      <li>• More opportunities for organic backlinks</li>
                    </ul>
                  </div>

                  {/* Section 7: Choosing the Right Business Directory */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                      Choosing the Right Business Directory
                    </h2>
                    <p>Before listing a business, consider whether the directory offers easy navigation, verified listings, category organization, city pages, complete contact information, customer reviews, search filters, mobile optimization, secure HTTPS browsing, and regular updates.</p>
                  </div>

                  {/* Section 8: The Future of Online Business Directories */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                      The Future of Online Business Directories
                    </h2>
                    <p>Business directories continue to evolve with technology. Modern platforms now incorporate AI-powered search, voice search optimization, smart recommendations, advanced filtering, rich business profiles, interactive maps, verified business badges, and personalized search experiences.</p>
                  </div>

                  {/* Section 9: Why ListPak Is Building the Future */}
                  <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-4 border border-slate-800">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Why ListPak Is Building the Future of Pakistan&apos;s Business Directory
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Pakistan&apos;s digital economy is growing rapidly, creating opportunities for businesses of all sizes to establish a strong online presence. A modern business directory should not only connect customers with businesses but also support professionals, freelancers, startups, hiring companies, and service providers through comprehensive business profiles and powerful search features.
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      ListPak is designed with this vision in mind, offering organized categories, location-based discovery, detailed business listings, and a user-friendly experience that helps businesses reach more customers while making it easier for users to find trusted services across Pakistan.
                    </p>
                  </div>

                  {/* Final Thoughts */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                      Final Thoughts
                    </h2>
                    <p>
                      Business directories have become an essential tool for both consumers and businesses. They simplify the process of discovering reliable companies while helping organizations improve their online visibility, credibility, and local SEO performance.
                    </p>
                    <p>
                      Whether you are searching for a trusted service provider or looking to promote your own business, choosing a well-organized directory with accurate information and user-focused features can make all the difference.
                    </p>
                  </div>

                  {/* Frequently Asked Questions (FAQ) */}
                  <div className="space-y-6 pt-6 border-t border-slate-200">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
                      <HelpCircle className="w-6 h-6 text-blue-600" />
                      <span>Frequently Asked Questions (FAQ)</span>
                    </h2>

                    <div className="space-y-4">
                      {post?.faqs?.map((faq, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                          <h3 className="font-bold text-[#0F172A] text-base sm:text-lg">{faq.question}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Internal Linking Suggestions Navigation Grid */}
                  <div className="pt-8 border-t border-slate-200 space-y-4">
                    <h3 className="text-xl font-extrabold text-[#0F172A]">Explore ListPak Directory</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
                      <Link href="/categories" className="p-3 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl font-bold transition-colors text-center border border-blue-200">Business Categories</Link>
                      <Link href="/search" className="p-3 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl font-bold transition-colors text-center border border-blue-200">Browse Businesses</Link>
                      <Link href="/add-business" className="p-3 bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white rounded-xl font-bold transition-colors text-center border border-amber-200">Add Your Business</Link>
                      <Link href="/professionals" className="p-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl font-bold transition-colors text-center border border-emerald-200">Professional Directory</Link>
                      <Link href="/jobs" className="p-3 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white rounded-xl font-bold transition-colors text-center border border-purple-200">Hiring Companies</Link>
                      <Link href="/cities" className="p-3 bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-colors text-center border border-slate-200">City Directory</Link>
                      <Link href="/blog" className="p-3 bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-colors text-center border border-slate-200">Latest Blogs</Link>
                      <Link href="/contact" className="p-3 bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-colors text-center border border-slate-200">Contact Us</Link>
                      <Link href="/about" className="p-3 bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-colors text-center border border-slate-200">About Us</Link>
                      <Link href="/privacy" className="p-3 bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white rounded-xl font-bold transition-colors text-center border border-slate-200">Privacy Policy</Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-normal text-slate-700 leading-relaxed">
                    Listing your business free on ListPak takes less than 5 minutes and can help you reach thousands of potential customers across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and 150+ cities in Pakistan.
                  </p>

                  <h2 className="text-2xl font-bold text-[#0F172A] pt-4">1. Why Free Business Listing is Essential for Pakistani Businesses</h2>
                  <p>
                    In 2026, over 90% of Pakistani consumers search for local products and services on their smartphones before making a purchase or visiting a store.
                  </p>

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
                </>
              )}

            </article>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
