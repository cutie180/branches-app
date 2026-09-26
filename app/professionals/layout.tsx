import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professionals in Pakistan | Find Verified Experts | ListPak',
  description: 'Find Pakistani professionals, consultants, specialists, and service experts by field and city on ListPak.',
  alternates: { canonical: 'https://www.listpak.com/professionals/' },
  openGraph: {
    title: 'Professionals in Pakistan | Find Verified Experts | ListPak',
    description: 'Find Pakistani professionals, consultants, specialists, and service experts by field and city on ListPak.',
    url: 'https://www.listpak.com/professionals/',
    type: 'website',
  },
}

export default function ProfessionalsLayout({ children }: { children: React.ReactNode }) {
  return children
}
