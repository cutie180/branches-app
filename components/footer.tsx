import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0a1e2b] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand & Contact */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6" title="PakBizBranches - Home">
              <Image
                src="/logo-img.png"
                alt="Pakistan Free Business Directory – PakBizBranches Logo"
                width={40}
                height={40}
                className="object-contain rounded-md"
                loading="lazy"
              />
              <span className="text-white font-bold text-xl tracking-tight">
                PakBiz<span className="text-[#60a5fa]">Branches</span>
              </span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
              Pakistan&apos;s leading free business directory platform. Register and manage your business profile easily.
            </p>
            <div className="flex gap-3 mb-8">
              {[
                { Icon: Facebook, label: 'Facebook', url: 'https://facebook.com/pakbizbranches' },
                { Icon: Twitter, label: 'Twitter', url: 'https://twitter.com/pakbizbranches' },
                { Icon: Instagram, label: 'Instagram', url: 'https://instagram.com/pakbizbranches' },
                { Icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/company/pakbizbranches' },
              ].map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#60a5fa] hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
            <div className="space-y-3 pt-2">
              <address itemScope itemType="https://schema.org/PostalAddress" className="flex items-start gap-3 not-italic text-sm text-slate-300 font-medium">
                <MapPin className="w-5 h-5 text-[#60a5fa] shrink-0" />
                <span className="leading-tight">
                  <span itemProp="streetAddress">Gulghast Colony, Urdu Bazar</span>, <br />
                  <span itemProp="addressLocality">Multan</span>, <span itemProp="addressRegion">Punjab</span>, <span itemProp="addressCountry">PK</span>
                </span>
              </address>
              <a href="mailto:admin@pakbizbranhces.online" className="flex items-center gap-3 text-sm text-slate-300 font-medium hover:text-[#60a5fa] transition-colors" title="Email Us">
                <Mail className="w-5 h-5 text-[#60a5fa] shrink-0" />
                admin@pakbizbranhces.online
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Navigation</h3>
            <ul className="space-y-3.5 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/add-business', label: 'Add Business' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-300 hover:text-[#60a5fa] font-medium transition-colors inline-block" title={label}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* List Business CTA */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">List Your Business</h3>
            <div className="p-5 rounded-xl bg-[#60a5fa]/10 border border-[#60a5fa]/20">
              <p className="text-sm text-[#60a5fa] font-semibold mb-1">Add Your Business Profile</p>
              <p className="text-xs text-slate-300 mb-4 font-medium">Register your business today to get listed on PakBizBranches.</p>
              <Link href="/add-business" className="inline-block px-4 py-2 rounded-lg bg-[#60a5fa] text-white text-xs font-bold hover:bg-blue-400 transition-colors">
                Submit Business &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-300">
          <div className="flex flex-col gap-1 items-center sm:items-start">
            <p className="flex items-center gap-1 font-medium">
              &copy; {new Date().getFullYear()} <span className="text-white font-semibold">PakBizBranches</span>. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold">Privacy</Link>
            <Link href="/terms" className="text-slate-300 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-bold">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
