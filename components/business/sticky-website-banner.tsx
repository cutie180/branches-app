'use client'

import React, { useState } from 'react'
import { Globe, MessageCircle, X, ChevronDown, ChevronUp, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

interface StickyWebsiteBannerProps {
  businessName?: string
  className?: string
}

export default function StickyWebsiteBanner({ businessName, className = '' }: StickyWebsiteBannerProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) {
    return (
      <button
        type="button"
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-4 right-4 z-40 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        title="Need a business website? Click here"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>Need a Business Website?</span>
      </button>
    )
  }

  const defaultBizText = businessName?.trim() ? ` for "${businessName.trim()}"` : ''
  const whatsappUrl = `https://wa.me/923345636230?text=${encodeURIComponent(
    `Hello ListPak Team, I am creating my business listing${defaultBizText} on ListPak and I need a website / free website consultation for my business.`
  )}`

  return (
    <aside aria-label="Website Assistance Banner" className={`sticky top-20 z-30 transition-all duration-300 ${className}`}>
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-blue-500/30 shadow-xl shadow-slate-950/20 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          {/* Left info badge & message */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-md">
              <Globe className="w-5 h-5 animate-pulse" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Free Website Offer</span>
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white truncate">
                  Don&apos;t have a website for your business?
                </span>
              </div>

              {!isMinimized && (
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-snug">
                  If your business doesn&apos;t have a website yet or you want a free consultation for a modern, fast website, contact us directly on WhatsApp at <strong className="text-white font-mono">03345636230</strong>.
                </p>
              )}
            </div>
          </div>

          {/* Right action button & controls */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">WhatsApp Website Help</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title={isMinimized ? 'Expand' : 'Collapse'}
            >
              {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/10 transition-colors"
              title="Close Banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
