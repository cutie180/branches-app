import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, MessageSquare, Clock, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact ListPak – Free Business Listing Website Pakistan Support',
  description: 'Contact ListPak support team for free business listing help, job posting assistance, and technical support. Email, phone, WhatsApp available. Based in Lahore & Karachi, Pakistan.',
  keywords: 'contact ListPak, ListPak support, free business listing help, contact business directory Pakistan, ListPak customer service, ListPak phone number, ListPak email',
  alternates: {
    canonical: 'https://listpak.com/contact',
  },
}

export default function ContactPage() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact ListPak – Free Business Listing Website Pakistan',
    description: 'Get in touch with ListPak support team for free business listing assistance, job portal help, and technical support',
    url: 'https://listpak.com/contact',
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <main className="bg-[#F4F7FC] text-[#0F172A] font-sans pb-16">
        
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 sm:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto">
              Contact ListPak – Get Free Business Listing Help & Support in Pakistan
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Need help with your free business listing on ListPak? Have questions about posting jobs free or finding employees in Pakistan? Our dedicated customer support team is here to assist you 24/7. Headquartered in Lahore with support offices in Karachi and Islamabad.
            </p>
          </div>
        </section>

        {/* CONTACT METHODS GRID */}
        <section className="py-16 bg-white border-b border-[#D9E2F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Multiple Ways to Reach ListPak Support Team – Free Business Directory Pakistan</h2>
              <p className="mt-2 text-[#475569]">Choose your preferred channel for fast, friendly, and free support.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email Support */}
              <div className="bg-[#F4F7FC] border border-[#D9E2F1] rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg">Email Support</h3>
                    <p className="text-xs text-[#64748B]">2-4 hours response time</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#475569] mb-4">
                  <li><strong>General:</strong> support@listpak.com</li>
                  <li><strong>Listing Support:</strong> listings@listpak.com</li>
                  <li><strong>Job Portal:</strong> jobs@listpak.com</li>
                  <li><strong>Technical Issues:</strong> tech@listpak.com</li>
                </ul>
                <p className="text-xs text-[#64748B] leading-relaxed">We respond to all emails within 2-4 hours during business hours (9 AM - 9 PM PKT).</p>
              </div>

              {/* Phone Support */}
              <div className="bg-[#F4F7FC] border border-[#D9E2F1] rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg">Phone Support</h3>
                    <p className="text-xs text-[#64748B]">Mon-Sat, 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#475569] mb-4">
                  <li><strong>Lahore HQ:</strong> +92-42-111-547-8225 (LISTPAK)</li>
                  <li><strong>Karachi Office:</strong> +92-21-111-547-8225</li>
                  <li><strong>Islamabad Office:</strong> +92-51-111-547-8225</li>
                  <li><strong>Toll-Free Pakistan:</strong> 0800-547-8225</li>
                </ul>
                <p className="text-xs text-[#64748B] leading-relaxed">Assistance with creating free business listings, profile verification, and job postings.</p>
              </div>

              {/* WhatsApp Support */}
              <div className="bg-[#F4F7FC] border border-[#D9E2F1] rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg">WhatsApp Support</h3>
                    <p className="text-xs text-[#64748B]">15-30 mins response time</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] mb-4">
                  <strong>WhatsApp Business:</strong> +92-300-1234567 (ListPak Support)
                </p>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  WhatsApp is the fastest way to get help. Send us screenshots, documents, and business details directly for rapid verification.
                </p>
              </div>

              {/* Office Locations */}
              <div className="bg-[#F4F7FC] border border-[#D9E2F1] rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg">Visit ListPak Offices</h3>
                    <p className="text-xs text-[#64748B]">Lahore, Karachi, Islamabad</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-[#475569]">
                  <p><strong>Lahore HQ:</strong> Office #123, 4th Floor, Business Tower, Gulberg III, Lahore</p>
                  <p><strong>Karachi:</strong> Suite 456, 5th Floor, Trade Center, Shahrah-e-Faisal, Karachi</p>
                  <p><strong>Islamabad:</strong> Office 789, 3rd Floor, Blue Area Plaza, Islamabad</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INQUIRY FORM */}
        <section className="py-16 bg-[#EEF4FF] border-b border-[#D9E2F1]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-[#D9E2F1] rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Send Us a Message – Free Business Listing Inquiry Form</h2>
              <p className="text-xs text-[#64748B] mb-6">Fill out the form below and we&apos;ll get back to you within 2-4 hours.</p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Full Name *</label>
                    <input type="text" placeholder="Enter your full name" className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Email Address *</label>
                    <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Phone Number *</label>
                    <input type="tel" placeholder="+92-300-1234567" className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">City *</label>
                    <input type="text" placeholder="e.g. Karachi, Lahore, Islamabad" className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Subject *</label>
                  <select className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]">
                    <option>Free Business Listing Help</option>
                    <option>Job Posting Support</option>
                    <option>Job Seeker Profile Help</option>
                    <option>Technical Issue</option>
                    <option>Advertising Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Message *</label>
                  <textarea rows={4} placeholder="Describe your question or issue in detail..." className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]" required></textarea>
                </div>

                <button type="submit" className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-colors shadow-md text-sm">
                  Send Message to ListPak Support
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-white text-center">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#0F172A]">Ready to List Your Business Free?</h2>
            <p className="mt-2 text-xs text-[#64748B]">Join 10,000+ businesses already growing with ListPak free business listing website.</p>
            <Link href="/add-business" className="mt-6 inline-block px-8 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-sm shadow-md">
              Create Your Free Business Listing Now
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
