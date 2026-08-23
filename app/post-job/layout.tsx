import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Post a Job in Pakistan | Free Employer Listing | ListPak',
  description: 'Post a job opening in Pakistan and reach relevant candidates through ListPak’s employer and professional network.',
  alternates: { canonical: 'https://www.listpak.com/post-job/' },
  openGraph: {
    title: 'Post a Job in Pakistan | Free Employer Listing | ListPak',
    description: 'Post a job opening in Pakistan and reach relevant candidates through ListPak’s employer and professional network.',
    url: 'https://www.listpak.com/post-job/',
    type: 'website',
  },
}

export default function PostJobLayout({ children }: { children: React.ReactNode }) {
  return children
}
