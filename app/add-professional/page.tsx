import AddProfessionalClient from './add-professional-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Free Professional Profile | ListPak Pakistan',
  description: 'Create your public professional profile on ListPak. Showcase your portfolio, skills, experience, and get discovered by clients across Pakistan and Google Search.',
  alternates: { canonical: 'https://www.listpak.com/add-professional/' },
  openGraph: {
    title: 'Create Free Professional Profile | ListPak Pakistan',
    description: 'Create your public professional profile on ListPak. Showcase your portfolio, skills, experience, and get discovered by clients across Pakistan and Google Search.',
    url: 'https://www.listpak.com/add-professional/',
    type: 'website',
  },
}

export default function AddProfessionalPage() {
  return <AddProfessionalClient />
}
