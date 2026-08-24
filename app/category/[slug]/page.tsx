import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CATEGORIES } from '@/lib/data'
import { getAllBusinesses } from '@/lib/db-service'
import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, Star, ArrowRight, ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import { getCategorySeoCopy } from '@/lib/seo-directory-content'

export const revalidate = 86400 // 24-hour ISR revalidation
export const dynamicParams = false

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.id,
  }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const cat = CATEGORIES.find(c => c.id === params.slug)
  if (!cat) {
    return {
      title: 'Category not found | ListPak',
      robots: { index: false, follow: false },
    }
  }
  return {
    title: `${cat.name} in Pakistan | ListPak Directory`,
    description: `Find ${cat.name} businesses, locations, services, and current directory information across Pakistan.`,
    openGraph: {
      title: `${cat.name} in Pakistan | ListPak Directory`,
      description: `Find ${cat.name} businesses, locations, services, and current directory information across Pakistan.`,
      url: `https://www.listpak.com/category/${cat.id}`,
      type: 'website',
    },
    alternates: { canonical: `https://www.listpak.com/category/${cat.id}` },
  }
}

export default async function CategoryDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const cat = CATEGORIES.find(c => c.id === params.slug)
  if (!cat) notFound()

  const allApproved = await getAllBusinesses(false)
  const businesses = allApproved.filter(
    b => b.categoryId === cat.id || b.category.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0])
  )
  const seoCopy = getCategorySeoCopy(cat.id)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} Businesses in Pakistan`,
    description: cat.desc,
    url: `https://www.listpak.com/category/${cat.id}`,
    isPartOf: { '@type': 'WebSite', name: 'ListPak', url: 'https://www.listpak.com' },
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <BreadcrumbSchema pathname={`/category/${cat.id}`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-[#0F172A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-400"><Link href="/" className="hover:text-white underline">Home</Link><span className="mx-2">/</span><Link href="/categories" className="hover:text-white underline">Categories</Link><span className="mx-2">/</span><span>{cat.name}</span></nav>
          <Link href="/categories" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{cat.name} in Pakistan</h1>
            <p className="text-slate-400 text-sm max-w-2xl">{cat.desc}. Browse available profiles by city, services, and contact details, and verify important information before making a decision.</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">
        {seoCopy && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">{seoCopy.intro}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{seoCopy.guidance}</p>
            <nav aria-label="Related ListPak guides" className="flex flex-wrap gap-2">
              {seoCopy.links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-slate-900">
              {cat.name} Businesses and Services ({businesses.length})
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
                      <Image src={biz.logo} alt={biz.name} width={48} height={48} loading="lazy" sizes="48px" className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
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
                      <span>{biz.reviewCount > 0 && biz.rating > 0 ? biz.rating : 'No rating yet'}</span>
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
