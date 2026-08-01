import Link from 'next/link'
import { Building2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Branding Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-10 border-b border-slate-800 gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-xl shadow-md border border-white/10">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-extrabold text-2xl tracking-tight">
              List<span className="text-[#2563EB]">Pak</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 max-w-md">
            Pakistan&apos;s premier free business listing & directory platform connecting local businesses, job seekers, and employers nationwide.
          </p>
        </div>

        {/* 4 Column Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-slate-800">
          
          {/* Section 1 */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 text-[#F97316]">Popular Categories</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Restaurants in Karachi</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Web Developers in Lahore</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Plumbers in Islamabad</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Real Estate Agents in Rawalpindi</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Doctors in Faisalabad</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Salons in Multan</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Car Mechanics in Peshawar</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Electricians in Quetta</Link></li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 text-[#F97316]">Top Cities</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Karachi Business Directory</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Lahore Free Listings</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Islamabad Online Directory</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Rawalpindi Business Listings</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Faisalabad Free Directory</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Multan Business Directory</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Peshawar Free Listings</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Quetta Business Directory</Link></li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 text-[#F97316]">Job Seekers & Employers</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Create Free Job Profile</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Post Jobs Free Pakistan</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">IT Jobs in Karachi</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Engineering Jobs in Lahore</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Healthcare Jobs in Islamabad</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Dubai Jobs for Pakistanis</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Germany Jobs for Pakistanis</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Australia Jobs for Pakistanis</Link></li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 text-[#F97316]">Resources & Links</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link href="/" className="hover:text-[#2563EB] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#2563EB] transition-colors">About ListPak</Link></li>
              <li><Link href="/contact" className="hover:text-[#2563EB] transition-colors">Contact Support</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Add Business Free</Link></li>
              <li><Link href="/privacy" className="hover:text-[#2563EB] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#2563EB] transition-colors">Terms of Service</Link></li>
              <li><Link href="/add-business" className="hover:text-[#2563EB] transition-colors">Local SEO Tips Pakistan</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="pt-8 text-center text-xs text-slate-400 leading-relaxed max-w-4xl mx-auto space-y-4">
          <p>
            ListPak – Pakistan&apos;s #1 Free Business Listing Website & Free Directory Platform. List your business free, post jobs free, find employees free. 100% free forever with high Google ranking. Serving businesses in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and 150+ cities across Pakistan.
          </p>
          <div className="flex justify-center items-center gap-6 pt-2 text-slate-500 text-[11px]">
            <span>© 2026 ListPak.com – All Rights Reserved. Free Business Listing Website Pakistan | Free Directory | Free Job Portal Pakistan</span>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
