import AddCompanyClient from './add-company-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register Hiring Company & HR Profile | ListPak Pakistan',
  description: 'Create a verified hiring profile for your company on ListPak. Post job openings, build employer branding, and discover top candidates across Pakistan.',
  alternates: { canonical: 'https://www.listpak.com/add-company/' },
  openGraph: {
    title: 'Register Hiring Company & HR Profile | ListPak Pakistan',
    description: 'Create a verified hiring profile for your company on ListPak. Post job openings, build employer branding, and discover top candidates across Pakistan.',
    url: 'https://www.listpak.com/add-company/',
    type: 'website',
  },
}

export default function AddCompanyPage() {
  return <AddCompanyClient />
}
