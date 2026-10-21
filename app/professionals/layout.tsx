import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professionals in Pakistan – Hire Verified Experts | ListPak',
  description:
    'Find verified professionals in Pakistan — developers, marketers, consultants & founders. Browse profiles by city and expertise, or create your free profile.',
  alternates: { canonical: 'https://www.listpak.com/professionals/' },
  openGraph: {
    title: 'Professionals in Pakistan – Hire Verified Experts | ListPak',
    description:
      'Find verified professionals in Pakistan — developers, marketers, consultants & founders. Browse profiles by city and expertise, or create your free profile.',
    url: 'https://www.listpak.com/professionals/',
    siteName: 'ListPak',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professionals in Pakistan – Hire Verified Experts | ListPak',
    description:
      'Find verified professionals in Pakistan — developers, marketers, consultants & founders. Browse profiles by city and expertise, or create your free profile.',
  },
}

export default function ProfessionalsLayout({ children }: { children: React.ReactNode }) {
  return children
}
