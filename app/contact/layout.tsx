import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact ListPak | Pakistan Directory Support',
  description: 'Contact ListPak for business listing support, reporting concerns, directory questions and partnership enquiries — we reply to genuine queries promptly.',
  alternates: { canonical: 'https://www.listpak.com/contact/' },
  openGraph: {
    title: 'Contact ListPak | Pakistan Directory Support',
    description: 'Contact ListPak for business listing support, reporting concerns, directory questions and partnership enquiries — we reply to genuine queries promptly.',
    url: 'https://www.listpak.com/contact/',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
