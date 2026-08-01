import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Target, Users, Globe, Award, ShieldCheck, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: "About ListPak – Pakistan's #1 Free Business Listing Website & Directory",
  description: "ListPak is Pakistan's leading free business listing website and free directory platform. Founded in 2024, serving 10,000+ businesses across Karachi, Lahore, Islamabad with 100% free listings forever.",
  keywords: "about ListPak, ListPak company, free business listing website Pakistan, ListPak story, Pakistan business directory company, free directory website founder, ListPak team",
  alternates: {
    canonical: 'https://listpak.com/about-us',
  },
}

const STATS = [
  { number: "10,000+", label: "Active Business Listings Free" },
  { number: "150+", label: "Cities Covered Across Pakistan" },
  { number: "50+", label: "Business Categories" },
  { number: "50,000+", label: "Registered Users" },
  { number: "100,000+", label: "Monthly Website Visitors" },
  { number: "100%", label: "Free Forever – No Hidden Charges" }
]

const MILESTONES = [
  { date: "January 2024", title: "ListPak Founded", desc: "ListPak company incorporated in Lahore with mission to create 100% free business listing website." },
  { date: "March 2024", title: "ListPak.com Launches", desc: "Official launch of ListPak free business directory with 100+ initial listings from Lahore, Karachi, and Islamabad." },
  { date: "June 2024", title: "1,000+ Free Listings", desc: "Reached 1,000 active business listings across Pakistan. Launched free job portal feature." },
  { date: "December 2024", title: "5,000+ Businesses", desc: "Grew to 5,000+ free business listings in 50+ cities across Pakistan." },
  { date: "June 2025", title: "10,000+ Active Listings", desc: "Crossed 10,000 active listings across 150+ cities and 50+ business categories." },
  { date: "2026 (Current)", title: "Pakistan's #1 Free Directory", desc: "Recognized as Pakistan's leading free business listing website with 100,000+ monthly visitors." }
]

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ListPak',
    url: 'https://listpak.com/',
    logo: 'https://listpak.com/logo.png',
    description: "Pakistan's #1 free business listing website and free directory platform",
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'Pakistan'
    }
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main className="bg-[#F4F7FC] text-[#0F172A] font-sans pb-16">
        
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 sm:py-20 border-b border-slate-800 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              About ListPak – Pakistan&apos;s #1 Free Business Listing Website & Directory
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
              ListPak is Pakistan&apos;s leading free business listing website and free directory platform, connecting businesses, employers, and job seekers across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and 150+ cities throughout Pakistan. Founded in 2024 with a mission to democratize online visibility for Pakistani businesses, ListPak has grown to become the country&apos;s largest free business directory with over 10,000 active business listings and 50,000+ registered users.
            </p>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-16 bg-white border-b border-[#D9E2F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F4F7FC] border border-[#D9E2F1] rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Our Mission</h2>
                <p className="text-sm text-[#475569] leading-relaxed">
                  To empower every business in Pakistan with free online visibility, enabling them to reach customers, grow their revenue, and create jobs – without the barrier of expensive advertising or paid directory listings. We&apos;re committed to making ListPak the most accessible, user-friendly, and effective free business listing website in Pakistan.
                </p>
              </div>

              <div className="bg-[#F4F7FC] border border-[#D9E2F1] rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Our Vision</h2>
                <p className="text-sm text-[#475569] leading-relaxed">
                  To become Pakistan&apos;s #1 free business listing website and free directory platform, connecting 1 million+ businesses with customers by 2030. We envision a Pakistan where every business, regardless of size or budget, can compete online and thrive in the digital economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-16 bg-[#EEF4FF] border-b border-[#D9E2F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-12">ListPak by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {STATS.map((s, idx) => (
                <div key={idx} className="bg-white border border-[#D9E2F1] rounded-2xl p-6 shadow-sm">
                  <div className="text-3xl font-extrabold text-[#2563EB]">{s.number}</div>
                  <div className="text-xs text-[#64748B] font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="py-16 bg-white border-b border-[#D9E2F1]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-[#475569] leading-relaxed space-y-6">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">Our Story – How ListPak Became Pakistan&apos;s Largest Free Directory</h2>
            <p className="text-sm sm:text-base">
              ListPak was founded in early 2024 by a team of Pakistani entrepreneurs and tech professionals who recognized a critical gap in Pakistan&apos;s digital ecosystem. While established businesses in Karachi, Lahore, and Islamabad could afford expensive Google Ads, Facebook marketing, and paid directory listings, small and medium-sized businesses across Pakistan struggled to get online visibility without spending money they didn&apos;t have.
            </p>
            <p className="text-sm sm:text-base">
              The founders asked a simple but powerful question: &quot;What if we created a 100% free business listing website where any business in Pakistan could list for free, forever, with no hidden charges?&quot;
            </p>
            <p className="text-sm sm:text-base">
              After months of development, ListPak launched in March 2024. Today, ListPak hosts over 10,000 active business listings across 50+ categories and 150+ cities in Pakistan. ListPak will always be 100% free for all users.
            </p>
          </div>
        </section>

        {/* MILESTONES */}
        <section className="py-16 bg-[#F4F7FC] border-b border-[#D9E2F1]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#0F172A] text-center mb-12">ListPak Growth Milestones</h2>
            <div className="space-y-6">
              {MILESTONES.map((m, idx) => (
                <div key={idx} className="bg-white border border-[#D9E2F1] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-start">
                  <span className="px-3 py-1 bg-blue-50 text-[#2563EB] font-bold text-xs rounded-full shrink-0">{m.date}</span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base mb-1">{m.title}</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#0F172A]">Join 10,000+ Businesses Already Growing on ListPak</h2>
            <p className="mt-2 text-xs text-[#64748B]">It&apos;s 100% free forever. No credit card required.</p>
            <Link
              href="/add-business"
              className="mt-6 inline-block px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-colors text-sm shadow-md"
            >
              Create Your Free Business Listing Now
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
