'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Plus, Building2 } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/add-business', label: 'Add Business' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-extrabold text-2xl tracking-tight">
              List<span className="text-[#3B82F6]">Pak</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-[#60A5FA]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              href="/add-business"
              className="ml-2 px-5 py-2.5 rounded-xl bg-[#F97316] text-white text-sm font-bold hover:bg-[#EA580C] transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Business Free</span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            id="mobile-hamburger-btn"
            className="md:hidden text-white p-2 rounded-xl hover:bg-slate-800 cursor-pointer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav
          id="mobile-nav-menu"
          className="md:hidden bg-[#0F172A] border-t border-slate-800 px-4 py-4 flex flex-col gap-3 shadow-2xl"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-semibold py-3 px-4 rounded-xl transition-colors ${
                pathname === link.href
                  ? 'bg-slate-800 text-[#60A5FA]'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            id="mobile-nav-add-business"
            href="/add-business"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-xl bg-[#F97316] text-white text-sm font-bold text-center hover:bg-[#EA580C] transition-colors shadow-md"
          >
            Add Business Free
          </Link>
        </nav>
      )}
    </header>
  )
}
