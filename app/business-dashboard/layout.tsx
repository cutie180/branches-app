import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Dashboard | ListPak',
  description: 'Manage your verified business branches, lead inquiries, and business profile on ListPak.',
  robots: { index: false, follow: false },
}

export default function BusinessDashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
