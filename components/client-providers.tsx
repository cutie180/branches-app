'use client'

import { Toaster } from 'sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import BottomNav from '@/components/bottom-nav'

export default function ClientProviders() {
  return (
    <>
      <BottomNav />
      <Toaster position="top-right" richColors />
      <SpeedInsights />
      <Analytics />
    </>
  )
}
