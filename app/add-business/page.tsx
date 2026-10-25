import { Metadata } from 'next'
import AddBusinessClient from './add-business-client'

export const metadata: Metadata = {
  title: "Add Your Business Free on ListPak | Pakistan Directory",
  description: "List your business free on ListPak and reach customers searching in Karachi, Lahore, Islamabad and across Pakistan. Add your phone, hours and services.",
  keywords: 'list business free Pakistan, add business Pakistan directory, register business online Pakistan, free business directory Pakistan, ListPak onboarding',
  alternates: {
    canonical: 'https://www.listpak.com/add-business/',
  },
  openGraph: {
    title: "List Your Business Free — Pakistan's Digital Ecosystem | ListPak",
    description: "Create your free business listing on ListPak with your phone number, address, hours and services — and get found by customers across Pakistan.",
    url: 'https://www.listpak.com/add-business/',
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
