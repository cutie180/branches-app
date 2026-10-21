import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CATEGORIES } from '@/lib/data'
import Link from 'next/link'
import { Sparkles, ArrowRight, Building2, HelpCircle } from 'lucide-react'
import { Metadata } from 'next'
import { getCategorySeoOverride } from '@/lib/category-seo-overrides'

const override = getCategorySeoOverride('categories')

export const metadata: Metadata = {
  title: override?.title || 'Business Categories in Pakistan – Browse by Industry | ListPak',
  description:
    override?.description ||
    'Browse Pakistani businesses by category: restaurants, technology, healthcare, real estate, finance, automotive, travel & more — with city filters.',
  alternates: { canonical: 'https://www.listpak.com/categories/' },
  openGraph: {
    title: override?.title || 'Business Categories in Pakistan – Browse by Industry | ListPak',
    description:
      override?.description ||
      'Browse Pakistani businesses by category: restaurants, technology, healthcare, real estate, finance, automotive, travel & more — with city filters.',
    url: 'https://www.listpak.com/categories/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: override?.title || 'Business Categories in Pakistan – Browse by Industry | ListPak',
    description:
      override?.description ||
      'Browse Pakistani businesses by category: restaurants, technology, healthcare, real estate, finance, automotive, travel & more — with city filters.',
  },
}

export default function CategoriesIndexPage() {
  const faqSchema =
    override?.faqs && override.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: override.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Category Taxonomy Hub</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Business Categories in Pakistan – Browse by Industry
          </h1>
          <p className="text-slate-400 text-sm">
            Explore available businesses, services, employers, and professionals across Pakistan by industry and directory category.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-10">
        {/* Visible Intro Paragraph */}
        {override?.intro && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-2">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Browse Pakistani Businesses by Industry
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {override.intro}
            </p>
          </section>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-200 space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    Explore listings
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Explore Category</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Visible FAQ Section matching FAQPage JSON-LD */}
        {override?.faqs && override.faqs.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                Frequently Asked Questions
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                Frequently Asked Questions About Business Categories in Pakistan
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Verified answers to common questions about directory categories and business listings in Pakistan.
              </p>
            </div>

            <div className="space-y-4">
              {override.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] rounded-xl p-5 border border-slate-200/80 space-y-2"
                >
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
