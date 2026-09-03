import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User & Business Dashboard | ListPak',
  description: 'Manage your listings, profile settings, saved bookmarks, and notifications on ListPak.',
  robots: { index: false, follow: false },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
