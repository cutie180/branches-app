import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { HelpCircle, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQs) | ListPak',
  description: 'Find answers to common questions about listing your business, verifying NTN credentials, posting jobs, and searching companies on ListPak.',
  alternates: {
    canonical: 'https://listpak.com/faqs',
  },
}

const faqs = [
  {
    q: "Is listing a business on ListPak free?",
    a: "Yes! Creating a basic business listing on ListPak is 100% free forever. It includes your business name, address, contact phone, WhatsApp number, business category, and description."
  },
  {
    q: "How long does it take for my business to appear in search results?",
    a: "Once submitted, our team reviews listings within 1 to 24 hours. Approved listings immediately index on city pages, category search, and our XML sitemap."
  },
  {
    q: "How do I get a Verified Business Badge on ListPak?",
    a: "Verification requires telephone/WhatsApp verification by our support desk. You can request verification via the Add Business form or by contacting our team."
  },
  {
    q: "Can I post job openings for my Pakistani company?",
    a: "Yes, registered business owners and employers can post job openings across any city in Pakistan directly through our job portal."
  },
  {
    q: "How can I update or delete my business listing?",
    a: "You can submit an edit or removal request through our Contact Page or by emailing admin@listpak.com with proof of business ownership."
  }
]

export default function FAQsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen pb-16">
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Everything you need to know about navigating, listing, and hiring on ListPak.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
