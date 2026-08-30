'use client'

import { Toaster } from 'sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import BottomNav from '@/components/bottom-nav'

export default function ClientProviders() {
  return (
    <>
      <BottomNav />
      <Toaster 
        position="top-center"
        duration={5000}
        closeButton={true}
        richColors={true}
        expand={true}
        toastOptions={{
          duration: 5000,
          className: 'listpak-popup-toast',
        }}
      />
      <SpeedInsights />
      <Analytics />
    </>
  )
}
