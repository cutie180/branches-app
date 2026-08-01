import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import { Search, MapPin, CheckCircle, ArrowRight, Building2, Briefcase, UserCheck, ShieldCheck, TrendingUp, PhoneCall, Sparkles, HelpCircle, Check, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Business Listing Website Pakistan | List Your Business Free - ListPak',
  description: 'ListPak is Pakistan\'s #1 free business listing website & free directory. List your business free forever, post jobs, find employees. 100% free with high Google ranking.',
  keywords: 'free business listing website, free directory website Pakistan, list business free, Pakistan business directory, free business directory, job portal Pakistan, local business listing, online business listing Pakistan',
  alternates: {
    canonical: 'https://listpak.com/',
  },
  openGraph: {
    title: 'Free Business Listing Website Pakistan | ListPak Directory',
    description: 'Pakistan\'s #1 free business listing website. List your business free forever, reach thousands of customers across Karachi, Lahore, Islamabad.',
    url: 'https://listpak.com/',
    siteName: 'ListPak',
    images: [{ url: 'https://listpak.com/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Business Listing Website Pakistan | ListPak',
    description: 'List your business free on Pakistan\'s fastest-growing directory. 100% free forever.',
    images: ['https://listpak.com/og-image.jpg'],
  },
}

const CATEGORIES = [
  { name: 'Retail & Shopping', count: '1,200+ free business listings', desc: 'Find local shops, boutiques, and retail stores across Pakistan' },
  { name: 'Restaurants & Food', count: '850+ free listings', desc: 'Search restaurants, cafes, food delivery services near you' },
  { name: 'Healthcare & Medical', count: '620+ verified listings', desc: 'Hospitals, clinics, doctors, pharmacies in your city' },
  { name: 'Education & Schools', count: '540+ business directory entries', desc: 'Schools, colleges, tuition centers, training institutes' },
  { name: 'Automotive Services', count: '480+ local business listings', desc: 'Car dealers, mechanics, auto parts, car wash services' },
  { name: 'Real Estate & Property', count: '450+ free property listings', desc: 'Real estate agents, property dealers, housing societies' },
  { name: 'Home Services', count: '390+ service providers', desc: 'Plumbers, electricians, AC repair, cleaners, painters' },
  { name: 'Fashion & Beauty', count: '360+ business profiles', desc: 'Salons, barbershops, boutiques, jewelry stores, cosmetics' },
  { name: 'Technology & IT Services', count: '320+ tech companies', desc: 'Web developers, software companies, IT support, computer shops' },
  { name: 'Construction & Building', count: '290+ contractors', desc: 'Builders, contractors, architects, hardware stores' },
  { name: 'Manufacturing & Industry', count: '260+ industrial listings', desc: 'Factories, manufacturers, wholesalers, suppliers' },
  { name: 'Professional Services', count: '240+ verified professionals', desc: 'Lawyers, accountants, consultants, business advisors' },
]

const CITIES = [
  { name: 'Karachi', count: '3,500+ businesses listed free', province: 'Sindh', desc: 'Clifton, DHA, Gulshan, North Nazimabad, Saddar, PECHS' },
  { name: 'Lahore', count: '2,800+ free business listings', province: 'Punjab', desc: 'Gulberg, DHA, Johar Town, Model Town, Cantonment' },
  { name: 'Islamabad', count: '1,900+ verified listings', province: 'ICT', desc: 'F-6, F-7, G-10, G-11, Blue Area, DHA Islamabad' },
  { name: 'Rawalpindi', count: '1,400+ local business directory', province: 'Punjab', desc: 'Saddar, Bahria Town, Gulraiz, Model Town, Satellite Town' },
  { name: 'Faisalabad', count: '1,100+ free listings', province: 'Punjab', desc: 'D-Ground, Civil Lines, Satellite Town, People\'s Colony' },
  { name: 'Multan', count: '890+ business profiles', province: 'Punjab', desc: 'Cantt, DHA, Bosan Road, Gulgasht, Township' },
  { name: 'Peshawar', count: '760+ verified listings', province: 'KPK', desc: 'Hayatabad, Wapda Town, Cantt, University Town' },
  { name: 'Quetta', count: '520+ free business listings', province: 'Balochistan', desc: 'Satellite Town, Cantt, Jinnah Town, Shahrah-e-Iqbal' },
  { name: 'Sialkot', count: '480+ local businesses', province: 'Punjab', desc: 'Cantt, Model Town, Garden Town, Defence' },
  { name: 'Gujranwala', count: '420+ free listings', province: 'Punjab', desc: 'Peoples Colony, Satellite Town, Model Town, Civil Lines' },
]

const RECENT_LISTINGS = [
  { name: 'Al-Rehman Traders', category: 'Wholesale & Retail', city: 'Lahore, Punjab', badge: '✓ Verified', desc: 'Wholesale supplier of electronics and home appliances in Lahore' },
  { name: 'Green Valley Restaurant', category: 'Restaurants & Food', city: 'Karachi, Sindh', badge: '✓ Verified', desc: 'Best family restaurant in Gulshan-e-Iqbal serving Pakistani and Chinese cuisine' },
  { name: 'Tech Solutions Pakistan', category: 'Technology & IT Services', city: 'Islamabad', badge: '✓ New', desc: 'Web development, mobile apps, and software solutions in Islamabad' },
  { name: 'City Medical Store', category: 'Healthcare & Medical', city: 'Faisalabad, Punjab', badge: '✓ Verified', desc: '24/7 pharmacy and medical supplies in D-Ground, Faisalabad' },
  { name: 'Modern Builders & Contractors', category: 'Construction & Building', city: 'Rawalpindi', badge: '✓ Verified', desc: 'Residential and commercial construction services in Bahria Town' },
  { name: 'Style Hub Salon', category: 'Fashion & Beauty', city: 'Multan, Punjab', badge: '✓ New', desc: 'Premium unisex salon in Bosan Road, Multan' },
]

const FAQS = [
  {
    question: 'Is ListPak really 100% free for business listing in Pakistan?',
    answer: 'Yes, ListPak is completely free forever for all businesses in Pakistan. There are no hidden charges, no premium plans, no monthly subscriptions, and no credit card requirements. You can list your business free, post unlimited jobs free, and create job seeker profiles free – 100% free business listing website Pakistan with zero costs.'
  },
  {
    question: 'How long does it take for my business to appear on ListPak free directory?',
    answer: 'Your business listing goes live instantly after submission on ListPak. Our verification team reviews it to ensure quality and accuracy, but your listing will be visible to customers immediately. Most businesses start receiving calls and inquiries within the first 24 hours.'
  },
  {
    question: 'Can I list multiple businesses on ListPak free business listing website?',
    answer: 'Yes, you can list as many businesses as you want on ListPak, all for free. Just create separate listings for each business with accurate information. Whether you own one shop or a chain of 10 restaurants across Karachi, Lahore, and Islamabad, you can list all of them free.'
  },
  {
    question: 'Is ListPak only for businesses in Pakistan or can international companies also list?',
    answer: 'While ListPak primarily focuses on Pakistani businesses and local business listing Pakistan, we also welcome international companies targeting Pakistani customers or hiring Pakistani talent. Companies in Dubai, Germany, Australia, Saudi Arabia, UAE can list jobs free to recruit Pakistani professionals.'
  },
  {
    question: 'How do I edit or update my free business listing on ListPak directory?',
    answer: 'Log in to your ListPak account, go to your dashboard, and click "Edit Listing" on the business you want to update. You can change your business name, category, city, address, phone number, website, photos, description, and operating hours anytime. All edits are free.'
  },
  {
    question: 'Can customers leave reviews on my ListPak free business listing?',
    answer: 'Yes, customers can leave reviews and ratings on your ListPak business listing. Positive reviews improve your credibility and help you rank higher in search results. Reviews are free and unlimited on our free business directory Pakistan.'
  },
  {
    question: 'Does ListPak help my business rank on Google search?',
    answer: 'Absolutely! ListPak has high domain authority (DA), which means your business listing on our free directory can rank on page 1 of Google for keywords like "best [your service] in [your city]". Plus, the backlink from ListPak to your website improves your own website\'s SEO.'
  },
  {
    question: 'What types of businesses can list free on ListPak Pakistan?',
    answer: 'Any legitimate business operating in Pakistan can list free on ListPak. This includes retail shops, restaurants, hospitals, schools, real estate agencies, auto services, salons, tech companies, construction firms, manufacturers, professional services, and home services.'
  },
  {
    question: 'Is ListPak safe and secure for my business information?',
    answer: 'Yes, ListPak takes security and privacy seriously. Your business information is only visible to potential customers searching for your services. We never sell your data to third parties or spam you with unwanted calls.'
  },
  {
    question: 'Can I delete my business listing from ListPak if I want to?',
    answer: 'Yes, you can delete or deactivate your business listing anytime from your account dashboard. If you close your business or no longer want to be listed, simply log in and click "Delete Listing".'
  }
]

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ListPak',
    url: 'https://listpak.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://listpak.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    description: 'Free business listing website and directory in Pakistan for local businesses, job seekers, and employers'
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main id="main-content" className="bg-[#F4F7FC] text-[#0F172A] font-sans">
        
        {/* HERO SECTION */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-[24px] p-8 sm:p-14 text-center relative overflow-hidden shadow-[0_8px_40px_rgba(15,23,42,0.12)] border border-slate-800">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A] text-xs sm:text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 text-[#16A34A]" />
                <span>✓ 100% Free Forever – No Hidden Charges</span>
              </div>

              {/* H1 Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
                Free Business Listing Website in Pakistan – List Your Business Free Forever
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                ListPak is Pakistan&apos;s leading free business listing website and free directory platform where businesses, employers, and job seekers connect. List your business free on Pakistan&apos;s #1 online business directory, post jobs for free, and find qualified employees across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and all cities in Pakistan. Join 10,000+ businesses already growing with our 100% free local business listing service.
              </p>

              {/* Search Bar */}
              <div className="mt-10 max-w-3xl mx-auto bg-white rounded-[16px] p-2.5 shadow-[0_8px_40px_rgba(15,23,42,0.16)] border border-[#D9E2F1] flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-[#F4F7FC] rounded-[12px]">
                  <Search className="w-5 h-5 text-[#64748B]" />
                  <input
                    type="text"
                    placeholder="Search businesses or services (e.g., 'restaurants near me in Lahore', 'plumbers in Karachi')..."
                    className="w-full bg-transparent text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none"
                  />
                </div>
                <Link
                  href="/add-business"
                  className="px-8 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-[12px] transition-all duration-200 text-sm inline-flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  <span>Search Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/add-business"
                  className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-[16px] shadow-[0_8px_40px_rgba(15,23,42,0.08)] hover:shadow-lg transition-all duration-200 text-base inline-flex items-center gap-2"
                >
                  <span>List Your Business Free Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-[16px] transition-all duration-200 text-base shadow-md"
                >
                  Learn More About Us
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm font-medium text-slate-300">
                <div>✓ 100% Free Forever</div>
                <div>✓ 10,000+ Active Listings</div>
                <div>✓ High Google Ranking</div>
                <div>✓ Verified Local Directory</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: POPULAR CATEGORIES */}
        <section className="py-16 bg-[#F4F7FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Explore Top Business Categories in Pakistan – Free Directory Listings</h2>
              <p className="mt-3 text-[#475569] max-w-2xl mx-auto">Discover thousands of free business listings across top industries in Pakistan.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES.map((cat, idx) => (
                <div key={idx} className="bg-white border border-[#D9E2F1] rounded-[16px] p-6 shadow-[0_8px_40px_rgba(15,23,42,0.08)] hover:border-[#2563EB] transition-all group">
                  <h3 className="font-bold text-[#0F172A] text-lg mb-1 group-hover:text-[#2563EB] transition-colors">{cat.name}</h3>
                  <span className="text-xs font-semibold text-[#16A34A] bg-emerald-50 px-2.5 py-1 rounded-full inline-block mb-3">{cat.count}</span>
                  <p className="text-xs text-[#64748B] leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/add-business" className="text-sm font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1">
                <span>View All 50+ Business Categories in Pakistan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3: TOP CITIES (Soft Blue Depth Background #EEF4FF) */}
        <section className="py-16 bg-[#EEF4FF] border-y border-[#D9E2F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Browse Free Business Listings by City in Pakistan – Local Directory Near You</h2>
              <p className="mt-3 text-[#475569] max-w-2xl mx-auto">Local directory near you in Karachi, Lahore, Islamabad, Rawalpindi, and all cities.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {CITIES.map((city, idx) => (
                <div key={idx} className="bg-white border border-[#D9E2F1] rounded-[16px] p-5 shadow-[0_8px_40px_rgba(15,23,42,0.08)] hover:border-[#2563EB] transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-[#0F172A] text-base">{city.name}</h3>
                    <span className="text-[10px] text-[#64748B] font-semibold px-2 py-0.5 bg-[#F4F7FC] rounded-md">{city.province}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#2563EB] mb-2">{city.count}</p>
                  <p className="text-[11px] text-[#64748B] line-clamp-2">{city.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/add-business" className="text-sm font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1">
                <span>View All 150+ Cities and Areas in Pakistan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4: HOW IT WORKS */}
        <section className="py-16 bg-[#F4F7FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-12">List Your Business Free in 3 Simple Steps – Free Business Directory Pakistan</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[16px] border border-[#D9E2F1] shadow-[0_8px_40px_rgba(15,23,42,0.08)] relative">
                <div className="w-12 h-12 rounded-full bg-[#F97316] text-white font-bold text-xl flex items-center justify-center mx-auto mb-6 shadow-md">1</div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Create Your Free Account</h3>
                <p className="text-sm text-[#475569] leading-relaxed">Sign up in 30 seconds with your email or Google account. No credit card required, no hidden charges. Your free listing on Pakistan&apos;s #1 directory starts here.</p>
              </div>

              <div className="bg-white p-8 rounded-[16px] border border-[#D9E2F1] shadow-[0_8px_40px_rgba(15,23,42,0.08)] relative">
                <div className="w-12 h-12 rounded-full bg-[#F97316] text-white font-bold text-xl flex items-center justify-center mx-auto mb-6 shadow-md">2</div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Add Your Business Details</h3>
                <p className="text-sm text-[#475569] leading-relaxed">Fill in your business name, category, city, address, phone number, and upload photos. Include keywords like &apos;best restaurant in Lahore&apos; or &apos;web developer in Karachi&apos;.</p>
              </div>

              <div className="bg-white p-8 rounded-[16px] border border-[#D9E2F1] shadow-[0_8px_40px_rgba(15,23,42,0.08)] relative">
                <div className="w-12 h-12 rounded-full bg-[#F97316] text-white font-bold text-xl flex items-center justify-center mx-auto mb-6 shadow-md">3</div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Publish & Get Customers</h3>
                <p className="text-sm text-[#475569] leading-relaxed">Go live instantly on ListPak&apos;s free business listing website. Appear in local searches and start receiving calls, messages, and visits within 24 hours.</p>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/add-business"
                className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-[16px] shadow-[0_8px_40px_rgba(15,23,42,0.08)] transition-all text-base inline-flex items-center gap-2"
              >
                <span>List Your Business Free Now – 100% Free Forever</span>
              </Link>
              <p className="mt-3 text-xs text-[#64748B]">Join 10,000+ Pakistani businesses already listed free on ListPak directory. Completely free business listing website in Pakistan.</p>
            </div>
          </div>
        </section>

        {/* SECTION 5: JOBS & EMPLOYMENT PORTAL (Soft Blue Depth #EEF4FF) */}
        <section className="py-16 bg-[#EEF4FF] border-y border-[#D9E2F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">Free Job Portal Pakistan – Find Jobs & Hire Employees Free</h2>
              <p className="mt-3 text-[#475569] max-w-2xl mx-auto">Connecting talent with opportunity across Karachi, Lahore, Islamabad, and overseas markets including Dubai, Germany, and Australia.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Job Seekers Card */}
              <div className="bg-white border border-[#D9E2F1] p-8 rounded-[16px] shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">For Job Seekers – Create Free Profile</h3>
                </div>
                <ul className="space-y-3 text-sm text-[#475569] mb-8">
                  <li>✓ Create your professional profile free – visible to employers nationwide</li>
                  <li>✓ Apply to 500+ active job listings in Karachi, Lahore, Islamabad, and all cities</li>
                  <li>✓ Get hired in Dubai, Germany, Australia, Saudi Arabia, UAE</li>
                  <li>✓ Free job alerts via email and SMS for latest opportunities</li>
                  <li>✓ Upload your CV and portfolio for employer discovery</li>
                  <li>✓ No registration fees – 100% free job portal Pakistan</li>
                </ul>
                <Link href="/add-business" className="block text-center py-3.5 bg-[#2563EB] hover:bg-blue-700 font-bold rounded-[14px] text-white transition-colors shadow-md">
                  Create Free Job Seeker Profile Now
                </Link>
              </div>

              {/* Employers Card */}
              <div className="bg-white border border-[#D9E2F1] p-8 rounded-[16px] shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">For Employers – Post Jobs Free</h3>
                </div>
                <ul className="space-y-3 text-sm text-[#475569] mb-8">
                  <li>✓ Post unlimited jobs free – no limits, no hidden fees</li>
                  <li>✓ Access 50,000+ verified candidate profiles across Pakistan</li>
                  <li>✓ Hire locally in Pakistan or recruit internationally for Dubai, Germany, Australia</li>
                  <li>✓ Receive job applications within 24 hours of posting</li>
                  <li>✓ Search CV database by skills, experience, and location</li>
                  <li>✓ Free employer account with dashboard to manage all job postings</li>
                </ul>
                <Link href="/add-business" className="block text-center py-3.5 bg-[#16A34A] hover:bg-emerald-700 font-bold rounded-[14px] text-white transition-colors shadow-md">
                  Post a Job Free – Start Hiring Today
                </Link>
              </div>
            </div>

            <p className="mt-8 text-xs text-[#64748B] text-center max-w-3xl mx-auto leading-relaxed">
              ListPak is not just a free business listing website – we&apos;re also Pakistan&apos;s fastest-growing free job portal. Whether you&apos;re a job seeker looking for careers in IT, healthcare, engineering, sales, marketing, or an employer hiring developers, accountants, teachers, or nurses, ListPak connects talent with opportunities across Pakistan and internationally.
            </p>
          </div>
        </section>

        {/* SECTION 6: WHY CHOOSE US */}
        <section className="py-16 bg-[#F4F7FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Why 10,000+ Businesses Trust ListPak – Pakistan&apos;s #1 Free Business Directory</h2>
              <p className="mt-3 text-[#475569] max-w-2xl mx-auto">Rated 4.8/5 stars by 2,500+ Pakistani businesses on Google Reviews.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white border border-[#D9E2F1] rounded-[16px] shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
                <ShieldCheck className="w-10 h-10 text-[#16A34A] mb-4" />
                <h3 className="font-bold text-[#0F172A] text-lg mb-2">100% Free Business Listing – Forever</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">Unlike other directories that charge monthly fees, ListPak is completely free forever. No hidden charges, no premium plans, no subscriptions.</p>
              </div>

              <div className="p-8 bg-white border border-[#D9E2F1] rounded-[16px] shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
                <TrendingUp className="w-10 h-10 text-[#2563EB] mb-4" />
                <h3 className="font-bold text-[#0F172A] text-lg mb-2">High Google Ranking – Get Found Fast</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">Our free business listing website has high domain authority (DA), helping your business rank on page 1 of Google for local search keywords.</p>
              </div>

              <div className="p-8 bg-white border border-[#D9E2F1] rounded-[16px] shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
                <PhoneCall className="w-10 h-10 text-[#F97316] mb-4" />
                <h3 className="font-bold text-[#0F172A] text-lg mb-2">Mobile-Optimized Directory</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">90% of Pakistani users search on mobile. ListPak is 100% mobile-responsive, allowing click-to-call, WhatsApp, and Google Maps direction.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: RECENT LISTINGS */}
        <section className="py-16 bg-[#EEF4FF] border-y border-[#D9E2F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Recently Added Businesses on Free Directory Pakistan – Latest Listings</h2>
              <p className="mt-3 text-[#475569] max-w-2xl mx-auto">Explore recently submitted verified local business profiles.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RECENT_LISTINGS.map((biz, idx) => (
                <div key={idx} className="bg-white border border-[#D9E2F1] rounded-[16px] p-6 shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-[#0F172A] text-base">{biz.name}</h3>
                    <span className="text-[10px] font-bold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-full">{biz.badge}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#2563EB] mb-1">{biz.category}</p>
                  <p className="text-xs text-[#64748B] mb-3">{biz.city}</p>
                  <p className="text-xs text-[#475569] leading-relaxed">{biz.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/add-business" className="text-sm font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1">
                <span>Browse All 10,000+ Free Business Listings in Pakistan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 8: COMPREHENSIVE SEO CONTENT BLOCK (800+ Words) */}
        <section className="py-16 bg-white border-b border-[#D9E2F1]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-[#475569] leading-relaxed space-y-6">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">Free Business Listing Website in Pakistan – ListPak Online Business Directory</h2>
            
            <p className="text-base">
              ListPak is Pakistan&apos;s leading free business listing website and free directory platform where businesses, employers, and job seekers connect seamlessly. Whether you run a small retail shop in Karachi, a restaurant in Lahore, a tech startup in Islamabad, a manufacturing unit in Faisalabad, or a service business in any city across Pakistan, ListPak helps you reach thousands of potential customers searching for your products and services online. Our free business directory Pakistan is designed to give every business – from small home-based enterprises to large corporations – equal opportunity to get discovered by customers actively searching for what they offer. Unlike paid directories that charge monthly fees, ListPak is 100% free forever, making it the most accessible online business listing platform in Pakistan.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] pt-4">Why List Your Business on ListPak Free Directory? – Top Benefits for Pakistani Businesses</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-[#0F172A] text-lg">1. 100% Free Business Directory – No Hidden Charges Ever</h4>
                <p className="text-sm mt-1">ListPak is completely free for all businesses in Pakistan. There are no monthly subscription fees, no premium plans, no hidden charges, and no credit card requirements. You can list your business free forever and enjoy all features including unlimited edits, photo uploads, contact information display, and customer inquiries.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#0F172A] text-lg">2. High Domain Authority for Better Google Ranking</h4>
                <p className="text-sm mt-1">Our free business listing website has high domain authority (DA) and page authority (PA), which means your business listing on ListPak will rank higher on Google search results. When customers search for keywords like &apos;best restaurant in Lahore&apos;, &apos;top web developer in Karachi&apos;, or &apos;plumbers near me in Islamabad&apos;, your ListPak listing has a strong chance of appearing on page 1 of Google.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#0F172A] text-lg">3. Nationwide Coverage Across All Pakistan Cities</h4>
                <p className="text-sm mt-1">ListPak covers all major cities and towns in Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, Gujranwala, Hyderabad, Bahawalpur, Sargodha, Sukkur, Larkana, and 150+ more cities.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] pt-4">How Free Business Listing Improves Your Local SEO in Pakistan</h3>
            <p className="text-sm">
              List your business on ListPak&apos;s free directory to significantly improve your local SEO ranking in Pakistan. When customers search for &apos;businesses near me&apos; or &apos;services in [your city]&apos;, Google prioritizes businesses listed on high-authority local directories like ListPak.
            </p>

            <div className="pt-6 text-center">
              <Link
                href="/add-business"
                className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-[16px] shadow-[0_8px_40px_rgba(15,23,42,0.08)] transition-all inline-block text-base"
              >
                Create Your Free Business Listing Now – Starts in 30 Seconds
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQS */}
        <section className="py-16 bg-[#F4F7FC]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#0F172A] text-center mb-10">Frequently Asked Questions About Free Business Listing in Pakistan</h2>

            <div className="space-y-5">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="bg-white border border-[#D9E2F1] rounded-[16px] p-6 shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
                  <h3 className="font-bold text-[#0F172A] text-base mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#2563EB] shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
