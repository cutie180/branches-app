'use client'

import { use, useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MOCK_PROFESSIONALS } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Users, MapPin, ShieldCheck, Star, Mail, Phone, Award, CheckCircle2, ArrowLeft, Download, Send } from 'lucide-react'
import { toast } from 'sonner'

export default function ProfessionalDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params)
  const pro = MOCK_PROFESSIONALS.find(p => p.username === resolvedParams.username) || MOCK_PROFESSIONALS[0]

  const [showContactModal, setShowContactModal] = useState(false)
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')

  if (!pro) {
    return notFound()
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!senderName || !senderEmail || !message) {
      toast.error('Please enter all required fields.')
      return
    }
    setShowContactModal(false)
    toast.success(`Message dispatched to ${pro.name}!`)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      {/* Hero Cover Header */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link href="/professionals" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Professionals</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img src={pro.avatar} alt={pro.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{pro.name}</h1>
                  {pro.verified && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                </div>
                <p className="text-sm font-semibold text-blue-400">{pro.title}</p>
                <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{pro.city}, Pakistan</span>
                  <span>•</span>
                  <span className="font-bold text-amber-400">★ {pro.rating} Rating</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{pro.experienceYears}+ Yrs Exp</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Professional</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* Biography */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h2 className="text-lg font-extrabold text-slate-900">About & Background</h2>
          <p className="text-sm text-slate-700 leading-relaxed">{pro.bio}</p>
        </div>

        {/* Skills Endorsements */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">Verified Skills & Core Competencies</h2>
          <div className="flex flex-wrap gap-2">
            {pro.skills.map((skill) => (
              <div key={skill} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Work Rate & Availability */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">Engagement & Availability</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium">Standard Rate</span>
              <p className="text-base font-extrabold text-slate-900 mt-1">{pro.hourlyRate}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium">City Location</span>
              <p className="text-base font-extrabold text-slate-900 mt-1">{pro.city}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium">Verification Status</span>
              <p className="text-base font-extrabold text-emerald-600 mt-1">Verified Identity</p>
            </div>
          </div>
        </div>

      </main>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Send Inquiry to {pro.name}</h3>
              <button onClick={() => setShowContactModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project scope or consulting requirements..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
