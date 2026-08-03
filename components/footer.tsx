import Link from 'next/link'
import { Building2, ShieldCheck, MapPin, Briefcase, Sparkles, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0B132B] text-white pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Branding Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-12 border-b border-slate-800/80 gap-6">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/20">
                <Building2 className="w-5.5 h-5.5 text-white" />
              </div>
              <span className="text-white font-extrabold text-2xl tracking-tight">
                List<span className="text-blue-400">Pak</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Pakistan&apos;s enterprise digital business ecosystem connecting local companies, employers, professionals, and customers across all 150+ cities nationwide.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Businesses</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>150+ Pakistani Cities</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Active Job Portal</span>
            </div>
          </div>
        </div>

        {/* 4 Column Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-slate-800/80">
          
          {/* Section 1: Top Categories */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-blue-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Popular Categories</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/category/restaurants" className="hover:text-blue-400 transition-colors">Restaurants & Food</Link></li>
              <li><Link href="/category/technology" className="hover:text-blue-400 transition-colors">Technology & Software</Link></li>
              <li><Link href="/category/healthcare" className="hover:text-blue-400 transition-colors">Healthcare & Doctors</Link></li>
              <li><Link href="/category/real-estate" className="hover:text-blue-400 transition-colors">Real Estate & Property</Link></li>
              <li><Link href="/category/education" className="hover:text-blue-400 transition-colors">Schools & Universities</Link></li>
              <li><Link href="/category/beauty" className="hover:text-blue-400 transition-colors">Salons & Wellness</Link></li>
              <li><Link href="/category/automotive" className="hover:text-blue-400 transition-colors">Auto Sales & Services</Link></li>
              <li><Link href="/categories" className="text-blue-400 font-semibold hover:underline">View All 50+ Categories &rarr;</Link></li>
            </ul>
          </div>

          {/* Section 2: Major Cities */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-emerald-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Major Cities</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/city/karachi" className="hover:text-emerald-400 transition-colors">Karachi Business Directory</Link></li>
              <li><Link href="/city/lahore" className="hover:text-emerald-400 transition-colors">Lahore Enterprise Directory</Link></li>
              <li><Link href="/city/islamabad" className="hover:text-emerald-400 transition-colors">Islamabad Business Listings</Link></li>
              <li><Link href="/city/rawalpindi" className="hover:text-emerald-400 transition-colors">Rawalpindi Directory</Link></li>
              <li><Link href="/city/faisalabad" className="hover:text-emerald-400 transition-colors">Faisalabad Business Hub</Link></li>
              <li><Link href="/city/multan" className="hover:text-emerald-400 transition-colors">Multan Listings</Link></li>
              <li><Link href="/city/peshawar" className="hover:text-emerald-400 transition-colors">Peshawar Business Directory</Link></li>
              <li><Link href="/cities" className="text-emerald-400 font-semibold hover:underline">Explore All 150+ Cities &rarr;</Link></li>
            </ul>
          </div>

          {/* Section 3: Ecosystem Services */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-amber-400 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Jobs & Professionals</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/jobs" className="hover:text-amber-400 transition-colors">Find Jobs in Pakistan</Link></li>
              <li><Link href="/post-job" className="hover:text-amber-400 transition-colors">Post Job Opening</Link></li>
              <li><Link href="/professionals" className="hover:text-amber-400 transition-colors">Browse Verified Professionals</Link></li>
              <li><Link href="/add-business" className="hover:text-amber-400 transition-colors">List Your Business Free</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-400 transition-colors">Business Owner Portal</Link></li>
              <li><Link href="/search" className="hover:text-amber-400 transition-colors">Advanced Search Filter</Link></li>
            </ul>
          </div>

          {/* Section 4: Enterprise & Legal */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-slate-300">Company & Legal</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About ListPak Ecosystem</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Pakistan Business Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Enterprise Support</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors text-slate-500">Admin Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left">
            © 2026 ListPak Enterprise Ecosystem. Built with pride for Pakistani businesses, employers, & professionals.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
