import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Target, Globe, ShieldCheck, Award, TrendingUp, Users, HeartHandshake, Sparkles, CheckCircle2, ArrowRight, Building2, Code2, Headphones, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: "About ListPak – Pakistan's #1 Free Business Listing Website & Directory",
  description: "ListPak is Pakistan's leading free business listing website and free directory platform. Founded in 2024, serving 10,000+ businesses across Karachi, Lahore, Islamabad with 100% free listings forever.",
  keywords: "about ListPak, ListPak company, free business listing website Pakistan, ListPak story, Pakistan business directory company, free directory website founder, ListPak team",
  alternates: {
    canonical: 'https://www.listpak.com/about/',
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

const CORE_VALUES = [
  { title: "100% Free Forever", desc: "We believe in 100% free access for all Pakistani businesses. No premium plans, no hidden fees, no paywalls.", icon: ShieldCheck },
  { title: "Customer First", desc: "Every feature we build is guided by what brings maximum value to business owners, job seekers, and employers.", icon: HeartHandshake },
  { title: "Transparency", desc: "Honest and clear about our free directory services, policies, and commitment to keeping ListPak free forever.", icon: Sparkles },
  { title: "Continuous Innovation", desc: "We continuously improve our local directory with fast search, responsive UI, and local SEO tools.", icon: TrendingUp },
  { title: "Inclusive Growth", desc: "Serving businesses of all sizes from small shops in rural towns to large tech firms in Karachi, Lahore, and Islamabad.", icon: Users },
  { title: "Verified Quality", desc: "Manual quality checks on listings to prevent spam, maintain accuracy, and build high customer trust.", icon: CheckCircle2 },
]

const TEAM_MEMBERS = [
  { name: "ListPak Leadership Team", role: "Co-Founders & Directors", desc: "Experienced Pakistani tech entrepreneurs with backgrounds in software engineering, digital marketing, and business strategy.", icon: Building2 },
  { name: "Engineering & Product", role: "Software Engineers", desc: "Expert Next.js, React, and cloud engineers building Pakistan's fastest local search directory platform.", icon: Code2 },
  { name: "Customer Support", role: "Business & Job Portal Support", desc: "Dedicated support team in Lahore, Karachi, and Islamabad fluent in English, Urdu, and regional languages.", icon: Headphones },
  { name: "Content & SEO Team", role: "SEO & Content Specialists", desc: "SEO experts dedicated to driving page 1 Google rankings for Pakistani businesses listed on ListPak.", icon: FileText },
]

const MILESTONES = [
  { date: "January 2024", title: "ListPak Founded", desc: "ListPak incorporated in Lahore with a mission to build Pakistan's #1 free business directory." },
  { date: "March 2024", title: "ListPak.com Official Launch", desc: "Platform went live with initial 100+ business listings from Lahore, Karachi, and Islamabad." },
  { date: "June 2024", title: "1,000+ Free Business Listings", desc: "Crossed 1,000 active listings across Pakistan and launched the free job portal feature." },
  { date: "December 2024", title: "5,000+ Businesses in 50+ Cities", desc: "Expanded directory coverage to 50+ cities across Punjab, Sindh, KPK, and Balochistan." },
  { date: "June 2025", title: "10,000+ Active Listings", desc: "Reached 10,000 active business listings across 150+ cities and 50+ business categories." },
  { date: "2026 (Current)", title: "Pakistan's #1 Free Directory", desc: "Serving 100,000+ monthly visitors with a 4.8/5 star rating on Google Reviews." }
]

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ListPak',
    url: 'https://www.listpak.com/',
    logo: 'https://www.listpak.com/logo.png',
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
      <main className="bg-[#F8FAFC] text-[#0F172A] font-sans pb-16">
        
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 sm:py-24 border-b border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>✓ 100% Free Forever Business Directory Pakistan</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              About ListPak – Pakistan&apos;s #1 Free Business Directory
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              ListPak is Pakistan&apos;s leading free business listing website and free directory platform, connecting local businesses, employers, and job seekers across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and 150+ cities nationwide. Founded in 2024 to democratize online visibility, ListPak empowers Pakistani businesses to get discovered without paying expensive directory fees.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/add-business"
                className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl shadow-lg transition-all text-base inline-flex items-center gap-2"
              >
                <span>List Your Business Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-base shadow-md"
              >
                Contact Support Team
              </Link>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-12 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              {STATS.map((s, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB]">{s.number}</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Our Mission & Vision</h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Empowering every Pakistani business with free online presence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6 shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To empower every business in Pakistan with free online visibility, enabling them to reach customers, grow revenue, and create jobs – without the barrier of expensive advertising or paid directory listings. We are committed to making ListPak the most accessible, user-friendly, and effective free business listing website in Pakistan.
                </p>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-6 shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To become Pakistan&apos;s #1 free business directory platform, connecting 1 million+ businesses with customers by 2030. We envision a Pakistan where every business, regardless of size or budget, can compete online and thrive in the digital economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Our Core Values</h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">The principles that guide Pakistan&apos;s largest free business directory.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CORE_VALUES.map((val, idx) => {
                const IconComp = val.icon
                return (
                  <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:border-[#2563EB] transition-all">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-lg mb-2">{val.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* OUR STORY (Soft Blue Depth #EEF4FF) */}
        <section className="py-16 sm:py-20 bg-[#EEF4FF] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0F172A] mb-6">
                  Our Story – How ListPak Became Pakistan&apos;s Largest Free Directory
                </h2>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <p>
                    ListPak was founded in early 2024 by a team of Pakistani entrepreneurs and tech professionals who recognized a critical gap in Pakistan&apos;s digital ecosystem. While established businesses in Karachi, Lahore, and Islamabad could afford expensive Google Ads, Facebook marketing, and paid directory listings, small and medium-sized businesses across Pakistan struggled to get online visibility.
                  </p>
                  <p>
                    Traditional business directories charged Rs. 5,000 to Rs. 50,000 per year for basic listings – pricing out 90% of Pakistani small businesses. The ListPak team asked a simple question: <strong className="text-[#0F172A]">&quot;What if any business in Pakistan could list for free, forever, with zero hidden charges?&quot;</strong>
                  </p>
                  <p>
                    Today, ListPak hosts over 10,000 active business listings across 50+ categories and 150+ cities in Pakistan, helping thousands of businesses grow online every day.
                  </p>
                </div>
              </div>

              {/* Company Info Box */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-lg space-y-6">
                <h3 className="font-bold text-[#0F172A] text-xl border-b border-slate-100 pb-4">ListPak Platform Highlights</h3>
                
                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Headquarters</span>
                    <span className="font-bold text-[#0F172A]">Lahore, Punjab, Pakistan</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Regional Support Offices</span>
                    <span className="font-bold text-[#0F172A]">Karachi & Islamabad</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Service Coverage</span>
                    <span className="font-bold text-[#0F172A]">150+ Cities Nationwide</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Pricing Model</span>
                    <span className="font-bold text-[#16A34A] bg-emerald-50 px-2.5 py-0.5 rounded-full">100% Free Forever</span>
                  </div>
                </div>

                <Link
                  href="/add-business"
                  className="block text-center py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md text-sm"
                >
                  Join 10,000+ Listed Businesses Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-12">Meet the ListPak Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM_MEMBERS.map((tm, idx) => {
                const IconComp = tm.icon
                return (
                  <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-sm text-left">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-base mb-0.5">{tm.name}</h3>
                    <span className="text-xs font-bold text-[#2563EB] block mb-3">{tm.role}</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{tm.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* MILESTONES */}
        <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#0F172A] text-center mb-12">ListPak Growth Timeline</h2>
            
            <div className="space-y-6">
              {MILESTONES.map((m, idx) => (
                <div key={idx} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-start">
                  <span className="px-3.5 py-1 bg-blue-50 text-[#2563EB] font-bold text-xs rounded-full shrink-0">{m.date}</span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base mb-1">{m.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 bg-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Join 10,000+ Businesses Already Growing on ListPak</h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600">ListPak is 100% free forever. No credit card required, no hidden fees.</p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/add-business"
                className="px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-colors text-sm shadow-md"
              >
                Create Your Free Business Listing Now
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
