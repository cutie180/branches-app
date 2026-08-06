import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CATEGORIES } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'
import Link from 'next/link'
import { ShieldCheck, Star, ArrowRight, ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'

export const revalidate = 86400 // 24-hour ISR revalidation

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.id,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const cat = CATEGORIES.find(c => c.id === params.slug)
  const title = cat ? `Best ${cat.name} in Pakistan: ListPak Directory` : 'Category: ListPak'
  const description = cat ? `Find verified ${cat.name} businesses, phone numbers, locations, and customer reviews across Pakistan.` : 'Browse verified Pakistani businesses.'
  return { 
    title, 
    description,
    alternates: {
      canonical: `https://www.listpak.com/category/${params.slug}`
    }
  }
}

export default async function CategoryDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const cat = CATEGORIES.find(c => c.id === params.slug) || CATEGORIES[0]

  const allApproved = await getAllBusinesses(false)
  const businesses = allApproved.filter(
    b => b.categoryId === cat.id || b.category.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0])
  )

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} Businesses in Pakistan`,
    description: cat.desc,
    url: `https://www.listpak.com/category/${cat.id}`
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-[#0F172A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link href="/categories" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{cat.name} in Pakistan</h1>
          <p className="text-slate-400 text-sm max-w-2xl">{cat.desc}</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-slate-900">
            Verified {cat.name} Companies ({businesses.length})
          </h2>
          <Link href={`/search?category=${encodeURIComponent(cat.name)}`} className="text-xs font-bold text-blue-600 hover:underline">
            View in Advanced Search &rarr;
          </Link>
        </div>

        {businesses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <p className="text-slate-600 text-sm font-semibold">No businesses currently listed under this category.</p>
            <Link href="/add-business" className="inline-block px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-xl">
              Be the first to list your business free!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businesses.map((biz) => (
              <div key={biz.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={biz.logo} alt={biz.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
                      <div>
                        <Link href={`/business/${biz.slug}`} className="font-bold text-slate-900 text-base hover:text-blue-600 flex items-center gap-1.5">
                          <span>{biz.name}</span>
                          {biz.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                        </Link>
                        <p className="text-xs text-slate-500">{biz.city}, Pakistan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-700 text-xs font-bold bg-amber-50 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>{biz.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{biz.description}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end">
                  <Link href={`/business/${biz.slug}`} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
