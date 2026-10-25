import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hiring Companies in Pakistan | Employer Directory | ListPak',
  description: 'Discover hiring companies and employer profiles in Pakistan by industry and city. View company details, open jobs and contact information on ListPak.',
  alternates: { canonical: 'https://www.listpak.com/companies/' },
  openGraph: {
    title: 'Hiring Companies in Pakistan | Employer Directory | ListPak',
    description: 'Discover hiring companies and employer profiles in Pakistan by industry and city. View company details, open jobs and contact information on ListPak.',
    url: 'https://www.listpak.com/companies/',
    type: 'website',
  },
}

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return children
}
