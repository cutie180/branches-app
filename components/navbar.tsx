'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Plus } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/add-business', label: 'Add Business' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white font-bold text-xl shadow-md">
              L
            </div>
            <span className="text-[#0F172A] font-extrabold text-2xl tracking-tight">
              List<span className="text-[#2563EB]">Pak</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-[#2563EB]'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/add-business"
              className="ml-2 px-5 py-2.5 rounded-[14px] bg-[#F97316] text-white text-sm font-bold hover:bg-[#ea580c] transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Business Free</span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            id="mobile-hamburger-btn"
            className="md:hidden text-[#0F172A] p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
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
          className="md:hidden bg-white border-t border-[#E2E8F0] px-4 py-4 flex flex-col gap-3 shadow-xl"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors ${
                pathname === link.href
                  ? 'bg-blue-50 text-[#2563EB]'
                  : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            id="mobile-nav-add-business"
            href="/add-business"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-xl bg-[#F97316] text-white text-sm font-bold text-center hover:bg-[#ea580c] transition-colors shadow-md"
          >
            Add Business Free
          </Link>
        </nav>
      )}
    </header>
  )
}
