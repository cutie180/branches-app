'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Briefcase, Building2, MapPin, CheckCircle2, Plus, Globe, Mail, AlertCircle, Info, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function PostJobPage() {
  const [submitted, setSubmitted] = useState(false)
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [city, setCity] = useState('Karachi')
  const [category, setCategory] = useState('Technology & IT')
  const [type, setType] = useState('Full-time')
  const [salary, setSalary] = useState('')
  const [description, setDescription] = useState('')
  
  // Application Method Fields
  const [applicationWebsite, setApplicationWebsite] = useState('')
  const [applicationEmail, setApplicationEmail] = useState('')
  const [appMethodError, setAppMethodError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAppMethodError('')

    if (!title || !company || !salary || !description) {
      toast.error('Please fill in all mandatory job position fields.')
      return
    }

    // Validation: At least ONE application method must be provided
    const cleanWeb = applicationWebsite.trim()
    const cleanMail = applicationEmail.trim()

    if (!cleanWeb && !cleanMail) {
      const msg = 'Please provide at least an Application Website URL or an Application Email Address for candidates.'
      setAppMethodError(msg)
      toast.error(msg)
      return
    }

    // Validate URL if provided
    if (cleanWeb) {
      try {
        const urlToCheck = cleanWeb.startsWith('http://') || cleanWeb.startsWith('https://') ? cleanWeb : `https://${cleanWeb}`
        new URL(urlToCheck)
      } catch (err) {
        setAppMethodError('Please enter a valid website URL (e.g. https://company.com/careers).')
        toast.error('Invalid Application Website URL format.')
        return
      }
    }

    // Validate Email if provided
    if (cleanMail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(cleanMail)) {
        setAppMethodError('Please enter a valid email address (e.g. careers@company.com).')
        toast.error('Invalid Application Email format.')
        return
      }
    }

    setSubmitted(true)
    toast.success('Job opening published successfully! Live on ListPak Jobs.')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-gradient-to-b from-blue-50/70 via-slate-50 to-[#F8FAFC] text-slate-900 py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span>Enterprise Hiring Portal</span>
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">Post a Job Opening in Pakistan</h1>
          <p className="text-slate-600 text-sm font-medium">
            Reach qualified Pakistani professionals. Candidates apply directly through your website or direct email.
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {submitted ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200/90 text-center space-y-4 shadow-xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Job Opening Published!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your job posting for <strong className="text-slate-900">{title}</strong> at {company} is now live on ListPak Jobs.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
              <span className="font-bold text-slate-700 block">Candidate Application Endpoint:</span>
              {applicationWebsite && (
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website: {applicationWebsite}</span>
                </div>
              )}
              {applicationEmail && (
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email: {applicationEmail}</span>
                </div>
              )}
            </div>
            <div className="pt-4 flex justify-center gap-3">
              <Link href="/jobs" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">
                View Job Listings Portal
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl space-y-8">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 pb-3 border-b border-slate-100">
                1. Position Details
              </h2>

              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Software Engineer / Store Manager"
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company name"
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City Location *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                      <option value="Karachi">Karachi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Quetta">Quetta</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Job Type *</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Offered Salary Package *</label>
                    <input
                      type="text"
                      required
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g. PKR 150,000 - 250,000 / month"
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Job Description & Requirements *</label>
                  <textarea
                    rows={5}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Outline responsibilities, key skills required, and benefits..."
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            {/* DEDICATED APPLICATION METHOD SECTION */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span>2. Candidate Application Method</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                    Mandatory Section
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Candidates will apply directly through your external website portal or via formatted email. At least one method is required.
                </p>
              </div>

              {appMethodError && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{appMethodError}</span>
                </div>
              )}

              <div className="space-y-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Application Website / Career Portal URL</span>
                  </label>
                  <input
                    type="text"
                    value={applicationWebsite}
                    onChange={(e) => setApplicationWebsite(e.target.value)}
                    placeholder="e.g. https://yourcompany.com/careers/apply-123"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Candidates clicking &quot;Apply on Company Website&quot; will be redirected securely to this URL in a new tab.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span>Application Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={applicationEmail}
                    onChange={(e) => setApplicationEmail(e.target.value)}
                    placeholder="e.g. careers@yourcompany.com"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Candidates clicking &quot;Apply via Email&quot; will open their default email client with pre-filled subject and application body.
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Publish Job Opening Now</span>
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
