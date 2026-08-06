import { Metadata } from 'next'
import AddBusinessClient from './add-business-client'

export const metadata: Metadata = {
  title: "List Your Business Free — Pakistan's Digital Business Platform | ListPak",
  description: "Join Pakistan's largest digital business platform. List your business free, reach thousands of customers across Karachi, Lahore, Islamabad, and nationwide with high Google search ranking.",
  keywords: 'list business free Pakistan, add business Pakistan directory, register business online Pakistan, free business directory Pakistan, ListPak onboarding',
  alternates: {
    canonical: 'https://www.listpak.com/add-business',
  },
  openGraph: {
    title: "List Your Business Free — Pakistan's Digital Ecosystem | ListPak",
    description: "Onboard your business to Pakistan's premier digital platform. 100% free listing forever with high Google search ranking.",
    url: 'https://www.listpak.com/add-business',
    siteName: 'ListPak',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'List Your Business Free on ListPak Pakistan',
    description: "Onboard your company to Pakistan's flagship business platform.",
  }
}

export default function AddBusinessPage() {
  return <AddBusinessClient />
}
