'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface AdSlotProps {
  slotId?: string
  format?: 'horizontal' | 'rectangle' | 'responsive'
  className?: string
  minHeight?: number
}

// Routes where Google AdSense policy strictly prohibits displaying ads
const FORBIDDEN_AD_ROUTES = [
  '/admin',
  '/login',
  '/register',
  '/search',
  '/dashboard',
  '/business-dashboard',
  '/api',
  '/404',
]

export default function AdSlot({
  slotId,
  format = 'responsive',
  className = '',
  minHeight,
}: AdSlotProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // 1. Guard against forbidden routes (admin, auth, internal search, error screens)
  const isForbidden = FORBIDDEN_AD_ROUTES.some(
    (forbidden) => pathname === forbidden || pathname.startsWith(`${forbidden}/`)
  )

  if (isForbidden) {
    return null
  }

  // Publisher ID from environment
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ''

  // Determine reserved minimum height to guarantee zero Cumulative Layout Shift (CLS)
  let defaultHeight = 100
  if (format === 'horizontal') defaultHeight = 90
  if (format === 'rectangle') defaultHeight = 250
  if (minHeight) defaultHeight = minHeight

  // If no valid publisher ID configured yet, return a zero-shift invisible container
  // to avoid rendering empty banners or invalid ad requests
  if (!publisherId || !slotId) {
    return null
  }

  return (
    <div
      className={`w-full max-w-5xl mx-auto my-6 px-4 flex flex-col items-center justify-center ${className}`}
      style={{ minHeight: `${defaultHeight + 24}px` }}
    >
      <div className="w-full flex items-center justify-center gap-2 mb-1.5">
        <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 select-none">
          Advertisement
        </span>
      </div>

      <div
        className="w-full bg-slate-50/50 rounded-xl border border-slate-200/50 flex items-center justify-center overflow-hidden"
        style={{ minHeight: `${defaultHeight}px` }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: `${defaultHeight}px`, width: '100%' }}
          data-ad-client={publisherId}
          data-ad-slot={slotId}
          data-ad-format={format === 'rectangle' ? 'rectangle' : 'auto'}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
