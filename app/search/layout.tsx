import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search the ListPak Directory',
  description: 'Search Pakistani businesses, jobs, and professionals by keyword, category, and city.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.listpak.com/search' },
}

export default function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
