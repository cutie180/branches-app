import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jobs in Pakistan | Find Current Vacancies by City | ListPak',
  description: 'Find current job openings in Pakistan by role, city, employment type, and company on ListPak.',
  alternates: { canonical: 'https://www.listpak.com/jobs/' },
  openGraph: {
    title: 'Jobs in Pakistan | Find Current Vacancies by City | ListPak',
    description: 'Find current job openings in Pakistan by role, city, employment type, and company on ListPak.',
    url: 'https://www.listpak.com/jobs/',
    type: 'website',
  },
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children
}
