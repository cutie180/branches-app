import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact ListPak | Pakistan Directory Support',
  description: 'Contact ListPak for business listing support, reporting concerns, directory questions, and partnership enquiries.',
  alternates: { canonical: 'https://www.listpak.com/contact/' },
  openGraph: {
    title: 'Contact ListPak | Pakistan Directory Support',
    description: 'Contact ListPak for business listing support, reporting concerns, directory questions, and partnership enquiries.',
    url: 'https://www.listpak.com/contact/',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
