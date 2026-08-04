'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Mail, Phone, MapPin, MessageSquare, ShieldCheck } from 'lucide-react'
import { saveContactMessage } from '@/lib/db-service'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    subject: 'Free Business Listing Help',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please complete all required fields.')
      return
    }

    setIsSubmitting(true)
    try {
      await saveContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `${formData.subject} (${formData.city || 'Pakistan'})`,
        message: formData.message
      })
      setIsSubmitting(false)
      setSubmitted(true)
      toast.success('Your message has been submitted successfully to ListPak administration.')
    } catch (err) {
      console.error(err)
      setIsSubmitting(false)
      toast.error('An error occurred. Please try again.')
    }
  }

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact ListPak: Free Business Listing Website Pakistan',
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
              Contact ListPak: Business Support & Inquiries
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Need help with your business listing on ListPak? Have questions about posting jobs or finding talent in Pakistan? Our support team is here to assist you 24/7. Headquartered in Islamabad with support nationwide.
            </p>
          </div>
        </section>

        {/* CONTACT METHODS GRID */}
        <section className="py-16 bg-white border-b border-[#D9E2F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Multiple Ways to Reach ListPak Support Team</h2>
              <p className="mt-2 text-[#475569]">Choose your preferred channel for fast and friendly support.</p>
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
                    <p className="text-xs text-[#64748B]">2 to 4 hours response time</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#475569] mb-4">
                  <li><strong>General:</strong> support@listpak.com</li>
                  <li><strong>Listing Support:</strong> listings@listpak.com</li>
                  <li><strong>Job Portal:</strong> jobs@listpak.com</li>
                </ul>
                <p className="text-xs text-[#64748B] leading-relaxed">We respond to all emails during business hours (9 AM - 9 PM PKT).</p>
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
                  <li><strong>Official Helpline:</strong> +92 334 5636230</li>
                  <li><strong>HQ Address:</strong> Office 303, Evacuee Trust Complex, F-5/1, Islamabad 44000, Pakistan</li>
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
                    <p className="text-xs text-[#64748B]">Fastest response time</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] mb-4">
                  <strong>WhatsApp Helpline:</strong> +92 334 5636230
                </p>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Send us screenshots and business details directly for rapid verification.
                </p>
              </div>

              {/* Office Locations */}
              <div className="bg-[#F4F7FC] border border-[#D9E2F1] rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg">Official Business Address</h3>
                    <p className="text-xs text-[#64748B]">Islamabad HQ</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-[#475569]">
                  <p><strong>ListPak Enterprise:</strong> Office 303, Evacuee Trust Complex, F-5/1, Islamabad 44000, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INQUIRY FORM (FIRESTORE PERSISTENT) */}
        <section className="py-16 bg-[#EEF4FF] border-b border-[#D9E2F1]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-[#D9E2F1] rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Send Us a Message</h2>
              <p className="text-xs text-[#64748B] mb-6">Fill out the form below and your inquiry will be logged directly into our administration queue.</p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Message Sent Successfully!</h3>
                  <p className="text-xs text-slate-600">Your message has been logged into our support queue. Our team will review and reply shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 334 5636230"
                        className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Islamabad, Karachi, Lahore"
                        className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Subject *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="Free Business Listing Help">Free Business Listing Help</option>
                      <option value="Job Posting Support">Job Posting Support</option>
                      <option value="Job Seeker Profile Help">Job Seeker Profile Help</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Advertising Inquiry">Advertising Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your question or issue in detail..."
                      className="w-full px-4 py-2.5 bg-[#F4F7FC] border border-[#D9E2F1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-colors shadow-md text-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting Inquiry...' : 'Send Message to ListPak Support'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
